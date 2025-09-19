import { MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-navy text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Club Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-accent mb-4">
              Rugby Club de Scrumboks
            </h3>
            <p className="text-heritage-foreground/80 leading-relaxed mb-4">
              50+ jaar rugby traditie in Tiel. Een hechte community waar rugby en vriendschap centraal staan.
            </p>
            <div className="text-accent-warm font-semibold">
              Sinds 1970
            </div>
          </div>
          
          {/* Quick Contact */}
          <div>
            <h4 className="font-heading font-bold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span className="text-sm text-heritage-foreground/80">
                  Beethovenstraat 18a, 4003 KX Tiel
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="text-sm text-heritage-foreground/80">
                  info@scrumboks.nl
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span className="text-sm text-heritage-foreground/80">
                  0344 623201
                </span>
              </div>
            </div>
          </div>
          
          {/* Training Times */}
          <div>
            <h4 className="font-heading font-bold mb-4">Trainingstijden</h4>
            <div className="space-y-2 text-sm text-heritage-foreground/80">
              <div>Dinsdag: 18:45 - 20:30</div>
              <div>Woensdag: 18:45 - 20:30</div>
              <div>Donderdag: 18:45 - 20:30</div>
              <div>Vrijdag: 20:00 - 22:00</div>
            </div>
            <div className="text-accent-warm font-semibold mt-4">
              Nieuwe leden welkom!
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-heritage-foreground/60 text-sm">
            © 2024 Rugby Club de Scrumboks. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;