import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function ParallaxBackground() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "120vh",
        backgroundImage: "url('https://i.imgur.com/E62YfLz.jpg')",
        backgroundSize: "cover",
        backgroundPosition: `center ${offset}px`,
        zIndex: -2,
        opacity: 0.2,
      }}
    />
  );
}
