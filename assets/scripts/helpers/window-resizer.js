// Currently used to dynamically update navbar styles & properties given viewport width
function userDeviceIsMobile() {
    return window.innerWidth <= 992;
}

function isOnScreen(elem) {
    // if the element doesn't exist, abort
    if (elem.length === 0) {
        return false;
    }

    const $window = $(window);
    const viewportTop = $window.scrollTop();
    const viewportHeight = $window.height();
    const viewportBottom = viewportTop + viewportHeight;
    const $elem = $(elem);
    const { top } = $elem.offset();
    const height = $elem.height();
    const bottom = top + height;

    return (
        (top >= viewportTop && top < viewportBottom) ||
        (bottom > viewportTop && bottom <= viewportBottom) ||
        (height > viewportHeight && top <= viewportTop && bottom >= viewportBottom)
    );
}

export { userDeviceIsMobile, isOnScreen };
