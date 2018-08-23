---
last_modified: 2017/08/25
translation_status: tentative
language: ja
title: Outlier Detection (外れ値検知)
kind: guide
listorder: 23
---
<!--
Outlier Detection is an algorithmic feature that allows you to detect when some members of a group are behaving strangely compared to the others. For example, you could detect that one web server in a pool is processing an unusual number of requests, and hence should be a target for replacement. Or, you could get an early warning that significantly more 500s are happening in one AWS Availability Zone (AZ) than the others, which might indicate an issue brewing in that AZ.

{{< img src="outliers/outliers-metric-alert.png" >}}
-->

Outlier Detectionはアルゴリズムベースの異常検出機能であり、グループ内の特定の個体に他とは異なる挙動がみられた際に外れ値データ(Outlier)として検出することができます。例えば、Webサーバー群の特定の1サーバーが異常なリクエスト数を処理しているような場合に検出し、これをリプレースすべきか判断することができます。あるいは、特定のAWSアベイラビリティゾーン(AZ)において、他のAZより多めの500(5XX)エラーを生じていることを早めに検出することで、そのAZに迫りつつある問題を察知することができるかもしれません。

{{< img src="outliers/outliers-metric-alert.png" >}}

<!--
## How to Use Outlier Detection on Your Data

The `outliers` query function, when applied to your query, will return the usual results but with outlier series marked.

You can use this function to display and alert on outliers in your data. To try it out, you'll first need a metric for which a group of hosts (or availability zones, partitions, etc) should exhibit uniform behavior. For the function to work, be sure that there are at least 3 or more members in the group. Given that, here are two ways to use outlier detection on that group.
-->

## Outlier Detectionの利用法

`outliers` クエリ関数をアラートやグラフのクエリとして追加適用すると、グループ内の他とは異なる挙動の時系列データを外れ値データ(Outlier)とマークして返します。

Outlier Detectionはダッシュボード上の時系列データのグラフとして可視化することも、アラートとして設定することもできます。これを適用するためには、ホスト(あるいはアベイラビリティゾーン、パーティションなど)のグループから取得され、そのグループのメンバーがある程度均一な挙動をしているメトリクスを選ぶ必要があります。そして、この関数が機能するためには少なくとも3つ以上のメンバーを含むグループであることが必要です。次から、そのグループでOutlier Detectionを利用する2つの方法について説明します。

<!--
### Show Outliers in Dashboards or Screenboards

Here's a graph of gunicorn requests by host with outlier detection enabled:

{{< img src="outliers/outliers-graph-dbscan-gunicorn.png" >}}
-->

### Outlier Detectionをダッシュボードで可視化する

下記はOutlier Detectionを適用したメトリクス、gunicornのホストごとのリクエスト数のグラフ表示例です:

{{< img src="outliers/outliers-graph-dbscan-gunicorn.png" >}}

<!--
You can see that one of the series is an outlier: it is handling significantly lower traffic than the others for the time window in question.

To set up an outlier detection graph for your data you add a metric to the graph showing all series in the groups. You apply the outlier detection algorithm by adding `outliers` function on your data. After applying the function, outlier series will be colored with a bold, warm palette, while all other series will be colored with a lightweight, greyscale color palette.

First create a new timeseries graph on your dashboard with your chosen metric.

{{< img src="outliers/outliers-dash-choose-metrics-updated.png" >}}
-->

時系列データの1つが外れ値データ(Outlier)としてマークされています: 当該の時間幅において、グループ内の他とは明らかに異なる低いトラフィックをさばいていることがわかります。

Outlier Detectionをグラフ表示に適用するには、対象とするグループの時系列データをグラフ表示に取り込み、`outliers`関数を追加します。Outlier Detectionのアルゴリズムが適用されると、外れ値(Outlier)の時系列データが太字で暖色に色付けされ、グループ内の他の時系列データは細文字のグレイスケールで表示されます。

