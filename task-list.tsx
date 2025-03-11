"use client"

import type React from "react"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, FileText, Plus, Trash2, ExternalLink, GripVertical, Pencil, LinkIcon } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { updateShipmentTask, addFileToTask, updateTaskEmailRecipients, sendFileToEmails } from "@/lib/database"
import { Label } from "@/components/ui/label"

interface TaskFile {
  name: string
  url: string
  uploadedAt: string
}

interface Task {
  id: string
  title: string
  description: string
  status?: "pending" | "in-progress" | "completed"
  dueDate?: string
  files?: TaskFile[]
  emailRecipients?: string[]
  defaultDocuments?: TaskFile[]
  externalLink: string | null
  fileTemplate: string | null
  order: number
}

interface TaskListProps {
  tasks: Task[]
  shipmentId: string
  shipmentNumber: string
  shipmentType: "import" | "export" | "in-transit"
  onTaskStatusChange?: (taskId: string, completed: boolean) => void
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export function TaskList({
  tasks,
  shipmentId,
  shipmentNumber,
  shipmentType,
  onTaskStatusChange,
  setTasks,
}: TaskListProps) {
  const [confirmTask, setConfirmTask] = useState<{ open: boolean; taskId: string; completed: boolean }>({
    open: false,
    taskId: "",
    completed: false,
  })
  const [uploadingTask, setUploadingTask] = useState<string | null>(null)
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState<string | null>(null)
  const [newEmail, setNewEmail] = useState("")
  const [sendFileDialog, setSendFileDialog] = useState<{ open: boolean; taskId: string; fileName: string }>({
    open: false,
    taskId: "",
    fileName: "",
  })
  const [editDocumentDialog, setEditDocumentDialog] = useState<{
    open: boolean
    taskId: string
    file: TaskFile | null
  }>({
    open: false,
    taskId: "",
    file: null,
  })
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "outline"
      case "in-progress":
        return "secondary"
      case "pending":
      default:
        return "default"
    }
  }

  const handleCheckboxChange = (taskId: string, checked: boolean) => {
    // Open confirmation dialog instead of immediately changing status
    setConfirmTask({
      open: true,
      taskId,
      completed: checked,
    })
  }

  const confirmStatusChange = () => {
    if (onTaskStatusChange) {
      onTaskStatusChange(confirmTask.taskId, confirmTask.completed)
    } else {
      // If no callback provided, update directly
      updateShipmentTask(shipmentId, confirmTask.taskId, {
        status: confirmTask.completed ? "completed" : "pending",
      })

      toast({
        title: confirmTask.completed ? "Task completed" : "Task reopened",
        description: `Task has been ${confirmTask.completed ? "marked as complete" : "reopened"}.`,
      })
    }

    // Close the dialog
    setConfirmTask({ open: false, taskId: "", completed: false })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileUpload(e.target.files[0])
    }
  }

  const uploadFile = async () => {
    if (!fileUpload || !uploadingTask) return

    try {
      // In a real app, you would upload to a server here
      // For this demo, we'll simulate a file URL
      const fileUrl = URL.createObjectURL(fileUpload)

      // Add file to the task
      const file = {
        name: fileUpload.name,
        url: fileUrl,
        uploadedAt: new Date().toISOString(),
      }

      addFileToTask(shipmentId, uploadingTask, file)

      // Reset state
      setFileUpload(null)
      setUploadingTask(null)

      toast({
        title: "File uploaded",
        description: `${fileUpload.name} has been attached to the task.`,
      })
    } catch (error) {
      console.error("Error uploading file:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      })
    }
  }

  const openEmailDialog = (taskId: string) => {
    setCurrentTask(taskId)
    setEmailDialogOpen(true)
  }

  const addEmailRecipient = () => {
    if (!currentTask || !newEmail || !newEmail.includes("@")) return

    const task = tasks.find((t) => t.id === currentTask)
    if (!task) return

    const existingEmails = task.emailRecipients || []

    // Don't add duplicates
    if (existingEmails.includes(newEmail)) {
      toast({
        title: "Email already added",
        description: "This email is already in the recipients list.",
        variant: "destructive",
      })
      return
    }

    const updatedEmails = [...existingEmails, newEmail]

    updateTaskEmailRecipients(shipmentId, currentTask, updatedEmails)

    // Reset input
    setNewEmail("")

    toast({
      title: "Email added",
      description: `${newEmail} has been added to the recipients list.`,
    })
  }

  const removeEmailRecipient = (taskId: string, email: string) => {
    const task = tasks.find((t) => t.id === taskId)
    if (!task || !task.emailRecipients) return

    const updatedEmails = task.emailRecipients.filter((e) => e !== email)

    updateTaskEmailRecipients(shipmentId, taskId, updatedEmails)

    toast({
      title: "Email removed",
      description: `${email} has been removed from the recipients list.`,
    })
  }

  const handleSendFile = (taskId: string, fileName: string) => {
    setSendFileDialog({
      open: true,
      taskId,
      fileName,
    })
  }

  const confirmSendFile = () => {
    const { taskId, fileName } = sendFileDialog

    // Get the task and its email recipients
    const task = tasks.find((t) => t.id === taskId)
    if (!task || !task.emailRecipients || task.emailRecipients.length === 0) {
      toast({
        title: "No recipients",
        description: "Please add email recipients for this task first.",
        variant: "destructive",
      })
      setSendFileDialog({ open: false, taskId: "", fileName: "" })
      return
    }

    // Find the file
    const file = task.files?.find((f) => f.name === fileName)
    if (!file) {
      toast({
        title: "File not found",
        description: "The selected file could not be found.",
        variant: "destructive",
      })
      setSendFileDialog({ open: false, taskId: "", fileName: "" })
      return
    }

    // In a real app, this would send the file to the backend
    // For this demo, we'll simulate sending
    const result = sendFileToEmails(shipmentId, taskId, fileName, task.emailRecipients)

    if (result) {
      toast({
        title: "File sent",
        description: `${fileName} has been sent to ${task.emailRecipients.length} recipient(s).`,
      })
    } else {
      toast({
        title: "Send failed",
        description: "There was an error sending the file.",
        variant: "destructive",
      })
    }

    // Close dialog
    setSendFileDialog({ open: false, taskId: "", fileName: "" })
  }

  const openEditDocumentDialog = (taskId: string, file: TaskFile) => {
    setEditDocumentDialog({
      open: true,
      taskId,
      file,
    })
  }

  // Function to handle task reordering
  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(tasks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update order property
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setTasks(updatedItems)
  }

  // Function to add a new task
  const handleAddTask = () => {
    const newTask: Task = {
      id: `${shipmentType.substring(0, 3)}-${tasks.length + 1}`,
      title: "New Task",
      description: "Task description",
      externalLink: null,
      fileTemplate: null,
      order: tasks.length + 1,
    }

    setEditingTask(newTask)
    setIsDialogOpen(true)
  }

  // Function to edit a task
  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setIsDialogOpen(true)
  }

  // Function to delete a task
  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = tasks
      .filter((task) => task.id !== taskId)
      .map((task, index) => ({
        ...task,
        order: index + 1,
      }))

    setTasks(updatedTasks)
  }

  // Function to save task changes
  const handleSaveTask = () => {
    if (!editingTask) return

    if (tasks.some((task) => task.id === editingTask.id)) {
      // Update existing task
      setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
    } else {
      // Add new task
      setTasks([...tasks, editingTask])
    }

    setIsDialogOpen(false)
    setEditingTask(null)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Tasks for {shipmentNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {tasks
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card ref={provided.innerRef} {...provided.draggableProps} className="border border-border">
                            <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div {...provided.dragHandleProps} className="cursor-grab">
                                  <GripVertical className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-base font-medium">
                                  {task.order}. {task.title}
                                </CardTitle>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-sm text-muted-foreground">{task.description}</p>
                              {(task.externalLink || task.fileTemplate) && (
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {task.externalLink && (
                                    <div className="flex items-center text-xs text-blue-600">
                                      <LinkIcon className="mr-1 h-3 w-3" />
                                      External link available
                                    </div>
                                  )}
                                  {task.fileTemplate && (
                                    <div className="flex items-center text-xs text-green-600">
                                      <FileText className="mr-1 h-3 w-3" />
                                      Template file available
                                    </div>
                                  )}
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>

      <Button onClick={handleAddTask} className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add New Task
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingTask && tasks.some((task) => task.id === editingTask.id) ? "Edit Task" : "Add New Task"}
            </DialogTitle>
            <DialogDescription>Configure the details for this shipment task</DialogDescription>
          </DialogHeader>

          {editingTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={editingTask.title}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingTask.description}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  }
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="externalLink">External Link (Optional)</Label>
                <Input
                  id="externalLink"
                  value={editingTask.externalLink || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      externalLink: e.target.value || null,
                    })
                  }
                  placeholder="https://example.com"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fileTemplate">File Template Name (Optional)</Label>
                <Input
                  id="fileTemplate"
                  value={editingTask.fileTemplate || ""}
                  onChange={(e) =>
                    setEditingTask({
                      ...editingTask,
                      fileTemplate: e.target.value || null,
                    })
                  }
                  placeholder="template_name.pdf"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTask}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Task Completion */}
      <AlertDialog open={confirmTask.open} onOpenChange={(open) => !open && setConfirmTask({ ...confirmTask, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmTask.completed ? "Mark task as complete?" : "Reopen task?"}</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmTask.completed
                ? "Are you sure you want to mark this task as complete? This will update the shipment status."
                : "Are you sure you want to reopen this task? This will update the shipment status."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              {confirmTask.completed ? "Complete Task" : "Reopen Task"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Email Recipients Dialog */}
      <Dialog open={emailDialogOpen} onOpenChange={setEmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Email Recipients</DialogTitle>
            <DialogDescription>
              Add email addresses that should receive files and updates for this task.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Current Recipients</h4>
              <div className="max-h-32 overflow-y-auto space-y-1">
                {(currentTask &&
                  tasks
                    .find((t) => t.id === currentTask)
                    ?.emailRecipients?.map((email, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted rounded p-2 text-sm">
                        <span>{email}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeEmailRecipient(currentTask, email)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))) || <p className="text-sm text-muted-foreground py-2">No recipients added yet.</p>}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Add New Recipient</h4>
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <Button onClick={addEmailRecipient} disabled={!newEmail.includes("@")}>
                  Add
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setEmailDialogOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send File Confirmation Dialog */}
      <AlertDialog
        open={sendFileDialog.open}
        onOpenChange={(open) => !open && setSendFileDialog({ ...sendFileDialog, open: false })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Send file to recipients?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send "{sendFileDialog.fileName}" to all email recipients configured for this task.
              {currentTask && tasks.find((t) => t.id === sendFileDialog.taskId)?.emailRecipients?.length > 0 && (
                <div className="mt-2">
                  <span className="font-medium">Recipients:</span>
                  <ul className="mt-1 list-disc pl-5">
                    {tasks
                      .find((t) => t.id === sendFileDialog.taskId)
                      ?.emailRecipients?.map((email, index) => (
                        <li key={index} className="text-xs">
                          {email}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmSendFile}>Send Email</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Document Dialog */}
      <Dialog
        open={editDocumentDialog.open}
        onOpenChange={(open) => !open && setEditDocumentDialog({ ...editDocumentDialog, open: false })}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Document</DialogTitle>
            <DialogDescription>Make changes to the document details.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {editDocumentDialog.file && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Document Name</label>
                  <Input
                    value={editDocumentDialog.file.name}
                    onChange={(e) =>
                      setEditDocumentDialog({
                        ...editDocumentDialog,
                        file: { ...editDocumentDialog.file!, name: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Document URL</label>
                  <Input
                    value={editDocumentDialog.file.url}
                    onChange={(e) =>
                      setEditDocumentDialog({
                        ...editDocumentDialog,
                        file: { ...editDocumentDialog.file!, url: e.target.value },
                      })
                    }
                  />
                </div>

                <div className="pt-2">
                  <a
                    href={editDocumentDialog.file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    View current document
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDocumentDialog({ open: false, taskId: "", file: null })}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // In a real app, this would update the document in the database
                toast({
                  title: "Document updated",
                  description: "The document details have been updated.",
                })
                setEditDocumentDialog({ open: false, taskId: "", file: null })
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

