"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowLeft, Eye, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { getShipmentsFromLocalStorage, type Shipment, deleteShipmentFromLocalStorage } from "@/lib/shipment-storage"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export function ShipmentListView({
  date,
  type,
}: {
  date?: string
  type?: string
}) {
  const router = useRouter()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [shipmentToDelete, setShipmentToDelete] = useState<string | null>(null)

  // Format date for display
  const formattedDate = date ? format(new Date(date), "EEEE, MMMM d, yyyy") : "All Dates"

  // Format shipment type for display
  const formattedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : "All Types"

  // Load shipments matching the filters
  useEffect(() => {
    const allShipments = getShipmentsFromLocalStorage()

    // Filter by date if provided
    let filteredShipments = allShipments
    if (date) {
      const filterDate = new Date(date).toDateString()
      filteredShipments = filteredShipments.filter(
        (shipment) => new Date(shipment.shippingDate).toDateString() === filterDate,
      )
    }

    // Filter by type if provided
    if (type) {
      filteredShipments = filteredShipments.filter((shipment) => shipment.shipmentType === type)
    }

    // Sort by date
    filteredShipments.sort((a, b) => new Date(b.shippingDate).getTime() - new Date(a.shippingDate).getTime())

    setShipments(filteredShipments)
  }, [date, type])

  // Handle shipment deletion
  const handleDeleteShipment = (shipmentId: string) => {
    deleteShipmentFromLocalStorage(shipmentId)
    setShipments(shipments.filter((shipment) => shipment.shipmentId !== shipmentId))
    setShipmentToDelete(null)
    router.refresh()
  }

  // Get badge color based on shipment type
  const getShipmentTypeBadge = (type: string) => {
    switch (type) {
      case "import":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            Import
          </Badge>
        )
      case "export":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Export
          </Badge>
        )
      case "in-transit":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            In-Transit
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <CardTitle>
            Shipments for {formattedDate}
            {type && ` - ${formattedType}`}
          </CardTitle>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calendar
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {shipments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No shipments found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Animal</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.shipmentId}>
                  <TableCell className="font-medium">{shipment.shipmentId}</TableCell>
                  <TableCell>{getShipmentTypeBadge(shipment.shipmentType)}</TableCell>
                  <TableCell>{shipment.animalType}</TableCell>
                  <TableCell>{shipment.quantity}</TableCell>
                  <TableCell>{shipment.originCountry}</TableCell>
                  <TableCell>{shipment.destinationCountry}</TableCell>
                  <TableCell>{format(new Date(shipment.shippingDate), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge variant={shipment.status === "pending" ? "outline" : "default"}>
                      {shipment.status.charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/shipment/${shipment.shipmentId}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/shipment/${shipment.shipmentId}/edit`}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <AlertDialog
                        open={shipmentToDelete === shipment.shipmentId}
                        onOpenChange={(open) => {
                          if (!open) setShipmentToDelete(null)
                        }}
                      >
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => setShipmentToDelete(shipment.shipmentId)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the shipment {shipment.shipmentId}. This action cannot be
                              undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-700"
                              onClick={() => handleDeleteShipment(shipment.shipmentId)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

