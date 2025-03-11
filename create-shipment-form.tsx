"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { CalendarIcon, Plus, Trash } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

const formSchema = z.object({
  shipmentName: z.string().min(2, {
    message: "Shipment name must be at least 2 characters.",
  }),
  departureDate: z.date({
    required_error: "A departure date is required.",
  }),
  departureLocation: z.string().min(2, {
    message: "Departure location must be at least 2 characters.",
  }),
  arrivalLocation: z.string().min(2, {
    message: "Arrival location must be at least 2 characters.",
  }),
  shipmentType: z.string({
    required_error: "Please select a shipment type.",
  }),
  notes: z.string().optional(),
  animalCount: z.number().min(1, {
    message: "At least one animal is required.",
  }),
})

export function CreateShipmentForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [animals, setAnimals] = useState([{ id: 1, type: "", agent: "" }])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      shipmentName: "",
      departureLocation: "",
      arrivalLocation: "",
      shipmentType: "",
      notes: "",
      animalCount: 1,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 1) {
      setStep(2)
      return
    }

    // Create a new shipment object with all necessary properties
    const newShipment = {
      id: `shipment-${Date.now()}`, // Generate a unique ID
      title: values.shipmentName,
      customer: "Customer Name", // You can replace with actual customer data if available
      date: values.departureDate.toISOString().split("T")[0],
      origin: values.departureLocation,
      destination: values.arrivalLocation,
      status: "Pending",
      progress: 0,
      type: values.shipmentType,
      animals: values.animalCount.toString(),
      tasks: [
        { id: 1, name: "Documentation", completed: false },
        { id: 2, name: "Health Checks", completed: false },
        { id: 3, name: "Transport Arrangement", completed: false },
        { id: 4, name: "Customs Clearance", completed: false },
      ],
    }

    // Save to localStorage
    try {
      // Get existing shipments
      const existingShipmentsJSON = localStorage.getItem("shipments")
      let shipments = []

      if (existingShipmentsJSON) {
        shipments = JSON.parse(existingShipmentsJSON)
      }

      // Add new shipment
      shipments.push(newShipment)

      // Save back to localStorage
      localStorage.setItem("shipments", JSON.stringify(shipments))

      console.log("Shipment saved to localStorage:", newShipment)
    } catch (error) {
      console.error("Error saving shipment to localStorage:", error)
    }

    // Show success toast
    toast({
      title: "Shipment created",
      description: "Your shipment has been created successfully.",
    })

    // Navigate to the shipment details page
    console.log("Navigating to shipment details page...")
    setTimeout(() => {
      window.location.href = `/shipments/${newShipment.id}`
    }, 500) // Small delay to ensure toast is visible
  }

  function addAnimal() {
    setAnimals([...animals, { id: animals.length + 1, type: "", agent: "" }])
    form.setValue("animalCount", animals.length + 1)
  }

  function removeAnimal(id: number) {
    if (animals.length > 1) {
      const updatedAnimals = animals.filter((animal) => animal.id !== id)
      setAnimals(updatedAnimals)
      form.setValue("animalCount", updatedAnimals.length)
    }
  }

  function updateAnimal(id: number, field: "type" | "agent", value: string) {
    const updatedAnimals = animals.map((animal) => (animal.id === id ? { ...animal, [field]: value } : animal))
    setAnimals(updatedAnimals)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <>
            <FormField
              control={form.control}
              name="shipmentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter shipment name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Departure Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="departureLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter departure location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="arrivalLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter arrival location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="shipmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipment Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a shipment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="air">Air</SelectItem>
                      <SelectItem value="sea">Sea</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="animalCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Animals</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const count = Number.parseInt(value, 10)
                      field.onChange(count)

                      // Update animals array based on new count
                      if (count > animals.length) {
                        const newAnimals = [...animals]
                        for (let i = animals.length + 1; i <= count; i++) {
                          newAnimals.push({ id: i, type: "", agent: "" })
                        }
                        setAnimals(newAnimals)
                      } else if (count < animals.length) {
                        setAnimals(animals.slice(0, count))
                      }
                    }}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number of animals" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Add any additional notes here" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Optional notes about the shipment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Animal Details</h3>
            <p className="text-sm text-muted-foreground">Please provide details for each animal in this shipment.</p>

            {animals.map((animal, index) => (
              <Card key={animal.id} className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Animal {index + 1}</h4>
                    {animals.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeAnimal(animal.id)}>
                        <Trash className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <FormLabel htmlFor={`animal-type-${animal.id}`}>Animal Type</FormLabel>
                      <Select value={animal.type} onValueChange={(value) => updateAnimal(animal.id, "type", value)}>
                        <SelectTrigger id={`animal-type-${animal.id}`}>
                          <SelectValue placeholder="Select animal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="horse">Horse</SelectItem>
                          <SelectItem value="cattle">Cattle</SelectItem>
                          <SelectItem value="pig">Pig</SelectItem>
                          <SelectItem value="sheep">Sheep</SelectItem>
                          <SelectItem value="goat">Goat</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <FormLabel htmlFor={`animal-agent-${animal.id}`}>Assigned Agent</FormLabel>
                      <Select value={animal.agent} onValueChange={(value) => updateAnimal(animal.id, "agent", value)}>
                        <SelectTrigger id={`animal-agent-${animal.id}`}>
                          <SelectValue placeholder="Select agent" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john-doe">John Doe</SelectItem>
                          <SelectItem value="jane-smith">Jane Smith</SelectItem>
                          <SelectItem value="robert-johnson">Robert Johnson</SelectItem>
                          <SelectItem value="emily-davis">Emily Davis</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button type="button" variant="outline" onClick={addAnimal} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Animal
            </Button>
          </div>
        )}

        <div className="flex justify-between">
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)}>
              Back
            </Button>
          )}
          <Button type="submit">{step === 1 ? "Next" : "Create Shipment"}</Button>
        </div>
      </form>
    </Form>
  )
}

