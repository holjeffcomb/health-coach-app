export interface FormData {
  age: string;
  sex: string;
  a1c: string;
  ldl: string;
  lpa: string;
  apoB: string;
  systolic: string;
  diastolic: string;
  waistHeightRatio: string;
  vo2Max: string;
  gripStrength: string;
  bodyFat: string;
  smm: string;
  triglycerides: string;
  totalCholesterol: string;
  hdl: string;
}

export interface Scores {
  metabolic: number;
  vo2Max: number;
  gripStrength: number;
  bodyComposition: number;
  total: number;
}

export interface Grade {
  grade: string;
  meaning: string;
  color: string;
}

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null;
  // Add other properties as needed
}

export interface Assessment {
  id: string;
  title: string;
  form_data: FormData;
  scores: Record<string, number>;
  grade: {
    grade: string;
    meaning: string;
    color: string;
  };
  created_at: string;
  updated_at: string;
}
