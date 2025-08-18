// utils/scoringUtils.ts
import type { FormData, Scores, Grade } from "../types/wellness";
import { categoryWeights } from "../constants/scoring";

// Sliding scale function for linear interpolation
const getScoreFromRange = (
  value: number,
  low: number,
  high: number,
  lowScore: number,
  highScore: number
): number => {
  if (value <= low) return lowScore;
  if (value >= high) return highScore;
  return ((value - low) / (high - low)) * (highScore - lowScore) + lowScore;
};

// Convert 5-tier grades to 0-100 scores
const getTierScore = (
  value: number,
  optimal: number,
  good: number,
  average: number,
  poor: number,
  lowerIsBetter: boolean = true
): number => {
  if (lowerIsBetter) {
    if (value <= optimal) return 95;
    if (value <= good) return getScoreFromRange(value, optimal, good, 95, 85);
    if (value <= average)
      return getScoreFromRange(value, good, average, 85, 70);
    if (value <= poor) return getScoreFromRange(value, average, poor, 70, 55);
    return getScoreFromRange(value, poor, poor * 1.5, 55, 30);
  } else {
    if (value >= optimal) return 95;
    if (value >= good) return getScoreFromRange(value, good, optimal, 85, 95);
    if (value >= average)
      return getScoreFromRange(value, average, good, 70, 85);
    if (value >= poor) return getScoreFromRange(value, poor, average, 55, 70);
    return getScoreFromRange(value, poor * 0.5, poor, 30, 55);
  }
};

// Score individual metabolic metrics with sliding scale
const scoreMetabolicMetric = (
  value: number,
  thresholds: { excellent: number; good: number; poor: number },
  lowerIsBetter: boolean = true
): number => {
  if (lowerIsBetter) {
    if (value <= thresholds.excellent) return 100;
    if (value <= thresholds.good)
      return getScoreFromRange(
        value,
        thresholds.excellent,
        thresholds.good,
        100,
        70
      );
    if (value <= thresholds.poor)
      return getScoreFromRange(value, thresholds.good, thresholds.poor, 70, 50);
    return getScoreFromRange(
      value,
      thresholds.poor,
      thresholds.poor * 1.5,
      50,
      0
    );
  } else {
    if (value >= thresholds.excellent) return 100;
    if (value >= thresholds.good)
      return getScoreFromRange(
        value,
        thresholds.good,
        thresholds.excellent,
        70,
        100
      );
    if (value >= thresholds.poor)
      return getScoreFromRange(value, thresholds.poor, thresholds.good, 50, 70);
    return getScoreFromRange(
      value,
      thresholds.poor * 0.5,
      thresholds.poor,
      0,
      50
    );
  }
};

// Skeletal Muscle Mass scoring with sliding scale
const getSMMScore = (data: FormData): number => {
  if (!data.smm || !data.age || !data.sex) return 0;

  const smm = parseFloat(data.smm);
  const age = parseInt(data.age);
  const isMale = data.sex === "male";

  let thresholds = { excellent: 0, good: 0, average: 0, poor: 0 };

  if (isMale) {
    if (age >= 18 && age <= 30) {
      thresholds = { excellent: 42, good: 40, average: 36, poor: 32 };
    } else if (age >= 31 && age <= 50) {
      thresholds = { excellent: 40, good: 38, average: 34, poor: 30 };
    } else if (age >= 51 && age <= 70) {
      thresholds = { excellent: 38, good: 36, average: 32, poor: 29 };
    } else if (age >= 71) {
      thresholds = { excellent: 35, good: 33, average: 29, poor: 26 };
    }
  } else {
    if (age >= 18 && age <= 30) {
      thresholds = { excellent: 31, good: 29, average: 26, poor: 24 };
    } else if (age >= 31 && age <= 50) {
      thresholds = { excellent: 29, good: 27, average: 25, poor: 23 };
    } else if (age >= 51 && age <= 70) {
      thresholds = { excellent: 27, good: 25, average: 23, poor: 21 };
    } else if (age >= 71) {
      thresholds = { excellent: 25, good: 23, average: 21, poor: 19 };
    }
  }

  // Use sliding scale scoring - higher is better for SMM
  return scoreMetabolicMetric(smm, thresholds, false);
};

