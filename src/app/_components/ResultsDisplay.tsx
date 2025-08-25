// components/ResultsDisplay.tsx
import React, { useState } from "react";
import type { FormData, Scores, Grade } from "../types/wellness";
import { Save, CheckCircle } from "lucide-react";

interface ResultsDisplayProps {
  formData: FormData;
  scores: Scores;
  grade: Grade;
  onSave?: (title?: string) => Promise<{ success: boolean; error?: string }>;
  isSaving?: boolean;
  lastSaved?: { id: string; timestamp: string } | null;
  user?: object;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  formData,
  scores,
  grade,
  onSave,
  isSaving,
  lastSaved,
  user,
}) => {
  const [saveTitle, setSaveTitle] = useState("");
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  const handleSave = async () => {
    if (!onSave) return;

    const result = await onSave(saveTitle || undefined);

    if (result.success) {
      setShowSaveSuccess(true);
      setSaveTitle("");
      setTimeout(() => setShowSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Your Health & Longevity Score
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
            <div>
              <span className="font-medium">Metabolic Health</span>
              {formData.ldl && formData.totalCholesterol && (
                <div className="text-xs text-blue-600 mt-1">
                  LDL/Total:{" "}
                  {(
                    parseFloat(formData.ldl) /
                    parseFloat(formData.totalCholesterol)
                  ).toFixed(2)}
                </div>
              )}
              {formData.hdl && formData.totalCholesterol && (
                <div className="text-xs text-blue-600">
                  HDL/Total:{" "}
                  {(
                    parseFloat(formData.hdl) /
                    parseFloat(formData.totalCholesterol)
                  ).toFixed(2)}
                </div>
              )}
            </div>
            <span className="font-bold text-blue-600">
              {scores.metabolic}/100
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
            <span className="font-medium">VO2 Max</span>
            <span className="font-bold text-green-600">
              {scores.vo2Max}/100
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
            <span className="font-medium">Grip Strength</span>
            <span className="font-bold text-purple-600">
              {scores.gripStrength}/100
            </span>
          </div>
          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-lg">
            <span className="font-medium">Body Composition</span>
            <span className="font-bold text-orange-600">
              {scores.bodyComposition}/100
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div className="text-center">
            <div className={`text-6xl font-bold mb-2 ${grade.color}`}>
              {scores.total}
            </div>
            <div className="text-xl text-gray-600 mb-4">Total Score</div>
            <div className={`text-3xl font-bold mb-2 ${grade.color}`}>
              {grade.grade}
            </div>
            <div className="text-gray-600 text-center max-w-xs">
              {grade.meaning}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <strong>Enhanced Features:</strong> Now includes Skeletal Muscle Mass
          scoring and comprehensive lipid panel analysis with ratio
          calculations. Uses evidence-based sliding scale scoring with
          proportional weighting (41% metabolic, 24% VO2 max, 12% grip strength,
          24% body composition). Based on research from ADA, AHA, NHANES, Cooper
          Institute, NIH, European Working Group on Sarcopenia, ACC/AHA, and
          ESC/EAS guidelines. Results are for informational purposes only and
          should not replace professional medical advice.
        </p>
      </div>
      {/* Save Section */}
      {user && onSave && (
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Save Your Assessment
          </h3>

          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assessment Title (optional)
              </label>
              <input
                type="text"
                value={saveTitle}
                onChange={(e) => setSaveTitle(e.target.value)}
                placeholder={`Assessment ${new Date().toLocaleDateString()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Assessment
                </>
              )}
            </button>
          </div>

          {/* Success/Error Messages */}
          {showSaveSuccess && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-800 text-sm">
                Assessment saved successfully!
              </span>
            </div>
          )}

          {lastSaved && (
            <div className="mt-2 text-sm text-gray-600">
              Last saved: {new Date(lastSaved.timestamp).toLocaleString()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
