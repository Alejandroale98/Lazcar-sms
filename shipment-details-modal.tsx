"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { ClipboardList, FileText, Truck, Calendar, DollarSign, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import type { Shipment, Task } from "@/lib/types"

interface ShipmentDetailsModalProps {
  shipment: Shipment | null
  isOpen: boolean
  onClose: () => void
  onTaskUpdate: (shipmentId: string, taskId: string, completed: boolean) => void
}

export function ShipmentDetailsModal({ shipment, isOpen, onClose, onTaskUpdate }: ShipmentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("tasks")

  if (!shipment) return null

  const completedTasks = shipment.tasks.filter((task) => task.completed).length
  const totalTasks = shipment.tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  // Group tasks by category
  const tasksByCategory: Record<string, Task[]> = {}
  shipment.tasks.forEach((task) => {
    if (!tasksByCategory[task.category]) {
      tasksByCategory[task.category] = []
    }
    tasksByCategory[task.category].push(task)
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500"
      case "in progress":
        return "bg-yellow-500"
      case "pending":
        return "bg-blue-500"
      case "delayed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Shipment #{shipment.id}</DialogTitle>
            <Badge className={`${getStatusColor(shipment.status)} text-white`}>{shipment.status}</Badge>
          </div>
          <DialogDescription>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{shipment.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-medium">{shipment.route}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Animal Type</p>
                <p className="font-medium">{shipment.animalType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Number of Animals</p>
                <p className="font-medium">{shipment.animalCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Departure Date</p>
                <p className="font-medium">{formatDate(shipment.departureDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Agents</p>
                <p className="font-medium">{shipment.agents.join(", ")}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Task Completion</span>
                <span>
                  {completedTasks}/{totalTasks} tasks completed
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="tasks" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Logistics
            </TabsTrigger>
            <TabsTrigger value="accounting" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Accounting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-6">
            {Object.entries(tasksByCategory).map(([category, tasks]) => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg mb-3">{category}</h3>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-md">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={(checked) => {
                          onTaskUpdate(shipment.id, task.id, checked as boolean)
                        }}
                      />
                      <div className="flex-1">
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`font-medium cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
                        >
                          {task.name}
                        </label>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                        {task.dueDate && (
                          <div className="flex items-center gap-2 mt-2 text-sm">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            <span className={task.overdue ? "text-red-500 font-medium" : "text-gray-500"}>
                              Due: {formatDate(task.dueDate)}
                              {task.overdue && " (Overdue)"}
                            </span>
                          </div>
                        )}
                      </div>
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : task.overdue ? (
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(tasksByCategory).length === 0 && (
              <div className="text-center py-8 text-gray-500">No tasks found for this shipment.</div>
            )}
          </TabsContent>

          <TabsContent value="documents">
            <div className="text-center py-8 text-gray-500">
              Document management will be implemented in a future update.
            </div>
          </TabsContent>

          <TabsContent value="logistics">
            <div className="text-center py-8 text-gray-500">
              Logistics tracking will be implemented in a future update.
            </div>
          </TabsContent>

          <TabsContent value="accounting">
            <div className="text-center py-8 text-gray-500">
              Accounting information will be implemented in a future update.
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

