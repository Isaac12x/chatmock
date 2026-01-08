import type { Message, Person } from "./types"

export function getCurrentTypingText(text: string): string {
  if (!text) return ""

  const lines = text.split("\n")
  const lastLine = lines[lines.length - 1]

  // If last line is empty, nothing is being typed
  if (!lastLine || lastLine.trim() === "") return ""

  // Extract the content without the > or < prefix
  const trimmed = lastLine.trim()
  if (trimmed.startsWith("> ")) return trimmed.slice(2)
  if (trimmed.startsWith(">")) return trimmed.slice(1)
  if (trimmed.startsWith("< ")) return trimmed.slice(2)
  if (trimmed.startsWith("<")) return trimmed.slice(1)

  // No prefix, return as is
  return trimmed
}

export function parseConversation(text: string, sender: Person, receiver: Person): Message[] {
  const lines = text.split("\n")
  const messages: Message[] = []
  let lastDirection: "sender" | "receiver" | null = null
  const baseTime = new Date()
  baseTime.setHours(8, 39, 0, 0)

  let currentMessage: { isSender: boolean; content: string } | null = null

  const pushCurrentMessage = () => {
    if (currentMessage && currentMessage.content.trim()) {
      const timestamp = new Date(baseTime)
      timestamp.setMinutes(baseTime.getMinutes() + messages.length)

      messages.push({
        id: `msg-${messages.length}`,
        content: currentMessage.content.trim(),
        sender: currentMessage.isSender ? sender : receiver,
        isSender: currentMessage.isSender,
        timestamp,
      })
    }
    currentMessage = null
  }

  for (const line of lines) {
    const trimmed = line.trim()

    // Check if this line starts a new message (has > or < prefix)
    const startsWithSender = trimmed.startsWith("> ") || trimmed.startsWith(">")
    const startsWithReceiver = trimmed.startsWith("< ") || trimmed.startsWith("<")

    if (startsWithSender || startsWithReceiver) {
      // Push any existing message before starting a new one
      pushCurrentMessage()

      const isSender = startsWithSender
      const content = trimmed.startsWith("> ") || trimmed.startsWith("< ") ? trimmed.slice(2) : trimmed.slice(1)

      lastDirection = isSender ? "sender" : "receiver"
      currentMessage = { isSender, content }
    } else if (trimmed === "") {
      // Empty line - push current message and reset
      pushCurrentMessage()
    } else if (currentMessage) {
      currentMessage.content += "\n" + trimmed
    } else {
      // No current message and no prefix - auto-alternate
      const isSender = lastDirection !== "sender"
      lastDirection = isSender ? "sender" : "receiver"
      currentMessage = { isSender, content: trimmed }
    }
  }

  // Don't forget the last message
  pushCurrentMessage()

  return messages
}
