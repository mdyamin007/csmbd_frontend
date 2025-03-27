import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/register": {};
  "/login": {};
  "/profile/:id": {
    "id": string;
  };
  "/dashboard": {};
};