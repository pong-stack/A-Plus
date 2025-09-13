import { useState, useMemo } from "react"
import type { Product } from "../types"

export function useProductFilters(products: Product[]) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("all")

  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))]
  }, [products])

  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.model.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedBrand !== "all") {
      filtered = filtered.filter((product) => product.brand === selectedBrand)
    }

    return filtered
  }, [products, searchTerm, selectedBrand])

  return {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    brands,
  }
}