export type Task = {
  id: string
  description: string
  completed: boolean
}

// Helper to create a unique ID for each task
const createTaskId = () => `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const getTasksForShipmentType = (type: string): Task[] => {
  // Common tasks for all shipment types
  const commonTasks: Task[] = [
    { id: createTaskId(), description: "Prepare documentation", completed: false },
    { id: createTaskId(), description: "Schedule transport", completed: false },
  ]

  switch (type?.toLowerCase()) {
    case "import":
      return [
        ...commonTasks,
        { id: createTaskId(), description: "Customs clearance", completed: false },
        { id: createTaskId(), description: "Import inspection", completed: false },
        { id: createTaskId(), description: "Quarantine procedures", completed: false },
        { id: createTaskId(), description: "Confirm receipt", completed: false },
      ]
    case "export":
      return [
        ...commonTasks,
        { id: createTaskId(), description: "Export permits", completed: false },
        { id: createTaskId(), description: "Health certificates", completed: false },
        { id: createTaskId(), description: "Pre-export inspection", completed: false },
        { id: createTaskId(), description: "Shipping confirmation", completed: false },
      ]
    case "in_transit":
    case "in-transit":
      return [
        ...commonTasks,
        { id: createTaskId(), description: "Transit monitoring", completed: false },
        { id: createTaskId(), description: "Check welfare conditions", completed: false },
        { id: createTaskId(), description: "Route confirmation", completed: false },
        { id: createTaskId(), description: "Arrival notification", completed: false },
      ]
    default:
      return [
        ...commonTasks,
        { id: createTaskId(), description: "Notify recipient", completed: false },
        { id: createTaskId(), description: "Confirm delivery", completed: false },
      ]
  }
}

