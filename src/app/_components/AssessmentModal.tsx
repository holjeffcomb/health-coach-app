// components/AssessmentModal.tsx
import React from "react";
import { X, Calendar, BarChart3, Heart, Activity } from "lucide-react";
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
  if (!isOpen || !assessment) return null;

  const { form_data, scores, grade, title, created_at } = assessment;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4" />
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
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overall Grade */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <div className="text-center">
              <div
                className="text-6xl font-bold mb-2"
                style={{ color: grade.color }}
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
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-red-500" />
                <h3 className="text-lg font-semibold">Health Metrics</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(scores).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="capitalize text-gray-700">
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
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
            <div className="bg-white border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Activity className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-semibold">Assessment Details</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-4">
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
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Detailed Health Markers
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
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
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
