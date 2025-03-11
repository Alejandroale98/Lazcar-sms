"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { format } from "date-fns"

export function ShipmentDialog({ isOpen, onClose, shipment, onShipmentUpdate }) {
  const [localShipment, setLocalShipment] = useState(shipment || {})
  const [tasks, setTasks] = useState(shipment?.tasks || [])

  useEffect(() => {
    if (shipment) {
      setLocalShipment(shipment)
      setTasks(shipment.tasks || [])
    }
  }, [shipment])

  if (!shipment) {
    return null
  }

  const handleTaskToggle = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    setTasks(updatedTasks)
  }

  const handleSave = () => {
    const updatedShipment = { ...localShipment, tasks }
    if (onShipmentUpdate) {
      onShipmentUpdate(updatedShipment)
    }
    onClose()
  }

  const calculateTaskProgress = () => {
    if (!tasks || tasks.length === 0) return 0
    const completedTasks = tasks.filter((task) => task.completed).length
    return Math.round((completedTasks / tasks.length) * 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Shipment Details: {shipment.id}</DialogTitle>
          <DialogDescription>View and update shipment information</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Origin</Label>
              <div className="font-medium">{shipment.origin}</div>
            </div>
            <div>
              <Label>Destination</Label>
              <div className="font-medium">{shipment.destination}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Status</Label>
              <div className="font-medium capitalize">{shipment.status}</div>
            </div>
            <div>
              <Label>Type</Label>
              <div className="font-medium capitalize">{shipment.type || "N/A"}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Departure Date</Label>
              <div className="font-medium">
                {shipment.departureDate ? format(new Date(shipment.departureDate), "MMM d, yyyy") : "Not set"}
              </div>
            </div>
            <div>
              <Label>Arrival Date</Label>
              <div className="font-medium">
                {shipment.arrivalDate ? format(new Date(shipment.arrivalDate), "MMM d, yyyy") : "Not set"}
              </div>
            </div>
          </div>

          <div>
            <Label>Animals</Label>
            <div className="font-medium">{shipment.animals || "N/A"}</div>
          </div>

          {tasks && tasks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Tasks</Label>
                <span className="text-sm text-muted-foreground">
                  {tasks.filter((t) => t.completed).length}/{tasks.length} completed
                </span>
              </div>
              <Progress value={calculateTaskProgress()} className="h-2 mb-3" />
              <div className="space-y-2 border rounded-md p-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                    />
                    <Label
                      htmlFor={`task-${task.id}`}
                      className={`${task.completed ? "line-through text-muted-foreground" : ""}`}
                    >
                      {task.description}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

