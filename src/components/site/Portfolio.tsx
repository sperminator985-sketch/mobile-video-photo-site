import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const IMG_1 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/f92c85e9-c4c8-4929-a97f-95d110829ed9.jpg';
const IMG_2 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/9e7ff3d4-3a05-4ca2-9f6d-dc82719c8e12.jpg';
const IMG_3 = 'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/8f49721f-72c1-4f51-93fe-054022fb44b7.jpg';

const MORNING_PHOTOS = [
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/e49f0aeb-b88c-44a4-b238-4eea0be4eaaa.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/2484ac00-045a-48b9-b62a-51a0039a5fe0.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/d892b2c8-2032-4164-bbc6-4863ccf13436.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/ee41f31c-063c-4558-9bf9-56c01ca49f38.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/9d8ce887-c5e1-487a-95d2-29027bc04a22.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/7c1e8806-325b-4bdd-b8b8-9a3ab26f5fb6.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/f5b5e46a-63fb-4343-bd60-4822f2d8c417.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/e1b678b7-8b9d-454d-ad28-2e161881edec.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/6faaaabe-fa08-4697-adb9-cc160832bfea.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/bcb6b76c-5e51-4ad6-92f1-d0c96bde14ee.jpg',
];

const CEREMONY_PHOTOS = [
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/447ea2a9-35f3-41c2-aaa6-d429a155d906.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/2b5ee1ea-3ded-4411-baa0-b97fca51b668.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/49f6e032-4781-4acd-a0b5-c44fa01355cf.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/0c200d40-02a4-44c0-843b-356e5832e148.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/1391dd57-9f47-47f1-a2dc-7f0116acebef.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/f95b4109-a5e5-43bd-93c5-b5113340edc4.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/1e7ebdf3-3293-4a6d-9c04-3159aac4760c.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/f3690e78-f9d3-4594-a3d2-72bbaca877a9.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/43fccb93-15a9-4ff1-a96e-1b6bc9860ecb.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/0107d666-4c87-4eb2-8d60-1940cba2aa52.jpg',
];

const REPORTAGE_PHOTOS = [
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/5648874d-b8d2-43fe-b885-b466650cd058.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/24d2c7fa-b996-4feb-ade0-9b54e3c54fd5.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/4b50307c-47a5-45e4-9147-95ba7c0ab0ac.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/85876aaa-c869-40f6-b0e2-8f2e9c11242e.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/650ca00b-4017-4912-9ba7-46aa0ca3b9ba.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/fbb99fc5-1ff5-48df-837c-203bb45424c2.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/0799e8ac-27f9-447d-87f4-9222041494dc.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/1915589e-aff8-4808-b87b-4a90ceb9850a.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/42910d51-5626-44a7-bb22-79347eb53b91.jpg',
  'https://cdn.poehali.dev/projects/c8c6bf73-a08e-42bc-96f2-0959e7bb7640/files/185fbb20-3932-4582-9007-1e92e3bb575e.jpg',
];

type Item = {
  id: number;
  type: 'video' | 'photo';
  title: string;
  meta: string;
  img: string;
  gallery?: string[];
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
  { id: 3, type: 'video', title: 'Первый танец', meta: 'Highlights · 3 мин', img: IMG_2 },
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
                <img
                  src={active.gallery ? active.gallery[slide] : active.img}
                  alt={active.title}
                  className="w-full aspect-video object-contain bg-black"
                />
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