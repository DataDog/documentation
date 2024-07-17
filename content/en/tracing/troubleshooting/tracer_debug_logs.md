---
title: Tracer Debug Logs
further_reading:
- link: "/tracing/troubleshooting/connection_errors/"
  tag: "Documentation"
  text: "Troubleshooting APM Connection Errors"
---

## Automated debug logs

<div class="alert alert-warning">Automated debug logs are supported for Node.js and .NET only. For other languages, use <a href="/tracing/troubleshooting/tracer_debug_logs/#manual-debug-log-collection">manual debug log collection</a> instead.</div>

A flare allows you to send necessary troubleshooting information to the Datadog support team, including tracer logs, with sensitive data removed. Flares are useful for troubleshooting issues like high CPU usage, high memory usage, and missing spans.

The data collected varies by language. See [Data collected](#data-collected).

### Prerequisites

- [Remote configuration][3] must be enabled.
- Your API key must be configured for Remote Configuration.
- You must have a supported tracer version:
  - Node.js: `5.15.0` or greater, or `4.39.0` or greater
  - .NET: `2.46.0` or greater

### Send a flare

To send a flare from the Datadog site, make sure you've enabled [Fleet Automation][4] and [Remote configuration][5] on the Agent.

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares2.png" alt="The Send Ticket button launches a form to send a flare for an existing or new support ticket" style="width:100%;" >}}

## Manual debug log collection

Use Datadog debug settings to diagnose issues or audit trace data. Datadog does not recommend that you enable debug mode in production systems because it increases the number of events that are sent to your loggers. Use debug mode for debugging purposes only.

Debug mode is disabled by default. To enable it, follow the corresponding language tracer instructions:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}

To enable debug mode for the Datadog Java Tracer, set the flag `-Ddd.trace.debug=true` when starting the JVM or add `DD_TRACE_DEBUG=true` as environment variable.

**Note**: Datadog Java Tracer implements SL4J SimpleLogger, so [all of its settings can be applied][1], for example, logging to a dedicated log file:
```
-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>
```


[1]: https://www.slf4j.org/api/org/slf4j/simple/SimpleLogger.html
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

The steps for enabling debug mode in the Datadog Python Tracer depends on the version of the tracer your application is using. Choose the scenario that applies:

### Scenario 1: ddtrace version 2.x and higher

1. To enable debug mode: `DD_TRACE_DEBUG=true`

2. To route debug logs to a log file, set `DD_TRACE_LOG_FILE` to the filename of that log file, relative to the current working directory. For example, `DD_TRACE_LOG_FILE=ddtrace_logs.log`.
   By default, the file size is 15728640 bytes (about 15MB), and one backup log file is created. To increase the default log file size, specify the size in bytes with the `DD_TRACE_LOG_FILE_SIZE_BYTES` setting.

**Note:** If the application uses the root logger and changes log level to `DEBUG`, debug tracer logs are enabled. If you want to override this behavior, override the `ddtrace` logger as follows:

```
import logging

# root logger configuration
root_logger = logging.getLogger()
root_logger.setLevel(logging.DEBUG)

# override the ddtrace configuration to WARNING log level
logging.getLogger("ddtrace").setLevel(logging.WARNING)
```


### Scenario 2: ddtrace version 1.3.2 to <2.x

1. To enable debug mode: `DD_TRACE_DEBUG=true`

2. To route debug logs to a log file, set `DD_TRACE_LOG_FILE` with a filename that tracer logs should be written to, relative to the current working directory. For example, `DD_TRACE_LOG_FILE=ddtrace_logs.log`.
   By default, the file size is 15728640 bytes (about 15MB) and one backup log file is created. To increase the default log file size, specify the size in bytes with the `DD_TRACE_LOG_FILE_SIZE_BYTES` setting.

3. To route logs to the console, for **Python 2** applications, configure `logging.basicConfig()` or similar. Logs are automatically sent to the console for **Python 3** applications.


### Scenario 3: ddtrace version 1.0.x to 1.2.x

1. To enable debug mode: `DD_TRACE_DEBUG=true`

2. To route logs to the console, for **Python 2 or Python 3** applications, configure `logging.basicConfig()` or use `DD_CALL_BASIC_CONFIG=true`.

### Scenario 4: ddtrace version 0.x

1. To enable debug mode: `DD_TRACE_DEBUG=true`

2. To route logs to the console, for **Python 2 or Python 3** applications, configure `logging.basicConfig()` or use `DD_CALL_BASIC_CONFIG=true`.

### Scenario 5: Configuring debug logging in the application code with the standard logging library

