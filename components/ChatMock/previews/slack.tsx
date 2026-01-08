import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { Hash, ChevronDown, Plus, Smile, AtSign, Paperclip, Video, Mic, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function SlackPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-[#1a1d21]" : "bg-white"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center gap-2 px-4 py-2 border-b ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <Hash className={`h-4 w-4 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
          <span className={`font-bold ${settings.darkMode ? "text-white" : "text-black"}`}>
            {receiver.name || "channel"}
          </span>
          <ChevronDown className={`h-4 w-4 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-4 py-4">
              {messages.map((message) => (
                <div key={message.id} className="flex gap-2">
                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarImage src={message.sender.avatar || undefined} />
                    <AvatarFallback
                      className={`text-xs ${settings.darkMode ? "bg-[#4A154B]" : "bg-[#4A154B]"} text-white`}
                    >
                      {message.sender.name ? getInitials(message.sender.name) : <User className="h-3 w-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-bold ${settings.darkMode ? "text-white" : "text-black"}`}>
                        {message.sender.name || "User"}
                      </span>
                      <span className={`text-xs ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className={`whitespace-pre-wrap ${settings.darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Start typing to see messages...
            </p>
          )}
        </div>
      </div>

      {settings.showFooter && (
        <div className="shrink-0 p-4">
          <div
            className={`rounded-lg border ${settings.darkMode ? "border-gray-600 bg-[#222529]" : "border-gray-300 bg-white"}`}
          >
            <div className="flex items-center gap-1 px-3 py-2">
              <Plus className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <div className="flex-1">
                <span
                  className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-500" : "text-gray-400"}`}
                >
                  {typingText || `Message ${receiver.name || "channel"}`}
                </span>
              </div>
              <Smile className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <AtSign className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <Paperclip className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <Video className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
              <Mic className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
