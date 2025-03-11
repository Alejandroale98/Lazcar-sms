"use client"

import { useState } from "react"
import { CreateShipmentButton } from "./create-shipment-button"

export default function CreateShipment() {
  const [customerName, setCustomerName] = useState("")
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [animalCount, setAnimalCount] = useState("")

  // Add this function to test localStorage and navigation
  const testShipmentCreation = () => {
    try {
      // Test if localStorage is available
      if (typeof window === "undefined" || !window.localStorage) {
        alert("localStorage is not available in this environment")
        return
      }

      // Create a test shipment
      const testShipment = {
        id: `test-${Date.now()}`,
        customer: "Test Customer",
        origin: "Test Origin",
        destination: "Test Destination",
        animals: 5,
        status: "In Progress",
        progress: 0,
        tasks: [
          { id: 1, name: "Task 1", completed: false },
          { id: 2, name: "Task 2", completed: false },
        ],
        date: new Date().toISOString().split("T")[0],
      }

      // Save to localStorage
      try {
        const existingShipmentsJSON = localStorage.getItem("shipments")
        const existingShipments = existingShipmentsJSON ? JSON.parse(existingShipmentsJSON) : []
        localStorage.setItem("shipments", JSON.stringify([...existingShipments, testShipment]))

        alert(`Test shipment created with ID: ${testShipment.id}\nCheck localStorage to verify it was saved.`)

        // Ask if user wants to navigate
        if (confirm("Navigate to shipment details?")) {
          window.location.href = `/shipments/${testShipment.id}`
        }
      } catch (error) {
        alert(`Error saving to localStorage: ${error.message}`)
      }
    } catch (error) {
      alert(`Error in test function: ${error.message}`)
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Create New Shipment</h2>

      <div className="mb-4">
        <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">
          Customer Name:
        </label>
        <input
          type="text"
          id="customerName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="origin" className="block text-gray-700 text-sm font-bold mb-2">
          Origin:
        </label>
        <input
          type="text"
          id="origin"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="destination" className="block text-gray-700 text-sm font-bold mb-2">
          Destination:
        </label>
        <input
          type="text"
          id="destination"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="animalCount" className="block text-gray-700 text-sm font-bold mb-2">
          Animal Count:
        </label>
        <input
          type="number"
          id="animalCount"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={animalCount}
          onChange={(e) => setAnimalCount(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 w-full"
        onClick={testShipmentCreation}
      >
        Test Shipment Creation
      </button>

      <CreateShipmentButton
        customerName={customerName}
        origin={origin}
        destination={destination}
        animalCount={animalCount}
      />
    </div>
  )
}

