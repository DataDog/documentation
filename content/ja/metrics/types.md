---
algolia:
  tags:
  - metric types
aliases:
- /ja/developers/metrics/counts/
- /ja/developers/metrics/distributions/
- /ja/developers/metrics/gauges/
- /ja/developers/metrics/histograms/
- /ja/developers/metrics/rates/
- /ja/developers/metrics/sets/
- /ja/developers/metrics_type/
- /ja/developers/metrics/metrics_type/
- /ja/developers/metrics/types/
further_reading:
- link: extend/dogstatsd
  tag: ドキュメント
  text: DogStatsD について
- link: /metrics/units
  tag: ドキュメント
  text: メトリクスのユニット
- link: extend/libraries
  tag: ドキュメント
  text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
title: メトリクスタイプ
---
## 概要 {#overview}

Datadogに送信される各メトリクスには、タイプが必要です。メトリクスのタイプは、クエリ時にメトリクス値が表示される方法に影響します。さらに、Datadog 内で追加の[修飾子][1]や[関数][2]を使用して関連グラフを作成する可能性にも影響を与えます。メトリクスのタイプは、[メトリクス概要ページ][3]の該当メトリクスの詳細サイドパネルに表示されます。

**注**: この詳細サイドパネルでメトリクスタイプを変更すると、既存のすべての視覚化およびモニターのメトリクスの動作が変更され、履歴データが無意味なものになる可能性があります。

メトリクスには、次の送信タイプを指定できます。

