import { ExternalLink, Search } from "lucide-react"
import { useState } from "react"
import { extractVideoId } from "@/lib/youtube"

type VideoSectionProps = {
  videoId: string | null
  isPlaying: boolean
  currentTime: number
  isHost: boolean
  onVideoUrlChange: (url: string) => void
  onPlayPause: (isPlaying: boolean, currentTime: number) => void
  onSeek: (currentTime: number) => void
}

export default function VideoSection({
  videoId,
  isPlaying,
  currentTime,
  isHost,
  onVideoUrlChange,
  onPlayPause,
  onSeek,
}: VideoSectionProps) {
  const [urlInput, setUrlInput] = useState(`https://youtu.be/${videoId || ""}`)

  const handleUrlSubmit = () => {
    const trimmed = urlInput.trim()
    if (trimmed) {
      onVideoUrlChange(trimmed)
    }
  }

  const displayVideoId = videoId || "ENaw8DQ5Waw"

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#111111] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">
        <div className="relative aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${displayVideoId}?enablejsapi=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>
      </div>

      {isHost && (
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171717] px-4 py-4">
          <Search className="h-5 w-5 shrink-0 text-white/45" />

          <input
            placeholder="Paste YouTube URL or video ID"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUrlSubmit()
            }}
            className="w-full bg-transparent text-sm text-white/80 outline-none placeholder:text-white/30"
          />

          <button
            onClick={handleUrlSubmit}
            className="rounded-xl p-2 text-white/65 transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
          </button>
        </div>
      )}

      {!isHost && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-sm text-white/55">
          {videoId
            ? `Playing: youtu.be/${videoId}`
            : "Waiting for host to select video..."}
        </div>
      )}

      {isHost && (
        <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#171717] px-4 py-3">
          <span className="text-sm text-white/60">Host Controls:</span>
          <button
            onClick={() => onPlayPause(!isPlaying, currentTime)}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={currentTime}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs text-white/50">
            {Math.round(currentTime)}s
          </span>
        </div>
      )}
    </section>
  )
}
