// components/BodyCompositionForm.tsx
import React from "react";
import { Scale } from "lucide-react";
import { Tooltip } from "./Tooltip";
import type { FormData } from "../types/wellness";

interface BodyCompositionFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const BodyCompositionForm: React.FC<BodyCompositionFormProps> = ({
  formData,
  onInputChange,
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-4 lg:col-span-2">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
        <Scale className="w-5 h-5" />
        Body Composition
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Tooltip content="Percentage of your body weight that is fat. Healthy ranges: Men 10-20%, Women 16-25%. Lower isn't always better.">
            <label className="block text-sm font-medium text-gray-600">
              Body Fat (%)
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={formData.bodyFat}
            onChange={(e) => onInputChange("bodyFat", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="15"
          />
        </div>
        <div>
          <Tooltip content="Percentage of body weight that is skeletal muscle. Higher values indicate better metabolic health and strength. Healthy range: 38-44% for men, 28-35% for women.">
            <label className="block text-sm font-medium text-gray-600">
              Skeletal Muscle Mass (%)
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={formData.smm}
            onChange={(e) => onInputChange("smm", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="42"
          />
        </div>
      </div>
    </div>
  );
};
