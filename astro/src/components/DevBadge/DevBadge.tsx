import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './DevBadge.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

const cl = classListFactory(styles);

export function DevBadge() {
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [dragging, setDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest(`.${styles['dev-badge__close']}`)) return;
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
    setDragging(true);
  };

  const handleDismiss = () => {
    setDismissed(true);
    setTimeout(() => {
      setPosition({ x: 16, y: 16 });
      setDismissed(false);
    }, 60_000);
  };

  if (dismissed) return null;

  return (
    <div
      class={cl('dev-badge', dragging ? 'dev-badge--dragging' : '')}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleMouseDown}
    >
      <span class={cl('dev-badge__label')}>ASTRO</span>
      <button
        class={cl('dev-badge__close')}
        onClick={handleDismiss}
        aria-label="Dismiss dev badge"
      >
        ✕
      </button>
    </div>
  );
}
