---
last_modified: 2016/08/20
translation_status: complete
language: ja
title: Anomaly Detection (BETA)
kind: guide
listorder: 16
beta: true
---

<!--
Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account day-of-week and time-of-day patterns. It's well suited for metrics with recurring patterns that are hard or impossible to monitor with threshold-based alerting. For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon - even though that same level of traffic would be perfectly normal later in the evening.
-->

Anomaly Detectionは、アルゴリズムベースの異常検出機能です。過去の挙動、つまり1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日を考慮したときに、普段とは異なる挙動がみられた際に検出することができます。これは、閾値ベースのアラートモニタリングで監視することが困難であったり不可能な、定期的パターンを持つメトリクスに適しています。Anomaly Detectionは、例えばWebのトラフィックが平日の午後に異常に低いような場合、それが同日の夜間と同じレベルのトラフィックとして通常はまったくの正常とみなされてしまうような場合であっても、発見することが出来ます。

<!--
## How to Use Anomaly Detection on Your Data

We've added a new query function called `anomalies` to our query language. When you apply this function to series, it returns the usual results along with an expected "normal" range.

Keep in mind that `anomalies` uses the past to predict what is expected in the future, so using `anomalies` on a new metric, for which you have just started collecting data, may yield poor results.
-->

## Anomaly Detectionの利用法

Datadogは`anomalies`と呼ぶ新しいクエリ関数を追加しています。メトリクスの時系列データにこの関数を適用すると、”正常と期待される変動幅”を結果として返します。

`anomalies`は、将来に期待される変動を予測するために過去の時系列データを使用しますので、データを収集して間もないメトリクスについて`anomalies`を適用しても効果は得られないことに注意して下さい。

