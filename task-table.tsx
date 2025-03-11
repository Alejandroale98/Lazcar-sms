"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const tasks = [
  {
    id: 1,
    shipmentId: 1,
    description: "Prepare horse transport",
    deadline: "2024-02-28",
  },
  {
    id: 2,
    shipmentId: 2,
    description: "Arrange pig enclosure",
    deadline: "2024-03-10",
  },
  {
    id: 3,
    shipmentId: 3,
    description: "Set up cattle feed schedule",
    deadline: "2024-03-25",
  },
]

export function TaskTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Shipment ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.shipmentId}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

