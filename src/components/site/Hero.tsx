import SmartImage from '@/components/ui/smart-image';

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

const FALLING_PETALS = [
  { x: 55.33, y: 7.71, w: 13.5, dur: 22, delay: 0, sway: 4.5 },
  { x: 46.17, y: 12.42, w: 12.67, dur: 26, delay: -9, sway: 5.2 },
  { x: 65.0, y: 15.71, w: 14.67, dur: 24, delay: -4, sway: 4.8 },
  { x: 51.67, y: 23.24, w: 12.67, dur: 28, delay: -15, sway: 5.6 },
  { x: 62.5, y: 31.51, w: 13.5, dur: 23, delay: -2, sway: 4.2 },
  { x: 41.17, y: 39.51, w: 14.83, dur: 27, delay: -11, sway: 5.0 },
  { x: 60.83, y: 46.28, w: 15.17, dur: 25, delay: -7, sway: 5.4 },
  { x: 51.67, y: 52.68, w: 12.67, dur: 21, delay: -13, sway: 4.6 },
  { x: 60.0, y: 65.38, w: 13.5, dur: 20, delay: -5, sway: 5.8 },
  { x: 60.0, y: 75.73, w: 14.33, dur: 18, delay: -1, sway: 4.4 },
  { x: 51.67, y: 86.55, w: 14.33, dur: 16, delay: -3, sway: 5.1 },
];

const Hero = () => {
  return (
    <section id="top" className="hero-stage relative min-h-screen flex flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="hidden lg:block absolute right-0 top-[84px] h-[calc(100%-84px)] w-[32vw] overflow-hidden mix-blend-multiply pointer-events-none select-none animate-fade-in"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 35%), linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 35%), linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)',
          maskComposite: 'intersect',
          WebkitMaskComposite: 'source-in',
        }}
      >
        <div className="absolute right-0 top-0 h-full aspect-[600/1063]">
          <img src="/assets/hero-roses-v2.webp" alt="" className="absolute inset-0 w-full h-full" />
          {FALLING_PETALS.map((p, i) => (
            <span
              key={i}
              className="hero-drop absolute"
              style={{
                left: `${p.x}%`,
                width: `${p.w}%`,
                ['--start' as string]: `${p.y}%`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            >
              <img
                src={`/assets/fall/f${i}.webp?v=2`}
                alt=""
                className="hero-drop-sway block w-full h-auto"
                style={{ animationDuration: `${p.sway}s` }}
              />
            </span>
          ))}
        </div>
      </div>
      <div className="container relative flex-1 flex flex-col items-center justify-center text-center gap-5 pt-28 pb-16">
        <div className="font-display font-medium text-[0.72rem] md:text-[1.325rem] tracking-[0.26em] uppercase text-primary animate-fade-in">
          Свадебные фото и видеосъёмки
        </div>

        <div
          className="hero-medallion hero-ring-frame relative grid place-items-center rounded-full w-[230px] h-[230px] md:w-[320px] md:h-[320px]"
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

        <h1 className="font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(2.25rem,7vw,4.5rem)] max-w-[15ch] animate-fade-in">
          <span className="text-primary">Ваша свадьба</span>
          <br />
          <span className="text-primary">в главной роли</span>
        </h1>

        <a
          href="#contacts"
          className="mt-2 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_hsl(var(--primary))] transition-all animate-scale-in"
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