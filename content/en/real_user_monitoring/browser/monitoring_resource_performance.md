---
title: Monitoring Resource Performance
kind: documentation
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
  - link: "/real_user_monitoring/dashboards/"
    tag: "Documentation"
    text: "RUM Dashboards"
---

The RUM SDK collects resources and assets for every RUM view (page load): [XMLHttpRequest][1] (XHRs) and Fetch requests, but also images, CSS files, JavaScript assets, and font files. A RUM Resource event is generated for each one of them, with detailed timings and metadata.

RUM Resources inherit from all the context related to the active RUM View at the time of collection.

## Link RUM Resources to APM traces

To get even more complete, end-to-end visibility into requests as they move across layers of your stack, connect your RUM data with corresponding backend traces. This enables you to:

* Locate backend problems that resulted in a user-facing error.
* Identify the extent to which users are affected by an issue within your stack.
* See complete end-to-end requests on the flame graphs, allowing you to seamlessly navigate between RUM and APM and back with precise context.

See [Connect RUM and Traces][2] for information about setting up this feature.

{{< img src="real_user_monitoring/browser/resource_performance_graph.png" alt="APM Trace information for a RUM Resource"  >}}

## Resource timing and metrics

Detailed network timing data for resources is collected from the Fetch and XHR native browser methods and from the [Performance Resource Timing API][3].

| Attribute                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number         | Entire time spent loading the resource.                                                                                                   |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                            |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart).                                                           |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear (connectEnd - secureConnectionStart).|
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart).                                              |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart).                                                                     |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart).                                           |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart).                                                                        |

**Note**: If you are having trouble collecting detailed timing for some resources, see [Resource timing and CORS](#resource-timing-and-cors).

## Resource attributes

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

## Identify third-party resources

RUM infers the name and category of the resource provider from the resource URL host part. If the resource URL host matches the current page URL host, the category is set to `first party`. Otherwise, the category will be `cdn`, `analytics`, or `social` for example.

## Resource timing and CORS

The [Resource Timing API][3] is used to collect RUM resource timing. It is subject to the cross-origin security limitations that browsers enforce on scripts. For example, if your web application is hosted on `www.example.com` and it loads your images via `images.example.com`, you will only get timing for resources loaded hosted on `www.example.com` by default.

To resolve this, enable extended data collection for resources subject to CORS by adding the `Timing-Allow-Origin` HTTP response header to your cross-origin resources. For example, to grant access to the resource timing to any origin, use `Timing-Allow-Origin: *`. Find more about CORS on the [MDN Web Docs][4]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /real_user_monitoring/connect_rum_and_traces
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[4]: https://developer.mozilla.org/en-US/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API#Coping_with_CORS
