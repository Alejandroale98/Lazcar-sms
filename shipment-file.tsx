import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, AlertCircle } from "lucide-react"
import Link from "next/link"

interface ShipmentFileProps {
  id: string
  type: string
  animalType: string
  numAnimals: number
  date: string
  incompleteTasks: number
}

export function ShipmentFile({ id, type, animalType, numAnimals, date, incompleteTasks }: ShipmentFileProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "import":
        return "bg-blue-500"
      case "export":
        return "bg-green-500"
      case "in-transit":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Link href={`/shipments/${id}`}>
      <Card className="p-3 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <div>
              <div className="flex gap-2 items-center">
                <Badge variant="outline" className={`${getTypeColor(type)} text-white`}>
                  {type}
                </Badge>
                <Badge variant="outline">{animalType}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{numAnimals} animals</p>
            </div>
          </div>
          {incompleteTasks > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              {incompleteTasks} tasks
            </Badge>
          )}
        </div>
      </Card>
    </Link>
  )
}

