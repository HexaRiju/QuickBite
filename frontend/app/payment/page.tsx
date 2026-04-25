"use client"

import { useRouter } from "next/navigation"

export default function PaymentPage() {
  const router = useRouter()

  const handlePayment = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const rollNo = localStorage.getItem("rollNo")

    if (!rollNo) {
      alert("Please login")
      return
    }

    if (cart.length === 0) {
      alert("Cart is empty")
      return
    }

    //  Calculate total amount
    const total = cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    )

    try {
      //  Step 1: Save orders as PENDING
      const orderIds: number[] = []

      for (let item of cart) {
        const res = await fetch("http://localhost:8080/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rollNo,
            productName: item.name,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
          }),
        })

        if (!res.ok) {
          throw new Error("Failed to create order")
        }

        const data: { id: number } = await res.json()
        orderIds.push(data.id)
      }

      // Step 2: Open UPI App (Mock)
      const upiLink = `upi://pay?pa=quickbite@upi&pn=QuickBite&am=${total}&cu=INR`
      window.location.href = upiLink

      // Step 3: Wait & mark as PAID
      setTimeout(async () => {
        try {
          for (let id of orderIds) {
            await fetch(`http://localhost:8080/api/orders/pay/${id}`, {
              method: "PUT",
            })
          }

          //  Clear cart
          localStorage.removeItem("cart")

          alert("Payment Successful ")

          //  Redirect to orders page
          router.replace("/orders")
        } catch (err) {
          console.error("Payment update error:", err)
        }
      }, 5000)
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">UPI Payment</h1>

      <p className="mb-4">Pay using UPI (Mock)</p>

      <button
        onClick={handlePayment}
        className="bg-green-600 text-white px-6 py-3 rounded-lg"
      >
        Pay Now
      </button>
    </div>
  )
}