const Hero = () => {
  return (
    <section id="top" className="hero-stage relative min-h-screen flex flex-col overflow-hidden">
      <div className="container flex-1 flex flex-col items-center justify-center text-center gap-5 pt-28 pb-16">
        <div className="font-display font-medium text-[0.72rem] md:text-base tracking-[0.26em] uppercase text-primary animate-fade-in">
          Свадебные фото и видеосъёмки
        </div>

        <div
          className="hero-medallion hero-ring-frame relative grid place-items-center rounded-full w-[230px] h-[230px] md:w-[300px] md:h-[300px]"
          style={{
            boxShadow: '0 26px 60px -24px color-mix(in srgb, var(--hero-x-water) 60%, transparent)',
          }}
        >
          <div className="relative rounded-full overflow-hidden w-[198px] h-[198px] md:w-[258px] md:h-[258px]">
            <img
              src="https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/0ace0339-8601-429c-a627-5fae0c83b4c4.png"
              alt="Молодожёны в день свадьбы"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="hero-aperture absolute inset-0 pointer-events-none rounded-full" />
        </div>

        <h1 className="font-display font-extrabold leading-[0.98] tracking-[-0.035em] text-[clamp(2.25rem,7vw,4.5rem)] max-w-[15ch] animate-fade-in">
          Ваша свадьба
          <br />
          <span className="text-primary">в главной роли</span>
        </h1>

        <a
          href="#contacts"
          className="mt-2 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 hover:shadow-[0_22px_40px_-14px_hsl(var(--primary))] transition-all animate-scale-in"
        >
          Оставить заявку
        </a>

        <p className="mt-8 font-display font-medium text-lg text-muted-foreground animate-fade-in">
          Максимальное качество в минимальные сроки
        </p>
      </div>
    </section>
  );
};

export default Hero;