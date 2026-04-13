import React from "react";

interface EventCardProps {
	title: string;
	date: string;
	location: string;
	status: string;
	description?: string; // optional for card, required for popup
	imageUrl?: string;
	onClick?: () => void;
}

// TODO: make image say no image provided like event popup when none
// TODO: concat title if too long
export default function EventCard({
	title,
	date,
	location,
	description,
	imageUrl,
	onClick,
}: EventCardProps) {
	return (
		<div onClick={onClick} className="group flex cursor-pointer flex-col">
			<div className="m-auto flex w-64 flex-col gap-1 bg-gray-200 pb-1">
				<div className="relative aspect-square w-full overflow-hidden bg-gray-400">
					{imageUrl && (
						<img
							src={imageUrl}
							alt={title}
							className="h-full w-full object-cover"
						/>
					)}
				</div>

				<div className="flex flex-col gap-1 px-2">
					<h2 className="font-mono font-semibold text-acm-darker-blue">
						{title}
					</h2>

					{/* implement ISO date formatting later*/}
					<p className="font-mono text-sm text-acm-darker-blue">
						{date || "None Provided"}
					</p>
					<p className="font-mono text-sm text-acm-darker-blue">
						{location || "None Provided"}
					</p>
				</div>
			</div>
		</div>
	);
}