For any version of ddtrace, rather than setting the `DD_TRACE_DEBUG` tracer environment variable, you can enable debug logging in the application code by using the `logging` standard library directly:

```
log = logging.getLogger("ddtrace.tracer")
log.setLevel(logging.DEBUG)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

To enable debug mode for the Datadog Ruby Tracer, set the environment variable `DD_TRACE_DEBUG=true`.

**Application Logs**

By default, all logs are processed by the default Ruby logger. When using Rails, you should see the messages in your application log file.

Datadog client log messages are marked with `[ddtrace]`, so you can isolate them from other messages.

You can override the default logger and replace it with a custom one by using the tracer's `log` attribute:

```ruby
f = File.new("<FILENAME>.log", "w+")           # Log messages should go there
Datadog.configure do |c|
  c.logger.instance = Logger.new(f)                 # Overriding the default tracer
end

Datadog::Tracing.logger.info { "this is typically called by tracing code" }
```

See [the API documentation][1] for more details.


[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging
{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

To enable debug mode for the Datadog Go Tracer, set the environment variable `DD_TRACE_DEBUG=true`,
or enable the debug mode during the `Start` config:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

#### Abandoned span logs

The Datadog Go Tracer also supports logging for potentially abandoned spans. To enable this debug mode in Go, set the environment variable `DD_TRACE_DEBUG_ABANDONED_SPANS=true`. To change the duration after which spans are considered abandoned (default=`10m`), set the environment variable `DD_TRACE_ABANDONED_SPAN_TIMEOUT` to the desired time duration. Abandoned span logs appear at the Info level.

You can also enable debugging abandoned spans during the `Start` config:

```go
package main

import (
  "time"

  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start(tracer.WithDebugSpansMode(10 * time.Minute))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

To enable debug mode for the Datadog Node.js Tracer, use the environment variable `DD_TRACE_DEBUG=true`.

**Note:** For versions below 2.X, debug mode could be enabled programmatically inside the tracer initialization but this is no longer supported.

**Application Logs**

In debug mode the tracer will log debug information to `console.log()` and errors to `console.error()`. You can change this behavior by passing a custom logger to the tracer. The logger should contain `debug()` and `error()` methods that can handle messages and errors, respectively.

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
  }
})
```

Then check the Agent logs to see if there is more info about your issue:

* If the trace was sent to the Agent properly, you should see `Response from the Agent: OK` log entries. This indicates that the tracer is working properly, so the problem may be with the Agent itself. Refer to the [Agent troubleshooting guide][1] for more information.

* If an error was reported by the Agent (or the Agent could not be reached), you will see `Error from the Agent` log entries. In this case, validate your network configuration to ensure the Agent can be reached. If you are confident the network is functional and that the error is coming from the Agent, refer to the [Agent troubleshooting guide][1].

If neither of these log entries is present, then no request was sent to the Agent, which means that the tracer is not instrumenting your application. In this case, [contact Datadog support][2] and provide the relevant log entries with [a flare][3].

For more tracer settings, check out the [API documentation][4].


[1]: /agent/troubleshooting/
[2]: /help/
[3]: /agent/troubleshooting/#send-a-flare
[4]: https://datadog.github.io/dd-trace-js/#tracer-settings
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

To enable debug mode for the Datadog .NET Tracer, set the `DD_TRACE_DEBUG` configuration setting to `true`. This setting can be set as an environment variable, in the `web.config` or `app.config` file (.NET Framework only), or in a `datadog.json` file. Alternatively, you can enable debug mode by calling `GlobalSettings.SetDebugEnabled(true)`:

```csharp
using Datadog.Trace;

// enable debug mode
GlobalSettings.SetDebugEnabled(true);

