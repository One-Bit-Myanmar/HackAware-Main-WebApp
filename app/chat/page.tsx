"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Send, ImageIcon, LinkIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChatMessage } from "@/components/chat-message";
import { ChatTypingIndicator } from "@/components/chat-typing-indicator";
import axios from "axios";

type MessageType = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  icon?: string;
  status?: "normal" | "warning" | "danger" | "success";
};

export default function ChatPage() {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      role: "bot",
      content:
        "Hello! I'm HackAware, your AI cybersecurity assistant. How can I help protect your digital life today?",
      timestamp: new Date(),
    },
    {
      id: "intro",
      role: "bot",
      content:
        "You can ask me about suspicious links, privacy concerns, security best practices, or how to respond to potential threats.",
      timestamp: new Date(),
      icon: "🛡️",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to UI right away
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure your API key set in .env file

    try {
      const response = await axios.post(
        `${API_URL}/chat/local/`,
        {
          question: input, // Request body
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      let aiText = response.data?.response || "";

      // Remove <think> ... </think>
      aiText = aiText.replace(/<think>[\s\S]*?<\/think>/, "").trim();

      console.log("Trimmed AI Response:", aiText);

      const botMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: aiText || "No response from AI",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error(
        "Error fetching response:",
        error?.response?.data || error.message
      );
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex flex-col">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-cyan-500 mr-2" />
              <span className="font-bold">HackAware Chat</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-4xl flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <ChatTypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-800">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="image">Image</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-0">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask HackAware about cybersecurity..."
                  className="min-h-[60px] bg-gray-800/50 border-gray-700 focus-visible:ring-cyan-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-cyan-500 hover:bg-cyan-600 h-auto"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                  <div className="flex justify-center mb-4">
                    <ImageIcon className="h-10 w-10 text-gray-400" />
                  </div>
                  <p className="text-gray-400 mb-2">
                    Upload or drag and drop an image
                  </p>
                  <p className="text-xs text-gray-500">
                    Supported formats: JPG, PNG, PDF
                  </p>
                </div>
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600">
                  Analyze Image
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="link" className="mt-0">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Enter URL to analyze"
                      className="pl-10 bg-gray-800/50 border-gray-700 focus-visible:ring-cyan-500"
                    />
                  </div>
                  <Button className="bg-cyan-500 hover:bg-cyan-600">
                    Check Link
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  HackAware will analyze the link for potential phishing
                  attempts, malware, and other security threats.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
