"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarIcon, AwardIcon, PlusIcon } from "lucide-react"

// Sample loyalty tiers (simplified version from loyalty-program.tsx)
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

interface ShipmentLoyaltyInfoProps {
  clientId?: string
  clientName?: string
  loyaltyTier?: string
  loyaltyPoints?: number
  onAddPoints?: (points: number, reason: string) => void
}

export function ShipmentLoyaltyInfo({
  clientId = "C001",
  clientName = "Wellington Equestrian Center",
  loyaltyTier = "Gold",
  loyaltyPoints = 8750,
  onAddPoints,
}: ShipmentLoyaltyInfoProps) {
  const [isAddingPoints, setIsAddingPoints] = useState(false)
  const [pointsToAdd, setPointsToAdd] = useState("")
  const [pointsReason, setPointsReason] = useState("")
  const [showAllBenefits, setShowAllBenefits] = useState(false)

  // Get tier details
  const tier = loyaltyTiers.find((t) => t.name === loyaltyTier) || loyaltyTiers[0]

  // Get progress to next tier
  const getProgressToNextTier = () => {
    const currentTierIndex = loyaltyTiers.findIndex((t) => t.name === tier.name)

    if (currentTierIndex === loyaltyTiers.length - 1) {
      return 100 // Already at highest tier
    }

    const nextTier = loyaltyTiers[currentTierIndex + 1]
    const pointsNeeded = nextTier.minPoints - tier.minPoints
    const pointsEarned = loyaltyPoints - tier.minPoints

    return Math.min(Math.round((pointsEarned / pointsNeeded) * 100), 100)
  }

  // Get discount rate based on tier
  const getDiscountRate = () => {
    switch (tier.name) {
      case "Platinum":
        return "15%"
      case "Gold":
        return "10%"
      case "Silver":
        return "5%"
      default:
        return "0%"
    }
  }

  // Handle adding points
  const handleAddPoints = () => {
    const points = Number.parseInt(pointsToAdd)
    if (points > 0 && onAddPoints) {
      onAddPoints(points, pointsReason)
      setIsAddingPoints(false)
      setPointsToAdd("")
      setPointsReason("")
    }
  }

  return (
    <>
      <Card className={`border-l-4 ${tier.borderColor}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Client Loyalty Status</CardTitle>
            <Badge className={tier.color}>{tier.name}</Badge>
          </div>
          <CardDescription>{clientName}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Loyalty Points</span>
                <span className="font-medium">{loyaltyPoints.toLocaleString()}</span>
              </div>
              <div className="space-y-1">
                <Progress value={getProgressToNextTier()} className="h-2" />
                {getProgressToNextTier() < 100 && (
                  <p className="text-xs text-muted-foreground text-right">
                    {tier.maxPoints - loyaltyPoints} points to{" "}
                    {loyaltyTiers[loyaltyTiers.findIndex((t) => t.name === tier.name) + 1]?.name}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AwardIcon className={`h-4 w-4 mr-1.5 ${tier.textColor}`} />
                  <span className="text-sm font-medium">Applicable Benefits</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2"
                  onClick={() => setShowAllBenefits(!showAllBenefits)}
                >
                  {showAllBenefits ? "Show Less" : "Show All"}
                </Button>
              </div>
              <div className="mt-1.5">
                <div className="flex items-center text-sm">
                  <StarIcon className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                  <span>{getDiscountRate()} discount on shipping fees</span>
                </div>
                {showAllBenefits && (
                  <div className="mt-1.5 space-y-1">
                    {tier.benefits.slice(1).map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <StarIcon className="h-3.5 w-3.5 mr-1.5 text-amber-500" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setIsAddingPoints(true)}>
            <PlusIcon className="h-3.5 w-3.5 mr-1" />
            Add Points for This Shipment
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog for adding points */}
      <Dialog open={isAddingPoints} onOpenChange={setIsAddingPoints}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Loyalty Points</DialogTitle>
            <DialogDescription>Add points to {clientName}'s loyalty account</DialogDescription>
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
            <Button onClick={handleAddPoints}>Add Points</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

