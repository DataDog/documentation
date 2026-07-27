type ClassEntry = string | false | null | undefined;

export function classListFactory(styles: Record<string, string>) {
  return (...names: ClassEntry[]): string =>
    names
      .filter((n): n is string => Boolean(n))
      .flatMap(name => [name, styles[name]])
      .filter(Boolean)
      .join(' ');
}
