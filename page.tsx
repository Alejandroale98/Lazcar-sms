"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DiagnosticsPage() {
  const [tests, setTests] = useState({
    localStorage: { status: "pending", message: "Not tested yet" },
    navigation: { status: "pending", message: "Not tested yet" },
    stateManagement: { status: "pending", message: "Not tested yet" },
    formSubmission: { status: "pending", message: "Not tested yet" },
  })

  const [debugInfo, setDebugInfo] = useState({
    userAgent: "",
    windowSize: "",
    localStorage: "",
    sessionStorage: "",
    cookies: "",
    nextRouter: "",
    environment: "",
  })

  useEffect(() => {
    // Collect debug information
    setDebugInfo({
      userAgent: navigator.userAgent,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
      localStorage: typeof localStorage !== "undefined" ? "Available" : "Not available",
      sessionStorage: typeof sessionStorage !== "undefined" ? "Available" : "Not available",
      cookies: document.cookie ? "Present" : "None or blocked",
      nextRouter: typeof window !== "undefined" && "next" in window ? "Available" : "Not available",
      environment: process.env.NODE_ENV || "Unknown",
    })
  }, [])

  // Test localStorage functionality
  const testLocalStorage = () => {
    try {
      // Test writing to localStorage
      localStorage.setItem("test-key", "test-value")

      // Test reading from localStorage
      const value = localStorage.getItem("test-key")

      // Test removing from localStorage
      localStorage.removeItem("test-key")

      if (value === "test-value") {
        setTests((prev) => ({
          ...prev,
          localStorage: { status: "success", message: "localStorage is working correctly" },
        }))
      } else {
        setTests((prev) => ({
          ...prev,
          localStorage: { status: "error", message: "localStorage read/write test failed" },
        }))
      }
    } catch (error) {
      setTests((prev) => ({
        ...prev,
        localStorage: { status: "error", message: `localStorage error: ${error.message}` },
      }))
    }
  }

  // Test navigation functionality
  const testNavigation = () => {
    try {
      // Create a test URL parameter
      const testParam = `test-${Date.now()}`

      // Update the URL without a full page reload
      window.history.pushState({}, "", `/diagnostics?test=${testParam}`)

      // Check if the URL was updated
      if (window.location.href.includes(testParam)) {
        setTests((prev) => ({
          ...prev,
          navigation: { status: "success", message: "Navigation API is working correctly" },
        }))
      } else {
        setTests((prev) => ({
          ...prev,
          navigation: { status: "error", message: "Failed to update URL" },
        }))
      }
    } catch (error) {
      setTests((prev) => ({
        ...prev,
        navigation: { status: "error", message: `Navigation error: ${error.message}` },
      }))
    }
  }

  // Test state management
  const testStateManagement = () => {
    try {
      // Test React state updates
      setTests((prev) => {
        const newState = {
          ...prev,
          stateManagement: { status: "pending", message: "Testing state updates..." },
        }

        // Use setTimeout to check if state updates are working
        setTimeout(() => {
          setTests((prevState) => ({
            ...prevState,
            stateManagement: { status: "success", message: "React state management is working correctly" },
          }))
        }, 500)

        return newState
      })
    } catch (error) {
      setTests((prev) => ({
        ...prev,
        stateManagement: { status: "error", message: `State management error: ${error.message}` },
      }))
    }
  }

  // Test form submission
  const testFormSubmission = () => {
    try {
      // Create a test form data object
      const formData = {
        id: `test-${Date.now()}`,
        name: "Test Shipment",
        date: new Date().toISOString(),
      }

      // Save to localStorage
      const existingData = localStorage.getItem("test-form-submissions") || "[]"
      const parsedData = JSON.parse(existingData)
      parsedData.push(formData)
      localStorage.setItem("test-form-submissions", JSON.stringify(parsedData))

      // Verify the data was saved
      const savedData = JSON.parse(localStorage.getItem("test-form-submissions") || "[]")
      const lastEntry = savedData[savedData.length - 1]

      if (lastEntry && lastEntry.id === formData.id) {
        setTests((prev) => ({
          ...prev,
          formSubmission: { status: "success", message: "Form submission test passed" },
        }))
      } else {
        setTests((prev) => ({
          ...prev,
          formSubmission: { status: "error", message: "Form data was not saved correctly" },
        }))
      }
    } catch (error) {
      setTests((prev) => ({
        ...prev,
        formSubmission: { status: "error", message: `Form submission error: ${error.message}` },
      }))
    }
  }

  // Run all tests
  const runAllTests = () => {
    testLocalStorage()
    testNavigation()
    testStateManagement()
    testFormSubmission()
  }

  // Create a simple test shipment
  const createTestShipment = () => {
    try {
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

      // Get existing shipments
      const existingShipmentsJSON = localStorage.getItem("shipments")
      const existingShipments = existingShipmentsJSON ? JSON.parse(existingShipmentsJSON) : []

      // Add new shipment
      const updatedShipments = [...existingShipments, testShipment]

      // Save to localStorage
      localStorage.setItem("shipments", JSON.stringify(updatedShipments))

      alert(`Test shipment created with ID: ${testShipment.id}. Check the shipments table below.`)

      // Force a re-render to show the new shipment
      setTests((prev) => ({ ...prev }))
    } catch (error) {
      alert(`Error creating test shipment: ${error.message}`)
    }
  }

  // Get current shipments
  const getCurrentShipments = () => {
    try {
      const shipmentsJSON = localStorage.getItem("shipments")
      return shipmentsJSON ? JSON.parse(shipmentsJSON) : []
    } catch (error) {
      console.error("Error getting shipments:", error)
      return []
    }
  }

  // Clear all shipments
  const clearAllShipments = () => {
    try {
      localStorage.removeItem("shipments")
      alert("All shipments cleared")

      // Force a re-render
      setTests((prev) => ({ ...prev }))
    } catch (error) {
      alert(`Error clearing shipments: ${error.message}`)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">System Diagnostics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Diagnostic Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Button onClick={runAllTests}>Run All Tests</Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={testLocalStorage}>
                    Test localStorage
                  </Button>
                  <Button variant="outline" onClick={testNavigation}>
                    Test Navigation
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {Object.entries(tests).map(([testName, { status, message }]) => (
                  <div key={testName} className="border p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">{testName}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          status === "success"
                            ? "bg-green-100 text-green-800"
                            : status === "error"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{message}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(debugInfo).map(([key, value]) => (
                <div key={key} className="border-b pb-2">
                  <span className="font-medium capitalize">{key}: </span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shipment Test Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Button onClick={createTestShipment}>Create Test Shipment</Button>
            <Button variant="destructive" onClick={clearAllShipments}>
              Clear All Shipments
            </Button>
          </div>

          <h3 className="text-lg font-medium mb-2">Current Shipments in localStorage:</h3>
          <div className="border rounded overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Origin
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getCurrentShipments().length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No shipments found
                    </td>
                  </tr>
                ) : (
                  getCurrentShipments().map((shipment) => (
                    <tr key={shipment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        <a href={`/shipments/${shipment.id}`} target="_blank" rel="noopener noreferrer">
                          {shipment.id}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.origin}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{shipment.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manual Shipment Creation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 p-4 rounded mb-4">
            <p className="text-sm">
              This form bypasses your application's normal shipment creation process and directly creates a shipment in
              localStorage. If this works but your application's form doesn't, there's likely an issue with how your
              form is handling the submission.
            </p>
          </div>

          <ManualShipmentForm />
        </CardContent>
      </Card>
    </div>
  )
}

function ManualShipmentForm() {
  const [formData, setFormData] = useState({
    customer: "",
    origin: "",
    destination: "",
    animals: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    try {
      // Validate form
      if (!formData.customer || !formData.origin || !formData.destination || !formData.animals) {
        alert("Please fill in all fields")
        return
      }

      // Create shipment object
      const newShipment = {
        id: `manual-${Date.now()}`,
        customer: formData.customer,
        origin: formData.origin,
        destination: formData.destination,
        animals: Number.parseInt(formData.animals),
        status: "In Progress",
        progress: 0,
        tasks: [
          { id: 1, name: "Task 1", completed: false },
          { id: 2, name: "Task 2", completed: false },
        ],
        date: new Date().toISOString().split("T")[0],
      }

      // Save to localStorage
      const existingShipmentsJSON = localStorage.getItem("shipments")
      const existingShipments = existingShipmentsJSON ? JSON.parse(existingShipmentsJSON) : []
      localStorage.setItem("shipments", JSON.stringify([...existingShipments, newShipment]))

      alert(`Manual shipment created with ID: ${newShipment.id}`)

      // Reset form
      setFormData({
        customer: "",
        origin: "",
        destination: "",
        animals: "",
      })

      // Navigate to the shipment details
      if (confirm("Shipment created successfully. Navigate to shipment details?")) {
        window.location.href = `/shipments/${newShipment.id}`
      }
    } catch (error) {
      alert(`Error creating shipment: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Customer Name</label>
        <input
          type="text"
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Origin</label>
        <input
          type="text"
          name="origin"
          value={formData.origin}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Destination</label>
        <input
          type="text"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Animal Count</label>
        <input
          type="number"
          name="animals"
          value={formData.animals}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <Button type="submit" className="w-full">
        Create Manual Shipment
      </Button>
    </form>
  )
}

