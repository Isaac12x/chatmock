import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { MoreHorizontal, Plus, Smile, Send, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function TikTokPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-black" : "bg-white"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-3 border-b ${settings.darkMode ? "border-gray-800" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#FE2C55] text-white">
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <h3 className={`font-semibold ${settings.darkMode ? "text-white" : "text-black"}`}>
              {receiver.name || "User"}
            </h3>
          </div>
          <MoreHorizontal className={`h-5 w-5 ${settings.darkMode ? "text-white" : "text-black"}`} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-2 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      message.isSender
                        ? "bg-[#FE2C55] text-white"
                        : settings.darkMode
                          ? "bg-[#2f2f2f] text-white"
                          : "bg-[#f1f1f2] text-black"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
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
        <div className={`shrink-0 p-4 border-t ${settings.darkMode ? "border-gray-800" : "border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <Plus className={`h-6 w-6 ${settings.darkMode ? "text-white" : "text-black"}`} />
            <div className={`flex-1 rounded-full px-4 py-2 ${settings.darkMode ? "bg-[#2f2f2f]" : "bg-[#f1f1f2]"}`}>
              <span
                className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {typingText || "Send a message..."}
              </span>
            </div>
            <Smile className={`h-6 w-6 ${settings.darkMode ? "text-white" : "text-black"}`} />
            <Send className="h-6 w-6 text-[#FE2C55]" />
          </div>
        </div>
      )}
    </div>
  )
}
