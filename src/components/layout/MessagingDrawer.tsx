"use client";

import { useState } from "react";

const MessagingDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Messaging Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Drawer */}
      <div
        className={`fixed bottom-0 right-0 w-96 h-[500px] bg-white shadow-xl rounded-tl-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-semibold">Messages</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Chat List */}
          <div className="flex-grow overflow-y-auto p-4">
            <p className="text-gray-500 text-center">
              Your conversations will appear here
            </p>
          </div>

          {/* AI Assistant Note */}
          <div className="p-3 bg-blue-50 border-t">
            <p className="text-sm text-blue-600">
              AI assistant is available to help with suggestions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagingDrawer;
