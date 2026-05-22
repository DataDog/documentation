export function classListFactory(styles: Record<string, string>) {
  return (...names: string[]): string =>
    names.flatMap(name => [name, styles[name]]).filter(Boolean).join(' ');
}
