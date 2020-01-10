---
title: APM Troubleshooting
kind: documentation
aliases:
- /agent/faq/agent-apm-metrics/
- /tracing/send_traces/agent-apm-metrics/
further_reading:
- link: "/agent/docker/apm"
  tag: "Documentation"
  text: "Docker APM setup"
- link: "/integrations/amazon_ecs/#trace-collection"
  tag: "Documentation"
  text: "ECS EC2 APM setup"
- link: "/integrations/ecs_fargate/#trace-collection"
  tag: "Documentation"
  text: "ECS Fargate APM setup"
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

To enable debug mode for the Datadog .NET Tracer, set the `isDebugEnabled` argument to `true` when creating a new tracer instance:

```csharp
using Datadog.Trace;

var tracer = Tracer.Create(isDebugEnabled: true);

// optional: set the new tracer as the new default/global tracer
Tracer.Instance = tracer;
```

The environment variable `DD_TRACE_DEBUG` can also be set to `true`.

Logs files are saved in the following directories:

| Platform | Path                                                          |
|----------|---------------------------------------------------------------|
| Linux    | `/var/log/datadog/`                        |
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |

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

## APM metrics sent by the Datadog Agent
Find below the list of out-of-the-box metrics sent by the Datadog Agent when [APM is enabled][7]:

