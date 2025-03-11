"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdatedShipmentTable } from "./updated-shipment-table"
import { MonthlyView } from "./monthly-view"
import { useState } from "react"

export function ShipmentsTabs({ shipments = [], onShipmentUpdate, onSendToAccounting }) {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All Shipments</TabsTrigger>
        <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        <TabsTrigger value="accounting">Accounting</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="space-y-4">
          {activeTab === "all" && (
            <UpdatedShipmentTable
              shipments={shipments}
              onShipmentUpdate={onShipmentUpdate}
              onSendToAccounting={onSendToAccounting}
            />
          )}
        </div>
      </TabsContent>
      <TabsContent value="monthly">
        {activeTab === "monthly" && (
          <MonthlyView
            shipments={shipments}
            onShipmentUpdate={onShipmentUpdate}
            onSendToAccounting={onSendToAccounting}
          />
        )}
      </TabsContent>
      <TabsContent value="accounting">
        <div className="space-y-4">
          {activeTab === "accounting" && (
            <UpdatedShipmentTable
              shipments={shipments.filter((s) => s.sentToAccounting)}
              onShipmentUpdate={onShipmentUpdate}
              hideAccountingButton={true}
            />
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

