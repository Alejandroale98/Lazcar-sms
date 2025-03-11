"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface RequestTabsProps {
  onTabChange?: (value: string) => void
}

export function RequestTabs({ onTabChange }: RequestTabsProps) {
  const [activeTab, setActiveTab] = useState("all")

  // Sample request counts - in a real app, these would come from your database
  const requestCounts = {
    all: 11,
    shipments: 3,
    quarantine: 2,
    questions: 5,
    preImport: 1,
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (onTabChange) {
      onTabChange(value)
    }
  }

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="relative">
            All Requests
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
            >
              {requestCounts.all}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="shipments" className="relative">
            New Shipments
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
            >
              {requestCounts.shipments}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="quarantine" className="relative">
            Quarantine
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold"
            >
              {requestCounts.quarantine}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="questions" className="relative">
            Questions
            <Badge
              variant="outline"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-amber-100 text-amber-700 border-amber-200"
            >
              {requestCounts.questions}
            </Badge>
          </TabsTrigger>

          <TabsTrigger value="preImport" className="relative">
            Pre-Import Exam
            <Badge
              variant="outline"
              className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold bg-blue-100 text-blue-700 border-blue-200"
            >
              {requestCounts.preImport}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

