import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import About from '@/components/site/About';
import Portfolio from '@/components/site/Portfolio';
import Packages from '@/components/site/Packages';
import Contacts from '@/components/site/Contacts';
import Footer from '@/components/site/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Packages />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
