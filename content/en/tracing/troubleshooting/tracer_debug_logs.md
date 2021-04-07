---
title: Tracer Debug Logs
kind: Documentation
---

### Enable Tracer debug mode

Use Datadog debug settings to diagnose issues or audit trace data. We don't recommend enabling debug mode in production systems, because it increases the number of events that are sent to your loggers. Use it sparingly, for debugging purposes only.

Debug mode is disabled by default. To enable it, follow the corresponding language tracer instructions:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,.NET,php,cpp" >}}

{{< programming-lang lang="java" >}}

To enable debug mode for the Datadog Java Tracer, set the flag `-Ddd.trace.debug=true` when starting the JVM or add `DD_TRACE_DEBUG=true` as environment variable.

**Note**: Datadog Java Tracer implements SL4J SimpleLogger, so [all of its settings can be applied][1], for example, logging to a dedicated log file: 
```
-Ddatadog.slf4j.simpleLogger.logFile=<NEW_LOG_FILE_PATH>`
```

[1]: https://www.slf4j.org/api/org/slf4j/impl/SimpleLogger.html

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

To enable debug mode for the Datadog Python Tracer, set the environment variable `DATADOG_TRACE_DEBUG=true` when using `ddtrace-run`.
<p></p>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

To enable debug mode for the Datadog Ruby Tracer, set the `debug` option to `true` in the tracer initialization configuration:

```ruby
Datadog.configure do |c|
  c.tracer debug: true
end
```

**Application Logs**:

By default, all logs are processed by the default Ruby logger. When using Rails, you should see the messages in your application log file.

Datadog client log messages are marked with `[ddtrace]`, so you can isolate them from other messages.

You can override the default logger and replace it with a custom one by using the tracer's `log` attribute:

```ruby
f = File.new("<FILENAME>.log", "w+")           # Log messages should go there
Datadog.configure do |c|
  c.tracer log: Logger.new(f)                 # Overriding the default tracer
end

Datadog::Tracer.log.info { "this is typically called by tracing code" }
```

See [the API documentation][1] for more details.

[1]: https://github.com/DataDog/dd-trace-rb/blob/master/docs/GettingStarted.md#custom-logging

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

To enable debug mode for the Datadog Go Tracer, enable the debug mode during the `Start` config:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(tracer.WithDebugMode(true))
    defer tracer.Stop()
}
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

To enable debug mode for the Datadog Node.js Tracer, enable it during its `init`:

```javascript
const tracer = require('dd-trace').init({
  debug: true
})
```

**Application Logs**:

By default, logging from this library is disabled. In order to get debugging information and errors sent to logs, set the `debug` options to `true` in the [init()][1] method.

The tracer will then log debug information to `console.log()` and errors to `console.error()`. You can change this behavior by passing a custom logger to the tracer. The logger should contain `debug()` and `error()` methods that can handle messages and errors, respectively.

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

* If the trace was sent to the Agent properly, you should see `Response from the Agent: OK` log entries. This indicates that the tracer is working properly, so the problem may be with the Agent itself. Refer to the [Agent troubleshooting guide][2] for more information.

* If an error was reported by the Agent (or the Agent could not be reached), you will see `Error from the Agent` log entries. In this case, validate your network configuration to ensure the Agent can be reached. If you are confident the network is functional and that the error is coming from the Agent, refer to the [Agent troubleshooting guide][2].

If neither of these log entries is present, then no request was sent to the Agent, which means that the tracer is not instrumenting your application. In this case, [contact Datadog support][3] and provide the relevant log entries with [a flare][4].

For more tracer settings, check out the [API documentation][5].

[1]: https://datadog.github.io/dd-trace-js/Tracer.html#init
[2]: /agent/troubleshooting/
[3]: /help/
[4]: /agent/troubleshooting/#send-a-flare
[5]: https://datadog.github.io/dd-trace-js/#tracer-settings

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

To enable debug mode for the Datadog .NET Tracer, set the `DD_TRACE_DEBUG` configuration setting to `true`. This setting can be set as an environment variable, in the `web.config` or `app.config` file (.NET Framework only), or in a `datadog.json` file. Alternatively, you can enable debug mode by calling `GlobalSettings.SetDebugEnabled(true)`:

```csharp
using Datadog.Trace;

// enable debug mode
GlobalSettings.SetDebugEnabled(true);

