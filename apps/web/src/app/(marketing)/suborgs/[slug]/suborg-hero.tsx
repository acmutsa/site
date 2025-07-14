import Image from "next/image";
import type { RGBColor, Suborg } from "@/site.config";

function modifyColor(color: RGBColor, alpha: number): string {
	const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
	if (!match) return color;

	const [, r, g, b] = match;
	return `rgb(${r} ${g} ${b} / ${alpha})`;
}

export default function SuborgHero(suborg: Suborg) {
	const { name, shortDesc, logoUrl, colors, leadingSentence } = suborg;

	return (
		<div
			className="mx-auto grid max-w-screen-xl grid-cols-5 border-2 border-acm-darker-blue/50"
			style={{
				borderColor: modifyColor(colors.poppy, 0.5),
			}}
		>
			<div
				className={`col-span-5 flex h-[40vh] w-full flex-col items-center justify-center ${name.toLowerCase().includes("y") ? "gap-y-6" : "gap-y-2"} bg-[url('/img/landing/noise.png')] bg-center`}
				style={{
					backgroundColor: colors.poppy,
				}}
			>
				<h1 className="text-center font-chillax text-9xl font-black text-white">
					{name.toLowerCase()}
				</h1>
				<h2 className="text-center font-calsans text-2xl font-bold leading-tight tracking-wide text-white">
					{shortDesc}
				</h2>
			</div>
			<div
				className="col-span-3 flex min-h-[350px] flex-col border p-10"
				style={{
					borderColor: modifyColor(colors.poppy, 0.5),
				}}
			>
				<h1
					className="text-left font-calsans text-5xl font-bold leading-tight tracking-wide"
					style={{
						color: colors.poppy,
					}}
				>
					{leadingSentence}
				</h1>
				<div className="mt-auto flex items-end justify-start justify-self-end">
					<p
						className="ml-auto justify-self-end  font-mono text-xs "
						style={{
							color: colors.poppy,
						}}
					>
						Fig. 1
					</p>
				</div>
			</div>
			<div
				className="col-span-2 flex flex-col items-center justify-center border  p-10"
				style={{
					borderColor: modifyColor(colors.poppy, 0.5),
				}}
			>
				<Image src={logoUrl} alt={name} width={200} height={200} />
			</div>
		</div>
	);
}
