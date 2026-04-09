import { useState } from 'preact/hooks';

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '6px',
        width: 'fit-content',
      }}
    >
      <button
        onClick={() => setCount((c) => c - 1)}
        style={{
          padding: '0.25rem 0.75rem',
          fontSize: '1.25rem',
          cursor: 'pointer',
        }}
      >
        -
      </button>
      <span style={{ minWidth: '2rem', textAlign: 'center', fontSize: '1.25rem' }}>
        {count}
      </span>
      <button
        onClick={() => setCount((c) => c + 1)}
        style={{
          padding: '0.25rem 0.75rem',
          fontSize: '1.25rem',
          cursor: 'pointer',
        }}
      >
        +
      </button>
    </div>
  );
}
