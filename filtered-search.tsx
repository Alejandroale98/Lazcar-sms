"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { format, parseISO, isWithinInterval, addDays } from "date-fns"
import { Search, X, Plane, ClipboardList, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { getDatabase } from "@/lib/database"
import { AddAgentDialog } from "@/components/add-agent-dialog"
import { AddOwnerDialog } from "@/components/add-owner-dialog"
import { AddAnimalDialog } from "@/components/add-animal-dialog"

export function FilteredSearch() {
  const router = useRouter()
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [activeFilters, setActiveFilters] = useState(0)

  // Filter states
  const [shipmentTypeFilter, setShipmentTypeFilter] = useState<string[]>([])
  const [animalTypeFilter, setAnimalTypeFilter] = useState<string[]>([])
  const [animalNameFilter, setAnimalNameFilter] = useState<string[]>([])
  const [agentNameFilter, setAgentNameFilter] = useState<string[]>([])
  const [ownerNameFilter, setOwnerNameFilter] = useState<string[]>([])
  const [originCountryFilter, setOriginCountryFilter] = useState<string[]>([])
  const [destinationCountryFilter, setDestinationCountryFilter] = useState<string[]>([])
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(() => {
    const saved = localStorage.getItem("advanced_search_upcoming")
    return saved ? JSON.parse(saved) : false
  })
  const [timeframe, setTimeframe] = useState<"2w" | "2m" | "1y">(() => {
    const saved = localStorage.getItem("advanced_search_timeframe")
    return (saved as "2w" | "2m" | "1y") || "2w"
  })
  const [dateRangeFilter, setDateRangeFilter] = useState<{
    start: Date | undefined
    end: Date | undefined
  }>({ start: undefined, end: undefined })

  // Search inputs
  const [animalSearch, setAnimalSearch] = useState("")
  const [agentSearch, setAgentSearch] = useState("")
  const [ownerSearch, setOwnerSearch] = useState("")
  const [countrySearch, setCountrySearch] = useState("")
  const [breedSearch, setBreedSearch] = useState("")
  const [microchipSearch, setMicrochipSearch] = useState("")

  // Dialog states
  const [showAddAgentDialog, setShowAddAgentDialog] = useState(false)
  const [showAddOwnerDialog, setShowAddOwnerDialog] = useState(false)
  const [showAddAnimalDialog, setShowAddAnimalDialog] = useState(false)

  // New filter states
  const [animalBreedFilter, setAnimalBreedFilter] = useState<string[]>([])
  const [animalMicrochipFilter, setAnimalMicrochipFilter] = useState<string>("")

  // Get data from database
  const db = getDatabase()
  const shipments = db.shipments

  // Extract unique values for filters
  const shipmentTypes = ["import", "export", "in-transit"]

  const animalTypes = Array.from(
    new Set(shipments.filter((s) => s.animalType).map((s) => s.animalType.toLowerCase())),
  ).sort()

  const animalNames = Array.from(new Set(db.horses.map((h) => h.name))).sort()

  const agentNames = Array.from(new Set([...db.agents.map((a) => a.name)])).sort()

  const ownerNames = Array.from(new Set([...db.owners.map((o) => o.name)])).sort()

  const countries = Array.from(
    new Set([...shipments.map((s) => s.originCountry), ...shipments.map((s) => s.destinationCountry)].filter(Boolean)),
  ).sort()

  const animalBreeds = Array.from(new Set(db.horses.filter((h) => h.breed).map((h) => h.breed))).sort()

  // Filter the lists based on search input
  const filteredAnimalNames = animalNames.filter((name) => name.toLowerCase().includes(animalSearch.toLowerCase()))

  const filteredAgentNames = agentNames.filter((name) => name.toLowerCase().includes(agentSearch.toLowerCase()))

  const filteredOwnerNames = ownerNames.filter((name) => name.toLowerCase().includes(ownerSearch.toLowerCase()))

  const filteredCountries = countries.filter(
    (country) => country && country.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  const filteredBreeds = animalBreeds.filter(
    (breed) => breed && breed.toLowerCase().includes(breedSearch.toLowerCase()),
  )

  // Count active filters
  useEffect(() => {
    let count = 0
    if (shipmentTypeFilter.length > 0) count++
    if (animalTypeFilter.length > 0) count++
    if (animalNameFilter.length > 0) count++
    if (agentNameFilter.length > 0) count++
    if (ownerNameFilter.length > 0) count++
    if (originCountryFilter.length > 0) count++
    if (destinationCountryFilter.length > 0) count++
    if (dateRangeFilter.start || dateRangeFilter.end) count++
    if (showUpcomingOnly) count++
    if (animalBreedFilter.length > 0) count++
    if (animalMicrochipFilter) count++
    setActiveFilters(count)
  }, [
    shipmentTypeFilter,
    animalTypeFilter,
    animalNameFilter,
    agentNameFilter,
    ownerNameFilter,
    originCountryFilter,
    destinationCountryFilter,
    dateRangeFilter,
    showUpcomingOnly,
    animalBreedFilter,
    animalMicrochipFilter,
  ])

  // Save filters when they change
  useEffect(() => {
    localStorage.setItem("advanced_search_upcoming", JSON.stringify(showUpcomingOnly))
  }, [showUpcomingOnly])

  useEffect(() => {
    localStorage.setItem("advanced_search_timeframe", timeframe)
  }, [timeframe])

  // Apply filters and search
  const applyFilters = () => {
    let results = [...shipments]

    // Filter by shipment type
    if (shipmentTypeFilter.length > 0) {
      results = results.filter((shipment) => shipmentTypeFilter.includes(shipment.type.toLowerCase()))
    }

    // Filter by animal type
    if (animalTypeFilter.length > 0) {
      results = results.filter(
        (shipment) => shipment.animalType && animalTypeFilter.includes(shipment.animalType.toLowerCase()),
      )
    }

    // Filter by animal name
    if (animalNameFilter.length > 0) {
      results = results.filter((shipment) => animalNameFilter.includes(shipment.horseName))
    }

    if (animalBreedFilter.length > 0) {
      results = results.filter((shipment) => {
        const animal = db.horses.find((h) => h.name === shipment.horseName)
        return animal && animal.breed && animalBreedFilter.includes(animal.breed)
      })
    }

    if (animalMicrochipFilter) {
      results = results.filter((shipment) => {
        const animal = db.horses.find((h) => h.name === shipment.horseName)
        return animal && animal.microchip && animal.microchip.includes(animalMicrochipFilter)
      })
    }

    // Filter by agent name
    if (agentNameFilter.length > 0) {
      results = results.filter(
        (shipment) =>
          (shipment.originAgent && agentNameFilter.includes(shipment.originAgent)) ||
          (shipment.destinationAgent && agentNameFilter.includes(shipment.destinationAgent)),
      )
    }

    // Filter by owner name
    if (ownerNameFilter.length > 0) {
      results = results.filter((shipment) => shipment.owner && ownerNameFilter.includes(shipment.owner))
    }

    // Filter by origin country
    if (originCountryFilter.length > 0) {
      results = results.filter(
        (shipment) => shipment.originCountry && originCountryFilter.includes(shipment.originCountry),
      )
    }

    // Filter by destination country
    if (destinationCountryFilter.length > 0) {
      results = results.filter(
        (shipment) => shipment.destinationCountry && destinationCountryFilter.includes(shipment.destinationCountry),
      )
    }

    // Filter by date range
    if (dateRangeFilter.start || dateRangeFilter.end) {
      results = results.filter((shipment) => {
        const shipmentDate = parseISO(shipment.date)

        if (dateRangeFilter.start && dateRangeFilter.end) {
          return isWithinInterval(shipmentDate, {
            start: dateRangeFilter.start,
            end: dateRangeFilter.end,
          })
        } else if (dateRangeFilter.start) {
          return shipmentDate >= dateRangeFilter.start
        } else if (dateRangeFilter.end) {
          return shipmentDate <= dateRangeFilter.end
        }

        return true
      })
    }

    // Filter by upcoming only
    if (showUpcomingOnly) {
      const today = new Date()
      let endDate = new Date()

      if (timeframe === "2w") {
        endDate = addDays(today, 14)
      } else if (timeframe === "2m") {
        endDate = addDays(today, 60)
      } else if (timeframe === "1y") {
        endDate = addDays(today, 365)
      }

      results = results.filter((shipment) => {
        const shipmentDate = parseISO(shipment.date)
        return shipmentDate >= today && shipmentDate <= endDate
      })
    }

    // Sort by date (most recent first)
    results.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

    setSearchResults(results)
  }

  // Reset all filters
  const resetFilters = () => {
    setShipmentTypeFilter([])
    setAnimalTypeFilter([])
    setAnimalNameFilter([])
    setAgentNameFilter([])
    setOwnerNameFilter([])
    setOriginCountryFilter([])
    setDestinationCountryFilter([])
    setDateRangeFilter({ start: undefined, end: undefined })
    setShowUpcomingOnly(false)
    setAnimalSearch("")
    setAgentSearch("")
    setOwnerSearch("")
    setCountrySearch("")
    setAnimalBreedFilter([])
    setAnimalMicrochipFilter("")
    setBreedSearch("")
    setMicrochipSearch("")
    setSearchResults([])
  }

  // Toggle filter selection
  const toggleFilter = (value: string, currentFilters: string[], setFilters: (filters: string[]) => void) => {
    if (currentFilters.includes(value)) {
      setFilters(currentFilters.filter((f) => f !== value))
    } else {
      setFilters([...currentFilters, value])
    }
  }

  // Apply filters on initial load
  useEffect(() => {
    applyFilters()
  }, [
    shipmentTypeFilter,
    animalTypeFilter,
    animalNameFilter,
    agentNameFilter,
    ownerNameFilter,
    originCountryFilter,
    destinationCountryFilter,
    dateRangeFilter,
    showUpcomingOnly,
    animalBreedFilter,
    animalMicrochipFilter,
    timeframe,
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold tracking-tight">Advanced Search</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="show-upcoming" checked={showUpcomingOnly} onCheckedChange={setShowUpcomingOnly} />
              <Label htmlFor="show-upcoming">Show Upcoming Only</Label>
            </div>

            {showUpcomingOnly && (
              <Select value={timeframe} onValueChange={(value) => setTimeframe(value as "2w" | "2m" | "1y")}>
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

            <Button onClick={applyFilters}>
              Apply Filters
              {activeFilters > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters}
                </Badge>
              )}
            </Button>

            <Button variant="outline" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <Accordion type="single" collapsible defaultValue="shipment-type">
                <AccordionItem value="shipment-type">
                  <AccordionTrigger>
                    Shipment Type
                    {shipmentTypeFilter.length > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {shipmentTypeFilter.length}
                      </Badge>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {shipmentTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`shipment-type-${type}`}
                            checked={shipmentTypeFilter.includes(type)}
                            onCheckedChange={() => toggleFilter(type, shipmentTypeFilter, setShipmentTypeFilter)}
                          />
                          <label
                            htmlFor={`shipment-type-${type}`}
                            className={`text-sm font-medium capitalize ${
                              type === "import"
                                ? "text-red-500"
                                : type === "export"
                                  ? "text-blue-500"
                                  : "text-yellow-500"
                            }`}
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="date-range">
                  <AccordionTrigger>
                    Date Range
                    {(dateRangeFilter.start || dateRangeFilter.end) && (
                      <Badge variant="secondary" className="ml-2">
                        Active
                      </Badge>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="start-date"
                            >
                              {dateRangeFilter.start ? (
                                format(dateRangeFilter.start, "PPP")
                              ) : (
                                <span className="text-muted-foreground">Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={dateRangeFilter.start}
                              onSelect={(date) => setDateRangeFilter({ ...dateRangeFilter, start: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {dateRangeFilter.start && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1"
                            onClick={() => setDateRangeFilter({ ...dateRangeFilter, start: undefined })}
                          >
                            <X className="h-3 w-3 mr-1" /> Clear
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="end-date">End Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                              id="end-date"
                            >
                              {dateRangeFilter.end ? (
                                format(dateRangeFilter.end, "PPP")
                              ) : (
                                <span className="text-muted-foreground">Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={dateRangeFilter.end}
                              onSelect={(date) => setDateRangeFilter({ ...dateRangeFilter, end: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        {dateRangeFilter.end && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-1"
                            onClick={() => setDateRangeFilter({ ...dateRangeFilter, end: undefined })}
                          >
                            <X className="h-3 w-3 mr-1" /> Clear
                          </Button>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="animal">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="animal" className="flex-1">
                    Animal
                  </TabsTrigger>
                  <TabsTrigger value="owner" className="flex-1">
                    Owner
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="animal">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Animal Filters</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setShowAddAnimalDialog(true)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Animal
                    </Button>
                  </div>

                  <Accordion type="single" collapsible defaultValue="animal-type">
                    <AccordionItem value="animal-type">
                      <AccordionTrigger>
                        Animal Type
                        {animalTypeFilter.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {animalTypeFilter.length}
                          </Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {animalTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-2">
                              <Checkbox
                                id={`animal-type-${type}`}
                                checked={animalTypeFilter.includes(type)}
                                onCheckedChange={() => toggleFilter(type, animalTypeFilter, setAnimalTypeFilter)}
                              />
                              <label htmlFor={`animal-type-${type}`} className="text-sm font-medium capitalize">
                                {type}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="animal-name">
                      <AccordionTrigger>
                        Animal Name
                        {animalNameFilter.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {animalNameFilter.length}
                          </Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search animals..."
                              value={animalSearch}
                              onChange={(e) => setAnimalSearch(e.target.value)}
                              className="pl-8"
                            />
                          </div>
                          <ScrollArea className="h-40">
                            <div className="space-y-2 mt-2">
                              {filteredAnimalNames.map((name) => (
                                <div key={name} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`animal-name-${name}`}
                                    checked={animalNameFilter.includes(name)}
                                    onCheckedChange={() => toggleFilter(name, animalNameFilter, setAnimalNameFilter)}
                                  />
                                  <label htmlFor={`animal-name-${name}`} className="text-sm font-medium">
                                    {name}
                                  </label>
                                </div>
                              ))}
                              {filteredAnimalNames.length === 0 && (
                                <div className="text-sm text-muted-foreground text-center py-2">No animals found</div>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="animal-breed">
                      <AccordionTrigger>
                        Animal Breed
                        {animalBreedFilter.length > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {animalBreedFilter.length}
                          </Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Search breeds..."
                              value={breedSearch}
                              onChange={(e) => setBreedSearch(e.target.value)}
                              className="pl-8"
                            />
                          </div>
                          <ScrollArea className="h-40">
                            <div className="space-y-2 mt-2">
                              {filteredBreeds.map((breed) => (
                                <div key={breed} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`animal-breed-${breed}`}
                                    checked={animalBreedFilter.includes(breed)}
                                    onCheckedChange={() => toggleFilter(breed, animalBreedFilter, setAnimalBreedFilter)}
                                  />
                                  <label htmlFor={`animal-breed-${breed}`} className="text-sm font-medium">
                                    {breed}
                                  </label>
                                </div>
                              ))}
                              {filteredBreeds.length === 0 && (
                                <div className="text-sm text-muted-foreground text-center py-2">No breeds found</div>
                              )}
                            </div>
                          </ScrollArea>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="animal-microchip">
                      <AccordionTrigger>
                        Animal Microchip
                        {animalMicrochipFilter && (
                          <Badge variant="secondary" className="ml-2">
                            Active
                          </Badge>
                        )}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="Enter microchip number..."
                              value={microchipSearch}
                              onChange={(e) => setMicrochipSearch(e.target.value)}
                              className="pl-8"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                            onClick={() => setAnimalMicrochipFilter(microchipSearch)}
                            disabled={!microchipSearch}
                          >
                            Apply Microchip Filter
                          </Button>
                          {animalMicrochipFilter && (
                            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
                              <span className="text-sm">Filtering by: {animalMicrochipFilter}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setAnimalMicrochipFilter("")
                                  setMicrochipSearch("")
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>

                <TabsContent value="owner">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Owner Filters</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setShowAddOwnerDialog(true)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Owner
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search owners..."
                        value={ownerSearch}
                        onChange={(e) => setOwnerSearch(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <ScrollArea className="h-40">
                      <div className="space-y-2">
                        {filteredOwnerNames.map((name) => (
                          <div key={name} className="flex items-center space-x-2">
                            <Checkbox
                              id={`owner-name-${name}`}
                              checked={ownerNameFilter.includes(name)}
                              onCheckedChange={() => toggleFilter(name, ownerNameFilter, setOwnerNameFilter)}
                            />
                            <label htmlFor={`owner-name-${name}`} className="text-sm font-medium">
                              {name}
                            </label>
                          </div>
                        ))}
                        {filteredOwnerNames.length === 0 && (
                          <div className="text-sm text-muted-foreground text-center py-2">No owners found</div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="agent">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="agent" className="flex-1">
                    Agent
                  </TabsTrigger>
                  <TabsTrigger value="country" className="flex-1">
                    Country
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="agent">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Agent Filters</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1"
                      onClick={() => setShowAddAgentDialog(true)}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Agent
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search agents..."
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <ScrollArea className="h-40">
                      <div className="space-y-2">
                        {filteredAgentNames.map((name) => (
                          <div key={name} className="flex items-center space-x-2">
                            <Checkbox
                              id={`agent-name-${name}`}
                              checked={agentNameFilter.includes(name)}
                              onCheckedChange={() => toggleFilter(name, agentNameFilter, setAgentNameFilter)}
                            />
                            <label htmlFor={`agent-name-${name}`} className="text-sm font-medium">
                              {name}
                            </label>
                          </div>
                        ))}
                        {filteredAgentNames.length === 0 && (
                          <div className="text-sm text-muted-foreground text-center py-2">No agents found</div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </TabsContent>

                <TabsContent value="country">
                  <Tabs defaultValue="origin">
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="origin" className="flex-1">
                        Origin
                      </TabsTrigger>
                      <TabsTrigger value="destination" className="flex-1">
                        Destination
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="origin">
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search countries..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                        <ScrollArea className="h-40">
                          <div className="space-y-2">
                            {filteredCountries.map((country) => (
                              <div key={`origin-${country}`} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`origin-country-${country}`}
                                  checked={originCountryFilter.includes(country)}
                                  onCheckedChange={() =>
                                    toggleFilter(country, originCountryFilter, setOriginCountryFilter)
                                  }
                                />
                                <label htmlFor={`origin-country-${country}`} className="text-sm font-medium">
                                  {country}
                                </label>
                              </div>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="text-sm text-muted-foreground text-center py-2">No countries found</div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="destination">
                      <div className="space-y-4">
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search countries..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="pl-8"
                          />
                        </div>
                        <ScrollArea className="h-40">
                          <div className="space-y-2">
                            {filteredCountries.map((country) => (
                              <div key={`destination-${country}`} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`destination-country-${country}`}
                                  checked={destinationCountryFilter.includes(country)}
                                  onCheckedChange={() =>
                                    toggleFilter(country, destinationCountryFilter, setDestinationCountryFilter)
                                  }
                                />
                                <label htmlFor={`destination-country-${country}`} className="text-sm font-medium">
                                  {country}
                                </label>
                              </div>
                            ))}
                            {filteredCountries.length === 0 && (
                              <div className="text-sm text-muted-foreground text-center py-2">No countries found</div>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-medium">Search Results</h3>

        {searchResults.length > 0 ? (
          <div className="space-y-4">
            {searchResults.map((shipment) => (
              <Card key={shipment.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
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
                        <span className="text-sm font-medium">{format(parseISO(shipment.date), "MMM d, yyyy")}</span>
                      </div>

                      <div className="flex items-center gap-4">
                        {shipment.horseName && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Animal:</span>{" "}
                            <span className="font-medium">{shipment.horseName}</span>
                            {shipment.animalType && (
                              <span className="text-muted-foreground ml-1">({shipment.animalType})</span>
                            )}
                          </div>
                        )}

                        {shipment.owner && (
                          <div className="text-sm">
                            <span className="text-muted-foreground">Owner:</span>{" "}
                            <span className="font-medium">{shipment.owner}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Plane className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          {shipment.originCountry && shipment.originAirport && (
                            <span>
                              <span className="font-medium">{shipment.originCountry}</span>
                              <span className="text-muted-foreground"> ({shipment.originAirport})</span>
                            </span>
                          )}
                          {shipment.originCountry && shipment.destinationCountry && <span className="mx-2">→</span>}
                          {shipment.destinationCountry && shipment.destinationAirport && (
                            <span>
                              <span className="font-medium">{shipment.destinationCountry}</span>
                              <span className="text-muted-foreground"> ({shipment.destinationAirport})</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 text-sm">
                        {shipment.originAgent && (
                          <div>
                            <span className="text-muted-foreground">Origin Agent:</span>{" "}
                            <span className="font-medium">{shipment.originAgent}</span>
                          </div>
                        )}

                        {shipment.destinationAgent && (
                          <div className="ml-4">
                            <span className="text-muted-foreground">Destination Agent:</span>{" "}
                            <span className="font-medium">{shipment.destinationAgent}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      className="flex items-center gap-2"
                      onClick={() => {
                        router.push(`/shipments/${shipment.id}`)
                      }}
                    >
                      <ClipboardList className="h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">No shipments found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
      <AddAgentDialog open={showAddAgentDialog} onClose={() => setShowAddAgentDialog(false)} />
      <AddOwnerDialog open={showAddOwnerDialog} onClose={() => setShowAddOwnerDialog(false)} />
      <AddAnimalDialog open={showAddAnimalDialog} onClose={() => setShowAddAnimalDialog(false)} />
    </div>
  )
}

export default FilteredSearch

