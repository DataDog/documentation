---
title: Visualisation
kind: documentation
autotocdepth: 2
hideguides: true
language: ja
customnav: graphingnav
---

<!--
#### Timeseries

The Timeseries visualization is great for showing one or more metrics over time. The time window depends on what is selected on the timeboard or in the graph on a screenboard. Timeseries' can be displayed as lines, areas, and bars. To see an example of a timeseries graph, {{< collapse id="collapseTimeseries" >}}click here{{< /collapse >}}. Timeseries is available on both timeboards and screenboards.

<div class="collapse" id="collapseTimeseries" markdown="1">
  {{< img src="graphing/index/references-graphing-timeseries-example.png" alt="Timeseries" responsive="true" >}}
</div>
-->

#### Timeseries (時系列データのグラフ)

Timeseriesグラフは1つまたは複数のメトリクスの時間推移を可視化するのに最適です。グラフ表示する時間の幅は、タイムボード上の設定あるいはスクリーンボードでの各グラフの設定によって決まります。Timeseriesグラフの表示はlines(折れ線グラフ), areas(面グラフ), bars(棒グラフ)を選択できます。Timeseriesグラフの例を見るには、{{< collapse id="collapseTimeseries" >}}ここをクリック{{< /collapse >}}. Timeseriesグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseTimeseries" markdown="1">
  {{< img src="graphing/index/miscellaneous/visualisation/references-graphing-timeseries-example.png" alt="Timeseries" responsive="true" >}}
</div>

<!--
#### Heatmap

The Heatmap visualization is great for showing metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square will be. To see an example of a heatmap, {{< collapse id="collapseHeatmap" >}}click here{{< /collapse >}}. Heatmap is available on both timeboards and screenboards.

<div class="collapse" id="collapseHeatmap" markdown="1">
{{< img src="graphing/index/references-graphing-heatmap-example.png" alt="Heatmap" responsive="true" >}}
</div>
-->

#### Heatmap (時系列の分布図グラフ)

Heatmapグラフは多くのタグで集計されたメトリクス(例えば,*hosts* )を可視化するのに最適です。 ホストから得られたメトリクスで値が多く分布しているほど、その値の部分は濃い色を示します。Heatmapグラフの例を見るには、{{< collapse id="collapseHeatmap" >}}ここをクリック{{< /collapse >}}. Heatmapグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseHeatmap" markdown="1">
{{< img src="graphing/index/miscellaneous/visualisation/references-graphing-heatmap-example.png" alt="Heatmap" responsive="true" >}}
</div>

<!--
#### Distribution

The Distribution visualization is another way of showing metrics aggregated across many tags, such as *hosts*. Unlike the Heatmap, Distribution's x-axis is the quantity rather than time. To see an example of a distribution graph, {{< collapse id="collapseDistribution" >}}click here{{< /collapse >}}. Distribution is available on both timeboards and screenboards.

<div class="collapse" id="collapseDistribution" markdown="1">
{{< img src="graphing/index/references-graphing-distribution-example.png" alt="Distribution" responsive="true" >}}
</div>
-->

#### Distribution (分布図グラフ)

Distributionグラフは多くのタグで集計されたメトリクスを可視化するもう一つの方法です。Heatmapグラフとは異なり、DistributionグラフのX軸は時間ではなくメトリクスの値になり、Y軸はその分布の度数を示します。Distributionグラフの例は、{{< collapse id="collapseDistribution" >}}ここをクリック{{< /collapse >}}. Distributionグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseDistribution" markdown="1">

{{< img src="graphing/index/miscellaneous/visualisation/references-graphing-distribution-example.png" alt="Distribution" responsive="true" >}}

</div>

<!--
#### Toplist

The Toplist visualization is perfect when you want to see the list of hosts with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc. To see an example of a Toplist,  {{< collapse id="collapseTopList" >}}click here{{< /collapse >}} Toplist is available on both timeboards and screenboards.

<div class="collapse" id="collapseTopList" markdown="1">
 {{< img src="graphing/index/references-graphing-toplist-example.png" alt="TopList" responsive="true" >}}
</div>
-->

#### Toplist (メトリクスのランキング)

Toplistグラフは、CPU消費の高い順、残ディスク容量の少ない順、などホスト毎のメトリクスの値を大きいものあるいは小さいものから順に並べてリストしたい場合に最適です。Toplistのグラフの例を見るには,  (#collapseTopList){{< collapse id="collapseTopList" >}}ここをクリック{{< /collapse >}}. Toplistグラフはタイムボードとスクリーンボードの両方で利用することができます。

<div class="collapse" id="collapseTopList" markdown="1">

 {{< img src="graphing/index/miscellaneous/visualisation/references-graphing-toplist-example.png" alt="TopList" responsive="true" >}}
</div>

<!--
#### Change

The Change graph will show you the change in a value over the time period chosen. To see an example of a Change graph, {{< collapse id="collapseChangegraph" >}}click here{{< /collapse >}}.

<div class="collapse" id="collapseChangegraph" markdown="1">
  {{< img src="graphing/index/references-graphing-change-example.png" alt="Changegraph" responsive="true" >}}
</div>
-->

#### Change (メトリクスの変化量グラフ)

Changeグラフは指定した時間枠でのメトリクスの変化量を可視化することができます。Changeグラフの例を見るには、{{< collapse id="collapseChangegraph" >}}ここをクリック{{< /collapse >}}.

<div class="collapse" id="collapseChangegraph" markdown="1">

  {{< img src="graphing/index/miscellaneous/visualisation/references-graphing-change-example.png" alt="Changegraph" responsive="true" >}}
</div>

#### Hostmap
<!--
The Hostmap will graph any metric for any subset of hosts on the same hostmap visualization available from the main Infrastructure Hostmap menu. To see an example of a Hostmap, {{< collapse id="collapseHostmap" >}}click here{{< /collapse >}}.

<div class="collapse" id="collapseHostmap" markdown="1">
 {{< img src="graphing/index/references-graphing-hostmap-example.png" alt="Hostmap" responsive="true" >}}
</div>
-->
Hostmapはメインメニューから利用できるHostmapと同様に、あらゆるメトリクスについて指定したホストのスコープで可視化することができます。Hostmapの例は、{{< collapse id="collapseHostmap" >}}ここをクリック{{< /collapse >}}.

<div class="collapse" id="collapseHostmap" markdown="1">

 {{< img src="graphing/index/miscellaneous/visualisation/references-graphing-hostmap-example.png" alt="Hostmap" responsive="true" >}}

</div>