import { SUBORGS } from "@/site.config";
import SuborgHero from "./suborg-hero";
import { HeroNav } from "@/components/shared/navbar";
import { notFound } from "next/navigation";

export default function Page({ params }: { params: { slug: string } }) {
	const suborg = SUBORGS[params.slug];

	if (!suborg) {
		return notFound();
	}

	return (
		<>
			<HeroNav
				customColor={suborg.colors.poppy}
				navVariant="blueForeground"
			/>
			<div className="h-36 w-full"></div>
			<SuborgHero
				name={suborg.name}
				shortDesc={suborg.shortDesc}
				leadingSentence={suborg.leadingSentence}
				slug={params.slug}
				logoUrl={suborg.logoUrl}
				colors={suborg.colors}
			/>
		</>
	);
}
