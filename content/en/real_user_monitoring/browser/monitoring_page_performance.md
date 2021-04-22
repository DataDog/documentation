---
title: Monitoring Page Performance
kind: documentation
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "Explore your views within Datadog"
  - link: "/real_user_monitoring/explorer/analytics/"
    tag: "Documentation"
    text: "Build analytics upon your events"
  - link: "/real_user_monitoring/dashboards/"
    tag: "Documentation"
    text: "RUM Dashboards"
  - link: "https://www.datadoghq.com/blog/core-web-vitals-monitoring-datadog-rum-synthetics/"
    tag: "Blog"
    text: "Monitor Core Web Vitals with Datadog RUM and Synthetic Monitoring"
---

{{< img src="real_user_monitoring/browser/waterfall.png" alt="Real User Monitoring page load waterfall" style="width:75%;" >}}

## Performance metrics for views

RUM view events collect extensive performance metrics for every single page view. Datadog recommends analyzing the performance metrics in the following ways:
- **Dashboards**: provides you with a high-level view of your application's performance. For example, the out-of-the-box [Performance Overview dashboard][1] can be filtered on [default attributes][2] collected by RUM to surface issues impacting a subset of users. This dashboard can be cloned and customized to your specific needs. All [RUM performance metrics](#all-performance-metrics) can be used in dashboard queries.
- **RUM waterfall**: accessible for every single RUM view event in the [RUM Explorer][3], it lets you troubleshoot the performance of a specific page view. It shows how your website assets and resources, long tasks, and frontend errors affect performance for your end users, at the page level.

### Core Web Vitals
<div class="alert alert-warning"> 
  <strong>Note:</strong> The Core Web Vitals metrics are available in Datadog from <a href="https://github.com/DataDog/browser-sdk">@datadog/browser-rum</a> package version 2.0.0 and newer.
</div>
[Google's Core Web Vitals][4] are a set of three metrics designed to monitor a site's user experience. These metrics focus on giving you a view of load performance, interactivity, and visual stability. Each metric comes with guidance on the range of values that translate to good user experience. Datadog recommends monitoring the 75th percentile for these metrics.

{{< img src="real_user_monitoring/browser/core-web-vitals.png" alt="Core Web Vitals summary visualization"  >}}

| Metric                   | Focus            | Description                                                                                           | Target value |
|--------------------------|------------------|-------------------------------------------------------------------------------------------------------|--------------|
| [Largest Contentful Paint][5] | Load performance | Moment in the page load timeline in which the largest DOM object in the viewport (i.e. visible on screen) is rendered.         | <2.5s       |
| [First Input Delay][6]        | Interactivity    | Time elapsed between a user’s first interaction with the page and the browser’s response.             | <100ms      |
| [Cumulative Layout Shift][7]  | Visual stability | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts happening. | <0.1        |

**Note**: Metrics collected from your real users page views can differ from those calculated for pages loaded in a fixed environment like [Synthetics Browser tests][8].

### All performance metrics

| Attribute                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | number (ns) | Time spent on the current view.                                                                                                                                                                                       |
| `view.largest_contentful_paint` | number (ns) | Moment in the page load timeline in which the largest DOM object in the viewport (i.e. visible on screen) is rendered.                                                                                                |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user’s first interaction with the page and the browser’s response.                                                                                                                             |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts happening.                                                                               |
| `view.loading_time`             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info](#how-is-loading-time-calculated).                                                                             |
| `view.first_contentful_paint`   | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][9].                               |
| `view.dom_interactive`          | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][10]                                                                                                         |
| `view.dom_content_loaded`       | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][11]. |
| `view.dom_complete`             | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][12]                                                                       |
| `view.load_event`               | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][13]                                                                             |
| `view.error.count`              | number      | Count of all errors collected for this view.                                                                                                                                                                          |
| `view.long_task.count`          | number      | Count of all long tasks collected for this view.                                                                                                                                                                      |
| `view.resource.count`           | number      | Count of all resources collected for this view.                                                                                                                                                                       |
| `view.action.count`             | number      | Count of all actions collected for this view.                                                                                                                                                                         |

## Monitoring single page applications (SPA)

For single page applications (SPAs), the RUM SDK differentiates between `initial_load` and `route_change` navigation with the `loading_type` attribute. If a click on your web page leads to a new page without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks page changes using the [History API][14].

Datadog provides a unique performance metric, `loading_time`, which calculates the time needed for a page to load. This metric works for both `initial_load` and `route_change` navigation.

### How is loading time calculated?

To account for modern web applications, loading time watches for network requests and DOM mutations.

- **Initial Load**: Loading Time is equal to _whichever is longer_:

  - The difference between `navigationStart` and `loadEventEnd`.
  - Or the difference between `navigationStart` and the first time the page has no activity for more than 100ms (activity defined as ongoing network requests or a DOM mutation).

- **SPA Route Change**: Loading Time is equal to the difference between the user click and the first time the page has no activity for more than 100ms (activity defined as ongoing network requests or a DOM mutation).

### Hash SPA navigation

The RUM SDK automatically monitors frameworks that rely on hash (`#`) navigation. The SDK watches for `HashChangeEvent` and issues a new view. Events coming from an HTML anchor tag which do not affect the current view context are ignored.

## Add your own performance timing
On top of RUM's default performance timing, you may measure where your application is spending its time with greater flexibility. The `addTiming` API provides you with a simple way to add extra performance timing. For example, you can add a timing when your hero image has appeared:

```html
<html>
  <body>
    <img onload="DD_RUM.addTiming('hero_image')" src="/path/to/img.png" />
  </body>
</html>
```

Or when users first scroll:

```javascript
document.addEventListener("scroll", function handler() {
    //Remove the event listener so that it only triggers once
    document.removeEventListener("scroll", handler);
    DD_RUM.addTiming('first_scroll');
});
```

Once the timing is sent, the timing will be accessible as `@view.custom_timings.<timing_name>` (For example, `@view.custom_timings.first_scroll`). You must [create a measure][15] before graphing it in RUM analytics or in dashboards.

**Note**: For Single Page Applications, the `addTiming` API issues a timing relative to the start of the current RUM view. For example, if a user lands on your application (initial load), then goes on a different page after 5 seconds (route change) and finally triggers `addTiming` after 8 seconds, the timing will equal 8-5 = 3 seconds.
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/dashboards/performance_overview_dashboard
[2]: /real_user_monitoring/browser/data_collected/#default-attributes
[3]: /real_user_monitoring/explorer/
[4]: https://web.dev/vitals/
[5]: https://web.dev/lcp/
[6]: https://web.dev/fid/
[7]: https://web.dev/cls/
[8]: /synthetics/browser_tests/
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/History
[15]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
