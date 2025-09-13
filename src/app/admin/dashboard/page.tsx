"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hook/use-admin-auth"
import { Smartphone } from "lucide-react"
import DashboardHeader from "./components/DashboardHeader"
import StatsCards from "./components/StatsCards"
import ProductManagement from "./components/ProductManagement"
import AlertMessage from "./components/AlertMessage"
import { useProducts } from "./hooks/useProducts"
import { useProductFilters } from "./hooks/useProductFilters"

export default function AdminDashboard() {
  const { adminUser, signOut, loading: authLoading, isAdmin } = useAdminAuth()
  const router = useRouter()
  
  const {
    products,
    loading: productsLoading,
    error,
    success,
    fetchProducts,
    handleSubmit,
    handleDelete,
    clearMessages
  } = useProducts()

  const {
    filteredProducts,
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    brands
  } = useProductFilters(products)

  // Redirect if not an admin after authentication loads
  useEffect(() => {
    console.log("Auth check: authLoading=", authLoading, "isAdmin=", isAdmin)
    if (!authLoading && !isAdmin) {
      console.log("Redirecting to login: authLoading=", authLoading, "isAdmin=", isAdmin)
      router.push("/admin/login")
    }
  }, [authLoading, isAdmin, router])

  // Fetch products on mount
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  if (authLoading || productsLoading) {
    console.log("Rendering loading state: authLoading=", authLoading, "loading=", productsLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Smartphone className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    console.log("Rendering null due to !isAdmin: isAdmin=", isAdmin)
    return null // Prevent rendering if not an admin
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        adminUser={adminUser} 
        onSignOut={signOut} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards products={products} brands={brands} />
        
        <AlertMessage 
          error={error} 
          success={success} 
          onClear={clearMessages}
        />

        <ProductManagement
          products={filteredProducts}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          brands={brands}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          onProductsChange={fetchProducts}
        />
      </div>
    </div>
  )
}