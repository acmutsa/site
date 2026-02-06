"use client";

import { useMemo, useState } from "react";
import OrbitCarousel, { type OrbitPerson } from "@/components/team/orbit-carousel";
import { TEAM_GROUPS } from "@/components/team/team.data";

const TABS = [
  "faculty sponsors",
  "acm",
  "acm-w",
  "rowdy creators",
  "coding in color",
  "rowdyhacks",
  "code quantum",
  "rowdy cybercon",
] as const;

type Tab = (typeof TABS)[number];

export default function MeetTheTeamClient() {
  const [activeTab, setActiveTab] = useState<Tab>("acm");

  const people: OrbitPerson[] = useMemo(() => {
    const group = TEAM_GROUPS.find((g) => g.label === activeTab);
    if (!group) return [];

    return group.members.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      org: group.label,
      imageUrl: m.imageUrl,

      // ✅ THIS is the missing piece
      socials: m.socials,
    }));
  }, [activeTab]);

  return (
    <div className="mx-auto w-full max-w-screen-xl pb-24 pt-16">
      <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-calsans text-2xl font-bold">
        {TABS.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`transition ${
              activeTab === tab
                ? "text-acm-blue"
                : "text-acm-darker-blue/35 hover:text-acm-darker-blue/60"
            }`}
          >
            {tab}
            {idx < TABS.length - 1 ? (
              <span className="ml-3 text-acm-darker-blue/25">|</span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="mt-8 h-px w-full bg-acm-darker-blue/15" />

      <div className="mt-10">
        {people.length ? (
          <OrbitCarousel people={people} initialIndex={0} />
        ) : (
          <div className="rounded-3xl border border-acm-darker-blue/10 bg-white p-10">
            <div className="font-calsans text-2xl font-black text-acm-darker-blue">
              No members yet
            </div>
            <div className="mt-2 font-mono text-sm font-semibold text-acm-darker-blue/60">
              Add people to the{" "}
              <span className="text-acm-darker-blue/80">{activeTab}</span> group
              in{" "}
              <span className="text-acm-darker-blue/80">team.data.ts</span>.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
