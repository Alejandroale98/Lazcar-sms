"use client"

// Define types
export interface ShipmentTask {
  id: string
  title: string
  completed: boolean
}

export interface AnimalDetails {
  id: string
  name: string
  type: string
  breed: string
  color: string
  age: string
  sex: string
  microchip: string
  hasPassport: boolean
  finalDestination: string
  requiresTransportation: boolean
  notes: string
}

export interface ContactInfo {
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  email: string
}

export interface Shipment {
  id: string
  number?: string
  shipmentNumber?: string
  type: string
  origin: string
  destination: string
  date: string
  client: string
  description?: string
  status: string
  created?: string
  createdAt?: string
  animals?: Array<{ type: string; quantity?: string; count?: string; id?: string }>
  animalType?: string
  numAnimals?: number
  tasks: ShipmentTask[]
  animalDetails?: AnimalDetails[]
  shipper?: ContactInfo
  consignee?: ContactInfo
  issuingAgent?: ContactInfo
  shippingDate?: string
  shipmentType?: string
}

// Get all shipments
export function getShipmentsFromLocalStorage(): Shipment[] {
  if (typeof window === "undefined") return []

  const shipments = localStorage.getItem("shipments")
  return shipments ? JSON.parse(shipments) : []
}

// Get shipment by ID
export function getShipmentById(id: string): Shipment | null {
  const shipments = getShipmentsFromLocalStorage()
  return shipments.find((shipment) => shipment.id === id) || null
}

// Update shipment
export function updateShipmentInLocalStorage(updatedShipment: Shipment): void {
  const shipments = getShipmentsFromLocalStorage()
  const index = shipments.findIndex((shipment) => shipment.id === updatedShipment.id)

  if (index !== -1) {
    shipments[index] = updatedShipment
    localStorage.setItem("shipments", JSON.stringify(shipments))
  }
}

// Add new shipment
export function addShipmentToLocalStorage(shipment: Shipment): void {
  const shipments = getShipmentsFromLocalStorage()
  shipments.push(shipment)
  localStorage.setItem("shipments", JSON.stringify(shipments))
}

// Delete shipment
export function deleteShipmentFromLocalStorage(id: string): void {
  const shipments = getShipmentsFromLocalStorage()
  const filteredShipments = shipments.filter((shipment) => shipment.id !== id)
  localStorage.setItem("shipments", JSON.stringify(filteredShipments))
}

// Get all shipments
export function getAllShipments(): Shipment[] {
  return getShipmentsFromLocalStorage()
}

