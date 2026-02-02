export type TeamKey =
	| "faculty_sponsor"
	| "acm_general"
	| "acm-w"
	| "rowdy_creators"
	| "coding_in_color"
	| "rowdy_hacks"
	| "code_quantum"
	| "rowdy_cybercon";

export type TeamMember = {
	id: string;
	name: string;
	role?: string;
	imageUrl: string; // must be a public path, e.g. /officer_photos/acm_general/miguel.webp
	links?: { label: string; href: string }[];
};

export type TeamGroup = {
	key: TeamKey;
	label: string; // what appears under “meet our team.”
	color?: string; // optional accent (hex or rgb string)
	members: TeamMember[];
};
