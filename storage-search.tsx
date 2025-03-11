"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

interface StorageSearchProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  results: string[]
  onSelect: (value: string) => void
}

export function StorageSearch({ label, placeholder, value, onChange, results, onSelect }: StorageSearchProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="pl-8" />
      </div>
      {results.length > 0 && value && (
        <ScrollArea className="h-[100px] rounded-md border">
          <div className="p-2">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => onSelect(result)}
                className="w-full text-left px-2 py-1 text-sm rounded hover:bg-muted"
              >
                {result}
              </button>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

