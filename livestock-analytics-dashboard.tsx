"use client"

import { CardFooter } from "@/components/ui/card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import React from "react"

const LivestockAnalyticsDashboard = () => {
  // Sample data - in a real implementation this would come from your database
  const breedData = [
    { name: "Thoroughbred", count: 124, yearOverYear: 12 },
    { name: "Arabian", count: 87, yearOverYear: -5 },
    { name: "Quarter Horse", count: 65, yearOverYear: 18 },
    { name: "Warmblood", count: 52, yearOverYear: 7 },
    { name: "Friesian", count: 38, yearOverYear: 22 },
    { name: "Andalusian", count: 29, yearOverYear: -3 },
    { name: "Clydesdale", count: 18, yearOverYear: 0 },
  ]

  const destinationData = [
    { name: "North America", value: 35 },
    { name: "Europe", value: 28 },
    { name: "Middle East", value: 22 },
    { name: "Asia", value: 10 },
    { name: "Australia", value: 5 },
  ]

  // Update the monthlyTrendsData to include all animal categories
  const monthlyTrendsData = [
    { month: "Jan", horses: 28, cattle: 15, livestock: 12, others: 8 },
    { month: "Feb", horses: 22, cattle: 18, livestock: 14, others: 10 },
    { month: "Mar", horses: 35, cattle: 20, livestock: 16, others: 12 },
    { month: "Apr", horses: 42, cattle: 25, livestock: 18, others: 14 },
    { month: "May", horses: 38, cattle: 22, livestock: 15, others: 11 },
    { month: "Jun", horses: 30, cattle: 18, livestock: 13, others: 9 },
    { month: "Jul", horses: 25, cattle: 16, livestock: 12, others: 8 },
    { month: "Aug", horses: 28, cattle: 19, livestock: 14, others: 10 },
    { month: "Sep", horses: 32, cattle: 21, livestock: 16, others: 12 },
    { month: "Oct", horses: 36, cattle: 23, livestock: 17, others: 13 },
    { month: "Nov", horses: 40, cattle: 24, livestock: 18, others: 14 },
    { month: "Dec", horses: 34, cattle: 20, livestock: 15, others: 11 },
  ]

  // Updated years to reflect 2023-2025
  const shipmentTypeYearlyData = {
    2025: [
      { month: "Jan", imports: 12, exports: 18, inTransit: 5 },
      { month: "Feb", imports: 15, exports: 20, inTransit: 7 },
      { month: "Mar", imports: 18, exports: 22, inTransit: 8 },
      { month: "Apr", imports: 22, exports: 25, inTransit: 10 },
      { month: "May", imports: 20, exports: 23, inTransit: 9 },
      { month: "Jun", imports: 18, exports: 21, inTransit: 8 },
      { month: "Jul", imports: 16, exports: 19, inTransit: 7 },
      { month: "Aug", imports: 14, exports: 17, inTransit: 6 },
      { month: "Sep", imports: 16, exports: 20, inTransit: 8 },
      { month: "Oct", imports: 18, exports: 22, inTransit: 9 },
      { month: "Nov", imports: 20, exports: 24, inTransit: 10 },
      { month: "Dec", imports: 22, exports: 26, inTransit: 11 },
    ],
    2024: [
      { month: "Jan", imports: 15, exports: 20, inTransit: 6 },
      { month: "Feb", imports: 18, exports: 23, inTransit: 8 },
      { month: "Mar", imports: 22, exports: 26, inTransit: 10 },
      { month: "Apr", imports: 25, exports: 30, inTransit: 12 },
      { month: "May", imports: 23, exports: 28, inTransit: 11 },
      { month: "Jun", imports: 21, exports: 25, inTransit: 10 },
      { month: "Jul", imports: 19, exports: 23, inTransit: 9 },
      { month: "Aug", imports: 17, exports: 21, inTransit: 8 },
      { month: "Sep", imports: 20, exports: 24, inTransit: 10 },
      { month: "Oct", imports: 22, exports: 27, inTransit: 11 },
      { month: "Nov", imports: 24, exports: 29, inTransit: 12 },
      { month: "Dec", imports: 26, exports: 32, inTransit: 13 },
    ],
    2025: [
      { month: "Jan", imports: 18, exports: 24, inTransit: 8 },
      { month: "Feb", imports: 22, exports: 28, inTransit: 10 },
      { month: "Mar", imports: 26, exports: 32, inTransit: 12 },
      { month: "Apr", imports: 30, exports: 36, inTransit: 14 },
      { month: "May", imports: 28, exports: 34, inTransit: 13 },
      { month: "Jun", imports: 25, exports: 30, inTransit: 12 },
      { month: "Jul", imports: 23, exports: 28, inTransit: 11 },
      { month: "Aug", imports: 21, exports: 26, inTransit: 10 },
      { month: "Sep", imports: 24, exports: 29, inTransit: 12 },
      { month: "Oct", imports: 27, exports: 33, inTransit: 14 },
      { month: "Nov", imports: 29, exports: 35, inTransit: 15 },
      { month: "Dec", imports: 32, exports: 38, inTransit: 16 },
    ],
  }

  // Add yearly livestock data (updated years to 2023-2025)
  const livestockYearlyData = {
    2025: [
      { month: "Jan", horses: 20, cattle: 12, livestock: 10, others: 6 },
      { month: "Feb", horses: 18, cattle: 14, livestock: 11, others: 7 },
      { month: "Mar", horses: 25, cattle: 16, livestock: 12, others: 8 },
      { month: "Apr", horses: 30, cattle: 19, livestock: 14, others: 10 },
      { month: "May", horses: 28, cattle: 17, livestock: 13, others: 9 },
      { month: "Jun", horses: 22, cattle: 15, livestock: 11, others: 7 },
      { month: "Jul", horses: 19, cattle: 13, livestock: 10, others: 6 },
      { month: "Aug", horses: 21, cattle: 15, livestock: 12, others: 8 },
      { month: "Sep", horses: 24, cattle: 17, livestock: 13, others: 9 },
      { month: "Oct", horses: 27, cattle: 18, livestock: 14, others: 10 },
      { month: "Nov", horses: 30, cattle: 19, livestock: 15, others: 11 },
      { month: "Dec", horses: 26, cattle: 16, livestock: 12, others: 8 },
    ],
    2024: [
      { month: "Jan", horses: 24, cattle: 14, livestock: 11, others: 7 },
      { month: "Feb", horses: 20, cattle: 16, livestock: 12, others: 8 },
      { month: "Mar", horses: 30, cattle: 18, livestock: 14, others: 10 },
      { month: "Apr", horses: 36, cattle: 22, livestock: 16, others: 12 },
      { month: "May", horses: 33, cattle: 20, livestock: 15, others: 10 },
      { month: "Jun", horses: 26, cattle: 17, livestock: 12, others: 8 },
      { month: "Jul", horses: 22, cattle: 15, livestock: 11, others: 7 },
      { month: "Aug", horses: 25, cattle: 17, livestock: 13, others: 9 },
      { month: "Sep", horses: 28, cattle: 19, livestock: 14, others: 10 },
      { month: "Oct", horses: 31, cattle: 21, livestock: 15, others: 11 },
      { month: "Nov", horses: 34, cattle: 22, livestock: 16, others: 12 },
      { month: "Dec", horses: 30, cattle: 18, livestock: 14, others: 10 },
    ],
    2025: [
      { month: "Jan", horses: 28, cattle: 15, livestock: 12, others: 8 },
      { month: "Feb", horses: 22, cattle: 18, livestock: 14, others: 10 },
      { month: "Mar", horses: 35, cattle: 20, livestock: 16, others: 12 },
      { month: "Apr", horses: 42, cattle: 25, livestock: 18, others: 14 },
      { month: "May", horses: 38, cattle: 22, livestock: 15, others: 11 },
      { month: "Jun", horses: 30, cattle: 18, livestock: 13, others: 9 },
      { month: "Jul", horses: 25, cattle: 16, livestock: 12, others: 8 },
      { month: "Aug", horses: 28, cattle: 19, livestock: 14, others: 10 },
      { month: "Sep", horses: 32, cattle: 21, livestock: 16, others: 12 },
      { month: "Oct", horses: 36, cattle: 23, livestock: 17, others: 13 },
      { month: "Nov", horses: 40, cattle: 24, livestock: 18, others: 14 },
      { month: "Dec", horses: 34, cattle: 20, livestock: 15, others: 11 },
    ],
  }

  const [selectedYears, setSelectedYears] = React.useState<string[]>(["2025"])
  const [viewMode, setViewMode] = React.useState<"monthly" | "yearly">("monthly")
  const [shipmentTypeFilter, setShipmentTypeFilter] = React.useState<"all" | "imports" | "exports" | "inTransit">("all")

  // Add state for livestock tab
  const [livestockYears, setLivestockYears] = React.useState<string[]>(["2025"])
  const [livestockViewMode, setLivestockViewMode] = React.useState<"monthly" | "yearly">("monthly")
  const [animalTypeFilter, setAnimalTypeFilter] = React.useState<"all" | "horses" | "cattle" | "livestock" | "others">(
    "all",
  )

  const calculateYearlyTotals = () => {
    const result: { year: string; imports: number; exports: number; inTransit: number; total: number }[] = []

    Object.keys(shipmentTypeYearlyData).forEach((year) => {
      const yearData = shipmentTypeYearlyData[year]
      const totals = yearData.reduce(
        (acc, month) => {
          acc.imports += month.imports
          acc.exports += month.exports
          acc.inTransit += month.inTransit
          return acc
        },
        { imports: 0, exports: 0, inTransit: 0 },
      )

      result.push({
        year,
        imports: totals.imports,
        exports: totals.exports,
        inTransit: totals.inTransit,
        total: totals.imports + totals.exports + totals.inTransit,
      })
    })

    return result
  }

  // Add function to calculate yearly livestock totals
  const calculateLivestockYearlyTotals = () => {
    const result: { year: string; horses: number; cattle: number; livestock: number; others: number; total: number }[] =
      []

    Object.keys(livestockYearlyData).forEach((year) => {
      const yearData = livestockYearlyData[year]
      const totals = yearData.reduce(
        (acc, month) => {
          acc.horses += month.horses
          acc.cattle += month.cattle
          acc.livestock += month.livestock
          acc.others += month.others
          return acc
        },
        { horses: 0, cattle: 0, livestock: 0, others: 0 },
      )

      result.push({
        year,
        horses: totals.horses,
        cattle: totals.cattle,
        livestock: totals.livestock,
        others: totals.others,
        total: totals.horses + totals.cattle + totals.livestock + totals.others,
      })
    })

    return result
  }

  const getFilteredChartData = () => {
    if (viewMode === "yearly") {
      const yearlyTotals = calculateYearlyTotals()
      return yearlyTotals.filter((item) => selectedYears.includes(item.year))
    } else {
      // Monthly view - combine selected years' monthly data
      const result: any[] = []

      // Initialize with months
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      months.forEach((month) => {
        const monthData: any = { month }

        selectedYears.forEach((year) => {
          const yearData = shipmentTypeYearlyData[year]
          const monthEntry = yearData.find((m) => m.month === month)

          if (monthEntry) {
            if (shipmentTypeFilter === "all" || shipmentTypeFilter === "imports") {
              monthData[`imports${year}`] = monthEntry.imports
            }
            if (shipmentTypeFilter === "all" || shipmentTypeFilter === "exports") {
              monthData[`exports${year}`] = monthEntry.exports
            }
            if (shipmentTypeFilter === "all" || shipmentTypeFilter === "inTransit") {
              monthData[`inTransit${year}`] = monthEntry.inTransit
            }
          }
        })

        result.push(monthData)
      })

      return result
    }
  }

  // Add function to get filtered livestock chart data
  const getFilteredLivestockChartData = () => {
    if (livestockViewMode === "yearly") {
      const yearlyTotals = calculateLivestockYearlyTotals()
      return yearlyTotals.filter((item) => livestockYears.includes(item.year))
    } else {
      // Monthly view - combine selected years' monthly data
      const result: any[] = []

      // Initialize with months
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      months.forEach((month) => {
        const monthData: any = { month }

        livestockYears.forEach((year) => {
          const yearData = livestockYearlyData[year]
          const monthEntry = yearData.find((m) => m.month === month)

          if (monthEntry) {
            if (animalTypeFilter === "all" || animalTypeFilter === "horses") {
              monthData[`horses${year}`] = monthEntry.horses
            }
            if (animalTypeFilter === "all" || animalTypeFilter === "cattle") {
              monthData[`cattle${year}`] = monthEntry.cattle
            }
            if (animalTypeFilter === "all" || animalTypeFilter === "livestock") {
              monthData[`livestock${year}`] = monthEntry.livestock
            }
            if (animalTypeFilter === "all" || animalTypeFilter === "others") {
              monthData[`others${year}`] = monthEntry.others
            }
          }
        })

        result.push(monthData)
      })

      return result
    }
  }

  const YEAR_COLORS = {
    "2023": "#8884d8",
    "2024": "#82ca9d",
    "2025": "#ffc658",
  }

  const TYPE_COLORS = {
    imports: "#ff8042",
    exports: "#0088FE",
    inTransit: "#FFBB28",
  }

  // Add animal type colors
  const ANIMAL_COLORS = {
    horses: "#8884d8",
    cattle: "#82ca9d",
    livestock: "#ffc658",
    others: "#ff8042",
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="flex flex-col space-y-4 p-6 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Livestock Shipping Analytics</h1>
          <p className="text-gray-500">Track performance metrics and identify opportunities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="2025">
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Shipments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">412</div>
            <p className="text-xs text-green-500">↑ 8% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Horses Transported</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285</div>
            <p className="text-xs text-green-500">↑ 12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Value per Shipment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,250</div>
            <p className="text-xs text-green-500">↑ 5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-blue-500">↔ Same as last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="horses" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="horses">Horse Breeds</TabsTrigger>
          <TabsTrigger value="shipment-types">Shipment Types</TabsTrigger>
          <TabsTrigger value="all-livestock">All Livestock</TabsTrigger>
        </TabsList>
        <TabsContent value="horses">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Horse Breeds Shipped</CardTitle>
                <CardDescription>Volume by breed with year-over-year change</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={breedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [value, name === "count" ? "Number of Horses" : "YoY Change (%)"]}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" name="Number of Horses" />
                    <Bar dataKey="yearOverYear" fill="#82ca9d" name="YoY Change (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">Opportunity: Friesian breed shows strongest growth (+22% YoY)</p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Horse Destinations</CardTitle>
                <CardDescription>Percentage distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={destinationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {destinationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">Focus: Middle East market showing significant growth potential</p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="shipment-types">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Shipment Types Analysis</CardTitle>
                    <CardDescription>Compare imports, exports, and in-transit shipments over time</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">View:</span>
                      <Select value={viewMode} onValueChange={(value) => setViewMode(value as "monthly" | "yearly")}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select View" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Compare:</span>
                      <Select
                        value={selectedYears.join(",")}
                        onValueChange={(value) => {
                          const years = value.split(",").filter(Boolean)
                          setSelectedYears(years.length ? years : ["2025"])
                        }}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select Years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025 Only</SelectItem>
                          <SelectItem value="2024">2024 Only</SelectItem>
                          <SelectItem value="2025">2025 Only</SelectItem>
                          <SelectItem value="2023,2024">2023 vs 2024</SelectItem>
                          <SelectItem value="2024,2025">2024 vs 2025</SelectItem>
                          <SelectItem value="2023,2025">2023 vs 2025</SelectItem>
                          <SelectItem value="2023,2024,2025">All Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2">Filter by Shipment Type:</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={shipmentTypeFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShipmentTypeFilter("all")}
                      className="flex items-center gap-1"
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      </div>
                      <span>All Types</span>
                    </Button>
                    <Button
                      variant={shipmentTypeFilter === "imports" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShipmentTypeFilter("imports")}
                      className="flex items-center gap-1"
                    >
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span>Imports</span>
                    </Button>
                    <Button
                      variant={shipmentTypeFilter === "exports" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShipmentTypeFilter("exports")}
                      className="flex items-center gap-1"
                    >
                      <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                      <span>Exports</span>
                    </Button>
                    <Button
                      variant={shipmentTypeFilter === "inTransit" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShipmentTypeFilter("inTransit")}
                      className="flex items-center gap-1"
                    >
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span>In-Transit</span>
                    </Button>
                  </div>
                </div>

                {viewMode === "yearly" ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getFilteredChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {(shipmentTypeFilter === "all" || shipmentTypeFilter === "imports") && (
                        <Bar dataKey="imports" name="Imports" fill={TYPE_COLORS.imports} />
                      )}
                      {(shipmentTypeFilter === "all" || shipmentTypeFilter === "exports") && (
                        <Bar dataKey="exports" name="Exports" fill={TYPE_COLORS.exports} />
                      )}
                      {(shipmentTypeFilter === "all" || shipmentTypeFilter === "inTransit") && (
                        <Bar dataKey="inTransit" name="In-Transit" fill={TYPE_COLORS.inTransit} />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={getFilteredChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {selectedYears.map((year) => (
                        <React.Fragment key={year}>
                          {(shipmentTypeFilter === "all" || shipmentTypeFilter === "imports") && (
                            <Bar
                              dataKey={`imports${year}`}
                              name={`Imports ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={shipmentTypeFilter === "imports" ? undefined : `a${year}`}
                            />
                          )}
                          {(shipmentTypeFilter === "all" || shipmentTypeFilter === "exports") && (
                            <Bar
                              dataKey={`exports${year}`}
                              name={`Exports ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={shipmentTypeFilter === "exports" ? undefined : `b${year}`}
                            />
                          )}
                          {(shipmentTypeFilter === "all" || shipmentTypeFilter === "inTransit") && (
                            <Bar
                              dataKey={`inTransit${year}`}
                              name={`In-Transit ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={shipmentTypeFilter === "inTransit" ? undefined : `c${year}`}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {calculateYearlyTotals().map((yearData) => (
                    <Card
                      key={yearData.year}
                      className={`border-l-4 ${selectedYears.includes(yearData.year) ? "border-l-primary" : "border-l-gray-200"}`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{yearData.year} Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-gray-500">Imports</div>
                            <div className="text-lg font-bold flex items-center">
                              <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                              {yearData.imports}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Exports</div>
                            <div className="text-lg font-bold flex items-center">
                              <span className="w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
                              {yearData.exports}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">In-Transit</div>
                            <div className="text-lg font-bold flex items-center">
                              <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                              {yearData.inTransit}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Total</div>
                            <div className="text-lg font-bold">{yearData.total}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            if (selectedYears.includes(yearData.year)) {
                              if (selectedYears.length > 1) {
                                setSelectedYears(selectedYears.filter((y) => y !== yearData.year))
                              }
                            } else {
                              setSelectedYears([...selectedYears, yearData.year])
                            }
                          }}
                        >
                          {selectedYears.includes(yearData.year) ? "Remove from Comparison" : "Add to Comparison"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="all-livestock">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Livestock Shipping Analysis</CardTitle>
                    <CardDescription>Compare shipping volumes across different animal categories</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">View:</span>
                      <Select
                        value={livestockViewMode}
                        onValueChange={(value) => setLivestockViewMode(value as "monthly" | "yearly")}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select View" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Compare:</span>
                      <Select
                        value={livestockYears.join(",")}
                        onValueChange={(value) => {
                          const years = value.split(",").filter(Boolean)
                          setLivestockYears(years.length ? years : ["2025"])
                        }}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Select Years" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2025">2025 Only</SelectItem>
                          <SelectItem value="2024">2024 Only</SelectItem>
                          <SelectItem value="2025">2025 Only</SelectItem>
                          <SelectItem value="2023,2024">2023 vs 2024</SelectItem>
                          <SelectItem value="2024,2025">2024 vs 2025</SelectItem>
                          <SelectItem value="2023,2025">2023 vs 2025</SelectItem>
                          <SelectItem value="2023,2024,2025">All Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="text-sm font-medium mb-2">Filter by Animal Type:</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={animalTypeFilter === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnimalTypeFilter("all")}
                      className="flex items-center gap-1"
                    >
                      <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ANIMAL_COLORS.horses }}></span>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ANIMAL_COLORS.cattle }}></span>
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: ANIMAL_COLORS.livestock }}
                        ></span>
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ANIMAL_COLORS.others }}></span>
                      </div>
                      <span>All Animals</span>
                    </Button>
                    <Button
                      variant={animalTypeFilter === "horses" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnimalTypeFilter("horses")}
                      className="flex items-center gap-1"
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ANIMAL_COLORS.horses }}></span>
                      <span>Horses</span>
                    </Button>
                    <Button
                      variant={animalTypeFilter === "cattle" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnimalTypeFilter("cattle")}
                      className="flex items-center gap-1"
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ANIMAL_COLORS.cattle }}></span>
                      <span>Cattle</span>
                    </Button>
                    <Button
                      variant={animalTypeFilter === "livestock" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnimalTypeFilter("livestock")}
                      className="flex items-center gap-1"
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: ANIMAL_COLORS.livestock }}
                      ></span>
                      <span>Livestock</span>
                    </Button>
                    <Button
                      variant={animalTypeFilter === "others" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setAnimalTypeFilter("others")}
                      className="flex items-center gap-1"
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ANIMAL_COLORS.others }}></span>
                      <span>Others</span>
                    </Button>
                  </div>
                </div>

                {livestockViewMode === "yearly" ? (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={getFilteredLivestockChartData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {(animalTypeFilter === "all" || animalTypeFilter === "horses") && (
                        <Bar dataKey="horses" name="Horses" fill={ANIMAL_COLORS.horses} />
                      )}
                      {(animalTypeFilter === "all" || animalTypeFilter === "cattle") && (
                        <Bar dataKey="cattle" name="Cattle" fill={ANIMAL_COLORS.cattle} />
                      )}
                      {(animalTypeFilter === "all" || animalTypeFilter === "livestock") && (
                        <Bar dataKey="livestock" name="Livestock" fill={ANIMAL_COLORS.livestock} />
                      )}
                      {(animalTypeFilter === "all" || animalTypeFilter === "others") && (
                        <Bar dataKey="others" name="Others" fill={ANIMAL_COLORS.others} />
                      )}
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={getFilteredLivestockChartData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {livestockYears.map((year) => (
                        <React.Fragment key={year}>
                          {(animalTypeFilter === "all" || animalTypeFilter === "horses") && (
                            <Bar
                              dataKey={`horses${year}`}
                              name={`Horses ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={animalTypeFilter === "horses" ? undefined : `a${year}`}
                            />
                          )}
                          {(animalTypeFilter === "all" || animalTypeFilter === "cattle") && (
                            <Bar
                              dataKey={`cattle${year}`}
                              name={`Cattle ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={animalTypeFilter === "cattle" ? undefined : `b${year}`}
                            />
                          )}
                          {(animalTypeFilter === "all" || animalTypeFilter === "livestock") && (
                            <Bar
                              dataKey={`livestock${year}`}
                              name={`Livestock ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={animalTypeFilter === "livestock" ? undefined : `c${year}`}
                            />
                          )}
                          {(animalTypeFilter === "all" || animalTypeFilter === "others") && (
                            <Bar
                              dataKey={`others${year}`}
                              name={`Others ${year}`}
                              fill={YEAR_COLORS[year]}
                              stackId={animalTypeFilter === "others" ? undefined : `d${year}`}
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                  {calculateLivestockYearlyTotals().map((yearData) => (
                    <Card
                      key={yearData.year}
                      className={`border-l-4 ${livestockYears.includes(yearData.year) ? "border-l-primary" : "border-l-gray-200"}`}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{yearData.year} Animal Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-xs text-gray-500">Horses</div>
                            <div className="text-lg font-bold flex items-center">
                              <span
                                className="w-2 h-2 rounded-full mr-1"
                                style={{ backgroundColor: ANIMAL_COLORS.horses }}
                              ></span>
                              {yearData.horses}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Cattle</div>
                            <div className="text-lg font-bold flex items-center">
                              <span
                                className="w-2 h-2 rounded-full mr-1"
                                style={{ backgroundColor: ANIMAL_COLORS.cattle }}
                              ></span>
                              {yearData.cattle}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Livestock</div>
                            <div className="text-lg font-bold flex items-center">
                              <span
                                className="w-2 h-2 rounded-full mr-1"
                                style={{ backgroundColor: ANIMAL_COLORS.livestock }}
                              ></span>
                              {yearData.livestock}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Others</div>
                            <div className="text-lg font-bold flex items-center">
                              <span
                                className="w-2 h-2 rounded-full mr-1"
                                style={{ backgroundColor: ANIMAL_COLORS.others }}
                              ></span>
                              {yearData.others}
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="text-xs text-gray-500">Total Animals</div>
                            <div className="text-lg font-bold">{yearData.total}</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            if (livestockYears.includes(yearData.year)) {
                              if (livestockYears.length > 1) {
                                setLivestockYears(livestockYears.filter((y) => y !== yearData.year))
                              }
                            } else {
                              setLivestockYears([...livestockYears, yearData.year])
                            }
                          }}
                        >
                          {livestockYears.includes(yearData.year) ? "Remove from Comparison" : "Add to Comparison"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Animal Shipping Trends</CardTitle>
                <CardDescription>Analysis of shipping patterns and growth by animal category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Key Insights</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-purple-500">•</span>
                        <span>Horse shipments show the highest growth rate at 16% year-over-year</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-green-500">•</span>
                        <span>Cattle shipments peak during spring months (March-May)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-yellow-500">•</span>
                        <span>
                          Livestock shipments remain consistent throughout the year with minimal seasonal variation
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 mt-0.5 text-orange-500">•</span>
                        <span>
                          Other animal categories show 8% growth, presenting opportunity for specialized services
                        </span>
                      </li>
                    </ul>

                    <h3 className="text-lg font-medium mt-6">Seasonal Patterns</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3">
                        <div className="text-xs font-medium text-gray-500">Peak Season (Horses)</div>
                        <div className="mt-1 text-xl font-bold">April</div>
                        <div className="mt-1 text-xs text-blue-500">42 shipments</div>
                      </div>
                      <div className="rounded-lg border p-3">
                        <div className="text-xs font-medium text-gray-500">Peak Season (Cattle)</div>
                        <div className="mt-1 text-xl font-bold">April</div>
                        <div className="mt-1 text-xs text-blue-500">25 shipments</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Animal Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Horses", value: 390 },
                            { name: "Cattle", value: 241 },
                            { name: "Livestock", value: 180 },
                            { name: "Others", value: 132 },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: "Horses", value: 390, color: ANIMAL_COLORS.horses },
                            { name: "Cattle", value: 241, color: ANIMAL_COLORS.cattle },
                            { name: "Livestock", value: 180, color: ANIMAL_COLORS.livestock },
                            { name: "Others", value: 132, color: ANIMAL_COLORS.others },
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} shipments`, "Volume"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="mr-2">
                  Generate Animal Report
                </Button>
                <Button>Set Category Targets</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Growth Opportunities by Horse Breed</CardTitle>
            <CardDescription>Market analysis and breed performance evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-xs font-medium text-gray-500">Highest Growth</div>
                  <div className="mt-1 text-xl font-bold">Friesian</div>
                  <div className="mt-1 text-xs text-green-500">+22% YoY</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs font-medium text-gray-500">Highest Volume</div>
                  <div className="mt-1 text-xl font-bold">Thoroughbred</div>
                  <div className="mt-1 text-xs text-blue-500">124 shipments</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs font-medium text-gray-500">Emerging Breed</div>
                  <div className="mt-1 text-xl font-bold">Quarter Horse</div>
                  <div className="mt-1 text-xs text-green-500">+18% YoY</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-xs font-medium text-gray-500">Needs Attention</div>
                  <div className="mt-1 text-xl font-bold">Arabian</div>
                  <div className="mt-1 text-xs text-red-500">-5% YoY</div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="text-lg font-medium">Strategic Recommendations</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5 text-green-500">•</span>
                    <span>
                      Develop specialized marketing for Friesian breed shipments to capitalize on growth trend
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5 text-green-500">•</span>
                    <span>Investigate decline in Arabian breed shipments through customer outreach program</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5 text-green-500">•</span>
                    <span>Create premium package for Quarter Horse transportation to enhance margins</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 mt-0.5 text-green-500">•</span>
                    <span>Explore partnership opportunities with Middle Eastern importers to strengthen position</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="mr-2">
              Generate Detailed Report
            </Button>
            <Button>Set Growth Targets</Button>
          </CardFooter>
        </Card>

        {/* Horse Events Section */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Horse Events</CardTitle>
              <CardDescription>Major events that may impact shipping demand</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="racing">Racing</SelectItem>
                      <SelectItem value="show">Show Jumping</SelectItem>
                      <SelectItem value="dressage">Dressage</SelectItem>
                      <SelectItem value="auction">Auctions</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-refresh-cw"
                    >
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                      <path d="M21 3v5h-5" />
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                      <path d="M3 21v-5h5" />
                    </svg>
                    Refresh Events
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 rounded-lg border p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trophy"
                      >
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                        <path d="M4 22h16" />
                        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Dubai World Cup</div>
                      <div className="text-sm text-gray-500">March 29, 2025 • Dubai, UAE</div>
                      <div className="mt-1 text-sm">
                        Major racing event with significant international horse transport activity
                      </div>
                    </div>
                    <div className="ml-auto text-sm text-blue-500">42 days away</div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-coins"
                      >
                        <circle cx="8" cy="8" r="6" />
                        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                        <path d="M7 6h1v4" />
                        <path d="m16.71 13.88.7.71-2.82 2.82" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Tattersalls Thoroughbred Auction</div>
                      <div className="text-sm text-gray-500">April 18, 2025 • Newmarket, UK</div>
                      <div className="mt-1 text-sm">Premium thoroughbred auction with international buyers</div>
                    </div>
                    <div className="ml-auto text-sm text-blue-500">60 days away</div>
                  </div>
                  <div className="flex items-start space-x-3 rounded-lg border p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-dices"
                      >
                        <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
                        <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
                        <path d="M6 18h.01" />
                        <path d="M10 14h.01" />
                        <path d="M15 6h.01" />
                        <path d="M18 9h.01" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">CHIO Aachen World Equestrian Festival</div>
                      <div className="text-sm text-gray-500">June 5, 2025 • Aachen, Germany</div>
                      <div className="mt-1 text-sm">Major dressage and show jumping Aachen, Germany</div>
                      <div className="mt-1 text-sm">Major dressage and show jumping competition</div>
                    </div>
                    <div className="ml-auto text-sm text-blue-500">108 days away</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" size="sm">
                    View All Events
                  </Button>
                  <div className="text-xs text-gray-500">
                    <span className="font-medium">Data Source:</span> International Equestrian Federation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Event Impact Analysis</CardTitle>
              <CardDescription>Shipping volume changes around major events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Dubai World Cup</div>
                  <div className="mt-1 text-xs text-gray-500">Based on historical data</div>
                  <div className="mt-2 flex items-center">
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 w-3/4 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">+75%</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">Increase in Thoroughbred shipments</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">Tattersalls Auction</div>
                  <div className="mt-1 text-xs text-gray-500">Based on historical data</div>
                  <div className="mt-2 flex items-center">
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 w-11/12 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">+90%</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">Increase in UK-bound shipments</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">CHIO Aachen</div>
                  <div className="mt-1 text-xs text-gray-500">Based on historical data</div>
                  <div className="mt-2 flex items-center">
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div className="h-2 w-1/2 rounded-full bg-blue-500"></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">+50%</span>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">Increase in Warmblood shipments</div>
                </div>
                <Button className="w-full" variant="outline">
                  Connect to Event Calendar API
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LivestockAnalyticsDashboard