```

Logs files are saved in the following directories by default. Use the `DD_TRACE_LOG_DIRECTORY` setting to change these paths.

| Platform                                             | Path                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux (when using [Kubernetes library injection][1]) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**Note:**: On Linux, you must create the logs directory before you enabled debug mode.

Since version `2.19.0`, you can use the `DD_TRACE_LOGFILE_RETENTION_DAYS` setting to configure the tracer to delete log files from the current logging directory on startup. The tracer deletes log files the same age and older than the given number of days, with a default value of `31`.

For more details on how to configure the .NET Tracer, see the [Configuration][2] section.

There are two types of logs that are created in these paths:
1. **Logs from native code:** In 1.26.0 and higher, these logs are saved as `dotnet-tracer-native-<processname>-<processid>.log`. From version 1.21.0 to 1.25.x, these logs were saved as `dotnet-tracer-native.log`. In 1.20.x and older versions, this was stored as `dotnet-profiler.log`.
2. **Logs from managed code:** In 1.21.0 and higher, these logs are saved `dotnet-tracer-managed-<processname>-<date>.log`. In 1.20.x and older versions, this was stored as `dotnet-tracer-<processname>-<date>.log`.


[1]: /tracing/trace_collection/library_injection/?tab=kubernetes
[2]: /tracing/setup/dotnet/#configuration
{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

To enable debug mode for the Datadog PHP Tracer, set the environment variable `DD_TRACE_DEBUG=true`. See the PHP [configuration docs][1] for details about how and when this environment variable value should be set in order to be properly handled by the tracer.

There are two options to route debug tracer logs to a file.

**Option 1:**

With dd-trace-php 0.98.0+, you can specify a path to a log file for certain debug tracer logs:

- **Environment variable**: `DD_TRACE_LOG_FILE`

- **INI**: `datadog.trace.log_file`

**Notes**:
  - For details about where to set `DD_TRACE_LOG_FILE`, review [Configuring the PHP Tracing Library][2].
  - If `DD_TRACE_LOG_FILE` is not specified, logs go to the default PHP error location (See **Option 2** for more details).

**Option 2:**

You can specify where PHP should put `error_log` messages either at the server level, or as a PHP `ini` parameter, which is the standard way to configure PHP behavior.

If you are using an Apache server, use the `ErrorLog` directive.
If you are using an NGINX server, use the `error_log` directive.
If you are configuring instead at the PHP level, use PHP's `error_log` ini parameter.


[1]: https://www.php-fig.org/psr/psr-3
[2]: /tracing/trace_collection/library_config/php/
{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

The release binary libraries are all compiled with debug symbols added to the optimized release. You can use GDB or LLDB to debug the library and to read core dumps. If you are building the library from source, pass the argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` to cmake to compile an optimized build with debug symbols.

```bash
cmake -B .build -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
cmake --build .build -j
cmake --install .build
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Review debug logs

When debug mode for your tracer is enabled, tracer-specific log messages report how the tracer was initialized and whether traces were sent to the Agent. **These logs are not sent to the Datadog Agent in the flare and are stored in a separate path depending on your logging configuration**. The following log examples show what might appear in your log file.

If there are errors that you don't understand, or if traces are reported as flushed to Datadog but you cannot see them in the Datadog UI, [contact Datadog support][1] and provide the relevant log entries with [a flare][2].

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php" >}}
{{< programming-lang lang="java" >}}

**Intialization log for the tracer:**

```java
[main] DEBUG datadog.trace.agent.ot.DDTracer - Using config: Config(runtimeId=<runtime ID>, serviceName=<service name>, traceEnabled=true, writerType=DDAgentWriter, agentHost=<IP HERE>, agentPort=8126, agentUnixDomainSocket=null, prioritySamplingEnabled=true, traceResolverEnabled=true, serviceMapping={}, globalTags={env=none}, spanTags={}, jmxTags={}, excludedClasses=[], headerTags={}, httpServerErrorStatuses=[512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], httpClientErrorStatuses=[400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499], httpClientSplitByDomain=false, partialFlushMinSpans=1000, runtimeContextFieldInjection=true, propagationStylesToExtract=[DATADOG], propagationStylesToInject=[DATADOG], jmxFetchEnabled=true, jmxFetchMetricsConfigs=[], jmxFetchCheckPeriod=null, jmxFetchRefreshBeansPeriod=null, jmxFetchStatsdHost=null, jmxFetchStatsdPort=8125, logsInjectionEnabled=false, reportHostName=false)
```

**Example of traces being generated:**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=<parent id>] trace=SpringBoot_Service/OperationHandler.handle/OperationHandler.handle metrics={} tags={component=spring-web-controller, env=none, span.kind=server, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=92808848
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 1
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=0] trace=SpringBoot_Service/servlet.request/GET /actuator/prometheus metrics={_sampling_priority_v1=1} tags={component=java-web-servlet, env=none, http.method=GET, http.status_code=200, http.url=http://<IP>:8080/actuator/prometheus, language=jvm, peer.hostname=<IP>, peer.ipv4=<IP>, peer.port=50778, runtime-id=<runtime id>, span.kind=server, span.origin.type=org.apache.catalina.core.ApplicationFilterChain, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=157972901
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - Writing 2 spans to DDAgentWriter { api=DDApi { tracesUrl=http://<IP address>/v0.4/traces } }.
```

**Traces were sent to the Datadog Agent:**

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 0
[dd-trace-writer] DEBUG datadog.trace.agent.common.writer.DDApi - Successfully sent 1 of 2 traces to the DD agent.
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

