import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

type MessageType = {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  icon?: string;
  status?: "normal" | "warning" | "danger" | "success";
};

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "bot";

  const getStatusColor = () => {
    switch (message.status) {
      case "warning":
        return "bg-amber-500/10 border-amber-500/20 text-amber-200";
      case "danger":
        return "bg-red-500/10 border-red-500/20 text-red-200";
      case "success":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-200";
      default:
        return isBot
          ? "bg-gray-800/50 border-gray-700"
          : "bg-cyan-500/10 border-cyan-500/20 text-cyan-50";
    }
  };

  return (
    <div className={cn("flex gap-3", isBot ? "" : "justify-end")}>
      {isBot && (
        <Avatar className="h-8 w-8 border border-gray-700">
          <AvatarFallback className="bg-cyan-500/20 text-cyan-500">
            <Shield className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn("max-w-[80%] rounded-lg border p-4", getStatusColor())}
      >
        {message.icon && <div className="text-lg mb-2">{message.icon}</div>}
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
        <div className="mt-2 text-xs opacity-60">
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      {!isBot && (
        <Avatar className="h-8 w-8 border border-gray-700">
          <AvatarFallback className="bg-cyan-500/20 text-cyan-500">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
