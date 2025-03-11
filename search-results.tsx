"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"
import { Plane, ClipboardList } from "lucide-react"
import { useRouter } from "next/navigation"

interface Shipment {
  id: string
  type: string
  animalType: string
  numAnimals: number
  date: string
  horseName?: string
  ownerName?: string
  agents?: {
    name: string
    animalCount: number
  }[]
  tasks?: {
    id: string
    description: string
    completed: boolean
    deadline: string
    required: boolean
  }[]
  originAirport?: string
  destinationAirport?: string
}

interface SearchResultsProps {
  shipments: Shipment[]
  onClose: () => void
}

export function SearchResults({ shipments, onClose }: SearchResultsProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "import":
        return "bg-red-500"
      case "export":
        return "bg-blue-500"
      case "in-transit":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTaskProgress = (shipment: Shipment) => {
    if (!shipment.tasks || shipment.tasks.length === 0) return 0
    const completed = shipment.tasks.filter((task) => task.completed).length
    return (completed / shipment.tasks.length) * 100
  }

  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Search Results</h3>
        <Button variant="ghost" onClick={onClose}>
          Close Results
        </Button>
      </div>
      <div className="space-y-4">
        {shipments.map((shipment) => (
          <Card key={shipment.id} className="p-4">
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", getTypeColor(shipment.type))} />
                    <div className="font-medium">{shipment.type}</div>
                    <div className="text-muted-foreground">•</div>
                    <div>{format(parseISO(shipment.date), "MMM d, yyyy")}</div>
                  </div>
                  <Badge variant="outline">{shipment.animalType}</Badge>
                </div>

                <div className="grid gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Animals:</span>
                    <span>{shipment.numAnimals}</span>
                  </div>

                  {(shipment.originAirport || shipment.destinationAirport) && (
                    <div className="flex items-center gap-2">
                      <Plane className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {shipment.originAirport} → {shipment.destinationAirport}
                      </span>
                    </div>
                  )}

                  {shipment.horseName && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Horse:</span>
                      <span>{shipment.horseName}</span>
                    </div>
                  )}

                  {shipment.ownerName && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Owner:</span>
                      <span>{shipment.ownerName}</span>
                    </div>
                  )}

                  {shipment.agents && shipment.agents.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Agents:</span>
                      <span>{shipment.agents.map((a) => a.name).join(", ")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <div className="text-muted-foreground">
                      {shipment.tasks
                        ? `${shipment.tasks.filter((t) => t.completed).length}/${shipment.tasks.length} tasks complete`
                        : "No tasks created"}
                    </div>
                    <div className="text-muted-foreground">{Math.round(getTaskProgress(shipment))}%</div>
                  </div>
                  <Progress value={getTaskProgress(shipment)} className="h-2" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="flex items-center gap-2" onClick={() => router.push(`/shipments/${shipment.id}`)}>
                  <ClipboardList className="h-4 w-4" />
                  Work on Shipment
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {shipments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No shipments found matching your search criteria</div>
        )}
      </div>
    </div>
  )
}

