---
title: Browser Log Collection
aliases:
  - /logs/log_collection/web_browser
algolia:
  tags: ['browser logs']
---

Send logs to Datadog from web browser pages with the browser logs SDK.

With the browser logs SDK, you can send logs directly to Datadog from web browser pages and leverage the following features:

- Use the SDK as a logger. Everything is forwarded to Datadog as JSON documents.
- Add `context` and extra custom attributes to each log sent.
- Wrap and forward every frontend error automatically.
- Forward frontend errors.
- Record real client IP addresses and user agents.
- Optimized network usage with automatic bulk posts.
- Use in Worker and Service Worker environments.

**Notes**:
- **Independent of the RUM SDK**: The Browser Logs SDK can be used without the RUM SDK.
- **Worker environments**: The Browser Logs SDK works in Worker and Service Worker environments using the same setup methods. However, logs sent from Worker environments do not automatically include session information.

## Setup

**Datadog client token**: For security reasons, [API keys][1] cannot be used to configure the browser logs SDK, because they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][2] must be used. See the [client token documentation][2] for more details.

**Datadog browser logs SDK**: Configure the SDK through [NPM](#npm) or use the [CDN async](#cdn-async) or [CDN sync](#cdn-sync) code snippets in the head tag.

**Supported environments**: The browser logs SDK supports all modern desktop and mobile browsers, as well as Worker and Service Worker environments. See the [Browser Support][4] table.

**Note**: Logs executing in Worker environments do not automatically track sessions.

### Choose the right installation method

| Installation method        | Use case                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| npm (node package manager) | This method is recommended for modern web applications. The browser logs SDK gets packaged with the rest of your front-end javascript code. It has no impact on page load performance. However, the SDK might miss errors, resources and user actions triggered before the SDK is initialized. **Note**: it is recommended to use a matching version with RUM SDK if used. |
| CDN async                  | This method is recommended for web applications with performance targets. The browser logs SDK is loaded from our CDN asynchronously: this method ensures the SDK download does not impact page load performance. However, the SDK might miss errors, resources and user actions triggered before the SDK is initialized.                                                  |
| CDN sync                   | This method is recommended for collecting all RUM events. The browser logs SDK is loaded from our CDN synchronously: this method ensures the SDK is loaded first and collects all errors, resources and user actions. This method might impact page load performance.                                                                                                      |

### NPM

After adding [`@datadog/browser-logs`][3] to your `package.json` file, initialize it with:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
  clientToken: '<DATADOG_CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

### CDN async

Load and configure the SDK in the head section of your pages. For **{{<region-param key="dd_site_name">}}** site:

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ap1.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js','DD_LOGS')
      DD_LOGS.onReady(function() {
          DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ap2.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/eu1/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'datadoghq.eu',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us3.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'us5.datadoghq.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
      <script>
      (function(h,o,u,n,d) {
        h=h[d]=h[d]||{q:[],onReady:function(c){h.q.push(c)}}
        d=o.createElement(u);d.async=1;d.src=n
        n=o.getElementsByTagName(u)[0];n.parentNode.insertBefore(d,n)
      })(window,document,'script','https://www.datadoghq-browser-agent.com/datadog-logs-v6.js','DD_LOGS')
      window.DD_LOGS.onReady(function() {
          window.DD_LOGS.init({
            clientToken: '<DATADOG_CLIENT_TOKEN>',
            site: 'ddog-gov.com',
            forwardErrorsToLogs: true,
            sessionSampleRate: 100,
          })
        })
      </script>
  </head>
</html>
```
{{</ site-region>}}


**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

### CDN sync

To receive all logs and errors, load and configure the SDK at the beginning of the head section for your pages. For **{{<region-param key="dd_site_name">}}** site:

{{< site-region region="us" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us1/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap1" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap1/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ap1.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="ap2" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/ap2/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ap2.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="eu" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/eu1/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'datadoghq.eu',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us3" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us3/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us3.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="us5" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/us5/v6/datadog-logs.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'us5.datadoghq.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}
{{< site-region region="gov" >}}
```html
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-v6.js"></script>
    <script>
      window.DD_LOGS &&
        window.DD_LOGS.init({
          clientToken: '<DATADOG_CLIENT_TOKEN>',
          site: 'ddog-gov.com',
          forwardErrorsToLogs: true,
          sessionSampleRate: 100,
        })
    </script>
  </head>
</html>
```
{{</ site-region>}}

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

### TypeScript

Types are compatible with TypeScript >= 3.8.2. For earlier versions, import JS sources and use global variables to avoid any compilation issues:

```typescript
import '@datadog/browser-logs/bundle/datadog-logs'

window.DD_LOGS.init({
  clientToken: '<CLIENT_TOKEN>',
  site: '<DATADOG_SITE>',
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
})
```

## Configuration

### Content Security Policy integration

If you're using the Datadog Content Security Policy (CSP) integration on your site, see [the RUM section of the CSP documentation][7] for configuration steps.

### Initialization parameters

Refer to the [Browser SDK API Reference][8] for the full list of available configuration options.

## Usage

### Custom logs

After the Datadog browser logs SDK is initialized, send a custom log entry directly to Datadog with the API:

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

#### CDN async

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

#### CDN sync

```javascript
window.DD_LOGS && window.DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 })
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

#### Results

The results are the same when using NPM, CDN async, or CDN sync:

```json
{
  "status": "info",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "date": 1234567890000,
  "origin": "logger",
  "http": {
    "useragent": "Mozilla/5.0 ...",
  },
  "view": {
    "url": "https://...",
    "referrer": "https://...",
  },
  "network": {
    "client": {
      "geoip": {...}
      "ip": "xxx.xxx.xxx.xxx"
    }
  }
}
```

The Logs SDK adds the following information by default (more fields can be added if the RUM SDK is
present):

- `date`
- `view.url`
- `view.referrer`
- `session_id` (only if a session is used)

The Datadog backend adds more fields, like:

- `http.useragent`
- `network.client.ip`

### Error tracking

The Datadog browser logs SDK allows for manual error tracking by using the optional `error` parameter (Available in SDK v4.36.0+). When an instance of a [JavaScript Error][5] is provided, the SDK extracts relevant information (kind, message, stack trace) from the error.

```
logger.debug | info | warn | error (message: string, messageContext?: Context, error?: Error)
```

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  datadogLogs.logger.error('Error occurred', {}, ex)
}
```

#### CDN async

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
  window.DD_LOGS.onReady(function () {
    window.DD_LOGS.logger.error('Error occurred', {}, ex)
  })
}
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

#### CDN sync

```javascript
try {
  ...
  throw new Error('Wrong behavior')
  ...
} catch (ex) {
    window.DD_LOGS && window.DD_LOGS.logger.error('Error occurred', {}, ex)
}
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

