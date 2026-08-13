import { useState } from 'react';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatPhone } from './CallbackForm';

const SEND_LEAD_URL = 'https://functions.poehali.dev/2c609e31-a278-4787-9035-9753fda9bb86';

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
    <section id="contacts" className="pt-6 pb-20 bg-background">
      <div className="container">
        <div className="font-display font-medium text-base tracking-[0.22em] uppercase text-primary mb-4 text-center">
          Контакты
        </div>
        <div className="max-w-xl mx-auto">
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
                {sending ? 'Отправляем…' : 'Отправить заявку'}
              </button>
            </div>
          </form>
        </div>

        <div className="max-w-[calc(56rem+6cm)] mx-auto mt-10">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <Icon name="MapPin" size={18} className="text-primary" />
            <p className="text-sm font-medium text-foreground">г. Томск, пр. Фрунзе, 20, офис-427</p>
          </div>
          <div className="rounded-[1.75rem] overflow-hidden border border-border shadow-[0_30px_70px_-40px_rgba(46,65,111,0.6)]">
            <iframe
              title="Карта — г. Томск, пр. Фрунзе, 20"
              src="https://yandex.ru/map-widget/v1/?ll=84.957953%2C56.476609&z=17&pt=84.957953%2C56.476609%2Cpm2rdm"
              width="100%"
              height="360"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;