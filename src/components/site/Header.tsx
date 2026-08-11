import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const LOGO = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/14346e37-5113-4231-af71-69c04fab1812.png';

const links = [
  { href: '#top', label: 'Главная' },
  { href: '#about', label: 'О нас' },
  { href: '#portfolio', label: 'Работы' },
  { href: '#packages', label: 'Цены' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-card/85 backdrop-blur-md shadow-[0_8px_30px_-18px_rgba(46,65,111,0.5)]' : 'bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between h-[72px] gap-2">
        <a href="#top" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <img src={LOGO} alt="Айсберг-видео" className="h-8 sm:h-9 w-auto shrink-0" />
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-foreground truncate">Айсберг-видео</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://icebergvideo-old.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
          >
            Old_Version
          </a>
          <a
            href="#contacts"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-display font-semibold text-primary-foreground shadow-[0_14px_30px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 transition-transform"
          >
            Оставить заявку
          </a>
        </nav>

        <Sheet>
          <SheetTrigger className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-card/80 text-foreground shrink-0">
            <Icon name="Menu" size={22} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] bg-card border-border">
            <div className="mt-10 flex flex-col gap-2">
              {links.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-2xl px-4 py-3 text-lg font-display font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    {l.label}
                  </a>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <a
                  href="https://icebergvideo-old.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl px-4 py-3 text-lg font-display font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Old_Version
                </a>
              </SheetClose>
              <SheetClose asChild>
                <a
                  href="#contacts"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-display font-semibold text-primary-foreground"
                >
                  Оставить заявку
                </a>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;