import { Box, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";

export default function CountersSection() {
  const stats = [
    { label: "Farmers Connected", value: 45000 },
    { label: "Products Sold", value: 14000 },
    { label: "Learning Videos", value: 320 },
    { label: "Services Available", value: 42 },
  ];

  return (
    <Box sx={{ py: 8, textAlign: "center", bgcolor: "#eaffea" }}>
      <Grid container spacing={4}>
        {stats.map((s, i) => (
          <Grid item xs={6} md={3} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Typography variant="h3" color="green">
                {s.value.toLocaleString()}
              </Typography>
              <Typography variant="h6">{s.label}</Typography>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
