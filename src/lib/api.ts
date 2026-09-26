import { Workout } from "@/types/workout";
import { getCachedWorkouts, setCachedWorkouts } from "@/lib/workout-cache";

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new ApiError(res.status, "Failed to load workouts");
  const data: Workout[] = await res.json();
  setCachedWorkouts(data);
  return data;
}

export async function getWorkoutById(id: string | number): Promise<Workout> {
  const cached = getCachedWorkouts()?.find((w) => String(w.id) === String(id));
  if (cached) return cached;

  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new ApiError(res.status, "Failed to load workout");
  return res.json();
}
