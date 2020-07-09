---
title: Tracer Startup Logs
kind: Documentation
---
## Startup Logs

Tracer startup logs will capture all obtainable information at startup and log it either as `DATADOG TRACER CONFIGURATION` or `DATADOG TRACER DIAGNOSTICS` for easy searching within your logs.  Note some languages may log to a separate file depending on language conventions and the safety of accessing `Stdout` or equivalent.  In those cases, the location of logs will be noted in the respective language tab below.

`DIAGNOSTICS` log lines appear when the tracer encountered an error during application startup, while  `CONFIGURATION` logs are a JSON or raw-formatted representation of settings applied to your tracer.

If you see any `DIAGNOSTICS` log lines, please confirm from the indicated log that settings and configurations have been applied correctly.  If you do not see logs at all, please ensure that your application logs are not silenced and that your log level is at least `INFO` where applicable.

{{< tabs >}}
{{% tab "Java" %}}

#### Configuration

```text
{"os_name":"Mac OS X","os_version":"10.15.4","architecture":"x86_64","lang":"jvm","lang_version":"11.0.6","jvm_vendor":"AdoptOpenJDK","jvm_version":"11.0.6+10","java_class_version":"55.0","enabled":true,"service":"unnamed-java-app","agent_url":"http://localhost:8126","agent_error":false,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":false,"profiling_enabled":false,"dd_version":"null","health_checks_enabled":false,"configuration_file":"no config file present","runtime_id":"b69deb26-8bc3-4c00-8952-d42bf8c2123b"}
```

#### Diagnostics



{{% /tab %}}
{{% tab ".NET" %}}

#### File Location

Log files will be located within `%PROGRAMDATA%\Datadog .NET Tracer\logs`.

- `dotnet-tracer-{processName}-{timestamp}.log` contains the Configuration log.

- `dotnet-profiler.log` contains the Diagnostics logs, if any are generated.

#### Configuration

```text
2020-06-29 12:26:39.572 +02:00 [INF] DATADOG TRACER CONFIGURATION -
{"date":"2020-06-29T12:26:39.5615724+02:00","os_name":"Windows",
"os_version":"Microsoft Windows NT 6.2.9200.0","version":"1.17.1.0",
"platform":"x64","lang":".NET Framework","lang_version":"4.8+",
"env":null,"enabled":true,"service":"git-credential-manager",
"agent_url":"http://localhost:8126","debug":false,
"analytics_enabled":false,"sample_rate":null,"sampling_rules":null,
"tags":[],"log_injection_enabled":false,
"runtime_metrics_enabled":false,"disabled_integrations":[]}
```

#### Diagnostics

```text
DATADOG TRACER DIAGNOSTICS - Profiler disabled in DD_TRACE_ENABLED
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} not found in DD_PROFILER_PROCESSES
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} found in DD_PROFILER_EXCLUDE_PROCESSES
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: interface ICorProfilerInfo3 not found
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as an Azure App Services infrastructure process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as Kudu, an Azure App Services reserved process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: DD_INTEGRATIONS environment variable not set
DATADOG TRACER DIAGNOSTICS - Profiler disabled: no enabled integrations found
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: unable to set event mask
DATADOG TRACER DIAGNOSTICS - Error fetching configuration {exception}
```

{{% /tab %}}
{{% tab "PHP" %}}

#### Configuration

```text
[2020-07-01T17:42:50Z] DATADOG TRACER CONFIGURATION - {"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false,"date":"2020-07-01T17:42:50Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cgi-fcgi","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null}
```

#### Diagnostics

The Diagnostics for the PHP tracer will print if the tracer is in DEBUG mode. They will be available through the other options below.

```text
[2020-07-01T17:35:25Z] DATADOG TRACER DIAGNOSTICS - agent_error: Couldn't connect to server
[2020-07-01T17:35:25Z] DATADOG TRACER DIAGNOSTICS - ddtrace.request_init_hook_reachable: false
```

#### PHP Info
The JSON string can also be obtained from the PHP info page and the diagnostic information will be displayed in a separate table to help diagnose common issues.

{{< img src="tracing/troubleshooting/PHPInfo.png" alt="PHP Info"  >}}

#### CLI SAPI

From the CLI SAPI, the info can be obtained from `php --ri=ddtrace`.

```text
ddtrace


Datadog PHP tracer extension
For help, check out the documentation at https://docs.datadoghq.com/tracing/languages/php/
(c) Datadog 2020

Datadog tracing support => enabled
Version => 1.0.0-nightly
DATADOG TRACER CONFIGURATION => {"date":"2020-07-01T17:43:54Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cli","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null,"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false}

                               Diagnostics
agent_error => Couldn't connect to server
ddtrace.request_init_hook_reachable => false

Directive => Local Value => Master Value
ddtrace.disable => Off => Off
...
```

#### Runtime

The JSON string can also be accessed at runtime from `\DDTrace\startup_logs()`.

```php
echo \DDTrace\startup_logs() . PHP_EOL;
```
{{% /tab %}}

{{% tab "Go" %}}

{{% /tab %}}

{{% tab "NodeJS" %}}

#### Configuration

