"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed, LogOut, User } from "lucide-react"

export function Header() {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)

  const handleLogout = () => {
    localStorage.removeItem("rollNo")
    router.push("/")
  }

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]")
      const total = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      )
      setCartCount(total)
    }

    updateCartCount()

    window.addEventListener("cartUpdated", updateCartCount)
    window.addEventListener("storage", updateCartCount)

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount)
      window.removeEventListener("storage", updateCartCount)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <UtensilsCrossed className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">QuickBite</span>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          
          {/*  CART */}
          <Link href="/cart" className="relative text-xl">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/*  ORDERS */}
          <Link href="/orders" className="text-sm font-medium">
            📦 Orders
          </Link>

          {/* USER */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Student</span>
          </div>

          {/* LOGOUT */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>

        </div>
      </div>
    </header>
  )
}