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

- [View][4]: Each time a user goes on a page of the setup application, a view event is created. While the user remains on that view, all data collected is attached to that view with the `view.id` attribute.
- [Resource][5]: A resource event can be generated for images, XHR/Fetch, CSS, or JS libraries. It contains information about the resource, like its name and its associated loading duration.
- [Long task][6]: Any task in a browser that blocks the main thread for more than 50ms is considered a long task and gets a specific event generation.
- [Error][7]: Every time a frontend error is emitted by the browser, RUM catches it and sends it as an Error Event to Datadog.
- [User Action][8]: A User Action event is a custom event that can be generated for a given user action.

{{< tabs >}}
{{% tab "View" %}}

A page view represents a user visiting a page from your website. During that page view, [errors][1], [resources][2], [long tasks][3], and [user actions][4] get attached to that page view with a unique `view.id` attribute. Note that a page view gets updated as new events are collected.

For page views, loading performance metrics are collected from both the [Paint Timing API][5] and the [Navigation Timing API][6].

For Single Page Applications (SPAs), performance metrics will only be available for the first accessed page. Modern web frameworks like ReactJS, AngularJS, or VueJS update a website’s content without reloading the page, preventing Datadog from collecting traditional performance metrics. RUM is able to track page changes using the [History API][7].

## Measures collected

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Timing overview"  >}}

| Attribute                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.measures.first_contentful_paint` | number (ns) | Time when the browser first rendered any text, image (including background images), non-white canvas, or SVG. [Learn more.][8]                                                                                                |
| `view.measures.dom_interactive`        | number (ns) | The moment when the parser finished its work on the main document. [More info from the MDN documentation][9] .                                                                                                              |
| `view.measures.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document has been completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][10]. |
| `view.measures.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][11].                                                                             |
| `view.measures.load_event_end`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][12].                                                                                   |
| `view.measures.error_count`            | number      | Count of all errors collected so far for this view.                                                                                                                                                                        |
| `view.measures.long_task_count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.measures.resource_count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.measures.user_action_count`      | number      | Count of all user actions collected for this view.                                                                                                                                                                         |


[1]: /real_user_monitoring/data_collected/error/
[2]: /real_user_monitoring/data_collected/resource/
[3]: /real_user_monitoring/data_collected/long_task/
[4]: /real_user_monitoring/data_collected/user_action/
[5]: https://www.w3.org/TR/paint-timing/
[6]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[7]: https://developer.mozilla.org/en-US/docs/Web/API/History
[8]: https://www.w3.org/TR/paint-timing/#sec-terminology
[9]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[10]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[11]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
{{% /tab %}}
{{% tab "Resource" %}}

All of your website’s resources are collected by default: images, XHRs, [XMLHttpRequest][1], CSS files, JS assets, and font files.

Detailed network timing data regarding the loading of an application’s resources are being collected with the [Performance Resource Timing API][2].

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


All errors that appear in the user console are collected.

## Facet Collected

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | string | The error type or kind (or code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |
| `error.origin`  | string | Where the error originates from (i.e. console, network, etc.)          |

### Network Error

For network errors, the following facets are also collected:

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | number | The response status code.                                                               |
| `http.url`                     | string | The resource URL.                                                                       |
| `http.url_details.host`        | string | The HTTP host part of the URL.                                                          |
| `http.url_details.path`        | string | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | string | The protocol name of the URL (HTTP or HTTPS)                                            |

{{% /tab %}}
{{% tab "User Action" %}}

A custom user actions is a custom event generated for a given user action. [Add one by instrumenting your code][1].

## Facet Collected

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `event.name` | string | Name of the user action. |


[1]: /real_user_monitoring/installation/advanced_configuration/
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
| `view.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed.               |
| `view.url_details.host`        | string | The HTTP host part of the URL.                                                                                 |
| `view.url_details.path`        | string | The HTTP path part of the URL.                                                                                 |
| `view.url_details.path_group`  | string | Automatic URL group generated for similar URLs. (ex: `/dashboard/?` For `/dashboard/123` and `/dashboard/456`) |
| `view.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes.                        |

### User Agent

The following contexts—following the [Datadog Standard Attributes][1] logic—are attached automatically to all events sent to Datadog:

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
| `network.client.geoip.country.iso_code`     | string | [ISO Code][2] of the country (example: `US` for the United States, `FR` for France)                                                  |
| `network.client.geoip.continent.code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`)                                                                 |
| `network.client.geoip.continent.name`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`)                    |
| `network.client.geoip.subdivision.name`     | string | Name of the first subdivision level of the country (example: `California` in the United States or the `Sarthe` department in France) |
| `network.client.geoip.subdivision.iso_code` | string | [ISO Code][2] of the first subdivision level of the country (example: `CA` in the United States or the `SA` department in France)    |
| `network.client.geoip.city.name`            | string | The name of the city (example `Paris`, `New York`)                                                                                   |

## Extra Attribute

In addition to default attributes, you can add your [specific global context][3] to all events collected. This provides you the ability to analyze the data for a subset of users: group errors by user email, understand which customers have the worst performance, etc.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/processing/attributes_naming_convention/
[2]: /logs/processing/attributes_naming_convention/#user-agent-attributes
[3]: /real_user_monitoring/installation/advanced_configuration/
[4]: /real_user_monitoring/browser/data_collected/?tab=view
[5]: /real_user_monitoring/browser/data_collected/?tab=resource
[6]: /real_user_monitoring/browser/data_collected/?tab=longtask
[7]: /real_user_monitoring/browser/data_collected/?tab=error
[8]: /real_user_monitoring/browser/data_collected/?tab=useraction

