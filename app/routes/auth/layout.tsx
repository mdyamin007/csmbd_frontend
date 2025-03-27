import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { Routes } from "~/constants/routes";
import { getTokens, removeLogInInfo } from "~/lib/utils";

const AuthLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = getTokens();

    if (tokens.accessToken) {
      navigate(Routes.DASHBOARD());
    }
  }, []);

  return <Outlet />;
};

export default AuthLayout;
