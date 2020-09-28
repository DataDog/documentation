---
title: RUM Browser Data Collected
kind: documentation
aliases:
  - /real_user_monitoring/data_collected/
  - /real_user_monitoring/data_collected/view/
  - /real_user_monitoring/data_collected/resource/
  - /real_user_monitoring/data_collected/long_task/
  - /real_user_monitoring/data_collected/error/
  - /real_user_monitoring/data_collected/user_action/
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
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

By default, all data collected is kept at full granularity for 15 days. The Datadog Real User Monitoring script sends five main types of events to Datadog:

- [View][1]: Each time a user goes on a page of the setup application, a view event is created. While the user remains on that view, all data collected is attached to that view with the `view.id` attribute.
- [Resource][2]: A resource event can be generated for images, XHR/Fetch, CSS, or JS libraries. It contains information about the resource, like its name and its associated loading duration.
- [Long task][3]: Any task in a browser that blocks the main thread for more than 50ms is considered a long task and gets a specific event generation.
- [Error][4]: Every time a frontend error is emitted by the browser, RUM catches it and sends it as an Error Event to Datadog.
- [User Action][5]: A User Action event is a custom event that can be generated for a given user action.

{{< tabs >}}
{{% tab "View" %}}

A page view represents a user visiting a page from your website. During that page view, [errors][1], [resources][2], [long tasks][3], and [user actions][4] get attached to that page view with a unique `view.id` attribute. Note that a page view gets updated as new events are collected.

For page views, loading performance metrics are collected from both the [Paint Timing API][5] and the [Navigation Timing API][6].

## Single Page Applications

For Single Page Applications (SPAs), the RUM SDK differentiates between `initial_load` and `route_change` navigations with the `loading_type` attribute. If a click on your web page leads to a new page without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks page changes using the [History API][7].

Datadog provides a unique performance metric, `loading_time`, which calculates the time needed for a page to load. This metric works both for `initial_load` and `route_change` navigations.

### How is loading time calculated?
To account for modern web applications, loading time watches for network requests and DOM mutations.

* **Initial Load**: Loading Time is equal to *whichever is longer*:

    - The difference between `navigationStart` and `loadEventEnd`.
    - Or the difference between `navigationStart` and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests or a DOM mutation).

* **SPA Route Change**: Loading Time is equal to the difference between the user click and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests, or a DOM mutation).

### Hash SPA navigation

Frameworks relying on hash (`#`) navigation are monitored with the RUM SDK automatically. The SDK watches for `HashChangeEvent` and issues a new view. Events coming from an HTML anchor tag which do not affect the current view context are ignored.

## Metrics collected

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Timing overview"  >}}

| Attribute                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.loading_time`                             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info from the data collected documentation][8]|
| `view.measures.first_contentful_paint` | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3 definition][9].                                                                                            |
| `view.measures.dom_interactive`        | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][10]                                                                                                               |
| `view.measures.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][11]. |
| `view.measures.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][12]                                                                             |
| `view.measures.load_event_end`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][13]                                                                                   |
| `view.measures.error_count`            | number      | Count of all errors collected so far for this view.                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.measures.resource_count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.measures.user_action_count`      | number      | Count of all user actions collected for this view.                                                                                     

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
{{% /tab %}}
{{% tab "Resource" %}}

All of your website’s resources are collected by default: images, XHRs, [XMLHttpRequest][1], CSS files, JS assets, and font files.

Detailed network timing data for the loading of an application’s resources are collected with the [Performance Resource Timing API][2].

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="Resource Metrics"  >}}

## Measure Collected

| Attribute                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number         | Entire time spent loading the resource.                                                                                                   |
| `network.bytes_written`                | number (bytes) | Resource size.                                                                                                                            |
| `http.performance.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart)                                                            |
| `http.performance.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear (connectEnd - secureConnectionStart) |
| `http.performance.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart)                                               |
| `http.performance.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart)                                                                      |
| `http.performance.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart)                                           |
| `http.performance.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart)                                                                         |

## Facet Collected

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.kind`                | string | The kind or type of resource being collected (ex: CSS, JS, media, XHR, image)           |
| `http.status_code`             | number | The response status code.                                                               |
| `http.url`                     | string | The resource URL.                                                                       |
| `http.url_details.host`        | string | The HTTP host part of the URL.                                                          |
| `http.url_details.path`        | string | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | string | The protocol name of the URL (HTTP or HTTPS)                                            |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
{{% /tab %}}
{{% tab "Long Task" %}}

[Long tasks][1] are tasks that block the main thread for 50 milliseconds or more. They may cause high input latency, delayed time to interaction, etc. Understand what causes these long tasks in your browser performance profiler.

## Measure Collected

| Attribute  | Type   | Description                |
|------------|--------|----------------------------|
| `duration` | number | Duration of the long task. |


[1]: https://developer.mozilla.org/en-US/docs/Web/API/Long_Tasks_API
{{% /tab %}}
{{% tab "Error" %}}

Front-end errors are collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

## Error Origins
Front-end errors are split in 3 different categories depending on their `error.origin`:

- **network**: XHR or Fetch errors resulting from AJAX requests. Specific attributes to network errors can be found [in the documentation][1].
- **source**: Unhandled exceptions or unhandled promise rejections (source-code related).
- **console**: `console.error()` API calls.

## Facet Collected

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.origin`  | string | Where the error originates from (for example, the console or network).     |
| `error.kind`    | string | The error type or kind (or code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |

### Network errors

Network errors include information about failing HTTP requests. The following facets are also collected:

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | number | The response status code.                                                               |
| `http.url`                     | string | The resource URL.                                                                       |
| `http.url_details.host`        | string | The HTTP host part of the URL.                                                          |
| `http.url_details.path`        | string | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | string | The protocol name of the URL (HTTP or HTTPS)                                            |

### Source errors

Source errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][2].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | string | The error type or kind (or code in some cases).                   |

