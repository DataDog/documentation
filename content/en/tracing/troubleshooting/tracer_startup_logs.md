---
title: Tracer Startup Logs
further_reading:
- link: "/tracing/troubleshooting/connection_errors/"
  tag: "Documentation"
  text: "Troubleshooting APM Connection Errors"
---
## Startup logs

Tracer startup logs capture all obtainable information at startup and log it as `DATADOG TRACER CONFIGURATION`, `DATADOG TRACER DIAGNOSTICS`, `DATADOG ERROR`, or `DATADOG CONFIGURATION` to simplify searching within your logs.

Some languages log to a separate file depending on language conventions and the safety of accessing `Stdout` or equivalent. In those cases, the location of logs are noted in the language tab below. Some languages don't log diagnostics entries, also noted below.

`CONFIGURATION` logs are a JSON formatted representation of settings applied to your tracer. In languages where an Agent connectivity check is performed, the configuration JSON will also include an `agent_error` key, which indicates whether the Agent is reachable.

`DIAGNOSTICS` or `ERROR` log entries, in the languages that produce them, happen when the tracer encounters an error during application startup. If you see `DIAGNOSTICS` or `ERROR` log lines, confirm from the indicated log that settings and configurations are applied correctly.

If you do not see logs at all, ensure that your application logs are not silenced and that your log level is at least `INFO` where applicable.

{{< programming-lang-wrapper langs="java,.NET,php,go,nodejs,python,ruby,cpp" >}}
{{< programming-lang lang="java" >}}

**Configuration:**

```text
{"os_name":"Mac OS X","os_version":"10.15.4","architecture":"x86_64","lang":"jvm","lang_version":"11.0.6","jvm_vendor":"AdoptOpenJDK","jvm_version":"11.0.6+10","java_class_version":"55.0","enabled":true,"service":"unnamed-java-app","agent_url":"http://localhost:8126","agent_error":false,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":false,"profiling_enabled":false,"dd_version":"null","health_checks_enabled":false,"configuration_file":"no config file present","runtime_id":"b69deb26-8bc3-4c00-8952-d42bf8c2123b"}
```

**Diagnostics:**

The Java tracer does not output Diagnostics logs. For this check, run the tracer in [debug mode][1].


[1]: /tracing/troubleshooting/tracer_debug_logs/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

**File Location:**

Log files are saved in the following directories by default. Use the `DD_TRACE_LOG_DIRECTORY` setting to change these paths.

| Platform                                             | Path                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux (when using [Kubernetes library injection][1]) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**Note:** On Linux, you must create the logs directory before you enable debug mode.

Since version `2.19.0`, you can use the `DD_TRACE_LOGFILE_RETENTION_DAYS` setting to configure the tracer to delete log files from the current logging directory on startup. The tracer deletes log files the same age and older than the given number of days, with a default value of `31`.

- `dotnet-tracer-managed-{processName}-{timestamp}.log` contains the configuration logs.

- `dotnet-tracer-native-{processName}-{processID}.log` contains the diagnostics logs, if any are generated.

**Configuration:**

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

**Diagnostics:**

The .NET tracer prints the following diagnostic lines:

```text
DATADOG TRACER DIAGNOSTICS - Profiler disabled in DD_TRACE_ENABLED
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} not found in DD_PROFILER_PROCESSES
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {process_name} found in DD_PROFILER_EXCLUDE_PROCESSES
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: interface ICorProfilerInfo3 not found
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as an Azure App Services infrastructure process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: {application_pool} is recognized as Kudu, an Azure App Services reserved process
DATADOG TRACER DIAGNOSTICS - Profiler disabled: no enabled integrations found
DATADOG TRACER DIAGNOSTICS - Failed to attach profiler: unable to set event mask
DATADOG TRACER DIAGNOSTICS - Error fetching configuration {exception}
```

[1]: /tracing/trace_collection/library_injection/?tab=kubernetes
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

**PHP Info:**
Obtain the startup logs JSON string from a `phpinfo()` page next to "DATADOG TRACER CONFIGURATION". Create the following PHP file and access it from a browser on the host machine.