const getMetabolicScore = (data: FormData): number => {
  let totalScore = 0;
  let validMetrics = 0;

  // Existing A1c scoring
  if (data.a1c) {
    const a1c = parseFloat(data.a1c);
    const score = scoreMetabolicMetric(a1c, {
      excellent: 5.7,
      good: 6.4,
      poor: 7.0,
    });
    totalScore += score;
    validMetrics++;
  }

  // Enhanced LDL scoring with new ranges
  if (data.ldl) {
    const ldl = parseFloat(data.ldl);
    const score = getTierScore(ldl, 70, 99, 129, 159, true);
    totalScore += score;
    validMetrics++;
  }

  // Triglycerides scoring
  if (data.triglycerides) {
    const trig = parseFloat(data.triglycerides);
    const score = getTierScore(trig, 100, 149, 199, 499, true);
    totalScore += score;
    validMetrics++;
  }

  // Total Cholesterol scoring
  if (data.totalCholesterol) {
    const total = parseFloat(data.totalCholesterol);
    const score = getTierScore(total, 180, 199, 239, 279, true);
    totalScore += score;
    validMetrics++;
  }

  // LDL/Total Cholesterol ratio
  if (data.ldl && data.totalCholesterol) {
    const ldl = parseFloat(data.ldl);
    const total = parseFloat(data.totalCholesterol);
    const ratio = ldl / total;
    const score = getTierScore(ratio, 0.3, 0.39, 0.49, 0.59, true);
    totalScore += score;
    validMetrics++;
  }

  // HDL/Total Cholesterol ratio
  if (data.hdl && data.totalCholesterol) {
    const hdl = parseFloat(data.hdl);
    const total = parseFloat(data.totalCholesterol);
    const ratio = hdl / total;
    const score = getTierScore(ratio, 0.25, 0.24, 0.19, 0.15, false);
    totalScore += score;
    validMetrics++;
  }

  // Lp(a) scoring with sliding scale
  if (data.lpa) {
    const lpa = parseFloat(data.lpa);
    const score = scoreMetabolicMetric(lpa, {
      excellent: 50,
      good: 100,
      poor: 150,
    });
    totalScore += score;
    validMetrics++;
  }

  // ApoB scoring with sliding scale
  if (data.apoB) {
    const apoB = parseFloat(data.apoB);
    const score = scoreMetabolicMetric(apoB, {
      excellent: 80,
      good: 100,
      poor: 120,
    });
    totalScore += score;
    validMetrics++;
  }

  // Blood pressure scoring with sliding scale
  if (data.systolic && data.diastolic) {
    const sys = parseFloat(data.systolic);
    const dia = parseFloat(data.diastolic);

    const sysScore = scoreMetabolicMetric(sys, {
      excellent: 120,
      good: 129,
      poor: 140,
    });
    const diaScore = scoreMetabolicMetric(dia, {
      excellent: 80,
      good: 84,
      poor: 90,
    });

    const score = (sysScore + diaScore) / 2;
    totalScore += score;
    validMetrics++;
  }

  // Waist/Height ratio scoring with sliding scale
  if (data.waistHeightRatio) {
    const ratio = parseFloat(data.waistHeightRatio);
    const score = scoreMetabolicMetric(ratio, {
      excellent: 0.5,
      good: 0.6,
      poor: 0.7,
    });
    totalScore += score;
    validMetrics++;
  }

  return validMetrics > 0 ? totalScore / validMetrics : 0;
};

