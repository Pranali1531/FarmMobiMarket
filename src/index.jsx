import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "@/context";

const container = document.getElementById("root");
import { SnackbarProvider } from "notistack";

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <App />
      </SnackbarProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
