import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import CallbackDialog from './CallbackDialog';
import SmartImage from '@/components/ui/smart-image';

const LOGO = 'https://icebergvideo.ru/photos/14346e37-5113-4231-af71-69c04fab1812.png';

const desktopLinks = [
  { href: '#top', label: 'Главная', external: false },
  { href: '#about', label: 'О нас', external: false },
  { href: '#portfolio', label: 'Работы', external: false },
  { href: '#packages', label: 'Цены', external: false },
  { href: '#contacts', label: 'Контакты', external: false },
  { href: 'https://icebergvideo-old.ru', label: 'Old_Ver.', external: true },
  { href: 'http://www.icebergvideo-retro.ru', label: 'Retro_Ver.', external: true },
  { href: 'https://chat-tom.ru', label: 'Чат-Общага', external: true },
];

const mobileLinks = [
  { href: '#top', label: 'Главная', icon: 'Home', external: false },
  { href: '#about', label: 'О нас', icon: 'Users', external: false },
  { href: '#portfolio', label: 'Работы', icon: 'Film', external: false },
  { href: '#packages', label: 'Цены', icon: 'Wallet', external: false },
  { href: '#contacts', label: 'Контакты', icon: 'MapPin', external: false },
  { href: 'https://icebergvideo-old.ru', label: 'Old_Ver.', icon: 'History', external: true },
  { href: 'http://www.icebergvideo-retro.ru', label: 'Retro_Ver.', icon: 'Monitor', external: true },
  { href: 'https://chat-tom.ru', label: 'Чат-Общага', icon: 'MessageCircle', external: true },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const lockUntil = useRef(0);

  useEffect(() => {
    const ids = desktopLinks.filter((l) => !l.external).map((l) => l.href.slice(1));
    const onScroll = () => {
      if (Date.now() < lockUntil.current) return;
      const line = 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = ids[ids.length - 1];
      setSelected(`#${current}`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onScrollEnd = () => {
      lockUntil.current = 0;
      onScroll();
    };
    window.addEventListener('scrollend', onScrollEnd);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }, []);

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
      <div className="container relative flex items-center justify-between h-[72px] gap-2">
        <a href="#top" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink xl:pointer-events-none">
          <SmartImage src={LOGO} alt="" priority className="h-8 sm:h-9 w-auto shrink-0" />
          <SmartImage
            src="/assets/iceberg-video-logo-text.png"
            alt="Айсберг-видео"
            priority
            className="h-7 sm:h-8 w-auto shrink-0"
          />
        </a>

        <nav
          className="hidden xl:flex items-center gap-1 xl:absolute xl:left-1/2 xl:-translate-x-1/2 whitespace-nowrap"
          onMouseLeave={() => setHovered(null)}
        >
          {desktopLinks.map((l) => {
            const on = l.external || (hovered ?? selected) === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onMouseEnter={() => setHovered(l.external ? null : l.href)}
                onClick={() => {
                  if (l.external) return;
                  lockUntil.current = Date.now() + 1200;
                  setSelected(l.href);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  on
                    ? 'bg-primary text-primary-foreground -translate-y-0.5 shadow-md'
                    : 'text-foreground/75 hover:text-foreground'
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <CallbackDialog
          trigger={
            <button className="hidden xl:inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-display font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform shrink-0">
              <Icon name="PhoneCall" size={16} />
              Заказать звонок
            </button>
          }
        />

        <Sheet>
          <SheetTrigger className="xl:hidden inline-flex items-center justify-center h-11 w-11 rounded-full bg-card/80 text-foreground shrink-0">
            <Icon name="Menu" size={22} />
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] bg-card border-border">
            <div className="mt-8 flex flex-col gap-0.5">
              {mobileLinks.map((l) => (
                <SheetClose asChild key={l.href}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-3 rounded-2xl px-4 py-2 text-lg font-display font-medium text-foreground hover:bg-secondary transition-colors"
                  >
                    <Icon name={l.icon} size={18} className="shrink-0 text-primary" />
                    {l.label}
                  </a>
                </SheetClose>
              ))}
              <CallbackDialog
                trigger={
                  <button className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 mt-2 px-5 py-3 text-base font-display font-medium text-primary">
                    <Icon name="PhoneCall" size={18} />
                    Заказать звонок
                  </button>
                }
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;