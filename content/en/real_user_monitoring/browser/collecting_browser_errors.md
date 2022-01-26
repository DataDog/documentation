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
  - link: "/real_user_monitoring/explorer/visualize/"
    tag: "Documentation"
    text: "Apply visualizations on your events"
  - link: "/real_user_monitoring/dashboards/"
    tag: "Documentation"
    text: "RUM Dashboards"
---

Front-end errors are collected with Real User Monitoring (RUM). The error message and stack trace are included when available.

## Error origins
Front-end errors are split into four different categories depending on their `error.origin`:

- **source**: Unhandled exceptions or unhandled promise rejections (source-code related).
- **console**: `console.error()` API calls.
- **custom**: Errors sent with the [RUM `addError` API](#collect-errors-manually).

## Error attributes

For information about the default attributes for all RUM event types, see [Data Collected][1]. For information about configuring for sampling or global context see [Modifying RUM Data and Context][2].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.source`  | string | Where the error originates from (for example, `console`).         |
| `error.type`    | string | The error type (or error code in some cases).                     |
| `error.message` | string | A concise, human-readable, one-line message explaining the event. |
| `error.stack`   | string | The stack trace or complementary information about the error.     |

### Source errors

Source errors include code-level information about the error. More information about the different error types can be found in [the MDN documentation][3].

| Attribute       | Type   | Description                                                       |
|-----------------|--------|-------------------------------------------------------------------|
| `error.type`    | string | The error type (or error code in some cases).                   |

## Collect errors manually

Monitor handled exceptions, handled promise rejections and other errors not tracked automatically by the RUM SDK with the `addError()` API:

{{< code-block lang="javascript" >}}
addError(
    error: unknown,
    context?: Context
);
{{< /code-block >}}

**Note**: The [Error Tracking][4] feature processes errors sent with source set to `custom` or `source` and that contain a stack trace. Errors sent with any other source (such as `console`) will not be processed by Error Tracking.

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
    datadogRum.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    datadogRum.addError(error);
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
        DD_RUM.addError(error);
    });
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    DD_RUM.onReady(function() {
        DD_RUM.addError(error);
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
    window.DD_RUM && DD_RUM.addError(error);
})

// Send a handled exception error
try {
    //Some code logic
} catch (error) {
    window.DD_RUM && DD_RUM.addError(error);
}
```
{{% /tab %}}
{{< /tabs >}}

## Troubleshooting

### Script error

For security reasons, browsers hide details from errors triggered by cross-origin scripts. When this happens, the Error Details tab shows an error with the minimal message "Script error."

{{< img src="real_user_monitoring/browser/script-error.png" alt="Real User Monitoring script error example" style="width:75%;" >}}

For more information about cross-origin scripts and why details are hidden, see [CORS][5] and [this Note on Global Event Handlers][6]. Some possible reasons for this error include:
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


[1]: /real_user_monitoring/browser/data_collected/
[2]: /real_user_monitoring/browser/modifying_data_and_context/
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[4]: /real_user_monitoring/error_tracking
[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[6]: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror#notes
