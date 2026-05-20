import { SUBORGS } from "@/site.config";

export interface EventTag {
    label: string;
    color: string;
    icon?: string;
}

export const EVENT_TAGS = {
    // event type
    SOCIAL: {
        label: "Social",
        color: "#266BE8",
    },
    WORKSHOP: {
        label: "Workshop",
        color: "#266BE8",
    },
    CB: {
        label: "Career Building",
        color: "#266BE8",
    },
    HACKATHON: {
        label: "Hackathon",
        color: "#266BE8",
    },

    // suborgs
    // TODO: edit icons for icpc and rowdycreators - remove text
    ACMW: { 
        label: "ACM W", 
        color: SUBORGS.acmw.colors.poppy,
        icon: SUBORGS.acmw.logoUrl
    },
    RC: { 
        label: "Rowdy Creators", 
        color: SUBORGS.rowdycreators.colors.poppy, 
        icon: SUBORGS.rowdycreators.logoUrl
    },
    ICPC: { 
        label: "ICPC", 
        color: SUBORGS.acmicpc.colors.poppy,
        icon: SUBORGS.acmicpc.logoUrl
    },
    CIC: { 
        label: "CiC", 
        color: SUBORGS.codingincolor.colors.poppy, 
        icon: SUBORGS.codingincolor.logoUrl
    },
    ROWDYHACKS: { 
        label: "RowdyHacks", 
        color: SUBORGS.rowdyhacks.colors.poppy,
        icon: SUBORGS.rowdyhacks.logoUrl 
    },
} as const;

export interface EventType {
    id: number | string;
    title: string;
    date?: string;
    location?: string;
    status: "upcoming" | "past";
    description?: string;
    imageUrl?: string;
    tags?: EventTag[];
    streamUrl?: string;
}