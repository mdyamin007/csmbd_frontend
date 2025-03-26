const Endpoints = {
  // auth
  refresh: () => "/v1/auth/refresh",
  login: () => "/v1/auth/login",
  register: () => "/v1/auth/register",
  userInfo: () => "/users/me",
};

export default Endpoints;
