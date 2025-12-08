---
title: Monitoring Resource Performance
description: "Track web resource performance including XHR, Fetch, images, CSS, and JavaScript assets with detailed timing data and provider identification."
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
Starting from Browser SDK version 6.21.0, you can use the `trackEarlyRequests` SDK init parameter to capture:

* Unhandled rejections and uncaught exception errors when the SDK is first evaluated.
* XHR and Fetch requests regardless of SDK loading status.

**Note**: Early data collection will be the default behavior in the next major browser SDK version. Until then, early data collection is an opt-in init parameter.

To enable early data collection, set `trackEarlyRequests` to `true` in your Browser SDK initialization script.

<div class="alert alert-danger">
  If you are using `beforeSend` with `trackEarlyRequests` enabled, properties associated with the request can now be undefined. 
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
| `resource.type`            | string | The type of resource being collected (for example, `css`, `javascript`, `media`, `XHR`, `image`). |
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
