import Icon from '@/components/ui/icon';

const variants = [
  {
    title: 'Офисная — Siberia Art Ltd.',
    size: '35 × 20 см',
    preview: '/assets/office-sign-siberia-preview.jpg',
    png: '/assets/office-sign-siberia-print.png',
    svg: '/assets/office-sign-siberia.svg',
  },
  {
    title: 'Горизонтальная',
    size: '35 × 20 см',
    preview: '/assets/door-sign-427-preview.jpg',
    png: '/assets/door-sign-427-hero-print.png',
    svg: '/assets/door-sign-427-hero.svg',
  },
  {
    title: 'Вертикальная',
    size: '20 × 35 см',
    preview: '/assets/door-sign-427-vertical-preview.jpg',
    png: '/assets/door-sign-427-vertical-print.png',
    svg: '/assets/door-sign-427-vertical.svg',
  },
  {
    title: 'Визитка — лицевая',
    size: '9 × 5 см',
    preview: '/assets/business-card-preview.jpg',
    png: '/assets/business-card-print.png',
    svg: '/assets/business-card.svg',
  },
  {
    title: 'Визитка — оборот',
    size: '9 × 5 см',
    preview: '/assets/business-card-back-preview.jpg',
    png: '/assets/business-card-back-print.png',
    svg: '/assets/business-card-back.svg',
  },
];

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
          Печатные материалы
        </h1>
        <p className="mt-2 text-muted-foreground">
          Таблички на дверь и визитка — всё готово к печати в 300 dpi
        </p>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:items-start">
          {variants.map((v) => (
            <div key={v.title}>
              <div className="flex items-baseline gap-3">
                <h2 className="font-display font-bold text-xl text-foreground">{v.title}</h2>
                <span className="text-sm text-muted-foreground">{v.size}</span>
              </div>

              <div className="mt-4 rounded-3xl bg-card p-3 shadow-[0_20px_60px_-30px_rgba(46,65,111,0.55)]">
                <img
                  src={v.preview}
                  alt={`Табличка на дверь — офис 427, ${v.title.toLowerCase()}`}
                  className="w-full rounded-2xl"
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={v.png}
                  download
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-display font-semibold text-primary-foreground hover:-translate-y-0.5 transition-transform"
                >
                  <Icon name="Download" size={16} />
                  Для печати (PNG)
                </a>
                <a
                  href={v.svg}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-3 text-sm font-display font-semibold text-primary hover:bg-secondary transition-colors"
                >
                  <Icon name="FileCode" size={16} />
                  Вектор (SVG)
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoorSign;