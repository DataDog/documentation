---
aliases:
- /ja/graphing/functions/rollup/
title: ロールアップ
---

すべてのメトリクスクエリは本質的に集計されます。しかし、クエリの最後に `.rollup()` 関数を追加することで、デフォルトをオーバーライドしたカスタムの[時間集計][1]を行うことができます。この関数を使用すると、次のような定義を行うことができます。

* rollup `<interval>`: データが集計される時間の間隔 ([クエリで強制されるロールアップの間隔より大きい場合](#rollup-interval-enforced-vs-custom))。
* rollup `<aggregator>`: 指定されたロールアップの時間間隔の範囲におけるデータポイントの集計方法。

ロールアップを適用するには、グラフエディタの **Add function** (Σ) ボタンに移動します。

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="Add function ボタンから Rollup average オプションを選択" video=true >}}

**注**: Distribution メトリクスタイプには rollup の `aggregator` はありません。このメトリクスタイプは時間と空間の両方で集計されます 詳細は[パーセンタイル付きのディストリビューション向け rollup][2] についてのドキュメントを参照してください。

この関数には `<AGGREGATOR>` およびオプションの `<INTERVAL>` という 2 つのパラメーターがあり、`.rollup(<AGGREGATOR>,<INTERVAL>)` または `.rollup(<AGGREGATOR>)` の形で使用されます。

| パラメーター  | 説明                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | `avg`、`sum`、`min`、`max`、または `count` を指定することができ、与えられた時間間隔でどのようにデータポイントを集計するかを定義することができます。[強制されるデフォルト](#rollup-interval-enforced-vs-custom): `avg`。 |
| `<INTERVAL>`   | 表示するデータポイント間の間隔（秒）。設定は任意。                                            |

この 2 つは別々に使用することも、あるいは `.rollup(sum,120)` のように一度に使用することもできます。次の画像は、あるホストの 1 週間分の CPU 使用率を、`.rollup()` 関数を**使わずに**棒グラフで表示したものです。

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

次の棒グラフは、同じメトリクスを、`.rollup(avg,86400)` を使用して 1 日ごとにロールアップしたものです。

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## ロールアップの移動


| 関数        | 説明                                    | 例 |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | ロールアップして最後の X 秒中のポイントを結合します。 | `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


`moving_rollup()` 関数をクエリに適用することで、「最後の X 秒」など最も直近の特定の時間範囲にあるポイントを結合することができます。`.rollup()` を使用した場合と同様、`<AGGREGATOR>` には `sum`/`min`/`max`/`count`/`avg` が入り、指定された時間間隔の中で収集されるデータポイントを定義します。

## ロールアップ間隔: 強制またはカスタム

グラフ作成時に、Datadog は時系列ごとのポイント数に制限を設けています。視覚的な明瞭さを保つために、1 つのデータ系列には最大 1500 ポイントまで設定できます。この制限を守るために、Datadog は自動的にデータポイントをロールアップし、デフォルトで `avg` メソッドを使用します。これにより、特定のメトリクスについて、一定時間内のすべてのデータポイントの平均を表示します。デフォルトのロールアップ時間間隔は、データの可視化方法によって異なります。これらのデフォルトの時間間隔については、以下の表を参照してください。

| タイムフレーム           | rollup 間隔 (線グラフ) | rollup 間隔 (棒グラフ) | rollup 間隔 (API) |
|---------------------|-----------------------------|----------------------------|----------------------|
| 過去 1 時間       | 20 秒                         | 1 分                         | 20 秒                  |
| 過去 4 時間    | 1 分                          | 2 分                         | 1 分                   |
| 過去 1 日        | 5 分                          | 20 分                        | 5 分                   |
| 過去 2 日     | 10 分                         | 30 分                        | 10 分                  |
| 過去 1 週間       | 1 時間                         | 2 時間                        | 1 時間                  |
| 先月      | 4 時間                         | 12 時間                       | 4 時間                  |

カスタムの `.rollup()` 関数を使用することで、適用する時間集計の種類 (`avg`、`min`、`max`、`count`、`sum`) やロールアップする時間間隔を指定することができます。この関数を使用すると、デフォルトとは異なるロールアップ時間間隔を設定することができ、最大 1500 ポイントの制限内で 1 日に最大で 1 分あたり 1 ポイントまでサポートします。

**注**: `COUNT` と `RATE` のタイプのメトリクスは、自動的に `.as_count()` のモディファイアー付きで画面に表示されます。これにより、`sum` を設定したロールアップ関数が実行され、補間が無効になります。この `.as_count()` はクエリの末尾に明示的に表示されます。

  {{< img src="dashboards/functions/rollup/as_count_dropdown.png" alt="as_count" style="width:100%;">}}

`.as_count()` と `.as_rate()` の使用方法について詳しくは、ブログ記事 [StatsD メトリクスの視覚化][3]を参照してください。また、これらの関数の影響について詳しくは、[アプリ内モディファイアーに関するドキュメント][4]を参照してください。

## カレンダーに沿ったクエリによるロールアップ

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

カレンダーに沿ったクエリで `.rollup()` 関数を使用する際、メトリクスデータのバケット方法を時間経過とともにカスタマイズすることができます。この機能により、以下を柔軟に定義することが可能です。

* 開始日とタイムゾーンを調整可能な、カレンダーに準拠した月次クエリ。例えば、昨年の 2 月と 12 月の月間のクライアントエラーを比較することができます。
* 開始日とタイムゾーンを調整可能な週次ロールアップ。例えば、(週の開始日が月曜日であれば) その週にどれだけの取引が開始されているかを見ることができます。
* 開始時刻とタイムゾーンを調整可能な日次ロールアップ。例えば、(太平洋標準時の深夜から始まる場合) 当日に発生した興味深いイベントの数を見ることができます。

## モニターでのロールアップ

通常は、[モニター][5]クエリでロールアップを使用することは避けるべきです。ロールアップ間隔とモニターの評価期間の整合性が取れなくなる可能性があるためです。ロールアップ間隔は、モニタークエリの開始や終了の時間ではなく、UNIX 時間に合わせて開始および終了します。そのため、ロールアップ間隔が短くなり、少量のサンプルデータだけでモニターが評価を行う（そしてトリガーする）可能性があります。これを避けるために、（少なくとも）設定されたロールアップの間隔だけモニターの評価を遅らせる必要があります。

## その他の関数

{{< whatsnext desc="Consult the other available functions:" >}}
    {{< nextlink href="/dashboards/functions/algorithms" >}}アルゴリズム: メトリクスに異常値や外れ値の検出機能を実装します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/arithmetic" >}}算術: メトリクスに対して算術演算を実行します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/count" >}}カウント: メトリクスの 0 以外または null 以外の値をカウントします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/exclusion" >}}除外: メトリクスの特定の値を除外します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/interpolation" >}}補間: メトリクスにデフォルト値を挿入または設定します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rank" >}}ランク: メトリクスの一部のみを選択します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/rate" >}}レート: メトリクスに対してカスタム微分係数を計算します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/regression" >}}回帰: メトリクスに何らかの機械学習関数を適用します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/timeshift" >}}タイムシフト: メトリクスのデータポイントをタイムラインに沿って移動させます。{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ja/dashboards/functions/#add-a-function
[2]: /ja/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /ja/metrics/custom_metrics/type_modifiers/
[5]: /ja/monitors/types/metric/