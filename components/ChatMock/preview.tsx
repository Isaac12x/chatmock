"use client";

import { forwardRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Settings,
  Download,
  ChevronDown,
  Check,
  Video,
  Square,
  Moon,
  LayoutTemplate,
  PanelBottom,
} from "lucide-react";
import type {
  Platform,
  Message,
  Settings as SettingsType,
  Person,
  DeviceSize,
} from "./types";
import { platforms } from "./platforms";
import { DeviceSelector } from "./device-selector";
import { DiscordPreview } from "./previews/discord";
import { TinderPreview } from "./previews/tinder";
import { InstagramPreview } from "./previews/instagram";
import { IMessagePreview } from "./previews/imessage";
import { WhatsAppPreview } from "./previews/whatsapp";
import { MessengerPreview } from "./previews/messenger";
import { TelegramPreview } from "./previews/telegram";
import { SlackPreview } from "./previews/slack";
import { SignalPreview } from "./previews/signal";
import { TwitterPreview } from "./previews/twitter";
import { SnapchatPreview } from "./previews/snapchat";
import { RedditPreview } from "./previews/reddit";
import { TikTokPreview } from "./previews/tiktok";
import { LinkedInPreview } from "./previews/linkedin";

interface PreviewProps {
  platform: Platform;
  onPlatformChange: (value: Platform) => void;
  messages: Message[];
  sender: Person;
  receiver: Person;
  settings: SettingsType;
  onSettingsChange: (value: SettingsType) => void;
  onDownload: (device: DeviceSize) => void;
  isRecording: boolean;
  recordingTime: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  typingText: string;
  pendingRecording: Blob | null;
  onVideoDownload: (device: DeviceSize) => void;
  onCancelRecording: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  function Preview(
    {
      platform,
      onPlatformChange,
      messages,
      sender,
      receiver,
      settings,
      onSettingsChange,
      onDownload,
      isRecording,
      recordingTime,
      onStartRecording,
      onStopRecording,
      typingText,
      pendingRecording,
      onVideoDownload,
      onCancelRecording,
    },
    ref
  ) {
    const [showImageDialog, setShowImageDialog] = useState(false);

    const platformConfig = platforms[platform];

    const PreviewComponent = {
      discord: DiscordPreview,
      tinder: TinderPreview,
      instagram: InstagramPreview,
      imessage: IMessagePreview,
      whatsapp: WhatsAppPreview,
      messenger: MessengerPreview,
      telegram: TelegramPreview,
      slack: SlackPreview,
      signal: SignalPreview,
      twitter: TwitterPreview,
      snapchat: SnapchatPreview,
      reddit: RedditPreview,
      tiktok: TikTokPreview,
      linkedin: LinkedInPreview,
    }[platform];

    return (
      <TooltipProvider>
        <div className="flex h-full w-full flex-col gap-3">
          <Card className="flex flex-1 flex-col overflow-hidden border-border/50 shadow-lg !py-0 !gap-0 rounded-xl">
            <CardContent className="flex flex-1 flex-col overflow-hidden !p-0">
              <div ref={ref} className="flex h-full flex-col overflow-hidden">
                <PreviewComponent
                  messages={messages}
                  sender={sender}
                  receiver={receiver}
                  settings={settings}
                  typingText={typingText}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex shrink-0 items-center justify-center gap-2">
            {/* Platform selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 border-border/50 bg-background shadow-sm"
                >
                  {platformConfig.icon}
                  <span className="max-w-[80px] truncate">
                    {platformConfig.name}
                  </span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="grid grid-cols-2 gap-1 p-2 w-[280px]"
              >
                {Object.entries(platforms).map(([key, config]) => (
                  <DropdownMenuItem
                    key={key}
                    onClick={() => onPlatformChange(key as Platform)}
                    className="gap-2 px-2 py-1.5"
                  >
                    {config.icon}
                    <span className="text-xs">{config.name}</span>
                    {platform === key && (
                      <Check className="ml-auto h-3 w-3 text-primary" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Settings popover */}
            <Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-border/50 shadow-sm bg-transparent"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                </TooltipTrigger>
                <TooltipContent side="bottom">Settings</TooltipContent>
              </Tooltip>
              <PopoverContent align="center" className="w-56">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Preview Settings</h4>
                    <p className="text-xs text-muted-foreground">
                      Customize the preview
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="dark-mode" className="text-sm">
                          Dark Mode
                        </Label>
                      </div>
                      <Switch
                        id="dark-mode"
                        checked={settings.darkMode}
                        onCheckedChange={(checked) =>
                          onSettingsChange({ ...settings, darkMode: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <LayoutTemplate className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="show-header" className="text-sm">
                          Show Header
                        </Label>
                      </div>
                      <Switch
                        id="show-header"
                        checked={settings.showHeader}
                        onCheckedChange={(checked) =>
                          onSettingsChange({ ...settings, showHeader: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PanelBottom className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor="show-footer" className="text-sm">
                          Show Footer
                        </Label>
                      </div>
                      <Switch
                        id="show-footer"
                        checked={settings.showFooter}
                        onCheckedChange={(checked) =>
                          onSettingsChange({ ...settings, showFooter: checked })
                        }
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={isRecording ? "destructive" : "outline"}
                  size={isRecording ? "default" : "icon"}
                  onClick={isRecording ? onStopRecording : onStartRecording}
                  className={`border-border/50 shadow-sm ${
                    isRecording ? "gap-2 px-3" : ""
                  }`}
                >
                  {isRecording ? (
                    <>
                      <Square className="h-3.5 w-3.5 fill-current" />
                      <span className="font-mono text-xs">
                        {formatTime(recordingTime)}
                      </span>
                    </>
                  ) : (
                    <Video className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {isRecording ? "Stop Recording" : "Record as you type"}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowImageDialog(true)}
                  className="border-border/50 shadow-sm bg-transparent"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Download PNG</TooltipContent>
            </Tooltip>
          </div>

          {/* Image download dialog */}
          <DeviceSelector
            open={showImageDialog}
            onOpenChange={setShowImageDialog}
            onSelect={onDownload}
            mode="image"
          />

          <DeviceSelector
            open={pendingRecording !== null}
            onOpenChange={(open) => {
              if (!open) onCancelRecording();
            }}
            onSelect={onVideoDownload}
            mode="video"
          />
        </div>
      </TooltipProvider>
    );
  }
);