#### Results

The results are the same when using NPM, CDN async, or CDN sync:

```json
{
  "status": "error",
  "session_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "message": "Error occurred",
  "date": 1234567890000,
  "origin": "logger",
  "error" : {
    "message": "Wrong behavior",
    "kind" : "Error",
    "stack" : "Error: Wrong behavior at <anonymous> @ <anonymous>:1:1"
  },
  ...
}
```

### Generic logger function

The Datadog browser logs SDK adds shorthand functions (`.debug`, `.info`, `.warn`, `.error`) to the loggers for convenience. A generic logger function is also available, exposing the `status` parameter:

```
log (message: string, messageContext?: Context, status? = 'debug' | 'info' | 'warn' | 'error', error?: Error)
```

#### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function() {
  window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

#### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>,<ERROR>);
```

#### Placeholders

The placeholders in the examples above are described below:

| Placeholder         | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | The message of your log that is fully indexed by Datadog.                               |
| `<JSON_ATTRIBUTES>` | A valid JSON object, which includes all attributes attached to the `<MESSAGE>`.         |
| `<STATUS>`          | The status of your log; accepted status values are `debug`, `info`, `warn`, or `error`. |
| `<ERROR>`           | An instance of a [JavaScript Error][5] object.                                         |

## Advanced usage

### Scrub sensitive data from your Browser logs

If your Browser logs contain sensitive information that needs redacting, configure the Browser SDK to scrub sensitive sequences by using the `beforeSend` callback when you initialize the Browser Log Collector.

The `beforeSend` callback function can be invoked with two arguments: the `log` event and `context`. This function gives you access to each log collected by the Browser SDK before it is sent to Datadog, and lets you use the context to adjust any log properties. The context contains additional information related to the event, but not necessarily included in the event. You can typically use this information to [enrich][10] your event or [discard][11] it.

```javascript
function beforeSend(log, context)
```

The potential `context` values are:

| Value | Data Type | Use Case |
|-------|---------|------------|
| `isAborted` | Boolean | For network log events, this property tells you whether the failing request was aborted by the application, in which case you might not want to send this event because it may be intentionally aborted. |
| `handlingStack` | String | A stack trace of where the log event was handled. This can be used to identify which [micro-frontend][9] the log was sent from. |

To redact email addresses from your web application URLs:

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // remove email from view url
        log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
    },
    ...
});
```