const getVO2MaxScore = (data: FormData): number => {
  if (!data.vo2Max || !data.age || !data.sex) return 0;

  const vo2 = parseFloat(data.vo2Max);
  const age = parseInt(data.age);
  const isMale = data.sex === "male";

  let thresholds = { excellent: 0, good: 0, poor: 0 };

  if (age >= 20 && age <= 29) {
    thresholds = isMale
      ? { excellent: 51, good: 40, poor: 35 }
      : { excellent: 41, good: 30, poor: 27 };
  } else if (age >= 30 && age <= 39) {
    thresholds = isMale
      ? { excellent: 47, good: 37, poor: 32 }
      : { excellent: 37, good: 28, poor: 24 };
  } else if (age >= 40 && age <= 49) {
    thresholds = isMale
      ? { excellent: 42, good: 32, poor: 28 }
      : { excellent: 33, good: 25, poor: 21 };
  } else if (age >= 50 && age <= 59) {
    thresholds = isMale
      ? { excellent: 37, good: 27, poor: 25 }
      : { excellent: 29, good: 22, poor: 18 };
  } else if (age >= 60) {
    thresholds = isMale
      ? { excellent: 30, good: 22, poor: 20 }
      : { excellent: 25, good: 18, poor: 15 };
  }

  return scoreMetabolicMetric(vo2, thresholds, false);
};

const getGripStrengthScore = (data: FormData): number => {
  if (!data.gripStrength || !data.age || !data.sex) return 0;

  const grip = parseFloat(data.gripStrength);
  const age = parseInt(data.age);
  const isMale = data.sex === "male";

  let thresholds = { excellent: 0, good: 0, poor: 0 };

  if (age >= 20 && age <= 29) {
    thresholds = isMale
      ? { excellent: 45, good: 35, poor: 30 }
      : { excellent: 30, good: 20, poor: 15 };
  } else if (age >= 30 && age <= 39) {
    thresholds = isMale
      ? { excellent: 43, good: 34, poor: 29 }
      : { excellent: 29, good: 19, poor: 14 };
  } else if (age >= 40 && age <= 49) {
    thresholds = isMale
      ? { excellent: 41, good: 32, poor: 27 }
      : { excellent: 28, good: 18, poor: 13 };
  } else if (age >= 50 && age <= 59) {
    thresholds = isMale
      ? { excellent: 39, good: 30, poor: 25 }
      : { excellent: 26, good: 17, poor: 12 };
  } else if (age >= 60) {
    thresholds = isMale
      ? { excellent: 35, good: 27, poor: 22 }
      : { excellent: 24, good: 15, poor: 10 };
  }

  return scoreMetabolicMetric(grip, thresholds, false);
};

