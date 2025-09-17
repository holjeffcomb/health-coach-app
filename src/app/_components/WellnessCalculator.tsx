import React, { useState } from "react";
import {
  Calculator,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  AlertCircle,
  Heart,
  Activity,
  Dumbbell,
  Scale,
} from "lucide-react";

// Types
interface FormData {
  age: string;
  sex: string;
  a1c: string;
  ldl: string;
  triglycerides: string;
  totalCholesterol: string;
  hdl: string;
  lpa: string;
  apoB: string;
  systolic: string;
  diastolic: string;
  waistHeightRatio: string;
  vo2Max: string;
  gripStrength: string;
  bodyFat: string;
  visceralFat: string;
}

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
        <div className="absolute z-10 p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg w-64 bottom-full left-0 mb-2">
          {content}
          <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

// Step Components
const BasicInfoForm: React.FC<{
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Basic Information
        </h2>
        <p className="text-gray-600">
          Let&apos;s start with some basic details about you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div>
          <Tooltip content="Your current age in years. This helps calculate age-adjusted health metrics.">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age *
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => onInputChange("age", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            required
          />
        </div>

        <div>
          <Tooltip content="Biological sex affects metabolism and health ranges. This is used for accurate calculations.">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sex at Birth *
            </label>
          </Tooltip>
          <select
            value={formData.sex}
            onChange={(e) => onInputChange("sex", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
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
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Metabolic Health
        </h2>
        <p className="text-gray-600">
          Enter your latest lab results and blood pressure readings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {inputFields.map(({ key, label, step, tooltip }) => (
          <div key={key}>
            <Tooltip content={tooltip}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
            </Tooltip>
            <input
              type="number"
              step={step}
              value={formData[key]}
              onChange={(e) => onInputChange(key, e.target.value)}
              onWheel={handleWheel}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const FitnessForm: React.FC<{
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Fitness Measurements
        </h2>
        <p className="text-gray-600">
          These metrics provide insights into your cardiovascular and muscular
          health
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-blue-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Cardio Fitness
            </h3>
          </div>
          <Tooltip content="Maximum oxygen your body can use during exercise. Measures cardiovascular fitness and endurance capacity. Higher values indicate better heart health and longevity.">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              VO2 Max (mL/kg/min)
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.vo2Max}
            onChange={(e) => onInputChange("vo2Max", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Dumbbell className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Muscle Strength
            </h3>
          </div>
          <Tooltip content="Maximum force you can generate with your hand grip. Strong predictor of overall strength, muscle mass, and longevity. Measured with a dynamometer.">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Grip Strength (kg)
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.gripStrength}
            onChange={(e) => onInputChange("gripStrength", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>
    </div>
  );
};

const BodyCompositionForm: React.FC<{
  formData: FormData;
  onInputChange: (field: keyof FormData, value: string) => void;
}> = ({ formData, onInputChange }) => {
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.currentTarget.blur();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Body Composition
        </h2>
        <p className="text-gray-600">
          These measurements help assess your body fat distribution and health
          risks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-purple-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Body Fat</h3>
          </div>
          <Tooltip content="Percentage of your body weight that is fat tissue. Healthy ranges: Men 10-20%, Women 16-24%. Lower isn't always better - essential fat is needed for health.">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Body Fat (%)
            </label>
          </Tooltip>
          <input
            type="number"
            step="0.1"
            value={formData.bodyFat}
            onChange={(e) => onInputChange("bodyFat", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        <div className="bg-orange-50 p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-6 h-6 text-orange-600" />
            <h3 className="text-lg font-semibold text-gray-800">
              Visceral Fat
            </h3>
          </div>
          <Tooltip content="Fat around internal organs. Measured by DEXA or bioelectrical impedance. Healthy: <10. High visceral fat increases risk of diabetes and heart disease.">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Visceral Fat Rating
            </label>
          </Tooltip>
          <input
            type="number"
            value={formData.visceralFat}
            onChange={(e) => onInputChange("visceralFat", e.target.value)}
            onWheel={handleWheel}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>
      </div>
    </div>
  );
};

// Main Multi-Step Component
const MultiStepWellnessCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
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
    visceralFat: "",
  });

  const steps = [
    {
      title: "Basic Info",
      icon: Heart,
      component: BasicInfoForm,
      requiredFields: ["age", "sex"] as (keyof FormData)[],
      description: "Personal information",
    },
    {
      title: "Metabolic Health",
      icon: Heart,
      component: MetabolicHealthForm,
      requiredFields: [] as (keyof FormData)[],
      description: "Lab results & vitals",
    },
    {
      title: "Fitness",
      icon: Activity,
      component: FitnessForm,
      requiredFields: [] as (keyof FormData)[],
      description: "Performance metrics",
    },
    {
      title: "Body Composition",
      icon: Scale,
      component: BodyCompositionForm,
      requiredFields: [] as (keyof FormData)[],
      description: "Body analysis",
    },
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepComplete = (stepIndex: number) => {
    const step = steps[stepIndex];

    // For steps with required fields, check that all required fields are filled
    if (step.requiredFields.length > 0) {
      return step.requiredFields.every(
        (field) => formData[field].trim() !== ""
      );
    }

    // For optional steps, only consider complete if user has filled some fields
    // AND we want to be more restrictive about what counts as "complete"
    const stepFields: (keyof FormData)[] =
      stepIndex === 1
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

    // Only show as complete if at least half the fields are filled
    const filledFields = stepFields.filter(
      (field) => formData[field].trim() !== ""
    );
    return filledFields.length >= Math.ceil(stepFields.length / 2);
  };

  const isStepPartiallyComplete = (stepIndex: number) => {
    const stepFields: (keyof FormData)[] =
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

  const areAllStepsComplete = () => {
    return steps.every((_, index) => isStepComplete(index));
  };

  const canProceedToNext = () => {
    return (
      isStepComplete(currentStep) ||
      steps[currentStep].requiredFields.length === 0
    );
  };

  const handleSubmit = () => {
    if (areAllStepsComplete()) {
      alert("Form submitted successfully! (This is a placeholder)");
    }
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const clearForm = () => {
    const emptyFormData: FormData = {
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
      visceralFat: "",
    };
    setFormData(emptyFormData);
    setCurrentStep(0);
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 min-h-screen bg-white shadow-lg">
          <div className="p-6 border-b">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-800">
                Wellness Calculator
              </h1>
            </div>
            <button
              onClick={clearForm}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors w-full justify-center mb-4"
            >
              <RotateCcw className="w-4 h-4" />
              Clear Form
            </button>

            {areAllStepsComplete() && (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors w-full justify-center"
              >
                <Check className="w-4 h-4" />
                Submit Assessment
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isComplete = isStepComplete(index);
                const isPartial = isStepPartiallyComplete(index);
                const isCurrent = currentStep === index;

                return (
                  <button
                    key={index}
                    onClick={() => goToStep(index)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
                      isCurrent
                        ? "bg-blue-100 border-2 border-blue-300"
                        : isComplete
                        ? "bg-green-50 hover:bg-green-100 border border-green-200"
                        : isPartial
                        ? "bg-yellow-50 hover:bg-yellow-100 border border-yellow-200"
                        : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        isCurrent
                          ? "bg-blue-500 text-white"
                          : isComplete
                          ? "bg-green-500 text-white"
                          : isPartial
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isComplete ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="text-left">
                      <div
                        className={`font-medium ${
                          isCurrent
                            ? "text-blue-800"
                            : isComplete
                            ? "text-green-800"
                            : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {step.description}
                      </div>
                    </div>
                    {!isComplete &&
                      !isCurrent &&
                      step.requiredFields.length > 0 && (
                        <AlertCircle className="w-4 h-4 text-gray-400 ml-auto" />
                      )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            <div className="max-w-6xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span>
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                    Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((currentStep + 1) / steps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8 min-h-[600px] transition-all duration-300">
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
                  className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                <div className="text-center">
                  {!canProceedToNext() &&
                    steps[currentStep].requiredFields.length > 0 && (
                      <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm">
                          Please fill in the required fields
                        </span>
                      </div>
                    )}
                </div>

                {currentStep === steps.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!areAllStepsComplete()}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      areAllStepsComplete()
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Submit Assessment
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={currentStep === steps.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg font-medium transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
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

export default MultiStepWellnessCalculator;
