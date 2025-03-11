"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Star, Phone, Mail, MapPin, User, DollarSign, FileText } from "lucide-react"
import { getVendorDatabase } from "@/lib/vendor-database"

interface VendorDetailsProps {
  vendor: any
  onClose: () => void
}

export default function VendorDetails({ vendor, onClose }: VendorDetailsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const vendorDb = getVendorDatabase()

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-yellow-400" />
          <Star
            className="absolute top-0 left-0 h-4 w-4 fill-yellow-400 text-yellow-400 overflow-hidden"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />)
    }

    return <div className="flex">{stars}</div>
  }

  // Generate a performance report for the last 6 months
  const today = new Date()
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(today.getMonth() - 6)

  const performanceReport = vendorDb.generateVendorPerformanceReport(vendor.id, sixMonthsAgo, today)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center">
            {vendor.name}
            <Badge variant="outline" className="ml-2">
              {vendor.vendorType}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Vendor ID: {vendor.id} • Added on {formatDate(vendor.dateAdded)}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Contact Person:</span>
                    <span className="ml-2">{vendor.contactPerson}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span className="ml-2">{vendor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Phone:</span>
                    <span className="ml-2">{vendor.phone}</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <span className="font-medium">Address:</span>
                    <span className="ml-2">
                      {vendor.address.street}, {vendor.address.city}, {vendor.address.state} {vendor.address.zipCode},{" "}
                      {vendor.address.country}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Services & Rating</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium">Rating:</span>
                    <div className="ml-2 flex items-center">
                      {renderRatingStars(vendor.rating)}
                      <span className="ml-2">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Service Types:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vendor.serviceTypes.map((type: string) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Service Areas:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {vendor.serviceAreas.map((area: string) => (
                        <Badge key={area} variant="outline">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Notes:</span>
                    <p className="mt-1 text-sm text-muted-foreground">{vendor.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Payment Terms:</span>
                      <span className="ml-2">{vendor.paymentTerms}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="font-medium">Tax ID:</span>
                      <span className="ml-2">{vendor.taxId}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Bank Details:</div>
                    <div className="text-sm">
                      <div>
                        <span className="text-muted-foreground">Account Name:</span> {vendor.bankDetails.accountName}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Bank:</span> {vendor.bankDetails.bankName}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Account #:</span> {vendor.bankDetails.accountNumber}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Routing #:</span> {vendor.bankDetails.routingNumber}
                      </div>
                      <div>
                        <span className="text-muted-foreground">SWIFT:</span> {vendor.bankDetails.swiftCode}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pricing History</CardTitle>
                <CardDescription>Historical pricing information for services provided by this vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Effective Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendor.historicalPricing.map((pricing: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{pricing.serviceType}</TableCell>
                        <TableCell>
                          {pricing.routeDetails && (
                            <span>
                              Route: {pricing.routeDetails.originCountry} to {pricing.routeDetails.destinationCountry}
                            </span>
                          )}
                          {pricing.animalType && <span>Animal: {pricing.animalType}</span>}
                          {pricing.documentType && (
                            <span>
                              Document: {pricing.documentType} ({pricing.country})
                            </span>
                          )}
                        </TableCell>
                        <TableCell>${pricing.pricePerUnit.toFixed(2)}</TableCell>
                        <TableCell>{formatDate(pricing.effectiveDate)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Add New Pricing</CardTitle>
                <CardDescription>Add new pricing information for this vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Pricing form implementation will be added here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">On-Time Delivery Rate</span>
                      <span className="text-sm font-medium">
                        {vendor.performanceMetrics.onTimeDeliveryRate.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${vendor.performanceMetrics.onTimeDeliveryRate}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Average Response Time</span>
                      <span className="text-sm font-medium">
                        {vendor.performanceMetrics.averageResponseTime.toFixed(1)} hours
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(100, vendor.performanceMetrics.averageResponseTime * 10)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Dispute Rate</span>
                      <span className="text-sm font-medium">{vendor.performanceMetrics.disputeRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-red-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(100, vendor.performanceMetrics.disputeRate * 10)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground mt-2">
                    Last reviewed:{" "}
                    {vendor.performanceMetrics.lastReviewDate
                      ? formatDate(vendor.performanceMetrics.lastReviewDate)
                      : "Never"}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Report</CardTitle>
                  <CardDescription>
                    Last 6 months: {formatDate(sixMonthsAgo)} - {formatDate(today)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Purchase Orders</div>
                      <div className="text-2xl font-bold">{performanceReport.metrics.purchaseOrderCount}</div>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="text-sm text-muted-foreground">Total Spend</div>
                      <div className="text-2xl font-bold">${performanceReport.metrics.totalSpend.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="font-medium mb-2">Service Breakdown</div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Count</TableHead>
                          <TableHead>Spend</TableHead>
                          <TableHead>On-Time %</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {performanceReport.serviceBreakdown.map((service: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{service.serviceType}</TableCell>
                            <TableCell>{service.count}</TableCell>
                            <TableCell>${service.spend.toLocaleString()}</TableCell>
                            <TableCell>{service.onTimeRate.toFixed(1)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {performanceReport.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary"></div>
                      {recommendation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Financial overview for this vendor</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">YTD Spend</div>
                    <div className="text-2xl font-bold">$24,850</div>
                    <div className="text-sm text-green-600 mt-1">+12% from last year</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Open Invoices</div>
                    <div className="text-2xl font-bold">$3,250</div>
                    <div className="text-sm text-muted-foreground mt-1">2 invoices pending</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="text-sm text-muted-foreground">Avg. Invoice Amount</div>
                    <div className="text-2xl font-bold">$1,850</div>
                    <div className="text-sm text-red-600 mt-1">-5% from last year</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">Recent Transactions</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Invoice #</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>{formatDate(new Date(2025, 2, 15))}</TableCell>
                        <TableCell>INV-2025-0042</TableCell>
                        <TableCell>$1,750.00</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Paid
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{formatDate(new Date(2025, 2, 1))}</TableCell>
                        <TableCell>INV-2025-0036</TableCell>
                        <TableCell>$2,250.00</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            Pending
                          </Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>{formatDate(new Date(2025, 1, 15))}</TableCell>
                        <TableCell>INV-2025-0028</TableCell>
                        <TableCell>$1,500.00</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Paid
                          </Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
          <Button>Edit Vendor</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

