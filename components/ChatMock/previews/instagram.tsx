import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { Send, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function InstagramPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const lastTime = messages.length > 0 ? formatTime(messages[messages.length - 1].timestamp) : ""
  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-black" : "bg-white"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-3 ${settings.darkMode ? "border-b border-[#262626]" : "border-b border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-1 ring-pink-500">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback
                className={`${settings.darkMode ? "bg-gradient-to-br from-purple-600 to-pink-500" : "bg-gradient-to-br from-purple-600 to-pink-500"} text-white text-sm font-medium`}
              >
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-semibold text-sm ${settings.darkMode ? "text-white" : "text-black"}`}>
                {receiver.name || "User"}
              </h3>
              <p className={`text-xs ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}>Active now</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-2 py-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  {!message.isSender && (
                    <Avatar className="h-7 w-7 mr-2 flex-shrink-0">
                      <AvatarImage src={message.sender.avatar || undefined} />
                      <AvatarFallback className={`text-xs ${settings.darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                        {message.sender.name ? getInitials(message.sender.name) : <User className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-3xl ${
                      message.isSender
                        ? "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white"
                        : settings.darkMode
                          ? "bg-gray-800 text-white"
                          : "bg-[#efefef] text-black"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {lastTime && (
                <p className={`text-center text-xs ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  {lastTime}
                </p>
              )}
            </div>
          ) : (
            <p className={`text-sm ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Start typing to see messages...
            </p>
          )}
        </div>
      </div>

      {settings.showFooter && (
        <div
          className={`shrink-0 px-4 py-2 ${settings.darkMode ? "border-t border-[#262626]" : "border-t border-gray-200"}`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`flex-1 rounded-full px-4 py-2.5 border ${settings.darkMode ? "border-[#363636] bg-transparent" : "border-gray-300 bg-transparent"}`}
            >
              <span
                className={`text-sm ${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                {typingText || "Message..."}
              </span>
            </div>
            <button className="h-9 w-9 rounded-full bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] flex items-center justify-center">
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
