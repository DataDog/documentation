---
title: Configuring the PHP Tracing Library
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: Blog
  text: PHP monitoring with Datadog APM and distributed tracing
- link: "https://github.com/DataDog/dd-trace-php"
  tag: Source Code
  text: Source code
- link: /tracing/trace_collection/trace_context_propagation/php/
  tag: Documentation
  text: Propagating trace context
- link: /tracing/glossary/
  tag: Documentation
  text: Explore your services, resources and traces
- link: /tracing/
  tag: Documentation
  text: Advanced Usage
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

The PHP tracer can be configured using environment variables and INI settings.

INI settings can be configured globally, for example, in the `php.ini` file, or for a specific web server or virtual host.

**Note**: If you use code auto-instrumentation (the recommended approach), be aware that the instrumenting code is executed before any user code. As a result, the environment variables and the INI settings below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files do not work.

### Apache

For Apache with php-fpm, use the `env` directive in your `www.conf` configuration file to configure the PHP tracer, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value datadog.service my-app
```

Alternatively, you can use [`SetEnv`][2] from the server config, virtual host, directory, or `.htaccess` file.

```text
# In a virtual host configuration as an environment variable
SetEnv DD_TRACE_DEBUG 1
# In a virtual host configuration as an INI setting
php_value datadog.service my-app
```

### NGINX and PHP-FPM

<div class="alert alert-warning">
<strong>Note:</strong> PHP-FPM does not support the value <code>false</code> in <code>env[...]</code> directives. Use <code>1</code> in place of <code>true</code> and <code>0</code> in place of <code>false</code>.
</div>

For NGINX, use the `env` directive in the php-fpm's `www.conf` file, for example:

```
; Example of passing the host environment variable SOME_ENV
; to the PHP process as DD_AGENT_HOST
env[DD_AGENT_HOST] = $SOME_ENV
; Example of passing the value 'my-app' to the PHP
; process as DD_SERVICE
env[DD_SERVICE] = my-app
; Or using the equivalent INI setting
php_value[datadog.service] = my-app
```

**Note**: If you have enabled APM for your NGINX server, make sure you have properly configured the `opentracing_fastcgi_propagate_context` setting for distributed tracing to properly work. See [NGINX APM configuration][3] for more details.

### PHP CLI server

Set in the command line to start the server.

```text
DD_TRACE_DEBUG=1 php -d datadog.service=my-app -S localhost:8888
```

### Environment variable configuration

The following table lists the environment variables for configuring tracing, and corresponding INI settings (where available) and defaults.

`DD_AGENT_HOST`
: **INI**: `datadog.agent_host`<br>
**Default**: `localhost` <br>
The Agent host name.

`DD_AUTOFINISH_SPANS`
: **INI**: `datadog.autofinish_spans`<br>
**Default**: `0`<br>
Whether spans are automatically finished when the tracer is flushed.

`DD_DISTRIBUTED_TRACING`
: **INI**: `datadog.distributed_tracing`<br>
**Default**: `1`<br>
Whether to enable distributed tracing.

`DD_ENV`
: **INI**: `datadog.env`<br>
**Default**: `null`<br>
Set an application's environment, for example: `prod`, `pre-prod`, `stage`. Starting version `0.90.0`, changes to `datadog.version` at run-time through `ini_set` are also applied to the current root span.

`DD_LOGS_INJECTION`
: **INI**: `datadog.logs_injection`<br>
**Default**: `0`<br>
Enables or disables automatic injection of correlation identifiers into application logs. Added in version `0.89.0`<br>
See [logs correlation documentation][17] for more information.

`DD_PROFILING_ENABLED`
: **INI**: `datadog.profiling.enabled`. INI available since `0.82.0`.<br>
**Default**: `1`<br>
Enable the Datadog profiler. Added in version `0.69.0`. See [Enabling the PHP Profiler][4]. For version `0.81.0` and below it defaulted to `0`.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **INI**: `datadog.profiling.endpoint_collection_enabled`. INI available since `0.82.0`.<br>
**Default**: `1`<br>
Whether to enable the endpoint data collection in profiles. Added in version `0.79.0`.

`DD_PROFILING_ALLOCATION_ENABLED`
: **INI**: `datadog.profiling.allocation_enabled`. INI available since `0.88.0`.<br>
**Default**: `1`<br>
Enable the allocation size and allocation bytes profile type. Added in version `0.88.0`. When an active JIT is detected, allocation profiling is turned off for PHP version `8.0.0`-`8.1.20` and `8.2.0`-`8.2.7` due to a limitation of the ZendEngine.<br>
**Note**: This supersedes the `DD_PROFILING_EXPERIMENTAL_ALLOCATION_ENABLED` environment variable (`datadog.profiling.experimental_allocation_enabled` INI setting), which was available since `0.84`. If both are set, this one takes precedence.

`DD_PROFILING_EXPERIMENTAL_FEATURES_ENABLED`
: **INI**: `datadog.profiling.experimental_features_enabled`. INI available since `0.96.0`.<br>
**Default**: `0`<br>
Enable all experimental features.<br>
**Note**: This setting overrides the more specific configurations and if enabled, toggling other experimental configuration settings won't have an effect.

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI**: `datadog.profiling.experimental_cpu_time_enabled`. INI available since `0.82.0`.<br>
**Default**: `1`<br>
Enable the experimental CPU profile type. Added in version `0.69.0`. For version `0.76` and below it defaulted to `0`.

`DD_PROFILING_EXCEPTION_ENABLED`
: **INI**: `datadog.profiling.exception_enabled`. INI available since `0.96.0`.<br>
**Default**: `1`<br>
Enable the exception profile type. Added in version `0.92.0` and GA
in version `0.96.0`.<br><br>
**Note**: This supersedes the `DD_PROFILING_EXPERIMENTAL_EXCEPTION_ENABLED` environment variable (`datadog.profiling.experimental_exception_enabled` INI setting), which was available since `0.92`. If both are set, this one takes precedence.

`DD_PROFILING_EXCEPTION_MESSAGE_ENABLED`
: **INI**: `datadog.profiling.exception_message_enabled`. INI available since `0.98.0`.<br>
**Default**: `0`<br>
Enable the collection of exception messages with exception samples.<br><br>
**Note**: Please be aware that your exception messages might contain PII (Personal Identifiable Information), which is the reason why this setting is default disabled.

`DD_PROFILING_EXCEPTION_SAMPLING_DISTANCE`
: **INI**: `datadog.profiling.exception_sampling_distance`. INI available since `0.96.0`.<br>
**Default**: `100`<br>
Configure the sampling distance for exceptions. The higher the sampling distance, the fewer samples are created and the lower the overhead.<br><br>
**Note**: This supersedes the `DD_PROFILING_EXPERIMENTAL_EXCEPTION_SAMPLING_DISTANCE` environment variable (`datadog.profiling.experimental_exception_sampling_distance` INI setting), which was available since `0.92`. If both are set, this one takes precedence.

`DD_PROFILING_TIMELINE_ENABLED`
: **INI**: `datadog.profiling.timeline_enabled`. INI available since `0.98.0`.<br>
**Default**: `1`<br>
Enable the timeline profile type. Added in version `0.89.0`.<br><br>
**Note**: This supersedes the `DD_PROFILING_EXPERIMENTAL_TIMELINE_ENABLED` environment variable (`datadog.profiling.experimental_timeline_enabled` INI setting), which was available since `0.89` (default `0`). If both are set, this one takes precedence.

`DD_PROFILING_LOG_LEVEL`
: **INI**: `datadog.profiling.log_level`. INI available since `0.82.0`.<br>
**Default**: `off`<br>
Set the profiler's log level. Acceptable values are `off`, `error`, `warn`, `info`, `debug`, and `trace`. The profiler's logs are written to the standard error stream of the process. Added in version `0.69.0`.

`DD_PRIORITY_SAMPLING`
: **INI**: `datadog.priority_sampling`<br>
**Default**: `1`<br>
Whether to enable priority sampling.

`DD_SERVICE`
: **INI**: `datadog.service`<br>
**Default**: `null`<br>
The default app name.

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Default**: `null`<br>
Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names](#integration-names)).

`DD_TRACE_128_BIT_TRACEID_GENERATION_ENABLED`
: **INI**: `datadog.trace.128_bit_traceid_generation_enabled`<br>
**Default**: `true`<br>
When true, the tracer generates 128 bit Trace IDs, and encodes Trace IDs as 32 lowercase hexadecimal characters with zero padding.

`DD_TRACE_128_BIT_TRACEID_LOGGING_ENABLED`
: **INI**: `datadog.trace.128_bit_traceid_logging_enabled`<br>
**Default**: `0`<br>
Enable printing of the full 128-bit trace ID when formatting trace IDs for logs correlation.
When false (default), only the low 64-bits of the trace ID are printed, formatted as an integer. This means if the trace ID is only 64 bits, the full ID is printed.
When true, the trace ID is printed as a full 128-bit trace ID in hexadecimal format. This is the case even if the ID itself is only 64 bits.

`DD_TRACE_HEALTH_METRICS_ENABLED`
: **INI**: `datadog.trace_health_metrics_enabled`<br>
**Default**: `false`<br>
When enabled, the tracer sends stats to DogStatsD. In addition, where `sigaction` is available at build time, the tracer sends uncaught exception metrics upon segfaults.

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **INI**: `datadog.trace.agent_connect_timeout`<br>
**Default**: `100`<br>
The Agent connection timeout (in milliseconds).

`DD_TRACE_AGENT_PORT`
: **INI**: `datadog.trace.agent_port`<br>
**Default**: `8126`<br>
The Agent port number. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.

`DD_TRACE_AGENT_TIMEOUT`
: **INI**: `datadog.trace.agent_timeout`<br>
**Default**: `500`<br>
The Agent request transfer timeout (in milliseconds).

`DD_TRACE_AGENT_URL`
: **INI**: `datadog.trace.agent_url`<br>
**Default**: `null`<br>
The Agent URL; takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`. For example: `https://localhost:8126`. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it.

