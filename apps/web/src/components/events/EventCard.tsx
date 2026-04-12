import React from "react";

export default function EventCard() {
	return (
		// change bg to white or transparent later, gray for testing
        <div className="m-auto flex w-64 flex-col gap-1 pb-1 bg-gray-200">
		{/* <div className="items-left m-auto flex h-40 w-fit flex-col bg-gray-200"> */}

			{/* change to img later */}
            <div className="relative aspect-square w-full bg-gray-400"></div>
			{/* <div className="aspect-square h-full w-full bg-gray-400" /> */}
            
            <div className="flex flex-col px-2 gap-1">
        <h2 className="font-mono font-semibold text-lg text-acm-darker-blue">Event Title</h2>
        <p className="font-mono font-sm text-acm-darker-blue">Date @ Time</p>
        <p className="font-mono font-sm text-acm-darker-blue">Location</p>
      </div>
		</div>
	);
}
