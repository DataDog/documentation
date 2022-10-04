import * as redirect from '../lang-redirects';

describe(`Ensure EN site loads and redirects as expected `, () => {

    beforeEach(() => {
        // setup navigator.language to use JA
        navigator.__defineGetter__("language", function() {
            return 'en-US';
        });

        // reset cookie value
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: '',
        });

        delete window.location;
        window.location = { href: '', replace: jest.fn(), };
    });

    it('should redirect to EN site based on URL param when cookie value is JA and update the cookie', () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'lang_pref=ja',
        });

        window.location.href = 'http://localhost:3000/ja/product/?lang_pref=en';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).toHaveBeenCalled();
        expect(window.document.cookie).toContain('lang_pref=en');
    });

    it('should not redirect when lang_pref is not set via cookie or URL', () => {
        window.location.href = 'http://localhost:3000/ja/product/';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).not.toHaveBeenCalled();
    });


    it('should not redirect when lang_pref cookie value contains EN', () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'lang_pref=en',
        });

        window.location.href = 'http://localhost:3000/ja/product/';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).not.toHaveBeenCalled();
    });

    it('should ignore when domain doest not match enabledSubdomains', () => {
        window.location.href = 'https://somedomain.com/?lang_pref=ja';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).not.toHaveBeenCalled();
    });

    it('should ignore when lang_pref is not in allowedLanguages', () => {
        window.location.href = 'http://localhost:3000/?lang_pref=es';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).not.toHaveBeenCalled();
    });
});


describe(`Ensure JA site redirects are working based on navigator.language settings `, () => {

    beforeAll(() => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: '',
        });
    });

    beforeEach(() => {
        // setup navigator.language to use JA
        navigator.__defineGetter__("language", function() {
            return 'ja';
        });

        // solution for jsdom errors - https://github.com/jsdom/jsdom/issues/2112#issuecomment-491683153
        delete window.location;
        window.location = { href: '', replace: jest.fn(), };
    });

    it('should redirect a preview site as expected', () => {
        window.location.href = 'https://docs-staging.datadoghq.com/nsollecito/lang-redirects/agent/basic_agent_usage/?lang_pref=ja';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).toHaveBeenCalled();
    });

    it('should redirect a preview site as expected', () => {
        window.location.href = 'https://docs-staging.datadoghq.com/nsollecito/lang-redirects/monitors/monitor_types/';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).toHaveBeenCalled();
    });


    it('should not redirect when JA site is requested and JA navigator.language matches', () => {
        window.location.href = 'http://localhost:3000/ja/product/index.html';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).not.toHaveBeenCalled();
    });

    it('should redirect and set a cookie when lang_pref is defined but navigator.language contains EN', () => {
        navigator.__defineGetter__("language", function() {
            return 'en';
        });

        window.location.href = 'http://localhost:3000/index.html?lang_pref=ja';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).toHaveBeenCalled();
        expect(window.document.cookie).toContain('lang_pref=ja');
    });

    it('should redirect when lang_pref cookie value contains JA', () => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: 'lang_pref=ja',
        });

        window.location.href = 'http://localhost:3000/product/';

        redirect.handleLanguageBasedRedirects();

        expect(window.location.replace).toHaveBeenCalled();
    });
});
