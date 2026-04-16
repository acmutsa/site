import React, { useEffect, useRef, useState } from "react";
import { EventType } from "@/components/events/types";
import EventTag from "@/components/events/EventTag";
import { Calendar, MapPin, Play} from "lucide-react";

interface EventPopupProps {
	event: EventType | null;
	onClose: () => void;
}

// TODO: link play button to yt or directy to event vod/stream
// TODO: add transition to popup open/close - use same animation as navbar?
// TODO: able to go to next or previous event in popup without closing and reopening? button/swipe

//TODO: be able to scroll through page if title is too long - add fade at top and bottom when scrollable
export default function EventPopup({ event, onClose }: EventPopupProps) {
	// horizontal scrolling
	const horiScrollRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const handleHoriScroll = () => {
		if (horiScrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				horiScrollRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(
				Math.ceil(scrollLeft + clientWidth) < scrollWidth,
			);
		}
	};

	// vertical scrolling
	const vertScrollRef = useRef<HTMLDivElement>(null);
	const [canScrollTop, setCanScrollTop] = useState(false);
	const [canScrollBottom, setCanScrollBottom] = useState(true);

	const handleVertScroll = () => {
		if (vertScrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				vertScrollRef.current;
			setCanScrollTop(scrollTop > 0);
			setCanScrollBottom(
				Math.ceil(scrollTop + clientHeight) < scrollHeight,
			);
		}
	};

	// prevent background scrolling when popup is open
	useEffect(() => {
		if (event) {
			document.body.style.overflow = "hidden";

			if (horiScrollRef.current) horiScrollRef.current.scrollLeft = 0;
			if (vertScrollRef.current) vertScrollRef.current.scrollTop = 0;

			handleHoriScroll();
			handleVertScroll();

			window.addEventListener("resize", handleHoriScroll);
			window.addEventListener("resize", handleVertScroll);
		} else {
			document.body.style.overflow = "unset";

			setCanScrollTop(false);
			setCanScrollBottom(true);
			setCanScrollLeft(false);
			setCanScrollRight(true);
		}

		return () => {
			document.body.style.overflow = "unset";
			
			// for cleanup
			window.removeEventListener("resize", handleHoriScroll);
			window.removeEventListener("resize", handleVertScroll);
		};
	}, [event]);

	if (!event) return null;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4 backdrop-blur-sm"
			onClick={onClose}
		>
			<div
				className="relative grid max-h-[85vh] w-[95vw] max-w-5xl grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl md:h-[600px] md:grid-cols-2"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute right-4 top-2 z-10 font-calsans text-2xl font-bold text-acm-darker-blue/50 transition-colors hover:text-acm-darker-blue"
				>
					✕
				</button>

				<div className="flex h-full w-full items-center justify-center overflow-hidden bg-gray-400">
					{event.imageUrl ? (
						<img
							src={event.imageUrl}
							alt={event.title}
							className="h-full w-full object-cover"
						/>
					) : (
						<div className="px-6 text-center font-mono font-bold text-gray-600">
							No Image Provided
						</div>
					)}
				</div>

				<div className="flex h-full flex-col overflow-hidden p-12">
					<div className="relative flex min-h-0 flex-1 flex-col">
						<div
							ref={vertScrollRef}
							onScroll={handleVertScroll}
							className="flex-1 overflow-y-auto pb-6 no-scrollbar"
						>
							{/* event title */}
							<h2 className="mb-2 break-words font-calsans text-4xl font-bold text-acm-darker-blue">
								{event.title}
							</h2>

							{/* date */}
							<div className="mb-4 space-y-2 font-calsans text-xl font-bold text-acm-darker-blue">
								{/* event date */}
								<h2 className="flex items-center gap-x-2">
									<Calendar
										strokeWidth={2.5}
										size={24}
										className="shrink-0"
									/>
									{event.date
										? new Date(event.date)
												.toLocaleString("en-US", {
													timeZone: "America/Chicago",
													month: "short",
													day: "numeric",
													hour: "numeric",
													minute: "numeric",
												})
												.replace(", ", " @ ")
										: "TBD"}
								</h2>

								{/* event location */}
								<h2 className="flex items-center gap-x-2">
									<MapPin
										strokeWidth={2.5}
										size={24}
										className="shrink-0"
									/>
									{event.location || "TBD"}
								</h2>
							</div>
							{/* events tags */}
							{/* TODO: ask if suborg and event type tags should be separate (2 diff rows) or combined (1 row & scroll, suborg or type first?) */}
							{/* TODO: make suborg tag clickable & take you to suborg page*/}
							<div className="relative mb-6 font-calsans">
								<div
									ref={horiScrollRef}
									onScroll={handleHoriScroll}
									className="flex flex-nowrap gap-2 overflow-x-auto pb-2 pr-12 no-scrollbar"
								>
									{event.tags?.map((tag, index) => (
										<EventTag
											key={index}
											text={tag.label}
											color={tag.color}
											icon={tag.icon}
										/>
									))}
								</div>

								{/* left fade */}
								<div
									className={`pointer-events-none absolute bottom-0 left-0 top-0 w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-150 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
								/>
								{/* right fade */}
								<div
									className={`pointer-events-none absolute bottom-0 right-0 top-0 w-10 bg-gradient-to-l from-white to-transparent transition-opacity duration-150 ${canScrollRight ? "opacity-100" : "opacity-0"}`}
								/>
							</div>

							{/* event description */}
							<h2 className="mb-2 font-calsans text-xl font-bold text-acm-darker-blue">
								Description
							</h2>
							<p className="whitespace-pre-wrap font-mono text-sm">
								{event.description ||
									"No description provided for this event."}
							</p>
						</div>

						{/* top fade */}
						<div
							className={`pointer-events-none absolute left-0 top-0 h-6 w-full bg-gradient-to-b from-white to-transparent transition-opacity duration-300 ${canScrollTop ? "opacity-100" : "opacity-0"}`}
						/>
						{/* bot fade */}
						<div
							className={`pointer-events-none absolute bottom-0 left-0 h-6 w-full bg-gradient-to-t from-white to-transparent transition-opacity duration-300 ${canScrollBottom ? "opacity-100" : "opacity-0"}`}
						/>
					</div>

					<div className="mt-4 flex w-full shrink-0 gap-4">
						<button className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-acm-darker-blue text-white transition-all hover:brightness-75 ">
							{/* stream button */}
							{/* TODO:  links to stream/yt - def a way to direectly link to stream or vod*/}
							<Play
								strokeWidth={2.5}
								size={20}
								className="shrink-0"
							/>
						</button>

						{/* remind button */}
						{/* TODO: link to event in membership portal? or add to google calendar? ask later */}
						<button className="flex-1 rounded-md bg-acm-darker-blue px-6 py-2 font-bold text-white transition-all hover:brightness-75">
							Remind Me
						</button>

						{/* check in button */}
						{/* TODO: link to event in membership portal */}
						<button className="flex-1 rounded-md border-2 border-acm-darker-blue px-6 py-2 font-bold text-acm-darker-blue transition-colors hover:bg-acm-darker-blue/10">
							Check In
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
