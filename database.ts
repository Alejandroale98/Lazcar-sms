"use client"

import type { Database, Shipment, Agent } from "@/lib/types"
import { v4 as uuidv4 } from "uuid"
import type { ShipmentTask } from "./data/task-templates"

// Initialize or get database
export function getDatabase(): Database {
  const data = localStorage.getItem("shipping_database")
  if (!data) {
    const initialData: Database = {
      horses: [],
      owners: [],
      agents: [],
      shipments: [],
      customers: [],
      shipmentRequests: [],
    }
    localStorage.setItem("shipping_database", JSON.stringify(initialData))
    return initialData
  }
  return JSON.parse(data)
}

// Save database
function saveDatabase(database: Database) {
  localStorage.setItem("shipping_database", JSON.stringify(database))
}

// Add a new shipment
export function addShipment(shipmentData: Shipment): Shipment {
  const db = getDatabase()

  // Add created timestamp if not present
  if (!shipmentData.createdAt) {
    shipmentData.createdAt = new Date().toISOString()
  }

  // Add the shipment to the database
  db.shipments.push(shipmentData)

  // Update horse, owner, and agent shipmentIds
  if (shipmentData.horseName) {
    const horse = db.horses.find((h) => h.name === shipmentData.horseName)
    if (horse) {
      horse.shipmentIds.push(shipmentData.id)
    }
  }
  if (shipmentData.ownerName) {
    const owner = db.owners.find((o) => o.name === shipmentData.ownerName)
    if (owner) {
      owner.shipmentIds.push(shipmentData.id)
    }
  }
  if (shipmentData.agents) {
    shipmentData.agents.forEach((agent) => {
      const existingAgent = db.agents.find((a) => a.name === agent.name)
      if (existingAgent) {
        if (!existingAgent.shipmentIds) {
          existingAgent.shipmentIds = []
        }
        existingAgent.shipmentIds.push(shipmentData.id)
      }
    })
  }

  saveDatabase(db)
  return shipmentData
}

// Get shipments for a specific date and type
export function getShipmentsByDateAndType(date: string, type: string): Shipment[] {
  const db = getDatabase()
  return db.shipments.filter((shipment) => shipment.date === date && shipment.type.toLowerCase() === type.toLowerCase())
}

// Get entity's shipments
export function getEntityShipments(entityType: "horse" | "owner" | "agent", entityId: string): Shipment[] {
  const db = getDatabase()
  let entity
  if (entityType === "horse") {
    entity = db.horses.find((e) => e.id === entityId)
  } else if (entityType === "owner") {
    entity = db.owners.find((e) => e.id === entityId)
  } else {
    entity = db.agents.find((e) => e.id === entityId)
  }
  if (!entity) return []
  return entity.shipmentIds.map((id) => db.shipments.find((s) => s.id === id)).filter(Boolean) as Shipment[]
}

export function saveShipmentRequest(shipment: any): string | null {
  const db = getDatabase()
  const newShipmentId = uuidv4()
  db.shipmentRequests.push({ id: newShipmentId, ...shipment })
  saveDatabase(db)
  return newShipmentId
}

export function getShipmentById(id: string): Shipment | null {
  const db = getDatabase()
  return db.shipments.find((s) => s.id === id) || null
}

export function getShipments(): Shipment[] {
  const db = getDatabase()
  return db.shipments
}

export function updateShipmentTask(
  shipmentId: string,
  taskId: string,
  updates: Partial<ShipmentTask>,
): Shipment | null {
  const db = getDatabase()
  const shipmentIndex = db.shipments.findIndex((s) => s.id === shipmentId)

  if (shipmentIndex === -1) {
    console.log("Shipment not found")
    return null
  }

  const taskIndex = db.shipments[shipmentIndex].tasks?.findIndex((t) => t.id === taskId) ?? -1

  if (taskIndex === -1) {
    console.log("Task not found")
    return null
  }

  // Create a new task object with the updated properties
  const updatedTask = {
    ...db.shipments[shipmentIndex].tasks![taskIndex],
    ...updates,
  }

  // Create a new tasks array with the updated task
  const updatedTasks = [
    ...db.shipments[shipmentIndex].tasks!.slice(0, taskIndex),
    updatedTask,
    ...db.shipments[shipmentIndex].tasks!.slice(taskIndex + 1),
  ]

  // Create a new shipment object with the updated tasks array
  const updatedShipment = {
    ...db.shipments[shipmentIndex],
    tasks: updatedTasks,
  }

  db.shipments[shipmentIndex] = updatedShipment
  saveDatabase(db)
  return updatedShipment
}

