"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ShipmentForm({ onSubmit, onCancel }) {
  const [newShipment, setNewShipment] = useState({
    id: `SHP${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")}`,
    origin: "",
    destination: "",
    status: "pending",
    type: "domestic",
    animals: "",
    departureDate: null,
    arrivalDate: null,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewShipment((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(newShipment)
  }

  const handleDateChange = (date, field) => {
    setNewShipment((prev) => ({
      ...prev,
      [field]: date,
    }))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add New Shipment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id">Shipment ID</Label>
              <Input id="id" name="id" value={newShipment.id} onChange={handleInputChange} readOnly />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                name="type"
                value={newShipment.type}
                onValueChange={(value) => setNewShipment((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="import">Import</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                  <SelectItem value="in_transit">In Transit</SelectItem>
                  <SelectItem value="domestic">Domestic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="origin">Origin</Label>
              <Input id="origin" name="origin" value={newShipment.origin} onChange={handleInputChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                name="destination"
                value={newShipment.destination}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newShipment.departureDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newShipment.departureDate ? (
                      format(new Date(newShipment.departureDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newShipment.departureDate ? new Date(newShipment.departureDate) : undefined}
                    onSelect={(date) => handleDateChange(date, "departureDate")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Arrival Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newShipment.arrivalDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newShipment.arrivalDate ? (
                      format(new Date(newShipment.arrivalDate), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={newShipment.arrivalDate ? new Date(newShipment.arrivalDate) : undefined}
                    onSelect={(date) => handleDateChange(date, "arrivalDate")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="col-span-2 space-y-2">
              <Label htmlFor="animals">Animals</Label>
              <Input
                id="animals"
                name="animals"
                value={newShipment.animals}
                onChange={handleInputChange}
                placeholder="e.g., Cows (5), Pigs (10)"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Create Shipment</Button>
      </CardFooter>
    </Card>
  )
}

