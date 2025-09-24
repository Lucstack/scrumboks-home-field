import { useState } from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import clubhouseInterior from '@/assets/clubhouse-interior.jpg';

const Contact = ({ id }: { id?: string }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: 'Bericht verzonden!',
      description: 'We nemen zo snel mogelijk contact met je op.',
    });
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adres',
      details: ['Beethovenstraat 18a', '4003 KX Tiel'],
    },
    {
      icon: Mail,
      title: 'E-mail',
      details: ['info@scrumboks.nl'],
    },
    {
      icon: Phone,
      title: 'Telefoon Clubhuis',
      details: ['0344 623201'],
    },
    {
      icon: Clock,
      title: 'Trainingstijden',
      details: ['Di & Do 18:45 - 20:30', 'Vr 20:00 - 22:00'],
    },
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/Scrumboks/',
      label: 'Facebook',
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/scrumboks_rugby/',
      label: 'Instagram',
    },
    { icon: Twitter, href: 'https://x.com/scrumboks', label: 'Twitter' },
  ];

  return (
    <section id={id || "contact"} className="py-20 section-navy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/30 mb-6">
            <span className="text-accent font-semibold">Contact</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-white">
            Kom Langs en
            <span className="block text-accent">Maak Kennis</span>
          </h2>

          <p className="text-xl text-heritage-foreground/80 max-w-2xl mx-auto">
            Vragen? Interesse in een proeftraining? We horen graag van je!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/95 border-none shadow-warm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-primary-navy mb-6">
                Stuur ons een bericht
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-primary-navy mb-2"
                    >
                      Naam *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-accent/20 focus:border-accent focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-primary-navy mb-2"
                    >
                      E-mail *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-accent/20 focus:border-accent focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-primary-navy mb-2"
                    >
                      Telefoon
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-accent/20 focus:border-accent focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-semibold text-primary-navy mb-2"
                    >
                      Onderwerp
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="border-accent/20 focus:border-accent focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-primary-navy mb-2"
                  >
                    Bericht *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="border-accent/20 focus:border-accent focus:ring-accent"
                    placeholder="Vertel ons waar je interesse in hebt..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-accent hover:bg-accent-warm text-accent-foreground font-semibold hover-lift"
                >
                  Verstuur Bericht
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info & Clubhouse */}
          <div className="space-y-8">
            {/* Clubhouse Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-rugby">
              <img
                src={clubhouseInterior}
                alt="Rugby Club de Scrumboks clubhuis"
                className="w-full h-64 object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h4 className="font-heading font-bold text-xl">Ons Clubhuis</h4>
                <p className="text-sm opacity-90">Het hart van de Scrumboks</p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border-accent/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/20 p-2 rounded-lg">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {info.title}
                        </h4>
                        {info.details.map((detail, i) => (
                          <p
                            key={i}
                            className="text-sm text-heritage-foreground/80"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h4 className="font-heading font-bold text-white mb-4 text-center">
                Volg Ons Online
              </h4>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-accent/20 p-3 rounded-lg hover:bg-accent/30 transition-colors hover-lift"
                  >
                    <social.icon className="w-5 h-5 text-accent" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
