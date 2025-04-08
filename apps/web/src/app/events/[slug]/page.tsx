import EventDetails from "@/components/events/id/EventDetails";
import Navbar, { HeroNav } from "@/components/shared/navbar";
import { Suspense } from "react";
import { headers } from "next/headers";
import { eq } from "db/drizzle";
import { db } from "db";
import { events } from "db/schema";
import Image from "next/image";
import { notFound } from "next/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { getClientTimeZone } from "@/lib/utils";
import {
	MapPin as MapPinIcon,
	ArrowUpRight,
	CalendarDays as CalendarDaysIcon,
	Trophy as TrophyIcon,
} from "lucide-react";
import { isAfter } from "date-fns";
import Footer from "@/components/shared/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import EventLocationMap from "./client";
import { fuzzyFindLocation } from "@/lib/shared/geo";

export default async function Page(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const userAgent = (await headers()).get("user-agent")?.toLowerCase();
	const isBroswerSafari =
		(userAgent?.includes("safari") &&
			!userAgent?.includes("crios") &&
			!userAgent.includes("chrome")) ||
		false;

	const event = await db.query.events.findFirst({
		where: eq(events.id, params.slug),
	});

	if (!event) {
		return notFound();
	}

	const location = fuzzyFindLocation(event.location);

	return (
		<>
			<HeroNav navVariant="blueForeground" />
			<div className="mx-auto flex min-h-screen w-screen max-w-screen-xl px-10 pb-20 pt-36 text-acm-tinted-black no-scrollbar">
				<div className="grid w-full grid-cols-[330px_1fr] gap-8">
					<div className="flex flex-col">
						<div className="flex max-h-[330px] max-w-[330px] items-center justify-center overflow-hidden rounded-lg shadow-2xl">
							<Image
								src={event.thumbnailUrl}
								alt={event.name}
								width={330}
								height={330}
							/>
						</div>
					</div>
					<div className="flex flex-col gap-y-5">
						<h1 className="pb-5 font-calsans text-6xl font-bold text-acm-darker-blue">
							{event.name}
						</h1>
						<div className="flex flex-col gap-y-2">
							<CalendarWidget
								startDate={event.start}
								endDate={event.end}
							/>
							<LocationWidget location={event.location} />
						</div>
						<EventInteractionCard
							start={event.start}
							end={event.end}
							checkinStart={event.checkinStart}
							checkinEnd={event.checkinEnd}
							points={event.points}
						/>
						<div>
							<h3 className="pb-2 font-calsans text-xl font-bold text-acm-darker-blue">
								About The Event
							</h3>
							<p className="text-balance text-start font-mono text-sm text-acm-tinted-black">
								{event.description}
							</p>
						</div>
						{location.found ? (
							<div className="max-w-[600px]">
								<h3 className="pb-2 font-calsans text-xl font-bold text-acm-darker-blue">
									Location
								</h3>
								<div className="overflow-hidden rounded-lg">
									<Suspense>
										<EventLocationMap
											coords={{
												latitude:
													location.data.latitude,
												longitude:
													location.data.longitude,
											}}
										/>
									</Suspense>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}

function CalendarWidget({
	startDate,
	endDate,
}: {
	startDate: Date;
	endDate: Date;
}) {
	const clientTimeZone = getClientTimeZone();

	const monthAbrevs = [
		"JAN",
		"FEB",
		"MAR",
		"APR",
		"MAY",
		"JUN",
		"JUL",
		"AUG",
		"SEP",
		"OCT",
		"NOV",
		"DEC",
	];

	return (
		<div className="flex items-center gap-2">
			<div className="aspect-square size-12 rounded-lg border border-acm-darker-blue/40">
				<div className="flex h-[35%] items-center justify-center bg-acm-darker-blue/20">
					<p className="text-center font-calsans text-[.6rem] tracking-wider text-acm-darker-blue">
						{monthAbrevs[startDate.getMonth()]}
					</p>
				</div>
				<div className="flex h-[65%] items-center justify-center">
					<p className="text-center font-calsans text-xl font-bold text-acm-darker-blue">
						{startDate.getDate()}
					</p>
				</div>
			</div>
			<div className="flex h-full flex-col">
				<p className="text-md font-bold text-acm-darker-blue">
					{formatInTimeZone(
						startDate,
						clientTimeZone,
						"EEEE, MMMM d, yyyy",
					)}
				</p>
				<p className="ml-[2px] text-xs font-semibold text-acm-tinted-black">
					{`${formatInTimeZone(startDate, clientTimeZone, "h:mm a")} - ${formatInTimeZone(endDate, clientTimeZone, "h:mm a")}`}
				</p>
			</div>
		</div>
	);
}

function LocationWidget({ location }: { location: string }) {
	return (
		<div className="flex items-center gap-2">
			<div className="flex aspect-square size-12 items-center justify-center rounded-lg border border-acm-darker-blue/40">
				<MapPinIcon size={25} className=" text-acm-darker-blue" />
			</div>
			<div className="flex h-full flex-col">
				<p className="text-md font-bold text-acm-darker-blue">
					{location}
				</p>
				<p className="ml-[2px] flex cursor-pointer items-center text-xs font-semibold text-acm-tinted-black underline">
					View on map <ArrowUpRight size={15} />
				</p>
			</div>
		</div>
	);
}

function EventInteractionCard({
	start,
	end,
	checkinStart,
	checkinEnd,
	points,
}: {
	start: Date;
	end: Date;
	checkinStart: Date;
	checkinEnd: Date;
	points: number;
}) {
	type timeStatus = "before" | "during" | "after";

	const tz = getClientTimeZone();

	const eventStatus: timeStatus = isAfter(new Date(), start)
		? isAfter(new Date(), end)
			? "after"
			: "during"
		: "before";

	const checkinStatus: timeStatus = isAfter(new Date(), checkinStart)
		? isAfter(new Date(), checkinEnd)
			? "after"
			: "during"
		: "before";

	const eventStatusTitle =
		eventStatus === "before"
			? "Coming Up"
			: eventStatus === "during"
				? "Happening Now"
				: "Past Event";

	const eventStatusText =
		eventStatus === "before"
			? "This event has not started yet."
			: eventStatus === "during"
				? "This event is happening right now!"
				: "This event has already occured.";

	const checkinStatusText =
		checkinStatus === "before"
			? "Check-in has not started yet."
			: checkinStatus === "during"
				? "Check-in is happening right now!"
				: "Check-in has already ended. If you need to check in, please contact the event organizer!";

	return (
		<div className="flex max-w-[600px] flex-col rounded-lg bg-white drop-shadow-xl">
			<div className="rounded-t-lg bg-acm-darker-blue p-2">
				<h3 className="font-calsans text-sm font-bold text-white">
					Check-in
				</h3>
			</div>
			<div className="flex w-full flex-col gap-y-2 p-5">
				<div className="flex items-center">
					<div className="flex rounded-lg bg-acm-darker-blue/20 p-2">
						<CalendarDaysIcon
							size={25}
							className="text-acm-darker-blue"
							strokeWidth={2.5}
						/>
					</div>
					<div className="flex flex-col pl-2">
						<h3 className="font-calsans text-sm font-bold text-acm-darker-blue">
							{eventStatusTitle}
						</h3>
						<p className="text-xs font-semibold text-acm-tinted-black">
							{eventStatusText}
						</p>
					</div>
				</div>
				<div className="flex items-center">
					<div className="flex rounded-lg bg-acm-darker-blue/20 p-2">
						<TrophyIcon
							size={25}
							className="text-acm-darker-blue"
							strokeWidth={2.5}
						/>
					</div>
					<div className="flex flex-col pl-2">
						<h3 className="font-calsans text-sm font-bold text-acm-darker-blue">
							{`${points} Point${points === 1 ? "" : "s"}`}
						</h3>
						<p className="text-xs font-semibold text-acm-tinted-black">
							{`This event is worth ${points} membership point${points === 1 ? "" : "s"}.`}
						</p>
					</div>
				</div>
				<div className="my-2 border-t border-acm-darker-blue" />
				<div className="flex flex-col gap-y-2">
					<p className="text-md text-acm-tinted-black">
						{checkinStatusText}
					</p>
					<Link href={"/checkin"} className="w-full">
						<Button
							disabled={checkinStatus !== "during"}
							variant={"styleized-blue-darker"}
							className="w-full"
						>
							Check-in
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

export const runtime = "edge";
