import { Box, Grid, Typography } from "@mui/material";
import LearningVideos from "@/pages/Landing/LearningVideos";

export default function TrainingPage() {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Training & Learning 🎓
      </Typography>

      <LearningVideos showAll />
    </Box>
  );
}
