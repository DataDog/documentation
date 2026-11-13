---
aliases:
- /ja/observability_pipelines/monitoring/metrics/
description: ダッシュボード、ノートブック、モニターの構築に利用可能な Observability Pipelines のメトリクスを確認してください。
disable_toc: false
further_reading:
- link: /metrics/summary/
  tag: ドキュメント
  text: Metrics Summary について詳しく学ぶ
- link: /metrics/explorer/
  tag: ドキュメント
  text: Metrics Explorer を使用してメトリクスを探索および分析する
- link: /getting_started/dashboards/
  tag: ドキュメント
  text: ダッシュボードの使用を開始する
- link: /getting_started/monitors/
  tag: ドキュメント
  text: モニターの使用を開始する
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して AI アプリから ClickHouse と Datadog に OTel データをルーティングする
title: Pipelines 使用量メトリクス
---
## 概要{#overview}

本書では、Observability Pipelines で利用可能なメトリクスの一部を一覧表示します。以下が可能です。

- これらのメトリクスを使用して、独自の [ダッシュボード][1]、[ノートブック][2]、[モニター][3]を作成する。
- [Metrics Summary][5] を使用して、メトリクスで利用可能なメタデータとタグを確認する。さらに、どのダッシュボード、ノートブック、モニター、SLO がそれらのメトリクスを使用しているかも確認できます。

タグを使用して、特定のパイプライン、Worker、コンポーネントごとにメトリクスをグループ化する方法については、[タグの概要][4]を参照してください。

すべてのメトリクスには、次のタグが付けられています。

`pipeline_id`
: パイプラインの UUID。

`worker_uuid`
: メトリクスを出力する Worker の UUID。

`op_worker_version`
: メトリクスを出力する Worker のバージョン。

`rc_version`
: パイプラインが更新されるたびにインクリメントされる構成バージョン番号。

`pipeline_name`
: 最後にデプロイまたは更新された時点でのパイプライン名。Worker バージョン 2.18 以降で利用可能です。

**注**:
- すべての Worker は、自身のテレメトリ (メトリクスとログ) を収集して Datadog に送信する内部パイプラインも実行します。この内部パイプラインのコンポーネントには、値がアンダースコア (`_`) で始まる `component_id` タグが付いています。クエリからこれらのメトリクスを除外するには、`!component_id:_*` を使用します。
- `_total` で終わるメトリクスは各時間間隔のカウントを報告するため、その生の値は単調に増加しません。

## 推定使用量メトリクス{#estimated-usage-metric}

Observability Pipelines の取り込みバイト数
: **メトリクス**: `datadog.estimated_usage.observability_pipelines.ingested_bytes`
: **説明**:  Observability Pipelines によって取り込まれたデータの量。詳細については、[推定使用量メトリクス][6]を参照してください。

## ホストメトリクス{#host-metrics}

これらのメトリクスは、Observability Pipelines Worker を実行しているホストに関する情報を提供します。

使用可能メモリ
: **メトリクス**: `pipelines.host.memory_available_bytes`
: **説明:** ホスト上で新しい割り当てに使用できるメモリのバイト数。

受信バイト数
: **メトリクス**: `pipelines.host.network_receive_bytes_total`
: **説明:** ホストがすべてのインターフェイスで受信したバイト数。インターフェイスでフィルタリングするには `device` タグを使用します (例: `device:eth0`)。

送信バイト数
: **メトリクス**: `pipelines.host.network_transmit_bytes_total`
: **説明:** ホストがすべてのインターフェイスで送信したバイト数。インターフェイスでフィルタリングするには `device` タグを使用します。

CPU 時間
: **メトリクス**: `pipelines.host.cpu_seconds_total`
: **説明:** ホストによって消費された合計 CPU 時間。モード (ユーザー、システム、アイドルなど) および CPU コアごとに分類されます。

ディスク読み書きバイト数
: **メトリクス**: `pipelines.host.disk_read_bytes_total`、`pipelines.host.disk_written_bytes_total`
: **説明:** ホスト上のすべてのディスクに対して読み書きされたバイト数。

ホスト稼働時間
: **メトリクス**: `pipelines.host.uptime`
: **説明:** ホストが起動してからの経過時間 (秒単位)。

