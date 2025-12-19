import { Outlet } from "react-router-dom";
import LandingHeader from "@/pages/Landing/LandingHeader";
import { Box, Typography } from "@mui/material";

export default function PublicLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>Welcome</Typography>
    </Box>
  );
}
