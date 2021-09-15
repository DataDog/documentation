import { redirectToRegion } from '../region-redirects';

let regionUSSnippet;
let regionEUSnippet;
let regionGOVSnippet;
let regionParam;
let regionAppLink;

describe(`On main page load (not home or api pages, nor loaded via async)`, () => {
    beforeEach(() => {
        Object.defineProperty(window.document, 'cookie', {
            writable: true,
            value: ''
        });

        Object.defineProperty(document, 'referrer', {
            writable: true,
            value: ''
        });

        delete window.location;
        window.location = {
            href: 'http://localhost:1313/getting_started/logs/'
        };

        const testUSRegionShortcodeHtml = `
        <div class="d-none" data-region="us">
        <p>The secure TCP endpoint is <code>intake.logs.datadoghq.com:10516</code> (or port <code>10514</code> for nonsecure connections).</p>
        <div class="highlight"><pre class="chroma"><code class="language-text" data-lang="text">telnet intake.logs.datadoghq.com 10514
        &lt;DATADOG_API_KEY&gt; Plain text log sent through TCP</code></pre></div>
        </div>
        <code class="js-region-param" data-region-param="dd_site"></code>
        `;

        const testEURegionShortcodeHtml = `
        <div class="d-none" data-region="eu">
        <p>The secure TCP endpoint is <code>tcp-intake.logs.datadoghq.eu:443</code> (or port <code>1883</code> for nonsecure connections).</p>
        <div class="highlight"><pre class="chroma"><code class="language-text" data-lang="text">telnet tcp-intake.logs.datadoghq.eu 1883
        &lt;DATADOG_API_KEY&gt; Plain text log sent through TCP</code></pre></div>
        </div>
        <code class="js-region-param" data-region-param="dd_site"></code>
        `;

        const testGovRegionShortcodeHtml = `
        <div class="d-none" data-region="gov">
        <code class="js-region-param" data-region-param="dd_site"></code>
        `;

        const testParamHtml = `<code class="js-region-param" data-region-param="dd_site"></code>`;
        const testAppLink = `<div id="mainContent"><a class="test-link" href="https://app.datadoghq.com/logs">Logs</a></div>`;

        document.body.innerHTML += testUSRegionShortcodeHtml;
        document.body.innerHTML += testEURegionShortcodeHtml;
        document.body.innerHTML += testGovRegionShortcodeHtml;
        document.body.innerHTML += testParamHtml;
        document.body.innerHTML += testAppLink;

        regionUSSnippet = document.querySelector('[data-region=us]');
        regionEUSnippet = document.querySelector('[data-region=eu]');
        regionGOVSnippet = document.querySelector('[data-region=gov]');
        regionParam = document.querySelector('[data-region-param]');
        regionAppLink = document.querySelector('.test-link');
    });

    describe(`No Cookie Set`, () => {
        describe('no site param set', () => {
            it('should set cookie value "site" to default region "us"', () => {
                redirectToRegion();

                expect(window.document.cookie).toContain('site=us');
                expect(regionEUSnippet.classList).toContain('d-none')
                expect(regionUSSnippet.classList).not.toContain('d-none')
                expect(regionParam.innerHTML).toEqual('datadoghq.com')
                expect(regionAppLink.href).toEqual('https://app.datadoghq.com/logs');
            });
        });

        describe('set region param in url', () => {
            it('should set cookie value "site" to region from query param "eu"', () => {
                window.location.search = 'site=eu';

                redirectToRegion();

                expect(window.document.cookie).toContain('site=eu');
                expect(regionEUSnippet.classList).not.toContain('d-none')
                expect(regionUSSnippet.classList).toContain('d-none')
                expect(regionParam.innerHTML).toEqual('datadoghq.eu')
                expect(regionAppLink.href).toEqual('https://app.datadoghq.eu/logs');
            });
        });

        describe('invalid site param', () => {
            it('should set cookie value "site" to region from query param "us", and disregard invalid param value', () => {
                window.location.search = 'site=fs';

                redirectToRegion();

                expect(window.document.cookie).toContain('site=us');
                expect(regionUSSnippet.classList).not.toContain('d-none')
                expect(regionEUSnippet.classList).toContain('d-none')
                expect(regionParam.innerHTML).toEqual('datadoghq.com')
                expect(regionAppLink.href).toEqual('https://app.datadoghq.com/logs');
            });
        });

        describe('referrer coming from app.datadoghq.eu', () => {
            it('should set cookie value "site" to region "eu" from document referrer', () => {
                window.document.referrer = "https://app.datadoghq.eu/";

                redirectToRegion();

                expect(window.document.cookie).toContain('site=eu');
                expect(regionUSSnippet.classList).toContain('d-none')
                expect(regionEUSnippet.classList).not.toContain('d-none')
                expect(regionParam.innerHTML).toEqual('datadoghq.eu')
                expect(regionAppLink.href).toEqual('https://app.datadoghq.eu/logs');
            });
        });

    });

    describe(`Cookie is Set to "eu"`, () => {
        beforeEach(() => {
            Object.defineProperty(window.document, 'cookie', {
                writable: true,
                value: 'site=eu'
            });
        });
        describe('no site param set', () => {
            it('should set cookie value "site" to region "eu"', () => {
                redirectToRegion();

                expect(window.document.cookie).toContain('site=eu');
                expect(regionUSSnippet.classList).toContain('d-none');
                expect(regionEUSnippet.classList).not.toContain('d-none');
                expect(regionParam.innerHTML).toEqual('datadoghq.eu');
                expect(regionAppLink.href).toEqual('https://app.datadoghq.eu/logs');
            });
        });

        describe('set region param in url', () => {
            it('should set cookie value "site" to region from query param "eu"', () => {
                window.location.search = 'site=eu';

                redirectToRegion();

                expect(window.document.cookie).toContain('site=eu');
                expect(regionUSSnippet.classList).toContain('d-none');
                expect(regionEUSnippet.classList).not.toContain('d-none');
                expect(regionParam.innerHTML).toEqual('datadoghq.eu');
                expect(regionAppLink.href).toEqual('https://app.datadoghq.eu/logs');
            });
        });

        describe('invalid site param', () => {
            it('should set cookie value "site" to region from query param "eu", and disregard invalid param value', () => {
                window.location.search = 'site=fs';

                redirectToRegion();

                expect(window.document.cookie).toContain('site=eu');
                expect(regionUSSnippet.classList).toContain('d-none')
                expect(regionEUSnippet.classList).not.toContain('d-none')
                expect(regionParam.innerHTML).toEqual('datadoghq.eu')
                expect(regionAppLink.href).toEqual('https://app.datadoghq.eu/logs');
            });
        });

        describe('referrer coming from app.datadoghq.com', () => {
            it('should set cookie value "site" to region "us" from document referrer', () => {
                window.document.referrer = "https://app.datadoghq.com/";

                redirectToRegion();

                expect(window.document.cookie).toContain('site=us');
                expect(regionUSSnippet.classList).not.toContain('d-none')
                expect(regionEUSnippet.classList).toContain('d-none')
                expect(regionParam.innerHTML).toEqual('datadoghq.com')
                expect(regionAppLink.href).toEqual('https://app.datadoghq.com/logs');
            });
        });
    });

    describe(`Cookie is Set to "gov"`, () => {
        beforeEach(() => {
            Object.defineProperty(window.document, 'cookie', {
                writable: true,
                value: 'site=gov'
            });
        });
        describe('no site param set', () => {
            it('should set cookie value "site" to region "gov"', () => {
                redirectToRegion();

                expect(window.document.cookie).toContain('site=gov');
                expect(regionUSSnippet.classList).toContain('d-none');
                expect(regionEUSnippet.classList).toContain('d-none');
                expect(regionGOVSnippet.classList).not.toContain('d-none');
                expect(regionAppLink.href).toEqual('https://app.ddog-gov.com/logs');
            });
        });

        describe('set region param in url', () => {
            it('should set cookie value "site" to region from query param "gov"', () => {
                window.location.search = 'site=gov';

                redirectToRegion();

                expect(window.document.cookie).toContain('site=gov');
                expect(regionUSSnippet.classList).toContain('d-none');
                expect(regionEUSnippet.classList).toContain('d-none');
                expect(regionGOVSnippet.classList).not.toContain('d-none');
                expect(regionAppLink.href).toEqual('https://app.ddog-gov.com/logs');
            });
        });

        describe('invalid site param', () => {
            it('should set cookie value "site" to region from query param "gov", and disregard invalid param value', () => {
                window.location.search = 'site=fs';

                redirectToRegion();

                expect(window.document.cookie).toContain('site=gov');
                expect(regionUSSnippet.classList).toContain('d-none');
                expect(regionEUSnippet.classList).toContain('d-none');
                expect(regionGOVSnippet.classList).not.toContain('d-none');
                expect(regionAppLink.href).toEqual('https://app.ddog-gov.com/logs');
            });
        });

        describe('referrer coming from app.ddog-gov.com', () => {
            it('should set cookie value "site" to region "gov" from document referrer', () => {
                window.document.referrer = "https://app.ddog-gov.com/";

                redirectToRegion();

                expect(window.document.cookie).toContain('site=gov');
                expect(regionUSSnippet.classList).toContain('d-none');
                expect(regionEUSnippet.classList).toContain('d-none');
                expect(regionGOVSnippet.classList).not.toContain('d-none');
                expect(regionAppLink.href).toEqual('https://app.ddog-gov.com/logs');
            });
        });
    });
});
