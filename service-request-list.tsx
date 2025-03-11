"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ServiceRequestDetail } from "@/components/service-request-detail"

// Sample data - in a real app, this would come from an API or database
const sampleRequests = [
  {
    id: "SR-2025-001",
    title: "Shipment documentation issue for export to Brazil",
    description:
      "Customer reported missing health certificates for livestock shipment #LS-2025-042 scheduled for next week.",
    status: "open",
    priority: "high",
    type: "documentation",
    createdBy: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: {
      id: "3",
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2025-04-02T14:30:00Z",
    updatedAt: "2025-04-02T16:45:00Z",
    comments: [
      {
        id: "c1",
        text: "I've contacted the veterinary office to request expedited processing of the certificates.",
        author: "Taylor Kim",
        timestamp: "2025-04-02T15:20:00Z",
      },
      {
        id: "c2",
        text: "Customer has been notified of the delay. They need the documents by Friday at the latest.",
        author: "Alex Johnson",
        timestamp: "2025-04-02T16:45:00Z",
      },
    ],
  },
  {
    id: "SR-2025-002",
    title: "Urgent: Temperature control malfunction for horse transport",
    description:
      "Temperature monitoring system showing fluctuations in trailer #T-103 scheduled for tomorrow's shipment of 4 racehorses.",
    status: "in-progress",
    priority: "urgent",
    type: "logistics",
    createdBy: {
      id: "2",
      name: "Sam Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: {
      id: "4",
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2025-04-01T09:15:00Z",
    updatedAt: "2025-04-02T11:30:00Z",
    comments: [
      {
        id: "c3",
        text: "Technician dispatched to inspect the system. ETA 2 hours.",
        author: "Jordan Smith",
        timestamp: "2025-04-01T10:00:00Z",
      },
      {
        id: "c4",
        text: "Backup trailer #T-107 being prepared as a contingency.",
        author: "Sam Wilson",
        timestamp: "2025-04-01T11:30:00Z",
      },
    ],
  },
  {
    id: "SR-2025-003",
    title: "Import permit verification for cattle shipment",
    description: "Need verification of import permits for 120 head of cattle arriving from Canada next Monday.",
    status: "open",
    priority: "medium",
    type: "customs",
    createdBy: {
      id: "5",
      name: "Casey Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: {
      id: "1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2025-04-02T08:00:00Z",
    updatedAt: "2025-04-02T08:00:00Z",
    comments: [],
  },
  {
    id: "SR-2025-004",
    title: "Health inspection scheduling for export shipment",
    description: "Need to schedule USDA health inspection for 200 sheep being exported to Mexico on April 15.",
    status: "open",
    priority: "medium",
    type: "animal-health",
    createdBy: {
      id: "3",
      name: "Taylor Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    assignedTo: {
      id: "4",
      name: "Jordan Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    createdAt: "2025-04-01T13:45:00Z",
    updatedAt: "2025-04-01T13:45:00Z",
    comments: [],
  },
]

type ServiceRequestListProps = {
  type: "created" | "assigned" | "all"
}

export function ServiceRequestList({ type }: ServiceRequestListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  // Filter requests based on type prop
  let filteredRequests = sampleRequests

  if (type === "created") {
    filteredRequests = sampleRequests.filter((req) => req.createdBy.id === "1") // Assuming current user is "1"
  } else if (type === "assigned") {
    filteredRequests = sampleRequests.filter((req) => req.assignedTo.id === "1") // Assuming current user is "1"
  }

  // Apply search and filters
  filteredRequests = filteredRequests.filter((req) => {
    const matchesSearch =
      searchTerm === "" ||
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || req.status === statusFilter
    const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // If a request is selected, show its details
  if (selectedRequest) {
    const request = sampleRequests.find((req) => req.id === selectedRequest)
    if (request) {
      return <ServiceRequestDetail request={request} onBack={() => setSelectedRequest(null)} />
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          placeholder="Search by ID or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredRequests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg font-medium">No service requests found</p>
          <p className="text-muted-foreground">Try adjusting your filters or create a new request</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base font-medium">{request.title}</CardTitle>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{request.id}</span>
                  <span>•</span>
                  <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge
                    variant={request.status === "resolved" || request.status === "closed" ? "outline" : "default"}
                    className={
                      request.status === "open"
                        ? "bg-blue-500"
                        : request.status === "in-progress"
                          ? "bg-amber-500"
                          : request.status === "pending"
                            ? "bg-purple-500"
                            : request.status === "resolved"
                              ? "bg-green-500"
                              : "bg-gray-500"
                    }
                  >
                    {request.status.replace("-", " ")}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      request.priority === "low"
                        ? "border-green-500 text-green-500"
                        : request.priority === "medium"
                          ? "border-blue-500 text-blue-500"
                          : request.priority === "high"
                            ? "border-amber-500 text-amber-500"
                            : "border-red-500 text-red-500"
                    }
                  >
                    {request.priority}
                  </Badge>
                  <Badge variant="outline">{request.type.replace("-", " ")}</Badge>
                </div>
                <p className="text-sm line-clamp-2">{request.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={request.assignedTo.avatar} alt={request.assignedTo.name} />
                    <AvatarFallback>{request.assignedTo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Assigned to {request.assignedTo.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRequest(request.id)}>
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

