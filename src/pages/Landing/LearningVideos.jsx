import { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  IconButton,
  Button,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LandingFooter from "@/pages/Landing/LandingFooter";

const videos = [
  {
    title: "Introduction to Farming",
    youtubeId: "jNQXAC9IVRw",
    category: "Basics",
  },
  {
    title: "Modern Agriculture Techniques",
    youtubeId: "aqz-KE-bpKQ",
    category: "Technology",
  },
  {
    title: "Soil & Crop Management",
    youtubeId: "pQN-pnXPaVg",
    category: "Crop Care",
  },
];

export default function LearningVideos({ showAll = false }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  const list = showAll ? videos : videos.slice(0, 3);

  const handleOpen = (id) => {
    setActiveVideo(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setActiveVideo(null);
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Learning Videos 🎥
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Watch expert-curated videos to improve farm productivity
      </Typography>

      <Grid container spacing={3}>
        {list.map((v, i) => (
          <Grid item xs={12} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative",
                }}
                onClick={() => handleOpen(v.youtubeId)}
              >
                {/* Thumbnail */}
                <CardMedia
                  component="img"
                  height="200"
                  image={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                />

                {/* Play Icon */}
                <PlayCircleIcon
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    fontSize: "70px",
                    color: "white",
                    opacity: 0.9,
                  }}
                />

                <CardContent>
                  <Typography variant="h6" fontWeight="600">
                    {v.title}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      {!showAll && (
        <Button sx={{ mt: 4 }} onClick={() => navigate("/landing/training")}>
          View All Training →
        </Button>
      )}

      {/* VIDEO MODAL */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <Box sx={{ position: "relative", pt: "56.25%" }}>
          {activeVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="Learning Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </Box>

        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </Dialog>
    
    </Box>
  );
}
