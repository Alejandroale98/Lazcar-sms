"use client"

import type React from "react"

import { useState } from "react"
import { getVendorDatabase } from "@/lib/vendor-database"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Search, Plus, Edit, Trash2, FileText, DollarSign, Filter } from "lucide-react"
import VendorDetails from "@/components/vendor-details"
import VendorPriceComparison from "@/components/vendor-price-comparison"

export default function VendorManagement() {
  const vendorDb = getVendorDatabase()
  const [vendors, setVendors] = useState(vendorDb.vendors)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedVendor, setSelectedVendor] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showPriceComparison, setShowPriceComparison] = useState(false)
  const [filterType, setFilterType] = useState<string | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)

    if (term === "") {
      setVendors(vendorDb.vendors)
    } else {
      const filtered = vendorDb.vendors.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(term) ||
          vendor.vendorType.toLowerCase().includes(term) ||
          vendor.email.toLowerCase().includes(term) ||
          vendor.contactPerson.toLowerCase().includes(term),
      )
      setVendors(filtered)
    }
  }

  const handleFilterByType = (type: string | null) => {
    setFilterType(type)

    if (!type) {
      setVendors(vendorDb.vendors)
    } else {
      const filtered = vendorDb.vendors.filter((vendor) => vendor.vendorType === type)
      setVendors(filtered)
    }
  }

  const handleViewDetails = (vendor: any) => {
    setSelectedVendor(vendor)
    setShowDetails(true)
  }

  const handleCloseDetails = () => {
    setShowDetails(false)
  }

  const handleShowPriceComparison = () => {
    setShowPriceComparison(true)
  }

  const handleClosePriceComparison = () => {
    setShowPriceComparison(false)
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

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 w-1/2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search vendors..." value={searchTerm} onChange={handleSearch} className="w-full" />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={filterType || ""} onValueChange={(value) => handleFilterByType(value || null)}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                <span>{filterType || "Filter by type"}</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Transport">Transport</SelectItem>
              <SelectItem value="Veterinary">Veterinary</SelectItem>
              <SelectItem value="Documentation">Documentation</SelectItem>
              <SelectItem value="Feeding">Feeding</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleShowPriceComparison}>
            <DollarSign className="mr-2 h-4 w-4" />
            Compare Prices
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>Enter the details of the new vendor. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* Form fields would go here */}
                <p className="text-sm text-muted-foreground">Vendor form implementation will be added here.</p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">Save Vendor</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Directory</CardTitle>
          <CardDescription>Manage your vendors and service providers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Service Areas</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{vendor.vendorType}</Badge>
                  </TableCell>
                  <TableCell>{vendor.contactPerson}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {renderRatingStars(vendor.rating)}
                      <span className="ml-2 text-sm text-muted-foreground">{vendor.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.serviceAreas.slice(0, 2).map((area: string) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                      {vendor.serviceAreas.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{vendor.serviceAreas.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewDetails(vendor)}>
                        <FileText className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {vendors.length} of {vendorDb.vendors.length} vendors
          </div>
        </CardFooter>
      </Card>

      {showDetails && selectedVendor && <VendorDetails vendor={selectedVendor} onClose={handleCloseDetails} />}

      {showPriceComparison && <VendorPriceComparison onClose={handleClosePriceComparison} />}
    </>
  )
}

