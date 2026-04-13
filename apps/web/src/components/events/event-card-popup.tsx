import React, { useEffect } from "react";
import { EventType } from "@/components/events/types";
import EventTag from "@/components/events/EventTag";

interface EventPopupProps {
	event: EventType | null;
	onClose: () => void;
}

// TODO: figure what to do if event title too long
// TODO: link play button to yt or directy to event vod/stream
// TODO: add suborgs tags somehow
export default function EventPopup({ event, onClose }: EventPopupProps) {
	// prevent background scrolling when popup is open
	useEffect(() => {
		if (event) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [event]);

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

				<div className="flex aspect-square h-full w-full items-center justify-center bg-gray-200">
					<div className=" px-6 text-center font-mono text-gray-500">
						{event.imageUrl ? "Image/Video" : "No Content Provided"}
					</div>
				</div>
				{/* add later when db done
                <div className="bg-gray-200 flex w-full aspect-square items-center justify-center overflow-hidden">
                    {event.imageUrl ? (
                        <img 
                            src={event.imageUrl} 
                            alt={event.title} 
                            className="aspect-square h-full w-full object-cover" 
                        />
                    ) : (
                        <div className="font-mono text-gray-500 text-center px-6">
                            No Image Provided
                        </div>
                    )}
                </div>
                */}

				<div className="flex flex-col justify-between p-12 font-mono">
					<div>
						<h2 className="mb-6 font-mono text-4xl font-bold text-acm-darker-blue">
							{event.title}
						</h2>

						<div className="mb-4 space-y-2 text-xl font-bold text-acm-darker-blue">
							{/* change to images/icons later */}
							<h2>
								◷{" "}
								{event.date ||
									"No date provided for this event."}
							</h2>
							<h2>
								⚲{" "}
								{event.location ||
									"No location provided for this event."}
							</h2>
						</div>

                        // TODO: ask if suborg and event type tags should be separate (2 diff rows) or combined (1 row & scroll, suborg or type first?)
						<div className="mb-2 flex flex-nowrap gap-2 overflow-x-auto pb-2 no-scrollbar">
							{event.tags?.map((tag, index) => (
								<EventTag
									key={index}
									text={tag.label}
									color={tag.color}
									icon={tag.icon}
								/>
							))}
						</div>

						<h2 className="mb-2 text-xl font-bold text-acm-darker-blue">
							Description
						</h2>
						<div className="mb-10 max-h-64 overflow-y-auto no-scrollbar">
							<p className="text-sm">
								{event.description ||
									"No description provided for this event."}
							</p>
						</div>
					</div>

					<div className="flex w-full gap-4">
						<button className="flex h-full w-14 shrink-0 items-center justify-center rounded-sm bg-acm-darker-blue text-white transition-all hover:brightness-75">
							▶
							{/* TODO: change to image/icon later? 
                                        links to stream/yt - def a way to direectly link to stream or vod
                             */}
						</button>
						<button className="flex-1 bg-acm-darker-blue px-6 py-2  font-bold text-white transition-all hover:brightness-75">
							Remind Me{" "}
							{/* TODO: link to event in membership portal? or add to google calendar? ask later */}
						</button>
						<button className="flex-1 border-2 border-acm-darker-blue px-6 py-2 font-bold text-acm-darker-blue transition-colors hover:bg-acm-darker-blue/10">
							Check In{" "}
							{/* TODO: link to event in membership portal */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
