"use client"

import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva("rounded-lg border shadow-md", {
  variants: {
    variant: {
      default: "bg-background",
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    },
    width: {
      default: "w-full",
      auto: "w-auto",
    },
  },
  defaultVariants: {
    variant: "default",
    width: "default",
  },
})

// Update the CardProps interface to include support for agent layout
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  layout?: "default" | "grid" | "calendar" | "fullWidth" | "summary" | "agent"
  fullWidth?: boolean
}

// Update the Card component to handle the agent layout
export function Card({
  className,
  variant,
  width,
  layout = "default",
  fullWidth = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({ variant, width }),
        layout === "grid" && "grid-card",
        layout === "calendar" && "calendar-card",
        layout === "fullWidth" && "w-full p-6",
        layout === "agent" && "agent-card flex flex-col h-full",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-between pb-4", className)} {...props}>
    {children}
  </div>
)

export const CardTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </h2>
)

export const CardDescription = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <p className={cn("text-sm text-muted-foreground", className)} {...props}>
    {children}
  </p>
)

export function CardContent({
  className,
  layout,
  fullWidth = false,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  layout?: "default" | "grid" | "calendar" | "fullWidth" | "summary"
  fullWidth?: boolean
}) {
  return (
    <div
      className={cn(
        "p-6 pt-0",
        layout === "grid" && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        layout === "calendar" && "flex flex-col md:flex-row gap-6",
        layout === "fullWidth" && "w-full flex flex-wrap justify-between",
        layout === "summary" && "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-muted/20 rounded-md p-4",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("pt-4 border-t border-border", className)} {...props}>
    {children}
  </div>
)

