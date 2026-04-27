"use client";

import { useState } from "react";
import { EventType } from "@/components/events/types";
import EventPopup from "@/components/events/event-card-popup";
import EventGridClient from "@/components/events/event-grid-client";
import EventCalendar from "@/components/events/EventCalendar";

// FIXME: spacing between calendar and grid - i feel like the arrows look weird with the grid

interface Props {
	allEvents: EventType[];
}

export default function EventsClientWrapper({ allEvents }: Props) {
	const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

	return (
		<>
			<div className="mx-auto mt-12 flex w-full max-w-screen-xl flex-col gap-8 pb-24 lg:flex-row lg:items-stretch">
				
				{/* calendar */}
				<div className="flex w-full flex-col lg:w-1/2">
					<div className="mb-8 hidden h-10 w-full shrink-0 lg:block" />
					
					<div className="flex w-full flex-1">
						<EventCalendar
							allEvents={allEvents}
							onEventClick={setSelectedEvent}
						/>
					</div>
				</div>

				{/* events grid */}
				<div className="w-full lg:w-1/2">
					<EventGridClient
						allEvents={allEvents}
						onEventClick={setSelectedEvent}
					/>
				</div>
			</div>

			{/* event popup */}
			<EventPopup
				event={selectedEvent}
				onClose={() => setSelectedEvent(null)}
			/>
		</>
	);
}