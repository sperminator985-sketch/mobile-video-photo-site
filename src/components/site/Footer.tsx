const LOGO = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/14346e37-5113-4231-af71-69c04fab1812.png';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container relative py-6 flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-white">Тел: +7 (909) 547-23-25</p>
        <p className="text-sm text-white">E-mail: daumsam@mail.ru</p>
        <p className="text-sm text-white">Адрес: пр.Фрунзе-20, офис-427</p>

        <div className="absolute left-4 sm:left-6 top-0 bottom-0 flex items-center">
          <p className="text-xs text-white/70">© {new Date().getFullYear()} Siberia Art Ltd.</p>
        </div>

        <div className="absolute right-4 sm:right-6 top-0 bottom-0 flex items-center gap-2 sm:gap-3">
          <img src={LOGO} alt="" className="h-8 sm:h-9 w-auto" />
          <img
            src="/assets/iceberg-video-logo-text.png"
            alt="Айсберг-видео"
            className="h-7 sm:h-8 w-auto brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;