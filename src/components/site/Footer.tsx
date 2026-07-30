const LOGO = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/14346e37-5113-4231-af71-69c04fab1812.png';

const nav = [
  { href: '#about', label: 'О нас' },
  { href: '#portfolio', label: 'Работы' },
  { href: '#packages', label: 'Цены' },
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

        <div className="mt-10 pt-8 border-t border-accent-foreground/15 text-sm text-accent-foreground/70">
          <p>© {new Date().getFullYear()} Айсберг-видео. Свадебная фото- и видеосъёмка.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;