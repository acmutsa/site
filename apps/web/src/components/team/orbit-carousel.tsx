"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export type TeamMember = {
	id: string;
	name: string;
	role?: string;
	imageUrl: string;
};

function clampMod(n: number, m: number) {
	return ((n % m) + m) % m;
}

/**
 * Sample points along an SVG path so avatars can ride it.
 */
function useOrbitPoints(
	pathRef: React.RefObject<SVGPathElement>,
	tValues: number[],
) {
	const [pts, setPts] = useState<{ x: number; y: number }[]>([]);

	useLayoutEffect(() => {
		const path = pathRef.current;
		if (!path) return;

		const update = () => {
			const len = path.getTotalLength();
			const next = tValues.map((t) => {
				const p = path.getPointAtLength(len * t);
				return { x: p.x, y: p.y };
			});
			setPts(next);
		};

		update();

		const svg = path.ownerSVGElement;
		if (!svg) return;

		const ro = new ResizeObserver(() => update());
		ro.observe(svg);

		return () => ro.disconnect();
	}, [pathRef, tValues.join(",")]);

	return pts;
}

function Avatar({
	member,
	size,
	active,
}: {
	member: TeamMember;
	size: number;
	active?: boolean;
}) {
	return (
		<div
			className={`relative grid place-items-center rounded-full border-4 border-white/90 bg-white/10 shadow-lg ${
				active ? "ring-2 ring-white/60" : ""
			}`}
			style={{ width: size, height: size }}
		>
			<img
				src={member.imageUrl}
				alt={member.name}
				className="h-full w-full rounded-full object-cover"
				draggable={false}
			/>
		</div>
	);
}

/**
 * “Landing dot” — pulses on the active slot.
 */
function PulseDot({
	xPct,
	yPct,
	trigger,
}: {
	xPct: number;
	yPct: number;
	trigger: number;
}) {
	return (
		<motion.div
			key={trigger}
			className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
			style={{ left: `${xPct}%`, top: `${yPct}%` }}
			initial={{ opacity: 0.0, scale: 0.8 }}
			animate={{ opacity: 1, scale: [0.9, 1.2, 0.95] }}
			transition={{ duration: 0.55, ease: "easeInOut" }}
		>
			<div className="h-4 w-4 rounded-full bg-white shadow" />
		</motion.div>
	);
}

/**
 * Build a smooth SVG path from a list of points using cubic Béziers.
 * Points are in viewBox coordinates.
 */
function catmullRomToBezier(points: { x: number; y: number }[]) {
	if (points.length < 2) return "";
	const p = points;

	let d = `M ${p[0].x.toFixed(2)} ${p[0].y.toFixed(2)}`;

	for (let i = 0; i < p.length - 1; i++) {
		const p0 = p[Math.max(0, i - 1)];
		const p1 = p[i];
		const p2 = p[i + 1];
		const p3 = p[Math.min(p.length - 1, i + 2)];

		// Catmull-Rom -> Bezier conversion
		const c1x = p1.x + (p2.x - p0.x) / 6;
		const c1y = p1.y + (p2.y - p0.y) / 6;
		const c2x = p2.x - (p3.x - p1.x) / 6;
		const c2y = p2.y - (p3.y - p1.y) / 6;

		d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(
			2,
		)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
	}

	return d;
}

/**
 * Generate a “globe grid” (ACM-like):
 * - Latitudes: true arched bands (won’t flatten)
 * - Longitudes: tall arcs that cross the latitudes (grid feel)
 * - Nodes: placed to feel like intersections / network points
 */
