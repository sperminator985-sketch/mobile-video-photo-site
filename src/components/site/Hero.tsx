const Hero = () => {
  return (
    <section id="top" className="hero-stage relative min-h-screen flex flex-col overflow-hidden">
      <div className="container flex-1 flex flex-col items-center justify-center text-center gap-5 pt-28 pb-16">
        <div className="font-display font-medium text-[0.72rem] tracking-[0.26em] uppercase text-primary animate-fade-in">
          Свадебные фото и видеосъёмки
        </div>

        <div
          className="hero-medallion relative grid place-items-center rounded-full overflow-hidden"
          style={{
            width: 210,
            height: 210,
            boxShadow: '0 26px 60px -24px color-mix(in srgb, var(--hero-x-water) 60%, transparent)',
          }}
        >
          <img
            src="https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/0ace0339-8601-429c-a627-5fae0c83b4c4.png"
            alt="Молодожёны в день свадьбы"
            className="h-full w-full object-cover"
          />
          <div className="hero-aperture absolute inset-0 pointer-events-none rounded-full border-2" style={{ borderColor: 'var(--hero-x-ring)' }} />
        </div>

        <h1 className="font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(2.75rem,9vw,5.875rem)] max-w-[15ch] animate-fade-in">
          Ваша свадьба
          <br />
          <span className="text-primary">в главной роли</span>
        </h1>

        <a
          href="#contacts"
          className="mt-2 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_hsl(var(--primary))] transition-all animate-scale-in"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-primary-foreground" />
          Оставить заявку
        </a>
      </div>

      <div className="container pb-8 flex justify-center text-center text-primary">
        <span
          className="text-[clamp(1.5rem,4vw,2.25rem)] leading-tight"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          Снимаем свадьбы так, чтобы их хотелось пересматривать.
        </span>
      </div>
    </section>
  );
};

export default Hero;