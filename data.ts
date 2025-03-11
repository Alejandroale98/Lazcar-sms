import type { Shipment, Agent, TaskTemplate } from "./types"

// Task templates for different shipment types
export const taskTemplates: TaskTemplate[] = [
  {
    id: "1",
    name: "Standard Import Process",
    description: "Default tasks for animal imports",
    shipmentType: "Import",
    tasks: [
      {
        name: "Import Permit Application",
        description: "Submit application for import permit to relevant authorities",
        category: "Documentation",
        required: true,
      },
      {
        name: "Health Certificate",
        description: "Obtain health certificate from origin country",
        category: "Documentation",
        required: true,
      },
      {
        name: "Quarantine Arrangements",
        description: "Arrange quarantine facilities for animals upon arrival",
        category: "Logistics",
        required: true,
      },
      {
        name: "Customs Clearance",
        description: "Prepare documents for customs clearance",
        category: "Documentation",
        required: true,
      },
      {
        name: "Transportation Booking",
        description: "Book appropriate transportation from port to destination",
        category: "Logistics",
        required: true,
      },
      {
        name: "Veterinary Inspection",
        description: "Schedule veterinary inspection upon arrival",
        category: "Compliance",
        required: true,
      },
      {
        name: "Import Duties Payment",
        description: "Process payment for import duties and taxes",
        category: "Accounting",
        required: true,
      },
    ],
  },
  {
    id: "2",
    name: "Standard Export Process",
    description: "Default tasks for animal exports",
    shipmentType: "Export",
    tasks: [
      {
        name: "Export Permit Application",
        description: "Submit application for export permit",
        category: "Documentation",
        required: true,
      },
      {
        name: "Destination Country Requirements",
        description: "Verify and fulfill destination country import requirements",
        category: "Compliance",
        required: true,
      },
      {
        name: "Pre-Export Quarantine",
        description: "Arrange pre-export quarantine if required",
        category: "Logistics",
        required: true,
      },
      {
        name: "Health Certificate",
        description: "Obtain health certificate from local authorities",
        category: "Documentation",
        required: true,
      },
      {
        name: "Transportation Booking",
        description: "Book appropriate transportation to port and international carrier",
        category: "Logistics",
        required: true,
      },
      {
        name: "Export Documentation",
        description: "Prepare all required export documentation",
        category: "Documentation",
        required: true,
      },
    ],
  },
  {
    id: "3",
    name: "In-Transit Process",
    description: "Default tasks for animals in transit",
    shipmentType: "In-Transit",
    tasks: [
      {
        name: "Transit Permit",
        description: "Obtain transit permits for all countries in route",
        category: "Documentation",
        required: true,
      },
      {
        name: "Route Planning",
        description: "Plan optimal route with appropriate rest stops",
        category: "Logistics",
        required: true,
      },
      {
        name: "Animal Welfare Checks",
        description: "Schedule regular welfare checks during transit",
        category: "Compliance",
        required: true,
      },
      {
        name: "Feeding Schedule",
        description: "Prepare feeding schedule for duration of transit",
        category: "Logistics",
        required: true,
      },
      {
        name: "Border Crossing Documentation",
        description: "Prepare documentation for each border crossing",
        category: "Documentation",
        required: true,
      },
    ],
  },
]

// Generate tasks for a shipment based on its type
function generateTasksForShipment(shipmentType: "Import" | "Export" | "In-Transit", departureDate: string): any[] {
  const template = taskTemplates.find((t) => t.shipmentType === shipmentType)
  if (!template) return []

  const departureTimestamp = new Date(departureDate).getTime()
  const now = new Date().getTime()

  return template.tasks.map((task, index) => {
    // Generate due dates relative to departure date
    const daysBeforeDeparture = 14 - index * 2 // Spread tasks out
    const dueDate = new Date(departureTimestamp - daysBeforeDeparture * 24 * 60 * 60 * 1000)
    const dueDateStr = dueDate.toISOString().split("T")[0]

    return {
      id: `task-${Math.random().toString(36).substr(2, 9)}`,
      name: task.name,
      description: task.description,
      category: task.category,
      completed: Math.random() > 0.6, // Randomly mark some as completed
      dueDate: dueDateStr,
      overdue: dueDate.getTime() < now && Math.random() > 0.5, // Some overdue if due date has passed
      required: task.required,
    }
  })
}