```text
[2020-07-02 14:51:16.421] [INFO] app - host:port==localhost:9080
[2020-07-02 14:51:16.423] [INFO] app - db type==mongo
[2020-07-02 14:51:16.439] [INFO] routes - Use dataaccess:../dataaccess/mongo/index.js
[2020-07-02 14:51:16.599] [INFO] app - Error connecting to database - exiting process: MongoError: connect ECONNREFUSED 127.0.0.1:27017
[2020-07-02 14:51:16.600] [INFO] app - Initialized database connections
[2020-07-02 14:51:16.601] [INFO] app - Express server listening on port 9080
DATADOG TRACER CONFIGURATION - {"date":"2020-07-02T18:51:18.294Z","os_name":"Darwin","os_version":"19.2.0","architecture":"x64","version":"0.22.0","lang":"nodejs","lang_version":"12.18.1","enabled":true,"service":"acmeair","agent_url":"http://localhost:8126","agent_error":"Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126","debug":false,"analytics_enabled":false,"sample_rate":1,"sampling_rules":[],"tags":{"service":"acmeair","version":"0.0.4"},"dd_version":"0.0.4","log_injection_enabled":false,"runtime_metrics_enabled":false,"integrations_loaded":["http","fs","net","dns","express@4.17.1"]}
```

#### Diagnostics

The NodeJS Tracer has one diagnostic line it may print, in the case the agent cannot be reached.

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{% /tab %}}
{{% tab "Python" %}}
{{% /tab %}}
{{% tab "Ruby" %}}

#### Configuration

```text
W, [2020-07-08T21:14:25.281615 #137]  WARN -- ddtrace: [ddtrace] DATADOG TRACER CONFIGURATION - {"date":"2020-07-08T21:14:25+00:00","os_name":"x86_64-pc-linux-gnu","version":"0.37.0","lang":"ruby","lang_version":"2.7.0","enabled":true,"agent_url":"http://ddagent:8126?timeout=1","debug":false,"analytics_enabled":false,"runtime_metrics_enabled":false,"vm":"ruby-2.7.0","partial_flushing_enabled":false,"priority_sampling_enabled":false,"health_metrics_enabled":false}
```

#### Diagnostics

The Ruby Tracer has one diagnostic line it may print, in the case the agent cannot be reached.

```text
W, [2020-07-08T21:19:05.765994 #143]  WARN -- ddtrace: [ddtrace] DATADOG TRACER DIAGNOSTIC - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to ddagent:9127 (Connection refused - connect(2) for "ddagent" port 9127)
```

{{% /tab %}}
{{% tab "C++" %}}

#### File Location

In C++, the startup log file is created under the location `/var/tmp/dd-opentracing-cpp` e.g. `/var/tmp/dd-opentracing-cpp/startup_options-1593737077369521386.json`

#### Configuration

```text

{"agent_url":"http://localhost:8126","analytics_enabled":false,"analytics_sample_rate":null,"date":"2020-07-03T00:44:37+0000","dd_version":"","enabled":true,"env":"test-env","lang":"cpp","lang_version":"201402","operation_name_override":"","report_hostname":false,"sampling_rules":"[{\"sample_rate\": 1.0}]","service":"service_name","tags":{},"version":"v1.2.0"}

```

#### Diagnostics

For C++, there are no `DATADOG TRACER DIAGNOSTICS` lines output to the tracer logs. However, if the Agent is not reachable, there should be error logs available, or in Envoy, an increase in the metrics `tracing.datadog.reports_failed` and `tracing.datadog.reports_dropped`.

{{% /tab %}}
{{< /tabs >}}

## Diagnostics Errors

The most insightful `DIAGNOSTICS` error output will be that the tracer is unable to send traces to the Datadog Agent.

In this case, please confirm your tracer has been set up correctly to receive traces for [ECS][1], [Kubernetes][2], [Docker][3] or [any other option][4], or [contact support][5] who will be happy to review your Tracer & Agent configuration.

## Configuration Settings

If your logs only contain `CONFIGURATION` lines, a useful troubleshooting step is to confirm that the settings output by the tracer match the settings from your deployment and configuration of the Datadog Tracer.  Additionally, if you are not seeing specific traces in Datadog, please review the [Compatibility Requirements][6] section of the documentation to confirm these integrations are supported.

If there is an integration you are using that is not supported, or you want a fresh pair of eyes on your configuration output to understand why traces are not appearing as expected in Datadog, [contact support][5] who can help you diagnose and create a Feature Request for a new integration if needed.

## Disabling Startup Logs

Per language, startup logs can be disabled if required via the environment variable setting `DD_TRACE_STARTUP_LOGS=false`.  It is not recommended to do this unless the logs emitted are posing a problem, and if [debug][7] logs are later sent, please make sure to enable startup logs and send all relevant logs together to speed up your support case triage.

[1]: /integrations/amazon_ecs/?tab=java#trace-collection
[2]: /agent/kubernetes/?tab=helm
[3]: /agent/docker/apm/?tab=java
[4]: /tracing/send_traces/
[5]: /help/
[6]: /tracing/compatibility_requirements/
[7]: /tracing/troubleshooting/tracer_debug_logs/
