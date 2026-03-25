"use client"

import { MessageCircle, Send } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import type { ChatMessage } from "@/types/room"

type ChatCardProps = {
  messages: ChatMessage[]
  onSendMessage: (text: string) => void
  onTypingChange: (isTyping: boolean) => void
  currentUserName: string
  typingUsers: string[]
}

export default function ChatCard({
  messages,
  onSendMessage,
  onTypingChange,
  currentUserName,
  typingUsers,
}: ChatCardProps) {
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isTypingRef = useRef(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return
    onSendMessage(message)
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
    if (isTypingRef.current) {
      onTypingChange(false)
      isTypingRef.current = false
    }
    setMessage("")
  }

  const handleTyping = (value: string) => {
    setMessage(value)

    const hasText = value.trim().length > 0

    if (!hasText) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
        typingTimeoutRef.current = null
      }
      if (isTypingRef.current) {
        onTypingChange(false)
        isTypingRef.current = false
      }
      return
    }

    if (!isTypingRef.current) {
      onTypingChange(true)
      isTypingRef.current = true
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    typingTimeoutRef.current = setTimeout(() => {
      onTypingChange(false)
      isTypingRef.current = false
      typingTimeoutRef.current = null
    }, 1200)
  }

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
      if (isTypingRef.current) {
        onTypingChange(false)
      }
    }
  }, [onTypingChange])

  return (
    <section className="flex min-h-105 flex-col rounded-[28px] border border-white/10 bg-[#0c0c0c] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold">Chat</h2>
        </div>

        <div className="flex h-8 min-w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-2 text-sm font-medium text-blue-300">
          {messages.length}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto rounded-[24px] border border-white/5 bg-black/30 p-3">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#101010] text-white/45">
                <MessageCircle className="h-8 w-8" />
              </div>
              <p className="text-xl font-medium text-white/70">
                Start new conversation!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-lg px-3 py-2 text-sm ${
                  msg.name === currentUserName
                    ? "bg-blue-600/30 text-blue-100 ml-auto max-w-xs"
                    : "bg-white/5 text-white/80 mr-auto max-w-xs"
                }`}
              >
                <div className="font-semibold text-xs text-white/60 mb-1">
                  {msg.name}
                </div>
                <div className="wrap-break-word">{msg.text}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {typingUsers.length > 0 && (
        <div className="mt-2 min-h-5 px-1 text-xs text-white/60">
          {typingUsers.length === 1
            ? `${typingUsers[0]} is typing...`
            : `${typingUsers.slice(0, 2).join(", ")} ${typingUsers.length > 2 ? "and others" : "are"} typing...`}
        </div>
      )}

      {/* Input */}
      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#121212] px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => handleTyping(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
          className="flex-1 bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-white/30"
        />

        <button
          onClick={handleSend}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
