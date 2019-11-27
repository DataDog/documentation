---
title: Real User Monitoring
kind: documentation
description: "Visualize and analyze the performance of your front end applications as seen by your users."
disable_toc: true
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/rum_explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

## What is Real User Monitoring?

Datadog Real User Monitoring (RUM) enables you to visualize and analyze the performance of your front end applications as seen by your users. It follows the latency from the frontend to the backend using advanced visualizations. The `datadog-browser-agent` library supports all modern desktop and mobile browsers. Resources collection is limited on IE10 and IE11.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/real_user_monitoring/setup">}}<u>Setup</u>: Setup Real User Monitoring over your application.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/rum_explorer/">}}<u>Views Explorer</u>: Discover the Views Explorer page, how to add Facets and Measures.{{< /nextlink >}}
  {{< nextlink href="/real_user_monitoring/rum_analytics">}}<u>RUM Analytics</u>: Perform RUM Analytics over all your events.{{< /nextlink >}}
{{< /whatsnext >}}

## Data collected

By default, all data collected is kept at full granularity for 15 days. The Datadog Real User Monitoring script sends 5 main types of events to Datadog:

| Event Category | Description                                                                                                                                                                                                                                                                                |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| View           | Each time a user goes on a page of the setup application, a view event is created. While the user remains on that view, all data collected is attached to that view with the `view.id` attribute .                                                                                         |
| Resource       | A resource event can be generated for images, XHR/Fetch, CSS, or JS libraries. It contains information about the resource, like its name and its associated loading duration.                                                                                                                  |
| Long task      | Any task in a browser that blocks the main thread for more than 50ms is considered a long task and gets a specific event generation. This causes input latency, event handling latency, etc. Only available in Chrome and Opera. See the [Long Task MDN documentation][1] for more information. |
| Error          | Every time an error is logged in the browser console, RUM catches it and sends it as an Error Event to Datadog.                                                                                                                                                                               |
| User Action    | A User Action event is a custom event that can be generated for a given user action.                                                                                                                                                                                                       |

The following contexts—following the [Datadog Standard Attributes][2] logic—are attached automatically to all events sent to Datadog:

* [HTTP Requests][3]
* [URL details][4]
* [Geolocation][5]
* [User-Agent][6]
* `sessionId`	The ID corresponding to the session of your user.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
[2]: /logs/processing/attributes_naming_convention
[3]: /logs/processing/attributes_naming_convention/#http-requests
[4]: /logs/processing/attributes_naming_convention/#url-details-attributes
[5]: /logs/processing/attributes_naming_convention/#geolocation
[6]: /logs/processing/attributes_naming_convention/#user-agent-attributes
