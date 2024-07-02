---
title: Forecasts Monitor
aliases:
- /guides/forecasts/
- /monitors/monitor_types/forecasts
- /monitors/create/types/forecasts/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configure your monitor notifications
- link: /monitors/downtimes/
  tag: Documentation
  text: Schedule downtime to mute a monitor
- link: /monitors/manage/status/
  tag: Documentation
  text: Consult your monitor status
---

## 概要

予測機能は、メトリクスが今後どこに向かうかを予測するためのアルゴリズム機能です。強い傾向や繰り返しパターンがあるメトリクスに適しています。たとえば、アプリケーションがより短い間隔でログを記録し始めた場合、予測値機能は、ログローテーションポリシーを更新するための時間を十分に取れるように、ディスクが満杯になる 1 週間前にアラートを生成します。あるいは、ユーザーのサインアップなどのビジネスメトリクスを予測して、四半期目標へ向けた進捗状況を追跡できます。

## モニターの作成

Datadog で[予測値モニター][1]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Forecast*。

### メトリクスを定義する

現在 Datadog にレポートが送信されるメトリクスはすべて、モニターに使用できます。詳細については、[メトリクスモニター][2]ページをご確認ください。

メトリクスを定義すると、予測値モニターはエディターに 2 つのプレビューグラフを表示します。
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="エディターグラフ" style="width:95%;">}}

* **Historical View** では、さまざまな時間スケールで過去のメトリクスデータを確認できます。
* **Evaluation Preview** には、過去と予測のメトリクスデータの組み合わせが表示されます。

### アラートの条件を設定する

* 予測の信頼限界のエッジが `above` または `below` になったときにアラートをトリガーします。
* 次の `24 hours`、`1 week`、`1 month` 内などのしきい値、または `custom` に 12 時間〜3 か月の値を設定します。
* アラートのしきい値: >= `<数値>`
* 警告のしきい値: >= `<NUMBER>`
* アラートの[リカバリしきい値][3]: < `<数値>`
* 警告の[リカバリしきい値][3]: < `<NUMBER>`

#### 高度なオプション

Datadog は、選択したメトリクスを自動的に分析して、複数のパラメーターを設定しますが、**Advanced Options** に、編集可能なオプションがあります。

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="Advanced options" style="width:80%;">}}

