---
further_reading:
- link: metrics/distributions
  tag: ドキュメント
  text: ディストリビューションの詳細
- link: tracing/trace_collection/open_standards/
  tag: ドキュメント
  text: OpenTelemetry の詳細
kind: documentation
title: OTLP メトリクスタイプ
---

## 概要

Datadog Agent と OpenTelemetry Collector Datadog エクスポーターは、OpenTelemetry でインスツルメントされたアプリケーションで生成できる OTLP (OpenTelemetry フォーマット) のメトリクスをインジェストすることができます。

以下の OTLP メトリクスタイプは、Datadog Agent と OpenTelemetry Collector Datadog エクスポーターでインジェストすることができます。
- Sums
- ゲージ
- ヒストグラム
- Summaries

これらの OTLP のメトリクスタイプは、Datadog のメトリクスタイプにマッピングされます。

- COUNT
- GAUGE
- DISTRIBUTION

1 つの OTLP メトリクスは、その意味を示すサフィックスを持つ複数の Datadog メトリクスにマッピングされることがあります。

**注**: OpenTelemetry はメトリクス API のインスツルメント (`Gauge`、`Counter`、`UpDownCounter`、`Histogram` など) を提供しており、それらの計測値は OTLP メトリクス (Sum、Gauge、Histogram) としてエクスポートすることが可能です。OTLP メトリクスの他のソースも可能です。アプリケーションやライブラリは、生成する OTLP のメトリクスをカスタマイズすることができます。生成される OTLP メトリクスとそのカスタマイズ方法を理解するために、OpenTelemetry SDK または OTLP 生成アプリケーションのドキュメントをお読みください。

## メトリクスタイプ

### マッピング


{{< tabs >}}
{{% tab "Sum" %}}

OTLP Sum は、あるタイムウィンドウで報告された測定値の合計を表します。例えば、データベースへの接続の総数やエンドポイントへのリクエストの総数を追跡するために、Sum を使うことができます。Sum にはマッピングに影響を与える 2 つの特徴があります。

- *Aggregation temporality*、これは累積とデルタがあります。デルタメトリクスはタイムウィンドウが重ならないが、累積メトリクスは時間的に固定された開始点からのタイムウィンドウを表します。
- *Monotonicity*。モノトニックサムは決して減少せず、基礎となるカウントに追加することのみをサポートします。

デフォルトのマッピングは以下の通りです。
1. 累積モノトニックサムでは、連続するポイント間のデルタが計算され、カウントとして Datadog に報告されます。最初のポイントは保存されるが省略されます。OTLP ペイロードの値を復元するには、[`cumsum` 算術関数][1]を使用します。
2. 累積非モノトニックサムは Datadog ゲージとしてエクスポートされます。
3. デルタサムは、Datadog のカウントとしてエクスポートされます。

[1]: /ja/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Gauge" %}}

OTLP Gauge は、ある時刻にサンプリングされた値を表します。与えられたタイムウィンドウの最後の値だけが、OTLP のメトリクスに含まれます。

OTLP Gauge は集計セマンティックを提供しないので、Datadog Gauge にマップされます。整数と浮動小数点の両方の Gauge データポイントが Datadog のフォーマットで浮動小数点数にマップされます。

{{% /tab %}}
{{% tab "Histogram" %}}

OTLP Histogram は、母集団の合計やカウントなどの特定の集計メトリクスを一連のバケットカウントとともに保存することで、与えられたタイムウィンドウにおける値の集合の統計的分布を表現するものです。ヒストグラムはマッピングに影響を与える 1 つの特徴を持っています。

- *Aggregation temporality*、これは累積とデルタがあります。デルタメトリクスはタイムウィンドウが重ならないが、累積メトリクスは時間的に固定された開始点からのタイムウィンドウを表します。

デフォルトのマッピングは以下の通りです。
1. デルタヒストグラムは、Datadog の分布として報告されます。利用可能な集計について理解するために、[分布についての詳細をお読みください][1]。
2. 累積ヒストグラムの場合、連続するポイント間のデルタが計算され、分布として Datadog に報告されます。OTLP ペイロードの値を復元するために、個々の集計で [`cumsum` 算術関数][2]を使用することができます。

