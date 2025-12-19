import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

export default function HeroVideo() {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "70vh", md: "85vh" },
        overflow: "hidden",
        backgroundColor: "#000", // fallback
      }}
    >
      {/* VIDEO */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          filter: "brightness(0.55)",
        }}
      >
        <source
          src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>

      {/* OVERLAY CONTENT */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            color="white !important"
            sx={{ fontSize: { xs: "2rem", md: "3.5rem" } }}
          >
            Farmer Marketplace Platform
          </Typography>

          <Typography
            variant="h6"
            sx={{ mt: 2, color: "rgba(255,255,255,0.9)" }}
          >
            Learn • Services • Buy & Sell Agricultural Products
          </Typography>

          <Button
            variant="contained"
            sx={{
              mt: 4,
              bgcolor: "#0b6b12 !important",
              color: "white !important",
              px: 4,
              py: 1.5,
              borderRadius: "30px",
              fontSize: "16px",
            }}
            onClick={() => {
              document
                .getElementById("learning")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Platform
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