#### CDN Async

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    })
})
```

#### CDN Sync

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
            // remove email from view url
            log.view.url = log.view.url.replace(/email=[^&]*/, "email=REDACTED")
        },
        ...
    });
```

The following properties are automatically collected by the SDK and could contain sensitive data:

| Attribute       | Type   | Description                                                                                      |
| --------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `view.url`      | String | The URL of the active web page.                                                                  |
| `view.referrer` | String | The URL of the previous web page from which a link to the currently requested page was followed. |
| `message`       | String | The content of the log.                                                                          |
| `error.stack`   | String | The stack trace or complementary information about the error.                                    |
| `http.url`      | String | The HTTP URL.                                                                                    |

### Discard specific logs

The `beforeSend` callback function allows you to also discard a log before it is sent to Datadog.

To discard network errors if their status is 404:

#### NPM

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.init({
    ...,
    beforeSend: (log) => {
        // discard 404 network errors
        if (log.http && log.http.status_code === 404) {
          return false
        }
    },
    ...
});
```

#### CDN Async

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    })
})
```

#### CDN Sync

```javascript
window.DD_LOGS &&
    window.DD_LOGS.init({
        ...,
        beforeSend: (log) => {
          // discard 404 network errors
          if (log.http && log.http.status_code === 404) {
            return false
          }
        },
        ...
    });
```

### Define multiple loggers

The Datadog browser logs SDK contains a default logger, but it is possible to define different loggers.

#### Create a new logger

After the Datadog browser logs SDK is initialized, use the API `createLogger` to define a new logger:

```typescript
createLogger (name: string, conf?: {
    level?: 'debug' | 'info' | 'warn' | 'error',
    handler?: 'http' | 'console' | 'silent',
    context?: Context
})
```

