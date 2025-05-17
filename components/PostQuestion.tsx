"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import NormalChatArea from "./NormalChatArea"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  isTyping?: boolean
}

export default function PostQuestion() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const [splitScreen, setSplitScreen] = useState(false)

  // Scroll to bottom whenever messages change


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate bot typing
    setIsTyping(true)

    // Add temporary typing message
    const typingMessageId = (Date.now() + 1).toString()
    const typingMessage: Message = {
      id: typingMessageId,
      content: "",
      sender: "bot",
      isTyping: true,
    }

    setMessages((prev) => [...prev, typingMessage])

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false)

      // Replace typing message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? {
                id: msg.id,
                content: `This is a response to: "${userMessage.content}"`,
                sender: "bot",
                isTyping: false,
              }
            : msg,
        ),
      )
    }, 1500)
  }

  return (
    <main className="flex flex-col h-screen bg-gray-50 scrollbar-hide">
      {/* Chat messages area */}
    <NormalChatArea chatContainerRef = {chatContainerRef} messages = {messages} messagesEndRef = {messagesEndRef} />

      {/* Input area - sticky at bottom */}
      <div className="border-t border-gray-200  sticky bottom-0 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="rounded-lg border border-gray-300 bg-white overflow-hidden shadow-sm">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask anything..."
                className="w-full p-3 outline-none resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
              />

              <div className="flex justify-between items-center px-3 py-2 bg-gray-50">
                <p className="text-xs text-gray-500">Press Enter to send, Shift+Enter for new line</p>
                <div className="flex space-x-2">
                  <Button type="button" size="icon" variant="ghost">
                    <Mic className="h-5 w-5" />
                  </Button>
                  <Button type="submit" disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
