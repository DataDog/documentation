---
code_lang: nodejs
code_lang_weight: 30
further_reading:
- link: https://github.com/DataDog/dd-trace-js
  tag: GitHub
  text: ソースコード
- link: https://datadog.github.io/dd-trace-js
  tag: ドキュメント
  text: API ドキュメント
- link: /tracing/trace_collection/trace_context_propagation/nodejs/
  tag: Documentation
  text: トレースコンテキストの伝搬
- link: tracing/glossary/
  tag: APM の UI を利用する
  text: サービス、リソース、トレースを調査する
- link: tracing/
  tag: 高度な使用方法
  text: 高度な使用方法
title: Node.js トレーシングライブラリの構成
type: multi-code-lang
---

コードを使用してトレーシングライブラリをセットアップし、APM データを収集するように Agent を構成した後、オプションで[統合サービスタグ付け][1]のセットアップなど、必要に応じてトレーシングライブラリを構成してください。

トレーサーの設定は、以下の環境変数で構成することができます。

### タグ付け

`DD_ENV`
: **構成**: `env`<br>
**デフォルト**: Datadog Agent で構成された環境<br>
アプリケーションの環境を設定します (例えば、`prod`、`pre-prod`、`stage` など)。

`DD_SERVICE`
: **構成**: `service`<br>
**デフォルト**: `package.json` の `name` フィールド<br>
このアプリケーションで使用するサービス名。

`DD_VERSION`
: **構成**: `version`<br>
**デフォルト**: `package.json` の `version` フィールド<br>
アプリケーションのバージョン番号。

`DD_TAGS`
: **構成**: `tags`<br>
**デフォルト**: `{}`<br>
すべてのスパンおよびランタイムメトリクスに適用されるグローバルタグを設定します。環境変数として渡される場合、形式は `key:value,key:value` となります。プログラムで設定する場合は、`tracer.init({ tags: { foo: 'bar' } })` のような形式になります。

サービスに `env`、`service`、`version` を設定するには、`DD_ENV`、`DD_SERVICE`、`DD_VERSION` を使用することをおすすめします。このような環境変数の構成におすすめについては、[統合サービスタグ付け][1]のドキュメントをご参照ください。

### インスツルメンテーション

`DD_TRACE_ENABLED`
: **構成**: N/A<br>
**デフォルト**: `true`<br>
dd-trace を有効にするかどうか。`false` に設定すると、ライブラリの全ての機能が無効になります。

`DD_TRACE_DEBUG`
: **構成**: N/A<br>
**デフォルト**: `false`<br>
トレーサーのデバッグロギングを有効にします。

`DD_TRACING_ENABLED`
: **構成**: N/A<br>
**デフォルト**: `true`<br>
トレースを有効にするかどうか。

`DD_TRACE_AGENT_URL`
: **構成**: `url`<br>
**デフォルト**: `http://localhost:8126`<br>
トレーサーが送信するトレース Agent の URL。設定した場合、ホスト名およびポートより優先されます。[Agent 構成][13]で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに一致させる必要があります。`datadog.yaml` ファイルの `apm_config.receiver_socket` または 　`DD_APM_RECEIVER_SOCKET` 環境変数と組み合わせて、Unix ドメインソケットをサポートします。

`DD_TRACE_AGENT_HOSTNAME`
: **構成**: `hostname`<br>
**デフォルト**: `localhost`<br>
トレーサーが送信する Agent のアドレス。

`DD_TRACE_AGENT_PORT`
: **構成**: `port`<br>
**デフォルト**: `8126`<br>
トレーサーが送信する Trace Agent のポート。[Agent 構成][13]で `receiver_port` や `DD_APM_RECEIVER_PORT` をデフォルトの `8126` 以外に設定した場合、`DD_TRACE_AGENT_PORT` や `DD_TRACE_AGENT_URL` をそれに一致させる必要があります。

`DD_DOGSTATSD_PORT`
: **構成**: `dogstatsd.port`<br>
**デフォルト**: `8125`<br>
メトリクスを送信する DogStatsD Agent のポート。[Agent 構成][13]で `dogstatsd_port` や `DD_DOGSTATSD_PORT` がデフォルトの `8125` 以外に設定されている場合、このトレーシングライブラリ `DD_DOGSTATSD_PORT` はそれに合わせなければなりません。

`DD_LOGS_INJECTION`
: **構成**: `logInjection`<br>
**デフォルト**: `false`<br>
対応するログライブラリのログにトレース ID の自動挿入を有効にします。

`DD_TRACE_SAMPLE_RATE`
: **構成**: `sampleRate`<br>
**デフォルト**: Agent に判断を委ねます。<br>
Agent とバックエンド間の取り込みサンプルレート (0.0～1.0 の間) を制御します。

`DD_TRACE_RATE_LIMIT`
: **構成**: `rateLimit`<br>
**デフォルト**: `DD_TRACE_SAMPLE_RATE` が設定されている場合は、`1.0`。そうでない場合は、Datadog Agent にレート制限を委ねます。
`0.0` と `1.0` の間の浮動小数点数で、サンプリングするスパンの比率を指定します。<br>

