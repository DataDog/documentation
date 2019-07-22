---
title: Browser Log Collection
kind: documentation
aliases:
  - /logs/log_collection/web_browser
further_reading:
- link: "logs/processing"
  tag: "Documentation"
  text: "Learn how to process your logs"
- link: "logs/processing/parsing"
  tag: "Documentation"
  text: "Learn more about parsing"
- link: "logs/explorer"
  tag: "Documentation"
  text: "Learn how to explore your logs"
- link: "logs/explorer/analytics"
  tag: "Documentation"
  text: "Perform Log Analytics"
- link: "logs/faq/log-collection-troubleshooting-guide"
  tag: "FAQ"
  text: "Log Collection Troubleshooting Guide"
---


Send logs to Datadog from web browsers or other Javascript clients thanks to Datadog's `datadog-logs` client-side JavaScript logging library.

With the `datadog-logs` library, you can send logs directly to Datadog from JS clients and leverage the following features:

* Use the library as a logger. Everything is forwarded to Datadog as JSON documents.
* Add `context` and extra custom attributes to each log sent.
* Wrap and forward every JavaScript error automatically.
* Forward JavaScript console logs.
* Record real client IP addresses and user agents.
* Optimized network usage with automatic bulk posts.

## Get a Client Token

For security reasons, [API keys][1] cannot be used to configure the `datadog-logs` library, as they would be exposed client-side in the JavaScript code. To collect logs from web browsers, a [client token][2] must be used.

To manage your client tokens, go to your [Datadog API configuration page][3] in the `Client Tokens` section as shown here:

{{< img src="logs/log_collection/client_tokens.png" style="width:80%;" alt="Client tokens" responsive="true" >}}

Read the [Client tokens documentation][2] to learn more about the restrictions that apply.

## Configure the JavaScript logger

The following parameters can be used to configure the library to send logs to Datadog:

* Set `forwardErrorsToLogs` to `false` to turn off automatic JS and console error collection.
* Use `addLoggerGlobalContext` to add JSON attributes to all generated logs
* Set `clientToken` to the value of the client token (**only client tokens can be used in this library**)

{{< tabs >}}
{{% tab "US" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-us.js"></script>
    <script>
      // Set your client token
      DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        forwardErrorsToLogs: true,
    });

      // OPTIONAL
      // add global metadata attribute--one attribute can be added at a time
      DD_LOGS.addLoggerGlobalContext('<META_KEY>', <META_VALUE>);
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{% tab "EU" %}}

```
<html>
  <head>
    <title>Example to send logs to Datadog</title>
    <script type="text/javascript" src="https://www.datadoghq-browser-agent.com/datadog-logs-eu.js"></script>
    <script>
      // Set your client token
      DD_LOGS.init({
        clientToken: '<CLIENT_TOKEN>',
        forwardErrorsToLogs: true,
    });

      // OPTIONAL
      // add global metadata attribute--one attribute can be added at a time
      DD_LOGS.addLoggerGlobalContext('<META_KEY>', <META_VALUE>);
    </script>
    ...
  </head>
...
</html>
```

{{% /tab %}}
{{< /tabs >}}

## Send a custom log entry

Send a custom log entry directly to Datadog with the `log` function:

```
DD_LOGS.logger.log(<MESSAGE>,<JSON_ATTRIBUTES>,<STATUS>)
```

| Placeholder         | Description                                                                             |
| ------------------- | --------------------------------------------------------------------------------------- |
| `<MESSAGE>`         | The message of your log that is fully indexed by Datadog                                |
| `<JSON_ATTRIBUTES>` | A valid JSON object that includes all attributes attached to the `<MESSAGE>`            |
| `<STATUS>`          | Status of your log; the accepted status values are `debug`, `info`, `warn`, or `error`. |

Status can also be used as a placeholder for the `log` function `DD_LOGS.logger.debug(<MESSAGE>,<JSON_ATTRIBUTES>)`.

**Example:**

```
...
<script>
...
DD_LOGS.logger.info('Button clicked', { name: 'buttonName', id: 123 });
...
</script>
...
```

This gives the following result:

```
{
  "status": "info",
  "session_id": "1234",
  "name": "buttonName",
  "id": 123,
  "message": "Button clicked",
  "http":{
    "url": "...",
    "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.130 Safari/537.36"
    },
  "network":{
    "client": {
      "ip" : "109.30.xx.xxx"
    }
  }
}
```

The logger adds the following information by default:

* `http.url`
* `session_id`
* `http.useragent`
* `network.client.ip`

## Advanced usage

### Filter by status

In some cases, you might want to disable the debug mode or to only collect warnings and errors. This can be achieved by changing the logging level: set the `level` parameter to `debug` (default), `info`, `warn`, or `error` :

```
DD_LOGS.logger.setLevel('<LEVEL>')
```

Only logs with a status equal to or higher than the specified level are sent.

### Change the destination

By default, the loggers are sending logs to Datadog. It is also possible to configure the logger to send logs to the console, or to not send logs at all. This can be used in the development environment to keep the logs locally.

Use the `setHandler` function with the values `http` (default), `console`, or `silent`:
```
DD_LOGS.logger.setHandler('<HANDLER>')
```

### Define multiple loggers

The library contains a default logger, but it is also possible to define different loggers, which can be convenient when several teams are working on the same project.

Each logger can optionally be configured with its own log level, handler, and context. Note that the `Global Context` is added on top of each logger context.

Use the following to define a custom logger:

```
createLogger (<LOGGER_NAME>, {
    level?: 'debug' | 'info' | 'warn' | 'error'
    handler?: 'http' | 'console' | 'silent'
    context?: <JSON_ATTRIBUTES>
})
```

Those parameters can also be set with the `setContext`, `setLevel`, and `setHandler` functions.
After the creation of this logger, you can then access it in any part of your JavaScript code with the `getLogger` function:

```
const my_logger = getLogger('<LOGGER_NAME>')
```

**Example:**


Assume that there is a signup logger, defined with all the other loggers:

```
# create a new logger
const signupLogger = createLogger('signupLogger'})
signupLogger.addContext('env', 'staging')
```

It can now be used in a different part of the code with:

```
...
<script>
...
const signupLogger = getLogger('signupLogger')
signupLogger.info('Test sign up completed')
...
</script>
...
```

### Overwrite context

It is possible to set the entire context in one call. This also overrides previously set attributes, if any:

```
# For one logger
my_logger.setContext(<JSON_ATTRIBUTES>)

# For the global context
DD_LOGS.setLoggerGlobalContext(<JSON_ATTRIBUTES>)
```

**Example:**

```
const signupLogger = getLogger('signupLogger')
signupLogger.setContext({
  env: 'staging',
  team: 'user-account'
})
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[2]: https://docs.datadoghq.com/account_management/api-app-keys/#client-tokens
[3]: https://app.datadoghq.com/account/settings#api
