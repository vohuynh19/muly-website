export const DEFAULT_FILTER = {
  filter: {},
  sort: {
    createdAt: -1,
  },
  limit: 10,
  page: 1,
};

export type PaginationParams = {
  filter: any;
  sort: any;
  limit: number;
  page: number;
};

export type CreateQuestParams = {
  userAddress: string;
  imageLink: string;
  questAddress: string;
  title: string;
  category: string;
  tag: string;
  timeEnd: number;
  fund: number;
};

export type CreateSolutionParams = {
  solutionAddress: string;
  questAddress: string;
  userAddress: string;
  content: string;
  imageLink: string;
};

export type VoteParams = {
  funderAddress: string;
  solutionAddress: string;
  isVote: boolean;
  questAddress: string;
};

export type MutateParams =
  | VoteParams
  | CreateQuestParams
  | CreateSolutionParams;
