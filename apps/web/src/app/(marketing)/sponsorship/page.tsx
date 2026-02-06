import { HeroNav } from "@/components/shared/navbar";
import SponsorshipClient from "./sponsorship.client";

export default function SponsorshipPage() {
	return (
		<>
			<HeroNav navVariant="blueForeground" />
			{/* matches spacing you used on /team so content isn't under the absolute HeroNav */}
			<div className="h-28 w-full" />

			<SponsorshipClient />
		</>
	);
}
