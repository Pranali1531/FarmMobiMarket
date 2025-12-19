import { Box, Grid, Card, Typography, CardMedia, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const products = [
  {
    name: "Seeds",
    img: "https://media.istockphoto.com/id/179751167/photo/various-piles-of-nuts-and-seeds.jpg?s=1024x1024&w=is&k=20&c=12SDsI1oKhenSvqzw8rLF5aqZ212jepzeHjcb2h2h7U=",
  },
  {
    name: "Fertilizers",
    img: "https://plus.unsplash.com/premium_photo-1680125265832-ffaf364a8aca?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Pesticides",
    img: "https://plus.unsplash.com/premium_photo-1664299650802-c61f55b00c96?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Farm Tools",
    img: "https://images.unsplash.com/photo-1634584604333-75c849472112?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function MarketSection({ showAll = false }) {
  const navigate = useNavigate();
  const list = showAll ? products : products.slice(0, 4);
  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 } }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Marketplace
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        Buy quality agricultural products at the best price
      </Typography>

      <Grid container spacing={3}>
        {list?.map((c, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={c.img}
                  loading="lazy"
                />

                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {c.name}
                  </Typography>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      {!showAll && (
        <Button sx={{ mt: 4 }} onClick={() => navigate("/landing/marketplace")}>
          Explore Marketplace →
        </Button>
      )}
    </Box>
  );
}
