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
			<div className="m-auto flex w-64 flex-col gap-1">
                {/* image */}
				<div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-400">
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={title}
							className="aspect-square h-full w-full object-cover"
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center px-4 text-center text-xs font-bold font-mono text-gray-600">
							No Image Provided
						</div>
					)}
					<div className="pointer-events-none absolute inset-0 bg-acm-darker-blue opacity-0 transition-opacity group-hover:opacity-10" />
				</div>

                {/* info */}
				<div className="flex flex-col">
					<h2 className="truncate font-calsans font-bold text-acm-darker-blue">
						{title}
					</h2>
					{/* implement ISO date formatting later?*/}
					<p className="font-calsans text-sm text-acm-darker-blue">
						{date || "TBD"}
					</p>
					<p className="font-calsans text-sm text-acm-darker-blue">
						{location || "TBD"}
					</p>
				</div>
			</div>
		</div>
	);
}
