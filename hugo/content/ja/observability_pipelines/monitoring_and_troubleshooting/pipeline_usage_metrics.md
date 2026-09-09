---
aliases:
- /ja/observability_pipelines/monitoring/metrics/
description: ダッシュボード、ノートブック、モニターを構築するために Observability Pipelines から利用可能なメトリクスを見つけます。
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: ドキュメント
  text: Metrics Summary の詳細はこちら
- link: /metrics/explorer/
  tag: ドキュメント
  text: Metrics Explorer を使用したメトリクスのチェックと分析
- link: /getting_started/dashboards/
  tag: ドキュメント
  text: ダッシュボードの利用を開始する
- link: /getting_started/monitors/
  tag: ドキュメント
  text: モニターの利用を開始する
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse および Datadog に OTel データをルーティングする
title: Pipelines 使用状況メトリクス
---
## 概要 {#overview}

このドキュメントでは、Observability Pipelines の利用可能なメトリクスの一部を一覧表示します。以下のことができます。

- これらのメトリクスを使用して、独自の [ダッシュボード][1]、[ノートブック][2]、および [モニター][3] を作成します。
- [Metrics Summary][5] を使用して、メトリクスで利用可能なメタデータとタグを確認します。また、どの [ダッシュボード]、[ノートブック]、[モニター]、および [SLO] がそれらのメトリクスを使用しているかを確認することもできます。

特定のパイプライン、Worker、およびコンポーネントごとにメトリクスをグループ化するためにタグを使用する方法の詳細については、[タグの利用を開始する][4] を参照してください。

すべてのメトリクスに以下のタグが付けられています。

`pipeline_id`
: パイプラインの UUID。

`worker_uuid`
: メトリクスを出力する Worker の UUID。

`op_worker_version`
: メトリクスを出力する Worker のバージョン。

`rc_version`
: パイプラインが更新されるたびにインクリメントされる構成バージョン番号。

`pipeline_name`
: 最後にデプロイまたは更新された時点でのパイプラインの名前。Worker バージョン 2.18 以降で利用可能。

**注**:
- すべての Worker は、Worker 自身のテレメトリ (メトリクスとログ) を収集して Datadog に送信する内部パイプラインも実行します。この内部パイプラインのコンポーネントには、`component_id` 値がアンダースコア (`_`) で始まるタグが付いています。これらのメトリクスをクエリから除外するには、`!component_id:_*` を使用します。
- `_total` で終わるメトリクスは各時間間隔のカウントを報告するため、その生の値は単調増加しません。

## 推定使用量メトリクス {#estimated-usage-metric}

Observability Pipelines の取り込みバイト数
: **メトリクス**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **説明**: Observability Pipelines によって取り込まれたデータ量。詳細については、[推定使用量メトリクス][6] を参照してください。

## ホストメトリクス {#host-metrics}

これらのメトリクスは、Observability Pipelines Worker を実行しているホストに関する情報を提供します。

利用可能なメモリ
: **メトリクス**: `pipelines.host.memory_available_bytes`
: **説明:** ホスト上で新しい割り当てに使用できるメモリのバイト数。

入力バイト数
: **メトリクス**: `pipelines.host.network_receive_bytes_total`
: **説明:** ホストがすべてのインターフェースで受信したバイト数。インターフェースごとにフィルタリングするには `device` タグを使用します (例: `device:eth0`)。

送信バイト数
: **メトリクス**: `pipelines.host.network_transmit_bytes_total`
: **説明:** ホストがすべてのインターフェースで送信したバイト数。インターフェースごとにフィルタリングするには `device` タグを使用します。

CPU 時間
: **メトリクス**: `pipelines.host.cpu_seconds_total`
: **説明:** モード (ユーザー、システム、アイドルなど) および CPU コア別に分類された、ホストが消費した合計 CPU 時間。

ディスクの読み取り/書き込みバイト数
: **メトリクス**: `pipelines.host.disk_read_bytes_total`、`pipelines.host.disk_written_bytes_total`
: **説明:** ホスト上のすべてのディスクから読み取られ書き込まれたバイト数。

