import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <Typography variant="h2" color="error" fontWeight="bold">
        404
      </Typography>

      <Typography variant="h5" sx={{ mt: 1, mb: 2 }}>
        Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Button
        variant="contained"
        sx={{
          backgroundColor: "#0b6b12",
          "&:hover": { backgroundColor: "#0a5a10" },
          borderRadius: 3,
          px: 4,
        }}
        onClick={() => navigate("/dashboard/analytics")}
      >
        Go Back Home
      </Button>
    </Box>
  );
}
