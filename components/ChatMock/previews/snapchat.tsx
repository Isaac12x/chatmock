import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, Person, Settings } from "../types";
import {
  ChevronLeft,
  Phone,
  Video,
  Camera,
  Mic,
  Smile,
  Plus,
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

export function SnapchatPreview({
  messages,
  receiver,
  settings,
  typingText,
}: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const lastTime =
    messages.length > 0
      ? formatTime(messages[messages.length - 1].timestamp)
      : "";
  const hasMessages = messages.length > 0;

  return (
    <div
      className={`flex h-full flex-col ${
        settings.darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center justify-between px-3 py-2 ${
            settings.darkMode ? "bg-black" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <ChevronLeft
              className={`h-6 w-6 ${
                settings.darkMode ? "text-white" : "text-gray-800"
              }`}
            />
            <Avatar className="h-10 w-10 bg-[#FFFC00]">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#FFFC00] text-black font-bold text-sm">
                {receiver.name ? (
                  getInitials(receiver.name)
                ) : (
                  <User className="h-5 w-5" />
                )}
              </AvatarFallback>
            </Avatar>
            <span
              className={`font-bold text-base ${
                settings.darkMode ? "text-white" : "text-black"
              }`}
            >
              {receiver.name || "User"}
            </span>
          </div>
          <div
            className={`flex items-center gap-4 ${
              settings.darkMode ? "text-white" : "text-black"
            }`}
          >
            <Phone className="h-5 w-5" />
            <Video className="h-5 w-5" />
          </div>
        </div>
      )}

      {/* Notification banner like Snapchat */}
      {hasMessages && !settings.darkMode && (
        <div className="px-4 py-2 bg-white border-b border-gray-100">
          <p className="text-center text-sm">
            <span className="text-gray-400">🔔</span>
            <span className="text-gray-500">
              {" "}
              Don't miss Chats from {receiver.name || "User"}!{" "}
            </span>
            <span className="text-[#0FADFF] font-medium">
              Enable notifications
            </span>
          </p>
        </div>
      )}

      {/* Date indicator */}
      {hasMessages && (
        <div className="py-2">
          <p
            className={`text-center text-xs font-medium ${
              settings.darkMode ? "text-gray-500" : "text-gray-400"
            }`}
          >
            TODAY
          </p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4">
        <div
          className={`flex h-full flex-col ${
            hasMessages ? "justify-end" : "justify-center items-center"
          }`}
        >
          {hasMessages ? (
            <div className="space-y-2 py-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-3xl ${
                      message.isSender
                        ? "bg-[#0FADFF] text-white"
                        : settings.darkMode
                        ? "bg-[#212121] text-white"
                        : "bg-[#F1F1F1] text-black"
                    }`}
                  >
                    <p className="text-[15px] whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {lastTime && (
                <p
                  className={`text-center text-xs ${
                    settings.darkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  {lastTime}
                </p>
              )}
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
          className={`shrink-0 px-3 py-3 ${
            settings.darkMode ? "bg-black" : "bg-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                settings.darkMode ? "bg-[#212121]" : "bg-[#f0f0f0]"
              }`}
            >
              <Camera
                className={`h-5 w-5 ${
                  settings.darkMode ? "text-white" : "text-black"
                }`}
              />
            </div>
            <div
              className={`flex-1 flex items-center rounded-full px-4 py-2.5 ${
                settings.darkMode ? "bg-[#212121]" : "bg-[#f0f0f0]"
              }`}
            >
              <span
                className={`flex-1 text-[15px] ${
                  typingText
                    ? settings.darkMode
                      ? "text-white"
                      : "text-black"
                    : settings.darkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {typingText || "Send chat"}
              </span>
              <Mic
                className={`h-5 w-5 ml-2 ${
                  settings.darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <Smile
              className={`h-6 w-6 ${
                settings.darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <div
              className={`h-6 w-6 rounded ${
                settings.darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
            />
            <Plus
              className={`h-6 w-6 ${
                settings.darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
