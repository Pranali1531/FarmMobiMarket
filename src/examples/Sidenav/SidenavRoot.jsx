
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { miniSidenav, darkMode } = ownerState;

  const OPEN_WIDTH = 250;
  const MINI_WIDTH = 90;

  return {
    "& .MuiDrawer-paper": {
      border: "none",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",

      // Green agri theme background
      background:"linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))",
      // darkMode ? "#0a3d0a" : "#1a531b",
      color: "#fff",

      width: OPEN_WIDTH,
      transition: "all 300ms ease-in-out",
      boxShadow:
        "0px 4px 10px rgba(0,0,0,0.25), inset 0 0 10px rgba(0,0,0,0.2)",

      "&::-webkit-scrollbar": { display: "none" },

      // ---------- DESKTOP (XL+) ----------
      [theme.breakpoints.up("xl")]: {
        width: miniSidenav ? MINI_WIDTH : OPEN_WIDTH,
        left: 0,
        transform: "translateX(0)",
      },

      // ---------- MOBILE / TABLET (< XL) ----------
      [theme.breakpoints.down("xl")]: {
        width: OPEN_WIDTH,
        position: "fixed",
        top: 0,
        height: "100vh",

        // ❗ Completely hide sidebar in mini mode
        transform: miniSidenav ? "translateX(-300px)" : "translateX(0)",
        zIndex: 1200,
      },
    },
  };
});

