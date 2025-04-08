/*
    IMPORTANT: locations.json should be updated periodically with data from https://geo.acmutsa.dev/
*/

import locationsData from "./locations.json";
import { fuzzy } from "fast-fuzzy";

export function fuzzyFindLocation(query: string) {
	const locations = locationsData["main-campus"];
	const queryNormalized = query.toLowerCase();
	const queryParts = queryNormalized.split(" ");
	const potenialAbbrevMatches = new Set(
		queryParts.filter((part) => part.length <= 3),
	);

	for (const loc of locations) {
		const [name, abbrev] = [
			loc.name.toLowerCase(),
			loc.abbrev.toLowerCase(),
		];

		if (potenialAbbrevMatches.has(abbrev)) {
			return {
				found: true as const,
				data: loc,
			};
		}

		if (fuzzy(name, queryNormalized) > 0.8) {
			return {
				found: true as const,
				data: loc,
			};
		}

		if (loc.nicknames) {
			for (const nickname of loc.nicknames) {
				if (fuzzy(nickname.toLowerCase(), queryNormalized) > 0.8) {
					return {
						found: true as const,
						data: loc,
					};
				}
			}
		}
	}
	return {
		found: false as const,
		data: null,
	};
}
