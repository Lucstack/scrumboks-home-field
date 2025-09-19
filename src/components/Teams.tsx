import { Users, Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Teams = () => {
  const teams = [
    {
      name: 'Senioren',
      players: 25,
      age: '18+',
      training: 'Di & Vr 20:00',
      description:
        'Onze hoofdmacht waar ervaren spelers en nieuwe talenten samen het veld betreden.',
    },
    {
      name: 'Dames',
      players: 20,
      age: '16+',
      training: 'Di & Vr 20:00',
      description:
        'Sterke damesteam dat laat zien dat rugby voor iedereen toegankelijk is.',
    },
    {
      name: 'TBM',
      players: 53,
      age: '6–12 jr',
      training: 'Di & Do 18:45',
      description:
        'Onze jongste rugbyers leren hier de basis van rugby en teamwerk.',
    },
    {
      name: 'Cubs',
      players: 22,
      age: '12–14 jr',
      training: 'Di & Do 18:45',
      description:
        'Ontwikkeling van techniek en tactiek staat centraal bij deze leeftijdsgroep.',
    },
    {
      name: 'Junioren',
      players: 18,
      age: '14–16 jr',
      training: 'Di & Do 18:45',
      description:
        'Voorbereiding op seniorenrugby met focus op persoonlijke groei.',
    },
    {
      name: 'Colts',
      players: 16,
      age: '16–18 jr',
      training: 'Di & Do 18:45',
      description: 'De laatste stap voor de overgang naar het seniorenrugby.',
    },
  ];

  return (
    <section className="py-20 section-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-6">
            <span className="text-accent font-semibold">Onze Teams</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            Voor Elke Leeftijd
            <span className="block text-accent">Een Thuishaven</span>
          </h2>

          <p className="text-xl text-heritage-foreground/80 max-w-2xl mx-auto">
            Van 6 tot 60+, bij de Scrumboks is er een plek voor iedereen die van
            rugby houdt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team, index) => (
            <Card
              key={index}
              className="bg-white/95 border-none shadow-warm hover-lift group"
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-heading font-bold text-primary-navy group-hover:text-accent-gold transition-colors">
                    {team.name}
                  </h3>
                  <div className="bg-accent/10 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-accent-gold" />
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {team.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-accent-gold" />
                    <span className="font-semibold text-primary-navy">
                      {team.players} spelers
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-accent-gold" />
                    <span className="text-muted-foreground">{team.age}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-accent-gold" />
                    <span className="text-muted-foreground">
                      {team.training}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-accent/10">
                  <div className="text-accent-gold font-semibold text-sm">
                    Locatie: Beethovenstraat 18a, Tiel
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Klaar om te beginnen?
            </h3>
            <p className="text-heritage-foreground/80 mb-6">
              Kom langs tijdens een training of neem contact met ons op. Nieuwe
              leden zijn altijd welkom voor een proeftraining!
            </p>
            <div className="text-accent font-semibold">
              Trainingstijden: Di & Do 18:45h tot 20:30h, Vr 20:00h tot 22:00h
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Teams;
