import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Footer() {
	return (
		<div className="p-10 pt-0">
			<footer className="grid min-h-[50vh] grid-cols-2 rounded-xl bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center p-10">
				<div className="flex flex-col items-start justify-start">
					<h1 className="text-balance text-left font-calsans text-6xl font-black leading-none tracking-wide text-white">
						The Association for Computing
						<br />
						Machinery
						<br />
						at UTSA
					</h1>

					<Image
						src="/img/logos/acm.svg"
						alt="ACM Logo"
						width={50}
						height={50}
						className="mt-auto justify-self-end"
					/>
				</div>
				<div className="grid grid-cols-3">
					<div className="flex flex-col items-start justify-start">
						<h3 className=" pb-3 text-xl font-bold text-white">
							Resources &<br />
							Important Links
						</h3>
						<FooterLink
							text="Discord"
							href="https://go.acmutsa.org/discord"
							target="_blank"
						/>
						<FooterLink
							text="Contact"
							href="/contact"
						/>
						<FooterLink
							text="Wiki"
							href="https://wiki.acmutsa.org/"
							target="_blank"
						/>
						<FooterLink
							text="Constitution"
							href="https://go.acmutsa.org/constitution"
							target="_blank"
						/>
					</div>
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-xl font-bold text-white">
							Suborgs &<br />
							Hackathons
						</h3>
						<FooterLink text="ACM-W" href="/suborgs/acmw" />
						<FooterLink text="Coding in Color" href="/suborgs/codingincolor" />
						<FooterLink text="ICPC" href="/suborgs/acmicpc" />
						<FooterLink text="Rowdy Creators" href="/suborgs/rowdycreators"/>
						<FooterLink text="RowdyHacks" href="/suborgs/rowdyhacks"/>
						<FooterLink text="Code Quantum" href="https://cqhacks.org"/>
						<FooterLink text="Rowdy Datathon" href="https://rowdydatathon.org"/>
					</div>
					<div className="flex flex-col items-start justify-start">
						<h3 className="pb-3 font-mono text-xl font-bold text-white">
							Social
							<br />
							Media
						</h3>
						<FooterLink
							text="Instagram"
							href="https://www.instagram.com/acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="LinkedIn"
							href="https://www.linkedin.com/company/acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="YouTube"
							href="https://www.youtube.com/@acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="Twitter"
							href="https://x.com/acmutsa"
							target="_blank"
						/>
						<FooterLink
							text="Facebook"
							href="https://www.facebook.com/acmutsa"
							target="_blank"
						/>
					</div>
				</div>
			</footer>
		</div>
	);
}

function FooterLink({
	text,
	href,
	target,
}: {
	text: string;
	href: string;
	target?: string;
}) {
	return (
		<Link href={href} target={target}>
			<Button
				variant={"link"}
				className="p-0 text-left font-calsans text-white"
			>
				{text}
			</Button>
		</Link>
	);
}
