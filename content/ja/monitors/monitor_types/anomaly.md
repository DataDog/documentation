---
title: 異常検知モニター
kind: documentation
aliases:
  - /ja/guides/anomalies
description: メトリクスの異常動作を履歴データに基づいて検出する
further_reading:
  - link: /monitors/notifications/
    tag: Documentation
    text: モニター通知の設定
  - link: /monitors/downtimes/
    tag: Documentation
    text: モニターをミュートするダウンタイムのスケジュール
  - link: /monitors/monitor_status/
    tag: Documentation
    text: モニターステータスの参照
---
## 概要

異常検知は、傾向や、季節的な曜日や時間帯のパターンを考慮しながらメトリクスの挙動が過去のものとは異なる期間を認識するアルゴリズム機能です。これは、しきい値ベースのアラート設定では監視することが困難な強い傾向や反復パターンを持つメトリクスに適しています。

たとえば、 ある平日のウェブトラフィック量が夜間帯は通常であるにもかかわらず、午後は異常に低い時間帯を見つけることができます。また、確実にアクセス数が伸びているサイトへのログイン数を測定するメトリクスを考慮できます。 何故なら、ログイン数が日々増加すると、しきい値がすぐに古くなってしまいますが、ログインシステムの潜在的な問題を示唆する予想外の激減が見られた場合、異常検知が警告してくれるからです。

## モニターの作成

Datadog で[異常検知モニター][1]を作成するには、メインナビゲーション画面で*Monitors --> New Monitor --> Anomaly* の順に移動します。

### メトリクスの定義

現在 Datadog にレポートが送信されるメトリクスはすべて、モニターに使用できます。詳細については、[メトリクスモニター][2]ページをご確認ください。
**注**: `anomalies` 関数は過去のデータを使用して今後の予想を立てるため、新しいメトリクスで使用するとあまり正確な結果が得られないことがあります。

メトリクスを定義すると、異常検知モニターにより作成された 2 種のグラフがエディターに表示されます。
{{< img src="monitors/monitor_types/anomaly/context.png" alt="時系列表示"  style="width:80%;">}}

* **Historical View** では、監視クエリをさまざまな時間単位で観察することができるため、 データが異常または正常とみなされる理由をより深く理解できます。
* **Evaluation Preview** は、アラート設定よりもウィンドウが長く、範囲を計算する際に異常検知アルゴリズムが考慮すべき事項に関して洞察を提供します。

### アラートの条件を設定する

* 値が `above or below`、`above`、`below` の場合、アラートをトリガーする
* 過去 `15 minutes`、`1 hour` などの範囲、または `custom` に 15 分～24 時間の値を設定します。
* 値が少なくとも `15 minutes`、`1 hour` などの範囲内にある場合は回復するか、`custom` に 15 分〜24 時間の値を設定します。

**異常検知** - デフォルト (`above or below`) では、メトリクスが灰色の範囲外にある場合、異常とみなされます。範囲の `above` または `below` にある場合のみを異常とみなすよう任意で指定することもできます。

**トリガーウィンドウ** - メトリクスの異常が検知されアラートを発するまでに必要な時間。**注意**: アラート設定ウィンドウがあまりに短いと、疑似ノイズにより不正アラームが発せられることがあります。

**リカバリウィンドウ** - メトリクスを異常とみなさないでアラートをリカバリするために必要な時間。

#### 高度なオプション

Datadog は、選択したメトリクスを自動的に分析して、複数のパラメーターを設定しますが、**Advanced Options** に、編集可能なオプションがあります。

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="高度なオプション"  style="width:80%;">}}

