'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/lib/store/ui.store';
import { Copy, Check, Share2 } from 'lucide-react';
import { toast } from 'sonner';

export function ShareModal() {
  const { shareModalOpen, shareUrl, closeShareModal } = useUIStore();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success('Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={shareModalOpen} onOpenChange={v => !v && closeShareModal()}>
      <DialogContent className="bg-bg-elevated border-white/10 max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-text-primary tracking-widest flex items-center gap-2">
            <Share2 className="w-5 h-5 text-gold" />
            SHARE YOUR FILM
          </DialogTitle>
          <DialogDescription className="text-text-primary/50 text-sm">
            Anyone with this link can view your Bollywood masterpiece in read-only mode.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              readOnly
              value={shareUrl ?? ''}
              className="flex-1 bg-bg-base border border-white/10 rounded-md px-3 py-2 text-sm text-text-primary/80 font-mono truncate"
            />
            <Button onClick={handleCopy} variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 shrink-0">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-text-primary/30">
            Link expires in 90 days. Paste in WhatsApp or Twitter for a movie poster preview.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
