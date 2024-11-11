export function cssStringToObject(css: string) {
  const regex = /(?<=^|;)\s*([^:]+)\s*:\s*([^;]+)\s*/g;
  const result: Record<string, string> = {};
  css.replace(regex, (match, prop, val) => (result[prop] = val));
  return result;
}
