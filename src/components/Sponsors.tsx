import { Building2, Handshake, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Sponsors = ({ id }: { id?: string }) => {
  const sponsorBenefits = [
    {
      icon: Building2,
      title: 'Zichtbaarheid',
      description:
        'Logo op shirts, website, en clubmateriaal voor maximale exposure',
    },
    {
      icon: Handshake,
      title: 'Community',
      description:
        'Directe verbinding met een hechte lokale gemeenschap van rugbyliefhebbers',
    },
    {
      icon: Trophy,
      title: 'Traditie',
      description: 'Steun een club met 50 jaar traditie en groeiende ambities',
    },
  ];

  return (
    <section id={id} className="py-20 section-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
            <span className="text-accent-gold font-semibold">Sponsoring</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-navy">
            Steun de Scrumboks
            <span className="block text-accent-gold">Groei Mee Met Ons</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Als sponsor van Rugby Club de Scrumboks investeert u in meer dan
            alleen sport. U steunt een gemeenschap, traditie en de ontwikkeling
            van jonge talenten in Tiel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {sponsorBenefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-white border-accent/10 shadow-warm hover-lift"
            >
              <CardContent className="p-8 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="w-8 h-8 text-accent-gold" />
                </div>

                <h3 className="text-xl font-heading font-bold text-primary-navy mb-4">
                  {benefit.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-heritage rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-heading font-bold text-white mb-6">
            Word Partner van de Scrumboks
          </h3>

          <p className="text-heritage-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            We zoeken bedrijven die net als wij geloven in teamwork, respect en
            groei. Samen kunnen we nog meer bereiken voor onze club en
            gemeenschap.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-lg mx-auto mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-heading font-bold text-accent">
                150+
              </div>
              <div className="text-sm text-heritage-foreground/80">
                Actieve Leden
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl font-heading font-bold text-accent">
                6
              </div>
              <div className="text-sm text-heritage-foreground/80">
                Teams Alle Leeftijden
              </div>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            className="bg-accent hover:bg-accent-warm text-accent-foreground font-semibold px-8 py-4 text-lg hover-lift"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#contact';
              }
            }}
          >
            Neem Contact Op
          </Button>
        </div>

        {/* Future sponsor logos section */}
        <div className="mt-16 text-center">
          <h4 className="text-lg font-heading font-semibold text-muted-foreground mb-8">
            Ruimte voor Onze Partners
          </h4>
          <div className="border-2 border-dashed border-accent/20 rounded-2xl p-12">
            <div className="text-accent-gold font-medium">
              Hier komen de logo's van onze partners
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
