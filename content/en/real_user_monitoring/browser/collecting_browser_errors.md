---
title: Collecting Browser Errors
kind: documentation
further_reading:
  - link: "/real_user_monitoring/error_tracking/"
    tag: Documentation
    text: "Error Tracking"
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


Front-end errors are collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

## Error origins
Front-end errors are split into four different categories depending on their `error.origin`:

- **network**: XHR or Fetch errors resulting from AJAX requests. Specific attributes to network errors can be found [in the network errors documentation][1].
- **source**: Unhandled exceptions or unhandled promise rejections (source-code related).
- **console**: `console.error()` API calls.
- **custom**: Errors sent with the [RUM `addError` API](#collect-errors-manually) that default to `custom`.

## Error attributes

For information about the default attributes for all RUM event types, see [Data Collected][2]. For information about configuring for sampling or global context see [Modifying RUM Data and Context][3].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | string | Where the error originates from (for example, `console` or `network`).     |
| `error.type`    | string | The error type (or error code in some cases).                   |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |

### Network errors

Network errors include information about failing HTTP requests. The following facets are collected:

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

### Source errors

Source errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][4].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | string | The error type (or error code in some cases).                   |

## Collect errors manually

Monitor handled exceptions, handled promise rejections and other errors not tracked automatically by the RUM SDK with the `addError()` API:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context,
    source: ErrorSource.CUSTOM | ErrorSource.NETWORK | ErrorSource.SOURCE = ErrorSource.CUSTOM
);
{{< /code-block >}}

**Note**: The [Error Tracking][5] feature processes errors sent with source set to `custom` or `source` and that contain a stack trace. Errors sent with any other source (such as `console`) will not be processed by Error Tracking.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Send a custom error with context
const error = new Error('Something wrong occurred.');

datadogRum.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    datadogRum.addError(error, undefined, 'network');
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error, undefined, 'source');
}
```
{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

DD_RUM.onReady(function() {
    DD_RUM.addError(error, {
        pageStatus: 'beta',
    });
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'network');
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error, undefined, 'source');
    })
}
```
{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
// Send a custom error with context
const error = new Error('Something wrong occurred.');

window.DD_RUM && DD_RUM.addError(error, {
    pageStatus: 'beta',
});

// Send a network error
fetch('<SOME_URL>').catch(function(error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'network');
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error, undefined, 'source');
}
```
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### Script error

For security reasons, browsers hide details from errors triggered by cross-origin scripts. When this happens, the Error Details tab shows an error with the minimal message "Script error."

{{< img src="real_user_monitoring/browser/script-error.png" alt="Real User Monitoring script error example" style="width:75%;" >}}

For more information about cross-origin scripts and why details are hidden, see [CORS][6] and [this Note on Global Event Handlers][7]. Some possible reasons for this error include:
- Your JavaScript files are hosted on a different hostname (for instance, `example.com` includes assets from `static.example.com`).
- Your website includes JavaScript libraries hosted on a CDN.
- Your website includes third-party JavaScript libraries hosted on the provider's servers.

Get visibility into cross-origin scripts by following these two steps:
1. Call JavaScript libraries with `crossorigin="anonymous"`.

    With `crossorigin="anonymous"`, the request to fetch the script is performed securely. No sensitive data is forwarded via cookies or HTTP authentication.

2. Configure the `Access-Control-Allow-Origin` HTTP header.

    The most common value for this header is `Access-Control-Allow-Origin: *`, which allows all origins to fetch the resource. Instead, restrict which origins can access your resources by setting, for example `Access-Control-Allow-Origin: www.example.com`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /real_user_monitoring/data_collected/error/#network-errors
[2]: /real_user_monitoring/browser/data_collected/
[3]: /real_user_monitoring/browser/modifying_data_and_context/
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[5]: /real_user_monitoring/error_tracking
[6]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[7]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
