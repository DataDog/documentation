export interface ExternalContext<E> {
  scope: string;
  entries: E;
}

type Loaded<E> = {
  [K in keyof E]: E[K] extends string[] ? HTMLElement[] : HTMLElement;
};

export function loadExternalContext<
  E extends { [K in keyof E]: string | string[] },
>(context: ExternalContext<E>): Loaded<E> | null {
  const scope = document.getElementById(context.scope);
  if (!scope) {
    return null;
  }
  const result: Record<string, HTMLElement | HTMLElement[]> = {};
  for (const key in context.entries) {
    const val = context.entries[key];
    if (Array.isArray(val)) {
      const els: HTMLElement[] = [];
      for (const id of val) {
        const el = findInScope(scope, id);
        if (!el) {
          return null;
        }
        els.push(el);
      }
      result[key] = els;
    } else {
      const el = findInScope(scope, val);
      if (!el) {
        return null;
      }
      result[key] = el;
    }
  }
  return result as Loaded<E>;
}

function findInScope(scope: HTMLElement, id: string): HTMLElement | null {
  if (scope.id === id) {
    return scope;
  }
  return scope.querySelector<HTMLElement>(`#${id}`);
}