function buildGlobeGrid({
	cx,
	cy,
	r,
	latitudes,
	longitudes,
}: {
	cx: number;
	cy: number;
	r: number;
	latitudes: number[]; // in [-1..1] where 0 is equator
	longitudes: number[]; // in radians
}) {
	// === Latitude paths: TRUE arcs using cubic Béziers (guaranteed curvature) ===
	const latPaths = latitudes.map((t) => {
		const y = cy + t * r * 0.72;
		const width = Math.sqrt(Math.max(0, 1 - t * t));

		const xLeft = cx - r * 1.18 * width;
		const xRight = cx + r * 1.18 * width;

		// Curve height controls “globe” feel.
		const curveHeight = 160 + (1 - width) * 140;

		const c1x = xLeft + (xRight - xLeft) * 0.33;
		const c2x = xLeft + (xRight - xLeft) * 0.66;

		return `M ${xLeft.toFixed(2)} ${y.toFixed(2)}
			C ${c1x.toFixed(2)} ${(y - curveHeight).toFixed(2)},
			  ${c2x.toFixed(2)} ${(y - curveHeight).toFixed(2)},
			  ${xRight.toFixed(2)} ${y.toFixed(2)}`;
	});

	// === Longitude paths: tall arcs that CROSS the latitudes ===
	const lonPaths = longitudes.map((theta) => {
		const pts: { x: number; y: number }[] = [];

		const yTop = cy - r * 0.1;
		const yBot = cy + r * 0.92;

		const steps = 34;
		for (let i = 0; i <= steps; i++) {
			const u = i / steps;
			const y = yTop + (yBot - yTop) * u;

			// normalize y into [-1..1] relative to globe height
			const v = (y - cy) / (r * 0.78);
			const vv = Math.min(1, Math.max(-1, v));

			// sphere cross-section width at this y
			const w = Math.sqrt(Math.max(0, 1 - vv * vv));

			// base x for longitude
			let x = cx + r * 1.05 * Math.cos(theta) * w;

			// wrap bend (gives that “around the globe” feeling)
			const bend = (0.25 + u) * 38;
			x += bend * Math.sin(theta) * (1 - w);

			pts.push({ x, y });
		}

		return catmullRomToBezier(pts);
	});

	// === Nodes (dots): sparse but “network-ish” ===
	const nodes: { x: number; y: number; r: number; o: number }[] = [];

	// Dots along the top thick latitude (more like the logo)
	{
		const t = latitudes[0];
		const y = cy + t * r * 0.72;
		const width = Math.sqrt(Math.max(0, 1 - t * t));
		const xLeft = cx - r * 1.18 * width;
		const xRight = cx + r * 1.18 * width;

		const xList = [
			xLeft + (xRight - xLeft) * 0.14,
			xLeft + (xRight - xLeft) * 0.32,
			cx,
			xLeft + (xRight - xLeft) * 0.68,
			xLeft + (xRight - xLeft) * 0.86,
		];

		// approximate “on-curve” y by nudging upward more near center
		xList.forEach((xv, idx) => {
			const centerN = 1 - Math.min(1, Math.abs((xv - cx) / (xRight - xLeft)) * 2);
			const yv = y - (70 * centerN + 12); // sits on the arch visually
			nodes.push({
				x: xv,
				y: yv,
				r: idx === 2 ? 9.5 : 8.5,
				o: 0.95,
			});
		});
	}

	// Additional “grid” dots lower down
	nodes.push(
		{ x: cx - r * 0.62, y: cy + r * 0.26, r: 7.5, o: 0.9 },
		{ x: cx - r * 0.2, y: cy + r * 0.34, r: 7.5, o: 0.9 },
		{ x: cx, y: cy + r * 0.42, r: 7.5, o: 0.9 },
		{ x: cx + r * 0.26, y: cy + r * 0.30, r: 7.5, o: 0.9 },
		{ x: cx + r * 0.64, y: cy + r * 0.24, r: 7.5, o: 0.9 },
	);

	return { latPaths, lonPaths, nodes };
}

