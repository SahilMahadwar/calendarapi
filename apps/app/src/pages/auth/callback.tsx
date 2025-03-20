import { useAuth } from "@/hooks/use-auth";
import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

export const LoginCallback = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const hasRequested = useRef(false);
  const { verifyToken } = useAuth();

  useEffect(() => {
    if (code && !hasRequested.current) {
      hasRequested.current = true;
      verifyToken.mutate(code);
    }
  }, [code]);

  return <div>Please wait loggin you in...</div>;
};
