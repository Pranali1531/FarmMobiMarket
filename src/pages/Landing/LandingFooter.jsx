import { Box, Grid, Typography, Link, Divider } from "@mui/material";

export default function LandingFooter() {
  return (
    <Box sx={{ bgcolor: "#0b6b12", color: "#fff", mt: 8 }}>
      <Box sx={{ px: { xs: 2, md: 6 }, py: 6 }}>
        <Grid container spacing={4}>
          {/* BRAND */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold" mb={1}>
              Farmer Marketplace
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Empowering farmers with learning, services, and a digital
              marketplace for agriculture growth.
            </Typography>
          </Grid>

          {/* QUICK LINKS */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Explore
            </Typography>

            <Box display="flex" flexDirection="column" gap={0.5}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/training" color="inherit" underline="hover">
                Training
              </Link>
              <Link href="/services" color="inherit" underline="hover">
                Services
              </Link>
              <Link href="/marketplace" color="inherit" underline="hover">
                Marketplace
              </Link>
              <Link href="/auth/login" color="inherit" underline="hover">
                Login
              </Link>
            </Box>
          </Grid>

          {/* CONTACT */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Contact
            </Typography>
            <Typography variant="body2">📍 Pune, India</Typography>
            <Typography variant="body2">📧 support@farmmobi.com</Typography>
            <Typography variant="body2">📞 +91 98765 43210</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ bgcolor: "rgba(255,255,255,0.2)" }} />

      {/* COPYRIGHT */}
      <Box sx={{ textAlign: "center", py: 2 }}>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © {new Date().getFullYear()} Farmer Marketplace. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
