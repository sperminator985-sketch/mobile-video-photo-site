const LOGO = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/14346e37-5113-4231-af71-69c04fab1812.png';

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container pt-2 pb-6 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <img src={LOGO} alt="" className="h-8 sm:h-9 w-auto" />
          <img
            src="/assets/iceberg-video-logo-text.png"
            alt="Айсберг-видео"
            className="h-7 sm:h-8 w-auto"
          />
        </div>
        <p className="text-sm text-white">Тел: +7 (909) 547-23-25</p>
        <p className="text-sm text-white">E-mail: daumsam@mail.ru</p>
        <p className="text-sm text-white">Адрес: пр.Фрунзе-20, офис-427</p>
      </div>
    </footer>
  );
};

export default Footer;