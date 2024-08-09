---
title: サーバーレス Agent の構成
---

## 概要

Agent の[メインコンフィグレーションファイル][1]は `datadog.yaml` です。サーバーレス Agent では、`datadog.yaml` の構成オプションは、環境変数で渡されます。環境変数は、通常、その構成オプションの名前を大文字のスネークケースで指定します。例えば、Datadog の API キーを `DD_API_KEY` と設定します。

### 基本のコンフィギュレーション

| 環境変数                   | 説明                                                                                                                                                                                                        |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`                   | Datadog API キーが入った環境変数を平文で指定します。キー環境変数が **1 つ** 必要です。[サーバーレス CLI 環境変数][7]を参照してください。                                                                                              |
| `DD_KMS_API_KEY`               | Datadog API キーが入った環境変数を KMS を使用して指定します。キー環境変数が **1 つ** 必要です。[サーバーレス CLI 環境変数][7]を参照してください。                                                                        |
| `DD_API_KEY_SECRET_ARN`        | Datadog API キーが入った環境変数をシークレットマネージャーを使用して指定します。キー環境変数が **1 つ** 必要です。[サーバーレス CLI 環境変数][7]を参照してください。                                                                           |
| `DD_LOG_LEVEL`                 | [Datadog Agent ログ][8]のレベルを設定します。                                                                                                                                                                      |
| `DD_SERVERLESS_FLUSH_STRATEGY` | Datadog Agent のフラッシュ戦略。指定できる値は `end` または `periodically[,milliseconds]` です。例えば、`DD_SERVERLESS_FLUSH_STRATEGY=periodically,100` は 100ms 毎にフラッシュします。                                                                                                                  |
| `DD_ENV`                       | 出力されるすべてのデータにグローバルタグの `env` タグを設定します。                                                                                                                                                                |
| `DD_TAGS`                      | スペース区切りのホストタグ。例: `simple-tag-0 tag-key-1:tag-value-1`                                                                                                                                  |
| `DD_SITE`                      | メトリクス、トレース、ログの送信先サイト。Datadog サイトを `{{< region-param key="dd_site" >}}` に設定します。デフォルトは `datadoghq.com` です。                                                                  |
| `DD_DD_URL`                    | メトリクス送信用 URL を上書きします。設定は任意です。                                                                                                                                                        |
| `DD_URL`                       | `DD_DD_URL` のエイリアス。すでに `DD_DD_URL` が設定されている場合は無視されます。                                                                                                                                                      |
| `DD_TRACE_ENABLED`             | トレース収集を有効にします。デフォルトは `true` です。トレース収集の追加環境変数の詳細をご覧ください。                                                                                       |
| `DD_TAGS`                      | タグのリスト。この Agent が発するすべてのメトリクス、イベント、ログ、トレース、サービスチェックにアプリ内でアタッチされます。                                                                                                         |
| `DD_TAG_VALUE_SPLIT_SEPARATOR` | 指定されたセパレーターに従ってタグの値を分割します。ホストタグ、およびコンテナインテグレーションからのタグにのみ適用されます。DogStatsD メトリクスのタグや、他のインテグレーションによって収集されたタグには適用されません。 |
|

### ログ収集の構成

| 環境変数                                  | 説明                                                                                                                                                                                                                          |
|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_LOGS_ENABLED`                             | Datadog Agent のログ収集を有効にするには、`true` に設定します。                                                                                                                                                          |
| `DD_LOGS_CONFIG_DD_URL`                       | ログ用のプロキシを使用する際にヒットするエンドポイントとポートを定義します。ログは TCP で転送されるため、プロキシは TCP 接続を扱える必要があります。`<ENDPOINT>:<PORT>` の形式で文字列を指定します。                                  |
| `DD_LOGS_CONFIG_LOGS_NO_SSL`                  | SSL 暗号化を無効にします。このパラメーターは、ログがローカルでプロキシに転送される場合にのみ使用する必要があります。その後、プロキシ側で SSL 暗号化を処理することを強くお勧めします。                                             |
| `DD_LOGS_CONFIG_PROCESSING_RULES`             | すべてのログに適用されるグローバルな処理ルール。使用できるルールは `exclude_at_match`、`include_at_match`、`mask_sequences` です。詳しくは、[グローバル処理ルール][2]を参照してください。                                            |
| `DD_LOGS_CONFIG_FORCE_USE_HTTP`               | デフォルトでは、Agent は Agent 起動時に HTTPS 接続が確立されている場合、ポート 443 に HTTPS バッチでログを送信し、そうでない場合は TCP にフォールバックします。このパラメーターを `true` に設定すると、常に HTTPS でログを送信するようになります (推奨)。 |
| `DD_LOGS_FORCE_USE_TCP`                       | デフォルトでは、ログは可能であれば HTTPS で送信されます。このパラメーターを `true` に設定すると、ログは常に TCP 経由で送信されます。`DD_LOGS_CONFIG_FORCE_USE_HTTP` が `true` に設定されている場合、このパラメーターは無視されます。                                                            |
| `DD_LOGS_CONFIG_USE_COMPRESSION`              | このパラメーターは、HTTPS でログを送信するときに使用できます。`true` に設定すると、Agent はログを送信する前に圧縮します。                                                                                                                 |
| `DD_LOGS_CONFIG_COMPRESSION_LEVEL`            | このパラメーターは `0` (圧縮しない) から `9` (最大に圧縮するが、リソースの使用量が増える) までの値を取ることができます。`DD_LOGS_CONFIG_USE_COMPRESSION` が `true` に設定されている場合にのみ有効です。                                                |
| `DD_LOGS_CONFIG_BATCH_WAIT`                   | Datadog Agent が送信前にログの各バッチを満たすために待機する最大時間 (秒)。デフォルトは `5` です。                                                                                                                                     |
| `DD_LOGS_CONFIG_OPEN_FILES_LIMIT`             | 並列に追跡できるファイルの最大数。デフォルトは `500` です。                                                                                                                                                          |
| `DD_LOGS_CONFIG_FILE_WILDCARD_SELECTION_MODE` | ワイルドカードのマッチがオープンファイルの制限を超えた場合に、優先順位をつけるために使用する戦略。利用可能な値は `by_name` と `by_modification_time` です。                                                                                               |
| `DD_LOGS_CONFIG_LAMBDA_LOGS_TYPE`             | エクスポートするログのソース。許可される値は、`function`、`platform`、`extension` のスペース区切りのリストです。デフォルトは全てです。                                                                                                   |

