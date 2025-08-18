// components/ResultsDisplay.tsx
import React from "react";
import type { FormData, Scores, Grade } from "../types/wellness";

interface ResultsDisplayProps {
  formData: FormData;
  scores: Scores;
  grade: Grade;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  formData,
  scores,
  grade,
}) => {
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
    </div>
  );
};
