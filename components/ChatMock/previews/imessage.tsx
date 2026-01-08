import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type Message, type Person, type Settings, getInitials } from "../types"
import { User } from "lucide-react"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function IMessagePreview({ messages, receiver, settings, typingText }: PreviewProps) {
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
          className={`shrink-0 flex flex-col items-center py-3 px-4 ${settings.darkMode ? "bg-[#1c1c1e]" : "bg-[#f6f6f6]"}`}
        >
          <Avatar className="h-14 w-14 mb-1.5">
            <AvatarImage src={receiver.avatar || undefined} />
            <AvatarFallback
              className={`text-lg ${settings.darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              {receiver.name ? getInitials(receiver.name) : <User className="h-6 w-6" />}
            </AvatarFallback>
          </Avatar>
          <h3 className={`font-semibold text-base ${settings.darkMode ? "text-white" : "text-black"}`}>
            {receiver.name || "User"}
          </h3>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div className={`flex h-full flex-col px-4 ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-2 py-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      message.isSender
                        ? "bg-[#34C759] text-white rounded-br-sm"
                        : settings.darkMode
                          ? "bg-[#3a3a3c] text-white rounded-bl-sm"
                          : "bg-[#e9e9eb] text-black rounded-bl-sm"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {lastTime && (
                <p className={`text-center text-xs mt-2 ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  iMessage • {lastTime}
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
        <div className={`shrink-0 px-3 py-2 ${settings.darkMode ? "bg-[#1c1c1e]" : "bg-white"}`}>
          <div
            className={`flex items-center rounded-3xl px-4 py-2.5 ${settings.darkMode ? "bg-[#3a3a3c] border border-[#48484a]" : "bg-[#f2f2f7] border border-[#c6c6c8]"}`}
          >
            <span
              className={`flex-1 text-sm ${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              {typingText || "iMessage"}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
