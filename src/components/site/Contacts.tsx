import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const contacts = [
  { icon: 'Phone', label: 'Телефон', value: '+7 (909) 547-23-25', href: 'tel:+79095472325' },
  { icon: 'Mail', label: 'Почта', value: 'daumsam@mail.ru', href: 'mailto:daumsam@mail.ru' },
];

const SEND_LEAD_URL = 'https://functions.poehali.dev/2c609e31-a278-4787-9035-9753fda9bb86';

const formatPhone = (raw: string) => {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  if (!digits.startsWith('7')) digits = '7' + digits;
  digits = digits.slice(0, 11);

  const rest = digits.slice(1);
  let result = '+7';
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) result += ')';
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`;
  return result;
};

const Contacts = () => {
  const [form, setForm] = useState({ name: '', phone: '', date: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const set = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: '' }));
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Как вас зовут?';
    const digits = form.phone.replace(/\D/g, '');
    if (digits.length < 10) next.phone = 'Укажите корректный телефон';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || sending) return;
    setSending(true);
    try {
      const res = await fetch(SEND_LEAD_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('send failed');
      toast.success('Заявка отправлена!', {
        description: 'Мы свяжемся с вами в течение дня и обсудим детали.',
      });
      setForm({ name: '', phone: '', date: '', message: '' });
    } catch {
      toast.error('Не удалось отправить заявку', {
        description: 'Попробуйте ещё раз или позвоните нам по телефону.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contacts" className="py-24 bg-secondary/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="font-display font-medium text-xs tracking-[0.22em] uppercase text-primary mb-4">
              Контакты и заявка
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-5">
              Забронируем ваш день
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-md">
              Оставьте заявку — расскажем о свободных датах сезона 2026, покажем полные работы и поможем выбрать пакет.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="flex items-center gap-4 rounded-2xl bg-card p-4 border border-border hover:-translate-y-0.5 transition-transform"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-accent shrink-0">
                    <Icon name={c.icon} size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{c.label}</span>
                    <span className="block font-display font-semibold text-foreground truncate">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-[1.75rem] bg-card p-8 border border-border shadow-[0_30px_70px_-40px_rgba(46,65,111,0.6)]"
          >
            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="mb-2 block font-display">Ваше имя</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Как к вам обращаться"
                  className="h-12 rounded-xl bg-background"
                />
                {errors.name && <p className="mt-1.5 text-sm text-destructive">{errors.name}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2 block font-display">Телефон</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, '');
                    if (!digitsOnly) {
                      set('phone', '');
                      return;
                    }
                    set('phone', formatPhone(e.target.value));
                  }}
                  placeholder="+7 (___) ___-__-__"
                  inputMode="tel"
                  className="h-12 rounded-xl bg-background"
                />
                {errors.phone && <p className="mt-1.5 text-sm text-destructive">{errors.phone}</p>}
              </div>

              <div>
                <Label htmlFor="date" className="mb-2 block font-display">Дата свадьбы</Label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => set('date', e.target.value)}
                  className="h-12 rounded-xl bg-background"
                />
              </div>

              <div>
                <Label htmlFor="message" className="mb-2 block font-display">Комментарий</Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  placeholder="Расскажите о вашей свадьбе: формат, локация, пожелания"
                  rows={4}
                  className="rounded-xl bg-background resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <Icon name={sending ? 'Loader2' : 'Send'} size={18} className={sending ? 'animate-spin' : ''} />
                {sending ? 'Отправляем…' : 'Оставить заявку'}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;