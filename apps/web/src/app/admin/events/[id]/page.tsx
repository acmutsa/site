import { getEventById, getEventCheckins } from "@/lib/queries/events";

export default async function Page(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const event = await getEventById(params.slug);
    const checkins = await getEventCheckins(params.slug);

    return (
		<div>
			<h1 className="text-3xl">{event?.name}</h1>
			<div>
				{checkins.map((checkin) => (
					<div>
						User {checkin.userID} checked in at{" "}
						{checkin.time.toDateString()}
					</div>
				))}
			</div>
		</div>
	);
}
