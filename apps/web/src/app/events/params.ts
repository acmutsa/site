import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	createLoader,
} from "nuqs/server";

export const eventsParams = {
	query: parseAsString,
	categories: parseAsArrayOf(parseAsString).withDefault([]),
	past: parseAsBoolean.withDefault(false),
};

export const loadSearchParams = createLoader(eventsParams);
