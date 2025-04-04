import { SignUp } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import c from "config";
import Link from "next/link";
import PortalMigrationExplainer from "@/components/dash/shared/PortalMigrationExplainer";
import Image from "next/image";

export default function Page() {
	return (
		<main className="grid h-screen w-screen grid-cols-1 gap-y-5 md:grid-cols-2">
			<div className="flex h-full w-full items-center justify-center">
				<div className="flex max-w-[400px] flex-col items-center justify-center gap-y-5">
					<SignUp />
					<Link href="/onboarding/migrate" className="w-full">
						<Button
							className="w-full"
							variant="styleized-blue-darker"
						>
							Migrate From Legacy Portal
						</Button>
					</Link>
					<PortalMigrationExplainer />
				</div>
			</div>
			<div className="hidden items-center justify-center bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center md:flex">
				<Image
					src="/img/logos/acm-white.png"
					alt="Noise"
					width={400}
					height={400}
				/>
			</div>
		</main>
	);
}
