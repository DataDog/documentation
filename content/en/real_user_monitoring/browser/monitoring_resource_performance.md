---
title: Monitoring Page Performance
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

Metrics for resources and assets are collected for every page load. Key resources included are [XMLHttpRequest][1] (XHRs) and Fetch requests, but also images, CSS files, JavaScript assets, and font files.

RUM Resources contain all context from the active RUM View.

## Link RUM Resources to APM traces

Connecting your RUM resource performance metrics with APM traces is a powerful way to troubleshoot your application's performance issues. See [Connect RUM and Traces][2] for information about setting up direct drill-down links from RUM front-end information to backend and infrastructure traces from APM.

## Resource timing

Detailed network timing data for resources are collected from the Fetch and XHR native browser methods and from the [Performance Resource Timing API][3]. If you are having trouble collecting detailed timing for some resources, see [troubleshooting information](#resource-timing-troubleshooting).

## Performance metrics for resources

For information about the default attributes for all RUM event types, see [RUM Browser Data Collected][4]. For information about configuring for sampling, global context, or custom user actions and custom errors, see [Advanced Configuration][5]. The following table lists Datadog-specific metrics along with performance metrics collected from [Performance Resource Timing API][3].

| Attribute                              | Type           | Description                                                                                                                               |
|----------------------------------------|----------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `duration`                             | number         | Entire time spent loading the resource.                                                                                                   |
| `resource.size`                | number (bytes) | Resource size.                                                                                                                            |
| `resource.connect.duration`    | number (ns)    | Time spent establishing a connection to the server (connectEnd - connectStart)                                                            |
| `resource.ssl.duration`        | number (ns)    | Time spent for the TLS handshake. If the last request is not over HTTPS, this metric does not appear (connectEnd - secureConnectionStart) |
| `resource.dns.duration`        | number (ns)    | Time spent resolving the DNS name of the last request (domainLookupEnd - domainLookupStart)                                               |
| `resource.redirect.duration`   | number (ns)    | Time spent on subsequent HTTP requests (redirectEnd - redirectStart)                                                                      |
| `resource.first_byte.duration` | number (ns)    | Time spent waiting for the first byte of response to be received (responseStart - RequestStart)                                           |
| `resource.download.duration`   | number (ns)    | Time spent downloading the response (responseEnd - responseStart)                                                                         |

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

## Resource timing troubleshooting

If you get a value of zero for resource metric timestamps such as `redirectStart`, `redirectEnd`, `domainLookupStart`, `domainLookupEnd`, `connectStart`, `connectEnd`, `secureConnectionStart`, `requestStart`, and `responseStart`, it is because the providing server's Cross-Origin Resource Sharing (CORS) same-origin access policy is restricting them. To resolve this, the providing server must send the `Timing-Allow-Origin` HTTP response header with a value that specifies the origins that are allowed to access the restricted timestamp values.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: /real_user_monitoring/connect_rum_and_traces
[3]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
[4]: /real_user_monitoring/browser/data_collected/?tab=resource
[5]: /real_user_monitoring/browser/advanced_configuration/
