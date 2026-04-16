"use client";

import React, { useState, useRef } from "react";
import EventCard from "@/components/events/EventCard";
import EventPopup from "@/components/events/event-card-popup";
import { EventType } from "@/components/events/types";
import { ChevronLeft, ChevronRight, Search, ListFilter } from "lucide-react";

interface EventGridProps {
	allEvents: EventType[];
}

// TODO: be able to swipe/drag to next page?
// TODO: user can swipe through all events instead of clicking pages
export default function EventGridClient({ allEvents }: EventGridProps) {
	// track tabs and
	// only want 6 events per page (for now)
	// maybe change to 4 when calendar is added
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
	const [currentPage, setCurrentPage] = useState(0);
	const eventsPerPage = 6;
	const carouselRef = useRef<HTMLDivElement>(null);

	const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

	const filteredEvents = allEvents.filter(
		(event) => event.status === activeTab,
	);

	const pages = [];
	for (let i = 0; i < filteredEvents.length; i += eventsPerPage) {
		pages.push(filteredEvents.slice(i, i + eventsPerPage));
	}

	const handleTabSwitch = (tab: "upcoming" | "past") => {
		setActiveTab(tab);
		setCurrentPage(0);
		if (carouselRef.current) {
			carouselRef.current.scrollTo({ left: 0, behavior: "auto" });
		}
	};

	const handleScroll = () => {
		if (!carouselRef.current) return;
		const { scrollLeft, clientWidth } = carouselRef.current;
		const newIndex = Math.round(scrollLeft / clientWidth);
		if (newIndex !== currentPage) {
			setCurrentPage(newIndex);
		}
	};

	const scrollToPage = (index: number) => {
		if (!carouselRef.current) return;
		carouselRef.current.scrollTo({
			left: index * carouselRef.current.clientWidth,
			behavior: "smooth",
		});
	};

	return (
		<div className="flex w-full flex-col">
			<div className="mb-8 flex flex-row items-stretch justify-end gap-2">
				{/* search button*/}
				<button
					type="button"
					className="flex aspect-square items-center justify-center rounded-md bg-acm-darker-blue p-2 text-white"
				>
					<Search strokeWidth={2.5} size={20} />
				</button>

				{/* filter button*/}
				<button
					type="button"
					className="flex aspect-square items-center justify-center rounded-md bg-acm-darker-blue p-2 text-white"
				>
					<ListFilter strokeWidth={2.5} size={20} />
				</button>

				{/* upcoming/past tabs */}
				<div className="flex overflow-hidden rounded-md border-2 border-acm-darker-blue font-calsans text-sm font-bold">
					<button
						onClick={() => handleTabSwitch("upcoming")}
						className={`px-6 py-2 transition-colors ${
							activeTab === "upcoming" ? "bg-acm-darker-blue text-white" : "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
						}`}
					>
						Upcoming
					</button>
					<button
						onClick={() => handleTabSwitch("past")}
						className={`px-6 py-2 transition-colors ${
							activeTab === "past" ? "bg-acm-darker-blue text-white" : "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
						}`}
					>
						Past
					</button>
				</div>
			</div>

			{filteredEvents.length === 0 ? (
				<div className="flex h-64 min-h-[800px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-acm-darker-blue/30 font-mono text-2xl font-semibold text-acm-darker-blue">
					No events found.
				</div>
			) : (
				<div className="flex w-full flex-col items-center">
					<div className="flex w-full items-stretch gap-2 sm:gap-1">
						{/* Left Arrow */}
						<button
							onClick={() => scrollToPage(currentPage - 1)}
							disabled={currentPage === 0}
							className="m-2 flex w-16 shrink-0 cursor-pointer items-center justify-center bg-white text-acm-darker-blue transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0"
						>
							<ChevronLeft strokeWidth={2.5} size={50} />
						</button>

						{/* event grid carousel */}
						<div
							ref={carouselRef}
							onScroll={handleScroll}
							className="flex w-full flex-1 snap-x snap-mandatory overflow-x-auto no-scrollbar"
						>
							{pages.map((pageEvents, pageIndex) => (
								<div
									key={pageIndex}
									className="w-full shrink-0 snap-center pb-4"
								>
									<div className="grid w-full grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
										{pageEvents.map((event) => (
											<EventCard
												key={event.id}
												event={event}
												onClick={() => setSelectedEvent(event)
												}
											/>
										))}
									</div>
								</div>
							))}
						</div>

						{/* Right Arrow */}
						<button
							onClick={() => scrollToPage(currentPage + 1)}
							disabled={currentPage === pages.length - 1}
							className="m-2 flex w-16 shrink-0 cursor-pointer items-center justify-center bg-white text-acm-darker-blue transition-opacity duration-300 disabled:pointer-events-none disabled:opacity-0"
						>
							<ChevronRight strokeWidth={2.5} size={50} />
						</button>
					</div>

					{/* page dots */}
					{pages.length > 1 && (
						<div className="mt-8 flex justify-center gap-2">
							{pages.map((_, idx) => (
								<button
									key={idx}
									onClick={() => scrollToPage(idx)}
									aria-label={`Go to page ${idx + 1}`}
									className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
										currentPage === idx ? "bg-acm-darker-blue" : "bg-acm-darker-blue/30 hover:bg-acm-darker-blue/60"
									}`}
								/>
							))}
						</div>
					)}
				</div>
			)}
			<EventPopup
				event={selectedEvent}
				onClose={() => setSelectedEvent(null)}
			/>
		</div>
	);
}
