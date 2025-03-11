"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { format, parseISO, isSameMonth, isSameYear } from "date-fns"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
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
}

interface DatabaseViewProps {
  type: "horse" | "agent" | "owner"
  shipments: Shipment[]
}

type EntityData = {
  name: string
  country?: string
  shipmentCount: number
  shipments: Shipment[]
  lastShipment: string
}

type ShipmentCounts = {
  imports: number
  exports: number
  inTransits: number
  total: number
}

export function DatabaseView({ type, shipments }: DatabaseViewProps) {
  const [search, setSearch] = useState("")
  const [selectedMonth, setSelectedMonth] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [view, setView] = useState<"list" | "statistics">("list")
  const router = useRouter()

  const getShipmentCounts = (entityShipments: Shipment[]): ShipmentCounts => {
    const filtered = entityShipments.filter((shipment) => {
      if (!selectedMonth || !selectedYear) return true
      const shipmentDate = parseISO(shipment.date)
      return (
        isSameMonth(shipmentDate, new Date(Number.parseInt(selectedYear), Number.parseInt(selectedMonth) - 1)) &&
        isSameYear(shipmentDate, new Date(Number.parseInt(selectedYear), 0))
      )
    })

    return {
      imports: filtered.filter((s) => s.type.toLowerCase() === "import").length,
      exports: filtered.filter((s) => s.type.toLowerCase() === "export").length,
      inTransits: filtered.filter((s) => s.type.toLowerCase() === "in-transit").length,
      total: filtered.length,
    }
  }

  const getEntities = () => {
    const entities = new Map<string, EntityData>()

    shipments.forEach((shipment) => {
      if (type === "horse" && shipment.horseName) {
        if (!entities.has(shipment.horseName)) {
          entities.set(shipment.horseName, {
            name: shipment.horseName,
            shipmentCount: 0,
            shipments: [],
            lastShipment: shipment.date,
          })
        }
        const data = entities.get(shipment.horseName)!
        data.shipmentCount++
        data.shipments.push(shipment)
        if (parseISO(shipment.date) > parseISO(data.lastShipment)) {
          data.lastShipment = shipment.date
        }
      } else if (type === "owner" && shipment.ownerName) {
        if (!entities.has(shipment.ownerName)) {
          entities.set(shipment.ownerName, {
            name: shipment.ownerName,
            shipmentCount: 0,
            shipments: [],
            lastShipment: shipment.date,
          })
        }
        const data = entities.get(shipment.ownerName)!
        data.shipmentCount++
        data.shipments.push(shipment)
        if (parseISO(shipment.date) > parseISO(data.lastShipment)) {
          data.lastShipment = shipment.date
        }
      } else if (type === "agent" && shipment.agents) {
        shipment.agents.forEach((agent) => {
          if (!entities.has(agent.name)) {
            // Get the agent's country from the database
            const db = JSON.parse(localStorage.getItem("shipping_database") || "{}")
            const agentData = db.agents?.find((a: any) => a.name === agent.name)

            entities.set(agent.name, {
              name: agent.name,
              country: agentData?.country,
              shipmentCount: 0,
              shipments: [],
              lastShipment: shipment.date,
            })
          }
          const data = entities.get(agent.name)!
          data.shipmentCount++
          data.shipments.push(shipment)
          if (parseISO(shipment.date) > parseISO(data.lastShipment)) {
            data.lastShipment = shipment.date
          }
        })
      }
    })

    return Array.from(entities.values())
  }

  const entities = getEntities()
  const filteredEntities = entities.filter((entity) => entity.name.toLowerCase().includes(search.toLowerCase()))

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}s...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 w-[300px]"
          />
        </div>
        <Tabs value={view} onValueChange={(v) => setView(v as "list" | "statistics")}>
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {view === "statistics" && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Shipment Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = new Date(2024, i, 1)
                      return (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {format(month, "MMMM")}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - 2 + i
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEntities.map((entity) => {
                  const counts = getShipmentCounts(entity.shipments)
                  return (
                    <Card key={entity.name} className="p-4">
                      <h3 className="font-semibold mb-2">
                        {entity.name}
                        {entity.country && (
                          <span className="ml-2 font-normal italic text-muted-foreground">{entity.country}</span>
                        )}
                      </h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-red-500">Imports:</span>
                          <span>{counts.imports}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-blue-500">Exports:</span>
                          <span>{counts.exports}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-500">In-Transit:</span>
                          <span>{counts.inTransits}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-1 border-t">
                          <span>Total:</span>
                          <span>{counts.total}</span>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {view === "list" && (
        <div className="grid gap-4">
          {filteredEntities.map((entity) => (
            <Card key={entity.name} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center gap-2">
                      {entity.name}
                      {entity.country && (
                        <span className="text-base font-normal italic text-muted-foreground">{entity.country}</span>
                      )}
                    </CardTitle>
                    <div className="text-sm text-muted-foreground">
                      {entity.shipmentCount} shipment{entity.shipmentCount !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Last shipment: {format(parseISO(entity.lastShipment), "MMM d, yyyy")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entity.shipments.map((shipment) => (
                    <Link key={shipment.id} href={`/shipments/${shipment.id}`}>
                      <Card className="p-4 hover:bg-muted/50 transition-colors">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={cn("w-2 h-2 rounded-full", getTypeColor(shipment.type))} />
                              <div className="font-medium">{shipment.type}</div>
                              <div className="text-muted-foreground">•</div>
                              <div>{format(parseISO(shipment.date), "MMM d, yyyy")}</div>
                              <div className="text-muted-foreground">•</div>
                              <div className="text-muted-foreground">
                                {shipment.numAnimals} {shipment.animalType}
                              </div>
                            </div>
                            <Button
                              className="flex items-center gap-2"
                              onClick={() => router.push(`/shipments/${shipment.id}`)}
                            >
                              <ClipboardList className="h-4 w-4" />
                              Work on Shipment
                            </Button>
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
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredEntities.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No {type}s found matching your search</div>
          )}
        </div>
      )}
    </div>
  )
}

