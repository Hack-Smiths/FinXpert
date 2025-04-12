
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, SendHorizonal, X } from "lucide-react";
import React, { useState } from "react";

interface ChatMessage {
  id: number;
  question: string;
  answer: string;
}

interface AIChatProps {
  sampleQuestions: ChatMessage[];
}

export const AIChat = ({ sampleQuestions }: AIChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newQuestion = {
      id: Date.now(),
      question: inputValue,
      answer: "",
    };

    setMessages([...messages, newQuestion]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing and response
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
      const sampleAnswer = sampleQuestions[randomIndex].answer;
      
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === newQuestion.id ? { ...msg, answer: sampleAnswer } : msg
        )
      );
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full gradient-bg flex items-center justify-center shadow-lg z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 rounded-2xl bg-white shadow-xl border border-gray-200 z-50 overflow-hidden"
          >
            <div className="p-4 border-b gradient-bg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-medium text-white">FinXpert AI Assistant</h3>
              </div>
              <button onClick={toggleChat} className="text-white/80 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="h-96 overflow-y-auto p-4 flex flex-col gap-4">
              <div className="flex items-start gap-2">
                <div className="h-8 w-8 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm">
                  Hello! I'm your FinXpert AI assistant. How can I help you today with your finances?
                </div>
              </div>
              
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <div className="flex items-start gap-2 justify-end">
                    <div className="bg-primary/10 text-primary rounded-2xl rounded-tr-none p-3 text-sm">
                      {message.question}
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <span className="text-primary text-xs font-bold">You</span>
                    </div>
                  </div>
                  
                  {message.answer && (
                    <div className="flex items-start gap-2">
                      <div className="h-8 w-8 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm">
                        {message.answer}
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2">
                  <div className="h-8 w-8 rounded-full gradient-bg flex-shrink-0 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-secondary rounded-2xl rounded-tl-none p-3 text-sm flex items-center gap-1">
                    <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse delay-100"></div>
                    <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse delay-200"></div>
                    <div className="h-2 w-2 bg-primary/50 rounded-full animate-pulse delay-300"></div>
                  </div>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSend} className="border-t p-4 flex gap-2">
              <input
                type="text"
                placeholder="Ask something..."
                className="flex-1 rounded-lg border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                className="p-2 rounded-lg gradient-bg text-white"
              >
                <SendHorizonal className="h-5 w-5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
