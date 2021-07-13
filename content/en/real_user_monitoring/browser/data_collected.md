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
- link: "/real_user_monitoring/browser/modifying_data_and_context"
  tag: "Documentation"
  text: "Modifying RUM data and adding context"
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

The RUM SDK generates events that have associated metrics and attributes. Every RUM event has all of the [default attributes](#default-attributes), for example, the URL of the page (`view.url`) and user information such as their device type (`device.type`) and their country (`geo.country`). 

There are additional [metrics and attributes that are specific to a given event type](#event-specific-metrics-and-attributes). For example, the metric `view.loading_time` is associated with "view" events and the attribute `resource.method` is associated with "resource" events. 

This page provides descriptions of each of the metrics and attributes collected. For guidance on what you can do with this data, see:
- [Modifying Data and Context][1]
- [Monitoring Page Performance][2]
- [Monitoring Resource Performance][3]
- [Collecting Browser Errors][4]
- [Tracking User Actions][5]

## Default attributes

Each of these event types has the following attributes attached by default, so you can use them regardless of the RUM event type being queried.

### Core

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `type`     | string | The type of the event (for example, `view` or `resource`).             |
| `application.id` | string | The Datadog application ID. |

### View attributes

RUM action, error, resource and long task events contain information about the active RUM view event at the time of collection:

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | string | Randomly generated ID for each page view.                                                                      |
| `view.loading_type`                     | string | The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs][6].|
| `view.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed.               |
| `view.url`                     | string | The view URL.                                                                                                  |
| `view.url_hash`                     | string | The hash part of the URL.|
| `view.url_host`        | string | The host part of the URL.                                                                                |
| `view.url_path`        | string | The path part of the URL.                                                                                 |
| `view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes.                        |
| `view.url_scheme` | object | The scheme part of the URL.                        |

### Device

The following device-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `device.type`       | string | The device type as reported by the device (User-Agent HTTP header)      |
| `device.brand`  | string | The device brand as reported by the device (User-Agent HTTP header)  |
| `device.model`   | string | The device model as reported by the device (User-Agent HTTP header)   |
| `device.name` | string | The device name as reported by the device (User-Agent HTTP header) |

### Operating system

The following OS-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | string | The OS name as reported by the by the device (User-Agent HTTP header)       |
| `os.version`  | string | The OS version as reported by the by the device (User-Agent HTTP header)  |
| `os.version_major`   | string | The OS version major as reported by the by the device (User-Agent HTTP header)   |

### Geolocation

The following attributes are related to the geolocation of IP addresses:

| Fullname                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | string | Name of the country                                                                                                                  |
| `geo.country_iso_code`     | string | [ISO Code][7] of the country (for example, `US` for the United States, `FR` for France).                                                  |
| `geo.country_subdivision`     | string | Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France). |
| `geo.country_subdivision_iso_code` | string | [ISO Code][7] of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France).    |
| `geo.continent_code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                 |
| `geo.continent`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`).                    |
| `geo.city`            | string | The name of the city (example `Paris`, `New York`).                                                                                   |

**Note**: By default, Datadog stores the client IP address. If you want to stop collecting IP addresses, [contact Support][8]. This does not impact the collection of geolocation attributes listed above. 

### User attributes

In addition to default attributes, you can add user-related data to all RUM event types by [identifying user sessions][9]. This lets you follow the journey of a given user, figure out which users are the most impacted by errors, and monitor performance for your most important users.

## Event-specific metrics and attributes

The RUM SDK generates six types of events:

| Event Type     | Retention | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 days   | A user session begins when a user starts browsing the web application. It contains high-level information about the user (browser, device, geolocation). It aggregates all RUM events collected during the user journey with a unique `session.id` attribute. |
| View      | 30 days   | A view event is generated each time a user visits a page of the web application. While the user remains on the same page, resource, long-task, error and action events are linked to the related RUM view with the `view.id` attribute.                       |
| Resource  | 15 days   | A resource event is generated for images, XHR, Fetch, CSS, or JS libraries loaded on a webpage. It includes detailed loading timing information.                                                                                                              |
| Long Task | 15 days   | A long task event is generated for any task in the browser that blocks the main thread for more than 50ms.                                                                                                                                                    |
| Error     | 30 days   | RUM collects every frontend error emitted by the browser.                                                                                                                                                                                                     |
| Action    | 30 days   | RUM action events track user interactions during a user journey and can also be manually sent to monitor custom user actions.                                                                                                                                 |

The following diagram illustrates the RUM event hierarchy:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;border:none" >}}


### Session metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `session.time_spent` | number (ns) | Duration of the user session. |
| `session.view.count`        | number      | Count of all views collected for this session. |
| `session.error.count`      | number      | Count of all errors collected for this session.  |
| `session.resource.count`         | number      | Count of all resources collected for this session. |
| `session.action.count`      | number      | Count of all actions collected for this session. |
| `session.long_task.count`      | number      | Count of all long tasks collected for this session. |

