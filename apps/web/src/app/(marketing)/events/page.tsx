import { HeroNav } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { DUMMY_EVENTS } from "@/components/events/dummy-events";
import EventCalendar from "@/components/events/EventCalendar";
import EventsClientWrapper from "@/components/events/events-client-wrapper";

// TODO: maybe add ONGOING sticker for events that are currently happening?
// FIXEME: edit spacing between all the stuff

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

				<div className="mx-auto mt-12 flex w-full max-w-screen-xl flex-col gap-8 pb-24 lg:flex-row lg:items-stretch">
					<EventsClientWrapper allEvents={DUMMY_EVENTS} />
				</div>
			</div>
			<Footer orgName="ACM UTSA" />
		</>
	);
}
