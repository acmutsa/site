import { Suspense } from "react";
import { HeroNav } from "@/components/shared/navbar";
import type { SearchParams } from "nuqs/server";
import { EventsToolBar } from "./client";
import { getAllCategories } from "@/lib/queries/categories";
import { createLoader } from "nuqs/server";
import { loadSearchParams } from "./params";
import { events } from "db/schema";
import { db } from "db";
import { EventAndCategoriesType } from "@/lib/types/events";
import { getClientTimeZone, getUTCDate } from "@/lib/utils";
import { getRequestContext } from "@cloudflare/next-on-pages";
import Image from "next/image";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/shared/footer";
import Link from "next/link";

export default async function EventsPage(props: {
	searchParams: Promise<SearchParams>;
}) {
	const searchParams = await props.searchParams;
	const categories = getAllCategories();
	const params = await loadSearchParams(searchParams);

	const allEvents = db.query.events
		.findMany({
			with: {
				eventsToCategories: {
					with: {
						category: {
							columns: {
								name: true,
								color: true,
							},
						},
					},
				},
			},
			orderBy: events.start,
		})
		.then((events) => {
			if (params.categories.length > 0) {
				return events.filter((event) => {
					return event.eventsToCategories.some((eventToCategory) => {
						return params.categories.includes(
							eventToCategory.category.name,
						);
					});
				});
			}

			// TODO: implement fuzzy search on sql query

			if (params.query) {
				const searchQuery = params.query.toLowerCase();
				return events.filter((event) => {
					return event.name.toLowerCase().includes(searchQuery);
				});
			}

			return events;
		});

	return (
		<>
			<div className="flex min-h-screen w-full flex-col pb-20 no-scrollbar">
				<HeroNav />
				<div className="flex h-[40vh] w-full items-end justify-start bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center">
					<div className="mx-auto w-full max-w-screen-xl px-10 pb-10">
						<h1 className="font-chillax text-9xl font-black text-white">
							events
						</h1>
					</div>
				</div>
				<div className="mx-auto min-h-[1000px] w-full max-w-screen-xl px-10 pt-10">
					<EventsToolBar availableCategories={categories} />
					<Suspense>
						<CardEventsView
							eventsQuery={allEvents}
							hadFilters={
								params.categories.length > 0 ||
								params.query !== ""
							}
						/>
					</Suspense>
				</div>
			</div>
			<Footer />
		</>
	);
}

async function CardEventsView({
	eventsQuery,
	hadFilters,
}: {
	eventsQuery: Promise<EventAndCategoriesType[]>;
	hadFilters: boolean;
}) {
	const events = await eventsQuery;

	if (events.length === 0) {
		return (
			<div className="flex h-full min-h-[60vh] w-full items-center justify-center pt-10">
				<h1 className="font-calsans text-2xl font-bold text-acm-darker-blue">
					{hadFilters
						? "No events found with the given filters. Please try again with different filters."
						: "We have no events scheduled at the moment. Stay tuned!"}
				</h1>
			</div>
		);
	}

	const timeZone = getClientTimeZone(getRequestContext().cf.timezone);

	const cards = events.map((event) => (
		<EventCard key={event.id} event={event} timezone={timeZone} />
	));

	return (
		<div className="grid grid-cols-1 gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
			{cards}
		</div>
	);
}

function EventCard({
	event,
	timezone,
}: {
	event: EventAndCategoriesType;
	timezone: string;
}) {
	const currentDateUTC = getUTCDate();

	return (
		<Link href={`/events/${event.id}`}>
			<div className="group relative">
				<div className="relative z-10 flex aspect-video cursor-pointer flex-col justify-center gap-y-2 rounded-xl border border-acm-darker-blue bg-white p-5 shadow-none">
					<div className="flex h-[75px] w-[75px] items-center justify-center">
						<Image
							src={event.thumbnailUrl}
							alt={event.name}
							width={75}
							height={75}
							className="rounded-lg"
						/>
					</div>
					<h1 className="truncate font-calsans text-2xl font-bold text-acm-tinted-black">
						{event.name}
					</h1>
					<div>
						<p className="flex items-center gap-x-1 font-calsans text-sm text-acm-tinted-black">
							<Calendar strokeWidth={2.5} size={15} />
							{event.start.toLocaleString("en-US", {
								timeZone: timezone,
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "numeric",
							})}
						</p>
						<p className="flex items-center gap-x-1 font-calsans text-sm text-acm-tinted-black">
							<MapPin strokeWidth={2.5} size={15} />
							{event.location}
						</p>
					</div>
					<div className="flex items-center gap-x-2">
						{event.eventsToCategories.map((cat) => {
							return (
								<Badge
									style={{
										backgroundColor: cat.category.color,
									}}
									key={cat.category.name}
								>
									{cat.category.name}
								</Badge>
							);
						})}
					</div>
				</div>
				<div className="absolute bottom-0 left-0 right-0 top-0 translate-x-2 translate-y-2 overflow-hidden rounded-xl bg-acm-darker-blue transition-transform duration-200 ease-in-out group-hover:translate-x-3 group-hover:translate-y-3"></div>
			</div>
		</Link>
	);
}

export const runtime = "edge";
