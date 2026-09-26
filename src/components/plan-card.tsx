import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { Workout } from "@/types/workout";
import StatsRow from "./stats-row";

export default function PlanCard({
  workout,
  showMarkDone,
  onMarkDone,
  onRemove,
}: {
  workout: Workout;
  showMarkDone: boolean;
  onMarkDone?: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-surface-2">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-display text-base font-bold uppercase text-white">
            {workout.name}
          </h3>
          <p className="text-sm text-muted-2">{workout.equipment}</p>
          <div className="mt-1">
            <StatsRow
              duration={workout.duration}
              calories={workout.caloriesBurned}
              rating={workout.rating}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-accent/60"
        >
          View Details
        </Link>
        {showMarkDone && (
          <button
            onClick={onMarkDone}
            className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
          >
            <CheckCircle2 className="h-4 w-4" />
            Mark as Done
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-red-500/60 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
