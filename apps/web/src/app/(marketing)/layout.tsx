import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "ACM UTSA",
	description:
		"The premiere organization for students interested in computer science and technology at UTSA",
};

export default function MarketingLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
