export const isMobile = () => {
    const navAgent = navigator.userAgent;
    let deviceIsMobile = false;

    if (
        navAgent.match(/Android/i) ||
        navAgent.match(/BlackBerry/i) ||
        navAgent.match(/iPhone|iPad|iPod/i) ||
        navAgent.match(/Opera Mini/i) ||
        navAgent.match(/IEMobile/i) ||
        navAgent.match(/webOS/i) ||
        navAgent.match(/Windows Phone/i)
    ) {
        deviceIsMobile = true;
    }

    if (window.screen.width < 768) {
        deviceIsMobile = true;
    }

    if (window.matchMedia('only screen and (max-width: 768px)').matches) {
        deviceIsMobile = true;
    }

    return deviceIsMobile;
};
