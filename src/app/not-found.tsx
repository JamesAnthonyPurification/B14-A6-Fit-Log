import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold uppercase text-white sm:text-3xl">
        Rep Not Found
      </h1>
      <p className="mt-3 text-muted">
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you
        back to the library.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-black transition-transform hover:scale-105"
      >
        Back to Workouts
      </Link>
    </div>
  );
}