Datadog Agent と OpenTelemetry Collector Datadog エクスポーターでは、`histogram` サブセクションで Histogram エクスポートを変更することができます。
- `mode` に `counters` を指定すると、以下のようなメトリクスが生成されます。

`<METRIC_NAME>.bucket`、`lower_bound` と `upper_bound` でタグ付けされています
: 指定された下限値と上限値を持つバケットのタイムウィンドウにおけるバケット数。<br>
**Datadog In-App Type**: COUNT

- `send_count_sum_metrics` フラグが有効な場合、以下のメトリクスが生成されます。

`<METRIC_NAME>.sum`
: タイムウィンドウ内に送信された値の総和。<br>
**Datadog In-App Type**: COUNT

`<METRIC_NAME>.count`
: タイムウィンドウ内に送信された値の数。<br>
**Datadog In-App Type**: COUNT

**注**: `send_count_sum_metrics` は、ディストリビューションモードを使用していないときのみ有効です。

[1]: /ja/metrics/distributions
[2]: /ja/dashboards/functions/arithmetic/#cumulative-sum
{{% /tab %}}
{{% tab "Summary" %}}

OTLP Summary は、タイムウィンドウにわたる母集団の分位情報を伝えるレガシータイプです。OTLP Summary タイプは OpenTelemetry SDK では生成されませんが、後方互換性のために他のコンポーネントで生成されることがあります。

`<METRIC_NAME>.sum`
: アプリケーションがメトリクスの生成を開始してからの値の総和。<br>
**Datadog In-App Type**: COUNT

`<METRIC_NAME>.count`
: 母集団に含まれる値の数。 <br>
**Datadog In-App Type**: COUNT

`<METRIC_NAME>.quantile`、 `quantile` でタグ付けされています
: 指定された分位数の値。<br>
**Datadog In-App Type**: GAUGE

{{% /tab %}}
{{< /tabs >}}

### 属性のマッピング

OTLP はデータポイントレベルの属性とリソース属性の 2 種類の属性をサポートしています。これらの属性は OpenTelemetry のセマンティック規則に従い、よく知られたセマンティックを持つことができます。

Datadog Agent と OpenTelemetry Collector Datadog エクスポーターは、データポイントレベルの属性をタグとしてマッピングします。OpenTelemetry のセマンティック規則に従ったリソース属性は、同等の Datadog 規則が存在すればそれにマッピングされます。

`resource_attributes_as_tags` フラグを使用すると、すべてのリソースの属性をタグとして追加することができます。

### ホスト名解決

OpenTelemetry は、ホスト名に関する特定のセマンティック規則を定義しています。OTLP ペイロードが既知のホスト名属性を持つ場合、Datadog はこれらの規則に従い、その値をホスト名として使用しようとします。セマンティック規則は、以下の順序で考慮されます。

1. `datadog.host.name`、Datadog 固有のホスト名規則
1. クラウドプロバイダー固有の規則、`cloud.provider` セマンティック規則がベース
1. Kubernetes 固有のセマンティック規約である `k8s.node.name` と `k8s.cluster.name`
1. `host.id`、一意のホスト ID
1. `host.name`、システムホスト名

存在しない場合、Datadog はペイロードにシステムレベルのホスト名を割り当てます。
リモートホストからデータを送信する場合、パイプラインに ['resource detection' プロセッサー][1]を追加することで、正確なホスト名解決を行うことができます。

### 例

{{< tabs >}}
{{% tab "Sum" %}}

デフォルトでは、累積**モノトニック** Sum タイプのメトリクスをエクスポートする、単一のアプリケーションから OpenTelemetry Counter インスツルメントを使用しているとします。次の表は、Datadog の動作をまとめたものです。

| 収集期間 | Counter 値    | OTLP Sum 値 | Datadog に報告される値 | Datadog アプリ内タイプ | 注                                          |
|-------------------|-------------------|----------------|---------------------------| ------------------- |------------------------------------------------|
| #1                | [1,1,1,2,2,2,3,3] | 15             | なし                      |  COUNT              | 最初の収集期間の数値は報告されません。 |
| #2                | [3,4,1,2]         | 25             | 10                        |  COUNT              | 値の差が報告されます。     |
| #3                | []                | 25             | 0                         |  COUNT              | この期間に新しい値は報告されませんでした。    |

