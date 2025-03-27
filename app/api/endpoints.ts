const Endpoints = {
  // auth
  refresh: () => "/auth/refresh",
  login: () => "/auth/login",
  register: () => "/auth/register",

  // profile
  userInfo: () => "/users/me",

  // contents
  contents: () => "/contents",
  contentsByUserId: (userId: string) => `/contents/user/${userId}`,
  contentsById: (id: string) => `/contents/${id}`,
};

export default Endpoints;
