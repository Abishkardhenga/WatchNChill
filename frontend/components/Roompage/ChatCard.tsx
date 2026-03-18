"use client"

import { MessageCircle, Send } from "lucide-react"
import { useState } from "react"

export default function ChatCard() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (!message.trim()) return

    console.log("Send message:", message)
    setMessage("")
  }

  return (
    <section className="flex min-h-[420px] flex-col rounded-[28px] border border-white/10 bg-[#0c0c0c] p-5">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">
            <MessageCircle className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-semibold">Chat</h2>
        </div>

        <div className="flex h-8 min-w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-2 text-sm font-medium text-blue-300">
          0
        </div>
      </div>

      {/* Empty State / Messages Area */}
      <div className="flex flex-1 items-center justify-center rounded-[24px] border border-white/5 bg-black/30">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#101010] text-white/45">
            <MessageCircle className="h-8 w-8" />
          </div>
          <p className="text-xl font-medium text-white/70">
            Start new conversation!
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#121212] px-3 py-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
