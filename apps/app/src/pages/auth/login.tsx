import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { axiosApiInstance } from "@/libs/axios-api-Instance";
import { ApiResponse, OAuthUrlData } from "@/types/api-res";
import { useMutation } from "@tanstack/react-query";

export const LoginPage = () => {
  const { getLoginUrl } = useAuth();

  return (
    <div>
      <Button onClick={() => getLoginUrl.mutate()}>Google Login</Button>
    </div>
  );
};
