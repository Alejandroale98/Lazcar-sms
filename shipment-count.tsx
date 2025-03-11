"use client"

import { useRouter } from "next/navigation"

interface ShipmentCountProps {
  date: Date
  shipments: any[]
}

export function ShipmentCount({ date, shipments }: ShipmentCountProps) {
  const router = useRouter()

  const getShipmentsByType = (type: string) => {
    return shipments.filter(
      (shipment) =>
        new Date(shipment.date).toDateString() === date.toDateString() &&
        shipment.type.toLowerCase() === type.toLowerCase(),
    ).length
  }

  const imports = getShipmentsByType("import")
  const exports = getShipmentsByType("export")
  const inTransits = getShipmentsByType("in-transit")
  const total = imports + exports + inTransits

  if (total === 0) {
    return <div className="text-sm text-muted-foreground">No shipments on this date</div>
  }

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">Shipments on this date:</div>
      <div className="space-y-0.5 text-sm">
        {imports > 0 && (
          <div className="text-red-500">
            {imports} Import{imports !== 1 ? "s" : ""}
          </div>
        )}
        {exports > 0 && (
          <div className="text-blue-500">
            {exports} Export{exports !== 1 ? "s" : ""}
          </div>
        )}
        {inTransits > 0 && (
          <div className="text-yellow-500">
            {inTransits} In-Transit{inTransits !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  )
}

