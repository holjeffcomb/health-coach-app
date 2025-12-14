// app/_components/WellnessCalculator.tsx
import React, { useState } from "react";
import {
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Activity,
  Gauge,
  Dumbbell,
  Scale,
  BadgeCheck,
  XCircle,
  Heart,
  Ruler,
} from "lucide-react";
import type { User } from "../types/wellness";
import { calculateScores, getGradeFromScore } from "../utils/scoringUtils";
import type { FormData, Scores, Grade } from "../types/wellness";

// Extended FormData for the component (includes visceralFat for UI)
interface ExtendedFormData extends FormData {
  visceralFat: string;
  height: string;
  weight: string;
}

type WellnessCalculatorProps = {
  user: User; // required; App renders this only when a user exists
};

// Tooltip Component
const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({
  content,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 p-4 text-sm text-white bg-slate-800 rounded-xl shadow-lg w-64 bottom-full left-0 mb-2 border border-slate-700">
          {content}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
        </div>
      )}
    </div>
  );
};

// Step Components
const BasicInfoForm: React.FC<{
  formData: ExtendedFormData;
  onInputChange: (field: keyof ExtendedFormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-haloNavy mb-3 leading-tight">
          Basic Information
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Let&apos;s start with some basic details about you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div>
          <Tooltip content="Your current age in years. This helps calculate age-adjusted health metrics.">
            <label className="block text-sm font-semibold text-haloNavy mb-3">
              Age *
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-calmGray rounded-xl focus:ring-2 focus:ring-haloBlue focus:border-transparent text-lg bg-white shadow-soft"
            required
          />
        </div>

        <div>
          <Tooltip content="Biological sex affects metabolism and health ranges. This is used for accurate calculations.">
            <label className="block text-sm font-semibold text-haloNavy mb-3">
              Sex at Birth *
            </label>
          </Tooltip>
          <select
            value={formData.sex}
            onChange={(e) => onInputChange("sex", e.target.value)}
            className="w-full px-4 py-4 border border-calmGray rounded-xl focus:ring-2 focus:ring-haloBlue focus:border-transparent text-lg bg-white shadow-soft"
            required
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

const MetabolicHealthForm: React.FC<{
  formData: ExtendedFormData;
  onInputChange: (field: keyof ExtendedFormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  const inputFields: Array<{
    key: keyof FormData;
    label: string;
    step?: string;
    tooltip: string;
  }> = [
    {
      key: "a1c",
      label: "A1c (%)",
      step: "0.1",
      tooltip:
        "Hemoglobin A1c measures average blood sugar over 2-3 months. Normal: <5.7%, Prediabetes: 5.7-6.4%, Diabetes: ≥6.5%",
    },
    {
      key: "ldl",
      label: "LDL-C (mg/dL)",
      tooltip:
        "Low-density lipoprotein or 'bad' cholesterol. Optimal: <100 mg/dL. Higher levels increase heart disease risk.",
    },
    {
      key: "triglycerides",
      label: "Triglycerides (mg/dL)",
      tooltip:
        "Blood fats that store energy. Normal: <150 mg/dL. High levels linked to heart disease and metabolic syndrome.",
    },
    {
      key: "totalCholesterol",
      label: "Total Cholesterol (mg/dL)",
      tooltip:
        "Combined LDL, HDL, and other cholesterol. Desirable: <200 mg/dL. Used with other lipids for heart risk assessment.",
    },
    {
      key: "hdl",
      label: "HDL (mg/dL)",
      tooltip:
        "High-density lipoprotein or 'good' cholesterol. Higher is better: Men >40, Women >50 mg/dL. Helps remove bad cholesterol.",
    },
    {
      key: "lpa",
      label: "Lp(a) (nmol/L)",
      tooltip:
        "Lipoprotein(a) is a genetic risk factor for heart disease. Normal: <75 nmol/L. High levels increase cardiovascular risk.",
    },
    {
      key: "apoB",
      label: "ApoB (mg/dL)",
      tooltip:
        "Apolipoprotein B measures the number of cholesterol particles. More accurate than LDL for heart risk. Optimal: <90 mg/dL.",
    },
    {
      key: "systolic",
      label: "Systolic Blood Pressure (mmHg)",
      tooltip:
        "Top blood pressure number when heart beats. Normal: <120 mmHg. High blood pressure damages arteries over time.",
    },
    {
      key: "diastolic",
      label: "Diastolic Blood Pressure (mmHg)",
      tooltip:
        "Bottom blood pressure number when heart rests. Normal: <80 mmHg. Measures pressure between heartbeats.",
    },
    {
      key: "waistHeightRatio",
      label: "Waist/Height Ratio",
      step: "0.01",
      tooltip:
        "Waist circumference divided by height. Measures abdominal fat. Healthy: <0.5 for men, <0.46 for women. Better predictor than BMI.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-haloNavy mb-3 leading-tight">
          Metabolic Health
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Enter your latest lab results and blood pressure readings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {inputFields.map(({ key, label, step, tooltip }) => (
          <div key={key}>
            <Tooltip content={tooltip}>
              <label className="block text-sm font-semibold text-haloNavy mb-3">
                {label}
              </label>
            </Tooltip>
            <input
              type="number"
              step={step}
              value={formData[key]}
              onChange={(e) => onInputChange(key, e.target.value)}
              onWheel={handleWheel}
              className="w-full px-4 py-4 border border-calmGray rounded-xl focus:ring-2 focus:ring-haloBlue focus:border-transparent bg-white shadow-soft"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const FitnessForm: React.FC<{
  formData: ExtendedFormData;
  onInputChange: (field: keyof ExtendedFormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-haloNavy mb-3 leading-tight">
          Fitness Measurements
        </h2>
        <p className="text-gray-600 leading-relaxed">
          These metrics provide insights into your cardiovascular and muscular
          health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-50 to-recoveryEmerald/10 p-8 rounded-2xl border border-emerald-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-stone-500 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-haloNavy">Cardio Fitness</h3>
          </div>
          <Tooltip content="Maximum oxygen your body can use during exercise. Measures cardiovascular fitness and endurance capacity. Higher values indicate better heart health and longevity.">
            <label className="block text-sm font-semibold text-haloNavy mb-4">
              VO2 Max (mL/kg/min)
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.vo2Max}
            onChange={(e) => onInputChange("vo2Max", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-calmGray rounded-xl focus:ring-2 focus:ring-recoveryEmerald focus:border-transparent text-lg bg-white shadow-soft"
          />
        </div>

        <div className="bg-gradient-to-br from-gold-50 to-vitalityGold/10 p-8 rounded-2xl border border-gold-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-stone-500 rounded-xl flex items-center justify-center">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-haloNavy">Muscle Strength</h3>
          </div>
          <Tooltip content="Maximum force you can generate with your hand grip. Strong predictor of overall strength, muscle mass, and longevity. Measured with a dynamometer.">
            <label className="block text-sm font-semibold text-haloNavy mb-4">
              Grip Strength (kg)
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.gripStrength}
            onChange={(e) => onInputChange("gripStrength", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-calmGray rounded-xl focus:ring-2 focus:ring-vitalityGold focus:border-transparent text-lg bg-white shadow-soft"
          />
        </div>
      </div>
    </div>
  );
};

const BodyCompositionForm: React.FC<{
  formData: ExtendedFormData;
  onInputChange: (field: keyof ExtendedFormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-haloNavy mb-3 leading-tight">
          Body Composition
        </h2>
        <p className="text-gray-600 leading-relaxed">
          These measurements help assess your body fat distribution and health
          risks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-slate-100 border border-slate-300 p-8 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md">
              <Ruler className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Height</h3>
          </div>
          <Tooltip content="Your height in centimeters or inches. Used for BMI calculations and body composition analysis.">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Height (cm)
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={formData.height}
            onChange={(e) => onInputChange("height", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent text-lg bg-white shadow-sm"
            placeholder="175"
          />
        </div>

        <div className="bg-slate-100 border border-slate-300 p-8 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md">
              <Scale className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Weight</h3>
          </div>
          <Tooltip content="Your body weight in kilograms or pounds. Used for BMI calculations and body composition analysis.">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Weight (kg)
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => onInputChange("weight", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent text-lg bg-white shadow-sm"
            placeholder="75"
          />
        </div>

        <div className="bg-slate-100 border border-slate-300 p-8 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md">
              <Activity className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Body Fat</h3>
          </div>
          <Tooltip content="Percentage of your body weight that is fat tissue. Healthy ranges: Men 10-20%, Women 16-24%. Lower isn't always better - essential fat is needed for health.">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Body Fat (%)
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={formData.bodyFat}
            onChange={(e) => onInputChange("bodyFat", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent text-lg bg-white shadow-sm"
          />
        </div>

        <div className="bg-slate-100 border border-slate-300 p-8 rounded-2xl shadow-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md">
              <Heart className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Visceral Fat</h3>
          </div>
          <Tooltip content="Fat around internal organs. Measured by DEXA or bioelectrical impedance. Healthy: <10. High visceral fat increases risk of diabetes and heart disease.">
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Visceral Fat Rating
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.visceralFat}
            onChange={(e) => onInputChange("visceralFat", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent text-lg bg-white shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

// Main Multi-Step Component
const WellnessCalculator: React.FC<WellnessCalculatorProps> = ({ user }) => {
  const [showUserBanner] = useState(true);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ExtendedFormData>({
    age: "",
    sex: "",
    a1c: "",
    ldl: "",
    triglycerides: "",
    totalCholesterol: "",
    hdl: "",
    lpa: "",
    apoB: "",
    systolic: "",
    diastolic: "",
    waistHeightRatio: "",
    vo2Max: "",
    gripStrength: "",
    bodyFat: "",
    smm: "",
    visceralFat: "",
    height: "",
    weight: "",
  });

  // Calculate scores and grade from form data
  const scores: Scores = calculateScores(formData);
  const grade: Grade = getGradeFromScore(scores.total);

  // Save state
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const steps = [
    {
      title: "Basic Info",
      icon: Activity,
      component: BasicInfoForm,
      requiredFields: ["age", "sex"] as (keyof ExtendedFormData)[],
      description: "Personal information",
    },
    {
      title: "Metabolic Health",
      icon: Activity,
      component: MetabolicHealthForm,
      requiredFields: [
        "a1c",
        "ldl",
        "triglycerides",
        "totalCholesterol",
        "hdl",
        "lpa",
        "apoB",
        "systolic",
        "diastolic",
        "waistHeightRatio",
      ] as (keyof ExtendedFormData)[],
      description: "Lab results & vitals",
    },
    {
      title: "Fitness",
      icon: Activity,
      component: FitnessForm,
      requiredFields: ["vo2Max", "gripStrength"] as (keyof ExtendedFormData)[],
      description: "Performance metrics",
    },
    {
      title: "Body Composition",
      icon: Scale,
      component: BodyCompositionForm,
      requiredFields: [
        "height",
        "weight",
        "bodyFat",
        "visceralFat",
      ] as (keyof ExtendedFormData)[],
      description: "Body analysis",
    },
  ];

  const handleInputChange = (field: keyof ExtendedFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepComplete = (stepIndex: number) => {
    const step = steps[stepIndex];
    // All steps now have requiredFields defined, so check that all required fields are filled
    return step.requiredFields.every(
      (field) => formData[field].trim() !== ""
    );
  };

  const isStepPartiallyComplete = (stepIndex: number) => {
    const stepFields: (keyof ExtendedFormData)[] =
      stepIndex === 0
        ? ["age", "sex"]
        : stepIndex === 1
        ? [
            "a1c",
            "ldl",
            "triglycerides",
            "totalCholesterol",
            "hdl",
            "lpa",
            "apoB",
            "systolic",
            "diastolic",
            "waistHeightRatio",
          ]
        : stepIndex === 2
        ? ["vo2Max", "gripStrength"]
        : ["bodyFat", "visceralFat"];

    return stepFields.some((field) => formData[field].trim() !== "");
  };

  const areAllStepsComplete = () => steps.every((_, i) => isStepComplete(i));

  const canProceedToNext = () => isStepComplete(currentStep);

  const handleSubmit = async () => {
    if (!areAllStepsComplete()) {
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Convert ExtendedFormData to FormData (remove visceralFat, ensure smm is included)
      const formDataToSave: FormData = {
        age: formData.age,
        sex: formData.sex,
        a1c: formData.a1c,
        ldl: formData.ldl,
        lpa: formData.lpa,
        apoB: formData.apoB,
        systolic: formData.systolic,
        diastolic: formData.diastolic,
        waistHeightRatio: formData.waistHeightRatio,
        vo2Max: formData.vo2Max,
        gripStrength: formData.gripStrength,
        bodyFat: formData.bodyFat,
        smm: formData.smm || "",
        triglycerides: formData.triglycerides,
        totalCholesterol: formData.totalCholesterol,
        hdl: formData.hdl,
      };

      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Assessment ${new Date().toLocaleDateString()}`,
          formData: formDataToSave,
          scores,
          grade,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save assessment");
      }

      if (result.success) {
        setSaveStatus({
          success: true,
          message: "Assessment saved successfully!",
        });
        // Clear status after 3 seconds
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        throw new Error(result.error || "Failed to save assessment");
      }
    } catch (error) {
      console.error("Save failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to save assessment";
      setSaveStatus({
        success: false,
        message: errorMessage,
      });
      // Clear error after 5 seconds
      setTimeout(() => setSaveStatus(null), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  const goToStep = (i: number) => setCurrentStep(i);
  const nextStep = () =>
    currentStep < steps.length - 1 && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const clearForm = () => {
    setFormData({
      age: "",
      sex: "",
      a1c: "",
      ldl: "",
      triglycerides: "",
      totalCholesterol: "",
      hdl: "",
      lpa: "",
      apoB: "",
      systolic: "",
      diastolic: "",
      waistHeightRatio: "",
      vo2Max: "",
      gripStrength: "",
      bodyFat: "",
      smm: "",
      visceralFat: "",
      height: "",
      weight: "",
    });
    setCurrentStep(0);
    setSaveStatus(null);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-slate-300">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 min-h-screen bg-slate-200 shadow-card flex flex-col relative">
          <div className="p-8 flex-shrink-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-bold text-haloNavy leading-tight">
                HALO Wellness
              </h1>
            </div>

            {showUserBanner && (
              <div className="text-sm text-slate-600 mb-6 p-3 bg-slate-300 rounded-lg">
                <span className="font-medium text-haloNavy">{user.email}</span>
              </div>
            )}

            <button
              onClick={clearForm}
              className="flex items-center gap-3 px-4 py-3 bg-slate-300 hover:bg-slate-400 text-slate-800 rounded-xl text-sm font-medium transition-colors w-full justify-center mb-4"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Form
            </button>

            {/* Save Status Messages */}
            {saveStatus && (
              <div
                className={`mb-4 p-3 rounded-xl flex items-center gap-2 ${
                  saveStatus.success
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {saveStatus.success ? (
                  <BadgeCheck className="w-5 h-5 text-green-600" strokeWidth={2.5} />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" strokeWidth={2} />
                )}
                <span
                  className={`text-sm font-medium ${
                    saveStatus.success ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {saveStatus.message}
                </span>
              </div>
            )}
          </div>

          <div className="p-8 flex-1 overflow-y-auto pb-32">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isComplete = isStepComplete(index);
                const isPartial = isStepPartiallyComplete(index);
                const isCurrent = currentStep === index;
                // Show warning if current step is not complete but has required fields
                const hasWarning = isCurrent && !isComplete && step.requiredFields.length > 0;

                return (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      isCurrent && isComplete
                        ? "bg-green-100 border-2 border-green-500 shadow-soft"
                        : isCurrent && hasWarning
                        ? "bg-orange-50 border-2 border-orange-400 shadow-soft"
                        : isCurrent
                        ? "bg-primary-50 border-2 border-haloBlue shadow-soft"
                        : isComplete
                        ? "bg-green-100 hover:bg-green-200 border-2 border-green-500"
                        : isPartial
                        ? "bg-gold-50 hover:bg-gold-100 border border-vitalityGold/20"
                        : "bg-slate-300 hover:bg-slate-400 border border-slate-400"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCurrent && isComplete
                          ? "bg-green-600 text-white"
                          : isCurrent && hasWarning
                          ? "bg-orange-500 text-white"
                          : isCurrent
                          ? "bg-slate-600 text-white"
                          : isComplete
                          ? "bg-green-600 text-white"
                          : isPartial
                          ? "bg-slate-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="text-left">
                      <div
                        className={`font-semibold ${
                          isCurrent && isComplete
                            ? "text-green-700"
                            : isCurrent && hasWarning
                            ? "text-orange-600"
                            : isCurrent
                            ? "text-slate-700"
                            : isComplete
                            ? "text-green-700"
                            : "text-haloNavy"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.description}
                      </div>
                    </div>
                    {hasWarning && (
                      <AlertCircle className="w-5 h-5 text-orange-500 ml-auto" />
                    )}
                    {!isComplete &&
                      !isCurrent &&
                      step.requiredFields.length > 0 && (
                        <AlertCircle className="w-5 h-5 text-gray-400 ml-auto" />
                      )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fixed Submit Button at Bottom of Sidebar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-200 shadow-lg">
            <button
              onClick={handleSubmit}
              disabled={!areAllStepsComplete() || isSaving}
              className={`flex items-center gap-3 px-4 py-4 w-full justify-center rounded-xl font-semibold transition-colors ${
                areAllStepsComplete() && !isSaving
                  ? "bg-[#059669] hover:bg-[#047857] text-white shadow-md border-2 border-[#047857]"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed border-2 border-gray-400"
              }`}
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Submit Assessment
                </>
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-12">
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span className="font-medium">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="font-medium">
                    {Math.round(
                      (steps.filter((_, i) => isStepComplete(i)).length /
                        steps.length) *
                        100
                    )}%
                    Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-haloBlue to-recoveryEmerald"
                    style={{
                      width: `${
                        (steps.filter((_, i) => isStepComplete(i)).length /
                          steps.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-slate-100 rounded-2xl shadow-card p-12 mb-8 min-h-[600px] transition-all duration-300 border border-slate-300">
                <CurrentStepComponent
                  formData={formData}
                  onInputChange={handleInputChange}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="flex items-center gap-3 px-6 py-4 bg-slate-300 hover:bg-slate-400 disabled:bg-slate-200 disabled:text-slate-500 text-slate-800 rounded-xl font-medium transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <div className="text-center">
                  {!canProceedToNext() && (
                    <div className="flex items-center gap-3 text-amber-700 bg-amber-50 px-6 py-3 rounded-xl border border-amber-200">
                      <AlertCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        Please complete all fields before proceeding
                      </span>
                    </div>
                  )}
                </div>

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!areAllStepsComplete() || isSaving}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-colors ${
                      areAllStepsComplete() && !isSaving
                        ? "bg-[#059669] hover:bg-[#047857] text-white shadow-lg border-2 border-[#047857]"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed border-2 border-gray-400"
                    }`}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Submit Assessment
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1 || !canProceedToNext()}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all ${
                      canProceedToNext() && currentStep !== steps.length - 1
                        ? "bg-[#0052a3] hover:bg-[#003d7a] text-white shadow-lg hover:shadow-xl border-2 border-[#003d7a] hover:border-[#002d5c]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-sm"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessCalculator;
