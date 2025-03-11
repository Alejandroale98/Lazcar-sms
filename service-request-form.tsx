"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"

const users = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    department: "Operations",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Sam Wilson",
    email: "sam@example.com",
    department: "Logistics",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Taylor Kim",
    email: "taylor@example.com",
    department: "Customer Service",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Jordan Smith",
    email: "jordan@example.com",
    department: "Veterinary",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Casey Brown",
    email: "casey@example.com",
    department: "Management",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function ServiceRequestForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    type: "",
    assignee: "",
  })
  const [step, setStep] = useState(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real application, this would save to a database
    console.log("Submitting service request:", formData)

    toast({
      title: "Service request created",
      description: "Your service request has been created successfully.",
    })

    // Reset form and redirect
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      type: "",
      assignee: "",
    })

    router.push("/service-requests")
  }

  const nextStep = () => setStep(2)
  const prevStep = () => setStep(1)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {step === 1 ? (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Request Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of the request"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Request Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shipment-issue">Shipment Issue</SelectItem>
                  <SelectItem value="animal-health">Animal Health</SelectItem>
                  <SelectItem value="documentation">Documentation</SelectItem>
                  <SelectItem value="customs">Customs & Regulations</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Provide all relevant details about the request"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Priority Level</Label>
              <RadioGroup
                value={formData.priority}
                onValueChange={(value) => handleSelectChange("priority", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="font-normal">
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="font-normal">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="high" id="high" />
                  <Label htmlFor="high" className="font-normal">
                    High
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="urgent" id="urgent" />
                  <Label htmlFor="urgent" className="font-normal">
                    Urgent
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" onClick={nextStep}>
              Next: Assign Request
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Assign To</Label>
              <div className="grid gap-4">
                {users.map((user) => (
                  <Card
                    key={user.id}
                    className={`p-4 cursor-pointer transition-all ${
                      formData.assignee === user.id ? "border-primary ring-2 ring-primary/20" : ""
                    }`}
                    onClick={() => handleSelectChange("assignee", user.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.department}</p>
                      </div>
                      <RadioGroupItem
                        value={user.id}
                        id={`user-${user.id}`}
                        checked={formData.assignee === user.id}
                        className="h-5 w-5"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button type="submit">Create Service Request</Button>
          </div>
        </>
      )}
    </form>
  )
}

