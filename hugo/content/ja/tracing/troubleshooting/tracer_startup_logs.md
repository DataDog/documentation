---
description: トレーサーの起動ログを構成および分析して、構成の問題と Agent の接続をトラブルシューティングします。
further_reading:
- link: /tracing/troubleshooting/connection_errors/
  tag: ドキュメント
  text: APM の接続エラーのトラブルシューティング
title: トレーサー起動ログ
---
## 起動ログ {#startup-logs}

トレーサーの起動ログは、起動時に取得可能なすべての情報を取得し、`DATADOG TRACER CONFIGURATION`、`DATADOG TRACER DIAGNOSTICS`、`DATADOG ERROR`、または `DATADOG CONFIGURATION` として記録して、ログ内の検索を簡素化することができます。

言語によっては、言語の慣習や `Stdout` または同等のものに安全にアクセスできるかどうかに応じて、別のファイルにログが記録される場合もあります。そのような場合、ログの場所は以下の言語タブに記載されています。一部の言語では診断エントリが記録されず、それも以下に記載されています。

`CONFIGURATION`ログは、トレーサーに適用された設定を JSON 形式で表したものです。Agent の接続性チェックが実行される言語では、コンフィギュレーション JSON に、Agent に到達できるかどうかを示す `agent_error` キーも含まれます。

`DIAGNOSTICS`または `ERROR` ログエントリは、アプリケーションの起動中にトレーサーでエラーが発生したときに記録されます (これらのエントリが生成される言語の場合)。`DIAGNOSTICS` または `ERROR` ログ行が記録された場合は、記録されたログから設定や構成が正しく適用されていることを確認してください。

ログがまったく記録されない場合は、アプリケーションのログが抑制されていないこと、および該当する場合はログレベルが少なくとも `INFO` であることを確認してください。

{{< programming-lang-wrapper langs="java,.NET,php,go,nodejs,python,ruby,cpp" >}}
{{< programming-lang lang="java" >}}

**構成:**

```text
{"os_name":"Mac OS X","os_version":"10.15.4","architecture":"x86_64","lang":"jvm","lang_version":"11.0.6","jvm_vendor":"AdoptOpenJDK","jvm_version":"11.0.6+10","java_class_version":"55.0","enabled":true,"service":"unnamed-java-app","agent_url":"http://localhost:8126","agent_error":false,"debug":false,"analytics_enabled":false,"sampling_rules":[{},{}],"priority_sampling_enabled":true,"logs_correlation_enabled":false,"profiling_enabled":false,"dd_version":"null","health_checks_enabled":false,"configuration_file":"no config file present","runtime_id":"b69deb26-8bc3-4c00-8952-d42bf8c2123b"}
```

**診断:**

Java トレーサーは診断ログを出力しません。このチェックを行うには、[デバッグモード][1]でトレーサーを実行してください。


[1]: /ja/tracing/troubleshooting/tracer_debug_logs/
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

**ファイルの場所:**

ログファイルは、デフォルトで以下のディレクトリに保存されます。これらのパスを変更するには、`DD_TRACE_LOG_DIRECTORY` 設定を使用してください。

