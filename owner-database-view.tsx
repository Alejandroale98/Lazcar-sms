"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { format, parseISO, isWithinInterval, startOfYear, endOfYear, startOfMonth, endOfMonth, addDays } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Search, Plane, ClipboardList, Filter } from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { BarChart2, List } from "lucide-react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AddOwnerDialog } from "@/components/add-owner-dialog"
import { getDatabase } from "@/lib/database"

const SELECTED_OWNERS_KEY = "selectedOwners"

interface OwnerDatabaseViewProps {
  shipments: any[]
  showUpcoming: boolean
  upcomingTimeframe: "2w" | "2m" | "1y"
  setShowUpcoming: (value: boolean) => void
  setUpcomingTimeframe: (value: "2w" | "2m" | "1y") => void
}

export function OwnerDatabaseView({
  shipments,
  showUpcoming,
  upcomingTimeframe,
  setShowUpcoming,
  setUpcomingTimeframe,
}: OwnerDatabaseViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState<"list" | "statistics">(() => {
    const saved = localStorage.getItem("owner_view_type")
    return (saved as "list" | "statistics") || "list"
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filterSearch, setFilterSearch] = useState("")
  const [shipmentTypeFilter, setShipmentTypeFilter] = useState<"all" | "import" | "export" | "in-transit">(() => {
    const saved = localStorage.getItem("owner_shipment_type_filter")
    return (saved as "all" | "import" | "export" | "in-transit") || "all"
  })

  // Get all unique owners from the database
  const [allOwners, setAllOwners] = useState<string[]>([])
  useEffect(() => {
    const db = getDatabase()
    const ownerNames = db.owners.map((owner) => owner.name).sort()
    setAllOwners(ownerNames)
  }, [])

  // Load selected owners from localStorage or default to all owners
  const [selectedOwners, setSelectedOwners] = useState<string[]>(() => {
    const saved = localStorage.getItem(SELECTED_OWNERS_KEY)
    return saved ? JSON.parse(saved) : allOwners
  })

  // Update selectedOwners when allOwners changes
  useEffect(() => {
    if (selectedOwners.length === 0 && allOwners.length > 0) {
      setSelectedOwners(allOwners)
    }
  }, [allOwners, selectedOwners.length])

  // Save view type when it changes
  useEffect(() => {
    localStorage.setItem("owner_view_type", view)
  }, [view])

  // Save shipment type filter when it changes
  useEffect(() => {
    localStorage.setItem("owner_shipment_type_filter", shipmentTypeFilter)
  }, [shipmentTypeFilter])

  // Save selected owners to localStorage
  useEffect(() => {
    localStorage.setItem(SELECTED_OWNERS_KEY, JSON.stringify(selectedOwners))
  }, [selectedOwners])

  // Filter owners based on search and selection
  const filteredOwners = allOwners.filter((owner) => {
    // First check if it matches the search query
    if (searchQuery && !owner.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // If showing upcoming shipments, check if the owner has any upcoming shipments
    if (showUpcoming) {
      const today = new Date()
      const futureDate =
        upcomingTimeframe === "2w"
          ? addDays(today, 14)
          : upcomingTimeframe === "2m"
            ? addDays(today, 60)
            : addDays(today, 365)

      const hasUpcomingShipments = shipments.some((shipment) => {
        const shipmentDate = parseISO(shipment.date)
        return shipment.ownerName === owner && isWithinInterval(shipmentDate, { start: today, end: futureDate })
      })

      if (!hasUpcomingShipments) return false
    }

    // Only apply owner filtering if specific owners have been selected
    if (selectedOwners.length < allOwners.length) {
      if (!selectedOwners.includes(owner)) return false
    }

    return true
  })

  const OwnerFilter = () => {
    const filteredForSelection = allOwners.filter((owner) => owner.toLowerCase().includes(filterSearch.toLowerCase()))

    const toggleAll = (checked: boolean) => {
      setSelectedOwners(checked ? allOwners : [])
    }

    const toggleOwner = (owner: string) => {
      setSelectedOwners((current) =>
        current.includes(owner) ? current.filter((a) => a !== owner) : [...current, owner],
      )
    }

    return (
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetContent side="left" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Filter Owners</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={selectedOwners.length === allOwners.length}
                  onCheckedChange={toggleAll}
                />
                <label htmlFor="selectAll" className="text-sm font-medium">
                  Select All
                </label>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search owners..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select
              value={shipmentTypeFilter}
              onValueChange={(value: "all" | "import" | "export" | "in-transit") => setShipmentTypeFilter(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select shipment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Shipments</SelectItem>
                <SelectItem value="import" className="text-red-500">
                  Imports Only
                </SelectItem>
                <SelectItem value="export" className="text-blue-500">
                  Exports Only
                </SelectItem>
                <SelectItem value="in-transit" className="text-yellow-500">
                  In-Transits Only
                </SelectItem>
              </SelectContent>
            </Select>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {filteredForSelection.map((owner) => (
                  <div key={owner} className="flex items-center space-x-2">
                    <Checkbox
                      id={owner}
                      checked={selectedOwners.includes(owner)}
                      onCheckedChange={() => toggleOwner(owner)}
                    />
                    <label
                      htmlFor={owner}
                      className="flex-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {owner}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search owners..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="upcoming-filter" checked={showUpcoming} onCheckedChange={setShowUpcoming} />
              <Label htmlFor="upcoming-filter">Show Upcoming Only</Label>
            </div>
            {showUpcoming && (
              <Select value={upcomingTimeframe} onValueChange={setUpcomingTimeframe}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2w">Next 2 Weeks</SelectItem>
                  <SelectItem value="2m">Next 2 Months</SelectItem>
                  <SelectItem value="1y">Next Year</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AddOwnerDialog onOwnerAdded={() => {}} />
          <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFilterOpen(true)}>
            <Filter className="h-4 w-4" />
            Filter Owners
            {selectedOwners.length !== allOwners.length && (
              <Badge variant="secondary" className="ml-2">
                {selectedOwners.length}
              </Badge>
            )}
          </Button>
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(value: "list" | "statistics") => value && setView(value)}
          >
            <ToggleGroupItem value="list" aria-label="List view">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="statistics" aria-label="Statistics view">
              <BarChart2 className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <OwnerFilter />

      <div className="space-y-6">
        {filteredOwners.map((ownerName) => (
          <OwnerStats
            key={ownerName}
            ownerName={ownerName}
            shipments={shipments.filter((shipment) => {
              // Check if this owner is involved in the shipment
              const isInvolved = shipment.ownerName === ownerName
              if (!isInvolved) return false

              // Apply shipment type filter
              if (shipmentTypeFilter !== "all" && shipment.type.toLowerCase() !== shipmentTypeFilter) {
                return false
              }

              // Apply upcoming filter if enabled
              if (showUpcoming) {
                const shipmentDate = parseISO(shipment.date)
                const today = new Date()
                const futureDate =
                  upcomingTimeframe === "2w"
                    ? addDays(today, 14)
                    : upcomingTimeframe === "2m"
                      ? addDays(today, 60)
                      : addDays(today, 365)
                return isWithinInterval(shipmentDate, { start: today, end: futureDate })
              }

              return true
            })}
            view={view}
          />
        ))}
        {filteredOwners.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No owners found matching your criteria</div>
        )}
      </div>
    </div>
  )
}

interface OwnerStatsProps {
  ownerName: string
  shipments: any[]
  view: "list" | "statistics"
}

function OwnerStats({ ownerName, shipments, view }: OwnerStatsProps) {
  const [timeframe, setTimeframe] = useState<"all" | "year" | "month">("all")
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString())
  const [selectedMonth, setSelectedMonth] = useState<string>((new Date().getMonth() + 1).toString().padStart(2, "0"))
  const [isShipmentsOpen, setIsShipmentsOpen] = useState(false)
  const router = useRouter()

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString())
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const filteredShipments = shipments.filter((shipment) => {
    if (timeframe === "all") return true

    const shipmentDate = parseISO(shipment.date)
    const year = Number.parseInt(selectedYear)

    if (timeframe === "year") {
      return isWithinInterval(shipmentDate, {
        start: startOfYear(new Date(year, 0)),
        end: endOfYear(new Date(year, 0)),
      })
    }

    if (timeframe === "month") {
      const month = Number.parseInt(selectedMonth) - 1
      return isWithinInterval(shipmentDate, {
        start: startOfMonth(new Date(year, month)),
        end: endOfMonth(new Date(year, month)),
      })
    }

    return true
  })

  const stats = {
    imports: filteredShipments.filter((s) => s.type.toLowerCase() === "import").length,
    exports: filteredShipments.filter((s) => s.type.toLowerCase() === "export").length,
    inTransit: filteredShipments.filter((s) => s.type.toLowerCase() === "in-transit").length,
    total: filteredShipments.length,
  }

  // Get owner details from the database
  const db = getDatabase()
  const ownerDetails = db.owners.find((o) => o.name === ownerName)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {ownerName}
          {ownerDetails?.country && (
            <span className="ml-2 text-base font-normal italic text-muted-foreground">{ownerDetails.country}</span>
          )}
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={timeframe} onValueChange={(value: "all" | "year" | "month") => setTimeframe(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="year">Year Range</SelectItem>
                <SelectItem value="month">Specific Month</SelectItem>
              </SelectContent>
            </Select>

            {(timeframe === "year" || timeframe === "month") && (
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {timeframe === "month" && (
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month) => (
                    <SelectItem key={month.value} value={month.value}>
                      {month.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Sheet open={isShipmentsOpen} onOpenChange={setIsShipmentsOpen}>
            <SheetTrigger asChild>
              <Button>View Shipments</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>
                  Shipments for {ownerName}
                  {timeframe === "year" && ` (${selectedYear})`}
                  {timeframe === "month" &&
                    ` (${months.find((m) => m.value === selectedMonth)?.label} ${selectedYear})`}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-6">
                {filteredShipments.map((shipment) => (
                  <Card key={shipment.id} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            shipment.type.toLowerCase() === "import"
                              ? "bg-red-500 text-white"
                              : shipment.type.toLowerCase() === "export"
                                ? "bg-blue-500 text-white"
                                : "bg-yellow-500 text-white"
                          }
                        >
                          {shipment.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {format(parseISO(shipment.date), "MMM d, yyyy")}
                        </span>
                      </div>
                      <div className="text-sm">
                        {shipment.numAnimals} {shipment.animalType}
                      </div>
                      {(shipment.originAirport || shipment.destinationAirport) && (
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          {shipment.originAirport} → {shipment.destinationAirport}
                        </div>
                      )}
                      <div className="flex justify-end mt-2">
                        <Button
                          className="flex items-center gap-2"
                          onClick={() => {
                            setIsShipmentsOpen(false)
                            router.push(`/shipments/${shipment.id}`)
                          }}
                        >
                          <ClipboardList className="h-4 w-4" />
                          Work on Shipment
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
                {filteredShipments.length === 0 && (
                  <div className="text-center text-muted-foreground">No shipments found in the selected timeframe</div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-sm font-medium text-red-500">Imports</div>
            <div className="text-2xl font-bold">{stats.imports}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-blue-500">Exports</div>
            <div className="text-2xl font-bold">{stats.exports}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium text-yellow-500">In-Transit</div>
            <div className="text-2xl font-bold">{stats.inTransit}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-medium">Total</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

