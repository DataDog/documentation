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

A page view represents a user visiting a page from your website. During that page view, [errors][9], [resources][10], [long tasks][11], and [user actions][12] get attached to that page view with a unique `view.id` attribute. Note that a page view gets updated as new events are collected.

For page views, loading performance metrics are collected from both the [Paint Timing API][1] and the [Navigation Timing API][2].

For Single Page Applications (SPAs), performance metrics will only be available for the first accessed page. Modern web frameworks like ReactJS, AngularJS, or VueJS update a website’s content without reloading the page, preventing Datadog from collecting traditional performance metrics. RUM is able to track page changes using the [History API][3].

## Measures collected

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Timing overview" responsive="true" >}}

| Attribute                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.measures.first_contentful_paint` | number (ns) | Time when the browser first rendered any text, image (including background images), non-white canvas, or SVG.[Learn more][4]                                                                                                |
| `view.measures.dom_interactive`        | number (ns) | The moment when the parser finished its work on the main document. [More info from the MDN documentation][5]                                                                                                               |
| `view.measures.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document has been completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][6]. |
| `view.measures.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][7]                                                                             |
| `view.measures.load_event_end`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][8]                                                                                   |
| `view.measures.error_count`            | number      | Count of all errors collected so far for this view.                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.measures.resource_count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.measures.user_action_count`      | number      | Count of all user actions collected for this view.                                                                                                                                                                         |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.w3.org/TR/paint-timing/
[2]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[3]: https://developer.mozilla.org/en-US/docs/Web/API/History
[4]: https://www.w3.org/TR/paint-timing/#sec-terminology
[5]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[9]: /real_user_monitoring/data_collected/error/
[10]: https://docs.datadoghq.com/real_user_monitoring/data_collected/resource/
[11]: https://docs.datadoghq.com/real_user_monitoring/data_collected/long_task
[12]: https://docs.datadoghq.com/real_user_monitoring/data_collected/user_action
