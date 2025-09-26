import { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Upload,
  User,
  MapPin,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { isValidEmail, isValidPhone } from '@/lib/validation';
import {
  sendWordLidIncompleteEmail,
  sendWordLidCompleteEmail,
} from '@/lib/email-service';

interface WordLidModalProps {
  onClose: () => void;
}

interface FormData {
  // Stap 1: Basis gegevens
  voornaam: string;
  achternaam: string;
  geboortedatum: string;
  email: string;
  mobiel: string;

  // Stap 2: Contact & Adres
  land: string;
  postcode: string;
  huisnummer: string;
  straat: string;
  plaats: string;

  // Stap 3: Rugby & Betaling
  pasfoto: File | null;
  automatischeIncasso: string; // 'ja' of 'nee'
  iban: string;
  tnv: string;
  telefoonMoeder: string;
  telefoonVader: string;
  noodnummer: string;

  // Stap 4: Lidmaatschap & Akkoord
  lidmaatschapType: string;
  akkoordMinderjarigen: boolean;
  handtekening: string;
}

const STORAGE_KEY = 'word-lid-form-data';

const WordLidModal = ({ onClose }: WordLidModalProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    voornaam: '',
    achternaam: '',
    geboortedatum: '',
    email: '',
    mobiel: '',
    land: 'Nederland',
    postcode: '',
    huisnummer: '',
    straat: '',
    plaats: '',
    pasfoto: null,
    automatischeIncasso: 'nee',
    iban: '',
    tnv: '',
    telefoonMoeder: '',
    telefoonVader: '',
    noodnummer: '',
    lidmaatschapType: 'Basis lidmaatschap',
    akkoordMinderjarigen: false,
    handtekening: '',
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        // Determine current step based on filled data
        if (parsed.handtekening) setCurrentStep(4);
        else if (parsed.pasfoto || parsed.automatischeIncasso !== 'nee')
          setCurrentStep(3);
        else if (parsed.postcode) setCurrentStep(2);
        else setCurrentStep(1);
      } catch (error) {
        console.error('Error loading form data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const isUnder18 = () => {
    if (!formData.geboortedatum) return false;
    const birthDate = new Date(formData.geboortedatum);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    return age < 18 || (age === 18 && monthDiff < 0);
  };

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Note: Postcode lookup disabled due to CORS issues
    // Users can manually fill in street and city
  };

  const lookupAddress = async (postcode: string, huisnummer: string) => {
    // For now, just show a helpful message
    // In a real implementation, you'd use a proper postcode API
    toast({
      title: 'Adres invullen',
      description: 'Vul handmatig je straat en plaats in.',
    });

    // You can implement a real postcode lookup here later
    // For now, we'll let users fill it manually
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange('pasfoto', file);
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      const missingFields = [];
      if (!formData.voornaam) missingFields.push('Voornaam');
      if (!formData.achternaam) missingFields.push('Achternaam');
      if (!formData.geboortedatum) missingFields.push('Geboortedatum');
      if (!formData.email) missingFields.push('E-mail');
      if (!formData.mobiel) missingFields.push('Mobiel');

      if (missingFields.length > 0) {
        toast({
          title: 'Verplichte velden ontbreken',
          description: `Vul de volgende velden in: ${missingFields.join(', ')}`,
          variant: 'destructive',
        });
        return;
      }

      // Validate email and phone
      if (!isValidEmail(formData.email)) {
        toast({
          title: 'Ongeldig email adres',
          description: 'Controleer je email adres en probeer opnieuw.',
          variant: 'destructive',
        });
        return;
      }

      if (!isValidPhone(formData.mobiel)) {
        toast({
          title: 'Ongeldig telefoonnummer',
          description:
            'Voer een geldig telefoonnummer in (minimaal 10 cijfers).',
          variant: 'destructive',
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.postcode || !formData.huisnummer) {
        toast({
          title: 'Vul alle verplichte velden in',
          description: 'Controleer of postcode en huisnummer zijn ingevuld.',
          variant: 'destructive',
        });
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.pasfoto) {
        toast({
          title: 'Upload een pasfoto',
          description: 'Een pasfoto is verplicht om door te gaan.',
          variant: 'destructive',
        });
        return;
      }

      // Validate IBAN if automatic incasso is selected
      if (
        formData.automatischeIncasso === 'ja' &&
        (!formData.iban || !formData.tnv)
      ) {
        toast({
          title: 'Vul IBAN gegevens in',
          description:
            'IBAN en T.n.v. zijn verplicht bij automatische incasso.',
          variant: 'destructive',
        });
        return;
      }

      // Validate parent/guardian info if under 18
      if (
        isUnder18() &&
        (!formData.telefoonMoeder ||
          !formData.telefoonVader ||
          !formData.noodnummer)
      ) {
        toast({
          title: 'Vul ouder/verzorger gegevens in',
          description:
            'Telefoon moeder, vader en noodnummer zijn verplicht voor minderjarigen.',
          variant: 'destructive',
        });
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const saveAndClose = async () => {
    try {
      // Send incomplete application email
      const result = await sendWordLidIncompleteEmail({
        currentStep,
        ...formData,
      });

      if (result.success) {
        toast({
          title: 'Gegevens opgeslagen!',
          description: `Je gegevens zijn opgeslagen bij stap ${currentStep}. We nemen contact met je op.`,
        });
        // Don't remove from localStorage - keep for potential continuation
        onClose();
      }
    } catch (error) {
      console.error('Error saving incomplete application:', error);
      toast({
        title: 'Gegevens opgeslagen lokaal',
        description:
          'Je gegevens zijn lokaal opgeslagen. We nemen contact met je op.',
      });
      onClose();
    }
  };

  const clearForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData({
      voornaam: '',
      achternaam: '',
      geboortedatum: '',
      email: '',
      mobiel: '',
      land: 'Nederland',
      postcode: '',
      huisnummer: '',
      straat: '',
      plaats: '',
      pasfoto: null,
      automatischeIncasso: 'nee',
      iban: '',
      tnv: '',
      telefoonMoeder: '',
      telefoonVader: '',
      noodnummer: '',
      lidmaatschapType: 'Basis lidmaatschap',
      akkoordMinderjarigen: false,
      handtekening: '',
    });
    setCurrentStep(1);
    toast({
      title: 'Formulier gewist',
      description: 'Je kunt nu opnieuw beginnen.',
    });
  };

  const handleSubmit = async () => {
    // Validate required fields for final submission
    const missingFields = [];
    if (!formData.voornaam) missingFields.push('Voornaam');
    if (!formData.achternaam) missingFields.push('Achternaam');
    if (!formData.geboortedatum) missingFields.push('Geboortedatum');
    if (!formData.email) missingFields.push('E-mail');
    if (!formData.mobiel) missingFields.push('Mobiel');
    if (!formData.postcode) missingFields.push('Postcode');
    if (!formData.huisnummer) missingFields.push('Huisnummer');
    if (!formData.straat) missingFields.push('Straat');
    if (!formData.plaats) missingFields.push('Plaats');
    if (!formData.pasfoto) missingFields.push('Pasfoto');
    if (!formData.handtekening) missingFields.push('Handtekening');

    // Check if handtekening is too short (should be full name)
    if (formData.handtekening && formData.handtekening.length < 3) {
      missingFields.push('Handtekening (volledige naam)');
    }

    if (missingFields.length > 0) {
      toast({
        title: 'Verplichte velden ontbreken',
        description: `Vul de volgende velden in: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    // Validate email and phone
    if (!isValidEmail(formData.email)) {
      toast({
        title: 'Ongeldig email adres',
        description: 'Controleer je email adres en probeer opnieuw.',
        variant: 'destructive',
      });
      return;
    }

    if (!isValidPhone(formData.mobiel)) {
      toast({
        title: 'Ongeldig telefoonnummer',
        description: 'Voer een geldig telefoonnummer in (minimaal 10 cijfers).',
        variant: 'destructive',
      });
      return;
    }

    try {
      const result = await sendWordLidCompleteEmail(formData);

      if (result.success) {
        toast({
          title: 'Aanmelding voltooid!',
          description: 'Welkom bij de Scrumboks! We nemen contact met je op.',
        });
        localStorage.removeItem(STORAGE_KEY);
        onClose();
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: 'Fout bij verzenden',
        description: 'Er is iets misgegaan. Probeer het later opnieuw.',
        variant: 'destructive',
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-heading font-bold text-primary-navy mb-2">
          Basis Gegevens
        </h3>
        <p className="text-muted-foreground">Vertel ons wie je bent</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="voornaam" className="font-medium">
            Voornaam <span className="text-red-500">*</span>
          </Label>
          <Input
            id="voornaam"
            value={formData.voornaam}
            onChange={e => handleInputChange('voornaam', e.target.value)}
            placeholder="Je voornaam"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="achternaam" className="font-medium">
            Achternaam <span className="text-red-500">*</span>
          </Label>
          <Input
            id="achternaam"
            value={formData.achternaam}
            onChange={e => handleInputChange('achternaam', e.target.value)}
            placeholder="Je achternaam"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="geboortedatum" className="font-medium">
          Geboortedatum <span className="text-red-500">*</span>
        </Label>
        <Input
          id="geboortedatum"
          type="date"
          value={formData.geboortedatum}
          onChange={e => handleInputChange('geboortedatum', e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium">
          E-mail <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => handleInputChange('email', e.target.value)}
          placeholder="je.email@voorbeeld.nl"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mobiel" className="font-medium">
          Mobiel <span className="text-red-500">*</span>
        </Label>
        <Input
          id="mobiel"
          type="tel"
          value={formData.mobiel}
          onChange={e => handleInputChange('mobiel', e.target.value)}
          placeholder="06-12345678"
          required
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-heading font-bold text-primary-navy mb-2">
          Contact & Adres
        </h3>
        <p className="text-muted-foreground">Waar kunnen we je bereiken?</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="land" className="font-medium">
          Land
        </Label>
        <Select
          value={formData.land}
          onValueChange={value => handleInputChange('land', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nederland">Nederland</SelectItem>
            <SelectItem value="België">België</SelectItem>
            <SelectItem value="Duitsland">Duitsland</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="postcode" className="font-medium">
            Postcode <span className="text-red-500">*</span>
          </Label>
          <Input
            id="postcode"
            value={formData.postcode}
            onChange={e =>
              handleInputChange('postcode', e.target.value.toUpperCase())
            }
            placeholder="1234AB"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="huisnummer" className="font-medium">
            Huisnummer <span className="text-red-500">*</span>
          </Label>
          <Input
            id="huisnummer"
            value={formData.huisnummer}
            onChange={e => handleInputChange('huisnummer', e.target.value)}
            placeholder="123"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="straat" className="font-medium">
            Straat <span className="text-red-500">*</span>
          </Label>
          <Input
            id="straat"
            value={formData.straat}
            onChange={e => handleInputChange('straat', e.target.value)}
            placeholder="Straatnaam"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="plaats" className="font-medium">
          Plaats <span className="text-red-500">*</span>
        </Label>
        <Input
          id="plaats"
          value={formData.plaats}
          onChange={e => handleInputChange('plaats', e.target.value)}
          placeholder="Plaatsnaam"
          required
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-heading font-bold text-primary-navy mb-2">
          Rugby & Betaling
        </h3>
        <p className="text-muted-foreground">
          Upload je pasfoto en regel de betaling
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pasfoto" className="font-medium">
          Pasfoto <span className="text-red-500">*</span>
        </Label>
        <div className="border-2 border-dashed border-accent/20 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-accent mx-auto mb-2" />
          <input
            id="pasfoto"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="pasfoto" className="cursor-pointer">
            <span className="text-accent font-medium">
              {formData.pasfoto
                ? formData.pasfoto.name
                : 'Klik om foto te uploaden'}
            </span>
          </label>
          <p className="text-sm text-muted-foreground mt-1">
            Minimale dimensies 300x400px. Max 4MB.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-blue-800">
              <strong>Let op:</strong> De pasfoto wordt niet automatisch
              meegestuurd. Je ontvangt een email met instructies om de foto
              apart te mailen.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="font-medium">Automatische incasso?</Label>
        <RadioGroup
          value={formData.automatischeIncasso}
          onValueChange={value =>
            handleInputChange('automatischeIncasso', value)
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ja" id="incasso-ja" />
            <Label htmlFor="incasso-ja">
              Ja, ik geef toestemming voor automatische incasso
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nee" id="incasso-nee" />
            <Label htmlFor="incasso-nee">Nee, ik betaal handmatig</Label>
          </div>
        </RadioGroup>

        {formData.automatischeIncasso === 'ja' && (
          <div className="space-y-4 pl-6 border-l-2 border-accent/20">
            <div className="space-y-2">
              <Label htmlFor="iban" className="font-medium">
                IBAN nummer *
              </Label>
              <Input
                id="iban"
                value={formData.iban}
                onChange={e =>
                  handleInputChange('iban', e.target.value.toUpperCase())
                }
                placeholder="NL91ABNA0417164300"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tnv" className="font-medium">
                T.n.v. *
              </Label>
              <Input
                id="tnv"
                value={formData.tnv}
                onChange={e => handleInputChange('tnv', e.target.value)}
                placeholder="Naam op de rekening"
                required
              />
            </div>
          </div>
        )}
      </div>

      {isUnder18() && (
        <div className="space-y-4">
          <h4 className="font-medium text-primary-navy">
            Ouder/Verzorger gegevens
          </h4>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="telefoonMoeder" className="font-medium">
                Telefoon moeder *
              </Label>
              <Input
                id="telefoonMoeder"
                type="tel"
                value={formData.telefoonMoeder}
                onChange={e =>
                  handleInputChange('telefoonMoeder', e.target.value)
                }
                placeholder="06-12345678"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefoonVader" className="font-medium">
                Telefoon vader *
              </Label>
              <Input
                id="telefoonVader"
                type="tel"
                value={formData.telefoonVader}
                onChange={e =>
                  handleInputChange('telefoonVader', e.target.value)
                }
                placeholder="06-12345678"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="noodnummer" className="font-medium">
              Noodnummer *
            </Label>
            <Input
              id="noodnummer"
              type="tel"
              value={formData.noodnummer}
              onChange={e => handleInputChange('noodnummer', e.target.value)}
              placeholder="06-12345678"
              required
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-xl font-heading font-bold text-primary-navy mb-2">
          Lidmaatschap & Akkoord
        </h3>
        <p className="text-muted-foreground">
          Kies je lidmaatschap en geef je akkoord
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lidmaatschapType" className="font-medium">
          Lidmaatschap type
        </Label>
        <Select
          value={formData.lidmaatschapType}
          onValueChange={value => handleInputChange('lidmaatschapType', value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Basis lidmaatschap">
              Basis lidmaatschap
            </SelectItem>
            <SelectItem value="Spelend lid">Spelend lid</SelectItem>
            <SelectItem value="Recreant">Recreant</SelectItem>
            <SelectItem value="Proeflidmaatschap">Proeflidmaatschap</SelectItem>
            <SelectItem value="Trainingslidmaatschap">
              Trainingslidmaatschap
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isUnder18() && (
        <div className="flex items-center space-x-2">
          <Checkbox
            id="akkoordMinderjarigen"
            checked={formData.akkoordMinderjarigen}
            onCheckedChange={checked =>
              handleInputChange('akkoordMinderjarigen', checked)
            }
          />
          <Label htmlFor="akkoordMinderjarigen" className="text-sm">
            Indien lid jonger dan 18 is, verklaart zijn/haar ouder/verzorger
            akkoord te zijn met de machtigingverstrekking.
          </Label>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="handtekening" className="font-medium">
          Handtekening <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-2">
          <Input
            id="handtekening"
            value={formData.handtekening}
            onChange={e => handleInputChange('handtekening', e.target.value)}
            placeholder="Bijv: Luc van der Voorn"
            required
          />
          {formData.voornaam &&
            formData.achternaam &&
            !formData.handtekening && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  handleInputChange(
                    'handtekening',
                    `${formData.voornaam} ${formData.achternaam}`
                  )
                }
                className="text-xs"
              >
                Gebruik: {formData.voornaam} {formData.achternaam}
              </Button>
            )}
        </div>
        <p className="text-sm text-muted-foreground">
          Vul je volledige naam in (voornaam + achternaam) - dit geldt als je
          handtekening
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-heading font-bold text-primary-navy">
                Word Lid van de Scrumboks
              </h2>
              <p className="text-muted-foreground">Stap {currentStep} van 4</p>
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

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Basis gegevens</span>
              <span>Contact & Adres</span>
              <span>Rugby & Betaling</span>
              <span>Lidmaatschap</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form noValidate>
          <div className="p-6">{renderCurrentStep()}</div>
        </form>

        <div className="p-6 border-t border-gray-200">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Terug
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={saveAndClose}
                  className="flex items-center gap-2"
                >
                  Bewaar en sluit
                </Button>
              </div>

              <div className="flex gap-2">
                {currentStep < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-warm text-accent-foreground"
                  >
                    Volgende
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="flex items-center gap-2 bg-accent hover:bg-accent-warm text-accent-foreground"
                  >
                    Voltooi aanmelding
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={clearForm}
                className="text-sm text-muted-foreground hover:text-destructive"
              >
                Formulier wissen en opnieuw beginnen
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordLidModal;
