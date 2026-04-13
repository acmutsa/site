import { EventType } from "@/components/events/types";
import { EVENT_TAGS } from "@/components/events/types";
import { SUBORGS } from "@/site.config";

export const DUMMY_EVENTS: EventType[] = [
    { 
        id: 0, 
        title: "ACM-W Workshop", 
        date: "Apr 24 @ 5:00 PM", 
        location: "NPB", 
        status: "upcoming",
        description: "Join ACM-W for a technical workshop focused on career development and tech skills.",
        tags: [EVENT_TAGS.ACMW, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 1, 
        title: "ITT: Game Dev", 
        date: "Apr 25 @ 6:00 PM", 
        location: "NPB", 
        status: "upcoming",
        description: "Explore the world of game development with ITT.",
        tags: [EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 2, 
        title: "ICPC", 
        date: "Apr 26 @ 12:00 PM", 
        location: "NPB 01.114", 
        status: "upcoming",
        description: "jdfjskdhfkj2342342rferetCompetitive programming practice session. ".repeat(30), // testing overflow
        tags: [EVENT_TAGS.ICPC, EVENT_TAGS.WORKSHOP, EVENT_TAGS.WORKSHOP, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB, EVENT_TAGS.CB]
    },
    { 
        id: 3, 
        title: "Painting Social", 
        date: "Apr 27 @ 10:00 AM", 
        location: "Student Union", 
        status: "upcoming",
        description: "Relaxing painting session.",
        tags: [EVENT_TAGS.SOCIAL, EVENT_TAGS.CB, EVENT_TAGS.HACKATHON]
    },
    { 
        id: 4, 
        title: "Movie Social", 
        date: "Apr 28 @ 8:00 PM", 
        location: "Retama", 
        status: "upcoming",
        description: "Join us for a movie night! " + "more words ".repeat(100), // testing overflow
    },
    { 
        id: 5, 
        title: "RC Workathon", 
        date: "Apr 29 @ 2:00 PM", 
        location: "NPB", 
        status: "upcoming",
        tags: [EVENT_TAGS.RC, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 6, 
        title: "CiC Workshop", 
        date: "Apr 30 @ 5:00 PM", 
        location: "NPB", 
        status: "upcoming",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.WORKSHOP]
    },
    { 
        id: 7, 
        title: "CiC Workshop 2", 
        date: "Apr 30 @ 5:00 PM", 
        location: "NPB", 
        status: "upcoming",
    }, 
    { 
    id: 8, 
    title: "Empty Event", 
    date: "",
    location: "", 
    status: "upcoming",
    description: "" 
    },

    // past events testing
    { 
        id: 9, 
        title: "Rowdy CyberCon", 
        date: "Apr 11 @ 4:00 PM", 
        location: "SP1", 
        status: "past",
        description: "",
        tags: [{label: "CyberJedis", color: "#233a70"}, // testing custom tags 
            {label: "WiCys", color: "#762c96"},
            EVENT_TAGS.HACKATHON, EVENT_TAGS.CB]
    },
    { 
        id: 10, 
        title: "Rec Field Social", 
        date: "Apr 3 @ 5:00 PM", 
        location: "Field 2", 
        status: "past",
        description: "",
        tags: [EVENT_TAGS.CIC, EVENT_TAGS.SOCIAL]
    },
];