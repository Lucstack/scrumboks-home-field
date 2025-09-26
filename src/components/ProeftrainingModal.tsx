import { useState } from 'react';
import { X, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { sendProeftrainingEmail } from '@/lib/email-service';
import { useToast } from '@/hooks/use-toast';
import { isValidEmail, isValidPhone } from '@/lib/validation';

interface ProeftrainingModalProps {
  onClose: () => void;
}

const ProeftrainingModal = ({ onClose }: ProeftrainingModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    naam: '',
    telefoon: '',
    email: '',
    leeftijd: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email if provided
    if (formData.email && !isValidEmail(formData.email)) {
      toast({
        title: 'Ongeldig email adres',
        description: 'Controleer je email adres en probeer opnieuw.',
        variant: 'destructive',
      });
      return;
    }

    // Validate phone number
    if (!isValidPhone(formData.telefoon)) {
      toast({
        title: 'Ongeldig telefoonnummer',
        description: 'Voer een geldig telefoonnummer in (minimaal 10 cijfers).',
        variant: 'destructive',
      });
      return;
    }

    try {
      console.log('Proeftraining aanvraag:', formData);

      // Send email via Google Apps Script
      const result = await sendProeftrainingEmail(formData);

      if (result.success) {
        toast({
          title: 'Proeftraining aangevraagd!',
          description:
            'We nemen contact met je op om een proeftraining in te plannen.',
        });
        onClose();
      } else {
        throw new Error(result.error || 'Failed to send email');
      }
    } catch (error) {
      console.error('Proeftraining form error:', error);
      toast({
        title: 'Fout bij verzenden',
        description: 'Er is iets misgegaan. Probeer het later opnieuw.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 w-10 h-10 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-primary-navy">
                  Plan een Proeftraining
                </h2>
                <p className="text-sm text-muted-foreground">
                  Kom kennismaken met rugby!
                </p>
              </div>
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
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="naam" className="font-medium">
                Naam *
              </Label>
              <Input
                id="naam"
                required
                value={formData.naam}
                onChange={e =>
                  setFormData({ ...formData, naam: e.target.value })
                }
                placeholder="Je volledige naam"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefoon" className="font-medium">
                Telefoon *
              </Label>
              <Input
                id="telefoon"
                type="tel"
                required
                value={formData.telefoon}
                onChange={e =>
                  setFormData({ ...formData, telefoon: e.target.value })
                }
                placeholder="06-12345678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email (optioneel)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="je.email@voorbeeld.nl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="leeftijd" className="font-medium">
                Leeftijd *
              </Label>
              <Input
                id="leeftijd"
                type="number"
                required
                min="6"
                max="99"
                value={formData.leeftijd}
                onChange={e =>
                  setFormData({ ...formData, leeftijd: e.target.value })
                }
                placeholder="25"
              />
            </div>

            <div className="bg-accent/5 p-4 rounded-lg border border-accent/20">
              <p className="text-sm text-muted-foreground">
                <strong>Wat gebeurt er na je aanvraag?</strong>
                <br />
                We nemen contact met je op om een proeftraining in te plannen.
                Je kunt gratis meedoen en kennismaken met rugby en onze club!
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Annuleren
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent-warm text-accent-foreground"
              >
                Aanvragen
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProeftrainingModal;
