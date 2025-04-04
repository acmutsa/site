"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export function WeArePhotoGrid() {
	// Ensure we have at least 4 photos for the grid, can be more for cycling
	const photos = [
		"bag.png",
		"birdsup.png",
		"dinochess.jpg",
		"shock.jpg",
		"walrus.jpg",
		"dinogreen.jpg",
		"rhshirt.jpg",
	];
	const photoPrefix = "/img/photos/";
	const totalPhotos = photos.length;
	const gridSize = 4; // Still conceptually 4 items
	const idleSeconds = 6;

	// State holds the index of the photo currently displayed in each grid cell
	const [currentIndices, setCurrentIndices] = useState(() => {
		// Initialize with unique non-repeating indices
		const initialIndices: number[] = [];
		for (let i = 0; i < gridSize; i++) {
			let nextIndex = i % totalPhotos;
			// Check for duplicates
			while (initialIndices.includes(nextIndex)) {
				nextIndex = (nextIndex + 1) % totalPhotos;
			}
			initialIndices.push(nextIndex);
		}
		return initialIndices;
	});

	// Animation variants for different directions
	const variants = [
		{ initial: { y: "100%" }, exit: { x: "100%" } }, // Cell0 (top-left): in from bottom, exit to right
		{ initial: { x: "-100%" }, exit: { y: "100%" } }, // Cell1 (top-right): in from left, exit downward
		{ initial: { x: "100%" }, exit: { y: "-100%" } }, // Cell2 (bottom-left): in from right, exit upward
		{ initial: { y: "-100%" }, exit: { x: "-100%" } }, // Cell3 (bottom-right): in from top, exit to left
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndices((prevIndices) => {
				// Start with the basic rotation pattern
				const nextIndices = [
					(prevIndices[2] + 1) % totalPhotos, // cell0 gets next photo after bottom-left
					(prevIndices[0] + 1) % totalPhotos, // cell1 gets next photo after top-left
					(prevIndices[3] + 1) % totalPhotos, // cell2 gets next photo after bottom-right
					(prevIndices[1] + 1) % totalPhotos, // cell3 gets next photo after top-right
				];

				// Ensure no duplicates and no unmoved photos
				for (let i = 0; i < gridSize; i++) {
					// Fix duplicate photos
					for (let j = 0; j < i; j++) {
						if (nextIndices[i] === nextIndices[j]) {
							nextIndices[i] = (nextIndices[i] + 1) % totalPhotos;
							// Check again for duplicates after incrementing
							j = -1; // Restart the inner loop
						}
					}

					// Fix unmoved photos
					if (nextIndices[i] === prevIndices[i]) {
						nextIndices[i] = (nextIndices[i] + 1) % totalPhotos;

						// After changing, check for duplicates again
						for (let j = 0; j < i; j++) {
							if (nextIndices[i] === nextIndices[j]) {
								nextIndices[i] =
									(nextIndices[i] + 1) % totalPhotos;
								j = -1; // Restart the inner loop
							}
						}
					}
				}

				return nextIndices;
			});
		}, idleSeconds * 1000); // Change image every 3 seconds

		// Clear interval on component unmount
		return () => clearInterval(interval);
	}, []);

	// Return a fragment containing the four individual animated divs
	return (
		<React.Fragment>
			{[0, 1, 2, 3].map((i) => (
				<div
					key={i} // Key for the outer div in the map
					className="relative aspect-square w-full overflow-hidden border border-acm-darker-blue/50"
				>
					<AnimatePresence initial={false}>
						<motion.div
							key={currentIndices[i]} // Key changes when image index changes
							className="absolute inset-0 flex items-center justify-center" // Animation layer fills the cell
							initial={variants[i].initial}
							animate={{ x: 0, y: 0 }}
							exit={variants[i].exit}
							transition={{ duration: 0.7, ease: "easeInOut" }}
						>
							<div className="h-[calc(100%-5rem)] w-[calc(100%-5rem)]">
								<Image
									src={`${photoPrefix}${photos[currentIndices[i]]}`}
									alt={`ACM photo ${currentIndices[i] + 1}`}
									width={500}
									height={500}
									className="h-full w-full rounded-lg"
									style={{ objectFit: "cover" }}
									priority={i < gridSize}
								/>
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			))}
		</React.Fragment>
	);
}
