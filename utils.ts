import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date string to a readable format
export function formatDate(dateString: string, formatString = "MMM d, yyyy") {
  try {
    return format(new Date(dateString), formatString)
  } catch (error) {
    return dateString
  }
}

