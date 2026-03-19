"use client"

import ChatCard from "@/components/Roompage/ChatCard"
import ParticipantsCard from "@/components/Roompage/ParticipantCard"
import RoomHeader from "@/components/Roompage/RoomHeader"
import VideoSection from "@/components/Roompage/VideoSection"
import type { Participant } from "@/components/Roompage/participant.types"
import { useEffect, useMemo, useState, useRef } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { io, Socket } from "socket.io-client"
import type {
  PlaybackState,
  ChatMessage,
  RoomState as RoomStateType,
} from "@/types/room"
import { extractVideoId } from "@/lib/youtube"

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
  const [playback, setPlayback] = useState<PlaybackState>({
    videoId: null,
    currentTime: 0,
    isPlaying: false,
  })
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "connected" | "disconnected" | "error"
  >("connecting")
  const [currentUserRole, setCurrentUserRole] = useState<
    "host" | "guest" | null
  >(null)

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

      const userRole = socketParticipants.find(
        (p: { name: string }) => p.name === userName,
      )?.role
      if (userRole) {
        setCurrentUserRole(userRole)
      }

      if (payload?.playback) {
        setPlayback(payload.playback)
      }
    })

    socket.on("room:user-joined", (payload: { name: string }) => {
      console.log(`${payload.name} joined the room`)
    })

    socket.on("room:user-left", (payload: { name: string }) => {
      console.log(`${payload.name} left the room`)
      setParticipants((prev) => prev.filter((p) => p.name !== payload.name))
    })

    socket.on(
      "video:changed",
      (payload: {
        videoId: string
        currentTime: number
        isPlaying: boolean
      }) => {
        setPlayback({
          videoId: payload.videoId,
          currentTime: payload.currentTime,
          isPlaying: payload.isPlaying,
        })
      },
    )

    socket.on(
      "playback:changed",
      (payload: { action: string; currentTime: number }) => {
        setPlayback((prev) => ({
          ...prev,
          currentTime: payload.currentTime,
          isPlaying: payload.action === "play",
        }))
      },
    )

    socket.on("chat:new-message", (payload: ChatMessage) => {
      setMessages((prev) => [...prev, payload])
    })

    socket.on("chat:typing", (payload: { name: string; isTyping: boolean }) => {
      console.log(
        `${payload.name} is ${payload.isTyping ? "typing" : "not typing"}`,
      )
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
    })

    return () => {
      socket.emit("room:leave", { roomId })
      socket.disconnect()
    }
  }, [hostToken, roomId, userName])

  const handleVideoUrlChange = (url: string) => {
    if (currentUserRole !== "host") {
      alert("Only host can change video")
      return
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      alert("Invalid YouTube URL or video ID")
      return
    }

    socketRef.current?.emit("video:change", {
      roomId,
      videoId,
    })
  }

  const handlePlayPause = (isPlaying: boolean, currentTime: number) => {
    if (currentUserRole !== "host") return

    if (isPlaying) {
      socketRef.current?.emit("playback:play", {
        roomId,
        currentTime,
      })
    } else {
      socketRef.current?.emit("playback:pause", {
        roomId,
        currentTime,
      })
    }
  }

  const handleSeek = (currentTime: number) => {
    if (currentUserRole !== "host") return

    socketRef.current?.emit("playback:seek", {
      roomId,
      currentTime,
    })
  }

  const handleSendMessage = (text: string) => {
    socketRef.current?.emit("chat:send", {
      roomId,
      text,
      name: userName,
    })
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <RoomHeader roomId={roomId} />

        <div className="grid gap-6 lg:grid-cols-[1.9fr_0.95fr]">
          <VideoSection
            videoId={playback.videoId}
            isPlaying={playback.isPlaying}
            currentTime={playback.currentTime}
            isHost={currentUserRole === "host"}
            onVideoUrlChange={handleVideoUrlChange}
            onPlayPause={handlePlayPause}
            onSeek={handleSeek}
          />
          <aside className="flex flex-col gap-6">
            <ParticipantsCard participants={participants} />
            <ChatCard
              messages={messages}
              onSendMessage={handleSendMessage}
              currentUserName={userName}
            />
          </aside>
        </div>
      </div>
    </main>
  )
}
