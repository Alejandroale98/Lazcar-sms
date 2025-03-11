"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import { getTasksForShipmentType } from "../utils/shipment-tasks"

// Define types
export type Task = {
  id: string
  description: string
  completed: boolean
}

export type Shipment = {
  id: string
  origin: string
  destination: string
  status: string
  type: string
  animals?: string
  departureDate?: Date
  arrivalDate?: Date
  notes?: string
  tasks: Task[]
}

// Sample initial data
const initialShipments: Shipment[] = [
  {
    id: "SHP001",
    origin: "New York",
    destination: "Los Angeles",
    status: "in_transit",
    type: "domestic",
    animals: "Horses (3)",
    departureDate: new Date("2023-10-15"),
    arrivalDate: new Date("2023-10-20"),
    tasks: getTasksForShipmentType("domestic"),
  },
  {
    id: "SHP002",
    origin: "Chicago",
    destination: "Miami",
    status: "pending",
    type: "export",
    animals: "Cattle (10)",
    departureDate: new Date("2023-10-25"),
    tasks: getTasksForShipmentType("export"),
  },
  {
    id: "SHP003",
    origin: "Toronto",
    destination: "Vancouver",
    status: "delivered",
    type: "import",
    animals: "Pigs (15)",
    departureDate: new Date("2023-10-05"),
    arrivalDate: new Date("2023-10-10"),
    tasks: getTasksForShipmentType("import"),
  },
  {
    id: "SHP004",
    origin: "Seattle",
    destination: "Portland",
    status: "in_transit",
    type: "in_transit",
    animals: "Sheep (8)",
    departureDate: new Date("2023-10-18"),
    arrivalDate: new Date("2023-10-22"),
    tasks: getTasksForShipmentType("in_transit"),
  },
]

// Create context type
type ShipmentContextType = {
  shipments: Shipment[]
  accountingShipments: Shipment[]
  addShipment: (shipment: Omit<Shipment, "tasks">) => void
  updateShipment: (updatedShipment: Shipment) => void
  sendToAccounting: (shipment: Shipment) => void
  getShipmentById: (id: string) => Shipment | undefined
  updateShipmentTasks: (shipmentId: string, tasks: Task[]) => void
  getTasksForType: (type: string) => Task[]
}

// Create context with default values
const ShipmentContext = createContext<ShipmentContextType>({
  shipments: [],
  accountingShipments: [],
  addShipment: () => {},
  updateShipment: () => {},
  sendToAccounting: () => {},
  getShipmentById: () => undefined,
  updateShipmentTasks: () => {},
  getTasksForType: () => [],
})

// Create provider component
export const ShipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments)
  const [accountingShipments, setAccountingShipments] = useState<Shipment[]>([])

  const addShipment = (shipment: Omit<Shipment, "tasks">) => {
    const tasks = getTasksForShipmentType(shipment.type || "domestic")
    const newShipment = { ...shipment, tasks }
    setShipments((prev) => [newShipment, ...prev])
  }

  const updateShipment = (updatedShipment: Shipment) => {
    setShipments((prev) => prev.map((shipment) => (shipment.id === updatedShipment.id ? updatedShipment : shipment)))

    // Also update in accounting if present
    if (accountingShipments.some((s) => s.id === updatedShipment.id)) {
      setAccountingShipments((prev) =>
        prev.map((shipment) => (shipment.id === updatedShipment.id ? updatedShipment : shipment)),
      )
    }
  }

  const sendToAccounting = (shipment: Shipment) => {
    if (!accountingShipments.some((s) => s.id === shipment.id)) {
      setAccountingShipments((prev) => [...prev, shipment])
    }
  }

  const getShipmentById = (id: string) => {
    return shipments.find((s) => s.id === id)
  }

  const updateShipmentTasks = (shipmentId: string, tasks: Task[]) => {
    setShipments((prev) => prev.map((shipment) => (shipment.id === shipmentId ? { ...shipment, tasks } : shipment)))
  }

  const getTasksForType = (type: string) => {
    return getTasksForShipmentType(type)
  }

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        accountingShipments,
        addShipment,
        updateShipment,
        sendToAccounting,
        getShipmentById,
        updateShipmentTasks,
        getTasksForType,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  )
}

// Create custom hook for using the context
export const useShipments = () => useContext(ShipmentContext)

