import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { ProductFormData } from "../types"

interface ProductFormProps {
  formData: ProductFormData
  setFormData: (data: ProductFormData) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isEditing?: boolean
}

export default function ProductForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProductFormProps) {
  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSpecificationChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [field]: value },
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            value={formData.brand}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="model">Model</Label>
          <Input
            id="model"
            value={formData.model}
            onChange={(e) => handleInputChange("model", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="image_url">Image URL</Label>
        <Input
          id="image_url"
          type="url"
          value={formData.image_url}
          onChange={(e) => handleInputChange("image_url", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="storage">Storage</Label>
          <Input
            id="storage"
            value={formData.specifications.storage}
            onChange={(e) => handleSpecificationChange("storage", e.target.value)}
            placeholder="e.g., 128GB"
          />
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            value={formData.specifications.color}
            onChange={(e) => handleSpecificationChange("color", e.target.value)}
            placeholder="e.g., Space Gray"
          />
        </div>
        <div>
          <Label htmlFor="display">Display</Label>
          <Input
            id="display"
            value={formData.specifications.display}
            onChange={(e) => handleSpecificationChange("display", e.target.value)}
            placeholder="e.g., 6.1-inch OLED"
          />
        </div>
        <div>
          <Label htmlFor="camera">Camera</Label>
          <Input
            id="camera"
            value={formData.specifications.camera}
            onChange={(e) => handleSpecificationChange("camera", e.target.value)}
            placeholder="e.g., 48MP Main"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {isEditing ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  )
}