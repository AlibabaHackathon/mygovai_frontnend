"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import NormalChatArea from "./NormalChatArea";
import InputArea from "./InputArea";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  isTyping?: boolean;
};

export default function PostQuestion({ initialPrompt }: any) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

   
    const normalizedInput = inputValue.trim().toLowerCase();

    // Check if user wants to continue with the application
    if (normalizedInput.includes("help me fill up the form")) {
      setSplitScreen(true);
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    };

    //Add user message to chat

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
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

    //Calling the API
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputValue,
        }),
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      const botReply = data.output?.text || "No response";
      console.log("API response:", data);

      // Update bot message with API response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? { ...msg, content: botReply, isTyping: false }
            : msg
        )
      );
    } catch (error) {
      console.log("Error:");
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === typingMessageId
            ? {
                ...msg,
                content: "Sorry, something went wrong. Please try again.",
                isTyping: false,
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="flex flex-col h-screen bg-gray-50 scrollbar-hide">
      {/* Chat messages area */}
      {splitScreen ? (
        <main className="flex  w-full px-5 ">
          <div className="flex flex-row space-x-10 max-h-[800px] ">
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

            <div className="bg-gray-300 min-w-[630px] rounded-md">
              <iframe
                src="http://47.250.51.235:6082/vnc.html"
                title="KASMT"
                className="w-full h-full border-none"
                loading="eager"
              />
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
    </main>
  );
}
