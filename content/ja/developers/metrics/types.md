---
title: メトリクスタイプ
kind: documentation
aliases:
  - /ja/developers/metrics/counts/
  - /ja/developers/metrics/distributions/
  - /ja/developers/metrics/gauges/
  - /ja/developers/metrics/histograms/
  - /ja/developers/metrics/rates/
  - /ja/developers/metrics/sets/
  - /ja/developers/metrics_type/
  - /ja/developers/metrics/metrics_type/
further_reading:
  - link: developers/dogstatsd
    tag: ドキュメント
    text: DogStatsD について
  - link: developers/libraries
    tag: ドキュメント
    text: 公式/コミュニティ作成の API および DogStatsD クライアントライブラリ
---
メトリクスタイプに応じて、特定のメトリクスをクエリ内で集計する方法や、Datadog でグラフ化した際に表示される値が変わります。また、デフォルトの時間集計関数や、[メトリクスタイプモディファイアー][1]も、メトリクスタイプによって変わります。メトリクスタイプは、[メトリクスの概要ページ][2]で特定のメトリクスの詳細サイドパネルに表示されます。注: この詳細サイドパネルでメトリクスタイプを変更すると、既存のすべての可視化およびモニターでメトリクスの動作が変わるため、無意味な履歴データが表示される場合があります。

メトリクスには、次の送信タイプを指定できます。

