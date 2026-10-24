import SmartImage from '@/components/ui/smart-image';

const LOGO = 'https://icebergvideo.ru/photos/14346e37-5113-4231-af71-69c04fab1812.png';

const SPARKLE_COUNT = 20;

const SPARKLES = Array.from({ length: SPARKLE_COUNT }, (_, i) => {
  const angle = (i / SPARKLE_COUNT) * Math.PI * 2 + 0.3;
  const radius = 48.2;
  return {
    left: 50 + radius * Math.cos(angle),
    top: 50 + radius * Math.sin(angle),
    delay: ((i * 7) % SPARKLE_COUNT) * 0.07,
  };
});

const Hero = () => {
  return (
    <section id="top" className="hero-stage relative min-h-screen flex flex-col overflow-hidden">
      <img
        src="/assets/hero-roses.webp?v=1"
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute right-0 top-[84px] h-[calc(100%-84px)] w-auto max-w-[32vw] object-cover object-right mix-blend-multiply pointer-events-none select-none animate-fade-in"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 35%), linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%), linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      />
      <div className="container relative flex-1 flex flex-col items-center justify-center md:justify-start xl:justify-center text-center gap-5 pt-[72px] md:pt-[80px] xl:pt-24 pb-16">
        <a href="#top" className="relative flex items-center animate-fade-in">
          <SmartImage
            src={LOGO}
            alt=""
            priority
            className="absolute right-full mr-3 md:mr-4 h-14 md:h-24 xl:h-20 w-auto"
          />
          <SmartImage
            src="/assets/iceberg-video-logo-text.png"
            alt="Айсберг-видео"
            priority
            className="h-12 md:h-20 xl:h-16 w-auto max-w-[62vw]"
          />
        </a>

        <img
          src="/assets/rings-roses.webp?v=8"
          alt=""
          aria-hidden="true"
          className="block xl:hidden w-full max-w-[360px] md:w-[560px] md:max-w-none h-auto mix-blend-multiply pointer-events-none select-none animate-fade-in"
        />

        <div className="font-display font-medium text-[0.72rem] md:text-[1.325rem] tracking-[0.26em] uppercase text-primary animate-fade-in">
          Свадебные фото и видеосъёмки
        </div>

        <div
          className="hero-medallion hero-ring-frame relative grid place-items-center rounded-full md:mt-10 xl:mt-0 w-[230px] h-[230px] md:w-[320px] md:h-[320px]"
          style={{
            boxShadow: '0 26px 60px -24px color-mix(in srgb, var(--hero-x-water) 60%, transparent)',
          }}
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden w-[214px] h-[214px] md:w-[296px] md:h-[296px]">
            <SmartImage
              src="https://icebergvideo.ru/photos/0ace0339-8601-429c-a627-5fae0c83b4c4.png"
              alt="Молодожёны в день свадьбы"
              priority
              className="h-full w-full object-cover brightness-125 contrast-[1.08]"
            />
          </div>
          <div className="hero-aperture absolute inset-0 pointer-events-none rounded-full" />
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="hero-sparkle"
              style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s` }}
            />
          ))}
        </div>

        <h1 className="font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-[6.4vw] md:text-[clamp(2.25rem,7vw,4.5rem)] whitespace-nowrap md:whitespace-normal md:max-w-[15ch] animate-fade-in">
          <span className="text-primary">Ваша свадьба</span>
          <br />
          <span className="text-primary">в главной роли</span>
        </h1>

        <a
          href="#contacts"
          className="mt-2 md:mt-14 xl:mt-2 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_hsl(var(--primary))] transition-all animate-scale-in"
        >
          Оставить заявку
        </a>

        <p className="mt-8 font-display font-medium text-[0.72rem] md:text-[0.93rem] tracking-[0.26em] uppercase text-muted-foreground animate-fade-in">
          Максимальное качество в минимальные сроки
        </p>
      </div>
    </section>
  );
};

export default Hero;