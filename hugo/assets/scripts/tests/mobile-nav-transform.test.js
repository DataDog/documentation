import { buildMobileDocsNav } from '../components/mobile-nav-transform';

function desktopFixture() {
    document.body.innerHTML = `
        <div class="sidenav-nav sidenav-nav-js-load">
            <p class="h5 text-uppercase fw-bold">Application Performance</p>
            <ul class="list-unstyled">
                <li class="nav-top-level js-load active">
                    <a href="/tracing/" class="d-flex align-items-center" data-path="tracing" data-skip="false">
                        <div><span>Tracing</span></div>
                    </a>
                    <ul class="list-unstyled sub-menu">
                        <li class="js-load active">
                            <a href="/tracing/trace_collection/" data-path="tracing/trace_collection" data-skip="false">
                                <span>Trace Collection</span>
                            </a>
                            <ul class="list-unstyled sub-menu">
                                <li class="js-load">
                                    <a href="/tracing/trace_collection/automatic_instrumentation/" data-type="page" data-path="tracing/trace_collection/automatic_instrumentation" data-skip="false">
                                        <span>Automatic Instrumentation</span>
                                    </a>
                                    <ul class="list-unstyled sub-menu d-none">
                                        <li class="js-load">
                                            <a data-name="java" href="/tracing/trace_collection/automatic_instrumentation/java/" data-path="tracing/trace_collection/automatic_instrumentation/java" data-skip="false">
                                                <span>Java</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class="nav-top-level js-load">
                    <a href="/watchdog/" class="d-flex align-items-center" data-path="watchdog" data-skip="false">
                        <div><span>Watchdog</span></div>
                    </a>
                    <ul class="list-unstyled sub-menu">
                        <li class="js-load">
                            <a href="/watchdog/some_page/" data-path="watchdog/some_page" data-skip="false">
                                <span>Some Page</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `;
    return document.querySelector('.sidenav-nav-js-load');
}

describe('buildMobileDocsNav', () => {
    it('builds one dropdown group per heading/list pair', () => {
        const fragment = buildMobileDocsNav(desktopFixture());
        const groups = fragment.querySelectorAll('li.dropdown');
        expect(groups.length).toBe(1);
        expect(groups[0].querySelector('.dropdown-toggle .nav-menu-item').textContent).toContain('Application Performance');
    });

    it('renders every L1 item as a leaf link, carrying data-path/data-skip/href', () => {
        const fragment = buildMobileDocsNav(desktopFixture());
        const l1Links = fragment.querySelectorAll('ul.dropdown-menu > li > a');
        expect(l1Links.length).toBe(2);

        const tracingLink = Array.from(l1Links).find((a) => a.textContent.includes('Tracing'));
        expect(tracingLink.getAttribute('href')).toBe('/tracing/');
        expect(tracingLink.getAttribute('data-path')).toBe('tracing');
        expect(tracingLink.getAttribute('data-skip')).toBe('false');
    });

    it('only expands sub-nav for the current top section (active L1), not other sections', () => {
        const fragment = buildMobileDocsNav(desktopFixture());
        const items = fragment.querySelectorAll('ul.dropdown-menu > li');

        const tracingLi = Array.from(items).find((li) => li.querySelector('a').textContent.includes('Tracing'));
        const watchdogLi = Array.from(items).find((li) => li.querySelector('a').textContent.includes('Watchdog'));

        expect(tracingLi.querySelector('ul.sub-nav')).not.toBeNull();
        expect(watchdogLi.querySelector('ul.sub-nav')).toBeNull();
    });

    it('caps depth at mobile L3 and never carries over desktop L4', () => {
        const fragment = buildMobileDocsNav(desktopFixture());
        // Trace Collection (L2) -> Automatic Instrumentation (L3) should be present...
        expect(fragment.textContent).toContain('Automatic Instrumentation');
        // ...but Java (desktop L4, under Automatic Instrumentation) must not be.
        expect(fragment.textContent).not.toContain('Java');
    });

    it('does not copy icons, data-type, data-name, js-load, or active classes', () => {
        const fragment = buildMobileDocsNav(desktopFixture());
        expect(fragment.querySelector('img')).toBeNull();
        expect(fragment.querySelector('[data-type]')).toBeNull();
        expect(fragment.querySelector('[data-name]')).toBeNull();
        expect(fragment.querySelector('.js-load')).toBeNull();
        expect(fragment.querySelector('.active')).toBeNull();
    });

    it('returns an empty fragment when given no desktop sidenav element', () => {
        const fragment = buildMobileDocsNav(null);
        expect(fragment.childNodes.length).toBe(0);
    });
});
