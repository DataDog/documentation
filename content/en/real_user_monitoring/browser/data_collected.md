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
  text: "Introducing Datadog Real User Monitoring"
- link: "/real_user_monitoring/browser/advanced_configuration"
  tag: "Documentation"
  text: "Modifying RUM data and adding context"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/explorer/visualize/"
  tag: "Documentation"
  text: "Apply visualizations on your events"
- link: "/logs/log_configuration/attributes_naming_convention"
  tag: "Documentation"
  text: "Datadog standard attributes"
---

## Overview

The RUM Browser SDK generates events that have associated metrics and attributes. Every RUM event has all of the [default attributes](#default-attributes), for example, the URL of the page (`view.url`) and user information such as their device type (`device.type`) and their country (`geo.country`).

There are additional [metrics and attributes specific to a given event type](#event-specific-metrics-and-attributes). For example, the `view.loading_time` metric is associated with view events, and the `resource.method` attribute is associated with resource events.

| Event Type     | Retention | Description                                                                                                                                                                                                                                                   |
|----------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Session   | 30 days   | A user session begins when a user starts browsing the web application. It contains high-level information about the user (browser, device, geo-location). It aggregates all RUM events collected during the user journey with a unique `session.id` attribute. **Note:** The session resets after 15 minutes of inactivity. |
| View      | 30 days   | A view event is generated each time a user visits a page of the web application. While the user remains on the same page, resource, long-task, error, and action events are linked to the related RUM view with the `view.id` attribute.                       |
| Resource  | 15 days   | A resource event is generated for images, XHR, Fetch, CSS, or JS libraries loaded on a webpage. It includes detailed loading timing information.                                                                                                              |
| Long Task | 15 days   | A long task event is generated for any task in the browser that blocks the main thread for more than 50ms.                                                                                                                                                    |
| Error     | 30 days   | RUM collects every frontend error emitted by the browser.                                                                                                                                                                                                     |
| Action    | 30 days   | RUM action events track user interactions during a user journey and can also be manually sent to monitor custom user actions.                                                                                                                                 |

The following diagram illustrates the RUM event hierarchy:

{{< img src="real_user_monitoring/data_collected/event-hierarchy.png" alt="RUM Event hierarchy" style="width:50%;border:none" >}}


## Default attributes

Each of these event types has the following attributes attached by default, so you can use them regardless of the RUM event type being queried.

### Core

| Attribute name   | Type   | Description                 |
|------------------|--------|-----------------------------|
| `type`     | string | The type of the event (for example, `view` or `resource`).             |
| `application.id` | string | The Datadog application ID generated when you create a RUM application. |
| `application.name` | string | The name of your Datadog application. |
| `service`     | string | A service denotes a set of pages built by a team that offers a specific functionality in your browser application. You can assign web pages to a service with [manual view tracking][1].             |

### View attributes

RUM action, error, resource, and long task events contain information about the active RUM view event at the time of collection:

| Attribute name                 | Type   | Description                                                                                                    |
|--------------------------------|--------|----------------------------------------------------------------------------------------------------------------|
| `view.id`                      | string | Randomly generated ID for each page view.                                                                      |
| `view.loading_type`                     | string | The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs][2].|
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
| `device.type`       | string | The device type as reported by the device (User-Agent HTTP header).      |
| `device.brand`  | string | The device brand as reported by the device (User-Agent HTTP header).  |
| `device.model`   | string | The device model as reported by the device (User-Agent HTTP header).   |
| `device.name` | string | The device name as reported by the device (User-Agent HTTP header). |

### Operating system

The following OS-related attributes are attached automatically to all events collected by Datadog:

| Attribute name                           | Type   | Description                                     |
|------------------------------------------|--------|-------------------------------------------------|
| `os.name`       | string | The OS name as reported by the device (User-Agent HTTP header).       |
| `os.version`  | string | The OS version as reported by the device (User-Agent HTTP header).  |
| `os.version_major`   | string | The OS version major as reported by the device (User-Agent HTTP header).   |

### Geo-location

The following attributes are related to the geo-location of IP addresses:

| Fullname                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | string | Name of the country.                                                                                                                  |
| `geo.country_iso_code`     | string | [ISO Code][3] of the country (for example, `US` for the United States or `FR` for France).                                                  |
| `geo.country_subdivision`     | string | Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France). |
| `geo.continent_code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                 |
| `geo.continent`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antarctica`, `South America`, `Oceania`).                    |
| `geo.city`            | string | The name of the city (for example, `Paris` or `New York`).                                                                                   |

