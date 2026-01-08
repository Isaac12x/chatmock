import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { Info, ImageIcon, Smile, Send, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function TwitterPreview({ messages, receiver, settings, typingText }: PreviewProps) {
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
              <AvatarFallback className={settings.darkMode ? "bg-gray-700" : "bg-gray-200"}>
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-bold ${settings.darkMode ? "text-white" : "text-black"}`}>
                {receiver.name || "User"}
              </h3>
              <p className="text-sm text-gray-500">@{(receiver.name || "user").toLowerCase().replace(/\s+/g, "")}</p>
            </div>
          </div>
          <Info className={`h-5 w-5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`} />
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-3 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-3xl ${
                      message.isSender
                        ? "bg-[#1D9BF0] text-white rounded-br-sm"
                        : settings.darkMode
                          ? "bg-[#2f3336] text-white rounded-bl-sm"
                          : "bg-[#eff3f4] text-black rounded-bl-sm"
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
          <div className="flex items-center gap-3">
            <ImageIcon className="h-5 w-5 text-[#1D9BF0]" />
            <div
              className={`flex-1 rounded-full px-4 py-2 ${settings.darkMode ? "bg-transparent border border-gray-700" : "bg-[#eff3f4]"}`}
            >
              <span className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : "text-gray-500"}`}>
                {typingText || "Start a new message"}
              </span>
            </div>
            <Smile className="h-5 w-5 text-[#1D9BF0]" />
            <Send className="h-5 w-5 text-[#1D9BF0]" />
          </div>
        </div>
      )}
    </div>
  )
}
