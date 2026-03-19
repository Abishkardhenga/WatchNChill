export type PlaybackState = {
  videoId: string | null
  currentTime: number
  isPlaying: boolean
}

export type ChatMessage = {
  id: string
  name: string
  text: string
  createdAt: number
}

export type Participant = {
  id: string
  name: string
  role: "Host" | "Guest"
  isYou?: boolean
  online?: boolean
}

export type RoomState = {
  participants: Participant[]
  playback: PlaybackState
  messages: ChatMessage[]
  connectionStatus: "connecting" | "connected" | "disconnected" | "error"
  currentUserRole: "host" | "guest" | null
}
