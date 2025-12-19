import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

export default function LandingHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth || {});
  const user = useSelector((state) => state.auth?.user);

  const isLoggedIn = Boolean(accessToken);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    handleCloseMenu();
    navigate("/");
  };

  return (
    <AppBar position="fixed" elevation={0} sx={{}}>
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 } }}>
        {/* LOGO */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          🌱 Farmer Marketplace
        </Typography>

        {/* RIGHT ACTIONS */}
        {!isLoggedIn ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0b6b12",
              color: "#fff",
              borderRadius: "30px",
              px: 3,
              textTransform: "none",
            }}
            onClick={() => navigate("/auth/login")}
          >
            Login
          </Button>
        ) : (
          <>
            <IconButton onClick={handleOpenMenu}>
              <Avatar sx={{ bgcolor: "#0b6b12" }}>
                {user?.email?.[0]?.toUpperCase() || "U"}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => navigate("/dashboard/analytics")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
