---
last_modified: 2017/02/09
translation_status: complete
language: ja
title: Anomaly Detection
kind: guide
listorder: 16
beta: false
---

<!--
Anomaly detection is an algorithmic feature that allows you to identify when a metric is behaving differently than it has in the past, taking into account trends, seasonal day-of-week and time-of-day patterns. It is well-suited for metrics with strong trends and recurring patterns that are hard or impossible to monitor with threshold-based alerting.

For example, anomaly detection can help you discover when your web traffic is unusually low on a weekday afternoon-even though that same level of traffic would be perfectly normal later in the evening. Or consider a metric measuring the number of logins to your steadily-growing site. As the number is increasing every day, any threshold would be quickly outdated, whereas anomaly detection can quickly alert you if there is an unexpected drop-potentially indicating an issue with the login system.
-->

Anomaly Detectionは、アルゴリズムベースの異常検出機能です。過去の挙動、つまり1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日を考慮したときに、普段とは異なる挙動がみられた際に検出することができます。これは、閾値ベースのアラートモニタリングで監視することが困難又は不可能な、強い周期パターンを持ったメトリクスに適しています。

Anomaly Detectionは、例えばWebのトラフィックが平日の午後に異常に低いような場合、それが同日の夜間と同じレベルのトラフィックとしては通常はまったくの正常とみなされてしまうような場合であっても、午後の周期トレンドから予測し、異常を検知することが出来ます。また、定常的に成長しているサイトへのログイン数を測定するメトリックを思い起こしてみてください。その値は、毎日増えているので、しきい値を設定しても直ぐに異常値検知としては使えない値になり、再設定の検討が必要になります。このような場合、anomaly detection を設定しておけば日常的に閾値の更新をしなくても、ログインシステムの潜在的な問題でこのメトリックに予期せぬ落ち込みが発生しても素早く警告することができます。


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

**Please Note:** The resolution at which you view the metric is the resolution that `anomalies` uses to calculate the band. If you would like to keep the resolution constant while zooming in and out, use the `rollup()` function. See the FAQ for more details.

<img src="/static/images/anomalies/dashboard_graph.png" style="width:100%; border:1px solid #777777"/>
-->

### 1. グラフ内に異常(Anomalies)を、表示する
{: #dashboards}

下記では、Anomaly Detectionを適用したメトリクスのグラフを表示しています。グレーのバンドは過去の挙動から期待されるメトリクスの正常な変動幅を示しています。青と赤の折れ線は、実際に取得されたメトリクスの値です。また、青い線は正常な変動幅に収まっており、赤い線は変動幅を逸脱していることを示しています。

**注)** グラフィ上の表示されるメトリックの解像度が、そのグラフ上での`anomalies`による正常帯域の計算に使用する解像度と同じになります。従って、グラフに表示する全体時間を短くしたり長くすると、正常帯域表示は変化します。このような現象に対処したい場合は、メトリックの設定時に"Algorithms"を使って`rollup()` による解像度固定をしておいてください。詳細については、FAQを参照してください。

<img src="/static/images/anomalies/dashboard_graph.png" style="width:100%; border:1px solid #777777"/>

<!--
To create an anomaly detection graph, start by adding a timeseries graph to your dashboard. As shown below, be sure to select "Timeseries" as the visualization type.

<img src="/static/images/anomalies/initial_editor.png" style="width:100%; border:1px solid #777777"/>
-->

Anomaly Detectionの利用を開始するには、メトリクスの時系列グラフをダッシュボードに追加することから始めます。下記に示したように、グラフの可視化は "Timeseries" を選択します。

<img src="/static/images/anomalies/initial_editor.png" style="width:100%; border:1px solid #777777"/>

<!--
Now, click on the + icon (Add functions and modifiers) on the right side of your expression. Choose the “Anomalies” function in the "Algorithms" submenu:

<img src="/static/images/anomalies/function_menu.png" style="width:225px; border:1px solid #777777"/>
-->

次に、メトリクスの各設定ボックスの右手、プラスマーク (`+`)をクリックします。"Algorithms"を選択するサブメニューで、“Anomalies” 関数を選択します:


