---
aliases:
- /ja/monitors/monitor_types/metric
- /ja/monitors/faq/what-is-the-do-not-require-a-full-window-of-data-for-evaluation-monitor-parameter
- /ja/monitors/create/types/metric
description: Compare values of a metric with a user defined threshold
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule a downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consult your monitor status
- link: /monitors/types/change-alert
  tag: Documentation
  text: Troubleshoot change alert monitors
title: Metric Monitor
---

## 概要

メトリクスモニターは連続的なデータのストリームに役立ちます。Datadog に送信されるメトリクスのいずれかが、一定の期間にしきい値から外れると、アラートを送信します。

To create a metric monitor in Datadog, navigate to [**Monitors > New Monitor**][1] and select the **Metric** monitor type.

## 検出方法を選択します。

{{< tabs >}}
{{% tab "しきい値" %}}

しきい値アラートは、メトリクス値を静的なしきい値と比較します。

On each alert evaluation, Datadog calculates the average, minimum, maximum, or sum over the selected period and checks if it is above, below, equal to, or not equal to the threshold. This is for standard alert cases where you know the expected values. The [distribution metric type][1] offers the additional threshold option of calculating percentiles over the selected period.

For more information, see the [Set alert conditions](#set-alert-conditions) section.

[1]: /ja/metrics/distributions/
{{% /tab %}}
{{% tab "変化" %}}

変化アラートは、`N` 分前の値と現在の値との絶対変化量または相対変化量を指定のしきい値と比較します。比較されるデータポイントは、単一ポイントではなく、*define the metric* セクションのパラメーターを使用して計算された値です。

アラートの評価には、現在の系列と `N` 分前の系列の差分 (正または負の値) を計算し、その値の選択された期間における平均、最小、最大、合計を計算します。その結果、系列がしきい値から外れる場合にアラートがトリガーされます。

このタイプのアラートは、しきい値を常に予測できる場合に、メトリクスのスパイク、ドロップ、あるいは緩やかな変化を追跡するのに役立ちます。

For more information, see the [Change alert monitors][1] guide.

[1]: /ja/monitors/types/change-alert/
{{% /tab %}}
{{% tab "異常" %}}

異常検出アラートは、過去の動作を使用して、メトリクスの異常な動作を検出します。

異常検出アラートは、過去の値を基に、系列に対して予期される値の範囲を計算します。異常検出アルゴリズムには、予期される範囲を時刻や曜日を使用して判断し、シンプルなしきい値アラートでは検出できない異常の検出を行うものがあります。たとえば、午前 10 時なら正常であっても、午前 5 時なら異常に高いと判断される系列を検出できます。

アラートの評価には、予期される範囲の内、外、上、下にある系列の割合を計算します。この割合がしきい値から外れる場合にアラートがトリガーされます。

For more information, see the [Anomaly Monitor][1] page.

[1]: /ja/monitors/types/anomaly/
{{% /tab %}}
{{% tab "外れ値" %}}

外れ値モニターは、グループの他のメンバー (ホスト、アベイラビリティーゾーン、パーティションなど) と比較して動作が異常であるメンバーを検出します。

アラートの評価では、すべてのグループが一緒にクラスター化され、同じ動作を示しているかをチェックします。1 つ以上のグループの動作が他のグループと異なる場合にアラートがトリガーされます。

For more information, see the [Outlier Monitor][1] page.

[1]: /ja/monitors/types/outlier/
{{% /tab %}}
{{% tab "予測値" %}}

予測値アラートは、メトリクスの今後の動作を予測し、それを静的なしきい値と比較します。強い傾向や繰り返しパターンがあるメトリクスに適しています。

アラートの評価では、偏差の範囲を考慮してメトリクスの今後の値を予測します。この範囲のいずれかの部分がしきい値から外れる場合にアラートがトリガーされます。

For more information, see the [Forecast Monitor][1] page.

[1]: /ja/monitors/types/forecasts/
{{% /tab %}}
{{< /tabs >}}

## メトリクスを定義する

Datadog に報告する任意のメトリクスは、モニターに利用できます。エディタと以下のステップを使用して、メトリクスを定義します。クエリパラメーターは、選択した検出方法に基づいて若干変化します。

{{< tabs >}}
{{% tab "しきい値" %}}

{{< img src="monitors/monitor_types/metric/metric_threshold_config.png" alt="define the metric for threshold detection metric monitor" style="width:100%;">}}

| 手順                              | 必須 | デフォルト        | 例           |
|-----------------------------------|----------|----------------|-------------------|
| メトリクスの選択                   | はい      | なし           | `system.cpu.user` |
| `from` を定義する                 | いいえ       | すべての場所     | `env:prod`        |
| メトリクス集計を指定する        | はい      | `avg by`       | `sum by`          |
| グループ化                          | いいえ       | すべての条件     | `host`            |
| モニタークエリの集計を指定する | いいえ       | `average`      | `sum`             |
| 評価ウィンドウ                 | いいえ       | `5 minutes`    | `1 day`           |

**定義**

| オプション           | 説明                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 平均          | 系列の平均値が算出され、単一の値が生成されます。この値がしきい値と比較されます。このオプションは、モニタークエリに `avg()` 関数を追加します。                                   |
| 最大              | 生成された系列で、どれか一つの値がしきい値を超えたら、アラートがトリガーされます。これは、max() 関数をモニタークエリに追加します。しきい値のその他の挙動については、「注」セクションを参照してください。 |
| 最小              | クエリの評価ウィンドウ内のすべてのポイントがしきい値を超えたら、アラートがトリガーされます。これは、min() 関数をモニタークエリに追加します。しきい値のその他の挙動については、「注」セクションを参照してください。|
| 合計              | 系列内のすべてのポイントの合計値がしきい値から外れている場合に、アラートがトリガーされます。このオプションは、モニタークエリに `sum()` 関数を追加します。                               |
| percentile(pXX)  | クエリの評価ウィンドウ内のポイントの pXX パーセンテージがしきい値から外れている場合に、アラートがトリガーされます。このオプションは、比較方法の選択に基づいて、モニタークエリに `percentile` 関数を追加します。ディストリビューションメトリクスタイプにのみ利用可能です。
| 評価ウィンドウ| モニターが評価する時間帯を指定します。`5 minutes`、`15 minutes`、`1 hour`、`custom` といったプリセットされた時間枠を使用して、1 分～730 時間 (1 ヶ月) の間で設定します。 |

{{% /tab %}}
{{% tab "変化" %}}

{{< img src="monitors/monitor_types/metric/metric_change_alert_config.png" alt="define the metric for change detection metric monitor" style="width:100%;">}}

| 手順                              | 必須 | デフォルト        | 例           |
|-----------------------------------|----------|----------------|-------------------|
| メトリクスの選択                   | はい      | なし           | `system.cpu.user` |
| `from` を定義する                 | いいえ       | すべての場所     | `env:prod`        |
| メトリクス集計を指定する        | いいえ       | `avg by`       | `sum by`          |
| グループ化                          | いいえ       | すべての条件     | `host`            |
| モニタークエリの集計を指定する | いいえ       | `average`      | `sum`             |
| 変更タイプを選択する              | いいえ       | `change `      | `% change`        |
| 評価ウィンドウ                 | いいえ       | `5 minutes`    | `1 day`           |
| 比較ウィンドウ                 | いいえ       | `5 minutes`    | `1 month`         |

**定義**

| オプション           | 説明                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 変化           | 値の絶対変化量です。                                                                                                                                             |
| %&nbsp;change    | 過去の値と比較した値の変化率です。たとえば、過去の値が 2 で現在の値が 4 の場合、% change は 100% になります。            |
| 平均          | 系列の平均値が算出され、単一の値が生成されます。この値がしきい値と比較されます。このオプションは、モニタークエリに `avg()` 関数を追加します。                                   |
| 最大              | 生成された系列で、どれか一つの値がしきい値を超えたら、アラートがトリガーされます。これは、max() 関数をモニタークエリに追加します。しきい値のその他の挙動については、「注」セクションを参照してください。 |
| 最小              | クエリの評価ウィンドウ内のすべてのポイントがしきい値を超えたら、アラートがトリガーされます。これは、min() 関数をモニタークエリに追加します。しきい値のその他の挙動については、「注」セクションを参照してください。 |
| 合計              | 系列内のすべてのポイントの合計値がしきい値から外れている場合に、アラートがトリガーされます。このオプションは、モニタークエリに `sum()` 関数を追加します。                               |
| percentile(pXX)  | クエリの評価ウィンドウ内のポイントの pXX パーセンテージがしきい値から外れている場合に、アラートがトリガーされます。このオプションは、比較方法の選択に基づいて、モニタークエリに `percentile` 関数を追加します。ディストリビューションメトリクスタイプにのみ利用可能です。
| 評価ウィンドウ| モニターが評価する時間帯を指定します。`5 minutes`、`15 minutes`、`1 hour`、`custom` といったプリセットされた時間枠を使用して、1 分～730 時間 (1 ヶ月) の間で設定します。 |

{{% /tab %}}
{{< /tabs >}}

**注:**
  - If using a distribution metric with a percentile aggregator, a matching percentile threshold is automatically specified. Metrics with percentile aggregators do not generate a snapshot graph in the notifications message.
  - **max/min**: これらの max と min の説明は、メトリクスがしきい値を上回ったときにモニターがアラートすることを想定しています。しきい値を下回ったときにアラートするモニターでは、max と min の動作は逆になります。
  - モニターを作成するメトリクスの定義は、グラフを作成するメトリクスの定義と似ています。`Advanced...` オプションの使用について詳しくは、[高度なグラフの作成][2]を参照してください。
  - `as_count()` を使用する場合は動作が異なります。詳しくは、[モニター評価での as_count()][3] を参照してください。

## アラートの条件を設定する

Trigger when the metric is one of the following:
- `above`
- `above or equal to`
- `below`
- `below or equal to`
- `equal to`
- `not equal to`

If the value is between zero and one, a leading zero is required. For example, `0.3`.

### 高度なアラート条件

#### データウィンドウ

評価の際に、データウィンドウが一杯であることを判断するかどうかを `Require` または `Do not require` で指定できます。

この設定では、モニターを評価するタイミングをアラートエンジンが判断する方法を変更できます。

**Do not require** (デフォルト): モニターは認識されるとすぐに評価されます。データポイントがまばらである可能性がある場合は、この値の使用を検討します。この構成では、評価タイムフレームに単一のデータポイントがある場合でも、モニターが評価されます。

**Require**: 評価ウィンドウがデータで `filled` (満たされている) と見なされるまで、モニターは評価されません。評価期間全体にわたってデータがある場合に通知を受けるには、このオプションを使用します。

評価タイムフレームがデータで `filled` (満たされている) かどうかを定義するために、タイムフレームはより小さなバケットに分割されます。

次のロジックがバケットサイズを決定します。

* 分単位の評価タイムフレーム: バケットサイズは 1 分です
* 時間単位の評価タイムフレーム: バケットサイズは 10 分です
* 日単位の評価タイムフレーム: バケットサイズは 1 時間です
* 月単位の評価タイムフレーム: バケットサイズは 4 時間です

「フルウィンドウ」と見なされるには、モニターに次のものが必要です。

1. 最初のバケットに少なくとも 1 つのデータポイント。最初のバケットは、ウィンドウで時系列的に一番早いバケットです。
2. データポイントのない合計で最大 3 つのバケット (最初のバケットを含む)。

条件が満たされると、モニターが評価されます。それ以外の場合、評価はキャンセルされ、モニターの状態は変更されません。

たとえば、過去 `2 時間` の評価を行うモニターは、10 分単位の 12 個のバケットに分割されます。最初のバケットにデータがあり、空のバケットが合計で 3 つまでの場合、モニターはフルであるみなされます。

| データ   | B0 | B1 | B2 | B3 | B4 | B5 | B6 | B7 | B8 | B9 | B10 | B11 | フルウィンドウ？|
|--------|----|----|----|----|----|----|----|----|----|----|-----|-----|-------------|
| ケース 1 | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | はい         |
| ケース 2 | x  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | いいえ          |
| ケース 3 | 1  | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | 1  | 1   | 1   | はい         |
| ケース 4 | 1  | x  | x  | x  | 1  | 1  | 1  | 1  | x  | x  | 1   | 1   | いいえ          |

評価ウィンドウについて、詳しくは[モニターの構成][5]ページを参照してください。

#### その他のオプション

For instructions on the advanced alert options (no data, auto resolve), see the [Monitor configuration][6] page.

## 通知

For instructions on the **Configure notifications and automations** section, see the [Notifications][7] and [Monitor configuration][8] pages.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create
[2]: /ja/dashboards/querying/#advanced-graphing
[3]: /ja/monitors/guide/as-count-in-monitor-evaluations/
[5]: /ja/monitors/configuration/?tab=thresholdalert#evaluation-window
[6]: /ja/monitors/configuration/#advanced-alert-conditions
[7]: /ja/monitors/notify/
[8]: /ja/monitors/configuration/?tab=thresholdalert#configure-notifications-and-automations