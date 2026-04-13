"use client";

import React, { useState } from "react";
import EventCard from "@/components/events/EventCard";
import EventPopup from "@/components/events/event-card-popup";

export interface EventType {
	id: number;
	title: string;
	date: string;
	location: string;
	status: string;
    description?: string;
	imageUrl?: string;
}

interface EventGridProps {
	allEvents: EventType[];
}

export default function EventGridClient({ allEvents }: EventGridProps) {
	// track tabs and page
	// only want 6 events per page (for now)
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
	const [currentPage, setCurrentPage] = useState(1);
	const eventsPerPage = 6;

	const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

	const filteredEvents = allEvents.filter(
		(event) => event.status === activeTab,
	);

	const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
	const startIndex = (currentPage - 1) * eventsPerPage;
	const endIndex = startIndex + eventsPerPage;
	const currentEvents = filteredEvents.slice(startIndex, endIndex);

	const handleTabSwitch = (tab: "upcoming" | "past") => {
		setActiveTab(tab);
		setCurrentPage(1); // reset to page 1 when switching tabs
	};

	return (
		<div className="flex w-full flex-col">
			{/* button/tabs */}
			<div className="mb-8 flex w-fit self-end border-2 border-acm-darker-blue font-mono text-sm font-bold">
				<button
					onClick={() => handleTabSwitch("upcoming")}
					className={`px-6 py-2 transition-colors ${
						activeTab === "upcoming"
							? "bg-acm-darker-blue text-white"
							: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
					}`}
				>
					Upcoming
				</button>
				<button
					onClick={() => handleTabSwitch("past")}
					className={`px-6 py-2 transition-colors ${
						activeTab === "past"
							? "bg-acm-darker-blue text-white"
							: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
					}`}
				>
					Past
				</button>
			</div>

			{/* event grid */}
			{filteredEvents.length === 0 ? (
				<div className="flex h-64 min-h-[800px] w-full items-center justify-center border-2 border-dashed border-acm-darker-blue/30 font-mono text-2xl font-semibold text-acm-darker-blue">
					No events found.
				</div>
			) : (
				<div className="flex w-full flex-col items-end">
					<div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{currentEvents.map((event) => (
							<EventCard
								key={event.id}
								title={event.title}
								date={event.date}
								location={event.location}
								status={event.status}
								description={event.description}
								imageUrl={event.imageUrl}
								onClick={() => setSelectedEvent(event)}
							/>
						))}
					</div>

					{/* for more than 1 page */}
					{totalPages > 1 && (
						<div className="mt-10 flex gap-1 font-mono text-lg font-bold">
							{Array.from({ length: totalPages }, (_, index) => {
								const pageNum = index + 1;
								return (
									<button
										key={pageNum}
										onClick={() => setCurrentPage(pageNum)}
										className={`border-2 border-acm-darker-blue px-3 py-1 transition-colors ${
											currentPage === pageNum
												? "bg-acm-darker-blue text-white"
												: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
										}`}
									>
										{pageNum}
									</button>
								);
							})}
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