const getBodyCompositionScore = (data: FormData): number => {
  let totalScore = 0;
  let validMetrics = 0;

  // Body fat scoring
  if (data.bodyFat && data.age && data.sex) {
    const bodyFat = parseFloat(data.bodyFat);
    const age = parseInt(data.age);
    const isMale = data.sex === "male";

    let optimalRange = { low: 0, high: 0 };
    let goodRange = { low: 0, high: 0 };
    let poorThreshold = 0;

    if (age >= 20 && age <= 29) {
      if (isMale) {
        optimalRange = { low: 8, high: 10.5 };
        goodRange = { low: 10.6, high: 14.8 };
        poorThreshold = 20;
      } else {
        optimalRange = { low: 14, high: 16.5 };
        goodRange = { low: 16.6, high: 19.4 };
        poorThreshold = 25;
      }
    } else if (age >= 30 && age <= 39) {
      if (isMale) {
        optimalRange = { low: 8, high: 14.5 };
        goodRange = { low: 14.6, high: 18.2 };
        poorThreshold = 22;
      } else {
        optimalRange = { low: 14, high: 17.4 };
        goodRange = { low: 17.5, high: 20.8 };
        poorThreshold = 27;
      }
    } else if (age >= 40 && age <= 49) {
      if (isMale) {
        optimalRange = { low: 8, high: 17.4 };
        goodRange = { low: 17.5, high: 20.6 };
        poorThreshold = 25;
      } else {
        optimalRange = { low: 14, high: 19.8 };
        goodRange = { low: 19.9, high: 23.8 };
        poorThreshold = 30;
      }
    } else if (age >= 50 && age <= 59) {
      if (isMale) {
        optimalRange = { low: 8, high: 19.1 };
        goodRange = { low: 19.2, high: 22.1 };
        poorThreshold = 27;
      } else {
        optimalRange = { low: 14, high: 22.5 };
        goodRange = { low: 22.6, high: 27 };
        poorThreshold = 32;
      }
    } else if (age >= 60 && age <= 69) {
      if (isMale) {
        optimalRange = { low: 8, high: 19.7 };
        goodRange = { low: 19.8, high: 23.4 };
        poorThreshold = 28;
      } else {
        optimalRange = { low: 14, high: 23.2 };
        goodRange = { low: 23.3, high: 27.9 };
        poorThreshold = 33;
      }
    } else if (age >= 70) {
      if (isMale) {
        optimalRange = { low: 8, high: 20.2 };
        goodRange = { low: 20.3, high: 24.5 };
        poorThreshold = 30;
      } else {
        optimalRange = { low: 14, high: 24.5 };
        goodRange = { low: 24.6, high: 29 };
        poorThreshold = 35;
      }
    }

    let bodyFatScore = 0;
    if (bodyFat >= optimalRange.low && bodyFat <= optimalRange.high) {
      bodyFatScore = 100;
    } else if (bodyFat >= goodRange.low && bodyFat <= goodRange.high) {
      bodyFatScore = getScoreFromRange(
        bodyFat,
        goodRange.low,
        goodRange.high,
        70,
        89
      );
    } else if (bodyFat < optimalRange.low) {
      bodyFatScore = getScoreFromRange(
        bodyFat,
        Math.max(0, optimalRange.low - 5),
        optimalRange.low,
        50,
        100
      );
    } else if (bodyFat > goodRange.high && bodyFat <= poorThreshold) {
      bodyFatScore = getScoreFromRange(
        bodyFat,
        goodRange.high,
        poorThreshold,
        70,
        50
      );
    } else {
      bodyFatScore = getScoreFromRange(
        bodyFat,
        poorThreshold,
        poorThreshold * 1.2,
        50,
        0
      );
    }

    totalScore += bodyFatScore;
    validMetrics++;
  }

  // Skeletal Muscle Mass scoring
  const smmScore = getSMMScore(data);
  if (smmScore > 0) {
    totalScore += smmScore;
    validMetrics++;
  }

  return validMetrics > 0 ? totalScore / validMetrics : 0;
};

// Main calculation function that combines all scores
export const calculateScores = (formData: FormData): Scores => {
  const metabolicScore = Math.min(100, getMetabolicScore(formData));
  const vo2MaxScore = Math.min(100, getVO2MaxScore(formData));
  const gripStrengthScore = Math.min(100, getGripStrengthScore(formData));
  const bodyCompositionScore = Math.min(100, getBodyCompositionScore(formData));

  const totalScore = Math.min(
    100,
    metabolicScore * categoryWeights.metabolicHealth +
      vo2MaxScore * categoryWeights.vo2max +
      gripStrengthScore * categoryWeights.gripStrength +
      bodyCompositionScore * categoryWeights.bodyComposition
  );

  return {
    metabolic: Math.round(metabolicScore),
    vo2Max: Math.round(vo2MaxScore),
    gripStrength: Math.round(gripStrengthScore),
    bodyComposition: Math.round(bodyCompositionScore),
    total: Math.round(totalScore),
  };
};

// Grade calculation function
export const getGradeFromScore = (score: number): Grade => {
  if (score >= 90)
    return {
      grade: "A+",
      meaning: "Optimal – Best outcome range",
      color: "text-green-600",
    };
  else if (score >= 80)
    return {
      grade: "A",
      meaning: "Excellent – Minimal improvement needed",
      color: "text-green-500",
    };
  else if (score >= 70)
    return {
      grade: "B",
      meaning: "Good – Room for improvement",
      color: "text-yellow-500",
    };
  else if (score >= 60)
    return {
      grade: "C",
      meaning: "Moderate risk – Action needed",
      color: "text-orange-500",
    };
  else if (score >= 50)
    return {
      grade: "D",
      meaning: "High risk – Significant change needed",
      color: "text-red-500",
    };
  else
    return {
      grade: "F",
      meaning: "Critical risk – Immediate support recommended",
      color: "text-red-600",
    };
};
