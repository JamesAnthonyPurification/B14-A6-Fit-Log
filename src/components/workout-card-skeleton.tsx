export default function WorkoutCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="h-56 w-full animate-pulse bg-surface-2" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-24 animate-pulse rounded-full bg-surface-2" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
        <div className="mt-2 h-4 w-full animate-pulse rounded bg-surface-2" />
      </div>
    </div>
  );
}