// Add a file to a task
export function addFileToTask(
  shipmentId: string,
  taskId: string,
  file: { name: string; url: string; uploadedAt: string },
): Shipment | null {
  const db = getDatabase()
  const shipmentIndex = db.shipments.findIndex((s) => s.id === shipmentId)

  if (shipmentIndex === -1) {
    console.log("Shipment not found")
    return null
  }

  const taskIndex = db.shipments[shipmentIndex].tasks?.findIndex((t) => t.id === taskId) ?? -1

  if (taskIndex === -1) {
    console.log("Task not found")
    return null
  }

  // Initialize files array if it doesn't exist
  if (!db.shipments[shipmentIndex].tasks![taskIndex].files) {
    db.shipments[shipmentIndex].tasks![taskIndex].files = []
  }

  // Add the file to the task
  const updatedTask = {
    ...db.shipments[shipmentIndex].tasks![taskIndex],
    files: [...(db.shipments[shipmentIndex].tasks![taskIndex].files || []), file],
  }

  // Create a new tasks array with the updated task
  const updatedTasks = [
    ...db.shipments[shipmentIndex].tasks!.slice(0, taskIndex),
    updatedTask,
    ...db.shipments[shipmentIndex].tasks!.slice(taskIndex + 1),
  ]

  // Create a new shipment object with the updated tasks array
  const updatedShipment = {
    ...db.shipments[shipmentIndex],
    tasks: updatedTasks,
  }

  db.shipments[shipmentIndex] = updatedShipment
  saveDatabase(db)
  return updatedShipment
}

// Remove a file from a task
export function removeFileFromTask(shipmentId: string, taskId: string, fileName: string): Shipment | null {
  const db = getDatabase()
  const shipmentIndex = db.shipments.findIndex((s) => s.id === shipmentId)

  if (shipmentIndex === -1) {
    console.log("Shipment not found")
    return null
  }

  const taskIndex = db.shipments[shipmentIndex].tasks?.findIndex((t) => t.id === taskId) ?? -1

  if (taskIndex === -1 || !db.shipments[shipmentIndex].tasks![taskIndex].files) {
    console.log("Task not found or no files")
    return null
  }

  // Filter out the file to remove
  const updatedFiles = db.shipments[shipmentIndex].tasks![taskIndex].files!.filter((file) => file.name !== fileName)

  // Create a new task object with the updated files
  const updatedTask = {
    ...db.shipments[shipmentIndex].tasks![taskIndex],
    files: updatedFiles,
  }

  // Create a new tasks array with the updated task
  const updatedTasks = [
    ...db.shipments[shipmentIndex].tasks!.slice(0, taskIndex),
    updatedTask,
    ...db.shipments[shipmentIndex].tasks!.slice(taskIndex + 1),
  ]

  // Create a new shipment object with the updated tasks array
  const updatedShipment = {
    ...db.shipments[shipmentIndex],
    tasks: updatedTasks,
  }

  db.shipments[shipmentIndex] = updatedShipment
  saveDatabase(db)
  return updatedShipment
}

export function getSavedAgents(): Agent[] {
  const db = getDatabase()
  return db.agents
}

// Update task email recipients
export function updateTaskEmailRecipients(shipmentId: string, taskId: string, emails: string[]): Shipment | null {
  const db = getDatabase()
  const shipmentIndex = db.shipments.findIndex((s) => s.id === shipmentId)

  if (shipmentIndex === -1) {
    console.log("Shipment not found")
    return null
  }

  const taskIndex = db.shipments[shipmentIndex].tasks?.findIndex((t) => t.id === taskId) ?? -1

  if (taskIndex === -1) {
    console.log("Task not found")
    return null
  }

  // Create a new task object with the updated email recipients
  const updatedTask = {
    ...db.shipments[shipmentIndex].tasks![taskIndex],
    emailRecipients: emails,
  }

  // Create a new tasks array with the updated task
  const updatedTasks = [
    ...db.shipments[shipmentIndex].tasks!.slice(0, taskIndex),
    updatedTask,
    ...db.shipments[shipmentIndex].tasks!.slice(taskIndex + 1),
  ]

  // Create a new shipment object with the updated tasks array
  const updatedShipment = {
    ...db.shipments[shipmentIndex],
    tasks: updatedTasks,
  }

  db.shipments[shipmentIndex] = updatedShipment
  saveDatabase(db)
  return updatedShipment
}

// Simulate sending a file to emails
export function sendFileToEmails(shipmentId: string, taskId: string, fileName: string, emails: string[]): boolean {
  // In a real app, this would send the file to the backend
  // For this demo, we'll just simulate a successful send
  console.log(`Sending ${fileName} to ${emails.join(", ")}`)

  // Store this as an activity in the shipment history
  const db = getDatabase()
  const shipment = db.shipments.find((s) => s.id === shipmentId)

  if (!shipment) return false

  // Initialize history if it doesn't exist
  if (!shipment.history) {
    shipment.history = []
  }

  // Add the email activity to history
  shipment.history.push({
    id: uuidv4(),
    type: "email",
    description: `Sent ${fileName} to ${emails.length} recipient(s)`,
    timestamp: new Date().toISOString(),
    details: {
      fileName,
      recipients: emails,
    },
  })

  // Save the updated shipment
  const shipmentIndex = db.shipments.findIndex((s) => s.id === shipmentId)
  db.shipments[shipmentIndex] = shipment
  saveDatabase(db)

  return true
}

export type Customer = {
  id: string
  name: string
  email: string
  phone: string
}

export interface HorseInfo {
  name: string
  id: string
}

