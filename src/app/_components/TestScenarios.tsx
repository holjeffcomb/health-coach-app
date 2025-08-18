"use client";

// components/TestScenarios.tsx
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FormData } from "../types/wellness";
import { testScenarios } from "../constants/testScenarios";

interface TestScenariosProps {
  onLoadScenario: (scenario: FormData) => void;
  onClearForm: () => void;
}

export const TestScenarios: React.FC<TestScenariosProps> = ({
  onLoadScenario,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const scenarios = [
    {
      key: "healthyYoungMale",
      label: "Healthy Young ♂",
      className: "bg-green-100 hover:bg-green-200 text-green-800",
    },
    {
      key: "healthyYoungFemale",
      label: "Healthy Young ♀",
      className: "bg-green-100 hover:bg-green-200 text-green-800",
    },
    {
      key: "healthyMiddleAgedMale",
      label: "Healthy Mid-Age ♂",
      className: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    },
    {
      key: "healthyMiddleAgedFemale",
      label: "Healthy Mid-Age ♀",
      className: "bg-blue-100 hover:bg-blue-200 text-blue-800",
    },
    {
      key: "elderlyHealthyMale",
      label: "Healthy Senior ♂",
      className: "bg-purple-100 hover:bg-purple-200 text-purple-800",
    },
    {
      key: "elderlyHealthyFemale",
      label: "Healthy Senior ♀",
      className: "bg-purple-100 hover:bg-purple-200 text-purple-800",
    },
    {
      key: "athleticMale",
      label: "🏃‍♂️ Athletic Male",
      className: "bg-emerald-100 hover:bg-emerald-200 text-emerald-800",
    },
    {
      key: "unhealthyMale",
      label: "⚠️ Unhealthy ♂",
      className: "bg-red-100 hover:bg-red-200 text-red-800",
    },
    {
      key: "unhealthyFemale",
      label: "⚠️ Unhealthy ♀",
      className: "bg-red-100 hover:bg-red-200 text-red-800",
    },
    {
      key: "sedentaryPerson",
      label: "💺 Sedentary",
      className: "bg-orange-100 hover:bg-orange-200 text-orange-800",
    },
  ];

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-700">
          🧪 Quick Test Scenarios
        </h3>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {isVisible ? "Hide" : "Show"}
          {isVisible ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      </div>

      {isVisible && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {scenarios.map(({ key, label, className }) => (
              <button
                key={key}
                onClick={() =>
                  onLoadScenario(
                    testScenarios[key as keyof typeof testScenarios]
                  )
                }
                className={`px-3 py-2 ${className} rounded-lg text-sm font-medium transition-colors`}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
