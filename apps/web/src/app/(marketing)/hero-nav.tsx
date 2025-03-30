import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroNav() {
	return (
		<div
			className={`absolute left-1/2 top-0 z-50 grid h-24 w-full max-w-screen-xl -translate-x-1/2 grid-cols-4 rounded-lg px-10 py-4 transition-all duration-300`}
		>
			<div className="col-span-3 flex items-center gap-x-5">
				<Image
					src="/img/logos/acm.svg"
					alt="ACM UTSA"
					width={40}
					height={40}
					className="mr-5"
				/>
				<NavLink href="/events">Events</NavLink>
				<NavLink href="/team">Team</NavLink>
				<NavLink href="/suborgs">Sub-orgs</NavLink>
				<NavLink href="/sponsor">Sponsor</NavLink>
				<NavLink href="/donate">Donate</NavLink>
				<NavLink href="/contact">Contact</NavLink>
				<NavLink href="/resources">Resources</NavLink>
			</div>
			<div className="flex items-center justify-end gap-x-3">
				<Button
					variant={"styleized-white-blue-text"}
					className="font-bold"
				>
					Sign-in
				</Button>
				<Button
					variant={"styleized-white-blue-text"}
					className="font-bold"
				>
					Register
				</Button>
			</div>
		</div>
	);
}

function NavLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<Link
			href={href}
			className="text-md font-semibold text-white hover:underline"
		>
			{children}
		</Link>
	);
}
