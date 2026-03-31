import { HeroNav } from "@/components/shared/navbar";

export default function EventsPage() {
    return (
        <>
            <HeroNav navVariant="blueForeground" />
            <div className="h-28 w-full" />
            
                        <main className="mx-auto w-full max-w-screen-xl px-10 pb-24">

                            <h1 className="font-chillax text-6xl font-black tracking-tight text-acm-darker-blue md:text-8xl">
                                {/* i kind of like 'explore our events.' but open to suggestions */}
                                see what’s happening.
                            </h1>
            
                            <p className="mt-4 max-w-[850px] font-mono text-sm font-semibold text-acm-darker-blue/70">
                                Discover ways to meet, collaborate, and grow through our community-driven events.
                            </p>

                        </main>
        </>
    )
}