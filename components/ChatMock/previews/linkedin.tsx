import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, Person, Settings } from "../types";
import {
  ChevronLeft,
  MoreHorizontal,
  Star,
  Paperclip,
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

export function LinkedInPreview({
  messages,
  receiver,
  settings,
  typingText,
}: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const hasMessages = messages.length > 0;

  return (
    <div
      className={`flex h-full flex-col ${
        settings.darkMode ? "bg-[#1d2226]" : "bg-white"
      }`}
    >
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-4 py-3 ${
            settings.darkMode
              ? "border-b border-gray-700"
              : "border-b border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <ChevronLeft
              className={`h-5 w-5 ${
                settings.darkMode ? "text-white" : "text-gray-600"
              }`}
            />
            <div>
              <h3
                className={`font-semibold text-base ${
                  settings.darkMode ? "text-white" : "text-black"
                }`}
              >
                {receiver.name || "User"}
              </h3>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p
                  className={`text-xs ${
                    settings.darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Active now
                </p>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center gap-4 ${
              settings.darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <MoreHorizontal className="h-5 w-5" />
            <Star className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Profile card at top like LinkedIn */}
      {hasMessages && (
        <div
          className={`px-4 py-6 ${
            settings.darkMode
              ? "border-b border-gray-700"
              : "border-b border-gray-200"
          }`}
        >
          <div className="flex flex-col items-start">
            <div className="relative mb-3">
              <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                <AvatarImage src={receiver.avatar || undefined} />
                <AvatarFallback className="bg-[#0A66C2] text-white text-xl font-semibold">
                  {receiver.name ? (
                    getInitials(receiver.name)
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <div className="flex items-center gap-1">
              <h4
                className={`font-semibold text-lg ${
                  settings.darkMode ? "text-white" : "text-black"
                }`}
              >
                {receiver.name || "User"}
              </h4>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span
                className={`text-sm ${
                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                · 1st
              </span>
            </div>
            <p
              className={`text-sm mt-1 ${
                settings.darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Professional at Company
            </p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto">
        <div
          className={`flex h-full flex-col ${
            hasMessages ? "justify-start" : "justify-center items-center"
          }`}
        >
          {hasMessages ? (
            <div className="py-3">
              {messages.map((message) => (
                <div key={message.id} className="px-4 py-2">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={message.sender.avatar || undefined} />
                      <AvatarFallback className="bg-[#0A66C2] text-white text-xs">
                        {message.sender.name ? (
                          getInitials(message.sender.name)
                        ) : (
                          <User className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold text-sm ${
                            settings.darkMode ? "text-white" : "text-black"
                          }`}
                        >
                          {message.sender.name || "User"}
                        </span>
                        <svg
                          className="h-3.5 w-3.5"
                          viewBox="0 0 24 24"
                          fill="#0A66C2"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span
                          className={`text-xs ${
                            settings.darkMode
                              ? "text-gray-400"
                              : "text-gray-500"
                          }`}
                        >
                          · {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p
                        className={`whitespace-pre-wrap mt-1 text-sm ${
                          settings.darkMode ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {message.content}
                      </p>
                      {/* Link preview */}
                      {message.media?.type === "link" && (
                        <div
                          className={`mt-2 rounded-lg border overflow-hidden ${
                            settings.darkMode
                              ? "border-gray-600 bg-gray-800"
                              : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <a href={message.media.url} className="block p-3">
                            <p
                              className={`text-xs ${
                                settings.darkMode
                                  ? "text-blue-400"
                                  : "text-blue-600"
                              }`}
                            >
                              {message.media.url}
                            </p>
                            <p
                              className={`font-semibold text-sm mt-1 ${
                                settings.darkMode ? "text-white" : "text-black"
                              }`}
                            >
                              {message.media.title}
                            </p>
                            <p
                              className={`text-xs ${
                                settings.darkMode
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.media.domain}
                            </p>
                            {message.media.description && (
                              <p
                                className={`text-xs mt-1 ${
                                  settings.darkMode
                                    ? "text-gray-300"
                                    : "text-gray-600"
                                }`}
                              >
                                {message.media.description}
                              </p>
                            )}
                          </a>
                        </div>
                      )}
                      {/* Image */}
                      {message.media?.type === "image" && (
                        <div className="mt-2 rounded-lg overflow-hidden">
                          <img
                            src={message.media.url || "/placeholder.svg"}
                            alt=""
                            className="max-w-full rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-sm ${
                settings.darkMode ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Start typing to see messages...
            </p>
          )}
        </div>
      </div>

      {settings.showFooter && (
        <div
          className={`shrink-0 px-4 py-3 ${
            settings.darkMode
              ? "border-t border-gray-700"
              : "border-t border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Paperclip
              className={`h-5 w-5 ${
                settings.darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div
              className={`flex-1 rounded-full px-4 py-2.5 ${
                settings.darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <span
                className={`text-sm ${
                  typingText
                    ? settings.darkMode
                      ? "text-white"
                      : "text-black"
                    : settings.darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {typingText || "Write a message..."}
              </span>
            </div>
            <Mic
              className={`h-5 w-5 ${
                settings.darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
