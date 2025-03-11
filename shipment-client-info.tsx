"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { StarIcon, ExternalLinkIcon, PercentIcon, AwardIcon, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ShipmentClientInfoProps {
  clientId: string
  shipmentId: string
}

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
    discountRate: 0,
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
    discountRate: 5,
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
    discountRate: 10,
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
    discountRate: 15,
  },
]

// Sample client data
const clientsData = [
  {
    id: "C001",
    name: "Wellington Equestrian Center",
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
  },
  {
    id: "C002",
    name: "Bluegrass Thoroughbreds",
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
  },
  {
    id: "C003",
    name: "European Dressage Imports",
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
  },
  {
    id: "C004",
    name: "Texas Cattle Co.",
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
  },
]

export function ShipmentClientInfo({ clientId, shipmentId }: ShipmentClientInfoProps) {
  // Get client data
  const client = clientsData.find((c) => c.id === clientId)
  if (!client) return null

  // Get loyalty tier
  const tier = loyaltyTiers.find((t) => t.name === client.tier) || loyaltyTiers[0]

  return (
    <Card>
      <div className={`h-2 ${tier.color}`} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Client Information</CardTitle>
            <CardDescription>Loyalty status and benefits</CardDescription>
          </div>
          <Badge className={tier.color}>{client.tier}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={client.avatar} alt={client.name} />
            <AvatarFallback>{client.initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.contactName}</p>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="text-xs mr-2">
                {client.id}
              </Badge>
              <p className="text-xs text-muted-foreground">{client.totalShipments} shipments</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-medium flex items-center">
              Loyalty Status
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoIcon className="h-3.5 w-3.5 ml-1 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Client's loyalty tier and benefits</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h4>
            <Badge variant="outline" className={tier.textColor}>
              {client.loyaltyPoints.toLocaleString()} points
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-md">
              <div className="flex items-center">
                <AwardIcon className={`h-5 w-5 mr-2 ${tier.textColor}`} />
                <div>
                  <p className="text-sm font-medium">{tier.name} Benefits</p>
                  <p className="text-xs text-muted-foreground">Applied to this shipment</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="h-8">
                <ExternalLinkIcon className="h-3.5 w-3.5 mr-1" />
                View Profile
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <PercentIcon className="h-4 w-4 mr-2 text-green-600" />
                  <p className="text-sm font-medium">Discount Rate</p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {tier.discountRate}% Off
                </Badge>
              </div>

              <ul className="space-y-1.5">
                {tier.benefits.slice(0, 3).map((benefit, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <StarIcon className="h-3.5 w-3.5 mr-2 mt-0.5 text-amber-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
                {tier.benefits.length > 3 && (
                  <li className="text-xs text-muted-foreground pl-6">+{tier.benefits.length - 3} more benefits</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

