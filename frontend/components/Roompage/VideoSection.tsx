import { ExternalLink, Search } from "lucide-react"

export default function VideoSection() {
  const videoId = "I3JS1i_mslI"

  return (
    <section className="rounded-[28px] border border-white/10 bg-[#111111] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181818]">
        <div className="relative aspect-video w-full">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/ENaw8DQ5Waw"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />

          <div className="pointer-events-none absolute inset-0 bg-black/10" />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#171717] px-4 py-4">
        <Search className="h-5 w-5 shrink-0 text-white/45" />

        <input
          
          value={`https://youtu.be/${videoId}`}
          className="w-full bg-transparent text-sm text-white/80 outline-none"
        />

        <button className="rounded-xl p-2 text-white/65 transition hover:bg-white/5 hover:text-white">
          <ExternalLink className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}
