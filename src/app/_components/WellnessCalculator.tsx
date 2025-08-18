"use client";

// Main WellnessCalculator.tsx (Refactored)
import React from "react";
import { Calculator, RotateCcw } from "lucide-react";
import { useWellnessCalculator } from "../hooks/useWellnessCalculator";
import { BasicInfoForm } from "./BasicInforForm";
import { MetabolicHealthForm } from "./MetabolicHealthForm";
import { FitnessForm } from "./FitnessForm";
import { BodyCompositionForm } from "./BodyCompositionForm";
import { TestScenarios } from "./TestScenarios";
import { ResultsDisplay } from "./ResultsDisplay";

const WellnessCalculator: React.FC = () => {
  const {
    formData,
    scores,
    grade,
    handleInputChange,
    loadTestScenario,
    clearForm,
  } = useWellnessCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Enhanced Metabolic Health & Longevity Scorecard
              </h1>
            </div>
            <button
              onClick={clearForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Form
            </button>
          </div>

          <TestScenarios
            onLoadScenario={loadTestScenario}
            onClearForm={clearForm}
          />

          <div className="grid lg:grid-cols-2 gap-6">
            <BasicInfoForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            <MetabolicHealthForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            <FitnessForm
              formData={formData}
              onInputChange={handleInputChange}
            />

            <BodyCompositionForm
              formData={formData}
              onInputChange={handleInputChange}
            />
          </div>
        </div>

        <ResultsDisplay formData={formData} scores={scores} grade={grade} />
      </div>
    </div>
  );
};

export default WellnessCalculator;
