import { Workout } from "@/types/workout";
import { getCachedWorkouts, setCachedWorkouts } from "@/lib/workout-cache";

const BASE_URLS = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function fetchFromAnyBase(path: string): Promise<Response> {
  let lastError: unknown;
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (res.ok) return res;
      lastError = new ApiError(res.status, `Request failed with ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetchFromAnyBase("");
  const data: Workout[] = await res.json();
  setCachedWorkouts(data);
  return data;
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const cached = getCachedWorkouts()?.find((w) => String(w.id) === String(id));
  if (cached) return cached;

  const res = await fetchFromAnyBase(`/${id}`);
  return res.json();
}
