import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield } from "lucide-react"

export function ChatTypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8 border border-gray-700">
        <AvatarFallback className="bg-cyan-500/20 text-cyan-500">
          <Shield className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>

      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 max-w-[80%]">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  )
}
