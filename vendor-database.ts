export class VendorDatabase {
  vendors: any[]

  constructor() {
    // Initialize with sample vendor data
    this.initializeVendorData()
  }

  /**
   * Initialize the vendor database with sample data
   */
  initializeVendorData() {
    this.vendors = [
      {
        id: "vendor123",
        name: "Fast Animal Transport Co.",
        vendorType: "Transport",
        email: "bookings@fastanimal.com",
        phone: "555-123-4567",
        address: {
          street: "123 Logistics Way",
          city: "Chicago",
          state: "IL",
          zipCode: "60606",
          country: "USA",
        },
        contactPerson: "John Smith",
        paymentTerms: "Net 30",
        bankDetails: {
          accountName: "Fast Animal Transport",
          accountNumber: "12345678",
          routingNumber: "87654321",
          bankName: "First National Bank",
          swiftCode: "FNBAUS123",
        },
        taxId: "12-3456789",
        dateAdded: new Date("2022-01-15"),
        notes: "Preferred transport vendor for US domestic shipments",
        rating: 4.8,
        serviceTypes: ["Transport", "Crating"],
        serviceAreas: ["USA", "Canada", "Mexico"],
        historicalPricing: [
          {
            serviceType: "Transport",
            routeDetails: {
              originCountry: "USA",
              destinationCountry: "USA",
            },
            pricePerUnit: 1500,
            effectiveDate: new Date("2023-01-01"),
          },
          {
            serviceType: "Crating",
            animalType: "dog",
            pricePerUnit: 75,
            effectiveDate: new Date("2023-01-01"),
          },
        ],
        performanceMetrics: {
          onTimeDeliveryRate: 95.2,
          averageResponseTime: 2.4, // hours
          disputeRate: 1.2, // percentage
          lastReviewDate: new Date("2023-03-15"),
        },
      },
      {
        id: "vendor456",
        name: "VetCare International",
        vendorType: "Veterinary",
        email: "services@vetcare.com",
        phone: "555-234-5678",
        address: {
          street: "456 Animal Health Blvd",
          city: "Boston",
          state: "MA",
          zipCode: "02110",
          country: "USA",
        },
        contactPerson: "Dr. Maria Johnson",
        paymentTerms: "Net 15",
        bankDetails: {
          accountName: "VetCare International",
          accountNumber: "87654321",
          routingNumber: "12345678",
          bankName: "Commerce Bank",
          swiftCode: "CMBCUS123",
        },
        taxId: "23-4567890",
        dateAdded: new Date("2022-02-10"),
        notes: "Specialized in export health certifications",
        rating: 4.9,
        serviceTypes: ["Veterinary", "Documentation"],
        serviceAreas: ["USA", "Europe", "Asia"],
        historicalPricing: [
          {
            serviceType: "Veterinary",
            animalType: "dog",
            pricePerUnit: 75,
            effectiveDate: new Date("2023-01-01"),
          },
          {
            serviceType: "Veterinary",
            animalType: "horse",
            pricePerUnit: 150,
            effectiveDate: new Date("2023-01-01"),
          },
          {
            serviceType: "Documentation",
            documentType: "Health",
            country: "USA",
            pricePerUnit: 75,
            effectiveDate: new Date("2023-01-01"),
          },
        ],
        performanceMetrics: {
          onTimeDeliveryRate: 98.7,
          averageResponseTime: 1.2, // hours
          disputeRate: 0.5, // percentage
          lastReviewDate: new Date("2023-04-10"),
        },
      },
      {
        id: "vendor789",
        name: "Global Logistics Partners",
        vendorType: "Transport",
        email: "operations@glp.com",
        phone: "555-345-6789",
        address: {
          street: "789 International Drive",
          city: "Miami",
          state: "FL",
          zipCode: "33101",
          country: "USA",
        },
        contactPerson: "Robert Johnson",
        paymentTerms: "Net 45",
        bankDetails: {
          accountName: "Global Logistics Partners",
          accountNumber: "23456789",
          routingNumber: "98765432",
          bankName: "International Bank",
          swiftCode: "INTBUS123",
        },
        taxId: "34-5678901",
        dateAdded: new Date("2022-03-05"),
        notes: "Specializes in international animal transport",
        rating: 4.7,
        serviceTypes: ["Transport", "Customs Brokerage"],
        serviceAreas: ["USA", "Europe", "Asia", "Australia"],
        historicalPricing: [
          {
            serviceType: "Transport",
            routeDetails: {
              originCountry: "USA",
              destinationCountry: "Europe",
            },
            pricePerUnit: 3500,
            effectiveDate: new Date("2023-01-01"),
          },
          {
            serviceType: "CustomsBrokerage",
            origin: "USA",
            destination: "Europe",
            pricePerUnit: 250,
            effectiveDate: new Date("2023-01-01"),
          },
        ],
        performanceMetrics: {
          onTimeDeliveryRate: 92.1,
          averageResponseTime: 3.5, // hours
          disputeRate: 2.1, // percentage
          lastReviewDate: new Date("2023-03-30"),
        },
      },
      {
        id: "vendor101",
        name: "Animal Nutrition Specialists",
        vendorType: "Feeding",
        email: "orders@animalnutrition.com",
        phone: "555-456-7890",
        address: {
          street: "101 Feed Mill Road",
          city: "Des Moines",
          state: "IA",
          zipCode: "50309",
          country: "USA",
        },
        contactPerson: "Susan Miller",
        paymentTerms: "Net 30",
        bankDetails: {
          accountName: "Animal Nutrition Specialists",
          accountNumber: "34567890",
          routingNumber: "09876543",
          bankName: "Midwest Bank",
          swiftCode: "MWBUS123",
        },
        taxId: "45-6789012",
        dateAdded: new Date("2022-04-20"),
        notes: "Premium animal feed for transport",
        rating: 4.6,
        serviceTypes: ["Feeding"],
        serviceAreas: ["USA", "Canada"],
        historicalPricing: [
          {
            serviceType: "Feeding",
            animalType: "dog",
            pricePerUnit: 25,
            effectiveDate: new Date("2023-01-01"),
          },
          {
            serviceType: "Feeding",
            animalType: "horse",
            pricePerUnit: 75,
            effectiveDate: new Date("2023-01-01"),
          },
        ],
        performanceMetrics: {
          onTimeDeliveryRate: 96.5,
          averageResponseTime: 2.0, // hours
          disputeRate: 0.8, // percentage
          lastReviewDate: new Date("2023-02-15"),
        },
      },
      {
        id: "vendor202",
        name: "Documentation Express",
        vendorType: "Documentation",
        email: "docs@docexpress.com",
        phone: "555-567-8901",
        address: {
          street: "202 Paperwork Plaza",
          city: "Washington",
          state: "DC",
          zipCode: "20001",
          country: "USA",
        },
        contactPerson: "David Chen",
        paymentTerms: "Net 15",
        bankDetails: {
          accountName: "Documentation Express LLC",
          accountNumber: "45678901",
          routingNumber: "10987654",
          bankName: "Capital Bank",
          swiftCode: "CAPBUS123",
        },
        taxId: "56-7890123",
        dateAdded: new Date("2022-05-12"),
        notes: "Fast turnaround on all export/import documentation",
        rating: 4.8,
        serviceTypes: ["Documentation"],
        serviceAreas: ["USA", "Global"],
        historicalPricing: [
          {
            serviceType: "Documentation",
            documentType: "Export",
            country: "USA",
            pricePerUnit: 150,
            effectiveDate: new Date("2023-01-01"),
          },
          {
            serviceType: "Documentation",
            documentType: "Import",
            country: "USA",
            pricePerUnit: 200,
            effectiveDate: new Date("2023-01-01"),
          },
        ],
        performanceMetrics: {
          onTimeDeliveryRate: 99.1,
          averageResponseTime: 1.5, // hours
          disputeRate: 0.3, // percentage
          lastReviewDate: new Date("2023-04-10"),
        },
      },
    ]
  }

  /**
   * Get a vendor by ID
   * @param {string} vendorId - The vendor ID
   * @returns {Object|null} The vendor object or null if not found
   */
  getVendorById(vendorId: string) {
    return this.vendors.find((vendor) => vendor.id === vendorId) || null
  }

  /**
   * Get vendors by service type
   * @param {string} serviceType - Type of service
   * @returns {Array} Array of vendors that provide the service
   */
  getVendorsByServiceType(serviceType: string) {
    return this.vendors.filter((vendor) => vendor.serviceTypes.includes(serviceType))
  }

  /**
   * Get vendors by service area
   * @param {string} area - Service area (country or region)
   * @returns {Array} Array of vendors that serve the area
   */
  getVendorsByServiceArea(area: string) {
    return this.vendors.filter((vendor) => vendor.serviceAreas.includes(area))
  }

  /**
   * Get vendors by rating
   * @param {number} minRating - Minimum rating
   * @returns {Array} Array of vendors with rating >= minRating
   */
  getVendorsByRating(minRating: number) {
    return this.vendors.filter((vendor) => vendor.rating >= minRating).sort((a, b) => b.rating - a.rating)
  }

  /**
   * Add a new vendor
   * @param {Object} vendorData - Vendor details
   * @returns {Object} The created vendor
   */
  addVendor(vendorData: any) {
    const vendor = {
      id: this.generateVendorId(),
      dateAdded: new Date(),
      historicalPricing: [],
      performanceMetrics: {
        onTimeDeliveryRate: 100,
        averageResponseTime: 0,
        disputeRate: 0,
        lastReviewDate: null,
      },
      ...vendorData,
    }

    this.vendors.push(vendor)
    return vendor
  }

  /**
   * Update an existing vendor
   * @param {string} vendorId - ID of the vendor to update
   * @param {Object} updates - The updates to apply
   * @returns {Object} The updated vendor
   */
  updateVendor(vendorId: string, updates: any) {
    const index = this.vendors.findIndex((vendor) => vendor.id === vendorId)

    if (index === -1) {
      throw new Error(`Vendor with ID ${vendorId} not found`)
    }

    this.vendors[index] = {
      ...this.vendors[index],
      ...updates,
    }

    return this.vendors[index]
  }

  /**
   * Delete a vendor
   * @param {string} vendorId - ID of the vendor to delete
   * @returns {boolean} Success status
   */
  deleteVendor(vendorId: string) {
    const index = this.vendors.findIndex((vendor) => vendor.id === vendorId)

    if (index === -1) {
      throw new Error(`Vendor with ID ${vendorId} not found`)
    }

    this.vendors.splice(index, 1)
    return true
  }

  /**
   * Add pricing information to a vendor
   * @param {string} vendorId - ID of the vendor
   * @param {Object} pricingData - Pricing information
   * @returns {Object} The updated vendor
   */
  addVendorPricing(vendorId: string, pricingData: any) {
    const vendor = this.getVendorById(vendorId)

    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} not found`)
    }

    // Ensure pricing has an effective date
    if (!pricingData.effectiveDate) {
      pricingData.effectiveDate = new Date()
    }

    vendor.historicalPricing.push(pricingData)

    return vendor
  }

  /**
   * Update vendor performance metrics
   * @param {string} vendorId - ID of the vendor
   * @param {Object} metrics - Updated performance metrics
   * @returns {Object} The updated vendor
   */
  updateVendorPerformance(vendorId: string, metrics: any) {
    const vendor = this.getVendorById(vendorId)

    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} not found`)
    }

    vendor.performanceMetrics = {
      ...vendor.performanceMetrics,
      ...metrics,
      lastReviewDate: new Date(),
    }

    return vendor
  }

  /**
   * Find the best vendor for a specific service
   * @param {string} serviceType - Type of service
   * @param {Object} criteria - Selection criteria
   * @returns {Object|null} The best matching vendor or null
   */
  findBestVendor(serviceType: string, criteria: any = {}) {
    // Get all vendors that provide this service
    const vendors = this.getVendorsByServiceType(serviceType)

    if (vendors.length === 0) {
      return null
    }

    // Filter by service area if specified
    let filteredVendors = vendors

    if (criteria.serviceArea) {
      filteredVendors = filteredVendors.filter((vendor) => vendor.serviceAreas.includes(criteria.serviceArea))

      if (filteredVendors.length === 0) {
        return null
      }
    }

    // Filter by minimum rating if specified
    if (criteria.minRating) {
      filteredVendors = filteredVendors.filter((vendor) => vendor.rating >= criteria.minRating)

      if (filteredVendors.length === 0) {
        return null
      }
    }

    // Calculate vendor scores based on criteria
    const scoredVendors = filteredVendors.map((vendor) => {
      let score = 0

      // Rating contributes 40% to the score
      score += (vendor.rating / 5) * 40

      // On-time delivery rate contributes 30% to the score
      score += (vendor.performanceMetrics.onTimeDeliveryRate / 100) * 30

      // Response time contributes 20% to the score (lower is better)
      const responseTimeScore = Math.max(0, 10 - vendor.performanceMetrics.averageResponseTime) / 10
      score += responseTimeScore * 20

      // Dispute rate contributes 10% to the score (lower is better)
      const disputeRateScore = Math.max(0, 10 - vendor.performanceMetrics.disputeRate) / 10
      score += disputeRateScore * 10

      return {
        vendor,
        score,
      }
    })

    // Sort by score (descending)
    scoredVendors.sort((a, b) => b.score - a.score)

    // Return the top vendor
    return scoredVendors[0]?.vendor || null
  }

  /**
   * Get price quote from a vendor
   * @param {string} vendorId - ID of the vendor
   * @param {string} serviceType - Type of service
   * @param {Object} details - Service details
   * @returns {Object|null} Price quote or null if not available
   */
  getVendorPriceQuote(vendorId: string, serviceType: string, details: any) {
    const vendor = this.getVendorById(vendorId)

    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} not found`)
    }

    // Find the most recent pricing for this service type
    let relevantPricing = vendor.historicalPricing.filter((pricing: any) => pricing.serviceType === serviceType)

    if (relevantPricing.length === 0) {
      return null
    }

    // Further filter based on details
    if (serviceType === "Transport" && details.origin && details.destination) {
      relevantPricing = relevantPricing.filter((pricing: any) => {
        if (!pricing.routeDetails) return false

        return (
          (pricing.routeDetails.originCountry === details.origin || pricing.routeDetails.originCountry === "Any") &&
          (pricing.routeDetails.destinationCountry === details.destination ||
            pricing.routeDetails.destinationCountry === "Any")
        )
      })
    } else if (
      (serviceType === "Veterinary" || serviceType === "Feeding" || serviceType === "Crating") &&
      details.animalType
    ) {
      relevantPricing = relevantPricing.filter(
        (pricing: any) => pricing.animalType === details.animalType || pricing.animalType === "Any",
      )
    } else if (serviceType === "Documentation" && details.documentType && details.country) {
      relevantPricing = relevantPricing.filter(
        (pricing: any) => pricing.documentType === details.documentType && pricing.country === details.country,
      )
    }

    if (relevantPricing.length === 0) {
      return null
    }

    // Sort by effective date (descending) to get the most recent
    relevantPricing.sort((a: any, b: any) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())

    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      serviceType: serviceType,
      price: relevantPricing[0].pricePerUnit,
      effectiveDate: relevantPricing[0].effectiveDate,
      notes: `Quote based on ${vendor.name}'s pricing as of ${new Date(relevantPricing[0].effectiveDate).toLocaleDateString()}`,
    }
  }

  /**
   * Compare price quotes from multiple vendors
   * @param {string} serviceType - Type of service
   * @param {Object} details - Service details
   * @returns {Array} Array of price quotes sorted by price
   */
  compareVendorPrices(serviceType: string, details: any) {
    const vendors = this.getVendorsByServiceType(serviceType)
    const quotes: any[] = []

    vendors.forEach((vendor) => {
      try {
        const quote = this.getVendorPriceQuote(vendor.id, serviceType, details)

        if (quote) {
          quotes.push(quote)
        }
      } catch (error) {
        console.warn(`Error getting quote from vendor ${vendor.id}: ${error}`)
      }
    })

    // Sort by price (ascending)
    return quotes.sort((a, b) => a.price - b.price)
  }

  /**
   * Generate a vendor performance report
   * @param {string} vendorId - ID of the vendor
   * @param {Date} startDate - Start date for the report
   * @param {Date} endDate - End date for the report
   * @returns {Object} Vendor performance report
   */
  generateVendorPerformanceReport(vendorId: string, startDate: Date, endDate: Date) {
    const vendor = this.getVendorById(vendorId)

    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} not found`)
    }

    // In a real application, this would analyze actual purchase orders and deliveries
    // For this example, we'll return dummy data

    return {
      vendorId: vendor.id,
      vendorName: vendor.name,
      reportPeriod: {
        startDate,
        endDate,
      },
      metrics: {
        purchaseOrderCount: 12,
        totalSpend: 15250,
        onTimeDeliveryRate: vendor.performanceMetrics.onTimeDeliveryRate,
        averageResponseTime: vendor.performanceMetrics.averageResponseTime,
        disputeRate: vendor.performanceMetrics.disputeRate,
        averagePriceVariance: 2.5, // percentage above/below market average
      },
      serviceBreakdown: [
        {
          serviceType: "Transport",
          count: 8,
          spend: 12000,
          onTimeRate: 93.5,
        },
        {
          serviceType: "Documentation",
          count: 4,
          spend: 3250,
          onTimeRate: 100,
        },
      ],
      priceHistory: vendor.historicalPricing.filter(
        (pricing: any) => new Date(pricing.effectiveDate) >= startDate && new Date(pricing.effectiveDate) <= endDate,
      ),
      recommendations: [
        "Consider for preferred vendor status",
        "Negotiate volume discounts",
        "Request faster response times for urgent shipments",
      ],
    }
  }

  /**
   * Generate a vendor ID
   * @returns {string} A unique vendor ID
   */
  generateVendorId() {
    const prefix = "vendor"
    const timestamp = Date.now().toString().substring(7)
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")

    return `${prefix}${timestamp}${random}`
  }
}

// Create a singleton instance
let vendorDatabaseInstance: VendorDatabase | null = null

export function getVendorDatabase() {
  if (!vendorDatabaseInstance) {
    vendorDatabaseInstance = new VendorDatabase()
  }
  return vendorDatabaseInstance
}

