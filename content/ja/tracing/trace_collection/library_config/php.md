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
  tag: ソースコード
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
**デフォルト**: `100`<br>
Agent 接続のタイムアウト (ミリ秒)

`DD_TRACE_AGENT_PORT`
: **INI**: `datadog.trace.agent_port`<br>
**デフォルト**: `8126`<br>
Agent のポート番号。[Agent 構成][13]で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに一致させる必要があります。

`DD_TRACE_AGENT_TIMEOUT`
: **INI**: `datadog.trace.agent_timeout`<br>
**デフォルト**: `500`<br>
Agent リクエスト転送のタイムアウト (ミリ秒)。

`DD_TRACE_AGENT_URL`
: **INI**: `datadog.trace.agent_url`<br>
**デフォルト**: `null`<br>
Agent の URL。`DD_AGENT_HOST` と `DD_TRACE_AGENT_PORT` よりも優先されます。例: `https://localhost:8126` [Agent 構成][13]で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに一致させる必要があります。

`DD_DOGSTATSD_URL`
: **INI**: `datadog.dogstatsd_url`<br>
**デフォルト**: `null`<br>
DogStatsD への接続をネゴシエートするために使用する URL。この設定は `DD_AGENT_HOST` と `DD_DOGSTATSD_PORT` よりも優先されます。`udp://` または `unix://` スキーマのみをサポートします。

`DD_DOGSTATSD_PORT`
: **INI**: `datadog.dogstatsd_port`<br>
**デフォルト**: `8125`<br>
`DD_TRACE_HEALTH_METRICS_ENABLED` が有効な場合に、DogStatsD への接続をネゴシエートするために `DD_AGENT_HOST` と組み合わせて使用されるポート。

`DD_TRACE_AUTO_FLUSH_ENABLED`
: **INI**: `datadog.trace.auto_flush_enabled`<br>
**デフォルト**: `0`<br>
すべてのスパンが終了されたタイミングでトレーサーを自動的にフラッシュします。[長時間実行されるプロセス][14]をトレースするために、`DD_TRACE_GENERATE_ROOT_SPAN=0` と併せて `1` に設定されます。

`DD_TRACE_CLI_ENABLED`
: **INI**: `datadog.trace.cli_enabled`<br>
**デフォルト**: `0`<br>
CLI から送られた PHP スクリプトのトレーシングを有効にします。 [CLI スクリプトのトレーシング][15]を参照してください。

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
**デフォルト**: `1`<br>
フォークされたプロセスをトレースするかどうかを示します。`1` に設定するとフォークされたプロセスをトレースし、`0` に設定するとフォークされたプロセスのトレースを無効にします。`0` に設定した場合でも、コード内で `ini_set("datadog.trace.enabled", "1");` を使って手動でプロセスのトレースを再有効化することができますが、新しいトレースとして表示されることになります。フォークされたプロセスのトレースは、`DD_TRACE_FORKED_PROCESS` と `DD_DISTRIBUTED_TRACING` の両方が `1` (オン) に構成されている場合にのみ、全体の分散型トレースとして表示されるようになりました。

`DD_TRACE_ENABLED`
: **INI**: `datadog.trace.enabled`<br>
**デフォルト**: `1`<br>
トレーサーをグローバルに有効化します

`DD_TRACE_GENERATE_ROOT_SPAN`
: **INI**: `datadog.trace.generate_root_span`<br>
**デフォルト**: `1`<br>
トップレベルのスパンを自動生成します。[長時間実行されるプロセス][14]をトレースするために、`DD_TRACE_AUTO_FLUSH_ENABLED=1` と併せて `0` に設定されます。

`DD_TAGS`
: **INI**: `datadog.tags`<br>
**デフォルト**: `null`<br>
`key1:value1,key2:value2` など、すべてのスパンに設定されるタグ。

`DD_TRACE_HEADER_TAGS`
: **INI**: `datadog.trace.header_tags`<br>
**デフォルト**: `null`<br>
ルートスパンでタグとして報告されたヘッダー名の CSV。

`DD_TRACE_DB_CLIENT_SPLIT_BY_INSTANCE`
: **INI**: `datadog.trace.db_client_split_by_instance`<br>
**Default**: `0`<br>
Set the service name of HTTP requests to `pdo-<hostname>`. For example, a `PDO->query()` call to a database host `datadoghq.com` has the service name `pdo-datadoghq.com` instead of the default service name of `pdo`.

