---
title: Configuring the PHP Tracing Library
kind: documentation
code_lang: php
type: multi-code-lang
code_lang_weight: 40
further_reading:
- link: "https://www.datadoghq.com/blog/monitor-php-performance/"
  tag: "Blog"
  text: "PHP monitoring with Datadog APM and distributed tracing"
- link: "https://github.com/DataDog/dd-trace-php"
  tag: "GitHub"
  text: "Source code"
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "/tracing/"
  tag: "Documentation"
  text: "Advanced Usage"
---

After you set up the tracing library with your code and configure the Agent to collect APM data, optionally configure the tracing library as desired, including setting up [Unified Service Tagging][1].

The PHP tracer can be configured using environment variables and INI settings.

INI settings can be configured globally, for example, in the `php.ini` file, or for a specific web server or virtual host.

**Note**: If you use code auto-instrumentation (the recommended approach), be aware that the instrumenting code is executed before any user code. As a result, the environment variables and the INI settings below must be set at the server level and be available to the PHP runtime before any user code is executed. For example, `putenv()` and `.env` files do not work.

### Apache

For Apache with php-fpm, use the `env` directory in your `www.conf` configuration file to configure the PHP tracer, for example:

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
Set an application’s environment, for example: `prod`, `pre-prod`, `stage`. Added in version `0.47.0`.

`DD_PROFILING_ENABLED`
: **INI**: `datadog.profiling.enabled`. INI available since `0.82.0`.<br>
**Default**: `1`<br>
Enable the Datadog profiler. Added in version `0.69.0`. See [Enabling the PHP Profiler][4]. For version `0.81.0` and below it defaulted to `0`.

`DD_PROFILING_ENDPOINT_COLLECTION_ENABLED`
: **INI**: `datadog.profiling.endpoint_collection_enabled`. INI available since `0.82.0`.<br>
**Default**: `1`<br>
Whether to enable the endpoint data collection in profiles. Added in version `0.79.0`.

`DD_PROFILING_EXPERIMENTAL_ALLOCATION_ENABLED`
: **INI**: `datadog.profiling.experimental_allocation_enabled`. INI available since `0.84.0`.<br>
**Default**: `0`<br>
Enable the experimental allocation size and allocation bytes profile type. Added in version `0.84.0`.

`DD_PROFILING_EXPERIMENTAL_CPU_TIME_ENABLED`
: **INI**: `datadog.profiling.experimental_cpu_time_enabled`. INI available since `0.82.0`.<br>
**Default**: `1`<br>
Enable the experimental CPU profile type. Added in version `0.69.0`. For version `0.76` and below it defaulted to `0`.

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
The default app name. For versions <0.47.0 this is `DD_SERVICE_NAME`.

