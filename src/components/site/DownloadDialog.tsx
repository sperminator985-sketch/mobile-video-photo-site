import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { downloadBuild, checkPassword } from '@/lib/downloadBuild';

interface DownloadDialogProps {
  trigger: React.ReactNode;
}

const DownloadDialog = ({ trigger }: DownloadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOpenChange = (value: boolean) => {
    if (loading) return;
    setOpen(value);
    if (!value) {
      setPassword('');
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    if (!(await checkPassword(password))) {
      setError('Неверный пароль');
      return;
    }
    setLoading(true);
    try {
      await downloadBuild();
      toast.success('Архив сайта скачан');
      setOpen(false);
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось скачать архив');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="rounded-[1.75rem] bg-card p-6 border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-center">Введите пароль</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            type="password"
            autoFocus
            autoComplete="off"
            placeholder="Пароль"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            className="h-12 rounded-2xl"
          />
          {error && <p className="text-sm text-destructive text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-display font-semibold text-primary-foreground disabled:opacity-60"
          >
            <Icon name={loading ? 'Loader2' : 'Download'} size={18} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Собираю архив…' : 'Скачать'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadDialog;
