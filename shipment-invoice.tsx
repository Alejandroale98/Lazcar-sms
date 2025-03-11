"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AwardIcon, PrinterIcon, DownloadIcon, MailIcon, CreditCardIcon, PercentIcon, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ShipmentInvoiceProps {
  shipmentId: string
  clientId: string
  isEstimate?: boolean
}

// Sample loyalty tiers with discount rates
const loyaltyTiers = {
  Bronze: { discountRate: 0 },
  Silver: { discountRate: 5 },
  Gold: { discountRate: 10 },
  Platinum: { discountRate: 15 },
}

// Sample client data
const clientsData = [
  {
    id: "C001",
    name: "Wellington Equestrian Center",
    contactName: "Elizabeth Parker",
    email: "eparker@wellingtoneq.com",
    address: "13415 South Shore Blvd, Wellington, FL 33414",
    tier: "Platinum",
  },
  {
    id: "C002",
    name: "Bluegrass Thoroughbreds",
    contactName: "James Wilson",
    email: "jwilson@bluegrassth.com",
    address: "2500 Lexington Rd, Lexington, KY 40511",
    tier: "Gold",
  },
  {
    id: "C003",
    name: "European Dressage Imports",
    contactName: "Sophie Müller",
    email: "smuller@eurodressage.com",
    address: "Reitweg 15, 10115 Berlin, Germany",
    tier: "Silver",
  },
  {
    id: "C004",
    name: "Texas Cattle Co.",
    contactName: "Robert Johnson",
    email: "rjohnson@texascattle.com",
    address: "5678 Ranch Road, Austin, TX 78701",
    tier: "Bronze",
  },
]

// Sample shipment data
const shipmentData = {
  "SH-2025-0001": {
    title: "Horse Shipment from Germany",
    date: "March 15, 2025",
    items: [
      { description: "International Transport Fee", quantity: 12, unit: "Horse", unitPrice: 1200 },
      { description: "Customs Processing", quantity: 1, unit: "Shipment", unitPrice: 850 },
      { description: "Health Certification", quantity: 12, unit: "Horse", unitPrice: 150 },
      { description: "Insurance Premium", quantity: 12, unit: "Horse", unitPrice: 300 },
      { description: "Quarantine Facility", quantity: 12, unit: "Horse", unitPrice: 500 },
    ],
  },
}

export function ShipmentInvoice({ shipmentId, clientId, isEstimate = false }: ShipmentInvoiceProps) {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false)
  const [emailRecipient, setEmailRecipient] = useState("")
  const [emailSubject, setEmailSubject] = useState("")
  const [emailMessage, setEmailMessage] = useState("")

  // Get client data
  const client = clientsData.find((c) => c.id === clientId)
  if (!client) return null

  // Get shipment data
  const shipment = shipmentData[shipmentId]
  if (!shipment) return null

  // Get loyalty discount rate
  const loyaltyDiscountRate = loyaltyTiers[client.tier]?.discountRate || 0

  // Calculate totals
  const subtotal = shipment.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)

  // Function to calculate loyalty discount
  const calculateLoyaltyDiscount = (subtotal: number, loyaltyTier: string | undefined) => {
    switch (loyaltyTier) {
      case "Platinum":
        return subtotal * 0.15
      case "Gold":
        return subtotal * 0.1
      case "Silver":
        return subtotal * 0.05
      default:
        return 0
    }
  }

  const loyaltyDiscount = calculateLoyaltyDiscount(subtotal, client?.tier || "Bronze")
  const taxRate = 7.5 // Example tax rate
  const taxAmount = ((subtotal - loyaltyDiscount) * taxRate) / 100
  const total = subtotal - loyaltyDiscount + taxAmount

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
  }

  // Generate invoice/estimate number
  const documentNumber = isEstimate
    ? `EST-${shipmentId.split("-")[2]}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`
    : `INV-${shipmentId.split("-")[2]}-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">{isEstimate ? "Estimate" : "Invoice"}</h2>
          <p className="text-muted-foreground">
            {isEstimate ? "Estimate for shipment services" : "Invoice for completed services"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <DialogTrigger asChild>
            <Button
              size="sm"
              onClick={() => {
                setIsEmailDialogOpen(true)
                setEmailRecipient(client.email)
                setEmailSubject(`${isEstimate ? "Estimate" : "Invoice"} ${documentNumber} for Shipment ${shipmentId}`)
                setEmailMessage(
                  `Dear ${client.contactName},\n\nPlease find attached your ${isEstimate ? "estimate" : "invoice"} ${documentNumber} for shipment ${shipmentId}.\n\nThank you for your business.\n\nBest regards,\nLazcar SMS Team`,
                )
              }}
            >
              <MailIcon className="h-4 w-4 mr-2" />
              Email
            </Button>
          </DialogTrigger>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
            <div className="space-y-1">
              <h3 className="font-bold text-lg">Lazcar SMS</h3>
              <p className="text-sm">123 Shipping Lane</p>
              <p className="text-sm">Miami, FL 33101</p>
              <p className="text-sm">United States</p>
              <p className="text-sm">info@lazcar.com</p>
              <p className="text-sm">+1 (305) 555-0123</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-lg">Bill To:</h3>
                {loyaltyDiscountRate > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                          <AwardIcon className="h-3 w-3 mr-1" />
                          {client.tier}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Loyalty discount of {loyaltyDiscountRate}% applied</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="font-medium">{client.name}</p>
              <p className="text-sm">Attn: {client.contactName}</p>
              <p className="text-sm">{client.address}</p>
              <p className="text-sm">{client.email}</p>
            </div>

            <div className="space-y-4 min-w-[200px]">
              <div>
                <p className="text-sm text-muted-foreground">Document Number</p>
                <p className="font-medium">{documentNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipment ID</p>
                <p className="font-medium">{shipmentId}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{new Date().toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due Date</p>
                <p className="font-medium">
                  {isEstimate ? "N/A" : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-[50%]">Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipment.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.unit}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Subtotal
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(subtotal)}</TableCell>
                </TableRow>
                {loyaltyDiscount > 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-right">
                      <div className="flex items-center justify-end">
                        <PercentIcon className="h-4 w-4 mr-1 text-amber-600" />
                        <span>Loyalty Discount ({loyaltyDiscountRate}%)</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-amber-600">-{formatCurrency(loyaltyDiscount)}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={4} className="text-right">
                    Tax ({taxRate}%)
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(taxAmount)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(total)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>

          {!isEstimate && (
            <div className="mt-6 flex justify-end">
              <Button className="w-full md:w-auto">
                <CreditCardIcon className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            </div>
          )}

          <div className="mt-8 space-y-4">
            <Separator />
            <div className="text-sm">
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-muted-foreground">
                {isEstimate
                  ? "This estimate is valid for 30 days from the date of issue. Prices may change based on actual services provided."
                  : "Payment is due within 30 days. Please include the invoice number with your payment."}
              </p>
            </div>

            {loyaltyDiscount > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex items-start">
                <InfoIcon className="h-5 w-5 mr-2 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <p className="font-medium">Loyalty Program Discount Applied</p>
                  <p>
                    As a valued {client.tier} tier member, a {loyaltyDiscountRate}% discount has been automatically
                    applied to this {isEstimate ? "estimate" : "invoice"}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Email {isEstimate ? "Estimate" : "Invoice"}</DialogTitle>
            <DialogDescription>
              Send this {isEstimate ? "estimate" : "invoice"} to the client via email.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input id="recipient" value={emailRecipient} onChange={(e) => setEmailRecipient(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsEmailDialogOpen(false)}>Send Email</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

