import { Box } from "@mui/material";

export default function FloatingShapes() {
  return (
    <Box sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
      {[40, 55, 70].map((size, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </Box>
  );
}
