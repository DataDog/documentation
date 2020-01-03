---
title: カスタムメトリクス
kind: documentation
aliases:
  - /ja/getting_started/custom_metrics
---
Datadog では、インフラストラクチャーで発生していることを総合的に表示するために、複数の方法でカスタムメトリクスを送信できます

この記事では次のトピックについて説明します。

* カスタムメトリクスとは何か。どのように Datadog に送信されるか。
* いくつのカスタムメトリクスを使用できるか。
* カスタムメトリクスカウントの変化をどのようにチェックするか。

## カスタムメトリクスはどのように定義されるか

カスタムメトリクスとは、メトリクス名、ホスト、任意のタグからなる単一かつ一意の組み合わせです。

一般に、StatsD や [DogStatsD][1] を使用したり、[Datadog Agent][2] の拡張機能から送信されるメトリクスは、すべてカスタムメトリクスです。[インテグレーション][3]によっては、カスタムメトリクスとしてもカウントされるメトリクスを無制限個送信する可能性があります。詳細については、[カスタムメトリクスを送信する標準インテグレーション][4]を参照してください。

タグを使用すると、スコープ設定やアラート生成などの Datadog の機能をフルに活用できます。タグを使用する場合、送信される 1 つのメトリクスは、実際には**一意のタグ組み合わせを複数含み**、それらはカスタムメトリクスカウントの対象になります。

**例 1**

たとえば、米国内の平均気温 `temperature` を測定するとします。以下のように、オーランド、マイアミ、ニューヨーク、ボストン、シアトルの過去 1 分間の気温測定値を 10 秒ごとに収集します。各 `temperature` 測定値には、`city`、`state`、`region`、`country` についての情報がタグ付けられています。

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast, USA | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast, USA | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast, USA | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast, USA | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest, USA | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

 `city`、`state`、`region`、`country` からなるそれぞれ一意のタグ組み合わせが 1 つの時系列 / カスタムメトリクスを表します。上の 5 つの時系列を使用して、米国、北東部、またはフロリダの平均気温を決定できます。

**例 2**

* メトリクス名 `auth.exceptionCount` を送信します。
* コードインスツルメンテーションは、そのメトリクスに関連付けられるタグ `method:X`、`method:Y`、`exception:A`、`exception:B` を計画します。
* このメトリクスの基本ロジックは次のようになります。
{{< img src="developers/metrics/custom_metrics/custom_metric_1.png" alt="custom_metric_1"  >}}

したがって、**特定のホスト**において以下のメトリクスは一意になります。

* `method:X` のタグが付いた `auth.exceptionCount`
* `method:Y` のタグが付いた `auth.exceptionCount`
* `method:X` および `exception:A` のタグが付いた `auth.exceptionCount` (`exception:A` が新しいタグなので一意)
* `method:X` および `exception:B` のタグが付いた `auth.exceptionCount`
* `method:Y` および `exception:A` のタグが付いた `auth.exceptionCount`
* `method:Y` および `exception:B` のタグが付いた `auth.exceptionCount`

この場合は、異なる 6 つのメトリクスが生成されることになります。

タグの順序は関係ないため、次の 2 つのメトリクスは一意と見なされません。

* `method:X` および `exception:A` のタグが付いた auth.exceptionCount
* `exception:A` および `method:X` のタグが付いた auth.exceptionCount

## いくつのカスタムメトリクスを使用できるか

Datadog は、Pro と Enterprise という 2 つのプランを用意しています。Pro のお客様はホストあたり 100 個、Enterprise のお客様はホストあたり 200 個のカスタムメトリクスが割り当てられます。カスタムメトリクスは、ホストごとではなくインフラストラクチャー全体でカウントされます。たとえば、Pro プランに加入し、ホスト 3 つ分のライセンスをお持ちのお客様は、デフォルトで 300 個のカスタムメトリクスを持つことになります。この 300 個のメトリクスを各ホストで均等に使用することも、全部を 1 つのホストから送信することもできます。

上の例の場合に、デフォルトのメトリクスカウントを超えることなく 3 つのホストでメトリクスを使用するシナリオを以下に 3 つ示します。

{{< img src="developers/metrics/custom_metrics/Custom_Metrics_300.jpg" alt="Custom_Metrics_300"  style="width:75%;">}}

{{< img src="developers/metrics/custom_metrics/custom-metrics-1.jpg" alt="custom-metrics-1"  style="width:75%;">}}

カスタムメトリクスの送信に適用される[固定のレート制限][5]はありません。デフォルトの割り当てを超えた場合は、Datadog サポート担当者からお客様にご連絡いたします。

## カスタムメトリクスカウントはどのようにチェックするか

カスタムメトリクスを作成すると、そのメトリクスには自動的にすべてのホストタグが 1 つの一意のタグ組み合わせとして追加されます。これに、メトリクス自体にリンクされたタグを追加していくことになります。これらは、実際のメトリクスカウントに加算されるため、最も重要です。

インフラストラクチャー全体の複数のサービスから収集される request.count について調べるとします。

