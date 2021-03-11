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
---

When a user visits a page on your website, a new **RUM view event** is created. The view contains live page load and performance metrics. Performance metrics are sent to Datadog periodically as the page finishes loading and might be empty for a few seconds before they appear in the Datadog UI.

## Identifying performance bottlenecks

To find what's causing a page to under-perform:

1. Set up and configure [RUM Browser monitoring][1] for your application.
2. From the RUM Applications page, open the [Performance Overview dashboard][2]. It provides you with a high-level view of your monitored pages. Apply filters to narrow your search and uncover performance problems.
3. When you find a page with problem, dive from the overview dashboard quickly into a RUM view that exemplifies the problem by clicking **View RUM events** to open it in the [RUM Explorer][3], and then clicking a specific user view. The waterfall in the side panel shows performance details, such as load times for resources, that will help you troubleshoot the bottleneck or other issue.
    {{< img src="real_user_monitoring/browser/rum-page-performance-dive.gif" alt="Diving from Performance Overview dashboard to performance details for a particular view with an issue"  >}}

## Performance metrics for views

Performance metrics are collected for each individual view. These metrics can pinpoint exactly where the problem is occurring when used with the RUM context collected by default (current page view information, GeoIP data, browser information, etc.) and extended with [Global Context][4].

These performance metrics are key for helping you start your investigations:

- **Time To First Byte:** How long it takes the server to process the request. If the server is slow, try using APM to understand what's causing the slowness on the server-side.
- **First Contentful Paint:** How long until something is displayed. Check the RUM waterfall for blocking resources and long tasks preventing the browser from rendering content.
- **Loading Time:** How long until the page is interactive. Check the RUM waterfall to see if you're loading too many assets or if some resources are blocking the rendering.

## All performance metrics

For information about the default attributes for all RUM event types, see [Data Collected][5]. For information about configuring for sampling or global context see [Advanced Configuration][6]. The following table lists Datadog-specific metrics along with performance metrics collected from the [Navigation Timing API][7] and [Paint Timing API][8]:

| Attribute                              | Type        | Description                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.loading_time`                             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info](#how-is-loading-time-calculated).|
| `view.first_contentful_paint` | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3 definition][9].                                                                                            |
| `view.dom_interactive`        | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][10]                                                                                                               |
| `view.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][11]. |
| `view.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][12]                                                                             |
| `view.load_event`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][13]                                                                                   |
| `view.error.count`            | number      | Count of all errors collected for this view.                                                                                                                                                                        |
| `view.long_task.count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.resource.count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.action.count`      | number      | Count of all actions collected for this view.                                                                                     

## Monitoring single page applications

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

[1]: /real_user_monitoring/browser/
[2]: /real_user_monitoring/dashboards/performance_overview_dashboard
[3]: /real_user_monitoring/explorer/
[4]: /real_user_monitoring/browser/advanced_configuration/#add-global-context
[5]: /real_user_monitoring/browser/data_collected/#default-attributes
[6]: /real_user_monitoring/browser/advanced_configuration/
[7]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[8]: https://www.w3.org/TR/paint-timing/
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/History
[15]: /real_user_monitoring/explorer/?tab=measures#setup-facets-and-measures
