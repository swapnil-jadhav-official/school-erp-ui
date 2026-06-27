import Image from 'next/image';
import { Div, PageActions } from './layout';
import { PageTitle, P } from './typography';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  illustration?: string;
}

/**
 * Responsive page header.
 * Mobile: title stacks above actions.
 * sm+: title left, actions right (via .page-header CSS class).
 */
export function PageHeader({ title, subtitle, actions, illustration }: PageHeaderProps) {
  return (
    <Div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Div type="row" align="center" gap="md">
        {illustration && (
          <Image
            src={illustration}
            alt=""
            width={56}
            height={56}
            className="shrink-0 select-none opacity-90"
            draggable={false}
          />
        )}
        <Div type="col" gap="xs">
          <PageTitle>{title}</PageTitle>
          {subtitle && <P color="muted">{subtitle}</P>}
        </Div>
      </Div>
      {actions && <PageActions>{actions}</PageActions>}
    </Div>
  );
}
