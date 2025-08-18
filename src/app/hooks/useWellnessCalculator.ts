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
  };
};
