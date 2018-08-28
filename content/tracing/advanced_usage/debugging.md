---
title: Debugging
kind: documentation
---

Datadog debug settings are used to diagnose issues or audit trace data.

We discourage enabling debug mode on your production systems as it will increase the number of events that are sent to your loggers. Use sparingly for debugging purposes only.

{{< tabs >}}
{{% tab "Java" %}}
### Enabling Debug Mode
To return debug level application logs, enable debug mode with the flag `-Ddatadog.slf4j.simpleLogger.defaultLogLevel=debug` when starting the JVM.
{{% /tab %}}

{{% tab "Python" %}}
### Enabling Debug Mode
Debugging is disabled by default. 

To enable it set the environment variable
`DATADOG_TRACE_DEBUG=true` when using `ddtrace-run`.
{{% /tab %}}

{{% tab "Ruby" %}}
### Enabling Debug Mode
Debug mode is disabled by default. To enable:

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

### Application Logs
By default, all logs are processed by the default Ruby logger. When using Rails, you should see the messages in your application log file.

Datadog client log messages are marked with ``[ddtrace]``, so you can isolate them from other messages.

Additionally, it is possible to override the default logger and replace it with a custom one. This is done using the ``log`` attribute of the tracer.

```ruby
f = File.new("my-custom.log", "w+")           # Log messages should go there
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Overriding the default tracer
end

Datadog::Tracer.log.info { "this is typically called by tracing code" }
```

See [the API documentation][ruby logging docs] for more details.

[ruby logging docs]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging

{{% /tab %}}
{{% tab "Go" %}}
### Enabling Debug Mode
Debug mode on the tracer can be enabled as a `Start` config, resulting in more verbose logging:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{% /tab %}}

{{% tab "Node.js" %}}
### Enabling Debug Mode
Debug mode is disabled by default, to enable it:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

### Application Logs
By default, logging from this library is disabled. In order to get debbuging information and errors sent to logs, the `debug` options should be set to `true` in the [init()](https://datadog.github.io/dd-trace-js/Tracer.html#init) method.

The tracer will then log debug information to `console.log()` and errors to `console.error()`. This behavior can be changed by passing a custom logger to the tracer. The logger should contain a `debug()` and `error()` methods that can handle messages and errors, respectively.

For example:

```javascript
const bunyan = require('bunyan')
const logger = bunyan.createLogger({
  name: 'dd-trace',
  level: 'trace'
})

const tracer = require('dd-trace').init({
  logger: {
    debug: message => logger.trace(message),
    error: err => logger.error(err)
  },
  debug: true
})
```

For more tracer settings, check out the [API documentation][nodejs api doc].
[nodejs api doc]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{% /tab %}}
{{< /tabs >}}