`DD_TRACE_SAMPLING_RULES`
: **構成**: `samplingRules`<br>
**デフォルト**: `[]`<br>
優先的にサンプリングする際に適用するサンプリングルール。オブジェクトの JSON 配列。各オブジェクトは、0.0 から 1.0 の間の `sample_rate` 値を持たなければなりません (この値を含む)。各ルールはオプションで `name` と `service` フィールドを持ち、これらはトレースの `service` と `name` に対してマッチする正規表現文字列です。ルールは、トレースのサンプルレートを決定するために設定された順番で適用されます。省略された場合、トレーサーは Agent に従い、すべてのトレースでサンプルレートを動的に調整します。

`DD_SPAN_SAMPLING_RULES`
: **構成**: `spanSamplingRules`<br>
**デフォルト**: `[]`<br>
スパンのサンプリングルールで、トレースの残りがドロップされる場合に、個々のスパンを保持します。オブジェクトの JSON 配列。ルールは、スパンのサンプルレートを決定するために構成された順序で適用されます。`sample_rate` 値は 0.0 から 1.0 の間でなければなりません (この値を含む)。
詳しくは、[取り込みメカニズム][3]を参照してください。<br>
**例:**<br>
  - サービス名 `my-service` と演算子名 `http.request` のスパンサンプリングレートを 50% に設定し、1 秒間に最大 50 トレースします: `'[{"service": "my-service", "name": "http.request", "sample_rate":0.5, "max_per_second": 50}]'`

`DD_SPAN_SAMPLING_RULES_FILE`
: **構成**: N/A<br>
**デフォルト**: N/A<br>
スパンサンプリングルールを含む JSON ファイルへのポインタを指定します。この変数よりも `DD_SPAN_SAMPLING_RULES` が優先されます。ルールのフォーマットは `DD_SPAN_SAMPLING_RULES` を参照してください。

`DD_RUNTIME_METRICS_ENABLED`
: **構成**: `runtimeMetrics`<br>
**デフォルト**: `false`<br>
ランタイムメトリクスのキャプチャを有効にするかどうか。Agent 上でポート `8125` (または `DD_DOGSTATSD_PORT` で構成) を UDP 用に開いておく必要があります。

`DD_SERVICE_MAPPING`
: **構成**: `serviceMapping`<br>
**デフォルト**: N/A<br>
**例**: `mysql:my-mysql-service-name-db,pg:my-pg-service-name-db`<br>
各プラグインのサービス名を提供します。カンマ区切りの `plugin:service-name` ペア (スペースありまたはなし) を許容します。

`DD_TRACE_DISABLED_PLUGINS`
: **構成**: N/A<br>
**デフォルト**: N/A<br>
**例**: `DD_TRACE_DISABLED_PLUGINS=express,dns`<br>
トレーサー初期化時に自動的に無効になるインテグレーション名のカンマ区切り文字列。

`DD_TRACE_LOG_LEVEL`
: **構成**: `logLevel`<br>
**デフォルト**: `debug`<br>
デバッグログが有効な場合に、トレーサーが使用する最小のログレベルを表す文字列で、例えば `error` や `debug` などです。

Flush Interval
: **構成**: `flushInterval`<br>
**デフォルト**: `2000`<br>
トレーサーが Agent にトレースを送信する間隔 (ミリ秒)。

`DD_TRACE_PARTIAL_FLUSH_MIN_SPANS`
: **構成**: `flushMinSpans`<br>
**デフォルト**: `1000`<br>
トレースを部分的にエクスポートする前のスパン数。これにより、非常に大きなトレースに対して、すべてのスパンをメモリに保持することを防ぎます。

`DD_TRACE_OBFUSCATION_QUERY_STRING_REGEXP`
: **構成**: N/A<br>
**デフォルト**: N/A<br>
`http.url` タグで報告されるリクエストのクエリ文字列から、機密性の高いデータを削除するための正規表現 (マッチしたデータは `<redacted>` に置き換えられます)。空文字列を指定すると編集を無効にし、`.*` を指定するとすべてのクエリ文字列を編集することができます。**警告: この正規表現は安全でない入力 (url) からのリクエストに対して実行されるので、安全な正規表現を使用するようにしてください。**

`DD_TRACE_CLIENT_IP_HEADER`
: **構成**: N/A<br>
**デフォルト**: N/A<br>
`http.client_ip` タグのソースとなるカスタムヘッダー名。

DNS Lookup Function
: **構成**: `lookup`<br>
**デフォルト**: `require('dns').lookup`<br>
Agent にリクエストを送信する際の DNS ルックアップのカスタム関数です。セットアップによっては、何百ものサービスが実行されており、それぞれがフラッシュ間隔ごとに DNS ルックアップを行い、スケーリングの問題を引き起こしています。これをオーバーライドして、独自のキャッシュまたは解決メカニズムを提供します。

