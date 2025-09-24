import { useState } from "react";
import { Crown, Zap, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendSponsorEmail } from "@/lib/email-service";
import { useToast } from "@/hooks/use-toast";

interface SponsorPackage {
  name: string;
  icon: any;
  price: string;
  period: string;
  features: string[];
  highlight: boolean;
}

interface SponsorSelectionProps {
  packages: SponsorPackage[];
  onClose: () => void;
}

const SponsorSelection = ({ packages, onClose }: SponsorSelectionProps) => {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<SponsorPackage | null>(
    null
  );
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log("Sponsor aanvraag:", { selectedPackage, formData });

      // Send email via SMTP
      const result = await sendSponsorEmail({
        ...formData,
        selectedPackage: selectedPackage?.name || "",
      });

      if (result.success) {
        toast({
          title: "Aanvraag ontvangen!",
          description: `Aanvraag voor ${selectedPackage?.name} pakket ontvangen! We nemen contact met je op.`,
        });
        onClose();
      } else {
        throw new Error(result.error || "Failed to send email");
      }
    } catch (error) {
      console.error("Sponsor form error:", error);
      toast({
        title: "Fout bij verzenden",
        description: "Er is iets misgegaan. Probeer het later opnieuw.",
        variant: "destructive",
      });
    }
  };

  if (!selectedPackage) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-heading font-bold text-primary-navy">
                Kies Je Sponsorpakket
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-muted-foreground mt-2">
              Selecteer het pakket dat het beste bij jouw bedrijf past
            </p>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              {packages.map((pkg, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    pkg.highlight ? "ring-2 ring-accent" : ""
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <CardContent className="p-6 text-center">
                    {pkg.highlight && (
                      <div className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-full mb-4 inline-block">
                        Meest Populair
                      </div>
                    )}

                    <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <pkg.icon className="w-8 h-8 text-accent-gold" />
                    </div>

                    <h3 className="text-xl font-heading font-bold text-primary-navy mb-2">
                      {pkg.name}
                    </h3>

                    <div className="mb-4">
                      <div className="text-2xl font-heading font-bold text-accent">
                        {pkg.price}
                      </div>
                      <div className="text-muted-foreground text-sm">
                        {pkg.period}
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm text-left mb-4">
                      {pkg.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          <span className="text-muted-foreground">
                            {feature}
                          </span>
                        </li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-accent text-xs">
                          +{pkg.features.length - 3} meer voordelen
                        </li>
                      )}
                    </ul>

                    <Button className="w-full bg-accent hover:bg-accent-warm text-accent-foreground">
                      Kies {pkg.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary-navy">
                {selectedPackage.name} Pakket
              </h2>
              <p className="text-accent font-semibold">
                {selectedPackage.price} {selectedPackage.period}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName" className="font-medium">
                  Bedrijfsnaam *
                </Label>
                <Input
                  id="companyName"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="Jouw bedrijfsnaam"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="font-medium">
                  Contactpersoon *
                </Label>
                <Input
                  id="contactPerson"
                  required
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  placeholder="Jouw naam"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
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
                  placeholder="contact@bedrijf.nl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="font-medium">
                  Telefoon *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="06-12345678"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-medium">
                Omschrijving (optioneel)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Vertel ons iets over je bedrijf of waarom je wilt sponsoren..."
                rows={3}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedPackage(null)}
                className="flex-1"
              >
                Terug naar Pakketten
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent-warm text-accent-foreground"
              >
                Verstuur Aanvraag
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SponsorSelection;
