"use client";

import type React from "react";
import { useRef, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X, ImagePlus, User, Info, MessageSquare } from "lucide-react";
import type { Person } from "./types";

interface EditorProps {
  conversation: string;
  onConversationChange: (value: string) => void;
  sender: Person;
  onSenderChange: (value: Person) => void;
  receiver: Person;
  onReceiverChange: (value: Person) => void;
  messageCount: number;
}

export function Editor({
  conversation,
  onConversationChange,
  sender,
  onSenderChange,
  receiver,
  onReceiverChange,
  messageCount,
}: EditorProps) {
  const senderInputRef = useRef<HTMLInputElement>(null);
  const receiverInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ... existing code for handleAvatarUpload, handleRemoveAvatar, handleKeyDown ...
  const handleAvatarUpload = useCallback(
    (type: "sender" | "receiver") =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            if (type === "sender") {
              onSenderChange({ ...sender, avatar: result });
            } else {
              onReceiverChange({ ...receiver, avatar: result });
            }
          };
          reader.readAsDataURL(file);
        }
      },
    [sender, receiver, onSenderChange, onReceiverChange]
  );

  const handleRemoveAvatar = useCallback(
    (type: "sender" | "receiver") => () => {
      if (type === "sender") {
        onSenderChange({ ...sender, avatar: null });
      } else {
        onReceiverChange({ ...receiver, avatar: null });
      }
    },
    [sender, receiver, onSenderChange, onReceiverChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const value = conversation;

        const newValue =
          value.substring(0, start) + "\n" + value.substring(end);
        onConversationChange(newValue);

        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1;
        });
      }
    },
    [conversation, onConversationChange]
  );

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col gap-3 overflow-hidden">
        <Card className="shrink-0 border-border/50 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-center justify-center gap-8">
              <PersonEditor
                label="Sender"
                person={sender}
                onChange={onSenderChange}
                inputRef={senderInputRef}
                onAvatarClick={() => senderInputRef.current?.click()}
                onAvatarUpload={handleAvatarUpload("sender")}
                onRemoveAvatar={handleRemoveAvatar("sender")}
                tooltip="Messages starting with > come from sender"
              />
              <div className="flex h-16 flex-col items-center justify-center">
                <div className="h-full w-px bg-border" />
              </div>
              <PersonEditor
                label="Receiver"
                person={receiver}
                onChange={onReceiverChange}
                inputRef={receiverInputRef}
                onAvatarClick={() => receiverInputRef.current?.click()}
                onAvatarUpload={handleAvatarUpload("receiver")}
                onRemoveAvatar={handleRemoveAvatar("receiver")}
                tooltip="Messages starting with < come from receiver"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="flex min-h-0 flex-1 flex-col overflow-hidden border-border/50 shadow-sm">
          <CardHeader className="shrink-0 border-b border-border/50 px-3 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <Label className="text-sm font-medium">Conversation</Label>
              </div>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {messageCount} {messageCount === 1 ? "message" : "messages"}
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col p-3">
            <Textarea
              ref={textareaRef}
              value={conversation}
              onChange={(e) => onConversationChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`> Hello from sender\n< Hi from receiver\n> Check this image [img:https://example.com/image.jpg]\n< Here's a link https://example.com`}
              className="min-h-0 flex-1 resize-none border-border/50 font-mono text-sm leading-relaxed focus-visible:ring-1"
            />
          </CardContent>
        </Card>

        <Card className="shrink-0 border-border/50 bg-muted/30 shadow-sm">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <div className="space-y-1">
                <h3 className="text-xs font-semibold text-foreground">
                  Quick Guide
                </h3>
                <ul className="space-y-0.5 text-xs text-muted-foreground">
                  <li>
                    <code className="rounded bg-background px-1 py-0.5 text-[10px]">
                      {">"}
                    </code>{" "}
                    sender{" "}
                    <code className="rounded bg-background px-1 py-0.5 text-[10px]">
                      {"<"}
                    </code>{" "}
                    receiver
                  </li>
                  <li>
                    <code className="rounded bg-background px-1 py-0.5 text-[10px]">
                      {"[img:url]"}
                    </code>{" "}
                    image{" "}
                    <code className="rounded bg-background px-1 py-0.5 text-[10px]">
                      {"https://..."}
                    </code>{" "}
                    link
                  </li>
                  <li>
                    <code className="rounded bg-background px-1 py-0.5 text-[10px]">
                      Enter
                    </code>{" "}
                    new message{" "}
                    <code className="rounded bg-background px-1 py-0.5 text-[10px]">
                      ⌘+Enter
                    </code>{" "}
                    line break
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}

interface PersonEditorProps {
  label: string;
  person: Person;
  onChange: (value: Person) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onAvatarClick: () => void;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveAvatar: () => void;
  tooltip: string;
}

function PersonEditor({
  label,
  person,
  onChange,
  inputRef,
  onAvatarClick,
  onAvatarUpload,
  onRemoveAvatar,
  tooltip,
}: PersonEditorProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex cursor-help items-center gap-1">
            <Label className="text-xs font-medium text-muted-foreground">
              {label}
            </Label>
            <Info className="h-3 w-3 text-muted-foreground/50" />
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>

      <div className="group relative">
        <Avatar
          className="h-12 w-12 cursor-pointer border-2 border-dashed border-muted-foreground/20 transition-all duration-200 hover:border-primary/50 hover:shadow-md"
          onClick={onAvatarClick}
        >
          <AvatarImage
            src={person.avatar || undefined}
            className="object-cover"
          />
          <AvatarFallback className="bg-muted transition-colors group-hover:bg-muted/80">
            {person.avatar ? (
              person.name ? (
                <span className="text-xs font-medium">
                  {person.name.slice(0, 2).toUpperCase()}
                </span>
              ) : (
                <User className="h-4 w-4 text-muted-foreground" />
              )
            ) : (
              <ImagePlus className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            )}
          </AvatarFallback>
        </Avatar>
        {person.avatar && (
          <Button
            size="icon"
            variant="destructive"
            className="absolute -right-1 -top-1 h-4 w-4 rounded-full opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveAvatar();
            }}
          >
            <X className="h-2.5 w-2.5" />
          </Button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onAvatarUpload}
        />
      </div>

      <Input
        value={person.name}
        onChange={(e) => onChange({ ...person, name: e.target.value })}
        className="h-7 w-24 border-border/50 text-center text-xs focus-visible:ring-1"
        placeholder="Name"
      />
    </div>
  );
}
