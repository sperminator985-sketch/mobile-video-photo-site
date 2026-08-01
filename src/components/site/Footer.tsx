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
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-8">
          <nav className="flex flex-wrap gap-6">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-accent-foreground/15 text-sm text-accent-foreground/70">
          <p>© {new Date().getFullYear()} Айсберг-видео.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;