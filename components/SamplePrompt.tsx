"use client";
import React from 'react'
import {motion} from "framer-motion"
import { Search } from 'lucide-react';

const SamplePrompt = ({ title, description }: { title: string; description: string }) => {
    return (
    <motion.button
      className="bg-white rounded-lg p-4 text-left border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all w-full"
      whileHover={{
        scale: 1.03,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        backgroundColor: "rgba(239, 246, 255, 0.5)", // Light blue background on hover
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start gap-3">
        <motion.div className="mt-1" whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
          <Search className="h-5 w-5 text-blue-600" />
        </motion.div>
        <div>
          <h3 className="font-medium text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </motion.button>
  )
}

export default SamplePrompt
