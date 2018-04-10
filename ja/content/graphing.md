---
last_modified: 2017/08/24
translation_status: Completed
language: ja
title: グラフ表示入門
kind: documentation
has_snippets: True
---
<!--
There are two ways to interact with the Graphing Editor: using the GUI (the default method) and writing JSON (the more complete method). This page covers using the GUI. To learn more about using JSON, visit the [JSON Graphing Primer Page][1]
-->
グラフエディターの設定には、GUI(デフォルトの手法)とJSON形式(より完全な手法)の2種類があります。このページではGUIエディターでの設定について説明します。JSON形式を使用したより詳しい設定に関しては、[JSONを使用したグラフ表示入門][1]を参照して下さい。

<!--
## Find the Graph Editor

On each graph you will find a pencil icon that opens the graph editor.

{{< img src="graphing/references-graphing-overview.png" alt="Graphing Overview" >}}

The graph editor has three tabs, **Share**, **JSON**, and **Edit**. **Share** will allow you to embed the graph on any external web page. **JSON** is the more flexible editor, but it requires knowledge of the graph definition language to make use of it. **Edit** is the default tab and will allow you to use a GUI to select the graphing options. The newest features are sometimes only available on the **JSON** tab.
 -->

## グラフエディターの使用

グラフを開くと右上隅に鉛筆マークがあります。このマークをクリックするとグラフエディターがポップアップします。

{{< img src="graphing/references-graphing-overview.png" alt="Graphing Overview" >}}

グラフエディターには**Share**, **JSON**, **Edit**の3つのタブがあります。 **Share**タブでは、グラフを外部のwebページに挿入するためのコードを取得可能です。　**JSON**タブはより柔軟な設定が可能なエディターである一方、使用するにはグラフを定義する言語を理解しておく必要があります。 **Edit**はデフォルトのタブであり、グラフ表示のオプションをGUIから選択して設定することができます。最新の機能は **JSON**エディターでのみ使用できる場合があります。

<!--
## Graphing with the graphical editor interface

When you first open the graph editor window, you will be on the **Edit** tab. Here you can use the UI to choose most settings to tweak your graphs. Here is an example of what you might see. This example comes from the first graph in the standard Postgres Integration dashboard:

{{< img src="graphing/references-graphing-edit-window-with-y.png" alt="Graphing Edit Tab" >}}

Configuring a graph in a dashboard is a multi-step process. The first two steps depend
-->

## GUIエディターを使用したグラフ表示

グラフエディターウィンドウを開くと、最初は**Edit**タブがセットされています。このインターフェイスでグラフをあれこれ操作するほとんどの設定が選択できます。以下は、一般的なPostgresインテグレーションダッシュボードでのグラフの例です:

{{< img src="graphing/references-graphing-edit-window-with-y.png" alt="Graphing Edit Tab" >}}

ダッシュボードの中でグラフを操作するにはいくつかのステップがあります。

<!--
### Choose the Metric to graph

When you create a graph, you will probably have a metric in mind that you want to show. You can select that in the first dropdown in the **Choose metrics and events** section. If you aren't sure exactly which metric to use, you might want to start with the [Metrics Explorer](https://app.datadoghq.com/metric/explorer). You can also look in the [Metrics Summary](https://app.datadoghq.com/metric/summary).

The Metrics Explorer will allow you to play around with different graph settings in a more ad-hoc way. The Metrics Summary will allow to learn more about the type of metric as well as setting the default unit for a metric.
-->

### グラフ表示するメトリクスの選択