| プラットフォーム                                             | パス                                             |
|------------------------------------------------------|--------------------------------------------------|
| Windows                                              | `%ProgramData%\Datadog .NET Tracer\logs\`        |
| Linux                                                | `/var/log/datadog/dotnet/`                       |
| Linux ([Kubernetes ライブラリインジェクション][1]を使用する場合) | `/datadog-lib/logs`                              |
| Azure App Service                                    | `%AzureAppServiceHomeDirectory%\LogFiles\datadog`|

**注:** Linux では、デバッグモードを有効にする前にログディレクトリを作成する必要があります。

バージョン `2.19.0` 以降、`DD_TRACE_LOGFILE_RETENTION_DAYS` 設定を使用して、起動時に現在のログディレクトリからログファイルを削除するようにトレーサーを構成できます。トレーサーは、指定された日数 (デフォルト値は `32`) 以上が経過したログファイルを削除します。

- `dotnet-tracer-managed-{processName}-{timestamp}.log`には、構成ログが含まれています。

- `dotnet-tracer-native-{processName}-{processID}.log`には、診断ログが含まれています (生成されている場合)。

**構成:**

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

**診断:**

.NET トレーサーは、次の診断行を出力します。

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

[1]: /ja/tracing/trace_collection/library_injection/?tab=kubernetes
{{< /programming-lang >}}
{{< programming-lang lang="php" >}}

**PHP 情報:**
「DATADOG TRACER CONFIGURATION」の横にある `phpinfo()` ページから、起動ログの JSON 文字列を取得します。以下の PHP ファイルを作成し、ホストマシン上のブラウザからアクセスします。

```php
<?php phpinfo(); ?>
```

一般的な問題の診断に利用できるように、診断情報が別のテーブルに表示されます。

{{< img src="tracing/troubleshooting/PHPInfo.png" alt="PHP 情報" >}}

**CLI SAPI:**

`php --ri=ddtrace` を実行して、CLI SAPI から情報を取得します。

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

**構成:**

トレーサーが [DEBUG モード][1]の場合、起動ログは最初のリクエスト時にプロセスごとに 1 回 `error_log` に表示されます。

```text
DATADOG TRACER CONFIGURATION - {"agent_error":"Couldn't connect to server","ddtrace.request_init_hook_reachable":false,"date":"2020-07-01T17:42:50Z","os_name":"Linux 49b1cb4bdd12 4.19.76-linuxkit #1 SMP Tue May 26 11:42:35 UTC 2020 x86_64","os_version":"4.19.76-linuxkit","version":"1.0.0-nightly","lang":"php","lang_version":"7.4.5","env":null,"enabled":true,"service":null,"enabled_cli":false,"agent_url":"https://localhost:8126","debug":false,"analytics_enabled":false,"sample_rate":1.000000,"sampling_rules":null,"tags":null,"service_mapping":null,"distributed_tracing_enabled":true,"priority_sampling_enabled":true,"dd_version":null,"architecture":"x86_64","sapi":"cgi-fcgi","ddtrace.request_init_hook":null,"open_basedir_configured":false,"uri_fragment_regex":null,"uri_mapping_incoming":null,"uri_mapping_outgoing":null,"auto_flush_enabled":false,"generate_root_span":true,"http_client_split_by_domain":false,"measure_compile_time":true,"report_hostname_on_root_span":false,"traced_internal_functions":null,"auto_prepend_file_configured":false,"integrations_disabled":null,"enabled_from_env":true,"opcache.file_cache":null}
```

**診断:**

トレーサーが [DEBUG モード][1]の場合、PHP トレーサーで失敗した診断が `error_log` に出力されます。

```text
DATADOG TRACER DIAGNOSTICS - agent_error: Couldn't connect to server
DATADOG TRACER DIAGNOSTICS - ddtrace.request_init_hook_reachable: false
```

**実行時:**

`\DDTrace\startup_logs()` を使用して、JSON 文字列である起動ログに実行時にアクセスします。

```php
echo \DDTrace\startup_logs() . PHP_EOL;
```

[1]: /ja/tracing/troubleshooting/tracer_debug_logs?tab=php#enable-tracer-debug-mode
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

**構成:**

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 INFO: DATADOG TRACER CONFIGURATION {"date":"2020-07-09T15:57:07-05:00","os_name":"darwin","os_version":"10.15.4","version":"v1.26.0","lang":"Go","lang_version":"go1.14.2","env":"","service":"splittest2","agent_url":"http://127.0.0.1:8126/v0.4/traces","agent_error":"","debug":true,"analytics_enabled":false,"sample_rate":"NaN","sampling_rules":null,"sampling_rules_error":"","tags":{"runtime-id":"d269781c-b1bf-4d7b-9a55-a8174930554f"},"runtime_metrics_enabled":false,"health_metrics_enabled":false,"dd_version":"","architecture":"amd64","global_service":""}
```

**診断:**

Go トレーサーは、2 種類の診断行のいずれかを出力します。1 つは Agent に到達できない場合、もう 1 つはトレースサンプリングエラーが発生した場合です。

