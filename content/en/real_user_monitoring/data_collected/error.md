---
title: RUM Errors
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

Front-end errors are automatically collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

## Error Origins
Front-end errors are split in 3 different categories depending on their `error.origin`:

- **network**: XHR or Fetch errors resulting from AJAX requests. Specific attributes to network errors can be found [in the documentation][1]
- **source**: unhandled exceptions or unhandled promise rejections (source-code related)
- **console**: console.error() API calls

## Facet Collected

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.origin`  | string | Where the error originates from (i.e. console, network, etc.)          |
| `error.kind`    | string | The error type or kind (or code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |

### Network Errors

Network errors include information about the failing HTTP request. Hence, the following facets are also collected:

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | number | The response status code.                                                               |
| `http.url`                     | string | The resource URL.                                                                       |
| `http.url_details.host`        | string | The HTTP host part of the URL.                                                          |
| `http.url_details.path`        | string | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | string | The protocol name of the URL (HTTP or HTTPS)                                            |

### Source Errors

Source Errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][2].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | string | The error type or kind (or code in some cases).                   |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /real_user_monitoring/data_collected/error/#network-errors
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