`DD_DOGSTATSD_URL`
: **INI**: `datadog.dogstatsd_url`<br>
**Default**: `null`<br>
The URL used to negotiate connection to DogStatsD. This setting takes precedence over `DD_AGENT_HOST` and `DD_DOGSTATSD_PORT`. Supports `udp://` or `unix://` schemas only.

`DD_DOGSTATSD_PORT`
: **INI**: `datadog.dogstatsd_port`<br>
**Default**: `8125`<br>
The port used to connect to DogStatsD, used in combination with `DD_AGENT_HOST` to negotiate connection to DogStatsD when `DD_TRACE_HEALTH_METRICS_ENABLED` is enabled.

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI**: `datadog.trace.auto_flush_enabled`<br>
**Default**: `0`<br>
Automatically flush the tracer when all the spans are closed; set to `1` in conjunction with `DD_TRACE_GENERATE_ROOT_SPAN=0` to trace [long-running processes][14].

`DD_TRACE_CLI_ENABLED`
: **INI**: `datadog.trace.cli_enabled`<br>
**Default**: `0`<br>
Enable tracing of PHP scripts from the CLI. See [Tracing CLI scripts][15].

`DD_TRACE_DEBUG`
: **INI**: `datadog.trace.debug`<br>
**Default**: `0`<br>
Enable debug mode. When `1`, log messages are sent to the device or file set in the `error_log` INI setting. The actual value of `error_log` may be different than the output of `php -i` as it can be overwritten in the PHP-FPM/Apache configuration files. Takes precedence over `DD_TRACE_LOG_LEVEL` if active.

