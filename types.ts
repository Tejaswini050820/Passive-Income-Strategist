// types.ts

export interface UserInput {
  skills: string;
  goal: number | string; // Allow string for initial input, convert to number later
}

export interface AnalyzerReport {
  skillGap: string;
  niche: string;
  actionPlan: string;
}
