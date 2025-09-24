import { useState } from "react";
import { Trophy, Award, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const ClubVan50 = () => {
  useScrollToTop(); // Scroll naar top bij laden van deze pagina

  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    extraTekst: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Implementeer echte form submission
      // Voor nu: simulatie met betere feedback
      console.log("Club van 50 form submitted:", formData);

      // Simuleer API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert(
        "Aanmelding ontvangen! We nemen contact met je op voor de details."
      );
      setFormData({ naam: "", email: "", telefoon: "", extraTekst: "" });
    } catch (error) {
      alert("Er is iets misgegaan. Probeer het later opnieuw.");
    }
  };

  const benefits = [
    {
      icon: Trophy,
      title: "Jubileumversie",
      description: "Deel van een unieke 50-jarige traditie",
    },
    {
      icon: Award,
      title: "Vereeuwigd",
      description: "Jouw naam op het exclusieve Club van 50 bord",
    },
    {
      icon: Star,
      title: "Certificaat",
      description: "Persoonlijk jubileumcertificaat",
    },
    {
      icon: Users,
      title: "VIP Access",
      description: "Exclusieve toegang tot speciale activiteiten",
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
            <span className="text-accent font-semibold">50 Jaar Traditie</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
            Club van 50
            <span className="block text-accent">
              Word Onderdeel van de Geschiedenis
            </span>
          </h1>

          <p className="text-xl text-heritage-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Ter ere van ons 50-jarig jubileum lanceren we de exclusieve Club van
            50. Word onderdeel van deze mijlpaal en help onze club groeien naar
            de toekomst.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 section-warm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-navy">
              Waarom Meedoen?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Als lid van de Club van 50 krijg je exclusieve voordelen en help
              je onze club naar het volgende niveau tillen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 section-navy">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-white mb-6">
                Word Lid van de Club van 50
              </h2>
              <p className="text-heritage-foreground/80 text-lg">
                Vul onderstaand formulier in en we nemen contact met je op voor
                de details.
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="naam" className="text-white font-medium">
                      Naam *
                    </Label>
                    <Input
                      id="naam"
                      type="text"
                      required
                      value={formData.naam}
                      onChange={(e) =>
                        setFormData({ ...formData, naam: e.target.value })
                      }
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Je volledige naam"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="je.email@voorbeeld.nl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="telefoon"
                      className="text-white font-medium"
                    >
                      Telefoon *
                    </Label>
                    <Input
                      id="telefoon"
                      type="tel"
                      required
                      value={formData.telefoon}
                      onChange={(e) =>
                        setFormData({ ...formData, telefoon: e.target.value })
                      }
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="06-12345678"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="extraTekst"
                      className="text-white font-medium"
                    >
                      Extra tekst onder je naam (optioneel)
                    </Label>
                    <Input
                      id="extraTekst"
                      type="text"
                      value={formData.extraTekst}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          extraTekst: e.target.value,
                        })
                      }
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                      placeholder="Bijv. bedrijf, organisatie, functie of an"
                    />
                    <p className="text-sm text-heritage-foreground/60">
                      Deze tekst verschijnt onder je naam op het Club van 50
                      bord en op de website
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent-warm text-accent-foreground font-semibold"
                  >
                    Word Lid van Club van 50
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClubVan50;
