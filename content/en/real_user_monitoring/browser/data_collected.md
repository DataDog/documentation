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

The Datadog Real User Monitoring SDK generates six types of events:

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

## Event-specific and default attributes

There are metrics and attributes that are specific to a given event type. For example, the metric `view.loading_time` is associated with "view" RUM events and the attribute `resource.method` is associated with "resource" RUM events. And there are [default attributes](#default-attributes) that are present on all RUM events. For example, the URL of the page (`view.url`) and user information such as their device type (`device.type`) and their country (`geo.country`).
## Default attributes

Each of these event types has the following attributes attached by default. So you can use them regardless of the RUM event type being queried.

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
| `view.loading_type`                     | string | The type of page load: `initial_load` or `route_change`. For more information, see the [single page applications support docs](#single-page-applications).|
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

### Geo-location

The following attributes are related to the geolocation of IP addresses:

| Fullname                                    | Type   | Description                                                                                                                          |
|:--------------------------------------------|:-------|:-------------------------------------------------------------------------------------------------------------------------------------|
| `geo.country`         | string | Name of the country                                                                                                                  |
| `geo.country_iso_code`     | string | [ISO Code][1] of the country (for example, `US` for the United States, `FR` for France).                                                  |
| `geo.country_subdivision`     | string | Name of the first subdivision level of the country (for example, `California` in the United States or the `Sarthe` department in France). |
| `geo.country_subdivision_iso_code` | string | [ISO Code][1] of the first subdivision level of the country (for example, `CA` in the United States or the `SA` department in France).    |
| `geo.continent_code`       | string | ISO code of the continent (`EU`, `AS`, `NA`, `AF`, `AN`, `SA`, `OC`).                                                                 |
| `geo.continent`       | string | Name of the continent (`Europe`, `Australia`, `North America`, `Africa`, `Antartica`, `South America`, `Oceania`).                    |
| `geo.city`            | string | The name of the city (example `Paris`, `New York`).                                                                                   |

**Note**: By default, Datadog stores the client IP address. Reach out to support@datadoghq.com to stop collecting IP addresses. This does not impact the collection of geolocation attributes listed above. 

## User attributes

In addition to default attributes, add user related data to all RUM event types by [identifying user sessions][2]. This lets you follow the journey of a given user, figure out which users are the most impacted by errors and monitor performance for your most important users.

## Event-specific attributes

{{< tabs >}}
{{% tab "Session" %}}

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
| `session.ip`                      | string | Client ip address. Reach out to support@datadoghq.com to stop collecting this attribute.                                                                      |
| `session.type`                     | string | The type of session: `user` or `synthetics`. Sessions from [Synthetic Monitoring Browser Tests][1] are excluded from billing. |
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

[1]: /synthetics/browser_tests/
{{% /tab %}}
{{% tab "View" %}}

### Single page applications

For single page applications (SPAs), the RUM SDK differentiates between `initial_load` and `route_change` navigations with the `loading_type` attribute. If a click on your web page leads to a new page without a full refresh of the page, the RUM SDK starts a new view event with `loading_type:route_change`. RUM tracks page changes using the [History API][1].

Datadog provides a unique performance metric, `loading_time`, which calculates the time needed for a page to load. This metric works both for `initial_load` and `route_change` navigations.

#### How is loading time calculated?
To account for modern web applications, loading time watches for network requests and DOM mutations.

* **Initial Load**: Loading Time is equal to *whichever is longer*:

    - The difference between `navigationStart` and `loadEventEnd`.
    - Or the difference between `navigationStart` and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests or a DOM mutation).

* **SPA Route Change**: Loading Time is equal to the difference between the user click and the first time the page has no activity for more than 100ms (activity being defined as ongoing network requests, or a DOM mutation).

#### Hash SPA navigation

Frameworks relying on hash (`#`) navigation are monitored with the RUM SDK automatically. The SDK watches for `HashChangeEvent` and issues a new view. Events coming from an HTML anchor tag which do not affect the current view context are ignored.

### View timing metrics

RUM view performance metrics are collected from both the [Paint Timing API][2] and the [Navigation Timing API][3].

{{< img src="real_user_monitoring/data_collected/view/timing_overview.png" alt="Timing overview"  >}}

| Metric                              | Type        | Decription                                                                                                                                                                                                                 |
|----------------------------------------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view.time_spent`                             | number (ns) | Time spent on the current view.                                                                                                                                                                                                  |
| `view.largest_contentful_paint` | number (ns) | Moment in the page load timeline in which the largest DOM object in the viewport (i.e. visible on screen) is rendered.                                                                                                |
| `view.first_input_delay`        | number (ns) | Time elapsed between a user’s first interaction with the page and the browser’s response.                                                                                                                             |
| `view.cumulative_layout_shift`  | number      | Quantifies unexpected page movement due to dynamically loaded content (for example, third-party ads) where 0 means no shifts happening.                                                                               |
| `view.loading_time`                             | number (ns) | Time until the page is ready and no network request or DOM mutation is currently occurring. [More info on how view loading time is collected][4]|
| `view.first_contentful_paint` | number (ns) | Time when the browser first renders any text, image (including background images), non-white canvas, or SVG. For more information about browser rendering, see the [w3c definition][5].                                                                                            |
| `view.dom_interactive`        | number (ns) | The moment when the parser finishes its work on the main document. [More info from the MDN documentation][6]                                                                                                               |
| `view.dom_content_loaded`     | number (ns) | Event fired when the initial HTML document is completely loaded and parsed, without waiting for non-render blocking stylesheets, images, and subframes to finish loading. [More info from the MDN documentation][7]. |
| `view.dom_complete`           | number (ns) | The page and all the subresources are ready. For the user, the loading spinner has stopped spinning. [More info from the MDN documentation][8]                                                                             |
| `view.load_event`         | number (ns) | Event fired when the page is fully loaded. Usually a trigger for additional application logic. [More info from the MDN documentation][9]                                                                                   |
| `view.error.count`            | number      | Count of all errors collected for this view.                                                                                                                                                                        |
| `view.long_task.count`        | number      | Count of all long tasks collected for this view.                                                                                                                                                                           |
| `view.resource.count`         | number      | Count of all resources collected for this view.                                                                                                                                                                            |
| `view.action.count`      | number      | Count of all actions collected for this view.

[1]: https://developer.mozilla.org/en-US/docs/Web/API/History
[2]: https://www.w3.org/TR/paint-timing/
[3]: https://www.w3.org/TR/navigation-timing/#sec-navigation-timing
[4]: /real_user_monitoring/browser/monitoring_page_performance/#how-is-loading-time-calculated
[5]: https://www.w3.org/TR/paint-timing/#sec-terminology
[6]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/domInteractive
[7]: https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
[9]: https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
{{% /tab %}}
{{% tab "Resource" %}}

### Resource timing metrics

Detailed network timing data for the loading of an application’s resources are collected with the [Performance Resource Timing API][1].

{{< img src="real_user_monitoring/data_collected/resource/resource_metric.png" alt="Resource Metrics"  >}}

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


[1]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
{{% /tab %}}
{{% tab "Long Task" %}}

### Long task timing metrics

| Metric  | Type   | Description                |
|------------|--------|----------------------------|
| `long_task.duration` | number | Duration of the long task. |


{{% /tab %}}
{{% tab "Error" %}}

### Error sources
Front-end errors are split in 4 different categories depending on their `error.source`:

- **network**: XHR or Fetch errors resulting from AJAX requests.
- **source**: Unhandled exceptions or unhandled promise rejections (source-code related).
- **console**: `console.error()` API calls.
- **custom**: Errors sent with the [RUM `addError` API][1] default to `custom`.

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

Source errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][2].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | string | The error type (or error code in some cases).                   |


[1]: /real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
{{% /tab %}}
{{% tab "User Action" %}}

### Automatic collection of actions
Real User Monitoring (RUM) SDKs detect user interactions performed during a user journey. Set the `trackInteractions` [initialization parameter][1] to `true` to enable this feature.

**Note**:  The `trackInteractions` initialization parameter enables the collection of user clicks in your application. **Sensitive and private data** contained on your pages may be included to identify the elements interacted with.

Once an interaction is detected, all new RUM events are attached to the ongoing action until it is considered finished. The action also benefits from its parent view attributes such as browser information, geolocation data, [global context][2].

#### How is the action loading time calculated?
Once an interaction is detected, the RUM SDK watches for network requests an DOM mutations. It is considered finished once the page has no activity for more than 100ms (activity being defined as ongoing network requests or DOM mutations).

### Custom user actions
Custom user actions are user actions declared and sent manually via the [`addAction` API][3]. They can send information relative to an event occurring during a user journey, for example, a custom timing or customer cart information.

### Action timing metrics

| Metric    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.loading_time` | number (ns) | The loading time of the action. See how it is calculated in the [User Action documentation][4]. |
| `action.long_task.count`        | number      | Count of all long tasks collected for this action. |
| `action.resource.count`         | number      | Count of all resources collected for this action. |
| `action.error.count`      | number      | Count of all errors collected for this action.|

### Action attributes

| Attribute    | Type   | Description              |
|--------------|--------|--------------------------|
| `action.id` | string | UUID of the user action. |
| `action.type` | string | Type of the user action. For [Custom User Actions][3], it is set to `custom`. |
| `action.target.name` | string | Element that the user interacted with. Only for automatically collected actions |
| `action.name` | string | User-friendly name created (for example `Click on #checkout`). For [Custom User Actions][3], the action name given in the API call. |

[1]: /real_user_monitoring/browser/?tab=us#initialization-parameters
[2]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#add-global-context
[3]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#custom-user-actions
[4]: /real_user_monitoring/browser/tracking_user_actions/?tab=npm#how-action-loading-time-is-calculated
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
[2]: /real_user_monitoring/browser/advanced_configuration/?tab=npm#identify-user-sessions
