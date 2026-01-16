export const SPONSORS = [
	{
		name: "HEB",
		logo: "/img/logos/sponsor/heb.png",
		link: "https://www.heb.com",
	},
	{
		name: "Dell",
		logo: "/img/logos/sponsor/dell.png",
		link: "https://www.dell.com",
	},
	{
		name: "UTSA CS",
		logo: "/img/logos/sponsor/utsacs.png",
		link: "https://cs.utsa.edu/",
	},
];

export type RGBColor = `rgb(${number}, ${number}, ${number})`;

export interface Suborg {
	name: string;
	slug: string;
	shortDesc: string;
	logoUrl: string;
	leadingSentence: string;
	colors: {
		poppy: RGBColor;
	};
	discordLink: string;
	aboutUs_One: string;
	aboutUs_Two: string;
}

export const SUBORGS: Record<string, Suborg> = {
	acmw: {
		slug: "acmw",
		colors: {
			poppy: "rgb(244, 137, 175)",
		},
		name: "ACM W",
		shortDesc: "Empowering Women in Tech",
		logoUrl: "/img/logos/suborgs/acmw-pink.png",
		leadingSentence:
			"We are the Association for Computing Machinery Women's Chapter at UTSA",
		discordLink: "https://discord.com/invite/Fu86P2W8BK",
		aboutUs_One: "is an all-inclusive organization focused on tailoring its activities towards minorities.",
		aboutUs_Two: "aims to create an engaging academic, professional, and social network for women and minorities in technology.",
	},
	rowdycreators: {
		slug: "rowdycreators",
		colors: {
			poppy: "rgb(2, 25, 54)",
		},
		name: "Rowdy Creators",
		shortDesc: "Develop. Create. Collaborate.",
		logoUrl: "/img/logos/suborgs/rc-blue.png",
		leadingSentence:
			"We are Rowdy Creators: A community of developers, designers, and creators at UTSA",
		discordLink: "https://discord.com/invite/gvqbjZU",
		aboutUs_One: "gives students interested in technology the opportunity to learn new skills, network with other students, and create/develop hands-on projects.",
		aboutUs_Two: "channels the skills of various disciplines (Engineering, Computer Science, Business, etc.) into technology projects using software and/or hardware.",
	},
	acmicpc: {
		slug: "acm icpc",
		colors: {
			poppy: "rgb(65, 137, 93)",
		},
		name: "ICPC",
		shortDesc: "Placeholder for shortDesc",
		logoUrl: "/img/logos/suborgs/icpc-green.png",
		leadingSentence:
			"Placeholder for the leading Sentence",
		discordLink: "https://discord.com/invite/qfckfeQ",
		aboutUs_One: "or International Collegiate Programming Contest, is a world-wide programming contest where thousands of 3-person teams compete. Moreover, ",
		aboutUs_Two: "provides the opportunity for students to learn and prepare for the contest.",
	},
	codingincolor: {
		slug: "coding in color",
		colors: {
			poppy: "rgb(40, 40, 40)",
		},
		name: "Coding In Color",
		shortDesc: "A safe space for black people in the technology world",
		logoUrl: "/img/logos/suborgs/cnc-gray.png",
		leadingSentence:
			"Placeholder for the leading Sentence",
		discordLink: "https://discord.gg/gNXxZfxxK5",
		aboutUs_One: "strives to create a safe space for black people in the technology world to promote representation in our community.",
		aboutUs_Two: "advocates for equitable access to job and career opportunities through educational workshops, forming connection with professionals in the field, and networking events.",
	}
};
