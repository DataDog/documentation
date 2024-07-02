---
title: Metrics Types
aliases:
    - /developers/metrics/counts/
    - /developers/metrics/distributions/
    - /developers/metrics/gauges/
    - /developers/metrics/histograms/
    - /developers/metrics/rates/
    - /developers/metrics/sets/
    - /developers/metrics_type/
    - /developers/metrics/metrics_type/
    - /developers/metrics/types/
further_reading:
    - link: developers/dogstatsd
      tag: Documentation
      text: Learn more about DogStatsD
    - link: developers/libraries
      tag: Documentation
      text: Official and Community created API and DogStatsD client libraries
algolia:
  tags: [metric types]
---

## 概要

Datadog に送信される各メトリクスにはタイプが必要です。メトリクスのタイプは、クエリ時のメトリクス値の表示方法、および追加の[修飾子][1]および[関数][2]を使用した Datadog 内の関連するグラフ化の可能性に影響します。メトリクスのタイプは、[メトリクスの概要ページ][3]の特定のメトリクスの詳細サイドパネルに表示されます。

**注**: この詳細サイドパネルでメトリクスタイプを変更すると、既存のすべての視覚化およびモニターのメトリクスの動作が変更され、履歴データが無意味なものになる可能性があります。

メトリクスには、次の送信タイプを指定できます。

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

次の各種メトリクス送信タイプは、Datadog ウェブアプリケーション内にある 4 つのアプリ内メトリクスタイプにマッピングされます。

- COUNT
- RATE
- GAUGE
- DISTRIBUTION

**注**: タイプなしでメトリクスを Datadog に送信すると、メトリクスタイプは Datadog 内で `Not Assigned` と表示されます。`Not Assigned` メトリクスタイプは、最初のメトリクスタイプが送信されるまで、別のアプリ内タイプに変更できません。

## 送信とアプリ内タイプ

メトリクスは、主に次の 3 つの方法で Datadog に送信されます。

- [Agent チェック][5]
- [DogStatsD][6]
- [Datadog の HTTP API][7]

Datadog が受信するデータの大部分は、Agent チェックまたは DogStatsD を介して、Agent によって送信されます。これらの送信方法の場合、メトリクスのタイプにより、[フラッシュ時間間隔][8]で Agent で収集された複数の値の集計方法が決まります。Agent は、これらの値を組み合わせて、その間隔の単一の代表的なメトリクス値にします。この組み合わせた値は、単一のタイムスタンプとともに Datadog に保存されます。

Datadog API に直接送信されたデータは、ディストリビューションメトリクスを除き、Datadog によって集計されません。Datadog に送信された生の値はそのまま保存されます。

