export function debounce(func, wait, immediate) {
    let timeout;

    return function () {
        // eslint-disable-next-line prefer-rest-params
        const args = arguments;
        const context = this;
        const later = function () {
            timeout = null;

            if (!immediate) {
                func.apply(context, args);
            }
        };

        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
}
