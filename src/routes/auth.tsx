import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { AppShell } from "@/components/AppShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  validateSearch: z.object({
    mode: z.enum(["login", "signup"]).optional(),
    redirect: z.string().optional(),
  }),
  head: () => ({ meta: [{ title: "Sign in — SkillGate" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { mode: initialMode, redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">(initialMode ?? "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: (redirect as any) ?? "/" });
    });
  }, []);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: name },
          },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: (redirect as any) ?? "/" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-md px-4 py-10 sm:py-16">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-black text-[#0F172A]">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "signup" ? "Join SkillGate to book verified artisans." : "Sign in to continue."}
          </p>

          <form onSubmit={handleEmail} className="mt-6 grid gap-3">
            {mode === "signup" && (
              <label className="grid gap-1 text-sm">
                <span className="text-slate-600">Full name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} required className="rounded-lg border border-slate-200 px-3 py-2" />
              </label>
            )}
            <label className="grid gap-1 text-sm">
              <span className="text-slate-600">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-slate-600">Password</span>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="rounded-lg border border-slate-200 px-3 py-2" />
            </label>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              disabled={loading}
              className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1e293b] disabled:opacity-50"
            >
              {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-600">
            {mode === "signup" ? "Already have an account? " : "New to SkillGate? "}
            <button onClick={() => setMode(mode === "signup" ? "login" : "signup")} className="font-semibold text-[#0F172A] underline">
              {mode === "signup" ? "Sign in" : "Sign up"}
            </button>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4 text-center">
            <Link to="/register-artisan" className="text-sm font-semibold text-[#475569] hover:underline">
              Are you an artisan? Apply to join →
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}