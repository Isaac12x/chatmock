import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { MoreHorizontal, ImageIcon, Send, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function RedditPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-[#1a1a1b]" : "bg-white"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-3 border-b ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#FF4500] text-white">
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-medium ${settings.darkMode ? "text-white" : "text-black"}`}>
                u/{receiver.name || "user"}
              </h3>
            </div>
          </div>
          <MoreHorizontal className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-3 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl ${
                      message.isSender
                        ? "bg-[#FF4500] text-white"
                        : settings.darkMode
                          ? "bg-[#272729] text-white"
                          : "bg-[#f6f7f8] text-black"
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
        <div className={`shrink-0 p-4 border-t ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center gap-2">
            <div
              className={`flex-1 rounded-full px-4 py-2.5 border ${settings.darkMode ? "border-gray-600 bg-transparent" : "border-gray-300 bg-white"}`}
            >
              <span
                className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-500" : "text-gray-400"}`}
              >
                {typingText || "Message"}
              </span>
            </div>
            <ImageIcon className={`h-6 w-6 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
            <Send className="h-6 w-6 text-[#FF4500]" />
          </div>
        </div>
      )}
    </div>
  )
}
