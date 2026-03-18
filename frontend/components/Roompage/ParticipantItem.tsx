import { Crown, Users } from "lucide-react"
import type { Participant } from "./participant.types"

type ParticipantItemProps = {
	participant: Participant
}

export default function ParticipantItem({ participant }: ParticipantItemProps) {
	return (
		<div className="flex items-center justify-between rounded-3xl border border-blue-500/30 bg-[#08172d] px-4 py-4 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.05)]">
			<div className="flex min-w-0 items-center gap-4">
				<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-[#15345f] text-sm font-semibold text-blue-100">
					D
				</div>

				<div className="min-w-0">
					<div className="flex items-center gap-2">
						<p className="truncate text-lg font-medium text-white">
							{participant.name}
							{participant.isYou ? " (You)" : ""}
						</p>
						{participant.role === "Host" && (
							<Crown className="h-4 w-4 shrink-0 text-yellow-400" />
						)}
					</div>

					<div className="mt-1 flex items-center gap-2 text-sm text-white/55">
						<Users className="h-3.5 w-3.5" />
						<span>{participant.role}</span>
					</div>
				</div>
			</div>

			<span className="h-3 w-3 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]" />
		</div>
	)
}
