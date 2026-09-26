"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SortKey } from "@/types/workout";

const OPTIONS: { key: SortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export default function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (key: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeLabel = OPTIONS.find((o) => o.key === value)?.label ?? "Duration";

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative flex items-center gap-2 text-sm">
      <span className="text-muted-2">Sort By</span>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 font-medium text-white"
      >
        {activeLabel}
        <ChevronDown className="h-4 w-4 text-muted" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-10 mt-2 w-36 overflow-hidden rounded-lg border border-border bg-surface shadow-xl">
          {OPTIONS.map((option) => (
            <button
              key={option.key}
              onClick={() => {
                onChange(option.key);
                setOpen(false);
              }}
              className={`block w-full px-3 py-2 text-left text-sm ${
                option.key === value
                  ? "bg-accent/15 text-accent"
                  : "text-white hover:bg-surface-2"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