### Session attributes

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `session.id`                      | string | Randomly generated ID for each session.                                                                      |
| `session.ip`                      | string | Client ip address. If you want to stop collecting this attribute, [contact Support][8].                                                                       |
| `session.type`                     | string | The type of session: `user` or `synthetics`. Sessions from [Synthetic Monitoring Browser Tests][10] are excluded from billing. |
| `session.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed. |
| `session.initial_view.id`        | string | The id of the first RUM view generated by the user. |
| `session.initial_view.url_host`        | string | The host part of the URL. |
| `session.initial_view.url_path`        | string | The path part of the URL. |
| `session.initial_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.initial_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.initial_view.url_scheme` | object | The scheme part of the URL. |
| `session.last_view.id`        | string | The id of the last RUM view generated by the user. |
| `session.last_view.url_host`        | string | The host part of the URL. |
| `session.last_view.url_path`        | string | The path part of the URL. |
| `session.last_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.last_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.last_view.url_scheme` | object | The scheme part of the URL. |

### View timing metrics 


| Attribute                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | number (ns) | Time spent on the current view.                                                                                                                                                                                       |
| `view.largest_contentful_paint` | number (ns) | Moment in the page load timeline in which the largest DOM object in the viewport (i.e. visible on screen) is rendered.                                                                                                |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user’s first interaction with the page and the browser’s response.                                                                                                                             |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts happening.                                                                               |
| `view.loading_time`             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info][11].                                                                             |
| `view.first_contentful_paint`   | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][12].                               |
| `view.dom_interactive`          | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][13]                                                                                                         |
| `view.dom_content_loaded`       | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][14]. |
| `view.dom_complete`             | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][15]                                                                       |
| `view.load_event`               | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][16]                                                                             |
| `view.error.count`              | number      | Count of all errors collected for this view.                                                                                                                                                                          |
| `view.long_task.count`          | number      | Count of all long tasks collected for this view.                                                                                                                                                                      |
| `view.resource.count`           | number      | Count of all resources collected for this view.                                                                                                                                                                       |
| `view.action.count`             | number      | Count of all actions collected for this view.                                                                                                                                                                         |

### Resource timing metrics

Detailed network timing data for the loading of an application’s resources are collected with the [Performance Resource Timing API][17].

| Metric                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number         | Entire time spent loading the resource.                                                                                                   |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                            |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart)                                                            |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear (connectEnd - secureConnectionStart) |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart)                                               |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart)                                                                      |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart)                                           |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart)                                                                         |

### Resource attributes

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | string | The type of resource being collected (for example, `css`, `javascript`, `media`, `XHR`, `image`).           |
| `resource.method`                | string | The HTTP method (for example `POST`, `GET`).           |
| `resource.status_code`             | number | The response status code.                                                               |
| `resource.url`                     | string | The resource URL.                                                                       |
| `resource.url_host`        | string | The host part of the URL.                                                          |
| `resource.url_path`        | string | The path part of the URL.                                                          |
| `resource.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `resource.url_scheme`      | string | The protocol name of the URL (HTTP or HTTPS).                                            |
| `resource.provider.name`      | string | The resource provider name. Default is `unknown`.                                            |
| `resource.provider.domain`      | string | The resource provider domain.                                            |
| `resource.provider.type`      | string | The resource provider type (for example `first-party`, `cdn`, `ad`, `analytics`).                                            |


### Long task timing metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | number | Duration of the long task. |


### Error attributes

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | string | Where the error originates from (for example, `console` or `network`).     |
| `error.type`    | string | The error type (or error code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |

#### Network errors

Network errors include information about failing HTTP requests. The following facets are also collected:

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `error.resource.status_code`             | number | The response status code.                                                               |
| `error.resource.method`                | string | The HTTP method (for example `POST`, `GET`).           |
| `error.resource.url`                     | string | The resource URL.                                                                       |
| `error.resource.url_host`        | string | The host part of the URL.                                                          |
| `error.resource.url_path`        | string | The path part of the URL.                                                          |
| `error.resource.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `error.resource.url_scheme`      | string | The protocol name of the URL (HTTP or HTTPS).                                            |
| `error.resource.provider.name`      | string | The resource provider name. Default is `unknown`.                                            |
| `error.resource.provider.domain`      | string | The resource provider domain.                                            |
| `error.resource.provider.type`      | string | The resource provider type (for example `first-party`, `cdn`, `ad`, `analytics`).                                            |

#### Source errors

Source errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][18].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | string | The error type (or error code in some cases).                   |



### Action timing metrics

| Metric    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action. See how it is calculated in the [User Action documentation][19]. |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

### Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action. For [Custom User Actions][20], it is set to `custom`. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions |
| `action.name` | string | User-friendly name created (for example `Click on #checkout`). For [Custom User Actions][20], the action name given in the API call. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/modifying_data_and_context/
[2]: /real_user_monitoring/browser/monitoring_page_performance/
[3]: /real_user_monitoring/browser/monitoring_resource_performance/
[4]: /real_user_monitoring/browser/collecting_browser_errors/
[5]: /real_user_monitoring/browser/tracking_user_actions/
[6]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[7]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[8]: /help/
[9]: /real_user_monitoring/browser/modifying_data_and_context/#identify-user-sessions
[10]: /synthetics/browser_tests/
[11]: /real_user_monitoring/browser/monitoring_page_performance/#how-is-loading-time-calculated
[12]: https://www.w3.org/TR/paint-timing/#sec-terminology
[13]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[16]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[17]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[18]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[19]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#how-action-loading-time-is-calculated
[20]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions
