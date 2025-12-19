import { Box, Grid, Card, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Soil Testing",
    desc: "Get soil health analysis & recommendations",
    icon: "🧪",
  },
  {
    title: "Crop Advisory",
    desc: "Expert guidance for higher yield",
    icon: "🌱",
  },
  {
    title: "Equipment Rental",
    desc: "Affordable farming tools on rent",
    icon: "🚜",
  },
  {
    title: "Weather Advisory",
    desc: "Accurate weather updates for farms",
    icon: "🌦️",
  },
  {
    title: "Insurance Support",
    desc: "Crop insurance & claim assistance",
    icon: "🛡️",
  },
  {
    title: "Market Linkage",
    desc: "Connect directly with buyers",
    icon: "📦",
  },
];

export default function ServicesSection({ showAll = false }) {
  const navigate = useNavigate();
  const list = showAll ? services : services.slice(0, 3);
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#f7fdf8" }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Our Services
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        End-to-end services to support farmers at every stage
      </Typography>

      <Grid container spacing={3}>
        {list.map((s, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
              >
                <Typography fontSize="40px">{s.icon}</Typography>

                <Typography variant="h6" fontWeight="bold" mt={2} mb={1}>
                  {s.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {s.desc}
                </Typography>

                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: "#0b6b12",
                    borderRadius: "20px",
                    color: "white !important",
                    textTransform: "none",
                  }}
                >
                  Explore
                </Button>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      {!showAll && (
        <Button sx={{ mt: 4 }} onClick={() => navigate("/landing/services")}>
          View All Services →
        </Button>
      )}
    </Box>
  );
}
