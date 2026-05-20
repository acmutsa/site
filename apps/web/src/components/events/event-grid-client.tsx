"use client";

import React, { useState, useRef, useEffect } from "react";
import EventCard from "@/components/events/EventCard";
import { EventType, EVENT_TAGS, EventTag as EventTagType } from "@/components/events/types";
import EventTag from "@/components/events/EventTag";
import { ChevronLeft, ChevronRight,Search, ListFilter, X, RotateCcw } from "lucide-react";

interface FilterDropdownProps {
	availableSuborgs: string[];
	availableTypes: string[];
	selectedSuborgs: string[];
	selectedTypes: string[];
	onToggleSuborg: (suborg: string) => void;
	onToggleType: (type: string) => void;
	onReset: () => void;
}

function FilterDropdown({
	availableSuborgs,
	availableTypes,
	selectedSuborgs,
	selectedTypes,
	onToggleSuborg,
	onToggleType,
	onReset,
}: FilterDropdownProps) {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const filterRef = useRef<HTMLDivElement>(null);

	// close dropdown when clicking outside
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				filterRef.current &&
				!filterRef.current.contains(event.target as Node)
			) {
				setIsFilterOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const hasActiveFilters =
		selectedSuborgs.length > 0 || selectedTypes.length > 0;

	return (
		<div className="relative flex shrink-0" ref={filterRef}>
			<button
				type="button"
				onClick={() => setIsFilterOpen(!isFilterOpen)}
				className="relative flex aspect-square items-center justify-center rounded-md bg-acm-darker-blue p-2 text-white transition-opacity hover:opacity-80"
			>
				<ListFilter strokeWidth={2.5} size={20} />

				{/* maybe change to different color? */}
				{hasActiveFilters && (
					<span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-red-500" />
				)}
			</button>

			{/* Dropdown Menu */}
			<div
				className={`absolute right-0 top-full z-50 mt-3 w-72 rounded-xl border bg-white p-4 shadow-lg transition-all duration-150 ${
					isFilterOpen
						? "visible translate-y-0 opacity-100"
						: "invisible translate-y-1 opacity-0"
				}`}
			>
				{/* Suborgs Section */}
				<div className="mb-4">
					<h3 className="mb-2 font-calsans font-bold text-acm-darker-blue">
						Suborgs
					</h3>
					<div className="flex flex-wrap gap-2">
						{availableSuborgs.map((suborgLabel) => {
							const tagData = Object.values(EVENT_TAGS).find(
								(t) => t.label === suborgLabel,
							) as EventTagType | undefined;
							const isSelected =
								selectedSuborgs.includes(suborgLabel);

							return (
								<button
									key={suborgLabel}
									onClick={() => onToggleSuborg(suborgLabel)}
									className={`rounded-full transition-all ${
										isSelected
											? "ring-2 ring-acm-darker-blue ring-offset-1"
											: "hover:ring-2 hover:ring-acm-darker-blue/40 hover:ring-offset-1"
									}`}
								>
									<EventTag
										text={suborgLabel}
										color={tagData?.color || "#266BE8"}
										icon={tagData?.icon}
									/>
								</button>
							);
						})}
						{availableSuborgs.length === 0 && (
							<span className="text-xs text-gray-400">
								No suborgs found
							</span>
						)}
					</div>
				</div>

				{/* Event Types Section */}
				<div className="mb-4">
					<h3 className="mb-2 font-calsans font-bold text-acm-darker-blue">
						Event Types
					</h3>
					<div className="flex flex-wrap gap-2">
						{availableTypes.map((typeLabel) => {
							const tagData = Object.values(EVENT_TAGS).find(
								(t) => t.label === typeLabel,
							) as EventTagType | undefined;
							const isSelected =
								selectedTypes.includes(typeLabel);

							return (
								<button
									key={typeLabel}
									onClick={() => onToggleType(typeLabel)}
									className={`rounded-full transition-all ${
										isSelected
											? "ring-2 ring-acm-darker-blue ring-offset-1"
											: "hover:ring-2 hover:ring-acm-darker-blue/40 hover:ring-offset-1"
									}`}
								>
									<EventTag
										text={typeLabel}
										color={tagData?.color || "#266BE8"}
										icon={tagData?.icon}
									/>
								</button>
							);
						})}
						{availableTypes.length === 0 && (
							<span className="text-xs text-gray-400">
								No types found
							</span>
						)}
					</div>
				</div>

				{/* Reset Button */}
				<div className="mt-2 flex justify-end border-t pt-3">
					<button
						onClick={onReset}
						disabled={!hasActiveFilters}
						className="flex items-center gap-1.5 font-calsans text-sm font-bold text-acm-darker-blue disabled:opacity-50"
					>
						Clear Filters
						<RotateCcw size={14} strokeWidth={2.5} />
					</button>
				</div>
			</div>
		</div>
	);
}

interface EventGridProps {
	allEvents: EventType[];
	onEventClick: (event: EventType) => void;
}

