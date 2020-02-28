---
title: 予測値モニター
kind: documentation
aliases:
  - /ja/guides/forecasts/
further_reading:
  - link: monitors/notifications
    tag: Documentation
    text: モニター通知の設定
  - link: monitors/downtimes
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: monitors/monitor_status
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

予測機能は、メトリクスが今後どこに向かうかを予測するためのアルゴリズム機能です。強い傾向や繰り返しパターンがあるメトリクスに適しています。たとえば、アプリケーションがより短い間隔でログを記録し始めた場合、予測値機能は、ログローテーションポリシーを更新するための時間を十分に取れるように、ディスクが満杯になる 1 週間前にアラートを生成します。あるいは、ユーザーのサインアップなどのビジネスメトリクスを予測して、四半期目標へ向けた進捗状況を追跡できます。

## モニターの作成

Datadog で[予測値モニター][1]を作成するには、メインナビゲーションを使用して次のように移動します: *Monitors --> New Monitor --> Forecast*。

### メトリクスの定義

現在 Datadog にレポートが送信されるメトリクスはすべて、モニターに使用できます。詳細については、[メトリクスモニター][2]ページをご確認ください。

メトリクスを定義すると、予測値モニターはエディターに 2 つのプレビューグラフを表示します。
{{< img src="monitors/monitor_types/forecasts/editor_graphs.png" alt="エディターグラフ"  style="width:95%;">}}

* **Historical View** では、さまざまな時間スケールで過去のメトリクスデータを確認できます。
* **Evaluation Preview** には、過去と予測のメトリクスデータの組み合わせが表示されます。

### アラートの条件を設定する

* 予測の信頼限界のエッジが `above` または `below` になったときにアラートをトリガーします。
* 次の `24 hours`、`1 week`、`1 month` などのしきい値
* アラートのしきい値: >= `<数値>`
* アラートの[リカバリしきい値][3]: < `<数値>`

#### 高度なオプション

Datadog は、選択したメトリクスを自動的に分析して、複数のパラメーターを設定しますが、**Advanced Options** に、編集可能なオプションがあります。

{{< img src="monitors/monitor_types/forecasts/advanced_options.png" alt="高度なオプション"  style="width:80%;">}}

| オプション                     | 説明                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------|
| [アルゴリズム](#algorithms)   | 予測アルゴリズム（`linear` または `seasonal`）                                                                         |
| Model                      | 線形アルゴリズムの予測モデル（`default`、`simple`、`reactive`）                                        |
| 時間単位                | 季節アルゴリズムの予測季節性（`hourly`、`daily`、`weekly`）                         |
| [夏時間][4] | `daily` または `weekly` の季節性を持つ `seasonal` 予測値モニターで使用できます。                            |
| [ロールアップ][5]                | ロールアップ間隔&mdash;ポイント間の間隔を大きくすると、予測へのノイズの影響が回避されます。                        |
| 逸脱                 | 予測値の範囲の幅&mdash;この値を 1 ～ 2 にすると、大半の「正常」ポイントに対して十分な大きさになります。 |

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

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="線形デフォルト"  style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="線形シンプル"  style="width:80%;">}}

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="線形リアクティブ"  style="width:80%;" >}}

{{% /tab %}}
{{% tab "Seasonal" %}}

繰り返しパターンを持つメトリクスには季節アルゴリズムを使用します。選択肢として 3 つの異なる_季節性_があります。

| オプション  | 説明                                                                                                                                        |
|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| 時間単位  | アルゴリズムは挙動が過去の同時刻の挙動と同じであることを期待します。たとえば、5:15 の挙動なら 4:15 や 3:15 の挙動と同じ。      |
| 日単位   | アルゴリズムは挙動が過去の同時刻の挙動と同じであることを日単位で期待します。たとえば、今日の午後 5 の挙動なら昨日の午後5 時の挙動と同じ。                                |
| 週単位  | アルゴリズムは週単位で挙動が過去の同じ曜日の挙動と同じであることを期待します。たとえば、火曜日の挙動なら過去の火曜日の挙動と同じ。        |

**注**: このアルゴリズムには少なくとも 2 シーズンの履歴が必要で、予測には最大 6 シーズンが使用されます。

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="季節"  style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### 通知

**Say what's happening** と **Notify your team** のセクションに関する詳しい説明は、[通知][6]のページを参照してください。

## API

プログラムで予測値モニターを作成するには、[Datadog API リファレンス][7]を参照してください。Datadog は、[モニターの JSON をエクスポート][8]して API のクエリを作成することを推奨しています。

## トラブルシューティング

次の関数は、`forecast()` 関数の呼び出し内にネストすることはできません。<br>
`anomalies`、`cumsum`、`integral`、`outliers`、`piecewise_constant`、`robust_trend`、`trend_line`

## その他の参考資料


{{< partial name="whats-next/whats-next.html"  >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /ja/monitors/monitor_types/metric/#define-the-metric
[3]: /ja/monitors/faq/what-are-recovery-thresholds
[4]: /ja/monitors/faq/how-to-update-anomaly-monitor-timezone
[5]: /ja/dashboards/functions/rollup
[6]: /ja/monitors/notifications
[7]: /ja/api/#create-a-monitor
[8]: /ja/monitors/monitor_status/#settings