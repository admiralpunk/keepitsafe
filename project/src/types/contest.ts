export interface ContestResponse {
  staus: string;
  contest: string;
  type: string;
  participants: string[];
}

export interface ContestFormData {
  users: { id: string; username: string }[];
  contestType: string;
}

export interface ContestFormatterInput {
  users: { id: string; username: string }[];
  contestType: string;
}

export interface ContestFormatterOutput {
  users: string[];
  type: string;
}