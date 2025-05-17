import React from "react";
import { motion } from "framer-motion";
import { FlagIcon } from "lucide-react";

const ChatHeading = ({
  headerTypedText,
  isHeaderTypingComplete,
  descTypedText,
  isDescTypingComplete,
}: any) => {
  return (
    <div className="text-center flex flex-col space-y-4 mb-12">
      <motion.div
        className="mx-auto bg-white p-4 rounded-full shadow-sm mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-full p-3">
          <FlagIcon className="fill-black" />
        </div>
      </motion.div>
      <h1 className="font-bold text-3xl text-gray-800">
        {headerTypedText}
        <span
          className={
            isHeaderTypingComplete ? "hidden" : "inline-block animate-pulse"
          }
        >
          |
        </span>
      </h1>

      <p className="text-gray-500 max-w-xl mx-auto">
        {descTypedText}
        <span
          className={
            isDescTypingComplete ? "hidden" : "inline-block animate-pulse"
          }
        >
          |
        </span>
      </p>
    </div>
  );
};

export default ChatHeading;
