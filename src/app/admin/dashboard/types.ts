export interface Product {
    id: string
    name: string
    brand: string
    model: string
    price: number
    description: string
    image_url: string
    specifications: ProductSpecifications
    created_at: string
  }
  
  export interface ProductSpecifications {
    storage: string
    color: string
    display: string
    camera: string
  }
  
  export interface ProductFormData {
    name: string
    brand: string
    model: string
    price: string
    description: string
    image_url: string
    specifications: ProductSpecifications
  }
  
  export interface AdminUser {
    email?: string
    id?: string
    // Add other user properties as needed
  }