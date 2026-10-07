---
algolia:
  rank: 70
  tags:
  - anomaly
  - anomaly monitor
aliases:
- /ja/guides/anomalies
- /ja/monitors/monitor_types/anomaly
- /ja/monitors/create/types/anomaly/
description: メトリクスの異常動作を履歴データに基づいて検出する
further_reading:
- link: /monitors/notify/
  tag: よくあるご質問
  text: モニター通知の設定
- link: /monitors/downtimes/
  tag: よくあるご質問
  text: モニターをミュートするダウンタイムのスケジュール
- link: /monitors/status/
  tag: よくあるご質問
  text: モニターステータスの参照
- link: dashboards/functions/algorithms/#anomalies
  tag: よくあるご質問
  text: 異常関数
- link: https://www.datadoghq.com/blog/ai-powered-metrics-monitoring/
  tag: ブログ
  text: 異常検知、予測相関 - AI を活用したメトリクスのモニタリング
title: 異常検知モニター
---
## 概要 {#overview}

異常検知は、傾向や、季節的な曜日や時間帯のパターンを考慮しながらメトリクスの挙動が過去のものとは異なる期間を認識するアルゴリズム機能です。これは、しきい値ベースのアラート設定ではモニターすることが困難な強い傾向や反復パターンを持つメトリクスに適しています。

たとえば、異常検知は、平日午後に Web トラフィックが異常に低い場合に (同程度のトラフィックが夜遅くには正常であっても) それを検出するのに役立ちます。または、着実に成長しているサイトへのログイン数を測定するメトリクスを考えてみます。ログイン数は日々増加するため、どのようなしきい値でも古くなりますが、異常検知はログインシステムに問題がある可能性を示唆する、予期しない減少があった場合にアラートで通知することができます。

## モニターの作成 {#monitor-creation}

Datadog で [異常検知モニター][1] を作成するには、メインナビゲーションで [*Monitors --> New Monitor --> Anomaly *] の順に移動します。

### メトリクスの定義 {#define-the-metric}

Datadog に報告されるすべてのメトリクスをモニターで確認できます。詳細は、[メトリクスモニター][2] のページを参照してください。
**注**: `anomalies` 関数は過去のデータを使用して将来の予測を行うため、新しいメトリクスで使用した場合は低品質の結果しか得られない可能性があります。

メトリクスを定義した後、異常検知モニターはエディター内で 2 つのプレビューグラフを表示します。
{{< img src="monitors/monitor_types/anomaly/context.png" alt="過去のコンテキスト" style="width:80%;">}}

* [**履歴ビュー**] では、モニターされたクエリをさまざまな時間単位で観察することができるため、データが異常または正常とみなされる理由をより深く理解できます。
* [**評価プレビュー**] は、アラート設定よりもウィンドウが長く、範囲を計算する際に異常検知アルゴリズムが考慮すべき事項に関して洞察を提供します。

### アラート条件の設定 {#set-alert-conditions}

値が直近の `15 minutes`、`1 hour` などの期間に、境界を `above or below`、`above`、または `below` の条件で外れていた場合にアラートをトリガーします。`custom`を選択すると、15 分から 2 週間の間で期間を設定できます。値が少なくとも `15 minutes`、`1 hour` などの期間、境界内にある場合に回復します。`custom` を選択すると、15 分から 2 週間の間で期間を設定できます。

異常検知
: デフォルトオプション (`above or below`) では、メトリクスが灰色の異常検知帯の外にある場合、異常とみなされます。帯の `above` または `below` にある場合のみを異常とみなすよう任意で指定することもできます。

トリガーウィンドウ
: メトリクスの異常が検知されアラートを発するまでに必要な時間。**注**: アラート設定ウィンドウが短すぎると、疑似ノイズにより誤アラームが発せられることがあります。

回復ウィンドウ
: メトリクスが異常とみなされなくなり、アラートが回復するまでに必要な時間。[**回復ウィンドウ**] は [**トリガーウィンドウ**] と同じ値に設定することをお勧めします。

**注**: [**回復ウィンドウ**] の許容値の範囲は、モニターが回復条件とアラート条件を同時に満たすことができないように、[**トリガーウィンドウ**] と [**アラートしきい値**] によって決定されます。
例:
* `Threshold`: 50%
* `Trigger window`: 4h
回復ウィンドウの許容値の範囲は 121 分 (`4h*(1-0.5) +1 min = 121 minutes`) から 4 時間です。回復ウィンドウを 121 分未満に設定すると、4 時間の時間枠で 50% の異常ポイントが発生し、最後の 120 分では異常ポイントが発生しない可能性があります。