* [COUNT](?tab=count#metric-type-definition)
* [RATE](?tab=rate#metric-type-definition)
* [GAUGE](?tab=gauge#metric-type-definition)
* [HISTOGRAM](?tab=histogram#metric-type-definition)
* [DISTRIBUTION](?tab=distribution#metric-type-definition)
* [SET](?tab=set#metric-type-definition)
* [TIMERS](?tab=timers#metric-type-definition)

メトリクスを送信した後、Datadog Web アプリケーション内に格納される際、次の 3 つのメトリクスタイプが存在します。

* `COUNT`
* `RATE`
* `GAUGE`

以下の[メトリクスタイプ定義](#メトリクスタイプ定義)のセクションで、使用できるメトリクスタイプについて詳しく説明します。また、[送信タイプと Datadog アプリ内タイプ](#送信タイプとDatadogアプリ内タイプ)のセクションでは、送信されるメトリクスの各タイプに対し、Datadog 内でどのタイプで格納されるかについて説明しています。

## メトリクスタイプ定義

メトリクスのタイプについて理解を深めるため、それぞれが表すこと、また Datadog 内で変更する方法を、例を使って考えてみましょう。

`server:web_1` と `server:web_2` の 2 つの Web サーバーが、以下のようにリクエストを継続的に受信したとします。

* 最初の 30 秒間に HTTP リクエストを 10 回受信
* 次の 30 秒間に HTTP リクエストを 20 回受信
* その後の 30 秒間は HTTP リクエストを受信しない

### メトリクス送信タイプ

{{< tabs >}}
{{% tab "COUNT" %}}

**`COUNT` メトリクス送信タイプは、定義された時間間隔 (フラッシュ間隔とも呼ばれます) 内に発生したイベントの数を表します**。この数は時間とともに増えることもあれば減ることもあり、単調に増加するものではありません。`COUNT` は Web サーバーが受け取るリクエストの数や、エラーの数を追跡するために使用されます。

**注**: この `COUNT` とは異なり、`RATE` は定義された時間間隔で正規化される 1 秒あたりのイベントの数を表します。

たとえば、`server:web_1` に対する `number.of.requests.count` メトリクスを、`COUNT` タイプで Datadog へ 30 秒ごとに報告するとします。

このメトリクスのそれぞれの値/データポイントは `COUNT` として送信され、30 秒のフラッシュ間隔の最中に受信したリクエストの数を表します。その後、次の値がメトリクスによって報告されます。

* 最初の 30 秒間は `10`
* 次の 30 秒間は `20`
* 最後の 30 秒間は `null`

**注**: `COUNT` メトリクスで `0` の値が送信されると、Datadog には `null` が格納されます。

この `COUNT` メトリクスは、次のようにグラフ表示されます。

{{< img src="developers/metrics/types/count_metric.png" alt="COUNT メトリクス" >}}

注: StatsD の COUNT メトリクスは、フラッシュ間隔で正規化される 1 秒あたりの単位数を報告するため、Datadog 内で少数を表示します。

COUNT メトリクスの送信方法については、以下を参照してください。

* [カスタム Agent チェックの場合][1]
* [DogStatsD の場合][2]
* [Datadog API の場合][3]

[1]: /ja/developers/metrics/agent_metrics_submission/?tab=count
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/#count
[3]: /ja/api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "RATE" %}}

**`RATE` メトリクス送信タイプは、定義された時間間隔 (フラッシュ間隔) で正規化される 1 秒あたりのイベント数を表します。**`RATE` は Web サーバーが受け取るリクエストのレートを追跡するために使用されます。

**注**: この `RATE` とは異なり、`COUNT` メトリクス送信タイプはフラッシュ間隔内のイベントの数を表します。

たとえば、`server:web_1` に対する `number.of.requests.rate` メトリクスを、`RATE` タイプで Datadog へ 30 秒ごとに報告するとします。

それぞれの値/データポイントは、リクエストのレートを表します。その後、次の値がメトリクスによって報告されます。

* 最初の 30 秒間は `0.33`
* 次の 30 秒間は `0.66`
* 最後の 30 秒間は `null`
その後、この `0.33`、`0.66`、`0` のパターンを繰り返します。**注**: `RATE` メトリクスで `0` の値が送信されると、Datadog には `null` が格納されます。

`RATE` はリクエストの数を正規化した 1 秒あたりの値の変化を示すため、このメトリクスをグラフ化すると次のように表示されます。

{{< img src="developers/metrics/types/rate_metric.png" alt="RATE メトリクス" >}}

RATE メトリクスの送信方法については、以下を参照してください。

* [カスタム Agent チェックを使用する場合][1]
* [Datadog API の場合][2]

[1]: /ja/developers/metrics/agent_metrics_submission/?tab=rate
[2]: /ja/api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "GAUGE" %}}

**`GAUGE` メトリクス送信タイプは、特定の物事の値を経時的に表します。**指定した時間間隔 (フラッシュ間隔) 内で最後に記録された特定の物事の値のスナップショットです。`GAUGE` は温度やメモリ使用量を表すために使用されます。

たとえば、`server:web_1` に対する `number.of.requests.gauge` メトリクスを、`GAUGE` タイプで Datadog へ 30 秒ごとに報告するとします。

それぞれの値/データポイントは、ある時点でのリクエスト受信回数の合計を表します。その後、次の値がメトリクスによって報告されます。

* 最初の 30 秒間は `10`
* 次の 30 秒間は `30` (リクエスト数 10 に 20 を追加)
* 最後の 30 秒間は `30` (リクエストを新しく受信していないため値が変わりません)

この `GAUGE` メトリクスは、次のようにグラフ表示されます。

{{< img src="developers/metrics/types/gauge_metric.png" alt="GAUGE メトリクス" >}}

GAUGE メトリクスの送信方法については、以下を参照してください。

* [カスタム Agent チェックを使用する場合][1]
* [DogStatsD の場合][2]
* [Datadog API の場合][3]

[1]: /ja/developers/metrics/agent_metrics_submission/?tab=gauge
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/#gauge
[3]: /ja/api/?lang=python#post-timeseries-points
{{% /tab %}}
{{% tab "HISTOGRAM" %}}

**`HISTOGRAM` メトリクス送信タイプでは、値セットの統計的分布を測定することができます**。Datadog の `HISTOGRAM` メトリクスタイプは、[StatsD のタイマーメトリクスタイプ][1]の機能を拡張したものであり、定義された時間間隔 (デフォルトのフラッシュ間隔は 10 秒です) 内に送信される値を (Agent 側で) 集計し、さまざまな時系列を生成することで、その値セットで可能なさまざまな集計を表します。Datadog によって格納されるメトリクスタイプは、集計に応じて異なります。

たとえば、ある Agent のフラッシュ間隔内に `HISTOGRAM` メトリクス `<メトリクス名>` に対して `X` 値を送信した場合、次の時系列が Agent によってデフォルトで生成されます。

| 集計                  | 説明                                                                                                                                               | Datadog のメトリクスタイプ |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `<メトリクス名>.avg`          | フラッシュ間隔内に送信された `X` 個の値の平均値を報告します。                                                                                      | GAUGE               |
| `<メトリクス名>.count`        | フラッシュ間隔内にサンプリングされたポイントの数 (つまり `X`) を報告します。Agent はその数を `RATE` として送信することで、アプリ内で値 `X/interval` として表示します。 | RATE                |
| `<メトリクス名>.median`       | フラッシュ間隔内の `X` 個の値の中央値を報告します。                                                                                           | GAUGE               |
| `<メトリクス名>.95percentile` | フラッシュ間隔内の `X` 個の値の 95 パーセンタイルを報告します。                                                                                  | GAUGE               |
| `<メトリクス名>.max`          | フラッシュ間隔内に送信された `X` 個の値の最大値を報告します。                                                                           | GAUGE               |

たとえば、フラッシュ間隔内で [1,1,1,2,2,2,3,3] という値を持つ `server:web_1` に対し、`HISTOGRAM` タイプの `request.response_time.histogram` メトリクスを Agent を通して Datadog に報告するとします。すると、このフラッシュ間隔に関して以下のメトリクスが Datadog に送信されます。

| メトリクス名                                    | 値  | Datadog のメトリクスタイプ |
|------------------------------------------------|--------|---------------------|
| `request.response_time.histogram.avg`          | `1,88` | GAUGE               |
| `request.response_time.histogram.count`        | `8`    | RATE                |
| `request.response_time.histogram.median`       | `2`    | GAUGE               |
| `request.response_time.histogram.95percentile` | `3`    | GAUGE               |
| `request.response_time.histogram.max`          | `3`    | GAUGE               |

**注**:

* どの集計を Datadog に送信するかは、[datadog.yaml 構成ファイル][2]の `histogram_aggregates` パラメーターで構成します。デフォルトでは、`max`、`median`、`avg`、`count` の集計だけが Datadog に送信されます。`sum` および `min` を構成に追加することができます。
* どのパーセンタイル集計を Datadog に送信するかは、[datadog.yaml 構成ファイル][2]の `histogram_percentiles` パラメーターで構成します。デフォルトでは、`95pc` のパーセンタイルだけが Datadog に送信されます。

ヒストグラムメトリクスの送信方法については、以下を参照してください。

* [カスタム Agent チェックの場合][3]
* [DogStatsD の場合][4]

[1]: https://github.com/etsy/statsd/blob/master/docs/metric_types.md#timing
[2]: /ja/agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /ja/developers/metrics/agent_metrics_submission/?tab=histogram
[4]: /ja/developers/metrics/dogstatsd_metrics_submission/#histogram
{{% /tab %}}
{{% tab "DISTRIBUTION" %}}

**`DISTRIBUTION` は、フラッシュ間隔内に複数のホストから送信された値を集計して、インフラストラクチャー全体の統計的分布を測定するメトリクス送信タイプです。**`DISTRIBUTION` メトリクスは、サービスなどの論理オブジェクトを基底のホストから独立して計測することを目的としています。

Agent 側でフラッシュ間隔内の集計を行う `HISTOGRAM` メトリクスタイプと異なり、`DISTRIBUTION` メトリクスは、フラッシュ間隔内に収集されたすべての未加工データを Datadog に送信し、サーバー側で集計を行います。基になるデータ構造は集計されておらず、未加工データを表すため、ディストリビューションは次の 2 つの主要な機能を提供します。

* パーセンタイル集計の計算
* タグ付けのカスタマイズ

たとえば、あるフラッシュ間隔内に `DISTRIBUTION` メトリクス `<メトリクス名>` に対して `X` 値を送信した場合、デフォルトで次の時系列をクエリに利用できます。

| 集計           | 説明                                                                                                                                               | Datadog のメトリクスタイプ |
|-----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| `avg:<メトリクス名>`   | フラッシュ間隔内に送信された `X` 個の値の平均値を報告します。                                                                                      | GAUGE               |
| `count:<メトリクス名>` | フラッシュ間隔内にサンプリングされたポイントの数 (つまり `X`) を報告します。Agent はその数を `RATE` として送信することで、アプリ内で値 `X/interval` として表示します。 | RATE                |
| `max:<メトリクス名>`   | フラッシュ間隔内に送信された `X` 個の値の最大値を報告します。                                                                           | GAUGE               |
| `min:<メトリクス名>`   | フラッシュ間隔内に送信された `X` 個の値の最小値を報告します。                                                                                  | GAUGE               |
| `sum:<メトリクス名>`   | フラッシュ間隔内に送信された `X` 個の値の合計値を報告します。                                                                                       | GAUGE               |

たとえば、`server:web_1` と `server:web_2` に対し、`DISTRIBUTION` タイプの `request.response_time.distribution` メトリクスを Datadog に報告するとします。あるフラッシュ間隔内に `server:web_1` は値 [1,1,1,2,2,2,3,3] を、`server:web_2` は値 [1,1,2] を同じメトリクスに報告した場合、このフラッシュ間隔に関して以下のメトリクスが Datadog 内で作成されます。

| メトリクス名                                | 値  | Datadog のメトリクスタイプ |
|--------------------------------------------|--------|---------------------|
| `avg:request.response_time.distribution`   | `1,73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | RATE                |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | GAUGE               |

ディストリビューションメトリクスの送信方法については、[DogstatsD の場合][1]を参照してください。

### パーセンタイル集計の計算

`GAUGE`、`HISTOGRAM` などのメトリクスタイプと同様に、`DISTRIBUTION` メトリクスタイプでは `count`、`min`、`max`、`sum`、`avg` の集計を利用できます。ディストリビューションメトリクスは、まず他のメトリクスと同じ方法で (コードで設定されたカスタムタグを使用して) タグ付けられます。

ディストリビューションメトリクスでは、さらにパーセンタイル集計 (`p50`、`p75`、`p90`、`p95`、`p99`) も使用できます。つまり、フラッシュ間隔 10 秒でパーセンタイル集計を指定したディストリビューションメトリクスであれば、`count`、`sum`、`min`、`max`、`avg`、`p50`、`p75`、`p90`、`p95`、`p99` の集計を使用できます。

パーセンタイル集計をディストリビューションメトリクスに追加すると (アプリ内 [Datadog ディストリビューションメトリクスページ][2]を参照)、次の時系列が追加で作成されます。

| メトリクス名                              | 値 | Datadog のメトリクスタイプ |
|------------------------------------------|-------|---------------------|
| `p50:request.response_time.distribution` | `2 `  | GAUGE               |
| `p75:request.response_time.distribution` | `2`   | GAUGE               |
| `p90:request.response_time.distribution` | `3`   | GAUGE               |
| `p95:request.response_time.distribution` | `3`   | GAUGE               |
| `p99:request.response_time.distribution` | `3`   | GAUGE               |

**注**: この例で `server:web_1` の p50 (中央値) は `2`、`server:web_2` の p50 は `1` です。Agent 側で集計を行うと、この 2 つの中央値の中央値である `1.5` が算出されますが、グローバルな p50 (中央値) は、2 つのサーバーを合わせた値セット [1,1,1,1,1,2,2,2,2,3,3] の中央値なので、実際には `2` になります。ディストリビューションメトリクスによるサーバー側の集計で、これが統計的に正確な値として返される場合があります。

### タグ付けのカスタマイズ

この機能を使用すると、ホストレベルの粒度を必要としない場合に、メトリクスのタグ付けを制御できます。ホワイトリストベースのタグ付け制御の詳細については、[ディストリビューションメトリクスのページ][2]を参照してください。**注**: この機能では、`!` によるタグの除外を使用できません。

[1]: /ja/developers/metrics/dogstatsd_metrics_submission/#distribution
[2]: /ja/metrics/distributions
{{% /tab %}}
{{% tab "SET" %}}

**`SET` メトリクスタイプは、特定の時間間隔における一意なイベントの発生回数をカウントします。**

SET メトリクスの送信方法については、以下を参照してください。

* [カスタム Agent チェックを使用する場合][1]
* [DogStatsD の場合][2]

[1]: /ja/developers/metrics/agent_metrics_submission/?tab=set
[2]: /ja/developers/metrics/dogstatsd_metrics_submission/#set
{{% /tab %}}
{{% tab "TIMER" %}}

**DogStatsD では、`TIMER` メトリクスタイプは `HISTOGRAM` メトリクスタイプとして実装されています** (標準の StatsD に含まれるタイマーと混同しないようにしてください)。タイマーは、コードセクションの実行にかかる時間、ページを完全にレンダリングするまでにかかる時間などのタイミングデータだけを測定します。`TIMER` を送信するコードをインスツルメントする方法については、 [DogStatsD ドキュメントの TIMER][1] を参照してください。

[1]: /ja/developers/metrics/dogstatsd_metrics_submission/#timers
{{% /tab %}}
{{< /tabs >}}

## 送信タイプと Datadog アプリ内タイプ

Datadog はさまざまなソースから送信されたメトリクスを受け取ることができます。

* [Datadog API][3]
* [DogStatsD][4]
* [Agent チェック][5]

ソースごとにそれぞれ制限があるため、メトリクス送信タイプと Datadog アプリ内に格納されるタイプとが必ずしも一致するとは限りません。

| 送信元 | 送信方法 (Python)           | 送信タイプ | Datadog アプリ内タイプ |
|-------------------|--------------------------------------|-----------------|---------------------|
| [API][3]          | `api.Metric.send(type="count", ...)` | COUNT           | COUNT               |
| [API][3]          | `api.Metric.send(type="gauge", ...)` | GAUGE           | GAUGE               |
| [API][3]          | `api.Metric.send(type="rate", ...)`  | RATE            | RATE                |
| [DogStatsD][6]    | `dog.gauge(...)`                     | GAUGE           | GAUGE               |
| [DogStatsD][7]    | `dog.distribution(...)`              | DISTRIBUTION    | GAUGE、COUNT        |
| [DogStatsD][8]    | `dog.count(...)`                     | COUNT           | RATE                |
| [DogStatsD][8]    | `dog.increment(...)`                 | COUNT           | RATE                |
| [DogStatsD][8]    | `dog.decrement(...)`                 | COUNT           | RATE                |
| [DogStatsD][9]   | `dog.set(...)`                       | SET             | GAUGE               |
| [DogStatsD][10]   | `dog.histogram(...)`                 | HISTOGRAM       | GAUGE、RATE         |
| [Agent チェック][11] | `self.count(...)`                    | COUNT           | COUNT               |
| [Agent チェック][12] | `self.monotonic_count(...)`          | COUNT           | COUNT               |
| [Agent チェック][13] | `self.gauge(...)`                    | GAUGE           | GAUGE               |
| [Agent チェック][14] | `self.histogram(...)`                | HISTOGRAM       | GAUGE、RATE         |
| [Agent チェック][15] | `self.rate(...)`                     | RATE            | GAUGE               |
| [Agent チェック][16] | `self.set(...)`                      | SET             | GAUGE               |

[1]: /ja/developers/metrics/type_modifiers
[2]: /ja/metrics/summary
[3]: /ja/api/?lang=python#post-timeseries-points
[4]: /ja/developers/metrics/dogstatsd_metrics_submission
[5]: /ja/developers/metrics/agent_metrics_submission
[6]: /ja/developers/metrics/dogstatsd_metrics_submission/#gauge
[7]: /ja/developers/metrics/dogstatsd_metrics_submission/#distribution
[8]: /ja/developers/metrics/dogstatsd_metrics_submission/#count
[9]: /ja/developers/metrics/dogstatsd_metrics_submission/#set
[10]: /ja/developers/metrics/dogstatsd_metrics_submission/#histogram
[11]: /ja/developers/metrics/agent_metrics_submission/?tab=count#count
[12]: /ja/developers/metrics/agent_metrics_submission/?tab=count#monotonic-count
[13]: /ja/developers/metrics/agent_metrics_submission/?tab=gauge
[14]: /ja/developers/metrics/agent_metrics_submission/?tab=histogram
[15]: /ja/developers/metrics/agent_metrics_submission/?tab=rate
[16]: /ja/developers/integrations