ロード平均
: **メトリクス**: `pipelines.host.load1`、`pipelines.host.load5`、`pipelines.host.load15`
: **説明:** 過去 1 分、5 分、15 分間のホストのシステムロード平均。ロード平均は、実行中または実行待ちのプロセス数であり、Linux の場合は割り込み不可能な I/O でブロックされているプロセスも含まれます。ロード平均の値を `pipelines.host.logical_cpus` 値と比較:  ロード平均の値が CPU 数に近い場合はフル稼働状態であることを示し、それを超える値はホストが過負荷状態であることを示します。Windows で実行されている Worker では出力されません。

論理 CPU 数
: **メトリクス**: `pipelines.host.logical_cpus`
: **説明:** ホストで使用可能な論理 CPU スレッド (ハードウェアスレッド) の数。

合計メモリ
: **メトリクス**: `pipelines.host.memory_total_bytes`
: **説明:** ホストに搭載されている物理メモリ (RAM) の合計。

## プロセス メトリクス{#process-metrics}

これらのメトリクスは、Observability Pipelines Worker プロセスに関する情報を提供します。

割り当てられた CPU コア数
: **メトリクス**: `pipelines.cpu_max_cores`
: **説明:** コンテナまたは cgroup の制限によって報告される、Worker に割り当てられた CPU コアの数。

CPU の使用量
: **メトリクス**: `pipelines.cpu_usage_seconds_total`
: **説明:** Worker プロセスによって消費された CPU 時間 (秒単位、ユーザー空間およびシステム空間)。そのメトリクスの 1 秒あたりの割合は、Worker によって使用される CPU の割合を示します。

データディレクトリの利用可能バイト数
: **メトリクス**: `pipelines.data_dir_available_bytes`
: **説明:** Worker がバッファおよび状態データを保存するファイルシステムの残り空きストレージ容量。ディスクバッファの監視に役立ちます。

データディレクトリの容量 (バイト単位)
: **メトリクス**: `pipelines.data_dir_capacity_bytes`
: **説明:** Worker がバッファおよび状態データを保存するファイルシステムの合計ストレージ容量。

メモリ制限
: **メトリクス**: `pipelines.memory_max_bytes`
: **説明:** コンテナまたは cgroup の制限によって設定された、Worker が使用できる最大メモリ。

メモリ使用量
: **メトリクス**: `pipelines.resident_memory_used_bytes`
: **説明:** Worker プロセスによって使用されている RSS メモリの量 (バイト単位)。

Worker の稼働時間
: **メトリクス**: `pipelines.uptime_seconds`
: **説明:** Worker プロセスが開始されてからの経過時間 (秒単位)。

## Worker ライフサイクルメトリクス{#worker-lifecycle-metrics}

これらのメトリクスは、Observability Pipelines Worker のライフサイクルイベントを追跡します。

Worker の再読み込み
: **メトリクス**: `pipelines.reloaded_total`
: **説明:** 構成変更後など、Worker インスタンスが再読み込みされた回数。

## コンポーネントメトリクス{#component-metrics}

これらのメトリクスはソース、プロセッサー、送信先で利用できます。

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。手順については、[コンポーネント ID の検索][7]を参照してください。
- `component_type` タグを使用して、ソース、プロセッサー、または送信先のタイプ (Quota プロセッサーの `quota` など) でフィルタリングまたはグループ化します。
- `component_kind` タグを使用して、`source`、`transform` (プロセッサー)、または`sink` (送信先) でフィルタリングまたはグループ化します。

{{< tabs >}}
{{% tab "ソース" %}}

### スループット{#throughput}

受信バイト数
: **メトリクス**: `pipelines.component_received_bytes_total`
: **説明**: デコードや変換が行われる前の、ソースの入力から読み取られた生のバイト数です。

入力イベント数
: **メトリクス**: `pipelines.component_received_events_total`
: **説明**: コンポーネントが受信したイベントの数です。

