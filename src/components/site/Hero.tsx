const Hero = () => {
  return (
    <section id="top" className="hero-stage relative min-h-screen flex flex-col overflow-hidden">
      <div className="container flex-1 flex flex-col items-center justify-center text-center gap-5 pt-28 pb-16">
        <div className="font-display font-medium text-[0.72rem] tracking-[0.26em] uppercase text-primary animate-fade-in">
          Свадебная съёмка · фото и видео
        </div>

        <div
          className="hero-medallion relative grid place-items-center rounded-full"
          style={{
            width: 210,
            height: 210,
            background: 'var(--hero-x-medallion)',
            boxShadow: '0 26px 60px -24px color-mix(in srgb, var(--hero-x-water) 60%, transparent)',
          }}
          role="img"
          aria-label="Знак Айсберг-видео: айсберг-объектив"
        >
          <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width={210} height={210}>
            <defs>
              <clipPath id="disc">
                <circle cx="100" cy="100" r="88" />
              </clipPath>
              <linearGradient id="sky" x1="0" y1="20" x2="0" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--hero-x-sky-top)" />
                <stop offset="1" stopColor="var(--hero-x-sky-bot)" />
              </linearGradient>
            </defs>
            <g clipPath="url(#disc)">
              <rect x="0" y="0" width="200" height="118" fill="url(#sky)" />
              <circle cx="132" cy="58" r="20" fill="var(--hero-x-sun)" />
              <rect x="0" y="118" width="200" height="82" fill="var(--hero-x-water)" />
              <path d="M100 34 L138 118 H62 Z" fill="var(--hero-x-berg)" />
              <path d="M100 34 L100 118 H62 Z" fill="var(--hero-x-berg-dark)" />
              <path d="M100 118 L134 176 H66 Z" fill="var(--hero-x-berg)" opacity=".38" />
              <rect x="0" y="115" width="200" height="4" fill="var(--hero-x-water-line)" opacity=".6" />
            </g>
            <g className="hero-aperture">
              <circle cx="100" cy="100" r="88" stroke="var(--hero-x-ring)" strokeWidth="6" fill="none" />
              <circle
                cx="100"
                cy="100"
                r="88"
                stroke="var(--hero-x-ring)"
                strokeWidth="6"
                fill="none"
                strokeDasharray="2 22"
                opacity=".55"
              />
            </g>
          </svg>
        </div>

        <h1 className="font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(2.75rem,9vw,5.875rem)] max-w-[15ch] animate-fade-in">
          Ваша свадьба
          <br />
          <span className="text-primary">в главной роли</span>
        </h1>

        <p className="text-muted-foreground text-[1.05rem] md:text-[1.15rem] leading-relaxed max-w-[46ch] animate-fade-in">
          Снимаем один день так, чтобы пересматривать его годами: тёплое кино на 5–7&nbsp;минут и 300&nbsp;живых
          кадров&nbsp;— готово за две&nbsp;недели.
        </p>

        <a
          href="#contacts"
          className="mt-2 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_hsl(var(--primary))] transition-all animate-scale-in"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
          Оставить заявку на дату
        </a>
      </div>

      <div className="container pb-8 flex justify-center gap-2 text-center text-sm text-muted-foreground">
        <b className="font-semibold text-foreground">Свободные даты сезона 2026</b>
        <span>— пишите, забронируем ваш&nbsp;день</span>
      </div>
    </section>
  );
};

export default Hero;
