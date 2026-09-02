import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Message, Person, Settings } from "../types";
import { Camera, Check, ChevronLeft, Mic, Phone, Plus, Smile, User, Video } from "lucide-react";
import { getInitials } from "../types";

interface PreviewProps {
  messages: Message[];
  sender: Person;
  receiver: Person;
  settings: Settings;
  typingText: string;
}

const WHATSAPP_WALLPAPER =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/unnamed-M7kRtjcW23fbwedTBM6ZRB9lLI04ZC.png";

export function WhatsAppPreview({ messages, receiver, settings, typingText }: PreviewProps) {
  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });

  const hasMessages = messages.length > 0;
  const surface = settings.darkMode ? "bg-[#111b21]" : "bg-[#efeae2]";
  const chrome = settings.darkMode ? "bg-[#202c33]" : "bg-[#008069]";

  return (
    <div className={`flex h-full min-h-0 flex-col ${surface}`}>
      {settings.showHeader && (
        <header className={`flex shrink-0 items-center gap-2 px-2 py-2.5 ${chrome}`}>
          <ChevronLeft className="size-6 text-white" aria-hidden="true" />
          <Avatar className="size-9">
            <AvatarImage src={receiver.avatar || undefined} alt={receiver.name || "Chat contact"} />
            <AvatarFallback className="bg-[#6c9a8b] text-sm text-white">
              {receiver.name ? getInitials(receiver.name) : <User className="size-4" aria-hidden="true" />}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-medium text-white">{receiver.name || "User"}</h3>
          </div>
          <div className="flex items-center gap-5 text-white" aria-hidden="true">
            <Video className="size-5" />
            <Phone className="size-5" />
          </div>
        </header>
      )}

      <main
        className="relative min-h-0 flex-1 overflow-y-auto bg-cover bg-center"
        style={{ backgroundImage: `url(${WHATSAPP_WALLPAPER})` }}
      >
        <div className={`absolute inset-0 ${settings.darkMode ? "bg-[#0b141a]/80" : "bg-[#efeae2]/35"}`} />
        <div className={`relative flex min-h-full flex-col ${hasMessages ? "justify-end" : "items-center justify-center"}`}>
          {hasMessages ? (
            <div className="flex flex-col gap-1.5 px-3 py-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex w-full ${message.isSender ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`relative max-w-[82%] rounded-lg px-2.5 py-1.5 shadow-sm ${
                      message.isSender
                        ? settings.darkMode ? "bg-[#005c4b]" : "bg-[#d9fdd3]"
                        : settings.darkMode ? "bg-[#202c33]" : "bg-white"
                    } ${message.isSender ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                  >
                    {message.media?.type === "image" && (
                      <div className="mb-1 -mx-1 -mt-1 overflow-hidden rounded-md">
                        <img src={message.media.url || "/placeholder.svg"} alt="Message attachment" className="block max-h-64 max-w-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-wrap items-end gap-x-2 gap-y-0">
                      {message.content && (
                        <p className={`min-w-0 whitespace-pre-wrap break-words text-[15px] leading-[1.35] ${settings.darkMode ? "text-white" : "text-[#111b21]"}`}>
                          {message.content}
                        </p>
                      )}
                      <span className="ml-auto inline-flex shrink-0 items-center gap-0.5 pb-px leading-none">
                        <span className={`text-[10px] ${settings.darkMode ? "text-[#aebac1]" : "text-[#667781]"}`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {message.isSender && (
                          <span className="relative inline-flex w-4 items-center text-[#53bdeb]" aria-label="Read">
                            <Check className="absolute left-0 size-3.5" strokeWidth={2.5} />
                            <Check className="absolute left-1.5 size-3.5" strokeWidth={2.5} />
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-sm ${settings.darkMode ? "text-[#8696a0]" : "text-[#667781]"}`}>Start typing to see messages...</p>
          )}
        </div>
      </main>

      {settings.showFooter && (
        <footer className={`shrink-0 px-2 py-2 ${settings.darkMode ? "bg-[#202c33]" : "bg-[#f0f2f5]"}`}>
          <div className="flex items-center gap-2">
            <Plus className={`size-7 shrink-0 ${settings.darkMode ? "text-[#8696a0]" : "text-[#54656f]"}`} aria-hidden="true" />
            <div className={`flex min-w-0 flex-1 items-center gap-3 rounded-3xl px-4 py-2 ${settings.darkMode ? "bg-[#2a3942]" : "bg-white"}`}>
              <span className={`min-w-0 flex-1 truncate text-[15px] ${typingText ? settings.darkMode ? "text-white" : "text-black" : settings.darkMode ? "text-[#8696a0]" : "text-[#667781]"}`}>{typingText || "Message"}</span>
              <Smile className={`size-6 shrink-0 ${settings.darkMode ? "text-[#8696a0]" : "text-[#54656f]"}`} aria-hidden="true" />
              <Camera className={`size-6 shrink-0 ${settings.darkMode ? "text-[#8696a0]" : "text-[#54656f]"}`} aria-hidden="true" />
            </div>
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#00a884]">
              <Mic className="size-5 text-white" aria-hidden="true" />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
