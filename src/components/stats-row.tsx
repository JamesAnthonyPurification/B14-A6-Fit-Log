import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  calories,
  rating,
}: {
  duration: number;
  calories: number;
  rating: number;
}) {
  return (
    <div className="flex items-center gap-4 text-sm text-muted">
      <span className="flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        {duration} min
      </span>
      <span className="flex items-center gap-1.5">
        <Flame className="h-4 w-4 text-accent" />
        {calories} kcal
      </span>
      <span className="flex items-center gap-1.5">
        <Star className="h-4 w-4 text-accent" />
        {rating}
      </span>
    </div>
  );
}
