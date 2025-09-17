// components/FitnessForm.tsx
import React from "react";
import { Activity, Dumbbell } from "lucide-react";
import { Tooltip } from "./Tooltip";
import type { FormData } from "../types/wellness";

interface FitnessFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const FitnessForm: React.FC<FitnessFormProps> = ({
  formData,
  onInputChange,
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <>
      {/* VO2 Max Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <Activity className="w-5 h-5" />
          VO2 Max - Cardio Fitness
        </h2>
        <div>
          <Tooltip content="Maximum oxygen your body can use during exercise. Measures cardiovascular fitness and endurance capacity. Higher values indicate better heart health and longevity.">
            <label className="block text-sm font-medium text-gray-600">
              VO2 Max (mL/kg/min)
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.vo2Max}
            onChange={(e) => onInputChange("vo2Max", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Grip Strength Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <Dumbbell className="w-5 h-5" />
          Grip Strength
        </h2>
        <div>
          <Tooltip content="Maximum force you can generate with your hand grip. Strong predictor of overall strength, muscle mass, and longevity. Measured with a dynamometer.">
            <label className="block text-sm font-medium text-gray-600">
              Grip Strength (kg)
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.gripStrength}
            onChange={(e) => onInputChange("gripStrength", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </>
  );
};
