---
last_modified: 2017/08/25
translation_status: tentative
language: ja
title: Anomaly Detection (異常値検知)
kind: guide
listorder: 16
beta: false
---

<!--
Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account day-of-week and time-of-day patterns. It's well suited for metrics with recurring patterns that are hard or impossible to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon&mdash;even though that same level of traffic would be perfectly normal later in the evening.
Or consider a metric measuring the number of logins to your steadily-growing site. As the number is increasing every day, any threshold would be quickly outdated, whereas anomaly detection can quickly alert you if there is an unexpected drop&mdash;potentially indicating an issue with the login system.
-->

Anomaly Detection は、アルゴリズムベースの異常検出機能です。過去の挙動、つまり1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日の変動パターンを考慮した際に、普段とは異なる挙動がみられた際に検出することができます。これは、閾値ベースのアラートモニタリングで監視することが困難であったり不可能な、強い傾向のある繰り返しパターンを持ったメトリクスに適しています。

Anomaly Detectionは、例えばWebのトラフィックが平日の午後に異常に低いような場合、それが同日の夜間と同じレベルのトラフィックとして通常はまったくの正常とみなされてしまうような場合であっても、発見することが出来ます。
あるいはまた、堅調にユーザー規模が拡大しているwebサービスへのログイン数を測定しているメトリックについても検討してみてください。数字が毎日増えているため、定数で設定した閾値はすぐに古くなり得ますが、予期せぬ問題が生じてログインシステムに問題が発生している可能性があるような場合は、Anomaly Detectionがすばやく警告することができます。

<!--
## How to Use Anomaly Detection on Your Data

We've added a new query function called `anomalies` to our query language. When you apply this function to series, it returns the usual results along with an expected "normal" range.

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.
-->

## Anomaly Detectionの利用法

Datadogは`anomalies`と呼ぶ新しいクエリ関数を追加しています。メトリクスの時系列データにこの関数を適用すると、"正常と期待される変動幅"を結果として返します。

`anomalies`は、将来に期待される変動を予測するために過去の時系列データを使用しますので、データを収集して間もないメトリクスについて`anomalies`を適用しても効果は得られないことに注意して下さい。

<!--
### Visualize Anomalies in Dashboards

The chart below shows a dashboard chart that uses anomaly detection. The grey band represents the region where the metric is expected to be based on past behavior. The blue and red line is the actual observed value of the metric; the line is blue when within the expected range and red when it is outside of the expected range.
-->

### Anomaly Detectionをダッシュボードで可視化する

下記では、Anomaly Detectionを適用したメトリクスのグラフを表示しています。グレーのバンドは過去の挙動から期待されるメトリクスの正常な変動幅を示しています。青と赤の折れ線は、実際に取得されたメトリクスの値です。また、青い線は正常な変動幅に収まっており、赤い線は変動幅を逸脱していることを示しています。

{{< img src="anomalies/dashboard_graph.png" >}}

<!--
To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type and select "lines" from the Display menu. Other visualization types do not yet support anomaly detection. In the chart editor window, you should see something like this:
-->

Anomaly Detectionの利用を開始するには、メトリクスの時系列グラフをダッシュボードに追加することから始めます。下記に示したように、グラフの可視化は "Timeseries" を、グラフ形式を"lines" (折れ線グラフ)として選択します。他の可視化タイプはAnomaly Detectionでは現時点でサポートされておりません。エディター画面は以下のようになります:

{{< img src="anomalies/initial_editor.png" >}}

<!--
Now, click on the + icon (Add functions and modifiers) on the right side of your expression. In the "Modify your query" box, choose the "anomalies" function:
-->

次に、メトリクスの各設定ボックスの右手、プラスマークをクリックします。"Modify your query"ボックスで "anomalies" 関数を選択します:

{{< img src="anomalies/function_menu.png" >}}

<!--
This will add anomaly detection to your expression, and you should immediately see the preview update to include the grey band. The function has two parameters. The first parameter is for selecting which algorithm will be used. The second parameter is labeled `bounds`, and you can tune this to change the width of the grey band. After successfully adding `anomalies`, your editor should show something like this:
-->

これによりAnomaly Detectionが適用され、即時グラフのプレビュー画面にグレーのバンドが表示されます。この関数は2つのパラメーターを持っています。1つは、どのアルゴリズムを使用するか。もう1つは`bounds` とラベルされており、グレーのバンドの幅を調整するために使用します。正しく設定されると、エディター画面の表示は以下のようになります:

