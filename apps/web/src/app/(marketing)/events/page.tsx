import { HeroNav } from "@/components/shared/navbar";

// TODO: use suborg hero or sumn for event popup - suborg tags
// make event card component and connect to calendar
// make event card popup component and connect to event card
//    links to membership portal
//    links to stream/yt - def a way to direectly link to stream or vod
// upcoming & past events sections
// figure out calendar - will probably save for last..

export default function EventsPage() {
    return (
        <>
            <HeroNav navVariant="blueForeground" />
            <div className="h-28 w-full" />
            
                        <main className="mx-auto w-full max-w-screen-xl px-10 pb-24">

                            <h1 className="font-chillax text-6xl font-black tracking-tight text-acm-darker-blue md:text-8xl">
                                {/* change header text?
                                  * i kind of like 'explore our events.' but open to suggestions
                                */}
                                see what's happening.
                            </h1>
            
                            <p className="mt-4 max-w-[850px] font-mono text-sm font-semibold text-acm-darker-blue/70">
                                Discover ways to meet, collaborate, and grow through our community-driven events.
                            </p>

                        </main>
        </>
    )
}