| オプション                      | 説明                                                                                                                |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------|
| 偏差                  | 灰色の帯幅。[異常検知関数][3]で使用される範囲のパラメータに相当する。                |
| アルゴリズム                   | [異常検知アルゴリズム](#異常検知アルゴリズム) (`basic`、`agile`、`robust`)。                          |
| [季節性](#seasonality) | メトリクスを分析する `agile` または `robust` アルゴリズムの季節性 (`hourly`、`daily`、`weekly`) サイクル。 |
| [夏時間][4]  | `agile` または `robust` の異常検知で季節性に `weekly` または `daily` を使用する場合に利用可能。                                  |
| [Rollup][5]                 | rollup の間隔。                                                                                                       |
| しきい値                  | アラート、警告、リカバリを設定するために異常として判断する基準となるパーセンテージ。                                    |

##### 季節性

| オプション | 説明                                                                                                                                   |
|--------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Hourly | アルゴリズムは挙動が 1 時間単位で過去の同時刻の挙動と同じであることを期待します。たとえば、5:15 の挙動なら 4:15 や 3:15 の挙動と同じ。 |
| Daily  | アルゴリズムは 挙動が 1 日単位で過去の同時刻の挙動と同じであることを期待します。たとえば、今日の午後 5 の挙動なら昨日の午後5 時の挙動と同じ。                           |
| Weekly | アルゴリズムは 挙動が1 週間単位で過去の同じ曜日の挙動と同じであることを期待します。たとえば、火曜日の挙動なら過去の火曜日の挙動と同じ。   |

**注**: 機械学習アルゴリズムが十分な効果を上げるには、選択した季節性時間の少なくとも 2 倍の長さの履歴データ時間が必要です。

##### 異常検知アルゴリズム

| オプション | 使用例                                                                                       | 説明                                                                                                                                                                                                                                                           |
|--------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Basic  | 季節的なパターンを繰り返さないメトリクス                                                     | 遅延の繰り返しの分位数を計算して予測値の範囲を決定します。データをほとんど使用せず、状況の変化にすばやく対応しますが、季節的な挙動や長期的な傾向は認識できません。                                         |
| アジャイル  | シフトが予測される季節的なメトリクス。このアルゴリズムはメトリクスのレベルシフトにすばやく対応する必要がある | [SARIMA][6] アルゴリズムの安定版。直近のデータを予測に組み込むことで、レベルシフトに合わせてすばやく更新できますが、最近の長期的な異常検知に対する安定性は低下します。                                                |
| Robust | 安定性が予測される季節的メトリクス。緩やかなレベルシフトは異常とみなされる             | [季節的傾向分解][7]アルゴリズムの 1 つ。極めて安定性が高く、異常が長期的に続いても予測は一定していますが、意図的なレベルシフトへの対応にはやや時間がかかります (コード変更によってメトリクスのレベルがシフトした場合など)。 |

季節性アルゴリズムはすべて、メトリクスの挙動の正常範囲を予測する際に、最大で数か月分の履歴データを使用します。過去データを大量に使用することで、通常とは異なる挙動が最近発生していた場合、アルゴリズムはこれを重視しません。

**例**:<br>
下記のグラフでは、これら 3 つのアルゴリズムがいつどのように異なる挙動を示すか表しています。

この例では、`basic` は正常値範囲を超えてスパイクする異常値を正しく特定していますが、反復的な季節的パターンが予測値範囲に含まれていません。対照的に、`robust` と `agile` は、どちらも季節的パターンを認識し、メトリクスが最小値付近で平坦な線になった場合など、より繊細な異常値を検知しています。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="アルゴリズムの比較 1"  style="width:90%;">}}

この例では、メトリクスが突然のレベルシフトを示しています。`Agile` は `robust` よりも早くレベルシフトに対応しています。さらに、レベルシフト以降、`robust` の範囲はより大きな不確実性を反映して広がっていますが、`Agile` の範囲に変化は見られません。また、メトリクスが週単位の強い季節性パターンを示すシナリオでは、`Basic` が適していないことは明らかです。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="アルゴリズムの比較 2"  style="width:90%;">}}

この例では、1 時間にわたる異常値に対してアルゴリズムがどのように反応するかを示しています。 `Robust` はこの異常値を完全に無視しています。他のアルゴリズムは、この異常値があたかも新しい正常値であるかのように振る舞い始めます。`Agile` は、メトリクスが元のレベルに戻ったことも異常値として認識しています。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="アルゴリズムの比較 3"  style="width:90%;">}}

これらのアルゴリズムはスケールの扱いも異なります。`Basic` と `robust` はスケールの影響を受けませんが、`agile` は影響を受けます。下の左側のグラフでは、`agile` と `robust` がレベルシフトを異常としてマークしています。右側のグラフで、同じメトリクスに 1000 を加算したところ、`agile` ではレベルシフトを異常とみなすコールアウトは見られなくなりますが、`robust` では引き続き見られます。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="アルゴリズムの比較 (スケール)"  style="width:90%;">}}

この例では、各アルゴリズムが新しいメトリクスをどのように処理するか示しています。 `Robust` と `agile` では、最初の数日は範囲がまったく表示されていません (週単位)。`Basic` では、メトリクスが最初に表示された直後から範囲が表示されています。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="アルゴリズムの比較 (新しいメトリクス)"  style="width:90%;">}}

### 通知

**Say what's happening** セクションと **Notify your team** セクションの詳細については、[通知][8]ページをご確認ください。

## API

エンタープライズレベルのお客様は、[モニターの作成 API エンドポイント][9]を使用して異常検知モニターを作成できます。Datadog では、[モニターの JSON をエクスポート][10]して API のクエリを作成することを**強く推奨**しています。Datadog の[モニター作成ページ][1]を使用することで、顧客はプレビューグラフと自動パラメーター調整の恩恵を受け、不適切に構成されたモニターを回避できます。

