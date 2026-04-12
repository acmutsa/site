import { HeroNav } from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import EventGridClient from "@/components/events/event-grid-client";

/* TODO:
 *  ̶m̶a̶k̶e̶ ̶e̶v̶e̶n̶t̶ ̶c̶a̶r̶d̶ ̶c̶o̶m̶p̶o̶n̶e̶n̶t̶ and connect to calendar

 *  make event card popup component and connect to event card
 *    links to membership portal
 *    links to stream/yt - def a way to direectly link to stream or vod
 *    use suborg hero or sumn for event popup - suborg tags
 * 
 * upcoming & past events sections
 * 
 * figure out calendar - will probably save for last..
 * 
 * maybe add ONGOING sticker for events that are currently happening?
 * 
 * make everything rounded?
 */

// for testing
const dummyEvents = [
    { id: 1, title: "ACM-W Workshop", date: "Apr 24 @ 5:00 PM", location: "NPB", status: "upcoming" },
    { id: 2, title: "ITT: Game Dev", date: "Apr 25 @ 6:00 PM", location: "NPB", status: "upcoming" },
    { id: 3, title: "ICPC", date: "Apr 26 @ 12:00 PM", location: "NPB 01.114", status: "upcoming" },
    { id: 4, title: "Painting Social", date: "Apr 27 @ 10:00 AM", location: "Student Union", status: "upcoming" },
    { id: 5, title: "Movie Social", date: "Apr 28 @ 8:00 PM", location: "Retama", status: "upcoming" },
    { id: 6, title: "RC Workathon", date: "Apr 29 @ 2:00 PM", location: "NPB", status: "upcoming" },
    { id: 7, title: "CiC Workshop", date: "Apr 30 @ 5:00 PM", location: "NPB", status: "upcoming" }, 
    
    // { id: 8, title: "Rowdy CyberCon", date: "Apr 11 @ 4:00 PM", location: "SP1", status: "past" },
    // { id: 9, title: "Rec Field Social", date: "Apr 3 @ 5:00 PM", location: "Field 2", status: "past" },
];

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

				<div className="mx-auto mt-12 w-full max-w-screen-xl pb-24">
					{/* map events later T-T */}
					<EventGridClient allEvents={dummyEvents} />
				</div>
			</div>
			<Footer orgName="ACM UTSA" />
		</>
	);
}
