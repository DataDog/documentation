export const triggerEvent = (el, eventType) => {
    if (typeof eventType === 'string' && typeof el[eventType] === 'function') {
        el[eventType]();
    } else {
        const event = typeof eventType === 'string' ? new Event(eventType, { bubbles: true }) : eventType;
        el.dispatchEvent(event);
    }
};
