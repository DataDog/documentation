---
aliases:
- /ja/graphing/functions/timeshift/
further_reading:
- link: /dashboards/faq/how-can-i-graph-the-percentage-change-between-an-earlier-value-and-a-current-value/
  tag: よくあるご質問
  text: 以前の値から現在の値への変化率をグラフ化する
title: タイムシフト
---

以下に、データをタイムシフトさせる一連の関数を示します。これらは対応する期間の値をグラフに表示し、それ単体ではあまり価値がない場合もありますが、現在の値と組み合わせることでアプリケーションのパフォーマンスに関する有益な知見を得られます。

## タイムシフト

| 関数      | 説明                                                                                    | 例                                          |
|:--------------|:-----------------------------------------------------------------------------------------------|:-------------------------------------------------|
| `timeshift()` | メトリクスの現在のタイムスタンプより任意の `<TIME_IN_SECOND>` 前の値をグラフ化します。 | `timeshift(<METRIC_NAME>{*}, -<TIME_IN_SECOND>)` |

たとえば、これを使用して現在のシステム負荷を 2 週間前 (60\*60\*24\*14 = 1209600) の負荷と比較する場合は、次のようなクエリになります。

```text
timeshift(avg:system.load.1{*}, -1209600)
```

## カレンダーシフト


| 関数           | 説明                                                                                   | 例                            |
|:-------------------|:----------------------------------------------------------------------------------------------|:-----------------------------------|
| `calendar_shift()` | メトリクスの現在のタイムスタンプから前の日、週、または月の値をグラフ化します。 | `calendar_shift(<METRIC_NAME>{*}, "<TIME_SHIFT_STRING>", "<TIME_ZONE_CODE>")` |

`calendar_shift()` 関数にアクセスするには、**Add function** ボタンをクリックし、**Timeshift > Month before** を選択します。カレンダーシフトを用いることで、同一メトリクスを同等の期間で比較できます。以下は、クラウドコストメトリクス `aws.cost.net.amortized` について、2 週間前の calendar_shift() 値と現在値を比較した例です。

{{< img src="dashboards/functions/timeshift/calendar_shift_two_weeks.png" alt="2 週間前と現在の `aws.cost.net.amortized ` メトリクス値を比較するために使用される calendar_shift() 関数の例" style="width:80%;" >}}

有効な `TIME_SHIFT_STRING` の値は、負の整数の後に日を表す「d」、週を表す「w」、または月を表す「mo」を付けたものです。
例: `-1d`、`-7d`、`-1mo`、`-30d`、`-4w`

有効な `TIME_ZONE_CODE` の値は、特定の都市に対応する IANA タイムゾーンコード、または `UTC` です。
例: `UTC`、`America/New_York`、`Europe/Paris`、`Asia/Tokyo`

## 1 時間前

| 関数        | 説明                                                            | 例                         |
|:----------------|:-----------------------------------------------------------------------|:--------------------------------|
| `hour_before()` | メトリクスの現在のタイムスタンプより 1 時間前の値をグラフ化します。 | `hour_before(<METRIC_NAME>{*})` |

例として、`system.load.1` の `hour_before()` 値を破線で示します。この例では、マシンが午前 6:30 に起動し、`hour_before()` 値が 7:30 のマークから表示されています。もちろんこの例は、`hour_before()` の値が実際の値と合致するように特別に作成されています。

{{< img src="dashboards/functions/timeshift/simple_hour_before_example.png" alt="hour before の例" style="width:80%;">}}

## 1 日前

<div class="alert alert-warning">"The day before" 機能は非推奨です。代わりに "-1d" の calendar shift をご利用ください。</div>

| 関数       | 説明                                                          | 例                        |
|:---------------|:---------------------------------------------------------------------|:-------------------------------|
| `day_before()` | メトリクスの現在のタイムスタンプより 1 日前の値をグラフ化します。 | `day_before(<METRIC_NAME>{*})` |

例として、`nginx.net.connections` の `day_before()` 値を明るい細線で示します。この例では、1 週間分のデータを表示できるため、`day_before()` のデータが簡単にわかります。

{{< img src="dashboards/functions/timeshift/simple_day_before_example.png" alt="day before の例" style="width:80%;">}}

## 1 週前

<div class="alert alert-warning">"The week before" 機能は非推奨です。代わりに "-7d" の calendar shift をご利用ください。</div>

| 関数        | 説明                                                                    | 例                         |
|:----------------|:-------------------------------------------------------------------------------|:--------------------------------|
| `week_before()` | メトリクスの現在のタイムスタンプより 1 週間 (7 日) 前の値をグラフ化します。 | `week_before(<METRIC_NAME>{*})` |

例として、`cassandra.db.read_count` の `week_before()` 値を破線で示します。この例では約 3 週間分のデータを表示できるため、`week_before()` のデータが簡単にわかります。

{{< img src="dashboards/functions/timeshift/simple_week_before_example.png" alt="week before の例" style="width:80%;">}}

## 1 か月前

<div class="alert alert-warning">"The month before" 機能は非推奨です。ユースケースに応じて "-1mo"、"-30d"、または "-4w" の calendar shift をご利用ください。</div>

| 関数         | 説明                                                                                | 例                          |
|:-----------------|:-------------------------------------------------------------------------------------------|:---------------------------------|
| `month_before()` | メトリクスの現在のタイムスタンプより 1 か月 (28 日/4 週間) 前の値をグラフ化します。 | `month_before(<METRIC_NAME>{*})` |

例として、`aws.ec2.cpuutilization` の `month_before()` 値を細実線で示します。

{{< img src="dashboards/functions/timeshift/simple_month_before_example.png" alt="month before の例" style="width:80%;">}}


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