[送信タイプと Datadog アプリ内タイプ](#submission-types-and-datadog-in-app-types)セクションを読んで、各種メトリクス送信タイプが対応するアプリ内タイプにどのようにマッピングされるかを確認してください。

## メトリクスタイプ

### 定義

{{< tabs >}}
{{% tab "COUNT" %}}

COUNT メトリクス送信タイプは、ある時間間隔のイベント発生の合計数を表します。COUNT を使用して、データベースへの接続の合計数またはエンドポイントへのリクエストの合計数を追跡できます。このイベントの数は、時間の経過とともに累積または減少する可能性があり、単調に増加することはありません。

**注**: この COUNT とは異なり、RATE は定義された時間間隔で正規化される 1 秒あたりのイベントの数を表します。

{{% /tab %}}
{{% tab "RATE" %}}

RATE メトリクス送信タイプは、ある時間間隔の 1 秒あたりのイベント発生の合計数を表します。RATE を使用して、データベースへの接続頻度やエンドポイントへのリクエストフローなど、何かが発生している頻度を追跡できます。

**注**: この RATE とは異なり、COUNT メトリクス送信タイプは特定の時間間隔内のイベント発生の合計数を表します。

{{% /tab %}}
{{% tab "GAUGE" %}}

GAUGE メトリクス送信タイプは、ある時間間隔のイベントのスナップショットを表します。この代表的なスナップショット値は、時間間隔中に Agent に送信された最後の値です。GAUGE を使用して、使用可能なディスク容量や使用中のメモリなど、継続的にレポートする何かの測定を行うことができます。

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

HISTOGRAM メトリクス送信タイプは、ある時間間隔の Agent 側で計算された一連の値の統計分布を表します。Datadog の HISTOGRAM メトリクスタイプは、StatsD タイミングメトリクスタイプの拡張機能です。Agent は、定義された時間間隔で送信される値を集計し、一連の値を表すさまざまなメトリクスを生成します。

ある時間間隔内に HISTOGRAM メトリクス `<メトリクス名>` に対して `X` 個の値を送信した場合、次のメトリクスが Agent によってデフォルトで生成されます。

`<METRIC_NAME>.avg`
: 時間間隔内の `X` 個の値の平均値を表します。<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.count`
: 間隔内に送信された値の数 (つまり `X`) を表します。Agent はその数を RATE として送信することで、アプリ内で値 `X/interval` として表示します。 <br>
**Datadog In-App Type**: RATE

`<METRIC_NAME>.median`
: 時間間隔内の `X` 個の値の中央値を表します。<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.95percentile` 
: 時間間隔内の `X` 個の値の 95 パーセンタイルを表します。<br>
**Datadog In-App Type**: GAUGE

`<METRIC_NAME>.max`
: 時間間隔内に送信された `X` 個の値の最大値を表します。<br>
**Datadog In-App Type**: GAUGE

**注**:

- どの集計を Datadog に送信するかは、[`datadog.yaml` 構成ファイル][1]の `histogram_aggregates` パラメーターで構成します。デフォルトでは、`max`、`median`、`avg`、`count` の集計だけが Datadog に送信されます。`sum` および `min` も利用できます。
- どのパーセンタイル集計を Datadog に送信するかは、[`datadog.yaml` 構成ファイル][2]の `histogram_percentiles` パラメーターで構成します。デフォルトでは、`95percentile` のパーセンタイルだけが Datadog に送信されます。


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

DISTRIBUTION メトリクス送信タイプは、ある時間間隔の分散インフラストラクチャー全体にわたって計算された一連の値のグローバルな統計分布を表します。DISTRIBUTION を使用して、基底のホストから独立して、サービスなどの論理オブジェクトをインスツルメントすることができます。

Agent で特定の時間間隔内の集計を行う HISTOGRAM メトリクスタイプと異なり、DISTRIBUTION メトリクスは、時間間隔内に収集されたすべての未加工データを Datadog に送信します。サーバー側で集計を行います。基になるデータ構造は集計されておらず、未加工データを表すため、ディストリビューションは次の 2 つの主要な機能を提供します。

- パーセンタイル集計の計算
- タグ付けのカスタマイズ

ある時間間隔内に DISTRIBUTION メトリクス `<メトリクス名>` に対して `X` 個の値を送信した場合、デフォルトで次の集計をクエリに利用できます。

`avg:<METRIC_NAME>`
: 時間間隔内の `X` 個の値の平均値を表します。<br>
**Datadog In-App Type**: GAUGE

`count:<METRIC_NAME>`
: 時間間隔内に送信されたポイントの数 (つまり `X`) を表します。Agent はその数を COUNT として送信します。<br>
**Datadog In-App Type**: COUNT

`max:<METRIC_NAME>`
: 時間間隔内に送信された `X` 個の値の最大値を表します。<br>
**Datadog In-App Type**: GAUGE

`min:<METRIC_NAME>`
: 時間間隔内に送信された `X` 個の値の最小値を表します。<br>
**Datadog In-App Type**: GAUGE

`sum:<METRIC_NAME>`
: 時間間隔内に送信された `X` 個の値すべての合計を表します。<br>
**Datadog In-App Type**: COUNT

{{% /tab %}}
{{< /tabs >}}

### 例

{{< tabs >}}
{{% tab "COUNT" %}}

Suppose you are submitting a COUNT metric, `notifications.sent`, from a single host running the Datadog Agent. This host emits the following values in a flush time interval: `[1,1,1,2,2,2,3,3]`.

Agent は、ある時間間隔で受信したすべての値を追加します。その後、合計数 (この場合は `15`) を COUNT メトリクスの値として送信します。

{{% /tab %}}
{{% tab "RATE" %}}

Datadog Agent を実行している単一のホストから RATE メトリクス、`queue_messages.rate` を送信するとします。このホストは、フラッシュ時間間隔で次の値を出力します: `[1,1,1,2,2,2,3,3]`。

Agent は、ある時間間隔で受信したすべての値を追加します。その後、 この時間間隔の合計秒数で割った合計数を送信します。この場合、フラッシュ間隔が 10 秒の場合、RATE メトリクスの値として送信される値は `1.5` になります。

{{% /tab %}}
{{% tab "GAUGE" %}}

Datadog Agent を実行している単一のホストから GAUGE メトリクス、`temperature` を送信するとします。このホストは、フラッシュ時間間隔で次の値を出力します: `[71,71,71,71,71,71,71.5]`。

Agent は、最後に報告された数値 (この場合は `71.5`) を GAUGE メトリクスの値として送信します。

{{% /tab %}}
{{% tab "HISTOGRAM" %}}

たとえば、フラッシュ時間間隔で値 `[1,1,1,2,2,2,3,3]` を報告するウェブサーバーから HISTOGRAM メトリクス `request.response_time.histogram` を送信するとします。デフォルトでは、Agent は、この時間間隔のこれらの値の統計分布を表す以下のメトリクスを Datadog に送信します。

| メトリクス名                                    | 値  | Datadog アプリ内タイプ |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

2 つのウェブサーバー `webserver:web_1` と `webserver:web_2` から DISTRIBUTION メトリクス、`request.response_time.distribution` を送信するとします。特定のフラッシュ時間間隔で、`webserver:web_1` が値 `[1,1,1,2,2,2,3,3]` を持つメトリクスを報告し、`webserver:web_2` が値 `[1,1,2]` を持つ同じメトリクスを報告するとします。この時間間隔で、次の 5 つの集計は、両方のウェブサーバーから収集されたすべての値のグローバルな統計分布を表します。

| メトリクス名                                | 値  | Datadog アプリ内タイプ |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### パーセンタイル集計の計算

GAUGE、HISTOGRAM などのメトリクスタイプと同様に、DISTRIBUTION メトリクスタイプでは `count`、`min`、`max`、`sum`、`avg` の集計を利用できます。ディストリビューションメトリクスは、まず他のメトリクスと同じ方法で (コードで設定されたカスタムタグを使用して) タグ付けられます。

パーセンタイル集計（p50`、`p75`、`p90`、`p95`、`p99`）をディストリビューションメトリクスに追加できます。アプリ内のディストリビューションメトリクスにパーセンタイル集計を追加する場合、次の 5 つの追加集計をクエリに使用できます。

| メトリクス名                              | 値 | Datadog アプリ内タイプ |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

つまり、特定の時間間隔でパーセンタイル集計を指定したディストリビューションメトリクスであれば、`count`、`sum`、`min`、`max`、`avg`、`p50`、`p75`、`p90`、`p95`、`p99` の 10 個の集計を使用できます。

#### タグ付けのカスタマイズ

この機能を使用すると、ホストレベルの粒度を必要としない場合に、メトリクスのタグ付けを制御できます。[Metrics without Limits™][1] の詳細についてはこちらをご覧ください。

**注**: この機能では、`!` によるタグの除外を使用できません。


[1]: /metrics/metrics-without-limits/
{{% /tab %}}
{{< /tabs >}}

### 送信

{{< tabs >}}
{{% tab "COUNT" %}}

次のソースのいずれかから COUNT タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python)           | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent チェック][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent チェック][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**注**: DogStatsD を介して COUNT メトリクスタイプを送信する場合、メトリクスは異なる Agent 間の関連する比較を確保するためにアプリ内に RATE として表示されます。その結果、StatsD カウントは Datadog 内に 10 進数値で表示される場合があります（1 秒あたりの単位を報告するために時間間隔で正規化されるため）。


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /api/v1/metrics/#submit-metrics
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "RATE" %}}

次のソースのいずれかから RATE タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python)          | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Agent チェック][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**注**: DogStatsD を介して RATE メトリクスタイプを送信する場合、メトリクスは異なる Agent 間の関連する比較を確保するためにアプリ内に GAUGE として表示されます。


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /api/v1/metrics/#submit-metrics
{{% /tab %}}
{{% tab "GAUGE" %}}

次のソースのいずれかから GAUGE タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python)           | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent チェック][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /api/v1/metrics/#submit-metrics
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

次のソースのいずれかから HISTOGRAM タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python) | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Agent チェック][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE、RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE、RATE          |

TIMER メトリクスを Datadog Agent に送信することは、DogStatsD 内で HISTOGRAM メトリクスタイプを送信することと同等です（標準 StatsD のタイマーと混同しないでください）。[DogStatsD `TIMER`][3] は期間データのみを表します。たとえば、コードのセクションの実行にかかる時間や、ページを完全にレンダリングするのにかかる時間などです。


[1]: /metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

次のソースから DISTRIBUTION タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python) | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE、COUNT         |


[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
{{% /tab %}}
{{< /tabs >}}

## 送信タイプと Datadog アプリ内タイプ

以下に、利用可能なすべてのメトリクス送信のソースと方法の概要を示します。この表は、対応するメトリクス送信タイプとアプリ内タイプ間のマッピングを表しています。

| 送信元 | 送信方法 (Python)           | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Agent チェック][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Agent チェック][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Agent チェック][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Agent チェック][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE、RATE          |
| [Agent チェック][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE、COUNT         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE、RATE          |
## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/type_modifiers/
[2]: /dashboards/functions/
[3]: /metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /metrics/custom_metrics/agent_metrics_submission/
[6]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /api/v1/metrics/#submit-metrics
[8]: /developers/dogstatsd/#how-it-works
[9]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[10]: /metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[12]: /metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[13]: /metrics/custom_metrics/agent_metrics_submission/?tab=rate
[14]: /metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
[15]: /metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[16]: /metrics/custom_metrics/dogstatsd_metrics_submission/#count
[17]: /metrics/custom_metrics/dogstatsd_metrics_submission/#set
[18]: /metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
