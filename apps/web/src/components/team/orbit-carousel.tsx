"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

export type OrbitPerson = {
  id: string;
  name: string;
  role?: string;
  org?: string;
  imageUrl: string;
};

export type OrbitCarouselProps = {
  people?: OrbitPerson[];
  initialIndex?: number;
};

function clampIndex(i: number, n: number) {
  if (n <= 0) return 0;
  return ((i % n) + n) % n;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

type Pt = { x: number; y: number };

function ellipsePoint(cx: number, cy: number, rx: number, ry: number, theta: number): Pt {
  return {
    x: cx + rx * Math.cos(theta),
    y: cy + ry * Math.sin(theta),
  };
}

function arcPoint(arc: { cx: number; cy: number; rx: number; ry: number }, t: number) {
  const thetaStart = degToRad(200);
  const thetaEnd = degToRad(340);
  const theta = lerp(thetaStart, thetaEnd, t);
  return ellipsePoint(arc.cx, arc.cy, arc.rx, arc.ry, theta);
}

function arcPathD(arc: { cx: number; cy: number; rx: number; ry: number }) {
  const a = arcPoint(arc, 0);
  const b = arcPoint(arc, 1);
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${arc.rx} ${arc.ry} 0 0 1 ${b.x.toFixed(
    2
  )} ${b.y.toFixed(2)}`;
}

function quadPath(a: Pt, c: Pt, b: Pt) {
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} Q ${c.x.toFixed(2)} ${c.y.toFixed(
    2
  )} ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export default function OrbitCarousel({ people = [], initialIndex = 0 }: OrbitCarouselProps) {
  const n = people.length;
  const [active, setActive] = useState(() => clampIndex(initialIndex, n || 1));

  useEffect(() => {
    setActive((v) => clampIndex(v, n || 1));
  }, [n]);

  if (!people || people.length === 0) {
    return (
      <div className="relative isolate overflow-hidden rounded-[44px] border border-black/5 bg-white shadow-[0_25px_60px_rgba(0,0,0,0.12)]">
        <div className="p-10">
          <div className="font-calsans text-xl font-bold text-black/80">No team members yet</div>
          <div className="mt-1 font-mono text-sm text-black/50">Pass people into OrbitCarousel.</div>
        </div>
      </div>
    );
  }

  const prev = clampIndex(active - 1, n);
  const next = clampIndex(active + 1, n);

  const activePerson = people[active];
  const prevPerson = people[prev];
  const nextPerson = people[next];

  const W = 1200;
  const H = 700;

  // Slightly wider rx so left/right travel farther before clipping (feels "off-screen")
  const arc = {
    cx: 600,
    cy: 640,
    rx: 980,
    ry: 260,
  };

  // More extreme endpoints so bubbles travel outwards (then naturally clip at card edges)
  const tLeft = 0.10;
  const tMid = 0.50;
  const tRight = 0.90;

  const pLeft = arcPoint(arc, tLeft);
  const pMid = arcPoint(arc, tMid);
  const pRight = arcPoint(arc, tRight);

  const bg = useMemo(() => {
    const rand = mulberry32(1337 + active * 97 + n * 13);

    const lineCount = 5;
    const lines = Array.from({ length: lineCount }).map(() => {
      const a: Pt = { x: lerp(-80, 220, rand()), y: lerp(520, 640, rand()) };
      const b: Pt = { x: lerp(W - 220, W + 80, rand()), y: lerp(520, 640, rand()) };
      const c: Pt = {
        x: (a.x + b.x) / 2 + lerp(-220, 220, rand()),
        y: lerp(560, 720, rand()),
      };
      return {
        d: quadPath(a, c, b),
        opacity: lerp(0.10, 0.18, rand()),
        strokeW: lerp(3.2, 4.8, rand()),
      };
    });

    return { lines, dotT: tMid };
  }, [active, n]);

  function goPrev() {
    setActive((v) => clampIndex(v - 1, n));
  }
  function goNext() {
    setActive((v) => clampIndex(v + 1, n));
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const dotPos = arcPoint(arc, bg.dotT);

  const BASE = 170;
  const sideScale = 120 / 170;

  const visible = [
    { idx: prev, person: prevPerson, pt: pLeft, scale: sideScale, emphasize: false, z: 20 },
    { idx: active, person: activePerson, pt: pMid, scale: 1, emphasize: true, z: 30 },
    { idx: next, person: nextPerson, pt: pRight, scale: sideScale, emphasize: false, z: 20 },
  ];

  return (
    <div className="relative isolate overflow-hidden rounded-[44px] bg-gradient-to-br from-[#2f7cff] to-[#2d5cff] shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
      <svg
        className="pointer-events-none absolute inset-0 z-0"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient
            id="g1"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(250 180) rotate(20) scale(520 240)"
          >
            <stop stopColor="white" stopOpacity="0.18" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <radialGradient
            id="g2"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(910 160) rotate(-12) scale(520 240)"
          >
            <stop stopColor="white" stopOpacity="0.14" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </radialGradient>

          <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width={W} height={H} fill="url(#g1)" />
        <rect x="0" y="0" width={W} height={H} fill="url(#g2)" />

        {bg.lines.map((ln, i) => (
          <path
            key={`bg-${i}`}
            d={ln.d}
            stroke="white"
            strokeOpacity={ln.opacity}
            strokeWidth={ln.strokeW}
            strokeLinecap="round"
          />
        ))}

        <path
          d={arcPathD(arc)}
          stroke="white"
          strokeOpacity="0.95"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#arcGlow)"
        />

        <circle cx={dotPos.x} cy={dotPos.y} r="8" fill="white" fillOpacity="0.95" />
      </svg>

      <div className="relative z-10 h-[600px] p-12">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-mono text-xs font-semibold tracking-[0.35em] text-white/80">
              {activePerson.org?.toUpperCase() ?? "ACM"}
            </div>
            <div className="mt-2 font-calsans text-4xl font-black text-white">{activePerson.name}</div>
            {activePerson.role ? (
              <div className="mt-1 font-mono text-sm font-semibold text-white/80">{activePerson.role}</div>
            ) : null}
          </div>

          <div className="rounded-2xl bg-white/12 px-6 py-5 text-center backdrop-blur">
            <div className="font-mono text-xs font-semibold tracking-[0.35em] text-white/80">PEOPLE</div>
            <div className="mt-1 font-calsans text-4xl font-black text-white">{n}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-10 top-1/2 z-40 -translate-y-1/2 rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Previous person"
        >
          <span className="text-3xl leading-none">‹</span>
        </button>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-10 top-1/2 z-40 -translate-y-1/2 rounded-full p-3 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Next person"
        >
          <span className="text-3xl leading-none">›</span>
        </button>

        <div className="absolute inset-0 z-30">
          {visible.map((v) => (
            <PersonBubble
              key={v.person.id}
              person={v.person}
              x={v.pt.x}
              y={v.pt.y}
              baseSize={BASE}
              scale={v.scale}
              emphasize={v.emphasize}
              zIndex={v.z}
              onClick={() => setActive(v.idx)}
            />
          ))}
        </div>

        <div className="absolute bottom-10 left-10 right-10 z-30 rounded-[28px] bg-white/12 p-10 backdrop-blur">
          <div className="font-calsans text-2xl font-black text-white">{activePerson.name}</div>
          {activePerson.role ? (
            <div className="mt-1 font-mono text-sm font-semibold text-white/80">{activePerson.role}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function PersonBubble({
  person,
  x,
  y,
  baseSize,
  scale,
  emphasize,
  zIndex,
  onClick,
}: {
  person: OrbitPerson;
  x: number;
  y: number;
  baseSize: number;
  scale: number;
  emphasize?: boolean;
  zIndex?: number;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full",
        "transition-[left,top,transform,opacity] duration-700 ease-[cubic-bezier(.22,.61,.36,1)]",
        emphasize ? "" : "hover:scale-[1.02]",
      ].join(" ")}
      style={{
        left: `${(x / 1200) * 100}%`,
        top: `${(y / 700) * 100}%`,
        width: `${baseSize}px`,
        height: `${baseSize}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: emphasize ? 1 : 0.9,
        zIndex,
      }}
      aria-label={person.name}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white/85 shadow-[0_20px_50px_rgba(0,0,0,0.30)]">
        <Image
          alt={person.name}
          src={person.imageUrl}
          fill
          className="object-cover"
          sizes="200px"
          priority={emphasize}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_0_10px_rgba(255,255,255,0.06)]" />
    </button>
  );
}
