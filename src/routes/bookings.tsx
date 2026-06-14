import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/AppShell";
import { listMyBookings } from "@/lib/data.functions";
import { formatNaira } from "@/lib/format";
import { Loader2, Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/bookings")({
  head: () => ({ meta: [{ title: "My Bookings — SkillGate" }] }),
  component: BookingsPage,
});

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  en_route: "bg-amber-100 text-amber-700",
  in_progress: "bg-green-100 text-green-700",
  completed: "bg-slate-100 text-slate-600",
  cancelled: "bg-red-100 text-red-700",
};

function BookingsPage() {
  const fetchBookings = useServerFn(listMyBookings);
  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => fetchBookings(),
  });

  return (
    <AppShell>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-1">My Bookings</h1>
        <p className="text-slate-500 mb-6">Track your active and completed jobs.</p>

        {isLoading ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        ) : (data ?? []).length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-slate-200 bg-white">
            <p className="text-slate-500 mb-3">You haven't booked anyone yet.</p>
            <Link
              to="/browse"
              className="inline-block rounded-xl bg-[#0F172A] px-5 py-2.5 text-sm font-bold text-white"
            >
              Browse artisans
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {(data ?? []).map((b: any) => (
              <div key={b.id} className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={b.artisans?.avatar_url ?? `https://i.pravatar.cc/100?u=${b.artisan_id}`}
                      alt={b.artisans?.full_name}
                      className="h-12 w-12 rounded-xl object-cover bg-slate-100"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-[#0F172A] truncate">{b.artisans?.full_name}</div>
                      <div className="text-xs text-slate-500 capitalize">{b.artisans?.category_slug}</div>
                    </div>
                  </div>
                  <span
                    className={
                      "shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-full " +
                      (statusColors[b.status] ?? "bg-slate-100 text-slate-600")
                    }
                  >
                    {b.status?.replace("_", " ")}
                  </span>
                </div>

                <p className="mt-3 text-sm text-slate-700">{b.description}</p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(b.scheduled_at).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                  {b.address && (
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> {b.address}
                    </span>
                  )}
                  {b.price && (
                    <span className="font-bold text-[#0F172A]">{formatNaira(b.price)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}