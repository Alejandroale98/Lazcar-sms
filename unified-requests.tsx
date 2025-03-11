"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  FileIcon,
  PaperclipIcon,
  SendIcon,
  DownloadIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  ClockIcon,
  PlusIcon,
  LinkIcon,
  ExternalLinkIcon,
} from "lucide-react"

// Sample shipments data
const shipments = [
  {
    id: "SH-2025-0001",
    type: "Import",
    origin: "Germany",
    destination: "United States",
    status: "In Transit",
    animals: "12 Horses",
    arrivalDate: "March 15, 2025",
  },
  {
    id: "SH-2025-0002",
    type: "Export",
    origin: "United States",
    destination: "Canada",
    status: "Preparing",
    animals: "8 Cattle",
    arrivalDate: "March 20, 2025",
  },
  {
    id: "SH-2025-0003",
    type: "Import",
    origin: "Brazil",
    destination: "United States",
    status: "Customs Clearance",
    animals: "5 Cattle",
    arrivalDate: "March 12, 2025",
  },
  {
    id: "SH-2025-0004",
    type: "Export",
    origin: "United States",
    destination: "Germany",
    status: "Documentation",
    animals: "10 Horses",
    arrivalDate: "April 5, 2025",
  },
]

// Sample documents data
const documents = [
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

// Sample data for requests
const requestsData = [
  {
    id: 1,
    type: "Question",
    title: "Shipment Documentation",
    description: "What documents are required for international horse shipments?",
    status: "Pending",
    date: "March 5, 2025",
    requester: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
    },
  },
  {
    id: 2,
    type: "Access",
    title: "Analytics Dashboard Access",
    description: "Request for access to the advanced analytics dashboard for our team.",
    status: "Pending",
    date: "March 4, 2025",
    requester: {
      name: "Maria Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MG",
    },
  },
  {
    id: 3,
    type: "Issue",
    title: "Calendar Sync Problem",
    description: "The shipment calendar is not syncing correctly with our external system.",
    status: "Pending",
    date: "March 3, 2025",
    requester: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DK",
    },
  },
]

