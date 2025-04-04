"use client";

import { EVENT_FILTERS } from "@/lib/constants/events";
import { eventsParams } from "./params";
import { useQueryStates } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { EventCategoryType } from "@/lib/types/events";
import { use } from "react";

interface EventToolBarProps {
	availableCategories: Promise<EventCategoryType[]>;
}

export function EventsToolBar({ availableCategories }: EventToolBarProps) {
	const [params, setParams] = useQueryStates(eventsParams, {
		shallow: false,
		throttleMs: 100,
	});
	const cats = use(availableCategories);

	return (
		<div className="grid w-full grid-cols-2 gap-x-2">
			<div className="flex items-center gap-x-2">
				<Input
					placeholder="Search"
					className="h-10 rounded border border-b-2 border-r-2 border-acm-darker-blue bg-white"
				/>
			</div>
			<div className="flex items-center justify-end gap-x-2">
				<FiltersDropdown categories={cats} />
			</div>
		</div>
	);
}

function FiltersDropdown({ categories }: { categories: EventCategoryType[] }) {
	const [params, setParams] = useQueryStates(eventsParams, {
		shallow: false,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="h-10 border-acm-darker-blue"
				>
					Filters <ChevronDown size={15} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 border-acm-darker-blue">
				<DropdownMenuLabel>Filter by Categories</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{categories.map((cat) => (
					<DropdownMenuCheckboxItem
						key={cat.name}
						checked={
							params.categories.length > 0 &&
							params.categories.includes(cat.name)
						}
						onCheckedChange={() =>
							setParams({
								categories: params.categories.includes(cat.name)
									? params.categories.filter(
											(c) => c !== cat.name,
										)
									: [...params.categories, cat.name],
							})
						}
					>
						{cat.name}
					</DropdownMenuCheckboxItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Time</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={params.past}
					onCheckedChange={(checked) => setParams({ past: checked })}
				>
					Include Past Events
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