```

Logs files are saved in the following directories by default. Use the `DD_TRACE_LOG_DIRECTORY` setting to change these paths.

| Platform | Path                                      |
|----------|-------------------------------------------|
| Windows  | `%ProgramData%\Datadog .NET Tracer\logs\` |
| Linux    | `/var/log/datadog/dotnet/`                |

**Note:**: On Linux, you must create the logs directory before you enabled debug mode.

For more details on how to configure the .NET Tracer, see the [Configuration][1] section.

There are two types of logs that are created in these paths:
1. **Logs from native code:** In 1.26.0 and higher, these logs are saved as `dotnet-tracer-native-<processname>-<processid>.log`. From version 1.21.0 to 1.25.x, these logs were saved as `dotnet-tracer-native.log`. In 1.20.x and older versions, this was stored as `dotnet-profiler.log`.
2. **Logs from managed code:** In 1.21.0 and higher, these logs are saved `dotnet-tracer-managed-<processname>-<date>.log`. In 1.20.x and older versions, this was stored as `dotnet-tracer-<processname>-<date>.log`.


[1]: /tracing/setup/dotnet/#configuration

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

To enable debug mode for the Datadog PHP Tracer, set the environment variable `DD_TRACE_DEBUG=true`. See the PHP [configuration docs][1] for details about how and when this environment variable value should be set in order to be properly handled by the tracer.

You can specify where PHP should put `error_log` messages either at the server level, or as a PHP `ini` parameter, which is the standard way to configure PHP behavior.

If you are using an Apache server, use the `ErrorLog` directive.
If you are using an NGINX server, use the `error_log` directive.
If you are configuring instead at the PHP level, use PHP's `error_log` ini parameter.

[1]: https://www.php-fig.org/psr/psr-3

{{< /programming-lang >}}

{{< programming-lang lang="cpp" >}}

The release binary libraries are all compiled with debug symbols added to the optimized release. You can use GDB or LLDB to debug the library and to read core dumps. If you are building the library from source, pass the argument `-DCMAKE_BUILD_TYPE=RelWithDebInfo` to cmake to compile an optimized build with debug symbols.

```bash
cd .build
cmake -DCMAKE_BUILD_TYPE=RelWithDebInfo ..
make
make install
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Review Tracer debug logs

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

For more visibility, include `DD_LOGGING_RATE_LIMIT=0`.

**Traces were generated:**

```shell
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:470] - writing 8 spans (enabled:True)
```

**Span generated by the Python tracer:**

```text
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:472] -
      name flask.request
        id <span id>
  trace_id <trace id>
 parent_id <parent id>
   service flask
  resource GET /
      type http
     start <start time>
       end <end time>
  duration 0.004759s
     error 0
      tags
           flask.endpoint:index
           flask.url_rule:/
           flask.version:1.1.1
           http.method:GET
           http.status_code:200
           http.url:http://0.0.0.0:5050/
           system.pid:25985

```


**Traces were sent to the Datadog Agent:**

```shell
<YYYY-MM-DD> 16:01:11,637 DEBUG [ddtrace.api] [api.py:236] - reported 1 traces in 0.00207s
```

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

**Span is generated:**

```shell
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

```shell
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <size of traces> traces: <number of traces>.
```


**Trace failed to send to the Agent:**

```shell
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

```shell
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<function id> token=<token id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```


**Logs from managed code showing spans were generated:**

```shell
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span started: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>]
{ MachineName: ".", ProcessName: "dotnet", PID: <process id>, AppDomainName: "test-webapi" }
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [DBG] Span closed: [s_id: <span id>, p_id: <parent span id>, t_id: <trace id>] for (Service: test-webapi, Resource: custom, Operation: custom.function, Tags: [<span tags>])
```

**Logs from managed code showing traces couldn't be sent to the Datadog Agent:**

```shell
YYYY-MM-DD HH:MM:SS.<integer> +00:00 [ERR] An error occurred while sending traces to the agent at System.Net.Http.HttpRequestException: Connection refused ---> System.Net.Sockets.SocketException: Connection refused
   at System.Net.Http.ConnectHelper.ConnectAsync(String host, Int32 port, CancellationToken cancellationToken)
   --- End of inner exception stack trace ---
```


{{< /programming-lang >}}

{{< programming-lang lang="php" >}}


**Generating a span:**

```shell
[Mon MM  DD 19:41:13 YYYY] [YYYY-MM-DDT19:41:13+00:00] [ddtrace] [debug] - Encoding span <span id> op: 'laravel.request' serv: 'Sample_Laravel_App' res: 'Closure unnamed_route' type 'web'
```



**Attempt to send a trace to the Agent:**

```shell
[Mon MM  DD 19:56:23 YYYY] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - About to send trace(s) to the agent
```


**Trace successfully sent to the Agent:**

```shell
[Mon MM  DD 19:56:23 2019] [YYYY-MM-DDT19:56:23+00:00] [ddtrace] [debug] - Traces successfully sent to the agent
```


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

[1]: /help/
[2]: /agent/troubleshooting/#send-a-flare
