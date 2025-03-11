import { format, addDays } from "date-fns"

export interface Task {
  id: string
  description: string
  completed: boolean
  deadline: string
  required: boolean
  category: "documentation" | "logistics" | "compliance" | "financial" | "operations"
}

export function getImportTasks(shipmentDate: string): Task[] {
  const baseDate = new Date(shipmentDate)

  return [
    {
      id: "import-1",
      description: "Obtain import permit from destination authorities",
      completed: false,
      deadline: format(addDays(baseDate, -30), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "import-2",
      description: "Schedule veterinary inspection at origin",
      completed: false,
      deadline: format(addDays(baseDate, -25), "yyyy-MM-dd"),
      required: true,
      category: "compliance",
    },
    {
      id: "import-3",
      description: "Complete health certification documentation",
      completed: false,
      deadline: format(addDays(baseDate, -20), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "import-4",
      description: "Book quarantine facility at destination",
      completed: false,
      deadline: format(addDays(baseDate, -15), "yyyy-MM-dd"),
      required: true,
      category: "logistics",
    },
    {
      id: "import-5",
      description: "Arrange customs clearance at destination",
      completed: false,
      deadline: format(addDays(baseDate, -10), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "import-6",
      description: "Confirm transportation from airport to facility",
      completed: false,
      deadline: format(addDays(baseDate, -7), "yyyy-MM-dd"),
      required: true,
      category: "logistics",
    },
    {
      id: "import-7",
      description: "Process import duty payment",
      completed: false,
      deadline: format(addDays(baseDate, -5), "yyyy-MM-dd"),
      required: true,
      category: "financial",
    },
    {
      id: "import-8",
      description: "Submit final veterinary documentation",
      completed: false,
      deadline: format(addDays(baseDate, -3), "yyyy-MM-dd"),
      required: true,
      category: "compliance",
    },
    {
      id: "import-9",
      description: "Confirm arrival handling arrangements",
      completed: false,
      deadline: format(addDays(baseDate, -2), "yyyy-MM-dd"),
      required: false,
      category: "operations",
    },
    {
      id: "import-10",
      description: "Schedule post-arrival inspection",
      completed: false,
      deadline: format(addDays(baseDate, -1), "yyyy-MM-dd"),
      required: false,
      category: "compliance",
    },
  ]
}

export function getExportTasks(shipmentDate: string): Task[] {
  const baseDate = new Date(shipmentDate)

  return [
    {
      id: "export-1",
      description: "Obtain export permit from origin authorities",
      completed: false,
      deadline: format(addDays(baseDate, -30), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "export-2",
      description: "Complete pre-export quarantine",
      completed: false,
      deadline: format(addDays(baseDate, -25), "yyyy-MM-dd"),
      required: true,
      category: "compliance",
    },
    {
      id: "export-3",
      description: "Schedule veterinary examination",
      completed: false,
      deadline: format(addDays(baseDate, -20), "yyyy-MM-dd"),
      required: true,
      category: "compliance",
    },
    {
      id: "export-4",
      description: "Prepare shipping documentation",
      completed: false,
      deadline: format(addDays(baseDate, -15), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "export-5",
      description: "Book air transport",
      completed: false,
      deadline: format(addDays(baseDate, -10), "yyyy-MM-dd"),
      required: true,
      category: "logistics",
    },
    {
      id: "export-6",
      description: "Arrange pre-flight handling",
      completed: false,
      deadline: format(addDays(baseDate, -7), "yyyy-MM-dd"),
      required: true,
      category: "operations",
    },
    {
      id: "export-7",
      description: "Process export fees",
      completed: false,
      deadline: format(addDays(baseDate, -5), "yyyy-MM-dd"),
      required: true,
      category: "financial",
    },
    {
      id: "export-8",
      description: "Confirm destination import requirements",
      completed: false,
      deadline: format(addDays(baseDate, -3), "yyyy-MM-dd"),
      required: true,
      category: "compliance",
    },
    {
      id: "export-9",
      description: "Prepare travel documentation",
      completed: false,
      deadline: format(addDays(baseDate, -2), "yyyy-MM-dd"),
      required: false,
      category: "documentation",
    },
    {
      id: "export-10",
      description: "Schedule departure inspection",
      completed: false,
      deadline: format(addDays(baseDate, -1), "yyyy-MM-dd"),
      required: false,
      category: "compliance",
    },
  ]
}

export function getInTransitTasks(shipmentDate: string): Task[] {
  const baseDate = new Date(shipmentDate)

  return [
    {
      id: "transit-1",
      description: "Obtain transit permits for all countries",
      completed: false,
      deadline: format(addDays(baseDate, -30), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "transit-2",
      description: "Plan route with rest stops",
      completed: false,
      deadline: format(addDays(baseDate, -25), "yyyy-MM-dd"),
      required: true,
      category: "logistics",
    },
    {
      id: "transit-3",
      description: "Book rest facilities",
      completed: false,
      deadline: format(addDays(baseDate, -20), "yyyy-MM-dd"),
      required: true,
      category: "logistics",
    },
    {
      id: "transit-4",
      description: "Arrange veterinary support along route",
      completed: false,
      deadline: format(addDays(baseDate, -15), "yyyy-MM-dd"),
      required: true,
      category: "operations",
    },
    {
      id: "transit-5",
      description: "Prepare border crossing documentation",
      completed: false,
      deadline: format(addDays(baseDate, -10), "yyyy-MM-dd"),
      required: true,
      category: "documentation",
    },
    {
      id: "transit-6",
      description: "Schedule border inspections",
      completed: false,
      deadline: format(addDays(baseDate, -7), "yyyy-MM-dd"),
      required: true,
      category: "compliance",
    },
    {
      id: "transit-7",
      description: "Process transit fees",
      completed: false,
      deadline: format(addDays(baseDate, -5), "yyyy-MM-dd"),
      required: true,
      category: "financial",
    },
    {
      id: "transit-8",
      description: "Confirm feeding schedule",
      completed: false,
      deadline: format(addDays(baseDate, -3), "yyyy-MM-dd"),
      required: true,
      category: "operations",
    },
    {
      id: "transit-9",
      description: "Prepare contingency routes",
      completed: false,
      deadline: format(addDays(baseDate, -2), "yyyy-MM-dd"),
      required: false,
      category: "logistics",
    },
    {
      id: "transit-10",
      description: "Set up GPS tracking",
      completed: false,
      deadline: format(addDays(baseDate, -1), "yyyy-MM-dd"),
      required: false,
      category: "operations",
    },
  ]
}

export function getTasksForShipmentType(type: string, shipmentDate: string): Task[] {
  switch (type.toLowerCase()) {
    case "import":
      return getImportTasks(shipmentDate)
    case "export":
      return getExportTasks(shipmentDate)
    case "in-transit":
      return getInTransitTasks(shipmentDate)
    default:
      return []
  }
}

