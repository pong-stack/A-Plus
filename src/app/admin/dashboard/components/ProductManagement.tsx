import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Search, Smartphone } from "lucide-react"
import ProductForm from "./ProductForm"
import ProductGrid from "./ProductGrid"
import type { Product, ProductFormData } from "../types"

interface ProductManagementProps {
  products: Product[]
  searchTerm: string
  onSearchChange: (term: string) => void
  selectedBrand: string
  onBrandChange: (brand: string) => void
  brands: string[]
  onSubmit: (data: ProductFormData, editingId?: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
  onProductsChange: () => void
}

export default function ProductManagement({
  products,
  searchTerm,
  onSearchChange,
  selectedBrand,
  onBrandChange,
  brands,
  onSubmit,
  onDelete,
  onProductsChange
}: ProductManagementProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    brand: "",
    model: "",
    price: "",
    description: "",
    image_url: "",
    specifications: {
      storage: "",
      color: "",
      display: "",
      camera: "",
    },
  })

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      model: "",
      price: "",
      description: "",
      image_url: "",
      specifications: {
        storage: "",
        color: "",
        display: "",
        camera: "",
      },
    })
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData, editingProduct?.id)
    resetForm()
    setIsAddDialogOpen(false)
    setEditingProduct(null)
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      brand: product.brand,
      model: product.model,
      price: product.price.toString(),
      description: product.description || "",
      image_url: product.image_url || "",
      specifications: product.specifications || {
        storage: "",
        color: "",
        display: "",
        camera: "",
      },
    })
    setEditingProduct(product)
  }

  const handleCancel = () => {
    setIsAddDialogOpen(false)
    resetForm()
    setEditingProduct(null)
  }

  return (
    <>
      {/* Controls */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Manage your phone inventory</CardDescription>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                  <DialogDescription>Fill in the product details below</DialogDescription>
                </DialogHeader>
                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleFormSubmit}
                  onCancel={handleCancel}
                  isEditing={!!editingProduct}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedBrand} onValueChange={onBrandChange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12">
          <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or add a new product.</p>
        </div>
      ) : (
        <ProductGrid
          products={products}
          onEdit={handleEdit}
          onDelete={onDelete}
          formData={formData}
          setFormData={setFormData}
          onFormSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}
    </>
  )
}