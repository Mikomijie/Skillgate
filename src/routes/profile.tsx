import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { myRoles } from "@/lib/data.functions";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, LogOut, User, Briefcase, Calendar } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — SkillGate" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const fetchRoles = useServerFn(myRoles);

  const { data: roles, isLoading: rolesLoading } = useQuery({
    queryKey: ["my-roles"],
    queryFn: () => fetchRoles(),
  });

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        navigate({ to: "/auth", search: { redirect: "/profile" } });
        return;
      }
      setEmail(data.user.email ?? null);
      setLoadingUser(false);
    });
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loadingUser || rolesLoading) {
    return (
      <AppShell>
        <div className="grid place-items-center py-32">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      </AppShell>
    );
  }

  const isArtisan = (roles ?? []).includes("artisan");

  return (
    <AppShell>
      <section className="mx-auto max-w-2xl px-4 sm:px-6 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] mb-1">My Profile</h1>
        <p className="text-slate-500 mb-6">Manage your account and view your activity.</p>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-[#0F172A] grid place-items-center text-white font-bold text-xl">
              {email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <div className="font-bold text-[#0F172A]">{email}</div>
              <div className="flex gap-1.5 mt-1 flex-wrap">
                {(roles ?? []).length === 0 ? (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Resident
                  </span>
                ) : (
                  (roles ?? []).map((r) => (
                    <span
                      key={r}
                      className="text-xs px-2 py-0.5 rounded-full bg-[#0F172A]/10 text-[#0F172A] font-semibold capitalize"
                    >
                      {r}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <Link
              to="/bookings"
              className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:border-[#0F172A] transition-colors"
            >
              <span className="inline-flex items-center gap-2 font-semibold text-[#0F172A]">
                <Calendar className="h-4 w-4" /> My Bookings
              </span>
              <span className="text-slate-400">→</span>
            </Link>

            {!isArtisan && (
              <Link
                to="/register-artisan"
                className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 hover:border-[#0F172A] transition-colors"
              >
                <span className="inline-flex items-center gap-2 font-semibold text-[#0F172A]">
                  <Briefcase className="h-4 w-4" /> Become an Artisan
                </span>
                <span className="text-slate-400">→</span>
              </Link>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
      </section>
    </AppShell>
  );
}