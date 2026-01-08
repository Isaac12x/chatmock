import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, Person, Settings } from "../types";
import {
  ChevronLeft,
  Video,
  Phone,
  Smile,
  Plus,
  Camera,
  Mic,
  Check,
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

export function WhatsAppPreview({
  messages,
  receiver,
  settings,
  typingText,
}: PreviewProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const hasMessages = messages.length > 0;

  const bgPattern = settings.darkMode ? "bg-[#0b141a]" : "bg-[#efeae2]";

  return (
    <div className={`flex h-full flex-col ${bgPattern}`}>
      {settings.showHeader && (
        <div
          className={`shrink-0 flex items-center gap-2 px-2 py-2 ${
            settings.darkMode ? "bg-[#202c33]" : "bg-[#008069]"
          }`}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarImage src={receiver.avatar || undefined} />
              <AvatarFallback className="bg-[#6c9a8b] text-white text-sm">
                {receiver.name ? (
                  getInitials(receiver.name)
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-white text-base">
              {receiver.name || "User"}
            </h3>
          </div>
          <div className="flex items-center gap-5 text-white">
            <Video className="h-5 w-5" />
            <Phone className="h-5 w-5" />
          </div>
        </div>
      )}

      <div
        className="flex-1 overflow-y-auto"
        style={{
          backgroundImage: settings.darkMode
            ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23172520' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23d4cfc4' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div
          className={`flex h-full flex-col ${
            hasMessages ? "justify-end" : "justify-center items-center"
          }`}
        >
          {hasMessages ? (
            <div className="space-y-1 px-3 py-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isSender ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-2.5 py-1.5 rounded-lg shadow-sm relative ${
                      message.isSender
                        ? settings.darkMode
                          ? "bg-[#005c4b]"
                          : "bg-[#d9fdd3]"
                        : settings.darkMode
                        ? "bg-[#202c33]"
                        : "bg-white"
                    } ${
                      message.isSender ? "rounded-tr-none" : "rounded-tl-none"
                    }`}
                  >
                    {/* Image in WhatsApp */}
                    {message.media?.type === "image" && (
                      <div className="mb-1 -mx-1 -mt-0.5 rounded-t-lg overflow-hidden">
                        <img
                          src={message.media.url || "/placeholder.svg"}
                          alt=""
                          className="max-w-full"
                        />
                      </div>
                    )}
                    {message.content && (
                      <p
                        className={`text-[15px] whitespace-pre-wrap ${
                          settings.darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {message.content}
                      </p>
                    )}
                    <div className="flex items-center justify-end gap-1 -mb-0.5">
                      <span
                        className={`text-[11px] ${
                          settings.darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </span>
                      {message.isSender && (
                        <div className="flex -space-x-1">
                          <Check
                            className={`h-3.5 w-3.5 ${
                              settings.darkMode
                                ? "text-[#53bdeb]"
                                : "text-[#53bdeb]"
                            }`}
                          />
                          <Check
                            className={`h-3.5 w-3.5 ${
                              settings.darkMode
                                ? "text-[#53bdeb]"
                                : "text-[#53bdeb]"
                            }`}
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
                settings.darkMode ? "text-gray-500" : "text-gray-600"
              }`}
            >
              Start typing to see messages...
            </p>
          )}
        </div>
      </div>

      {settings.showFooter && (
        <div
          className={`shrink-0 px-2 py-1.5 ${
            settings.darkMode ? "bg-[#202c33]" : "bg-[#f0f2f5]"
          }`}
        >
          <div className="flex items-center gap-2">
            <Plus
              className={`h-6 w-6 ${
                settings.darkMode ? "text-[#8696a0]" : "text-[#54656f]"
              }`}
            />
            <div
              className={`flex-1 flex items-center gap-3 rounded-3xl px-4 py-2 ${
                settings.darkMode ? "bg-[#2a3942]" : "bg-white"
              }`}
            >
              <span
                className={`flex-1 text-[15px] ${
                  typingText
                    ? settings.darkMode
                      ? "text-white"
                      : "text-black"
                    : settings.darkMode
                    ? "text-[#8696a0]"
                    : "text-[#667781]"
                }`}
              >
                {typingText || "Message"}
              </span>
              <Smile
                className={`h-6 w-6 ${
                  settings.darkMode ? "text-[#8696a0]" : "text-[#54656f]"
                }`}
              />
              <Camera
                className={`h-6 w-6 ${
                  settings.darkMode ? "text-[#8696a0]" : "text-[#54656f]"
                }`}
              />
            </div>
            <div className="h-10 w-10 rounded-full bg-[#00a884] flex items-center justify-center">
              <Mic className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
