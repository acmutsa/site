import React from "react";

interface EventTagProps {
    text: string;
    icon?: string;
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
            {icon && <img src={icon} alt={text} style={{ filter: 'brightness(0) invert(1)' }} className="mr-1.5 h-4 w-4 object-contain" />}
            <span>{text}</span>
        </span>
    );
}