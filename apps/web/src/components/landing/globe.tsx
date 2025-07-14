"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Globe() {
	return (
		<div className="relative aspect-square w-full max-w-[min(900px,80vh)] overflow-hidden rounded-full border-8 border-white">
			<CircleDots
				className="absolute translate-x-[50%] translate-y-[15%]"
				circleRadius={200}
				speed={0.003}
			/>
			<CircleDots
				className="absolute -translate-x-[23%] translate-y-[25%]"
				circleRadius={250}
				speed={0.005}
			/>
			<CircleDots
				className="absolute translate-x-[25%] translate-y-[25%]"
				circleRadius={600}
				speed={-0.003}
			/>
			<CircleDots
				className="absolute translate-x-[20%] translate-y-[10%]"
				circleRadius={500}
				speed={0.003}
			/>
			<CircleDots
				className="absolute -translate-x-[23%] translate-y-[5%]"
				circleRadius={250}
				speed={-0.003}
			/>
		</div>
	);
}

interface CircleDotsProps {
	numberOfDots?: number;
	dotSize?: number;
	speed?: number;
	circleRadius?: number;
	circleColor?: string;
	dotColor?: string;
	className?: string;
}

function CircleDots({
	numberOfDots = 5,
	dotSize = 6,
	speed = 0.01,
	circleRadius = 80,
	circleColor = "white",
	dotColor = "white",
	className,
}: CircleDotsProps) {
	const [mounted, setMounted] = useState(false);
	const [angle, setAngle] = useState(0);

	// Use a fixed viewBox size
	const viewBoxSize = 500; // Fixed size for consistent scaling
	const centerPoint = viewBoxSize / 2;
	const maxRadius = viewBoxSize / 2 - dotSize; // Maximum allowed radius

	// Scale the circle radius to fit within the viewBox
	const scaledRadius = Math.min(circleRadius, maxRadius);

	// Only start animation after component is mounted
	useEffect(() => {
		setMounted(true);
		let lastTime = performance.now();
		let frameId: number;

		const animate = (currentTime: number) => {
			const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
			lastTime = currentTime;
			// Update angle and schedule next frame
			setAngle(
				(prevAngle) =>
					(prevAngle + speed * deltaTime * 120) % (Math.PI * 2),
			);
			frameId = requestAnimationFrame(animate);
		};

		// Kick off the animation loop
		frameId = requestAnimationFrame(animate);
		// Cleanup the most recent frame
		return () => cancelAnimationFrame(frameId);
	}, [speed]);

	// Generate dots
	const dots = Array.from({ length: numberOfDots }).map((_, index) => {
		const dotAngle = angle + (index * (Math.PI * 2)) / numberOfDots;
		const x = centerPoint + scaledRadius * Math.cos(dotAngle);
		const y = centerPoint + scaledRadius * Math.sin(dotAngle);
		return { x, y, id: index };
	});

	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-center",
				className,
			)}
		>
			<div className="relative aspect-square w-full">
				<svg
					className="h-full w-full"
					viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
				>
					{/* Base circle with white border */}
					<circle
						cx={centerPoint}
						cy={centerPoint}
						r={scaledRadius}
						fill="transparent"
						stroke={circleColor}
						strokeWidth="2"
						strokeOpacity="1"
					/>

					{/* Animated dots - only render on client side */}
					{mounted &&
						dots.map((dot) => (
							<circle
								key={dot.id}
								cx={dot.x}
								cy={dot.y}
								r={dotSize}
								fill={dotColor}
							/>
						))}
				</svg>
			</div>
		</div>
	);
}
