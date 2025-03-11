"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/navigation"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { getShipmentById, updateShipmentInLocalStorage } from "@/lib/shipment-storage"

export function ShipmentDetail({ id }: { id: string }) {
  const router = useRouter()
  const [shipment, setShipment] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const shipmentData = getShipmentById(id)
    setShipment(shipmentData)
    setLoading(false)
  }, [id])

  if (loading) {
    return <div>Loading shipment details...</div>
  }

  if (!shipment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Shipment Not Found</CardTitle>
          <CardDescription>The shipment with ID {id} could not be found.</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href="/shipments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Shipments
            </Link>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Get color based on shipment type
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "import":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100/80"
      case "export":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "in-transit":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  // Handle task completion toggle
  const handleTaskToggle = (taskId: number) => {
    if (!shipment) return

    const updatedTasks = shipment.tasks.map((task: any) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    )

    const updatedShipment = {
      ...shipment,
      tasks: updatedTasks,
    }

    updateShipmentInLocalStorage(updatedShipment)
    setShipment(updatedShipment)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
          <Link href="/shipments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shipments
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/shipments/${id}`}>
            <Edit className="mr-2 h-4 w-4" />
            View Full Details
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">Shipment {shipment.number || shipment.shipmentNumber}</CardTitle>
              <CardDescription>
                Created on {format(new Date(shipment.created || shipment.createdAt), "PPP")}
              </CardDescription>
            </div>
            <Badge className={getTypeColor(shipment.type)}>
              {shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="animals">Animals</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Shipment Information</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-sm text-muted-foreground">Type</span>
                          <p className="font-medium">
                            {shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Number</span>
                          <p className="font-medium">{shipment.number || shipment.shipmentNumber}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Date</span>
                          <p className="font-medium">{format(new Date(shipment.date), "PPP")}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Status</span>
                          <p className="font-medium">{shipment.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Origin</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium">{shipment.origin}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Destination</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium">{shipment.destination}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Client</h3>
                    <div className="bg-muted p-4 rounded-md">
                      <p className="font-medium">{shipment.client}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="animals" className="space-y-6 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Animal Summary</h3>
                <Button asChild size="sm">
                  <Link href={`/shipments/${id}`}>Edit Animal Details</Link>
                </Button>
              </div>

              {shipment.animals && shipment.animals.length > 0 ? (
                <div className="space-y-4">
                  {shipment.animals.map((animal: any, index: number) => (
                    <div key={index} className="bg-muted p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{animal.type.charAt(0).toUpperCase() + animal.type.slice(1)}</h4>
                        <Badge>Qty: {animal.quantity || animal.count || 1}</Badge>
                      </div>
                      {shipment.animalDetails &&
                        shipment.animalDetails.filter((a: any) => a.type === animal.type).length > 0 && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>
                              {shipment.animalDetails.filter((a: any) => a.type === animal.type).length} animals with
                              detailed information
                            </p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted p-4 rounded-md text-center">
                  <p className="text-muted-foreground">No animal information available</p>
                  <Button asChild variant="outline" className="mt-4">
                    <Link href={`/shipments/${id}`}>Add Animal Details</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6 mt-6">
              <div className="space-y-4">
                {shipment.tasks &&
                  shipment.tasks.map((task: any) => (
                    <div key={task.id} className="flex items-start space-x-3">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                      />
                      <div className="grid gap-1.5">
                        <Label
                          htmlFor={`task-${task.id}`}
                          className={task.completed ? "line-through text-muted-foreground" : ""}
                        >
                          {task.title}
                        </Label>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

