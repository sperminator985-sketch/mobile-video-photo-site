const LOGO = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/14346e37-5113-4231-af71-69c04fab1812.png';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-14 flex flex-wrap items-center justify-between gap-4">
        <div className="text-sm text-accent-foreground/70">
          <p>© {new Date().getFullYear()} Айсберг-видео.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={LOGO} alt="Айсберг-видео" className="h-8 sm:h-9 w-auto" />
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white">Айсберг-видео</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;