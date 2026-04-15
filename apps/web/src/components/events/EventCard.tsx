import React from "react";
import { EventType } from "@/components/events/types";

// TODO: might have to add links
interface EventCardProps {
    event: EventType;
    onClick: () => void;
}

// TODO: make image say no image provided like event popup when none
// TODO: concat title if too long !! should not go over row
export default function EventCard({ event, onClick }: EventCardProps) {
    const { title, date, location, imageUrl } = event;

	return (
		<div onClick={onClick} className="group flex cursor-pointer flex-col">
			<div className="m-auto flex w-64 flex-col gap-1 pb-1">
				<div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-400">
					{imageUrl && (
						<img
							src={imageUrl}
							alt={title}
							className="h-full w-full object-cover aspect-square"
						/>
					)}
				</div>

				<div className="flex flex-col gap-1">
					<h2 className="font-mono font-semibold text-acm-darker-blue">
						{title}
					</h2>

					{/* implement ISO date formatting later?*/}
					<p className="font-mono text-sm text-acm-darker-blue">
						{date || "TBD"}
					</p>
					<p className="font-mono text-sm text-acm-darker-blue">
						{location || "TBD"}
					</p>
				</div>
			</div>
		</div>
	);
}
