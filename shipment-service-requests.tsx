"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  FileIcon,
  PaperclipIcon,
  SendIcon,
  DownloadIcon,
  PlusIcon,
  MessageSquareIcon,
  FileTextIcon,
} from "lucide-react"

// Types for the component
interface ServiceRequest {
  id: number
  title: string
  description: string
  priority: "High" | "Medium" | "Low"
  status: "Open" | "In Progress" | "Completed" | "Cancelled"
  date: string
  progress: number
  documents: number[]
  requester: {
    name: string
    avatar: string
    initials: string
    type: "Customer" | "Internal"
  }
  messages: {
    id: number
    sender: string
    senderType: "Customer" | "Internal"
    text: string
    timestamp: string
  }[]
}

interface Document {
  id: number
  name: string
  size: string
  uploadedBy: string
  uploadDate: string
  status: "Approved" | "Pending Review" | "Rejected"
  shipmentId: string
}

interface ShipmentServiceRequestsProps {
  shipmentId: string
  shipmentTitle: string
  isCustomerView?: boolean
}

// Sample documents data
const documents: Document[] = [
  {
    id: 1,
    name: "Health Certificate.pdf",
    size: "2.4 MB",
    uploadedBy: "Customer",
    uploadDate: "March 5, 2025",
    status: "Approved",
    shipmentId: "SH-2025-0001",
  },
  {
    id: 2,
    name: "Import Permit.pdf",
    size: "1.8 MB",
    uploadedBy: "Agent",
    uploadDate: "March 4, 2025",
    status: "Pending Review",
    shipmentId: "SH-2025-0001",
  },
  {
    id: 3,
    name: "Vaccination Records.pdf",
    size: "3.2 MB",
    uploadedBy: "Customer",
    uploadDate: "March 3, 2025",
    status: "Approved",
    shipmentId: "SH-2025-0002",
  },
  {
    id: 4,
    name: "Transport Authorization.pdf",
    size: "1.5 MB",
    uploadedBy: "Agent",
    uploadDate: "March 6, 2025",
    status: "Pending Review",
    shipmentId: "SH-2025-0003",
  },
]

// Sample service requests data
const serviceRequestsData: ServiceRequest[] = [
  {
    id: 1,
    title: "Veterinary Inspection",
    description: "Need veterinary inspection for 12 horses arriving from Canada on March 15.",
    priority: "High",
    status: "Open",
    date: "March 7, 2025",
    progress: 25,
    documents: [1, 2],
    requester: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      type: "Customer",
    },
    messages: [
      {
        id: 1,
        sender: "Emily Wilson",
        senderType: "Customer",
        text: "Please confirm if the veterinary inspection can be scheduled for March 14 instead.",
        timestamp: "March 7, 2025 10:30 AM",
      },
    ],
  },
  {
    id: 2,
    title: "Transport Arrangement",
    description: "Require transport from Miami port to Wellington facility for 8 horses.",
    priority: "Medium",
    status: "In Progress",
    date: "March 6, 2025",
    progress: 50,
    documents: [3],
    requester: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JR",
      type: "Internal",
    },
    messages: [
      {
        id: 1,
        sender: "James Rodriguez",
        senderType: "Internal",
        text: "Transport company has been contacted, awaiting confirmation.",
        timestamp: "March 6, 2025 2:15 PM",
      },
      {
        id: 2,
        sender: "Transport Coordinator",
        senderType: "Customer",
        text: "We can confirm transport for March 20. Please send loading details.",
        timestamp: "March 7, 2025 9:45 AM",
      },
    ],
  },
  {
    id: 3,
    title: "Quarantine Facility",
    description: "Booking request for quarantine facility for 5 cattle arriving from Brazil.",
    priority: "Medium",
    status: "Open",
    date: "March 5, 2025",
    progress: 10,
    documents: [4],
    requester: {
      name: "Sarah Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ST",
      type: "Customer",
    },
    messages: [],
  },
]

