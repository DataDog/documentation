---
aliases:
- /ja/graphing/functions/rollup/
description: カスタムロールアップ関数とメトリクスの移動ロールアップを使用して、時間集計とデータポイント間隔を制御します。
further_reading:
- link: /dashboards/guide/rollup-cardinality-visualizations
  tag: ドキュメント
  text: 可視化におけるロールアップ関数とカーディナリティの理解
title: ロールアップ
---
すべてのメトリクスクエリはデフォルトで集計されます。ただし、クエリの末尾に `.rollup()` 関数を追加すると、デフォルトを上書きするカスタム[時間集計][1]を実行できます。この関数を使用すると、以下を定義できます。

* rollup `<interval>`: データが集計される時間間隔 ([クエリで指定されるロールアップ間隔よりも大きい場合](#rollup-interval-enforced-vs-custom))。
* rollup `<aggregator>`: 指定されたロールアップの時間間隔の範囲におけるデータポイントの集計方法。

ロールアップを適用するには、グラフエディターの [{{< ui >}}Add function{{< /ui >}}] (関数の追加) (Σ) ボタンに移動します。

{{< img src="dashboards/functions/rollup/rollup_option_1.mp4" alt="[Add function] ボタンから [Rollup average] (ロールアップ平均) オプションを選択します" video=true >}}

**注**: ディストリビューションメトリクスタイプには、rollup `aggregator` パラメーターはありません。このメトリクスタイプは、時間と空間の両方で集計されます。詳細については、[パーセンタイルを用いたディストリビューションのロールアップ][2]に関するドキュメントを参照してください。

この関数には、`<AGGREGATOR>` およびオプションの `<INTERVAL>` の 2 つのパラメーターがあり、それぞれ、`.rollup(<AGGREGATOR>,<INTERVAL>)` または `.rollup(<AGGREGATOR>)` の形式で使用されます。

| パラメーター  | 説明                                                                                                     |
|------------|-----------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>` | `avg`、`sum`、`min`、`max`、または `count` のいずれかを指定でき、指定された時間間隔内でのデータポイントの集計方法を定義します。[適用されるデフォルト](#rollup-interval-enforced-vs-custom): `avg`。|
| `<INTERVAL>`   | 表示する 2 つのデータポイント間の時間間隔 (秒)。設定は任意。                                           |

これらは個別に使用することも、組み合わせて使用することもできます (例: `.rollup(sum,120)`)。次の棒グラフは、`.rollup()` 関数を **使用せずに**、ホストの 1 週間分の CPU 使用率を示しています。

{{< img src="dashboards/functions/rollup/smooth_1.png" alt="smooth_1" style="width:60%;" >}}

次の棒グラフは、同じメトリクスを、`.rollup(avg,86400)` を使用して 1 日ごとにロールアップしたものです。

{{< img src="dashboards/functions/rollup/smooth_2.png" alt="smooth_2" style="width:60%;" >}}

## 移動ロールアップ {#moving-rollup}


| 関数        | 説明                                    | 例 |
|------------------|------------------------------------------------|------------------|
| `moving_rollup` | ロールアップして最後の X 秒中のポイントを結合します。| `moving_rollup(<METRIC_NAME>, <INTERVAL> , <AGGREGATOR>)` |


クエリに `moving_rollup()` 関数を適用すると、直近の指定された時間範囲 (つまり、最後の X 秒間) のポイントを結合できます。`.rollup()` と同様に、`<AGGREGATOR>` には `sum`、`min`、`max`、`count`、`avg` を指定することができ、指定された時間間隔内でデータポイントの集計方法を定義します。

## ロールアップ間隔: 強制またはカスタム {#rollup-interval-enforced-vs-custom}

Datadog でグラフを作成する際には、時系列ごとのポイント数の制限を設けられています。見やすさを保つために、1 つの時系列には最大 1,500 個のポイントを含めることができます。この制限に従うために、Datadog はデータポイントを自動的にロールアップします。デフォルトでは `avg` メソッドが使用され、指定されたメトリクスの時間間隔内のすべてのデータポイントの平均が表示されます。デフォルトのロールアップ時間間隔は、データの可視化方法によって異なります。デフォルトの時間間隔については、次の表を参照してください。

| 時間枠          | ロールアップ間隔、折れ線グラフ | ロールアップ間隔、棒グラフ | ロールアップ間隔、API |
|---------------------|-----------------------------|----------------------------|----------------------|
| 過去 1 分     | 1 秒                          | 1 秒                         | 1 秒                   |
| 過去 5 分  | 2 秒                          | 5 秒                         | 2 秒                   |
| 過去 15 分 | 5 秒                          | 10 秒                        | 5 秒                   |
| 過去 30 分 | 10 秒                         | 30 秒                        | 10 秒                  |
| 過去 1 時間       | 20 秒                         | 1 分                         | 20 秒                  |
| 過去 4 時間 | 1 分                          | 2 分                         | 1 分                   |
| 過去 1 日        | 5 分                          | 20 分                        | 5 分                   |
| 過去 2 日   | 10 分                         | 30 分                        | 10 分                  |
| 過去 1 週間       | 1 時間                         | 2 時間                        | 1 時間                  |
| 過去 1 か月      | 4 時間                         | 12 時間                       | 4 時間                  |
| 過去 3 か月   | 12 時間                        | 1 日                         | 12 時間                 |
| 過去 6 か月   | 1 日                          | 1 日                         | 1 日                   |
| 過去 1 年       | 1 日                          | 1 週間                         | 1 日                   |

カスタム `.rollup()` 関数を使用して、適用する時間集計のタイプ (`avg`、`min`、`max`、`count`、または `sum`) と、オプションでロールアップする時間間隔を指定できます。この関数を使用すると、ロールアップ時間間隔をデフォルトとは異なる値に設定できます (最大 1,500 ポイントまで)。設定できる値は、1 日に 1 分あたり最大 1 ポイントです。

**注**:
- [クエリ値ウィジェット][8]では、折れ線グラフや棒グラフのウィジェットで使用される 1,500 ポイントではなく、150 ポイントを対象とします。時間枠が同じ場合、クエリ値ウィジェットの有効なロールアップ間隔はより粗くなります。
- `COUNT` および `RATE` タイプのメトリクスのクエリには、UI で `.as_count()` 修飾子が自動的に追加されます。これにより、使用されるロールアップメソッドが `sum` に設定され、補間が無効になります。この `.as_count()` は、クエリの末尾に明示的に表示されます。

  {{< img src="dashboards/functions/rollup/as_count_dropdown.png" alt="as_count" style="width:100%;">}}

`.as_count()` と `.as_rate()` の使用方法について詳しくは、ブログ記事「[StatsD メトリクスの可視化][3]」を参照してください。また、これらの関数の影響について詳しくは、[アプリ内修飾子][4]に関するドキュメントを参照してください。

## カレンダーに沿ったクエリによるロールアップ {#rollup-with-calendar-aligned-queries}

{{< img src="dashboards/functions/rollup/calendar_aligned_queries.png" alt="calendar_aligned_queries" style="width:100%;" >}}

カレンダーに沿ったクエリで `.rollup()` 関数を使用する際、一定期間におけるメトリクスデータのバケット化方法をカスタマイズすることができます。この機能により、以下を柔軟に定義できます。

* 開始日とタイムゾーンが調整可能な、カレンダーに沿った月次クエリ。たとえば、昨年の 2 月と 12 月の月次クライアントエラーを比較できます。
* 開始日とタイムゾーンが調整可能な、週次ロールアップ。たとえば、(週の開始日が月曜日であれば) その週にどれだけの取引が開始されているかを見ることができます。
* 開始時刻とタイムゾーンが調整可能な、日次ロールアップ。たとえば、(太平洋標準時の深夜から始まる場合) 当日に発生した目的のイベントの数を確認できます。

カレンダーに沿ったロールアップ構文は、暦単位とオプションで調整日およびタイムゾーンを指定して、`.rollup()` を拡張します。

`.rollup(<AGGREGATOR>, <CALENDAR_UNIT>, <ALIGNMENT>, '<TIMEZONE>')`

| パラメーター        | 説明                                                                                                          |
|------------------|----------------------------------------------------------------------------------------------------------------------|
| `<AGGREGATOR>`   | `avg`、`sum`、`min`、`max`、または `count` を指定できます。                                                                       |
| `<CALENDAR_UNIT>`| `daily`、`weekly`、または `monthly`。                                                                                    |
| `<ALIGNMENT>`    | `weekly` の場合: 小文字の曜日名で指定する開始曜日 (`monday`、`tuesday`、...、`sunday`)。省略した場合は、`sunday` にデフォルト設定されます。`daily` の場合: 開始時刻 (`12am` など)。`monthly` の場合: 開始日。|
| `<TIMEZONE>`     | オプション。`America/New_York` や `Europe/Paris` などの [IANA タイムゾーン][7]文字列。省略した場合は、UTC にデフォルト設定されます。   |

**例**:

月曜日開始の週次ロールアップ (UTC):

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday)
```

月曜日開始の週次ロールアップ (東部時間):

```
sum:requests.count{*}.as_count().rollup(sum, weekly, monday, 'America/New_York')
```

午前 0 時開始の日次ロールアップ (太平洋時間):

```
sum:requests.count{*}.as_count().rollup(sum, daily, 12am, 'America/Los_Angeles')
```

## モニターでのロールアップ {#rollups-in-monitors}

ロールアップ間隔とモニターの評価期間の整合性が失われる可能性があるため、モニタークエリでロールアップを使用することは通常は避けるべきです。ロールアップ間隔の開始時間と終了時間は、モニタークエリの開始時間と終了時間ではなく、UNIX 時間に合わせて設定されます。そのため、少量のサンプルデータしか含まれていない、不完全なロールアップ間隔をモニターが評価する (そしてそれを基にトリガーする) ことがあります。この問題を回避するには、(少なくとも) 設定されたロールアップ間隔の長さだけモニターの評価を遅らせてください。

モニターのクエリに予期せず [{{< ui >}}No Data{{< /ui >}}] (データなし) が表示された場合は、ロールアップ期間および評価期間の設定を見直すことを検討してください。詳細については、「[モニターに [No Data] が表示される場合のトラブルシューティング][6]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/dashboards/functions/#add-a-function
[2]: /ja/metrics/faq/rollup-for-distributions-with-percentiles/
[3]: https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing
[4]: /ja/metrics/custom_metrics/type_modifiers/
[5]: /ja/monitors/types/metric/
[6]: /ja/monitors/guide/troubleshooting-no-data/
[7]: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
[8]: /ja/dashboards/widgets/query_value/