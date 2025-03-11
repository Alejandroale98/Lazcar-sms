"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ShoppingCart, CreditCard, Banknote, Save, Printer, Send, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ShipmentAccountingDetailsProps {
  shipmentId: string
}

export function ShipmentAccountingDetails({ shipmentId }: ShipmentAccountingDetailsProps) {
  const [activeTab, setActiveTab] = useState("invoices")

  // This would come from an API in a real application
  const shipment = {
    id: shipmentId,
    customer: "John Smith",
    animals: [
      { id: "A001", type: "Horse", breed: "Thoroughbred", name: "Thunder" },
      { id: "A002", type: "Horse", breed: "Arabian", name: "Storm" },
    ],
    departureDate: "2025-03-15",
    destination: "Kentucky Ranch",
    status: "In Progress",
    totalCost: 12500.0,
    paidAmount: 5000.0,
    remainingBalance: 7500.0,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Shipment Accounting</h2>
          <p className="text-muted-foreground">Manage financial details for shipment {shipmentId}</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/shipments">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shipments
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Overview of financial status for this shipment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <h4 className="font-medium text-muted-foreground mb-1">Total Cost</h4>
              <div className="text-2xl font-bold">${shipment.totalCost.toLocaleString()}</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <h4 className="font-medium text-muted-foreground mb-1">Paid Amount</h4>
              <div className="text-2xl font-bold text-green-600">${shipment.paidAmount.toLocaleString()}</div>
            </div>
            <div className="bg-card p-4 rounded-lg shadow-sm border">
              <h4 className="font-medium text-muted-foreground mb-1">Remaining Balance</h4>
              <div className="text-2xl font-bold text-amber-600">${shipment.remainingBalance.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="invoices" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="estimates">Estimates</TabsTrigger>
            <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="allocations">Allocations</TabsTrigger>
          </TabsList>

          {activeTab === "invoices" && (
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          )}
          {activeTab === "estimates" && (
            <Button size="sm">
              <FileText className="mr-2 h-4 w-4" />
              New Estimate
            </Button>
          )}
          {activeTab === "purchase-orders" && (
            <Button size="sm">
              <ShoppingCart className="mr-2 h-4 w-4" />
              New PO
            </Button>
          )}
          {activeTab === "payments" && (
            <Button size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          )}
          {activeTab === "allocations" && (
            <Button size="sm">
              <Banknote className="mr-2 h-4 w-4" />
              Allocate Funds
            </Button>
          )}
        </div>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Manage customer invoices for this shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Invoice #INV-2025-001</h3>
                    <p className="text-sm text-muted-foreground">Issued: March 1, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$8,500.00</p>
                    <p className="text-sm text-amber-600">Partially Paid</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Invoice #INV-2025-002</h3>
                    <p className="text-sm text-muted-foreground">Issued: March 5, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$4,000.00</p>
                    <p className="text-sm text-red-600">Unpaid</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="estimates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Estimates</CardTitle>
              <CardDescription>Manage cost estimates for this shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">Estimate #EST-2025-001</h3>
                    <p className="text-sm text-muted-foreground">Created: February 15, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$12,500.00</p>
                    <p className="text-sm text-green-600">Approved</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    Convert to Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Manage vendor purchase orders for this shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">PO #PO-2025-001</h3>
                    <p className="text-sm text-muted-foreground">Vendor: Air Transport Services</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$5,200.00</p>
                    <p className="text-sm text-amber-600">Partially Paid</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">PO #PO-2025-002</h3>
                    <p className="text-sm text-muted-foreground">Vendor: Equine Transport Co.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">$3,800.00</p>
                    <p className="text-sm text-green-600">Paid</p>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <Save className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <CardDescription>Track payments received and made for this shipment</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">Payments Received</h3>
              <div className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Payment #PAY-2025-001</p>
                    <p className="text-sm text-muted-foreground">March 2, 2025 - Wire Transfer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">$5,000.00</p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-2 mt-6">Payments Made</h3>
              <div className="border rounded-md p-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Payment #EXP-2025-001</p>
                    <p className="text-sm text-muted-foreground">March 3, 2025 - ACH Transfer</p>
                    <p className="text-sm">To: Air Transport Services</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">$3,000.00</p>
                  </div>
                </div>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Payment #EXP-2025-002</p>
                    <p className="text-sm text-muted-foreground">March 5, 2025 - Credit Card</p>
                    <p className="text-sm">To: Equine Transport Co.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">$3,800.00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Allocations</CardTitle>
              <CardDescription>Manage how funds are allocated across accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Accounts Receivable</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Customer Invoice #INV-2025-001</span>
                      <span className="font-medium">$8,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Invoice #INV-2025-002</span>
                      <span className="font-medium">$4,000.00</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Payment Received #PAY-2025-001</span>
                      <span className="font-medium">-$5,000.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total Accounts Receivable</span>
                      <span>$7,500.00</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Accounts Payable</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vendor PO #PO-2025-001</span>
                      <span className="font-medium">$5,200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Vendor PO #PO-2025-002</span>
                      <span className="font-medium">$3,800.00</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Payment Made #EXP-2025-001</span>
                      <span className="font-medium">-$3,000.00</span>
                    </div>
                    <div className="flex justify-between text-red-600">
                      <span>Payment Made #EXP-2025-002</span>
                      <span className="font-medium">-$3,800.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total Accounts Payable</span>
                      <span>$2,200.00</span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Profit Analysis</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-medium">$12,500.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Expenses</span>
                      <span className="font-medium">$9,000.00</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Projected Profit</span>
                      <span className="text-green-600">$3,500.00</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Profit Margin</span>
                      <span>28%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

