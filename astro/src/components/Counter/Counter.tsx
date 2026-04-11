import { useState } from 'preact/hooks';
import styles from './Counter.module.css';

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div class={`counter ${styles.counter}`} data-testid="counter">
      <button
        class={`counter__button ${styles['counter__button']}`}
        onClick={() => setCount((c) => c - 1)}
      >
        -
      </button>
      <span class={`counter__display ${styles['counter__display']}`} data-testid="counter-display">
        {count}
      </span>
      <button
        class={`counter__button ${styles['counter__button']}`}
        onClick={() => setCount((c) => c + 1)}
      >
        +
      </button>
    </div>
  );
}
