export type ShipmentType = "Import" | "Export" | "In-Transit"
export type ShipmentStatus = "Pending" | "In Progress" | "Completed" | "Delayed" | "Cancelled"

export interface Task {
  id: string
  name: string
  description: string
  category: string
  completed: boolean
  dueDate?: string
  overdue?: boolean
  required: boolean
  emailRecipients?: string[]
  files?: {
    name: string
    url: string
    uploadedAt: string
  }[]
}

export interface TaskTemplate {
  id: string
  name: string
  description: string
  shipmentType: ShipmentType
  tasks: Omit<Task, "id" | "completed" | "overdue">[]
}

export interface Shipment {
  id: string
  shipmentNumber?: string
  type: ShipmentType
  status: ShipmentStatus
  route: string
  animalType: string
  animalCount: number
  departureDate: string
  agents: string[]
  tasks: Task[]
  originCountry?: string
  destinationCountry?: string
  originAirport?: string
  destinationAirport?: string
  createdAt?: string
  horseName?: string
  ownerName?: string
  animals?: { type: string; count: number }[]
  history?: any[]
}

export interface Agent {
  id: string
  name: string
  email: string
  phone: string
  role: string
  status: "Active" | "Inactive"
  shipmentIds: string[]
  country?: string
  city?: string
  telephone?: string
  address?: string
}

export interface Horse {
  id: string
  name: string
  breed: string
  color: string
  sex: string
  age: number
  microchip: string
  shipmentIds: string[]
}

export interface Owner {
  id: string
  name: string
  email: string
  phone: string
  address: string
  shipmentIds: string[]
  country?: string
  city?: string
  telephone?: string
}

export interface Database {
  horses: Horse[]
  owners: Owner[]
  agents: Agent[]
  shipments: Shipment[]
  customers: any[]
  shipmentRequests: any[]
  pendingRequests?: number
}