**注**: 異常検知モニターは、エンタープライズレベルのお客様専用のサービスです。プロレベルのお客様で、異常検知モニターのご利用を希望される場合は、カスタマーサクセス担当者にお問い合わせいただくか、[Datadog 請求担当チーム][11]にメールでお問い合わせください。

異常モニターは、他のモニターと[同じ API][12] を使用して管理されます。これらのフィールドは、異常モニターに固有です。

### `query`

リクエストの本文の `query` プロパティには、次の形式のクエリ文字列を含める必要があります。

```text
avg(<query_window>):anomalies(<metric_query>, '<algorithm>', <deviations>, direction='<direction>', alert_window='<alert_window>', interval=<interval>, count_default_zero='<default_zero>' [, seasonality='<seasonality>']) >= <threshold>
```

* `query_window`: `last_4h` や `last_7d` などのタイムフレーム。通知のグラフに表示される時間ウィンドウ。少なくとも `alert_window` と同じ大きさでなければならず、`alert_window` の約 5 倍にすることをお勧めします
* `metric_query`: 標準の Datadog メトリクスクエリ (例: `sum:trace.flask.request.hits{service:web-app}.as_count()`)
* `algorithm`: `basic`、`agile`、または `robust`
* `deviations`: 正の数。異常検出の感度を制御します
* `direction`: アラートをトリガーする異常の方向性。`above`、`below`、または `both`
* `alert_window`: 異常をチェックするタイムフレーム (例: `last_5m`、`last_1h`)
* `interval`:ロールアップ間隔の秒数を表す正の整数。`interval` は少なくとも `alert_window` 期間の 5 分の 1 にすることをお勧めします
* `default_zero`: ほとんどのモニターでは `true` を使用します。値の欠如をゼロとして解釈してはならないカウントメトリクスを送信する場合にのみ、`false` に設定します
* `seasonality`: `hourly`、`daily`、または `weekly`。`basic` アルゴリズムを使用するときはこのパラメーターを除外します
* `threshold`: 1 以下の正の数。クリティカルアラートをトリガーするために異常である必要がある `alert_window` 内のポイントの割合

下記の例は、異常検知モニターのクエリを示したものです。Cassandra ノードの平均 CPU が直近 5 分間で通常値を上回る 3 つの標準偏差である場合にアラートを発します。

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

### `options`

`thresholds` と `threshold_windows` を除いて、リクエスト本文の `options` にあるほとんどのプロパティは、他のクエリアラートと同じです。

**`thresholds`**

異常モニターは、`critical`、`critical_recovery`、`warning`、`warning_recovery` のしきい値をサポートします。しきい値は 0 から 1 までの数値で表され、異常である関連ウィンドウの割合として解釈されます。たとえば、`critical` のしきい値が `0.9` の場合、`trigger_window` (以下で説明) のポイントの少なくとも 90％ に異常があると、クリティカルアラートがトリガーされます。または、`warning_recovery` の値が 0 の場合、`recovery_window` のポイントの 0％ が異常である場合にのみ、モニターが警告状態から回復します。

`critical` `threshold` は、`query` で使用される `threshold` と一致する必要があります。

**`threshold_windows`**

異常モニターでは、`options` に `threshold_windows` プロパティがあります。`threshold_windows` には、`trigger_window` と `recovery_window` の 2 つのプロパティの両方を含める必要があります。これらのウィンドウは、`last_10m` や `last_1h` などのタイムフレーム文字列として表現されます。`trigger_window` は、`query` の `alert_window` と一致する必要があります。`trigger_window` は、モニターをトリガーする必要があるかどうかを評価するときに異常について分析される時間範囲です。`recovery_window` は、トリガーされたモニターを回復する必要があるかどうかを評価するときに異常を分析した時間範囲です。

しきい値としきい値ウィンドウの標準コンフィギュレーションは次のようになります。

```json
"options": {
  ...
  "thresholds": {
    "critical": 1,
    "critical_recovery": 0
  },
  "threshold_windows": {
    "trigger_window": "last_30m",
    "recovery_window": "last_30m"
  }
}
```

## トラブルシューティング

* [異常検知モニターに関する FAQ][13]
* [Datadog サポートへのお問い合わせ][14]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors#create/anomaly
[2]: /ja/monitors/monitor_types/metric/#define-the-metric
[3]: /ja/dashboards/functions/algorithms/#anomalies
[4]: /ja/monitors/faq/how-to-update-anomaly-monitor-timezone/
[5]: /ja/dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /ja/monitors/notifications/
[9]: /ja/api/v1/monitors/#create-a-monitor
[10]: /ja/monitors/monitor_status/#settings
[11]: mailto:billing@datadoghq.com
[12]: /ja/api/v1/monitors/
[13]: /ja/monitors/faq/anomaly-monitor/
[14]: /ja/help/