グラフを作成するにあたり、グラフ表示したいメトリクスが既に決まっているかもしれません。それならば、さっそくそのメトリクスを**Choose metrics and events** セクションの最初のドロップダウンボックスから選択します。もしそうではなく、どのメトリクスをグラフ表示すべきか分からないのであれば、メトリクスエクスプローラ[Metrics Explorer](https://app.datadoghq.com/metric/explorer)を利用してみると良いでしょう。あるいは、メトリクスサマリ[Metrics Summary](https://app.datadoghq.com/metric/summary)を見ることもできます。

メトリクスエクスプローラはさまざまなグラフ表示の設定をアドホックに簡単に試して見てみることができます。メトリクスサマリページでは、各メトリクスの単位やメトリクスのタイプなどをリストから確認することができます。

<!--
### Select your visualization

Once you have a metric in mind to display in your graph, select your visualization.
-->

### メトリクスを可視化するグラフ形式の選択

グラフ表示するメトリクスが決まったら、次はメトリクスを可視化するグラフ形式を選択します。

<!--
#### Timeseries

The Timeseries visualization is great for showing one or more metrics over time. The time window depends on what is selected on the timeboard or in the graph on a screenboard. Timeseries' can be displayed as lines, areas, and bars. To see an example of a timeseries graph, {{< collapse id="collapseTimeseries" >}}click here{{< /collapse >}}. Timeseries is available on both timeboards and screenboards.

<div class="collapse" id="collapseTimeseries" markdown="1">
  {{< img src="graphing/references-graphing-timeseries-example.png" alt="Timeseries" >}}
</div>
-->

#### Timeseries (時系列データのグラフ)

Timeseriesグラフは1つまたは複数のメトリクスの時間推移を可視化するのに最適です。グラフ表示する時間の幅は、タイムボード上の設定あるいはスクリーンボードでの各グラフの設定によって決まります。Timeseriesグラフの表示はlines(折れ線グラフ), areas(面グラフ), bars(棒グラフ)を選択できます。Timeseriesグラフの例を見るには、{{< collapse id="collapseTimeseries" >}}ここをクリック{{< /collapse >}}. Timeseriesグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseTimeseries" markdown="1">
  {{< img src="graphing/references-graphing-timeseries-example.png" alt="Timeseries" >}}
</div>

<!--
#### Heatmap

The Heatmap visualization is great for showing metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square will be. To see an example of a heatmap, {{< collapse id="collapseHeatmap" >}}click here{{< /collapse >}}. Heatmap is available on both timeboards and screenboards.

<div class="collapse" id="collapseHeatmap" markdown="1">
{{< img src="graphing/references-graphing-heatmap-example.png" alt="Heatmap" >}}
</div>
-->

#### Heatmap (時系列の分布図グラフ)

Heatmapグラフは多くのタグで集計されたメトリクス(例えば,*hosts* )を可視化するのに最適です。 ホストから得られたメトリクスで値が多く分布しているほど、その値の部分は濃い色を示します。Heatmapグラフの例を見るには、{{< collapse id="collapseHeatmap" >}}ここをクリック{{< /collapse >}}. Heatmapグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseHeatmap" markdown="1">
{{< img src="graphing/references-graphing-heatmap-example.png" alt="Heatmap" >}}
</div>

<!--
#### Distribution

The Distribution visualization is another way of showing metrics aggregated across many tags, such as *hosts*. Unlike the Heatmap, Distribution's x-axis is the quantity rather than time. To see an example of a distribution graph, {{< collapse id="collapseDistribution" >}}click here{{< /collapse >}}. Distribution is available on both timeboards and screenboards.

<div class="collapse" id="collapseDistribution" markdown="1">
{{< img src="graphing/references-graphing-distribution-example.png" alt="Distribution" >}}
</div>
-->

#### Distribution (分布図グラフ)

Distributionグラフは多くのタグで集計されたメトリクスを可視化するもう一つの方法です。Heatmapグラフとは異なり、DistributionグラフのX軸は時間ではなくメトリクスの値になり、Y軸はその分布の度数を示します。Distributionグラフの例は、{{< collapse id="collapseDistribution" >}}ここをクリック{{< /collapse >}}. Distributionグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseDistribution" markdown="1">
{{< img src="graphing/references-graphing-distribution-example.png" alt="Distribution" >}}
</div>

<!--
#### Toplist

The Toplist visualization is perfect when you want to see the list of hosts with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc. To see an example of a Toplist,  {{< collapse id="collapseTopList" >}}click here{{< /collapse >}} Toplist is available on both timeboards and screenboards.

<div class="collapse" id="collapseTopList" markdown="1">
 {{< img src="graphing/references-graphing-toplist-example.png" alt="TopList" >}}
</div>
-->

#### Toplist (メトリクスのランキング)

Toplistグラフは、CPU消費の高い順、残ディスク容量の少ない順、などホスト毎のメトリクスの値を大きいものあるいは小さいものから順に並べてリストしたい場合に最適です。Toplistのグラフの例を見るには,  (#collapseTopList){{< collapse id="collapseTopList" >}}ここをクリック{{< /collapse >}}. Toplistグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseTopList" markdown="1">
 {{< img src="graphing/references-graphing-toplist-example.png" alt="TopList" >}}
</div>

<!--
#### Change

The Change graph will show you the change in a value over the time period chosen. To see an example of a Change graph, {{< collapse id="collapseChangegraph" >}}click here{{< /collapse >}}.

<div class="collapse" id="collapseChangegraph" markdown="1">
  {{< img src="graphing/references-graphing-change-example.png" alt="Changegraph" >}}
</div>
-->

#### Change (メトリクスの変化量グラフ)

Changeグラフは指定した時間枠でのメトリクスの変化量を可視化することができます。Changeグラフの例を見るには、{{< collapse id="collapseChangegraph" >}}ここをクリック{{< /collapse >}}.

<div class="collapse" id="collapseChangegraph" markdown="1">
  {{< img src="graphing/references-graphing-change-example.png" alt="Changegraph" >}}
</div>

#### Hostmap
<!--
The Hostmap will graph any metric for any subset of hosts on the same hostmap visualization available from the main Infrastructure Hostmap menu. To see an example of a Hostmap, {{< collapse id="collapseHostmap" >}}click here{{< /collapse >}}.

<div class="collapse" id="collapseHostmap" markdown="1">
 {{< img src="graphing/references-graphing-hostmap-example.png" alt="Hostmap" >}}
</div>
-->
Hostmapはメインメニューから利用できるHostmapと同様に、あらゆるメトリクスについて指定したホストのスコープで可視化することができます。Hostmapの例は、{{< collapse id="collapseHostmap" >}}ここをクリック{{< /collapse >}}.

<div class="collapse" id="collapseHostmap" markdown="1">
 {{< img src="graphing/references-graphing-hostmap-example.png" alt="Hostmap" >}}
</div>

<!--
### 3) Filter and Aggregate to show what you need

#### Filter

Now that you have the metric and a visualization in place, you can filter down the hosts to be graphed. To the right of the metric is a dropdown which by default says *(everywhere)*. Click this and choose the tag(s) you want to filter by. To learn more about tags, refer to the [Guide to Tagging](/guides/tagging/).
-->

### 指定したグラフ表示をフィルタと集計方法の設定で最適化する

#### フィルタ

メトリクスを可視化するグラフ表示の形式が決まったら、今度はフィルタ機能によってグラフ表示させたい特定のホストを抽出します。メトリクスを選択したボックスの右手に、*(everywhere)* とデフォルト表示されているドロップダウンボックスがあるので、そこから抽出したいホストが該当するタグ(複数可)を選択しましょう。なお、タグの詳細に関しては、[Guide to Tagging](/guides/tagging) ページを参照して下さい。

<!--
#### Aggregation Method

Next to the filter dropdown is the aggregation method. This defaults to **avg by** but can be changed to **max by**, **min by**, or **sum by**. In most cases, the metric will have many values for each time interval, coming from many hosts or instances. The aggregation method chosen determines how the metrics will be aggregated into a single line. So if you are graphing a metric that is from 100 hosts, **sum by** will add up all of those values and display the sum.
-->

#### 集計の算出方法

フィルタの次は、集計の算出方法の設定です。デフォルトでは平均値をとる**avg by** が選択されていますが、ボックスをクリックすることで**max by**, **min by**, **sum by** も選択することができます。一定間隔で取得されているメトリクスの値には、複数のホストやインスタンスから集められた多様な値が存在していることが多く、ここで選択する集計方法によってそうした多様な値をどのように1つの値として集計するかを決定します。つまり、例えば100のホストからのメトリクスについてグラフ表示する場合、**sum by** を選択すると100ホストから取得しているメトリクスの合計値がグラフ表示されることになります。

<!--
#### Aggregation Groups

After the aggregation method you can determine what constitutes a line or grouping in a graph. If you choose host, then you will have a line (in the case of line graphs) for each host. If you choose role, then there is a line for every role. Then that line will be made up of metrics from all the hosts in that role, aggregated using the method you chose above.
-->

#### 集計のグループ指定

集計の算出方法を選択したら、今度はグラフの線1本1本の構成要素が何なのかを決めます。`host`を選択した場合は、それぞれのホストに対してグラフ線が表示されます。あるいはタグで定義している何らかのホストの`ロール`を選択した場合は、その各ロールに対してグラフ線が表示されます。`ロール`を選択した場合は複数のホストがロールごとにグループ化されてグラフ表示されるため、先に選択した**集計の算出方法** によってメトリクスの値が集計されグラフ表示されることになります。

<!--
### Rollup to aggregate over time

Regardless of the options chosen above, there will always be some aggregation of data due to the physical size constraints of the window holding the graph. If a metric is updated every second and you are looking at 4 hours of data, you will need 14,400 points to display everything. Each graph we display will have about 300 points shown at any given time.

In the example above, each point displayed on the screen represents 48 data points. In practice, metrics are collected by the agent every 15-20 seconds. So one day's worth of data is 4,320 data points. You might consider a rollup function that looks at 5 or 10 minutes worth of data if you would like to have more control over the display of your data for a graph that shows 1 day.
-->

### メトリクスの値のロールアップ(値を丸める)

前述の集計方法の設定にかかわらず、グラフ表示画面の物理的な制約によって適用されているデータ集計の仕組みがあります。例えば、毎秒更新されるメトリクスについて4時間の時間幅でグラフ表示したい場合、すべてを表示するには14,400のデータポイントを表示する必要があります(60x60x4=14,400)。 一方で、各グラフはどのような時間幅を選んだ場合でも表示可能なのは約300データポイントまでです。

上記例では、画面上の単一のデータポイントは48のデータポイントを代表することになります(14,400÷300=
48)。他の例として、Datadog Agentによって20秒間隔で取得されているメトリクスの場合、1日で4,320のデータポイントが取得されます(24x60x60/20=4,320)。このメトリクスにおいて1日の時間幅でグラフ表示する場合は、5分や10分の間隔で値をロールアップされることも考慮しておくとよいでしょう。

<!--
To use the rollup function, click the plus sign to the right of the aggregation group and choose rollup from the dropdown. Now choose how you want to aggregate the data and the interval in seconds.

To create a single line that represents the total available disk space on average across all machines rolled up in 60 seconds buckets, you would use a query like this:
-->
ロールアップ関数を使う場合は、集計方法を設定したボックスの右手のプラスマークをクリックし、`Rollup`を選択します。そして算出方法でロールアップし、どれくらいの時間間隔でロールアップするかを指定します。

例えば、全てのマシンの利用可能なディスク容量の平均値をとり、そのメトリクスは60秒ごとの平均値としてロールアップしたグラフ表示をさせる場合には、以下のような指定します:

{{< img src="graphing/references-graphing-rollup-example.png" alt="rollup example" >}}

<!--
When switching to the JSON view, the query will look like this:

    "q": "avg:system.disk.free{*}.rollup(avg, 60)"

For more about using the JSON view, scroll to the bottom and click the Learn about the JSON tab link.
-->

JSONエディターに切り替えると、以下のようなクエリとして記述されます:

    "q": "avg:system.disk.free{*}.rollup(avg, 60)"

JSON形式を使用したより詳しい設定に関しては、[JSONを使用したグラフ表示入門][1]を参照して下さい。

<!--
### Apply more advanced functions

Depending on your analysis needs, you may choose to apply other mathematical functions to the query. Examples include rates and derivatives, smoothing, and more. For a list of available functions, {{< collapse id="collapseGraphicFunctionTable" >}}click here{{< /collapse >}}.
-->

### より高度な演算関数の適用

分析のニーズによっては、他の数値演算関数が必要なこともあるでしょう。変化量や微分、平滑化や回帰計算などがあります。利用可能な関数は、<a href="#collapseGraphicFunctionTable" role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseGraphicFunctionTable">ここをクリック</a>..

<div class="collapse" id="collapseGraphicFunctionTable" markdown="1">
<!-- The graphing functions section is a partial -->

{{< include-markdown "layouts/partials/graphingfunctions.md" >}}

</div>

<!--
### Perform metric arithemtic

The Datadog UI supports the ability to graph your metrics with various arithmetic options. You can utilize any of: +, -, /, * to modify the values that are displayed on your graphs. This syntax allows for both integer values as well as arithmetic using multiple metrics.
-->

### メトリクスの値に対して演算を行う

DatadogのUIでは、さまざまな演算オプションを利用してメトリクスをグラフ化する機能をサポートしています。 +, -, /, * のいずれかを利用して、グラフに表示される値を変更することができます。この構文では、複数のメトリクスの演算だけでなく整数値を用いた演算も利用できます。

<!--
#### Metric Arithmetic Using an Integer

You can modify how a metric value is displayed on a graph by performing an arithmetic operation on the metric.
For example, if you would like to visualize the double of a specific metric, say `system.load.5`:

{{< img src="graphing/arithmetic_1.png" alt="Arithmetic 1" >}}

This can be done inside a graph editor by clicking on the Graph Editor and selecting "advanced...". From there you can enter your arithmetic in the `Graph these queries as` box. In this case: a * 2.

{{< img src="graphing/arithmetic_2.png" alt="Arithmetic 2" >}}
-->

#### メトリクスの値に整数演算を行う

メトリクスに対して算術演算を行うことによって、メトリクスの値のグラフへの表示方法を変更することができます。例えば、あるメトリクス値を倍精度で可視化したい場合を考えます。`system.load.5`を例にとると、:

{{< img src="graphing/arithmetic_1.png" alt="Arithmetic 1" >}}

グラフエディターをクリックし、そこで "advanced..." を選択すると、グラフエディター内で設定することができます。ここで、`Graph these queries as` ボックスに算術演算を入力します。この例では、倍精度で可視化したいため、a * 2 と入力します。

{{< img src="graphing/arithmetic_2.png" alt="Arithmetic 2" >}}

<!--
#### Arithmetic between two Metrics

If you would like to visualize the percentage of `jvm.heap_memory` used, you can perform the following arithmetic across two metrics already being reported to your Datadog application:

`jvm.heap_memory / jvm.heap_memory_max`

This can be done in the same manner as above, utilizing the "advanced..." option in the Graph Editor. From there, you can select `add a metric to this expression`.

Once you have added all of the metrics you would like to visualize, you will notice they are each assigned a letter: the first metric is represented by a, the second metric is represented b, and so on.
Then in the `Graph these queries as` box, you can enter the arithmetic you would like, in this case: `( a / b )`

{{< img src="graphing/arithmetic_3.png" alt="Arithmetic 3" >}}

<div class="alert alert-warning">
If you are performing arithmetic on two or more metrics and see a blank graph,
<a href="https://help.datadoghq.com/hc/en-us/articles/212009846-Why-does-graphing-a-grouped-arithmetical-metric-query-sometimes-yield-a-blank-graph">this help article discusses possible reasons</a>
</div>
-->

#### メトリクスの値同士の演算を行う

また、`jvm.heap_memory`の使用状況をパーセンテージで表示したいような場合は、すでにDatadogにデータ収集されている2つのメトリクスに対して以下のような演算を行うことができます:

`jvm.heap_memory / jvm.heap_memory_max`

この演算は先の例と同様に、 "advanced..." を選択してグラフエディター内で設定することができます。ここでは、メトリクスの値同士の演算を行うため、`Add a metric to this expression`を選択します。

可視化したいすべてのメトリクスを追加すると、それぞれに文字が割り当てられていることがわかります。最初のメトリクスは a 、2番目のメトリクスは b というようにです。
ここで、`Graph these queries as`ボックスに実施したい演算を入力します。この例では、`( a / b )`と入力します。

{{< img src="graphing/arithmetic_3.png" alt="Arithmetic 3" >}}

<div class="alert alert-warning">
2つ以上のメトリクスの値の演算を行った際にグラフが表示されない場合は、
<a href="https://help.datadoghq.com/hc/en-us/articles/212009846-Why-does-graphing-a-grouped-arithmetical-metric-query-sometimes-yield-a-blank-graph">このhelpドキュメント(英語)で説明が見つかるかもしれません。</a>
</div>

<!--
### Set Y-axis scale

By default, the Y-axis for your graph is set to linear with the minimum and maximum automatically set based on the values in the data and including zero. To make changes to the Y-axis, click the button **Show Y-Axis Controls**. Now you can change the scale from linear to log, pow, or sqrt. Next you can choose the minimum or maximum, and select whether zero should always be shown or not.
-->

### Y軸のスケールと値の幅を設定する

デフォルト設定では、Y軸は線形で設定され、グラフ化されるメトリクスの値にもとづき0を含むかたちで自動的に最大値と最小値が設定されます。Y軸の設定を変更したい場合は**Show Y-Axis Controls**ボタンをクリックします。これにより、Y軸のスケールをliner(線形)からlog(対数)、pow(指数)または sqrt(平方根)に変更できます。そしてY軸の最大値と最小値をそれぞれ指定し、常にゼロを含むかどうかを選択できます。

<!--
### Overlay events for additional context

You can repeat all the steps above to add additional metrics to your graph to add context. You can also add events from related system to add even more context. So an example would be to add github commits, Jenkins deploys, or Docker creation events. Just click the Overlay Events button and enter a query to find and display your events. To show anything from a source such as Github, use ```sources:github```. For all the events with the tag role:web, use ```tag:role:web```.
-->

### メトリクスのグラフ表示にイベントを重ねあわせる

より意味のあるグラフ表示のために、ここまでのステップを繰り返して他のメトリクスをグラフ表示に追加することができます。あるいはグラフ表示が意味する文脈をより豊かにするために、関連するシステムで生じたイベントについても表示を追加できます。たとえば、githubのコミット、Jenkinsのデプロイ、あるいはDockerのcreationイベントなどです。これには、 **Add Events** ボタンをクリックし、イベントをクエリする文字列を入力するだけです。例えば、Githubのすべてのイベントを重ねあわせるなら```sources:github```と入力します。タグ role:web を持つイベントについて重ねあわせるなら ```tag:role:web```と入力します。

<!--
### Create a title

If you don't enter a title, we will automatically generate a title based on the selections you have made. But it may be more useful to the users of the dashboard to create a title that more aptly describes the purpose of the graph. Linking the technical purpose to the business benefits adds even more value.
-->

### タイトルの入力

タイトルを指定しない場合、メトリクスやグラフ表示での指定をもとに自動でタイトルが入力されます。しかしより適切に表現されたタイトルは、ダッシュボード上に多数あるグラフの中で目的をユーザーに示すのに役立ちます。ここでビジネスに役立つ意味を表現するのも価値のあることです。

<!--
### Save

The final step is to click Save. You can always come back in to the editor and tweak the graph further depending on your needs.
-->

### 保存

最後に Done をクリックし設定を保存します。保存後も、必要に応じていつでもグラフエディターから各設定を操作することができます。

[1]: /ja/graphingjson
