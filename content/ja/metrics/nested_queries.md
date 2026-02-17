---
further_reading:
- link: /dashboards/querying/
  tag: ドキュメント
  text: ダッシュボード クエリ
- link: https://www.datadoghq.com/blog/nested-queries/
  tag: ブログ
  text: ネスト メトリクス クエリで強力なインサイトを引き出す
title: ネスト クエリ
---

## 概要

Datadog では、各メトリクス クエリは既定で 2 つの集計レイヤーで構成されます。ネスト クエリを使うと、先に実行したクエリの結果を後続のクエリで再利用できます。

{{< img src="metrics/nested_queries/nested-queries-example-video.mp4" alt="UI でネスト クエリを設定する方法" video=true style="width:100%" >}}

ネスト クエリを使うことで、次のような強力な機能が利用できるようになります:

- [マルチ レイヤー集計][6]
- [count/rate/gauge 型メトリクスのパーセンタイルと標準偏差][7]
- [過去の期間に対する高解像度クエリ][8]

## マルチ レイヤー集計

Datadog では、各メトリクス クエリは 2 段階の集計で評価されます。まず時間で集計し、続いてタグ単位で集計します。マルチ レイヤー集計を使うと、時間集計またはタグ集計のレイヤーをさらに重ねられます。集計の詳細は、[メトリクス クエリの構造][5] を参照してください。

{{< img src="/metrics/nested_queries/nested-queries-before-after.png" alt="ネスト クエリ適用の前後の例" style="width:100%;" >}}



### マルチ レイヤー時間集計

`rollup` 関数を使うと、マルチ レイヤー時間集計を利用できます。メトリクス クエリには最初から `rollup` (時間集計) が含まれており、グラフに表示されるデータ ポイントの粒度を制御します。詳しくは、[ロールアップ][1] ドキュメントを参照してください。

後続の rollup を重ねることで、時間集計のレイヤーを追加できます。

最初の rollup では、次の集計子を使用できます:
- `avg`
- `sum`
- `min`
- `max`
- `count`

マルチ レイヤー時間集計で追加する後続レイヤーでは、次の時間集計子を使用できます:

- `avg`
- `sum`
- `min`
- `max`
- `count`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

マルチ レイヤー時間集計は次の関数と組み合わせて使用できます:

| サポートされる関数   | 説明                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| 算術演算子   | `+, -, *, /`                                                                                  |
| Timeshift 関数    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Top-k 選択        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

上記に含まれない関数は、マルチ レイヤー時間集計と組み合わせられません。

{{% collapse-content title="時間集計のクエリ例" level="h5" %}}
このクエリではまず、`env` と `team` でグループ化した各 EC2 インスタンスの CPU 使用率を平均し、5 分間隔にロールアップします。次にマルチ レイヤー時間集計を適用し、このネスト クエリの結果について 30m 間隔で時間方向の 95 パーセンタイルを算出します。


{{< img src="/metrics/nested_queries/multilayer-time-agg-ui.png" alt="UI / JSON でのマルチ レイヤー時間集計の例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-time-agg-json.png" alt="JSON でのマルチ レイヤー時間集計の例" style="width:100%;" >}}
{{% /collapse-content %}}


### マルチ レイヤー空間集計

空間集計の 1 つ目のレイヤーでグループ化に使うタグを指定したら、`Group By` 関数でマルチ レイヤー空間集計を利用できます。

後続の `Group By` を重ねて、空間集計のレイヤーを追加できます。
注: 最初の空間集計レイヤーでグループ化するタグを指定しない場合、マルチ レイヤー空間集計は利用できません。

空間集計の最初のレイヤーでは、次の集計子をサポートします:

- `avg by`
- `sum by`
- `min by`
- `max by`

空間集計の追加レイヤーでは、次の集計子をサポートします:

- `avg by`
- `sum by`
- `min by`
- `max by`
- `arbitrary percentile pXX` (`p75, p99, p99.99, etc.`)
- `stddev by`

