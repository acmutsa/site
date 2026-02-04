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
  imageUrl: string;
};

export type TeamGroup = {
  key: TeamKey;
  label: string;
  members: TeamMember[];
};
