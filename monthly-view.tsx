"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UpdatedShipmentTable } from "./updated-shipment-table"
import { format, parse, startOfMonth, endOfMonth } from "date-fns"

export function MonthlyView({ shipments = [], onShipmentUpdate, onSendToAccounting }) {
  const [selectedMonth, setSelectedMonth] = useState(format(new Date(), "yyyy-MM"))

  // Generate list of months (current year and previous year)
  const generateMonthOptions = () => {
    const options = []
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()

    // Add months for current year and previous year
    for (let year = currentYear; year >= currentYear - 1; year--) {
      for (let month = 11; month >= 0; month--) {
        const date = new Date(year, month, 1)
        options.push({
          value: format(date, "yyyy-MM"),
          label: format(date, "MMMM yyyy"),
        })
      }
    }

    return options
  }

  const monthOptions = generateMonthOptions()

  // Filter shipments for the selected month
  const filterShipmentsByMonth = (shipments, monthStr) => {
    if (!Array.isArray(shipments) || shipments.length === 0) return []

    try {
      const selectedDate = parse(monthStr, "yyyy-MM", new Date())
      const monthStart = startOfMonth(selectedDate)
      const monthEnd = endOfMonth(selectedDate)

      return shipments.filter((shipment) => {
        // Check if departure date falls within the selected month
        if (shipment.departureDate) {
          const departureDate = new Date(shipment.departureDate)
          return departureDate >= monthStart && departureDate <= monthEnd
        }
        return false
      })
    } catch (error) {
      console.error("Error filtering shipments by month:", error)
      return []
    }
  }

  const filteredShipments = filterShipmentsByMonth(shipments, selectedMonth)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Monthly Shipments</CardTitle>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <UpdatedShipmentTable
            shipments={filteredShipments}
            onShipmentUpdate={onShipmentUpdate}
            onSendToAccounting={onSendToAccounting}
          />
        </CardContent>
      </Card>
    </div>
  )
}