ホストの稼働時間
: **メトリクス**: `pipelines.host.uptime`
: **説明:** ホストが起動してからの経過時間 (秒単位)。

ロード平均
: **メトリクス**: `pipelines.host.load1`、`pipelines.host.load5`、`pipelines.host.load15`
: **説明:** 過去 1 分、5 分、15 分間のホストのシステムロード平均。ロード平均とは、実行中または実行待ちのプロセス数であり、Linux では割り込み不可能な I/O でブロックされているプロセスも含まれます。ロード平均値を `pipelines.host.logical_cpus` の値と比較する: ロードアベレージの値が CPU 数に近い場合はフル稼働状態であることを示し、CPU 数を超えている場合はホストが過負荷状態であることを示します。Windows で実行されている Observability Pipelines Worker では発行されません。

論理 CPU
: **メトリクス**: `pipelines.host.logical_cpus`
: **説明:** ホスト上で利用可能な論理 CPU スレッド (ハードウェアスレッド) の数。

合計メモリ
: **メトリクス**: `pipelines.host.memory_total_bytes`
: **説明:** ホストにインストールされている合計物理メモリ (RAM)。

## プロセスメトリクス {#process-metrics}

これらのメトリクスは、Observability Pipelines Worker プロセスに関する情報を提供します。

割り当てられた CPU コア数
: **メトリクス**: `pipelines.cpu_max_cores`
: **説明:** コンテナまたは cgroup の制限によって報告される、Worker に割り当てられた CPU コア数。

CPU 使用率
: **メトリクス**: `pipelines.cpu_usage_seconds_total`
: **説明:** Worker プロセスによって消費された CPU 時間 (秒単位、ユーザー空間およびシステム空間)。そのメトリクスの 1 秒あたりのレートは、Worker によって使用される CPU の割合を示します。

データディレクトリの利用可能バイト数
: **メトリクス**: `pipelines.data_dir_available_bytes`
: **説明:** Worker がバッファおよび状態データを保存するファイルシステム上の残りの空きストレージ容量。ディスクバッファの監視に役立ちます。

データディレクトリの容量 (バイト)
: **メトリクス**: `pipelines.data_dir_capacity_bytes`
: **説明:** Worker がバッファおよび状態データを保存するファイルシステムの合計ストレージ容量。

メモリ制限
: **メトリクス**: `pipelines.memory_max_bytes`
: **説明:** コンテナまたは cgroup の制限によって設定された、Worker が使用を許可されている最大メモリ量。

メモリ使用量
: **メトリクス**: `pipelines.resident_memory_used_bytes`
: **説明:** Worker プロセスによって使用されている RSS メモリ量 (バイト)。

Worker の稼働時間
: **メトリクス**: `pipelines.uptime_seconds`
: **説明:** Worker プロセスが開始されてからの経過時間 (秒)。

## Worker ライフサイクルメトリクス {#worker-lifecycle-metrics}

これらのメトリクスは、Observability Pipelines Worker のライフサイクルイベントを追跡します。

Worker の再読み込み回数
: **メトリクス**: `pipelines.reloaded_total`
: **説明:** 設定変更後など、Worker インスタンスが再読み込みされた回数。

## コンポーネントメトリクス {#component-metrics}

これらのメトリクスは、ソース、プロセッサ、および送信先で利用可能です。

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
- `component_type` タグを使用して、Quota プロセッサの `quota` など、ソース、プロセッサ、または送信先のタイプでフィルタリングまたはグループ化します。
- `component_kind` タグを使用して、`source`、`transform` (プロセッサ)、または `sink` (送信先) でフィルタリングまたはグループ化します。

{{< tabs >}}
{{% tab "ソース" %}}

### スループット {#throughput}

入力バイト数
: **メトリクス**: `pipelines.component_received_bytes_total`
: **説明**: デコードや変換を行う前にソースの入力から読み取られた生のバイト数。

イベント入力
: **メトリクス**: `pipelines.component_received_events_total`
: **説明**: コンポーネントが受信したイベントの数。

