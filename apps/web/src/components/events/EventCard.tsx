import React from "react";

interface EventCardProps {
    title: string;
    date: string;
    location: string;
    status: string;
    imageUrl?: string;
}

export default function EventCard({ title, date, location, imageUrl }: EventCardProps) {
    return (
        <div className="m-auto flex w-64 flex-col gap-1 bg-gray-200 pb-1">

            <div className="relative aspect-square w-full bg-gray-400 overflow-hidden">
                {imageUrl && (
                    <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                )}
            </div>
        
            <div className="flex flex-col gap-1 px-2">
                <h2 className="font-mono font-semibold text-acm-darker-blue">
                    {title}
                </h2>

                {/* implement ISO date formatting later*/}
                <p className="text-sm font-mono text-acm-darker-blue">
                    {date}
                </p>
                <p className="text-sm font-mono text-acm-darker-blue">
                    {location}
                </p>
            </div>
        </div>
    );
}