export default function Loading() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-ink" role="status" aria-label="Loading">
      <span className="size-10 animate-spin rounded-full border-2 border-white/10 border-t-cobalt" />
    </div>
  );
}
