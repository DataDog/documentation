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
予測機能は、メトリクスが今後どこに向かうかを予測するためのアルゴリズム機能です。強い傾向や繰り返しパターンがあるメトリクスに適しています。

たとえば、アプリケーションがより短い間隔でログを記録し始めた場合、予測値機能は、ログローテーションポリシーを更新するための時間を十分に取れるように、ディスクが満杯になる 1 週間前にアラートを生成します。あるいは、ユーザーのサインアップなどのビジネスメトリクスを予測して、四半期目標へ向けた進捗状況を追跡できます。

## 予測値機能

Datadog クエリ言語に `forecast` 関数があります。この関数を系列に適用すると、通常の結果に加えて、将来の予測値が返されます。

## モニターの構築

メトリクスがしきい値に達することが予測されたときにトリガーするモニターを作成できます。予測値の範囲の一部がしきい値を超えると、アラートがトリガーします。典型的な使用例として、使用パターンが類似しているディスクグループを監視する `max:system.disk.in_use{service:service_name, device:/data} by {host}` を考えます。

**予測値アラート**の[モニターページ][1]に移動します。次に、他のメトリクスモニターの場合と同様に、**Define the metric** セクションに入力します。

{{< img src="monitors/monitor_types/forecasts/alert_conditions.png" alt="alert conditions"  style="width:80%;">}}

予測値アラートを設定するには、以下の 3 つの必須オプションを設定する必要があります。

* アラートがトリガーされるしきい値。`system.disk.in_use` のようなメトリクスは 1.0 に、`system.mem.pct_usable` のようなメトリクスは 0.0 に設定します。[リカバリしきい値][2]も設定する必要があります。
* アラートがトリガーされる条件。`system.disk.in_use` のようなメトリクスは「above or equal to」に、`system.mem.pct_usable` のようなメトリクスは「below or equal to」に設定します。
* メトリクスがしきい値に達するどのくらい前にアラートを受け取るかを制御します。

{{< img src="monitors/monitor_types/forecasts/alert_advanced.png" alt="alert advanced"  style="width:80%;" >}}

Datadog は、メトリクスを分析して、自動的に **Advanced** オプションを設定します。**Define the metric** セクションで何らかの変更を行うと、Advanced オプションが変更されることがあります。

* ここで使用される予測値アルゴリズムは変更できます。使用ケースに応じて最適なアルゴリズムを選択する方法のヒントは、[予測値アルゴリズム](#forecast-algorithms) セクションを参照してください。各アルゴリズムには追加の設定がありますが、次のセクションで説明します。
* ノイズが予測値に影響し過ぎないように、ポイントの間隔を大きくすることをお勧めします。
* deviations の値は、予測値の範囲の幅を制御します。この値を 1 ～ 2 にすると、大半の「正常」ポイントを正確に予測できます。

次に、モニターが評価のためにウィンドウ全体のデータを必要とするかどうかを選択できます。これを「Requires」に設定すると、モニターは、評価ウィンドウグラフに表示されるタイムレンジの先頭につながるデータがない系列を無視します (モニターステータスには「No Data」と表示)。

New Monitor フォームのすべてのステップを完了し (**Say what's happening** など)、**Save** をクリックすると、予測モニターが作成されます。

Monitor Edit ページと Monitor Status ページにはどちらも「履歴的コンテキスト」があり、メトリクスが過去にどのように動作したかを確認できます。これにより、将来の値を予測する際に予測アルゴリズムが何を考慮したかを把握できます。

## 予測値アルゴリズム

以下の 2 種類の予測値アルゴリズムがあります。

**線形**: 繰り返しの季節性パターンがなく一定の傾向を持つメトリクスには、このアルゴリズムを使用します。ダッシュボードでは、線形アルゴリズムがビュー内のデータを使用して同じ長さの予測値を作成します。たとえば、タイムセレクターを「The Past Week」に設定すると、予測機能は、過去 1 週間のデータを使用して、次の 1 週間を予測します。モニターで使用する履歴の量を明示的に設定でき、デフォルトでは1 週間に設定されます。

{{< img src="monitors/monitor_types/forecasts/linear.png" alt="linear"  style="width:80%;" >}}

線形アルゴリズムには、アルゴリズムのレベル変化に対する感度を制御する 3 種類のモデルがあります。

"simple" モデルは、履歴全体でロバスト線形回帰を行います。

{{< img src="monitors/monitor_types/forecasts/linear_simple.png" alt="linear simple"  style="width:80%;">}}

"reactive" モデルは、より簡易に最近の挙動を外挿しますが、ノイズ、上下のスパイクなどに過剰に適合する恐れがあります。

{{< img src="monitors/monitor_types/forecasts/linear_reactive.png" alt="linear reactive"  style="width:80%;" >}}

"default" モデルは、直近の傾向に合わせた穏便な選択を行います。直線を外挿しますが、直近のノイズに対して安定的です。

{{< img src="monitors/monitor_types/forecasts/linear_default.png" alt="linear default"  style="width:80%;">}}

**季節性:** 季節性変動があるメトリクスには、このアルゴリズムを使用します。モニターでは、Datadog がメトリクスの季節性を自動検出して、weekly、daily、hourly の季節性を選択します。このアルゴリズムでは、予測を開始するために少なくとも 2 シーズンの履歴が必要で、最大 6 つのシーズンを使用します。

季節性オプションの例

* **weekly**: このアルゴリズムは、次の月曜日の動作が過去の月曜と同じであると予測します。
* **daily**: このアルゴリズムは、今日の午後 7 時が過去数日の午後 7 時と同じであると想定します。
* **hourly**: このアルゴリズムは、7:15 の動作が 6:15、5:15、4:15 などと同じであると予測します。

{{< img src="monitors/monitor_types/forecasts/seasonal.png" alt="seasonal"  style="width:80%;">}}

### 高度なオプションへのアクセス

**New Monitor** ページの **Advanced** タブで高度なオプションにアクセスします。ダッシュボード (JSON タブを使用) または API で高度なオプションを指定するには、以下の書式を使用します。

線形の場合: `forecast(metric_name, 'linear', 1, interval='60m', history='1w', model='default')`。ここで、`model` のオプションは、`default`、`simple`、`reactive` です。

季節性の場合: `forecast(metric_name, 'seasonal', 1, interval='60m', seasonality='weekly')`。ここで、`seasonality` のオプションは、`hourly`、`daily`、`weekly` です。

API を使用する場合は、予測値自体の開始時間と終了時間を指定します。翌日の予測値が必要な場合は、開始を `now`、終了を `1 day ahead` に指定します。

### 注意事項

`forecast()` 関数の呼び出しの中にすべての関数をネストできるわけではありません。特に、`anomalies()`、`cumsum()`、`integral()`、`outliers()`、`piecewise_constant()`、`robust_trend()`、`trend_line()` の各関数は、予測モニターまたはダッシュボードクエリに組み込めません。

## その他の参考資料

{{< partial name="whats-next/whats-next.html"  >}}

[1]: https://app.datadoghq.com/monitors#create/forecast
[2]: /ja/monitors/faq/what-are-recovery-thresholds