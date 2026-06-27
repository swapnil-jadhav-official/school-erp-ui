'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';

interface ModalProps {
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const sizeMap = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-lg',
  lg: 'sm:max-w-2xl',
};

export function ModalBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-4 py-4 sm:px-6 sm:py-5', className)} {...props} />;
}

export function ModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-wrap justify-end gap-2 sm:gap-3 px-4 py-3 sm:px-6 sm:py-4 border-t border-border/40', className)}
      {...props}
    />
  );
}

export function Modal({ onClose, title, size = 'lg', children, className }: ModalProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        />
        {/* Dialog — glass surface via CSS vars */}
        <motion.div
          className={cn(
            'relative z-10 w-full rounded-2xl sm:rounded-[32px] border border-border/50 max-h-[90vh] overflow-y-auto glass-card',
            sizeMap[size],
            className,
          )}
          style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(24px) saturate(180%)' }}
          initial={{ opacity: 0, scale: 0.95, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {title && (
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-border/40">
              <h2 className="text-base font-semibold text-foreground">{title}</h2>
              <Button variant="ghost" size="icon-xs" onClick={onClose} className="min-w-11 min-h-11">
                <X size={15} />
              </Button>
            </div>
          )}
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