<img src="/static/images/anomalies/function_menu.png" style="width:225px; border:1px solid #777777"/>

<!--
This will add anomaly detection to your expression, and you should immediately see the preview update to include the gray band. A number of the graphing options will disappear, as anomaly detection has a unique visualization.


The function has two parameters. The first parameter is for selecting which algorithm will be used. The second parameter is labeled `bounds`, and you can tune this to change the width of the grey band. You may think of `bounds` like standard deviations; a value of 2 or 3 should be large enough to include most "normal" points. After successfully adding `anomalies`, your editor should show something like this:

<img src="/static/images/anomalies/final_editor.png" style="width:100%; border:1px solid #777777"/>
-->

これによりAnomaly Detection が適用され、直ちにグラフのプレビュー画面上にグレーのバンドが表示されます。尚、Anomaly Detection では特殊な可視化機能を実行しているため、それを適用した場合、幾つかの汎用グラフオプションが使えなくなります。

Anomaly Detection は、2つのパラメータを持っています。1つ目は、使用するアルゴリズム選択するパラメータで、もう1つは`bounds` とラベルされているグレー表示領域の幅を調整するためのパラメータです。`bounds`は、偏差値としてとらえるとことできます。`2`や`3`の値を選択することで、正常ポイントのほとんどをグレー表示領域内に入れることができるはずです。正しく設定されると、エディター画面の表示は以下のようになります:

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

* _Basic_: Use this algorithm for metrics that have no repeating seasonal pattern. _Basic_ uses a simple lagging rolling quantile computation to determine the range of expected values, but it uses very little data and adjusts quickly to changing conditions but has no knowledge of seasonal behavior or longer trends.

* _Agile_: Use this algorithm for seasonal metrics when you want the algorithm to quickly adjust to level shifts in the metric. _Agile_ is a robust version of the [SARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) algorithm. It incorporates the immediate past into its predictions, allowing it to update quickly to level shifts at the expense of being less robust to recent, long-lasting anomalies.