```php
<?php phpinfo(); ?>
```

Diagnostic information is displayed in a separate table to help diagnose common issues.

{{< img src="tracing/troubleshooting/PHPInfo.png" alt="PHP Info" >}}

**CLI SAPI:**

Get the info from the CLI SAPI by running `php --ri=ddtrace`.

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

**Configuration:**

If the tracer is in [DEBUG mode][1], the startup logs will appear in the `error_log` once per process on the first request.

```text
DATADOG TRACER CONFIGURATION - {"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false,"date":"2020-07-01T17:42:50Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cgi-fcgi","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null}
```

**Diagnostics:**

Failed diagnostics for the PHP tracer print in the `error_log` if the tracer is in [DEBUG mode][1].

```text
DATADOG TRACER DIAGNOSTICS - agent_error: Couldn't connect to server
DATADOG TRACER DIAGNOSTICS - ddtrace.request_init_hook_reachable: false
```

**Runtime:**

Access the startup logs as a JSON string at runtime with `\DDTrace\startup_logs()`.

```php
echo \DDTrace\startup_logs() . PHP_EOL;
```

[1]: /tracing/troubleshooting/tracer_debug_logs?tab=php#enable-tracer-debug-mode
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

**Configuration:**

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2020-07-09T15:57:07-05:00","os_name":"darwin","os_version":"10.15.4","version":"v1.26.0","lang":"Go","lang_version":"go1.14.2","env":"","service":"splittest2","agent_url":"http://127.0.0.1:8126/v0.4/traces","agent_error":"","debug":true,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","tags":{"runtime-id":"d269781c-b1bf-4d7b-9a55-a8174930554f"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"dd_version":"","architecture":"amd64","global_service":""}
```

**Diagnostics:**

The Go Tracer prints one of two possible diagnostic lines, one for when the Agent cannot be reached, and the other for trace sampling errors.

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Unable to reach agent: [Reason for error]
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Error(s) parsing DD_TRACE_SAMPLING_RULES:
    at index 1 ...
    at index 4 ....
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

Startup logs are disabled by default starting in version 2.x of the tracer. They can be enabled using the environment variable `DD_TRACE_STARTUP_LOGS=true`.

**Configuration:**

```text
[2020-07-02 14:51:16.421] [INFO] app - host:port==localhost:9080
[2020-07-02 14:51:16.423] [INFO] app - db type==mongo
[2020-07-02 14:51:16.439] [INFO] routes - Use dataaccess:../dataaccess/mongo/index.js
[2020-07-02 14:51:16.599] [INFO] app - Error connecting to database - exiting process: MongoError: connect ECONNREFUSED 127.0.0.1:27017
[2020-07-02 14:51:16.600] [INFO] app - Initialized database connections
[2020-07-02 14:51:16.601] [INFO] app - Express server listening on port 9080
DATADOG TRACER CONFIGURATION - {"date":"2020-07-02T18:51:18.294Z","os_name":"Darwin","os_version":"19.2.0","architecture":"x64","version":"0.23.0","lang":"nodejs","lang_version":"12.18.1","enabled":true,"service":"acmeair","agent_url":"http://localhost:8126","agent_error":"Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126","debug":false,"analytics_enabled":false,"sample_rate":1,"sampling_rules":[],"tags":{"service":"acmeair","version":"0.0.4"},"dd_version":"0.0.4","log_injection_enabled":false,"runtime_metrics_enabled":false,"integrations_loaded":["http","fs","net","dns","express@4.17.1"]}
```

**Diagnostics:**

The Node.js Tracer prints a diagnostic line when the Agent cannot be reached.

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**Log location:**

The Python tracer logs configuration information as INFO-level. It logs diagnostics information, if found, as ERROR.

If there is no logging configuration, only Diagnostics will be output to `Stderr`.

To see tracer startup logs, either add a logger, or set `DD_TRACE_DEBUG=true` in your configuration and run your application with `ddtrace-run`. This adds a logger, and exposes both debug and startup tracer logs.

To see options for logging to a file with `DD_TRACE_LOG_FILE`, read [Tracer Debug Logs][1].

**Configuration:**

```text
2020-07-09 11:04:08,098 INFO [ddtrace.tracer] [tracer.py:338] - - DATADOG TRACER CONFIGURATION - {"date": "2020-07-09T15:04:08.092797", "os_name": "Darwin", "os_version": "19.5.0", "is_64_bit": true, "architecture": "64bit", "vm": "CPython", "version": "0.38.1.dev79+gd22e2972.d20200707", "lang": "python", "lang_version": "3.7.6", "pip_version": "20.0.2", "in_virtual_env": true, "agent_url": "http://localhost:1234", "agent_error": "Agent not reachable. Exception raised: [Errno 61] Connection refused", "env": "", "is_global_tracer": true, "enabled_env_setting": null, "tracer_enabled": true, "sampler_type": "DatadogSampler", "priority_sampler_type": "RateByServiceSampler", "service": "", "debug": true, "enabled_cli": true, "analytics_enabled": false, "log_injection_enabled": false, "health_metrics_enabled": false, "dd_version": "", "priority_sampling_enabled": true, "global_tags": "", "tracer_tags": "", "integrations": {"asyncio": "N/A", "boto": "N/A", "botocore": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.15.32", "module_imported": false, "config": "N/A"}, "bottle": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "0.12.18", "module_imported": false, "config": null}, "cassandra": "N/A", "celery": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "4.2.2", "module_imported": false, "config": "N/A"}, "consul": "N/A", "django": "N/A", "elasticsearch": "N/A", "algoliasearch": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.2.0", "module_imported": false, "config": "N/A"}, "futures": "N/A", "grpc": "N/A", "mongoengine": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.19.1", "module_imported": false, "config": "N/A"}, "mysql": "N/A", "mysqldb": "N/A", "pymysql": "N/A", "psycopg": "N/A", "pylibmc": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.6.1", "module_imported": false, "config": "N/A"}, "pymemcache": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.4.4", "module_imported": false, "config": "N/A"}, "pymongo": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.10.1", "module_imported": false, "config": "N/A"}, "redis": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.5.3", "module_imported": false, "config": "N/A"}, "rediscluster": "N/A", "requests": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.23.0", "module_imported": false, "config": "N/A"}, "sqlalchemy": "N/A", "sqlite3": "N/A", "aiohttp": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.6.2", "module_imported": false, "config": "N/A"}, "aiopg": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.15.0", "module_imported": false, "config": "N/A"}, "aiobotocore": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.0.1", "module_imported": false, "config": null}, "httplib": "N/A", "vertica": "N/A", "molten": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.7.4", "module_imported": false, "config": "N/A"}, "jinja2": "N/A", "mako": "N/A", "flask": "N/A", "kombu": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "4.3.0", "module_imported": false, "config": null}, "falcon": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.4.1", "module_imported": false, "config": null}, "pylons": "N/A", "pyramid": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.10.4", "module_imported": false, "config": null}, "logging": "N/A"}}
```

**Diagnostics:**

The Python tracer prints a diagnostic line when the Agent cannot be reached.

```text
DATADOG TRACER DIAGNOSTIC - Agent not reachable. Exception raised: [Errno 61] Connection refused
```
[1]: /tracing/troubleshooting/tracer_debug_logs/?code-lang=python#enable-debug-mode

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

### Enable startup logs

You can enable startup logs using either code configuration or an environment variable:

**Code**:

To enable startup logs in your code:

```ruby
Datadog.configure do |c|
     c.diagnostics.startup_logs.enabled = true
