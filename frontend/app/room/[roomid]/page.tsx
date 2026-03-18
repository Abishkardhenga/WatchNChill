"use client"

import ChatCard from "@/components/Roompage/ChatCard"
import ParticipantsCard from "@/components/Roompage/ParticipantCard"
import RoomHeader from "@/components/Roompage/RoomHeader"
import VideoSection from "@/components/Roompage/VideoSection"
import type { Participant } from "@/components/Roompage/participant.types"

const participants: Participant[] = [
  {
    id: "1",
    name: "dhenga",
    role: "Host",
    isYou: true,
    online: true,
  },
]

export default function RoomPage() {
  const roomId = "ZPE3EG"

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <RoomHeader roomId={roomId} />

        <div className="grid gap-6 lg:grid-cols-[1.9fr_0.95fr]">
          <VideoSection />
          <aside className="flex flex-col gap-6">
            <ParticipantsCard participants={participants} />
            <ChatCard />
          </aside>
        </div>
      </div>
    </main>
  )
}
