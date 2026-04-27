/**
 * Markdown twin of `ApiStatusAlert.astro`.
 *
 * Renders deprecated/unstable/beta notices as a Markdoc `{% alert %}` block.
 * The alert tag's `level` attribute (info|danger|warning|tip) doesn't have a
 * 1:1 mapping with the HTML component's `type` (deprecated|unstable|beta), so
 * we map: deprecated/unstable → warning, beta → info.
 */

import { htmlToMd } from '../../../data/api/htmlToMd';

type StatusType = 'deprecated' | 'unstable' | 'beta';

interface Props {
  type: StatusType;
  newerVersionUrl?: string;
  message?: string;
}

const DEFAULTS: Record<StatusType, { label: string; defaultMessage: string }> = {
  deprecated: { label: 'Deprecated', defaultMessage: 'This endpoint is deprecated.' },
  unstable: { label: 'Unstable', defaultMessage: 'This endpoint is unstable and may change without notice.' },
  beta: { label: 'Beta', defaultMessage: 'This endpoint is in beta and may change.' },
};

const LEVEL: Record<StatusType, 'warning' | 'info'> = {
  deprecated: 'warning',
  unstable: 'warning',
  beta: 'info',
};

export function renderApiStatusAlertMd({ type, newerVersionUrl, message }: Props): string {
  const config = DEFAULTS[type];
  const body = htmlToMd(message || config.defaultMessage);
  const link = newerVersionUrl && type === 'deprecated'
    ? ` [Use the newer version.](${newerVersionUrl})`
    : '';

  return `{% alert level="${LEVEL[type]}" %}\n**${config.label}:** ${body}${link}\n{% /alert %}`;
}
