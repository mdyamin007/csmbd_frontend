import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { Routes } from "~/constants/routes";
import { getTokens, removeLogInInfo } from "~/lib/utils";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tokens = getTokens();

    if (!tokens.accessToken) {
      // remove tokens and reset user
      removeLogInInfo();
      toast("Session expired");
      navigate(Routes.HOME());
    }
  }, []);

  return <Outlet />;
};

export default DashboardLayout;
