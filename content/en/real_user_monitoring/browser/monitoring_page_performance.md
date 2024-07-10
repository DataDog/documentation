---
title: Monitoring Page Performance
further_reading:
  - link: "https://learn.datadoghq.com/courses/core-web-vitals-lab"
    tag: "Learning Center"
    text: "Interactive Lab: Core Web Vitals"
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/"
    tag: "Blog"
    text: "Monitor Core Web Vitals with Datadog RUM and Synthetic Monitoring"
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "Explore your views within Datadog"
  - link: "/real_user_monitoring/explorer/visualize/"
    tag: "Documentation"
    text: "Apply visualizations on your events"
  - link: "/real_user_monitoring/platform/dashboards/"
    tag: "Documentation"
    text: "Learn about RUM Dashboards"
---

## Overview

RUM view events collect extensive performance metrics for every pageview. Monitor your application's pageviews and explore performance metrics in dashboards and the RUM Explorer.

{{< img src="real_user_monitoring/browser/waterfall-4.png" alt="A waterfall graph on the Performance tab of a RUM view in the RUM Explorer" style="width:100%;" >}}

You can access performance metrics for your views in:

- Out-of-the-box [RUM dashboards][1], which provide a high-level view of your application's performance. For example, you can filter on [default attributes][2] collected by RUM to surface issues impacting a subset of users in the [Performance Overview dashboard][3]. You can also clone this dashboard, customize it to your needs, and use any [RUM performance metrics](#all-performance-metrics) in the dashboard's query.
- A performance waterfall, accessible for every RUM view event in the [RUM Explorer][4], which enables you to troubleshoot the performance of a specific page view. It displays how your website assets and resources, long tasks, and frontend errors affect the page-level performance for your end users.

## Event timings and core web vitals

<div class="alert alert-warning">
  Datadog's Core Web Vitals metrics are available from the <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> package v2.2.0+.
</div>

[Google's Core Web Vitals][5] are a set of three metrics designed to monitor a site's user experience. These metrics focus on giving you a view of load performance, interactivity, and visual stability. Each metric comes with guidance on the range of values that translate to good user experience. Datadog recommends monitoring the 75th percentile for these metrics.

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Core Web Vitals summary visualization" >}}

- First Input Delay and Largest Contentful Paint are not collected for pages opened in the background (for example, in a new tab or a window without focus).
- Metrics collected from your real users' pageviews may differ from those calculated for pages loaded in a fixed, controlled environment such as a [Synthetic browser test][6]. Synthetic Monitoring displays Largest Contentful Paint and Cumulative Layout Shift as lab metrics, not real metrics.

| Metric                   | Focus            | Description                                                                                           | Target value |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][7] | Load performance | Moment in the page load timeline in which the largest DOM object in the viewport (as in, visible on screen) is rendered.         | <2.5s       |
| [First Input Delay][8]        | Interactivity    | Time elapsed between a user's first interaction with the page and the browser's response.             | <100ms      |
| [Cumulative Layout Shift][9]  | Visual stability | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means that no shifts are happening. | <0.1        |
| [Interaction To Next Paint][19]| Interactivity    | Longest duration between a user's interaction with the page and the next paint. Requires RUM SDK v5.1.0. | <200ms        |

### Core web vitals target elements

Identifying what element triggered a high Core Web Vitals metric is the first step in understanding the root cause and being able to improve performance.
RUM reports the element that is associated with each Core Web Vital instance:

- For Largest Contentful Paint, RUM reports the CSS Selector of the element corresponding to the largest contentful paint.
- For Interaction to Next Paint, RUM reports the CSS selector of the element associated with the longest interaction to the next paint.
- For First Input Delay, RUM reports the CSS selector of the first element the user interacted with.
- For Cumulative Layout Shift, RUM reports the CSS selector of the most shifted element contributing to the CLS.

## All performance metrics

