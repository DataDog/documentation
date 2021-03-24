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
  - link: "/real_user_monitoring/browser/data_collected/"
    tag: "Documentation"
    text: "Collecting Browser Data and Context"
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

- **network**: XHR or Fetch errors resulting from AJAX requests. Specific attributes to network errors can be found [in the network errors documentation](#network-errors).
- **source**: Unhandled exceptions or unhandled promise rejections (source-code related).
- **console**: `console.error()` API calls.
- **custom**: Errors sent with the [RUM `addError` API](#collect-errors-manually) that default to `custom`.

## Error attributes

For information about the default attributes, global context, and sampling see [Collecting Browser Data and Context][1].

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

Source errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][2].

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

**Note**: The [Error Tracking][3] feature processes errors sent with source set to `custom` or `source` and that contain a stack trace.

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


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /real_user_monitoring/browser/data_collected/
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[3]: /real_user_monitoring/error_tracking