デフォルトでは、累積 Sum タイプのメトリクスをエクスポートする、単一のアプリケーションから OpenTelemetry UpDownCounter インスツルメントを使用しているとします。次の表は、Datadog の動作をまとめたものです。

| 収集期間 | UpDownCounter 値 | OTLP Sum 値 | Datadog に報告される値 | Datadog アプリ内タイプ |
|-------------------|----------------------|----------------|---------------------------| ------------------- |
| #1                | [1,1,1,2,2,2,3,3]    | 15             | 15                        | GAUGE               |
| #2                | [3,-4,1,2]           | 17             | 17                        | GAUGE               |
| #3                | [-1]                 | 16             | 16                        | GAUGE               |

{{% /tab %}}
{{% tab "Gauge" %}}

OpenTelemetry Gauge のインスツルメントである `temperature` を、単一のアプリケーションから使用しているとします。
次の表は、Datadog の動作をまとめたものです。

| 収集期間 | Gauge インスツルメント | OTLP Gauge 値 | Datadog に報告される値 | Datadog アプリ内タイプ |
|-------------------|------------------|------------------|---------------------------| ------------------- |
| #1                | 71.5             | 71.5             | 71.5                      | GAUGE               |
| #2                | 72               | 72               | 72                        | GAUGE               |
| #3                | 70               | 70               | 70                        | GAUGE               |

{{% /tab %}}
{{% tab "Histogram" %}}

OpenTelemetry Histogram インスツルメントである `request.response_time.histogram` を 2 つのウェブサーバーから使用しているとします。`webserver:web_1` と `webserver:web_2` です。ある収集期間において、 `webserver:web_1` が `[1,1,1,2,2,2,3,3]` という値のメトリクスを報告し、 `webserver:web_2` が `[1,1,2]` という値の同じメトリクスを報告しているとします。この収集期間中、次の 5 つの集計は、両方のウェブサーバーから収集されたすべての値のグローバルな統計的分布を表しています。

| メトリクス名                                | 値  | Datadog アプリ内タイプ |
| ------------------------------------------ | ------ | ------------------- |
| `avg:request.response_time.distribution`   | `1.73` | GAUGE               |
| `count:request.response_time.distribution` | `11`   | COUNT               |
| `max:request.response_time.distribution`   | `3`    | GAUGE               |
| `min:request.response_time.distribution`   | `1`    | GAUGE               |
| `sum:request.response_time.distribution`   | `19`   | COUNT               |

[分布についてもっと読む][1]と、さらなる集計の構成方法を理解できます。

また、`counters` モードを使用していて、`send_count_sum_metrics` フラグを有効にすると、ヒストグラムバケットの境界を `[-inf, 2, inf]` に設定した場合に，以下のメトリクスが報告されます。

| メトリクス名                                 | 値  | タグ                                | Datadog アプリ内タイプ |
| ------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`  | `8`    | 非該当                                 | COUNT               |
| `request.response_time.distribution.sum`    | `15`   | 非該当                                 | COUNT               |
| `request.response_time.distribution.bucket` | `6`    | `lower_bound:-inf`、`upper_bound:2` | GAUGE               |
| `request.response_time.distribution.bucket` | `2`    | `lower_bound:2`、`upper_bound:inf`  | GAUGE               |

[1]: /ja/metrics/distributions
{{% /tab %}}
{{% tab "Summary" %}}

レガシー OTLP Summary のメトリクス、`request.response_time.summary` をあるウェブサーバーから送信しているとします。ある収集期間において、ウェブサーバーは `[1,1,1,2,2,3,3]` という値でメトリクスを報告したとします。最小分位数、最大分位数、および中央値分位数が有効になっている場合、次のメトリクスが報告されます。

| メトリクス名                                   | 値  | タグ                                | Datadog アプリ内タイプ |
| --------------------------------------------- | ------ | ------------------------------------| ------------------- |
| `request.response_time.distribution.count`    | `8`    | 非該当                                 | COUNT               |
| `request.response_time.distribution.sum`      | `15`   | 非該当                                 | COUNT               |
| `request.response_time.distribution.quantile` | `1`    | `quantile:0`                        | GAUGE               |
| `request.response_time.distribution.quantile` | `2`    | `quantile:0.5`                      | GAUGE               |
| `request.response_time.distribution.quantile` | `3`    | `quantile:1.0`                      | GAUGE               |


{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#resource-detection-processor