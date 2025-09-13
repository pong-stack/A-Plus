import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2 } from "lucide-react"
import ProductForm from "./ProductForm"
import type { Product, ProductFormData } from "../types"

interface ProductGridProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => Promise<void>
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
  onFormSubmit: (e: React.FormEvent) => Promise<void>
  onCancel: () => void
}

export default function ProductGrid({
  products,
  onEdit,
  onDelete,
  formData,
  setFormData,
  onFormSubmit,
  onCancel,
}: ProductGridProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return
    await onDelete(id)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="aspect-square bg-gray-100">
            <img
              src={product.image_url || "/placeholder.svg?height=300&width=300&query=smartphone"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary">{product.brand}</Badge>
              <span className="text-lg font-bold text-blue-600">${product.price}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Product</DialogTitle>
                      <DialogDescription>Update the product details</DialogDescription>
                    </DialogHeader>
                    <ProductForm
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={onFormSubmit}
                      onCancel={onCancel}
                      isEditing
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(product.created_at).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}