ほかの例:
* `Threshold`: 80%
* `Trigger window`: 4h
回復ウィンドウの許容値の範囲は 49 分 (`4h*(1-0.8) +1 min = 49 minutes`) から 4 時間です。

### Advanced Options (高度なオプション) {#advanced-options}

Datadog は、選択されたメトリクスを自動的に分析して、パラメーターを設定します。ただし、[**Advanced Options**] で手動でオプションを編集できます。

{{< img src="monitors/monitor_types/anomaly/advanced_options.png" alt="異常検知モニター構成ページの [Advanced Options] メニューで、アジャイルアルゴリズムを使用して予測データから 2 偏差逸脱している異常を 1 週間ごとの季節性で検知し、サマータイムを適用し、ロールアップ間隔として 60 秒を使用するように設定した場合" style="width:80%;">}}


Deviations (偏差)
: 灰色の帯の幅。これは、[異常検知関数][3] で使用される範囲のパラメーターに相当します。

Algorithm (アルゴリズム)
: [異常検知アルゴリズム](#anomaly-detection-algorithms) (`basic`、`agile`、または`robust`)。

Seasonality (季節性)
: メトリクスを分析するための `agile` または `robust` アルゴリズムの周期の[時間単位](#seasonality) (`hourly`、`daily`、または `weekly`)。

Daylight savings (サマータイム)
: `weekly` または `daily` 時間単位の `agile` または `robust` 異常検知で使用可能。詳細については、[異常検知とタイムゾーン][4] を参照してください。

Rollup (ロールアップ)
: [ロールアップ間隔][5]。

Thresholds (しきい値)
: アラート、警告、回復を設定するために異常として判断する基準となるパーセンテージ。

### Seasonality {#seasonality}

Hourly (時間単位)
: アルゴリズムは、毎時の特定の分が過去の同じ分と同様に挙動すると想定します。たとえば、5:15 の挙動が 4:15 や 3:15 と同じだと想定します。

Daily (日単位)
: アルゴリズムは、今日の特定の時間が過去の同じ時間と同様に挙動すると想定します。たとえば、今日の午後 5 時の挙動が前日の午後 5 時と同じだと想定します。

Weekly (週単位)
: アルゴリズムは、特定の曜日が過去の同じ曜日と同様に挙動すると想定します。たとえば、今週の火曜の挙動が過去の火曜と同じだと想定します。

**異常検出アルゴリズムに必要なデータ履歴**:  機械学習アルゴリズムは、ベースラインを計算するために、選択された季節性の時間の少なくとも 3 倍の履歴データ時間を必要とします。
たとえば、次のとおりです。

* _weekly_ 季節性には少なくとも 3 週間のデータが必要です。
* _daily_ 季節性には少なくとも 3 日のデータが必要です。
* _hourly_ 季節性には少なくとも 3 時間のデータが必要です。

すべての季節性アルゴリズムは、メトリクスで期待される正常な動作範囲を計算する際に、最大 6 週間の履歴データを使用できます。大量の履歴データを使用することで、アルゴリズムは最近発生した異常な行動に過度の重みを与えることを避けることができます。

### 異常検知アルゴリズム {#anomaly-detection-algorithms}
Basic (基本)
: メトリクスに繰り返しの季節的なパターンがない場合に使用します。Basic では、遅延の繰り返しの分位数を計算して予測値の範囲を決定します。データをほとんど使用せず、状況の変化にすばやく対応しますが、季節的な挙動や長期的な傾向は認識できません。

Agile (アジャイル)
: メトリクスが季節的で、変化することが予期される場合に使用します。アルゴリズムはメトリクスのレベルシフトに合わせてすばやく調整されます。[SARIMA][6] アルゴリズムの安定版。直近のデータを予測に組み込むことで、レベルシフトに合わせてすばやく更新できますが、最近の長期的な異常検知に対する安定性は低下します。

Robust
: 季節的メトリクスで安定性が予測され、緩やかなレベルシフトは異常とみなされる場合に使用します。[季節的傾向分解][7] アルゴリズムの 1 つ。安定性が高く、異常が長期的に続いても予測は一定していますが、意図的なレベルシフトへの対応にはやや時間がかかります (コード変更によってメトリクスのレベルがシフトした場合など)。

## 例 {#examples}
下記のグラフでは、これら 3 つのアルゴリズムがいつどのように異なる挙動を示すか表しています。

#### 1 時間ごとの季節性を考慮した異常検知の比較 {#anomaly-detection-comparison-for-hourly-seasonality}
この例では、`basic` は正常な値の範囲から外れた異常値を正しく特定できますが、繰り返しの季節性パターンは予測値の範囲に組み込まれていません。一方、`robust` と `agile` は、どちらも季節的パターンを認識し、メトリクスが最小値付近で平坦な線になった場合など、より繊細な異常値を検知しています。トレンドも 1 時間ごとのパターンを示しているので、この場合は 1 時間ごとの季節性が最も効果的です。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_1.png" alt="1 日ごとの季節性を考慮した異常検知アルゴリズムの比較" style="width:90%;">}}

#### 1 週間ごとの季節性を考慮した異常検知の比較 {#anomaly-detection-comparison-for-weekly-seasonality}
この例では、メトリクスが突然レベルシフトを示します。`Agile` は `robust` よりも迅速にレベルシフトに適応します。また、`robust` の範囲の幅はレベルシフト後の不確実性の増大を反映して広がりますが、`agile` の範囲の幅は変わりません。`Basic` は、メトリクスが強い 1 週間ごとの季節性パターンを示す、このシナリオには明らかに不適合です。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_2.png" alt="1 週間ごとの季節性を考慮した異常検知アルゴリズムの比較" style="width:90%;">}}

#### 変化に対するアルゴリズム反応の比較 {#comparison-of-algorithm-reactions-to-change}
この例では、1 時間にわたる異常値に対してアルゴリズムがどのように反応するかを示しています。`Robust` は、急激な変化に対する反応が遅いため、このシナリオでは異常値の境界を調整しません。ほかのアルゴリズムは、この異常値が新しい正常値であるかのように振る舞い始めます。`Agile` は、メトリクスが元のレベルに戻ったことも異常値として特定しています。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_3.png" alt="1 時間ごとの季節性を考慮した異常検知アルゴリズムの比較" style="width:90%;">}}

#### スケールに対するアルゴリズム反応の比較 {#comparison-of-algorithm-reactions-to-scale}
これらのアルゴリズムはスケールの扱いも異なります。`Basic` と `robust` はスケールの影響を受けませんが、`agile` は影響を受けます。左下のグラフでは、`agile` と `robust` がレベルシフトを異常としてマークしています。右側で、同じメトリクスに 1000 を加算したところ、`agile` ではレベルシフトを異常とみなすコールアウトは見られなくなりますが、`robust` では引き続き見られます。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_scale.png" alt="スケールに関するアルゴリズムの比較" style="width:90%;">}}

#### 新しいメトリクスによる異常検知の比較 {#anomaly-detection-comparison-for-new-metrics}
この例では、各アルゴリズムが新しいメトリクスをどのように処理するか示しています。`Robust` と `agile` では、最初の数周期 (週単位) は範囲がまったく表示されていません。`Basic` では、メトリクスが最初に表示された直後から範囲が表示されています。

{{< img src="monitors/monitor_types/anomaly/alg_comparison_new_metric.png" alt="新しいメトリクスに関するアルゴリズムの比較" style="width:90%;">}}

## 高度なアラート条件 {#advanced-alert-conditions}

高度なアラートオプション (自動解決、評価遅延など) の詳細な手順については、[モニターコンフィギュレーション][8] ページを参照してください。メトリクス固有のオプションのフルデータウィンドウについては、[メトリクスモニター][9] ページを参照してください。

## 通知 {#notifications}

[**通知と自動化の構成**] セクションの詳細な手順については、[通知][10] のページを参照してください。

## API {#api}

Enterprise プランの顧客は、[create-monitor API エンドポイント][11] を使用して、異常検知モニターを作成できます。Datadog では、API 用のクエリを作成する際に [モニターの JSON をエクスポート][12] することを**強く推奨**します。Datadog の [モニター作成ページ][1] を使用すると、プレビューグラフとパラメーターの自動調整を利用でき、不適切に構成されたモニターの回避に役立ちます。

異常モニターは、ほかのモニターと [同じ API][14] を使用して管理されます。これらのフィールドは、異常モニターに固有です。

### `query` {#query}

リクエストの本文の `query` プロパティには、次の形式のクエリ文字列を含める必要があります。

```text
avg(<query_window>):anomalies(<metric_query>, '<algorithm>', <deviations>, direction='<direction>', alert_window='<alert_window>', interval=<interval>, count_default_zero='<count_default_zero>' [, seasonality='<seasonality>']) >= <threshold>
```

`query_window`
: `last_4h` や `last_7d` などのタイムフレーム。このパラメーターは、通知グラフに表示されるデータの時間範囲を制御します。`query_window` は、視覚化に表示される履歴データの量を決定しますが、アラートの評価には影響しません。Datadog では、追加コンテキストを提供するために、`query_window` は `alert_window` の約 5 倍にすることを推奨しています。**注**: `query_window` は、少なくとも `alert_window` と同じ大きさである必要があります。

`metric_query`
: 標準の Datadog メトリクスクエリ (例: `sum:trace.flask.request.hits{service:web-app}.as_count()`)。

`algorithm`
: `basic`、`agile`、または`robust`。

`deviations`
: 正の数。異常検知の感度を制御します。

`direction`
: アラートをトリガーする異常の方向性。: `above`、`below`、または`both`。

`alert_window`
: 異常をチェックするタイムフレーム (例: `last_5m`、`last_1h`)。

`interval`
: ロールアップ間隔の秒数を表す正の整数。これは、`alert_window` 期間の 5 分の 1 以下でなければなりません。

`count_default_zero`
: ほとんどのモニターでは `true` を使用します。値の欠如をゼロとして解釈しては_ならない_カウントメトリクスを送信する場合にのみ、`false` に送信します。

`seasonality`
: `hourly`、`daily`、または`weekly`。`basic` アルゴリズムを使用するときはこのパラメーターを除外します。

`threshold`
: 1 以下の正の数。クリティカルアラートをトリガーするために異常である必要がある `alert_window` 内のポイントの割合。

下記の例は、異常検知モニターのクエリを示したものです。Cassandra ノードの平均 CPU が直近 5 分間で通常値を上回る 3 つの標準偏差である場合にアラートを発します。

```text
avg(last_1h):anomalies(avg:system.cpu.system{name:cassandra}, 'basic', 3, direction='above', alert_window='last_5m', interval=20, count_default_zero='true') >= 1
```

このクエリでは、次の 2 か所で `avg` を使用しています。
- `avg(last_1h)` - 通知グラフのためにクエリウィンドウ全体の異常データポイントを集計します。
- `avg:system.cpu.system{name:cassandra}` - 異常検知の前に Cassandra ノード全体の CPU メトリクスを集計します。

### `options` {#options}

`thresholds` と `threshold_windows` を除いて、リクエスト本文の `options` にあるほとんどのプロパティは、ほかのクエリアラートと同じです。

`thresholds`
: 異常検知モニターでは、`critical`、`critical_recovery`、`warning`、および `warning_recovery` のしきい値をサポートしています。しきい値は 0 から 1 の数値で表され、関連するウィンドウにおける異常の割合として解釈されます。たとえば、`critical` のしきい値が `0.9` の場合、`trigger_window` (後述) 内のポイントの少なくとも 90% が異常なときに、クリティカルアラートがトリガーされます。あるいは、`warning_recovery` の値が 0 の場合、`recovery_window` 内のポイントの 0% が異常であるときにのみ、モニターは warning 状態から回復します。
: `critical` の `threshold` は、`query` で使用している `threshold` と一致する必要があります。

`threshold_windows`
: 異常検知モニターでは、`options` に `threshold_windows` プロパティがあります。`threshold_windows` には、`trigger_window` と `recovery_window` の 2 つのプロパティの両方を含める必要があります。これらのウィンドウは、`last_10m` や `last_1h` などのタイムフレーム文字列として表現されます。`trigger_window` は、`query` の `alert_window` と一致する必要があります。`trigger_window` は、モニターをトリガーする必要があるかを評価する際に異常について分析する時間範囲です。`recovery_window` は、トリガーされたモニターを回復する必要があるかを評価する際に異常について分析する時間範囲です。

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

## トラブルシューティング {#troubleshooting}

* [異常検知モニターに関する FAQ][15]
* [異常モニターのタイムゾーンを更新する][16]
* [Datadog サポートへのお問い合わせ][17]

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/monitors/create/anomaly
[2]: /ja/monitors/types/metric/#define-the-metric
[3]: /ja/dashboards/functions/algorithms/#anomalies
[4]: /ja/monitors/guide/how-to-update-anomaly-monitor-timezone/
[5]: /ja/dashboards/functions/rollup/
[6]: https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average
[7]: https://en.wikipedia.org/wiki/Decomposition_of_time_series
[8]: /ja/monitors/configuration/#advanced-alert-conditions
[9]: /ja/monitors/types/metric/#data-window
[10]: /ja/monitors/notify/
[11]: /ja/api/v1/monitors/#create-a-monitor
[12]: /ja/monitors/status/#settings
[13]: mailto:billing@datadoghq.com
[14]: /ja/api/v1/monitors/
[15]: /ja/monitors/guide/anomaly-monitor/
[16]: /ja/monitors/guide/how-to-update-anomaly-monitor-timezone/
[17]: /ja/help/