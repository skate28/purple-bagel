import { cn } from "@/lib/cn";

type Seed = {
  angle: number;
  kind: "sesame" | "poppy" | "salt";
  radius?: number;
};

const SEEDS: Seed[] = [
  { angle: 8, kind: "sesame" },
  { angle: 32, kind: "poppy" },
  { angle: 54, kind: "sesame", radius: 86 },
  { angle: 78, kind: "salt" },
  { angle: 102, kind: "poppy", radius: 70 },
  { angle: 126, kind: "sesame" },
  { angle: 148, kind: "salt", radius: 88 },
  { angle: 172, kind: "poppy" },
  { angle: 196, kind: "sesame", radius: 72 },
  { angle: 220, kind: "salt" },
  { angle: 244, kind: "sesame" },
  { angle: 268, kind: "poppy", radius: 84 },
  { angle: 292, kind: "sesame" },
  { angle: 316, kind: "salt", radius: 74 },
  { angle: 340, kind: "poppy" },
];

type BagelMarkProps = {
  className?: string;
  title?: string;
};

/** Illustrated bagel. Decorative unless `title` is set. */
export function BagelMark({ className, title }: BagelMarkProps) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="120" cy="120" r="108" fill="var(--pb-brand)" />
      <circle cx="120" cy="120" r="92" fill="var(--pb-cream)" />
      <path
        fill="var(--pb-paper)"
        fillRule="evenodd"
        d="M120 28a92 92 0 1 1 0 184 92 92 0 1 1 0-184zm0 58a34 34 0 1 0 0 68 34 34 0 1 0 0-68z"
      />
      <circle
        cx="120"
        cy="120"
        r="78"
        fill="none"
        stroke="var(--pb-brand-deep)"
        strokeWidth="3"
      />
      <circle cx="120" cy="120" r="34" fill="var(--pb-brand)" />
      {SEEDS.map((seed) => {
        const radius = seed.radius ?? 78;
        const radians = (seed.angle * Math.PI) / 180;
        const cx = 120 + Math.cos(radians) * radius;
        const cy = 120 + Math.sin(radians) * radius;
        if (seed.kind === "poppy") {
          return <circle key={seed.angle} cx={cx} cy={cy} r="4.2" fill="var(--pb-ink)" />;
        }
        if (seed.kind === "salt") {
          return (
            <rect
              key={seed.angle}
              x={cx - 4}
              y={cy - 3}
              width="8"
              height="6"
              rx="1.5"
              fill="var(--pb-paper)"
              stroke="var(--pb-brand-deep)"
              strokeWidth="1"
              transform={`rotate(${seed.angle} ${cx} ${cy})`}
            />
          );
        }
        return (
          <ellipse
            key={seed.angle}
            cx={cx}
            cy={cy}
            rx="8"
            ry="3.6"
            fill="var(--pb-sesame)"
            transform={`rotate(${seed.angle + 20} ${cx} ${cy})`}
          />
        );
      })}
    </svg>
  );
}
