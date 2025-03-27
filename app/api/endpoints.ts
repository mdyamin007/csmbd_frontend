const Endpoints = {
  // auth
  refresh: () => "/auth/refresh",
  login: () => "/auth/login",
  register: () => "/auth/register",

  // profile
  users: () => "/users",
  userInfo: () => "/users/me",
  userById: (userId: string) => `/users/${userId}`,

  // contents
  contents: () => "/contents",
  contentsByUserId: (userId: string) => `/contents/user/${userId}`,
  contentById: (id: string) => `/contents/${id}`,
};

export default Endpoints;
