"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import NormalChatArea from "./NormalChatArea";
import SplitScreenChatArea from "./SplitScreenChatArea";
import InputArea from "./InputArea";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  isTyping?: boolean;
};

export default function PostQuestion({initialPrompt}: any) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [splitScreen, setSplitScreen] = useState(false);

  // Scroll to bottom whenever messages change
  useEffect(() => {
  if (initialPrompt?.trim()) {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: initialPrompt,
      sender: "user",
    };

    setMessages([userMessage]);

    // Optionally, also trigger a bot response
    const typingMessageId = (Date.now() + 1).toString();
    const typingMessage: Message = {
      id: typingMessageId,
      content: "",
      sender: "bot",
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingMessage]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? {
                ...msg,
                content: `This is a response to: "${userMessage.content}"`,
                isTyping: false,
              }
            : msg
        )
      );
    }, 1500);

    // Optional: clear input if you don't want it showing
    setInputValue("");
  }
}, [initialPrompt]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Normalize input (e.g., lowercase, trim)
    const normalizedInput = inputValue.trim().toLowerCase();

    // Check if user wants to continue with the application
    if (normalizedInput.includes("i want to continue with the application")) {
      setSplitScreen(true);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing
    setIsTyping(true);

    // Add temporary typing message
    const typingMessageId = (Date.now() + 1).toString();
    const typingMessage: Message = {
      id: typingMessageId,
      content: "",
      sender: "bot",
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingMessage]);

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);

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
            : msg
        )
      );
    }, 1500);
  };

  return (
    <main className="flex flex-col h-screen bg-gray-50 scrollbar-hide">
      {/* Chat messages area */}
      {splitScreen ? (
        <main className="flex  w-full px-5 ">
          <div className="flex flex-row space-x-10 ">
            <div className="min-w-[800px]">
              <NormalChatArea
                chatContainerRef={chatContainerRef}
                messages={messages}
                messagesEndRef={messagesEndRef}
              />
              <InputArea
                handleSubmit={handleSubmit}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </div>

            <div className="bg-gray-300 min-h-screen min-w-[630px] rounded-md">
                
            </div>
          </div>
        </main>
      ) : (
        <>
          <NormalChatArea
            chatContainerRef={chatContainerRef}
            messages={messages}
            messagesEndRef={messagesEndRef}
          />
          <InputArea
            handleSubmit={handleSubmit}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </>
      )}

      {/* Input area - sticky at bottom */}
    </main>
  );
}
