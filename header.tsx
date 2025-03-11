import { Search } from "@/components/search"
import { UserNav } from "@/components/user-nav"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-4">
          <Search />
          <Link href="/advanced-search">
            <Button variant="outline">Advanced Search</Button>
          </Link>
          <Link href="/settings/shipment-tasks">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Customize Shipment Tasks
            </Button>
          </Link>
          <UserNav />
        </div>
      </div>
    </div>
  )
}

