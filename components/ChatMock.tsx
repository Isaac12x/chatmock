"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Editor } from "./ChatMock/editor";
import { Preview } from "./ChatMock/preview";
import type {
  Platform,
  Message,
  Settings,
  Person,
  DeviceSize,
} from "./ChatMock/types";
import { parseConversation, getCurrentTypingText } from "./ChatMock/parser";

export function ChatMock() {
  const [platform, setPlatform] = useState<Platform>("imessage");
  const [conversation, setConversation] = useState("");
  const [settings, setSettings] = useState<Settings>({
    darkMode: false,
    showHeader: true,
    showFooter: true,
  });
  const [sender, setSender] = useState<Person>({
    name: "",
    avatar: null,
  });
  const [receiver, setReceiver] = useState<Person>({
    name: "",
    avatar: null,
  });
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [pendingRecording, setPendingRecording] = useState<Blob | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messages: Message[] = parseConversation(conversation, sender, receiver);
  const typingText = getCurrentTypingText(conversation);

  const handleDownload = useCallback(
    async (device: DeviceSize) => {
      if (!previewRef.current) return;

      try {
        const { toCanvas } = await import("html-to-image");

        const canvas = await toCanvas(previewRef.current, {
          backgroundColor: settings.darkMode ? "#1f2937" : "#ffffff",
          pixelRatio: 2,
          skipFonts: true,
          cacheBust: true,
          width: device.width,
          height: device.height,
          style: {
            fontFamily: "system-ui, -apple-system, sans-serif",
            width: `${device.width}px`,
            height: `${device.height}px`,
          },
        });

        const link = document.createElement("a");
        link.download = `chat-mockup-${platform}-${device.name.replace(
          /\s+/g,
          "-"
        )}-${Date.now()}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      } catch (error) {
        console.error("Failed to download:", error);
      }
    },
    [platform, settings.darkMode]
  );

  const captureFrame = useCallback(async () => {
    if (!previewRef.current || !canvasRef.current) return;

    try {
      const { toCanvas } = await import("html-to-image");
      const rect = previewRef.current.getBoundingClientRect();

      const sourceCanvas = await toCanvas(previewRef.current, {
        backgroundColor: settings.darkMode ? "#1f2937" : "#ffffff",
        pixelRatio: 2,
        skipFonts: true,
        cacheBust: true,
        width: rect.width,
        height: rect.height,
      });

      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          sourceCanvas,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    } catch {
      // Ignore capture errors during recording
    }
  }, [settings.darkMode]);

  const startRecording = useCallback(async () => {
    if (!previewRef.current) return;

    try {
      const rect = previewRef.current.getBoundingClientRect();

      const canvas = document.createElement("canvas");
      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;
      canvasRef.current = canvas;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = settings.darkMode ? "#1f2937" : "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stream = canvas.captureStream(30);
      const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const webmBlob = new Blob(chunksRef.current, { type: "video/webm" });
        setPendingRecording(webmBlob);
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      let lastCaptureTime = 0;
      const capture = async (timestamp: number) => {
        if (timestamp - lastCaptureTime >= 100) {
          await captureFrame();
          lastCaptureTime = timestamp;
        }
        animationFrameRef.current = requestAnimationFrame(capture);
      };
      animationFrameRef.current = requestAnimationFrame(capture);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  }, [settings.darkMode, captureFrame]);

  const stopRecording = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (recordingIntervalRef.current) {
      clearInterval(recordingIntervalRef.current);
      recordingIntervalRef.current = null;
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
      setIsRecording(false);
      setRecordingTime(0);
    }
  }, []);

  const handleVideoDownload = useCallback(
    (device: DeviceSize) => {
      if (!pendingRecording) return;

      const url = URL.createObjectURL(pendingRecording);
      const link = document.createElement("a");
      link.download = `chat-mockup-${platform}-${device.name.replace(
        /\s+/g,
        "-"
      )}-${Date.now()}.mp4`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
      setPendingRecording(null);
    },
    [pendingRecording, platform]
  );

  const handleCancelRecording = useCallback(() => {
    setPendingRecording(null);
  }, []);

  useEffect(() => {
    if (isRecording) {
      captureFrame();
    }
  }, [conversation, isRecording, captureFrame]);

  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="mx-auto flex h-full max-w-7xl flex-col p-4">
        <div className="flex min-h-0 flex-1 gap-6">
          <div className="flex w-1/2 flex-col overflow-hidden">
            <Editor
              conversation={conversation}
              onConversationChange={setConversation}
              sender={sender}
              onSenderChange={setSender}
              receiver={receiver}
              onReceiverChange={setReceiver}
              messageCount={messages.length}
            />
          </div>
          <div className="flex w-1/2 flex-col py-4">
            <Preview
              ref={previewRef}
              platform={platform}
              onPlatformChange={setPlatform}
              messages={messages}
              sender={sender}
              receiver={receiver}
              settings={settings}
              onSettingsChange={setSettings}
              onDownload={handleDownload}
              isRecording={isRecording}
              recordingTime={recordingTime}
              onStartRecording={startRecording}
              onStopRecording={stopRecording}
              typingText={typingText}
              pendingRecording={pendingRecording}
              onVideoDownload={handleVideoDownload}
              onCancelRecording={handleCancelRecording}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
