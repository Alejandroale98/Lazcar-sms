"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdatedShipmentTable } from "./updated-shipment-table"
import { ShipmentForm } from "./shipment-form"
import { generateMockShipments } from "../utils/mock-data"
import { getTasksForShipmentType } from "../utils/shipment-tasks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, parse, startOfMonth, endOfMonth } from "date-fns"

export function Dashboard() {
  const [shipments, setShipments] = useState([])
  const [accountingShipments, setAccountingShipments] = useState([])
  const [activeTab, setActiveTab] = useState("overview")
  const [shipmentsSubTab, setShipmentsSubTab] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"))
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    // Load mock data
    const mockShipments = generateMockShipments(10).map((shipment) => ({
      ...shipment,
      tasks: getTasksForShipmentType(shipment.type),
    }))
    setShipments(mockShipments)
  }, [])

  const handleAddShipment = (newShipment) => {
    const shipmentWithId = {
      ...newShipment,
      id: `SH${Math.floor(Math.random() * 10000)}`,
      tasks: getTasksForShipmentType(newShipment.type),
    }
    setShipments([...shipments, shipmentWithId])
    setShowAddForm(false)
  }

  const handleUpdateShipment = (updatedShipment) => {
    setShipments(shipments.map((shipment) => (shipment.id === updatedShipment.id ? updatedShipment : shipment)))

    // Also update in accounting if present
    if (accountingShipments.some((s) => s.id === updatedShipment.id)) {
      setAccountingShipments(
        accountingShipments.map((shipment) => (shipment.id === updatedShipment.id ? updatedShipment : shipment)),
      )
    }
  }

  const handleSendToAccounting = (shipment) => {
    if (!accountingShipments.some((s) => s.id === shipment.id)) {
      setAccountingShipments([...accountingShipments, shipment])
    }
  }

  // Generate list of months (current year and previous year)
  const generateMonthOptions = () => {
    const options = []
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    // Add months for current year and previous year
    for (let year = currentYear; year >= currentYear - 1; year--) {
      for (let month = 11; month >= 0; month--) {
        const date = new Date(year, month, 1)
        options.push({
          value: format(date, "yyyy-MM"),
          label: format(date, "MMMM yyyy"),
        })
      }
    }

    return options
  }

  const monthOptions = generateMonthOptions()

  // Filter shipments for the selected month
  const filterShipmentsByMonth = (shipments, monthStr) => {
    if (!Array.isArray(shipments) || shipments.length === 0) return []

    try {
      const selectedDate = parse(monthStr, "yyyy-MM", new Date())
      const monthStart = startOfMonth(selectedDate)
      const monthEnd = endOfMonth(selectedDate)

      return shipments.filter((shipment) => {
        // Check if departure date falls within the selected month
        if (shipment.departureDate) {
          const departureDate = new Date(shipment.departureDate)
          return departureDate >= monthStart && departureDate <= monthEnd
        }
        return false
      })
    } catch (error) {
      console.error("Error filtering shipments by month:", error)
      return []
    }
  }

  const filteredShipments = filterShipmentsByMonth(shipments, selectedMonth)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h1 className="text-4xl font-bold text-red-500 mb-4">TEST HEADER - VERIFY UPDATES ARE WORKING</h1>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Shipments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments.filter((s) => s.status === "pending").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">In Transit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments.filter((s) => s.status === "in_transit").length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments.filter((s) => s.status === "delivered").length}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Recent Shipments</CardTitle>
                <CardDescription>Overview of your most recent animal shipments</CardDescription>
              </CardHeader>
              <CardContent>
                <UpdatedShipmentTable
                  shipments={shipments.slice(0, 5)}
                  onShipmentUpdate={handleUpdateShipment}
                  onSendToAccounting={handleSendToAccounting}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Manage Shipments</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {showAddForm ? "Cancel" : "Add Shipment"}
            </button>
          </div>

          {showAddForm && (
            <Card className="mb-4">
              <CardContent className="pt-6">
                <ShipmentForm onSubmit={handleAddShipment} onCancel={() => setShowAddForm(false)} />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <Tabs value={shipmentsSubTab} onValueChange={setShipmentsSubTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All Shipments</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {shipmentsSubTab === "all" && (
                <UpdatedShipmentTable
                  shipments={shipments}
                  onShipmentUpdate={handleUpdateShipment}
                  onSendToAccounting={handleSendToAccounting}
                />
              )}

              {shipmentsSubTab === "monthly" && (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        {monthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <UpdatedShipmentTable
                    shipments={filteredShipments}
                    onShipmentUpdate={handleUpdateShipment}
                    onSendToAccounting={handleSendToAccounting}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Accounting</CardTitle>
              <CardDescription>Manage financial aspects of your shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <UpdatedShipmentTable
                shipments={accountingShipments}
                onShipmentUpdate={handleUpdateShipment}
                hideAccountingButton={true}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

