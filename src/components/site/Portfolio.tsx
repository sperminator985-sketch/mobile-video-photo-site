import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const IMG_1 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/f92c85e9-c4c8-4929-a97f-95d110829ed9.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/9e7ff3d4-3a05-4ca2-9f6d-dc82719c8e12.jpg';
const IMG_3 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/8f49721f-72c1-4f51-93fe-054022fb44b7.jpg';

type Item = {
  id: number;
  type: 'video' | 'photo';
  title: string;
  meta: string;
  img: string;
};

const items: Item[] = [
  { id: 1, type: 'video', title: 'Аня и Кирилл', meta: 'Свадебный фильм · 6 мин', img: IMG_1 },
  { id: 2, type: 'photo', title: 'Марина и Дмитрий', meta: 'Репортаж · 320 кадров', img: IMG_3 },
  { id: 3, type: 'video', title: 'Первый танец', meta: 'Highlights · 3 мин', img: IMG_2 },
  { id: 4, type: 'photo', title: 'Утро невесты', meta: 'Фотосессия · 180 кадров', img: IMG_3 },
  { id: 5, type: 'video', title: 'Лиза и Артём', meta: 'Свадебный фильм · 7 мин', img: IMG_1 },
  { id: 6, type: 'photo', title: 'Церемония у воды', meta: 'Репортаж · 260 кадров', img: IMG_2 },
];

const filters = [
  { key: 'all', label: 'Всё' },
  { key: 'video', label: 'Видео' },
  { key: 'photo', label: 'Фото' },
] as const;

const Portfolio = () => {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [active, setActive] = useState<Item | null>(null);

  const shown = filter === 'all' ? items : items.filter((i) => i.type === filter);

  return (
    <section id="portfolio" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <div className="font-display font-medium text-xs tracking-[0.22em] uppercase text-primary mb-4">
              Портфолио
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em]">
              Видео и фото со свадеб
            </h2>
          </div>

          <div className="inline-flex rounded-full bg-card p-1.5 border border-border self-start">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`rounded-full px-5 py-2 text-sm font-display font-semibold transition-colors ${
                  filter === f.key ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item)}
              className="group relative text-left overflow-hidden rounded-[1.5rem] border border-border bg-card animate-scale-in"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E416F]/85 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-display font-semibold text-foreground">
                <Icon name={item.type === 'video' ? 'Play' : 'Camera'} size={13} />
                {item.type === 'video' ? 'Видео' : 'Фото'}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="font-display font-bold text-lg">{item.title}</div>
                <div className="text-sm text-white/80">{item.meta}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-border">
          {active && (
            <div>
              <img src={active.img} alt={active.title} className="w-full aspect-video object-cover" />
              <div className="p-6">
                <div className="font-display font-bold text-2xl mb-1">{active.title}</div>
                <div className="text-muted-foreground">{active.meta}</div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;
