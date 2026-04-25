"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const rollNo = localStorage.getItem("rollNo")

    if (!rollNo) {
      alert("Please login")
      return
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/orders?rollNo=" + rollNo
        )
        const data = await res.json()
        setOrders([...data].reverse())
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-3xl mx-auto">

        {/* BACK BUTTON */}
        <button
          onClick={() => router.replace("/dashboard")}
          className="text-sm text-gray-600 mb-4"
        >
          ← Back to Menu
        </button>

        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg">
                    {order.productName}
                  </h2>
                  <span className="text-sm text-gray-500">
                    Qty: {order.quantity}
                  </span>
                </div>

                {(order.createdAt || order.created_at) && (
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(
                      (order.createdAt || order.created_at).replace(" ", "T")
                    ).toLocaleString()}
                  </p>
                )}

                <p className="mt-2 font-medium text-green-600">
                  ₹{order.totalPrice}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}