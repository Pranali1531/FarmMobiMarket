import { Box } from "@mui/material";
import HeroVideo from "./HeroVideo";
import FloatingShapes from "./FloatingShapes";
import ParallaxBackground from "./ParallaxBackground";
import CountersSection from "./CountersSection";
import CategoriesCarousel from "./CategoriesCarousel";
import LearningVideos from "./LearningVideos";
import ServicesSection from "./ServicesSection";
import MarketSection from "./MarketSection";
import LandingFooter from "./LandingFooter";
import LandingHeader from "./LandingHeader";

export default function LandingPage() {
  return (
    <Box sx={{ position: "relative", overflowX: "hidden", zIndex: 1 }}>
      {/* <ParallaxBackground /> */}
      <LandingHeader />
      <FloatingShapes />
      <HeroVideo />
      <CountersSection />
      {/* <CategoriesCarousel /> */}
      <Box id="learning">
        <LearningVideos />
      </Box>
      <ServicesSection />
      <MarketSection />
      <LandingFooter />

    </Box>
  );
}
