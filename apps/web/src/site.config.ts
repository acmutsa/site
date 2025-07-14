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
}

export const SUBORGS: Record<string, Suborg> = {
	acmw: {
		slug: "acmw",
		colors: {
			poppy: "rgb(244, 137, 175)",
		},
		name: "ACM W",
		shortDesc: "Empowering Women in Tech",
		logoUrl: "/img/logos/suborgs/acmw-blue.png",
		leadingSentence:
			"We are the Association for Computing Machinery Women's Chapter at UTSA",
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
	},
};
