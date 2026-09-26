import Image from "next/image";
import Link from "next/link";
import { Workout } from "@/types/workout";
import StatsRow from "./stats-row";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative h-56 w-full overflow-hidden bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-black"
            >
              {tag}
            </span>
          ))}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold uppercase text-white">
            {workout.name}
          </h3>
          <p className="text-sm text-muted-2">{workout.equipment}</p>
        </div>
        <div className="mt-auto border-t border-border pt-3">
          <StatsRow
            duration={workout.duration}
            calories={workout.caloriesBurned}
            rating={workout.rating}
          />
        </div>
      </div>
    </Link>
  );
}