* _Robust_: Use this algorithm for seasonal metrics where you expect the metric to be stable and want to consider slow level shifts as anomalies. _Robust_ is a [seasonal-trend decomposition](https://en.wikipedia.org/wiki/Decomposition_of_time_series) algorithm. It is very stable and its predictions remain constant even through long-lasting anomalies at the expense of taking longer to respond to intended level shifts (e.g., if the level of a metric shifts due to a code change.)

* _Adaptive_: Use this algorithm for seasonal metrics when you find _agile_ and _robust_ to be too sensitive to minor changes in the metrics behavior. This algorithm is dynamic and will adjust its predictions to a metric's changes much more readily than _agile_ or _robust_. On the other hand, it can be prone to following a metric too closely, which could lead to false negatives.

All of the seasonal algorithms may use up to a couple of months of historical data when calculating a metric's expected normal range of behavior. By using a significant amount of past data, the algorithms are able to avoid giving too much weight to abnormal behavior that might have occurred in the recent past.

The figures below illustrate how and when these four algorithms behave differently from one another. In the first figure, _basic_ will successfully identify anomalies that spike out of the normal range of values, but it does not incorporate the repeating, seasonal pattern into its predicted range of values. By contrast, _robust_, _agile_, and _adaptive_ all recognize the seasonal pattern and can detect more nuanced anomalies (e.g., if the metric was to flatline near its minimum value).

<img src="/static/images/anomalies/alg_comparison_1.png" style="width:100%; border:1px solid #777777"/>

In the next figure, the metric exhibits a sudden level shift. _Agile_ and _adaptive_ adjust more quickly to the level shift than does _robust_. Also, the width of _robust_'s bounds increases to reflect greater uncertaintly after the level shift; the width of _agile_ and _adaptive_ bounds remains unchanged. _Basic_ is clearly a poor fit for this scenario, where the metric exhibits a strong weekly seasonal pattern.

<img src="/static/images/anomalies/alg_comparison_2.png" style="width:100%; border:1px solid #777777"/>

The next figure shows how the algorithms react to an hour-long anomaly. _Robust_ completely ignores this anomaly. All the other algorithms start to behave as if the anomaly is the new normal. _Agile_ and _adaptive_ even identify the metric's return to its original level as an anomaly.

<img src="/static/images/anomalies/alg_comparison_3.png" style="width:100%; border:1px solid #777777"/>

The algorithms also deal with scale differently. _Basic_ and _Robust_ are scale-insensitive, while _Agile_ and _Adaptive_ are not. In the graphs on the left-hand side we see both _Agile_ and _Robust_ mark the level-shift as being anomalous. On the right-hand side we add 1000 to the same metric, and _Agile_ no longer calls out the level-shift as being anomalous whereas robust continues do so.

<img src="/static/images/anomalies/alg_comparison_scale.png" style="width:100%; border:1px solid #777777"/>

Finally, we see how each of the algorithms handle a new metric. _Robust_ and _agile_ won't show any bounds during the first few weeks. _Basic_ and _adaptive_ will start showing bounds shortly after the metric first appears. _Adaptive_ will leverage the metric's daily seasonal patterns in its predictions, while _basic_ simply reflects the range of recent values.

<img src="/static/images/anomalies/alg_comparison_new_metric.png" style="width:100%; border:1px solid #777777"/>
-->

### 3.Anomaly Detectionのアルゴリズム
{: #algorithms}

現時点で、4つの異なるAnomaly Detectionのアルゴリズムを提供しています。

---

* _Basic_: 繰り返し発生する季節性パターンを持たないメトリックにこのアルゴリズムを使用します。正常と期待される変動幅を決定するために単純な時間差の移動分位数計算を使用します。僅かなデータ量で検知を開始することができ、状況の変化にも素早く適応しますが、季節性パターンの変動や長期的な傾向を検知しずらいです。

* _Agile_: メトリックのレベルシフトにすばやく適応できるアルゴリズムを使いたい場合は、このアルゴリズムを使用します。[季節性ARIMA](https://en.wikipedia.org/wiki/Autoregressive_integrated_moving_average) アルゴリズムをより結果のズレを小さくしたモデルです。現在付近のブレの発生を犠牲にはしつつも、予測には直近の過去の情報を取り込み、値の推移に素早く対応して更新することを可能にしています。

* _Robust_: 季節メトリクスで、メトリックが安定しており、ゆっくりとしたレベルのシフトを異常として検知したい場合にこのアルゴリズを使用します。[時系列から季節性変動や特定の傾向を分解](https://en.wikipedia.org/wiki/Decomposition_of_time_series) するアルゴリズムです。非常に変動が小さい変動幅を提供します。意図した値の推移(例, コード変更によるメトリクス値の変動)に反応するためにやや時間がかかってしまうという犠牲を払いながらも、一定の予測値を長期的に提供します。

* _Adaptive_: 季節メトリクスで、_agile_ と _robust_　ではメトリックの変化に敏感過ぎる場合に、このアルゴリズムを使用します。このアルゴリズムはダイナミックで、メトリクス値の変動により敏速に対応した予測値を提供します。その一方で、直近のメトリクスの値の変化に従いすぎる傾向があります。これは、検出のモレが起こりやすいことを意味します。

季節性を考慮した全てのアルゴリズムでは、メトリックが正常値として分布するであろう範囲を計算するのに、数ヵ月分の履歴データを使用します。膨大な量の過去のデータを使用することで、それらのアルゴリズムは、近い過去に発生した可能性がある異常行動(abnormal behavior)に必要以上の注意を払ってしまうことを回避できます。

以下の図は、これらの4つのアルゴリズムがどのように動作し、いつ異なるかを示しています。

最初の図内の _basic_ では、正常な値域から逸脱したデータポイントの異常(anomalies)を検知しますが、正常域帯に繰り返しの季節パターンを組み入れられていません。 対照的に、_robust_、_agile_、および _adaptive_ は、全て季節パターンを認識し、より微妙なデータポイントの異常を検出することができます。（例えば、メトリックが最小値の付近でほぼ横ばい状態になっている場合です）

<img src="/static/images/anomalies/alg_comparison_1.png" style="width:100%; border:1px solid #777777"/>

次の図では、メトリックの傾向レベルが、突然シフトしています。 _Agile_ と _adaptive_ は、_robust_ より素早くレベルシフトに順応しています。 又、_robust_ の正常域の幅は、レベルシフト後の不確実性を反映して増加します。_agile_　と　_adaptive_ の正常域の幅は変更されません。_Basic_は、このシナリオには明らかに不適切なことがわかります。最後に、このメトリックには、週単位の周期で繰り返されるの強い季節性パターンが表示されます。

<img src="/static/images/anomalies/alg_comparison_2.png" style="width:100%; border:1px solid #777777"/>

次の図は、アルゴリズムが一時間の異常(anomalies)にどのように反応するかを示しています。 _Robust_ は、この異常(anomalies)を完全に無視します。他のアルゴリズムでは異常(anomalies)が、新しい正常域への適応を促しています。_Agile_ と _adaptive_ では、メトリックの元のレベルへの復帰を異常として検知するほど、素早く適応が進んでいます。

<img src="/static/images/anomalies/alg_comparison_3.png" style="width:100%; border:1px solid #777777"/>

更に、アルゴリズムはレベルシフトのスケールに異なった適応を示します。 _Basic_ と _Robust_ は、レベルシフトのスケールには依存していません。 _Agile_ と _Adaptive_は、レベルシフトのスケールに影響を受けます。以下の左側のグラフでは、_Agile_ と _Robust_ の両方がレベルシフトを異常(anomalies)として検出しています。右側のグラフでは、同じメトリックに1000を追加した影響を受け、_Agile_ ではレベルシフトを検出できなくなりましたが、_robust_ では、継続して検出しています。

<img src="/static/images/anomalies/alg_comparison_scale.png" style="width:100%; border:1px solid #777777"/>

最後に、各アルゴリズムが新しいメトリックをどのように処理するかを見ていきます。_Robust_と _agile_ には、新しいメトリックの収集を始めた後数週間は正常域帯が表示されません。 _Basic_ と _adaptive_ では、メトリックが最初に表示された直後に正常域帯の表示を開始します。 _Adaptive_ では、メトリックの1日周期の季節性パターンを予測に使いますが、_basic_ では、最近の値の範囲を使うだけです。

<img src="/static/images/anomalies/alg_comparison_new_metric.png" style="width:100%; border:1px solid #777777"/>


<!--
## Frequently Asked Questions

### Should I use anomaly detection for everything?

No. Anomaly detection is designed to assist with visualizing and monitoring metrics that have predictable patterns. For example, `my_site.page_views` might be driven by user traffic and thus vary predictably by time of day and day of week. If your metric does not have any sort of repeated/predictable pattern, then a simple chart overlay or threshold alert might be better than anomaly detection.

Also, anomaly detection requires historical data to make good predictions. If you have only been collecting a metric for a few hours or a few days, anomaly detection probably won't be very useful.

Take care when creating multi-alerts. A metric such as `service.requests_served{*}` could be a good candidate for anomaly detection, but `service.requests_served{*} by {host}`is probably not. If your hosts are load-balanced, then an [outlier monitor](https://docs.datadoghq.com/guides/outliers/) will be better for detecting hosts that are behaving abnormally. If your service scales up, each new host won’t be monitored at all until there is a minimum amount of history for anomaly detection to kick in, and even then alerts might be noisy due to instability in the number of requests handled by those hosts.
-->

## よくあるご質問(FAQs)

### すべてのメトリクスにAnomaly Detectionを利用するべきですか？

いいえ。Anomaly Detectionは予想可能なパターンを持つメトリクスの監視や可視化を支援する目的でデザインされています。例えば、`my_site.page_views` のようなユーザーによるwebトラフィックの場合、1日のうちの特定の時間帯、あるいは1週間のうちの特定の1日を想定すると、通常はある程度予測可能な変動をしていると考えられます。もしメトリクスがそういった繰り返しの/予測可能なパターンを持っていないのであれば、Anomaly Detectionを用いずに通常のグラフによる可視化や閾値によるアラートの設定が有効だと考えられます。

また、Anomaly Detectionは効果的な予測値のために過去の時系列データを必要としますので、もしメトリクスの収集を始めてから数時間あるいは数日である場合、Anomaly Detectionは恐らく有効には機能しないでしょう。

---

Take care when creating multi-alerts. A metric such as `service.requests_served{*}` could be a good candidate for anomaly detection, but `service.requests_served{*} by {host}`is probably not. If your hosts are load-balanced, then an [outlier monitor](https://docs.datadoghq.com/guides/outliers/) will be better for detecting hosts that are behaving abnormally. If your service scales up, each new host won’t be monitored at all until there is a minimum amount of history for anomaly detection to kick in, and even then alerts might be noisy due to instability in the number of requests handled by those hosts.

---

複数のアラートを作成するときは注意してください。 service.requests_served {*}などのメトリックは異常検出には適していますが、{host}によるservice.requests_served {*}はおそらくそうではありません。 ホストのロードバランシングが行われている場合、異常な動作をしているホストを検出するためには異常値モニタが適しています。 サービスの規模が大きくなると、異常検出が開始されるまでの履歴が最小限になるまで、新しいホストはまったく監視されず、それらのホストによって処理される要求の数が不安定になるため警告がノイズになる可能性があります 。


<!--### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

<img src="/static/images/anomalies/spaghetti.png" style="width:500px; border:1px solid #777777"/>

You can, however, add multiple series in a single graph one at a time. The gray envelope will only show up on mouseover.

<img src="/static/images/anomalies/anomaly_multilines.png" style="width:500px; border:1px solid #777777"/>

### Will past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

<img src="/static/images/anomalies/anomalous_history.png" style="width:500px; border:1px solid #777777"/>

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

<img src="/static/images/anomalies/no_effect.png" style="width:500px; border:1px solid #777777"/>
-->

### Why can't I use anomaly detection over groups in the dashboard?

Looking at many separate timeseries in a single graph can lead to [spaghettification](https://www.datadoghq.com/blog/anti-patterns-metric-graphs-101/), and the problem gets only worse once the anomaly detection visualization is added in.

1つのグラフで多くの別々の時系列データを見ると、スパゲッティングが発生する可能性があり、異常検出の視覚化が追加されると問題は悪化します。

<img src="/static/images/anomalies/spaghetti.png" style="width:500px; border:1px solid #777777"/>

You can, however, add multiple series in a single graph one at a time. The gray envelope will only show up on mouseover.

ただし、1つのグラフに複数の系列を1つずつ追加することはできます。 グレーの封筒はマウスオーバー時にのみ表示されます。

<img src="/static/images/anomalies/anomaly_multilines.png" style="width:500px; border:1px solid #777777"/>

### Will past anomalies affect the current predictions?

All the algorithms outside of _Basic_ use extensive amounts of historical data so that they are robust to most anomalies. In the first graph, note how the envelope stays around 400K even after the metric has dropped to 0, and how it continues to do so throughout the day.

_Basic_以外のすべてのアルゴリズムは、膨大な量の履歴データを使用しているため、ほとんどの異常に対して堅牢です。 最初のグラフでは、メトリックが0に下がった後もエンベロープがどのように400Kに留まっているのか、それが1日を通してどのように継続しているのかをご確認ください。

<img src="/static/images/anomalies/anomalous_history.png" style="width:500px; border:1px solid #777777"/>

The second graph shows the same metric, a day later. Even though it uses the previous day in the calculation of the envelope, it is unaffected by the anomaly that occurred then.

2番目のグラフは、同じメトリックを1日後に示しています。 エンベロープの計算では前日を使用していますが、その後発生した異常の影響を受けません。

<img src="/static/images/anomalies/no_effect.png" style="width:500px; border:1px solid #777777"/>


<!-- ### How should I set the window size and alert threshold?

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%).
-->

### How should I set the window size and alert threshold?

Smaller window sizes will lead to faster alerts, however, with very small windows (<= 10 minutes), metrics often appear noisy, making it difficult to visualize the difference between anomalies and noise.

Note that setting the window size to X minutes doesn't require an anomaly to last X minutes before an alert is triggered. You can tune the threshold to control how long an anomaly must last to trigger an alert. For example, with the window size set to 30 minutes, you can get alerted when an anomaly lasts for just five minutes by setting the threshold to 5/30 = 17%. That said, we have found that anomaly alerts are most reliable when the window size is between 15 minutes and an hour and the threshold is on the higher side (> 40%)

---

###どのようにウィンドウサイズとアラートのしきい値を設定する必要がありますか？

ウィンドウサイズが小さくなるとアラートが速くなりますが、ウィンドウが非常に小さい（10分未満）と、メトリックがノイズに見えることが多く、異常とノイズの違いを視覚化することが困難になります。

ウィンドウのサイズをX分に設定すると、アラートがトリガーされる前にX分続くことはありません。 しきい値を調整して、アラートをトリガーするまでの時間を制御することができます。 たとえば、ウィンドウサイズを30分に設定した場合、しきい値を5/30 = 17％に設定することで、異常が5分間続くとアラートが表示されます。 つまり、ウィンドウのサイズが15分から1時間の間、しきい値がより高い側（> 40％）にある場合、異常アラートが最も信頼できることがわかりました

<!-- ### Why does `anomalies` not add a gray prediction band in the dashboard? / Why am I getting "No Data" for an Anomaly Alert? / How much history do the algorithms require?

All the algorithms besides _Basic_ require historical data before they can start making predictions. If your metric has only started reporting data for a short while, then _Agile_ and _Robust_ won't try to make any predictions until it has at least two weeks of history. _Adaptive_ will start working after it has at least two hours worth of history.
-->

### Why does `anomalies` not add a gray prediction band in the dashboard? / Why am I getting "No Data" for an Anomaly Alert? / How much history do the algorithms require?

All the algorithms besides _Basic_ require historical data before they can start making predictions. If your metric has only started reporting data for a short while, then _Agile_ and _Robust_ won't try to make any predictions until it has at least two weeks of history. _Adaptive_ will start working after it has at least two hours worth of history.


### なぜアノマリーはダッシュボードにグレーの予測バンドを追加しないのですか？ /異常なアラートの「データなし」が表示されるのはなぜですか？ /アルゴリズムにはどのくらいの履歴が必要ですか？

_Basic_以外のすべてのアルゴリズムでは、予測を開始する前に履歴データが必要です。 メトリックでデータの報告が開始されたばかりの場合、_Agile_と_Robust_は少なくとも2週間の履歴があるまで予測を行いません。 _Adaptive_は少なくとも2時間分の履歴があると作業を開始します。


<!--
### Why does an anomaly "disappear" when I zoom in?

At different zoom levels, the same query can result in time series with very different characteristics. When looking at longer time periods, each point represents the aggregate of many more-granular points. Therefore, each of these aggregate points may hide noise observed in the more granular points. For example, charts that show one week often appear smoother (less noisy) than charts that show just 10 minutes.

The width of the grey band that is drawn by our anomaly detection algorithm is, in part, based on the noisiness of the time series in the plot. The band must be wide enough that ordinary noise is mostly inside the band and doesn't appear as anomalous. Unfortunately, when the band is wide enough to include ordinary noise, it might also be wide enough to hide some anomalies, especially when viewing short time windows.

Here's a concrete example to illustrate. The `app.requests` metric is noisy but has a constant average value of 8. On one day, there is a 10-minute anomalous period, starting a 9:00, during which the metric has an average value of 10. The chart below shows this series in a graph with a one-day time window; each point in the graph summarizes 5 minutes.

<img src="/static/images/anomalies/disappearing_day.png" style="width:500px; border:1px solid #777777"/>
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


<!--### Is it possible to capture anomalies that occur within the bounds?

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.

<img src="/static/images/anomalies/raw_profile_updates.png" style="width:500px; border:1px solid #777777"/>

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

<img src="/static/images/anomalies/rollup_profile_updates.png" style="width:500px; border:1px solid #777777"/>

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

<img src="/static/images/anomalies/ewma_profile_updates.png" style="width:500px; border:1px solid #777777"/>
-->

### Is it possible to capture anomalies that occur within the bounds?

If the reason anomalies are occurring within the bounds is that the volatility of a metric leads to wide bounds that mask true anomalies (as described in the FAQ above), you may be able apply functions to the series to reduce its volatility, leading to narrower bounds and better anomaly detection.

For example, many important metrics (e.g., `successful.logins`, `checkouts.completed`, etc.) represent the success of some user-driven action. It can be useful to monitor for anomalous drops in one of those metrics, as this may be an indication that something is preventing successful completion of these events and that the user experience is suffering.

It's common that these metrics have points that are at or near zero, especially when viewing the metric over a short window of time. Unfortunately, this results in the bounds of the anomaly detection forecast include zero, making it impossible to detect anomalous drops in the metric. An example is shown below.


<img src="/static/images/anomalies/raw_profile_updates.png" style="width:500px; border:1px solid #777777"/>

How can we work around this problem? One approach is to add a `rollup()` to force the use of a larger interval. `rollup()` takes as an argument the number of seconds that should be aggregated into a single point on the graph. For example, applying `rollup(120)` will lead to a series with one point every two minutes. With larger intervals, zeros become rare and can correctly be categorized as anomalies. Here's the same series as above but with a 2-minute rollup applied.

<img src="/static/images/anomalies/rollup_profile_updates.png" style="width:500px; border:1px solid #777777"/>

Another option is to apply the `ewma()` function to take a moving average. Like with rollups, this function will smooth away intermittent zeros so that drops in the metric can correctly be identified as anomalies.

<img src="/static/images/anomalies/ewma_profile_updates.png" style="width:500px; border:1px solid #777777"/>


###範囲内で発生する異常をキャプチャすることは可能ですか？

理由の異常が境界内で発生している場合は、メトリックのボラティリティが真の異常を隠す広い境界につながる（上記のFAQで説明したように）場合、そのシリーズにボラティリティを減らすために関数を適用できる可能性がありますより良い異常検出が可能です。

例えば、多くの重要な指標（例えば、「成功。ログイン」、「チェックアウト済み」など）は、ユーザ主導の行動の成功を表している。これらのメトリックの1つの異常なドロップを監視すると便利です。これは、何かがこれらのイベントの正常な完了を妨げていることやユーザーエクスペリエンスが苦しんでいることを示している可能性があります。

これらのメトリックは、特に、短い時間枠でメトリックを表示する場合に、ゼロまたはそれに近い点を持つことが一般的です。残念なことに、これにより、異常検出予測の境界にゼロが含まれ、測定基準の異常なドロップを検出できなくなります。例を以下に示します。

<img src="/static/images/anomalies/raw_profile_updates.png" style="width:500px; border:1px solid #777777"/>

この問題を回避するにはどうしたらいいですか？ 1つのアプローチは、より大きな間隔の使用を強制するために `rollup（）`を追加することです。 `rollup（）`は、グラフ上の単一のポイントに集計される秒数を引数として取ります。 たとえば、 `rollup（120）`を適用すると、2分ごとに1ポイントの系列になります。 間隔を広げると、ゼロはまれになり、正しく異常に分類できます。 上記のシリーズと同じですが、2分間のロールアップが適用されています。

<img src="/static/images/anomalies/rollup_profile_updates.png" style="width:500px; border:1px solid #777777"/>

別のオプションは `ewma（）`関数を適用して移動平均を取ることです。 ロールアップと同様に、この関数は断続的なゼロを滑らかにして、メトリックの低下を異常として正しく識別できるようにします。

<img src="/static/images/anomalies/ewma_profile_updates.png" style="width:500px; border:1px solid #777777"/>