```text
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Unable to reach agent: [Reason for error]
2020/07/09 15:57:07 Datadog Tracer v1.26.0 WARN: DIAGNOSTICS Error(s) parsing DD_TRACE_SAMPLING_RULES:
    at index 1 ...
    at index 4 ....
```

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

SDK のバージョン 2.x 以降、起動ログはデフォルトで無効になっています。これらは環境変数 `DD_TRACE_STARTUP_LOGS=true` を使用して有効にできます。

**構成:**

```text
[2020-07-02 14:51:16.421] [INFO] app - host:port==localhost:9080
[2020-07-02 14:51:16.423] [INFO] app - db type==mongo
[2020-07-02 14:51:16.439] [INFO] routes - Use dataaccess:../dataaccess/mongo/index.js
[2020-07-02 14:51:16.599] [INFO] app - Error connecting to database - exiting process: MongoError: connect ECONNREFUSED 127.0.0.1:27017
[2020-07-02 14:51:16.600] [INFO] app - Initialized database connections
[2020-07-02 14:51:16.601] [INFO] app - Express server listening on port 9080
DATADOG TRACER CONFIGURATION - {"date":"2020-07-02T18:51:18.294Z","os_name":"Darwin","os_version":"19.2.0","architecture":"x64","version":"0.23.0","lang":"nodejs","lang_version":"12.18.1","enabled":true,"service":"acmeair","agent_url":"http://localhost:8126","agent_error":"Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126","debug":false,"analytics_enabled":false,"sample_rate":1,"sampling_rules":[],"tags":{"service":"acmeair","version":"0.0.4"},"dd_version":"0.0.4","log_injection_enabled":false,"runtime_metrics_enabled":false,"integrations_loaded":["http","fs","net","dns","express@4.17.1"]}
```

**診断:**

Node.js トレーサーは、Agent に到達できない場合に診断行を出力します。

```text
DATADOG TRACER DIAGNOSTIC - Agent Error: Network error trying to reach the agent: connect ECONNREFUSED 127.0.0.1:8126
```

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

**ログの場所:**

Python トレーサーは、構成情報を INFO レベルでログに記録します。診断情報が見つかった場合は、ERROR としてログに記録します。

ログ構成がない場合は、診断のみが `Stderr` に出力されます。

トレーサーの起動ログを確認するには、ロガーを追加するか、構成で `DD_TRACE_DEBUG=true` を設定し、`ddtrace-run` を指定してアプリケーションを実行します。これによりロガーが追加され、デバッグログと起動トレーサーログの両方が公開されます。

`DD_TRACE_LOG_FILE` を使用してファイルにログを記録するためのオプションについては、「[トレーサーデバッグログ][1]」を参照してください。

**構成:**

