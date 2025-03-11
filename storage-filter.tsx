"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { getDatabase } from "@/lib/database"
import type { Horse, Owner, Agent } from "@/lib/types"

export function StorageFilter() {
  const router = useRouter()
  const [searchType, setSearchType] = useState<"horse" | "owner" | "agent" | "">("")
  const [searchTerm, setSearchTerm] = useState("")
  const [horses, setHorses] = useState<Horse[]>([])
  const [owners, setOwners] = useState<Owner[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const db = getDatabase()
    setHorses(db.horses)
    setOwners(db.owners)
    setAgents(db.agents)
  }, []) // Refresh data when sheet opens

  const filteredResults = () => {
    const term = searchTerm.toLowerCase()
    switch (searchType) {
      case "horse":
        return horses.filter((horse) => horse.name.toLowerCase().includes(term))
      case "owner":
        return owners.filter((owner) => owner.name.toLowerCase().includes(term))
      case "agent":
        return agents.filter((agent) => agent.name.toLowerCase().includes(term))
      default:
        return []
    }
  }

  const handleSearch = (entityId: string) => {
    if (!searchType) return
    router.push(`/search?type=${searchType}&id=${entityId}`)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          Storage Filter
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Storage Filter</SheetTitle>
          <SheetDescription>Search through historical shipment records</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Search Type</Label>
              <Select value={searchType} onValueChange={(value: "horse" | "owner" | "agent") => setSearchType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select search type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="horse">Search by Horse</SelectItem>
                  <SelectItem value="owner">Search by Owner</SelectItem>
                  <SelectItem value="agent">Search by Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {searchType && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Search Term</Label>
                  <Input
                    placeholder={`Enter ${searchType} name...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="border rounded-md">
                  <div className="p-2 bg-muted/50 border-b">
                    <h4 className="text-sm font-medium">Results</h4>
                  </div>
                  <div className="p-2 max-h-[300px] overflow-y-auto">
                    {filteredResults().map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSearch(result.id)}
                        className="w-full text-left p-2 hover:bg-muted rounded-md text-sm flex items-center justify-between group"
                      >
                        <span>{result.name}</span>
                        <span className="text-muted-foreground text-xs">
                          {result.shipmentIds.length} shipment{result.shipmentIds.length !== 1 ? "s" : ""}
                        </span>
                      </button>
                    ))}
                    {filteredResults().length === 0 && (
                      <div className="text-sm text-muted-foreground p-2">
                        No {searchType}s found matching your search
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

