---
title: Tracer Startup Logs
kind: Documentation
---
## Startup Logs

Tracer startup logs will capture all obtainable information at startup and log it either as `DATADOG TRACER CONFIGURATION` or `DATADOG TRACER DIAGNOSTICS`.

`DIAGNOSTICS` log lines appear when the tracer encountered an error during application startup, while  `CONFIGURATION` logs are a JSON or raw-formatted representation of settings applied to your tracer.

If you see any `DIAGNOSTICS` log lines, please confirm from the indicated log that settings and configurations have been applied correctly.  If you do not see logs at all, please ensure that your application logs are not silenced and that your log level is at least `INFO` where applicable.

{{< tabs >}}
{{% tab "Java" %}}
{{% /tab %}}
{{% tab ".NET" %}}

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

```text
[2020-07-02 14:51:16.421] [INFO] app - host:port==localhost:9080
[2020-07-02 14:51:16.423] [INFO] app - db type==mongo
[2020-07-02 14:51:16.439] [INFO] routes - Use dataaccess:../dataaccess/mongo/index.js
[2020-07-02 14:51:16.599] [INFO] app - Error connecting to database - exiting process: MongoError: connect ECONNREFUSED 127.0.0.1:27017
[2020-07-02 14:51:16.600] [INFO] app - Initialized database connections
[2020-07-02 14:51:16.601] [INFO] app - Express server listening on port 9080
DATADOG TRACER CONFIGURATION - {"date":"2020-07-02T18:51:18.294Z","os_name":"Darwin","os_version":"19.2.0","architecture":"x64","version":"0.22.0","lang":"nodejs","lang_version":"12.18.1","enabled":true,"service":"acmeair","agent_url":"http://localhost:8126","agent_error":"Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126","debug":false,"analytics_enabled":false,"sample_rate":1,"sampling_rules":[],"tags":{"service":"acmeair","version":"0.0.4"},"dd_version":"0.0.4","log_injection_enabled":false,"runtime_metrics_enabled":false,"integrations_loaded":["http","fs","net","dns","express@4.17.1"]}
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{% /tab %}}
{{% tab "Python" %}}
{{% /tab %}}
{{% tab "Ruby" %}}
{{% /tab %}}
{{% tab "C++" %}}
{{% /tab %}}
{{< /tabs >}}

## Diagnostics Errors

The most common `DIAGNOSTICS` error output will be that the tracer is unable to send traces to the Datadog Agent.

In this case, please confirm your tracer has been set up correctly to receive traces for [ECS][1], [Kubernetes][2], [Docker][3] or [any other option][4].

## Configuration Settings

If your logs only contain `CONFIGURATION` lines, please confirm that the settings output by the tracer match your expected settings from your deployment and configuration of the Datadog Tracer.  Additionally, if you are not seeing specific traces in Datadog, please review the [Compatibility Requirements][5] section of the documentation to confirm these integrations are supported.  If there is an integration you are using that is not supported, or if everything looks fine, proceed to step 4 and open a support ticket.

## Open a Support ticket

Open a [ticket][6] with our support team explaining your issue or unsupported integration to create a feature request, and include the `DATADOG TRACER CONFIGURATION` output of your logs to assist us with faster resolution.

## Disabling Startup Logs

Per language, startup logs can be disabled if required via the environment variable setting `DD_TRACE_STARTUP_LOGS=false`.  It is not recommended to do this unless the logs emitted are posing a problem, and if [debug][7] logs are later sent, please make sure to enable startup logs and send all relevant logs together to speed up your support case triage.

[1]: /integrations/amazon_ecs/?tab=python#trace-collection
[2]: /agent/kubernetes/?tab=helm
[3]: /agent/docker/apm/?tab=java
[4]: /tracing/send_traces/
[5]: /tracing/compatibility_requirements/
[6]: /help/
[7]: /tracing/troubleshooting/tracer_debug_logs/
