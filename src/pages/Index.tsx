import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GallerySection from "@/components/GallerySection";
import Simulator3D from "@/components/Simulator3D";
import ServicesPreview from "@/components/ServicesPreview";
import ProcessSection from "@/components/ProcessSection";
import ProudlyKenyanSection from "@/components/ProudlyKenyanSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <HeroSection />
      <ServicesPreview />
      <GallerySection />
      <Simulator3D />
      <ProcessSection />
      <ProudlyKenyanSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