**Note**: These parameters can be set with the [setLevel](#filter-by-status), [setHandler](#change-the-destination), and [setContext](#overwrite-context) APIs.

#### Get a custom logger

After the creation of a logger, access it in any part of your JavaScript code with the API:

```typescript
getLogger(name: string)
```

##### NPM

For example, assume there is a `signupLogger`, defined with all the other loggers:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.createLogger('signupLogger', {
  level: 'info',
  handler: 'http',
  context: { env: 'staging' }
})
```

It can then be used in a different part of the code with:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

const signupLogger = datadogLogs.getLogger('signupLogger')
signupLogger.info('Test sign up completed')
```

##### CDN async

For example, assume there is a `signupLogger`, defined with all the other loggers:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
})
```

It can then be used in a different part of the code with:

```javascript
window.DD_LOGS.onReady(function () {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

##### CDN sync

For example, assume there is a `signupLogger`, defined with all the other loggers:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.createLogger('signupLogger', {
    level: 'info',
    handler: 'http',
    context: { env: 'staging' }
  })
}
```

It can then be used in a different part of the code with:

```javascript
if (window.DD_LOGS) {
  const signupLogger = window.DD_LOGS.getLogger('signupLogger')
  signupLogger.info('Test sign up completed')
}
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

### Overwrite context

#### Global context

After the Datadog browser logs SDK is initialized, it is possible to:

- Set the entire context for all your loggers with the `setGlobalContext (context: object)` API.
- Add a context to all your loggers with the `setGlobalContextProperty (key: string, value: any)` API.
- Get the entire global context with the `getGlobalContext ()` API.
- Remove context property with the `removeGlobalContextProperty (key: string)` API.
- Clear all existing context properties with the `clearGlobalContext ()` API.

> The Log Browser SDK v4.17.0 has updated the names of several APIs:
>
> - `getGlobalContext` instead of `getLoggerGlobalContext`
> - `setGlobalContext` instead of `setLoggerGlobalContext`
> - `setGlobalContextProperty` instead of `addLoggerGlobalContext`
> - `removeGlobalContextProperty` instead of `removeLoggerGlobalContext`

##### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setGlobalContext({ env: 'staging' })

datadogLogs.setGlobalContextProperty('referrer', document.referrer)

datadogLogs.getGlobalContext() // => {env: 'staging', referrer: ...}

datadogLogs.removeGlobalContextProperty('referrer')

datadogLogs.getGlobalContext() // => {env: 'staging'}

datadogLogs.clearGlobalContext()

datadogLogs.getGlobalContext() // => {}
```

##### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContext({ env: 'staging' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeGlobalContextProperty('referrer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {env: 'staging'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearGlobalContext()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getGlobalContext() // => {}
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

##### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.setGlobalContext({ env: 'staging' })

window.DD_LOGS && window.DD_LOGS.setGlobalContextProperty('referrer', document.referrer)

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging', referrer: ...}

window.DD_LOGS && window.DD_LOGS.removeGlobalContextProperty('referrer')

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {env: 'staging'}

window.DD_LOGS && window.DD_LOGS.clearGlobalContext()

window.DD_LOGS && window.DD_LOGS.getGlobalContext() // => {}
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

#### User context

The Datadog logs SDK provides convenient functions to associate a `User` with generated logs.

- Set the user for all your loggers with the `setUser (newUser: User)` API.
- Add or modify a user property to all your loggers with the `setUserProperty (key: string, value: any)` API.
- Get the currently stored user with the `getUser ()` API.
- Remove a user property with the `removeUserProperty (key: string)` API.
- Clear all existing user properties with the `clearUser ()` API.

**Note**: The user context is applied before the global context. Hence, every user property included in the global context will override the user context when generating logs.

##### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
datadogLogs.setUserProperty('type', 'customer')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

datadogLogs.removeUserProperty('type')
datadogLogs.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

datadogLogs.clearUser()
datadogLogs.getUser() // => {}
```

##### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setUserProperty('type', 'customer')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeUserProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearUser()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getUser() // => {}
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

##### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.setUser({ id: '1234', name: 'John Doe', email: 'john@doe.com' })

window.DD_LOGS && window.DD_LOGS.setUserProperty('type', 'customer')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com', type: 'customer'}

window.DD_LOGS && window.DD_LOGS.removeUserProperty('type')

window.DD_LOGS && window.DD_LOGS.getUser() // => {id: '1234', name: 'John Doe', email: 'john@doe.com'}

window.DD_LOGS && window.DD_LOGS.clearUser()

window.DD_LOGS && window.DD_LOGS.getUser() // => {}
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

#### Account context

The Datadog logs SDK provides convenient functions to associate an `Account` with generated logs.

- Set the account for all your loggers with the `setAccount (newAccount: Account)` API.
- Add or modify an account property to all your loggers with the `setAccountProperty (key: string, value: any)` API.
- Get the currently stored account with the `getAccount ()` API.
- Remove an account property with the `removeAccountProperty (key: string)` API.
- Clear all existing account properties with the `clearAccount ()` API.

**Note**: The account context is applied before the global context. Hence, every account property included in the global context will override the account context when generating logs.

##### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setAccount({ id: '1234', name: 'My Company Name' })
datadogLogs.setAccountProperty('type', 'premium')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

datadogLogs.removeAccountProperty('type')
datadogLogs.getAccount() // => {id: '1234', name: 'My Company Name'}

datadogLogs.clearAccount()
datadogLogs.getAccount() // => {}
```

##### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setAccountProperty('type', 'premium')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.removeAccountProperty('type')
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.clearAccount()
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getAccount() // => {}
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

##### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.setAccount({ id: '1234', name: 'My Company Name' })

window.DD_LOGS && window.DD_LOGS.setAccountProperty('type', 'premium')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name', type: 'premium'}

window.DD_LOGS && window.DD_LOGS.removeAccountProperty('type')

window.DD_LOGS && window.DD_LOGS.getAccount() // => {id: '1234', name: 'My Company Name'}

window.DD_LOGS && window.DD_LOGS.clearAccount()

window.DD_LOGS && window.DD_LOGS.getAccount() // => {}
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

#### Contexts life cycle

By default, contexts are stored in the current page memory, which means they are not:

- kept after a full reload of the page
- shared across different tabs or windows of the same session

To add them to all events of the session, they must be attached to every page.

With the introduction of the `storeContextsAcrossPages` configuration option in the v4.49.0 of the browser SDK, those contexts can be stored in [`localStorage`][6], allowing the following behaviors:

- Contexts are preserved after a full reload
- Contexts are synchronized between tabs opened on the same origin

However, this feature comes with some **limitations**:

- Setting Personable Identifiable Information (PII) in those contexts is not recommended, as data stored in `localStorage` outlives the user session
- The feature is incompatible with the `trackSessionAcrossSubdomains` options because `localStorage` data is only shared among the same origin (login.site.com ≠ app.site.com)
- `localStorage` is limited to 5 MiB by origin, so the application-specific data, Datadog contexts, and other third-party data stored in `localStorage` must be within this limit to avoid any issues

#### Logger context

After a logger is created, it is possible to:

- Set the entire context for your logger with the `setContext (context: object)` API.
- Set a context property on your logger with `setContextProperty (key: string, value: any)` API:

##### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.setContext("{'env': 'staging'}")

datadogLogs.setContextProperty('referrer', document.referrer)
```

##### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContext("{'env': 'staging'}")
})

