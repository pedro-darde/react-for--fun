import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "./context/auth";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster richColors />
    <AuthProvider>

      <RouterProvider router={router} />
    </AuthProvider>

  </React.StrictMode>
);
