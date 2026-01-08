import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { Phone, Video, MoreVertical, Plus, Smile, Mic, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function SignalPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-[#121212]" : "bg-[#f6f6f6]"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-3 ${settings.darkMode ? "bg-[#1b1b1b]" : "bg-white"} border-b ${settings.darkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#2c6bed] text-white">
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <h3 className={`font-semibold ${settings.darkMode ? "text-white" : "text-black"}`}>
              {receiver.name || "User"}
            </h3>
          </div>
          <div className={`flex items-center gap-5 ${settings.darkMode ? "text-gray-400" : "text-gray-600"}`}>
            <Video className="h-5 w-5" />
            <Phone className="h-5 w-5" />
            <MoreVertical className="h-5 w-5" />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-2 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-2xl ${
                      message.isSender
                        ? "bg-[#2c6bed] text-white"
                        : settings.darkMode
                          ? "bg-[#303030] text-white"
                          : "bg-white text-black"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-[10px] text-right mt-1 ${message.isSender ? "text-white/70" : settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {formatTime(message.timestamp)}
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
        <div className={`shrink-0 p-3 ${settings.darkMode ? "bg-[#1b1b1b]" : "bg-white"}`}>
          <div className="flex items-center gap-2">
            <Plus className={`h-6 w-6 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <div className={`flex-1 rounded-full px-4 py-2 ${settings.darkMode ? "bg-[#303030]" : "bg-[#f0f0f0]"}`}>
              <span
                className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {typingText || "Signal message"}
              </span>
            </div>
            <Smile className={`h-6 w-6 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <Mic className="h-6 w-6 text-[#2c6bed]" />
          </div>
        </div>
      )}
    </div>
  )
}