| Metric Name                                           | Type      | Description                                                                                              |
|-------------------------------------------------------|-----------|----------------------------------------------------------------------------------------------------------|
| `datadog.trace_agent.obfuscations`                    | Count     | Increment by one every time an SQL obfuscation happens.                                                  |
| `datadog.trace_agent.started`                         | Count     | Increment by one every time the Agent starts.                                                            |
| `datadog.trace_agent.panic`                           | Gauge     | Increment by one on every code panic.                                                                    |
| `datadog.trace_agent.heartbeat`                       | Gauge     | Increment by one every 10 seconds.                                                                       |
| `datadog.trace_agent.heap_alloc`                      | Gauge     | Heap allocations as reported by the Go runtime.                                                          |
| `datadog.trace_agent.cpu_percent`                     | Gauge     | CPU usage (in cores), e.g. 50 (half a core), 200 (two cores), 250 (2.5 cores)                            |
| `datadog.trace_agent.ratelimit`                       | Gauge     | If lower than 1, it means payloads are being refused due to high resource usage (cpu or memory).         |
| `datadog.trace_agent.normalizer.spans_malformed`      | Count     | Number of spans having malformed fields that had to be altered in order for the system to accept them    |
| `datadog.trace_agent.receiver.trace`                  | Count     | Number of traces received and accepted.                                                                  |
| `datadog.trace_agent.receiver.traces_received`        | Count     | Same as above                                                                                            |
| `datadog.trace_agent.receiver.traces_dropped`         | Count     | Traces dropped due to normalization errors.                                                              |
| `datadog.trace_agent.receiver.traces_filtered`        | Count     | Traces filtered by ignored resources (as defined in `datadog.yaml` file).                                |
| `datadog.trace_agent.receiver.traces_priority`        | Count     | Traces processed by priority sampler that have the `priority` tag.                                       |
| `datadog.trace_agent.receiver.traces_bytes`           | Count     | Total bytes of payloads accepted by the Agent.                                                           |
| `datadog.trace_agent.receiver.spans_received`         | Count     | Total bytes of payloads received by the Agent.                                                           |
| `datadog.trace_agent.receiver.spans_dropped`          | Count     | Total bytes of payloads dropped by the Agent.                                                            |
| `datadog.trace_agent.receiver.spans_filtered`         | Count     | Total bytes of payloads filtered by the Agent                                                            |
| `datadog.trace_agent.receiver.events_extracted`       | Count     | Total APM events sampled.                                                                                |
| `datadog.trace_agent.receiver.events_sampled`         | Count     | Total APM events sampled by the `max_events_per_second` parameter sampler.                               |
| `datadog.trace_agent.receiver.payload_accepted`       | Count     | Number of payloads accepted by the Agent.                                                                |
| `datadog.trace_agent.receiver.payload_refused`        | Count     | Number of payloads rejected by the receiver because of the sampling.                                     |
| `datadog.trace_agent.receiver.error`                  | Count     | Number of times that the API rejected a payload due to an error in either decoding, formatting or other. |
| `datadog.trace_agent.receiver.oom_kill`               | Count     | Number of times the Agent killed itself due to excessive memory use (150% of max_memory).                |
| `datadog.trace_agent.receiver.tcp_connections`        | Count     | Number of TCP connections coming in to the agent.                                                        |
| `datadog.trace_agent.receiver.out_chan_fill`          | Gauge     | Internal metric. Percentage of fill on the receiver's output channel.                                    |
| `datadog.trace_agent.trace_writer.flush_duration`     | Gauge     | Time it took to flush a payload to the Datadog API.                                                      |
| `datadog.trace_agent.trace_writer.encode_ms`          | Gauge     | Number of miliseconds it took to encode a trace payload.                                                 |
| `datadog.trace_agent.trace_writer.compress_ms`        | Gauge     | Number of miliseconds it took to compress an encoded trace payload.                                      |
| `datadog.trace_agent.trace_writer.payloads`           | Count     | Number of payloads processed.                                                                            |
| `datadog.trace_agent.trace_writer.connection_fill`    | Histogram | Percentage of outgoing connections used by the trace writer.                                             |
| `datadog.trace_agent.trace_writer.queue_fill`         | Histogram | Percentage of outgoing payload queue fill.                                                               |
| `datadog.trace_agent.trace_writer.dropped`            | Count     | Number of dropped payloads due to non retriable HTTP errors.                                             |
| `datadog.trace_agent.trace_writer.dropped_bytes`      | Count     | Number of dropped bytes due to non retriable HTTP errors.                                                |
| `datadog.trace_agent.trace_writer.payloads`           | Count     | Number of payloads sent.                                                                                 |
| `datadog.trace_agent.trace_writer.traces`             | Count     | Number of traces processed.                                                                              |
| `datadog.trace_agent.trace_writer.events`             | Count     | Number of events processed.                                                                              |
| `datadog.trace_agent.trace_writer.spans`              | Count     | Number of spans processed.                                                                               |
| `datadog.trace_agent.trace_writer.bytes`              | Count     | Number of bytes sent (calculated after Gzip).                                                            |
| `datadog.trace_agent.trace_writer.bytes_uncompressed` | Count     | Number of bytes sent (calculated before Gzip).                                                           |
| `datadog.trace_agent.trace_writer.bytes_estimated`    | Count     | Number of bytes estimated by Agent internal algorithm.                                                   |
| `datadog.trace_agent.trace_writer.retries`            | Count     | Number of retries on failures to the Datadog API.                                                        |
| `datadog.trace_agent.trace_writer.errors`             | Count     | Errors that could not be retried.                                                                        |
| `datadog.trace_agent.stats_writer.stats_buckets`      | Count     | Number of stats buckets flushed.                                                                         |
| `datadog.trace_agent.stats_writer.bytes`              | Count     | Number of bytes sent (calculated after Gzip).                                                            |
| `datadog.trace_agent.stats_writer.retries`            | Count     | Number of retries on failures to the Datadog API                                                         |
| `datadog.trace_agent.stats_writer.splits`             | Count     | Number of times a payload was split into multiple ones.                                                  |
| `datadog.trace_agent.stats_writer.errors`             | Count     | Errors that could not be retried.                                                                        |
| `datadog.trace_agent.stats_writer.encode_ms`          | Histogram | Time it took to encode a stats payload.                                                                  |
| `datadog.trace_agent.stats_writer.connection_fill`    | Histogram | Percentage of outgoing connections used.                                                                 |
| `datadog.trace_agent.stats_writer.queue_fill`         | Histogram | Percentage of queue filled.                                                                              |
| `datadog.trace_agent.stats_writer.dropped`            | Count     | Number of payloads dropped due to non retriable HTTP errors.                                             |
| `datadog.trace_agent.stats_writer.dropped_bytes`      | Count     | Number of bytes dropped due to non retriable HTTP errors.                                                |
| `datadog.trace_agent.service_writer.services`         | Count     | Number of services flushed.                                                                              |
| `datadog.trace_agent.events.max_eps.max_rate`         | Gauge     | Same as the Agent config's `max_events_per_second` parameter.                                            |
| `datadog.trace_agent.events.max_eps.reached_max`      | Gauge     | Is set to `1` every time `max_events_per_second` is reached, otherwise it's `0`.                         |
| `datadog.trace_agent.events.max_eps.current_rate`     | Gauge     | Count of APM Events per second received by the Agent                                                     |
| `datadog.trace_agent.events.max_eps.sample_rate`      | Gauge     | Sample rate applied by the Agent to Events it received                                                   |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help
[2]: /tracing/setup/#agent-configuration
[3]: /agent/troubleshooting/#get-more-logging-from-the-agent
[4]: /agent/guide/agent-log-files
[5]: /tracing/visualization/#trace
[6]: /agent/troubleshooting/#send-a-flare
[7]: /tracing/setup