`DD_TRACE_HTTP_CLIENT_SPLIT_BY_DOMAIN`
: **INI**: `datadog.trace.http_client_split_by_domain`<br>
**デフォルト**: `0`<br>
HTTP リクエストのサービス名を `host-<hostname>` に設定します。例: `https://datadoghq.com` に対する `curl_exec()` コールのサービス名は、デフォルトのサービス名 `curl` ではなく `host-datadoghq.com` となります。

`DD_TRACE_REDIS_CLIENT_SPLIT_BY_HOST`
: **INI**: `datadog.trace.redis_client_split_by_host`<br>
**デフォルト**: `0`<br>
Redis クライアントオペレーションのサービス名を `redis-<hostname>` に設定します。

`DD_TRACE_<INTEGRATION>_ENABLED`
: **INI**: `datadog.trace.<INTEGRATION>_enabled`<br>
**デフォルト**: `1`<br>
インテグレーションを有効または無効にします。すべてのインテグレーションはデフォルトで有効になっています ([インテグレーション名](#integration-names)を参照してください)。

`DD_TRACE_MEASURE_COMPILE_TIME`
: **INI**: `datadog.trace.measure_compile_time`<br>
**デフォルト**: `1`<br>
リクエストのコンパイル時間 (ミリ秒) をトップレベルのスパン上に記録します。

`DD_TRACE_REMOVE_AUTOINSTRUMENTATION_ORPHANS`
: **INI**: `datadog.trace.remove_autoinstrumentation_orphans`<br>
**デフォルト**: `false`<br>
<br>自動インスツルメンテーションによって生成された孤児スパンを自動的に削除します。現在のところ、これは Laravel Horizon のコンテキストで使用される一部の Redis と Laravel の呼び出しにのみ適用されます。バージョン `0.88.0` で追加されました。<br>
**注:** これらの孤児スパンは、フラッシュされますが、トレースには記録されません。さらに、この構成オプションで削除される特定の単一スパンのトレースは次の通りです。
  - `laravel.event.handle`
  - `laravel.provider.load`
  - `Predis.Client.__construct`
  - `Predis.Client.executeCommand`
  - `Predis.Pipeline.executePipeline`

`DD_TRACE_REMOVE_ROOT_SPAN_LARAVEL_QUEUE`
: **INI**: `datadog.trace.remove_root_span_laravel_queue`<br>
**デフォルト**: `true`<br>
Laravel Queue/Horizon コマンドの root スパン生成を自動的に無効にし (`DD_TRACE_GENERATE_ROOT_SPAN` を参照)、自動フラッシュを有効にします (`DD_TRACE_AUTO_FLUSH_ENABLED` を参照)。バージョン `0.88.0` で追加されました。

`DD_TRACE_LARAVEL_QUEUE_DISTRIBUTED_TRACING`
: **INI**: `datadog.trace.laravel_queue_distributed_tracing`<br>
**Default**: `true`<br>
Disables the creation of an additional `laravel.queue.process` span and relies solely on span links. Added in version `0.93.0`.

`DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`
: **INI**: `datadog.trace.resource_uri_fragment_regex`<br>
**デフォルト**: `null`<br>
ID に対応するパスフラグメントを特定する正規表現のCSV ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください)。

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`
: **INI**: `datadog.trace.resource_uri_mapping_incoming`<br>
**デフォルト**: `null`<br>
受信リクエストのリソース名を正規化するための URI マッピングの CSV ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください)。

`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`
: **INI**: `datadog.trace.resource_uri_mapping_outgoing`<br>
**デフォルト**: `null`<br>
発信リクエストのリソース名を正規化するための URI マッピングの CSV ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri) を参照してください)。

`DD_TRACE_RETAIN_THREAD_CAPABILITIES`
: **INI**: `datadog.trace.retain_thread_capabilities`<br>
**デフォルト**: `0`<br>
Linux で動作します。`true` に設定すると、有効なユーザー ID を変更しても Datadog のバックグラウンドスレッド機能を維持することができます。このオプションはほとんどの設定には影響しませんが、一部のモジュールで影響が出る場合があります。現時点で Datadog が確認している限りでは、[Apache の mod-ruid2][5] で `setuid()` や類似の syscall を呼び出した場合に影響が生じ、クラッシュや機能の不具合につながる可能性があります。<br><br>
**注:** このオプションを有効にすると、セキュリティが損なわれる可能性があります。このオプションは単独ならセキュリティ上のリスクをもたらす心配はありません。しかし、Web サーバーや PHP がフル機能で起動されている場合はバックグラウンドスレッドが元の機能を維持しているため、攻撃者は PHP や Web サーバーの脆弱性を悪用して比較的容易に権限を昇格できる可能性があります。Datadog では、`setcap` ユーティリティを使用して Web サーバーの機能を制限することをお勧めしています。

`DD_HTTP_SERVER_ROUTE_BASED_NAMING`
: **INI**: `datadog.http_server_route_based_naming`<br>
**デフォルト**: `true`<br>
HTTP サーバーリクエストのルートベースの命名を有効にします。インテグレーション固有の root スパンのリソース名フォーマットを使用するには `true` に設定します。`false` に設定すると、HTTP メソッドとパスが代わりに使用されます。バージョン `0.89.0` で追加されました。

`DD_TRACE_SAMPLE_RATE`
: **INI**: `datadog.trace.sample_rate`<br>
**Default**: `-1`<br>
The sampling rate for the traces, a number between `0.0` and `1.0`. The default value of `-1` defers control of sampling to the Datadog Agent.

`DD_TRACE_SAMPLING_RULES`
: **INI**: `datadog.trace.sampling_rules`<br>
**デフォルト**: `null`<br>
JSON でエンコードされた文字列で、サンプリングレートを構成します。例: サンプルレートを 20% に設定する場合は `'[{"sample_rate": 0.2}]'` となります。'a' ではじまる、スパン名が 'b' のサービスのサンプルレートを 10% に、その他のサービスのサンプルレートを 20% に設定する場合は `'[{"service": "a.*", "name": "b", "sample_rate": 0.1}, {"sample_rate": 0.2}]'`  のようになります ([インテグレーション名](#integration-names) を参照してください) 。二重引用符 (`"`) のエスケープ処理による問題を防ぐため、JSON オブジェクトは**必ず**単一引用符 (`'`) で囲むようにしてください。サービスのマッチングでは `DD_SERVICE_MAPPING` が考慮されます (バージョン `0.90.0` から)。名前とサービスは有効な正規表現でなければなりません。有効な正規表現でないルールは無視されます。

`DD_TRACE_SAMPLING_RULES_FORMAT`
: **INI**: `datadog.trace.sampling_rules_format`<br>
**Default**: `glob`<br>
Rules the format (`regex` or `glob`) used for sampling rules defined by `DD_TRACE_SAMPLING_RULES`. Added in version `0.98.0` and deprecated as of `1.0.0`.

`DD_TRACE_RATE_LIMIT`
: **INI**: `datadog.trace.rate_limit`<br>
**デフォルト**: `0`<br>
1 秒間にサンプリングするスパンの最大数。Apache または FPM プール内のすべてのプロセスは、同じリミッターを共有します。未設定 (0) の場合、レート制限は Datadog Agent に委ねられます。

`DD_TRACE_SPANS_LIMIT`
: **INI**: `datadog.trace.spans_limit`<br>
**Default**: `1000`<br>
1 つのトレース内で生成されるスパンの最大数。最大数に達すると、その後スパンは生成されなくなります。上限を増大すると、保留中のトレースに使用されるメモリの量が増加し、許可されるメモリの PHP 最大量に達する可能性があります。許可されるメモリの最大量は、PHP INI システム設定の `memory_limit` で増加できます。

`DD_SPAN_SAMPLING_RULES`
: **INI**: `datadog.span_sampling_rules`<br>
**デフォルト**: `null`<br>
サンプリングレートを構成するための JSON エンコードされた文字列。ルールは、スパンのサンプルレートを決定するために構成された順序で適用されます。`sample_rate` の値は 0.0 から 1.0 の間でなければなりません (この値を含む)。 <br>
**例**: サービス名 'my-service'、演算子名 ‘http.request' に対して、スパンのサンプルレートを 50％ に設定、最大で 50 トレース/秒に設定: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`JSON オブジェクトは、ダブルクォート (`'`) 文字のエスケープの問題を避けるために、シングルクォート (`"`) で囲む**必要があります**。<br>
詳しくは、[取り込みメカニズム][6]をご覧ください。<br>


`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED`
: **INI**: `datadog.trace.url_as_resource_names_enabled`<br>
**デフォルト**: `1`<br>
リソース名として URL を有効にします ([リソース名を正規化された URI にマッピング](#map-resource-names-to-normalized-uri)を参照してください)。

`DD_VERSION`
: **INI**: `datadog.version`<br>
**デフォルト**: `null`<br>
トレースとログにアプリケーションのバージョンを設定します (例: `1.2.3`、`6c44da20`、`2020.02.13`)。バージョン `0.90.0` から、実行時に `ini_set` によって `datadog.version` に加えられた変更は、現在のルートスパンにも適用されます。

`DD_TRACE_HTTP_URL_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_url_query_param_allowed`<br>
**デフォルト**: `*`<br>
URL の一部として収集するクエリパラメータのカンマ区切りリスト。パラメータを収集しない場合は空、すべてのパラメータを収集する場合は `*` を設定します。バージョン `0.74.0` で追加されました。

`DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED`
: **INI**: `datadog.trace.http_post_data_param_allowed`<br>
**デフォルト**: ""<br>
収集される HTTP POST データフィールドのカンマ区切りリスト。POST 送信された値を収集しない場合は、空のままにします。この値をワイルドカードの `*` に設定した場合、POST 送信されたすべてのデータが収集されますが、`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP` 難読化ルールに一致するフィールドの値は編集されます。特定のフィールドが指定された場合、これらのフィールドの値のみが表示され、その他すべてのフィールドの値は編集されます。バージョン `0.86.0` で追加されました。<br>
**例**:
  - 投稿されたデータは `qux=quux&foo[bar][password]=Password12!&foo[bar][username]=admin&foo[baz][bar]=qux&foo[baz][key]=value`
  - `DD_TRACE_HTTP_POST_DATA_PARAM_ALLOWED` は `foo.baz,foo.bar.password` に設定されている
  - このシナリオでは、収集されたメタデータは次のとおりです。
    - `http.request.foo.bar.password=Password12!`
    - `http.request.foo.bar.username=<redacted>`
    - `http.request.foo.baz.bar=qux`
    - `http.request.foo.baz.key=value`
    - `http.request.qux=<redacted>`

`DD_TRACE_RESOURCE_URI_QUERY_PARAM_ALLOWED`
: **INI**: `datadog.trace.resource_uri_query_param_allowed`<br>
**デフォルト**: `*`<br>
リソース URI の一部として収集するクエリパラメータのカンマ区切りリスト。パラメータを収集しない場合は空、すべてのパラメータを収集する場合は `*` を設定します。バージョン `0.74.0` で追加されました。

`DD_TRACE_CLIENT_IP_ENABLED`
: **INI**: `datadog.trace.client_ip_enabled`<br>
**デフォルト**: `false`<br>
クライアント側で IP 収集を有効にします。バージョン `0.84.0` で追加されました。

`DD_TRACE_CLIENT_IP_HEADER`
: **INI**: `datadog.trace.client_ip_header`<br>
**デフォルト**: `null`<br>
クライアント IP の収集に使用する IP ヘッダー。例: `x-forwarded-for`。バージョン `0.84.0` (ASM を使用している場合は `0.76.0`) で追加されました。

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **INI**: `datadog.trace.obfuscation_query_string_regexp`<br>
**デフォルト**: 
  ```
  (?i)(?:p(?:ass)?w(?:or)?d|pass(?:_?phrase)?|secret|(?:api_?|private_?|public_?|access_?|secret_?)key(?:_?id)?|token|consumer_?(?:id|key|secret)|sign(?:ed|ature)?|auth(?:entication|orization)?)(?:(?:\s|%20)*(?:=|%3D)[^&]+|(?:"|%22)(?:\s|%20)*(?::|%3A)(?:\s|%20)*(?:"|%22)(?:%2[^2]|%[^2]|[^"%])+(?:"|%22))|bearer(?:\s|%20)+[a-z0-9\._\-]|token(?::|%3A)[a-z0-9]{13}|gh[opsu]_[0-9a-zA-Z]{36}|ey[I-L](?:[\w=-]|%3D)+\.ey[I-L](?:[\w=-]|%3D)+(?:\.(?:[\w.+\/=-]|%3D|%2F|%2B)+)?|[\-]{5}BEGIN(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY[\-]{5}[^\-]+[\-]{5}END(?:[a-z\s]|%20)+PRIVATE(?:\s|%20)KEY|ssh-rsa(?:\s|%20)*(?:[a-z0-9\/\.+]|%2F|%5C|%2B){100,}
  ```
 URL の一部として含まれるクエリ文字列を難読化するために使用される正規表現。この式は、HTTP POST データの編集処理でも使用されます。バージョン `0.76.0` で追加されました。

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
  - [B3 シングルヘッダ][8]
  - Datadog

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **INI**: `datadog.trace.propagation_style_extract`<br>
**Default**: `Datadog,tracecontext,b3multi,B3 single header`<br>
Propagation styles to use when extracting tracing headers. If using multiple styles, comma separate them. The supported styles are:

  - [tracecontext][10]
  - [b3multi][7]
  - [B3 シングルヘッダ][8]
  - Datadog

`DD_TRACE_WORDPRESS_ADDITIONAL_ACTIONS`
: **INI**: `datadog.trace.wordpress_additional_actions`<br>
**デフォルト**: `null`<br>
インスツルメンテーションする WordPress アクションフックのカンマ区切りリスト。この機能は `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION` が有効な場合にのみ利用可能です。バージョン `0.91.0` で追加されました。

`DD_TRACE_WORDPRESS_CALLBACKS`
: **INI**: `datadog.trace.wordpress_callbacks`<br>
**Default**: `true` for PHP tracer >= v1.0<br>
Enables WordPress action hook callbacks instrumentation. This feature is only available when `DD_TRACE_WORDPRESS_ENHANCED_INTEGRATION` is enabled. Added in version `0.91.0`.

`DD_DBM_PROPAGATION_MODE`
: **INI**: `datadog.dbm_propagation_mode`<br>
**デフォルト**: `'disabled'`<br>
`'service'` または `'full'` に設定すると、APM から送信されるデータとデータベースモニタリング製品との連携が可能になります。<br>
`'service'` オプションは、DBM と APM のサービス間の接続を有効にします。Postgres、MySQL、SQLServer で利用可能です。<br>
`'full'` オプションは、データベースクエリイベントを持つデータベーススパン間の接続を可能にします。Postgres と MySQL で利用可能です。<br>

`DD_INSTRUMENTATION_TELEMETRY_ENABLED`
: **INI**: `datadog.instrumentation_telemetry_enabled`<br>
**デフォルト**: `true` <br>
Datadog は、製品の改良のため、[システムの環境・診断情報][16]を収集することがあります。false の場合、このテレメトリーデータは収集されません。

#### インテグレーション名

以下の表は、各インテグレーションに紐付くデフォルトのサービス名をまとめたものです。サービス名は `DD_SERVICE_MAPPING` に変更してください。

インテグレーション固有のコンフィギュレーションを設定する場合は、`DD_TRACE_<INTEGRATION>_ENABLED` 形式で名前を付けてください。例: Laravel の場合、 `DD_TRACE_LARAVEL_ENABLED`。

| インテグレーション   | サービス名    |
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

#### リソース名を正規化された URI にマッピング

<div class="alert alert-warning">
Note that setting any of the following: <code>DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX</code>, <code>DD_TRACE_RESOURCE_URI_MAPPING_INCOMING</code>, and <code>DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING</code> will opt-in to the new resource normalization approach and any value in <code>DD_TRACE_RESOURCE_URI_MAPPING</code> will be ignored.
</div>

HTTP サーバーとクライアントインテグレーションでは、URL はクエリ文字列が URL から削除された状態で、トレースリソース名を作成するために `<HTTP_REQUEST_METHOD> <NORMALIZED_URL>` の形式で使用されます。URL を正規化し 1 つのリソースの下に一般的なエンドポイントをグループ化することで、自動インスツルメンテーションされないカスタムフレームワークにおける可視性を向上することができます。

| HTTP リクエスト                       | リソース名 |
| :--------------------------------- | :------------ |
| **GET** request to `/foo?a=1&b=2`  | `GET /foo`    |
| **POST** request to `/bar?foo=bar` | `POST /bar`   |

数値 ID、UUID (ダッシュの有無不問)、32〜512 ビットの 16 進数ハッシュは、自動的に `?` に置換されます。

| URL (GET リクエスト）                              | リソース名      |
| :--------------------------------------------- | :----------------- |
| `/user/123/show`                               | `GET /user/?/show` |
| `/widget/b7a992e0-3300-4030-8617-84553b11c993` | `GET /widget/?`    |
| `/api/v2/b7a992e033004030861784553b11c993/123` | `GET /api/v2/?/?`  |
| `/book/0dbf3596`                               | `GET /book/?`      |

`DD_TRACE_URL_AS_RESOURCE_NAMES_ENABLED=0` を使用してこの機能をオフにすることも可能です。

##### URL からリソースへのマッピングをカスタマイズ

適用された自動正規化ではカバーされないケースがいくつかあります。

| URL (GET リクエスト）                | 考えられるリソース名        |
| :------------------------------- | :---------------------------- |
| `/using/prefix/id123/for/id`     | `GET /using/prefix/?/for/id`  |
| `/articles/slug-of-title`        | `GET /articles/?`             |
| `/cities/new-york/rivers`        | `GET /cities/?/rivers`        |
| `/nested/cities/new-york/rivers` | `GET /nested/cities/?/rivers` |

自動正規化ではカバーされないシナリオには、次の 2 つのクラスがあります。

  - 正規化するパスフラグメントには再現可能なパターンがあり、URL の任意の部分で存在できます（上記の例では `id<number>`）。このシナリオは、次の `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` 設定でカバーされます。
  - 何でもパスフラグメントになれますが、前のパスフラグメントは値が正規化されるべきことを示します。たとえば `/cities/new-york` は、`new-york` は都市名のため正規化する必要があることが分かります。このシナリオは以下の設定でカバーされます `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING`、 `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`（それぞれ、受信リクエストと発信リクエスト）。 

###### `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX`

この設定は、各パスフラグメントに個々に適用される正規表現の CSV です。たとえば、 `/using/prefix/id123/for/id` のパスとして `DD_TRACE_RESOURCE_URI_FRAGMENT_REGEX` を `^id\d+$` に設定すると、各フラグメント（`using`、`prefix`、`id123`、`for`、`id`）に正規表現が適用されます。

| URL                          | 正規表現     | 考えられるリソース名       |
| :--------------------------- | :-------- | :--------------------------- |
| `/using/prefix/id123/for/id` | `^id\d+$` | `GET /using/prefix/?/for/id` |

この変数の形式は CSV であるため、カンマ記号 `,` はエスケープされず、正規表現では使用できないことに注意してください。

###### `DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` および `DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING`

この設定はワイルドカード `*` を含むことのできるパターンの CSV です。たとえば、パターン `cities/*` を追加すると、URL を分析中にフラグメント `cities` が見つかる度に、次のフラグメントがある場合 `?` に置き換えられます。パターンは深さを問わず適用されるため、次の規則を適用することで、上記の表の `/cities/new-york` と `/nested/cities/new-york` の両方が正規化されます。

パターンは特定のフラグメントの一部に適用することもできます。たとえば、`path/*-fix` は URL `/some/path/changing-fix/nested` を `/some/path/?-fix/nested` に正規化します。

`DD_TRACE_RESOURCE_URI_MAPPING_INCOMING` は受信リクエスト（ウェブフレームワークなど）のみに適用され、`DD_TRACE_RESOURCE_URI_MAPPING_OUTGOING` は発信リクエスト（`curl` や `guzzle` リクエストなど）のみに適用されることに、ご注意ください。

### `open_basedir` 制限

[`open_basedir`][9] 設定が使用される場合、許可されるディレクトリに `/opt/datadog-php` を追加する必要があります。
アプリケーションを Docker コンテナで実行する場合は、許可されるディレクトリにパス `/proc/self` も追加する必要があります。

### ヘッダーの抽出と挿入

分散トレースコンテキストの伝播を目的としてヘッダーの抽出と挿入を行うための PHP トレーシングライブラリの構成については、[トレースコンテキストの伝播][11]をお読みください。
## その他の参考資料

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
