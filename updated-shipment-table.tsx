"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShipmentDialog } from "./shipment-dialog"
import { DollarSign, Eye } from "lucide-react"
import { format } from "date-fns"

export function UpdatedShipmentTable({
  shipments = [],
  onShipmentUpdate,
  onSendToAccounting,
  hideAccountingButton = false,
}) {
  const [selectedShipmentId, setSelectedShipmentId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewDetails = (shipmentId) => {
    setSelectedShipmentId(shipmentId)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedShipmentId(null)
  }

  const calculateTaskProgress = (shipment) => {
    if (!shipment || !shipment.tasks || shipment.tasks.length === 0) return 0
    const completedTasks = shipment.tasks.filter((task) => task.completed).length
    return Math.round((completedTasks / shipment.tasks.length) * 100)
  }

  const selectedShipment =
    selectedShipmentId && Array.isArray(shipments) ? shipments.find((s) => s.id === selectedShipmentId) : null

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Animals</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!Array.isArray(shipments) || shipments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                  No shipments found
                </TableCell>
              </TableRow>
            ) : (
              shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      <span className="font-medium">{shipment.id}</span>
                      {shipment.type && (
                        <Badge variant="outline" className="capitalize w-fit">
                          {shipment.type}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={calculateTaskProgress(shipment)} className="h-1.5 w-full" />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {shipment.tasks
                          ? `${shipment.tasks.filter((t) => t.completed).length}/${shipment.tasks.length}`
                          : "0/0"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{shipment.animals || "N/A"}</TableCell>
                  <TableCell>
                    {shipment.departureDate ? format(new Date(shipment.departureDate), "MMM d, yyyy") : "Not set"}
                  </TableCell>
                  <TableCell>
                    {shipment.arrivalDate ? format(new Date(shipment.arrivalDate), "MMM d, yyyy") : "Not set"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(shipment.id)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!hideAccountingButton && onSendToAccounting && (
                        <Button variant="ghost" size="icon" onClick={() => onSendToAccounting(shipment)}>
                          <DollarSign className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedShipment && (
        <ShipmentDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          shipment={selectedShipment}
          onShipmentUpdate={onShipmentUpdate}
        />
      )}
    </>
  )
}

