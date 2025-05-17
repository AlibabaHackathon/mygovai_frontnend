"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import SamplePrompt from "./SamplePrompt";
import React from "react";
import ChatHeading from "./ChatHeading";
import { Mic, Send } from "lucide-react";

const PreQuestion = () => {
  const [headerTypedText, setHeaderTypedText] = useState("");
  const headerFullText = "Hello There, I am MyGovAI";
  const [isHeaderTypingComplete, setIsHeaderTypingComplete] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [descTypedText, setDescTypedText] = useState("");
  const descFullText =
    "Prompt Me Anything To Know More About Malaysian Government Services";
  const [isDescTypingComplete, setIsDescTypingComplete] = useState(false);

  const [samplePrompt, setSamplePrompt] = useState(""); // Make textarea controlled
  const [showInputBox, setShowInputBox] = useState(false);
  const [showPrompts, setShowPrompts] = useState(false);

  // Header typing animation
  useEffect(() => {
    if (headerTypedText.length < headerFullText.length) {
      const timeout = setTimeout(() => {
        setHeaderTypedText(headerFullText.slice(0, headerTypedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsHeaderTypingComplete(true);
    }
  }, [headerTypedText]);

  // Description typing animation
  useEffect(() => {
    if (isHeaderTypingComplete && descTypedText.length < descFullText.length) {
      const timeout = setTimeout(() => {
        setDescTypedText(descFullText.slice(0, descTypedText.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    } else if (descTypedText.length === descFullText.length) {
      setIsDescTypingComplete(true);

      const inputTimeout = setTimeout(() => {
        setShowInputBox(true);
      }, 200);

      const promptsTimeout = setTimeout(() => {
        setShowPrompts(true);
      }, 300);

      return () => {
        clearTimeout(inputTimeout);
        clearTimeout(promptsTimeout);
      };
    }
  }, [isHeaderTypingComplete, descTypedText]);

  // Handle sample prompt click
  const handleClick = (prompt: string, description: string) => {
    setSamplePrompt(`${prompt}: ${description}`);
  };

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    console.log("Voice command toggled:", !isListening);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSamplePrompt(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting prompt:", samplePrompt);
    // Send samplePrompt to backend or API
  };

  const cardVariants = [
    { x: -50, y: 0, rotate: -2 },
    { x: 50, y: 0, rotate: 2 },
    { x: -30, y: 30, rotate: 1 },
    { x: 30, y: 30, rotate: -1 },
    { x: -20, y: 50, rotate: -2 },
    { x: 20, y: 50, rotate: 2 },
  ];

  return (
    <main className="bg-gray-50 min-h-screen flex justify-center px-4">
      <div className="min-w-[800px] w-full">
        <ChatHeading
          headerTypedText={headerTypedText}
          isHeaderTypingComplete={isHeaderTypingComplete}
          descTypedText={descTypedText}
          isDescTypingComplete={isDescTypingComplete}
        />

        {/* Input Box */}
        <AnimatePresence>
          {showInputBox && (
            <motion.form
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
            >
              <div className="relative bg-white rounded-xl shadow-md overflow-hidden">
                <textarea
                  name="prompt"
                  className="w-full p-4 pr-24 min-h-[120px] focus:outline-none border-none"
                  placeholder="Ask me about Malaysian government services..."
                  value={samplePrompt}
                  onChange={handlePromptChange}
                  required
                />
                <div className="absolute bottom-3 right-3 flex space-x-2">
                  <motion.button
                    type="button"
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleVoiceCommand}
                    aria-label={isListening ? "Stop voice input" : "Start voice input"}
                  >
                    <Mic className="h-5 w-5" />
                    {isListening && (
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(239, 68, 68, 0)",
                            "0 0 0 10px rgba(239, 68, 68, 0)",
                          ],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                        }}
                      />
                    )}
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Sample Prompts */}
        <AnimatePresence>
          {showPrompts && (
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2
                className="text-lg font-medium text-gray-700"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                Try asking about:
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { title: "MyKad Application", description: "How do I apply for or renew my MyKad?" },
                  { title: "Road Tax Renewal", description: "What's the process for renewing road tax online?" },
                  { title: "Business Registration", description: "How to register a new business in Malaysia?" },
                  { title: "Income Tax Filing", description: "When is the deadline for income tax submission?" },
                  { title: "Healthcare Services", description: "What public healthcare services are available?" },
                  { title: "Education Assistance", description: "What education financial aid programs exist?" },
                ].map((prompt, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      x: cardVariants[index].x,
                      y: cardVariants[index].y,
                      rotate: cardVariants[index].rotate,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      rotate: 0,
                    }}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    <SamplePrompt
                      title={prompt.title}
                      description={prompt.description}
                      handleClick={() => handleClick(prompt.title, prompt.description)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default PreQuestion;
