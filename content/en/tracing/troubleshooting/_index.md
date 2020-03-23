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

{{% tab "Node" %}}

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

## Tracer debug logs

If you have successfully enabled debug mode for your tracer, you should see tracer specific log messages telling you how the tracer was initialized and whether traces were sent to the Agent. **These logs do not get sent to the Datadog Agent in the flare and are stored in a separate path depending on your logging configuration**. Find below log examples that you may found in your log file.

{{< tabs >}}
{{% tab "Java" %}}

<details><summary>Intialization log for the tracer</summary>
<p>

```java
[main] DEBUG datadog.trace.agent.ot.DDTracer - Using config: Config(runtimeId=<runtime ID>, serviceName=<service name>, traceEnabled=true, writerType=DDAgentWriter, agentHost=<IP HERE>, agentPort=8126, agentUnixDomainSocket=null, prioritySamplingEnabled=true, traceResolverEnabled=true, serviceMapping={}, globalTags={env=none}, spanTags={}, jmxTags={}, excludedClasses=[], headerTags={}, httpServerErrorStatuses=[512, 513, 514, 515, 516, 517, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 598, 599, 500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511], httpClientErrorStatuses=[400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499], httpClientSplitByDomain=false, partialFlushMinSpans=1000, runtimeContextFieldInjection=true, propagationStylesToExtract=[DATADOG], propagationStylesToInject=[DATADOG], jmxFetchEnabled=true, jmxFetchMetricsConfigs=[], jmxFetchCheckPeriod=null, jmxFetchRefreshBeansPeriod=null, jmxFetchStatsdHost=null, jmxFetchStatsdPort=8125, logsInjectionEnabled=false, reportHostName=false)
```

</p>
</details>

<details><summary>Example of traces being generated</summary>
<p>

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=<parent id>] trace=SpringBoot_Service/OperationHandler.handle/OperationHandler.handle metrics={} tags={component=spring-web-controller, env=none, span.kind=server, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=92808848
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 1
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.DDSpan - Finished: DDSpan [ t_id=<trace id>, s_id=<span id>, p_id=0] trace=SpringBoot_Service/servlet.request/GET /actuator/prometheus metrics={_sampling_priority_v1=1} tags={component=java-web-servlet, env=none, http.method=GET, http.status_code=200, http.url=http://<IP>:8080/actuator/prometheus, language=jvm, peer.hostname=<IP>, peer.ipv4=<IP>, peer.port=50778, runtime-id=<runtime id>, span.kind=server, span.origin.type=org.apache.catalina.core.ApplicationFilterChain, thread.id=33, thread.name=http-nio-8080-exec-1}, duration_ns=157972901
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - Writing 2 spans to DDAgentWriter { api=DDApi { tracesUrl=http://<IP address>/v0.4/traces } }.
```

</p>
</details>

<details><summary>Traces were sent to the Datadog Agent</summary>
<p>

```java
[http-nio-8080-exec-1] DEBUG datadog.trace.agent.ot.PendingTrace - traceId: <trace id> -- Expired reference. count = 0
[dd-trace-writer] DEBUG datadog.trace.agent.common.writer.DDApi - Successfully sent 1 of 2 traces to the DD agent.
```

</p>
</details>

{{% /tab %}}
{{% tab "Python" %}}

For more visibility, include `DD_LOGGING_RATE_LIMIT=0`.

<details><summary>Traces were generated</summary>
<p>

```shell
<YYYY-MM-DD> 16:01:11,280 DEBUG [ddtrace.tracer] [tracer.py:470] - writing 8 spans (enabled:True)
```

</p>
</details>

<details><summary>Span generated by the Go tracer</summary>
<p>

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

</p>
</details>

<details><summary>Traces are sent to the Datadog Agent</summary>
<p>

```shell
<YYYY-MM-DD> 16:01:11,637 DEBUG [ddtrace.api] [api.py:236] - reported 1 traces in 0.00207s
```

</p>
</details>

{{% /tab %}}
{{% tab "Ruby" %}}

<details><summary>Span is generated</summary>
<p>

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

</p>
</details>

{{% /tab %}}
{{% tab "Go" %}}

<details><summary> Trace submission attempt to the Agent</summary>
<p>

```shell
YYYY/MM/DD 16:06:35 Datadog Tracer <version> DEBUG: Sending payload: size: <size of traces> traces: <number of traces>.
```

</p>
</details>

<details><summary> Trace failed to sent to the Agent</summary>
<p>

```shell
2019/08/07 16:12:27 Datadog Tracer <version> ERROR: lost <number of traces> traces: Post http://localhost:8126/v0.4/traces: dial tcp 127.0.0.1:8126: connect: connection refused, 4 additional messages skipped (first occurrence: DD MM YY 16:11 UTC)
```

</p>
</details>

{{% /tab %}}
{{% tab "Node" %}}

<details><summary>Issue sending trace to the Agent</summary>
<p>

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

</p>
</details>

{{% /tab %}}
{{% tab ".NET" %}}

<details><summary>Profiler log</summary>
<p>

```shell
[dotnet] 19861: [debug] JITCompilationStarted: function_id=<function id> token=<token id> name=System.Net.Http.Headers.HttpHeaders.RemoveParsedValue()
```

</p>
</details>

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
