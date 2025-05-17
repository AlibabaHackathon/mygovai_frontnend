import React from 'react'
import { cn } from '@/lib/utils'

const NormalChatArea = ({chatContainerRef, messages,messagesEndRef }: any) => {
  return (
     <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-gray-400">Ask me anything...</div>
        )}

        {messages.map((message:any) => (
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
  )
}

export default NormalChatArea
