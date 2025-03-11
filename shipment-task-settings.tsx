"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TaskList } from "@/components/task-list"
import { ShipmentNumbering } from "@/components/shipment-numbering"

// Initial task data for each shipment type
const initialImportTasks = [
  {
    id: "imp-1",
    title: "Verify Bill of Lading",
    description: "Check that all details on the Bill of Lading match the shipment manifest",
    externalLink: "https://www.cbp.gov/trade/basic-import-export",
    fileTemplate: "bill_of_lading_template.pdf",
    order: 1,
  },
  {
    id: "imp-2",
    title: "Complete Customs Entry",
    description: "File the necessary customs entry documents with CBP",
    externalLink: "https://ace.cbp.gov/",
    fileTemplate: "customs_entry_form.pdf",
    order: 2,
  },
  {
    id: "imp-3",
    title: "Arrange Customs Inspection",
    description: "Schedule inspection with Customs and Border Protection",
    externalLink: "https://www.cbp.gov/contact",
    fileTemplate: null,
    order: 3,
  },
  {
    id: "imp-4",
    title: "Pay Duties and Fees",
    description: "Process payment for all applicable duties, taxes, and fees",
    externalLink: "https://www.cbp.gov/trade/basic-import-export/internet-payments",
    fileTemplate: "payment_receipt_template.pdf",
    order: 4,
  },
  {
    id: "imp-5",
    title: "Arrange Delivery",
    description: "Coordinate final delivery to the consignee",
    externalLink: null,
    fileTemplate: "delivery_order_template.pdf",
    order: 5,
  },
]

const initialExportTasks = [
  {
    id: "exp-1",
    title: "Prepare Export Documentation",
    description:
      "Complete all required export documentation including Commercial Invoice, Packing List, and Certificate of Origin",
    externalLink: "https://www.trade.gov/export-solutions",
    fileTemplate: "export_docs_checklist.pdf",
    order: 1,
  },
  {
    id: "exp-2",
    title: "File Electronic Export Information (EEI)",
    description: "Submit EEI through the Automated Export System (AES)",
    externalLink: "https://www.census.gov/foreign-trade/aes/",
    fileTemplate: "aes_filing_guide.pdf",
    order: 2,
  },
  {
    id: "exp-3",
    title: "Book Cargo Space",
    description: "Arrange transportation with carrier",
    externalLink: null,
    fileTemplate: "booking_confirmation_template.pdf",
    order: 3,
  },
  {
    id: "exp-4",
    title: "Prepare Shipping Instructions",
    description: "Provide detailed shipping instructions to the carrier",
    externalLink: null,
    fileTemplate: "shipping_instructions_template.pdf",
    order: 4,
  },
  {
    id: "exp-5",
    title: "Obtain Bill of Lading",
    description: "Receive and verify the Bill of Lading from the carrier",
    externalLink: null,
    fileTemplate: "bill_of_lading_verification.pdf",
    order: 5,
  },
]

const initialInTransitTasks = [
  {
    id: "trn-1",
    title: "Prepare Transit Documentation",
    description: "Complete all required transit documentation including T1/T2 forms",
    externalLink: "https://www.cbp.gov/trade/programs-administration/in-bond",
    fileTemplate: "transit_docs_checklist.pdf",
    order: 1,
  },
  {
    id: "trn-2",
    title: "File In-Bond Request",
    description: "Submit in-bond request through ACE",
    externalLink: "https://ace.cbp.gov/",
    fileTemplate: "in_bond_request_template.pdf",
    order: 2,
  },
  {
    id: "trn-3",
    title: "Arrange Customs Sealing",
    description: "Schedule customs sealing of the container/vehicle",
    externalLink: null,
    fileTemplate: null,
    order: 3,
  },
  {
    id: "trn-4",
    title: "Monitor Transit Progress",
    description: "Track the shipment throughout the transit process",
    externalLink: null,
    fileTemplate: "transit_tracking_log.pdf",
    order: 4,
  },
  {
    id: "trn-5",
    title: "Complete Transit Closure",
    description: "Ensure proper closure of the transit procedure at destination",
    externalLink: "https://www.cbp.gov/trade/programs-administration/in-bond",
    fileTemplate: "transit_closure_form.pdf",
    order: 5,
  },
]

export function ShipmentTaskSettings() {
  const [importTasks, setImportTasks] = useState(initialImportTasks)
  const [exportTasks, setExportTasks] = useState(initialExportTasks)
  const [inTransitTasks, setInTransitTasks] = useState(initialInTransitTasks)

  return (
    <Tabs defaultValue="import" className="w-full">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="import">Import Tasks</TabsTrigger>
          <TabsTrigger value="export">Export Tasks</TabsTrigger>
          <TabsTrigger value="in-transit">In-Transit Tasks</TabsTrigger>
          <TabsTrigger value="numbering">Shipment Numbering</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="import">
        <Card>
          <CardHeader>
            <CardTitle>Import Shipment Tasks</CardTitle>
            <CardDescription>Configure tasks that need to be completed for every import shipment</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasks={importTasks} setTasks={setImportTasks} shipmentType="import" />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="export">
        <Card>
          <CardHeader>
            <CardTitle>Export Shipment Tasks</CardTitle>
            <CardDescription>Configure tasks that need to be completed for every export shipment</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasks={exportTasks} setTasks={setExportTasks} shipmentType="export" />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="in-transit">
        <Card>
          <CardHeader>
            <CardTitle>In-Transit Shipment Tasks</CardTitle>
            <CardDescription>Configure tasks that need to be completed for every in-transit shipment</CardDescription>
          </CardHeader>
          <CardContent>
            <TaskList tasks={inTransitTasks} setTasks={setInTransitTasks} shipmentType="in-transit" />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="numbering">
        <Card>
          <CardHeader>
            <CardTitle>Shipment Numbering</CardTitle>
            <CardDescription>Configure how shipments are numbered in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <ShipmentNumbering />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

