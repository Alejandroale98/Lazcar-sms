"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  SearchIcon,
  PlusIcon,
  StarIcon,
  AwardIcon,
  TrendingUpIcon,
  ShieldIcon,
  HeartIcon,
  DollarSignIcon,
  PercentIcon,
  TruckIcon,
  MessageSquareIcon,
} from "lucide-react"

// Sample loyalty tiers
const loyaltyTiers = [
  {
    name: "Bronze",
    color: "bg-amber-700",
    textColor: "text-amber-700",
    borderColor: "border-amber-700",
    minPoints: 0,
    maxPoints: 999,
    benefits: ["Standard shipping rates", "Basic customer support", "Access to online portal"],
  },
  {
    name: "Silver",
    color: "bg-slate-400",
    textColor: "text-slate-400",
    borderColor: "border-slate-400",
    minPoints: 1000,
    maxPoints: 4999,
    benefits: [
      "5% discount on shipping fees",
      "Priority customer support",
      "48-hour document processing",
      "Monthly market insights",
    ],
  },
  {
    name: "Gold",
    color: "bg-amber-500",
    textColor: "text-amber-500",
    borderColor: "border-amber-500",
    minPoints: 5000,
    maxPoints: 9999,
    benefits: [
      "10% discount on shipping fees",
      "Dedicated account manager",
      "24-hour document processing",
      "Quarterly business review",
      "Access to premium facilities",
    ],
  },
  {
    name: "Platinum",
    color: "bg-slate-700",
    textColor: "text-slate-700",
    borderColor: "border-slate-700",
    minPoints: 10000,
    maxPoints: Number.POSITIVE_INFINITY,
    benefits: [
      "15% discount on shipping fees",
      "VIP customer support",
      "Same-day document processing",
      "Dedicated logistics consultant",
      "Exclusive event invitations",
      "Custom shipping solutions",
    ],
  },
]

// Sample client profiles with loyalty data
const clientProfiles = [
  {
    id: "C001",
    name: "Wellington Equestrian Center",
    type: "Client",
    contactName: "Elizabeth Parker",
    email: "eparker@wellingtoneq.com",
    phone: "+1 (561) 555-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "WE",
    loyaltyPoints: 12500,
    tier: "Platinum",
    joinDate: "January 15, 2022",
    totalSpend: "$245,750",
    totalShipments: 32,
    recentActivity: [
      { date: "March 5, 2025", action: "Shipment completed", points: "+500" },
      { date: "February 20, 2025", action: "Referral bonus", points: "+1000" },
      { date: "February 10, 2025", action: "Shipment completed", points: "+500" },
    ],
  },
  {
    id: "C002",
    name: "Bluegrass Thoroughbreds",
    type: "Client",
    contactName: "James Wilson",
    email: "jwilson@bluegrassth.com",
    phone: "+1 (859) 555-1234",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "BT",
    loyaltyPoints: 8750,
    tier: "Gold",
    joinDate: "March 22, 2022",
    totalSpend: "$178,300",
    totalShipments: 25,
    recentActivity: [
      { date: "March 7, 2025", action: "Shipment completed", points: "+500" },
      { date: "February 15, 2025", action: "Early booking bonus", points: "+250" },
      { date: "January 30, 2025", action: "Shipment completed", points: "+500" },
    ],
  },
  {
    id: "C003",
    name: "European Dressage Imports",
    type: "Client",
    contactName: "Sophie Müller",
    email: "smuller@eurodressage.com",
    phone: "+49 30 55512345",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "ED",
    loyaltyPoints: 4200,
    tier: "Silver",
    joinDate: "June 10, 2023",
    totalSpend: "$95,400",
    totalShipments: 12,
    recentActivity: [
      { date: "March 1, 2025", action: "Shipment completed", points: "+500" },
      { date: "February 5, 2025", action: "Survey completion", points: "+100" },
      { date: "January 15, 2025", action: "Shipment completed", points: "+500" },
    ],
  },
  {
    id: "C004",
    name: "Texas Cattle Co.",
    type: "Client",
    contactName: "Robert Johnson",
    email: "rjohnson@texascattle.com",
    phone: "+1 (512) 555-6789",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TC",
    loyaltyPoints: 950,
    tier: "Bronze",
    joinDate: "October 5, 2024",
    totalSpend: "$28,500",
    totalShipments: 3,
    recentActivity: [
      { date: "February 25, 2025", action: "Shipment completed", points: "+500" },
      { date: "February 1, 2025", action: "Account creation", points: "+250" },
      { date: "January 20, 2025", action: "Profile completion", points: "+200" },
    ],
  },
]

