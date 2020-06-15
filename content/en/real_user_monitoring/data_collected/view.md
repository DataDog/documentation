---
title: RUM Views
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/dashboards/"
  tag: "Documentation"
  text: "Visualize your RUM data in out of the box Dashboards"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

A page view represents a user visiting a page from your website. During that page view, [errors][1], [resources][2], [long tasks][3], and [user actions][4] get attached to that page view with a unique `view.id` attribute. Note that a page view gets updated as new events are collected.

For page views, loading performance metrics are collected from both the [Paint Timing API][5] and the [Navigation Timing API][6].

## Single Page Applications

For Single Page Applications (SPAs), the RUM SDK differentiates between `initial_load` and `route_change` navigations with the `loading_type` attribute. If a click on your web page leads to a new page without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks page changes using the [History API][7].

Datadog provides a unique performance metric, `loading_time`, which calculates the time needed for a page to load. This metric works both for `initial_load` and `route_change` navigations.

### How is loading time calculated?
To account for modern web applications, loading time watches for network requests and DOM mutations.

* **Initial Load**: Loading Time is equal to *whichever is longer*:

    - The difference between `navigationStart` and `loadEventEnd`.
    - Or the difference between `navigationStart` and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests, or DOM mutations are currently occurring).

* **SPA Route Change**: Loading Time is equal to the difference between the user click and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests, or DOM mutations are currently occurring)

## Metrics collected

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Timing overview"  >}}

| Attribute                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.loading_time`                             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info from the data collected documentation][8]|
| `view.measures.first_contentful_paint` | number (ns) | Time when the browser first rendered any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3 definition][9].                                                                                            |
| `view.measures.dom_interactive`        | number (ns) | The moment when the parser finished its work on the main document. [More info from the MDN documentation][10]                                                                                                               |
| `view.measures.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document has been completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][11]. |
| `view.measures.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][12]                                                                             |
| `view.measures.load_event_end`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][13]                                                                                   |
| `view.measures.error_count`            | number      | Count of all errors collected so far for this view.                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.measures.resource_count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.measures.user_action_count`      | number      | Count of all user actions collected for this view.                                                                                                                                                                         |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/error/
[2]: /real_user_monitoring/data_collected/resource/
[3]: /real_user_monitoring/data_collected/long_task/
[4]: /real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: /real_user_monitoring/data_collected/view/#how-is-loading-time-calculated
[9]: https://www.w3.org/TR/paint-timing/#sec-terminology
[10]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
