"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { InfoIcon } from "lucide-react"

export function ShipmentNumbering() {
  const [importPrefix, setImportPrefix] = useState("IMPORT")
  const [exportPrefix, setExportPrefix] = useState("EXPORT")
  const [transitPrefix, setTransitPrefix] = useState("TRANSIT")
  const [digitCount, setDigitCount] = useState(3)
  const [useYear, setUseYear] = useState(true)
  const [resetCounterYearly, setResetCounterYearly] = useState(true)

  // Next numbers (automatically calculated in a real implementation)
  const [importCounter, setImportCounter] = useState(43)
  const [exportCounter, setExportCounter] = useState(29)
  const [transitCounter, setTransitCounter] = useState(16)

  // Example formatting function
  const formatShipmentNumber = (prefix: string, counter: number) => {
    const year = useYear ? new Date().getFullYear().toString().slice(-2) : ""
    const counterStr = counter.toString().padStart(digitCount, "0")
    return `${prefix}${year ? `-${year}` : ""}-${counterStr}`
  }

  // Reset counter with confirmation
  const resetCounter = (type: string) => {
    if (type === "import") {
      setImportCounter(1)
    } else if (type === "export") {
      setExportCounter(1)
    } else if (type === "transit") {
      setTransitCounter(1)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Automatic Numbering System</h3>
              <p className="text-sm text-blue-700 mt-1">
                Shipment numbers are automatically assigned when shipments are created. The system tracks the highest
                number used for each type and increments accordingly. The settings below control the format and display
                of these numbers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Import Numbering</CardTitle>
            <CardDescription>
              Next: <span className="font-mono">{formatShipmentNumber(importPrefix, importCounter)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="importPrefix">Prefix</Label>
                <Input id="importPrefix" value={importPrefix} onChange={(e) => setImportPrefix(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="importCounter">
                  Next Number <span className="text-xs text-muted-foreground">(Auto-incremented)</span>
                </Label>
                <Input
                  id="importCounter"
                  type="number"
                  value={importCounter}
                  onChange={(e) => setImportCounter(Number.parseInt(e.target.value))}
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">
                  This is for display only. Numbers are assigned automatically.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700"
                  >
                    Admin: Reset Counter
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Import Counter?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset the import counter to 001. This action should only be performed by administrators
                      for special circumstances such as starting a new numbering sequence. Normal counter increments
                      happen automatically.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => resetCounter("import")}>Reset Counter</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Export Numbering</CardTitle>
            <CardDescription>
              Next: <span className="font-mono">{formatShipmentNumber(exportPrefix, exportCounter)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="exportPrefix">Prefix</Label>
                <Input id="exportPrefix" value={exportPrefix} onChange={(e) => setExportPrefix(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exportCounter">
                  Next Number <span className="text-xs text-muted-foreground">(Auto-incremented)</span>
                </Label>
                <Input
                  id="exportCounter"
                  type="number"
                  value={exportCounter}
                  onChange={(e) => setExportCounter(Number.parseInt(e.target.value))}
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">
                  This is for display only. Numbers are assigned automatically.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700"
                  >
                    Admin: Reset Counter
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset Export Counter?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset the export counter to 001. This action should only be performed by administrators
                      for special circumstances such as starting a new numbering sequence. Normal counter increments
                      happen automatically.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => resetCounter("export")}>Reset Counter</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>In-Transit Numbering</CardTitle>
            <CardDescription>
              Next: <span className="font-mono">{formatShipmentNumber(transitPrefix, transitCounter)}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transitPrefix">Prefix</Label>
                <Input id="transitPrefix" value={transitPrefix} onChange={(e) => setTransitPrefix(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transitCounter">
                  Next Number <span className="text-xs text-muted-foreground">(Auto-incremented)</span>
                </Label>
                <Input
                  id="transitCounter"
                  type="number"
                  value={transitCounter}
                  onChange={(e) => setTransitCounter(Number.parseInt(e.target.value))}
                  className="bg-muted/50"
                />
                <p className="text-xs text-muted-foreground">
                  This is for display only. Numbers are assigned automatically.
                </p>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100 hover:text-amber-700"
                  >
                    Admin: Reset Counter
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reset In-Transit Counter?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset the in-transit counter to 001. This action should only be performed by
                      administrators for special circumstances such as starting a new numbering sequence. Normal counter
                      increments happen automatically.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => resetCounter("transit")}>Reset Counter</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Numbering Settings</CardTitle>
          <CardDescription>Configure how all shipment numbers are formatted</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="digitCount">Digit Count</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="digitCount"
                  type="number"
                  min={1}
                  max={6}
                  value={digitCount}
                  onChange={(e) => setDigitCount(Number.parseInt(e.target.value))}
                />
                <span className="text-sm text-muted-foreground">
                  Example: {digitCount === 3 ? "001" : "0".repeat(digitCount)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="useYear" className="cursor-pointer">
                    Include Year in Number
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Adds the current year (e.g., 25 for 2025) to shipment numbers
                  </p>
                </div>
                <Switch id="useYear" checked={useYear} onCheckedChange={setUseYear} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="resetCounterYearly" className="cursor-pointer">
                    Reset Counters Yearly
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically resets counters to 001 on January 1st
                  </p>
                </div>
                <Switch
                  id="resetCounterYearly"
                  checked={resetCounterYearly}
                  onCheckedChange={setResetCounterYearly}
                  disabled={!useYear}
                />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Preview</h3>
            <div className="grid gap-2 md:grid-cols-3">
              <div className="rounded-md border border-border p-2 text-center">
                <p className="text-xs text-muted-foreground mb-1">Import</p>
                <p className="font-mono">{formatShipmentNumber(importPrefix, importCounter)}</p>
              </div>
              <div className="rounded-md border border-border p-2 text-center">
                <p className="text-xs text-muted-foreground mb-1">Export</p>
                <p className="font-mono">{formatShipmentNumber(exportPrefix, exportCounter)}</p>
              </div>
              <div className="rounded-md border border-border p-2 text-center">
                <p className="text-xs text-muted-foreground mb-1">In-Transit</p>
                <p className="font-mono">{formatShipmentNumber(transitPrefix, transitCounter)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/20 border-t">
          <div className="text-xs text-muted-foreground w-full">
            <p className="font-medium">How Automatic Numbering Works:</p>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>When a new shipment is created, the system automatically assigns the next number in sequence</li>
              <li>Each shipment type (Import, Export, In-Transit) has its own separate counter</li>
              <li>If yearly reset is enabled, counters automatically restart at 001 on January 1st</li>
              <li>The admin reset buttons should only be used in exceptional circumstances</li>
            </ul>
          </div>
        </CardFooter>
      </Card>

      <div className="flex justify-end">
        <Button>Save Settings</Button>
      </div>
    </div>
  )
}

