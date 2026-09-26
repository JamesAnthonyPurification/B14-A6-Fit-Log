"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import { CalendarPlus, Bookmark, Star } from "lucide-react";
import { ApiError, getWorkoutById } from "@/lib/api";
import { Workout } from "@/types/workout";
import { usePlan } from "@/context/plan-context";

const SPEC_ROWS: { label: string; value: (w: Workout) => string | number }[] = [
  { label: "Equipment", value: (w) => w.equipment },
  { label: "Difficulty", value: (w) => w.difficulty },
  { label: "Sets", value: (w) => w.sets },
  { label: "Reps", value: (w) => w.reps },
  { label: "Duration", value: (w) => `${w.duration} min` },
  { label: "Calories", value: (w) => `${w.caloriesBurned} kcal` },
  { label: "Rating", value: (w) => w.rating },
];

export default function WorkoutDetailPage() {
  const params = useParams<{ id: string }>();
  const { addToPlan, addToSaved, isInPlan, isSaved, isPlanFull } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    let active = true;
    /* eslint-disable react-hooks/set-state-in-effect -- reset loading/error state when navigating between workout ids or retrying */
    setLoading(true);
    setNotFoundError(false);
    setErrorStatus(null);
    setWorkout(null);
    /* eslint-enable react-hooks/set-state-in-effect */
    getWorkoutById(params.id)
      .then((data) => {
        if (active) setWorkout(data);
      })
      .catch((err) => {
        if (!active) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFoundError(true);
        } else {
          setErrorStatus(err instanceof ApiError ? err.status : 0);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [params.id, retryToken]);

  if (notFoundError) {
    notFound();
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-muted">Loading workout…</p>
      </div>
    );
  }

  if (errorStatus !== null || !workout) {
    const isRateLimited = errorStatus === 429;
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-muted">
          {isRateLimited
            ? "The workout API is getting hit too fast right now (rate limited). Please wait a moment and try again."
            : "Couldn't load this workout right now. Please try again shortly."}
        </p>
        <button
          onClick={() => setRetryToken((t) => t + 1)}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-white transition-colors hover:border-accent/60"
        >
          Try Again
        </button>
      </div>
    );
  }

  const alreadyInPlan = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const addDisabled = alreadyInPlan || (isPlanFull && !alreadyInPlan);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-border bg-surface sm:h-[28rem] lg:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 text-muted">{workout.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {workout.muscleGroups.map((tag) => (
              <span
                key={tag}
                className="whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-bold text-black"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-surface">
            {SPEC_ROWS.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between px-5 py-3.5 text-sm"
              >
                <span className="font-medium uppercase tracking-wide text-muted-2">
                  {row.label}
                </span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  {row.label === "Rating" && (
                    <Star className="h-4 w-4 text-accent" />
                  )}
                  {row.value(workout)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => addToPlan(workout)}
              disabled={addDisabled}
              className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <CalendarPlus className="h-4 w-4" />
              {alreadyInPlan ? "Already in plan" : "Add to today's plan"}
            </button>
            <button
              onClick={() => addToSaved(workout)}
              disabled={alreadySaved}
              className="flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold text-white transition-colors hover:border-accent/60 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Bookmark className="h-4 w-4" />
              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>
          {isPlanFull && !alreadyInPlan && (
            <p className="mt-3 text-xs text-muted-2">
              Today&apos;s plan is full (5/5). Finish or remove a lift to add
              another.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
