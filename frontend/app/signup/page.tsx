"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [rollNo, setRollNo] = useState("")
  const [roomNo, setRoomNo] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const validatePassword = (pass: string) => {
    return /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(pass)
  }

  const handleSignup = async () => {
    if (!name || !rollNo || !roomNo || !password || !confirmPassword) {
      return alert("All fields are required")
    }

    if (!/^\d+$/.test(rollNo) || rollNo.length < 7) {
      return alert("Roll number must be numeric and at least 7 digits")
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match")
    }

    if (!validatePassword(password)) {
      return alert(
        "Password must be at least 8 characters, include 1 uppercase letter and 1 special symbol"
      )
    }

    setLoading(true)

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          name,
          rollNo,
          roomNo,
          password,
        }),
      })

      if (res.ok) {
        alert("Account created successfully")
        router.push("/login")
      } else {
        const text = await res.text()
        alert("Error: " + text)
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
        <h2 className="text-xl font-bold mb-4 text-center">Create Account</h2>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          placeholder="Room No"
          value={roomNo}
          onChange={(e) => setRoomNo(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 w-full mb-3 rounded"
        />

        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 w-full rounded"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <div className="text-center mt-3">
          <Link href="/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  )
}