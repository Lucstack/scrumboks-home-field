import Hero from "@/components/Hero";
import About from "@/components/About";
import Teams from "@/components/Teams";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { useHashScroll } from "@/hooks/use-hash-scroll";

const Index = () => {
  useHashScroll(); // Handle hash scrolling when navigating from other pages
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About id="about" />
      <Teams id="teams" />
      <Sponsors id="sponsors" />
      <Contact id="contact" />
      <Footer />
    </div>
  );
};

export default Index;
