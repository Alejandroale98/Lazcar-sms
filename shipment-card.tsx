"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { ChevronDown, ChevronUp, Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface ShipmentCardProps {
  shipment: any
  showDetails?: boolean
}

export function ShipmentCard({ shipment, showDetails = false }: ShipmentCardProps) {
  const [expanded, setExpanded] = useState(showDetails)

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

  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }

  // Count completed tasks
  const completedTasks = shipment.tasks ? shipment.tasks.filter((task: any) => task.completed).length : 0
  const totalTasks = shipment.tasks ? shipment.tasks.length : 0

  // Get animal summary
  const getAnimalSummary = () => {
    if (shipment.animals && Array.isArray(shipment.animals)) {
      return shipment.animals
        .map((animal: any) => {
          const count = animal.quantity || animal.count || 1
          const type = animal.type.charAt(0).toUpperCase() + animal.type.slice(1)
          return `${count} ${type}${count > 1 ? "s" : ""}`
        })
        .join(", ")
    } else if (shipment.animalType) {
      const count = shipment.numAnimals || 1
      const type = shipment.animalType.charAt(0).toUpperCase() + shipment.animalType.slice(1)
      return `${count} ${type}${count > 1 ? "s" : ""}`
    }
    return "No animals specified"
  }

  // Check if detailed animal info exists
  const hasDetailedAnimalInfo = shipment.animalDetails && shipment.animalDetails.length > 0

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>
              <div className="flex items-center gap-2">
                {shipment.type === "import" ? (
                  <Badge variant="destructive" className="h-6 w-6 flex items-center justify-center p-0 rounded-full">
                    I
                  </Badge>
                ) : shipment.type === "export" ? (
                  <Badge
                    variant="default"
                    className="h-6 w-6 flex items-center justify-center p-0 rounded-full bg-blue-600"
                  >
                    E
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="h-6 w-6 flex items-center justify-center p-0 rounded-full bg-yellow-500 text-white"
                  >
                    T
                  </Badge>
                )}
                <span>{shipment.id.replace(/^(sh|SH)/, "")}</span>
              </div>
            </CardTitle>
            <CardDescription>{formatDate(shipment.date)}</CardDescription>
          </div>
          <Badge className={getTypeColor(shipment.type)}>
            {shipment.type.charAt(0).toUpperCase() + shipment.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">From:</span>
            <span className="font-medium">
              {shipment.originAirport ? `${shipment.originAirport} (${shipment.origin})` : shipment.origin}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">To:</span>
            <span className="font-medium">
              {shipment.destinationAirport
                ? `${shipment.destinationAirport} (${shipment.destination})`
                : shipment.destination}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-muted-foreground mr-1">Status:</span>
            <Badge variant="outline" className={getStatusColor(shipment.status)}>
              {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
            </Badge>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Animals</h4>
                <p className="text-sm">{getAnimalSummary()}</p>
                {hasDetailedAnimalInfo && (
                  <div className="mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-800">
                      {shipment.animalDetails.length} animals with detailed info
                    </Badge>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium mb-1">Client</h4>
                <p className="text-sm">{shipment.client}</p>
              </div>

              {shipment.description && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Description</h4>
                  <p className="text-sm">{shipment.description}</p>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium mb-1">Tasks Progress</h4>
                <div className="flex items-center">
                  <div className="w-full bg-muted rounded-full h-2.5 mr-2">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${(completedTasks / totalTasks) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-xs whitespace-nowrap">
                    {completedTasks} of {totalTasks}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? (
            <>
              <ChevronUp className="h-4 w-4 mr-1" />
              Less Details
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4 mr-1" />
              More Details
            </>
          )}
        </Button>
        <Button asChild size="sm">
          <Link href={`/shipments/${shipment.id}`}>View Shipment</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

