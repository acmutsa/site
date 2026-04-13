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
    // TODO: add icons/logos for suborgs
    ACMW: { 
        label: "ACM-W", 
        color: SUBORGS.acmw.colors.poppy 
    },
    RC: { 
        label: "Rowdy Creators", 
        color: SUBORGS.rowdycreators.colors.poppy 
    },
    ICPC: { 
        label: "ICPC", 
        color: SUBORGS.acmicpc.colors.poppy},
    CIC: { 
        label: "CiC", 
        color: SUBORGS.codingincolor.colors.poppy 
    },
    ROWDYHACKS: { 
        label: "RowdyHacks", 
        color: SUBORGS.rowdyhacks.colors.poppy 
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
}