// Sample data for service requests - now tied to shipments
const serviceRequestsData = [
  {
    id: 1,
    title: "Veterinary Inspection",
    description: "Need veterinary inspection for 12 horses arriving from Canada on March 15.",
    priority: "High",
    status: "Open",
    date: "March 7, 2025",
    shipmentId: "SH-2025-0001",
    progress: 25,
    documents: [1, 2],
    requester: {
      name: "Emily Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      type: "Customer", // Customer or Internal
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
    shipmentId: "SH-2025-0002",
    progress: 50,
    documents: [3],
    requester: {
      name: "James Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JR",
      type: "Internal", // Customer or Internal
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
    shipmentId: "SH-2025-0003",
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
  {
    id: 4,
    title: "Documentation Assistance",
    description: "Need help with export documentation for shipment to Germany.",
    priority: "Low",
    status: "Open",
    date: "March 4, 2025",
    shipmentId: "SH-2025-0004",
    progress: 15,
    documents: [],
    requester: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MC",
      type: "Customer",
    },
    messages: [
      {
        id: 1,
        sender: "Michael Chen",
        senderType: "Customer",
        text: "Could you provide a checklist of required export documents for Germany?",
        timestamp: "March 4, 2025 3:20 PM",
      },
    ],
  },
]

export function UnifiedRequests() {
  // State for tracking which request is being answered
  const [answeringRequest, setAnsweringRequest] = useState<number | null>(null)
  const [answerText, setAnswerText] = useState("")

  // State for tracking which service request is being processed
  const [processingServiceRequest, setProcessingServiceRequest] = useState<number | null>(null)
  const [serviceStatus, setServiceStatus] = useState("In Progress")
  const [assignee, setAssignee] = useState("")
  const [notes, setNotes] = useState("")

  // State for tracking the counts
  const [requests, setRequests] = useState(requestsData)
  const [serviceRequests, setServiceRequests] = useState(serviceRequestsData)

  // State for document management
  const [selectedServiceRequest, setSelectedServiceRequest] = useState<number | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [uploadingDocument, setUploadingDocument] = useState(false)
  const [newDocumentName, setNewDocumentName] = useState("")

  // State for creating new service request
  const [isCreatingServiceRequest, setIsCreatingServiceRequest] = useState(false)
  const [newServiceRequest, setNewServiceRequest] = useState({
    title: "",
    description: "",
    priority: "Medium",
    shipmentId: "",
  })

  // Function to handle answering a request
  const handleAnswerRequest = (id: number) => {
    if (answeringRequest === id) {
      // Submit the answer
      const updatedRequests = requests.map((req) => (req.id === id ? { ...req, status: "Answered" } : req))
      setRequests(updatedRequests)
      setAnsweringRequest(null)
      setAnswerText("")
    } else {
      setAnsweringRequest(id)
    }
  }

  // Function to handle processing a service request
  const handleProcessServiceRequest = (id: number) => {
    if (processingServiceRequest === id) {
      // Submit the processing
      const updatedServiceRequests = serviceRequests.map((req) =>
        req.id === id ? { ...req, status: serviceStatus } : req,
      )
      setServiceRequests(updatedServiceRequests)
      setProcessingServiceRequest(null)
      setServiceStatus("In Progress")
      setAssignee("")
      setNotes("")
    } else {
      setProcessingServiceRequest(id)
    }
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
              sender: "Agent",
              senderType: "Internal",
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
      uploadedBy: "Agent",
      uploadDate: new Date().toLocaleDateString(),
      status: "Pending Review",
      shipmentId: serviceRequests.find((req) => req.id === serviceRequestId)?.shipmentId || "",
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
    const newId = serviceRequests.length + 1
    const newRequest = {
      id: newId,
      title: newServiceRequest.title,
      description: newServiceRequest.description,
      priority: newServiceRequest.priority,
      status: "Open",
      date: new Date().toLocaleDateString(),
      shipmentId: newServiceRequest.shipmentId,
      progress: 0,
      documents: [],
      requester: {
        name: "Agent",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AG",
        type: "Internal",
      },
      messages: [],
    }

    setServiceRequests([...serviceRequests, newRequest])
    setNewServiceRequest({
      title: "",
      description: "",
      priority: "Medium",
      shipmentId: "",
    })
    setIsCreatingServiceRequest(false)
  }

  // Calculate pending counts
  const pendingRequestsCount = requests.filter((req) => req.status === "Pending").length
  const openServiceRequestsCount = serviceRequests.filter((req) => req.status === "Open").length

  // Get shipment details by ID
  const getShipmentById = (id: string) => {
    return shipments.find((shipment) => shipment.id === id)
  }

  // Get documents for a service request
  const getDocumentsForServiceRequest = (serviceRequestId: number) => {
    const request = serviceRequests.find((req) => req.id === serviceRequestId)
    if (!request) return []

    return documents.filter((doc) => request.documents.includes(doc.id))
  }

  return (
    <Tabs defaultValue="requests" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="requests" className="relative">
            Requests
            {pendingRequestsCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {pendingRequestsCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="service-requests" className="relative">
            Service Requests
            {openServiceRequestsCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {openServiceRequestsCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <div className="flex gap-2">
          {/* Create new service request button */}
          <Dialog open={isCreatingServiceRequest} onOpenChange={setIsCreatingServiceRequest}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Service Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Service Request</DialogTitle>
                <DialogDescription>Create a new service request tied to a specific shipment.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newServiceRequest.title}
                    onChange={(e) => setNewServiceRequest({ ...newServiceRequest, title: e.target.value })}
                    placeholder="Enter service request title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newServiceRequest.description}
                    onChange={(e) => setNewServiceRequest({ ...newServiceRequest, description: e.target.value })}
                    placeholder="Describe the service request"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newServiceRequest.priority}
                    onValueChange={(value) => setNewServiceRequest({ ...newServiceRequest, priority: value })}
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
                <div className="space-y-2">
                  <Label htmlFor="shipment">Related Shipment</Label>
                  <Select
                    value={newServiceRequest.shipmentId}
                    onValueChange={(value) => setNewServiceRequest({ ...newServiceRequest, shipmentId: value })}
                  >
                    <SelectTrigger id="shipment">
                      <SelectValue placeholder="Select shipment" />
                    </SelectTrigger>
                    <SelectContent>
                      {shipments.map((shipment) => (
                        <SelectItem key={shipment.id} value={shipment.id}>
                          {shipment.id} - {shipment.animals} ({shipment.type})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreatingServiceRequest(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateServiceRequest}>Create Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Sort
          </Button>
        </div>
      </div>

      <TabsContent value="requests" className="mt-0">
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg font-medium">{request.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Badge
                      variant={
                        request.type === "Question" ? "default" : request.type === "Access" ? "outline" : "secondary"
                      }
                      className="mr-2"
                    >
                      {request.type}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{request.date}</span>
                  </CardDescription>
                </div>
                <Badge variant={request.status === "Pending" ? "destructive" : "success"}>{request.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                    <AvatarFallback>{request.requester.initials}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{request.requester.name}</p>
                    <p className="text-sm text-muted-foreground">{request.description}</p>
                  </div>
                </div>

                {answeringRequest === request.id && (
                  <div className="mt-4 space-y-2">
                    <Label htmlFor={`answer-${request.id}`}>Your Answer</Label>
                    <Textarea
                      id={`answer-${request.id}`}
                      placeholder="Type your answer here..."
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  variant={answeringRequest === request.id ? "default" : "outline"}
                  onClick={() => handleAnswerRequest(request.id)}
                  className="ml-auto"
                >
                  {answeringRequest === request.id ? "Submit Answer" : "Answer"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="service-requests" className="mt-0">
        <div className="grid gap-4">
          {serviceRequests.map((request) => {
            const shipment = getShipmentById(request.shipmentId)
            return (
              <Card key={request.id} className="overflow-hidden">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg font-medium">{request.title}</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        <LinkIcon className="h-3 w-3 mr-1" />
                        {request.shipmentId}
                      </Badge>
                    </div>
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
                      <span className="text-sm text-muted-foreground">{request.date}</span>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      request.status === "Open"
                        ? "destructive"
                        : request.status === "In Progress"
                          ? "default"
                          : "success"
                    }
                  >
                    {request.status}
                  </Badge>
                </CardHeader>

                <CardContent className="pb-0">
                  {/* Requester info and description */}
                  <div className="flex items-start space-x-4 mb-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.requester.avatar} alt={request.requester.name} />
                      <AvatarFallback>{request.requester.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{request.requester.name}</p>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {request.requester.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.description}</p>
                    </div>
                  </div>

                  {/* Related shipment info */}
                  {shipment && (
                    <div className="bg-muted/50 p-3 rounded-md mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-medium">Related Shipment</h4>
                        <Button variant="ghost" size="sm" className="h-7 px-2">
                          <ExternalLinkIcon className="h-3.5 w-3.5 mr-1" />
                          View Details
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Type</p>
                          <p>{shipment.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Route</p>
                          <p>
                            {shipment.origin} → {shipment.destination}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Animals</p>
                          <p>{shipment.animals}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <p>{shipment.status}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Arrival</p>
                          <p>{shipment.arrivalDate}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{request.progress}%</span>
                    </div>
                    <Progress value={request.progress} className="h-2" />
                  </div>

                  {/* Document exchange section */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">Documents</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => {
                          setUploadingDocument(true)
                          setSelectedServiceRequest(request.id)
                        }}
                      >
                        <PlusIcon className="h-3.5 w-3.5 mr-1" />
                        Add Document
                      </Button>
                    </div>

                    {getDocumentsForServiceRequest(request.id).length > 0 ? (
                      <div className="space-y-2">
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
                    <Dialog
                      open={uploadingDocument && selectedServiceRequest === request.id}
                      onOpenChange={(open) => {
                        if (!open) setUploadingDocument(false)
                      }}
                    >
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Upload Document</DialogTitle>
                          <DialogDescription>Upload a document to share with the customer.</DialogDescription>
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
                  </div>

                  {/* Message exchange section */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Messages</h4>

                    {request.messages.length > 0 ? (
                      <div className="space-y-3 mb-3">
                        {request.messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.senderType === "Internal" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                message.senderType === "Internal" ? "bg-primary text-primary-foreground" : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic mb-3">No messages yet</p>
                    )}

                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={selectedServiceRequest === request.id ? newMessage : ""}
                        onChange={(e) => {
                          setSelectedServiceRequest(request.id)
                          setNewMessage(e.target.value)
                        }}
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
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    {request.status === "Open" ? (
                      <AlertCircleIcon className="h-4 w-4 mr-1 text-destructive" />
                    ) : request.status === "In Progress" ? (
                      <ClockIcon className="h-4 w-4 mr-1 text-amber-500" />
                    ) : (
                      <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
                    )}
                    <span>
                      {request.status === "Open"
                        ? "Awaiting action"
                        : request.status === "In Progress"
                          ? "In progress"
                          : "Completed"}
                    </span>
                  </div>

                  <Button
                    variant={processingServiceRequest === request.id ? "default" : "outline"}
                    onClick={() => handleProcessServiceRequest(request.id)}
                  >
                    {processingServiceRequest === request.id ? "Update Status" : "Process Request"}
                  </Button>
                </CardFooter>

                {processingServiceRequest === request.id && (
                  <div className="px-6 pb-6 pt-0 space-y-4">
                    <Separator />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`status-${request.id}`}>Status</Label>
                        <Select value={serviceStatus} onValueChange={setServiceStatus}>
                          <SelectTrigger id={`status-${request.id}`}>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`assignee-${request.id}`}>Assign To</Label>
                        <Select value={assignee} onValueChange={setAssignee}>
                          <SelectTrigger id={`assignee-${request.id}`}>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="john">John Smith</SelectItem>
                            <SelectItem value="lisa">Lisa Johnson</SelectItem>
                            <SelectItem value="mark">Mark Williams</SelectItem>
                            <SelectItem value="sarah">Sarah Davis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`notes-${request.id}`}>Processing Notes</Label>
                      <Textarea
                        id={`notes-${request.id}`}
                        placeholder="Add processing notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`progress-${request.id}`}>Update Progress ({request.progress}%)</Label>
                      <Input
                        id={`progress-${request.id}`}
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        defaultValue={request.progress.toString()}
                      />
                    </div>
                  </div>
                )}
              </Card>
            )
          })}
        </div>
      </TabsContent>
    </Tabs>
  )
}

