import React, { useEffect, useRef, useState } from "react";
import { EventType } from "@/components/events/types";
import EventTag from "@/components/events/EventTag";

interface EventPopupProps {
	event: EventType | null;
	onClose: () => void;
}

// TODO: figure what to do if event title too long
// TODO: link play button to yt or directy to event vod/stream
// TODO: add transition to popup open/close - use same animation as navbar?
// TODO: able to go to next or previous event in popup without closing and reopening? button/swipe ask later

//TODO: be able to scroll through page if title is too long - add fade at top and bottom when scrollable
export default function EventPopup({ event, onClose }: EventPopupProps) {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	// L/R scrolling
	const handleScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(
				Math.ceil(scrollLeft + clientWidth) < scrollWidth,
			);
		}
	};

	// top/bot scrolling
	const descScrollRef = useRef<HTMLDivElement>(null);
	const [canScrollTop, setCanScrollTop] = useState(false);
	const [canScrollBottom, setCanScrollBottom] = useState(true);

	const handleDescScroll = () => {
		if (descScrollRef.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				descScrollRef.current;
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
            
            if (scrollContainerRef.current) scrollContainerRef.current.scrollLeft = 0;
            if (descScrollRef.current) descScrollRef.current.scrollTop = 0;

            // check when popup opens
            handleScroll();
            handleDescScroll(); 
            window.addEventListener("resize", handleScroll);
            window.addEventListener("resize", handleDescScroll);
        } else {
            document.body.style.overflow = "unset";
            
            // reset states when popup is closed
            setCanScrollTop(false);
            setCanScrollBottom(true);
            setCanScrollLeft(false);
            setCanScrollRight(true);
        }

        return () => {
            document.body.style.overflow = "unset";
            // for cleanup
            window.removeEventListener("resize", handleScroll);
            window.removeEventListener("resize", handleDescScroll);
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

				<div className="flex h-full w-full items-center justify-center bg-gray-200">
					<div className="px-6 text-center font-mono text-gray-500">
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
                        <div className="font-calsans text-gray-500 text-center px-6">
                            No Image Provided
                        </div>
                    )}
                </div>
                */}

				<div className="flex h-full flex-col overflow-hidden p-12">
					<div className="shrink-0">
						<h2 className="mb-2 text-4xl font-calsans font-bold text-acm-darker-blue">
							{event.title}
						</h2>

						<div className="mb-4 space-y-2 text-xl font-calsans font-bold text-acm-darker-blue">
							{/* change to images/icons later */}
							<h2>◷ {event.date || "TBD"}</h2>
							<h2>⚲ {event.location || "TBD"}</h2>
						</div>

						{/* TODO: ask if suborg and event type tags should be separate (2 diff rows) or combined (1 row & scroll, suborg or type first?) */}
						{/* TODO: make suborg tag clickable & take you to suborg page*/}
						<div className="relative mb-2 font-calsans">
							<div
								ref={scrollContainerRef}
								onScroll={handleScroll}
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

							{/* left */}
							{/* dude the transition duration is bugging me so much */}
							<div
								className={`pointer-events-none absolute bottom-0 left-0 top-0 w-10 bg-gradient-to-r from-white to-transparent transition-opacity duration-150 ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
							/>
							{/* right */}
							<div
								className={`pointer-events-none absolute bottom-0 right-0 top-0 w-10 bg-gradient-to-l from-white to-transparent ${canScrollRight ? "opacity-100" : "opacity-0"}`}
							/>
						</div>

						<h2 className="mb-2 text-xl font-calsans font-bold text-acm-darker-blue">
							Description
						</h2>
					</div>
					<div className="relative mb-6 flex min-h-0 flex-1 flex-col">
						<div
							ref={descScrollRef}
							onScroll={handleDescScroll}
							className="flex-1 overflow-y-auto no-scrollbar"
						>
							<p className="font-mono text-sm">
								{event.description ||
									"No description provided for this event."}
							</p>
						</div>

						{/* top */}
						<div className={`pointer-events-none absolute left-0 top-0 h-6 w-full bg-gradient-to-b from-white to-transparent transition-opacity duration-300 ${canScrollTop ? "opacity-100" : "opacity-0"}`}/>
						{/* bot */}
						<div className={`pointer-events-none absolute left-0 bottom-0 h-6 w-full bg-gradient-to-t from-white to-transparent ${canScrollBottom ? "opacity-100" : "opacity-0"}`}/>
					</div>

					<div className="flex w-full shrink-0 gap-4">
						<button className="flex h-12 w-14 shrink-0 items-center justify-center rounded-md bg-acm-darker-blue text-white transition-all hover:brightness-75">
							▶
							{/* TODO: change to image/icon later? links to stream/yt - def a way to direectly link to stream or vod*/}
						</button>
						<button className="flex-1 bg-acm-darker-blue px-6 py-2 rounded-md font-bold text-white transition-all hover:brightness-75">
							Remind Me{" "}
							{/* TODO: link to event in membership portal? or add to google calendar? ask later */}
						</button>
						<button className="flex-1 border-2 border-acm-darker-blue px-6 py-2 rounded-md font-bold text-acm-darker-blue transition-colors hover:bg-acm-darker-blue/10">
							Check In{" "}
							{/* TODO: link to event in membership portal */}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
