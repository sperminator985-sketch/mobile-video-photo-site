import Icon from '@/components/ui/icon';

const packages = [
  {
    name: 'Загс',
    price: '5 000 ₽/час',
    tagline: 'Регистрация в загсе',
    featured: false,
    features: ['Съёмка до 3 часов (фото или видео)', '120 обработанных фото', 'Готовность 10 дней'],
  },
  {
    name: 'Свадьба',
    price: '55 000 ₽',
    tagline: 'Полный день от сборов до вечера',
    featured: true,
    features: [
      'Съёмка до 10 часов (фото или видео)',
      '300 обработанных фото',
      'Готовность 14 дней',
    ],
  },
  {
    name: 'Премьера',
    price: '90 000 ₽',
    tagline: 'Кино + фото без компромиссов',
    featured: false,
    features: [
      'Съёмка весь день',
      '500 обработанных фото',
      'Love-story в подарок',
    ],
  },
];

const Packages = () => {
  return (
    <section id="packages" className="py-8 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="font-display font-medium text-base tracking-[0.22em] uppercase text-primary mb-4">
            Цены
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col rounded-[1.75rem] p-8 border transition-transform hover:-translate-y-1 ${
                p.featured
                  ? 'bg-accent text-accent-foreground border-accent shadow-[0_30px_70px_-30px_rgba(46,65,111,0.7)]'
                  : 'bg-card border-border'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-display font-semibold text-primary-foreground">
                  Выбирают чаще всего
                </div>
              )}
              <div className="font-display font-bold text-2xl mb-1 text-center">{p.name}</div>
              <div className={`text-sm mb-6 text-center ${p.featured ? 'text-accent-foreground/80' : 'text-muted-foreground'}`}>
                {p.tagline}
              </div>
              <div className="font-display font-extrabold text-4xl mb-6 text-center">
                {p.price}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Icon
                      name="Check"
                      size={18}
                      className={p.featured ? 'text-primary-foreground mt-0.5 shrink-0' : 'text-primary mt-0.5 shrink-0'}
                    />
                    <span className={`text-sm ${p.featured ? 'text-accent-foreground/90' : 'text-foreground/80'}`}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacts"
                className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-display font-semibold text-lg transition-transform hover:-translate-y-0.5 ${
                  p.featured
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground'
                }`}
              >
                Сделать заказ
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Нужен индивидуальный формат? Соберём пакет под вашу свадьбу — просто напишите нам.
        </p>
      </div>
    </section>
  );
};

export default Packages;