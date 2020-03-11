---
title: APM Troubleshooting
kind: documentation
further_reading:
- link: "/tracing/troubleshooting/agent_apm_metrics"
  tag: "Documentation"
  text: "APM metrics sent by the Datadog Agent"
---

When experiencing unexpected behavior with Datadog APM, there are a few common issues you can look for before reaching out to [Datadog support][1]:

1. **Make sure the Agent has APM enabled**:

    Run the following command on the Agent host: `netstat -van | grep 8126`.

    If you don't see an entry, then the Agent is not listening on port `8126`, which usually means either that the Agent is not running or that APM is not enabled in your `datadog.yaml` file. See the [APM Agent setup documentation][2] for more information.

2. **Ensure that the Agent is functioning properly**:

    In some cases the Agent may have issues sending traces to Datadog. [Enable Agent debug mode][3] and check the [Trace Agent logs][4] to see if there are any errors.

3. **Verify that your tracer is running correctly**:

    After having [enabled tracer debug mode](#tracer-debug-mode), check your Agent logs to see if there is more info about your issue.

If there are errors that you don't understand, or [traces][5] are reported to be flushed to Datadog and you still cannot see them in the Datadog UI, [contact Datadog support][1] and provide the relevant log entries with [a flare][6].

## Tracer debug mode

Datadog debug settings are used to diagnose issues or audit trace data. Enabling debug mode in production systems is not recommended, as it increases the number of events that are sent to your loggers. Use it sparingly, for debugging purposes only.

Debug mode is disabled by default. To enable it, follow the corresponding language tracer instructions:

{{< tabs >}}
{{% tab "Java" %}}

To enable debug mode for the Datadog Java Tracer, set the flag `-Ddd.trace.debug=true` when starting the JVM or add `DD_TRACE_DEBUG=true` as environment variable.

**Note**: Datadog Java Tracer implements SL4J SimpleLogger. As such, [all of its settings can be applied][1] like logging to a dedicated log file: `-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>`

[1]: https://www.slf4j.org/api/org/slf4j/impl/SimpleLogger.html
{{% /tab %}}
{{% tab "Python" %}}

To enable debug mode for the Datadog Python Tracer, set the environment variable `DATADOG_TRACE_DEBUG=true` when using `ddtrace-run`.

{{% /tab %}}
{{% tab "Ruby" %}}

To enable debug mode for the Datadog Ruby Tracer, set the `debug` option to `true` in the tracer initialization configuration:

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**Application Logs**:

By default, all logs are processed by the default Ruby logger. When using Rails, you should see the messages in your application log file.

Datadog client log messages are marked with `[ddtrace]`, so you can isolate them from other messages.

Additionally, it is possible to override the default logger and replace it with a custom one. This is done using the ``log`` attribute of the tracer.

```ruby
f = File.new("<FILENAME>.log", "w+")           # Log messages should go there
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Overriding the default tracer
end

Datadog::Tracer.log.info { "this is typically called by tracing code" }
```

See [the API documentation][1] for more details.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{% /tab %}}
{{% tab "Go" %}}

To enable debug mode for the Datadog Go Tracer, enable the debug mode during the `Start` config:

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

To enable debug mode for the Datadog Node.js Tracer, enable it during its `init`:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**Application Logs**:

By default, logging from this library is disabled. In order to get debbuging information and errors sent to logs, the `debug` options should be set to `true` in the [init()][1] method.

The tracer will then log debug information to `console.log()` and errors to `console.error()`. This behavior can be changed by passing a custom logger to the tracer. The logger should contain `debug()` and `error()` methods that can handle messages and errors, respectively.

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

Then check the Agent logs to see if there is more info about your issue:

* If the trace was sent to the Agent properly, you should see `Response from the Agent: OK` log entries. This indicates that the tracer is working properly, therefore the problem may be with the Agent itself. Refer to the [Agent troubleshooting guide][2] for more information.

* If an error was reported by the Agent (or the Agent could not be reached), you will see `Error from the Agent` log entries. In this case, validate your network configuration to ensure the Agent can be reached. If you are confident the network is functional and that the error is coming from the Agent, refer to the [Agent troubleshooting guide][2].

If neither of these log entries is present, then no request was sent to the Agent, which means that the tracer is not instrumenting your application. In this case, [contact Datadog support][3] and provide the relevant log entries with [a flare][4].

For more tracer settings, check out the [API documentation][5].

[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: /agent/troubleshooting
[3]: /help
[4]: /agent/troubleshooting/#send-a-flare
[5]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{% /tab %}}
{{% tab ".NET" %}}

To enable debug mode for the Datadog .NET Tracer, set the `DD_TRACE_DEBUG` configuration setting to `true`. This setting can be set as an environment variable, in the `web.config` or `app.config` file (.NET Framework only), or in a `datadog.json` file. Debug mode can also be enabled in code by calling `GlobalSettings.SetDebugEnabled(true)`:

```csharp
using Datadog.Trace;

// enable debug mode
GlobalSettings.SetDebugEnabled(true);

```

Logs files are saved in the following directories by default. The `DD_TRACE_LOG_PATH` setting can be used to change these paths.

| Platform | Path                                      |
|----------|-------------------------------------------|
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |
| Linux    | `/var/log/datadog/`                       |

**Note:**: On Linux, you must create the logs directory before you enabled debug mode.

For more details on how to configure the .NET Tracer, see the [Configuration][1] section.


[1]: /tracing/setup/dotnet#configuration
{{% /tab %}}
{{% tab "PHP" %}}

To enable debug mode for the Datadog PHP Tracer, set the environment variable `DD_TRACE_DEBUG=true`. See the PHP [configuration docs][1] for details about how and when this environment variable value should be set in order to be properly handled by the tracer.

In order to tell PHP where it should put `error_log` messages, you can either set it at the server level, or as a PHP `ini` parameter, which is the standard way to configure PHP behavior.

If you are using an Apache server, use the `ErrorLog` directive.
If you are using an NGINX server, use the `error_log` directive.
If you are configuring instead at the PHP level, use PHP's `error_log` ini parameter.

[1]: https://www.php-fig.org/psr/psr-3
{{% /tab %}}
{{% tab "C++" %}}

The release binary libraries are all compiled with debug symbols added to the optimized release. It is possible to use gdb or lldb to debug the library and to read core dumps. If you are building the library from source, pass the argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` to cmake to compile an optimized build with debug symbols.

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /tracing/setup/#agent-configuration
[3]: /agent/troubleshooting/#get-more-logging-from-the-agent
[4]: /agent/guide/agent-log-files
[5]: /tracing/visualization/#trace
[6]: /agent/troubleshooting/#send-a-flare
