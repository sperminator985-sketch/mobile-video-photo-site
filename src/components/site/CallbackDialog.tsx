import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import CallbackForm from './CallbackForm';

interface CallbackDialogProps {
  trigger: React.ReactNode;
}

const CallbackDialog = ({ trigger }: CallbackDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <DialogContent className="rounded-[1.75rem] bg-card p-6 border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-lg text-center">Заказать обратный звонок</DialogTitle>
        </DialogHeader>
        <CallbackForm idPrefix="header-callback" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default CallbackDialog;
