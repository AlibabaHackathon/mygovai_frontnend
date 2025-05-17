"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Send } from "lucide-react"
import { cn } from "@/lib/utils"

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
    <main className="flex flex-col h-screen bg-gray-50">
      {/* Chat messages area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">Ask me anything...</div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn("max-w-3xl mx-auto flex w-full", message.sender === "user" ? "justify-end" : "justify-start")}
          >
            <div className={cn("flex gap-3 max-w-[80%]", message.sender === "user" ? "flex-row-reverse" : "flex-row")}>
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                  "bg-gray-100 border border-gray-200",
                )}
              >
                {message.sender === "user" ? (
                  <div className="text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                ) : (
                  <div className="text-emerald-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2" />
                      <path d="M12 8v4" />
                      <path d="M12 16h.01" />
                    </svg>
                  </div>
                )}
              </div>
              <div
                className={cn(
                  "p-4 rounded-lg",
                  "inline-block",
                  message.sender === "user" ? "bg-blue-100" : "bg-white border border-gray-200",
                )}
              >
                {message.isTyping ? (
                  <div className="flex space-x-1 items-center">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

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
