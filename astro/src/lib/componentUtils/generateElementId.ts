export function generateElementId(bemBlock: string): string {
  return `${bemBlock}-${crypto.randomUUID().slice(0, 8)}`;
}
