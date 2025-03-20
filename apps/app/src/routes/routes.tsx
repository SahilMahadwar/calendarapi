import { Navigate, Route, Routes } from "react-router-dom";

import { LoginCallback } from "@/pages/auth/callback";
import { DashboardLayout } from "../layouts/dashboard-layout";
import { LoginPage } from "../pages/auth/login";
import { HomePage } from "../pages/home";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route element={<DashboardLayout />}>
        <Route path="/home" element={<HomePage />} />
      </Route>

      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/google/callback" element={<LoginCallback />} />

      <Route path="/*" element={<div>404</div>} />
    </Routes>
  );
};
