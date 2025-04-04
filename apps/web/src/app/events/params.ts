import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	createLoader,
} from "nuqs/server";

export const eventsParams = {
	query: parseAsString.withDefault(""),
	categories: parseAsArrayOf(parseAsString).withDefault([]),
	past: parseAsBoolean.withDefault(false),
};

export const loadSearchParams = createLoader(eventsParams);
