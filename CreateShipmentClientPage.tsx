"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { format, parseISO } from "date-fns"
import { getSavedAgents } from "@/lib/database"
import { CreateShipmentForm } from "@/components/create-shipment-form"
import { addShipment } from "@/lib/database"
import { toast } from "@/components/ui/use-toast"
import { generateShipmentNumber, getTasksForShipmentType } from "@/lib/shipment-utils"

const shipmentTypes = ["Import", "Export", "In-Transit"]
const animalTypes = ["Horses", "Cattle", "Livestock", "Other"]
const animalCounts = Array.from({ length: 200 }, (_, i) => (i + 1).toString())

interface Agent {
  name: string
  animalCount: number
}

export default function CreateShipmentClientPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state with URL parameters if they exist
  const [selectedType, setSelectedType] = useState<"import" | "export" | "in-transit">(
    (searchParams.get("type")?.toLowerCase() || "import") as "import" | "export" | "in-transit",
  )
  const [shipmentType, setShipmentType] = useState(searchParams.get("type")?.toLowerCase() || "")
  const [animalType, setAnimalType] = useState(searchParams.get("animalType") || "")
  const [animalCount, setAnimalCount] = useState(searchParams.get("numAnimals") || "")
  const [date, setDate] = useState<Date | undefined>(
    searchParams.get("date") ? parseISO(searchParams.get("date")!) : undefined,
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [originCountry, setOriginCountry] = useState(searchParams.get("originCountry") || "")
  const [destinationCountry, setDestinationCountry] = useState(searchParams.get("destinationCountry") || "")
  const [originAirport, setOriginAirport] = useState(searchParams.get("originAirport") || "")
  const [destinationAirport, setDestinationAirport] = useState(searchParams.get("destinationAirport") || "")
  const [agents, setAgents] = useState<Agent[]>([{ name: "", animalCount: 0 }])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date") ? parseISO(searchParams.get("date")!) : undefined,
  )
  const [savedAgents] = useState(() => getSavedAgents())
  const [selectedSavedAgent, setSelectedSavedAgent] = useState("")
  const [customerName] = useState(searchParams.get("customerName") || "")
  const [requestId] = useState(searchParams.get("requestId") || "")
  const [shipmentAnimals, setShipmentAnimals] = useState<Array<{ type: string; count: number; id: string }>>([])
  const [isCreatingShipment, setIsCreatingShipment] = useState(false)

  // Set default values based on shipment type
  useEffect(() => {
    if (selectedType === "import") {
      setDestinationCountry("United States")
      // Only set the airport if the country is United States
      if (destinationCountry === "United States" || destinationCountry === "") {
        setDestinationAirport("MIA")
      }
    } else if (selectedType === "export") {
      setOriginCountry("United States")
      // Only set the airport if the country is United States
      if (originCountry === "United States" || originCountry === "") {
        setOriginAirport("MIA")
      }
    }
  }, [selectedType, destinationCountry, originCountry])

  const addAgent = () => {
    setAgents([...agents, { name: "", animalCount: 0 }])
  }

  const removeAgent = (index: number) => {
    setAgents(agents.filter((_, i) => i !== index))
  }

  const updateAgent = (index: number, field: keyof Agent, value: string | number) => {
    const newAgents = [...agents]
    newAgents[index] = { ...newAgents[index], [field]: value }
    setAgents(newAgents)
  }

  const addAnimalToShipment = () => {
    if (animalType && animalCount) {
      setShipmentAnimals([
        ...shipmentAnimals,
        {
          type: animalType,
          count: Number(animalCount),
          id: uuidv4(),
        },
      ])
      // Reset the animal type and count for the next animal
      setAnimalType("")
      setAnimalCount("")
    }
  }

  const removeAnimalFromShipment = (id: string) => {
    setShipmentAnimals(shipmentAnimals.filter((animal) => animal.id !== id))
  }

  const totalAllocatedAnimals = agents.reduce((sum, agent) => sum + agent.animalCount, 0)
  const remainingAnimals = animalCount ? Number(animalCount) - totalAllocatedAnimals : 0
  const isOverAllocated = remainingAnimals < 0

  // Check if all required fields are filled and all animals are allocated
  const isFormValid = () => {
    // Basic field validation
    if (
      !shipmentType ||
      (shipmentAnimals.length === 0 && (!animalType || !animalCount)) ||
      !selectedDate ||
      !originCountry ||
      !destinationCountry ||
      !originAirport ||
      !destinationAirport
    ) {
      return false
    }

    // Check if using single animal or multiple animals
    if (shipmentAnimals.length > 0) {
      // For multiple animals, check if all agents have names
      const invalidAgents = agents.filter((agent) => agent.animalCount > 0 && !agent.name)
      if (invalidAgents.length > 0) {
        return false
      }
    } else {
      // For single animal, check allocation
      if (isOverAllocated || remainingAnimals > 0) {
        return false
      }

      // Check if all agents have names
      const invalidAgents = agents.filter((agent) => agent.animalCount > 0 && !agent.name)
      if (invalidAgents.length > 0) {
        return false
      }
    }

    return true
  }

  const handleCreateShipment = async (formData: any) => {
    try {
      setIsCreatingShipment(true)

      // Ensure type exists and has a valid value before using toLowerCase()
      const shipmentType = formData.type || selectedType || "import"

      // Generate a shipment number based on the type
      const shipmentNumber = generateShipmentNumber(shipmentType)

      // Get tasks for this shipment type
      const tasks = getTasksForShipmentType(shipmentType)

      // Format the data for the database
      const shipmentData = {
        id: uuidv4(),
        shipmentNumber: shipmentNumber,
        type: typeof shipmentType === "string" ? shipmentType : String(shipmentType),
        animals:
          shipmentAnimals.length > 0
            ? shipmentAnimals
            : [
                {
                  type: formData.animalType || animalType || "",
                  count: Number.parseInt(formData.numAnimals || animalCount || "0"),
                  id: uuidv4(),
                },
              ],
        date: formData.date || (selectedDate ? format(selectedDate, "yyyy-MM-dd") : new Date().toISOString()),
        originCountry: formData.originCountry || originCountry || "",
        originAirport: formData.originAirport || originAirport || "",
        destinationCountry: formData.destinationCountry || destinationCountry || "",
        destinationAirport: formData.destinationAirport || destinationAirport || "",
        horseName: formData.horseName || "",
        ownerName: formData.ownerName || "",
        agents: formData.agents || agents.filter((agent) => agent.name && agent.animalCount > 0) || [],
        status: "Pending",
        createdAt: new Date().toISOString(),
        tasks: tasks,
      }

      // Save the shipment to the database
      const savedShipment = addShipment(shipmentData)

      // Show success message
      toast({
        title: "Shipment created",
        description: `${shipmentNumber} (${shipmentData.type}) has been created successfully with ${tasks.length} tasks.`,
      })

      // Redirect to the calendar view
      router.push("/")
      router.refresh()

      return savedShipment
    } catch (error) {
      console.error("Error creating shipment:", error)
      toast({
        title: "Error",
        description: "There was an error creating the shipment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCreatingShipment(false)
    }
  }

  const handleCreate = async () => {
    if (!isFormValid()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and allocate all animals",
        variant: "destructive",
      })
      return
    }

    try {
      const formData = {
        type: shipmentType,
        animalType: animalType,
        numAnimals: animalCount,
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        originCountry,
        destinationCountry,
        originAirport,
        destinationAirport,
        agents: agents.filter((agent) => agent.name && agent.animalCount > 0),
        customerName,
        requestId,
      }

      await handleCreateShipment(formData)
    } catch (error) {
      console.error("Error saving shipment:", error)
      toast({
        title: "Error",
        description: "There was an error creating the shipment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const addSavedAgent = () => {
    if (selectedSavedAgent) {
      const newAgent = { name: selectedSavedAgent, animalCount: 0 }
      setAgents([...agents, newAgent])
      setSelectedSavedAgent("")
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mx-auto max-w-2xl">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Create New Shipment</h3>
            <p className="text-sm text-muted-foreground">Fill out the form below to create a new animal shipment.</p>
          </div>
          <CreateShipmentForm
            agents={agents}
            onAgentsChange={setAgents}
            animalCount={
              shipmentAnimals.length > 0
                ? shipmentAnimals.reduce((total, animal) => total + animal.count, 0).toString()
                : animalCount
            }
            onSubmit={handleCreateShipment}
            shipmentType={shipmentType}
            animalType={animalType}
            showSubmitButton={false}
            animals={shipmentAnimals}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            setShipmentType={setShipmentType}
            animalTypeState={animalType}
            setAnimalTypeState={setAnimalType}
            animalCountState={animalCount}
            setAnimalCountState={setAnimalCount}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            originCountry={originCountry}
            setOriginCountry={setOriginCountry}
            destinationCountry={destinationCountry}
            setDestinationCountry={setDestinationCountry}
            originAirport={originAirport}
            setOriginAirport={setOriginAirport}
            destinationAirport={destinationAirport}
            setDestinationAirport={setDestinationAirport}
            isCreatingShipment={isCreatingShipment}
            setIsCreatingShipment={setIsCreatingShipment}
            isFormValid={isFormValid}
            handleCreate={handleCreate}
            addAnimalToShipment={addAnimalToShipment}
            removeAnimalFromShipment={removeAnimalFromShipment}
            isCalendarOpen={isCalendarOpen}
            setIsCalendarOpen={setIsCalendarOpen}
          />
        </div>
      </div>
    </div>
  )
}

