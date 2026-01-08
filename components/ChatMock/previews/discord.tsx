import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, Person, Settings } from "../types";
import {
  ChevronLeft,
  Phone,
  Video,
  Search,
  Plus,
  Gift,
  Smile,
  Mic,
  User,
} from "lucide-react";
import { getInitials } from "../types";

interface PreviewProps {
  messages: Message[];
  sender: Person;
  receiver: Person;
  settings: Settings;
  typingText: string;
}

export function DiscordPreview({
  messages,
  sender,
  receiver,
  settings,
  typingText,
}: PreviewProps) {
  const formatTime = (date: Date) => {
    return (
      date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      ", " +
      date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className={`flex h-full flex-col ${
        settings.darkMode ? "bg-[#313338]" : "bg-white"
      }`}
    >
      {settings.showHeader && (
        <div className="shrink-0 flex items-center justify-between px-3 py-2 bg-[#1e1f22]">
          <div className="flex items-center gap-2">
            <div className="relative">
              <ChevronLeft className="h-5 w-5 text-gray-400" />
              <div className="absolute -bottom-1 -left-1 h-4 w-4 rounded-full bg-[#f23f43] text-[10px] font-bold text-white flex items-center justify-center">
                99
              </div>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#5865F2] text-white text-xs">
                {receiver.name ? (
                  getInitials(receiver.name)
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-white text-sm">
                {receiver.name || "User"}
              </span>
              <ChevronLeft className="h-4 w-4 text-gray-400 rotate-180" />
            </div>
          </div>
          <div className="flex items-center gap-5 text-gray-400">
            <Phone className="h-5 w-5" />
            <Video className="h-5 w-5" />
            <Search className="h-5 w-5" />
          </div>
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto ${
          settings.darkMode ? "bg-[#313338]" : "bg-[#ffffff]"
        }`}
      >
        <div
          className={`flex h-full flex-col ${
            hasMessages ? "justify-end" : "justify-center items-center"
          }`}
        >
          {hasMessages ? (
            <div className="py-2">
              {messages.map((message, index) => {
                // Check if we need a date separator
                const showDateSeparator =
                  index === 0 ||
                  messages[index - 1].timestamp.toDateString() !==
                    message.timestamp.toDateString();

                return (
                  <div key={message.id}>
                    {showDateSeparator && (
                      <div className="flex items-center justify-center py-2">
                        <div
                          className={`h-px flex-1 ${
                            settings.darkMode ? "bg-gray-600" : "bg-gray-200"
                          }`}
                        />
                        <span
                          className={`px-3 text-xs font-medium ${
                            settings.darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          {message.timestamp.toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <div
                          className={`h-px flex-1 ${
                            settings.darkMode ? "bg-gray-600" : "bg-gray-200"
                          }`}
                        />
                      </div>
                    )}
                    <div className="flex gap-3 px-4 py-1 hover:bg-[#2e3035]">
                      <Avatar className="h-10 w-10 flex-shrink-0 mt-0.5">
                        <AvatarImage src={message.sender.avatar || undefined} />
                        <AvatarFallback className="bg-[#5865F2] text-white text-xs">
                          {message.sender.name ? (
                            getInitials(message.sender.name)
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="font-semibold text-white text-sm">
                            {message.sender.name || "User"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                        <p className="text-gray-200 text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        {/* Image in Discord */}
                        {message.media?.type === "image" && (
                          <div className="mt-2 max-w-[400px]">
                            <img
                              src={message.media.url || "/placeholder.svg"}
                              alt=""
                              className="rounded-md max-w-full"
                            />
                          </div>
                        )}
                        {/* Link preview */}
                        {message.media?.type === "link" && (
                          <div className="mt-2 border-l-4 border-[#5865F2] bg-[#2b2d31] rounded p-3 max-w-[400px]">
                            <a
                              href={message.media.url}
                              className="text-[#00a8fc] text-sm hover:underline"
                            >
                              {message.media.title}
                            </a>
                            {message.media.description && (
                              <p className="text-gray-300 text-xs mt-1">
                                {message.media.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Start typing to see messages...
            </p>
          )}
        </div>
      </div>

      {settings.showFooter && (
        <div className="shrink-0 px-4 py-3 bg-[#313338]">
          <div className="flex items-center gap-3 rounded-lg bg-[#383a40] px-4 py-2.5">
            <Plus className="h-5 w-5 text-[#b5bac1]" />
            <div className="h-5 w-px bg-[#4e5058]" />
            <span
              className={`flex-1 text-sm ${
                typingText ? "text-white" : "text-[#6d6f78]"
              }`}
            >
              {typingText || `Message @${receiver.name || "User"}`}
            </span>
            <Gift className="h-5 w-5 text-[#b5bac1]" />
            <Smile className="h-5 w-5 text-[#b5bac1]" />
            <Mic className="h-5 w-5 text-[#b5bac1]" />
          </div>
        </div>
      )}
    </div>
  );
}