// Sample agent profiles
const agentProfiles = [
  {
    id: "A001",
    name: "John Smith",
    type: "Agent",
    role: "Senior Shipping Agent",
    email: "jsmith@lazcar.com",
    phone: "+1 (305) 555-1234",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JS",
    performanceScore: 95,
    tier: "Elite",
    clientsSatisfaction: "98%",
    shipmentsHandled: 145,
    specializations: ["Equine", "International", "VIP"],
  },
  {
    id: "A002",
    name: "Maria Garcia",
    type: "Agent",
    role: "Logistics Coordinator",
    email: "mgarcia@lazcar.com",
    phone: "+1 (305) 555-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MG",
    performanceScore: 92,
    tier: "Elite",
    clientsSatisfaction: "96%",
    shipmentsHandled: 120,
    specializations: ["Cattle", "Domestic", "Documentation"],
  },
  {
    id: "A003",
    name: "David Kim",
    type: "Agent",
    role: "Customs Specialist",
    email: "dkim@lazcar.com",
    phone: "+1 (305) 555-9012",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "DK",
    performanceScore: 88,
    tier: "Advanced",
    clientsSatisfaction: "92%",
    shipmentsHandled: 95,
    specializations: ["Customs", "International", "Compliance"],
  },
]

export function LoyaltyProgram() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
  const [isAddingPoints, setIsAddingPoints] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState("")
  const [pointsReason, setPointsReason] = useState("")

  // Enhanced search filter function
  const filterProfiles = (profiles, query) => {
    if (!query.trim()) return profiles

    const searchTerms = query.toLowerCase().split(" ").filter(Boolean)

    return profiles.filter((profile) => {
      const searchableFields = [
        profile.id,
        profile.name,
        profile.type,
        profile.contactName || "",
        profile.email,
        profile.phone,
        profile.tier || "",
        profile.role || "",
      ].map((field) => String(field).toLowerCase())

      // Check if ALL search terms match at least one field
      return searchTerms.every((term) => searchableFields.some((field) => field.includes(term)))
    })
  }

  // Filter profiles based on search query using the enhanced filter function
  const filteredClients = filterProfiles(clientProfiles, searchQuery)
  const filteredAgents = filterProfiles(agentProfiles, searchQuery)

  // Get profile by ID
  const getProfileById = (id: string) => {
    return clientProfiles.find((profile) => profile.id === id) || agentProfiles.find((profile) => profile.id === id)
  }

  // Get loyalty tier by points
  const getLoyaltyTier = (points: number) => {
    return loyaltyTiers.find((tier) => points >= tier.minPoints && points <= tier.maxPoints) || loyaltyTiers[0]
  }

  // Get progress to next tier
  const getProgressToNextTier = (points: number) => {
    const currentTier = getLoyaltyTier(points)
    const currentTierIndex = loyaltyTiers.findIndex((tier) => tier.name === currentTier.name)

    if (currentTierIndex === loyaltyTiers.length - 1) {
      return 100 // Already at highest tier
    }

    const nextTier = loyaltyTiers[currentTierIndex + 1]
    const pointsNeeded = nextTier.minPoints - currentTier.minPoints
    const pointsEarned = points - currentTier.minPoints

    return Math.min(Math.round((pointsEarned / pointsNeeded) * 100), 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Loyalty Program</h2>
          <p className="text-muted-foreground">Manage client and agent loyalty profiles</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search profiles..."
              className="pl-8 w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Profile
          </Button>
        </div>
      </div>

      <Tabs defaultValue="clients">
        <TabsList>
          <TabsTrigger value="clients">Client Profiles</TabsTrigger>
          <TabsTrigger value="agents">Agent Profiles</TabsTrigger>
          <TabsTrigger value="tiers">Loyalty Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="clients" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => {
              const tier = loyaltyTiers.find((t) => t.name === client.tier) || loyaltyTiers[0]
              const progress = getProgressToNextTier(client.loyaltyPoints)

              return (
                <Card
                  key={client.id}
                  className={`overflow-hidden ${selectedProfile === client.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedProfile(client.id)}
                >
                  <div className={`h-2 ${tier.color}`} />
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline">{client.id}</Badge>
                      <Badge className={tier.color}>{client.tier}</Badge>
                    </div>
                    <CardTitle className="flex items-center gap-2 mt-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={client.avatar} alt={client.name} />
                        <AvatarFallback>{client.initials}</AvatarFallback>
                      </Avatar>
                      <span className="truncate">{client.name}</span>
                    </CardTitle>
                    <CardDescription>{client.contactName}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Loyalty Points</span>
                          <span className="font-medium">{client.loyaltyPoints.toLocaleString()}</span>
                        </div>
                        <div className="space-y-1">
                          <Progress value={progress} className="h-2" />
                          {progress < 100 && (
                            <p className="text-xs text-muted-foreground text-right">
                              {tier.maxPoints - client.loyaltyPoints} points to{" "}
                              {loyaltyTiers[loyaltyTiers.findIndex((t) => t.name === tier.name) + 1]?.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Spend</p>
                          <p className="font-medium">{client.totalSpend}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Shipments</p>
                          <p className="font-medium">{client.totalShipments}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProfile(client.id)
                        setIsAddingPoints(true)
                      }}
                    >
                      <PlusIcon className="h-3.5 w-3.5 mr-1" />
                      Add Points
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found matching "{searchQuery}"</p>
              <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                Clear search
              </Button>
            </div>
          )}

          {selectedProfile && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Detailed information and loyalty status</CardDescription>
              </CardHeader>
              <CardContent>
                {(() => {
                  const profile = getProfileById(selectedProfile)
                  if (!profile || profile.type !== "Client") return null

                  const tier = loyaltyTiers.find((t) => t.name === profile.tier) || loyaltyTiers[0]

                  return (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                            <Avatar className="h-20 w-20 mb-4">
                              <AvatarImage src={profile.avatar} alt={profile.name} />
                              <AvatarFallback className="text-2xl">{profile.initials}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-xl font-bold">{profile.name}</h3>
                            <p className="text-muted-foreground mb-2">{profile.contactName}</p>
                            <Badge className={`${tier.color} mb-4`}>{profile.tier} Member</Badge>
                            <div className="grid grid-cols-2 gap-4 w-full text-sm">
                              <div>
                                <p className="text-muted-foreground">Client ID</p>
                                <p className="font-medium">{profile.id}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Join Date</p>
                                <p className="font-medium">{profile.joinDate}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-2/3 space-y-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Contact Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Email</p>
                                <p className="font-medium">{profile.email}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Phone</p>
                                <p className="font-medium">{profile.phone}</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium">Loyalty Status</h4>
                              <Badge variant="outline" className={tier.textColor}>
                                {profile.loyaltyPoints.toLocaleString()} points
                              </Badge>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Progress to next tier</span>
                                  <span>{getProgressToNextTier(profile.loyaltyPoints)}%</span>
                                </div>
                                <Progress value={getProgressToNextTier(profile.loyaltyPoints)} className="h-2" />
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-muted/40">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col items-center text-center">
                                      <DollarSignIcon className="h-8 w-8 mb-2 text-primary" />
                                      <p className="font-medium">{profile.totalSpend}</p>
                                      <p className="text-xs text-muted-foreground">Total Spend</p>
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/40">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col items-center text-center">
                                      <TruckIcon className="h-8 w-8 mb-2 text-primary" />
                                      <p className="font-medium">{profile.totalShipments}</p>
                                      <p className="text-xs text-muted-foreground">Total Shipments</p>
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card className="bg-muted/40">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col items-center text-center">
                                      <PercentIcon className="h-8 w-8 mb-2 text-primary" />
                                      <p className="font-medium">
                                        {tier.name === "Platinum"
                                          ? "15%"
                                          : tier.name === "Gold"
                                            ? "10%"
                                            : tier.name === "Silver"
                                              ? "5%"
                                              : "0%"}
                                      </p>
                                      <p className="text-xs text-muted-foreground">Discount Rate</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          <div>
                            <h4 className="text-sm font-medium mb-2">Current Tier Benefits</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {tier.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <StarIcon className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>Activity</TableHead>
                              <TableHead className="text-right">Points</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {profile.recentActivity.map((activity, index) => (
                              <TableRow key={index}>
                                <TableCell>{activity.date}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                                <TableCell className="text-right font-medium text-green-600">
                                  {activity.points}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <Card
                key={agent.id}
                className={`overflow-hidden ${selectedProfile === agent.id ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedProfile(agent.id)}
              >
                <div
                  className={`h-2 ${
                    agent.tier === "Elite" ? "bg-indigo-600" : agent.tier === "Advanced" ? "bg-blue-500" : "bg-sky-400"
                  }`}
                />
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Badge variant="outline">{agent.id}</Badge>
                    <Badge
                      className={
                        agent.tier === "Elite"
                          ? "bg-indigo-600"
                          : agent.tier === "Advanced"
                            ? "bg-blue-500"
                            : "bg-sky-400"
                      }
                    >
                      {agent.tier}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2 mt-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={agent.avatar} alt={agent.name} />
                      <AvatarFallback>{agent.initials}</AvatarFallback>
                    </Avatar>
                    <span>{agent.name}</span>
                  </CardTitle>
                  <CardDescription>{agent.role}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Performance Score</span>
                        <span className="font-medium">{agent.performanceScore}/100</span>
                      </div>
                      <Progress value={agent.performanceScore} className="h-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Satisfaction</p>
                        <p className="font-medium">{agent.clientsSatisfaction}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Shipments</p>
                        <p className="font-medium">{agent.shipmentsHandled}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-1 w-full">
                    {agent.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          {filteredAgents.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No agents found matching "{searchQuery}"</p>
              <Button variant="link" onClick={() => setSearchQuery("")} className="mt-2">
                Clear search
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tiers" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loyaltyTiers.map((tier, index) => (
              <Card key={index} className="overflow-hidden">
                <div className={`h-2 ${tier.color}`} />
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${tier.textColor}`}>
                    <AwardIcon className="h-5 w-5" />
                    {tier.name}
                  </CardTitle>
                  <CardDescription>
                    {tier.minPoints.toLocaleString()} -{" "}
                    {tier.maxPoints === Number.POSITIVE_INFINITY ? "∞" : tier.maxPoints.toLocaleString()} points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <StarIcon className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program Overview</CardTitle>
              <CardDescription>How our loyalty program works for clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <TrendingUpIcon className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="text-lg font-medium">Earn Points</h3>
                    <p className="text-sm text-muted-foreground">
                      Clients earn points for every shipment, referral, and engagement with our services.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <AwardIcon className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="text-lg font-medium">Unlock Tiers</h3>
                    <p className="text-sm text-muted-foreground">
                      As points accumulate, clients progress through tiers with increasing benefits.
                    </p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                    <ShieldIcon className="h-10 w-10 mb-2 text-primary" />
                    <h3 className="text-lg font-medium">Enjoy Benefits</h3>
                    <p className="text-sm text-muted-foreground">
                      Each tier provides exclusive benefits, discounts, and priority services.
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">How to Earn Points</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <TruckIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Shipments</h4>
                        <p className="text-sm text-muted-foreground">500 points per completed shipment</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <HeartIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Referrals</h4>
                        <p className="text-sm text-muted-foreground">1000 points for each successful referral</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <StarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Early Booking</h4>
                        <p className="text-sm text-muted-foreground">250 points for booking 30+ days in advance</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <MessageSquareIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Feedback</h4>
                        <p className="text-sm text-muted-foreground">100 points for completing surveys and feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog for adding points */}
      <Dialog open={isAddingPoints} onOpenChange={setIsAddingPoints}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Loyalty Points</DialogTitle>
            <DialogDescription>Add points to client's loyalty account</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="points">Points to Add</Label>
              <Input
                id="points"
                type="number"
                min="1"
                value={pointsToAdd}
                onChange={(e) => setPointsToAdd(e.target.value)}
                placeholder="Enter points amount"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Select value={pointsReason} onValueChange={setPointsReason}>
                <SelectTrigger id="reason">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipment">Completed Shipment</SelectItem>
                  <SelectItem value="referral">Referral Bonus</SelectItem>
                  <SelectItem value="feedback">Feedback/Survey</SelectItem>
                  <SelectItem value="promotion">Promotional Offer</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {pointsReason === "other" && (
              <div className="space-y-2">
                <Label htmlFor="custom-reason">Custom Reason</Label>
                <Input id="custom-reason" placeholder="Enter custom reason" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingPoints(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddingPoints(false)}>Add Points</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