イベント出力
: **メトリクス**: `pipelines.component_sent_events_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントの数。

イベント入力バイト数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが受信したイベントのバイトサイズ。

イベント出力バイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントのバイトサイズ。

### エラー、破棄されたデータ、タイムアウト {#errors-data-dropped-and-timed-outs}

エラー
: **メトリクス**: `pipelines.component_errors_total`
: **説明**: コンポーネントで発生したエラーの数。コンポーネントに応じて、このメトリクスにはエラーを説明する `error_code`、`error_type`、または `reason` タグが含まれる場合があります。

意図的にまたは意図せず破棄されたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: 破棄されたイベントの数。**注**: このメトリクスの内訳を確認するには、`intentional:true` 意図的に破棄されたイベントをタグを使用してフィルタリングするか、`intentional:false` 意図せず破棄されたイベントをタグを使用してフィルタリングします。

タイムアウトしたイベント
: **メトリクス**: `pipelines.component_timed_out_events_total`
: **説明**: 最初のプロセッサへの送信を 5 秒以上待機し、HTTP 503 エラーが発生したイベントの数。これは、イベントの配信がブロックされた場合に発生する可能性があります。
: **利用可能な対象**: Datadog Agent など、タイムアウトが設定されている HTTP ベースのソース。

タイムアウトしたリクエスト
: **メトリクス**: `pipelines.component_timed_out_requests_total`
: **説明**: HTTP リクエストを使用してバッチで Worker にイベントを送信するソースにおいてタイムアウトしたリクエストの数。
: **利用可能な対象**: Datadog Agent など、タイムアウトが設定されている HTTP ベースのソース。

### パフォーマンス {#performance}

レイテンシーを送信する
: **メトリクス**: `pipelines.source_send_latency_seconds`
: **説明**: ソースがイベントのチャンクを次のコンポーネントに送信するまでにかかる時間。Worker バージョン 2.16 以降で使用可能。

バッチレイテンシーを送信する
: **メトリクス**: `pipelines.source_send_batch_latency_seconds`
: **説明**: ソースがバッチ (複数のイベントチャンクを含む可能性がある) を次のコンポーネントに送信するまでにかかる時間。Worker バージョン 2.16 以降で使用可能。

ソースのラグ時間
: **メトリクス**: `pipelines.source_lag_time_seconds`
: **説明**: イベント自体のタイムスタンプと、Worker がそれを受信した時刻との差 (秒単位)。値が高い場合は、古いデータや遅延したデータがパイプラインに到着していることを示します。

### バッファ {#buffer}

これらのメトリクスを使用して、バッファのパフォーマンスを分析します。特に記載がない限り、すべてのメトリクスは 1 秒間隔で出力されます。

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "プロセッサ" %}}

### スループット {#throughput-1}

イベント入力
: **メトリクス**: `pipelines.component_received_events_total`
: **説明**: コンポーネントが受信したイベントの数。

イベント出力
: **メトリクス**: `pipelines.component_sent_events_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントの数。

イベント入力バイト数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが受信したイベントのバイトサイズ。

イベント出力バイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントのバイトサイズ。

含まれるイベント
: **メトリクス**: `pipelines.included_events_total`
: **説明**: プロセッサのフィルタクエリに一致し、処理されたイベントの数。フィルタクエリに一致しないイベントは、プロセッサをスキップして次のコンポーネントに進みます。

含まれるイベントのバイト数
: **メトリクス**: `pipelines.included_event_bytes_total`
: **説明**: プロセッサのフィルタクエリに一致し、処理されたイベントのバイトサイズ。

### エラーおよび破棄されたデータ {#errors-and-data-dropped}

エラー
: **メトリクス**: `pipelines.component_errors_total`
: **説明**: コンポーネントで発生したエラーの数。コンポーネントに応じて、このメトリクスにはエラーを説明する `error_code`、`error_type`、または `reason` タグが含まれる場合があります。

意図的にまたは意図せず破棄されたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: 破棄されたイベントの数。**注**: このメトリクスの内訳を確認するには、`intentional:true` 意図的に破棄されたイベントをタグを使用してフィルタリングするか、`intentional:false` 意図せず破棄されたイベントをタグを使用してフィルタリングします。

### パフォーマンス {#performance-1}

