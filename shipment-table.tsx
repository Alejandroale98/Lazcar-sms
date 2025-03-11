"use client"

// components/shipment-table.tsx
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ShipmentDialog } from "./shipment-dialog"
import { DollarSign, Eye } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function ShipmentTable({ shipments = [], onShipmentUpdate, onSendToAccounting, hideAccountingButton = false }) {
  const [selectedShipmentId, setSelectedShipmentId] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const router = useRouter()

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

  const isTasksComplete = (shipment) => {
    if (!shipment || !shipment.tasks || shipment.tasks.length === 0) return false
    return shipment.tasks.every((task) => task.completed)
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
              <TableHead>Type</TableHead>
              <TableHead>Animals</TableHead>
              <TableHead>Departure</TableHead>
              <TableHead>Arrival</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!Array.isArray(shipments) || shipments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                  No shipments found
                </TableCell>
              </TableRow>
            ) : (
              shipments.map((shipment) => (
                <TableRow
                  key={shipment.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => router.push(`/shipments/${shipment.id}`)}
                >
                  <TableCell className="font-medium">{shipment.id}</TableCell>
                  <TableCell>{shipment.origin}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress
                        value={calculateTaskProgress(shipment)}
                        className={cn("h-1.5 w-full", isTasksComplete(shipment) ? "bg-green-200" : "bg-red-200")}
                      />
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {shipment.tasks
                          ? `${shipment.tasks.filter((t) => t.completed).length}/${shipment.tasks.length}`
                          : "0/0"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{shipment.type || "N/A"}</TableCell>
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