window.DD_LOGS.onReady(function () {
  window.DD_LOGS.setContextProperty('referrer', document.referrer)
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

##### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.setContext("{'env': 'staging'}")

window.DD_LOGS && window.DD_LOGS.setContextProperty('referrer', document.referrer)
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

### Filter by status

After the Datadog browser logs SDK is initialized, the minimal log level for your logger is set with the API:

```
setLevel (level?: 'debug' | 'info' | 'warn' | 'error')
```

Only logs with a status equal to or higher than the specified level are sent.

#### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setLevel('<LEVEL>')
```

#### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setLevel('<LEVEL>')
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

#### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setLevel('<LEVEL>')
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

### Change the destination

By default, loggers created by the Datadog browser logs SDK are sending logs to Datadog. After the Datadog browser logs SDK is initialized, it is possible to configure the logger to:

- send logs to the `console` and Datadog (`http`)
- send logs to the `console` only
- not send logs at all (`silent`)

```
setHandler (handler?: 'http' | 'console' | 'silent' | Array<handler>)
```

#### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.logger.setHandler('<HANDLER>')
datadogLogs.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

#### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.logger.setHandler('<HANDLER>')
  window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
})
```

**Note**: Early API calls must be wrapped in the `window.DD_LOGS.onReady()` callback. This ensures the code only gets executed once the SDK is properly loaded.

#### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.logger.setHandler('<HANDLER>')
window.DD_LOGS && window.DD_LOGS.logger.setHandler(['<HANDLER1>', '<HANDLER2>'])
```

**Note**: The `window.DD_LOGS` check prevents issues when a loading failure occurs with the SDK.

### User tracking consent

To be compliant with GDPR, CCPA and similar regulations, the Logs Browser SDK lets you provide the tracking consent value at initialization.

The `trackingConsent` initialization parameter can be one of the following values:

1. `"granted"`: The Logs Browser SDK starts collecting data and sends it to Datadog.
2. `"not-granted"`: The Logs Browser SDK does not collect any data.

To change the tracking consent value after the Logs Browser SDK is initialized, use the `setTrackingConsent()` API call. The Logs Browser SDK changes its behavior according to the new value:

* when changed from `"granted"` to `"not-granted"`, the Logs session is stopped, and data is no longer sent to Datadog.
* when changed from `"not-granted"` to `"granted"`, a new Logs session is created if no previous session is active, and data collection resumes.

This state is not synchronized between tabs nor persisted between navigation. It is your responsibility to provide the user decision during Logs Browser SDK initialization or by using `setTrackingConsent()`.

When `setTrackingConsent()` is used before `init()`, the provided value takes precedence over the initialization parameter.

#### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    ...,
    trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', function() {
    datadogLogs.setTrackingConsent('granted');
});
```

#### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function() {
    window.DD_LOGS.init({
        ...,
        trackingConsent: 'not-granted'
    });
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS.onReady(function() {
        window.DD_LOGS.setTrackingConsent('granted');
    });
});
```

#### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.init({
  ...,
  trackingConsent: 'not-granted'
});

acceptCookieBannerButton.addEventListener('click', () => {
    window.DD_LOGS && window.DD_LOGS.setTrackingConsent('granted');
});
```

### Access internal context

After the Datadog browser logs SDK is initialized, you can access the internal context of the SDK. This allows you to access the `session_id`.

```
getInternalContext (startTime?: 'number' | undefined)
```

You can optionally use `startTime` parameter to get the context of a specific time. If the parameter is omitted, the current context is returned.

#### NPM

For NPM, use:

```javascript
import { datadogLogs } from '@datadog/browser-logs'

datadogLogs.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

#### CDN async

For CDN async, use:

```javascript
window.DD_LOGS.onReady(function () {
  window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
})
```

#### CDN sync

For CDN sync, use:

```javascript
window.DD_LOGS && window.DD_LOGS.getInternalContext() // { session_id: "xxxx-xxxx-xxxx-xxxx" }
```

<!-- Note: all URLs should be absolute -->

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[3]: https://www.npmjs.com/package/@datadog/browser-logs
[4]: https://github.com/DataDog/browser-sdk/blob/main/packages/logs/BROWSER_SUPPORT.md
[5]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[7]: /integrations/content_security_policy_logs/#use-csp-with-real-user-monitoring-and-session-replay
[8]: https://datadoghq.dev/browser-sdk/interfaces/_datadog_browser-logs.LogsInitConfiguration.html
[9]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#micro-frontend
[10]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#enrich-and-control-rum-data
[11]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#discard-a-rum-event
