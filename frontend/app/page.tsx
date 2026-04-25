"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [rollNo, setRollNo] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    // Validation
    if (!rollNo || !password) {
      return alert("All fields are required")
    }

    if (!/^\d+$/.test(rollNo)) {
      return alert("Roll number must be numeric")
    }

    if (rollNo.length < 7) {
      return alert("Roll number must be at least 7 digits")
    }

    setLoading(true)

    try {
      const response = await fetch(`http://localhost:8080/api/users/login?rollNo=${rollNo}&password=${password}`)

      if (response.ok) {
        // Store rollNo in localStorage
        localStorage.setItem("rollNo", rollNo)
        router.push("/dashboard")
      } else {
        alert("Invalid credentials")
      }
    } catch (error) {
      console.error('Login error:', error)
      alert("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="p-6 border rounded-lg shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          type="text"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="border p-2 w-full mb-3"
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          disabled={loading}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 w-full mb-3 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}