Logs generated by the Python Tracer have the logging handler name `ddtrace`.

**Traces were generated:**

```text
<YYYY-MM-DD> 19:51:22,262 DEBUG [ddtrace.internal.processor.trace] [trace.py:211] - trace <TRACE ID> has 8 spans, 7 finished
```

**Span generated by the Python tracer:**

```text
<YYYY-MM-DD> 19:51:22,251 DEBUG [ddtrace.tracer] [tracer.py:715] - finishing span name='flask.process_response' id=<SPAN ID> trace_id=<TRACE ID>  parent_id=<PARENT ID> service='flask' resource='flask.process_response' type=None start=1655495482.2478693 end=1655495482.2479873 duration=0.000118125 error=0 tags={} metrics={} (enabled:True)
0.0:5050/
```


**Traces were sent to the Datadog Agent:**

```text
<YYYY-MM-DD> 19:59:19,657 DEBUG [ddtrace.internal.writer] [writer.py:405] - sent 1.57KB in 0.02605s to http://localhost:8126/v0.4/traces
```

**Traces failed to be sent to the Datadog Agent:**

```text
<YYYY-MM-DD> 19:51:23,249 ERROR [ddtrace.internal.writer] [writer.py:567] - failed to send traces to Datadog Agent at http://localhost:8126/v0.4/traces
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**Span is generated:**

```text
D, [<YYYY-MM-DD>T16:42:51.147563 #476] DEBUG -- ddtrace: [ddtrace] (/usr/local/bundle/gems/ddtrace-<version>/lib/ddtrace/tracer.rb:371:in `write') Writing 4 spans (enabled: true)

 Name: rack.request
Span ID: <span id>
Parent ID: 0
Trace ID: <trace id>
Type: web
Service: todo
Resource: NotesController#index
Error: 0
Start: <start time>
End: <end time>
Duration: 11985000
Allocations: 1202
Tags: [
   system.pid => 476,
   env => dev,
   language => ruby,
   http.method => GET,
   http.url => /notes,
   http.base_url => http://0.0.0.0:3000,
   http.status_code => 304,
   http.response.headers.x_request_id => <header value>]
Metrics: [
   ..],

```


{{< /programming-lang >}}

{{< programming-lang lang="go" >}}


**Trace submission attempt to the Agent:**

```text
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <size of traces> traces: <number of traces>.
```


**Trace failed to send to the Agent:**

```text
2019/08/07 16:12:27 Datadog Tracer <version> ERROR: lost <number of traces> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
```


{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

**Issue sending trace to the Agent:**

```json
{
	"name": "dd-trace",
	"hostname": "<hostname>",
	"pid": 28817,
	"level": 50,
	"err": {
		"message": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
		"name": "Error",
		"stack": "Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126\n    at ClientRequest.req.on.e (/path/to/dd-trace/src/platform/node/request.js:44:33)\n    at scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:68:19)\n    at Scope._activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:44:14)\n    at Scope.activate (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:13:17)\n    at ClientRequest.<anonymous> (/path/to/dd-trace/packages/dd-trace/src/scope/base.js:67:20)\n    at ClientRequest.emit (events.js:193:13)\n    at ClientRequest.req.emit (/path/to/dd-trace/packages/datadog-plugin-http/src/client.js:93:21)\n    at Socket.socketErrorListener (_http_client.js:397:9)\n    at Socket.emit (events.js:198:15)\n    at emitErrorNT (internal/streams/destroy.js:91:8)"
	},
	"msg": "Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126",
	"time": "2019-08-06T20:48:27.769Z",
	"v": 0
}
```


{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

**Logs from native code:**

```text
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<function id> token=<token id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**Logs from managed code showing spans were generated:**

```text
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span started: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>]
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span closed: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<span tags>])
```

**Logs from managed code showing traces couldn't be sent to the Datadog Agent:**

```text
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

**Loading an integration:**

Note: This log **does not** follow `DD_TRACE_LOG_FILE` (ini: `datadog.trace.log_file`) and is always routed to the ErrorLog directive.

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Loaded integration web
```

**Span information:**

Available starting in 0.98.0:

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [span] Encoding span <SPAN ID>: trace_id=<TRACE ID>, name='wpdb.query', service='wordpress', resource: '<RESOURCE NAME>', type 'sql' with tags: component='wordpress'; and metrics: -
```

**Attempting to send traces:**

```text
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [info] Flushing trace of size 56 to send-queue for http://datadog-agent:8126
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /agent/troubleshooting/#send-a-flare
[3]: /agent/remote_config
[4]: /agent/fleet_automation/
[5]: /agent/remote_config#enabling-remote-configuration