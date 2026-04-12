import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";
import ImageFramer from "@/components/ImageFramer";

const Index = () => {
  return (
    <main className="film-grain">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <MusicPlayer />
      <ImageFramer />
    </main>
  );
};

export default Index;
