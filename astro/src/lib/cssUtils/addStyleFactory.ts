export function addStyleFactory(styles: Record<string, string>) {
    return (classList: DOMTokenList, ...names: string[]): void => {
        names.forEach((name) => {
            classList.add(name);
            const hashed = styles[name];
            if (hashed) {
                classList.add(hashed);
            }
        });
    };
}
