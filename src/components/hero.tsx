import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="grid gap-10 rounded-3xl border border-border bg-surface px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-5 max-w-md text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
          >
            Browse Workouts
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <Image
            src="/banner.png"
            alt="Anatomical illustration of an athlete training on a gym machine"
            width={420}
            height={420}
            className="w-full max-w-xs sm:max-w-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}
