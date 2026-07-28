const LOGO = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/111b1db2-169a-41e3-a979-6ad8180e845d.png';

const nav = [
  { href: '#about', label: 'О нас' },
  { href: '#portfolio', label: 'Работы' },
  { href: '#packages', label: 'Пакеты и цены' },
  { href: '#contacts', label: 'Контакты' },
];

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="Айсберг-видео" className="h-10 w-auto" />
            <span className="font-display font-bold text-xl">Айсберг-видео</span>
          </div>

          <nav className="flex flex-wrap gap-6">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-accent-foreground/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-sm text-accent-foreground/70">
          <p>© {new Date().getFullYear()} Айсберг-видео. Свадебная фото- и видеосъёмка.</p>
          <p>Снимаем свадьбы так, чтобы их хотелось пересматривать.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
