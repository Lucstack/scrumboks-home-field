import Hero from "@/components/Hero";
import About from "@/components/About";
import Teams from "@/components/Teams";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Teams />
      <Sponsors />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