まず、選択したメトリクスでダッシュボード上に時系列データのグラフを作成する際には、グラフエディターは以下のようになっているでしょう:

{{< img src="outliers/outliers-dash-choose-metrics-updated.png" >}}

<!--
To enable outlier detection, click on the + icon on the right side of the metrics line. Choose **Algorithms** from the function categories, then pick one of the four outlier algorithms.

{{< img src="outliers/outliers-algorithm-selector.png" >}}

This will add the outliers function to your graph, and you'll see any outliers in the group highlighted in bold, warm colors.

{{< img src="outliers/outliers-algorithm-annotated-newer.png" >}}
-->

そしてここでOutlier Detectionを有効化するために、メトリクスの選択ボックスの右手にあるプラスマークをクリックします。関数のカテゴリの中から **Algorithms** を選び、4つある outlier アルゴリズムのうち1つを選択します。

{{< img src="outliers/outliers-algorithm-selector.png" >}}

これで"outliers" 関数がグラフ表示に追加され、外れ値(Outlier)の時系列データが太字に暖色でマークされることになります。

{{< img src="outliers/outliers-algorithm-annotated-newer.png" >}}

<!--
There are several outlier detection algorithms you can choose. The default algorithm (DBSCAN) and parameter values should work for most scenarios. However, if you see too many or too few outliers identified, you can tune the algorithm or try an alternate algorithm. To learn more, see the "Outlier Algorithms and Parameters" section below.
-->

Outlier Detectionのアルゴリズムは選択することができます。そして、デフォルトのアルゴリズム(DBSCAN)とそのパラメータの指定によって多くのシナリオでOutlier Detectionを有効に機能させることができるでしょう。しかし、もし検出される外れ値(Outlier)が多すぎたり少なすぎる場合には、アルゴリズムの調整や他のアルゴリズムへの変更ができます。詳しくは、後で述べる "Outlier Detectionのアルゴリズムとパラメータ" セクションを参照して下さい。

<!--
### Alert on Outliers

You can also define a monitor to alert when an outlier is detected in an important group.

{{< img src="outliers/outliers-alert-snapshot.png" >}}

