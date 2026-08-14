export function removeStyleFactory(styles: Record<string, string>) {
    return (classList: DOMTokenList, ...names: string[]): void => {
        names.forEach((name) => {
            classList.remove(name);
            const hashed = styles[name];
            if (hashed) {
                classList.remove(hashed);
            }
        });
    };
}
