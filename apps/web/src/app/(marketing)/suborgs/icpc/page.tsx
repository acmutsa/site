import Image from "next/image";

import { HeroNav } from "@/components/shared/navbar";
import { CircleChevronDown } from "lucide-react";
export default function Page() {
	return (
		<main className="bg-fit relative flex min-h-[calc(100vh-100px)] w-full flex-col items-center justify-center overflow-hidden bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center text-white">
			<div className="h-svh w-full">
				<HeroNav />
				<div className="relative flex h-full w-full flex-grow items-center justify-start px-10">
					<div>
						<h1 className="font-chillax text-4xl font-bold">
							ACM ICPC
						</h1>
						<h2 className="text-2xl font-bold">
							International Collegiate Programming Contest
						</h2>
					</div>
					<div className="absolute bottom-16 flex w-full justify-center">
						<CircleChevronDown
							className="animate-pulse"
							size={32}
						/>
					</div>
				</div>
			</div>

			<div className="flex w-full gap-x-4 bg-white p-4">
				<div className="w-1/2">
					<Image
						src="/img/logos/suborgs/icpc-color.png"
						alt="ICPC Logo"
						className="w-full"
						width={100}
						height={100}
					/>
				</div>
				<div className="w-1/2 space-y-3 text-acm-darker-blue">
					<div>
						<h2 className="text-2xl font-bold">What is ICPC?</h2>
						<p className="text-sm">
							ICPC, or International Collegiate Programming
							Contest, is a world-wide programming contest where
							thousands of 3-person teams compete by solving
							anywhere from 8 to 12 algorithm problems of varying
							difficulty, from easy to extremely hard.
						</p>
					</div>
					<div className="space-y-2">
						<h2 className="text-2xl font-bold">
							Interested in Joining?
						</h2>
						<div className="flex items-center gap-x-4 border-2 border-acm-darker-blue p-2 px-4">
							<div className="w-12">
								<svg
									viewBox="0 0 256 199"
									xmlns="http://www.w3.org/2000/svg"
									preserveAspectRatio="xMidYMid"
								>
									<path
										d="M216.856 16.597A208.502 208.502 0 0 0 164.042 0c-2.275 4.113-4.933 9.645-6.766 14.046-19.692-2.961-39.203-2.961-58.533 0-1.832-4.4-4.55-9.933-6.846-14.046a207.809 207.809 0 0 0-52.855 16.638C5.618 67.147-3.443 116.4 1.087 164.956c22.169 16.555 43.653 26.612 64.775 33.193A161.094 161.094 0 0 0 79.735 175.3a136.413 136.413 0 0 1-21.846-10.632 108.636 108.636 0 0 0 5.356-4.237c42.122 19.702 87.89 19.702 129.51 0a131.66 131.66 0 0 0 5.355 4.237 136.07 136.07 0 0 1-21.886 10.653c4.006 8.02 8.638 15.67 13.873 22.848 21.142-6.58 42.646-16.637 64.815-33.213 5.316-56.288-9.08-105.09-38.056-148.36ZM85.474 135.095c-12.645 0-23.015-11.805-23.015-26.18s10.149-26.2 23.015-26.2c12.867 0 23.236 11.804 23.015 26.2.02 14.375-10.148 26.18-23.015 26.18Zm85.051 0c-12.645 0-23.014-11.805-23.014-26.18s10.148-26.2 23.014-26.2c12.867 0 23.236 11.804 23.015 26.2 0 14.375-10.148 26.18-23.015 26.18Z"
										fill="#5865F2"
									/>
								</svg>
							</div>
							<div>
								<h3 className="text-lg font-bold">Join</h3>
								<p className="text-sm">Our Discord</p>
							</div>
						</div>
						<div className="flex items-center gap-x-4 border-2 border-acm-darker-blue p-2 px-4">
							<div className="w-12">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-megaphone-icon lucide-megaphone"
								>
									<path d="m3 11 18-5v12L3 14v-3z" />
									<path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
								</svg>
							</div>
							<div>
								<h3 className="text-lg font-bold">Events</h3>
								<p className="text-sm">
									Find upcoming events here!
								</p>
							</div>
						</div>
						<div className="flex items-center gap-x-4 border-2 border-acm-darker-blue p-2 px-4">
							<div className="w-12">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="lucide lucide-mail-icon lucide-mail"
								>
									<rect
										width="20"
										height="16"
										x="2"
										y="4"
										rx="2"
									/>
									<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
								</svg>
							</div>
							<div>
								<h3 className="text-lg font-bold">Contact</h3>
								<p className="text-sm">
									The Director at icpcdirector@acmutsa.org
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
