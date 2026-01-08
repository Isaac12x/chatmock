import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Message, Person, Settings } from "../types"
import { Phone, MoreVertical, Smile, Paperclip, Mic, User } from "lucide-react"
import { getInitials } from "../types"

interface PreviewProps {
  messages: Message[]
  sender: Person
  receiver: Person
  settings: Settings
  typingText: string
}

export function TelegramPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const hasMessages = messages.length > 0

  return (
    <div className={`flex h-full flex-col ${settings.darkMode ? "bg-[#17212b]" : "bg-[#ffffff]"}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-2.5 shadow-sm ${settings.darkMode ? "bg-[#1f2937]" : "bg-[#517da2]"}`}
        >
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#5288c1] text-white text-sm font-medium">
                {receiver.name ? getInitials(receiver.name) : <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-white text-[15px]">{receiver.name || "User"}</h3>
              <p className="text-xs text-white/70">online</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-white">
            <Phone className="h-5 w-5" />
            <MoreVertical className="h-5 w-5" />
          </div>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto px-3"
        style={{
          backgroundImage: settings.darkMode
            ? "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23182533'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='%231a2732' opacity='.4'/%3E%3C/svg%3E\")"
            : "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='%23ffffff'/%3E%3Cpath d='M30 15l15 15-15 15-15-15z' fill='%23d4e5f1' opacity='.3'/%3E%3C/svg%3E\")",
        }}
      >
        <div className={`flex h-full flex-col ${hasMessages ? "justify-end" : "justify-center items-center"}`}>
          {hasMessages ? (
            <div className="space-y-1.5 py-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl shadow-sm ${
                      message.isSender
                        ? settings.darkMode
                          ? "bg-[#2b5278] text-white"
                          : "bg-[#EFFDDE] text-black"
                        : settings.darkMode
                          ? "bg-[#182533] text-white"
                          : "bg-white text-black shadow"
                    }`}
                  >
                    <p className="text-[14px] whitespace-pre-wrap">{message.content}</p>
                    <p
                      className={`text-[11px] text-right mt-0.5 ${settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
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
        <div className={`shrink-0 px-2 py-2 ${settings.darkMode ? "bg-[#17212b]" : "bg-[#f4f4f5]"}`}>
          <div className="flex items-center gap-2">
            <Smile className={`h-6 w-6 ${settings.darkMode ? "text-[#8696a0]" : "text-[#707579]"}`} />
            <div className={`flex-1 rounded-lg px-4 py-2 ${settings.darkMode ? "bg-[#242f3d]" : "bg-white"}`}>
              <span
                className={`text-sm ${typingText ? (settings.darkMode ? "text-white" : "text-black") : settings.darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                {typingText || "Message"}
              </span>
            </div>
            <Paperclip className={`h-6 w-6 ${settings.darkMode ? "text-[#8696a0]" : "text-[#707579]"}`} />
            <Mic className={`h-6 w-6 ${settings.darkMode ? "text-[#8696a0]" : "text-[#707579]"}`} />
          </div>
        </div>
      )}
    </div>
  )
}
