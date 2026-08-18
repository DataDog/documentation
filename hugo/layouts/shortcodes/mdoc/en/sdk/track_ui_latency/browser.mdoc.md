### Core web vitals

<div class="alert alert-danger">
  Datadog's Core Web Vitals telemetry is available from the <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> package v2.2.0+.
</div>

The Browser SDK automatically collects [Core Web Vitals](https://web.dev/vitals/) (Largest Contentful Paint, Interaction to Next Paint, and Cumulative Layout Shift) for every view. No setup is required. These are a set of three KPIs designed to monitor a site's user experience, focusing on load performance, interactivity, and visual stability. Each KPI comes with guidance on the range of values that translate to good user experience. Datadog recommends monitoring the 75th percentile for these KPIs.

- LCP and FCP are not collected for pages that start hidden (for example, opened in a background tab). For more on when each vital is reported and how to troubleshoot a missing value, see [When each Core Web Vital is collected](#when-each-core-web-vital-is-collected).
- Telemetry collected from your real users' pageviews may differ from those calculated for pages loaded in a fixed, controlled environment such as a [Synthetic browser test](/synthetics/browser_tests/). Synthetic Monitoring displays Largest Contentful Paint and Cumulative Layout Shift as lab telemetry, not real telemetry.

| Datapoint | Focus | Description | Target value |
|---|---|---|---|
| [Largest Contentful Paint](https://web.dev/lcp/) | Load performance | Moment in the page load timeline in which the largest DOM object in the viewport (as in, visible on screen) is rendered. | <2.5s |
| [Interaction To Next Paint](https://web.dev/inp/) | Interactivity | Longest duration between a user's interaction with the page and the next paint. Requires RUM SDK v5.1.0. | <200ms |
| [Cumulative Layout Shift](https://web.dev/cls/) | Visual stability | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means that no shifts are happening. | <0.1 |

#### Core web vitals target elements

Identifying what element triggered a high Core Web Vitals KPI is the first step in understanding the root cause and being able to improve performance. RUM reports the element that is associated with each Core Web Vital instance:

- For Largest Contentful Paint, RUM reports the CSS Selector of the element corresponding to the largest contentful paint.
- For Interaction to Next Paint, RUM reports the CSS selector of the element associated with the longest interaction to the next paint.
- For First Input Delay, RUM reports the CSS selector of the first element the user interacted with.
- For Cumulative Layout Shift, RUM reports the CSS selector of the most shifted element contributing to the CLS.

#### When each core web vital is collected

The RUM Browser SDK reports each Core Web Vital under different conditions. If a vital is missing from a view event, the SDK most likely did not capture a value for it.

- **Largest Contentful Paint**: Reported on the initial view only. Captured when the `largest-contentful-paint` PerformanceObserver entry fires before the page is hidden and before the user's first interaction. Not reported if the page starts hidden, if the user interacts before any LCP entry arrives, or after a 10-minute cap. See [LCP: Differences between the metric and the API](https://web.dev/articles/lcp#differences-metric-api) for the upstream definition.
- **Interaction to Next Paint**: Reported on every view, including SPA route changes. Requires at least one user interaction during the view's lifetime (see [INP on web.dev](https://web.dev/articles/inp)). If the user never interacts, no INP value is emitted. Requires browser support for the `event` PerformanceObserver entry type and `PerformanceEventTiming.interactionId`. If unsupported, no INP value is emitted.
- **Cumulative Layout Shift**: Reported on every view, including SPA route changes. Requires browser support for the [`layout-shift` PerformanceObserver entry type](https://web.dev/articles/cls). The SDK also relies on `WeakRef` internally; if either is missing, no CLS value is emitted.
- **First Contentful Paint**: Reported on the initial view only (see [FCP on web.dev](https://web.dev/articles/fcp)). Captured when the entry fires before the page is hidden. The SDK applies a 10-minute ceiling per view.

**Note**: Reporting CLS and INP on every view, including SPA route changes, is intentional. This follows Chrome's [Soft Navigations API experiment](https://developer.chrome.com/docs/web-platform/soft-navigations), which extends these metrics beyond the initial page load. LCP and FCP use the standard page-load definition and are reported only on the initial view.

Values are captured up to the point of backgrounding; they are not discarded if a page is later hidden. A page that is hidden at view start (for example, opened in a background tab) emits no LCP or FCP.

#### Troubleshooting missing core web vitals

If a Core Web Vital is missing from a view in the [RUM Explorer](/real_user_monitoring/explorer/), check the following:

| Symptom | Likely cause |
|---|---|
| INP missing on a view | The user did not interact with the page during this view; the browser does not support INP; or the view ended before any interaction. |
| LCP or FCP missing on a view | The page was opened in a background tab or hidden window; the entry took longer than 10 minutes to fire; or this is a SPA route-change view (LCP and FCP are reported on the initial view only). |
| CLS missing on a view | The browser does not support the `layout-shift` PerformanceObserver entry type or lacks `WeakRef`. |
| Any vital below the expected threshold | Verify the loaded `@datadog/browser-rum` version meets the requirements for [Core web vitals](#core-web-vitals). |

To check that the SDK is collecting vitals:

1. Open your browser's developer tools and run `window.DD_RUM.getInternalContext()` to confirm the SDK loaded.
2. In the {% ui %}Network{% /ui %} tab, look for view events being sent to the Datadog intake.
3. In the [RUM Explorer](/real_user_monitoring/explorer/), open the view event in question and confirm it has the expected `@view.*` attributes.

#### Diagnose Core Web Vitals with subparts

Largest Contentful Paint and Interaction to Next Paint break down into subparts, each isolating a specific phase of the metric. Use subpart data to identify which phase contributes most to a slow LCP or INP.

##### Largest Contentful Paint subparts

<div class="alert alert-info">These attributes require Browser SDK v6.32.0 or later.</div>

LCP breaks down into four phases. Time to First Byte is collected separately as `view.first_byte`. The remaining three subparts are collected under `view.performance.lcp.sub_parts`:

| Phase | Attribute | Description |
|---|---|---|
| Time to First Byte | `view.first_byte` | Time until the browser receives the first byte of the HTML response, including server response time, CDN latency, and redirect time. |
| Resource load delay | `view.performance.lcp.sub_parts.load_delay` | Time between TTFB and the start of the LCP resource load. Reflects priority hints, preloads, and render-blocking resources. `0` when the LCP element does not require a resource. |
| Resource load time | `view.performance.lcp.sub_parts.load_time` | Time to load the LCP resource, affected by image format, compression, and network conditions. `0` when the LCP element does not require a resource. |
| Render delay | `view.performance.lcp.sub_parts.render_delay` | Time between the LCP resource finishing loading and the LCP element being painted. High values indicate long tasks or blocking JavaScript or CSS. |

##### Interaction to Next Paint subparts

<div class="alert alert-info">These attributes require Browser SDK v6.33.0 or later.</div>

INP breaks down into three phases, collected under `view.performance.inp.sub_parts`:

| Phase | Attribute | Description |
|---|---|---|
| Input delay | `view.performance.inp.sub_parts.input_delay` | Time from the user input until the event handler starts running. High values indicate main-thread contention and long tasks. |
| Processing duration | `view.performance.inp.sub_parts.processing_duration` | Duration of the event handler execution. High values indicate complex or synchronous handler work. |
| Presentation delay | `view.performance.inp.sub_parts.presentation_delay` | Time the browser took to render the next frame. High values indicate expensive style, layout, paint, or composite operations. |

### View loading time

The SDK automatically calculates `view.loading_time` by watching for network requests and DOM mutations.

#### How loading time is calculated

For single page applications (SPAs), the RUM Browser SDK differentiates between `initial_load` and `route_change` navigation with the `loading_type` attribute. If an interaction on your web page leads to a different URL without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks URL changes using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History). The `loading_time` KPI works for both `initial_load` and `route_change` navigation:

- **Initial Load**: Loading Time is equal to _whichever is longer_:
  - The difference between `navigationStart` and `loadEventEnd`, or
  - The difference between `navigationStart` and the first time the page has no activity. See [How page activity is calculated](#how-page-activity-is-calculated) for details.
- **SPA Route Change**: Loading Time is equal to the difference between the URL change and the first time the page has no activity. See [How page activity is calculated](#how-page-activity-is-calculated) for details.

#### Manually set the loading time

If the automatic calculation doesn't accurately reflect when your view finished loading, set it manually with `setViewLoadingTime`. Call this when your view is fully loaded and displayed to the user. The loading time is computed as the elapsed time since the current view started:

```javascript
window.DD_RUM.setViewLoadingTime()
```

Each call replaces any previously set value (last-call-wins), and stops the automatic detection for that view. After the loading time is sent, it is accessible as `@view.loading_time` and is visible in the RUM UI.

#### How page activity is calculated

The RUM Browser SDK tracks the page activity to estimate the time until the interface is stable again. The page is considered to have activity when:

- `xhr` or `fetch` requests are in progress.
- The browser emits performance resource timing entries (loading end of JS, CSS, etc.).
- The browser emits DOM mutations.

The page activity is considered to have ended when it hasn't had any activity for 100ms. **Note**: Only activity occurring after the SDK initialization is taken into account.

**Caveats**: The criteria of 100ms since last request or DOM mutation might not be an accurate determination of activity in the following scenarios:

- The application collects analytics by sending requests to an API periodically or after every click.
- The application uses "[comet](https://en.wikipedia.org/wiki/Comet_(programming))" techniques (that is, streaming or long polling), and the request stays on hold for an indefinite time.

To improve the accuracy of activity determination in these cases, configure `excludedActivityUrls` during SDK initialization, a list of resources for the RUM Browser SDK to exclude when computing the page activity:

```javascript
window.DD_RUM.init({
    ...
    excludedActivityUrls: [
        // Exclude exact URLs
        'https://third-party-analytics-provider.com/endpoint',

        // Exclude any URL ending with /comet
        /\/comet$/,

        // Exclude any URLs for which the function return true
        (url) => url === 'https://third-party-analytics-provider.com/endpoint',
    ]
})
```

You can also ignore specific DOM mutations by marking an element (or one of its ancestors) with the attribute `data-dd-excluded-activity-mutations`. This is useful for elements that constantly update but don't indicate real UI instability like loading spinners, progress bars, or live clocks.

```html
<div id="loading-spinner" data-dd-excluded-activity-mutations>
  <svg> ... </svg>
</div>
```

#### Hash SPA navigation

The RUM SDK automatically monitors frameworks that rely on hash (`#`) navigation. The SDK watches for `HashChangeEvent` and issues a new view. Events coming from an HTML anchor tag which do not affect the current view context are ignored.

### Custom vitals and timings

#### Measure component-level performance with custom vitals

Use the `customVital` API to measure the performance of your application at the component level. For example, you can measure how long it takes for part of your page to render or for a component to respond to a user interaction. **Note**: Custom vital names must contain only letters, digits, or the characters `- _ . @ $`.

Start a duration measurement by calling `startDurationVital` and stop a measurement with `stopDurationVital`:

```javascript
window.DD_RUM.startDurationVital("dropdownRendering")
window.DD_RUM.stopDurationVital("dropdownRendering")
```

After you call the `stopDurationVital` method, the custom vital duration is sent to Datadog and can be queried using `@vital.name:dropdownRendering`. You can also filter by duration, for example with `@vital.duration:>10`.

Use the reference returned by `startDurationVital` and specify a `description` string to differentiate between instances of the same custom vital across multiple pages. For example, to track the duration of `dropdownRendering` in the `login` page:

```javascript
const reference = window.DD_RUM.startDurationVital("dropdownRendering", { description: "login" })
window.DD_RUM.stopDurationVital(reference)
```

This code groups by `@vital.description` so you can track the same component's rendering behavior across different pages. You can also add context to your custom vital using the `context` property:

```javascript
window.DD_RUM.startDurationVital("dropdownRendering", {context: { clientId: "xxx" }})
window.DD_RUM.stopDurationVital("dropdownRendering")
```

To report a duration in a single call, use `addDurationVital`:

```javascript
window.DD_RUM.addDurationVital("dropdownRendering", {startTime: 1707755888000, duration: 10000})
```

**Note**: The `startTime` parameter expects a UNIX timestamp in milliseconds (the number of milliseconds since January 1, 1970).

#### Track additional performance timings

On top of RUM's default performance timing, you may measure where your application is spending its time with greater flexibility. The `addTiming` API provides a way to add extra performance timing. To add a timestamp relative to the start of the current view (such as when a hero image appears), use `addTiming`:

```javascript
window.DD_RUM.addTiming('hero_image')
```

For example, using an HTML `onload` handler:

```html
<html>
  <body>
    <img onload="window.DD_RUM.addTiming('hero_image')" src="/path/to/img.png" />
  </body>
</html>
```

Or when users first scroll:

```javascript
document.addEventListener("scroll", function handler() {
    // Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);
    window.DD_RUM.addTiming('first_scroll');
});
```

After the timing is sent, it is accessible in nanoseconds as `@view.custom_timings.<timing_name>`, for example: `@view.custom_timings.first_scroll`. You must [create a measure](/real_user_monitoring/explorer/search/#setup-facets-and-measures) before creating a visualization in the RUM Explorer or in your dashboards.

For single-page applications, the `addTiming` API issues a timing relative to the start of the current RUM view. For example, if a user lands on your application (initial load), then goes on a different page after 5 seconds (route change) and finally triggers `addTiming` after 8 seconds, the timing is equal to `8-5 = 3` seconds.

If you are using an asynchronous setup, you can provide your own timing (as a UNIX epoch timestamp) as a second parameter:

```javascript
document.addEventListener("scroll", function handler() {
    // Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);

    const timing = Date.now()
    window.DD_RUM.onReady(function() {
      window.DD_RUM.addTiming('first_scroll', timing);
    });
});
```

### All performance telemetry

| Attribute | Type | Description |
|---|---|---|
| `view.time_spent` | number (ns) | Time spent on the current view. |
| `view.first_byte` | number (ns) | Time elapsed until the first byte of the view has been received. |
| `view.largest_contentful_paint` | number (ns) | The moment in the page load timeline when the largest DOM object in the viewport renders and is visible on screen. |
| `view.largest_contentful_paint_target_selector` | string (CSS selector) | CSS Selector of the element corresponding to the largest contentful paint. |
| `view.first_input_delay` | number (ns) | Time elapsed between a user's first interaction with the page and the browser's response. |
| `view.first_input_delay_target_selector` | string (CSS selector) | CSS selector of the first element the user interacted with. |
| `view.interaction_to_next_paint` | number (ns) | Longest duration between a user's interaction with the page and the next paint. |
| `view.interaction_to_next_paint_target_selector` | string (CSS selector) | CSS selector of the element associated with the longest interaction to the next paint. |
| `view.cumulative_layout_shift` | number | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts are happening. |
| `view.cumulative_layout_shift_target_selector` | string (CSS selector) | CSS selector of the most shifted element contributing to the page CLS. |
| `view.loading_time` | number (ns) | Time until the page is ready and no network request or DOM mutation is happening. For more information, see [View loading time](#view-loading-time). |
| `view.first_contentful_paint` | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition](https://www.w3.org/TR/paint-timing/#sec-terminology). |
| `view.dom_interactive` | number (ns) | The moment when the parser finishes its work on the main document. For more information, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive). |
| `view.dom_content_loaded` | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. For more information, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event). |
| `view.dom_complete` | number (ns) | The page and all the sub-resources are ready. For the user, the loading spinner has stopped spinning. For more information, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event). |
| `view.load_event` | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. For more information, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event). |
| `view.error.count` | number | Count of all errors collected for this view. |
| `view.long_task.count` | number | Count of all long tasks collected for this view. |
| `view.resource.count` | number | Count of all resources collected for this view. |
| `view.action.count` | number | Count of all actions collected for this view. |
