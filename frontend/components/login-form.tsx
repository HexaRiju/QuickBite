"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { UtensilsCrossed, Loader2 } from "lucide-react"

export function LoginForm() {
  const [rollNumber, setRollNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!rollNumber || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Dummy validation - accept any non-empty credentials
    if (rollNumber && password) {
      router.push("/dashboard")
    } else {
      setError("Invalid credentials")
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="text-center pb-2">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <UtensilsCrossed className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">QuickBite</CardTitle>
        <CardDescription className="text-muted-foreground">
          Hostel Food Ordering System
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="rollNumber">Roll Number</FieldLabel>
              <Input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="h-12"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </Field>
          </FieldGroup>
          
          {error && (
            <p className="text-sm text-destructive mt-2">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full h-12 mt-6 text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Contact admin if you forgot your credentials
        </p>
      </CardContent>
    </Card>
  )
}
