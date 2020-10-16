---
dependencies:
- https://github.com/DataDog/browser-sdk/blob/master/packages/logs/README.md
kind: documentation
title: RUM Browser Monitoring
---
---
title: Browser Log Collection
kind: documentation
aliases:
  - /logs/log_collection/web_browser
further_reading:
- link: "https://www.npmjs.com/package/@datadog/browser-logs"
  tag: "NPM"
  text: "@datadog/browser-logs NPM package"
- link: "/logs/processing/"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "/logs/explorer/"
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

1. **Get a Datadog Client Token**: For security reasons, [API keys][1] cannot be used to configure the `datadog-logs` library, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][2] must be used. For more information about setting up a client token, see the [client token documentation][2].
2. **Configure the Datadog browser log library** [through NPM](#npm-setup) or paste the [bundle](#bundle-setup) into the head tag directly.

### NPM setup

After adding [`@datadog/browser-logs`][3] to your `package.json` file, initialize it with:

{{< site-region region="us" >}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100
});
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: 'datadoghq.eu',
  forwardErrorsToLogs: true,
  sampleRate: 100
});
```

{{< /site-region >}}

### Bundle setup

In order to not miss any logs or errors, you should load and configure the library at the beginning of the head section of your pages.

{{< site-region region="us" >}}

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        site: 'datadoghq.com',
        forwardErrorsToLogs: true,
        sampleRate: 100
      });
    </script>
  </head>
</html>
```

{{< /site-region >}}
{{< site-region region="eu" >}}

```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs.js"></script>
    <script>
      window.DD_LOGS && DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        site: 'datadoghq.eu',
        forwardErrorsToLogs: true,
        sampleRate: 100
      });
    </script>
  </head>
</html>
```

{{< /site-region >}}

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

### Initialization parameters

The following parameters can be used to configure the Datadog browser log library to send logs to Datadog:

| Parameter                      | Type    | Required | Default         | Description                                                                                              |
|--------------------------------|---------|----------|-----------------|----------------------------------------------------------------------------------------------------------|
| `clientToken`                  | String  | Yes      | `-`             | A [Datadog Client Token][2].                                                                             |
| `site`                         | String  | Yes      | `datadoghq.com` | The Datadog Site of your organization. `datadoghq.com` for Datadog US site, `datadoghq.eu` for Datadog EU site. |
| `service`                      | String  | No       | ``              | The service name for this application.                                                                    |
| `env`                          | String  | No       | ``              | The application’s environment e.g. prod, pre-prod, staging.                   |
| `version`                      | String  | No       | ``              | The application’s version e.g. 1.2.3, 6c44da20, 2020.02.13.                   |
| `forwardErrorsToLogs`          | Boolean | No       | `true`          | Set to `false` to stop forwarding console.error logs, uncaught exceptions and network errors to Datadog. |
| `sampleRate`                   | Number  | No       | `100`           | Percentage of sessions to track. Only tracked sessions send logs. `100` for all, `0` for none of them.   |
| `trackSessionAcrossSubdomains` | Boolean | No       | `false`         | Set to `true` to preserve session across subdomains of the same site. **If you use both Logs and RUM SDKs, this config must match.**  |
| `useSecureSessionCookie`       | Boolean | No       | `false`         | Set to `true` to use a secure session cookie. This will prevent session tracking on insecure (non-HTTPS) connections. **If you use both Logs and RUM SDKs, this config must match.** |
| `useCrossSiteSessionCookie`    | Boolean | No       | `false`         | Set to `true` to use a secure cross-site session cookie. This will allow the Logs SDK to run when the site is loaded from another one (for example, in an `iframe`). Implies useSecureSessionCookie. **If you use both Logs and RUM SDKs, this config must match.** |

## Send a custom log entry

Once Datadog Browser log library is initialized, send a custom log entry directly to Datadog with the API:

`logger.debug | info | warn | error (message: string, messageContext = Context)`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

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

