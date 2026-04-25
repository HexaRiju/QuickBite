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
    if (!rollNo || !password) {
      return alert("All fields are required")
    }

    setLoading(true)

    try {
      const res = await fetch(
        `http://localhost:8080/api/users/login?rollNo=${rollNo}&password=${password}`
      )

      if (res.ok) {
        localStorage.setItem("rollNo", rollNo)
        router.push("/dashboard")
      } else {
        alert("Invalid credentials")
      }
    } catch (err) {
      console.error(err)
      alert("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="p-6 border rounded-lg shadow-md w-80 bg-white">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 w-full rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center mt-3">
          <Link href="/signup" className="text-blue-600 hover:underline">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}