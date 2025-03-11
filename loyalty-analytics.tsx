"use client"

import { LoyaltyProgram } from "@/components/loyalty-program"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

// Sample data for loyalty analytics
const loyaltyGrowthData = [
  { month: "Jan", newMembers: 12, pointsAwarded: 5800, pointsRedeemed: 3200 },
  { month: "Feb", newMembers: 15, pointsAwarded: 6200, pointsRedeemed: 3500 },
  { month: "Mar", newMembers: 18, pointsAwarded: 7500, pointsRedeemed: 4100 },
  { month: "Apr", newMembers: 22, pointsAwarded: 8900, pointsRedeemed: 4800 },
  { month: "May", newMembers: 20, pointsAwarded: 8200, pointsRedeemed: 5200 },
  { month: "Jun", newMembers: 25, pointsAwarded: 9500, pointsRedeemed: 5800 },
  { month: "Jul", newMembers: 28, pointsAwarded: 10200, pointsRedeemed: 6100 },
  { month: "Aug", newMembers: 30, pointsAwarded: 11500, pointsRedeemed: 6800 },
  { month: "Sep", newMembers: 27, pointsAwarded: 10800, pointsRedeemed: 6500 },
  { month: "Oct", newMembers: 32, pointsAwarded: 12500, pointsRedeemed: 7200 },
  { month: "Nov", newMembers: 35, pointsAwarded: 13800, pointsRedeemed: 7800 },
  { month: "Dec", newMembers: 38, pointsAwarded: 15200, pointsRedeemed: 8500 },
]

const tierDistributionData = [
  { name: "Bronze", value: 45 },
  { name: "Silver", value: 30 },
  { name: "Gold", value: 18 },
  { name: "Platinum", value: 7 },
]

export function LoyaltyAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Loyalty Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-green-500">↑ 15% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Points Awarded (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120,100</div>
            <p className="text-xs text-green-500">↑ 22% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Points Redeemed (YTD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69,500</div>
            <p className="text-xs text-green-500">↑ 18% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Program Overview</TabsTrigger>
          <TabsTrigger value="members">Member Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program Growth</CardTitle>
              <CardDescription>Monthly trends in membership and point activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={loyaltyGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="newMembers"
                    name="New Members"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="pointsAwarded"
                    name="Points Awarded"
                    stroke="#82ca9d"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="pointsRedeemed"
                    name="Points Redeemed"
                    stroke="#ffc658"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tier Distribution</CardTitle>
                <CardDescription>Percentage of members in each loyalty tier</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={tierDistributionData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                    <Bar dataKey="value" name="Percentage" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Program Insights</CardTitle>
                <CardDescription>Key metrics and opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Retention Rate</div>
                    <div className="mt-1 flex items-center">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">85%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">5% higher than industry average</div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Point Redemption Rate</div>
                    <div className="mt-1 flex items-center">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 w-[58%] rounded-full bg-amber-500"></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">58%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Points redeemed vs. points awarded</div>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium">Tier Advancement</div>
                    <div className="mt-1 flex items-center">
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div className="h-2 w-[32%] rounded-full bg-blue-500"></div>
                      </div>
                      <span className="ml-2 text-sm font-medium">32%</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Members who advanced a tier this year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <LoyaltyProgram />
        </TabsContent>
      </Tabs>
    </div>
  )
}