マルチ レイヤー空間集計は次の関数と組み合わせて使用できます: 
| サポートされる関数   | 説明                                                                                    |
|-----------------------|-----------------------------------------------------------------------------------------------|
| 算術演算子   | `+, -, *, /`                                                                                  |
| Timeshift 関数    | `<METRIC_NAME>{*}, -<TIME_IN_SECOND>`<br> `hour_before(<METRIC_NAME>{*})`<br> `day_before(<METRIC_NAME>{*})`<br> `week_before(<METRIC_NAME>{*})`<br> `month_before(<METRIC_NAME>{*})` |
| Top-k 選択        | `top(<METRIC_NAME>{*}, <LIMIT_TO>, '<BY>', '<DIR>')`                                         |

上記に含まれない関数は、マルチ レイヤー空間集計と組み合わせられません。

パーセンタイルの空間集計子を除き、空間集計子は引数が 1 つで、グループ化に使うタグ キーを指定します。パーセンタイルの空間集計子は 2 つの引数が必要です:
- 任意のパーセンタイル pXX
- グループ化するタグ


{{% collapse-content title="空間集計のクエリ例" level="h5" %}}
初期クエリ `avg:aws.ec2.cpuutilization{*} by {env,host}.rollup(avg, 300)` は、`env` と `host` でグループ化した CPU 使用率の平均を 5 分ごとに計算します。続いてマルチ レイヤー空間集計を適用し、`env` ごとに平均 CPU 使用率の最大値を算出します。


UI または JSON タブでは、次のように表示されます:

{{< img src="/metrics/nested_queries/multilayer-space-agg-ui.png" alt="UI でのマルチ レイヤー空間集計の例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/multilayer-space-agg-json.png" alt="JSON でのマルチ レイヤー空間集計の例" style="width:100%;" >}}
{{% /collapse-content %}}


## 集計済みの count/rate/gauge に対するパーセンタイルと標準偏差

時間集計と空間集計のマルチ レイヤー集計を使うと、count/rate/gauge のクエリ結果からパーセンタイルや標準偏差を取得できます。大規模データ セットのばらつきや分布をつかみやすくなり、外れ値も見つけやすくなります。

**注**: ネスト クエリ内のパーセンタイルまたは標準偏差の集計子は、すでに集計された count/rate/gauge メトリクスの結果を使って計算されます。未集計の生データ (raw) からグローバルに正確なパーセンタイルを求めたい場合は、代わりに [ディストリビューション メトリクス][9] を使用してください。

 {{% collapse-content title="マルチ レイヤー時間集計でのパーセンタイル: クエリ例" level="h5" %}}

