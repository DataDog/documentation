/**
 * Create a URL-friendly version of a string.
 * For example, creating an anchor name from a heading.
 */
export function anchorize(text: string): string {
  let anchorName: string[] = [];
  let futureDash = false;

  for (const char of text) {
    if (/[a-zA-Z0-9]/.test(char)) {
      if (futureDash && anchorName.length > 0) {
        anchorName.push('-');
      }
      futureDash = false;
      anchorName.push(char.toLowerCase());
    } else {
      futureDash = true;
    }
  }

  return anchorName.join('');
}
