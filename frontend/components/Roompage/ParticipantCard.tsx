import { Users } from "lucide-react"
import ParticipantItem from "./ParticipantItem"
import type { Participant } from "./participant.types"

type ParticipantsCardProps = {
	participants: Participant[]
}

export default function ParticipantsCard({ participants }: ParticipantsCardProps) {
	return (
		<section className="rounded-[28px] border border-white/10 bg-[#0c0c0c] p-5">
			<div className="mb-5 flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-400">
						<Users className="h-5 w-5" />
					</div>
					<h2 className="text-2xl font-semibold">Participants</h2>
				</div>

				<div className="flex h-8 min-w-8 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 px-2 text-sm font-medium text-blue-300">
					{participants.length}
				</div>
			</div>

			<div className="space-y-3">
				{participants.map((participant) => (
					<ParticipantItem key={participant.id} participant={participant} />
				))}
			</div>
		</section>
	)
}