// Sample shipment data
export const shipments: Shipment[] = [
  {
    id: "SHP-001",
    type: "Import",
    status: "In Progress",
    route: "Australia to USA",
    animalType: "Cattle",
    animalCount: 150,
    departureDate: "2025-03-15",
    agents: ["John Doe", "Jane Smith"],
    tasks: generateTasksForShipment("Import", "2025-03-15"),
  },
  {
    id: "SHP-002",
    type: "Export",
    status: "Pending",
    route: "USA to Canada",
    animalType: "Horses",
    animalCount: 12,
    departureDate: "2025-03-20",
    agents: ["Robert Johnson"],
    tasks: generateTasksForShipment("Export", "2025-03-20"),
  },
  {
    id: "SHP-003",
    type: "In-Transit",
    status: "Completed",
    route: "Mexico to USA",
    animalType: "Sheep",
    animalCount: 200,
    departureDate: "2025-03-05",
    agents: ["Maria Garcia", "David Wilson"],
    tasks: generateTasksForShipment("In-Transit", "2025-03-05"),
  },
  {
    id: "SHP-004",
    type: "Import",
    status: "Delayed",
    route: "New Zealand to USA",
    animalType: "Cattle",
    animalCount: 80,
    departureDate: "2025-03-12",
    agents: ["Sarah Brown"],
    tasks: generateTasksForShipment("Import", "2025-03-12"),
  },
  {
    id: "SHP-005",
    type: "Export",
    status: "In Progress",
    route: "USA to Japan",
    animalType: "Pigs",
    animalCount: 300,
    departureDate: "2025-03-18",
    agents: ["Michael Lee", "Jennifer Adams"],
    tasks: generateTasksForShipment("Export", "2025-03-18"),
  },
  {
    id: "SHP-006",
    type: "In-Transit",
    status: "Pending",
    route: "Canada to Mexico",
    animalType: "Goats",
    animalCount: 150,
    departureDate: "2025-03-25",
    agents: ["Thomas Moore"],
    tasks: generateTasksForShipment("In-Transit", "2025-03-25"),
  },
  {
    id: "SHP-007",
    type: "Import",
    status: "In Progress",
    route: "Brazil to USA",
    animalType: "Exotic Birds",
    animalCount: 50,
    departureDate: "2025-03-14",
    agents: ["Lisa Chen", "Kevin Patel"],
    tasks: generateTasksForShipment("Import", "2025-03-14"),
  },
  {
    id: "SHP-008",
    type: "Export",
    status: "Completed",
    route: "USA to UK",
    animalType: "Horses",
    animalCount: 8,
    departureDate: "2025-03-02",
    agents: ["Amanda White"],
    tasks: generateTasksForShipment("Export", "2025-03-02"),
  },
  {
    id: "SHP-009",
    type: "In-Transit",
    status: "In Progress",
    route: "USA to Germany",
    animalType: "Dogs",
    animalCount: 25,
    departureDate: "2025-03-17",
    agents: ["Daniel Brown", "Emily Johnson"],
    tasks: generateTasksForShipment("In-Transit", "2025-03-17"),
  },
  {
    id: "SHP-010",
    type: "Import",
    status: "Pending",
    route: "Thailand to USA",
    animalType: "Elephants",
    animalCount: 2,
    departureDate: "2025-03-30",
    agents: ["Richard Davis", "Susan Miller"],
    tasks: generateTasksForShipment("Import", "2025-03-30"),
  },
]

// Sample agent data
export const agents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Agent",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    role: "Import Specialist",
    status: "Active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    role: "Export Specialist",
    status: "Active",
  },
  {
    id: "4",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+1 (555) 789-0123",
    role: "Logistics Coordinator",
    status: "Active",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 234-5678",
    role: "Compliance Officer",
    status: "Inactive",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "+1 (555) 876-5432",
    role: "Senior Agent",
    status: "Active",
  },
  {
    id: "7",
    name: "Michael Lee",
    email: "michael.lee@example.com",
    phone: "+1 (555) 345-6789",
    role: "Import Specialist",
    status: "Active",
  },
  {
    id: "8",
    name: "Jennifer Adams",
    email: "jennifer.adams@example.com",
    phone: "+1 (555) 654-3210",
    role: "Export Specialist",
    status: "Active",
  },
]