`DD_TRACE_LOG_LEVEL`
: **INI**: `datadog.trace.log_level`<br>
**Default**: `Error`<br>
Sets a precise log level. The log level follows RUST_LOG conventions; accepted log levels are `error`, `warn`, `info`, `debug`, `trace` and `off`.

`DD_TRACE_LOG_FILE`
: **INI**: `datadog.trace.log_file`<br>
**Default**: ``<br>
Specifies a log file. If none is specified, logs go to the default PHP error location. To debug datadog-ipc-helper issues (for example, submission of telemetry), you must specify the log file.

`DD_TRACE_FORKED_PROCESS`
: **INI**: `datadog.trace.forked_process`<br>
**Default**: `1`<br>
Indicates whether to trace a forked process. Set to `1` to trace forked processes, or to `0` to disable tracing in forked processes. If set to `0`, you can still manually re-enable a process' trace in code with `ini_set("datadog.trace.enabled", "1");`, but it will be presented as a fresh trace. Forked process traces are shown as whole distributed traces only when both `DD_TRACE_FORKED_PROCESS` and `DD_DISTRIBUTED_TRACING` are configured to `1` (on).

`DD_TRACE_ENABLED`
: **INI**: `datadog.trace.enabled`<br>
**Default**: `1`<br>
Enable the tracer globally.

