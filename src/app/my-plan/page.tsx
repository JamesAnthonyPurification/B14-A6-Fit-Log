"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/plan-context";
import { SortKey, Workout } from "@/types/workout";
import PlanCard from "@/components/plan-card";
import SortDropdown from "@/components/sort-dropdown";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const { plan, saved, loaded, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const [tab, setTab] = useState<Tab>("today");
  const [sortKey, setSortKey] = useState<SortKey>("duration");

  const activeList: Workout[] = tab === "today" ? plan : saved;

  const stats = useMemo(
    () =>
      activeList.reduce(
        (totals, w) => ({
          count: totals.count + 1,
          minutes: totals.minutes + w.duration,
          calories: totals.calories + w.caloriesBurned,
        }),
        { count: 0, minutes: 0, calories: 0 }
      ),
    [activeList]
  );

  const sortedList = useMemo(() => {
    const list = [...activeList];
    list.sort((a, b) => {
      if (sortKey === "rating") return b.rating - a.rating;
      return a[sortKey] - b[sortKey];
    });
    return list;
  }, [activeList, sortKey]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-6 grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="px-6 py-5">
          <p className="text-sm text-muted-2">Exercises</p>
          <p className="mt-1 font-display text-3xl font-bold text-accent">
            {stats.count}
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-2">Minutes</p>
          <p className="mt-1 font-display text-3xl font-bold text-white">
            {stats.minutes}
          </p>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-muted-2">Calories</p>
          <p className="mt-1 font-display text-3xl font-bold text-white">
            {stats.calories}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Plan lists"
          className="flex items-center gap-1 rounded-full border border-border bg-surface p-1"
        >
          <button
            role="tab"
            aria-selected={tab === "today"}
            onClick={() => setTab("today")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === "today"
                ? "bg-white text-black"
                : "text-muted hover:text-white"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            role="tab"
            aria-selected={tab === "saved"}
            onClick={() => setTab("saved")}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              tab === "saved"
                ? "bg-white text-black"
                : "text-muted hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        <SortDropdown value={sortKey} onChange={setSortKey} />
      </div>

      <div className="mt-6 space-y-4">
        {!loaded && (
          <p className="py-10 text-center text-muted">Loading workouts…</p>
        )}

        {loaded && sortedList.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border py-16 text-center">
            <h2 className="font-display text-xl font-bold uppercase text-white">
              Nothing Here Yet
            </h2>
            <p className="mt-2 text-muted">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              Go to workouts
            </Link>
          </div>
        )}

        {loaded &&
          sortedList.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              showMarkDone={tab === "today"}
              onMarkDone={() => markAsDone(workout.id)}
              onRemove={() =>
                tab === "today"
                  ? removeFromPlan(workout.id)
                  : removeFromSaved(workout.id)
              }
            />
          ))}
      </div>
    </div>
  );
}