* `view.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

### Using status as a parameter

Once Datadog Browser log library is initialized, send a custom log entry directly with its status as a parameter to Datadog with the API:

`log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')`

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

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
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.createLogger('signupLogger', 'info', 'http', {'env': 'staging'})
```

It can now be used in a different part of the code with:

```javascript
import { datadogLogs } from '@datadog/browser-logs';

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
if (window.DD_LOGS) {
    const signupLogger = DD_LOGS.createLogger('signupLogger', 'info', 'http', {'env': 'staging'})
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
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setLoggerGlobalContext("{'env': 'staging'}");

datadogLogs.addLoggerGlobalContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setLoggerGlobalContext({env: 'staging'});

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
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.setContext("{'env': 'staging'}");

datadogLogs.addContext('referrer', document.referrer);
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.setContext("{'env': 'staging'}");

window.DD_LOGS && DD_LOGS.addContext('referrer', document.referrer);
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

### Filter by status

Once Datadog Browser log library is initialized, you can set the minimal log level for your logger with the API:

`setLevel (level?: 'debug' | 'info' | 'warn' | 'error')`

Only logs with a status equal to or higher than the specified level are sent.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.setLevel('<LEVEL>');
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
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.setHandler('<HANDLER>');
```

{{% /tab %}}
{{% tab "Bundle" %}}

```javascript
window.DD_LOGS && DD_LOGS.logger.setHandler('<HANDLER>');
```

**Note**: The `window.DD_LOGS` check is used to prevent issues if a loading failure occurs with the library.

{{% /tab %}}
{{< /tabs >}}

## Supported browsers

The `datadog-logs` library supports all modern desktop and mobile browsers. IE10 and IE11 are also supported.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



--------------
REPO CONTENT:



Datadog browser logs library.

[Browser support][4]

## Setup

### NPM

```
import { datadogLogs } from '@datadog/browser-logs'
datadogLogs.init({
  clientToken: 'XXX',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100
})
```

### Bundle

```
<script src = 'https://www.datadoghq-browser-agent.com/datadog-logs.js'>
<script>
  window.DD_LOGS.init({
    clientToken: 'XXX',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100
  });
</script>
```

## Public API

What we call `Context` is a map `{key: value}` that will be added to the message context.

- Init must be called before other methods.

  - Configurable options:

    - `forwardErrorsToLogs`: when truthy, we'll automatically forward `console.error` logs, uncaught exceptions and network errors.
    - `sampleRate`: percentage of sessions to track. Only tracked sessions send logs.
    - `site`: The site of the Datadog intake to send SDK data to (default: 'datadoghq.com', set to 'datadoghq.eu' to send data to the EU site)
    - `silentMultipleInit`: prevent logging errors while having multiple Init
    - `service`: name of the corresponding service
    - `env`: environment of the service
    - `version`: version of the service

  - Options that must have matching configuration when using `rum` SDK:

    - `trackSessionAcrossSubdomains`: preserve session across subdomains of the same site (default: `false`)
    - `useSecureSessionCookie`: use a secure session cookie. This will disable session tracking on insecure (non-HTTPS) connections. (default: `false`)
    - `useCrossSiteSessionCookie`: use a secure cross-site session cookie. This will allow the Logs SDK to run when the site is loaded from another one (ex: via an iframe). Implies `useSecureSessionCookie`. (default: `false`)

  ```
  init(configuration: {
      clientToken: string,
      site?: string,
      forwardErrorsToLogs?: boolean,
      sampleRate?: number,
      silentMultipleInit?: boolean,
      service?: string,
      env?: string,
      version?: string,
      trackSessionAcrossSubdomains?: boolean,
      useSecureSessionCookie?: boolean,
      useCrossSiteSessionCookie?: boolean,
  })
  ```

- Default logger

  ```
  logger.debug | info | warn | error (message: string, messageContext = Context)`
  logger.log (message: string, messageContext: Context, status? = 'debug' | 'info' | 'warn' | 'error')
  logger.setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
  logger.setHandler (handler?: 'http' | 'console' | 'silent')
  logger.addContext (key: string, value: any)  # add one key-value to the logger context
  logger.removeContext (key: string)  # remove one key from the logger context
  logger.setContext (context: Context)  # entirely replace the logger context
  ```

- Custom loggers

  Custom loggers have the same API than the default logger

  ```
  createLogger (name: string, conf?: {
      level?: 'debug' | 'info' | 'warn' | 'error'
      handler?: 'http' | 'console' | 'silent'
      context?: Context
  })  # create a new logger
  getLogger (name: string)  # retrieve a previously created logger
  ```

- Modify the global context for all loggers
  ```
  addLoggerGlobalContext (key: string, value: any)  # add one key-value to the default context
  removeLoggerGlobalContext (key: string)  # remove one key of the default context
  setLoggerGlobalContext (context: Context)  # entirely replace the default context
  ```

## TypeScript support

Types are compatible with TypeScript >= 3.0.
For earlier version, you can import js sources and use global variable to avoid any compilation issue:

```
import '@datadog/browser-logs/bundle/datadog-logs';

window.DD_LOGS.init({
  clientToken: 'XXX',
  site: 'datadoghq.com',
  forwardErrorsToLogs: true,
  sampleRate: 100
});
```
[1]: /account_management/api-app-keys/#api-keys
[2]: /account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: ./BROWSER_SUPPORT.md#logger