end
```
**Environment variable**:

To enable startup logs using an environment variable:

```shell
export DD_TRACE_STARTUP_LOGS=true
```

### Output

When startup logs are enabled, the tracer outputs configuration and diagnostic information.

**Configuration:**

```text
W, [2020-07-08T21:14:25.281615 #137]  WARN -- ddtrace: [ddtrace] DATADOG TRACER CONFIGURATION - {"date":"2020-07-08T21:14:25+00:00","os_name":"x86_64-pc-linux-gnu","version":"0.37.0","lang":"ruby","lang_version":"2.7.0","enabled":true,"agent_url":"http://ddagent:8126?timeout=1","debug":false,"analytics_enabled":false,"runtime_metrics_enabled":false,"vm":"ruby-2.7.0","partial_flushing_enabled":false,"priority_sampling_enabled":false,"health_metrics_enabled":false}
```

**Diagnostics:**

The Ruby tracer prints an error line when the Agent cannot be reached.

```text
W, [2020-07-08T21:19:05.765994 #143]  WARN -- ddtrace: [ddtrace] DATADOG ERROR - TRACER - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to ddagent:9127 (Connection refused - connect(2) for "ddagent" port 9127)
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

**Configuration:**

The Ruby tracer prints a configuration line for each product (i.e. Profiling, Core, and Tracing).

```text
I, [2023-08-16T18:09:01.972265 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - PROFILING - {"profiling_enabled":false}

I, [2023-08-16T18:09:01.972767 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - CORE - {"date":"2023-08-16T18:09:01+00:00","os_name":"aarch64-unknown-linux-gnu","version":"1.13.0","lang":"ruby","lang_version":"3.0.6","env":null,"service":"rails","dd_version":null,"debug":false,"tags":null,"runtime_metrics_enabled":false,"vm":"ruby-3.0.6","health_metrics_enabled":false}

I, [2023-08-16T18:09:27.223143 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - TRACING - {"enabled":true,"agent_url":"http://agent:8126?timeout=30","analytics_enabled":false,"sample_rate":null,"sampling_rules":null,"integrations_loaded":"active_model_serializers@,aws@","partial_flushing_enabled":false,"priority_sampling_enabled":false,"integration_active_model_serializers_analytics_enabled":"false","integration_active_model_serializers_analytics_sample_rate":"1.0","integration_active_model_serializers_enabled":"true","integration_active_model_serializers_service_name":"","integration_aws_analytics_enabled":"false","integration_aws_analytics_sample_rate":"1.0","integration_aws_enabled":"true","integration_aws_service_name":"aws","integration_aws_peer_service":""}
```

**Diagnostics:**

For C++, there are no `DATADOG TRACER DIAGNOSTICS` lines output to the tracer logs. However, if the Agent is not reachable, errors appear in your application logs. In Envoy there is an increase in the metrics `tracing.datadog.reports_failed` and `tracing.datadog.reports_dropped`.

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Connection errors

If your application or startup logs contain `DIAGNOSTICS` errors or messages that the Agent cannot be reached or connected to (varying depending on your language), it means the tracer is unable to send traces to the Datadog Agent.

If you have these errors, check that your Agent is set up to receive traces for [ECS][1], [Kubernetes][2], [Docker][3] or [any other option][4], or [contact support][5] to review your tracer and Agent configuration.

See [Connection Errors][6] for information about errors indicating that your instrumented application cannot communicate with the Datadog Agent.

## Configuration settings

If your logs contain only `CONFIGURATION` lines, a useful troubleshooting step is to confirm that the settings output by the tracer match the settings from your deployment and configuration of the Datadog Tracer. Additionally, if you are not seeing specific traces in Datadog, review the [Compatibility Requirements][7] section of the documentation to confirm these integrations are supported.

If an integration you are using is not supported, or you want a fresh pair of eyes on your configuration output to understand why traces are not appearing as expected in Datadog, [contact support][5] who can help you diagnose and create a Feature Request for a new integration.

## Disabling startup logs

For each language, you can disable startup logs by setting the environment variable `DD_TRACE_STARTUP_LOGS=false`, but do this only if the logs emitted are posing a problem. If later you are sending [debug][8] logs, remember to enable startup logs and send all relevant logs together to speed up your support case triage.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_ecs/?tab=java#trace-collection
[2]: /agent/kubernetes/?tab=helm
[3]: /agent/docker/apm/?tab=java
[4]: /tracing/send_traces/
[5]: /help/
[6]: /tracing/troubleshooting/connection_errors/
[7]: /tracing/compatibility_requirements/
[8]: /tracing/troubleshooting/tracer_debug_logs/
