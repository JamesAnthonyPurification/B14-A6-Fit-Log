"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/plan-context";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold uppercase tracking-wide text-white"
        >
          <Dumbbell className="h-5 w-5 text-accent" />
          FitLog
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-border bg-surface/60 p-1 md:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-muted hover:text-white"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-muted hover:text-white"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-border px-1.5 text-xs font-bold text-white">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center gap-1 border-t border-border px-4 py-2 md:hidden">
        {links.map((link) => {
          const isActive =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                isActive ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
