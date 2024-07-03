---
aliases:
- /ja/graphing/functions/timeshift/
further_reading:
- link: /dashboards/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value/
  tag: FAQ
  text: Graph the percentage change between an earlier value and a current value.
title: Timeshift
---

ここでは、`<TIMEPERIOD>_before()` という形式の関数について説明します。これらの関数は、対応する期間の値をグラフに表示します。この値自体に大きな意味はありませんが、現在値と組み合わせることで、アプリケーションのパフォーマンスについて有益なインサイトを得られることがあります。

## タイムシフト

| 関数      | 説明                                                                                    | 例                                          |
|:--------------|:-----------------------------------------------------------------------------------------------|:-------------------------------------------------|
| `timeshift()` | メトリクスの現在のタイムスタンプより任意の `<TIME_IN_SECOND>` 前の値をグラフ化します。 | `timeshift(<METRIC_NAME>{*}, -<TIME_IN_SECOND>)` |

たとえば、これを使用して現在のシステム負荷を 2 週間前 (60\*60\*24\*14 = 1209600) の負荷と比較する場合は、次のようなクエリになります。

```text
timeshift(avg:system.load.1{*}, -1209600)
```

## 1 時間前

| 関数        | 説明                                                            | 例                         |
|:----------------|:-----------------------------------------------------------------------|:--------------------------------|
| `hour_before()` | メトリクスの現在のタイムスタンプより 1 時間前の値をグラフ化します。 | `hour_before(<METRIC_NAME>{*})` |

例として、`system.load.1` の `hour_before()` 値を破線で示します。この例では、マシンが午前 6:30 に起動し、`hour_before()` 値が 7:30 のマークから表示されています。もちろんこの例は、`hour_before()` の値が実際の値と合致するように特別に作成されています。

{{< img src="dashboards/functions/timeshift/simple_hour_before_example.png" alt="hour before の例" style="width:80%;">}}

## 1 日前

| 関数       | 説明                                                          | 例                        |
|:---------------|:---------------------------------------------------------------------|:-------------------------------|
| `day_before()` | メトリクスの現在のタイムスタンプより 1 日前の値をグラフ化します。 | `day_before(<METRIC_NAME>{*})` |

例として、`nginx.net.connections` の `day_before()` 値を明るい細線で示します。この例では、1 週間分のデータを表示できるため、`day_before()` のデータが簡単にわかります。

{{< img src="dashboards/functions/timeshift/simple_day_before_example.png" alt="day before の例" style="width:80%;">}}

## 1 週前

| 関数        | 説明                                                                    | 例                         |
|:----------------|:-------------------------------------------------------------------------------|:--------------------------------|
| `week_before()` | メトリクスの現在のタイムスタンプより 1 週間 (7 日) 前の値をグラフ化します。 | `week_before(<METRIC_NAME>{*})` |

例として、`cassandra.db.read_count` の `week_before()` 値を破線で示します。この例では約 3 週間分のデータを表示できるため、`week_before()` のデータが簡単にわかります。

{{< img src="dashboards/functions/timeshift/simple_week_before_example.png" alt="week before の例" style="width:80%;">}}

## 1 か月前

| 関数         | 説明                                                                                | 例                          |
|:-----------------|:-------------------------------------------------------------------------------------------|:---------------------------------|
| `month_before()` | メトリクスの現在のタイムスタンプより 1 か月 (28 日/4 週間) 前の値をグラフ化します。 | `month_before(<METRIC_NAME>{*})` |

例として、`aws.ec2.cpuutilization` の `month_before()` 値を細実線で示します。

{{< img src="dashboards/functions/timeshift/simple_month_before_example.png" alt="month before の例" style="width:80%;">}}


## Calendar shift

<div class="alert alert-info">The calendar shift feature is only available for Cloud Cost data sources on <em>private</em> dashboards.</div>

| 関数           | 説明                                                                                   | 例                            |
|:-------------------|:----------------------------------------------------------------------------------------------|:-----------------------------------|
| `calendar_shift()` | Graph values from the previous day, week, or month from the current timestamp for the metric. | `calendar_shift(<METRIC_NAME>{*})` |

To access the calendar_shift() function click the **Add function** button, select **Timeshift > Month before**. The calendar shift allows you to compare the same metric across equivalent timeframes. Here is an example of cloud cost metric `aws.cost.net.amortized` with the calendar_shift() value from two weeks ago compared to the current value.

{{< img src="dashboards/functions/timeshift/calendar_shift_two_weeks.png" alt="Example of a calendar_shift() function used to compare the `aws.cost.net.amortized ` metric value from two weeks ago and the present" style="width:80%;" >}}

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
    {{< nextlink href="/dashboards/functions/rollup" >}}ロールアップ: メトリクスに使用される元ポイントの数を制御します。{{< /nextlink >}}
    {{< nextlink href="/dashboards/functions/smoothing" >}}スムーシング: メトリクスの変動を滑らかにします。{{< /nextlink >}}
{{< /whatsnext >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}