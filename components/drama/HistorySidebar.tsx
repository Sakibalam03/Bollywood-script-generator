'use client';

import Link from 'next/link';
import { useDramaHistory } from '@/hooks/useDramaHistory';
import { useUIStore } from '@/lib/store/ui.store';
import { formatRelative, truncate } from '@/lib/utils/format';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Clock, Film } from 'lucide-react';

export function HistorySidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const dramas = useDramaHistory();

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent side="right" className="bg-bg-base border-l border-white/10 w-80 p-0">
        <SheetHeader className="px-4 py-4 border-b border-white/5">
          <SheetTitle className="font-display text-lg text-text-primary tracking-widest flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            PAST PRODUCTIONS
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-full pb-20">
          {dramas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4 space-y-2">
              <Film className="w-8 h-8 text-text-primary/20" />
              <p className="text-sm text-text-primary/40">No films yet. Generate your first masterpiece!</p>
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {dramas.map(drama => (
                <li key={drama.id}>
                  <Link
                    href={`/drama/${drama.id}`}
                    onClick={() => setSidebarOpen(false)}
                    className="block px-4 py-3 hover:bg-bg-elevated transition-colors group"
                  >
                    <p className="font-display text-sm text-text-primary group-hover:text-gold transition-colors truncate tracking-wide">
                      {drama.title}
                    </p>
                    <p className="text-xs text-text-primary/40 mt-0.5">{truncate(drama.situation, 60)}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-text-primary/30">{formatRelative(drama.created_at)}</span>
                      <span className="text-[10px] text-text-primary/20">•</span>
                      <span className="text-[10px] text-text-primary/30">{drama.genre}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
