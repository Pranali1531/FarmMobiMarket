import { Box, Typography } from "@mui/material";
import MarketSection from "@/pages/Landing/MarketSection";

export default function MarketplacePage() {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Marketplace 🛒
      </Typography>

      <MarketSection showAll />
    </Box>
  );
}
