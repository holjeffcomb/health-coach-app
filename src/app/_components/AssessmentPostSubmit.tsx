"use client";

import React, { useEffect, useState } from "react";
import {
  Activity,
  Save,
  FileDown,
  RotateCcw,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import type { ExtendedFormData, Grade, Scores, User } from "../types/wellness";

const CALC_HINTS = [
  "Analyzing metabolic markers…",
  "Weighting cardiovascular fitness…",
  "Evaluating body composition…",
  "Computing your composite score…",
];

export function AssessmentCalculatingView() {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setHintIndex((i) => (i + 1) % CALC_HINTS.length),
      850,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 py-16">
      <div className="relative mb-10 h-28 w-28">
        <div className="absolute inset-0 rounded-full border-4 border-brand-gold/35" />
        <div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-gold border-r-brand-warm/50 animate-spin"
          style={{ animationDuration: "1.15s" }}
        />
        <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white/80 shadow-inner ring-1 ring-brand-charcoal/5">
          <Activity
            className="h-11 w-11 text-brand-warm"
            strokeWidth={2}
            aria-hidden
          />
        </div>
      </div>
      <h2 className="font-display text-center text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
        Calculating your results
      </h2>
      <p
        className="mt-3 min-h-[3.25rem] max-w-md text-center text-base text-brand-body transition-opacity duration-300"
        key={hintIndex}
      >
        {CALC_HINTS[hintIndex]}
      </p>
      <div className="mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-brand-sand">
        <div className="assessment-calc-bar h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-warm" />
      </div>
      <p className="mt-5 text-sm text-brand-warm-muted">
        This usually takes 3–4 seconds…
      </p>
    </div>
  );
}

function labelForField(key: string): string {
  const map: Record<string, string> = {
    age: "Age",
    sex: "Sex",
    a1c: "A1c",
    ldl: "LDL",
    lpa: "Lp(a)",
    apoB: "ApoB",
    systolic: "Systolic BP",
    diastolic: "Diastolic BP",
    waistHeightRatio: "Waist-to-height ratio",
    vo2Max: "VO2 max",
    gripStrength: "Grip strength",
    bodyFat: "Body fat %",
    smm: "Skeletal muscle mass",
    triglycerides: "Triglycerides",
    totalCholesterol: "Total cholesterol",
    hdl: "HDL",
    visceralFat: "Visceral fat",
    height: "Height",
    weight: "Weight",
  };
  return map[key] ?? key.replace(/([A-Z])/g, " $1").trim();
}

