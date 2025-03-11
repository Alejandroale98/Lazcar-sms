import { format } from "date-fns"
import { PawPrint } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface ShipmentAnimalResultsProps {
  results: any[]
  searchType: string
  searchTerm: string
}

export function ShipmentAnimalResults({ results, searchType, searchTerm }: ShipmentAnimalResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-8 border rounded-lg bg-muted/20">
        <PawPrint className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="mt-2 text-muted-foreground">
          No animals found with {searchType === "name" ? "name" : "microchip number"} containing &quot;{searchTerm}
          &quot;
        </p>
      </div>
    )
  }

  // Group results by animal to avoid duplicates
  const groupedResults = results.reduce((acc, { animal, shipment }) => {
    const key = animal.id || `${animal.name}-${animal.microchipNumber}`

    if (!acc[key]) {
      acc[key] = {
        animal,
        shipments: [],
      }
    }

    // Only add the shipment if it's not already in the list
    if (!acc[key].shipments.some((s) => s.id === shipment.id)) {
      acc[key].shipments.push(shipment)
    }

    return acc
  }, {})

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <PawPrint className="h-5 w-5" />
        <h3 className="text-lg font-medium">
          Found {Object.keys(groupedResults).length} animal(s) across {results.length} shipment(s)
        </h3>
      </div>

      {Object.values(groupedResults).map((item: any, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              {item.animal.name || "Unnamed Animal"}
              {item.animal.microchipNumber && (
                <Badge variant="outline" className="ml-2">
                  Microchip: {item.animal.microchipNumber}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Shipment History:</h4>
              <ul className="grid gap-2 sm:grid-cols-1 md:grid-cols-2">
                {item.shipments.map((shipment: any) => (
                  <li key={shipment.id} className="border rounded-md p-2">
                    <Link href={`/shipments/${shipment.id}`} className="flex flex-col hover:underline">
                      <span className="font-medium">{shipment.title || `Shipment #${shipment.id}`}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {shipment.origin} → {shipment.destination}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {formatDate(shipment.date)}
                        </Badge>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  // Helper function to format dates
  function formatDate(dateString: string) {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return dateString
    }
  }
}

