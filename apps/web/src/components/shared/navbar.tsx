import Image from "next/image";
import Link from "next/link";
import { Button, variantItems } from "@/components/ui/button";

import c from "config";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type NavbarProps = {
	siteRegion?: string;
	showBorder?: boolean;
};

export default async function Navbar({ siteRegion, showBorder }: NavbarProps) {
	return (
		<div
			className={
				"z-20 grid h-16 w-full grid-cols-2 px-5" +
				(showBorder ? " border-b" : "")
			}
		>
			<div className="flex items-center gap-x-4">
				<Link href="/">
					<Image
						src={c.icon.svg}
						alt={c.clubName + " Logo"}
						width={32}
						height={32}
					/>
				</Link>

				{siteRegion && (
					<>
						<div className="h-[45%] w-[2px] rotate-[25deg] bg-muted-foreground" />
						<h2 className="font-bold tracking-tight">
							{siteRegion}
						</h2>
					</>
				)}
			</div>

			{/* Large screen navbar */}
			<div className="my-2 hidden items-center justify-end gap-x-2 md:flex">
				<PortalButton navVariant="default" customColor="" />
			</div>

			{/* Small screen navbar */}
			<div className="flex items-center justify-end gap-2 md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Menu />
					</SheetTrigger>
					<SheetContent className="flex max-w-[40%] flex-col-reverse items-center justify-center gap-y-1">
						<PortalButton navVariant="default" customColor="" />
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

interface HeroVariant {
	wrapper: string;
	buttonVariant: keyof typeof variantItems;
	link: string;
	dashButton: string;
}

const variant = {
	default: {
		wrapper: "",
		buttonVariant: "styleized-white-blue-text",
		link: "text-white",
		dashButton: "text-white",
	},
	blueForeground: {
		wrapper: "bg-white",
		buttonVariant: "styleized-blue-darker",
		link: "text-acm-darker-blue",
		dashButton: "hover:text-acm-darker-blue",
	},
} as const;

export function HeroNav({
	navVariant = "default",
	customColor,
}: {
	navVariant?: keyof typeof variant;
	customColor?: string;
}) {
	const linkStyles = customColor || variant[navVariant].link;
	const dashButtonStyles = customColor || variant[navVariant].dashButton;

	return (
		<div
			className={`absolute left-1/2 top-0 z-50 grid h-24 w-full max-w-screen-xl -translate-x-1/2 grid-cols-4 rounded-lg px-10 py-4 transition-all duration-300 ${variant[navVariant].wrapper}`}
		>
			<div className="col-span-3 flex items-center gap-x-5">
				<Link href="/">
					<Image
						src="/img/logos/acm.svg"
						alt="ACM UTSA"
						width={40}
						height={40}
						className="mr-5"
					/>
				</Link>
				<NavLink linkStyles={linkStyles} href="/events">
					Events
				</NavLink>
				<NavLink linkStyles={linkStyles} href="./page.tsx">
					Team
				</NavLink>
				<NavLink linkStyles={linkStyles} href="/suborgs">
					Sub-orgs
				</NavLink>
				<NavLink linkStyles={linkStyles} href="/sponsor">
					Sponsor
				</NavLink>
				<NavLink linkStyles={linkStyles} href="/donate">
					Donate
				</NavLink>
				<NavLink linkStyles={linkStyles} href="/contact">
					Contact
				</NavLink>
				<NavLink linkStyles={linkStyles} href="/resources">
					Resources
				</NavLink>
			</div>
			<div className="flex items-center justify-end gap-x-3">
				<PortalButton
					navVariant={navVariant}
					customColor={customColor}
				/>
			</div>
		</div>
	);
}

async function PortalButton({
	navVariant,
	customColor,
}: {
	navVariant: keyof typeof variant;
	customColor?: string;
}) {
	return (
		<Link href={process.env.PORTAL_URL || "https://portal.acmutsa.org"}>
			<Button
				variant={variant[navVariant].buttonVariant}
				style={
					customColor ? { backgroundColor: customColor } : undefined
				}
			>
				Membership Portal
			</Button>
		</Link>
	);
}

function NavLink({
	href,
	children,
	linkStyles,
}: {
	href: string;
	children: React.ReactNode;
	linkStyles: string;
}) {
	// Check if linkStyles is a custom color (starts with rgb, hex, etc.)
	const isCustomColor =
		linkStyles.startsWith("rgb") ||
		linkStyles.startsWith("#") ||
		linkStyles.startsWith("hsl");

	return (
		<Link
			href={href}
			className={`text-md font-semibold hover:underline ${isCustomColor ? "" : linkStyles}`}
			style={isCustomColor ? { color: linkStyles } : undefined}
		>
			{children}
		</Link>
	);
}
