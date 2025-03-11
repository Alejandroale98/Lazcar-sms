"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, ChevronRight, Plus } from "lucide-react"
import { getDatabase, saveShipmentRequest, type Customer, type HorseInfo } from "@/lib/database"
import { sendCustomerConfirmationEmail } from "@/lib/email"

interface CustomerShipmentRequestProps {
  customerId: string
}

export function CustomerShipmentRequest({ customerId }: CustomerShipmentRequestProps) {
  const router = useRouter()
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [type, setType] = useState<"import" | "export" | "in-transit">("import")
  const [selectedHorses, setSelectedHorses] = useState<string[]>([])
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [originAirport, setOriginAirport] = useState("")
  const [destinationAirport, setDestinationAirport] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // Fetch customer data
  useEffect(() => {
    try {
      const db = getDatabase()
      const foundCustomer = db.customers.find((c) => c.id === customerId)

      if (foundCustomer) {
        setCustomer(foundCustomer)
      } else {
        setErrorMessage("Customer not found. Please log in again.")
      }
    } catch (error) {
      console.error("Error fetching customer data:", error)
      setErrorMessage("Unable to load customer data. Please try again later.")
    }
  }, [customerId])

  // Get selected horse objects
  const getSelectedHorseInfo = (): HorseInfo[] => {
    if (!customer) return []
    return customer.horses.filter((horse) => selectedHorses.includes(horse.name))
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!customer || !date) {
      setErrorMessage("Please fill in all required fields.")
      return
    }

    if (selectedHorses.length === 0) {
      setErrorMessage("Please select at least one horse.")
      return
    }

    if ((type === "import" || type === "export") && (!originAirport || !destinationAirport)) {
      setErrorMessage("Please provide both origin and destination airports.")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      // Create shipment object
      const shipment = {
        type,
        animalType: "Horse",
        numAnimals: selectedHorses.length,
        date: date.toISOString(),
        originAirport,
        destinationAirport,
        horseInfo: getSelectedHorseInfo(),
        ownerInfo: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
        },
      }

      // Save shipment request
      const shipmentId = saveShipmentRequest(shipment)

      if (shipmentId) {
        // Send confirmation email to customer
        await sendCustomerConfirmationEmail(
          customer.email,
          shipmentId,
          type,
          format(date, "MMMM d, yyyy"),
          `Horses: ${selectedHorses.join(", ")}
Origin: ${originAirport}
Destination: ${destinationAirport}`,
        )

        // Show success message
        setSuccessMessage(`Your ${type} shipment request has been submitted successfully! Shipment ID: ${shipmentId}`)

        // Reset form
        setType("import")
        setSelectedHorses([])
        setDate(undefined)
        setOriginAirport("")
        setDestinationAirport("")

        // Redirect to confirmation page after delay
        setTimeout(() => {
          router.push(`/customer/shipments/${shipmentId}`)
        }, 3000)
      } else {
        setErrorMessage("Failed to create shipment request. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting shipment request:", error)
      setErrorMessage("An error occurred while submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle horse selection toggle
  const toggleHorseSelection = (horseName: string) => {
    if (selectedHorses.includes(horseName)) {
      setSelectedHorses(selectedHorses.filter((name) => name !== horseName))
    } else {
      setSelectedHorses([...selectedHorses, horseName])
    }
  }

  // Loading state
  if (!customer) {
    return (
      <div className="flex justify-center p-8">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle>Request Shipment</CardTitle>
            <CardDescription>{errorMessage || "Loading customer data..."}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Request New Shipment</CardTitle>
          <CardDescription>Create a new shipment request for your animals</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Success message */}
          {successMessage && <div className="bg-green-100 p-4 rounded-md text-green-800 mb-4">{successMessage}</div>}

          {/* Error message */}
          {errorMessage && <div className="bg-red-100 p-4 rounded-md text-red-800 mb-4">{errorMessage}</div>}

          {/* Shipment Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="shipment-type">Shipment Type</Label>
            <Select value={type} onValueChange={(value: "import" | "export" | "in-transit") => setType(value)}>
              <SelectTrigger id="shipment-type">
                <SelectValue placeholder="Select shipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="import">Import</SelectItem>
                <SelectItem value="export">Export</SelectItem>
                <SelectItem value="in-transit">In-Transit</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              {type === "import"
                ? "Import: Bringing animals into the country"
                : type === "export"
                  ? "Export: Sending animals out of the country"
                  : "In-Transit: Animals temporarily in the country during transport"}
            </p>
          </div>

          {/* Horse Selection */}
          <div className="space-y-2">
            <Label>Select Horses</Label>
            <div className="border rounded-md divide-y">
              {customer.horses.length > 0 ? (
                customer.horses.map((horse) => (
                  <div key={horse.name} className="flex items-center p-3">
                    <Checkbox
                      id={`horse-${horse.name}`}
                      checked={selectedHorses.includes(horse.name)}
                      onCheckedChange={() => toggleHorseSelection(horse.name)}
                    />
                    <Label htmlFor={`horse-${horse.name}`} className="ml-3 flex-1 cursor-pointer">
                      <div className="font-medium">{horse.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {horse.breed}, {horse.color}, {horse.sex}
                      </div>
                    </Label>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No horses registered. Please add horses to your profile.
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" className="mt-2" onClick={() => router.push("/customer/horses/add")}>
                <Plus className="h-4 w-4 mr-1" /> Add New Horse
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">Selected: {selectedHorses.length} horses</div>
          </div>

          {/* Shipment Date */}
          <div className="space-y-2">
            <Label htmlFor="shipment-date">Shipment Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal" id="shipment-date">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Airport Selection */}
          {(type === "import" || type === "export") && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin Airport</Label>
                <Input
                  id="origin"
                  placeholder="Enter airport code"
                  value={originAirport}
                  onChange={(e) => setOriginAirport(e.target.value.toUpperCase())}
                  maxLength={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination Airport</Label>
                <Input
                  id="destination"
                  placeholder="Enter airport code"
                  value={destinationAirport}
                  onChange={(e) => setDestinationAirport(e.target.value.toUpperCase())}
                  maxLength={3}
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || selectedHorses.length === 0 || !date}>
            {isSubmitting ? "Submitting..." : "Submit Request"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

