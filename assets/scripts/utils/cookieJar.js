import Cookies from 'js-cookie';
import { truncateString } from '../helpers/string';

class CookieHandler {
    constructor(options) {
        this.options = options;
    }

    get(name) {
        Cookies.get(name);
    }

    getAll() {
        return Cookies.get();
    }

    set(name, value, maxLength = 200) {
        const truncatedValue = truncateString(value, maxLength, false);
        Cookies.set(name, truncatedValue, this.options);
    }

    remove(name) {
        Cookies.remove(name, this.options);
    }
}

export default CookieHandler;