| Attribute                       | Type        | Description                                                                                                                                                                                                                      |
|---------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.first_byte`               | number (ns) | Time elapsed until the first byte of the view has been received.                                                                                                |
| `view.largest_contentful_paint` | number (ns) | The moment in the page load timeline when the largest DOM object in the viewport renders and is visible on screen.                                                                                                               |
| `view.largest_contentful_paint_target_selector` | string (CSS selector) | CSS Selector of the element corresponding to the largest contentful paint.                                                                                     |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user's first interaction with the page and the browser's response.                                                                                                                                        |
| `view.first_input_delay_target_selector`      | string (CSS selector) | CSS selector of the first element the user interacted with.                                                                                                                |
| `view.interaction_to_next_paint`| number (ns) | Longest duration between a user's interaction with the page and the next paint.                                                                                                                              |
| `view.interaction_to_next_paint_target_selector`| string (CSS selector) | CSS selector of the element associated with the longest interaction to the next paint.                                                                                                          |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts are happening.                                                                                      |
| `view.cumulative_layout_shift_target_selector`  | string (CSS selector) | CSS selector of the most shifted element contributing to the page CLS.                                           |
| `view.loading_time`             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently happening. For more information, see [Monitoring Page Performance][10].                                                                          |
| `view.first_contentful_paint`   | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][11].                                         |
| `view.dom_interactive`          | number (ns) | The moment when the parser finishes its work on the main document. For more information, see the [MDN documentation][12].                                                                                                        |
| `view.dom_content_loaded`       | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. For more information, see the [MDN documentation][13]. |
| `view.dom_complete`             | number (ns) | The page and all the sub-resources are ready. For the user, the loading spinner has stopped spinning. For more information, see the [MDN documentation][14].                                                                     |
| `view.load_event`               | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. For more information, see the [MDN documentation][15].                                                                            |
| `view.error.count`              | number      | Count of all errors collected for this view.                                                                                                                                                                                     |
| `view.long_task.count`          | number      | Count of all long tasks collected for this view.                                                                                                                                                                                 |
| `view.resource.count`           | number      | Count of all resources collected for this view.                                                                                                                                                                                  |
| `view.action.count`             | number      | Count of all actions collected for this view.                                                                                                                                                                                    |

## Monitoring single page applications (SPA)

For single page applications (SPAs), the RUM Browser SDK differentiates between `initial_load` and `route_change` navigation with the `loading_type` attribute. If an interaction on your web page leads to a different URL without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks URL changes using the [History API][16].

Datadog provides a unique performance metric, `loading_time`, which calculates the time needed for a page to load. This metric works for both `initial_load` and `route_change` navigation.

### How loading time is calculated

To account for modern web applications, loading time watches for network requests and DOM mutations.

- **Initial Load**: Loading Time is equal to _whichever is longer_:

  - The difference between `navigationStart` and `loadEventEnd`, or
  - The difference between `navigationStart` and the first time the page has no activity. Read [How page activity is calculated](#how-page-activity-is-calculated) for details.

- **SPA Route Change**: Loading Time is equal to the difference between the URL change and the first time the page has no activity. Read [How page activity is calculated](#how-page-activity-is-calculated) for details.

### How page activity is calculated

The RUM Browser SDK tracks the page activity to estimate the time until the interface is stable again. The page is considered to have activity when:

- `xhr` or `fetch` requests are in progress.
- The browser emits performance resource timing entries (loading end of JS, CSS, etc.).
- The browser emits DOM mutations.

The page activity is considered to have ended when it hasn't had any activity for 100ms.

**Note**: Only activity occurring after the SDK initialization is taken into account.

**Caveats:**

The criteria of 100ms since last request or DOM mutation might not be an accurate determination of activity in the following scenarios:

- The application collects analytics by sending requests to an API periodically or after every click.
- The application uses "[comet][17]" techniques (that is, streaming or long polling), and the request stays on hold for an indefinite time.

To improve the accuracy of activity determination in these cases, specify `excludedActivityUrls`, a list of resources for the RUM Browser SDK to exclude when computing the page activity:

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

### Hash SPA navigation

The RUM SDK automatically monitors frameworks that rely on hash (`#`) navigation. The SDK watches for `HashChangeEvent` and issues a new view. Events coming from an HTML anchor tag which do not affect the current view context are ignored.

## Add your own performance timing

On top of RUM's default performance timing, you may measure where your application is spending its time with greater flexibility. The `addTiming` API provides you with a simple way to add extra performance timing.

For example, you can add a timing when your hero image has appeared:

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
    //Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);
    window.DD_RUM.addTiming('first_scroll');
});
```

Once the timing is sent, the timing is accessible in nanoseconds as `@view.custom_timings.<timing_name>`, for example: `@view.custom_timings.first_scroll`. You must [create a measure][18] before creating a visualization in the RUM Explorer or in your dashboards.

For single-page applications, the `addTiming` API issues a timing relative to the start of the current RUM view. For example, if a user lands on your application (initial load), then goes on a different page after 5 seconds (route change) and finally triggers `addTiming` after 8 seconds, the timing is equal to `8-5 = 3` seconds.

If you are using an asynchronous setup, you can provide your own timing (as a UNIX epoch timestamp) as a second parameter.

For example:

```javascript
document.addEventListener("scroll", function handler() {
    //Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);

    const timing = Date.now()
    window.DD_RUM.onReady(function() {
      window.DD_RUM.addTiming('first_scroll', timing);
    });
});

```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/platform/dashboards/
[2]: /real_user_monitoring/browser/data_collected/#default-attributes
[3]: /real_user_monitoring/platform/dashboards/performance
[4]: /real_user_monitoring/explorer/
[5]: https://web.dev/vitals/
[6]: /synthetics/browser_tests/
[7]: https://web.dev/lcp/
[8]: https://web.dev/fid/
[9]: https://web.dev/cls/
[10]: /real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[11]: https://www.w3.org/TR/paint-timing/#sec-terminology
[12]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/History
[17]: https://en.wikipedia.org/wiki/Comet_&#40;programming&#41;
[18]: /real_user_monitoring/explorer/search/#setup-facets-and-measures
[19]: https://web.dev/inp/