`DD_SERVICE_MAPPING`
: **INI**: `datadog.service_mapping`<br>
**Default**: `null`<br>
Change the default name of an APM integration. Rename one or more integrations at a time, for example: `DD_SERVICE_MAPPING=pdo:payments-db,mysqli:orders-db` (see [Integration names](#integration-names)).

`DD_TRACE_AGENT_ATTEMPT_RETRY_TIME_MSEC`
: **INI**: `datadog.trace.agent_attempt_retry_time_msec`<br>
**Default**: `5000`<br>
IPC-based configurable circuit breaker retry time (in milliseconds).

`DD_TRACE_AGENT_CONNECT_TIMEOUT`
: **INI**: `datadog.trace.agent_connect_timeout`<br>
**Default**: `100`<br>
The Agent connection timeout (in milliseconds).

`DD_TRACE_AGENT_MAX_CONSECUTIVE_FAILURES`
: **INI**: `datadog.trace.agent_max_consecutive_failures`<br>
**Default**: `3`<br>
IPC-based configurable circuit breaker max consecutive failures.

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
The Agent URL; takes precedence over `DD_AGENT_HOST` and `DD_TRACE_AGENT_PORT`; for example: `https://localhost:8126`. If the [Agent configuration][13] sets `receiver_port` or `DD_APM_RECEIVER_PORT` to something other than the default `8126`, then `DD_TRACE_AGENT_PORT` or `DD_TRACE_AGENT_URL` must match it. Added in version `0.47.1`.

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI**: `datadog.trace.auto_flush_enabled`<br>
**Default**: `0`<br>
Automatically flush the tracer when all the spans are closed; set to `1` in conjunction with `DD_TRACE_GENERATE_ROOT_SPAN=0` to trace [long-running processes](#long-running-cli-scripts).

`DD_TRACE_CLI_ENABLED`
: **INI**: `datadog.trace.cli_enabled`<br>
**Default**: `0`<br>
Enable tracing of PHP scripts from the CLI. See [Tracing CLI scripts](#tracing-cli-scripts).

`DD_TRACE_DEBUG`
: **INI**: `datadog.trace.debug`<br>
**Default**: `0`<br>
Enable debug mode. When `1`, log messages are sent to the device or file set in the `error_log` INI setting. The actual value of `error_log` might be different than the output of `php -i` as it can be overwritten in the PHP-FPM/Apache configuration files.

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
Automatically generate a top-level span; set to `0` in conjunction with `DD_TRACE_AUTO_FLUSH_ENABLED=1` to trace [long-running processes](#long-running-cli-scripts).

`DD_TAGS`
: **INI**: `datadog.tags`<br>
**Default**: `null`<br>
Tags to be set on all spans, for example: `key1:value1,key2:value2`. Added in version `0.47.0`.

`DD_TRACE_HEADER_TAGS`
: **INI**: `datadog.trace.header_tags`<br>
**Default**: `null`<br>
CSV of header names that are reported on the root span as tags.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI**: `datadog.trace.http_client_split_by_domain`<br>
**Default**: `0`<br>
Set the service name of HTTP requests to `host-<hostname>`, for example a `curl_exec()` call to `https://datadoghq.com` has the service name `host-datadoghq.com` instead of the default service name of `curl`.

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI**: `datadog.trace.redis_client_split_by_host`<br>
**Default**: `0`<br>
Set the service name of Redis clients operations to `redis-<hostname>`. Added in version `0.51.0`.

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI**: `datadog.trace.<INTEGRATION>_enabled`<br>
**Default**: `1`<br>
Enable or disable an integration; all integrations are enabled by default (see [Integration names](#integration-names)). For versions < `0.47.1`, this parameter is `DD_INTEGRATIONS_DISABLED` which takes a CSV list of integrations to disable, for example: `curl,mysqli`.

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI**: `datadog.trace.measure_compile_time`<br>
**Default**: `1`<br>
Record the compile time of the request (in milliseconds) onto the top-level span.

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

`DD_TRACE_SAMPLE_RATE`
: **INI**: `datadog.trace.sample_rate`<br>
**Default**: `1.0`<br>
The sampling rate for the traces (defaults to: between `0.0` and `1.0`). For versions < `0.36.0`, this parameter is `DD_SAMPLING_RATE`.

`DD_TRACE_SAMPLING_RULES`
: **INI**: `datadog.trace.sampling_rules`<br>
**Default**: `null`<br>
A JSON encoded string to configure the sampling rate. Examples: Set the sample rate to 20%: `'[{"sample_rate": 0.2}]'`. Set the sample rate to 10% for services starting with 'a' and span name 'b' and set the sample rate to 20% for all other services: `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'` (see [Integration names](#integration-names)). The JSON object **must** be surrounded by single quotes (`'`) to avoid problems with escaping of the double quote (`"`) character.

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
Set an application’s version in traces and logs, for example: `1.2.3`, `6c44da20`, `2020.02.13`. Added in version `0.47.0`.

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_url_query_param_allowed`<br>
**Default**: `*`<br>
A comma-separated list of query parameters to be collected as part of the URL. Set to empty to prevent collecting any parameters, or `*` to collect all parameters. Added in version `0.74.0`.

`DD_TRACE_RESOURCE_URI_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.resource_uri_query_param_allowed`<br>
**Default**: `*`<br>
A comma-separated list of query parameters to be collected as part of the resource URI. Set to empty to prevent collecting any parameters, or `*` to collect all parameters. Added in version `0.74.0`.

`DD_TRACE_CLIENT_IP_HEADER`
: **INI**: `datadog.trace.client_ip_header`<br>
**Default**: `null`<br>
The IP header to be used for client IP collection, for example: `x-forwarded-for`. Added in version `0.76.0`.

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI**: `datadog.trace.obfuscation_query_string_regexp`<br>
**Default**: 
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
  Regular expression used to obfuscate the query string included as part of the URL. Added in version `0.76.0`.

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **INI**: `datadog.trace.propagation_style_inject`<br>
**Default**: `Datadog`<br>
Propagation styles to use when injecting tracing headers. If using multiple styles, comma separate them. The supported styles are:

  - [B3][7]
  - [B3 single header][8]
  - Datadog

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **INI**: `datadog.trace.propagation_style_extract`<br>
**Default**: `Datadog,B3,B3 single header`<br>
Propagation styles to use when extracting tracing headers. If using multiple styles, comma separate them. The supported styles are:

  - [B3][7]
  - [B3 single header][8]
  - Datadog

#### Integration names

The table below specifies the default service names for each integration. Change the service names with `DD_SERVICE_MAPPING`.

Use the name when setting integration-specific configuration such as, `DD_TRACE_<INTEGRATION>_ENABLED`, for example: Laravel is `DD_TRACE_LARAVEL_ENABLED`.

| Integration   | Service Name    |
| ------------- | --------------- |
| CakePHP       | `cakephp`       |
| CodeIgniter   | `codeigniter`   |
| cURL          | `curl`          |
| ElasticSearch | `elasticsearch` |
| Eloquent      | `eloquent`      |
| Guzzle        | `guzzle`        |
| Laravel       | `laravel`       |
| Lumen         | `lumen`         |
| Memcached     | `memcached`     |
| Mongo         | `mongo`         |
| Mysqli        | `mysqli`        |
| PDO           | `pdo`           |
| PhpRedis      | `phpredis`      |
| Predis        | `predis`        |
| Slim          | `slim`          |
| Symfony       | `symfony`       |
| WordPress     | `wordpress`     |
| Yii           | `yii`           |
| ZendFramework | `zendframework` |

#### Map resource names to normalized URI

<div class="alert alert-warning">
<strong>Deprecation notice:</strong> As of version <a href="https://github.com/DataDog/dd-trace-php/releases/tag/0.47.0">0.47.0</a> the legacy setting <code>DD_TRACE_RESOURCE_URI_MAPPING</code> is deprecated. It still works for the foreseeable future but it is strongly encouraged that you use the new settings outlined in this paragraph to avoid issues when legacy support is removed.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/tagging/unified_service_tagging/
[2]: https://httpd.apache.org/docs/2.4/mod/mod_env.html#setenv
[3]: /tracing/setup/nginx/#nginx-and-fastcgi
[4]: /profiler/enabling/php/
[5]: https://github.com/mind04/mod-ruid2
[6]: /tracing/trace_pipeline/ingestion_mechanisms/
[7]: https://github.com/openzipkin/b3-propagation
[8]: https://github.com/openzipkin/b3-propagation#single-header
[9]: https://www.php.net/manual/en/ini.core.php#ini.open-basedir
[13]: /agent/guide/network/#configure-ports
