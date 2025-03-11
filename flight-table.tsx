"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const flights = [
  {
    id: 1,
    departureDate: "2024-03-01",
    destination: "San Diego",
    available: true,
  },
  {
    id: 2,
    departureDate: "2024-03-15",
    destination: "New York",
    available: false,
  },
  {
    id: 3,
    departureDate: "2024-04-01",
    destination: "Toronto",
    available: true,
  },
]

export function FlightTable() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Flights</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Flight
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Departure Date</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>{flight.id}</TableCell>
              <TableCell>{flight.departureDate}</TableCell>
              <TableCell>{flight.destination}</TableCell>
              <TableCell>
                <Badge variant={flight.available ? "success" : "destructive"}>
                  {flight.available ? "Available" : "Unavailable"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

