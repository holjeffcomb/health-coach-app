// Updated BasicInfoForm.tsx with tooltips
import React from "react";
import { Heart } from "lucide-react";
import { Tooltip } from "./Tooltip";
import type { FormData } from "../types/wellness";

interface BasicInfoFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const BasicInfoForm: React.FC<BasicInfoFormProps> = ({
  formData,
  onInputChange,
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
        <Heart className="w-5 h-5" />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Tooltip content="Your current age in years. This helps calculate age-adjusted health metrics.">
            <label className="block text-sm font-medium text-gray-600">
              Age
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <Tooltip content="Biological sex affects metabolism and health ranges. This is used for accurate calculations.">
            <label className="block text-sm font-medium text-gray-600">
              Sex at Birth
            </label>
          </Tooltip>
          <select
            value={formData.sex}
            onChange={(e) => onInputChange("sex", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
    </div>
  );
};
