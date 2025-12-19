import { useSelector } from "react-redux";
import resolveComponent from "@/pageResolver";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import theme from "@/assets/theme";
import themeDark from "@/assets/theme-dark";
import { useMaterialUIController } from "@/context";
import Sidenav from "@/examples/Sidenav";
import DashboardLayout from "@/examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "@/examples/Navbars/DashboardNavbar";
import Login from "@/pages/Auth/Login";
import NotFound from "@/pages/Error/NotFound";
import AddForm from "@/pages/Admin/Users/AddUser";

import { convertMenuToSidenav } from "@/utils/convertMenu";
import ProtectedRoute from "@/routes/ProtectedRoute";
import CompleteProfile from "@/pages/Auth/CompleteProfile";
import LandingPage from "@/pages/Landing/LandingPage";
import TrainingPage from "@/pages/Landing/TrainingPage";
import ServicesPage from "@/pages/Landing/ServicesPage";
import MarketplacePage from "@/pages/Landing/MarketplacePage";
import Footer from "@/examples/Footer";
import UserProfile from "@/pages/Profiles/UserProfile";

export default function App() {
  const menu = useSelector((state) => state.menu.menu);

  const sidebarMenu = convertMenuToSidenav(menu);

  const { pathname } = useLocation();
  const isAuthPage =
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/landing");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const generateRoutes = () =>
    (menu ?? []).flatMap(
      (item) =>
        (item.children ?? [])
          .filter((child) => child.component && child.component.trim() !== "")
          .map((child) => {
            const Page = resolveComponent(child.component);

            // ❗ If no component found → DO NOT generate route
            if (!Page) return null;

            return (
              <Route key={child.key} path={child.route} element={<Page />} />
            );
          })
          .filter(Boolean) // remove nulls
    );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Routes>
        {" "}
        <Route path="/landing/training" element={<TrainingPage />} />
        <Route path="/landing/services" element={<ServicesPage />} />
        <Route path="/landing/marketplace" element={<MarketplacePage />} />
      </Routes>

      {isAuthPage ? (
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/completeProfile" element={<CompleteProfile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <ProtectedRoute>
          <>
            <Sidenav routes={sidebarMenu ?? []}  brandName={"FarmMobi"} />

            <DashboardLayout>
              <DashboardNavbar />

              <Routes>
                {generateRoutes()}
                {/* <Route path="/admin/users/form" element={<AddForm />} />*/}
                <Route path="/user/profile" element={<UserProfile />} /> 
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardLayout>
          </>
        </ProtectedRoute>
      )}
      {/* <Footer /> */}
    </ThemeProvider>
  );
}