CPU 使用率
: **メトリクス**: `pipelines.component_cpu_usage_ns_total`
: **説明**: コンポーネントが消費した CPU 時間 (ナノ秒単位)。このメトリクスを使用して、個々のプロセッサに CPU コストを割り当てます。Linux および MacOS 用の Worker バージョン 2.18 以降で利用可能。
: **以下のログプロセッサで利用可能**:<br>- Custom Processor<br>- Dedupe<br>- Enrichment Table<br>- Grok Parser<br>- Parse JSON<br>- Parse XML<br>- Reduce<br>- OCSF へのリマップ<br>- Sensitive Data Scanner<br>- Split Array<br>- Throttle ログプロセッサ
: **以下のメトリクスプロセッサで利用可能**:<br>- Aggregate <br>- Tag Cardinality Limit メトリクス

使用率
: **メトリクス**: `pipelines.utilization`
: **説明**: コンポーネントのアクティビティ。値が `0` の場合は、コンポーネントがアイドル状態で入力を待機していることを示します。`1` に近い値は、コンポーネントがアイドル状態になることがないことを示しており、そのコンポーネントが処理トポロジーにおけるボトルネックとなり、バックプレッシャーを生じさせている可能性が高いことを意味します。これにより、イベントが破棄される可能性があります。

### バッファ {#buffer-1}

これらのメトリクスを使用して、バッファのパフォーマンスを分析します。特に記載がない限り、すべてのメトリクスは 1 秒間隔で出力されます。

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "送信先" %}}

### スループット {#throughput-2}

送信バイト数
: **メトリクス**: `pipelines.component_sent_bytes_total`
: **説明**: エンコードおよび変換後に送信先の出力に書き込まれた生のバイト数。

イベント入力
: **メトリクス**: `pipelines.component_received_events_total`
: **説明**: コンポーネントが受信したイベントの数。

