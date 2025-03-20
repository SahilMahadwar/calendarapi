import { axiosApiInstance } from "@/libs/axios-api-Instance";
import {
  ApiResponse,
  GoogleTokenResponse,
  OAuthUrlData,
} from "@/types/api-res";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();

  const verifyToken = useMutation({
    mutationFn: async (code: string | null) => {
      return axiosApiInstance.get<ApiResponse<GoogleTokenResponse>>(
        `/auth/google/callback?code=${code}`
      );
    },

    onSuccess: async ({ data }) => {
      console.log("reached");

      const { access_token, refresh_token, expiry_date } = data.data;

      if (access_token && refresh_token && expiry_date) {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        localStorage.setItem("expiry_date", expiry_date.toString());
      }

      navigate("/");
    },
  });

  const getLoginUrl = useMutation({
    mutationFn: async () => {
      return axiosApiInstance.get<ApiResponse<OAuthUrlData>>(
        "/auth/google/oauth-url"
      );
    },
    onSuccess: ({ data }) => {
      console.log(data.data.OAuthUrl);

      if (data.data.OAuthUrl) {
        window.location.href = data.data.OAuthUrl;
      }
    },
  });

  const getTokens = (): {
    access_token: string | null;
    refresh_token: string | null;
    expiry_date: string | null;
  } => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");
    const expiry_date = localStorage.getItem("expiry_date");

    return { access_token, refresh_token, expiry_date };
  };

  const removeTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expiry_date");

    return true;
  };

  return { verifyToken, getLoginUrl, getTokens, removeTokens };
};
