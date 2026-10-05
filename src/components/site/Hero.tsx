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

const PETALS = [
  { img: 1, right: 8, top: 2, size: 58, rot: -20 },
  { img: 2, right: 46, top: 8, size: 40, rot: 35 },
  { img: 3, right: 22, top: 17, size: 50, rot: 110 },
  { img: 4, right: 62, top: 26, size: 32, rot: -60 },
  { img: 5, right: 4, top: 31, size: 64, rot: 15 },
  { img: 6, right: 36, top: 40, size: 44, rot: 160 },
  { img: 7, right: 14, top: 52, size: 54, rot: -95 },
  { img: 8, right: 52, top: 58, size: 36, rot: 70 },
  { img: 9, right: 28, top: 69, size: 48, rot: -140 },
  { img: 10, right: 6, top: 78, size: 60, rot: 40 },
  { img: 2, right: 44, top: 84, size: 34, rot: -30 },
  { img: 4, right: 70, top: 47, size: 28, rot: 120 },
];

const Hero = () => {
  return (
    <section id="top" className="hero-stage relative min-h-screen flex flex-col overflow-hidden">
      <div aria-hidden="true" className="hidden lg:block absolute right-0 top-[96px] bottom-0 w-[30vw] pointer-events-none select-none">
        {PETALS.map((p, i) => (
          <img
            key={i}
            src={`/assets/petals/p${p.img}.webp`}
            alt=""
            className="absolute animate-fade-in drop-shadow-[0_6px_8px_rgba(120,20,30,0.25)]"
            style={{ right: `${p.right}%`, top: `${p.top}%`, width: p.size, transform: `rotate(${p.rot}deg)` }}
          />
        ))}
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