**Note**: By default, Datadog stores the client IP address. Learn more about how to manage automatic user data collection in [Real User Monitoring Data Security][4].

### User attributes

In addition to default attributes, you can add user-related data to all RUM event types by [identifying user sessions][5]. This lets you follow the journey of a given user, figure out which users are the most impacted by errors, and monitor performance for your most important users.

### Feature flag attributes

{{< callout btn_hidden="true" header="Join the Feature Flag Tracking Beta!">}}
<a href="/real_user_monitoring/guide/setup-feature-flag-data-collection/">Set up your data collection</a> to join the Feature Flag Tracking beta.
{{< /callout >}}

You can [enrich your RUM event data with feature flags][6] to get additional context and visibility into performance monitoring. This lets you determine which users are shown a specific user experience and if it is negatively affecting the user's performance. 

## Event-specific metrics and attributes

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
| `session.ip`                      | string | Client IP address. If you want to stop collecting this attribute, change the setting in your [application details][7].                                                                       |
| `session.is_active`                      | boolean | Indicates if the session is currently active. The session ends after 4 hours of activity or 15 minutes of inactivity.                                                                     |
| `session.type`                     | string | The type of session: `user` or `synthetics`. Sessions from [Synthetic Monitoring Browser Tests][8] are excluded from billing. |
| `session.referrer`                | string | The URL of the previous web page from which a link to the currently requested page was followed. |
| `session.initial_view.id`        | string | The ID of the first RUM view generated by the user. |
| `session.initial_view.url_host`        | string | The host part of the URL. |
| `session.initial_view.url_path`        | string | The path part of the URL. |
| `session.initial_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.initial_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.initial_view.url_scheme` | object | The scheme part of the URL. |
| `session.last_view.id`        | string | The ID of the last RUM view generated by the user. |
| `session.last_view.url_host`        | string | The host part of the URL. |
| `session.last_view.url_path`        | string | The path part of the URL. |
| `session.last_view.url_path_group`  | string | The automatic URL group generated for similar URLs (for example, `/dashboard/?` for `/dashboard/123` and `/dashboard/456`). |
| `session.last_view.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `session.last_view.url_scheme` | object | The scheme part of the URL. |

### View timing metrics
**Note**: View timing metrics include time that a page is open in the background.

| Attribute                       | Type        | Description                                                                                                                                                                                                           |
|---------------------------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`               | number (ns) | Time spent on the current view.                                                                                                                                                                                       |
| `view.first_byte`               | number (ns) | Time elapsed until the first byte of the view has been received.                                                                                                |
| `view.largest_contentful_paint` | number (ns) | Time in the page load where the largest DOM object in the viewport (visible on screen) is rendered.                                                                                                |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user's first interaction with the page and the browser's response.                                                                                                                             |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where `0` means that no shifts are happening.                                                                               |
| `view.loading_time`             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info from Monitoring Page Performance][9].                                                                             |
| `view.first_contentful_paint`   | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][10].                               |
| `view.dom_interactive`          | number (ns) | Time until the parser finishes its work on the main document. [More info from the MDN documentation][11].                                                                                                         |
| `view.dom_content_loaded`       | number (ns) | Time until the load event is fired and the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][12]. |
| `view.dom_complete`             | number (ns) | Time until the page and all of the subresources are ready. The loading spinner has stopped spinning for the user. [More info from the MDN documentation][13].                                                                       |
| `view.load_event`               | number (ns) | Time until the load event is fired, indicating the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][14].                                                                             |
| `view.error.count`              | number      | Count of all errors collected for this view.                                                                                                                                                                          |
| `view.long_task.count`          | number      | Count of all long tasks collected for this view.                                                                                                                                                                      |
| `view.resource.count`           | number      | Count of all resources collected for this view.                                                                                                                                                                       |
| `view.action.count`             | number      | Count of all actions collected for this view.                                                                                                                                                                         |

