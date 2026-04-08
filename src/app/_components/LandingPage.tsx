// app/_components/LandingPage.tsx — palette + type rhythm aligned with healthcoachinc.com (modernized)
"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Activity,
  Gauge,
  TrendingUp,
  ArrowRight,
  ClipboardList,
  LineChart,
  BadgeCheck,
} from "lucide-react";

interface LandingPageProps {
  onStartAssessment: () => void;
  onAuthClick?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onAuthClick,
}) => {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col text-brand-body">
      <header className="sticky top-0 z-50 border-b border-brand-charcoal/5 bg-brand-parchment/90 backdrop-blur-md shadow-[0_1px_0_rgba(218,176,83,0.18)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-[3.75rem] flex items-center justify-between gap-3">
          <div className="flex items-center min-w-0 gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-charcoal flex items-center justify-center shadow-md ring-1 ring-brand-gold/35 shrink-0">
              <Sparkles className="w-5 h-5 text-brand-gold" strokeWidth={2.5} />
            </div>
            <span className="text-base sm:text-lg font-semibold text-brand-ink tracking-tight truncate font-display">
              HALO Wellness
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={onAuthClick}
              className="text-sm font-medium text-brand-warm hover:text-brand-ink px-3 py-2 rounded-lg transition-colors"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={onStartAssessment}
              className="btn-primary text-sm px-4 py-2.5 sm:px-5"
            >
              Start assessment
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-14 sm:py-20 overflow-hidden bg-gradient-to-b from-brand-cream via-white/50 to-brand-sand/40">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 20%, var(--color-brand-gold) 0%, transparent 45%),
                radial-gradient(circle at 80% 0%, var(--color-brand-warm-muted) 0%, transparent 40%)`,
            }}
          />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-[0.7rem] sm:text-xs font-semibold text-brand-warm uppercase tracking-[0.14em] mb-4">
                What to do here
              </p>
              <h1 className="font-display text-4xl sm:text-[2.75rem] font-semibold text-brand-ink leading-[1.08] tracking-tight mb-5">
                Run your health assessment{" "}
                <span className="text-brand-warm">and see your score</span>
              </h1>
              <p className="text-base sm:text-lg text-brand-body/90 mb-4 leading-relaxed">
                Add the metrics you have (labs, blood pressure, VO2, body
                composition). We turn them into a clear metabolic, fitness, and
                body-composition score you can track over time. You’ll sign in
                once so your results save to your dashboard.
              </p>
              <p className="text-sm text-brand-warm-muted mb-8">
                <Link
                  href="/how-it-works"
                  className="text-brand-warm font-semibold hover:text-brand-gold-deep underline-offset-4 hover:underline"
                >
                  How scoring works
                </Link>
                <span className="mx-2 text-brand-warm-muted/70">·</span>
                About 5 minutes
                <span className="mx-2 text-brand-warm-muted/70">·</span>
                No payment
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  type="button"
                  onClick={onStartAssessment}
                  className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4 w-full sm:w-auto"
                >
                  Start your assessment
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center sm:text-left text-sm text-brand-body sm:pl-2">
                  Returning user?{" "}
                  <button
                    type="button"
                    onClick={onAuthClick}
                    className="font-semibold text-brand-warm hover:text-brand-gold-deep underline-offset-4 hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>

            <div className="mt-12 lg:mt-14 max-w-md mx-auto lg:mx-0 lg:max-w-sm">
              <p className="text-[0.65rem] font-semibold text-brand-warm-muted uppercase tracking-[0.12em] mb-3 text-center lg:text-left">
                Example summary
              </p>
              <div className="card">
                <div className="relative rounded-2xl p-6 text-center text-white mb-4 overflow-hidden bg-gradient-to-br from-brand-charcoal via-brand-warm to-[#1a1612] shadow-[0_12px_40px_rgba(22,22,22,0.35)] ring-1 ring-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-10%,rgba(218,176,83,0.35),transparent_55%)] pointer-events-none" />
                  <div className="relative">
                    <div className="text-4xl font-display font-semibold mb-1 text-white tabular-nums">
                      92
                    </div>
                    <div className="text-base text-white/90">Overall score</div>
                    <div className="text-brand-gold/90 text-xs font-medium mt-2 tracking-wide uppercase">
                      Illustrative only
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-brand-body">Metabolic</span>
                    <div className="w-28 bg-brand-sand rounded-full h-2 shrink-0">
                      <div className="bg-gradient-to-r from-brand-gold-deep to-brand-gold h-2 rounded-full w-4/5" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-brand-body">Fitness</span>
                    <div className="w-28 bg-brand-sand rounded-full h-2 shrink-0">
                      <div className="bg-gradient-to-r from-brand-gold-deep to-brand-gold h-2 rounded-full w-3/4" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-3">
                    <span className="text-brand-body">Body composition</span>
                    <div className="w-28 bg-brand-sand rounded-full h-2 shrink-0">
                      <div className="bg-gradient-to-r from-brand-gold-deep to-brand-gold h-2 rounded-full w-4/5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-white/70 border-t border-brand-charcoal/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-brand-ink mb-2 text-center tracking-tight">
              Three simple steps
            </h2>
            <p className="text-brand-body/85 text-center mb-10 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
              Everything flows from one goal: get a number you can compare next
              time you update your labs or training.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="card flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-charcoal flex items-center justify-center mb-4 ring-2 ring-brand-gold/25 shadow-md">
                  <ClipboardList className="w-6 h-6 text-brand-gold" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-brand-ink mb-2 text-lg">
                  1. Enter your numbers
                </h3>
                <p className="text-sm text-brand-body/90 leading-relaxed">
                  Use recent labs and vitals—skip anything you don’t have yet.
                </p>
              </div>
              <div className="card flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-charcoal flex items-center justify-center mb-4 ring-2 ring-brand-gold/25 shadow-md">
                  <LineChart className="w-6 h-6 text-brand-gold" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-brand-ink mb-2 text-lg">
                  2. Get your scores
                </h3>
                <p className="text-sm text-brand-body/90 leading-relaxed">
                  See category breakdowns and an overall grade in one view.
                </p>
              </div>
              <div className="card flex flex-col items-center text-center p-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-charcoal flex items-center justify-center mb-4 ring-2 ring-brand-gold/25 shadow-md">
                  <Activity className="w-6 h-6 text-brand-gold" strokeWidth={2} />
                </div>
                <h3 className="font-display font-semibold text-brand-ink mb-2 text-lg">
                  3. Save to your account
                </h3>
                <p className="text-sm text-brand-body/90 leading-relaxed">
                  Sign in so assessments stay in your dashboard for next time.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-warm-muted">
              <span className="inline-flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-brand-gold" />
                Fitness inputs
              </span>
              <span className="inline-flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-brand-gold" />
                Body composition
              </span>
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="w-4 h-4 text-brand-gold" />
                Metabolic markers
              </span>
            </div>

            <p className="mt-8 text-xs text-brand-warm-muted text-center max-w-2xl mx-auto leading-relaxed">
              Educational only—not a diagnosis. Talk to a clinician about
              treatment decisions.
            </p>
          </div>
        </section>

        <section className="py-12 bg-brand-parchment/50 border-t border-brand-charcoal/5">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-brand-ink mb-4 tracking-tight">
              Ready when you are
            </h2>
            <button
              type="button"
              onClick={onStartAssessment}
              className="btn-primary inline-flex items-center gap-2 px-8 py-3.5"
            >
              Start your assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-brand-sand/60 border-t border-brand-charcoal/5 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-brand-warm" strokeWidth={2} />
            <span className="font-display font-semibold text-brand-ink">
              HALO Wellness
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-brand-body">
            <button
              type="button"
              onClick={onStartAssessment}
              className="hover:text-brand-ink font-medium transition-colors"
            >
              Start assessment
            </button>
            <Link
              href="/how-it-works"
              className="hover:text-brand-ink font-medium transition-colors"
            >
              How scoring works
            </Link>
            <button
              type="button"
              onClick={onAuthClick}
              className="hover:text-brand-ink font-medium transition-colors"
            >
              Sign in
            </button>
          </div>
          <p className="text-xs text-brand-warm-muted sm:shrink-0">
            © 2026 HALO Wellness
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
