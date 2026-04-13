import React from "react";

interface EventTagProps {
    text: string;
    icon?: React.ReactNode;
    color?: string;
}

export default function EventTag({ 
    text, 
    icon, 
    color = "#266BE8"
}: EventTagProps) {
    return (
        <span 
            className="inline-flex shrink-0 whitespace-nowrap items-center rounded-full px-3 py-1 text-sm font-bold text-white"
            style={{ backgroundColor: color }}
        >
            {icon && <span className="mr-1.5 flex items-center justify-center">{icon}</span>}
            <span>{text}</span>
        </span>
    );
}