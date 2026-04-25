"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(stored)
  }, [])

  const updateCart = (newCart: any[]) => {
    setCart(newCart)
    localStorage.setItem("cart", JSON.stringify(newCart))

    // update header badge
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const increaseQty = (id: number) => {
    updateCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decreaseQty = (id: number) => {
    updateCart(
      cart
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id: number) => {
    updateCart(cart.filter(item => item.id !== id))
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="p-6 max-w-3xl mx-auto">
        
        {/* 🔙 BACK BUTTON */}
        <button
          onClick={() => window.history.back()}
          className="text-sm text-gray-600 mb-4"
        >
          ← Back to Menu
        </button>

        <h1 className="text-2xl font-bold mb-6">Your Cart 🛒</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">No items in cart</p>
        ) : (
          <>
            {/* 🧾 CART ITEMS */}
            <div className="space-y-4">
              {cart.map(item => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  
                  {/* LEFT */}
                  <div>
                    <h2 className="font-semibold text-lg">
                      {item.name}
                    </h2>
                    <p className="text-green-600 font-medium">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* RIGHT CONTROLS */}
                  <div className="flex items-center gap-3">
                    
                    {/* QTY */}
                    <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 💰 TOTAL SECTION */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
              <div className="max-w-3xl mx-auto flex justify-between items-center">
                
                <div>
                  <p className="text-sm text-gray-500">
                    {cart.length} items
                  </p>
                  <h2 className="text-xl font-bold">
                    ₹{total}
                  </h2>
                </div>

                {/* ✅ UPDATED BUTTON */}
                <button
                  onClick={() => router.push("/payment")}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg"
                >
                  Place Order
                </button>

              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}