export function markSelfAsHydrated(ref: { current: Element | null }): void {
  ref.current?.setAttribute('data-hydrated', 'true');
}
