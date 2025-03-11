"use client"

import { CalendarView } from "@/components/calendar-view"

export function ShipmentCalendar() {
  const shipmentCounts = {
    import: 1,
    export: 2,
    "in-transit": 3,
  }
  return (
    <CalendarView
      renderDay={(date) => {
        return (
          <div className="flex flex-col">
            {date.getDate()}
            <div className="flex flex-col gap-1 mt-1">
              {shipmentCounts.import > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-medium">
                  {shipmentCounts.import} Import{shipmentCounts.import > 1 ? "s" : ""}
                </span>
              )}
              {shipmentCounts.export > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-medium">
                  {shipmentCounts.export} Export{shipmentCounts.export > 1 ? "s" : ""}
                </span>
              )}
              {shipmentCounts["in-transit"] > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 font-medium">
                  {shipmentCounts["in-transit"]} In-Transit{shipmentCounts["in-transit"] > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </div>
        )
      }}
    />
  )
}

