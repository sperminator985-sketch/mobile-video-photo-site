import Icon from '@/components/ui/icon';

const stats = [
  { value: '120+', label: 'свадеб отсняли' },
  { value: '8 лет', label: 'в свадебном кино' },
  { value: '2 недели', label: 'до готового фильма' },
  { value: '4.9', label: 'средняя оценка пар' },
];

const values = [
  {
    icon: 'Heart',
    title: 'Снимаем по-настоящему',
    text: 'Не постановка на камеру, а живые эмоции: взгляды, слёзы, смех и первый танец такими, какими они были на самом деле.',
  },
  {
    icon: 'Film',
    title: 'Кино, а не нарезка',
    text: 'Каждый фильм — с драматургией, музыкой и цветокоррекцией. Его хочется пересматривать и показывать детям.',
  },
  {
    icon: 'Clock',
    title: 'Бережём ваше время',
    text: 'Заранее обсуждаем тайминг, работаем незаметно и не тянем одеяло на себя — праздник остаётся вашим.',
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="font-display font-medium text-base tracking-[0.22em] uppercase text-primary mb-4 text-center">
          О нас
        </div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-6">
              Мы влюблены в чужие свадьбы
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Мы начали с одной камеры и большой любви к настоящим историям. С тех пор через наш объектив прошли
                десятки пар — от камерных росписей на двоих до больших торжеств на сотни гостей.
              </p>
              <p>
                Как айсберг, свадебный день — это то, что видно, и огромная работа под водой: подготовка, тайминг,
                монтаж и цвет. Мы берём её на себя, чтобы вы просто прожили свой день.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[1.5rem] bg-card p-4 sm:p-6 border border-border shadow-[0_20px_50px_-30px_rgba(46,65,111,0.5)]"
              >
                <div className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-primary mb-1 whitespace-nowrap">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-[1.5rem] bg-card p-8 border border-border hover:-translate-y-1 transition-transform"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-accent mb-5">
                <Icon name={v.icon} size={26} />
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl mb-3">{v.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;