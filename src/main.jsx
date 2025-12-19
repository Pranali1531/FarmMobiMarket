import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "regenerator-runtime/runtime";

import theme from "@/assets/theme";

import { MaterialUIControllerProvider } from "@/context";

import App from "@/App";

const container = document.getElementById("root");
const root = createRoot(container);
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MaterialUIControllerProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              autoHideDuration={2000}
            >
              <App />
            </SnackbarProvider>
          </BrowserRouter>
        </ThemeProvider>
      </MaterialUIControllerProvider>
    </PersistGate>
  </Provider>
);
