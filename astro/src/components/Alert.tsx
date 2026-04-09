import type { ComponentChildren } from 'preact';

interface AlertProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  children?: ComponentChildren;
}

const colors: Record<string, { bg: string; border: string; text: string }> = {
  info: { bg: '#e7f3fe', border: '#2196F3', text: '#0d47a1' },
  warning: { bg: '#fff3e0', border: '#ff9800', text: '#e65100' },
  error: { bg: '#ffebee', border: '#f44336', text: '#b71c1c' },
  success: { bg: '#e8f5e9', border: '#4caf50', text: '#1b5e20' },
};

export function Alert({ type = 'info', children }: AlertProps) {
  const color = colors[type];
  return (
    <div
      style={{
        padding: '1rem',
        marginBottom: '1rem',
        borderLeft: `4px solid ${color.border}`,
        backgroundColor: color.bg,
        color: color.text,
        borderRadius: '4px',
      }}
    >
      <strong>{type.charAt(0).toUpperCase() + type.slice(1)}:</strong>{' '}
      {children}
    </div>
  );
}