マルチ レイヤー時間集計では、パーセンタイルを使ってネスト クエリの結果 (5 分ごとに `env` と `team` 別の平均 CPU 使用率) を要約できます。具体的には、このネスト クエリの p95 値を 30 分ごとに計算します。

 {{< img src="/metrics/nested_queries/percentiles-time-agg-ui.png" alt="UI でネスト クエリを用いて MLA 時間集計のパーセンタイルを算出する例" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/percentiles-time-agg-json.png" alt="JSON でネスト クエリを用いて MLA 時間集計のパーセンタイルを算出する例" style="width:100%;" >}}

 {{% /collapse-content %}} 


{{% collapse-content title="マルチ レイヤー空間集計におけるパーセンタイル: クエリ例" level="h5" %}}

マルチ レイヤー空間集計では、パーセンタイルを使ってネスト クエリの結果 (5 分ごとに `env` と `team` 別の平均 CPU 使用率) を要約できます。具体的には、このネスト クエリの p95 値を、`env` の各ユニーク値ごとに算出します。

UI または JSON タブでは、次のように表示されます:

 {{< img src="/metrics/nested_queries/percentiles-space-agg-ui.png" alt="UI でネスト クエリを用いて MLA 空間集計のパーセンタイルを算出する例" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/percentiles-space-agg-json.png" alt="JSON でネスト クエリを用いて MLA 空間集計のパーセンタイルを算出する例" style="width:100%;" >}}

  {{% /collapse-content %}} 



{{% collapse-content title="標準偏差のクエリ例" level="h5" %}}

標準偏差は、データ セットのばらつき (散らばり) を測る指標です。次のクエリでは、マルチ レイヤー時間集計で標準偏差を使用し、ネスト クエリ (API リクエスト数の合計を 4 時間で平均化したもの) の標準偏差を、より長い 12 時間区間で計算します:

UI または JSON タブでは、次のように表示されます:

 {{< img src="/metrics/nested_queries/nested-queries-std-ui.png" alt="UI でネスト クエリと標準偏差を使用する例" style="width:100%;" >}}

 {{< img src="/metrics/nested_queries/nested-queries-std-json.png" alt="JSON でネスト クエリと標準偏差を使用する例" style="width:100%;" >}}
{{% /collapse-content %}}


## 過去の期間に対する高解像度クエリ

各メトリクス クエリには、表示されるデータ ポイントの粒度を制御する初期の時間集計レイヤー (rollup) が含まれています。Datadog では、クエリ対象期間が長くなるほど既定の rollup 間隔も粗くなるように設計されています。ネスト クエリを使えば、長い過去期間でもより細かな高解像度データにアクセスできます。

 {{< img src="/metrics/nested_queries/higher-res-query-example.png" alt="UI で過去期間に対して高解像度クエリを実行する例" style="width:100%;" >}}

{{% collapse-content title="高解像度のクエリ例" level="h5" %}}

従来は、過去 1 か月のメトリクスをクエリすると、既定で 4 時間粒度のデータが表示されていました。ネスト クエリを使うと、この過去期間でもより細かな粒度のデータを参照できます。以下は過去 1 か月を対象にした例です。まずクエリ バッチ カウントを 5 分間隔で rollup し、その後マルチ レイヤー時間集計を適用して、このネスト クエリの時間方向の標準偏差を 4 時間区間で算出します。こうすることで、より人が読み取りやすいグラフにできます。

_**注**: Datadog では、最初の rollup はできるだけ細かい間隔で定義し、その後により粗い rollup 間隔のマルチ レイヤー時間集計を使って、読みやすいグラフに整えることを推奨しています。_

UI または JSON タブでは、次のように表示されます:

{{< img src="/metrics/nested_queries/nested-queries-higher-res-ui.png" alt="UI でネスト クエリを用いて高解像度クエリを実行する例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/nested-queries-higher-res-json.png" alt="JSON でネスト クエリを用いて高解像度クエリを実行する例" style="width:100%;" >}}
{{% /collapse-content %}}

## moving rollup
Datadog には、指定した時間ウィンドウでデータ ポイントを集計できる `moving_rollup` 関数があります。詳しくは [moving rollup][10] を参照してください。ネスト クエリを使うと、この関数を拡張して lookback モードを取り込み、元のクエリ ウィンドウを超えるデータ ポイントも分析できるようになります。これにより、指定した時間ウィンドウにおけるクエリの傾向やパターンを、より包括的に把握できます。

{{< img src="/metrics/nested_queries/moving-rollup-diagram.png" alt="従来版と新しい moving_rollup 関数の比較例" style="width:100%;" >}}

既存の `moving_rollup` 関数がサポートする集計子は次のとおりです:
- `avg`
- `sum`
- `min`
- `max`
- `median`

クエリをネストする場合、利用できるのは lookback モード版の `moving_rollup` 関数のみです。このバージョンでは次の集計子をサポートします:
- `avg`
- `sum`
- `min`
- `max`
- `count`
- `count by`
- `arbitrary percentile pxx` (`p78, p99, p99.99, etc.`)
- `stddev`

{{% collapse-content title="lookback モード有効時の Max moving rollup" level="h5" %}}
これらの `moving_rollups` をネストする場合、指定する rollup 間隔は UI または JSON タブに示すとおり段階的に大きくする必要があります:

{{< img src="/metrics/nested_queries/moving_rollup1_ui.png" alt="UI で moving rollup を設定する例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/moving_rollup1_json.png" alt="JSON で moving rollup を設定する例" style="width:100%;" >}}


{{% /collapse-content %}}


{{% collapse-content title="lookback モード有効時の標準偏差 moving rollup" level="h5" %}}
lookback をサポートする新しい moving rollup 関数では、パーセンタイルや標準偏差も利用できます。また、lookback を有効にした moving rollup のネストも行えます。

UI または JSON タブでは、次のように表示されます:

{{< img src="/metrics/nested_queries/moving_rollup2_ui.png" alt="UI で標準偏差を含む moving rollup を設定する例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/moving_rollup2_json.png" alt="JSON で標準偏差を含む moving rollup を設定する例" style="width:100%;" >}}

{{% /collapse-content %}}


## ブール値しきい値のリマップ関数

リマップ関数を使うと、特定の条件に基づいてクエリ結果を絞り込んだり変換したりでき、監視や分析の幅を広げられます。ネスト クエリにより、次の 3 つの新しい関数が利用できるようになります:

- `is_greater` (`<QUERY>, <THRESHOLD>`)
- `is_less` (`<QUERY>, <THRESHOLD>`)
- `is_between` (`<QUERY>, <LOWER THRESHOLD>, <UPPER THRESHOLD>`)


{{% collapse-content title="is_greater() のクエリ例" level="h5" %}}
`is_greater()` は、クエリの値が定数 30 を上回るポイントでは 1.0 を返し、それ以外は 0.0 を返します。

UI または JSON タブでは、次のように表示されます:
{{< img src="/metrics/nested_queries/is_greater_ui.png" alt="UI で is_greater のマッピング関数を使用する例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_greater_json.png" alt="JSON で is_greater のマッピング関数を使用する例" style="width:100%;" >}}

{{% /collapse-content %}}

{{% collapse-content title="is_less() のクエリ例" level="h5" %}}
`is_less()` は、クエリの値が定数 30 を下回るポイントでは 1.0 を返し、それ以外は 0.0 を返します。

UI または JSON タブでは、次のように表示されます:
{{< img src="/metrics/nested_queries/is_less_ui.png" alt="UI で is_less のマッピング関数を使用する例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_less_json.png" alt="JSON で is_less のマッピング関数を使用する例" style="width:100%;" >}}


{{% /collapse-content %}}

{{% collapse-content title="is_between() のクエリ例" level="h5" %}}
`is_between()` は、クエリの値が 10 と 30 の間 (端点は含まない) のポイントでは 1.0 を返し、それ以外は 0.0 を返します。

UI または JSON タブでは、次のように表示されます:
{{< img src="/metrics/nested_queries/is_between_ui.png" alt="UI で is_between のマッピング関数を使用する例" style="width:100%;" >}}

{{< img src="/metrics/nested_queries/is_between_json.png" alt="JSON で is_between のマッピング関数を使用する例" style="width:100%;" >}}


{{% /collapse-content %}}


## Datadog の API でネスト クエリを使用する
ネスト クエリの機能は、[時系列データをクエリするための公開 API][3] でも利用できます。**formula** オブジェクトの内容を変更してください。


 {{< img src="/metrics/nested_queries/nested-queries-using-api.png" alt="JSON でネスト クエリを用いて高解像度クエリを実行する例" style="width:100%;" >}}


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/functions/rollup/
[2]: /ja/metrics/#configure-time-aggregation
[3]: /ja/metrics/#query-timeseries-data-across-multiple-products
[4]: /ja/metrics/distributions/
[5]: /ja/metrics/#anatomy-of-a-metric-query
[6]: /ja/metrics/nested_queries/#multilayer-aggregation
[7]: /ja/metrics/nested_queries/#percentiles-and-standard-deviation-for-aggregated-counts-rates-and-gauges
[8]: /ja/metrics/nested_queries/#higher-resolution-queries-over-historical-time-frames
[9]: /ja/metrics/distributions/
[10]: /ja/dashboards/functions/rollup/#moving-rollup