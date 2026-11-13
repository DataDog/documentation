## Automated resource collection

After you enable RUM, the Browser SDK automatically collects resources and assets for every RUM view (page load): [XMLHttpRequest][1] (XHRs) and Fetch requests, but also images, CSS files, JavaScript assets, and font files. A RUM Resource event is generated for each one of them, with detailed timings and metadata.

RUM Resources inherit from all the context related to the active RUM View at the time of collection.

### Early data collection

To also capture unhandled rejections, uncaught exceptions, and XHR/Fetch requests that occur before the SDK finishes loading, set `trackEarlyRequests` to `true` in your initialization script (requires Browser SDK v6.21.0+).

{% alert level="danger" %}
If you are using `beforeSend` with `trackEarlyRequests` enabled, properties associated with the request can be undefined.
{% /alert %}

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

### Identify third-party resources

RUM infers the name and category of the resource provider from the resource URL host part. If the resource URL host matches the current page URL host, the category is set to `first party`. Otherwise, the category is `cdn`, `analytics`, or `social`, for example.

## Track GraphQL requests

The Browser SDK can automatically enrich GraphQL requests with operation-specific metadata, making it easier to identify and debug individual operations in RUM.

Configure `allowedGraphQlUrls` during SDK initialization to specify which endpoints should be treated as GraphQL:

```javascript
import { datadogRum } from '@datadog/browser-rum'

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: 'datadoghq.com',
    allowedGraphQlUrls: [
        "https://api.example.com/graphql",
    ]
})
```

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

For matching requests, the SDK automatically extracts operation type, operation name, variables, and optionally the GraphQL query payload and response errors. See [GraphQL attributes][2] for the complete list of collected attributes.

**Note**: You can modify GraphQL variables in the [`beforeSend` callback][3] if needed (for example, to redact sensitive data).

## Track WebSocket connections

{% callout url="" header="Preview" btn_hidden=true %}
WebSocket monitoring is in Preview. The `betaTrackWebSockets` option and the collected attributes may change before general availability. You do not need to request access. To enable it, set `betaTrackWebSockets` to `true`.
{% /callout %}

The Browser SDK can collect [WebSocket][13] connections. Each connection is reported as a RUM Resource event with `resource.type:websocket`. The event summarizes the tracked lifetime of the connection: how long it took to open, how long it stayed open, how it closed, and how many messages were exchanged in each direction. Use these events in the RUM Explorer to investigate failed, slow, or unexpectedly closed connections.

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

The SDK removes the query string from WebSocket URLs automatically. The rest of the URL, including the path and any credentials, is collected as-is. If it contains sensitive data, such as an identifier in the path, redact it with the [`beforeSend` callback][3].

Datadog builds the WebSocket resource from events that the SDK sends, so you cannot modify the resource event itself. Instead, modify the SDK events of type `vital` where `vital.type` is `websocket`.

You can modify the following properties of these events:

| Attribute                             | Type   | Description                                                        |
| ------------------------------------- | ------ | ------------------------------------------------------------------ |
| `vital.websocket.url`                 | String | The URL of a WebSocket connection.                                 |
| `vital.websocket.requested_protocols` | Array  | The subprotocols requested when opening a WebSocket connection.    |
| `vital.websocket.selected_protocol`   | String | The subprotocol selected by the server for a WebSocket connection. |
| `vital.websocket.close_reason`        | String | The reason a WebSocket connection was closed.                      |

For example, to redact a room identifier from the WebSocket URL:

```javascript
datadogRum.init({
    ...,
    betaTrackWebSockets: true,
    beforeSend: (event) => {
        if (event.type === 'vital' && event.vital.type === 'websocket') {
            // The URL is not present on every WebSocket event, so check that it exists
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

## Collect network headers

To collect request and response headers on resources, configure `trackResourceHeaders`. See [`RumInitConfiguration.trackResourceHeaders`][4] for configuration details, and [Resource network headers][5] for the collected attributes.

## Link RUM Resources to APM traces

To get end-to-end visibility into requests as they move across layers of your stack, connect your RUM data with corresponding backend traces. This enables you to:

* Locate backend problems that resulted in a user-facing error.
* Identify the extent to which users are affected by an issue within your stack.
* See complete end-to-end requests on the flame graphs, allowing you to navigate between RUM and APM and back with precise context.

See [Track Frontend-to-Backend Traces][6] for information about setting up this feature.

{% img src="real_user_monitoring/browser/resource_performance_graph.png" alt="APM Trace information for a RUM Resource" /%}

## Cross origin resources

Certain resource timings and attributes are collected using the [Resource Timing API][7]. However, when a resource originates from a different URL than the current page (for example, a web application hosted on `www.example.com` loading resources from `static.example.com`), the browser's security policy restricts access to some of this information.

### Resource timings

To collect detailed resource timings, add the `Timing-Allow-Origin` HTTP response header to your cross-origin resources. For example, to grant access to the resource timing to any origin, use `Timing-Allow-Origin: *`. For more information about CORS, see [Cross-origin timing information][8] in the MDN Web Docs.

### Resource status code

To collect the resource status code, add the `Access-Control-Allow-Origin` HTTP response header and the `crossorigin` attribute to the relevant HTML tags to allow access to cross-origin resources. For example, to grant access to the resource status code to any origin, use `Access-Control-Allow-Origin: *` and add `crossorigin="anonymous"` to your HTML tags. For more information, see [`Access-Control-Allow-Origin` header][9], and [`crossorigin` attribute][10] in the MDN Web Docs.

**Note**: Some fields may not be available in all browsers. For example, `resource.status_code` is not available in Safari. See [Browser Compatibility][11].

For the timing and attributes collected for resources, see [Data Collected][12].

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /real_user_monitoring/setup/data_collected/?platform=browser#graphql-attributes
[3]: /real_user_monitoring/enrich_rum_data/modify_or_drop_rum_events/?platform=browser#modify-rum-events
[4]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html#trackresourceheaders
[5]: /real_user_monitoring/setup/data_collected/?platform=browser#resource-network-headers
[6]: /real_user_monitoring/enrich_rum_data/track_frontend_to_backend_traces/?platform=browser
[7]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[8]: https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Resource_timing#cross-origin_timing_information
[9]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Access-Control-Allow-Origin
[10]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin
[11]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming/responseStatus#browser_compatibility
[12]: /real_user_monitoring/setup/data_collected/?platform=browser#resource-timing-attributes
[13]: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
[14]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-rum.RumInitConfiguration.html#betatrackwebsockets
[15]: /real_user_monitoring/setup/data_collected/?platform=browser#websocket-attributes