async function downloadAssessmentPdf(
  user: User,
  snapshot: ExtendedFormData,
  scores: Scores,
  grade: Grade,
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 14;
  let y = 18;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.text("HALO Wellness — Assessment summary", margin, y);
  y += 9;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
  y += 5;
  doc.text(`Name: ${user.name?.trim() || "—"}`, margin, y);
  y += 5;
  doc.text(`Email: ${user.email}`, margin, y);
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(`Overall score: ${scores.total} / 100`, margin, y);
  y += 7;
  doc.setFontSize(11);
  doc.text(`Grade: ${grade.grade}`, margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const meaningLines = doc.splitTextToSize(grade.meaning, pageW - 2 * margin);
  doc.text(meaningLines, margin, y);
  y += meaningLines.length * 4.8 + 8;

  doc.setFont("helvetica", "bold");
  doc.text("Category scores", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  const rows: [string, number][] = [
    ["Metabolic health", scores.metabolic],
    ["VO2 max", scores.vo2Max],
    ["Grip strength", scores.gripStrength],
    ["Body composition", scores.bodyComposition],
  ];
  for (const [label, val] of rows) {
    if (y > 278) {
      doc.addPage();
      y = 18;
    }
    doc.text(`${label}: ${val} / 100`, margin, y);
    y += 5;
  }

  y += 5;
  if (y > 265) {
    doc.addPage();
    y = 18;
  }
  doc.setFont("helvetica", "bold");
  doc.text("Inputs (snapshot)", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  for (const [key, val] of Object.entries(snapshot)) {
    if (val === undefined || String(val).trim() === "") continue;
    const line = `${labelForField(key)}: ${val}`;
    const lines = doc.splitTextToSize(line, pageW - 2 * margin);
    for (const ln of lines) {
      if (y > 282) {
        doc.addPage();
        y = 18;
      }
      doc.text(ln, margin, y);
      y += 4.3;
    }
  }

  doc.setFontSize(8);
  if (y > 270) {
    doc.addPage();
    y = 18;
  } else {
    y += 6;
  }
  const disclaimer = doc.splitTextToSize(
    "Educational use only—not a medical diagnosis. Discuss treatment with a qualified clinician.",
    pageW - 2 * margin,
  );
  doc.text(disclaimer, margin, y);

  doc.save(
    `halo-wellness-assessment-${new Date().toISOString().slice(0, 10)}.pdf`,
  );
}

type SaveFeedback = { ok: boolean; text: string } | null;

type AssessmentResultsSummaryProps = {
  user: User;
  formSnapshot: ExtendedFormData;
  scores: Scores;
  grade: Grade;
  onSave: () => Promise<void>;
  isSaving: boolean;
  saveFeedback: SaveFeedback;
  onStartOver: () => void;
  onBackToDashboard?: () => void;
};

export function AssessmentResultsSummary({
  user,
  formSnapshot,
  scores,
  grade,
  onSave,
  isSaving,
  saveFeedback,
  onStartOver,
  onBackToDashboard,
}: AssessmentResultsSummaryProps) {
  const [pdfLoading, setPdfLoading] = useState(false);

  const handlePdf = async () => {
    setPdfLoading(true);
    try {
      await downloadAssessmentPdf(user, formSnapshot, scores, grade);
    } finally {
      setPdfLoading(false);
    }
  };

  const scoreStyle = (n: number) =>
    n >= 70 ? "text-emerald-700" : n >= 50 ? "text-amber-700" : "text-red-700";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      {onBackToDashboard && (
        <div className="mb-6">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-sm font-semibold text-halo-blue hover:text-primary-700"
          >
            ← Back to dashboard
          </button>
        </div>
      )}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-charcoal shadow-md ring-1 ring-brand-gold/35">
            <Sparkles className="h-6 w-6 text-brand-gold" strokeWidth={2} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-brand-ink sm:text-3xl">
              Your assessment summary
            </h1>
            <p className="text-sm text-brand-warm-muted">
              Review your scores, then save or export.
            </p>
          </div>
        </div>
      </div>

      <div className="card mb-8 p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-brand-ink">
              Category scores out of 100
            </h2>
            {(
              [
                ["Metabolic health", scores.metabolic],
                ["VO2 max", scores.vo2Max],
                ["Grip strength", scores.gripStrength],
                ["Body composition", scores.bodyComposition],
              ] as const
            ).map(([label, val]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-brand-charcoal/6 bg-brand-cream/40 px-4 py-3"
              >
                <span className="text-sm font-medium text-brand-body">
                  {label}
                </span>
                <span
                  className={`font-display text-lg font-semibold tabular-nums ${scoreStyle(val)}`}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-brand-charcoal via-brand-warm to-[#1a1612] px-6 py-10 text-center text-white shadow-[0_16px_48px_rgba(22,22,22,0.25)] ring-1 ring-white/10">
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-brand-gold/90">
              Overall
            </p>
            <p className="font-display mt-2 text-5xl font-semibold tabular-nums">
              {scores.total}
            </p>
            <p className="mt-1 text-sm text-white/80">Total composite score</p>
            <p className="font-display mt-6 text-3xl font-semibold text-brand-gold">
              {grade.grade}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-snug text-white/85">
              {grade.meaning}
            </p>
          </div>
        </div>
      </div>

      {saveFeedback && (
        <div
          className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
            saveFeedback.ok
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-red-200 bg-red-50 text-red-900"
          }`}
        >
          {saveFeedback.ok ? (
            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <span className="mt-0.5 block h-5 w-5 shrink-0 text-center font-bold">
              !
            </span>
          )}
          {saveFeedback.text}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => void onSave()}
          disabled={isSaving}
          className="btn-primary inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 sm:flex-none sm:min-w-[200px]"
        >
          {isSaving ? (
            <>
              <span className="loading-spinner" />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save assessment
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => void handlePdf()}
          disabled={pdfLoading}
          className="btn-secondary inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 sm:flex-none sm:min-w-[200px]"
        >
          {pdfLoading ? (
            <>
              <span className="loading-spinner" />
              Preparing PDF…
            </>
          ) : (
            <>
              <FileDown className="h-5 w-5" />
              Download PDF
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-brand-charcoal/10 bg-white px-6 py-3.5 text-sm font-semibold text-brand-warm transition-colors hover:border-brand-gold/40 hover:bg-brand-parchment/50 sm:flex-none"
        >
          <RotateCcw className="h-4 w-4" />
          New assessment
        </button>
      </div>

      <p className="mt-8 text-center text-xs leading-relaxed text-brand-warm-muted">
        Educational only—not a diagnosis. Consult your clinician about medical
        decisions.
      </p>
    </div>
  );
}