<!--
### 1. Visualize Anomalies in Dashboards
{: #dashboards}

The chart below shows a dashboard chart that uses anomaly detection. The grey band represents the region where the metric is expected to be based on past behavior. The blue and red line is the actual observed value of the metric; the line is blue when within the expected range and red when it is outside of the expected range.
-->

### 1. Anomaly Detectionをダッシュボードで可視化する
{: #dashboards}

下記では、Anomaly Detectionを適用したメトリクスのグラフを表示しています。グレーのバンドは過去の挙動から期待されるメトリクスの正常な変動幅を示しています。青と赤の折れ線は、実際に取得されたメトリクスの値です。また、青い線は正常な変動幅に収まっており、赤い線は変動幅を逸脱していることを示しています。

<img src="/static/images/anomalies/dashboard_graph.png" style="width:100%; border:1px solid #777777"/>

<!--
To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type and select "lines" from the Display menu. Other visualization types do not yet support anomaly detection. In the chart editor window, you should see something like this:
-->

Anomaly Detectionの利用を開始するには、メトリクスの時系列グラフをダッシュボードに追加することから始めます。下記に示したように、グラフの可視化は "Timeseries" を、グラフ形式を"lines" (折れ線グラフ)として選択します。他の可視化タイプはAnomaly Detectionでは現時点でサポートされておりません。エディター画面は以下のようになります:

<img src="/static/images/anomalies/initial_editor.png" style="width:100%; border:1px solid #777777"/>

<!--
Now, click on the + icon (Add functions and modifiers) on the right side of your expression. In the “Modify your query” box, choose the “anomalies” function:
-->

次に、メトリクスの各設定ボックスの右手、プラスマークをクリックします。“Modify your query”ボックスで "anomalies" 関数を選択します:

<img src="/static/images/anomalies/function_menu.png" style="width:225px; border:1px solid #777777"/>

<!--
This will add anomaly detection to your expression, and you should immediately see the preview update to include the grey band. The function has two parameters. The first parameter is for selecting which algorithm will be used. The second parameter is labeled `bounds`, and you can tune this to change the width of the grey band. After successfully adding `anomalies`, your editor should show something like this:
-->

これによりAnomaly Detectionが適用され、即時グラフのプレビュー画面にグレーのバンドが表示されます。この関数は2つのパラメーターを持っています。1つは、どのアルゴリズムを使用するか。もう1つは`bounds` とラベルされており、グレーのバンドの幅を調整するために使用します。正しく設定されると、エディター画面の表示は以下のようになります:

<img src="/static/images/anomalies/final_editor.png" style="width:100%; border:1px solid #777777"/>

<!--
### 2. Alert on Anomalies
{: #alerts}

In addition to viewing anomalies in dashboards, you may create monitors that trigger when metrics behave anomalously.

Start by navigating to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and selecting Metric. Define the metric in step (1) just like you would for any other metric alert. In step (2), select "Anomaly Alert".
-->

### 2. Anomaly Detectionで異常値をアラートする
{: #alerts}

ダッシュボード上でAnomaly Detectionを可視化するのに加えて、Anomaly Detectionで判定されたメトリクスの異常値を元にアラートMonitorを作成することができます。
[New Monitor](https://app.datadoghq.com/monitors#/create) ページから新規アラートMonitorの作成を選択し、"Metric"(メトリクスを対象にしたアラート)を選択します。step(1)では他のメトリクスアラートと同様に設定をし、step(2)で"Anomaly Alert"を選択します。

<img src="/static/images/anomalies/monitor_options.png" style="width:100%; border:1px solid #777777"/>

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
### 3. Anomaly Detection Algorithms

We currently offer four different anomaly detection algorithms.

* Basic: This uses a simple lagging rolling quantile computation to determine the range of expected values. It uses very little data, and adjusts quickly to changing conditions. However, it has no knowledge of seasonal behavior or longer trends.

* Agile: A robust version of the [SARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* Robust: A [seasonal-trend decomposition](https://en.wikipedia.org/wiki/Decomposition_of_time_series) algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

* Adaptive: This algorithm is dynamic and will adjust its predictions to a metric's changes much more readily. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.
-->

### 3.Anomaly Detectionのアルゴリズム
{: #algorithms}

現時点で、4つの異なるAnomaly Detectionのアルゴリズムを提供しています。

* Basic: 正常と期待される変動幅を決定するために単純な時間差の移動分位数計算を使用します。僅かなデータ量を使用することで状況の変化に素早く適応しますが、季節性の変動や長期的な傾向は考慮していません。
* Agile: [季節性ARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) アルゴリズムをより結果のズレを小さくしたモデルです。現在付近のブレの発生を犠牲にはしつつも、予測には直近の過去の情報を取り込み、値の推移に素早く対応して更新することを可能にしています。
* Robust: [時系列から季節性変動や特定の傾向を分解](https://en.wikipedia.org/wiki/Decomposition_of_time_series) するアルゴリズムです。非常に変動が小さい変動幅を提供します。意図した値の推移(例, コード変更によるメトリクス値の変動)に反応するためにやや時間がかかってしまうという犠牲を払いながらも、一定の予測値を長期的に提供します。
* Adaptive: このアルゴリズムはダイナミックで、メトリクス値の変動により敏速に対応した予測値を提供します。その一方で、直近のメトリクスの値の変化に従いすぎる傾向があります。これは、検出のモレが起こりやすいことを意味します。

<!--
## Frequently Asked Questions

### Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views` might be driven by user traffic and thus vary predictably by time of day and day of week. If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.
-->

## よくあるご質問(FAQs)

### すべてのメトリクスにAnomaly Detectionを利用するべきですか？

いいえ。Anomaly Detectionは予想可能なパターンを持つメトリクスの監視や可視化を支援する目的でデザインされています。例えば、`my_site.page_views` のようなユーザーによるwebトラフィックの場合、1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日を想定すると、通常はある程度予測可能な変動をしていると考えられます。もしメトリクスがそういった繰り返しの/予測可能なパターンを持っていないのであれば、Anomaly Detectionを用いずに通常のグラフによる可視化や閾値によるアラートの設定が有効だと考えられます。

また、Anomaly Detectionは効果的な予測値のために過去の時系列データを必要としますので、もしメトリクスの収集を始めてから数時間あるいは数日である場合、Anomaly Detectionは恐らく有効には機能しないでしょう。

<!--
### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in time series with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the grey band that is drawn by our anomaly detection algorithm is, in part, based on the noisiness of the time series in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.
-->

### なぜグラフを拡大(ズームイン)した際にAnomaly Detection が消えてしまうのでしょうか？

異なるズームレベルでは、同じクエリであってもかなり異なる特徴をもった時系列データを得ることもあり得ます。比較的長い時間幅でグラフ表示する場合、各データポイントでは多数のより小さな粒度のデータポイントが集計されています。このため、そうして集計された各データポイントでは、より小さな粒度のデータポイントに存在していたノイズが隠れてしまいます。例えば、1週間の時間幅のグラフ表示では、しばしば10分の時間幅のグラフ表示よりも滑らかに(ノイズが少なく)見えるでしょう。

Anomaly Detectionアルゴリズムによって描画されるグレーのバンドの幅は、ある程度、プロットされる時系列データのノイズの加減に基づいています。普段のノイズがほぼバンドの内側に収まり異常値として検出されないくらい十分に、バンドは広く表示されるはずです。残念ながら、特に短い時間幅でグラフ表示するような場合は、普段のノイズを収めるほど十分な幅のバンドであれば、いくらかの異常値もまたその幅の内側に隠れてしまうでしょう。

ここで具体的な例を見てみましょう。`app.requests` メトリクスは非常にノイジーですが、平均値としては8で一定です。ある日、9:00頃に始まった10分間の異常な時間帯があり、その10分間の平均値は10でした。下記のグラフはこの時系列データを1日の時間幅で表したものです。それぞれのデータポイントは5分間を集計したものになっています。

<img src="/static/images/anomalies/disappearing_day.png" style="width:500px; border:1px solid #777777"/>

<!--
The grey band here makes sense; it is wide enough to capture the noise in the time series. Yet, it is narrow enough that the anomaly at 9:00 stands out clearly. This next chart shows a zoomed-in view of a half-hour time window that includes the 10-minute anomaly; each point in the graph summarizes 10 seconds.

<img src="/static/images/anomalies/disappearing_half_hour.png" style="width:500px; border:1px solid #777777"/>

Again, the band seems to be reasonably sized, because the non-anomalous data from 8:50 - 9:00 and from 9:10 - 9:20 is inside the band. A band any narrower would start to highlight normal data as anomalous. Notice the band in this graph is ~8x wider than the one in the previous graph. The anomalous period from 9:00 - 9:10 looks a little different from the rest of the series, but it is not extreme enough to fall outside of the band.

In general, if an anomaly disappears when you zoom in, this doesn't mean that it's not an anomaly. It means that, while the individual points in the zoomed-in view are not anomalous in isolation, the fact that many slightly unusual points occur together is anomalous.
-->

この例ではグレーのバンドは適切といえます。この時系列データのノイズを捉えるのに十分な広さの幅です。しかし、9:00頃に始まったノイズを明確に捉えるにはやや狭い幅ともいえます。では、次のグラフはどうでしょうか。ズームインしたグラフは異常な10分間を含む30分の時間幅で表されています。それぞれのデータポイントは10秒間を集計したものになっています。

<img src="/static/images/anomalies/disappearing_half_hour.png" style="width:500px; border:1px solid #777777"/>

繰り返しになりますが、この例でもグレーのバンドは適切のように見えます。なぜなら、異常ではない8:50から9:00と9:10から9:20のデータはバンドの内側に収まっているからです。バンドは狭くさえすれば、いかなる正常なデータも異常値として切り出せます。このバンドが前のグラフよりも8倍近く広くなっていることにお気づきでしょうか？ この9:00から9:10の異常な10分間では、他の部分の時系列データとは少し違うように見えますが、バンドの外側に飛び抜けるほどのものではありません。

ズームインするとAnomaly Detectionによる異常値の検出が消えるような場合、一般的には、異常値ではないことを意味するわけではありません。ズームインした時間幅での個々のデータポイントが異常値として検出されない一方で、これは、普段とはわずかに異なる多くのデータポイントが同時に発生したことが異常だと意味しているのです。