// TODO: be able to swipe/drag to next page?
// TODO: user can swipe through all events instead of clicking pages
//      swiper.js???
export default function EventGridClient({
	allEvents,
	onEventClick,
}: EventGridProps) {
	// track tabs and only want 6 events per page (for now)
	// maybe change to 4 when calendar is added
	const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
	const [currentPage, setCurrentPage] = useState(0);
	const eventsPerPage = 6;
	const carouselRef = useRef<HTMLDivElement>(null);

	// search states
	const [isSearchExpanded, setIsSearchExpanded] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const searchInputRef = useRef<HTMLInputElement>(null);

	// filter states (The dropdown handles its own open/close state now!)
	const [selectedSuborgs, setSelectedSuborgs] = useState<string[]>([]);
	const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

	// get all unique tag labels used across all events dynamically
	const allUsedLabels = Array.from(
		new Set(allEvents.flatMap((e) => e.tags?.map((t) => t.label) || [])),
	);

	// separate them into suborgs and event types
	const knownSuborgs = [
		"ACM W",
		"Rowdy Creators",
		"ICPC",
		"CiC",
		"RowdyHacks",
	];
	const knownTypes = ["Workshop", "Career Building", "Social", "Hackathon"];

	const availableSuborgs = allUsedLabels.filter((label) =>
		knownSuborgs.includes(label),
	);
	const availableTypes = allUsedLabels.filter((label) =>
		knownTypes.includes(label),
	);

	const toggleSuborg = (suborg: string) => {
		setSelectedSuborgs((prev) =>
			prev.includes(suborg)
				? prev.filter((s) => s !== suborg)
				: [...prev, suborg],
		);
		setCurrentPage(0);
	};

	const toggleType = (type: string) => {
		setSelectedTypes((prev) =>
			prev.includes(type)
				? prev.filter((t) => t !== type)
				: [...prev, type],
		);
		setCurrentPage(0);
	};

	const resetFilters = () => {
		setSelectedSuborgs([]);
		setSelectedTypes([]);
		setCurrentPage(0);
	};

	// filter logic
	const filteredEvents = allEvents.filter((event) => {
		// tab Check
		if (event.status !== activeTab) return false;

		// search check
		if (
			searchQuery &&
			!event.title?.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false;
		}

		// get array of just the string labels for this specific event
		const eventTagLabels = event.tags?.map((t) => t.label) || [];

		// suborg check: if filters exist, event must have AT LEAST ONE matching suborg tag
		const passesSuborgCheck =
			selectedSuborgs.length === 0 ||
			selectedSuborgs.some((selected) =>
				eventTagLabels.includes(selected),
			);
		if (!passesSuborgCheck) return false;

		// event type check: if filters exist, event must have AT LEAST ONE matching type tag
		const passesTypeCheck =
			selectedTypes.length === 0 ||
			selectedTypes.some((selected) => eventTagLabels.includes(selected));
		if (!passesTypeCheck) return false;

		return true;
	});

	const pages = [];
	for (let i = 0; i < filteredEvents.length; i += eventsPerPage) {
		pages.push(filteredEvents.slice(i, i + eventsPerPage));
	}

	const handleTabSwitch = (tab: "upcoming" | "past") => {
		setActiveTab(tab);
		setCurrentPage(0);
		if (carouselRef.current) {
			carouselRef.current.scrollTo({ left: 0, behavior: "auto" });
		}
	};

	const handleScroll = () => {
		if (!carouselRef.current) return;
		const { scrollLeft, clientWidth } = carouselRef.current;
		const newIndex = Math.round(scrollLeft / clientWidth);
		if (newIndex !== currentPage) {
			setCurrentPage(newIndex);
		}
	};

	const scrollToPage = (index: number) => {
		if (!carouselRef.current) return;
		carouselRef.current.scrollTo({
			left: index * carouselRef.current.clientWidth,
			behavior: "smooth",
		});
	};

	return (
		// might have to change this later when adjusting for smaller screen layout
		<div className="flex min-h-[400px] w-full flex-col lg:min-h-[620px]">
			<div className="mb-8 flex flex-row items-stretch justify-end gap-2">
				{/* search button */}
				<div
					className={`relative flex items-center overflow-hidden rounded-md bg-acm-darker-blue transition-all duration-300 ease-in-out ${
						isSearchExpanded ? "w-full" : "w-[38px]"
					}`}
				>
					<button
						type="button"
						onClick={() => {
							if (!isSearchExpanded) {
								setIsSearchExpanded(true);
								setTimeout(
									() => searchInputRef.current?.focus(),
									100,
								);
							}
						}}
						className="flex aspect-square h-full w-[38px] shrink-0 items-center justify-center p-2 text-white"
					>
						<Search strokeWidth={2.5} size={20} />
					</button>

					<input
						ref={searchInputRef}
						type="text"
						placeholder="Search events..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="h-full w-full bg-transparent py-0 pr-2 font-calsans text-sm leading-normal text-white placeholder-white/70 outline-none"
					/>

					{isSearchExpanded && (
						<button
							type="button"
							onClick={() => {
								setIsSearchExpanded(false);
								setSearchQuery("");
							}}
							className="flex shrink-0 items-center justify-center pr-2 text-white/70 hover:text-white"
						>
							<X size={16} strokeWidth={2.5} />
						</button>
					)}
				</div>

				{/* filter button & dropdown component */}
				<FilterDropdown
					availableSuborgs={availableSuborgs}
					availableTypes={availableTypes}
					selectedSuborgs={selectedSuborgs}
					selectedTypes={selectedTypes}
					onToggleSuborg={toggleSuborg}
					onToggleType={toggleType}
					onReset={resetFilters}
				/>

				{/* upcoming/past tabs */}
				<div className="flex shrink-0 overflow-hidden rounded-md border-2 border-acm-darker-blue font-calsans text-sm font-bold">
					<button
						onClick={() => handleTabSwitch("upcoming")}
						className={`px-6 py-2 transition-colors ${
							activeTab === "upcoming"
								? "bg-acm-darker-blue text-white"
								: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
						}`}
					>
						Upcoming
					</button>
					<button
						onClick={() => handleTabSwitch("past")}
						className={`px-6 py-2 transition-colors ${
							activeTab === "past"
								? "bg-acm-darker-blue text-white"
								: "bg-white text-acm-darker-blue hover:bg-acm-darker-blue/10"
						}`}
					>
						Past
					</button>
				</div>
			</div>

			{filteredEvents.length === 0 ? (
				<div className="flex h-64 min-h-[800px] w-full items-center justify-center rounded-2xl border-2 border-dashed border-acm-darker-blue/30 font-mono text-2xl font-semibold text-acm-darker-blue">
					No events found.
				</div>
			) : (
				<div className="flex w-full flex-col items-center">
					<div className="relative flex w-full items-center">
						{/* event carousel */}
						<div
							ref={carouselRef}
							onScroll={handleScroll}
							className="flex w-full flex-1 snap-x snap-mandatory gap-6 overflow-x-auto no-scrollbar"
						>
							{pages.map((pageEvents, pageIndex) => (
								<div
									key={pageIndex}
									className="w-full shrink-0 snap-center"
								>
									<div className="grid min-h-[450px] w-full grid-cols-1 content-start justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
										{pageEvents.map((event) => (
											<EventCard
												key={event.id}
												event={event}
												onClick={() =>
													onEventClick(event)
												}
											/>
										))}
									</div>
								</div>
							))}
						</div>
					</div>

					{pages.length > 1 && (
						<div className="mt-6 flex items-center justify-center gap-4">
							{/* left arrow */}
							<button
								onClick={() => scrollToPage(currentPage - 1)}
								disabled={currentPage === 0}
								className="flex cursor-pointer items-center justify-center text-acm-darker-blue transition-opacity duration-300 hover:opacity-70 disabled:pointer-events-none disabled:opacity-0"
							>
								<ChevronLeft strokeWidth={3} size={20} />
							</button>

							{/* page dots  */}
							<div className="flex h-4 items-center justify-center">
								{pages.map((_, idx) => {
									let dotClasses = "w-1.5 mx-1 opacity-100 scale-100";

									if (pages.length > 5) {
										if (currentPage <= 2) {
											// start
											if (idx > 4)
												dotClasses = "w-0 mx-0 opacity-0 scale-0 pointer-events-none";
											else if (idx === 4)
												dotClasses = "w-1.5 mx-1 opacity-100 scale-[0.6]";
										} else if (
											currentPage >=
											pages.length - 3
										) {
											// end
											if (idx < pages.length - 5)
												dotClasses = "w-0 mx-0 opacity-0 scale-0 pointer-events-none";
											else if (idx === pages.length - 5)
												dotClasses = "w-1.5 mx-1 opacity-100 scale-[0.6]";
										} else {
											// middle
											if (Math.abs(idx - currentPage) > 2)
												dotClasses =
													"w-0 mx-0 opacity-0 scale-0 pointer-events-none";
											else if (
												Math.abs(idx - currentPage) === 2
											)
												dotClasses = "w-1.5 mx-1 opacity-100 scale-[0.6]";
										}
									}

									return (
										<button
                                            key={idx}
                                            onClick={() => scrollToPage(idx)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ease-out ${dotClasses} ${
                                                currentPage === idx
                                                    ? "bg-acm-darker-blue"
                                                    : "bg-acm-darker-blue/30 hover:bg-acm-darker-blue/60"
                                            }`}
                                        />
									);
								})}
							</div>

							{/* right arrow */}
							<button
								onClick={() => scrollToPage(currentPage + 1)}
								disabled={currentPage === pages.length - 1}
								className="flex cursor-pointer items-center justify-center text-acm-darker-blue transition-opacity duration-300 hover:opacity-70 disabled:pointer-events-none disabled:opacity-0"
							>
								<ChevronRight strokeWidth={3} size={20} />
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
