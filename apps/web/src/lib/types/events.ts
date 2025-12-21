import type { Noop, RefCallBack } from "react-hook-form";

import type { ImageProps } from "next/image";

export type Semester = {
	semesterID: number;
	name: string;
	startDate: Date;
	endDate: Date;
	pointsRequired: number;
	isCurrent: boolean;
};

export type EventToCategoriesType = {
	eventID: string;
	categoryID: string;
};

export type EventCategoryType = {
	id: string;
	name: string;
	color: string;
};
import c from "config";

export type EventsToCategoriesWithCategoryType = EventToCategoriesType & {
	category: EventCategoryType;
};

export type EventType = {
	id: string;
	name: string;
	description: string;
	thumbnailUrl: string;
	start: Date;
	end: Date;
	checkinStart: Date;
	checkinEnd: Date;
	location: string;
	isUserCheckinable: boolean;
	isHidden: boolean;
	points: number;
	createdAt: Date;
	updatedAt: Date;
	semesterID: number;
};

export type EventAndCategoriesType = EventType & {
	eventsToCategories: EventsToCategoriesWithCategoryType[];
};

export interface EventCalendarLink {
	title: string;
	description: string;
	start: string;
	end: string;
	location: string;
}

export type EventCalendarName = (typeof c.calendarLinks)[number];

export interface DetailsProps {
	event: EventAndCategoriesType;
	startTime: string;
	startDate: string;
	formattedEventDuration: string;
	checkInUrl: string;
	checkInMessage: string;
	eventCalendarLink: EventCalendarLink;
	isEventPassed: boolean;
	isCheckinAvailable: boolean;
	isEventHappening: boolean;
}

export interface CalendarDetails {
	title: string;
	description: string;
	start: string;
	end: string;
	location: string;
}

export type EventImageProps = Omit<ImageProps, "alt"> & {
	alt?: string;
	isLive?: boolean;
};

export type EventWithCatagoryType = EventType & {
	category: {
		id: string;
		name: string;
		color: string;
	};
};
