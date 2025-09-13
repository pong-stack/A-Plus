import type React from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { AdminUser } from "../types" // Assuming AdminUser type is exported from types file

interface DashboardHeaderProps {
  adminUser: AdminUser | null // Changed from any to AdminUser | null
  onSignOut: () => void
}

export default function DashboardHeader({ adminUser, onSignOut }: DashboardHeaderProps) {
  const displayEmail = adminUser?.email || "Admin"

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-10 w-10">
              <Image
                src="/logo.jpg"
                alt="PhoneShop Logo"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <span className="text-xl font-bold text-gray-900">A Plus</span>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {displayEmail}</span>
            <Button variant="outline" size="sm" onClick={onSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}