| オプション                     | 説明                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [アルゴリズム](#algorithms)   | 予測アルゴリズム（`linear` または `seasonal`）                                                                         |
| モデル                      | 線形アルゴリズムの予測モデル（`default`、`simple`、`reactive`）                                        |
| 季節性                | 季節アルゴリズムの予測季節性（`hourly`、`daily`、`weekly`）                         |
| [夏時間][4] | `daily` または `weekly` の季節性を持つ `seasonal` 予測値モニターで使用できます。                            |
| [Rollup][5]                | ロールアップ間隔&mdash;ポイント間の間隔を大きくすると、予測へのノイズの影響が回避されます。                        |
| 偏差                 | 予測値の範囲の幅&mdash;この値を 1 ～ 2 にすると、大半の「正常」ポイントに対して十分な大きさになります。 |

##### アルゴリズム

利用可能な予測アルゴリズムは `linear` と `seasonal` です。

{{< tabs >}}
{{% tab "Linear" %}}

安定した傾向を持っているが、季節パターンの繰り返しがないメトリクスには線形アルゴリズムを使用します。レベルシフトに対する線形アルゴリズムの感度を制御する 3 つの異なる_モデル_があります。

| モデル    | 説明                                                                                |
|----------|--------------------------------------------------------------------------------------------|
| デフォルト  | 最近のノイズに対してロバストでありながら、直近の傾向に合わせてデータを外挿します。 |
| Simple   | 履歴全体でロバスト線形回帰を行います。                                |
| Reactive | ノイズ、スパイク、ディップに過剰に適合するリスクがありますが、最近の挙動をよりよく外挿します。  |

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple" style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive" style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

繰り返しパターンを持つメトリクスには季節アルゴリズムを使用します。選択肢として 3 つの異なる_季節性_があります。

| オプション  | 説明                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly  | アルゴリズムは挙動が 1 時間単位で過去の同時刻の挙動と同じであることを期待します。たとえば、5:15 の挙動なら 4:15 や 3:15 の挙動と同じ。      |
| Daily   | アルゴリズムは 挙動が 1 日単位で過去の同時刻の挙動と同じであることを期待します。たとえば、今日の午後 5 の挙動なら昨日の午後5 時の挙動と同じ。                                |
| Weekly  | アルゴリズムは 挙動が1 週間単位で過去の同じ曜日の挙動と同じであることを期待します。たとえば、火曜日の挙動なら過去の火曜日の挙動と同じ。        |

**注**: このアルゴリズムには少なくとも 2 シーズンの履歴が必要で、予測には最大 6 シーズンが使用されます。

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### 高度なアラート条件

高度なアラートオプション (データなし、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][6]ページを参照してください。メトリクス固有のオプションのフルデータウィンドウについては、[メトリクスモニター][7]ページを参照してください。

### 通知

For detailed instructions on the **Configure notifications and automations** section, see the [Notifications][8] page.

## API

予測値モニターをプログラムで作成するには、[Datadog API リファレンス][9]を参照してください。Datadog では、[モニターの JSON をエクスポート][10]して API のクエリを作成することを**強く推奨**しています。Datadog の[モニター作成ページ][1]を使用することで、顧客はプレビューグラフと自動パラメーター調整の恩恵を受け、不適切に構成されたモニターを回避できます。

予測値モニターは、他のモニターと[同じ API][11] を使用して管理されますが、`query` プロパティのコンテンツについては、さらに説明が必要です。

リクエストの本文の `query` プロパティには、次の形式のクエリ文字列を含める必要があります。

```text
<aggregator>(<query_window>):forecast(<metric_query>, '<algorithm>', <deviations>, interval=<interval>[, history='<history>'][, model='<model>'][, seasonality='<seasonality>']) <comparator> <threshold>
```

* `aggregator`: 予測値が閾値を下回ったらアラートをトリガーするようにする場合は、`min` を使用します。予測値が閾値を上回ったらアラートをトリガーするようにするには、`max` を使用します。
* `query_window`: A timeframe, for example: `next_4h` or `next_7d`.
* `metric_query`: 標準の Datadog メトリクスクエリ (例: `min:system.disk.free{service:database,device:/data}by{host}`)
* `algorithm`: `linear` または `seasonal`
* `deviations`: 1 と等しい、または 1 より大きい数。このパラメーターは、信頼限界のサイズを制御し、モニターの秘密度を調整できます。
* `interval`:ロールアップ間隔の秒数を表す正の整数。
* `history`: 予測値の作成に使用されるべき過去データの量を表す文字列（例: `1w`、`3d`）。このパラメーターは、`linear` アルゴリズムでのみ使用されます。
* `model`: 使用されるモデルタイプは `default`、`simple`、または `reactive`。このパラメーターは、`linear` アルゴリズムでのみ使用されます。
* `seasonality`: 使用される季節性は `hourly`、`daily`、または `weekly`。このパラメーターは、`seasonal` アルゴリズムでのみ使用されます。
* `comparator`: 予測値が閾値を下回ったらアラートを発生させるには、`<=` を使用します。予測値が閾値を上回ったらアラートする場合は、`>=` を使用します。
* `threshold`: 予測値の信頼限界がこの閾値に達すると「クリティカル」のアラートをトリガーします。

## トラブルシューティング

次の関数は、`forecast()` 関数の呼び出し内にネストすることはできません。<br>
`anomalies`、`cumsum`、`integral`、`outliers`、`piecewise_constant`、`robust_trend`、`trend_line`

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /monitors/types/metric/#define-the-metric
[3]: /monitors/guide/recovery-thresholds/
[4]: /monitors/guide/how-to-update-anomaly-monitor-timezone/
[5]: /dashboards/functions/rollup/
[6]: /monitors/configuration/#advanced-alert-conditions
[7]: /monitors/types/metric/#data-window
[8]: /monitors/notify/
[9]: /api/v1/monitors/#create-a-monitor
[10]: /monitors/manage/status/#settings
[11]: /api/v1/monitors/
