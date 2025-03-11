import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const currentYear = 2025
const previousYear = currentYear - 1

const shipmentData = [
  {
    name: "Jan",
    Import: 40,
    Export: 30,
    Transit: 20,
    [`Import${previousYear}`]: 35,
    [`Export${previousYear}`]: 25,
    [`Transit${previousYear}`]: 15,
  },
  {
    name: "Feb",
    Import: 45,
    Export: 35,
    Transit: 22,
    [`Import${previousYear}`]: 38,
    [`Export${previousYear}`]: 28,
    [`Transit${previousYear}`]: 18,
  },
  {
    name: "Mar",
    Import: 50,
    Export: 40,
    Transit: 25,
    [`Import${previousYear}`]: 42,
    [`Export${previousYear}`]: 32,
    [`Transit${previousYear}`]: 20,
  },
  {
    name: "Apr",
    Import: 55,
    Export: 45,
    Transit: 28,
    [`Import${previousYear}`]: 45,
    [`Export${previousYear}`]: 35,
    [`Transit${previousYear}`]: 22,
  },
  {
    name: "May",
    Import: 60,
    Export: 50,
    Transit: 30,
    [`Import${previousYear}`]: 48,
    [`Export${previousYear}`]: 38,
    [`Transit${previousYear}`]: 24,
  },
  {
    name: "Jun",
    Import: 65,
    Export: 55,
    Transit: 32,
    [`Import${previousYear}`]: 52,
    [`Export${previousYear}`]: 42,
    [`Transit${previousYear}`]: 26,
  },
  {
    name: "Jul",
    Import: 70,
    Export: 60,
    Transit: 35,
    [`Import${previousYear}`]: 55,
    [`Export${previousYear}`]: 45,
    [`Transit${previousYear}`]: 28,
  },
  {
    name: "Aug",
    Import: 75,
    Export: 65,
    Transit: 38,
    [`Import${previousYear}`]: 58,
    [`Export${previousYear}`]: 48,
    [`Transit${previousYear}`]: 30,
  },
  {
    name: "Sep",
    Import: 80,
    Export: 70,
    Transit: 40,
    [`Import${previousYear}`]: 62,
    [`Export${previousYear}`]: 52,
    [`Transit${previousYear}`]: 32,
  },
  {
    name: "Oct",
    Import: 85,
    Export: 75,
    Transit: 42,
    [`Import${previousYear}`]: 65,
    [`Export${previousYear}`]: 55,
    [`Transit${previousYear}`]: 34,
  },
  {
    name: "Nov",
    Import: 90,
    Export: 80,
    Transit: 45,
    [`Import${previousYear}`]: 68,
    [`Export${previousYear}`]: 58,
    [`Transit${previousYear}`]: 36,
  },
  {
    name: "Dec",
    Import: 95,
    Export: 85,
    Transit: 48,
    [`Import${previousYear}`]: 72,
    [`Export${previousYear}`]: 62,
    [`Transit${previousYear}`]: 38,
  },
]

const shipmentTotals = {
  Import: shipmentData.reduce((sum, item) => sum + item.Import, 0),
  Export: shipmentData.reduce((sum, item) => sum + item.Export, 0),
  Transit: shipmentData.reduce((sum, item) => sum + item.Transit, 0),
  [`Import${previousYear}`]: shipmentData.reduce((sum, item) => sum + item[`Import${previousYear}`], 0),
  [`Export${previousYear}`]: shipmentData.reduce((sum, item) => sum + item[`Export${previousYear}`], 0),
  [`Transit${previousYear}`]: shipmentData.reduce((sum, item) => sum + item[`Transit${previousYear}`], 0),
}

export function ShipmentStatistics() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Shipment Statistics {currentYear}</CardTitle>
          <CardDescription>Monthly breakdown of shipments by type</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Year ({currentYear})</TabsTrigger>
              <TabsTrigger value="comparison">Year-to-Year Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="pt-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={shipmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Import" fill="#8884d8" name="Import" />
                  <Bar dataKey="Export" fill="#82ca9d" name="Export" />
                  <Bar dataKey="Transit" fill="#ffc658" name="In Transit" />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Import</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{shipmentTotals.Import}</p>
                    <p className="text-sm text-muted-foreground">Total in {currentYear}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Export</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{shipmentTotals.Export}</p>
                    <p className="text-sm text-muted-foreground">Total in {currentYear}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">In Transit</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-2xl font-bold">{shipmentTotals.Transit}</p>
                    <p className="text-sm text-muted-foreground">Total in {currentYear}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="comparison" className="pt-4">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={shipmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Import" fill="#8884d8" name={`Import ${currentYear}`} />
                  <Bar
                    dataKey={`Import${previousYear}`}
                    fill="#8884d8"
                    name={`Import ${previousYear}`}
                    fillOpacity={0.6}
                  />
                  <Bar dataKey="Export" fill="#82ca9d" name={`Export ${currentYear}`} />
                  <Bar
                    dataKey={`Export${previousYear}`}
                    fill="#82ca9d"
                    name={`Export ${previousYear}`}
                    fillOpacity={0.6}
                  />
                  <Bar dataKey="Transit" fill="#ffc658" name={`In Transit ${currentYear}`} />
                  <Bar
                    dataKey={`Transit${previousYear}`}
                    fill="#ffc658"
                    name={`In Transit ${previousYear}`}
                    fillOpacity={0.6}
                  />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Year-over-Year Growth</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Import:</span>
                        <span className="font-medium">
                          {Math.round(
                            ((shipmentTotals.Import - shipmentTotals[`Import${previousYear}`]) /
                              shipmentTotals[`Import${previousYear}`]) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Export:</span>
                        <span className="font-medium">
                          {Math.round(
                            ((shipmentTotals.Export - shipmentTotals[`Export${previousYear}`]) /
                              shipmentTotals[`Export${previousYear}`]) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>In Transit:</span>
                        <span className="font-medium">
                          {Math.round(
                            ((shipmentTotals.Transit - shipmentTotals[`Transit${previousYear}`]) /
                              shipmentTotals[`Transit${previousYear}`]) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">Total Shipments</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{currentYear}:</span>
                        <span className="font-medium">
                          {shipmentTotals.Import + shipmentTotals.Export + shipmentTotals.Transit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>{previousYear}:</span>
                        <span className="font-medium">
                          {shipmentTotals[`Import${previousYear}`] +
                            shipmentTotals[`Export${previousYear}`] +
                            shipmentTotals[`Transit${previousYear}`]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth:</span>
                        <span className="font-medium">
                          {Math.round(
                            ((shipmentTotals.Import +
                              shipmentTotals.Export +
                              shipmentTotals.Transit -
                              (shipmentTotals[`Import${previousYear}`] +
                                shipmentTotals[`Export${previousYear}`] +
                                shipmentTotals[`Transit${previousYear}`])) /
                              (shipmentTotals[`Import${previousYear}`] +
                                shipmentTotals[`Export${previousYear}`] +
                                shipmentTotals[`Transit${previousYear}`])) *
                              100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