イベント出力
: **メトリクス**: `pipelines.component_sent_events_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントの数。

イベント入力バイト数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが受信したイベントのバイトサイズ。

イベント出力バイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントのバイトサイズ。

### エラーおよび破棄されたデータ {#errors-and-data-dropped-1}

エラー
: **メトリクス**: `pipelines.component_errors_total`
: **説明**: コンポーネントで発生したエラーの数。コンポーネントに応じて、このメトリクスにはエラーを説明する `error_code`、`error_type`、または `reason` タグが含まれる場合があります。

意図的にまたは意図せず破棄されたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: 破棄されたイベントの数。**注**: このメトリクスの内訳を確認するには、`intentional:true` 意図的に破棄されたイベントをタグを使用してフィルタリングするか、`intentional:false` 意図せず破棄されたイベントをタグを使用してフィルタリングします。

### パフォーマンス {#performance-2}

使用率
: **メトリクス**: `pipelines.utilization`
: **説明**: コンポーネントのアクティビティ。値が `0` の場合は、コンポーネントがアイドル状態で入力を待機していることを示します。`1` に近い値は、コンポーネントがアイドル状態になることがないことを示しており、そのコンポーネントが処理トポロジーにおけるボトルネックとなり、バックプレッシャーを生じさせている可能性が高いことを意味します。これにより、イベントが破棄される可能性があります。

### バッファ {#buffer-2}

これらのメトリクスを使用して、バッファのパフォーマンスを分析します。特に記載がない限り、すべてのメトリクスは 1 秒間隔で出力されます。

{{% observability_pipelines/metrics/buffer/destinations %}}

#### 非推奨のバッファメトリクス {#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## HTTP サーバーメトリクス {#http-server-metrics}

これらのメトリクスは、Datadog Agent、HTTP/S Server、OpenTelemetry、Splunk HEC ソースなど、HTTP 経由でデータを受信するソースによって出力されます。

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
- タグを使用して、ソースタイプでフィルタリングまたはグループ化します。`component_type`

`pipelines.http_server_requests_received_total`
: **説明**: 受信した HTTP リクエストの数。
: **メトリクスタイプ**: カウント

`pipelines.http_server_responses_sent_total`
: **説明**: 送信した HTTP レスポンスの数。
: **メトリクスタイプ**: カウント

`pipelines.http_server_handler_duration_seconds`
: **説明**: HTTP リクエストの処理に費やされた時間。
: **メトリクスタイプ**: 分布

## HTTP クライアントメトリクス {#http-client-metrics}

これらのメトリクスは、以下を含む HTTP 経由でデータを送信する送信先によって出力されます。

- CrowdStrike NG-SIEM
- Datadog Logs
- Datadog Metrics
- Elasticsearch
- Google SecOps
- HTTP Client 送信先
- Microsoft Sentinel
- New Relic
- OpenSearch
- SentinelOne
- Splunk HEC

**注**: AWS ベースの送信先 (Amazon S3、Amazon OpenSearch、Amazon Security Lake など) は、これらのメトリクスを出力しません。

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
-  タグを使用して、送信先タイプでフィルタリングまたはグループ化します。`component_type`

`pipelines.http_client_requests_sent_total`
: **説明**: リクエストメソッドでタグ付けされた、送信された HTTP リクエストの数。
: **メトリクスタイプ**: カウント

`pipelines.http_client_responses_total`
: **説明**: レスポンスステータスでタグ付けされた、受信した HTTP レスポンスの数。
: **メトリクスタイプ**: カウント

`pipelines.http_client_errors_total`
: **説明**: エラーの種類でタグ付けされた、HTTP クライアントエラーの数。
: **メトリクスタイプ**: カウント

`pipelines.http_client_rtt_seconds`
: **説明**: HTTP リクエストの送信から最終的なレスポンスまたはエラーの受信までのラウンドトリップ時間 (秒単位)。
: **メトリクスタイプ**: 分布

`pipelines.http_client_response_rtt_seconds`
: **説明**: レスポンスステータスでタグ付けされた、HTTP リクエストのラウンドトリップ時間 (秒単位)。
: **メトリクスタイプ**: 分布

`pipelines.http_client_error_rtt_seconds`
: **説明**: エラーの種類でタグ付けされた、エラーとなった HTTP リクエストのラウンドトリップ時間 (秒単位)。
: **メトリクスタイプ**: 分布

## 適応型同時実行メトリクス {#adaptive-concurrency-metrics}

これらのメトリクスは、適応型同時実行コントローラーに関する情報を提供します。このコントローラーは、観測されたレスポンス時間に基づいて、送信先が許可するインフライト HTTP リクエストの数を自動的に調整します。これらは、AWS ベースの送信先を含む、HTTP 経由でデータを送信する送信先から出力されます。

- 個々のコンポーネントでフィルタリングまたはグループ化するには、`component_id` タグを使用します。
-  タグを使用して、送信先タイプでフィルタリングまたはグループ化します。`component_type`

`pipelines.active_endpoints`
: **説明**: 正常とマークされている送信先エンドポイントの数。
: **メトリクスタイプ**: ゲージ

`pipelines.adaptive_concurrency_limit`
: **説明**: この送信先への HTTP リクエストの同時実行制限。応答時間に基づいて適応型同時実行コントローラーによって自動的に調整されます。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_in_flight`
: **説明**: 送信先への実行中の HTTP リクエスト数。スロットルをかけるタイミングを決定するために、適応型同時実行制限と比較されます。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_reached_limit`
: **説明**: 前回の測定間隔中に適応型同時実行コントローラーが計算された制限に達したか (`1`)、達しなかったか (`0`)。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_back_pressure`
: **説明**: 前回の測定間隔中に適応型同時実行コントローラーがバックプレッシャーを検出したか (`1`)、検出しなかったか (`0`)。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_averaged_rtt`
: **説明**: この送信先への HTTP リクエストの平滑化された平均往復時間 (RTT、秒単位)。適応型同時実行計算のベースラインとして使用されます。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_observed_rtt`
: **説明**: この送信先への直近の HTTP リクエストで観測された往復時間 (RTT、秒単位)。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_past_rtt_mean`
: **説明**: この送信先への HTTP リクエストの過去の平均 RTT (秒単位) であり、適応型同時実行調整の長期的なベースラインとして使用されます。
: **メトリクスタイプ**: 分布

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/dashboards/
[2]: /ja/notebooks/
[3]: /ja/getting_started/monitors/
[4]: /ja/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/ja/account_management/billing/usage_metrics/