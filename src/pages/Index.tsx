import Hero from "@/components/Hero";
import About from "@/components/About";
import Teams from "@/components/Teams";
import Sponsors from "@/components/Sponsors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
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
