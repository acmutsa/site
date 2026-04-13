import React from "react";
import { EventType } from "./event-grid-client";

interface EventPopupProps {
	event: EventType | null;
	onClose: () => void;
}

export default function EventPopup({ event, onClose }: EventPopupProps) {
	if (!event) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative grid w-full max-w-6xl grid-cols-1 overflow-hidden bg-white shadow-2xl md:grid-cols-2"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute right-4 top-1 font-mono text-2xl font-bold text-acm-darker-blue/50 transition-colors hover:text-acm-darker-blue"
				>
					✕
				</button>

				<div className="flex aspect-square w-full h-full items-center justify-center bg-gray-200">
					<div className=" px-6 text-center font-mono text-gray-500">
						{event.imageUrl ? "Image/Video" : "No Content Provided"}
					</div>
				</div>

				<div className="flex flex-col justify-between p-12 font-mono">
					<div>
						<h2 className="mb-6 font-mono text-4xl font-bold text-acm-darker-blue">
							{event.title}
						</h2>

						<div className="mb-8 space-y-2 text-xl font-bold text-acm-darker-blue">
							{/* change to images/icons later */}
							<h2>◷ {event.date}</h2>
							<h2>⚲ {event.location}</h2>
						</div>

						<h2 className="mb-2 text-xl font-bold text-acm-darker-blue">Description</h2>
						<div className="mb-10 max-h-64 overflow-y-auto no-scrollbar">
							<p className="text-sm">
								{event.description || "No description provided for this event."}
							</p>
						</div>
					</div>

                    <div className="flex w-full gap-4">
                         <button className="flex h-10 w-14 shrink-0 items-center justify-center rounded-sm bg-acm-darker-blue text-white transition-all hover:brightness-75">
                             ▶{/* change to image/icon later? */}
                         </button>
                         <button className="flex-1 bg-acm-darker-blue px-6 py-2 text-sm font-bold text-white transition-all hover:brightness-75">
                             Remind Me
                         </button>
                         <button className="flex-1 border-2 border-acm-darker-blue px-6 py-2 text-sm font-bold text-acm-darker-blue transition-colors hover:bg-acm-darker-blue/10">
                             Check In
                         </button>
                    </div>
				</div>
			</div>
		</div>
	);
}
