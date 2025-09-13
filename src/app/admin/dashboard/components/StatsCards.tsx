import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Package, Smartphone } from "lucide-react"
import type { Product } from "../types"

interface StatsCardsProps {
  products: Product[]
  brands: string[]
}

export default function StatsCards({ products, brands }: StatsCardsProps) {
  const averagePrice = products.length > 0
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-gray-900">${averagePrice}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <Smartphone className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Brands</p>
              <p className="text-2xl font-bold text-gray-900">{brands.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}