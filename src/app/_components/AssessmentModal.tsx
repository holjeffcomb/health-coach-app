// components/AssessmentModal.tsx
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Calendar,
  TrendingUp,
  Activity,
  Gauge,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Assessment } from "../types/wellness";

interface AssessmentModalProps {
  assessment: Assessment | null;
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({
  assessment,
  isOpen,
  onClose,
}) => {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset email/status when opening a different assessment (by id), not on every data refetch reference
  useEffect(() => {
    if (!isOpen || !assessment) return;
    setEmail("");
    setEmailStatus({ type: null, message: "" });
    setIsSending(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- assessment?.id only; full object clears email on refetch
  }, [isOpen, assessment?.id]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !assessment || !mounted) return null;

  const { form_data, scores, grade, title, created_at } = assessment;

  const handleSendEmail = async () => {
    if (!email || !email.includes("@")) {
      setEmailStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSending(true);
    setEmailStatus({ type: null, message: "" });

    try {
      const response = await fetch(`/api/assessments/${assessment.id}/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setEmailStatus({
          type: "success",
          message: "Email sent successfully!",
        });
      } else {
        setEmailStatus({
          type: "error",
          message: data.error || "Failed to send email",
        });
      }
    } catch {
      setEmailStatus({
        type: "error",
        message: "An error occurred while sending the email",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Portal to document.body so position:fixed is not clipped or re-rooted by ancestor
  // .card (overflow:hidden + hover transform) on the dashboard.
  const modal = (
    <div
      className="fixed inset-0 z-[200] flex justify-center items-start sm:items-center overflow-y-auto overscroll-y-contain bg-black/50 p-3 sm:p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="my-4 sm:my-6 w-full max-w-4xl max-h-[min(92dvh,calc(100vh-2rem))] flex flex-col rounded-xl bg-slate-100 shadow-xl ring-1 ring-black/10 touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="assessment-modal-title"
      >
        {/* Header — fixed height strip, no sticky fight with nested scroll */}
        <div className="shrink-0 border-b border-gray-200/80 bg-slate-100 px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between gap-3 rounded-t-xl">
          <div className="min-w-0 pr-2">
            <h2
              id="assessment-modal-title"
              className="text-lg sm:text-2xl font-bold text-gray-900 break-words"
            >
              {title}
            </h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1 text-sm">
              <Calendar className="w-4 h-4 shrink-0" />
              {new Date(created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 p-2 hover:bg-gray-200/80 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Single scroll region for all body content */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-4 sm:px-6 py-4 sm:py-6">
          {/* Overall Grade */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="text-center">
              <div
                className={`text-5xl sm:text-6xl font-bold mb-2 tabular-nums ${grade.color || "text-gray-800"}`}
              >
                {grade.grade}
              </div>
              <p className="text-xl text-gray-700 font-semibold">
                {grade.meaning}
              </p>
              <p className="text-gray-600 mt-2">Overall Wellness Score</p>
            </div>
          </div>

          {/* Scores Breakdown */}
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-white/80 border border-gray-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold">Health Metrics</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(scores).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                  >
                    <span className="capitalize text-gray-700 text-sm break-words">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 min-w-0">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${Math.min((value as number) * 10, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="font-semibold text-sm w-8">
                        {typeof value === "number" ? value.toFixed(1) : value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Data Summary */}
            <div className="bg-white/80 border border-gray-200 rounded-xl p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-lg flex items-center justify-center shrink-0">
                  <Gauge className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-semibold">Assessment Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <span className="text-gray-600">Age:</span>
                    <span className="font-semibold ml-2">
                      {form_data.age || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Sex:</span>
                    <span className="font-semibold ml-2">
                      {form_data.sex || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Waist/Height Ratio:</span>
                    <span className="font-semibold ml-2">
                      {form_data.waistHeightRatio || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Body Fat:</span>
                    <span className="font-semibold ml-2">
                      {form_data.bodyFat || "N/A"}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">VO2 Max:</span>
                    <span className="font-semibold ml-2">
                      {form_data.vo2Max || "N/A"} ml/kg/min
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Grip Strength:</span>
                    <span className="font-semibold ml-2">
                      {form_data.gripStrength || "N/A"} kg
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metrics */}
          <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-2">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500 shrink-0" strokeWidth={2} />
              Detailed Health Markers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
              {form_data.systolic && (
                <div>
                  <span className="text-gray-600">Blood Pressure:</span>
                  <span className="font-semibold ml-2">
                    {form_data.systolic}/{form_data.diastolic} mmHg
                  </span>
                </div>
              )}
              {form_data.a1c && (
                <div>
                  <span className="text-gray-600">HbA1c:</span>
                  <span className="font-semibold ml-2">{form_data.a1c}%</span>
                </div>
              )}
              {form_data.totalCholesterol && (
                <div>
                  <span className="text-gray-600">Total Cholesterol:</span>
                  <span className="font-semibold ml-2">
                    {form_data.totalCholesterol} mg/dL
                  </span>
                </div>
              )}
              {form_data.ldl && (
                <div>
                  <span className="text-gray-600">LDL:</span>
                  <span className="font-semibold ml-2">
                    {form_data.ldl} mg/dL
                  </span>
                </div>
              )}
              {form_data.hdl && (
                <div>
                  <span className="text-gray-600">HDL:</span>
                  <span className="font-semibold ml-2">
                    {form_data.hdl} mg/dL
                  </span>
                </div>
              )}
              {form_data.triglycerides && (
                <div>
                  <span className="text-gray-600">Triglycerides:</span>
                  <span className="font-semibold ml-2">
                    {form_data.triglycerides} mg/dL
                  </span>
                </div>
              )}
              {form_data.apoB && (
                <div>
                  <span className="text-gray-600">ApoB:</span>
                  <span className="font-semibold ml-2">
                    {form_data.apoB} mg/dL
                  </span>
                </div>
              )}
              {form_data.lpa && (
                <div>
                  <span className="text-gray-600">Lp(a):</span>
                  <span className="font-semibold ml-2">
                    {form_data.lpa} nmol/L
                  </span>
                </div>
              )}
              {form_data.smm && (
                <div>
                  <span className="text-gray-600">Skeletal Muscle Mass:</span>
                  <span className="font-semibold ml-2">{form_data.smm} kg</span>
                </div>
              )}
            </div>
          </div>

          {/* Email Section — inside same scroll area to avoid nested scroll jank */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 shrink-0" />
              Email Results
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full max-w-full box-border px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  disabled={isSending}
                />
              </div>
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSending || !email}
                className="w-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
              {isSending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  Send Results via Email
                </>
              )}
            </button>
            {emailStatus.type && (
              <div
                className={`p-3 rounded-lg flex items-center gap-2 ${
                  emailStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {emailStatus.type === "success" ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                <span className="text-sm">{emailStatus.message}</span>
              </div>
            )}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default AssessmentModal;
