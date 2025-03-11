"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function CreateShipmentButton({ customerName, origin, destination, animalCount }) {
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    if (!customerName || !origin || !destination || !animalCount) {
      alert("Please fill in all required fields")
      return
    }

    setIsCreating(true)

    try {
      // Generate a unique ID
      const newShipmentId = `SHIP-${Date.now().toString().slice(-6)}`

      // Create shipment object
      const newShipment = {
        id: newShipmentId,
        customer: customerName,
        origin: origin,
        destination: destination,
        animals: Number.parseInt(animalCount),
        status: "In Progress",
        progress: 0,
        tasks: [
          { id: 1, name: "Paperwork", completed: false },
          { id: 2, name: "Inspection", completed: false },
          { id: 3, name: "Loading", completed: false },
          { id: 4, name: "Transport", completed: false },
          { id: 5, name: "Delivery", completed: false },
        ],
        date: new Date().toISOString().split("T")[0],
      }

      // Save to localStorage
      try {
        const existingShipmentsJSON = localStorage.getItem("shipments")
        const existingShipments = existingShipmentsJSON ? JSON.parse(existingShipmentsJSON) : []
        localStorage.setItem("shipments", JSON.stringify([...existingShipments, newShipment]))
        console.log("Shipment saved to localStorage:", newShipment)
      } catch (error) {
        console.error("Error saving to localStorage:", error)
      }

      // Navigate to shipment details
      console.log("Navigating to:", `/shipments/${newShipmentId}`)

      // Try both navigation methods
      try {
        router.push(`/shipments/${newShipmentId}`)
      } catch (error) {
        console.error("Router navigation failed:", error)
        window.location.href = `/shipments/${newShipmentId}`
      }
    } catch (error) {
      console.error("Error creating shipment:", error)
      alert("Error creating shipment: " + error.message)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Button onClick={handleClick} disabled={isCreating} className="w-full">
      {isCreating ? "Creating Shipment..." : "Create Shipment"}
    </Button>
  )
}

