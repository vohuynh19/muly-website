const PREFIX = "/api/v1";

// CREATE QUEST
// CREATE SOLUTION
// CREATE VOTE

export const ENDPOINTS = {
  QUEST: {
    GET: `${PREFIX}/quest`,
    JOIN: `${PREFIX}/join-quest`,
    FUND: `${PREFIX}/fund-quest`,
    CREATE: `${PREFIX}/create-quest`,
  },
  COMMENT: {
    GET: `${PREFIX}/solution`,
    CREATE: `${PREFIX}/create-solution`,
    UPDATE: `${PREFIX}/update-solution`,
  },
  FUND: {
    GET: `${PREFIX}/funding-state`,
    CREATE: `${PREFIX}/create-funding-state`,
  },
  VOTE: `${PREFIX}/vote`,
  LIKE: `${PREFIX}/like`,
};
