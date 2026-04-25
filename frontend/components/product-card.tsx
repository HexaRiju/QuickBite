"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Package } from "lucide-react"

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  category: string
  image?: string
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSrc = `https://loremflickr.com/300/300/food?lock=${product.id}`

  const handleAddToCart = () => {
    if (product.stock === 0) return

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const existing = cart.find((item: any) => item.id === product.id)

    let updatedCart

    if (existing) {
      updatedCart = cart.map((item: any) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart))
    window.dispatchEvent(new Event("cartUpdated"))

    alert("Added to cart 🛒")
  }

  const isOutOfStock = product.stock === 0

  return (
    <Card className="group overflow-hidden border-0 shadow-md transition-all hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={imageSrc}
          alt={product.name || "Product image"}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />

        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-card/90 text-foreground backdrop-blur-sm"
        >
          {product.category}
        </Badge>

        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/60">
            <span className="rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ₹{product.price}
          </span>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Package className="h-3.5 w-3.5" />
            <span>Stock: {product.stock}</span>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="mt-3 w-full gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}