```text
2020-07-09 11:04:08,098 INFO [ddtrace.tracer] [tracer.py:338] - - DATADOG TRACER CONFIGURATION - {"date": "2020-07-09T15:04:08.092797", "os_name": "Darwin", "os_version": "19.5.0", "is_64_bit": true, "architecture": "64bit", "vm": "CPython", "version": "0.38.1.dev79+gd22e2972.d20200707", "lang": "python", "lang_version": "3.7.6", "pip_version": "20.0.2", "in_virtual_env": true, "agent_url": "http://localhost:1234", "agent_error": "Agent not reachable. Exception raised: [Errno 61] Connection refused", "env": "", "is_global_tracer": true, "enabled_env_setting": null, "tracer_enabled": true, "sampler_type": "DatadogSampler", "priority_sampler_type": "RateByServiceSampler", "service": "", "debug": true, "enabled_cli": true, "analytics_enabled": false, "log_injection_enabled": false, "health_metrics_enabled": false, "dd_version": "", "priority_sampling_enabled": true, "global_tags": "", "tracer_tags": "", "integrations": {"asyncio": "N/A", "boto": "N/A", "botocore": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.15.32", "module_imported": false, "config": "N/A"}, "bottle": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "0.12.18", "module_imported": false, "config": null}, "cassandra": "N/A", "celery": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "4.2.2", "module_imported": false, "config": "N/A"}, "consul": "N/A", "django": "N/A", "elasticsearch": "N/A", "algoliasearch": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.2.0", "module_imported": false, "config": "N/A"}, "futures": "N/A", "grpc": "N/A", "mongoengine": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.19.1", "module_imported": false, "config": "N/A"}, "mysql": "N/A", "mysqldb": "N/A", "pymysql": "N/A", "psycopg": "N/A", "pylibmc": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.6.1", "module_imported": false, "config": "N/A"}, "pymemcache": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "1.4.4", "module_imported": false, "config": "N/A"}, "pymongo": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.10.1", "module_imported": false, "config": "N/A"}, "redis": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.5.3", "module_imported": false, "config": "N/A"}, "rediscluster": "N/A", "requests": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "2.23.0", "module_imported": false, "config": "N/A"}, "sqlalchemy": "N/A", "sqlite3": "N/A", "aiohttp": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "3.6.2", "module_imported": false, "config": "N/A"}, "aiopg": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.15.0", "module_imported": false, "config": "N/A"}, "aiobotocore": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.0.1", "module_imported": false, "config": null}, "httplib": "N/A", "vertica": "N/A", "molten": {"enabled": true, "instrumented": false, "module_available": true, "module_version": "0.7.4", "module_imported": false, "config": "N/A"}, "jinja2": "N/A", "mako": "N/A", "flask": "N/A", "kombu": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "4.3.0", "module_imported": false, "config": null}, "falcon": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.4.1", "module_imported": false, "config": null}, "pylons": "N/A", "pyramid": {"enabled": false, "instrumented": false, "module_available": true, "module_version": "1.10.4", "module_imported": false, "config": null}, "logging": "N/A"}}
```

**診断:**

Python トレーサーは、Agent に到達できない場合に診断行を出力します。

```text
DATADOG TRACER DIAGNOSTIC - Agent not reachable. Exception raised: [Errno 61] Connection refused
```
[1]: /ja/tracing/troubleshooting/tracer_debug_logs/?code-lang=python#enable-debug-mode

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

### 起動ログを有効にする {#enable-startup-logs}

起動ログは、コード構成または環境変数を使用して有効にできます。

**コード**:

コードで起動ログを有効にするには:

```ruby
Datadog.configure do |c|
     c.diagnostics.startup_logs.enabled = true
end
```
**環境変数**:

環境変数を使用して起動ログを有効にするには:

```shell
export DD_TRACE_STARTUP_LOGS=true
```

### 出力 {#output}

起動ログが有効になっている場合、トレーサーは構成と診断情報を出力します。

**構成:**

Ruby トレーサーは、製品 (例: Profiling、Core、Tracing) ごとに構成行を 1 行出力します。

```text
I, [2023-08-16T18:09:01.972265 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - PROFILING - {"profiling_enabled":false}

I, [2023-08-16T18:09:01.972767 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - CORE - {"date":"2023-08-16T18:09:01+00:00","os_name":"aarch64-unknown-linux-gnu","version":"1.13.0","lang":"ruby","lang_version":"3.0.6","env":null,"service":"rails","dd_version":null,"debug":false,"tags":null,"runtime_metrics_enabled":false,"vm":"ruby-3.0.6","health_metrics_enabled":false}

I, [2023-08-16T18:09:27.223143 #35]  INFO -- ddtrace: [ddtrace] DATADOG CONFIGURATION - TRACING - {"enabled":true,"agent_url":"http://agent:8126?timeout=30","analytics_enabled":false,"sample_rate":null,"sampling_rules":null,"integrations_loaded":"active_model_serializers@,aws@","partial_flushing_enabled":false,"priority_sampling_enabled":false,"integration_active_model_serializers_analytics_enabled":"false","integration_active_model_serializers_analytics_sample_rate":"1.0","integration_active_model_serializers_enabled":"true","integration_active_model_serializers_service_name":"","integration_aws_analytics_enabled":"false","integration_aws_analytics_sample_rate":"1.0","integration_aws_enabled":"true","integration_aws_service_name":"aws","integration_aws_peer_service":""}
```

**診断:**

Ruby トレーサーは、Agent に到達できない場合にエラー行を出力します。

