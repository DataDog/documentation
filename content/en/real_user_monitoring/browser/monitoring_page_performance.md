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

When a user visits a page on your website, a new RUM **view event** is created. While the user remains on that view, all collected data (errors, resources performance, long tasks, user actions) is attached to that view with the `view.id` attribute. Performance metrics are collected from both the [Paint Timing API][1] and the [Navigation Timing API][2]. View events are updated with new metrics and metadata as they become available in the end user’s browser.

By default, all data collected is kept at full granularity for 15 days.

To monitor a page's performance:

1. Ensure you've set up and configured [RUM Browser monitoring][3] for your application.
2. Optionally, add [custom user actions monitoring][4], [custom errors][5], or [global context][6] to the RUM data collected.
3. Watch for incoming data in [Dashboards][7] and the [RUM Explorer][8]. 
4. Filter by xxx and yyy to drill down into the specific information you want to investigate.

## Monitoring Single Page Applications

For Single Page Applications (SPAs), the RUM SDK differentiates between `initial_load` and `route_change` navigation with the `loading_type` attribute. If a click on your web page leads to a new page without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks page changes using the [History API][9].

Datadog provides a unique performance metric, `loading_time`, which calculates the time needed for a page to load. This metric works for both `initial_load` and `route_change` navigation.

### How is loading time calculated?

To account for modern web applications, loading time watches for network requests and DOM mutations.

- **Initial Load**: Loading Time is equal to _whichever is longer_:

  - The difference between `navigationStart` and `loadEventEnd`.
  - Or the difference between `navigationStart` and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests or a DOM mutation).

- **SPA Route Change**: Loading Time is equal to the difference between the user click and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests, or a DOM mutation).

### Hash SPA navigation

The RUM SDK automatically monitors frameworks that rely on hash (`#`) navigation. The SDK watches for `HashChangeEvent` and issues a new view. Events coming from an HTML anchor tag which do not affect the current view context are ignored.

## Performance metrics for views

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Timing overview"  >}}

For information about the default attributes for all RUM event types, see [Data Collected][10]. For information about configuring for sampling, global context, or custom user actions and custom errors, see [Advanced Configuration][11]. The following table lists the performance metrics available for page view events.

| Attribute                              | Type        | Description                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.loading_time`                             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info from the data collected documentation](#how-is-loading-time-calculated)|
| `view.measures.first_contentful_paint` | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3 definition][12].                                                                                            |
| `view.measures.dom_interactive`        | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][13]                                                                                                               |
| `view.measures.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][14]. |
| `view.measures.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][15]                                                                             |
| `view.measures.load_event_end`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][16]                                                                                   |
| `view.measures.error_count`            | number      | Count of all errors collected so far for this view.                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.measures.resource_count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.measures.user_action_count`      | number      | Count of all user actions collected for this view.                                                         

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.w3.org/TR/paint-timing/
[2]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[3]: /real_user_monitoring/browser/
[4]: /real_user_monitoring/guide/send-custom-user-actions/
[5]: /real_user_monitoring/browser/advanced_configuration/#custom-errors
[6]: /real_user_monitoring/browser/advanced_configuration/#add-global-context
[7]: /real_user_monitoring/dashboards
[8]: /real_user_monitoring/explorer
[9]: https://developer.mozilla.org/en-US/docs/Web/API/History
[10]: /real_user_monitoring/browser/data_collected/
[11]: /real_user_monitoring/browser/advanced_configuration/
[12]: https://www.w3.org/TR/paint-timing/#sec-terminology
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
