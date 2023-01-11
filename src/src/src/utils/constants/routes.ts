export const PAGE_ROUTES = {
  HOME: '/',
  STREAM_ROOM: (id: string) => `/stream-room/${id}`,
  STREAM: '/stream',
  PROFILE: '/profile',
  LOGIN: '/login',
  REGISTER: '/register',
};

export const PUBLIC_ROUTES = [PAGE_ROUTES.HOME, PAGE_ROUTES.STREAM_ROOM, PAGE_ROUTES.LOGIN, PAGE_ROUTES.REGISTER];

export const PRIVATE_ROUTES = [PAGE_ROUTES.PROFILE, PAGE_ROUTES.STREAM];
