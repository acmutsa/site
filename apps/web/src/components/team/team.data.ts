import type { TeamGroup } from "./types";

export const TEAM_GROUPS: TeamGroup[] = [
  {
    key: "acm_general",
    label: "acm",
    members: [
      {
        id: "miguel-oseguera",
        name: "Miguel Oseguera",
        role: "Technical Officer",
        imageUrl: "/img/officer_photos/acm_general/miguel-oseguera.jpg",
        socials: {
            linkedin: "www.linkedin.com/in/miguel-oseguera-0b5306281",
            github: "https://github.com/Miguel-Oseguera",
            instagram: "https://www.instagram.com/milo.o175/",
        }
      },
      {
        id: "josh-silva",
        name: "Josh Silva",
        role: "Projects",
        imageUrl: "/img/officer_photos/acm_general/josh-silva.jpg",
      },
      {
        id: "juleah-cephus",
        name: "Juleah Cephus",
        role: "Treasurer",
        imageUrl: "/img/officer_photos/acm_general/juleah-cephus.jpg",
      },
      {
        id: "eric-lee",
        name: "Eric Lee",
        role: "Vice President",
        imageUrl: "/img/officer_photos/acm_general/eric-lee.jpg",
      },
      {
        id: "vivian-tran",
        name: "Vivian Tran",
        role: "President",
        imageUrl: "/img/officer_photos/acm_general/vivian-tran.jpg",
      },
    ],
  },

  {
    key: "acm-w",
    label: "acm-w",
    members: [
      {
        id: "reese-sylvester",
        name: "Reese Sylvester",
        role: "President",
        imageUrl: "/img/officer_photos/acm_w/reese-sylvester.jpg",
      },
    ],
  },
];