{{< img src="anomalies/final_editor.png" >}}

<!--
### Alert on Anomalies

In addition to viewing anomalies in dashboards, you may create monitors that trigger when metrics behave anomalously.

Start by navigating to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and selecting Metric. Define the metric in step (1) just like you would for any other metric alert. In step (2), select "Anomaly Alert".
-->

### Anomaly Detectionで異常値をアラートする

ダッシュボード上でAnomaly Detectionを可視化するのに加えて、Anomaly Detectionで判定されたメトリクスの異常値を元にアラートMonitorを作成することができます。
[New Monitor](https://app.datadoghq.com/monitors#/create) ページから新規アラートMonitorの作成を選択し、"Metric"(メトリクスを対象にしたアラート)を選択します。step(1)では他のメトリクスアラートと同様に設定をし、step(2)で"Anomaly Alert"を選択します。

{{< img src="anomalies/monitor_options.png" >}}

<!--
You should now see something like what's shown above, with a handful of selections that will help determine how sensitive you monitor is to different types of anomalies.

<ol type="a">
  <li>This number is equivalent to the <code>bounds</code> parameter used in the <code>anomalies</code> function in dashboards; it controls the width of the grey band.</li>
  <li>If you only care about unusually high or unusually low values, you can choose to only alert on values above or below the bounds.</li>
  <li>As with other alerts, smaller time windows lead to faster alerting but can yield more false positives.</li>
  <li>You can change the anomaly detection algorithm used here.</li>
</ol>

Continue with steps (3) and (4) as you would for any other monitor.
-->

上記のようなエディター画面において、どの程度の強度でAnomaly Detectionを反映するかをいくらかの設定で決定していきます。

<ol type="a">
  <li>ダッシュボードの <code>anomalies</code> 関数で使用した <code>bounds</code> パラメータと同様に、グレーのバンドの幅を指定します。</li>
  <li>もし正常な値の幅から異常に高い(低い)場合のみ検出したい場合には、そのように指定します。</li>
  <li>他のアラートと同様に、少ない時間幅にするほど早くアラートを検出できますが、誤検出の増加にもつながります。</li>
  <li>Anomaly Detectionのアルゴリズムはここで指定します。</li>
</ol>

続いて、他のアラートMonitor同様に Step(3)と(4)も設定します。

<!--
### Anomaly Detection Algorithms

There are four different anomaly detection algorithms:

* _Basic_: Use this algorithm for metrics that have no repeating seasonal pattern. _Basic_ uses a simple lagging rolling quantile computation to determine the range of expected values, but it uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.

* _Agile_: Use this algorithm for seasonal metrics when you want the algorithm to quickly adjust to level shifts in the metric. _Agile_ is a robust version of the [SARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* _Robust_: Use this algorithm for seasonal metrics where you expect the metric to be stable and want to consider slow level shifts as anomalies. _Robust_ is a [seasonal-trend decomposition](https://en.wikipedia.org/wiki/Decomposition_of_time_series) algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

* _Adaptive_: Use this algorithm for seasonal metrics when you find _agile_ and _robust_ to be too sensitive to minor changes in the metrics behavior. This algorithm is dynamic and will adjust its predictions to a metric's changes much more readily than _agile_ or _robust_. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms are able to avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

The figures below illustrate how and when these four algorithms behave differently from one another. In the first figure, _basic_ will successfully identify anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_, _agile_, and _adaptive_ all recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

{{< img src="anomalies/alg_comparison_1.png" >}}

In the next figure, the metric exhibits a sudden level shift. _Agile_ and _adaptive_ adjust more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertaintly after the level shift; the width of _agile_ and _adaptive_ bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="anomalies/alg_comparison_2.png" >}}

The next figure shows how the algorithms react to an hour-long anomaly. _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ and _adaptive_ even identify the metric's return to its original level as an anomaly.

{{< img src="anomalies/alg_comparison_3.png" >}}

The algorithms also deal with scale differently. _Basic_ and _Robust_ are scale-insensitive, while _Agile_ and _Adaptive_ are not. In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

{{< img src="anomalies/alg_comparison_scale.png" >}}

Finally, we see how each of the algorithms handle a new metric. _Robust_ and _agile_ won't show any bounds during the first few weeks. _Basic_ and _adaptive_ will start showing bounds shortly after the metric first appears. _Adaptive_ will leverage the metric's daily seasonal patterns in its predictions, while _basic_ simply reflects the range of recent values.

{{< img src="anomalies/alg_comparison_new_metric.png" >}}
-->

### Anomaly Detectionのアルゴリズム

Anomaly Detectionには、4つの異なるAnomaly Detectionのアルゴリズムを提供しています。

* _Basic_: このアルゴリズムは季節性の繰り返しパターンを持たないメトリクスに対して使用します。 _Basic_ アルゴリズムは正常と期待される変動幅を決定するために単純な時間差の移動分位数計算を使用します。僅かなデータ量を使用することで状況の変化に素早く適応しますが、季節性の変動や長期的な傾向は考慮していません。

* _Agile_: このアルゴリズムは季節性の変動があるメトリクスにおいて、メトリクス値の推移に素早く追従することが必要な場合に使用します。 _Agile_ アルゴリズムは [季節性ARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) アルゴリズムをより結果のズレを小さくしたモデルです。現在付近のブレの発生を犠牲にはしつつも、予測には直近の過去の情報を取り込み、値の推移に素早く対応して更新することを可能にしています。

* _Robust_: このアルゴリズムは季節性の変動があるメトリクスにおいて、そのメトリクスは比較的安定的に推移をしているが、ゆるやかでも値の推移に変化が生じれば異常とみなしたい場合に使用します。 _Robust_ アルゴリズムは [時系列から季節性変動や特定の傾向を分解](https://en.wikipedia.org/wiki/Decomposition_of_time_series) するアルゴリズムです。非常に変動が小さい変動幅を提供します。意図した値の推移(例, コード変更によるメトリクス値の変動)に反応するためにやや時間がかかってしまうという犠牲を払いながらも、一定の予測値を長期的に提供します。

* _Adaptive_: このアルゴリズムは季節性の変動があるメトリクスにおいて、メトリクスの挙動における些細な変化に対して _agile_ や _robust_ アルゴリズムが敏感に反応し過ぎると思う場合に使用します。このアルゴリズムはダイナミックで、メトリクス値の変動により敏速に対応した予測値を提供します。その一方で、直近のメトリクスの値の変化に従いすぎる傾向があります。これは、検出のモレが起こりやすいことを意味します。

すべての季節性変動を考慮するアルゴリズムでは、メトリックが正常と見なされる範囲の挙動を計算する際に数ヶ月の過去の時系列データを使用します。膨大な量の過去データを使用することにより、そうしたアルゴリズムでは直近で発生する異常な挙動に重みを置き過ぎることを避けることができます。以下に続く図では、いつどのように4つのアルゴリズムが他と比べて異なる振る舞いをするのかを説明していきます。

In the first figure, _basic_ will successfully identify anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_, _agile_, and _adaptive_ all recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

{{< img src="anomalies/alg_comparison_1.png" >}}

次の図では、メトリクスの推移が急に変化した場合を示しています。 _Agile_ and _adaptive_ adjust more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertaintly after the level shift; the width of _agile_ and _adaptive_ bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

{{< img src="anomalies/alg_comparison_2.png" >}}

さらに次の図では、メトリクスが1時間ほど異常な値に推移していた場合に各アルゴリズムがどのように反応するかを示しています。 _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ and _adaptive_ even identify the metric's return to its original level as an anomaly.

{{< img src="anomalies/alg_comparison_3.png" >}}

また、各アルゴリズムでは(Y軸)スケールの違いでも振る舞いが異なります。 _Basic_ と _Robust_ は スケールの違いで差が生じにくい一方で、 _Agile_ と _Adaptive_ は スケールの違いで振る舞いが変わります。 In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

{{< img src="anomalies/alg_comparison_scale.png" >}}

最後に、それぞれのアルゴリズムが新しいメトリクスの値をどのように扱うかを見てみましょう。 _Robust_ and _agile_ won't show any bounds during the first few weeks. _Basic_ and _adaptive_ will start showing bounds shortly after the metric first appears. _Adaptive_ will leverage the metric's daily seasonal patterns in its predictions, while _basic_ simply reflects the range of recent values.

{{< img src="anomalies/alg_comparison_new_metric.png" >}}

<!--
## Frequently Asked Questions

### Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example,
`my_site.page_views` might be driven by user traffic and thus vary predictably by time of day and day of week. If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

Take care when creating multi-alerts. A metric such as `service.requests_served{*}` could be a good candidate for anomaly detection, but `service.requests_served{*} by {host}`is probably not. If your hosts are load-balanced, then an [outlier monitor](https://docs.datadoghq.com/guides/outliers/) will be better for detecting hosts that are behaving abnormally. If your service scales up, each new host won't be monitored at all until there is a minimum amount of history for anomaly detection to kick in, and even then alerts might be noisy due to instability in the number of requests handled by those hosts.
-->

## よくあるご質問(FAQs)

### すべてのメトリクスにAnomaly Detectionを利用するべきですか？

いいえ。Anomaly Detectionは予想可能なパターンを持つメトリクスの監視や可視化を支援する目的でデザインされています。例えば、`my_site.page_views` のようなユーザーによるwebトラフィックの場合、1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日を想定すると、通常はある程度予測可能な変動をしていると考えられます。もしメトリクスがそういった繰り返しの/予測可能なパターンを持っていないのであれば、Anomaly Detectionを用いずに通常のグラフによる可視化や閾値によるアラートの設定が有効だと考えられます。

また、Anomaly Detectionは効果的な予測値のために過去の時系列データを必要としますので、もしメトリクスの収集を始めてから数時間あるいは数日である場合、Anomaly Detectionは恐らく有効には機能しないでしょう。

Multi Alert を設定しているときには注意が必要です。`service.requests_served{*}` のようなメトリックはAnomaly Detection を適用する良い候補に思われますが、一方で、そのメトリックをホストごとにスライスした `service.requests_served{*} by {host}` は良い候補とはならないでしょう。もしそれらのホストがロードバランサー配下にあるのであれば、むしろ[Outlier Detection](https://docs.datadoghq.com/ja/guides/outliers/) が異常なホストの検知に適していると思われます。
サービスがスケールしていく場合では、追加されていく新しいホストは Anomaly Detection に必要な過去の時系列データが蓄積するまで全く監視されず、それどころか、それらのホストによるリクエストの数が不安定になることでアラートが不必要にトリガされる可能性もあります。

<!--
### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

{{< img src="anomalies/spaghetti.png" >}}

You can, however, add multiple series in a single graph one at a time. The gray envelope will only show up on mouseover.

{{< img src="anomalies/anomaly_multilines.png" >}}
-->
### なぜメトリクスのグループに対してAnomaly Detectionを利用できないのですか？

1つのグラフ表示上で多数の独立した時系列データを可視化しようとすると、 [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/) 問題が生じ得ます。そしてこの問題は、Anomaly Detection をグラフに追加しようとするとさらに悪化してしまいます。

{{< img src="anomalies/spaghetti.png" >}}

1つのグラフ表示上に多数の時系列データを表示させることはもちろん可能ですが、Anomaly Detectionのグレーのバンドの予測値はマウスオーバーした際のみに見えるようになっています。

{{< img src="anomalies/anomaly_multilines.png" >}}

<!--
### Will past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

{{< img src="anomalies/anomalous_history.png" >}}

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

{{< img src="anomalies/no_effect.png" >}}
-->
### 異常値が検出された場合、これから予測される異常値は影響を受けますか？

_Basic_ を除く全てのアルゴリズムは膨大な過去の時系列データを使用しているため、ほとんどの異常値に対して堅牢です。最初のグラフでは、メトリックの値が0に下がった後でもグレーのバンドは400K付近に留まっていることがわかります。そして、その後その日中も同様にグレーのバンドが推移していることに注目して下さい。

{{< img src="anomalies/anomalous_history.png" >}}

2つ目も同じメトリックのグラフですがさらに1日後のものです。グレーのバンドを計算するうえで前日のデータも処理されているものの、当時発生した異常値に対して影響を受けていないことが分かります。

{{< img src="anomalies/no_effect.png" >}}

<!--
### How should I set the window size and alert threshold?

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).
-->
### アラートの閾値と判定の時間枠はどのように設定すれば良いでしょうか？

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).

<!--
### Why does `anomalies` not add a gray prediction band in the dashboard? / Why am I getting "No Data" for an Anomaly Alert? / How much history do the algorithms require?

All the algorithms besides _Basic_ require historical data before they can start making predictions. If your metric has only started reporting data for a short while, then _Agile_ and _Robust_ won't try to make any predictions until it has at least two weeks of history. _Adaptive_ will start working after it has at least two hours worth of history.
-->
### `anomalies` 関数が予測値のグレーのバンドをダッシュボードに描画しないのですが、なぜでしょうか？ / Anomaly アラートを設定したのですが、なぜ "No Data" となってしまうのでしょうか？ / このアルゴリズムでは、どの程度のメトリクスの履歴が必要ですか？

_Basic_ を除く全てのアルゴリズムでは予測を開始するうえで過去の時系列データを必要とします。もし、設定したメトリックがDatadogに収集され始めて間もない場合は、_Agile_ と _Robust_ アルゴリズムは少なくとも2週間分のメトリクス履歴を得るまでは予測値の算出を実行しません。_Adaptive_ アルゴリズムについては、少なくとも2時間分にあたる履歴が得られた時点で予測値の算出を始めます。

<!--
### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in timeseries with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the grey band that is drawn by our anomaly detection algorithm is, in part, based on the noisiness of the timeseries in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.
-->

### なぜグラフを拡大(ズームイン)した際にAnomaly Detection が消えてしまうのでしょうか？

異なるズームレベルでは、同じクエリであってもかなり異なる特徴をもった時系列データを得ることもあり得ます。比較的長い時間幅でグラフ表示する場合、各データポイントでは多数のより小さな粒度のデータポイントが集計されています。このため、そうして集計された各データポイントでは、より小さな粒度のデータポイントに存在していたノイズが隠れてしまいます。例えば、1週間の時間幅のグラフ表示では、しばしば10分の時間幅のグラフ表示よりも滑らかに(ノイズが少なく)見えるでしょう。

Anomaly Detectionアルゴリズムによって描画されるグレーのバンドの幅は、ある程度、プロットされる時系列データのノイズの加減に基づいています。普段のノイズがほぼバンドの内側に収まり異常値として検出されないくらい十分に、バンドは広く表示されるはずです。残念ながら、特に短い時間幅でグラフ表示するような場合は、普段のノイズを収めるほど十分な幅のバンドであれば、いくらかの異常値もまたその幅の内側に隠れてしまうでしょう。

ここで具体的な例を見てみましょう。`app.requests` メトリクスは非常にノイジーですが、平均値としては8で一定です。ある日、9:00頃に始まった10分間の異常な時間帯があり、その10分間の平均値は10でした。下記のグラフはこの時系列データを1日の時間幅で表したものです。それぞれのデータポイントは5分間を集計したものになっています。

{{< img src="anomalies/disappearing_day.png" >}}

<!--
The grey band here makes sense; it is wide enough to capture the noise in the timeseries. Yet, it is narrow enough that the anomaly at 9:00 stands out clearly. This next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

{{< img src="anomalies/disappearing_half_hour.png" >}}

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous. Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks a little different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means that, while the individual points in the zoomed-in view are not anomalous in isolation, the fact that many slightly unusual points occur together is anomalous.
-->

この例ではグレーのバンドは適切といえます。この時系列データのノイズを捉えるのに十分な広さの幅です。しかし、9:00頃に始まったノイズを明確に捉えるにはやや狭い幅ともいえます。では、次のグラフはどうでしょうか。ズームインしたグラフは異常な10分間を含む30分の時間幅で表されています。それぞれのデータポイントは10秒間を集計したものになっています。

{{< img src="anomalies/disappearing_half_hour.png" >}}

繰り返しになりますが、この例でもグレーのバンドは適切のように見えます。なぜなら、異常ではない8:50から9:00と9:10から9:20のデータはバンドの内側に収まっているからです。バンドは狭くさえすれば、いかなる正常なデータも異常値として切り出せます。このバンドが前のグラフよりも8倍近く広くなっていることにお気づきでしょうか？ この9:00から9:10の異常な10分間では、他の部分の時系列データとは少し違うように見えますが、バンドの外側に飛び抜けるほどのものではありません。

ズームインするとAnomaly Detectionによる異常値の検出が消えるような場合、一般的には、異常値ではないことを意味するわけではありません。ズームインした時間幅での個々のデータポイントが異常値として検出されない一方で、これは、普段とはわずかに異なる多くのデータポイントが同時に発生したことが異常だと意味しているのです。

<!--
### Is it possible to capture anomalies that occur within the bounds?

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

{{< img src="anomalies/raw_profile_updates.png" >}}

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

{{< img src="anomalies/rollup_profile_updates.png" >}}

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

{{< img src="anomalies/ewma_profile_updates.png" >}}
-->
### Is it possible to capture anomalies that occur within the bounds?

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

{{< img src="anomalies/raw_profile_updates.png" >}}

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

{{< img src="anomalies/rollup_profile_updates.png" >}}

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

{{< img src="anomalies/ewma_profile_updates.png" >}}