[1]: /real_user_monitoring/data_collected/error/#network-errors
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
{{% /tab %}}
{{% tab "User Action" %}}

## Automatic Collection of User Actions
Real User Monitoring (RUM) SDKs detect user interactions performed during a user journey. Set the `trackInteractions` [initialization parameter][1] to `true` to enable this feature.

**Note**:  The `trackInteractions` initialization parameter enables the collection of user clicks in your application. **Sensitive and private data** contained on your pages may be included to identify the elements interacted with.

Once an interaction is detected, all new RUM events are attached to the ongoing user action until it is considered finished. The user action also benefits from its parent view attributes such as browser information, geolocation data, [global context][2].

### How is the User Action duration calculated?
Once an interaction is detected, the RUM SDK watches for network requests an DOM mutations. It is considered finished once the page has no activity for more than 100ms (activity being defined as ongoing network requests or DOM mutations).

## Custom User Actions
Custom User Actions are User Actions declared and sent manually via the [`addUserAction` API][3]. They can send information relative to an event occurring during a user journey, for example, a custom timing or customer cart information.

## Measures Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `duration` | number (ns) | The length of the user action. See how it is calculated in the [User Action documentation][4]. |
| `user_action.measures.long_task_count`        | number      | Count of all long tasks collected for this user action. |
| `user_action.measures.resource_count`         | number      | Count of all resources collected for this user action. |
| `user_action.measures.user_action_count`      | number      | Count of all user actions collected for this user action.|

## Facet Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `user_action.id` | string | UUID of the user action. |
| `user_action.type` | string | Type of the user action. For [Custom User Actions][5], it is set to `custom`. |
| `event.name` | string | Name of the user action. For automatically collected User Actions, the element which the user interacted with. |


[1]: /real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#custom-user-actions
[4]: /real_user_monitoring/data_collected/user_action#how-is-the-user-action-duration-calculated
[5]: /real_user_monitoring/data_collected/user_action#custom-user-actions
{{% /tab %}}
{{< /tabs >}}

## Default attributes

These five event categories have attributes attached by default:

### Core

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `application_id` | string | The Datadog application ID. |
| `session_id`     | string | The session ID.             |

### View Attribute

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | string | Randomly generated ID for each page view.                                                                      |
| `view.url`                     | string | The view URL.                                                                                                  |
| `view.loading_type`                     | string | The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs][6].|
| `view.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed.               |
| `view.url_details.host`        | string | The HTTP host part of the URL.                                                                                 |
| `view.url_details.path`        | string | The HTTP path part of the URL.                                                                                 |
| `view.url_details.path_group`  | string | Automatic URL group generated for similar URLs. (ex: `/dashboard/?` For `/dashboard/123` and `/dashboard/456`) |
| `view.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes.                        |

### User Agent

The following contexts—following the [Datadog Standard Attributes][7] logic—are attached automatically to all events sent to Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `http.useragent_details.os.family`       | string | The OS family reported by the User-Agent.       |
| `http.useragent_details.browser.family`  | string | The browser Family reported by the User-Agent.  |
| `http.useragent_details.device.family`   | string | The device family reported by the User-Agent.   |
| `http.useragent_details.device.category` | string | The device category reported by the User-Agent. |

### Geolocation

The following attributes are related to the geolocation of IP addresses used in network communication. All fields are prefixed by `network.client.geoip` or `network.destination.geoip`.

| Fullname                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `network.client.geoip.country.name`         | string | Name of the country                                                                                                                  |
| `network.client.geoip.country.iso_code`     | string | [ISO Code][8] of the country (example: `US` for the United States, `FR` for France)                                                  |
| `network.client.geoip.continent.code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | string | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` department in France) |
| `network.client.geoip.subdivision.iso_code` | string | [ISO Code][8] of the first subdivision level of the country (example: `CA` in the United States or the `SA` department in France)    |
| `network.client.geoip.city.name`            | string | The name of the city (example `Paris`, `New York`)                                                                                   |

## Extra Attribute

In addition to default attributes, add [specific global context][1] to all events collected. This provides the ability to analyze the data for a subset of users. For example, group errors by user email, or understand which customers have the worst performance.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /real_user_monitoring/browser/advanced_configuration/
[2]: /real_user_monitoring/browser/data_collected/?tab=resource
[3]: /real_user_monitoring/browser/data_collected/?tab=longtask
[4]: /real_user_monitoring/browser/data_collected/?tab=error
[5]: /real_user_monitoring/browser/data_collected/?tab=useraction
[6]: /real_user_monitoring/data_collected/view#single-page-applications
[7]: /logs/processing/attributes_naming_convention/
[8]: /logs/processing/attributes_naming_convention/#user-agent-attributes
