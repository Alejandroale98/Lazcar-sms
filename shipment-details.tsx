"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plane, Calendar, MapPin, User, Package, FileText } from "lucide-react"
import { ShipmentTasks } from "@/components/shipment-tasks"

interface ShipmentDetailsProps {
  shipmentId: string
}

export function ShipmentDetails({ shipmentId }: ShipmentDetailsProps) {
  const [shipment, setShipment] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [completedTasks, setCompletedTasks] = useState<any>([])

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll simulate loading from localStorage or use mock data
    const fetchShipment = async () => {
      setLoading(true)
      try {
        // Try to get from localStorage first
        const storedShipments = localStorage.getItem("shipments")
        if (storedShipments) {
          const shipments = JSON.parse(storedShipments)
          const found = shipments.find((s: any) => s.id === shipmentId)
          if (found) {
            setShipment(found)
            setLoading(false)
            return
          }
        }

        // If not found in localStorage, use mock data
        // This would be replaced with an API call in a real app
        setTimeout(() => {
          const mockShipment = {
            id: shipmentId,
            type: shipmentId.includes("E") ? "export" : shipmentId.includes("I") ? "import" : "in-transit",
            status: "In Progress",
            date: new Date().toISOString(),
            client: "Global Animal Transport Inc.",
            origin: "Miami",
            originAirport: "MIA",
            originCountry: "USA",
            destination: "Buenos Aires",
            destinationAirport: "EZE",
            destinationCountry: "Argentina",
            animals: [
              { type: "Horse", quantity: 2, breed: "Thoroughbred" },
              { type: "Dog", quantity: 1, breed: "German Shepherd" },
            ],
            agents: [
              { name: "John Smith", role: "Primary", contact: "john@example.com" },
              { name: "Maria Garcia", role: "Support", contact: "maria@example.com" },
            ],
            documents: [
              { name: "Health Certificate", status: "Approved", date: new Date().toISOString() },
              { name: "Export Permit", status: "Pending", date: new Date().toISOString() },
              { name: "Import License", status: "Pending", date: new Date().toISOString() },
            ],
            notes: "Customer requested special handling for the thoroughbred horses.",
            tasks: [
              { id: "task1", description: "Schedule flight", completed: true },
              { id: "task2", description: "Prepare export documents", completed: false },
              { id: "task3", description: "Coordinate with customs", completed: false },
            ],
          }
          setShipment(mockShipment)
          setLoading(false)
          setCompletedTasks(mockShipment.tasks.filter((task: any) => task.completed))
        }, 500)
      } catch (error) {
        console.error("Error fetching shipment:", error)
        setLoading(false)
      }
    }

    fetchShipment()
  }, [shipmentId])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="animate-pulse bg-muted h-8 w-1/3 rounded"></CardTitle>
          <CardDescription className="animate-pulse bg-muted h-4 w-1/4 rounded"></CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="bg-muted h-12 rounded"></div>
            <div className="bg-muted h-12 rounded"></div>
            <div className="bg-muted h-12 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!shipment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipment Not Found</CardTitle>
          <CardDescription>The requested shipment could not be found.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Get badge color based on shipment type
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "import":
        return "bg-blue-100 text-blue-800"
      case "export":
        return "bg-green-100 text-green-800"
      case "in-transit":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CardTitle>{shipment.id}</CardTitle>
                <Badge className={getTypeColor(shipment.type)}>
                  {shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
                </Badge>
                <Badge className={getStatusColor(shipment.status)}>{shipment.status}</Badge>
              </div>
              <CardDescription>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(shipment.date).toLocaleDateString()}</span>
                  <span className="mx-1">•</span>
                  <span>{shipment.client}</span>
                </div>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="animals">Animals</TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Route Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">Origin</div>
                          <div className="text-sm text-muted-foreground">
                            {shipment.originAirport} ({shipment.origin}), {shipment.originCountry}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">Destination</div>
                          <div className="text-sm text-muted-foreground">
                            {shipment.destinationAirport} ({shipment.destination}), {shipment.destinationCountry}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Plane className="h-4 w-4 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">Route</div>
                          <div className="text-sm text-muted-foreground">
                            {shipment.originAirport} → {shipment.destinationAirport}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {shipment.notes && (
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium text-sm text-muted-foreground mb-2">Notes</h3>
                      <p className="text-sm">{shipment.notes}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Animal Summary</h3>
                    <div className="space-y-2">
                      {shipment.animals.map((animal: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {animal.quantity}x {animal.type}
                            </span>
                          </div>
                          {animal.breed && <Badge variant="outline">{animal.breed}</Badge>}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">Agent Summary</h3>
                    <div className="space-y-2">
                      {shipment.agents.map((agent: any, index: number) => (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{agent.name}</span>
                          </div>
                          <Badge variant="outline">{agent.role}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Add a progress indicator for tasks */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Task Progress</h3>
                  <span className="text-sm text-muted-foreground">
                    {completedTasks.length} of {shipment.tasks.length} completed
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${(completedTasks.length / shipment.tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="animals">
              <div className="border rounded-md divide-y">
                {shipment.animals.map((animal: any, index: number) => (
                  <div key={index} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">
                        {animal.quantity}x {animal.type}
                      </h3>
                      {animal.breed && <Badge variant="outline">{animal.breed}</Badge>}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {/* Additional animal details would go here */}
                      {animal.notes || "No additional details available."}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="agents">
              <div className="border rounded-md divide-y">
                {shipment.agents.map((agent: any, index: number) => (
                  <div key={index} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{agent.name}</h3>
                      <Badge variant="outline">{agent.role}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Contact: {agent.contact}</div>
                      {/* Additional agent details would go here */}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <div className="border rounded-md divide-y">
                {shipment.documents.map((doc: any, index: number) => (
                  <div key={index} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">{doc.name}</h3>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          doc.status === "Approved"
                            ? "bg-green-50 text-green-700"
                            : doc.status === "Pending"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-50"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last updated: {new Date(doc.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ShipmentTasks shipmentId={shipment.id} shipmentType={shipment.type} shipmentNumber={shipment.id} />
    </>
  )
}

