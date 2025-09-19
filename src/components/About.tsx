import teamCelebration from '@/assets/team-celebration.jpg';

const About = () => {
  return (
    <section className="py-20 section-warm">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-6">
              <span className="text-accent-gold font-semibold">Over Ons</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-primary-navy">
              Meer dan een Club,
              <span className="block text-accent-gold">Een Familie</span>
            </h2>

            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Sinds 1976 staat Rugby Club de Scrumboks voor{' '}
                <strong className="text-primary-navy">authentieke rugby</strong>{' '}
                in Tiel. We zijn een warme en hechte club waar rugby en
                vriendschap hand in hand gaan.
              </p>

              <p>
                Bij ons draait het niet alleen om de sport, maar om de{' '}
                <strong className="text-accent-gold">gemeenschap</strong> die we
                samen vormen. Van onze jongste spelers tot onze ervaren
                veteranen - iedereen voelt zich hier thuis.
              </p>

              <p>
                <em className="text-primary-navy">Plezier en passie.</em>
                De Scrumboks zijn meer dan een club. Hier beleef je rugby met
                plezier, speel je met passie en bouw je mee aan een traditie die
                al meer dan 50 jaar trots overeind staat.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-accent/20">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-gold">
                  50
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Jaar Traditie
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-gold">
                  150+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Actieve Leden
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-accent-gold">
                  6
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Teams
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-rugby">
              <img
                src={teamCelebration}
                alt="Team celebration - Rugby Club de Scrumboks"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/20 to-transparent"></div>
            </div>

            {/* Floating Quote */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-warm max-w-sm">
              <blockquote className="text-primary-navy font-medium">
                "Bij de Scrumboks voel je meteen de warme sfeer. Een club waar
                rugby nog echt rugby is."
              </blockquote>
              <cite className="text-accent-gold text-sm font-semibold mt-2 block">
                - Mark van der Berg, speler sinds 2018
              </cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