* メトリクス service.request.count を作成します。
* 成功したリクエストと失敗したリクエストを分けるため、次の 2 つのタグを作成します。
    * `status:success`
    * `status:failure`
* インフラストラクチャー上で実行されている各サービスからこのメトリクスを受け取ります。各ホストに以下の 3 つのサービスがあるとします。
    * `service:database`
    * `service:api`
    * `service:webserver`

このメトリクスの基本ロジックは次のとおりです。

{{< img src="developers/metrics/custom_metrics/logic_metric.png" alt="logic_metric"  style="width:75%;">}}

ここから、すべてのサービスが成功と失敗の両方を報告すると仮定すると、**このメトリクスを報告するホストごとに**、最大 1x2x3 = **6 つのカスタムメトリクス**を持ち得ることがわかります。

以下のような 3 つのホストがある場合を例にします。

* `host1` は、可能な構成をすべて報告しています。
* `host2` は、どのサービスについても成功のみを報告しています。
* `host3` は成功と失敗を報告していますが、それはデータベースサービスと Web サーバーサービスに関してのみです。

次のように、この 3 つのホスト全体では異なるメトリクスが 13 個あります。

{{< img src="developers/metrics/custom_metrics/metric_count.png" alt="metric_count"  style="width:75%;">}}

管理者であれば、[使用状況ページ][6]の自分のアカウントで、1 時間あたりの合計カスタムメトリクスと、カーディナリティに基づく上位 500 のカスタムメトリクスを確認できます。このメトリクスカウントは[メトリクスサマリーページ][7]にも表示され、service.request.count メトリクスをクリックすると、一意のタグ組み合わせの正確な数を確認できます。

したがって、上の例の最初のホストだけが報告している場合は、以下のようになります。

{{< img src="developers/metrics/custom_metrics/metric_summary.png" alt="metric_summary"  style="width:70%;">}}

2 つ目のホストを追加します。

{{< img src="developers/metrics/custom_metrics/metric_summary_2.png" alt="metric_summary_2"  style="width:70%;">}}

上の表のような 3 つ目のホストを追加すると、異なる 13 個のメトリクスが得られます。

{{< img src="developers/metrics/custom_metrics/metric_summary_3.png" alt="metric_summary_3"  style="width:70%;">}}

クエリエディターで count: 集計関数を使用して、これを調べることもできます。

{{< img src="developers/metrics/custom_metrics/metric_aggregator.png" alt="metric_aggregator"  style="width:70%;">}}

最終的に、`count:service.request.count{*}` というクエリを使用して 13 個のメトリクスが得られます

{{< img src="developers/metrics/custom_metrics/count_of_metrics.png" alt="count_of_metrics"  style="width:70%;">}}

### ゲージ、カウント、ヒストグラム、レートのカスタムメトリクスをカウントする
[ゲージ][8]は、1 秒ごとの値を表します (例: 気温、Kafka キューオフセット)。

フロリダ州の平均気温を測定するとします。`temperature` は `gauge` メトリクスタイプとして Datadog に保存されます。オーランド、マイアミ、ボストン、ニューヨーク、およびシアトルの過去 1 分間の 10 秒ごとの気温測定値を収集します。それぞれに `city`、`state`、`region`、`country` の情報がタグ付けられています。

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast, USA | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast, USA | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast, USA | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast, USA | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest, USA | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

`temperature` ゲージメトリクスに関連付けられたカスタムメトリクスの合計数は 5 です。気温データにタグ付けられた `city`、`state`、`region`、`country` からなる一意の文字列組み合わせがそれぞれ 1 つのカスタムメトリクス (言い換えると、Datadog によって保存される 1 つの時系列データ) としてカウントされます。

上の 5 つの時系列を使用して、クエリ時点の米国、北東部、またはフロリダの平均気温を決定できます。

**注**: `カウント`、`ヒストグラム`、および`レート`メトリクスタイプにも同じ方法を適用してカスタムメトリクスがカウントされます。

#### タグの削除
この `temperature` ゲージメトリクスから `country` タグを削除するとします。

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| Orlando, FL, Southeast | 80 | 80 | 80 | 80 | 81 | 81 | 81 |
| Miami, FL, Southeast | 82 | 82 | 82 | 82 | 82 | 82 | 82 |
| Boston, MA, Northeast | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| New York, NY, Northeast | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| Seattle, WA, Northwest | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

市が 5 つ、州が 4 つ、地域が 3 つ、国は 1 つですが、データに現れる `city`、`state`、`region`、`country` の一意のタグ値組み合わせは 5 つです。`temperature` メトリクスから送信されるカスタムメトリクスの合計数は 5 のままです。

`temperature` ゲージメトリクスから `city` タグを削除するとします。

|  |  |  |  |  |  |  |  |
|------------------------------|----|----|----|----|----|----|----|
| FL, Southeast | 81 | 81 | 81 | 81 | 81.5 | 81.5 | 81.5 |
| MA, Northeast | 78 | 78 | 78 | 78 | 78 | 79 | 79 |
| NY, Northeast | 79 | 79 | 79 | 79 | 79 | 79 | 79 |
| WA, Northwest | 75 | 75 | 75 | 75 | 75 | 75 | 75 |

