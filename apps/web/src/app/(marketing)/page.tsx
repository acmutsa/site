import Globe from "@/components/landing/globe";
import { HeroNav } from "./hero-nav";
import Image from "next/image";
import { WeArePhotoGrid } from "./client";

export default function Home() {
	return (
		<>
			<main className="bg-fit relative flex h-full min-h-[calc(100vh-100px)] w-full flex-col items-center justify-center overflow-hidden bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center text-white">
				<HeroNav />
				<div className="flex h-full w-full flex-col items-center justify-start">
					<h1 className="font-chillax text-9xl font-black">
						acm utsa
					</h1>
					<h2 className="text-md max-w-[600px] text-center font-mono font-semibold">
						The premiere organization for students interested in
						computer science and technology at UTSA
					</h2>
				</div>
				<div className="absolute bottom-0 left-0 right-0 flex translate-y-[60%] items-center justify-center">
					<Globe />
				</div>
			</main>
			<section className="min-h-screen w-full bg-background">
				<div className="mx-auto flex max-w-screen-xl flex-col px-10">
					<div className="relative py-36">
						<h1 className="absolute font-chillax text-7xl font-black tracking-tighter text-acm-darker-blue">
							what is acm?
						</h1>
					</div>
					<div className=" grid min-h-[50vh] grid-cols-4 border border-acm-darker-blue/50">
						<div className="col-span-2 row-span-2 flex flex-col border border-acm-darker-blue/50 p-10">
							<h1 className="font-calsans text-left text-5xl font-bold leading-tight tracking-wide text-acm-darker-blue">
								We are the Association for Computing Machinery
								at{" "}
								<span className="font-inter rounded-md bg-[#0C2340] pl-3 pr-4 font-bold leading-[60px] tracking-[-0.1em] text-[#F15A22]">
									UTSA
								</span>
							</h1>
							<div className="mt-auto flex items-end justify-start justify-self-end">
								<Image
									src="/img/logos/acm-blue.png"
									alt="ACM Blue Logo"
									width={50}
									height={50}
								/>
								<p className="ml-auto justify-self-end  font-mono text-xs text-acm-darker-blue">
									Fig. 1
								</p>
							</div>
						</div>
						<WeArePhotoGrid />
					</div>
					<div className="h-12 w-full border border-x-2 border-acm-darker-blue/50"></div>
					<div className=" grid min-h-[50vh] grid-cols-4 border border-acm-darker-blue/50"></div>
				</div>
			</section>
		</>
	);
}
