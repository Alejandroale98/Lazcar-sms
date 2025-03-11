"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import type React from "react"
import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import { FortuneDisplay } from "@/components/fortune-display"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [subtitle, setSubtitle] = useState("Shipping Management System")

  useEffect(() => {
    if (pathname.includes("/requests")) {
      setSubtitle("Service Requests")
    } else if (pathname.includes("/accounting")) {
      setSubtitle("Accounting")
    } else if (pathname.includes("/analytics")) {
      setSubtitle("Advanced Analytics")
    } else {
      setSubtitle("Shipping Management System")
    }
  }, [pathname])

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b">
            <div className="container mx-auto">
              <div className="flex h-24 items-center justify-between px-4">
                <div className="flex items-center gap-4">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images.jpg-4k1ZhJHPwb5BJvcgjgIHcTExm5quaj.jpeg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-md"
                  />
                  <h1 className="text-xl font-bold">Lazcar International</h1>
                  <p className="text-sm text-muted-foreground">
                    {pathname === "/analytics"
                      ? "Advanced Analytics"
                      : pathname.includes("/settings")
                        ? "Settings"
                        : pathname === "/requests"
                          ? "Requests"
                          : pathname.includes("/shipment")
                            ? "Shipment Details"
                            : pathname === "/"
                              ? "Dashboard"
                              : pathname.includes("/search")
                                ? "Shipment Search"
                                : "Shipments"}
                  </p>
                </div>
                <div className="flex items-center">
                  <MainNav className="ml-auto" />
                </div>
              </div>
            </div>
          </header>
          <FortuneDisplay />
          <Toaster />
          {children}
        </div>
      </body>
    </html>
  )
}



import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