### APM の構成

| 環境変数              | 説明                                                                                                                                                                                                                           |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_APM_ENABLED`          | APM Agent を有効にするには、`true` を設定します。デフォルトは `true` です。                                                                                                                                                                                    |
| `DD_APM_ENV`              | トレースがタグ付けされる環境タグ。この変数が設定されていない場合、値は `DD_ENV` から継承されます。`DD_ENV` が設定されていない場合、この値は `DD_TAGS` で設定された `env:` タグから継承されます。 |
| `DD_APM_RECEIVER_PORT`    | トレースレシーバーがリッスンするポート。`0` に設定すると HTTP レシーバーが無効になります。デフォルト: `8126`                                                                                                                               |
| `DD_APM_RECEIVER_SOCKET`  | Unix Domain Socket によるトレースを受け付けます。デフォルトではオフになっています。設定された場合、有効なソケットファイルを指す必要があります。                                                                                                                      |
| `DD_APM_DD_URL`           | APM のプロキシを使用する際にヒットするエンドポイントとポートを定義します。`<ENDPOINT>:<PORT>` の形式で文字列を指定します。トレースは TCP で転送されるため、プロキシは TCP 接続を扱える必要があります。                                                        |
| `DD_APM_REPLACE_TAGS`     | [潜在的な機密情報][3]を含む特定のタグを置換または削除するための一連のルールを定義します。                                                                                                                |
| `DD_APM_IGNORE_RESOURCES` | 正規表現の除外リスト。これらの表現のいずれかに一致するリソース名を持つトレースは、無視されます。カンマで区切ったリストを使用し、各項目を二重引用符で囲みます。例: `"^foo$", "bar$"`                                              |
| `DD_APM_LOG_THROTTLING`   | `true` に設定すると、10 秒ごとに警告とエラーの合計数を 10 に制限します。デフォルトは `true` です。                                                                                                                                                    |

### 高度なネットワーク構成

| 環境変数             | 説明                                                                                                                                                                                                                                                                              |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SKIP_SSL_VALIDATION` | このオプションを `true` に設定すると、Agent に SSL/TLS 証明書の検証を省略するように指示します。デフォルトは `false` です。                                                                                                                                                                                |
| `DD_MIN_TLS_VERSION`     | このオプションは、`DD_SITE` または `DD_URL` で指定した Datadog インテークにデータを送信する際の最小 TLS バージョンを定義します。指定できる値は、`tlsv1.0`、`tlsv1.1`、`tlsv1.2`、または `tlsv1.3` です。値は大文字と小文字を区別しません。デフォルトは `tlsv1.2` です。 |