出力イベント数
: **メトリクス**: `pipelines.component_sent_events_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントの数です。

入力イベントバイト数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが受信したイベントのバイトサイズです。

出力イベントバイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントのバイトサイズです。

### エラー、破棄データ、タイムアウト{#errors-data-dropped-and-timed-outs}

エラー
: **メトリクス**: `pipelines.component_errors_total`
: **説明**: コンポーネントで発生したエラーの数。コンポーネントによっては、このメトリクスにはエラーを説明する `error_code`、`error_type` または `reason` タグが含まれる場合があります。

意図的または意図せずに破棄されたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: 破棄されたイベントの数。**注**: このメトリクスを内訳表示するには、`intentional:true` タグを使用して意図的に破棄されたイベントをフィルタリングするか、`intentional:false` タグを使用して意図的に破棄されていないイベントをフィルタリングします。

タイムアウトしたイベント
: **メトリクス**: `pipelines.component_timed_out_events_total`
: **説明**: 最初のプロセッサーへの送信を 5 秒以上待機し、HTTP 503 エラーが発生したイベントの数。イベントの配信がブロックされた場合に発生する可能性があります。
: **利用可能な対象**: Datadog Agent など、タイムアウトが構成されている HTTP ベースのソース。

タイムアウトしたリクエスト
: **メトリクス**: `pipelines.component_timed_out_requests_total`
: **説明**: HTTP リクエストを使用してバッチで Worker にイベントを送信されるソースにおいて、タイムアウトしたリクエストの数。
: **利用可能な対象**: Datadog Agent など、タイムアウトが構成されている HTTP ベースのソース。

### パフォーマンス{#performance}

送信レイテンシー
: **メトリクス**: `pipelines.source_send_latency_seconds`
: **説明**: ソースがイベントのチャンクを次のコンポーネントに送信するまでにかかる時間。Worker バージョン 2.16 以降で利用可能です。

送信バッチレイテンシー
: **メトリクス**: `pipelines.source_send_batch_latency_seconds`
: **説明**: ソースがバッチ (複数のイベントチャンクを含む場合がある) を次のコンポーネントに送信するのにかかる時間。Worker バージョン 2.16 以降で利用可能です。

ソースのラグ時間
: **メトリクス**: `pipelines.source_lag_time_seconds`
: **説明**: イベント自体のタイムスタンプと、Worker がそれを受信した時刻との差 (秒単位)。値が大きい場合は、古いデータや遅延したデータがパイプラインに到着していることを示します。

### バッファ{#buffer}

これらのメトリクスを使用して、バッファのパフォーマンスを分析します。特に記載がない限り、すべてのメトリクスは 1 秒間隔で出力されます。

{{% observability_pipelines/metrics/buffer/sources %}}

{{% /tab %}}
{{% tab "プロセッサー" %}}

### スループット{#throughput-1}

入力イベント数
: **メトリクス**: `pipelines.component_received_events_total`
: **説明**: コンポーネントが受信したイベントの数です。

出力イベント数
: **メトリクス**: `pipelines.component_sent_events_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントの数です。

入力イベントバイト数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが受信したイベントのバイトサイズです。

出力イベントバイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントのバイトサイズです。

含まれるイベント数
: **メトリクス**: `pipelines.included_events_total`
: ****: プロセッサーのフィルタークエリに一致し、処理されたイベントの数です。フィルタークエリに一致しないイベントはプロセッサーをスキップし、次のコンポーネントに進みます。

含まれるイベントのバイト数
: **メトリクス**: `pipelines.included_event_bytes_total`
****プロセッサーのフィルタークエリに一致し、処理されたイベントのバイトサイズです。

### エラーおよび破棄データ{#errors-and-data-dropped}

エラー
: **メトリクス**: `pipelines.component_errors_total`
**説明**: コンポーネントで発生したエラーの数です。コンポーネントによっては、このメトリクスにはエラーを説明する `error_code`、`error_type` または `reason` タグが含まれる場合があります。

意図的または意図せずに破棄されたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: 破棄されたイベントの数。**注**: このメトリクスを内訳表示するには、`intentional:true` タグを使用して意図的に破棄されたイベントをフィルタリングするか、`intentional:false` タグを使用して意図的に破棄されていないイベントをフィルタリングします。

### パフォーマンス{#performance-1}

CPU の使用量
: **メトリクス**: `pipelines.component_cpu_usage_ns_total`
**説明**: コンポーネントによって消費された CPU 時間 (ナノ秒単位)。このメトリクスを使用して、個々のプロセッサーに CPU コストを割り当てます。Linux および MacOS 用の Worker バージョン 2.18 以降で利用可能です。
: **以下のログプロセッサーで利用可能です**:<br>- カスタムプロセッサー<br>- 重複排除<br>- エンリッチメントテーブル<br>- Grok パーサー<br>- JSON 解析<br>- XML 解析<br>- リデュース<br>- OCSF へのリマップ<br>- Sensitive Data Scanner <br>- 配列分割<br>- スロットルログプロセッサー
: **以下のメトリクスプロセッサーで利用可能です**:<br>- 集約 <br>- タグカーディナリティ制限メトリクス