### Resource timing metrics

Detailed network timing data for the loading of an application's resources are collected with the [Performance Resource Timing API][15].

| Metric                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number         | Entire time spent loading the resource.                                                                                                   |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                            |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart).                                           |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart).                                                                         |

### Resource attributes

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `resource.type`                | string | The type of resource being collected (for example, `css`, `javascript`, `media`, `XHR`, or `image`).           |
| `resource.method`                | string | The HTTP method (for example `POST` or `GET`).           |
| `resource.status_code`             | number | The response status code.                                                               |
| `resource.url`                     | string | The resource URL.                                                                       |
| `resource.url_host`        | string | The host part of the URL.                                                          |
| `resource.url_path`        | string | The path part of the URL.                                                          |
| `resource.url_query` | object | The query string parts of the URL decomposed as query params key/value attributes. |
| `resource.url_scheme`      | string | The protocol name of the URL (HTTP or HTTPS).                                            |
| `resource.provider.name`      | string | The resource provider name. Default is `unknown`.                                            |
| `resource.provider.domain`      | string | The resource provider domain.                                            |
| `resource.provider.type`      | string | The resource provider type (for example, `first-party`, `cdn`, `ad`, or `analytics`).                                            |


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


#### Source errors

Source errors include code-level information about the error. For more information about different error types, see the [MDN documentation][15].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | string | The error type (or error code in some cases).                   |



### Action timing metrics

| Metric    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action. See how it is calculated in the [Tracking User Actions documentation][16]. |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

### Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action. For [Custom User Actions][17], it is set to `custom`. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions. |
| `action.name` | string | User-friendly name created (for example, `Click on #checkout`). For [Custom User Actions][17], the action name given in the API call. |

### Frustration signals fields

| Field                | Type   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `session.frustration.count`     | number | Count of all frustration signals associated with one session. |
| `view.frustration.count`        | number | Count of all frustration signals associated with one view.    |
| `action.frustration.type:dead_click`  | string | The dead clicks detected by the RUM Browser SDK.              |
| `action.frustration.type:rage_click`  | string | The rage clicks detected by the RUM Browser SDK.              |
| `action.frustration.type:error_click` | string | The error clicks detected by the RUM Browser SDK.             |

### UTM attributes

| Field                | Type   | Description                                                   |
|-------------------------------|--------|---------------------------------------------------------------|
| `view.url_query.utm_source`     | string | The parameter in the URL tracking the source of traffic. |
| `view.url_query.utm_medium`        | string | The parameter in the URL tracking the channel where the traffic is coming from.    |
| `view.url_query.utm_campaign`  | string | The paramter in the URL identifying the specific marketing campaign tied to that view.              |
| `view.url_query.utm_content`  | string | The paramter in the URL identifying the specific element a user clicked within a marketing campaign.           |
| `view.url_query.utm_term` | string | The parameter in the URL tracking the keyword a user searched to trigger a given campaign.             |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#override-default-rum-view-names
[2]: /real_user_monitoring/browser/monitoring_page_performance/#monitoring-single-page-applications-spa
[3]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[4]: /data_security/real_user_monitoring/#ip-address
[5]: /real_user_monitoring/browser/advanced_configuration/#user-sessions
[6]: /real_user_monitoring/guide/setup-feature-flag-data-collection
[7]: /data_security/real_user_monitoring/#ip-address
[8]: /synthetics/browser_tests/
[9]: /real_user_monitoring/browser/monitoring_page_performance/#how-loading-time-is-calculated
[10]: https://www.w3.org/TR/paint-timing/#sec-terminology
[11]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[12]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
[15]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[16]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#action-timing-metrics
[17]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-actions
