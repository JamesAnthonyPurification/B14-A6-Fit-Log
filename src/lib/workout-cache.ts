import { Workout } from "@/types/workout";

const CACHE_KEY = "fitlog:workouts-cache";
const CACHE_TTL_MS = 5 * 60 * 1000;

export function getCachedWorkouts(): Workout[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, cachedAt } = JSON.parse(raw) as {
      data: Workout[];
      cachedAt: number;
    };
    if (Date.now() - cachedAt > CACHE_TTL_MS) return null;
    return data;
  } catch {
    return null;
  }
}

export function setCachedWorkouts(data: Workout[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, cachedAt: Date.now() })
    );
  } catch {
    // sessionStorage unavailable or full; caching is a best-effort optimization
  }
}
