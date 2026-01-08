import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { Phone, Video, Info, Plus, ImageIcon, Smile, ThumbsUp, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function MessengerPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-[#242526]" : "bg-white"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-2 border-b ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className={settings.darkMode ? "bg-[#0084FF]" : "bg-[#0084FF]"}>
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4 text-white" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className={`font-semibold ${settings.darkMode ? "text-white" : "text-black"}`}>
                {receiver.name || "User"}
              </h3>
              <p className={`text-xs ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}>Active now</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[#0084FF]">
            <Phone className="h-5 w-5" />
            <Video className="h-5 w-5" />
            <Info className="h-5 w-5" />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-2 py-4">
              {messages.map((message, index) => {
                const isLastInGroup =
                  index === messages.length - 1 || messages[index + 1]?.isSender !== message.isSender
                return (
                  <div
                    key={message.id}
                    className={`flex ${message.isSender ? "justify-end" : "justify-start"} items-end gap-2`}
                  >
                    {!message.isSender && isLastInGroup && (
                      <Avatar className="h-7 w-7 flex-shrink-0">
                        <AvatarImage src={message.sender.avatar || undefined} />
                        <AvatarFallback className={`text-xs ${settings.darkMode ? "bg-gray-600" : "bg-gray-200"}`}>
                          {message.sender.name ? getInitials(message.sender.name) : <User className="h-3 w-3" />}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    {!message.isSender && !isLastInGroup && <div className="w-7" />}
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-2xl ${
                        message.isSender
                          ? "bg-[#0084FF] text-white"
                          : settings.darkMode
                            ? "bg-[#3e4042] text-white"
                            : "bg-[#e4e6eb] text-black"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className={`text-sm ${settings.darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Start typing to see messages...
            </p>
          )}
        </div>
      </div>

      {settings.showFooter && (
        <div className={`shrink-0 p-3 border-t ${settings.darkMode ? "border-gray-700" : "border-gray-200"}`}>
          <div className="flex items-center gap-3">
            <Plus className="h-6 w-6 text-[#0084FF]" />
            <ImageIcon className="h-6 w-6 text-[#0084FF]" />
            <div className={`flex-1 rounded-full px-4 py-2 ${settings.darkMode ? "bg-[#3a3b3c]" : "bg-[#f0f2f5]"}`}>
              <span
                className={`${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {typingText || "Aa"}
              </span>
            </div>
            <Smile className="h-6 w-6 text-[#0084FF]" />
            <ThumbsUp className="h-6 w-6 text-[#0084FF]" />
          </div>
        </div>
      )}
    </div>
  )
}