```text
W, [2020-07-08T21:19:05.765994 #143]  WARN -- ddtrace: [ddtrace] DATADOG ERROR - TRACER - Agent Error: Datadog::Transport::InternalErrorResponse ok?: unsupported?:, not_found?:, client_error?:, server_error?:, internal_error?:true, payload:, error_type:Errno::ECONNREFUSED error:Failed to open TCP connection to ddagent:9127 (Connection refused - connect(2) for "ddagent" port 9127)
```

{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}

**構成:**

```text
{"agent_url":"http://localhost:8126","analytics_enabled":false,"analytics_sample_rate":null,"date":"2020-07-03T00:44:37+0000","dd_version":"","enabled":true,"env":"test-env","lang":"cpp","lang_version":"201402","operation_name_override":"","report_hostname":false,"sampling_rules":"[{\"sample_rate\": 1.0}]","service":"service_name","tags":{},"version":"v1.2.0"}
```

**診断:**

C++ の場合、トレーサーログに `DATADOG TRACER DIAGNOSTICS` 行は出力されません。ただし、Agent に到達できない場合は、アプリケーションログにエラーが表示されます。Envoy では、メトリクス `tracing.datadog.reports_failed` および `tracing.datadog.reports_dropped` が増分します。

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## 接続エラー {#connection-errors}

アプリケーションログや起動ログに `DIAGNOSTICS` エラー、または Agent に到達できないあるいは Agent に接続できないというメッセージ (言語によって異なります) が含まれている場合、トレーサーが Datadog Agent にトレースを送信できないことを意味します。

これらのエラーが表示された場合は、[ECS][1]、[Kubernetes][2]、[Docker][3]、または[その他のオプション][4]でトレースを受信するように Agent が設定されていることを確認するか、[サポートに連絡][5]してトレーサーと Agent の構成を確認してください。

インスツルメントされたアプリケーションが Datadog Agent と通信できないことを示すエラーの詳細については、「[接続エラー][6]」を参照してください。

## 構成設定{#configuration-settings}

ログに `CONFIGURATION` 行のみが含まれている場合は、トレーサーが出力した設定が Datadog Tracer のデプロイおよび構成で指定した設定と一致するか確認すると、トラブルシューティングに役立ちます。さらに、Datadog で特定のトレースが表示されない場合は、ドキュメントの[互換性要件][7]セクションを参照して、これらのインテグレーションがサポートされていることを確認してください。

使用しているインテグレーションがサポートされていない場合、またはトレースが Datadog で期待どおりに表示されない理由を調べるために構成の出力を別の人にも確認してほしい場合は、[サポートに連絡][5]してください。サポート担当者が原因の診断や、新しいインテグレーションの機能リクエストの作成をお手伝いします。

## OpenTelemetry 構成 {#opentelemetry-configuration}

DDOT SDK の起動ログには、重要な OpenTelemetry 構成設定の有効な値が記録されます。テレメトリの欠落や予期しない動作のトラブルシューティングを行う際に、この情報を使用して、意図したとおりの構成が SDK によって適用されたかどうかを確認してください。報告される設定は、SDK の言語とバージョンによって異なります。構成ログで、テレメトリの配信が成功したことを確認することはできません。

## 起動ログの無効化 {#disabling-startup-logs}

言語ごとに、環境変数 `DD_TRACE_STARTUP_LOGS=false` を設定して起動ログを無効にできます。ただしこれは、出力されるログが問題を引き起こしている場合にのみ行ってください。後から[デバッグ][8]ログを送信する場合は、必ず起動ログを有効にし、サポートでケースの優先順位付けを迅速に行えるように、関連するすべてのログをまとめてお送りください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/integrations/amazon_ecs/?tab=java#trace-collection
[2]: /ja/agent/kubernetes/?tab=helm
[3]: /ja/agent/docker/apm/?tab=java
[4]: /ja/tracing/send_traces/
[5]: /ja/help/
[6]: /ja/tracing/troubleshooting/connection_errors/
[7]: /ja/tracing/compatibility_requirements/
[8]: /ja/tracing/troubleshooting/tracer_debug_logs/