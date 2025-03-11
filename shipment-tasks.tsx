"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Circle, ExternalLink, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Task {
  id: string
  title: string
  completed: boolean
  description?: string
  externalLink?: string
  fileTemplate?: string
  notes?: string
}

interface ShipmentTasksProps {
  shipmentId: string
  shipmentType: "import" | "export" | "in-transit"
  shipmentNumber: string
}

export function ShipmentTasks({ shipmentId, shipmentType, shipmentNumber }: ShipmentTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [progress, setProgress] = useState(0)

  // Load tasks for this shipment
  useEffect(() => {
    // In a real implementation, this would load from the database
    // For now, we'll simulate loading from localStorage
    const shipments = JSON.parse(localStorage.getItem("shipments") || "[]")
    const shipment = shipments.find((s: any) => s.id === shipmentId)

    if (shipment && shipment.tasks) {
      setTasks(shipment.tasks)

      // Calculate progress
      const completedCount = shipment.tasks.filter((t: Task) => t.completed).length
      const totalCount = shipment.tasks.length
      setProgress(totalCount > 0 ? (completedCount / totalCount) * 100 : 0)
    } else {
      // If no tasks found, load default tasks from settings based on shipment type
      setTasks(getDefaultTasksForType(shipmentType))
    }
  }, [shipmentId, shipmentType])

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))

    setTasks(updatedTasks)

    // Calculate new progress
    const completedCount = updatedTasks.filter((t) => t.completed).length
    const totalCount = updatedTasks.length
    setProgress(totalCount > 0 ? (completedCount / totalCount) * 100 : 0)

    // Update in localStorage
    const shipments = JSON.parse(localStorage.getItem("shipments") || "[]")
    const updatedShipments = shipments.map((s: any) => {
      if (s.id === shipmentId) {
        return { ...s, tasks: updatedTasks }
      }
      return s
    })

    localStorage.setItem("shipments", JSON.stringify(updatedShipments))
  }

  // Get default tasks based on shipment type
  const getDefaultTasksForType = (type: string): Task[] => {
    // In a real implementation, this would fetch from settings
    if (type === "import") {
      return [
        {
          id: "imp-1",
          title: "Verify Bill of Lading",
          completed: false,
          description:
            "Check that the Bill of Lading matches the cargo manifest and contains all required information.",
          externalLink: "https://www.cbp.gov/trade/basic-import-export",
          fileTemplate: "templates/bill-of-lading-checklist.pdf",
        },
        {
          id: "imp-2",
          title: "Complete Customs Entry",
          completed: false,
          description: "File the necessary customs entry documents with CBP.",
          externalLink: "https://www.cbp.gov/trade/programs-administration/entry-summary",
          fileTemplate: "templates/customs-entry-form.pdf",
        },
        {
          id: "imp-3",
          title: "Arrange Customs Inspection",
          completed: false,
          description: "Schedule inspection with Customs and Border Protection.",
          externalLink: "https://www.cbp.gov/contact",
        },
        {
          id: "imp-4",
          title: "Pay Duties and Fees",
          completed: false,
          description: "Calculate and pay all applicable duties, taxes, and fees.",
          fileTemplate: "templates/duty-calculation-sheet.xlsx",
        },
        {
          id: "imp-5",
          title: "Arrange Delivery",
          completed: false,
          description: "Coordinate final delivery to the destination.",
          notes: "Remember to confirm delivery address and contact person before dispatching.",
        },
      ]
    } else if (type === "export") {
      return [
        {
          id: "exp-1",
          title: "Prepare Export Documentation",
          completed: false,
          description:
            "Prepare all required export documents including commercial invoice, packing list, and certificates of origin.",
          fileTemplate: "templates/export-document-checklist.pdf",
        },
        {
          id: "exp-2",
          title: "File Electronic Export Information (EEI)",
          completed: false,
          description: "Submit Electronic Export Information through the Automated Export System (AES).",
          externalLink: "https://www.cbp.gov/trade/aes",
        },
        {
          id: "exp-3",
          title: "Book Cargo Space",
          completed: false,
          description: "Reserve space with the carrier for the shipment.",
          notes: "Check for any special handling requirements for livestock.",
        },
        {
          id: "exp-4",
          title: "Prepare Shipping Instructions",
          completed: false,
          description: "Provide detailed shipping instructions to the carrier.",
          fileTemplate: "templates/shipping-instructions-template.docx",
        },
        {
          id: "exp-5",
          title: "Obtain Bill of Lading",
          completed: false,
          description: "Receive and verify the Bill of Lading from the carrier.",
          externalLink: "https://www.cbp.gov/trade/programs-administration/documents/bill-of-lading",
        },
      ]
    } else {
      return [
        {
          id: "trn-1",
          title: "Prepare Transit Documentation",
          completed: false,
          description: "Prepare all documents required for in-transit shipments.",
          fileTemplate: "templates/transit-document-checklist.pdf",
        },
        {
          id: "trn-2",
          title: "File In-Bond Request",
          completed: false,
          description: "Submit in-bond transportation request to CBP.",
          externalLink: "https://www.cbp.gov/trade/programs-administration/entry-summary/in-bond",
        },
        {
          id: "trn-3",
          title: "Arrange Customs Sealing",
          completed: false,
          description: "Schedule customs sealing of the container or vehicle.",
          notes: "Ensure all documentation is ready before scheduling sealing.",
        },
        {
          id: "trn-4",
          title: "Monitor Transit Progress",
          completed: false,
          description: "Track the shipment throughout the transit process.",
          externalLink: "https://www.cbp.gov/trade/automated/systems",
        },
        {
          id: "trn-5",
          title: "Complete Transit Closure",
          completed: false,
          description: "File transit closure with customs upon arrival at destination.",
          fileTemplate: "templates/transit-closure-form.pdf",
        },
      ]
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Tasks for {shipmentNumber}</CardTitle>
            <CardDescription>
              {shipmentType.charAt(0).toUpperCase() + shipmentType.slice(1)} shipment tasks
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">
              {tasks.filter((t) => t.completed).length} of {tasks.length} completed
            </div>
            <Progress value={progress} className="h-2 w-[120px] mt-1" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-0.5"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{task.title}</div>
                  <div className="flex items-center space-x-2">
                    {task.externalLink && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                              <a href={task.externalLink} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>External resource</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {task.fileTemplate && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Download template</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {(task.description || task.notes) && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{task.title}</DialogTitle>
                            <DialogDescription>Task details and instructions</DialogDescription>
                          </DialogHeader>

                          {task.description && (
                            <div className="py-2">
                              <h4 className="text-sm font-medium mb-1">Description</h4>
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                            </div>
                          )}

                          {task.notes && (
                            <div className="py-2">
                              <h4 className="text-sm font-medium mb-1">Notes</h4>
                              <p className="text-sm text-muted-foreground">{task.notes}</p>
                            </div>
                          )}

                          <div className="flex justify-between items-center mt-4 pt-4 border-t">
                            <div className="flex items-center text-sm text-muted-foreground">
                              {task.completed ? (
                                <>
                                  <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                                  Completed
                                </>
                              ) : (
                                <>
                                  <Circle className="h-4 w-4 mr-1" />
                                  Pending
                                </>
                              )}
                            </div>

                            <div className="flex space-x-2">
                              {task.fileTemplate && (
                                <Button variant="outline" size="sm">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Download Template
                                </Button>
                              )}

                              {task.externalLink && (
                                <Button size="sm" asChild>
                                  <a href={task.externalLink} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Open Resource
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
                {task.description && <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

