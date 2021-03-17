import { redirectToAPIPage } from '../api-redirect';

describe(`Check if current page is an old API page, and redirect if able`, () => {
    beforeEach(() => {
        delete window.location;

        window.location = {
            href: 'https://docs.datadoghq.com/'
        };
    });

    it('should go to /api/v1/monitors when hash is #monitors for live url', () => {
        // mock the inputs
        delete window.location;
        window.location = {
            origin: "https://docs.datadoghq.com",
            pathname: "/api/",
            hash: '#monitors',
            href: 'https://docs.datadoghq.com/api/#monitors'
        };

        document.documentElement.dataset.env = "live";

        redirectToAPIPage();

        // what we expect and what we got
        const expected = 'https://docs.datadoghq.com/api/v1/monitors/';
        const actual = window.location.href;

        expect(actual).toEqual(expected);
    });

    it('should go to /api/v1/monitors when hash is #monitors for staging url', () => {
        // mock the inputs
        delete window.location;
        window.location = {
            origin: "https://docs-staging.datadoghq.com",
            pathname: "/zach/api-redirect/api/",
            hash: '#monitors',
            href: 'https://docs-staging.datadoghq.com/zach/api-redirect/api/#monitors'
        };

        document.documentElement.dataset.env = "preview";
        document.documentElement.dataset.commitRef = "zach/api-redirect";

        redirectToAPIPage();

        // what we expect and what we got
        const expected = 'https://docs-staging.datadoghq.com/zach/api-redirect/api/v1/monitors/';
        const actual = window.location.href;

        expect(actual).toEqual(expected);
    });

});
