import type React from "react";

export type Platform =
  | "discord"
  | "imessage"
  | "instagram"
  | "messenger"
  | "reddit"
  | "signal"
  | "slack"
  | "snapchat"
  | "linkedin"
  | "telegram"
  | "tiktok"
  | "tinder"
  | "whatsapp"
  | "twitter";

export interface Person {
  name: string;
  avatar: string | null;
}

export interface MessageMedia {
  type: "image" | "link";
  url: string;
  title?: string;
  description?: string;
  domain?: string;
}

export interface Message {
  id: string;
  content: string;
  sender: Person;
  isSender: boolean;
  timestamp: Date;
  media?: MessageMedia;
}

export interface Settings {
  darkMode: boolean;
  showHeader: boolean;
  showFooter: boolean;
}

export interface PlatformConfig {
  name: string;
  icon: React.ReactNode;
  primaryColor: string;
  senderBubble: string;
  receiverBubble: string;
  senderText: string;
  receiverText: string;
  headerSubtitle: string;
}

export function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export interface DeviceSize {
  name: string;
  width: number;
  height: number;
  category: "iphone" | "android" | "tablet" | "custom";
}

export const deviceSizes: DeviceSize[] = [
  // iPhones
  { name: "iPhone 16 Pro Max", width: 440, height: 956, category: "iphone" },
  { name: "iPhone 16 Pro", width: 402, height: 874, category: "iphone" },
  { name: "iPhone 16", width: 393, height: 852, category: "iphone" },
  { name: "iPhone 15 Pro Max", width: 430, height: 932, category: "iphone" },
  { name: "iPhone 15 Pro", width: 393, height: 852, category: "iphone" },
  { name: "iPhone 15", width: 393, height: 852, category: "iphone" },
  { name: "iPhone 14 Pro Max", width: 430, height: 932, category: "iphone" },
  { name: "iPhone 14", width: 390, height: 844, category: "iphone" },
  { name: "iPhone SE", width: 375, height: 667, category: "iphone" },
  // Android
  {
    name: "Samsung Galaxy S24 Ultra",
    width: 412,
    height: 915,
    category: "android",
  },
  { name: "Samsung Galaxy S24", width: 384, height: 854, category: "android" },
  { name: "Google Pixel 8 Pro", width: 412, height: 892, category: "android" },
  { name: "Google Pixel 8", width: 412, height: 892, category: "android" },
  // Tablets
  { name: 'iPad Pro 12.9"', width: 1024, height: 1366, category: "tablet" },
  { name: 'iPad Pro 11"', width: 834, height: 1194, category: "tablet" },
  { name: "iPad Air", width: 820, height: 1180, category: "tablet" },
];
