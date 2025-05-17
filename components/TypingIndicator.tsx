"use client"

import { useEffect, useState } from "react"

export default function TypingIndicator() {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) return ""
        return prev + "."
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium">AI is typing{dots}</span>
      <span className="sr-only">AI is typing</span>
    </div>
  )
}
