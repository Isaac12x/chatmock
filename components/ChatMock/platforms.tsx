import type { PlatformConfig, Platform } from "./types";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {
  DiscordOutlined,
  TiktokOutlined,
  SnapchatOutlined,
} from "@lineiconshq/free-icons";

export const platforms: Record<Platform, PlatformConfig> = {
  discord: {
    name: "Discord",
    icon: (
      <Lineicons icon={DiscordOutlined} className="h-4 w-4" color="#5865F2" />
    ),
    primaryColor: "#5865F2",
    senderBubble: "bg-[#5865F2]",
    receiverBubble: "bg-[#383a40]",
    senderText: "text-white",
    receiverText: "text-white",
    headerSubtitle: "",
  },
  imessage: {
    name: "iMessage",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#34C759">
        <path d="M12 2C6.477 2 2 5.813 2 10.5c0 2.527 1.388 4.79 3.558 6.317-.207 1.477-.86 3.183-1.558 4.183 2.5-.5 4.5-1.5 5.5-2.317.801.137 1.632.317 2.5.317 5.523 0 10-3.813 10-8.5S17.523 2 12 2z" />
      </svg>
    ),
    primaryColor: "#34C759",
    senderBubble: "bg-[#34C759]",
    receiverBubble: "bg-[#e9e9eb]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  instagram: {
    name: "Instagram",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <defs>
          <linearGradient
            id="instagram-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#F77737" />
            <stop offset="50%" stopColor="#E1306C" />
            <stop offset="75%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </linearGradient>
        </defs>
        <path
          fill="url(#instagram-gradient)"
          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
        />
      </svg>
    ),
    primaryColor: "#E1306C",
    senderBubble: "bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737]",
    receiverBubble: "bg-[#efefef]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "Active now",
  },
  messenger: {
    name: "Messenger",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <defs>
          <linearGradient
            id="messenger-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#0099FF" />
            <stop offset="50%" stopColor="#A033FF" />
            <stop offset="100%" stopColor="#FF5280" />
          </linearGradient>
        </defs>
        <path
          fill="url(#messenger-gradient)"
          d="M12 0C5.373 0 0 4.974 0 11.111c0 3.497 1.744 6.615 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z"
        />
      </svg>
    ),
    primaryColor: "#0084FF",
    senderBubble: "bg-[#0084FF]",
    receiverBubble: "bg-[#e4e6eb]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "Active now",
  },
  reddit: {
    name: "Reddit",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#FF4500">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
    primaryColor: "#FF4500",
    senderBubble: "bg-[#FF4500]",
    receiverBubble: "bg-[#edeff1]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  signal: {
    name: "Signal",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#3A76F0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z" />
      </svg>
    ),
    primaryColor: "#3A76F0",
    senderBubble: "bg-[#3A76F0]",
    receiverBubble: "bg-[#f1f1f1]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  slack: {
    name: "Slack",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          fill="#E01E5A"
          d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
        />
        <path
          fill="#36C5F0"
          d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
        />
        <path
          fill="#2EB67D"
          d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
        />
        <path
          fill="#ECB22E"
          d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
        />
      </svg>
    ),
    primaryColor: "#4A154B",
    senderBubble: "bg-[#4A154B]",
    receiverBubble: "bg-[#f8f8f8]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  snapchat: {
    name: "Snapchat",
    icon: (
      <Lineicons icon={SnapchatOutlined} className="h-4 w-4" color="#FFFC00" />
    ),
    primaryColor: "#FFFC00",
    senderBubble: "bg-[#FF4499]",
    receiverBubble: "bg-[#e9e9eb]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  telegram: {
    name: "Telegram",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0088CC">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
    primaryColor: "#0088CC",
    senderBubble: "bg-[#EFFDDE]",
    receiverBubble: "bg-white",
    senderText: "text-black",
    receiverText: "text-black",
    headerSubtitle: "online",
  },
  tiktok: {
    name: "TikTok",
    icon: (
      <Lineicons icon={TiktokOutlined} className="h-4 w-4" color="#000000" />
    ),
    primaryColor: "#000000",
    senderBubble: "bg-[#FE2C55]",
    receiverBubble: "bg-[#f1f1f2]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  tinder: {
    name: "Tinder",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <defs>
          <linearGradient
            id="tinder-gradient"
            x1="0%"
            y1="100%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#FF7854" />
            <stop offset="100%" stopColor="#FD5564" />
          </linearGradient>
        </defs>
        <path
          fill="url(#tinder-gradient)"
          d="M8.5 6.2c-.5-.5-1-.5-1.1-.5-.1 0-.2.1-.2.2 0 .1 0 .1.1.2.7.8 1.3 1.9 1.3 3.5 0 2.1-1.2 3.6-1.2 3.6s-.3-.1-.5-.2c-.2-.1-.3-.3-.4-.5-.2-.4-.3-1-.3-1.7 0-1.3.5-2.3.8-2.9.1-.2 0-.4-.2-.4-.2 0-1.2.5-2.2 1.5-1 1-1.8 2.5-1.8 4.3 0 3.8 3 7.2 7.2 7.2s7.2-3.4 7.2-7.2c0-4.1-2.5-5.8-2.7-6-.2-.1-.4 0-.4.2 0 .1.4 1.4.4 2.9 0 .7-.1 1.3-.3 1.7-.1.2-.2.4-.4.5-.2.1-.5.2-.5.2s-1.2-1.5-1.2-3.6c0-1.6.6-2.7 1.3-3.5.1-.1.1-.1.1-.2 0-.1-.1-.2-.2-.2-.2 0-.6 0-1.1.5-.5.5-1.1 1.3-1.1 2.9 0 1.2.4 2.1.4 2.1s-.5-.1-.8-.5c-.3-.4-.5-1-.5-1.6 0-.6.1-1.2.2-1.8.1-.6.3-1.1.4-1.5.1-.2 0-.4-.2-.4-.2 0-.7.2-1.3.6-.6.4-1.3 1.1-1.7 2.1-.2.5-.4 1.1-.4 1.8 0 .6.1 1.2.4 1.6.2.4.5.5.8.5s.4-2.1.4-2.1c0-1.6-.6-2.4-1.1-2.9z"
        />
      </svg>
    ),
    primaryColor: "#FE3C72",
    senderBubble: "bg-gradient-to-r from-[#FD5564] to-[#FF7854]",
    receiverBubble: "bg-[#f0f0f0]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "Matched on Tinder",
  },
  whatsapp: {
    name: "WhatsApp",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#25D366">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    primaryColor: "#25D366",
    senderBubble: "bg-[#dcf8c6]",
    receiverBubble: "bg-white",
    senderText: "text-black",
    receiverText: "text-black",
    headerSubtitle: "online",
  },
  twitter: {
    name: "X (Twitter)",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#000000">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    primaryColor: "#000000",
    senderBubble: "bg-[#1D9BF0]",
    receiverBubble: "bg-[#eff3f4]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "",
  },
  linkedin: {
    name: "LinkedIn",
    icon: (
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    primaryColor: "#0A66C2",
    senderBubble: "bg-[#0A66C2]",
    receiverBubble: "bg-[#f3f2ef]",
    senderText: "text-white",
    receiverText: "text-black",
    headerSubtitle: "Active now",
  },
};
