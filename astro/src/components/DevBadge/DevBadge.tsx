import { useState, useEffect, useRef } from 'preact/hooks';
import styles from './DevBadge.module.css';
import { classListFactory } from '@lib/cssUtils/classListFactory';

const cl = classListFactory(styles);

const EDGE_MARGIN = 16;

// Pull pointer coordinates from either a mouse or a touch event so dragging
// works with both input types.
function getPointer(event: MouseEvent | TouchEvent): { x: number; y: number } {
  if ('touches' in event) {
    const touch = event.touches[0] ?? event.changedTouches[0];
    return { x: touch.clientX, y: touch.clientY };
  }
  return { x: event.clientX, y: event.clientY };
}

export function DevBadge() {
  const [position, setPosition] = useState({ x: EDGE_MARGIN, y: EDGE_MARGIN });
  const [dragging, setDragging] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const badgeRef = useRef<HTMLDivElement>(null);

  // Keep the badge fully within the viewport, accounting for its own size.
  const clampToViewport = (x: number, y: number): { x: number; y: number } => {
    const badge = badgeRef.current;
    const width = badge?.offsetWidth ?? 0;
    const height = badge?.offsetHeight ?? 0;
    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(0, window.innerHeight - height);
    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(0, y), maxY),
    };
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (event: MouseEvent | TouchEvent) => {
      const pointer = getPointer(event);
      setPosition(
        clampToViewport(
          pointer.x - dragOffset.current.x,
          pointer.y - dragOffset.current.y,
        ),
      );
    };

    const handleEnd = () => setDragging(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [dragging]);

  // Re-clamp if the viewport shrinks below the badge's current position.
  useEffect(() => {
    const handleResize = () =>
      setPosition((current) => clampToViewport(current.x, current.y));
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragStart = (event: MouseEvent | TouchEvent) => {
    if ((event.target as HTMLElement).closest(`.${styles['dev-badge__close']}`)) return;
    const pointer = getPointer(event);
    dragOffset.current = {
      x: pointer.x - position.x,
      y: pointer.y - position.y,
    };
    setDragging(true);
  };

  const handleDismiss = () => setDismissed(true);

  if (dismissed) return null;

  return (
    <div
      ref={badgeRef}
      class={cl('dev-badge', dragging ? 'dev-badge--dragging' : '')}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
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
