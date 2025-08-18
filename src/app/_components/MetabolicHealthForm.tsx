// components/MetabolicHealthForm.tsx
import React from "react";
import { Heart } from "lucide-react";
import { Tooltip } from "./Tooltip";
import type { FormData } from "../types/wellness";

interface MetabolicHealthFormProps {
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}

export const MetabolicHealthForm: React.FC<MetabolicHealthFormProps> = ({
  formData,
  onInputChange,
}) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const inputFields = [
    {
      key: "a1c",
      label: "A1c (%)",
      placeholder: "5.4",
      step: "0.1",
      tooltip:
        "Hemoglobin A1c measures average blood sugar over 2-3 months. Normal: <5.7%, Prediabetes: 5.7-6.4%, Diabetes: ≥6.5%",
    },
    {
      key: "ldl",
      label: "LDL-C (mg/dL)",
      placeholder: "90",
      tooltip:
        "Low-density lipoprotein or 'bad' cholesterol. Optimal: <100 mg/dL. Higher levels increase heart disease risk.",
    },
    {
      key: "triglycerides",
      label: "Triglycerides (mg/dL)",
      placeholder: "85",
      tooltip:
        "Blood fats that store energy. Normal: <150 mg/dL. High levels linked to heart disease and metabolic syndrome.",
    },
    {
      key: "totalCholesterol",
      label: "Total Cholesterol (mg/dL)",
      placeholder: "175",
      tooltip:
        "Combined LDL, HDL, and other cholesterol. Desirable: <200 mg/dL. Used with other lipids for heart risk assessment.",
    },
    {
      key: "hdl",
      label: "HDL (mg/dL)",
      placeholder: "55",
      tooltip:
        "High-density lipoprotein or 'good' cholesterol. Higher is better: Men >40, Women >50 mg/dL. Helps remove bad cholesterol.",
    },
    {
      key: "lpa",
      label: "Lp(a) (nmol/L)",
      placeholder: "40",
      tooltip:
        "Lipoprotein(a) is a genetic risk factor for heart disease. Normal: <75 nmol/L. High levels increase cardiovascular risk.",
    },
    {
      key: "apoB",
      label: "ApoB (mg/dL)",
      placeholder: "75",
      tooltip:
        "Apolipoprotein B measures the number of cholesterol particles. More accurate than LDL for heart risk. Optimal: <90 mg/dL.",
    },
    {
      key: "systolic",
      label: "Systolic Blood Pressure (mmHg)",
      placeholder: "115",
      tooltip:
        "Top blood pressure number when heart beats. Normal: <120 mmHg. High blood pressure damages arteries over time.",
    },
    {
      key: "diastolic",
      label: "Diastolic Blood Pressure (mmHg)",
      placeholder: "75",
      tooltip:
        "Bottom blood pressure number when heart rests. Normal: <80 mmHg. Measures pressure between heartbeats.",
    },
    {
      key: "waistHeightRatio",
      label: "Waist/Height Ratio",
      placeholder: "0.45",
      step: "0.01",
      tooltip:
        "Waist circumference divided by height. Measures abdominal fat. Healthy: <0.5 for men, <0.46 for women. Better predictor than BMI.",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
        <Heart className="w-5 h-5" />
        Metabolic Health
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {inputFields.map(({ key, label, placeholder, step, tooltip }) => (
          <div key={key}>
            <Tooltip content={tooltip}>
              <label className="block text-sm font-medium text-gray-600">
                {label}
              </label>
            </Tooltip>
            <input
              type="number"
              step={step}
              value={formData[key as keyof FormData]}
              onChange={(e) =>
                onInputChange(key as keyof FormData, e.target.value)
              }
              onWheel={handleWheel}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