`DD_TRACE_AGENT_PROTOCOL_VERSION`
: **構成**: `protocolVersion`<br>
**デフォルト**: `0.4`<br>
Agent へのリクエストに使用するプロトコルのバージョン。構成されたバージョンは、インストールされた Agent のバージョンによってサポートされている必要があり、そうでない場合はすべてのトレースが削除されます。

`DD_PROFILING_ENABLED`
: **構成**: `profiling`<br>
**デフォルト**: `false`<br>
プロファイリングを有効にするかどうか。

`DD_TRACE_REPORT_HOSTNAME`
: **構成**: `reportHostname`<br>
**デフォルト**: `false`<br>
各トレースについて、システムのホスト名を報告するかどうか。無効の場合、Agent のホスト名が代わりに使用されます。

Experimental Features
: **構成**: `experimental`<br>
**デフォルト**: `{}`<br>
実験的な機能は、あらかじめ定義されたキーに `true` という値を追加することで有効にすることができます。利用可能な実験的機能の詳細については、[サポートに連絡][4]してください。

Automatically Instrument External Libraries
: **構成**: `plugins`<br>
**デフォルト**: `true`<br>
ビルトインプラグインを使用して、外部ライブラリの自動インスツルメンテーションを有効にするかどうか。

`DD_TRACE_STARTUP_LOGS`
: **構成**: `startupLogs`<br>
**デフォルト**: `false`<br>
トレーサーのスタートアップ構成と診断ログを有効にします。

`DD_DBM_PROPAGATION_MODE`
: **構成**: `dbmPropagationMode`<br>
**デフォルト**: `'disabled'`<br>
タグインジェクションを用いた DBM と APM のリンクを有効にするには、`'service'` または `'full'` に設定します。`'service'` オプションは DBM と APM サービス間の接続を可能にします。`'full'` オプションは、データベースクエリイベントを持つデータベーススパン間の接続を可能にします。Postgres で利用可能です。

`DD_APPSEC_ENABLED`
: **構成**: `appsec.enabled`<br>
**デフォルト**: `false`<br>
Application Security Management の機能を有効にします。

`DD_APPSEC_RULES`
: **構成**: `appsec.rules`<br>
**デフォルト**: N/A<br>
カスタム AppSec ルールファイルへのパス。

`DD_APPSEC_WAF_TIMEOUT`
: **構成**: `appsec.wafTimeout`<br>
**デフォルト**: `5000`<br>
WAF の同期実行時間 (マイクロ秒) を制限します。

`DD_APPSEC_OBFUSCATION_PARAMETER_KEY_REGEXP`
: **構成**: `appsec.obfuscatorKeyRegex`<br>
**デフォルト**: N/A<br>
攻撃報告において、機密データをそのキーで冗長化するための正規表現文字列。

`DD_APPSEC_OBFUSCATION_PARAMETER_VALUE_REGEXP`
: **構成**: `appsec.obfuscatorValueRegex`<br>
**デフォルト**: N/A<br>
攻撃報告において、機密データをその値で冗長化するための正規表現文字列。

`DD_REMOTE_CONFIG_POLL_INTERVAL_SECONDS`
: **構成**: `remoteConfig.pollInterval`<br>
**デフォルト**: 5<br>
リモート構成のポーリング間隔 (秒)。

### ヘッダーの抽出と挿入

有効な値と以下の構成オプションの使用に関する情報については、[Node.js トレースコンテキストの伝播][5]を参照してください。

`DD_TRACE_PROPAGATION_STYLE_INJECT`
: **構成**: `tracePropagationStyle.inject`<br>
**デフォルト**: `Datadog,tracecontext`<br>
サービス間で分散型トレースを伝播させるために含めるヘッダーフォーマットのカンマ区切りリスト。

`DD_TRACE_PROPAGATION_STYLE_EXTRACT`
: **構成**: `tracePropagationStyle.extract`<br>
**デフォルト**: `Datadog,tracecontext`<br>
分散型トレーシングの伝搬データを抽出しようと試みるヘッダーフォーマットのカンマ区切りリスト。完全かつ有効なヘッダーを持つ最初のフォーマットが見つかった場合、トレースを続行するためにそれが使用されます。

`DD_TRACE_PROPAGATION_STYLE`
: **構成**: `tracePropagationStyle`<br>
**デフォルト**: `Datadog,tracecontext`<br>
分散型トレーシングの伝搬データを挿入および抽出しようと試みるヘッダーフォーマットのカンマ区切りリスト。完全かつ有効なヘッダーを持つ最初のフォーマットが見つかった場合、トレースを続行するためにそれが使用されます。存在する場合、より具体的な `DD_TRACE_PROPAGATION_STYLE_INJECT` と `DD_TRACE_PROPAGATION_STYLE_EXTRACT` の構成が優先されます。

ライブラリの操作例については、[API ドキュメント][2]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: https://datadog.github.io/dd-trace-js/
[3]: /ja/tracing/trace_pipeline/ingestion_mechanisms/
[4]: /ja/help/
[5]: /ja/tracing/trace_collection/trace_context_propagation/nodejs
[13]: /ja/agent/guide/network/#configure-ports