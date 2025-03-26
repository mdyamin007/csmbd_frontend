import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("register", "routes/auth/register.tsx")] satisfies RouteConfig;
