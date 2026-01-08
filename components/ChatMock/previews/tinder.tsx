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

export function TinderPreview({ messages, receiver, settings, typingText }: PreviewProps) {
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
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-gray-900" : "bg-white"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center gap-3 px-4 py-3 border-b ${settings.darkMode ? "border-gray-700" : "border-gray-100"}`}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={receiver.avatar || undefined} />
            <AvatarFallback className="bg-gradient-to-r from-[#FD5564] to-[#FF7854] text-white">
              {receiver.name ? getInitials(receiver.name) : <User className="h-5 w-5" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className={`font-semibold ${settings.darkMode ? "text-white" : "text-black"}`}>
              {receiver.name || "User"}
            </h3>
            <p className={`text-sm ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}>Matched on Tinder</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-3 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  {!message.isSender && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src={message.sender.avatar || undefined} />
                      <AvatarFallback className={`text-xs ${settings.darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                        {message.sender.name ? getInitials(message.sender.name) : <User className="h-3 w-3" />}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-3xl ${
                      message.isSender
                        ? "bg-gradient-to-r from-[#FD5564] to-[#FF7854] text-white"
                        : settings.darkMode
                          ? "bg-gray-700 text-white"
                          : "bg-[#f0f0f0] text-black"
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
        <div className="shrink-0 p-4">
          <div className="flex items-center gap-2">
            <div className={`flex-1 rounded-full px-4 py-3 ${settings.darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
              <span
                className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                {typingText || "Type a message"}
              </span>
            </div>
            <button className="h-11 w-11 rounded-full bg-gradient-to-r from-[#FD5564] to-[#FF7854] flex items-center justify-center">
              <Send className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
