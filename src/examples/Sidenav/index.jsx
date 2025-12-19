import { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";

import MDBox from "@/components/MDBox";
import MDTypography from "@/components/MDTypography";

import SidenavCollapse from "./SidenavCollapse";
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "@/context";

function Sidenav({
  color,
  brand,
  brandName,
  routes,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) {
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  const [activeMenu, setActiveMenu] = useState(null);

  const handleToggle = (menuKey) => {
    setActiveMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  let textColor = "white";

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(dispatch, false);
      setWhiteSidenav(dispatch, false);
    }
    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch]);

  // ============= PROFILE BLOCK (PRO STYLE) =============
  const ProfileBlock = (
    <MDBox
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={1}
      mb={1}
      px={2}
    >
      <Avatar
        src="https://i.pravatar.cc/150?img=32"
        alt="profile"
        sx={{
          width: 48,
          height: 48,
          border: "2px solid rgba(255,255,255,0.4)",
        }}
      />

      <MDTypography
        variant="button"
        fontWeight="bold"
        color="white"
        mt={1}
        sx={{ textShadow: "0px 1px 2px rgba(0,0,0,0.4)" }}
      >
        Brooklyn Alice
      </MDTypography>

      <MDTypography
        variant="caption"
        fontWeight="regular"
        color="white"
        opacity={0.8}
        mt={0.3}
      >
        FarmMobi Admin
      </MDTypography>
    </MDBox>
  );

  // ============= RENDER MENUS ===========================

  const renderRoutes = routes.map(({ type, name, icon, key, collapse }) => {
    if (type === "collapse") {
      return (
        <SidenavCollapse
          key={key}
          name={name}
          icon={icon}
          collapse={collapse}
          open={activeMenu === key}
          onToggle={() => handleToggle(key)}
        />
      );
    }

    return null;
  });

  return (
    <SidenavRoot
      {...rest}
      onMouseEnter={miniSidenav ? onMouseEnter : null}
      onMouseLeave={miniSidenav ? onMouseLeave : null}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
      sx={{
        "& .MuiDrawer-paper": {
          overflow: "hidden",
        },
      }}
    >
      {/* Brand */}
      <MDBox pt={2} pb={1} px={3} display="flex" alignItems="center">
        {brand && (
          <MDBox component="img" src={brand} alt="Brand" width="2rem" />
        )}
        <MDBox sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}>
          <MDTypography variant="button" fontWeight="medium" color={textColor}>
            {brandName}
          </MDTypography>
        </MDBox>
      </MDBox>

      <Divider light />

      {/* Profile Section */}
      {ProfileBlock}

      {/* Scrollable Menu List */}
      {/* <div className="sidenav-content">
        <List sx={{ px: 1.2 }}>{renderRoutes}</List>
      </div> */}
      {/* Scrollable Menu List */}
      <MDBox
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 1.2,

          /* ===== Chrome / Edge / Safari ===== */
          "&::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },

          /* ===== Firefox ===== */
          scrollbarWidth: "none",

          /* ===== IE / Old Edge ===== */
          msOverflowStyle: "none",
        }}
      >
        <List>{renderRoutes}</List>
      </MDBox>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