これで、`temperature` データに現れる一意のタグ値組み合わせは 4 つになります。したがって、`state` と `region` がタグ付けられた `temperature` メトリクスのカスタムメトリクスの合計数は 4 です。

### ディストリビューションのカスタムメトリクスをカウントする  
ディストリビューションメトリクスは、メトリクス値を送信するすべてのホストから 10 秒のフラッシュ間隔ですべての値を収集します。ディストリビューションは、ゲージから送信されるカスタムメトリクスの数に比例する数のカスタムメトリクスを送信します。ディストリビューションは、一意のタグ値組み合わせごとに 4 つの時系列を生成し、これらはデータ `sum`、`count`、`min`、`max` に表示されます (`avg` は sum/count から算出)。

ニューヨーク州の最大の `age` メトリクスを測定するとします。`age` は、`city` および `state` がタグ付けられたディストリビューションメトリクスとして Datadog に送信されます。

|  | 10 秒フラッシュ間隔内の値 | 合計 | カウント | 最小値 | 最大値 | 平均値 (合計/カウント) |
|---------------|------------------------------|-----|-------|---------|---------|---------------------|
| Rochester, NY | 23,29,33,55,41,36,12,67 | 296 | 8 | 12 | 67 | 37 |
| New York, NY | 18,22,26,31,29,40,23,35 | 215 | 8 | 18 | 40 | 28 |

`age` ディストリビューションメトリクスから送信されるカスタムメトリクスまたは時系列は、**8 つ (4 x 2)** です。上の一意のタグ値組み合わせの両方 (Rochester, NY と New York, NY) に対して、Datadog は 4 つの時系列 (`sum`、`count`、`min`、`max`、`avg`) を保存します。

ニューヨーク州の `age` の最大値を取得するには、上の時系列を再集計します。すなわち、ニューヨークの最高年齢 = `max`(`max`(Rochester, NY), `max`(New York, NY)) = 67 となります。

#### パーセンタイル集計付きのディストリビューション
ディストリビューションメトリクスを Datadog に送信した後に、アプリ内のディストリビューション UI を使用してディストリビューションにパーセンタイル集計を追加するというオプションがあります。パーセンタイル集計付きのディストリビューションは、上にリストしたメトリクスタイプとは違う方法でカウントされます。これは、パーセンタイルが数学的に再集計可能ではないためです。

ニューヨーク州の `age` の中央値を測定するとします。`age` ディストリビューションメトリクスには `city` と `state` がタグ付けられています。

|  | 10 秒フラッシュ間隔内の値 | 合計 | カウント | 最小 | 最大 | 平均 | p50 | p75 | p90 | p95 | p99 |
|---------------|------------------------------|-----|-------|-----|-----|-----|-----|-----|-----|-----|-----|
| Rochester, NY | 23,33,55,41,36,12,66 | 266 | 7 | 12 | 66 | 38 | 23 | 55 | 66 | 66 | 66 |
| New York, NY | 18,26,31,29,40,23,36 | 203 | 7 | 18 | 40 | 29 | 29 | 36 | 40 | 40 | 40 | 

パーセンタイルは、上の最高年齢と同じようには再集計できません。ニューヨークの年齢の中央値は、`median`(`median`(Rochester, NY), `median`(New York, NY)) にならないからです。

したがって、Datadog は、クエリ可能なタグ値組み合わせごとに 5 つの時系列 (`p50`、`p75`、`p90`、`p95`、`p99`) を事前に計算する必要があります。New York の例では、クエリ可能なタグ値組み合わせは次のとおりです。
 * Rochester, (`null` state)
 * New York, (`null` state)
 * (`Null` city), NY
 * Rochester, NY
 * New York, NY
 * (`Null` city), (`null` state) -- * {すべての時系列} と同等

クエリ可能な値は、`city` タグには 3 つ {Rochester, New York, `null`}、`state` タグには 2 つ {NY, `null`} あります。

パーセンタイル集計付き `age` ディストリビューションメトリクスから送信されるカスタムメトリクスは、次のとおりです。

{{< img src="/developers/metrics/custom_metrics/38-timeseries.png" alt="[4 x (2)] + [5 x ((3) x (2))] = 38 timeseries."  style="width:70%;">}}

## オーバーヘッド

[DogStatsD][1] を使用しないで、メトリクスを直接 Datadog API に送信している場合は、次の容量が見込まれます。

* タイムスタンプに 64 ビット
* 値に 64 ビット
* メトリクス名に 20 バイト
* 時系列に 50 バイト

ペイロード全体では約 100 バイトです。一方、DogStatsD API を使用する場合は圧縮が行われ、標準的なペイロードははるかに小さくなります。

[1]: /ja/developers/dogstatsd
[2]: /ja/agent
[3]: /ja/integrations
[4]: /ja/account_management/billing/custom_metrics/#standard-integrations
[5]: /ja/api/#rate-limiting
[6]: https://app.datadoghq.com/account/usage/hourly
[7]: https://app.datadoghq.com/metric/summary
[8]: https://docs.datadoghq.com/ja/developers/metrics/gauges