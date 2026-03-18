"use client"

import { ArrowLeft, Copy, Moon, Share2 } from "lucide-react"
import { ModeToggle } from "../togglebutton"
import { useRouter } from "next/navigation"

type RoomHeaderProps = {
	roomId: string
}

export default function RoomHeader({ roomId }: RoomHeaderProps) {
    const router = useRouter()

    const backfn = () => {
        router.back()
    }
	return (
		<section className="rounded-3xl border border-white/10 bg-[#070707] px-5 py-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:px-6">
			<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
				<div className="flex items-start gap-4">
					<button className="mt-1 rounded-full p-2 text-white/80 transition hover:bg-white/5 hover:text-white" onClick={()=>{backfn()}}>
						<ArrowLeft className="h-5 w-5" />
					</button>

					<div>
						<h1 className="text-2xl font-semibold tracking-tight">Room {roomId}</h1>
						<p className="text-sm text-white/55">
							Invite friends using the buttons on the right
						</p>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-3">
					
                    <ModeToggle/>

					<button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#161616]">
						<Copy className="h-4 w-4" />
						Copy ID
					</button>

					<button className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-[#101010] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#161616]">
						<Share2 className="h-4 w-4" />
						Share
					</button>
				</div>
			</div>
		</section>
	)
}
