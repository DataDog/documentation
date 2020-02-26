---
title: RUM Resources
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/dashboards/"
  tag: "Documentation"
  text: "Visualize your RUM data in out of the box Dashboards"
- link: "/real_user_monitoring/explorer/"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

All of your website’s resources are collected by default: images, XHRs, [XMLHttpRequest][1], CSS files, JS assets, and font files.

Detailed network timing data regarding the loading of an application’s resources are being collected with the [Performance Resource Timing API][2]

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[2]: https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming
