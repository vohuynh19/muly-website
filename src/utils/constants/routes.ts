export const PAGE_ROUTES = {
  HOME: "/",
  CREATE_QUEST: "/create-quest",
  QUESTIONS: "/questions",
  QUEST_DETAIL: (id: string) => `/quest/${id}`,
  MY_PROFILE: "/my-profile",
  PROFILE: "/profile",
};

export const PUBLIC_ROUTES = [
  PAGE_ROUTES.HOME,
  PAGE_ROUTES.CREATE_QUEST,
  PAGE_ROUTES.QUESTIONS,
  PAGE_ROUTES.PROFILE,
];

export const PRIVATE_ROUTES = [PAGE_ROUTES.MY_PROFILE];
