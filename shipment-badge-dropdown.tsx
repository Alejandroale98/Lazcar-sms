"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface Shipment {
  id: string
  shipmentNumber: string
  date: string
  type: string
  originCountry?: string
  destinationCountry?: string
  animalType?: string
  numAnimals?: number
  tasks?: Array<{
    id: string
    title: string
    completed: boolean
  }>
}

interface ShipmentBadgeDropdownProps {
  shipments: Shipment[]
}

export function ShipmentBadgeDropdown({ shipments }: ShipmentBadgeDropdownProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  // Sort shipments by date (closest first)
  const sortedShipments = [...shipments].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  const handleSelectShipment = (shipmentId: string) => {
    router.push(`/shipments/${shipmentId}`)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1">
          <Badge variant="secondary" className="text-xs">
            {shipments.length} pending shipment{shipments.length !== 1 ? "s" : ""}
          </Badge>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-64">
        {sortedShipments.map((shipment) => (
          <DropdownMenuItem
            key={shipment.id}
            onClick={() => handleSelectShipment(shipment.id)}
            className="flex flex-col items-start py-2"
          >
            <div className="font-medium">{shipment.shipmentNumber}</div>
            <div className="flex w-full items-center justify-between text-xs text-muted-foreground">
              <span>{format(new Date(shipment.date), "MMM d, yyyy")}</span>
              <Badge
                variant={
                  shipment.type.toLowerCase() === "import"
                    ? "destructive"
                    : shipment.type.toLowerCase() === "export"
                      ? "default"
                      : "outline"
                }
                className="text-[10px]"
              >
                {shipment.type}
              </Badge>
            </div>
            <div className="mt-1 text-xs">
              {shipment.originCountry} → {shipment.destinationCountry}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

