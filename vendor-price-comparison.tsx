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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { getVendorDatabase } from "@/lib/vendor-database"
import { DollarSign, ArrowUpDown } from "lucide-react"

interface VendorPriceComparisonProps {
  onClose: () => void
}

export default function VendorPriceComparison({ onClose }: VendorPriceComparisonProps) {
  const [isOpen, setIsOpen] = useState(true)
  const vendorDb = getVendorDatabase()

  const [serviceType, setServiceType] = useState("Transport")
  const [origin, setOrigin] = useState("USA")
  const [destination, setDestination] = useState("Europe")
  const [animalType, setAnimalType] = useState("horse")
  const [documentType, setDocumentType] = useState("Export")
  const [country, setCountry] = useState("USA")

  const [quotes, setQuotes] = useState<any[]>([])
  const [sortField, setSortField] = useState("price")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const handleCompare = () => {
    let details: any = {}

    if (serviceType === "Transport") {
      details = { origin, destination }
    } else if (serviceType === "Veterinary" || serviceType === "Feeding" || serviceType === "Crating") {
      details = { animalType }
    } else if (serviceType === "Documentation") {
      details = { documentType, country }
    }

    const results = vendorDb.compareVendorPrices(serviceType, details)
    setQuotes(results)
  }

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedQuotes = [...quotes].sort((a, b) => {
    let valueA, valueB

    if (sortField === "price") {
      valueA = a.price
      valueB = b.price
    } else if (sortField === "vendorName") {
      valueA = a.vendorName
      valueB = b.vendorName
    } else if (sortField === "effectiveDate") {
      valueA = new Date(a.effectiveDate).getTime()
      valueB = new Date(b.effectiveDate).getTime()
    } else {
      valueA = a[sortField]
      valueB = b[sortField]
    }

    if (sortDirection === "asc") {
      return valueA > valueB ? 1 : -1
    } else {
      return valueA < valueB ? 1 : -1
    }
  })

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Vendor Price Comparison</DialogTitle>
          <DialogDescription>Compare prices from different vendors for the same service</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Veterinary">Veterinary</SelectItem>
                <SelectItem value="Documentation">Documentation</SelectItem>
                <SelectItem value="Feeding">Feeding</SelectItem>
                <SelectItem value="Crating">Crating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {serviceType === "Transport" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Select value={origin} onValueChange={setOrigin}>
                  <SelectTrigger id="origin">
                    <SelectValue placeholder="Select origin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Select value={destination} onValueChange={setDestination}>
                  <SelectTrigger id="destination">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(serviceType === "Veterinary" || serviceType === "Feeding" || serviceType === "Crating") && (
            <div className="space-y-2">
              <Label htmlFor="animalType">Animal Type</Label>
              <Select value={animalType} onValueChange={setAnimalType}>
                <SelectTrigger id="animalType">
                  <SelectValue placeholder="Select animal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="horse">Horse</SelectItem>
                  <SelectItem value="cattle">Cattle</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {serviceType === "Documentation" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="documentType">Document Type</Label>
                <Select value={documentType} onValueChange={setDocumentType}>
                  <SelectTrigger id="documentType">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Export">Export</SelectItem>
                    <SelectItem value="Import">Import</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Europe">Europe</SelectItem>
                    <SelectItem value="Asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end mb-4">
          <Button onClick={handleCompare}>
            <DollarSign className="mr-2 h-4 w-4" />
            Compare Prices
          </Button>
        </div>

        {quotes.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("vendorName")}>
                  <div className="flex items-center">
                    Vendor
                    {sortField === "vendorName" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                  <div className="flex items-center">
                    Price
                    {sortField === "price" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("effectiveDate")}>
                  <div className="flex items-center">
                    Effective Date
                    {sortField === "effectiveDate" && <ArrowUpDown className="ml-2 h-4 w-4" />}
                  </div>
                </TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedQuotes.map((quote, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{quote.vendorName}</TableCell>
                  <TableCell>${quote.price.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(quote.effectiveDate)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{quote.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {quotes.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No price quotes available for the selected criteria. Try different options or click "Compare Prices".
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

