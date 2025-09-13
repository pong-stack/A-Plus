"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase-client"
import type { User } from "@supabase/supabase-js"

interface AdminUser {
  id: string
  email: string
  role: number
  created_at: string
  updated_at: string
}

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    let mounted = true

    const getUser = async () => {
      try {
        console.log("Fetching user authentication...")
        const {
          data: { user },
        } = await supabase.auth.getUser()
        console.log("Auth user fetched:", user)
        if (mounted) setUser(user)

        if (user) {
          console.log("Checking admin_users for user ID:", user.id)
          const { data: adminUserData, error } = await supabase
            .from("admin_users")
            .select("*")
            .eq("id", user.id)
            .single()

          if (error) {
            console.error("Error querying admin_users:", error)
            if (mounted) setAdminUser(null)
          } else {
            console.log("Admin user data fetched:", adminUserData)
            if (mounted) setAdminUser(adminUserData)
          }
        } else {
          if (mounted) setAdminUser(null)
        }
      } catch (err: unknown) {
        console.error("Auth error:", err instanceof Error ? err.message : err)
        if (mounted) setAdminUser(null)
      } finally {
        if (mounted) setLoading(false)
        console.log("Authentication loading complete, loading:", loading, "adminUser:", adminUser)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session)
      if (mounted) setUser(session?.user ?? null)

      if (session?.user) {
        const { data: adminUserData, error } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (error) {
          console.error("Error querying admin_users on state change:", error)
          if (mounted) setAdminUser(null)
        } else {
          console.log("Updated admin user data:", adminUserData)
          if (mounted) setAdminUser(adminUserData)
        }
      } else {
        if (mounted) setAdminUser(null)
      }

      if (mounted) setLoading(false)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
    // Note: adminUser and loading are state variables managed within the effect
    // and do not need to be in the dependency array
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return {
    user,
    adminUser,
    loading,
    signOut,
    isAdmin: adminUser?.role === 1 || false,
  }
}