---
title: Monitoring Resource Performance
description: "Track web resource performance including XHR, Fetch, images, CSS, JavaScript assets, and WebSocket connections with detailed timing data and provider identification."
aliases:
  - /real_user_monitoring/browser/monitoring_resource_performance/
further_reading:
  - link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
    tag: "Blog"
    text: "Real User Monitoring"
  - link: "/real_user_monitoring/explorer/"
    tag: "Documentation"
    text: "Explore your views within Datadog"
  - link: "/real_user_monitoring/explorer/visualize/"
    tag: "Documentation"
    text: "Apply visualizations on your events"
  - link: "/real_user_monitoring/platform/dashboards/"
    tag: "Documentation"
    text: "RUM Dashboards"
---

The RUM Browser SDK collects resources and assets for every RUM view (page load): [XMLHttpRequest][1] (XHRs) and Fetch requests, but also images, CSS files, JavaScript assets, and font files. A RUM Resource event is generated for each one of them, with detailed timings and metadata.

RUM Resources inherit from all the context related to the active RUM View at the time of collection.

## Early data collection
The `trackEarlyRequests` SDK init parameter allows you to capture:

* Unhandled rejections and uncaught exception errors when the SDK is first evaluated.
* XHR and Fetch requests regardless of SDK loading status.


To enable early data collection, set `trackEarlyRequests` to `true` in your Browser SDK initialization script. This feature requires Browser SDK v6.21.0+.

<div class="alert alert-danger">
  If you are using <code>beforeSend</code> with <code>trackEarlyRequests</code> enabled, properties associated with the request can be undefined. 
</div>

  For example:

  ```javascript
window.DD_RUM.init({
    ...
    beforeSend(event, eventContext) {
      if (event.type === 'resource' && event.resource.type === 'xhr') {
        eventContext.xhr.response // This might now break because `eventContext.xhr` is not necessarily defined
      }
    }
})
```

## Link RUM Resources to APM traces

To get even more complete, end-to-end visibility into requests as they move across layers of your stack, connect your RUM data with corresponding backend traces. This enables you to:

* Locate backend problems that resulted in a user-facing error.
* Identify the extent to which users are affected by an issue within your stack.
* See complete end-to-end requests on the flame graphs, allowing you to seamlessly navigate between RUM and APM and back with precise context.

See [Connect RUM and Traces][2] for information about setting up this feature.

{{< img src="real_user_monitoring/browser/resource_performance_graph.png" alt="APM Trace information for a RUM Resource" >}}

## Track GraphQL requests

The Browser SDK can automatically enrich GraphQL requests with operation-specific metadata, making it easier to identify and debug individual operations in RUM.

### Setup

Configure `allowedGraphQlUrls` during SDK initialization to specify which endpoints should be treated as GraphQL:

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.com',
    allowedGraphQlUrls: [
        // String: matches any URL starting with the value
        "https://api.example.com/graphql",
        // RegExp: tests against the full URL
        /\/graphql$/,
        // Function: evaluates with the URL as parameter, returning true for a match
        (url) => url.includes("graphql")
    ]
})
```

### Advanced options

To collect additional data, use the extended configuration:

```javascript
datadogRum.init({
    allowedGraphQlUrls: [
        {
            match: "https://api.example.com/graphql",
            trackPayload: true,          // Include GraphQL query (limited to 32 KB)
            trackResponseErrors: true    // Capture GraphQL errors from responses
        }
    ]
})
```

For matching requests, the SDK automatically extracts operation type, operation name, variables, and optionally the GraphQL query payload and response errors. See [GraphQL attributes][8] for the complete list of collected attributes.

**Note**: You can modify GraphQL variables in the [`beforeSend` callback][9] if needed (for example, to redact sensitive data).

## Track WebSocket connections

{{< callout header="Preview" btn_hidden="true" >}}
WebSocket monitoring is in Preview. The `betaTrackWebSockets` option and the collected attributes may change before general availability. You do not need to request access: set `betaTrackWebSockets` to `true` to enable it.
{{< /callout >}}

The Browser SDK can collect [WebSocket][11] connections. Each connection is reported as a RUM Resource event with `resource.type:websocket`. The event summarizes the tracked lifetime of the connection: how long it took to open, how long it stayed open, how it closed, and how many messages were exchanged in each direction. Use these events in the RUM Explorer to investigate failed, slow, or unexpectedly closed connections.

This feature requires Browser SDK v7.16.0 or later.

### Set up WebSocket tracking

Set [`betaTrackWebSockets`][14] to `true` during SDK initialization. WebSocket collection runs only when resource collection is enabled (`trackResources: true`).

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.com',
    trackResources: true,
    betaTrackWebSockets: true
})
```

The SDK reports connections that are still open when the user leaves the page or the session ends. The `resource.websocket.tracking_end_reason` attribute indicates why tracking stopped. See [WebSocket attributes][15].

### Redact sensitive data in WebSocket URLs

The SDK removes the query string from WebSocket URLs automatically. The rest of the URL, including the path and any credentials, is collected as-is. If it contains sensitive data, such as an identifier in the path, redact it with the [`beforeSend` callback][9].

Datadog builds the WebSocket resource from events that the SDK sends, so you cannot modify the resource event itself. Instead, modify the SDK events of type `vital` where `vital.type` is `websocket`.

You can modify the following properties of these events:

| Attribute                             | Type   | Description                                                                         |
| ------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `vital.websocket.url`                 | String | The URL of the WebSocket connection.                                                |
| `vital.websocket.requested_protocols` | Array  | The subprotocols requested by the application when opening the connection.          |
| `vital.websocket.selected_protocol`   | String | The subprotocol selected by the server.                                             |
| `vital.websocket.close_reason`        | String | The reason the connection was closed, as provided by the application or the server. |

For example, to redact a room identifier from the WebSocket URL:

```javascript
datadogRum.init({
    ...,
    betaTrackWebSockets: true,
    beforeSend: (event) => {
        if (event.type === 'vital' && event.vital.type === 'websocket') {
            // The URL is not present on every WebSocket event, so check it exists
            if (event.vital.websocket.url) {
                event.vital.websocket.url = event.vital.websocket.url.replace(/\/rooms\/[^/]+/, '/rooms/REDACTED')
            }
        }
        return true
    }
})
```

Apply the redaction to every `websocket` event, not only to a single event name. The SDK sends several `websocket` events per connection, and more than one of them includes the URL.

**Note**: WebSocket events cannot be discarded with `beforeSend`. If `beforeSend` returns `false` for a WebSocket event, the SDK still sends the event and logs a warning to the browser console. To stop collecting WebSocket connections, remove `betaTrackWebSockets` from your configuration.

## Resource timing attributes

Detailed network timing data for resources is collected from the Fetch and XHR native browser methods and from the [Performance Resource Timing API][3].

| Attribute                      | Type           | Description                                                                                                                                |
| ------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `resource.duration`            | number         | Entire time spent loading the resource.                                                                                                    |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                             |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart).                                                            |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this attribute does not appear (connectEnd - secureConnectionStart). |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart).                                               |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart).                                                                      |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart).                                           |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart).                                                                         |

**Note**: If you are having trouble collecting detailed timing for some resources, see [Cross origin resources](#cross-origin-resources).

## Resource attributes

| Attribute                  | Type   | Description                                                                                       |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------- |
| `resource.type`            | string | The type of resource being collected (for example, `css`, `javascript`, `media`, `XHR`, `image`, `websocket`). |
| `resource.method`          | string | The HTTP method (for example `POST`, `GET`).                                                      |
| `resource.status_code`     | number | The response status code.                                                                         |
| `resource.url`             | string | The resource URL.                                                                                 |
| `resource.url_host`        | string | The host part of the URL.                                                                         |
| `resource.url_path`        | string | The path part of the URL.                                                                         |
| `resource.url_query`       | object | The query string parts of the URL decomposed as query params key/value attributes.                |
| `resource.url_scheme`      | string | The protocol name of the URL (HTTP or HTTPS).                                                     |
| `resource.provider.name`   | string | The resource provider name. Default is `unknown`.                                                 |
| `resource.provider.domain` | string | The resource provider domain.                                                                     |
| `resource.provider.type`   | string | The resource provider type (for example `first-party`, `cdn`, `ad`, `analytics`).                 |

**Note**: Some fields may not be available in all browsers. For example, `resource.status_code` is not available in Safari, see [Browser Compatibility][3].

## Resource network headers

For resources configured with `trackResourceHeaders`, additional network header metadata is automatically collected. See [`RumInitConfiguration.trackResourceHeaders`][10] for configuration details.

| Attribute                   | Type   | Description                                                                                                             |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `resource.request.headers`  | object | Request headers as key/value pairs (available only if `trackResourceHeaders` is enabled, for Fetch resources only).     |
| `resource.response.headers` | object | Response headers as key/value pairs (available only if `trackResourceHeaders` is enabled, for Fetch and XHR resources). |

## Identify third-party resources

RUM infers the name and category of the resource provider from the resource URL host part. If the resource URL host matches the current page URL host, the category is set to `first party`. Otherwise, the category will be `cdn`, `analytics`, or `social` for example.

## Cross origin resources

Certain resource timings and attributes are collected using the [Resource Timing API][4]. However, when a resource originates from a different URL than the current page (for example, a web application hosted on `www.example.com` loading resources from `static.example.com`), the browser's security policy restricts access to some of this information.

### Resource timings

To collect detailed resource timings, add the `Timing-Allow-Origin` HTTP response header to your cross-origin resources. For example, to grant access to the resource timing to any origin, use `Timing-Allow-Origin: *`. For more information about CORS, see [Cross-origin timing information][5] in the MDN Web Docs.

### Resource status code

To collect the resource status code, add the `Access-Control-Allow-Origin` HTTP response header and the `crossorigin` attribute to the relevant HTML tags to allow access to cross-origin resources. For example, to grant access to the resource status code to any origin, use `Access-Control-Allow-Origin: *` and add `crossorigin="anonymous"` to your HTML tags. For more information, see [`Access-Control-Allow-Origin` header][6], and [`crossorigin` attribute][7] in the MDN Web Docs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /real_user_monitoring/correlate_with_other_telemetry/apm
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseStatus#browser_compatibility
[4]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing#cross-origin_timing_information
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
[7]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[8]: /real_user_monitoring/application_monitoring/browser/data_collected/#graphql-attributes
[9]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/#modify-the-content-of-a-rum-event
[10]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html#trackresourceheaders
[11]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
[14]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html#betatrackwebsockets
[15]: /real_user_monitoring/application_monitoring/browser/data_collected/#websocket-attributes