利用率
: **メトリクス**: `pipelines.utilization`
: **説明**: コンポーネントのアクティビティです。値が `0` の場合は、コンポーネントがアイドル状態で入力を待機していることを示します。値が `1` に近い場合は、コンポーネントがアイドル状態になることがないことを示しており、そのコンポーネントが処理トポロジ―のボトルネックとなり、バックプレッシャーを生じさせている可能性が高いことを意味します。これにより、イベントが破棄される可能性があります。

### バッファ{#buffer-1}

これらのメトリクスを使用して、バッファのパフォーマンスを分析します。特に記載がない限り、すべてのメトリクスは 1 秒間隔で出力されます。

{{% observability_pipelines/metrics/buffer/processors %}}

{{% /tab %}}
{{% tab "送信先" %}}

### スループット{#throughput-2}

送信バイト数
: **メトリクス**: `pipelines.component_sent_bytes_total`
: **説明**: エンコードおよび変換後の、送信先の出力に書き込まれた生のバイト数です。

入力イベント数
: **メトリクス**: `pipelines.component_received_events_total`
: **説明**: コンポーネントが受信したイベントの数です。

出力イベント数
: **メトリクス**: `pipelines.component_sent_events_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントの数です。

入力イベントバイト数
: **メトリクス**: `pipelines.component_received_event_bytes_total`
: **説明**: コンポーネントが受信したイベントのバイトサイズです。

出力イベントバイト数
: **メトリクス**: `pipelines.component_sent_event_bytes_total`
: **説明**: コンポーネントがダウンストリームに送信するイベントのバイトサイズです。

### エラーおよび破棄データ{#errors-and-data-dropped-1}

エラー
: **メトリクス**: `pipelines.component_errors_total`
**説明**: コンポーネントで発生したエラーの数です。コンポーネントによっては、このメトリクスにはエラーを説明する `error_code`、`error_type` または `reason` タグが含まれる場合があります。

意図的または意図せずに破棄されたデータ
: **メトリクス**: `pipelines.component_discarded_events_total`
: **説明**: 破棄されたイベントの数。**注**: このメトリクスを内訳表示するには、`intentional:true` タグを使用して意図的に破棄されたイベントをフィルタリングするか、`intentional:false` タグを使用して意図的に破棄されていないイベントをフィルタリングします。

### パフォーマンス{#performance-2}

利用率
: **メトリクス**: `pipelines.utilization`
: **説明**: コンポーネントのアクティビティです。値が `0` の場合は、コンポーネントがアイドル状態で入力を待機していることを示します。値が `1` に近い場合は、コンポーネントがアイドル状態になることがないことを示しており、そのコンポーネントが処理トポロジ―のボトルネックとなり、バックプレッシャーを生じさせている可能性が高いことを意味します。これにより、イベントが破棄される可能性があります。

### バッファ{#buffer-2}

これらのメトリクスを使用して、バッファのパフォーマンスを分析します。特に記載がない限り、すべてのメトリクスは 1 秒間隔で出力されます。

{{% observability_pipelines/metrics/buffer/destinations %}}

#### 非推奨のバッファメトリクス{#deprecated-buffer-metrics}

{{% observability_pipelines/metrics/buffer/deprecated_destination_metrics %}}

{{% /tab %}}
{{< /tabs >}}

## HTTP サーバーメトリクス{#http-server-metrics}

これらのメトリクスは、Datadog Agent、HTTP/S サーバー、OpenTelemetry、Splunk HEC ソースなど、HTTP 経由でデータを受信するソースによって出力されます。

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- ソースタイプでフィルタリングまたはグループ化するには、`component_type` タグを使用してください。

`pipelines.http_server_requests_received_total`
: **説明**: 受信した HTTP リクエストの数。
: **メトリクスタイプ**: カウント

`pipelines.http_server_responses_sent_total`
: **説明**: 送信された HTTP レスポンスの数。
: **メトリクスタイプ**: カウント

`pipelines.http_server_handler_duration_seconds`
: **説明**: HTTP リクエストの処理に費やされた時間。
: **メトリクスタイプ**: 分布

## HTTP クライアントメトリクス{#http-client-metrics}

これらのメトリクスは、HTTP 経由でデータを送信する以下の送信先から出力されます。

- CrowdStrike NG-SIEM
- Datadog Logs
- Datadog Metrics
- Elasticsearch
- Google SecOps
- HTTP クライアント送信先
- Microsoft Sentinel
- New Relic
- OpenSearch
- SentinelOne
- Splunk HEC

**注**: AWS ベースの送信先 (Amazon S3、Amazon OpenSearch、Amazon Security Lake など) は、これらのメトリクスを出力しません。

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- `component_type` タグを使用して、送信先タイプでフィルタリングまたはグループ化します。

`pipelines.http_client_requests_sent_total`
: **説明**: 送信された HTTP リクエストの数。リクエストメソッドでタグ付けされます。
: **メトリクスタイプ**: カウント

`pipelines.http_client_responses_total`
: **説明**: 受信した HTTP レスポンスの数。レスポンスステータスでタグ付けされます。
: **メトリクスタイプ**: カウント

`pipelines.http_client_errors_total`
: **説明**: HTTP クライアントエラーの数。エラーの種類でタグ付けされます。
: **メトリクスタイプ**: カウント

`pipelines.http_client_rtt_seconds`
: **説明**: HTTP リクエストのラウンドトリップ時間 (秒単位)。リクエストが送信されてから、最終的なレスポンスまたはエラーが受信されるまでの時間。
: **メトリクスタイプ**: 分布

`pipelines.http_client_response_rtt_seconds`
: **説明**: HTTP リクエストのラウンドトリップ時間 (秒単位)。レスポンスステータスでタグ付けされます。
: **メトリクスタイプ**: 分布

`pipelines.http_client_error_rtt_seconds`
: **説明**: エラーが発生した HTTP リクエストのラウンドトリップ時間 (秒単位)。エラーの種類でタグ付けされます。
: **メトリクスタイプ**: 分布

## 適応型同時実行メトリクス{#adaptive-concurrency-metrics}

これらのメトリクスは、適応型同時実行コントローラーに関する情報を提供します。このコントローラーは、観測された応答時間に基づいて、送信先が許可するインフライト HTTP リクエストの数を自動的に調整します。これらは、AWS ベースの送信先を含め、HTTP 経由でデータを送信する送信先によって出力されます。

- `component_id` タグを使用して、個々のコンポーネントでフィルタリングまたはグループ化します。
- `component_type` タグを使用して、送信先タイプでフィルタリングまたはグループ化します。

`pipelines.active_endpoints`
: **説明**: 正常とマークされている送信先エンドポイントの数。
: **メトリクスタイプ**: ゲージ

`pipelines.adaptive_concurrency_limit`
: **説明**: この送信先への HTTP リクエストの同時実行限度。応答時間に基づいて適応型同時実行コントローラーによって自動的に調整されます。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_in_flight`
: **説明**: 送信先へのインフライト HTTP リクエスト数。適応型同時実行限度と比較して、スロットリングのタイミングを決定します。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_reached_limit`
: **説明**: 前回の測定間隔中に、適応型同時実行コントローラーが計算された限度に達した (`1`) か達しなかった (`0`) か。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_back_pressure`
: **説明**: 前回の測定間隔中に、適応型同時実行コントローラーがバックプレッシャーを検出した (`1`) か検出しなかった (`0`) か。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_averaged_rtt`
: **説明**: この送信先への HTTP リクエストの平滑化された平均ラウンドトリップ時間 (RTT) (秒単位)。適応型同時実行計算のベースラインとして使用されます。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_observed_rtt`
: **説明**: この送信先への直近の HTTP リクエストで観測されたラウンドトリップ時間 (RTT) (秒単位)。
: **メトリクスタイプ**: 分布

`pipelines.adaptive_concurrency_past_rtt_mean`
: **説明**: この送信先への HTTP リクエストの過去の平均 RTT (秒単位)。適応型同時実行調整の長期的なベースラインとして使用されます。
: **メトリクスタイプ**: 分布

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/getting_started/dashboards/
[2]: /ja/notebooks/
[3]: /ja/getting_started/monitors/
[4]: /ja/getting_started/tagging/
[5]: https://app.datadoghq.com/metric/summary
[6]: https://docs.datadoghq.com/ja/account_management/billing/usage_metrics/
[7]: /ja/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#find-the-component-id