"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import Hero from "@/components/hero";
import WorkoutCard from "@/components/workout-card";
import WorkoutCardSkeleton from "@/components/workout-card-skeleton";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const filteredWorkouts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return workouts;
    return workouts.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        w.muscleGroups.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [workouts, query]);

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
              The Library
            </h2>
            <p className="mt-2 text-muted">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          <div className="relative w-full max-w-xs sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or tag"
              className="w-full rounded-full border border-border bg-surface py-2 pl-9 pr-4 text-sm text-white placeholder:text-muted-2 focus:border-accent/60 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <WorkoutCardSkeleton key={i} />
            ))}

          {!loading &&
            !error &&
            filteredWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>

        {!loading && !error && filteredWorkouts.length === 0 && (
          <p className="mt-10 text-center text-muted">
            No workouts match &ldquo;{query}&rdquo;.
          </p>
        )}

        {!loading && error && (
          <p className="mt-10 text-center text-muted">
            Couldn&apos;t load workouts right now. Please try again shortly.
          </p>
        )}
      </section>
    </>
  );
}