`DD_TRACE_GENERATE_ROOT_SPAN`
: **INI**: `datadog.trace.generate_root_span`<br>
**Default**: `1`<br>
Automatically generate a top-level span; set to `0` in conjunction with `DD_TRACE_AUTO_FLUSH_ENABLED=1` to trace [long-running processes][14].

`DD_TAGS`
: **INI**: `datadog.tags`<br>
**Default**: `null`<br>
Tags to be set on all spans, for example: `key1:value1,key2:value2`.

`DD_TRACE_HEADER_TAGS`
: **INI**: `datadog.trace.header_tags`<br>
**Default**: `null`<br>
CSV of header names that are reported on the root span as tags.

`DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE`
: **INI**: `datadog.trace.db_client_split_by_instance`<br>
**Default**: `0`<br>
Set the service name of HTTP requests to `pdo-<hostname>`. For example, a `PDO->query()` call to a database host `datadoghq.com` has the service name `pdo-datadoghq.com` instead of the default service name of `pdo`.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI**: `datadog.trace.http_client_split_by_domain`<br>
**Default**: `0`<br>
Set the service name of HTTP requests to `host-<hostname>`, for example a `curl_exec()` call to `https://datadoghq.com` has the service name `host-datadoghq.com` instead of the default service name of `curl`.

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI**: `datadog.trace.redis_client_split_by_host`<br>
**Default**: `0`<br>
Set the service name of Redis clients operations to `redis-<hostname>`.

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI**: `datadog.trace.<INTEGRATION>_enabled`<br>
**Default**: `1`<br>
Enable or disable an integration; all integrations are enabled by default (see [Integration names](#integration-names)).

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI**: `datadog.trace.measure_compile_time`<br>
**Default**: `1`<br>
Record the compile time of the request (in milliseconds) onto the top-level span.

`DD_TRACE_REMOVE_AUTOINSTRUMENTATION_ORPHANS`
: **INI**: `datadog.trace.remove_autoinstrumentation_orphans`<br>
**Default**: `false`<br>
Automatically remove orphaned spans generated by auto-instrumentation. Currently, this only applies to some Redis and Laravel calls used in the context of Laravel Horizon. Added in version `0.88.0`.<br><br>
**Note:** These orphaned spans are flushed but not recorded in the trace. Moreover, the specific single-span traces that are removed with this configuration option are:
  - `laravel.event.handle`
  - `laravel.provider.load`
  - `Predis.Client.__construct`
  - `Predis.Client.executeCommand`
  - `Predis.Pipeline.executePipeline`

`DD_TRACE_REMOVE_ROOT_SPAN_LARAVEL_QUEUE`
: **INI**: `datadog.trace.remove_root_span_laravel_queue`<br>
**Default**: `true`<br>
Automatically disable root span generation (see `DD_TRACE_GENERATE_ROOT_SPAN`) and enable auto-flushing (see `DD_TRACE_AUTO_FLUSH_ENABLED`) for Laravel Queue/Horizon commands. Added in version `0.88.0`.

`DD_TRACE_LARAVEL_QUEUE_DISTRIBUTED_TRACING`
: **INI**: `datadog.trace.laravel_queue_distributed_tracing`<br>
**Default**: `true`<br>
Disables the creation of an additional `laravel.queue.process` span and relies solely on span links. Added in version `0.93.0`.

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **INI**: `datadog.trace.resource_uri_fragment_regex`<br>
**Default**: `null`<br>
CSV of regexes that identifies path fragments corresponding to IDs (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **INI**: `datadog.trace.resource_uri_mapping_incoming`<br>
**Default**: `null`<br>
CSV of URI mappings to normalize resource naming for incoming requests (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **INI**: `datadog.trace.resource_uri_mapping_outgoing`<br>
**Default**: `null`<br>
CSV of URI mappings to normalize resource naming for outgoing requests (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **INI**: `datadog.trace.retain_thread_capabilities`<br>
**Default**: `0`<br>
Works for Linux. Set to `true` to retain capabilities on Datadog background threads when you change the effective user ID. This option does not affect most setups, but some modules - to date Datadog is only aware of [Apache's mod-ruid2][5] - may invoke `setuid()` or similar syscalls, leading to crashes or loss of functionality as it loses capabilities.<br><br>
**Note:** Enabling this option may compromise security. This option, standalone, does not pose a security risk. However, an attacker being able to exploit a vulnerability in PHP or web server may be able to escalate privileges with relative ease, if the web server or PHP were started with full capabilities, as the background threads will retain their original capabilities. Datadog recommends restricting the capabilities of the web server with the `setcap` utility.

`DD_HTTP_SERVER_ROUTE_BASED_NAMING`
: **INI**: `datadog.http_server_route_based_naming`<br>
**Default**: `true`<br>
Enable route-based naming for HTTP server requests. Set to `true` to use the integration-specific root span's resource name format. When `false`, the HTTP method and path are used instead. Added in version `0.89.0`.

`DD_TRACE_SAMPLE_RATE`
: **INI**: `datadog.trace.sample_rate`<br>
**Default**: `-1`<br>
The sampling rate for the traces, a number between `0.0` and `1.0`. The default value of `-1` defers control of sampling to the Datadog Agent.

`DD_TRACE_SAMPLING_RULES`
: **INI**: `datadog.trace.sampling_rules`<br>
**Default**: `null`<br>
A JSON encoded string to configure the sampling rate. Examples: Set the sample rate to 20%: `'[{"sample_rate": 0.2}]'`. Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'` (see [Integration names](#integration-names)). The JSON object **must** be surrounded by single quotes (`'`) to avoid problems with escaping of the double quote (`"`) character. The service matching takes `DD_SERVICE_MAPPING` into account (starting version `0.90.0`). The name and service must be a valid regular expression. Rules that are not valid regular expressions are ignored.

`DD_TRACE_SAMPLING_RULES_FORMAT`
: **INI**: `datadog.trace.sampling_rules_format`<br>
**Default**: `glob`<br>
Rules the format (`regex` or `glob`) used for sampling rules defined by `DD_TRACE_SAMPLING_RULES`. Added in version `0.98.0` and deprecated as of `1.0.0`.

`DD_TRACE_RATE_LIMIT`
: **INI**: `datadog.trace.rate_limit`<br>
**Default**: `0`<br>
Maximum number of spans to sample per second. All processes in an Apache or FPM pool share the same limiter. When unset (0) rate limiting is delegated to the Datadog Agent.

`DD_TRACE_SPANS_LIMIT`
: **INI**: `datadog.trace.spans_limit`<br>
**Default**: `1000`<br>
The maximum number of spans that are generated within one trace. If the maximum number of spans is reached, then spans are no longer generated. If the limit is increased, then the amount of memory that is used by a pending trace will increase and might reach the PHP maximum amount of allowed memory. The maximum amount of allowed memory can be increased with the PHP INI system setting `memory_limit`.

`DD_SPAN_SAMPLING_RULES`
: **INI**: `datadog.span_sampling_rules`<br>
**Default**: `null`<br>
A JSON encoded string to configure the sampling rate. Rules are applied in configured order to determine the span's sample rate. The `sample_rate` value must be between 0.0 and 1.0 (inclusive). <br>
**Example**: Set the span sample rate to 50% for the service 'my-service' and operation name 'http.request', up to 50 traces per second: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`. The JSON object **must** be surrounded by single quotes (`'`) to avoid problems with escaping of the double quote (`"`) character.<br>
For more information, see [Ingestion Mechanisms][6].<br>


`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI**: `datadog.trace.url_as_resource_names_enabled`<br>
**Default**: `1`<br>
Enable URL's as resource names (see [Map resource names to normalized URI](#map-resource-names-to-normalized-uri)).

`DD_VERSION`
: **INI**: `datadog.version`<br>
**Default**: `null`<br>
Set an application's version in traces and logs, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Starting version `0.90.0`, changes to `datadog.version` at runtime through `ini_set` are also applied to the current root span.

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_url_query_param_allowed`<br>
**Default**: `*`<br>
A comma-separated list of query parameters to be collected as part of the URL. Set to empty to prevent collecting any parameters, or `*` to collect all parameters. Added in version `0.74.0`.

`DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_post_data_param_allowed`<br>
**Default**: ""<br>
A comma-separated list of HTTP POST data fields to be collected. Leave empty if you don't want to collect any posted values. When setting this value to the wildcard `*`, all posted data is collected, but the values for fields that match the `DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` obfuscation rule are redacted. If specific fields are given, then only these fields' values are visible, while the values for all other fields are redacted. Added in version `0.86.0`.<br>
**Example**:
  - The posted data is `qux=quux&foo[bar][password]=Password12!&foo[bar][username]=admin&foo[baz][bar]=qux&foo[baz][key]=value`
  - `DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED` is set to `foo.baz,foo.bar.password`
  - In this scenario, the collected metadata is:
    - `http.request.foo.bar.password=Password12!`
    - `http.request.foo.bar.username=<redacted>`
    - `http.request.foo.baz.bar=qux`
    - `http.request.foo.baz.key=value`
    - `http.request.qux=<redacted>`

`DD_TRACE_RESOURCE_URI_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.resource_uri_query_param_allowed`<br>
**Default**: `*`<br>
A comma-separated list of query parameters to be collected as part of the resource URI. Set to empty to prevent collecting any parameters, or `*` to collect all parameters. Added in version `0.74.0`.

`DD_TRACE_CLIENT_IP_ENABLED`
: **INI**: `datadog.trace.client_ip_enabled`<br>
**Default**: `false`<br>
Enables IP collection client side. Added in version `0.84.0`.

`DD_TRACE_CLIENT_IP_HEADER`
: **INI**: `datadog.trace.client_ip_header`<br>
**Default**: `null`<br>
The IP header to be used for client IP collection, for example: `x-forwarded-for`. Added in version `0.84.0` (`0.76.0` when using ASM).

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI**: `datadog.trace.obfuscation_query_string_regexp`<br>
**Default**:
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
  Regular expression used to obfuscate the query string included as part of the URL. This expression is also used in the redaction process for HTTP POST data. Added in version `0.76.0`.

`DD_TRACE_OTEL_ENABLED`
: Enables or disables OpenTelemetry based tracing, both for [custom][18] or [automatic][19] instrumentation. <br>
Valid values are: `true` or `false`.<br>
**Default**: `false`

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **INI**: `datadog.trace.propagation_style_inject`<br>
**Default**: `Datadog,tracecontext`<br>
Propagation styles to use when injecting tracing headers. If using multiple styles, comma separate them. The supported styles are:

  - [tracecontext][10]
  - [b3multi][7]
  - [B3 single header][8]
  - Datadog

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **INI**: `datadog.trace.propagation_style_extract`<br>
**Default**: `Datadog,tracecontext,b3multi,B3 single header`<br>
Propagation styles to use when extracting tracing headers. If using multiple styles, comma separate them. The supported styles are:

  - [tracecontext][10]
  - [b3multi][7]
  - [B3 single header][8]
  - Datadog

`DD_TRACE_WORDPRESS_ADDITIONAL_ACTIONS`
: **INI**: `datadog.trace.wordpress_additional_actions`<br>
**Default**: `null`<br>
A comma-separated list of WordPress action hooks to be instrumented. This feature is only available when `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION` is enabled. Added in version `0.91.0`.

`DD_TRACE_WORDPRESS_CALLBACKS`
: **INI**: `datadog.trace.wordpress_callbacks`<br>
**Default**: `true` for PHP tracer >= v1.0<br>
Enables WordPress action hook callbacks instrumentation. This feature is only available when `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION` is enabled. Added in version `0.91.0`.

`DD_DBM_PROPAGATION_MODE`
: **INI**: `datadog.dbm_propagation_mode`<br>
**Default**: `'disabled'`<br>
Enables linking between data sent from APM and the Database Monitoring product when set to `'service'` or `'full'`.<br>
The `'service'` option enables the connection between DBM and APM services. Available for Postgres, MySQL and SQLServer.<br>
The `'full'` option enables connection between database spans with database query events. Available for Postgres and MySQL.<br>

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **INI**: `datadog.instrumentation_telemetry_enabled`<br>
**Default**: `true`<br>
Datadog may collect [environmental and diagnostic information about your system][16] to improve the product. When false, this telemetry data will not be collected.

#### Integration names

The table below specifies the default service names for each integration. Change the service names with `DD_SERVICE_MAPPING`.

Use the name when setting integration-specific configuration such as, `DD_TRACE_<INTEGRATION>_ENABLED`, for example: Laravel is `DD_TRACE_LARAVEL_ENABLED`.

| Integration   | Service Name    |
| ------------- | --------------- |
| AMQP          | `amqp`          |
| CakePHP       | `cakephp`       |
| CodeIgniter   | `codeigniter`   |
| cURL          | `curl`          |
| ElasticSearch | `elasticsearch` |
| Eloquent      | `eloquent`      |
| Guzzle        | `guzzle`        |
| Laminas       | `laminas`       |
| Laravel       | `laravel`       |
| Laravel Queue | `laravelqueue`  |
| Lumen         | `lumen`         |
| Memcache      | `memcache`      |
| Memcached     | `memcached`     |
| Mongo         | `mongo`         |
| MongoDB       | `mongodb`       |
| Mysqli        | `mysqli`        |
| Nette         | `nette`         |
| PCNTL         | `pcntl`         |
| PDO           | `pdo`           |
| PhpRedis      | `phpredis`      |
| Predis        | `predis`        |
| Psr18         | `psr18`         |
| Roadrunner    | `roadrunner`    |
| Sql Server    | `sqlsrv`        |
| Symfony       | `symfony`       |
| WordPress     | `wordpress`     |
| Yii           | `yii`           |
| ZendFramework | `zendframework` |

#### Map resource names to normalized URI

<div class="alert alert-warning">
Note that setting any of the following: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>, and <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> will opt-in to the new resource normalization approach and any value in <code>DD_TRACE_RESOURCE_URI_MAPPING</code> will be ignored.
</div>

For HTTP server and client integrations, the URL is used to form the trace resource name in the format `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>`, with the query string removed from the URL. This allows better visibility in any custom framework that is not automatically instrumented by normalizing the URLs and grouping together generic endpoints under one resource.

| HTTP Request                       | Resource Name |
| :--------------------------------- | :------------ |
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

Numeric IDs, UUIDs (with and without dashes), and 32-to-512-bit hexadecimal hashes are automatically replaced with a `?` character.

| URL (GET request)                              | Resource Name      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

You can turn this functionality OFF using `DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0`.

##### Custom URL-to-resource mapping

There are a few cases that are not covered by the automatic normalization that is applied.

| URL (GET request)                | Expected Resource Name        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

There are two classes of scenarios that are not covered by automatic normalization:

  - The path fragment to normalize has a reproducible pattern and can be present in any part of the url, for example `id<number>` in the example above. This scenario is covered by the setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` below.
  - The path fragment can be anything, and the previous path fragment indicates that a value has to be normalized. For example `/cities/new-york` tells us that `new-york` has to be normalized as it is the name of a city. This scenario is covered by settings `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` for incoming and outgoing requests respectively.

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

This setting is a CSV of one or more regular expressions that are applied to every path fragment independently. For example, setting `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` to `^id\d+$` for a path of `/using/prefix/id123/for/id` applies the regex to each of the fragments: `using`, `prefix`, `id123`, `for`, and `id`.

| URL                          | regex     | Expected Resource Name       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

Note that because the format of this variable is a CSV, the comma character `,` is not escaped and cannot be used in your regular expressions.

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` and `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

This setting is a CSV of patterns that can contain a wildcard `*`. For example, adding the pattern `cities/*` means that every time the fragment `cities` is found while analyzing a URL, then the next fragment, if any, will be replaced with `?`. Patterns are applied at any depth, so applying the following rule will both normalize `/cities/new-york` and `/nested/cities/new-york` in the table above.

Patterns can be applied to a part of a specific fragment. For example `path/*-fix` would normalize the url `/some/path/changing-fix/nested` to `/some/path/?-fix/nested`

Note that `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` applies to only incoming requests (for example web frameworks) while `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` only applies to outgoing requests (for example `curl` and `guzzle` requests).

### `open_basedir` restrictions

When [`open_basedir`][9] setting is used, then `/opt/datadog-php` should be added to the list of allowed directories.
When the application runs in a docker container, the path `/proc/self` should also be added to the list of allowed directories.

### Headers extraction and injection

Read [Trace Context Propagation][11] for information about configuring the PHP tracing library to extract and inject headers for propagating distributed trace context.
## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /tracing/trace_collection/proxy_setup/?tab=nginx
[4]: /profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[10]: https://www.w3.org/TR/trace-context/#trace-context-http-headers-format
[11]: /tracing/trace_collection/trace_context_propagation/php/
[13]: /agent/configuration/network/#configure-ports
[14]: /tracing/guide/trace-php-cli-scripts/#long-running-cli-scripts
[15]: /tracing/guide/trace-php-cli-scripts/
[16]: /tracing/configure_data_security#telemetry-collection
[17]: /tracing/other_telemetry/connect_logs_and_traces/php
[18]: /tracing/trace_collection/otel_instrumentation/php/
[19]: /tracing/trace_collection/compatibility/php/
