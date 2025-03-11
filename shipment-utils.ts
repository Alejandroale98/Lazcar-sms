import { v4 as uuidv4 } from "uuid"
import { type ShipmentTask, getTaskTemplateByType } from "./data/task-templates"

// Get the next shipment number for a specific type
export function generateShipmentNumber(type: string): string {
  // Normalize the type to lowercase for comparison
  const normalizedType = type.toLowerCase()

  // Get the current counters from localStorage
  let counters = { import: 1, export: 1, "in-transit": 1 }

  if (typeof window !== "undefined") {
    const savedCounters = localStorage.getItem("shipmentCounters")
    if (savedCounters) {
      counters = JSON.parse(savedCounters)
    }
  }

  // Get the current counter for this type
  const counter = counters[normalizedType as keyof typeof counters] || 1

  // Format the shipment number based on type
  let prefix = ""
  switch (normalizedType) {
    case "import":
      prefix = "IMPORT"
      break
    case "export":
      prefix = "EXPORT"
      break
    case "in-transit":
      prefix = "TRANSIT"
      break
    default:
      prefix = normalizedType.toUpperCase()
  }

  // Create the shipment number with padded counter
  const shipmentNumber = `${prefix}-${counter.toString().padStart(3, "0")}`

  // Increment the counter for next time
  counters[normalizedType as keyof typeof counters] = counter + 1

  // Save the updated counters
  if (typeof window !== "undefined") {
    localStorage.setItem("shipmentCounters", JSON.stringify(counters))
  }

  return shipmentNumber
}

// Get tasks for a specific shipment type
export function getTasksForShipmentType(type: string): ShipmentTask[] {
  // Check if there are custom tasks defined
  if (typeof window !== "undefined") {
    const customTasks = localStorage.getItem("customShipmentTasks")
    if (customTasks) {
      const parsedTasks = JSON.parse(customTasks)
      const normalizedType = type.toLowerCase()

      // If we have custom tasks for this type, use them
      if (parsedTasks[normalizedType] && Array.isArray(parsedTasks[normalizedType])) {
        // Ensure each task has a unique ID
        return parsedTasks[normalizedType].map((task: Partial<ShipmentTask>) => ({
          id: task.id || uuidv4(),
          title: task.title || "Untitled Task",
          description: task.description || "",
          status: task.status || "pending",
          files: task.files || [],
        }))
      }
    }
  }

  // Fall back to default templates if no custom tasks are defined
  return getTaskTemplateByType(type)
}

// Save custom tasks for a shipment type
export function saveCustomTasks(type: string, tasks: ShipmentTask[]): void {
  if (typeof window !== "undefined") {
    // Get existing custom tasks
    const customTasks = localStorage.getItem("customShipmentTasks")
    const parsedTasks = customTasks ? JSON.parse(customTasks) : {}

    // Update tasks for this type
    parsedTasks[type.toLowerCase()] = tasks

    // Save back to localStorage
    localStorage.setItem("customShipmentTasks", JSON.stringify(parsedTasks))
  }
}

// Get all custom tasks
export function getAllCustomTasks(): Record<string, ShipmentTask[]> {
  if (typeof window !== "undefined") {
    const customTasks = localStorage.getItem("customShipmentTasks")
    return customTasks ? JSON.parse(customTasks) : {}
  }
  return {}
}

// Reset custom tasks to defaults
export function resetTasksToDefault(type: string): ShipmentTask[] {
  const defaultTasks = getTaskTemplateByType(type)
  saveCustomTasks(type, defaultTasks)
  return defaultTasks
}

