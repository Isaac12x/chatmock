"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, Tablet, Download, Video } from "lucide-react"
import { deviceSizes, type DeviceSize } from "./types"

interface DeviceSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (device: DeviceSize) => void
  mode: "image" | "video"
}

export function DeviceSelector({ open, onOpenChange, onSelect, mode }: DeviceSelectorProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceSize>(deviceSizes[0])

  const iphones = deviceSizes.filter((d) => d.category === "iphone")
  const androids = deviceSizes.filter((d) => d.category === "android")
  const tablets = deviceSizes.filter((d) => d.category === "tablet")

  const handleConfirm = () => {
    onSelect(selectedDevice)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {mode === "image" ? <Download className="h-5 w-5" /> : <Video className="h-5 w-5" />}
            {mode === "image" ? "Download Image" : "Record Video"}
          </DialogTitle>
          <DialogDescription>Select a device size for your export</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="iphone" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="iphone" className="gap-1.5">
              <Smartphone className="h-3.5 w-3.5" />
              iPhone
            </TabsTrigger>
            <TabsTrigger value="android" className="gap-1.5">
              <Smartphone className="h-3.5 w-3.5" />
              Android
            </TabsTrigger>
            <TabsTrigger value="tablet" className="gap-1.5">
              <Tablet className="h-3.5 w-3.5" />
              Tablet
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[280px] mt-3">
            <TabsContent value="iphone" className="mt-0 space-y-1">
              {iphones.map((device) => (
                <DeviceOption
                  key={device.name}
                  device={device}
                  selected={selectedDevice.name === device.name}
                  onClick={() => setSelectedDevice(device)}
                />
              ))}
            </TabsContent>
            <TabsContent value="android" className="mt-0 space-y-1">
              {androids.map((device) => (
                <DeviceOption
                  key={device.name}
                  device={device}
                  selected={selectedDevice.name === device.name}
                  onClick={() => setSelectedDevice(device)}
                />
              ))}
            </TabsContent>
            <TabsContent value="tablet" className="mt-0 space-y-1">
              {tablets.map((device) => (
                <DeviceOption
                  key={device.name}
                  device={device}
                  selected={selectedDevice.name === device.name}
                  onClick={() => setSelectedDevice(device)}
                />
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="text-sm text-muted-foreground">
            {selectedDevice.width} × {selectedDevice.height}px
          </div>
          <Button onClick={handleConfirm} className="gap-2">
            {mode === "image" ? <Download className="h-4 w-4" /> : <Video className="h-4 w-4" />}
            {mode === "image" ? "Download" : "Start Recording"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function DeviceOption({
  device,
  selected,
  onClick,
}: {
  device: DeviceSize
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
        selected ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      }`}
    >
      <span className="font-medium text-sm">{device.name}</span>
      <span className={`text-xs ${selected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {device.width} × {device.height}
      </span>
    </button>
  )
}
