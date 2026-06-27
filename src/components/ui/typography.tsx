import * as React from 'react';
import { cn } from '@/lib/utils';

type ColorValue =
  | 'default'
  | 'muted'
  | 'primary'
  | 'danger'
  | 'success'
  | 'green'
  | 'red'
  | 'yellow'
  | 'link'
  | 'theme'; /* gradient text using --theme-gradient-from/to */

type SizeValue = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl';
type WeightValue = 'normal' | 'medium' | 'semibold' | 'bold';

const colorMap: Record<ColorValue, string> = {
  default: 'text-foreground',
  muted: 'text-muted-foreground',
  primary: 'text-foreground/80',
  danger: 'text-destructive',
  success: 'text-emerald-600 dark:text-emerald-400',
  green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  link: 'text-primary underline',
  theme: 'theme-gradient-text font-semibold', /* uses CSS utility class */
};

const sizeMap: Record<SizeValue, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
};

const weightMap: Record<WeightValue, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorValue;
}

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  color?: ColorValue;
  size?: SizeValue;
  weight?: WeightValue;
  noWrap?: boolean;
}

export function H1({ color = 'default', className, ...props }: TypographyProps) {
  return (
    <h1 className={cn('text-xl font-semibold', colorMap[color], className)} {...props} />
  );
}

/** Page-level heading — 24px on mobile, scales to 32px on md+ */
export function PageTitle({ color = 'default', className, ...props }: TypographyProps) {
  return (
    <h1
      className={cn('text-2xl sm:text-[28px] md:text-[32px] font-bold tracking-tight leading-tight', colorMap[color], className)}
      {...props}
    />
  );
}

export function H2({ color = 'default', className, ...props }: TypographyProps) {
  return (
    <h2 className={cn('text-lg font-semibold', colorMap[color], className)} {...props} />
  );
}

export function H3({ color = 'muted', className, ...props }: TypographyProps) {
  return (
    <h3 className={cn('text-sm font-medium', colorMap[color], className)} {...props} />
  );
}

export function P({ color = 'muted', size = 'sm', weight, noWrap, className, ...props }: PProps) {
  return (
    <p
      className={cn(
        sizeMap[size],
        colorMap[color],
        weight && weightMap[weight],
        noWrap && 'whitespace-nowrap',
        className,
      )}
      {...props}
    />
  );
}

export function Span({ color = 'default', className, ...props }: TypographyProps) {
  return (
    <span className={cn('text-sm', colorMap[color], className)} {...props} />
  );
}

export function Label({
  color = 'default',
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { color?: ColorValue }) {
  return (
    <label
      className={cn('text-sm font-medium text-foreground/80', colorMap[color === 'default' ? 'primary' : color], className)}
      {...props}
    />
  );
}

export function ErrorText({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs text-destructive', className)} {...props} />
  );
}

interface SectionLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  padding?: string;
}

export function SectionLabel({ className, padding, ...props }: SectionLabelProps) {
  return (
    <p className={cn('text-xs font-semibold uppercase tracking-wider text-muted-foreground', padding, className)} {...props} />
  );
}

/** Replaces <P className="text-xs font-medium text-muted-foreground"> in filter rows */
export function FilterLabel({ className, noWrap, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { noWrap?: boolean }) {
  return (
    <p className={cn('text-xs font-medium text-muted-foreground', noWrap && 'min-w-max', className)} {...props} />
  );
}

/** Replaces <label className="text-sm text-foreground/80 cursor-pointer"> for checkboxes */
export function CheckboxLabel({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn('text-sm text-foreground/80 cursor-pointer', className)} {...props} />
  );
}

/** Auth left-panel headline — 26 px bold, centered, inherits panel CSS var override */
export function PanelHeading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2 className={cn('auth-panel-headline', className)} {...props} />
  );
}
