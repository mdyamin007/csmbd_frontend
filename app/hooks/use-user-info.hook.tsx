import { toast } from "sonner";
import Endpoints from "~/api/endpoints";
import { useGet, usePut } from "~/api/hooks";
import { QueryKeys } from "~/constants/query-keys";
import { errorResponseHandler } from "~/lib/utils";
import { queryClient } from "~/root";
import type { User } from "~/types/data.type";

const useUserInfo = () => {
  const { data, isLoading: isLoadingUser } = useGet<User>({
    url: Endpoints.userInfo(),
    options: {
      queryKey: [QueryKeys.getUserInfo],
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  });

  const { mutate: updateUser, isPending: isUpdating } = usePut<User, User>({
    url: Endpoints.userInfo(),
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.getUserInfo] });
        toast.success("Profile updated successfully");
      },
      onError: errorResponseHandler,
    },
  });

  return {
    user: data,
    isLoadingUser,
    updateUser,
    isUpdating,
  };
};

export default useUserInfo;
