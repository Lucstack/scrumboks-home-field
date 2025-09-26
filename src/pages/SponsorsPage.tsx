import { useState } from "react";
import { Building2, Handshake, Trophy, Crown, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import SponsorSelection from "@/components/SponsorSelection";

const SponsorsPage = () => {
  useScrollToTop(); // Scroll naar top bij laden van deze pagina
  const [showSponsorSelection, setShowSponsorSelection] = useState(false);

  const sponsorPackages = [
    {
      name: "Scrum Master",
      icon: Crown,
      price: "€2.500",
      period: "per jaar",
      features: [
        "Logo op alle shirts en trainingskleding",
        "Prominente vermelding op website homepage",
        "Naamsvermelding tijdens wedstrijden",
        "VIP toegang tot thuiswedstrijden",
        "4 vrijkaarten per wedstrijd",
        "Jaarlijks sponsordiner",
      ],
      highlight: true,
    },
    {
      name: "Line-out Leader",
      icon: Zap,
      price: "€1.500",
      period: "per jaar",
      features: [
        "Logo op trainingsshirts",
        "Vermelding op website sponsor pagina",
        "Social media posts",
        "2 vrijkaarten per wedstrijd",
        "Uitnodiging sponsordiner",
      ],
    },
    {
      name: "Team Player",
      icon: Heart,
      price: "€750",
      period: "per jaar",
      features: [
        "Logo op clubmateriaal",
        "Vermelding op website",
        "Nieuwsbrief vermelding",
        "1 vrijkaart per wedstrijd",
      ],
    },
  ];

  const benefits = [
    {
      icon: Building2,
      title: "Zichtbaarheid",
      description:
        "Bereik een actieve en betrokken lokale gemeenschap van rugbyliefhebbers",
    },
    {
      icon: Handshake,
      title: "Netwerken",
      description: "Directe verbinding met lokale ondernemers en professionals",
    },
    {
      icon: Trophy,
      title: "Traditie & Groei",
      description: "Investeer in 50 jaar traditie met groeiende ambities",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center section-navy">
        <div className="absolute inset-0 bg-gradient-to-br from-heritage via-primary-navy to-heritage opacity-95"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-6">
            <span className="text-accent font-semibold">Sponsoring</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Partner van de Scrumboks
            <span className="block text-accent">Groei Samen Met Ons</span>
          </h1>

          <p className="text-xl text-heritage-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Investeer in meer dan sport. Steun een gemeenschap, traditie en de
            ontwikkeling van jonge talenten in Tiel. Kies het sponsorpakket dat
            bij uw bedrijf past.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 section-warm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-navy">
              Waarom Sponsoren?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Als sponsor van Rugby Club de Scrumboks investeert u in meer dan
              alleen sport.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
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
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 section-navy">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Sponsorpakketten
            </h2>
            <p className="text-heritage-foreground/80 text-xl max-w-3xl mx-auto">
              Kies het pakket dat past bij uw bedrijf en marketingdoelen.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {sponsorPackages.map((pkg, index) => (
              <Card
                key={index}
                className={`bg-white/10 backdrop-blur-sm border-white/20 hover-lift ${
                  pkg.highlight ? "ring-2 ring-accent scale-105" : ""
                }`}
              >
                <CardContent className="p-8 text-center">
                  {pkg.highlight && (
                    <Badge className="mb-4 bg-accent text-accent-foreground">
                      Meest Populair
                    </Badge>
                  )}

                  <div className="bg-accent/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <pkg.icon className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-heading font-bold text-white mb-4">
                    {pkg.name}
                  </h3>

                  <div className="mb-6">
                    <div className="text-3xl font-heading font-bold text-accent">
                      {pkg.price}
                    </div>
                    <div className="text-heritage-foreground/80">
                      {pkg.period}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-left">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-heritage-foreground/90">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    size="lg"
                    className={`w-full font-semibold ${
                      pkg.highlight
                        ? "bg-accent hover:bg-accent-warm text-accent-foreground"
                        : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                    }`}
                    onClick={() => setShowSponsorSelection(true)}
                  >
                    Kies {pkg.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 section-warm">
        <div className="container mx-auto px-6">
          <div className="bg-heritage rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Klaar om Partner te Worden?
            </h3>

            <p className="text-heritage-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
              Neem contact met ons op voor een vrijblijvend gesprek over de
              mogelijkheden. We maken graag tijd voor u om de perfecte
              samenwerking te bespreken.
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-warm text-accent-foreground font-semibold px-8"
                onClick={() => {
                  const contactSection = document.getElementById("contact");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  } else {
                    window.location.href = "/#contact";
                  }
                }}
              >
                Neem Contact Op
              </Button>
              <Button
                size="lg"
                className="bg-accent hover:bg-accent-warm text-accent-foreground font-semibold px-8"
                onClick={() => {
                  // TODO: Implementeer brochure download
                  alert("Brochure download komt binnenkort beschikbaar!");
                }}
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {showSponsorSelection && (
        <SponsorSelection
          packages={sponsorPackages}
          onClose={() => setShowSponsorSelection(false)}
        />
      )}
    </div>
  );
};

export default SponsorsPage;
