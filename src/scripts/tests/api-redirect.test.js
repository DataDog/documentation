import { redirectToAPIPage } from '../api-redirect';

describe(`Check if current page is an old API page, and redirect if able`, () => {
    beforeEach(() => {
        delete window.location;

        window.location = {
            href: 'https://docs.datadoghq.com/'
        };
    });

    it('should go to /api/v1/monitors when hash is #monitors', () => {
        // mock the inputs
        delete window.location;
        window.location = {
            origin: "https://docs.datadoghq.com",
            pathname: "/api/",
            hash: '#monitors',
            href: 'https://docs.datadoghq.com/api/#monitors'
        };

        redirectToAPIPage();

        // what we expect and what we got
        const expected = 'https://docs.datadoghq.com/api/v1/monitors/';
        const actual = window.location.href;

        expect(actual).toEqual(expected);
    });
});
