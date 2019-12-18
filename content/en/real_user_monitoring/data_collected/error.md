---
title: RUM Errors
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/dash-2019-new-feature-roundup/#real-user-monitoring"
  tag: "Blog"
  text: "Real User Monitoring"
- link: "/real_user_monitoring/rum_explorer"
  tag: "Documentation"
  text: "Explore your views within Datadog"
- link: "/real_user_monitoring/rum_analytics"
  tag: "Documentation"
  text: "Build analytics upon your events"
- link: "/logs/processing/attributes_naming_convention/"
  tag: "Documentation"
  text: "Datadog Standard Attributes"
---

All errors that appear in the user console are collected.

## Facet Collected

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.kind`    | string | The error type or kind (or code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |
| `error.origin`  | string | Where the error originates from (i.e. console, network…)          |

### Network Error

For network error the following extra-facets are collected:

| Attribute                      | Type   | Description                                                                             |
|--------------------------------|--------|-----------------------------------------------------------------------------------------|
| `http.status_code`             | number | The response status code.                                                               |
| `http.url`                     | string | The resource URL.                                                                       |
| `http.url_details.host`        | string | The HTTP host part of the URL.                                                          |
| `http.url_details.path`        | string | The HTTP path part of the URL.                                                          |
| `http.url_details.queryString` | object | The HTTP query string parts of the URL decomposed as query params key/value attributes. |
| `http.url_details.scheme`      | string | The protocol name of the URL (HTTP or HTTPS)                                            |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
