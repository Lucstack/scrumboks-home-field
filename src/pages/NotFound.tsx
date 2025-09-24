import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="flex min-h-[80vh] items-center justify-center section-warm">
        <div className="text-center max-w-2xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-heading font-bold text-primary-navy mb-4">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-navy mb-4">
              Pagina Niet Gevonden
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              De pagina die je zoekt bestaat niet of is verplaatst.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">
              Probeer een van deze opties:
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-warm text-accent-foreground">
                <Link to="/">
                  <Home className="w-4 h-4 mr-2" />
                  Terug naar Home
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" onClick={() => window.history.back()}>
                <button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Ga Terug
                </button>
              </Button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-accent/10 rounded-xl">
            <h3 className="text-lg font-heading font-semibold text-primary-navy mb-2">
              Populaire Pagina's
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link to="/#teams" className="text-accent hover:text-accent-warm font-medium">
                Teams
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/#contact" className="text-accent hover:text-accent-warm font-medium">
                Contact
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/club-van-50" className="text-accent hover:text-accent-warm font-medium">
                Club van 50
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link to="/sponsoren" className="text-accent hover:text-accent-warm font-medium">
                Sponsoren
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