For example, to alert when a Cassandra host is abnormally loaded compared to the rest of the group, you can [add a new outlier monitor](https://app.datadoghq.com/monitors#create/outlier) for the metric.

Navigate to the [New Monitor](https://app.datadoghq.com/monitors#/create) page and click **Outlier**. Then fill out the **Define the metric** section just as you would for any other monitor.

{{< img src="outliers/outliers-new-monitor-define-metric.png" >}}
-->

### 外れ値データ(Outlier)をアラートする

監視すべき重要なグループにおいて外れ値データ(Outlier)を検出したときにアラートするMonitorを設定します。

{{< img src="outliers/outliers-alert-snapshot.png" >}}

例えば、Cassandraのホストについてグループ内の他とくらべて異常に負荷が掛かっている場合にアラートをしたい場合、
[新規outlier monitor の作成](https://app.datadoghq.com/monitors#create/outlier) ページに進みます。

[New Monitor](https://app.datadoghq.com/monitors#/create) ページに進んだら、**Outlier** をクリックし、他のメトリクスを対象にしたMonitor同様、**Define the metric** セクションにてメトリクスとそのメトリクスを監視する範囲(スコープ)を選択します。

{{< img src="outliers/outliers-new-monitor-define-metric.png" >}}

<!--
In the alert conditions, select the grouping and timeframe. Then select an algorithm and parameter values to use for outlier detection.

{{< img src="outliers/outliers-newer-monitor-set-conditions.png" >}}

To ensure that your alert is properly calibrated, you can set the time window at the top of the screen and use the reverse (<<) button to look back in time for when outliers would have be found and alerted. This is also a good way to tune the parameters to the specific outliers algorithm you're using.

{{< img src="outliers/outliers-new-monitor-graph-calibrate.png" >}}
-->

"alert conditions" では、グルーピングと外れ値を検出すべき(Outlier)時間幅を指定します。そして、Outlier Detectionに使用するアルゴリズムを1つ選択します。

{{< img src="outliers/outliers-newer-monitor-set-conditions.png" >}}

設定したアラートが適切に調整されているか確かめるために、過去をさかのぼってどのように外れ値(Outlier)が検出されアラートされ得るか確認しましょう。画面右上のリバースボタン(<<)で表示されている時間幅を操作します。これは、選択しているOutlier Detectionのアルゴリズムのパラメーターを調整するためにも有効な方法です。

{{< img src="outliers/outliers-new-monitor-graph-calibrate.png" >}}

<!--
## Reference: Outlier Algorithms and Parameters

There are two different outlier detection algorithms you can use on your data: DBSCAN and Median Absolute Deviation (MAD). We recommend starting with the default algorithm, DBSCAN. If you have trouble detecting the right outliers, you can adjust the parameters to DBSCAN or try the alternate algorithm, MAD. Explanation of each algorithm and its parameters follows.
-->

## レファレンス Outlier Detection のアルゴリズムとパラメータ

Outlier Detection では、DBSCAN と Median Absolute Deviation (MAD)の2つのアルゴリズムを使用することができます。まずは、デフォルトのアルゴリズムであるDBSCANから始めることをおすすめします。そして、もし上手く外れ値(Outlier)の検出ができないような場合には、そのパラメータを調整するか、もう一方のアルゴリズムであるMADを試してみてください。以下で、それぞれのアルゴリズムとそのパラメータについて解説します。

<!--
### DBSCAN/ScaledDBSCAN

A natural way to group together hosts that are behaving similarly is to use a clustering algorithm. We use [DBSCAN](https://en.wikipedia.org/wiki/DBSCAN), a popular density-based clustering algorithm, for this purpose. DBSCAN works by greedily agglomerating points that are close to each other. Clusters with few points in them are considered outliers.

Traditionally, DBSCAN takes: 1) a parameter 𝜀 that specifies a distance threshold under which two points are considered to be close; and 2) the minimum number of points that have to be within a point's 𝜀-radius before that point can start agglomerating. The image below shows an example of DBSCAN in action on points in the plane. There are two clusters. The large points had enough close neighbors to agglomerate those points, while the small colored points did no agglomerating themselves but are within the 𝜀-radius of a large point. The points in black are the outliers.

{{< img src="outliers/outliers-dbscan-2d.png" >}}
-->

### DBSCAN/ScaledDBSCAN - 密度ベースのクラスタリング手法

同じような挙動をとるホストをグルーピングする自然な方法は、クラスタリングアルゴリズムを使用することです。
Datadogでは幅広く使われている[DBSCAN](https://en.wikipedia.org/wiki/DBSCAN)と呼ばれる、密度に基づいたクラスタリングアルゴリズムを使用します。DBSCAN はお互いの距離が近い密集したデータポイント群を同一クラスタとして判定します。そして、いくつかの要素を満たすクラスタについて外れ値(Outlier)とみなします。

伝統的にDBSCANは、1)2点間の距離が近いかどうかを判定する閾値となるパラメータ 𝜀 (eps)と、2)点が密集しているとみなすために必要な半径 𝜀 (eps)の円に収まるべき最小のデータポイント数、という2つのパラメータを使用します。
下記イメージは、ある平面上のデータポイントに対してDBSCANアルゴリズムを適用した例です。2つのクラスタがあり、大きな点は近傍の点と密集しているとみなすのに十分近い距離、そして数があると判定されています。一方で小さな色付きの点は、大きな点の半径 𝜀 (eps)の円の内側にあるものの密集していると判定はされていません。そして、小さな黒い点は外れ値(Outlier)です。

{{< img src="outliers/outliers-dbscan-2d.png" >}}

<!--
#### Parameters

We use a simplified form of DBSCAN to detect outliers on timeseries. We consider each host to be a point in d-dimensions, where d is the number of elements in the timeseries. Any point can agglomerate, and any point that is not in the largest cluster will be considered an outlier.

We set the initial distance threshold as follows. We create a new median timeseries by taking the median of the values from the existing timeseries at every time point. Then we calculate the (Euclidean) distance between each host and the median series. The threshold is the median of those distances, multiplied by a normalizing constant
-->

#### DBSCANのパラメータ

Datadogでは外れ値(Outlier)を検出するために、DBSCANを簡略化した形式で使用しています。それぞれのホストはサイズd内の1ポイントと考えます。ここで、"d"とは時系列データの要素数です。いずれのポイントも密集していると見なすことができ、そしていずれもポイントも大きなクラスタに属しなければ外れ値(Outlier)と見なされ得るということです。

距離の閾値の初期値については、以下のように設定しています。まず、各時刻における時系列データの中央値をとった、"中央値時系列データ" を新たに作成します。そして、 その"中央値時系列データ"と、各ホストとの(ユークリッド)距離を算出します。閾値は、この算出された距離の中央値を正規化した定数で乗じたものになります。

<!--
The only parameter we take is `tolerance`, the constant by which the initial threshold is multiplied to yield DBSCAN's distance parameter 𝜀. Here is DBSCAN with a tolerance of 3.0 in action on a pool of Cassandra workers:

{{< img src="outliers/outliers-dbscan-cassandra.png" >}}

You should set the tolerance parameter depending on how similarly you expect your group of hosts to behave-larger values allow for more tolerance in how much a host can deviate from its peers.
-->

DatadogのDBSCANで使用するパラメータは`tolerance`のみであり、DBスキャンの距離のパラメータ 𝜀 (eps)を算出するために閾値の初期値はこの定数によって乗じられます。次は、CassandraワーカープールについてDBSCANをtolerance 値3.0で適用した例です:

{{< img src="outliers/outliers-dbscan-cassandra.png" >}}

対象とするホストのグループがどれくらい似たような挙動を持つか次第で、この`tolerance`パラメータを調整して下さい。大きな値を設定するほど、特定のホストがグループ内の他と比べてより大きく外れた挙動をとることを許容(tolerance)することになります。つまり、大きな値を設定するほど、太字に暖色でマークされる外れ値(Outlier)の時系列データは少なくなり、検出モレが生じる可能性が出てきます。

<!--
#### ScaledDBSCAN

The distance threshold of the DBSCAN algorithm is independent of the overall scale of the metrics. Consider a group of constant timeseries with values {1000, 1001, 1002, 1005, 1015}. The median series will be a constant series at 1002. DBSCAN with a tolerance of 3.0 will identify the series at 1015 to be an outlier, even though it may be almost indistinguishable from the other series visually on the graph when the origin of the y-axis is at 0.

The ScaledDBSCAN algorithm scales the distance threshold according to the relative magnitudes of the median series and the hosts' distances to the median series. In most situations, it will behave the same as regular DBSCAN does. However, when the median series is large compared to the distances to the median series, the distance threshold becomes proportional to the size of the median series. As a result, assessing whether two timeseries are close depends on the scale of the median series.

Here is a comparison of DBSCAN and ScaledDBSCAN with tolerances of 3 on field data size in a group of Elasticsearch nodes:

{{< img src="outliers/outliers-scaled-dbscan-es.png" >}}
-->
#### ScaledDBSCAN

The distance threshold of the DBSCAN algorithm is independent of the overall scale of the metrics. Consider a group of constant timeseries with values {1000, 1001, 1002, 1005, 1015}. The median series will be a constant series at 1002. DBSCAN with a tolerance of 3.0 will identify the series at 1015 to be an outlier, even though it may be almost indistinguishable from the other series visually on the graph when the origin of the y-axis is at 0.

The ScaledDBSCAN algorithm scales the distance threshold according to the relative magnitudes of the median series and the hosts' distances to the median series. In most situations, it will behave the same as regular DBSCAN does. However, when the median series is large compared to the distances to the median series, the distance threshold becomes proportional to the size of the median series. As a result, assessing whether two timeseries are close depends on the scale of the median series.

Here is a comparison of DBSCAN and ScaledDBSCAN with tolerances of 3 on field data size in a group of Elasticsearch nodes:

{{< img src="outliers/outliers-scaled-dbscan-es.png" >}}

<!--
### Median Absolute Deviation (MAD)

The  [Median Absolute Deviation](https://en.wikipedia.org/wiki/Median_absolute_deviation) is a robust measure of variability, and can be viewed as the robust analog for standard deviation. Robust statistics describe data in such a way that they are not unduly influenced by outliers.

For a given set of data D = {d<sub>1</sub>, ..., d<sub>n</sub>}, the deviations are the difference between each d<sub>i</sub> and median(D). The MAD is then the median of the absolute values of all the deviations. For example if D = {1, 2, 3, 4, 5, 6, 100}, then the median is 4, the deviations are {-3, -2, -1, 0, 1, 2, 96}, and the MAD is 2. (Note that the standard deviation by contrast is 33.8.)
-->

### Median Absolute Deviation (MAD) / ScaledMAD - 中央絶対偏差によるロバスト統計

[Median Absolute Deviation, 中央絶対偏差](https://en.wikipedia.org/wiki/Median_absolute_deviation) は、ばらつきを含むデータのロバストな測定方法の1つであり、標準偏差のロバストな類似統計値として見なされることもあります。ロバスト統計では、このような手法によってデータを記述することで、外れ値(Outlier)による過度な影響を排除します。

あるデータセット D = {d<sub>1</sub>, ..., d<sub>n</sub>} について、それぞれの偏差は d<sub>i</sub> と 中央値(D) の差になります。中央絶対偏差(MAD)は、このそれぞれの偏差の絶対値の中央値となります。例えば、データセット D = {1, 2, 3, 4, 5, 6, 100} について、中央値は4、それぞれの偏差は {-3, -2, -1, 0, 1, 2, 96} となる場合、中央絶対偏差(MAD)は2となります。(これとは対照的に標準偏差は33.8となり、データセットのばらつきの影響を強く受けています)

<!--
#### Parameters

In our case, the data set is the set of all points in every timeseries. We take the MAD of all the points then multiply it by a normalizing constant and our first parameter, `tolerance`. The constant normalizes MAD so that it is comparable to the standard deviation of the normal distribution. The tolerance parameter then specifies how many "deviations" a point has to be away from the median for it to be considered an outlier.

Now to mark a timeseries as an outlier, we use the second parameter, `pct`. If more than pct% of a particular series' points are considered outliers, then the whole series is marked to be an outlier. Here is MAD with a tolerance of 3 and pct of 20 in action when comparing the average system load by availability zone:

{{< img src="outliers/outliers-mad-az.png" >}}
-->

#### MADのパラメータ

Datadogでは、データセットは各時系列ごと、それぞれの時系列ではすべてのデータポイントをデータセットに含みます。そして、そのすべてのデータポイントにおける中央絶対偏差(MAD)をとり、正規化した定数と最初のパラメータである`tolerance` で乗じます。ここでの定数とは中央絶対偏差(MAD)を、正規分布の標準偏差に相当する値(分布のばらつきを表現する値)とするために正規化しています。そして`tolerance` パラメータは、データセットの分布が中央値からどれくらい離れているかで外れ値と見なすかについて特定します。(訳者注：通常、正規分布しているデータセットは平均からどれくらいの標準偏差ぶん離れているかで分布のばらつきを説明します。MADを用いたOutlier Detection では、正規分布ではない時系列ごとのデータセットに対して中央値からどれくらいの　MAD × "tolerance" ぶん離れているかで、外れ値と見なすかどうか判断します)

そして特定の時系列データを外れ値(Outlier)とマークするために、2つめのパラメータである`pct` を使用します。もしある時系列データの`pct`%のデータポイントが外れ値(Outlier)だと判定された場合に、その時系列データ全体を外れ値(Outlier)とマークすることになります。次のグラフ表示は、中央絶対偏差(MAD)アルゴリズムで`tolerance` は3,`pct` は20(%)と指定した場合での、AWSアベイラビリティゾーン(AZ)ごとのシステムのロードアベレージを表示したものです。

{{< img src="outliers/outliers-mad-az.png" >}}

<!--
The tolerance parameter should be tuned depending on the expected variability of the data. For example, if the data is generally within a small range of values, then this should be small. On the other hand, if points can vary greatly, then you want a higher scale so these variabilities do not trigger a false positive.
-->

`tolerance` は想定されているデータセットのばらつき加減に依って調整されるべきパラメータです。例えば、もしデータセットが普段は比較的小さな値の範囲に収まるのであれば、このパラメータは小さい値にすべきです。一方で、データポイントが大きく変化し得るものであれば、より大きな値を設定してばらつき大きさによる誤った検出を引き起こさないようにする必要があるでしょう。

<!--
#### ScaledMAD

Like for DBSCAN, the MAD algorithm is designed to be independent of the overall magnitude of the metrics. If D = {1000, 1001, 1002, 1005, 1010}, the median is 1002, and the MAD is 2. Even though the point at 1010 seems close to the median in terms of their relative scales, it is still an outlier point for a tolerance of 3.

The ScaledMAD algorithm, like ScaledDBSCAN, considers the relative scales of the MAD and the median. In most cases, it will behave the same as the MAD algorithm does. However, when the MAD of the data set becomes small compared to the median, the measure of deviation becomes proportional to the median. Therefore, determining whether a point is an outlier depends on the overall scale of the metrics.

Here is an example of MAD and ScaledMAD algorithms for comparing the usable memory in Cassandra hosts. Both have tolerances of 3 and pct of 20:

{{< img src="outliers/outliers-scaled-mad-cassandra.png" >}}
-->
#### ScaledMAD

Like for DBSCAN, the MAD algorithm is designed to be independent of the overall magnitude of the metrics. If D = {1000, 1001, 1002, 1005, 1010}, the median is 1002, and the MAD is 2. Even though the point at 1010 seems close to the median in terms of their relative scales, it is still an outlier point for a tolerance of 3.

The ScaledMAD algorithm, like ScaledDBSCAN, considers the relative scales of the MAD and the median. In most cases, it will behave the same as the MAD algorithm does. However, when the MAD of the data set becomes small compared to the median, the measure of deviation becomes proportional to the median. Therefore, determining whether a point is an outlier depends on the overall scale of the metrics.

Here is an example of MAD and ScaledMAD algorithms for comparing the usable memory in Cassandra hosts. Both have tolerances of 3 and pct of 20:

{{< img src="outliers/outliers-scaled-mad-cassandra.png" >}}

<!--
### DBSCAN vs. MAD

So which algorithm should you use? For most outliers, both algorithms will perform well at the default settings. However, there are subtle cases where one algorithm is more appropriate than the other.

In the following image, we see a group of hosts flushing their buffers together while one host is flushing its buffer slightly later. DBSCAN picks this up as an outlier whereas MAD does not. This is a case where we would prefer to use MAD, as we don't care about when the buffers get flushed. The synchronicity of the group is just an artifact of the hosts being restarted at the same time. On the other hand, if instead of flushed buffers, the metrics below represented a scheduled job that actually should be synchronized across hosts, DBSCAN would be the right choice.

{{< img src="outliers/outliers-flushing.png" >}}
-->

### DBSCAN か MAD か

では、どちらのアルゴリズムを使用すべきなのでしょうか？　多くの外れ値(Outlier)の検出において、いずれのアルゴリズムもデフォルト設定で有効に機能すると思われます。しかしながら、僅かなケースで、一方のアルゴリズムがもう一方よりも適切といえる場合があります。

下記のイメージのグラフはあるホストのグループがバッファをフラッシュしていることがメトリクスから見られますが、多くのホストがフラッシュしてから若干の遅れをもってフラッシュしている特定のホストがあります。DBSCANはこのホストを外れ値(Outlier)として検出する一方で、MADは検出しません。バッファがいつフラッシュされるかは注目すべきことではないので、このようなケースではMADの使用が適切です。グループ内での同時刻の発生は、ホストを同時に再起動したことによる人為的なものなどがあり得ます。その一方で、もし下記のイメージがバッファのフラッシュでなくスケジュールされたジョブによるものであれば、グループ内のホストで同時刻に発生しているべきです。そうした場合には、DBSCANの使用が最適な選択といえます。(訳者注：この違いは、DBSCANが時系列データ全体を対象にクラスタリングを実施してOutlierとしてマークするかどうかを判定するのに対し、MADは各時刻ごとに一旦外れ値かどうかの判定を実施したうえで時系列データの外れ値含有率からOutlierとしてマークするためにおこります。端的に言えば、DBSCANは見た目どおりの大まかなグラフの形状の類似性を見ているがMADはそうではなく、同時刻における点(値)のばらつきだけを見ている、となります。)

{{< img src="outliers/outliers-flushing.png" >}}

<!--
#### Scaled vs. Regular Algorithms

In most situations, the scaled algorithms will behave the same as their regular counterparts. However, if DBSCAN/MAD algorithms are identifying outliers within a closely clustered group of metrics, and you would like the outlier detection algorithm to scale with the overall magnitude of the metrics, try the scaled algorithms.
-->
#### Scaled アルゴリズム vs. 通常のアルゴリズム

ほとんどの場合、Scaled アルゴリズムは、通常のアルゴリズムと同じように振る舞います。 ただし、DBSCAN / MAD アルゴリズムが密接にクラスタ化されたメトリクスのグループ内において外れ値を検出している場合、そしてOutlier Detection アルゴリズムをメトリクスの推移するスケール全体の規模に合わせて拡張したい場合は、Scaled アルゴリズムを試してください。

<!--
### Setting up alerts

When setting up an outlier alert, an important parameter is the size of the time window. If the window size is too large, by the time an outlier is detected, the bad behavior might have been going on for longer than one would like. If the window size is too short, the alerts will not be as resilient to unimportant, one-off spikes.

Both algorithms are set up to identify outliers that differ from the majority of metrics that are behaving similarly. If your hosts exhibit "banding" behavior as shown below (perhaps because each band represents a different shard), we recommend tagging each band with an identifier, and setting up outlier detection alerts on each band separately.

{{< img src="outliers/outliers-banding.png" >}}
-->

### アラート設定のTips

外れ値(Outlier)についてアラートを設定する場合の重要なパラメータとして、外れ値を検出すべき(Outlier)時間幅の設定があります。大きすぎる時間幅は、外れ値(Outlier)を検出すべき時間幅の大きさのゆえに、異常な挙動の継続を許してしまう可能性があります。
一方で小さすぎる時間幅では、単発のスパイクのような些細な挙動に対しても過敏に反応してしまいます。

また、いずれのアルゴリズムも、大多数の同様な挙動をもつメトリクスとは異なる外れ値(Outlier)を特定するために設定されます。もし下記のような複数の値の幅を取りうるホストに対してOutlier Detectionを適用する場合には、ホストがそれぞれの値の幅を持つことを示すタグを付与し、そのタグを持つホストごとに別のOutlier Detectionアラートを設定することをおすすめします。

{{< img src="outliers/outliers-banding.png" >}}
