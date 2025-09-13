import { useState, useCallback } from "react"
import { createClient } from "@/lib/supabase-client"
import type { Product, ProductFormData } from "../types"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const supabase = createClient()

  const clearMessages = useCallback(() => {
    setError("")
    setSuccess("")
  }, [])

  const fetchProducts = useCallback(async () => {
    try {
      console.log("Fetching products...")
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Fetch error:", error)
        if (error.message.includes("No API key found")) {
          throw new Error("API key configuration error. Please check your environment variables and restart the server.")
        }
        throw error
      }
      
      console.log("Products fetched:", data)
      setProducts(data || [])
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch products"
      setError(errorMessage)
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
    }
  }, [supabase])

  const handleSubmit = useCallback(async (formData: ProductFormData, editingId?: string) => {
    setError("")
    setSuccess("")

    try {
      const productData = {
        name: formData.name,
        brand: formData.brand,
        model: formData.model,
        price: Number.parseFloat(formData.price),
        description: formData.description,
        image_url: formData.image_url,
        specifications: formData.specifications,
      }

      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId)

        if (error) throw error
        setSuccess("Product updated successfully!")
      } else {
        const { error } = await supabase
          .from("products")
          .insert([productData])

        if (error) throw error
        setSuccess("Product added successfully!")
      }

      await fetchProducts()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update or add product"
      setError(errorMessage)
    }
  }, [supabase, fetchProducts])

  const handleDelete = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id)

      if (error) throw error
      setSuccess("Product deleted successfully!")
      await fetchProducts()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete product"
      setError(errorMessage)
    }
  }, [supabase, fetchProducts])

  return {
    products,
    loading,
    error,
    success,
    fetchProducts,
    handleSubmit,
    handleDelete,
    clearMessages,
  }
}