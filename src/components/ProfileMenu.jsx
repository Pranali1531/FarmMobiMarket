import {
  Avatar,
  Box,
  Divider,
  Icon,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/authSlice";
import { persistor } from "@/store";
import { setMenu } from "@/store/menuSlice";

export default function ProfileMenu({ anchorEl, open, onClose }) {
  const [tabIndex, setTabIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    onClose(); // close popup

    persistor.purge();

    dispatch(logout());
    dispatch(setMenu());

    localStorage.removeItem("persist:root");
    localStorage.clear();

    navigate("/auth/login");
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          width: 280,
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      {/* User Info */}
      <Box display="flex" alignItems="center" gap={1} px={1}>
        <Avatar src="https://i.pravatar.cc/150?img=32" alt="User" />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Brooklyn Alice
          </Typography>
          <Typography variant="caption" color="text.secondary">
            FarmMobi Admin
          </Typography>
        </Box>

        {/* <Icon sx={{ ml: "auto", cursor: "pointer" }}>refresh</Icon> */}
      </Box>

      <Divider sx={{ my: 1.5 }} />

      {/* Tabs */}
      <Tabs
        value={tabIndex}
        onChange={(e, val) => setTabIndex(val)}
        variant="fullWidth"
        sx={{
          minHeight: 38,
          "& .MuiTab-root": { fontSize: 13, textTransform: "none" },
        }}
      >
        <Tab label="Profile" />
        <Tab label="Setting" />
      </Tabs>

      <Divider sx={{ my: 1.2 }} />

      {/* Menu Items */}
      <Box>
        {/* <MenuItem>
          <Icon sx={{ fontSize: 18, mr: 1 }}>edit</Icon>
          Edit Profile
        </MenuItem> */}

        <MenuItem
          onClick={() => {
            navigate("/user/profile");
            onClose();
          }}
        >
          <Icon sx={{ fontSize: 18, mr: 1 }}>person</Icon>
          View Profile
        </MenuItem>

        {/* <MenuItem>
          <Icon sx={{ fontSize: 18, mr: 1 }}>public</Icon>
          Social Profile
        </MenuItem> 

        <MenuItem>
          <Icon sx={{ fontSize: 18, mr: 1 }}>credit_card</Icon>
          Billing
        </MenuItem>*/}

        <Divider sx={{ my: 1 }} />

        <MenuItem sx={{ color: "red" }} onClick={handleLogout}>
          <Icon sx={{ fontSize: 18, mr: 1 }}>logout</Icon>
          Logout
        </MenuItem>
      </Box>
    </Menu>
  );
}
