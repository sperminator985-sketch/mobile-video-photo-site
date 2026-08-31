import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const SEND_LEAD_URL = 'https://functions.poehali.dev/2c609e31-a278-4787-9035-9753fda9bb86';

export const formatPhone = (raw: string) => {
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

interface CallbackFormProps {
  idPrefix?: string;
  onSuccess?: () => void;
  className?: string;
}

const CallbackForm = ({ idPrefix = 'callback', onSuccess, className = '' }: CallbackFormProps) => {
  const [form, setForm] = useState({ name: '', phone: '' });
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
        body: JSON.stringify({ ...form, date: '', message: 'Заказ обратного звонка' }),
      });
      if (!res.ok) throw new Error('send failed');
      toast.success('Заявка принята!', {
        description: 'Мы перезвоним вам в ближайшее время.',
      });
      setForm({ name: '', phone: '' });
      onSuccess?.();
    } catch {
      toast.error('Не удалось отправить заявку', {
        description: 'Попробуйте ещё раз или позвоните нам по телефону.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      <div className="space-y-3">
        <div>
          <Label htmlFor={`${idPrefix}-name`} className="mb-1.5 block font-display text-sm">Ваше имя</Label>
          <Input
            id={`${idPrefix}-name`}
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Как к вам обращаться"
            className="h-10 rounded-xl bg-background"
          />
          {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
        </div>

        <div>
          <Label htmlFor={`${idPrefix}-phone`} className="mb-1.5 block font-display text-sm">Телефон</Label>
          <Input
            id={`${idPrefix}-phone`}
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
            className="h-10 rounded-xl bg-background"
          />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          disabled={sending}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-display font-semibold text-primary-foreground shadow-[0_16px_34px_-14px_hsl(var(--primary))] hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:hover:translate-y-0"
        >
          <Icon name={sending ? 'Loader2' : 'PhoneCall'} size={18} className={sending ? 'animate-spin' : ''} />
          {sending ? 'Отправляем…' : 'Заказать звонок'}
        </button>
        <p className="mt-2 text-center text-[11px] leading-snug text-muted-foreground">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
            политикой конфиденциальности
          </Link>
        </p>
      </div>
    </form>
  );
};

export default CallbackForm;