export default function OrbitCarousel({
	title,
	members,
}: {
	title: string;
	members: TeamMember[];
}) {
	const [activeIdx, setActiveIdx] = useState(0);
	const [prevIdx, setPrevIdx] = useState(0);

	// 5 visible slots along the main thick band
	const tSlots = useMemo(() => [0.12, 0.3, 0.5, 0.7, 0.88], []);
	const pathRef = useRef<SVGPathElement>(null);
	const pts = useOrbitPoints(pathRef, tSlots);

	useEffect(() => {
		setActiveIdx(0);
		setPrevIdx(0);
	}, [members.map((m) => m.id).join(",")]);

	const canNav = members.length > 1;

	function go(delta: number) {
		if (!canNav) return;
		setPrevIdx(activeIdx);
		setActiveIdx((i) => clampMod(i + delta, members.length));
	}

	const visible = useMemo(() => {
		if (!members.length) return [];
		const count = Math.min(5, members.length);
		const mid = Math.floor(count / 2);

		const out: { member: TeamMember; slotIndex: number; isActive: boolean }[] =
			[];

		for (let s = 0; s < count; s++) {
			const rel = s - mid;
			const idx = clampMod(activeIdx + rel, members.length);
			const slotIndex = Math.round(s + (5 - count) / 2);

			out.push({ member: members[idx], slotIndex, isActive: rel === 0 });
		}

		return out.filter((x) => x.slotIndex >= 0 && x.slotIndex < 5);
	}, [members, activeIdx]);

	const activeMember = members[activeIdx];

	// Globe grid config tuned for the wide card
	const grid = useMemo(() => {
		return buildGlobeGrid({
			cx: 600,
			cy: 600, // push down so we see the "upper hemisphere" arcs like the logo
			r: 620,
			latitudes: [-0.2, -0.05, -0.12, 0.26], // 4 bands
			longitudes: [-1.25, -0.85, -0.4, 0.4, 0.85, 1.25], // 6 longitudes
		});
	}, []);

	return (
		<div className="relative mx-auto w-full overflow-hidden rounded-3xl bg-acm-darker-blue bg-[url('/img/landing/noise.png')] bg-center px-6 pb-12 pt-10 text-white shadow-2xl">
			<div className="mb-6 flex items-end justify-between gap-6">
				<div>
					<div className="font-mono text-xs font-semibold uppercase tracking-widest text-white/70">
						{title}
					</div>
					<div className="mt-1 font-calsans text-2xl font-bold">
						{activeMember?.name ?? "—"}
					</div>
					<div className="font-mono text-xs font-semibold text-white/70">
						{activeMember?.role ?? ""}
					</div>
				</div>

				<div className="hidden md:block rounded-2xl bg-white/10 px-4 py-3 text-right">
					<div className="font-mono text-xs font-semibold uppercase tracking-widest text-white/70">
						people
					</div>
					<div className="font-calsans text-2xl font-bold">
						{members.length}
					</div>
				</div>
			</div>

			<button
				onClick={() => go(-1)}
				disabled={!canNav}
				className="absolute left-6 top-[200px] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl transition hover:bg-white/15 disabled:opacity-40"
				aria-label="Previous"
			>
				←
			</button>
			<button
				onClick={() => go(1)}
				disabled={!canNav}
				className="absolute right-6 top-[200px] grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl transition hover:bg-white/15 disabled:opacity-40"
				aria-label="Next"
			>
				→
			</button>

			<div className="relative mt-6 h-[430px] w-full">
				<svg
					className="absolute inset-0 h-full w-full"
					viewBox="0 0 1200 520"
					// IMPORTANT: crop instead of stretching
					preserveAspectRatio="xMidYMid slice"
				>
					<defs>
						<clipPath id="orbitClip">
							<rect x="0" y="0" width="1200" height="520" rx="48" />
						</clipPath>
						<filter
							id="softGlow"
							x="-30%"
							y="-30%"
							width="160%"
							height="160%"
						>
							<feGaussianBlur stdDeviation="1.0" result="blur" />
							<feMerge>
								<feMergeNode in="blur" />
								<feMergeNode in="SourceGraphic" />
							</feMerge>
						</filter>
					</defs>

					<g clipPath="url(#orbitClip)">
						{/* Main latitude band (thick) */}
						<path
							d={grid.latPaths[0]}
							fill="none"
							stroke="rgba(255,255,255,0.92)"
							strokeWidth="7"
							filter="url(#softGlow)"
						/>

						{/* Other latitudes */}
						{grid.latPaths.slice(1).map((d, i) => (
							<path
								key={`lat-${i}`}
								d={d}
								fill="none"
								stroke="rgba(255,255,255,0.42)"
								strokeWidth="5.5"
							/>
						))}

						{/* Longitudes */}
						{grid.lonPaths.map((d, i) => (
							<path
								key={`lon-${i}`}
								d={d}
								fill="none"
								stroke="rgba(255,255,255,0.28)"
								strokeWidth="5"
							/>
						))}

						{/* Nodes */}
						{grid.nodes.map((n, i) => (
							<circle
								key={`node-${i}`}
								cx={n.x}
								cy={n.y}
								r={n.r}
								fill="white"
								opacity={n.o}
							/>
						))}

						{/* Avatar travel path: follow the thick latitude band */}
						<path
							ref={pathRef}
							d={grid.latPaths[0]}
							fill="none"
							stroke="transparent"
							strokeWidth="60"
						/>
					</g>
				</svg>

				{/* Pulse dot on active slot */}
				{pts.length === 5 ? (
					<PulseDot
						xPct={(pts[2].x / 1200) * 100}
						yPct={(pts[2].y / 520) * 100}
						trigger={activeIdx + prevIdx}
					/>
				) : null}

				{/* Avatars */}
				{pts.length === 5 ? (
					<div className="absolute inset-0">
						{visible.map(({ member, slotIndex, isActive }) => {
							const p = pts[slotIndex];
							const size = isActive ? 176 : 96;

							return (
								<motion.div
									key={member.id}
									className="absolute -translate-x-1/2 -translate-y-1/2"
									initial={false}
									animate={{
										left: `${(p.x / 1200) * 100}%`,
										top: `${(p.y / 520) * 100}%`,
										scale: isActive ? 1 : 0.95,
										opacity: isActive ? 1 : 0.9,
									}}
									transition={{
										type: "spring",
										stiffness: 260,
										damping: 26,
									}}
								>
									<Avatar member={member} size={size} active={isActive} />
								</motion.div>
							);
						})}
					</div>
				) : (
					<div className="absolute inset-0 grid place-items-center">
						<div className="rounded-2xl bg-white/10 px-4 py-2 font-mono text-xs font-semibold text-white/80">
							Loading orbit…
						</div>
					</div>
				)}
			</div>

			<AnimatePresence mode="wait">
				<motion.div
					key={activeMember?.id ?? "empty"}
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.18 }}
					className="mx-auto mt-2 w-full max-w-xl rounded-3xl bg-white/10 p-4 backdrop-blur"
				>
					<div className="font-calsans text-lg font-bold">
						{activeMember?.name ?? "No members"}
					</div>
					<div className="font-mono text-xs font-semibold text-white/70">
						{activeMember?.role ?? ""}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
}
