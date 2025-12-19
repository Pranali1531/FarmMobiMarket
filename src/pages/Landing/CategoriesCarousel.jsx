import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Seeds",
    img: "https://images.unsplash.com/photo-1582515073490-39981397c445",
  },
  {
    name: "Fertilizers",
    img: "https://images.unsplash.com/photo-1598514982846-7978c0b0f9a6",
  },
  {
    name: "Tools",
    img: "https://images.unsplash.com/photo-1586864387789-628af9feed72",
  },
  {
    name: "Machinery",
    img: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae",
  },
];


export default function CategoriesCarousel() {
  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Explore Categories
      </Typography>

      <motion.div
        drag="x"
        dragConstraints={{ left: -400, right: 0 }}
        style={{ display: "flex", gap: 20, cursor: "grab" }}
      >
        {categories.map((c, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            style={{
              minWidth: 220,
              height: 150,
              borderRadius: 20,
              background: `url(${c.img}) center/cover`,
              position: "relative",
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                bottom: 10,
                left: 12,
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {c.name}
            </Typography>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
}
