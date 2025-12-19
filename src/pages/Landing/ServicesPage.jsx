import { Box, Typography } from "@mui/material";
import ServicesSection from "@/pages/Landing/ServicesSection";

export default function ServicesPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Farmer Services 🧑‍🌾
      </Typography>

      <ServicesSection showAll />
    </Box>
  );
}
