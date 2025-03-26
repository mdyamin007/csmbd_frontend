import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("register", "routes/auth/register.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("profile/:id", "routes/profiles/profile.tsx"),
  layout("routes/dashboard/layout.tsx", [
    route("dashboard", "routes/dashboard/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
