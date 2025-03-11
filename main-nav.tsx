"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const [requestCount, setRequestCount] = useState(3)

  // Add service requests count
  const [serviceRequestCount, setServiceRequestCount] = useState(4)

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/shipments"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/shipments" || pathname.startsWith("/shipments/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Shipments
      </Link>
      <Link
        href="/requests"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary relative",
          pathname === "/requests" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Requests
        {requestCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {requestCount}
          </span>
        )}
      </Link>
      <Link
        href="/analytics"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/analytics" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Analytics
      </Link>
      <Link
        href="/accounting"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/accounting" || pathname.startsWith("/accounting/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Accounting
      </Link>
      <Link
        href="/settings"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/settings" || pathname.startsWith("/settings/") ? "text-primary" : "text-muted-foreground",
        )}
      >
        Settings
      </Link>
    </nav>
  )
}

