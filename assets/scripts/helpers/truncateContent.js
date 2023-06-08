export const truncateContent = (content, length) => {
    if (content.length > length) {
        return `${content.slice(0, length)} ...`;
    } else {
        return content;
    }
};
