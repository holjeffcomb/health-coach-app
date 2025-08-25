import { useState, useEffect } from "react";
import type { FormData, Scores, Grade } from "../types/wellness";
import { calculateScores, getGradeFromScore } from "../utils/scoringUtils";

export const useWellnessCalculator = () => {
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    a1c: "",
    ldl: "",
    lpa: "",
    apoB: "",
    systolic: "",
    diastolic: "",
    waistHeightRatio: "",
    vo2Max: "",
    gripStrength: "",
    bodyFat: "",
    smm: "",
    triglycerides: "",
    totalCholesterol: "",
    hdl: "",
  });

  const [scores, setScores] = useState<Scores>({
    metabolic: 0,
    vo2Max: 0,
    gripStrength: 0,
    bodyComposition: 0,
    total: 0,
  });

  const [grade, setGrade] = useState<Grade>({
    grade: "",
    meaning: "",
    color: "",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<{
    id: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    const newScores = calculateScores(formData);
    setScores(newScores);
    setGrade(getGradeFromScore(newScores.total));
  }, [formData]);

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const loadTestScenario = (scenarioData: FormData) => {
    setFormData(scenarioData);
  };

  const saveAssessment = async (title?: string) => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title || `Assessment ${new Date().toLocaleDateString()}`,
          formData,
          scores,
          grade,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLastSaved({
          id: result.assessment.id,
          timestamp: result.assessment.created_at,
        });
        return { success: true, data: result.assessment };
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Save failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      return { success: false, error: errorMessage };
    } finally {
      setIsSaving(false);
    }
  };

  const clearForm = () => {
    setFormData({
      age: "",
      sex: "",
      a1c: "",
      ldl: "",
      lpa: "",
      apoB: "",
      systolic: "",
      diastolic: "",
      waistHeightRatio: "",
      vo2Max: "",
      gripStrength: "",
      bodyFat: "",
      smm: "",
      triglycerides: "",
      totalCholesterol: "",
      hdl: "",
    });
  };

  return {
    formData,
    scores,
    grade,
    handleInputChange,
    loadTestScenario,
    clearForm,
    saveAssessment,
    isSaving,
    lastSaved,
  };
};
