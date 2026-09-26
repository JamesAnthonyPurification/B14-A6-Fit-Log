"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/hero";
import WorkoutCard from "@/components/workout-card";
import WorkoutCardSkeleton from "@/components/workout-card-skeleton";
import { getWorkouts } from "@/lib/api";
import { Workout } from "@/types/workout";

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
          The Library
        </h2>
        <p className="mt-2 text-muted">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <WorkoutCardSkeleton key={i} />
            ))}

          {!loading &&
            !error &&
            workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>

        {!loading && error && (
          <p className="mt-10 text-center text-muted">
            Couldn&apos;t load workouts right now. Please try again shortly.
          </p>
        )}
      </section>
    </>
  );
}
