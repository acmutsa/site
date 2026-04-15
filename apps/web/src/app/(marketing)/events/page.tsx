import { HeroNav } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import EventGridClient from "@/components/events/event-grid-client";
import { DUMMY_EVENTS } from "@/components/events/dummy-events";

// TODO: connect event to calendar
// TODO:figure out calendar - will probably save for last..
// TODO: maybe add ONGOING sticker for events that are currently happening?
// TODO: make filtering system using tags and be able to search for events w/ search bar

// TODO: fix stuff for phone layout
export default function EventsPage() {
	return (
		<>
			<HeroNav navVariant="blueForeground" />
			<div className="h-28 w-full" />

			<div className="mx-auto w-full max-w-screen-xl px-10 pb-24">
				<h1 className="font-chillax text-6xl font-black tracking-tight text-acm-darker-blue md:text-8xl">
					{/* change header text?
					 * i kind of like 'explore our events.' but open to suggestions
					 */}
					see what's happening.
				</h1>

				<p className="mt-4 max-w-[850px] font-mono text-sm font-semibold text-acm-darker-blue/70">
					Discover ways to meet, collaborate, and grow through our
					community-driven events.
				</p>

                {/* 
                TODO: move all this to the right when calendar is made
                TODO: make fixed sized so that page doesnt squish when only 1 row of events
                */}
				<div className="mx-auto mt-12 w-full max-w-screen-xl pb-24">
					<EventGridClient allEvents={DUMMY_EVENTS} />
				</div>
			</div>
			<Footer orgName="ACM UTSA" />
		</>
	);
}
