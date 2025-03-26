const AuthPath = "auth";

const addAuthPath = (path: string) => `/${AuthPath + path}`;

export const Routes = {
  HOME: () => "/",
  LOGIN: () => addAuthPath("/login"),
  REGISTER: () => addAuthPath("/register"),
  DASHBOARD: () => "/dashboard",
};