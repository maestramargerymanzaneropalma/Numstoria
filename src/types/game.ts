export type TeamId = 'sol' | 'luna';

export type CivilizationId = 'mesopotamia' | 'egipto' | 'america' | 'india' | 'arabia';

export type TileCategory = CivilizationId | 'start' | 'special';

export type SpecialKind = 'puente';

export type ChallengeMode = 'math' | 'history';

export interface HistoryQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TileData {
  id: number;
  category: TileCategory;
  specialKind?: SpecialKind;
  isFinal?: boolean;
  challengeMode?: ChallengeMode;
  title: string;
  missionSummary: string;
  targetValue: number;
  targetDisplay: string;
  historicalContext: string;
  quickRule: string;
  exampleText: string;
  sageHint: string;
  mathExplanation?: string;
  historyQuestion?: HistoryQuestion;
  useBase60?: boolean;
  alJabrEquation?: {
    equationDisplay: string;
    leftKnown: number;
    rightTotal: number;
    coefficient?: number;
  };
  gridPos: {
    row: number;
    col: number;
  };
}

export interface ManipulativeStateSummary {
  numericValue: number;
  displayValue: string;
  breakdown: string;
}

export interface TeamState {
  id: TeamId;
  name: string;
  position: number;
  seals: Record<CivilizationId, number>;
}
