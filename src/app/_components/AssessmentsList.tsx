// components/AssessmentsList.tsx
import React, { useState, useEffect, useMemo } from "react";
import { Calendar, TrendingUp, Eye, Loader2 } from "lucide-react";
import AssessmentModal from "./AssessmentModal";
import { Assessment } from "../types/wellness";

interface AssessmentsListProps {
  userId: string;
}

const AssessmentsList: React.FC<AssessmentsListProps> = ({ userId }) => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectedAssessment = useMemo(
    () => assessments.find((a) => a.id === selectedId) ?? null,
    [assessments, selectedId],
  );

  useEffect(() => {
    fetchAssessments();
  }, [userId]);

  useEffect(() => {
    if (selectedId && !assessments.some((a) => a.id === selectedId)) {
      setSelectedId(null);
    }
  }, [assessments, selectedId]);

  useEffect(() => {
    if (!selectedId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedId]);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/assessments");
      const data = await response.json();

      if (data.success) {
        setAssessments(data.assessments);
      } else {
        setError("Failed to load assessments");
      }
    } catch (err) {
      console.error("Error fetching assessments:", err);
      setError("Failed to load assessments");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getGradeColor = (grade: string) => {
    const gradeColors: { [key: string]: string } = {
      "A+": "text-emerald-600 bg-emerald-50",
      A: "text-emerald-600 bg-emerald-50",
      "A-": "text-green-600 bg-green-50",
      "B+": "text-blue-600 bg-blue-50",
      B: "text-blue-600 bg-blue-50",
      "B-": "text-yellow-600 bg-yellow-50",
      "C+": "text-orange-600 bg-orange-50",
      C: "text-orange-600 bg-orange-50",
      "C-": "text-red-600 bg-red-50",
      D: "text-red-600 bg-red-50",
      F: "text-red-700 bg-red-50",
    };
    return gradeColors[grade] || "text-gray-600 bg-gray-50";
  };

  if (loading) {
    return (
      <div className="bg-slate-100 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
          <span className="text-gray-600">Loading your assessments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-slate-100 rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <div className="text-red-600 mb-2">{error}</div>
          <button
            onClick={fetchAssessments}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-slate-100 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center mr-3">
            <TrendingUp className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Your Assessment History
          </h2>
          <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
            {assessments.length}
          </span>
        </div>

        {assessments.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              No assessments yet
            </h3>
            <p className="text-gray-500">
              Take your first health assessment to see your results here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div
                key={assessment.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {assessment.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold shrink-0 ${getGradeColor(
                          assessment.grade.grade,
                        )}`}
                      >
                        {assessment.grade.grade}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 shrink-0" />
                        <span>{formatDate(assessment.created_at)}</span>
                      </div>
                      <div className="hidden sm:block line-clamp-2">
                        {assessment.grade.meaning}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedId(assessment.id)}
                    className="shrink-0 inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" strokeWidth={2} />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assessment Modal */}
      <AssessmentModal
        assessment={selectedAssessment}
        isOpen={selectedId !== null && selectedAssessment !== null}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
};

export default AssessmentsList;