- [COUNT](?tab=count#metric-types)
- [RATE](?tab=rate#metric-types)
- [GAUGE](?tab=gauge#metric-types)
- [SET][4]
- [HISTOGRAM](?tab=histogram#metric-types)
- [DISTRIBUTION](?tab=distribution#metric-types)

次の各種メトリクス送信タイプは、Datadog ウェブアプリケーション内にある 4 つのアプリ内メトリクスタイプにマップされます。

- COUNT
- RATE
- GAUGE
- DISTRIBUTION

**注**: タイプなしで Datadog にメトリクスを送信すると、メトリクスタイプは Datadog 内で `Not Assigned` として表示されます。`Not Assigned` メトリクスタイプは、初期メトリクスタイプが送信されるまで、他のアプリ内タイプに変更できません。

## 送信とアプリ内タイプ {#submission-vs-in-app-type}

メトリクスは、主に次の 3 つの方法で Datadog に送信されます。

- [Agent チェック][5]
- [DogStatsD][6]
- [Datadog の HTTP API][7]

Datadog が受信するデータの大部分は、Agent から Agent チェックまたは DogStatsD を通じて送信されます。これらの送信方法では、[フラッシュ時間間隔][8]内で 1 つの Agent について収集される複数値の集計方法がメトリクスのタイプによって決まります。Agent は、これらの値を結合し、その間隔の単一の代表メトリクス値にします。結合後の値が、単一のタイムスタンプで Datadog に保存されます。

Datadog API に直接送信されたデータは、ディストリビューションメトリクスを除いて Datadog によって集計されません。Datadog に送信された生の値はそのまま保存されます。

[送信タイプと Datadog アプリ内タイプ](#submission-types-and-datadog-in-app-types)のセクションを読んで、各種メトリクス送信タイプが対応するアプリ内タイプにどのようにマッピングされるかを確認してください。

## メトリクスタイプ {#metric-types}

### 定義 {#definition}

{{< tabs >}}
{{% tab "カウント (COUNT)" %}}

COUNT メトリクス送信タイプは特定の時間間隔内のイベント発生の合計数を表します。COUNT は、データベースへのコネクションの合計数やエンドポイントへのリクエストの合計数を追跡するために使用できます。このイベント数は、時間の経過とともに蓄積または減少する可能性があり、単調増加ではありません。

**注**: この COUNT とは異なり、RATE は定義された時間間隔で正規化される 1 秒あたりのイベントの数を表します。

{{% /tab %}}
{{% tab "レート (RATE)" %}}

RATE メトリクス送信タイプは 1 秒あたりのイベント発生の合計数を表します。RATE は、データベースへのコネクションの頻度やエンドポイントへのリクエストのフローなど、何かがどれくらいの頻度で発生しているかを追跡するために使用できます。

**注**: この RATE とは異なり、COUNT メトリクス送信タイプは特定の時間間隔内のイベント発生の合計数を表します。

{{% /tab %}}
{{% tab "ゲージ (GAUGE)" %}}

GAUGE メトリクス送信タイプは、1 つの時間間隔内のイベントのスナップショットを表します。この代表スナップショット値は、1 つの時間間隔内に Agent に送信された最後の値です。GAUGE は、使用可能なディスクスペースや使用中のメモリなど、継続的に報告されるものを測定するために使用できます。

{{% /tab %}}
{{% tab "ヒストグラム" %}}

HISTOGRAM メトリクス送信タイプは、1 つの時間間隔内で Agent 側で計算された値セットの統計分布を表します。Datadog の HISTOGRAM メトリックタイプは、StatsD タイミングメトリックタイプの拡張です。Agent は、定義された時間間隔内に送信された値を集約し、値セットを表す複数の異なるメトリクスを生成します。

ある時間間隔内に HISTOGRAM メトリクス `<METRIC_NAME>` に対して `X` 個の送信した場合、デフォルトでは、次のメトリクスが Agent によって生成されます。

`<METRIC_NAME>.avg`
: 時間間隔内に送信された `X` 個の値の平均値を表します。<br>
**Datadog アプリ内タイプ**: GAUGE

`<METRIC_NAME>.count`
: 時間間隔内に送信された値の数 `X` を表します。Agent はこの数を RATE として送信するため、アプリ内で表示される値は `X/interval` です。<br>
**Datadog アプリ内タイプ**: RATE

`<METRIC_NAME>.median`
: 時間間隔内に送信された `X` 個の値の中央値を表します。<br>
**Datadog アプリ内タイプ**: GAUGE

`<METRIC_NAME>.95percentile`
時間間隔内に送信された `X` 個の値の 95 パーセンタイルを表します。<br>
**Datadog アプリ内タイプ**: GAUGE

`<METRIC_NAME>.max`
: 時間間隔内に送信された `X` 個の値の最大値を表します。<br>
**Datadog アプリ内タイプ**: GAUGE

**注**:

- [`datadog.yaml` 構成ファイル][1] の `histogram_aggregates` パラメーターで、Datadog にどの集約を送信するかを構成します。デフォルトでは、`max`、`median`、`avg`、および `count` の集約だけが Datadog に送信されます。`sum` と `min` も利用可能です。
- [`datadog.yaml` 構成ファイル][2] の `histogram_percentiles` パラメーターで、Datadog にどのパーセンタイル集約を送信するかを構成します。デフォルトでは、`95percentile` だけが Datadog に送信されます。


[1]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L106-L114
[2]: https://github.com/DataDog/datadog-agent/blob/04d8ae9dd4bc6c7a64a8777e8a38127455ae3886/pkg/config/config_template.yaml#L116-L121
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

DISTRIBUTION メトリクス送信タイプは、分散インフラストラクチャー全体で計算された値セットのグローバル統計分布を表します。DISTRIBUTION は、基盤となるホストとは独立して、サービスのような論理オブジェクトをインスツルメントするために使用できます。

HISTOGRAM メトリクスタイプが特定の時間間隔内で Agent に対して集計するのに対し、DISTRIBUTION メトリクスは特定の時間間隔内のすべての生データを Datadog に送信します。集計はサーバー側でなされます。基礎となるデータ構造が生未集計データを表すため、分布は 2 つの主要な機能を提供します。

- パーセンタイル集計の計算
- タグ付けのカスタマイズ

ある時間間隔内に DISTRIBUTION メトリクス `<METRIC_NAME>` に対して `X` 個の値を送信した場合、デフォルトで次の集計をクエリに利用できます。

`avg:<METRIC_NAME>`
: 時間間隔内に送信された `X` 個の値の平均値を表します。<br>
**Datadog アプリ内タイプ**: GAUGE

`count:<METRIC_NAME>`
: 時間間隔内に送信されたポイントの数を表します。`X`Agent はその数を COUNT として送信します。<br>
**Datadog アプリ内タイプ**: COUNT

`max:<METRIC_NAME>`
: 時間間隔内に送信された `X` 個の値の最大値を表します。<br>
**Datadog アプリ内タイプ**: GAUGE

`min:<METRIC_NAME>`
: 時間間隔内に送信された `X` の最小値を表します。<br>
**Datadog アプリ内タイプ**: GAUGE

`sum:<METRIC_NAME>`
時間間隔内に送信された `X` 個の値の合計値を表します。<br>
**Datadog アプリ内タイプ**: COUNT

**注**: 分布メトリクス値の異なる複数の集計値はアプリ内でゲージまたはカウントとして_表され_ますが、メトリクス自体はタイプ `DISTRIBUTION` を保持します。

{{% /tab %}}
{{< /tabs >}}

### 例 {#example}

{{< tabs >}}
{{% tab "カウント (COUNT)" %}}

Datadog Agent を実行している単一のホストから COUNT メトリクス `notifications.sent` を送信しているとします。このホストが、フラッシュ時間間隔内に次の値を出力します: `[1,1,1,2,2,2,3,3]`。

Agent は、1つの時間間隔内で受信したすべての値を加算します。次に、合計数値 (この場合は `15`) を COUNT メトリクスの値として送信します。

{{% /tab %}}
{{% tab "レート (RATE)" %}}

Datadog Agent を実行している単一のホストから、RATE メトリクス `queue_messages.rate` を送信しているとします。このホストが、フラッシュ時間間隔内に次の値を出力します: `[1,1,1,2,2,2,3,3]`。

Agent は、1つの時間間隔内で受信したすべての値を加算します。そして、この時間間隔の総秒数で割った合計数値を送信します。この場合、フラッシュ間隔が 10 秒であれば、送信される値は RATE メトリクスの値として `1.5` になります。

{{% /tab %}}
{{% tab "ゲージ (GAUGE)" %}}

Datadog Agent を実行している単一のホストから、GAUGE メトリクス `temperature` を送信しているとします。このホストが、フラッシュ時間間隔内に次の値を出力します: `[71,71,71,71,71,71,71.5]`。

Agent は、最後に報告された数値 (この場合は `71.5`) を GAUGE メトリクスの値として送信します。

{{% /tab %}}
{{% tab "ヒストグラム" %}}

たとえば、10 秒のフラッシュ時間間隔で値 `[1,1,1,2,2,2,3,3]` を報告する Web サーバーから、HISTOGRAM メトリクス `request.response_time.histogram` を送信しているとします。デフォルトの場合 Agent は、この時間間隔内のこれらの値の統計分布を表す次のメトリクスを Datadog に送信します。

| メトリクス名                                    | 値  | Datadog アプリ内タイプ |
| ---------------------------------------------- | ------ | ------------------- |
| `request.response_time.histogram.avg`          | `1.88` | GAUGE               |
| `request.response_time.histogram.count`        | `0.8`  | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

2 つの Web サーバー `webserver:web_1` と `webserver:web_2` から、DISTRIBUTION メトリクス `request.response_time.distribution` を送信しているとします。あるフラッシュ時間間隔において、`webserver:web_1` がメトリクスを値 `[1,1,1,2,2,2,3,3]` で報告し、`webserver:web_2` が同じメトリクスを値 `[1,1,2]` で報告しているとします。この時間間隔において、次の 5 つの集約が両方の Web サーバーから収集されたすべての値のグローバルな統計分布を表します。

| メトリクス名                                | 値  | Datadogアプリ内タイプ |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

#### パーセンタイル集計の計算 {#calculation-of-percentile-aggregations}

GUAGE や HISTOGRAM などの他のメトリクスタイプと同じように、ディストリビューションメトリクスタイプでは次の集計が利用可能です: `count`、`min`、`max`、`sum`、および`avg`。ディストリビューションメトリクスのタグ付け方法は、当初は他のメトリクスと同じです (コード内で設定されたカスタムタグによる)。

追加のパーセンタイル集計 (`p50`、`p75`、`p90`、`p95`、`p99`) は、メトリクスの[詳細サイドパネル][2]からディストリビューションメトリクスに追加できます。アプリ内のディストリビューションメトリクスにパーセンタイル集計を追加する場合、次の 5 つの追加集計をクエリに使用できます。

| メトリクス名                              | 値 | Datadogアプリ内タイプ |
| ---------------------------------------- | ----- | ------------------- |
| `p50:request.response_time.distribution` | `2`   | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

つまり、特定の時間間隔内にパーセンタイル集計を指定したディストリビューションメトリクスでは、`count`、`sum`、`min`、`max`、`avg`、`p50`、`p75`、`p90`、`p95`、および `p99` の 10 個の集計を使用できます。

**注**: 分布メトリクス値の異なる複数の集計値はアプリ内でゲージまたはカウントとして_表され_ますが、メトリクス自体はタイプ `DISTRIBUTION` を保持します。

#### タグ付けのカスタマイズ {#customization-of-tagging}

この機能を使用すると、ホストレベルの粒度を必要としない場合に、メトリクスのタグ付けを制御できます。[Metrics without Limits™][1] の詳細についてはこちらをご覧ください。

**注**: 許可リストベースのタグのカスタマイズでは、タグの除外はサポートされていません。`!`で始まるタグは追加できません。

[1]: /ja/metrics/metrics-without-limits/
[2]: /ja/metrics/summary/#metric-details-sidepanel
{{% /tab %}}
{{< /tabs >}}

### 送信 {#submission}

{{< tabs >}}
{{% tab "カウント (COUNT)" %}}

次のソースのいずれかから COUNT タイプのメトリクスを送信します。

| 送信元 | 送信方法 (python)           | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent チェック][1]  | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent チェック][2]  | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [DogStatsD][4]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][4]    | `dog.decrement(...)`                 | COUNT           | RATE                |

**注**: DogStatsD を介して COUNT メトリクスタイプを送信する場合、メトリクスは異なる Agent 間の関連する比較を確保するためにアプリ内に RATE として表示されます。したがって、StatsD のカウントは Datadog 内で小数として表示されることがあります (1 つの時間間隔で正規化してから 1 秒あたりの単位数を報告するため)。


[1]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[2]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[3]: /ja/api/latest/metrics/#submit-metrics
[4]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#count
{{% /tab %}}
{{% tab "レート (RATE)" %}}

次のソースのいずれかから RATE タイプのメトリクスを送信します。

| 送信元 | 送信方法 (python)          | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ----------------------------------- | --------------- | ------------------- |
| [Agent チェック][1]  | `self.rate(...)`                    | RATE            | GAUGE               |
| [API][2]          | `api.Metric.send(type="rate", ...)` | RATE            | RATE                |

**注**: DogStatsD を通じて RATE メトリクスを取得するには、[COUNT][16] または [HISTOGRAM][18] メトリクスを送信してください。COUNT メトリクスの値と `<HISTOGRAM>.count` の値は、StatsD フラッシュ期間全体のメトリクス値の時間正規化された差分です。


[1]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[2]: /ja/api/latest/metrics/#submit-metrics
{{% /tab %}}
{{% tab "ゲージ (GAUGE)" %}}

次のソースのいずれかから GAUGE タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python)           | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ------------------------------------ | --------------- | ------------------- |
| [Agent チェック][1]  | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [API][2]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [DogStatsD][3]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |


[1]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[2]: /ja/api/latest/metrics/#submit-metrics
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
{{% /tab %}}
{{% tab "ヒストグラム" %}}

次のソースのいずれかから HISTOGRAM タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python) | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [Agent チェック][1]  | `self.histogram(...)`      | HISTOGRAM       | GAUGE, RATE          |
| [DogStatsD][2]    | `dog.histogram(...)`       | HISTOGRAM       | GAUGE, RATE          |

Datadog Agent に TIMER メトリックを送信することは、DogStatsD 内で HISTOGRAM メトリックタイプを送信することと同等です (標準の StatsD のタイマーと混同しないようにしてください)。[DogStatsD `TIMER`][3] が表すのは期間データだけです。たとえば、コードのセクションが実行されるのにかかる時間です。


[1]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[2]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[3]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#timer
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

次のソースから DISTRIBUTION タイプのメトリクスを送信します。

| 送信元 | 送信方法 (Python) | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | -------------------------- | --------------- | -------------------- |
| [DogStatsD][1]    | `dog.distribution(...)`    | DISTRIBUTION    | GAUGE, COUNT         |
| [API][2]          | `api_instance.submit_distribution_points(...)` | DISTRIBUTION           | GAUGE, COUNT               |

**注**: 分布メトリクス値の異なる複数の集計値はアプリ内でゲージまたはカウントとして_表され_ますが、メトリクス自体はタイプ `DISTRIBUTION` を保持します。

[1]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[2]: /ja/api/latest/metrics/#submit-distribution-points
{{% /tab %}}
{{< /tabs >}}

## 送信タイプと Datadog アプリ内タイプ {#submission-types-and-datadog-in-app-types}

以下は、利用可能なすべてのメトリック送信元と送信方法の概要です。この表は、対応するメトリック送信タイプとアプリ内タイプとの対応を示しています。

| 送信元 | 送信方法 (Python)           | 送信タイプ | Datadog アプリ内タイプ |
| ----------------- | ------------------------------------ | --------------- | -------------------- |
| [Agent チェック][9]  | `self.count(...)`                    | COUNT           | COUNT                |
| [Agent チェック][10] | `self.monotonic_count(...)`          | COUNT           | COUNT                |
| [Agent チェック][11] | `self.gauge(...)`                    | GAUGE           | GAUGE                |
| [Agent チェック][12] | `self.histogram(...)`                | HISTOGRAM       | GAUGE, RATE          |
| [Agent チェック][13] | `self.rate(...)`                     | RATE            | GAUGE                |
| [API][7]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT                |
| [API][7]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE                |
| [API][7]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                 |
| [DogStatsD][14]   | `dog.gauge(...)`                     | GAUGE           | GAUGE                |
| [DogStatsD][15]   | `dog.distribution(...)`              | DISTRIBUTION    | DISTRIBUTION         |
| [DogStatsD][16]   | `dog.count(...)`                     | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.increment(...)`                 | COUNT           | RATE                 |
| [DogStatsD][16]   | `dog.decrement(...)`                 | COUNT           | RATE                 |
| [DogStatsD][17]   | `dog.set(...)`                       | SET             | GAUGE                |
| [DogStatsD][18]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE, RATE          |

**注**: 分布メトリクス値の異なる複数の集計値はアプリ内でゲージまたはカウントとして_表され_ますが、メトリクス自体はタイプ `DISTRIBUTION` を保持します。詳しくは、このページの[定義][19]セクションを参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/metrics/custom_metrics/type_modifiers/
[2]: /ja/dashboards/functions/
[3]: /ja/metrics/summary/
[4]: https://statsd.readthedocs.io/en/v3.3/types.html#sets
[5]: /ja/metrics/custom_metrics/agent_metrics_submission/
[6]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/
[7]: /ja/api/latest/metrics/#submit-metrics
[8]: /ja/extend/dogstatsd/#how-it-works
[9]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#count
[10]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=count#monotonic-count
[11]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=gauge
[12]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=histogram
[13]: /ja/metrics/custom_metrics/agent_metrics_submission/?tab=rate
[14]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#gauge
[15]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#distribution
[16]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#count
[17]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#set
[18]: /ja/metrics/custom_metrics/dogstatsd_metrics_submission/#histogram
[19]: /ja/metrics/types/?tab=distribution#definition