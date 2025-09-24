import { Button } from '@/components/ui/button';
import scrumAction from '@/assets/scrum-action.jpg';

const Hero = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-hero"
        style={{ backgroundImage: `url(${scrumAction})` }}
      >
        <div className="absolute inset-0 bg-primary-navy/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-6">
            <span className="text-accent font-semibold">
              50 Jaar Rugby Traditie
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
          Rugby Club de
          <span className="block text-accent">SCRUMBOKS</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed opacity-90">
          Authentieke rugby ervaring sinds 1976.
          <br className="hidden md:block" />
          Een hechte community waar rugby en vriendschap centraal staan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="default"
            size="lg"
            className="bg-accent hover:bg-accent-warm text-accent-foreground font-semibold px-8 py-4 text-lg hover-lift"
            onClick={scrollToContact}
          >
            Word Lid
          </Button>
          <Button
            variant="default"
            size="lg"
            className="bg-accent hover:bg-accent-warm text-accent-foreground font-semibold px-8 py-4 text-lg hover-lift"
            onClick={scrollToContact}
          >
            Plan een Proeftraining
          </Button>
        </div>

        <div className="mt-12">
          <p className="text-accent-warm font-medium">
            Beethovenstraat 18a, 4003 KX Tiel
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
