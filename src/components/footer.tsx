import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 font-display text-base font-bold uppercase tracking-wide text-white">
          <Image src="/logo.png" alt="" width={18} height={18} />
          FitLog
        </div>
        <p className="text-muted-2">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
