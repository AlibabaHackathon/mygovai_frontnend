"use client";
import PostQuestion from "@/components/PostQuestion";
import PreQuestion from "@/components/PreQuestion";
import { samp, tr } from "framer-motion/client";
import { useState } from "react";

export default function Home() {
  const [chatArea, setChatArea] = useState(false);
  const [samplePrompt, setSamplePrompt] = useState(""); // Make textarea controlled
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted!"); // For quick verification
    console.log(samplePrompt);
    setChatArea(true);
  };

  return (
    <main className="bg-gray-50 min-h-screen flex justify-center">
      <div className="my-5">
        {chatArea ? (
          <div className="min-w-[1000px]">
          <PostQuestion/>
          </div>
        ) : (
          <>
            <div>
              <PreQuestion
                handleSubmit={handleSubmit}
                samplePrompt={samplePrompt}
                setSamplePrompt={setSamplePrompt}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
