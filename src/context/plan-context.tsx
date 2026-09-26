"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import toast from "react-hot-toast";
import { PlanItem, Workout } from "@/types/workout";

export const PLAN_CAP = 5;

interface PlanContextValue {
  plan: PlanItem[];
  saved: Workout[];
  loaded: boolean;
  addToPlan: (workout: Workout) => void;
  addToSaved: (workout: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markAsDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isPlanFull: boolean;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanItem[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch {
      // ignore malformed storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, loaded]);

  const isInPlan = (id: number) => plan.some((p) => p.id === id);
  const isSaved = (id: number) => saved.some((s) => s.id === id);

  const addToPlan = (workout: Workout) => {
    if (isInPlan(workout.id)) {
      toast.error(`${workout.name} is already in today's plan`);
      return;
    }
    if (plan.length >= PLAN_CAP) {
      toast.error("Today's plan is full — finish a lift or remove one first");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan");
  };

  const addToSaved = (workout: Workout) => {
    if (isSaved(workout.id)) {
      toast.error(`${workout.name} is already saved`);
      return;
    }
    setSaved((prev) => [...prev, workout]);
    toast.success("Saved for later");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((p) => p.id !== id));
    toast.success("Removed from today's plan");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((s) => s.id !== id));
    toast.success("Removed from saved");
  };

  const markAsDone = (id: number) => {
    const item = plan.find((p) => p.id === id);
    setPlan((prev) => prev.filter((p) => p.id !== id));
    if (item) toast.success(`${item.name} marked as done`);
  };

  const value = useMemo(
    () => ({
      plan,
      saved,
      loaded,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
      isInPlan,
      isSaved,
      isPlanFull: plan.length >= PLAN_CAP,
    }),
    [plan, saved, loaded]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
