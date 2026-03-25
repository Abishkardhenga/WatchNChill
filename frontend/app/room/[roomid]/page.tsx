"use client"

import ChatCard from "@/components/Roompage/ChatCard"
import ParticipantsCard from "@/components/Roompage/ParticipantCard"
import RoomHeader from "@/components/Roompage/RoomHeader"
import type { Participant } from "@/components/Roompage/participant.types"
import { useEffect, useMemo, useState, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { io, Socket } from "socket.io-client"
import type { ChatMessage, RoomState as RoomStateType } from "@/types/room"

export default function RoomPage() {
  const params = useParams<{ roomid: string }>()
  const searchParams = useSearchParams()

  const roomId = useMemo(() => {
    const value = params?.roomid
    return Array.isArray(value) ? value[0] : (value ?? "")
  }, [params])

  const userName = searchParams.get("name") || "Guest"
  const hostToken = searchParams.get("hostToken") || ""

  const socketRef = useRef<Socket | null>(null)
  const [participants, setParticipants] = useState<Participant[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("connecting")

  useEffect(() => {
    if (!roomId) return

    const socketBaseUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"

    const socket = io(socketBaseUrl, {
      transports: ["websocket"],
    })
    socketRef.current = socket

    socket.on("connect", () => {
      setConnectionStatus("connected")
    })

    socket.emit("room:join", {
      roomId,
      name: userName,
      hostToken,
    })

    socket.on("room:state", (payload) => {
      setMessages(payload?.messages || [])
      setTypingUsers([])

      const socketParticipants = Array.isArray(payload?.participants)
        ? payload.participants
        : []

      const mappedParticipants: Participant[] = socketParticipants.map(
        (participant: {
          socketId: string
          name: string
          role: "host" | "guest"
        }) => ({
          id: participant.socketId,
          name: participant.name,
          role: participant.role === "host" ? "Host" : "Guest",
          isYou: participant.name === userName,
          online: true,
        }),
      )

      setParticipants(mappedParticipants)

    })

    socket.on("room:user-joined", (payload: { name: string }) => {
      console.log(`${payload.name} joined the room`)
    })

    socket.on("room:user-left", (payload: { name: string }) => {
      console.log(`${payload.name} left the room`)
      setParticipants((prev) => prev.filter((p) => p.name !== payload.name))
      setTypingUsers((prev) => prev.filter((name) => name !== payload.name))
    })

    socket.on("chat:new-message", (payload: ChatMessage) => {
      setMessages((prev) => [...prev, payload])
    })

    socket.on("chat:typing", (payload: { name: string; isTyping: boolean }) => {
      if (payload.name === userName) return

      setTypingUsers((prev) => {
        if (payload.isTyping) {
          if (prev.includes(payload.name)) return prev
          return [...prev, payload.name]
        }

        return prev.filter((name) => name !== payload.name)
      })
    })

    socket.on("room:closed", () => {
      setConnectionStatus("disconnected")
      console.log("Room was closed")
    })

    socket.on("room:error", (payload: { message: string }) => {
      setConnectionStatus("error")
      console.error(payload.message)
    })

    socket.on("disconnect", () => {
      setConnectionStatus("disconnected")
      setTypingUsers([])
    })

    return () => {
      socket.emit("room:leave", { roomId })
      socket.disconnect()
    }
  }, [hostToken, roomId, userName])

  const handleSendMessage = (text: string) => {
    socketRef.current?.emit("chat:send", {
      roomId,
      text,
      name: userName,
    })

    socketRef.current?.emit("chat:typing", {
      roomId,
      name: userName,
      isTyping: false,
    })
  }

  const handleTypingChange = (isTyping: boolean) => {
    socketRef.current?.emit("chat:typing", {
      roomId,
      name: userName,
      isTyping,
    })
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <RoomHeader roomId={roomId} />

        <div className="grid gap-6">
          <aside className="flex flex-col gap-6">
            <ParticipantsCard participants={participants} />
            <ChatCard
              messages={messages}
              onSendMessage={handleSendMessage}
              onTypingChange={handleTypingChange}
              currentUserName={userName}
              typingUsers={typingUsers}
            />
          </aside>
        </div>
      </div>
    </main>
  )
}