### プロキシ設定

| 環境変数        | 説明                                                       |
|---------------------|-------------------------------------------------------------------|
| `DD_PROXY_HTTP`     | `http` リクエスト用のプロキシとして使用する HTTP URL です。                |
| `DD_PROXY_HTTPS`    | `https` リクエスト用のプロキシとして使用する HTTPS URL です。              |
| `DD_PROXY_NO_PROXY` | プロキシを使用すべきではない場合に必要となる、URL をスペースで区切ったリストです。 |

プロキシ設定の詳細については、[Agent v6 プロキシのドキュメント][6]を参照してください。

### DogStatsD (カスタムメトリクス)

カスタムメトリクスを [StatsD プロトコル][5]で送信します。

| 環境変数                                      | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|---------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_DOGSTATSD_NON_LOCAL_TRAFFIC`                  | 他のコンテナからの DogStatsD パケットをリスニングします (カスタムメトリクスの送信に必要)。                                                                                                                                                                                                                                                                                                                                                                    |
| `DD_DOGSTATSD_SOCKET`                             | リスニングする Unix ソケットのパス。`rw` でマウントされたボリューム内にある必要があります。                                                                                                                                                                                                                                                                                                                                                                                 |
| `DD_DOGSTATSD_ORIGIN_DETECTION`                   | Unix ソケットのメトリクス用にコンテナの検出とタグ付けを有効にします。                                                                                                                                                                                                                                                                                                                                                                                         |
| `DD_DOGSTATSD_TAGS`                               | この DogStatsD サーバーが受信するすべてのメトリクス、イベント、サービスのチェックに付加する追加タグのスペース区切りのリスト。たとえば `"env:golden group:retrievers"` のように追加します。                                                                                                                                                                                                                                                                                                   |
| `DD_USE_DOGSTATSD`                                | DogStatsD ライブラリからのカスタムメトリクスの送信を有効または無効にします。                                                                                                                                                                                                                                                                                                                                                                                    |
| `DD_DOGSTATSD_PORT`                               | Agent DogStatsD ポートをオーバーライドします。                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DD_BIND_HOST`                                    | DogStatsD とトレースのためにリッスンするホストです。`apm_config.apm_non_local_traffic` が有効な場合、APM はこれを無視し、`dogstatsd_non_local_traffic` が有効な場合は DogStatsD はこれを無視します。Trace Agent はこのホストを使用してメトリクスを送信します。<br/>**注**: DogStatsD が `::1` でリッスンする IPv6 環境では、`localhost` のデフォルト値は無効となります。この問題を解決するには、この値を `127.0.0.1` に設定して、DogStatsD が IPv4 でリッスンしていることを確認します。 |
| `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT`            | `true` に設定すると、Agent はクライアントが提供するコンテナ ID を使用して、メトリクス、イベント、およびサービスチェックをコンテナタグでリッチ化します。<br/>**注**: DogStatsD プロトコルバージョン 1.2 と互換性のあるクライアントを使用する必要があります。                                                                                                                                                                                                                                    |
| `DD_DOGSTATSD_BUFFER_SIZE`                        | StatsD パケットの受信に使用するバッファのサイズ (バイト単位)。                                                                                                                                                                                                                                                                                                                                                                                                |
| `DD_DOGSTATSD_STATS_ENABLE`                       | DogStatsD の内部統計情報を Go expvars として公開します。                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DD_DOGSTATSD_QUEUE_SIZE`                         | DogStatsD サーバーの内部キューサイズを構成します。このキューのサイズを小さくすると、DogStatsD サーバーの最大メモリ使用量を減らすことができますが、パケットドロップの数が増加する可能性があります。                                                                                                                                                                                                                               |
| `DD_DOGSTATSD_STATS_BUFFER`                       | DogStatsD の統計情報循環バッファにいくつの項目を入れるかを設定します。                                                                                                                                                                                                                                                                                                                                                                                  |
| `DD_DOGSTATSD_STATS_PORT`                         | Go expvar サーバーのポート。                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `DD_DOGSTATSD_SO_RCVBUF`                          | **POSIX システムのみ**: DogStatsD のソケット受信バッファに割り当てるバイト数を設定します。デフォルトでは、OS がこの値を設定します。この変数を使用すると、OS のデフォルト値を変更することなく、バッファのサイズを大きくすることができます。最大許容値は OS に依存します。                                                                                                                   |
| `DD_DOGSTATSD_METRICS_STATS_ENABLE`               | `true` に設定すると、DogStatsD は処理したメトリクスに関する基本的な統計情報 (カウント/最終確認) を収集します。これらの統計情報を見るには Agent コマンド `dogstatsd-stats` を使用します。                                                                                                                                                                                                                                                         |
| `DD_DOGSTATSD_NO_AGGREGATION_PIPELINE`            | DogStatsD の集計なしパイプラインを有効化します。このパイプラインは、タイムスタンプを持つメトリクスを受け取り、タグ付け以外の余分な処理をせずにインテークに転送します。                                                                                                                                                                                                                                                                             |
| `DD_DOGSTATSD_NO_AGGREGATION_PIPELINE_BATCH_SIZE` | 集計なしパイプラインがインテークに送るペイロードで、最大何メトリクスか。                                                                                                                                                                                                                                                                                                                                                                 |
| `DD_STATSD_FORWARD_HOST`                          | DogStatsD サーバーが受信したすべてのパケットを、他の StatsD サーバーに転送します。転送されるパケットは通常の StatsD パケットであり、DogStatsD パケットではないことを確認してください (他の StatsD サーバーが処理できない場合があります)。                                                                                                                                                                                                                  |
| `DD_STATSD_FORWARD_PORT`                          | StatsD パケットの転送先となるポート。                                                                                                                                                                                                                                                                                                                                                                                          |
| `DD_STATSD_METRIC_NAMESPACE`                      | このホストから送られてくるすべての StatsD メトリクスのネームスペースを設定します。受信した各メトリクスは、Datadog に送信される前にネームスペースでプレフィックスされます。                                                                                                                                                                                                                                                                                                          |

[1]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml

[2]: https://docs.datadoghq.com/ja/agent/logs/advanced_log_collection/#global-processing-rules

[3]: https://docs.datadoghq.com/ja/tracing/setup_overview/configure_data_security/#replace-rules-for-tag-filtering

[4]: https://docs.datadoghq.com/ja/tracing/troubleshooting/agent_rate_limits/#max-connection-limit

[5]: /ja/developers/dogstatsd/

[6]: /ja/agent/proxy/#agent-v6

[7]: /ja/serverless/libraries_integrations/cli/#environment-variables

[8]: /ja/agent/troubleshooting/debug_mode/?tab=agentv6v7#agent-log-level