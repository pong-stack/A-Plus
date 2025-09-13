import type React from "react"
import { useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AlertMessageProps {
  error: string
  success: string
  onClear: () => void
}

export default function AlertMessage({ error, success, onClear }: AlertMessageProps) {
  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        onClear()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [error, success, onClear])

  if (!error && !success) return null

  return (
    <Alert
      variant={error ? "destructive" : "default"}
      className={`mb-6 ${error ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}`}
    >
      <AlertDescription className={error ? "text-red-800" : "text-green-800"}>
        {error || success}
      </AlertDescription>
    </Alert>
  )
}