export function ShipmentServiceRequests({
  shipmentId,
  shipmentTitle,
  isCustomerView = false,
}: ShipmentServiceRequestsProps) {
  // Filter service requests for this shipment
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(
    serviceRequestsData.filter((req) =>
      req.documents.some((docId) => documents.find((doc) => doc.id === docId)?.shipmentId === shipmentId),
    ),
  )

  // States for managing the component
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [newDocumentName, setNewDocumentName] = useState("")
  const [isCreatingRequest, setIsCreatingRequest] = useState(false)
  const [newRequest, setNewRequest] = useState({
    title: "",
    description: "",
    priority: "Medium",
  })

  // Get documents for a service request
  const getDocumentsForServiceRequest = (serviceRequestId: number) => {
    const request = serviceRequests.find((req) => req.id === serviceRequestId)
    if (!request) return []

    return documents.filter((doc) => request.documents.includes(doc.id))
  }

  // Function to handle sending a message
  const handleSendMessage = (id: number) => {
    if (!newMessage.trim()) return

    const updatedServiceRequests = serviceRequests.map((req) => {
      if (req.id === id) {
        return {
          ...req,
          messages: [
            ...req.messages,
            {
              id: req.messages.length + 1,
              sender: isCustomerView ? "Customer" : "Agent",
              senderType: isCustomerView ? "Customer" : "Internal",
              text: newMessage,
              timestamp: new Date().toLocaleString(),
            },
          ],
        }
      }
      return req
    })

    setServiceRequests(updatedServiceRequests)
    setNewMessage("")
  }

  // Function to handle document upload
  const handleDocumentUpload = (serviceRequestId: number) => {
    if (!newDocumentName.trim()) return

    // In a real app, this would handle the actual file upload
    const newDocId = documents.length + 1
    const newDocument = {
      id: newDocId,
      name: newDocumentName,
      size: "1.2 MB",
      uploadedBy: isCustomerView ? "Customer" : "Agent",
      uploadDate: new Date().toLocaleDateString(),
      status: "Pending Review",
      shipmentId: shipmentId,
    }

    // Update the service request with the new document
    const updatedServiceRequests = serviceRequests.map((req) => {
      if (req.id === serviceRequestId) {
        return {
          ...req,
          documents: [...req.documents, newDocId],
        }
      }
      return req
    })

    setServiceRequests(updatedServiceRequests)
    setNewDocumentName("")
    setUploadingDocument(false)
  }

  // Function to create a new service request
  const handleCreateServiceRequest = () => {
    const newId = Math.max(...serviceRequests.map((req) => req.id)) + 1
    const newServiceRequest: ServiceRequest = {
      id: newId,
      title: newRequest.title,
      description: newRequest.description,
      priority: newRequest.priority as "High" | "Medium" | "Low",
      status: "Open",
      date: new Date().toLocaleDateString(),
      progress: 0,
      documents: [],
      requester: {
        name: isCustomerView ? "Customer" : "Agent",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: isCustomerView ? "CU" : "AG",
        type: isCustomerView ? "Customer" : "Internal",
      },
      messages: [],
    }

    setServiceRequests([...serviceRequests, newServiceRequest])
    setNewRequest({
      title: "",
      description: "",
      priority: "Medium",
    })
    setIsCreatingRequest(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Service Requests</h3>
        <Dialog open={isCreatingRequest} onOpenChange={setIsCreatingRequest}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Service Request</DialogTitle>
              <DialogDescription>
                Create a new service request for shipment {shipmentId}: {shipmentTitle}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newRequest.title}
                  onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                  placeholder="Enter service request title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                  placeholder="Describe the service request"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newRequest.priority}
                  onValueChange={(value) => setNewRequest({ ...newRequest, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatingRequest(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateServiceRequest}>Create Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {serviceRequests.length > 0 ? (
        <div className="space-y-4">
          {serviceRequests.map((request) => (
            <Card key={request.id} className={selectedRequest === request.id ? "border-primary" : ""}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base font-medium">{request.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Badge
                      variant={
                        request.priority === "High"
                          ? "destructive"
                          : request.priority === "Medium"
                            ? "default"
                            : "outline"
                      }
                      className="mr-2"
                    >
                      {request.priority} Priority
                    </Badge>
                    <span className="text-xs text-muted-foreground">{request.date}</span>
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    request.status === "Open" ? "destructive" : request.status === "In Progress" ? "default" : "success"
                  }
                >
                  {request.status}
                </Badge>
              </CardHeader>

              <CardContent className="pb-2">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                    <AvatarFallback>{request.requester.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center">
                      <p className="text-sm font-medium">{request.requester.name}</p>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {request.requester.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{request.description}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-muted-foreground">Progress</span>
                    <span className="text-xs font-medium">{request.progress}%</span>
                  </div>
                  <Progress value={request.progress} className="h-2" />
                </div>

                {/* Quick stats */}
                <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <MessageSquareIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{request.messages.length} messages</span>
                  </div>
                  <div className="flex items-center">
                    <FileTextIcon className="h-3.5 w-3.5 mr-1" />
                    <span>{getDocumentsForServiceRequest(request.id).length} documents</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-2">
                <Button
                  variant={selectedRequest === request.id ? "default" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedRequest(selectedRequest === request.id ? null : request.id)}
                >
                  {selectedRequest === request.id ? "Close Details" : "View Details"}
                </Button>
              </CardFooter>

              {/* Expanded details section */}
              {selectedRequest === request.id && (
                <div className="px-6 pb-6 pt-0 space-y-4">
                  <Separator />

                  <Tabs defaultValue="messages" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="messages">Messages</TabsTrigger>
                      <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>

                    <TabsContent value="messages" className="space-y-4 pt-4">
                      {request.messages.length > 0 ? (
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {request.messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.senderType === (isCustomerView ? "Customer" : "Internal") ? "justify-end" : "justify-start"}`}
                            >
                              <div
                                className={`max-w-[80%] rounded-lg p-3 ${
                                  message.senderType === (isCustomerView ? "Customer" : "Internal")
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                                <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No messages yet</p>
                      )}

                      <div className="flex gap-2">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage(request.id)
                            }
                          }}
                        />
                        <Button size="icon" onClick={() => handleSendMessage(request.id)}>
                          <SendIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="documents" className="space-y-4 pt-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Shared Documents</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2"
                          onClick={() => {
                            setUploadingDocument(true)
                          }}
                        >
                          <PlusIcon className="h-3.5 w-3.5 mr-1" />
                          Add Document
                        </Button>
                      </div>

                      {getDocumentsForServiceRequest(request.id).length > 0 ? (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {getDocumentsForServiceRequest(request.id).map((doc) => (
                            <div
                              key={doc.id}
                              className="flex items-center justify-between bg-muted/30 p-2 rounded text-sm"
                            >
                              <div className="flex items-center">
                                <FileIcon className="h-4 w-4 mr-2 text-blue-500" />
                                <div>
                                  <p className="font-medium">{doc.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {doc.uploadedBy} • {doc.uploadDate} • {doc.size}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Badge
                                  variant={
                                    doc.status === "Approved"
                                      ? "success"
                                      : doc.status === "Rejected"
                                        ? "destructive"
                                        : "outline"
                                  }
                                  className="mr-2"
                                >
                                  {doc.status}
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                  <DownloadIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No documents attached</p>
                      )}

                      {/* Document upload dialog */}
                      <Dialog open={uploadingDocument} onOpenChange={setUploadingDocument}>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Upload Document</DialogTitle>
                            <DialogDescription>
                              Upload a document to share with {isCustomerView ? "the agent" : "the customer"}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="document-name">Document Name</Label>
                              <Input
                                id="document-name"
                                value={newDocumentName}
                                onChange={(e) => setNewDocumentName(e.target.value)}
                                placeholder="e.g. Health Certificate.pdf"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="document-file">File</Label>
                              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                                <PaperclipIcon className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                                <p className="text-xs text-muted-foreground mt-1">PDF, DOC, XLS, JPG up to 10MB</p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setUploadingDocument(false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => handleDocumentUpload(request.id)}>Upload</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">No service requests for this shipment yet</p>
          <Button variant="outline" size="sm" className="mt-2" onClick={() => setIsCreatingRequest(true)}>
            Create First Request
          </Button>
        </div>
      )}
    </div>
  )
}

