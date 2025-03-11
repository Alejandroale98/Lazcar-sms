"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Cookie } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getShipments } from "@/lib/database"
import { ShipmentBadgeDropdown } from "./shipment-badge-dropdown"

// Extensive list of fortunes
const fortunes = [
  // Career & Success
  "A promotion or raise is in your near future.",
  "Your leadership skills will bring great opportunities.",
  "A challenging project will lead to remarkable success.",
  "Your innovative idea will be well received.",
  "Your dedication will be recognized and rewarded.",
  "A business venture will bring unexpected rewards.",
  "Your problem-solving abilities will shine today.",
  "Trust your instincts in professional matters.",
  "Your hard work is about to pay off magnificently.",
  "An important meeting will open new doors.",

  // Wisdom & Growth
  "Experience is the best teacher, and you're learning well.",
  "Your ability to adapt to change will serve you well.",
  "Wisdom comes to those who listen more than they speak.",
  "Your patience will be rewarded with great success.",
  "The best way to predict the future is to create it.",
  "Every challenge you face is making you stronger.",
  "Your positive attitude will attract positive outcomes.",
  "The path to success is often challenging but always worth it.",
  "Learning from mistakes will lead to great achievements.",
  "Your creative energy will lead to innovative solutions.",

  // Relationships & Teamwork
  "A new friendship at work will prove valuable.",
  "Your team's success depends on your collaboration today.",
  "Someone you least expect will become a valuable ally.",
  "Your kindness to colleagues will be remembered.",
  "A mentor will appear when you need guidance.",
  "Your leadership will inspire others to excel.",
  "Building bridges is better than building walls.",
  "Your ability to work with others will be noticed.",
  "A collaborative effort will lead to unexpected success.",
  "Your empathy will strengthen important relationships.",

  // Personal Growth
  "Your greatest strength is your adaptability.",
  "Today is a perfect day to start something new.",
  "Your positive energy will influence those around you.",
  "Trust your intuition - it will guide you correctly.",
  "A moment of patience can prevent a great disaster.",
  "Your determination will overcome any obstacle.",
  "Good things come to those who work hard and stay positive.",
  "Your unique perspective will solve a difficult problem.",
  "Success is not final, failure is not fatal.",
  "Your journey is as important as your destination.",

  // Fun & Lighthearted
  "A surprise coffee break will make your day.",
  "That thing you've been worried about? It'll work out fine.",
  "Your next video call will be surprisingly entertaining.",
  "A funny email will brighten your afternoon.",
  "Your weekend plans will exceed expectations.",
  "That office plant you've been nurturing will thrive.",
  "A delightful lunch conversation awaits you.",
  "Your favorite snack will appear when needed most.",
  "An unexpected compliment will make you smile.",
  "Your sense of humor will save the day.",

  // Motivation & Inspiration
  "Your persistence is about to unlock a major achievement.",
  "Today's small steps will lead to tomorrow's big wins.",
  "The project you're dreading will turn out better than expected.",
  "Your attention to detail will prevent a future problem.",
  "A challenge you're facing will become an opportunity.",
  "Your organizational skills will save the day.",
  "That bold decision you're considering? Go for it.",
  "Your preparation will meet a perfect opportunity.",
  "A moment of inspiration will solve a long-standing problem.",
  "Your optimism will be contagious in the best way possible.",
]

// Holiday detection and messages
interface Holiday {
  month: number
  day: number
  message: string
  emoji: string
}

const holidays: Holiday[] = [
  { month: 1, day: 1, message: "Happy New Year", emoji: "🎉" },
  { month: 2, day: 14, message: "Happy Valentine's Day", emoji: "💝" },
  { month: 3, day: 17, message: "Happy St. Patrick's Day", emoji: "☘️" },
  { month: 4, day: 1, message: "April Fools' Day", emoji: "🃏" },
  { month: 5, day: 5, message: "Happy Cinco de Mayo", emoji: "🌮" },
  { month: 7, day: 4, message: "Happy Independence Day", emoji: "🇺🇸" },
  { month: 10, day: 31, message: "Happy Halloween", emoji: "🎃" },
  { month: 11, day: 23, message: "Happy Thanksgiving", emoji: "🦃" },
  { month: 12, day: 24, message: "Christmas Eve", emoji: "🎄" },
  { month: 12, day: 25, message: "Merry Christmas", emoji: "🎄" },
  { month: 12, day: 31, message: "New Year's Eve", emoji: "✨" },
  // Add more holidays as needed
]

export function FortuneDisplay() {
  const [fortune, setFortune] = useState("")
  const [luckyNumber, setLuckyNumber] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [pendingShipments, setPendingShipments] = useState<any[]>([])

  useEffect(() => {
    // Get all shipments and filter those assigned to Alejandro that are not completed
    const shipments = getShipments()
    const alejandroShipments = shipments.filter((shipment) => {
      // Check if the shipment is assigned to Alejandro
      const isAssignedToAlejandro = shipment.assignedTo === "Alejandro"

      // Check if the shipment has incomplete tasks
      const hasIncompleteTasks = shipment.tasks?.some((task) => !task.completed)

      return isAssignedToAlejandro && hasIncompleteTasks
    })

    setPendingShipments(alejandroShipments)
  }, [])

  const generateFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    const randomNumber = Math.floor(Math.random() * 100) + 1
    setFortune(randomFortune)
    setLuckyNumber(randomNumber)
  }

  const getNewFortune = () => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    setFortune(randomFortune)
  }

  // Check for holidays
  const today = new Date()
  const currentHoliday = holidays.find(
    (holiday) => holiday.month === today.getMonth() + 1 && holiday.day === today.getDate(),
  )

  return (
    <div className="border-b bg-muted/50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Today is {format(today, "EEEE, MMMM d")}</div>
            {currentHoliday && (
              <Badge variant="outline" className="text-xs">
                {currentHoliday.message}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm font-medium">Hello Alejandro</div>
            {pendingShipments.length > 0 ? (
              <ShipmentBadgeDropdown shipments={pendingShipments} />
            ) : (
              <Badge variant="outline" className="bg-green-50 text-xs text-green-600">
                All shipments completed
              </Badge>
            )}
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" onClick={generateFortune} className="gap-2">
                <Cookie className="h-4 w-4" />
                Open Fortune Cookie
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Your Fortune Cookie</DialogTitle>
                <DialogDescription>Here's your fortune for today...</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="relative">
                  <div className="absolute -left-2 -top-2 text-2xl">🥠</div>
                  <div className="absolute -right-2 -bottom-2 text-2xl">✨</div>
                  <p className="rounded-lg border bg-muted/50 p-4 text-center italic">{fortune}</p>
                </div>
                {luckyNumber && (
                  <div className="text-center">
                    <span className="text-sm font-medium text-muted-foreground">Lucky Number:</span>
                    <span className="ml-2 text-xl font-bold text-primary">{luckyNumber}</span>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

