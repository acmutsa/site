"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { useMemo, useState } from "react";
import OrbitCarousel from "./orbit-carousel";
import { TEAM_GROUPS } from "./team.data";
import type { TeamGroup, TeamKey } from "./types";

export default function MeetTheTeamClient() {
	const groups = TEAM_GROUPS;

	const defaultKey: TeamKey = "acm_general";
	const [activeKey, setActiveKey] = useState<TeamKey>(defaultKey);

	const activeGroup: TeamGroup | undefined = useMemo(
		() => groups.find((g) => g.key === activeKey),
		[groups, activeKey],
	);

	return (
		<div className="w-full">
			{/* clickable “acm | acm-w | …” */}
			<Tabs.Root value={activeKey} onValueChange={(v) => setActiveKey(v as TeamKey)}>
				<Tabs.List className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-acm-darker-blue/30 pb-4">
					{groups.map((g, idx) => (
						<div key={g.key} className="flex items-center gap-x-3">
							<Tabs.Trigger
								value={g.key}
								className="font-calsans text-2xl font-extrabold text-acm-darker-blue/40 transition hover:text-acm-darker-blue data-[state=active]:text-acm-darker-blue"
							>
								{g.label}
							</Tabs.Trigger>
							{idx !== groups.length - 1 ? (
								<span className="select-none font-calsans text-2xl font-bold text-acm-darker-blue/25">
									|
								</span>
							) : null}
						</div>
					))}
				</Tabs.List>

				{/* One carousel that swaps data */}
				<div className="mt-8">
					<OrbitCarousel
						title={activeGroup?.label ?? "team"}
						members={activeGroup?.members ?? []}
					/>
				</div>
			</Tabs.Root>
		</div>
	);
}
