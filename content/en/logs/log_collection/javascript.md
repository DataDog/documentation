---
title: Browser Log Collection
kind: documentation
aliases:
  - /logs/log_collection/web_browser
further_reading:
- link: "https://www.npmjs.com/package/@datadog/browser-logs"
  tag: "NPM"
  text: "@datadog/browser-logs NPM package"
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
---

Send logs to Datadog from web browsers or other Javascript clients thanks to Datadog's `datadog-logs` client-side JavaScript logging library.

With the `datadog-logs` library, you can send logs directly to Datadog from JS clients and leverage the following features:

* Use the library as a logger. Everything is forwarded to Datadog as JSON documents.
* Add `context` and extra custom attributes to each log sent.
* Wrap and forward every frontend error automatically.
* Forward frontend errors.
* Record real client IP addresses and user agents.
* Optimized network usage with automatic bulk posts.

## Setup

1. **Get a Datadog Client Token**: For security reasons, [API keys][1] cannot be used to configure the `datadog-logs` library, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][2] must be used. For more information about setting up a client tolken, see the [Client tokens documentation][2].
2. **Configure the Datadog browser log library** [through NPM](#npm-setup) or paste the [bundle](#bundle-setup) into the head tag directly.

### NPM setup

After adding [`@datadog/browser-logs`][3] to your `package.json` file, initialize it with:

{{< tabs >}}
{{% tab "US" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'us',
  isCollectingError: true,
  sampleRate: 100
});
```

{{% /tab %}}
{{% tab "EU" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  datacenter: 'eu',
  isCollectingError: true,
  sampleRate: 100
});
```

{{% /tab %}}
{{< /tabs >}}

### Bundle setup

In order to not miss any logs or errors, you should load and configure the library at the beginning of the head section of your pages.

{{< tabs >}}
{{% tab "US" %}}

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        isCollectingError: true,
        sampleRate: 100
      });
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{% tab "EU" %}}

```html
<head>
  <title>Example to send logs to Datadog</title>
  <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
  <script>
    window.DD_LOGS && DD_LOGS.init({
      clientToken: '<CLIENT_TOKEN>',
      isCollectingError: true,
      sampleRate: 100
    });
  </script>
</head>
```

{{% /tab %}}
{{< /tabs >}}

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

### Initialization parameters

The following parameters can be used to configure the Datadog browser log library to send logs to Datadog:

| Parameter             | Type    | Required | Default | Description                                                                                              |
|-----------------------|---------|----------|---------|----------------------------------------------------------------------------------------------------------|
| `clientToken`         | String  | Yes      | `-`     | A [Datadog Client Token][4].                                                                             |
| `datacenter`          | String  | Yes      | `us`    | The Datadog Site of your organization. `us` for Datadog US site, `eu` for Datadog EU site.               |
| `forwardErrorsToLogs` | Boolean | no       | `true`  | Set to `false` to stop forwarding console.error logs, uncaught exceptions and network errors to Datadog. |
| `sampleRate`          | Number  | no       | `100`   | Percentage of sessions to track. Only tracked sessions send logs. `100` for all, `0` for none of them.   |

## Send a custom log entry

Once Datadog Browser log library is initialized, send a custom log entry directly to Datadog with the API:

`logger.debug | info | warn | error (message: string, messageContext = Context)`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 });
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 });
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

This gives the following result:

```json
{
  "status": "info",
  "session_id": "1234",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "http": {
    "url": "...",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36"
  },
  "network": {"client": {"ip": "109.30.xx.xxx"}}
}
```

The logger adds the following information by default:

* `http.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

### Using status as a parameter

Once Datadog Browser log library is initialized, send a custom log entry directly with its status as a parameter to Datadog with the API:

`log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>);
```

{{% /tab %}}
{{< /tabs >}}

| Placeholder         | Description                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| `<MESSAGE>`         | The message of your log that is fully indexed by Datadog                                |
| `<JSON_ATTRIBUTES>` | A valid JSON object that includes all attributes attached to the `<MESSAGE>`            |
| `<STATUS>`          | Status of your log; the accepted status values are `debug`, `info`, `warn`, or `error`. |

## Advanced usage

### Define multiple loggers

The Datadog Browser log library contains a default logger, but it is also possible to define different loggers, which can be convenient when several teams are working on the same project

#### Create a new logger

Once Datadog Browser log library is initialized, use the API `createLogger` to define a new logger:

```text
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error'
    handler?: 'http' | 'console' | 'silent'
    context?: Context
})
```

**Note**: Those parameters can also be set with the [setLevel](#filter-by-status), [setHandler](#change-the-destination), and [setContext](#overwrite-context) APIs.

#### Get a custom logger

After the creation of a logger, you can access it in any part of your JavaScript code with the API:

`getLogger (name: string)`

#### Example

Assume that there is a `signupLogger` logger, defined with all the other loggers:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', 'info', 'http', {'env', 'staging'})
```

It can now be used in a different part of the code with:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', {'env', 'staging'})
}
```

It can now be used in a different part of the code with:

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.getLogger('signupLogger')
    signupLogger.info('Test sign up completed')
}
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

### Overwrite context

#### Global Context

Once Datadog Browser log library is initialized, it is possible to:

* Set the entire context for all your loggers with the `setLoggerGlobalContext (context: Context)` API.
* Add a context to all your loggers with `addLoggerGlobalContext (key: string, value: any)` API.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setLoggerGlobalContext("{'env', 'staging'}");

datadogLogs.addLoggerGlobalContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext("{'env', 'staging'}");

window.DD_LOGS && DD_LOGS.addLoggerGlobalContext('referrer', document.referrer);
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

#### Logger Context

Once a logger is created, it is possible to:

* Set the entire context for your logger with the `setContext (context: Context)` API.
* Add a context to your logger with `addContext (key: string, value: any)` API:

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env', 'staging'}");

datadogLogs.addContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env', 'staging'}");

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer);
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

### Filter by status

Once Datadog Browser log library is initialized, you can set the minimul log level for your logger with the API:

`setLevel (level?: 'debug' | 'info' | 'warn' | 'error')`

Only logs with a status equal to or higher than the specified level are sent.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setLevel('<LEVEL>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.setLevel('<LEVEL>');
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

### Change the destination

By default, loggers created by the Datadog Browser log library are sending logs to Datadog.
Once Datadog Browser log library is initialized, it is possible to configure the logger to send logs to the `console`, or to not send logs at all (`silent`) thanks to the API:

`setHandler (handler?: 'http' | 'console' | 'silent')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setHandler('<HANDLER>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setHandler('<HANDLER>');
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

## Supported browsers

The `datadog-logs` library supports all modern desktop and mobile browsers. IE10 and IE11 are also supported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: /account_management/api-app-keys/#client-tokens
