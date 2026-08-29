import Icon from '@/components/ui/icon';

const DoorSign = () => {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="container max-w-5xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </a>

        <h1 className="mt-6 font-display font-extrabold text-3xl md:text-4xl text-primary">
          Табличка на дверь
        </h1>
        <p className="mt-2 text-muted-foreground">
          Формат 35 × 20 см, готова к печати в 300 dpi
        </p>

        <div className="mt-8 rounded-3xl bg-card p-3 md:p-5 shadow-[0_20px_60px_-30px_rgba(46,65,111,0.55)]">
          <img
            src="/assets/door-sign-427-preview.jpg"
            alt="Табличка на дверь — офис 427"
            className="w-full rounded-2xl"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/assets/door-sign-427-hero-print.png"
            download
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform"
          >
            <Icon name="Download" size={18} />
            Скачать для печати (PNG)
          </a>
          <a
            href="/assets/door-sign-427-hero.svg"
            download
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-6 py-3 font-display font-semibold text-primary hover:bg-secondary transition-colors"
          >
            <Icon name="FileCode" size={18} />
            Скачать вектор (SVG)
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoorSign;
