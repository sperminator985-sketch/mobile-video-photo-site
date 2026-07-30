import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const IMG_1 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/707bc044-9c0e-4739-874b-88874a517938.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/1633b2c5-1326-4c71-b4a9-18dff460fd1d.jpg';
const IMG_3 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/4a3a8a68-a69a-4ba9-8007-1132b07be304.jpg';

const MORNING_PHOTOS = [
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/f0d0034a-caaf-4373-a2a7-67480f5d113b.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/57149828-9037-474c-9006-015e3c9bbe94.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/783cb811-6ca8-49af-9199-309c8b819d19.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/5fe0ffc4-0fb7-4a24-81ab-8d9b270ad22b.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/2f7675e4-a636-41b1-832a-7b057084b52c.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/b32878cc-4ffc-4ac6-a89a-f2729b6a13cb.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/eaa2fd64-06b8-4a5a-9063-63b971b4bd90.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/a2702d11-376f-49d1-8415-a4a04c1ef721.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/d0a06bbe-480e-45b0-8ac4-323cfc5f20a0.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/41d2b6dd-cc46-46ec-8d83-d14be05dd8e8.jpg',
];

const CEREMONY_PHOTOS = [
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/03f75063-60d5-41f5-962f-fc33ac00474c.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/9884e07a-6209-4cf3-9f6c-23c65b14c1b1.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/890ca427-c024-4601-89e5-ac12fdab8d44.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/1dab03cd-63df-4458-b889-1f420cd93b06.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/146a4e88-4d08-4881-98e1-cfe58e4a0cad.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/396ad2ba-aa54-4c8f-9ac1-3e3d503b321f.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/c43e81b2-43c6-488a-b242-ae82ef1f7293.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/35945ad1-a763-4057-83c8-e85508384484.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/84adfcf0-b6f4-409f-874f-3208741cac1f.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/24a39201-ec09-4f0c-8b94-1b0ec527b1b3.jpg',
];

const REPORTAGE_PHOTOS = [
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/d31e63bd-6ca4-4428-ae39-7331d9c2f270.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/b958a2cd-fd97-4cb6-a184-cb815bd5e528.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/9fa695cb-8860-42a7-8a7e-dc0bede10bfc.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/e80d2e6c-9c48-429d-ab34-2682510dcff0.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/5a33b94b-ab10-42e9-9039-e6ae76cd89ae.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/ff5a01d7-b0d8-4587-9338-013694593bd7.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/81c50227-7d9e-4980-9a03-59c6ceb890e3.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/2e6cd7dc-bf92-41db-8c57-33b3bb5ca031.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/b9aa4109-b109-42ab-843e-9e6bad281639.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/8813e902-1c91-47e5-a38d-c21f29770583.jpg',
];

type Item = {
  id: number;
  type: 'video' | 'photo';
  title: string;
  meta: string;
  img: string;
  gallery?: string[];
  video?: string;
};

const items: Item[] = [
  { id: 1, type: 'video', title: 'Аня и Кирилл', meta: 'Свадебный фильм · 6 мин', img: IMG_1 },
  {
    id: 2,
    type: 'photo',
    title: 'Марина и Дмитрий',
    meta: 'Репортаж · 10 кадров',
    img: REPORTAGE_PHOTOS[0],
    gallery: REPORTAGE_PHOTOS,
  },
  {
    id: 3,
    type: 'video',
    title: 'Свадебный клип-2',
    meta: '',
    img: IMG_2,
    video: 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/bucket/d48c33a7-4d06-48de-b5f9-8497442820de.mp4',
  },
  {
    id: 4,
    type: 'photo',
    title: 'Утро невесты',
    meta: 'Фотосессия · 10 кадров',
    img: MORNING_PHOTOS[0],
    gallery: MORNING_PHOTOS,
  },
  { id: 5, type: 'video', title: 'Лиза и Артём', meta: 'Свадебный фильм · 7 мин', img: IMG_1 },
  {
    id: 6,
    type: 'photo',
    title: 'Церемония у воды',
    meta: 'Репортаж · 10 кадров',
    img: CEREMONY_PHOTOS[0],
    gallery: CEREMONY_PHOTOS,
  },
];

const filters = [
  { key: 'all', label: 'Всё' },
  { key: 'video', label: 'Видео' },
  { key: 'photo', label: 'Фото' },
] as const;

const Portfolio = () => {
  const [filter, setFilter] = useState<'all' | 'video' | 'photo'>('all');
  const [active, setActive] = useState<Item | null>(null);
  const [slide, setSlide] = useState(0);

  const shown = filter === 'all' ? items : items.filter((i) => i.type === filter);

  const openItem = (item: Item) => {
    setActive(item);
    setSlide(0);
  };

  const nextSlide = () => {
    if (!active?.gallery) return;
    setSlide((s) => (s + 1) % active.gallery!.length);
  };

  const prevSlide = () => {
    if (!active?.gallery) return;
    setSlide((s) => (s - 1 + active.gallery!.length) % active.gallery!.length);
  };

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
              onClick={() => openItem(item)}
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
              <div className="relative bg-black">
                {active.video ? (
                  <video
                    src={active.video}
                    controls
                    autoPlay
                    className="w-full aspect-video bg-black"
                  />
                ) : (
                  <img
                    src={active.gallery ? active.gallery[slide] : active.img}
                    alt={active.title}
                    className="w-full aspect-video object-contain bg-black"
                  />
                )}
                {active.gallery && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
                      aria-label="Предыдущее фото"
                    >
                      <Icon name="ChevronLeft" size={20} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
                      aria-label="Следующее фото"
                    >
                      <Icon name="ChevronRight" size={20} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-card/85 px-3 py-1 text-xs font-display font-semibold text-foreground">
                      {slide + 1} / {active.gallery.length}
                    </div>
                  </>
                )}
              </div>
              <div className="p-6">
                <div className="font-display font-bold text-2xl mb-1">{active.title}</div>
                <div className="text-muted-foreground">{active.meta}</div>
                {active.gallery && (
                  <div className="mt-4 grid grid-cols-5 gap-2">
                    {active.gallery.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setSlide(i)}
                        className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
                          i === slide ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img src={src} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Portfolio;