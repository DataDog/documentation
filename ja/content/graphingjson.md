---
last_modified: 2017/08/24
translation_status: completed
language: ja
title: JSONを使用したグラフ表示入門
kind: documentation
---
<!--
There are two ways to interact with the Graphing Editor: using the GUI (the default method) and writing JSON (the more complete method). This page covers using JSON. To learn more about the GUI editor, visit the main [Graphing Primer Page](/graphing)
## Graphing with the JSON editor

-->

グラフエディターの設定には、GUI(デフォルトの手法)とJSONの記述(より完全な手法)の2種類があります。このページではJSON形式を使用した手法について解説します。GUIでの設定については、[グラフ表示入門](/ja/graphing)を参照して下さい。

## JSONエディターを使用したグラフ表示

{{< img src="graphing/references-graphing-jsoneditor.png" >}}

<!--### Grammar-->

### JSON書式の構文

<!--
The graph definition language is well-formed JSON and is structured in four parts:

1. Requests
2. Events
3. Visualization
4. Y Axis

Here is how they fit together in a JSON dictionary:
-->

グラフを定義する言語は、JSON形式を採用し、次の4つの要素で構成されています:

1. Requests (メトリクスの時系列データ(Series)のクエリ)
2. Events (イベントのクエリ)
3. Visualization (timeseries;時系列データの折れ線グラフやheatmap;ヒートマップなどグラフ形式の指定)
4. Y Axis (Y軸の範囲やフィルタ、線形や対数などスケールの指定)

以下はこれらの要素が、1つのJSON書式で表現された例です:

{{< highlight json >}}
{
  "requests": [
    {
      "q": "metric{scope}"
    }
  ],
  "events": [
    {
      "q": "search query"
    }
  ],
  "viz": "visualization type",
  "yaxis": {
    "yaxisoptionkey": "yaxisoptionvalue"
  }
}
{{< /highlight >}}

<!--
In other words at the highest level the JSON structure is a dictionary with two, three, or four entries:

1. "requests" *
2. "events"
3. "viz" *
4. "yaxis"

*only requests and viz are required.*
-->

JSON書式の一番外側のカッコ内に、先の要素が下記のエントリーとして記述されています:

1. "requests" *
2. "events"
3. "viz" *
4. "yaxis"

*"requests"と"viz"は必ず指定する必要があります。*

<!--## Requests-->

## Requests (メトリクスの時系列データ, Series)

<!--
The general format for a series is:

    "requests": [
        {
          "q": "function(aggregation method:metric{scope} [by {group}])"
        }
    ]

The `function` and `group` are optional.

A Series can be further combined together via binary operators (+, -, /, *):

    metric{scope} [by {group}] operator metric{scope} [by {group}]
-->

時系列データのクエリは、次のフォーマットになります:

    "requests": [
        {
          "q": "function(aggregation method:metric{scope} [by {group}])"
        }
    ]

`function`と`group`の部分は、省略することができます。

時系列データは、バイナリー演算子(+, -, /, *)を使うことで、組み合わせて表示することができるようになります:

    metric{scope} [by {group}] operator metric{scope} [by {group}]

<!--#### Functions-->

#### 関数

<!--
You can apply functions to the result of each query.

A few of these functions have been further explained in a series of examples. Visit this page for more detail: <a href="https://docs.datadoghq.com/examples/graphing-functions/">Examples</a>
-->
それぞれのクエリの結果に対して関数を適用することができます。

これらの関数のうち、いくつかについては具体的な設定例を用いた解説があります。こちらも併せて参照して下さい: <a href="https://docs.datadoghq.com/examples/graphing-functions/">Examples for Graphing Functions</a>
本ドキュメントの最後にもいくつかの具体的な["設定例"](#examples)があります。

{{< include-markdown "layouts/partials/graphingfunctions.md" >}}

<!--
There are also a few functions you can append to a query which we recommend for expert users only.
<p>
One of these is <code>.rollup()</code>. Appending this function allows you to control the
number of points rolled up into a single point. This function takes two parameters, method and time, like so:
<code>.rollup(method,time)</code>.

The method can be sum/min/max/count/avg and time is in seconds. You can use either one individually,
or both combined like <code>.rollup(sum,120)</code>. There are some checks on this,
though, because for a given time range we do not return more than 350 points. Thus if
you're requesting <code>.rollup(20)</code> where 20 is in seconds, and ask for a
month of data, we will be returning the points at a rollup of far greater than 20 seconds.
</p>

<code>.as_count()</code> and <code>.as_rate()</code> are two other expert-only functions,
which are only intended for metrics submitted in a certain way (for metadata types where
that is acceptable).  At present, for metrics submitted as rates or counters via statsd,
appending <code>.as_count()</code> or <code>.as_rate()</code> will function correctly.
For other metrics, including gauges submitted by statsd, <code>.as_count()</code> and
<code>.as_rate()</code> will have no effect.

For more on <code>.as_count()</code> please see our blog post
<a target="_blank" href="https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/">here</a>.
-->

この他にも、クエリ結果に適用する上級者向けの関数が幾つかあります。

上級者向けの関数の一つが``.rollup()``です。この関数をクエリに追記することで、複数のポイントを単一ポイントにまとめることができます。この関数は、"メソッド"と"時間"の2つのパラメータを引数に指定することができます。(例: ``.rollup(method,time)``)

"メソッド"の部分には、sum/min/max/count/avgを指定することができます。"時間"は、秒単位で指定します。
"メソッド"と"時間"は、個別に指定(例: ``.rollup(20)``)したり、両方を組み合わせて(例: ``.rollup(sum,120)``)も指定できます。
この``.rollup()``には、チェック機構があります。
しかしDatadogのグラフでは表示する時間の範囲に基づき350のデータポイントまでしか保有していないので、期間指定を一ヶ月にした場合は、20秒間隔以上の精度でデータポイントが保有されているため、20秒でのロールアップ``.rollup(20)``は、機能しません。

特定の方法で提出されたメトリクスためのもう一つの上級者向け関数が、``.as_count（）``と``.as_rate（）`` です。
現状、DogStatsDの"rate", "counter"を使って送信したメトリクスには、``.as_count（）``と``.as_rate（）``を使うことができますが、"gauges"などのそれ以外のメトリクスでは機能しません。

``as_count()``に関する詳しい情報は、["Visualize StatsD metrics with Counts Graphing"](https://www.datadoghq.com/blog/visualize-statsd-metrics-counts-graphing/)のブログを参照してください。

<!-- #### Aggregation Method -->

#### データポイントの集計

<!--
In most cases, the number of data points available outnumbers the maximum number that can be shown on screen. To overcome this, the data is aggregated using one of 4 available methods: average,  max, min, and sum.
-->
多くの場合、利用可能なデータポイントの数は画面に表示可能なデータポイントの数を上回ります。これに対応するため、データポイントは4つの集計方法{average,  max, min, sum}の1つにより集計されています。

<!-- #### Metrics -->

#### メトリクスの確認

<!--
The metric is the main focus of the graph. You can find the list of metrics available to you in the [Metrics Summary](https://app.datadoghq.com/metric/summary). Click on any metric to see more detail about that metric, including the type of data collected, units, tags, hosts, and more.
-->
メトリクスはグラフ表示の要です。現在利用可能なメトリクスは [Metrics Summary](https://app.datadoghq.com/metric/summary) にてリスト表示することができます。各メトリクスをクリックしてそのメトリクスがどのようなデータを取得しているか、あるいはタグやホストなどの関連する詳しい情報を確認します。

<!-- #### Scope -->

#### 対象範囲の指定(Scope, スコープ)

<!--
A scope lets you filter a Series. It can be a host, a device on a host
or any arbitrary tag you can think of that contains only alphanumeric
characters plus colons and underscores (`[a-zA-Z0-9:_]+`).

Examples of scope (meaning in parentheses):

    host:my_host                      (related to a given host)
    host:my_host, device:my_device    (related to a given device on a given host)
    source:my_source                  (related to a given source)
    my_tag                            (related to a tagged group of hosts)
    my:tag                            (same)
    *                                 (wildcard for everything)
-->

スコープを指定することで時系列データの対象範囲を限定することができます。スコープでは、ホスト名やホスト上のデバイス、更に英数文字列 (`[a-zA-Z1-9:_]+`)のタグが付与された情報を指定することができます。

範囲指定の例 (カッコ内は、対象範囲の解説):

    host:my_host                      (指定されたホスト名に関連した情報)
    host:my_host, device:my_device    (指定されたホスト名の指定されたデバイスに関連した情報)
    source:my_source                  (指定された情報ソースに関連した情報)
    my_tag                            (my_tagで指定されたグループに関連する情報)
    my:tag                            (同上)
    *                                 (ワイルドカード)

<!-- #### Groups -->

#### グループの指定

<!--
For any given metric, data may come from a number of hosts. The data will normally be aggregated from all these hosts to a single value for each time slot. If you wish to split this out, you can by any tag. To include a data point seperated out by each host,  use {host} for your group.
-->
どのメトリクスにおいても、複数のホストからのデータによって構成され得ています。そうしたデータは通常、時間間隔ごとにすべてのホストからのデータが単一の値に集計されますが、あらゆるタグによってデータを分離して取得することができます。あるメトリクスに対してホストごとにデータポイントを分けて見たい場合、{host}グループの指定を行います。

<!-- #### Arithmetic -->

#### 演算子の利用

<!--
You can apply simple arithmetic to a Series (+, -, * and /). In this
example we graph 5-minute load and its double:
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "system.load.5{intake} * 2"
    },
    {
      "q": "system.load.5{intake}"
    }
  ]
}
{{< /highlight >}}

You can also add, substract, multiply and divide a Series. Beware that
Datadog does not enforce consistency at this point so you *can* divide
apples by oranges.
{{< highlight json >}}
{
    "viz": "timeseries",
    "requests": [
      {
        "q": "metric{apples} / metric{oranges}"
      }
    ]
}
{{< /highlight >}}
-->

時系列データには、簡単な演算( +, -, *, / )を適用することができます。
次の例では、5分間のload averageの値とその倍の数値をグラフ表示することにします:
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "system.load.5{intake} * 2"
    },
    {
      "q": "system.load.5{intake}"
    }
  ]
}
{{< /highlight >}}

時系列データ同士を、加算 減算 乗算 除算することもできます。
Datadogでは、ここでは一貫性を強制していないので、*異なるものの除算をすることもできます*。
{{< highlight json >}}
{
    "viz": "timeseries",
    "requests": [
      {
        "q": "metric{apples} / metric{oranges}"
      }
    ]
}
{{< /highlight >}}

<!-- ### Events -->

### イベントの表示

<!--
You can overlay any event from Datadog. The general format is:

    "events": [
      {
        "q": "search query"
      }
    ]

For instance, to indicate that you want events for host X and tag Y:

    "events": [
      {
        "q": "host:X tags:Y"
      }
    ]

or if you're looking to display all errors:

    "events": [
      {
        "q": "status:error"
      }
    ]
-->

Datadogに保存したイベント情報は、次の書式で記述することでグラフにオーバーレイすることができます:

    "events": [
      {
        "q": "search query"
      }
    ]

例えば、ホスト"X"のタグ"Y"が付いたイベントをオーバーレイする場合は:

    "events": [
      {
        "q": "host:X tags:Y"
      }
    ]

エラーにステータスをオーバーレイする場合は:

    "events": [
      {
        "q": "status:error"
      }
    ]

### グラフによる可視化

<!--
Data can be visualized in a few different ways:

1. Time Series
2. Heatmap
3. Distribution
4. Toplist
5. Change
6. Hostmap

The Time Series can be further broken down to:

1. as line charts
2. as stacked areas
3. as slice-n-stack areas
4. as bar charts
-->

データポイントを可視化するグラフ形式にはいくつかの種類があります:

1. Time Series (時系列データのグラフ)
2. Heatmap (ヒートマップ, 指定したスコープ内でのメトリクスの時系列分布)
3. Distribution (分布図, 指定したスコープ内での特定の時間枠のメトリクスの分布)
4. Toplist (トップリスト, 指定したスコープ内でのメトリクスのランキング)
5. Change (チェンジグラフ, 一定時間前とのメトリクスの変化量を示すグラフ)
6. Hostmap (ホストマップ)

さらに、Time Series (時系列データのグラフ)では下記のグラフ形式が選択できます:

1. 折れ線グラフ
2. 積み上げグラフ
3. slice-n-stackグラフ
4. 棒グラフ

<!-- #### Line Charts -->

#### 折れ線グラフ

{{< img src="graphingjson/multi-lines.png" >}}

<!-- The representation is automatically derived from having multiple `requests` values. -->
このグラフ表現は、`requests`部に複数の検索クエリを有する場合に自動的に設定されます。

    "requests": [
        {
          "q": "metric1{scope}"
        },
        {
          "q": "metric2{scope}"
        },
        {
          "q": "metric3{scope}"
        }
      ]

これにより、複数の時系列データのグラフを重ね合わせて表示することができます。

<!-- #### Stacked Series -->

#### 積み上げグラフ

{{< img src="graphingjson/slice-n-stack.png" >}}

<!-- In the case of related Time Series, you can easily draw them as stacked areas by using the following syntax: -->
関連している時系列データの場合は、次の構文を記述し積み上げグラフを表示することができます:

    "requests": [
        {
          "q": "metric1{scope}, metric2{scope}, metric3{scope}"
        }
    ]

<!-- Instead of one query per chart you can aggregate all queries into one and simply concatenate the queries. -->
チャート毎に1つのクエリを表示する代わりに","ですべてのクエリを連結することによって、全てのクエリを1つのグラフに積み上げて表示することができます。

#### Slice-n-Stack

<!--
A useful visualization is to represent a metric shared across
hosts and stack the results. For instance, when selecting a tag that
applies to more than 1 host you will see that ingress and egress
traffic is nicely stacked to give you the sum as well as the split per
host. This is useful to spot wild swings in the distribution of network
traffic.

Here's how to do it for any metric:
-->
異なるホストにまたがるメトリクスを積み上げた結果のグラフが有益な場合もあります。例えば、複数のホストに共通して付されているタグを選択し、それらのホストのネットワークトラフィックの出入りをホスト毎に積み上げたグラフを見てみたいとします。このようなグラフは、ネットワークトラフィックの中で異常が発生していることを発見するのに便利です。

この例は、次のように記述します:

    "requests" [
      {
         "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
      }
    ]

<!--
Note that in this case you can only have 1 query. But you can also split by device, or a combination of both:
-->
このケースでは、クエリは1つしか発行できないことに注目してください。
しかしながら、デバイス単位やホストとデバイスの組み合わせを基準としてスライスすることもできます:

    "requests" [
      {
         "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
      }
    ]

<!--to get traffic for all the tagged hosts, split by host and network device.-->
全てのタグ付けされたホストから、ホストとネットワークデバイスでスライスし、積み上げたグラフを表示します。

<!-- ### Y-Axis Controls -->

### Y軸の操作

<!--
The Datadog y-axis controls (currently just via the JSON editor) allow you to:
<ul>
 <li>Clip y-axis to specific ranges</li>
 <li>Filter series either by specifying a percentage or an absolute value</li>
 <li>Change y-axis scale from linear to log, sqrt or power scale</li>
</ul>

There are three configuration settings:
<ul>
<li><code>min</code> (optional): Specifies minimum value to show on y-axis. It takes a number, or "auto" for
    default behvior. Default value is "auto"</li>
<li><code>max</code> (optional): Specifies the maximum value to show on y-axis. It takes a number, or "auto"
    for default behavior. Default value is "auto"</li>
<li><code>scale</code> (optional): Specifies the scale type. Possible values: "linear", "log", "sqrt", "pow##"
    (eg. pow2, pow0.5, 2 is used if only "pow" was provided"), Default scale is "linear".</li>
</ul>
-->

グラフエディターからJSONを編集することで次のようなY軸の制御ができます:
<ul>
 <li>Y軸の表示範囲の指定</li>
 <li>パーセンテージか絶対値のいずれかを指定することより時系列データをフィルタ</li>
 <li>Y軸の目盛りを線形スケールから対数スケールや指数スケールへ変更</li>
</ul>

Y軸を設定するために次の3のオプションがあります:

- <code>min</code> (オプション): Y軸に表示する最小値を指定します。 ここでは、数値か"auto"を指定することができます。デフォルト値は、"auto"です。
- <code>max</code> (オプション): Y軸に表示する最大値を指定します。 ここでは、数値か"auto"を指定することができます。デフォルト値は、"auto"です。
- <code>scale</code> (オプション): Y軸の目盛りのタイプを指定します。 指定できる値は、"linear", "log", "sqrt", "pow##"(例. pow2, pow0.5)です。デフォルト値は、"linear"です。

Examples:

    "yaxis": {
        "min": "auto",
        "max": 200,
        "scale": "log"
    }

    "yaxis": {
        "min": 200,
        "scale": "sqrt"
    }

    "yaxis": {
        "min": 9000,
        "max": 10000
    }

    "yaxis": {
        "scale": "pow0.1"
    }

    "yaxis": {
        "scale": "pow3"
    }

    "yaxis": {
        "units": "true"
    }

<!-- #### Filtering -->

#### Y軸のフィルタリング

<!--
Filter configuration allows you to automatically change y-axis bounds based on a
threshold. Thresholds can be a percentage or an absolute value, and it can apply to
both both ends of the graph (lower and upper).

For y-axis filtering, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage and all
values above the value or all values that sit within the top ##% will be cutoff.
-->

Y軸にフィルタリングの閾値を定義することにより、Y軸の上下限を自動的に変更することができます。
閾値には、パーセンテージまたは絶対値を指定することができます。
この閾値は、グラフの上限と下限の両方に設定することができます。

Y軸のフィルタリングの定義には、2つの設定方法があります。

1つは、絶対値を指定しその値を超えているメトリクスの値をフィルタして除去する方法です。もう一方は、パーセンテージを指定し、トップから指定したパーセンテージまでの値をフィルタして除去する方法です。

Examples:

    "yaxis": {
        "filter": 30 // 値が30以上のデータポイントは除去され、表示されません
    }

    "yaxis": {
        "filter": "5%" // 上位5%の値をもったデータポイントは除去され、表示されません
    }

<!--
Advanced configuration works the same way as simple configuration, with the added
flexibility of configuring the lower or the upper or both parts of the graph. For
example, the following configuration will limit the graph to data points that are
not in the bottom 10% nor in the top 30%.
-->

高度な設定も、シンプルな設定ど同じような概念で進めることができます。
高度な設定では、グラフの下限,上限,その両方の設定がより柔軟にコントロールできるようになっています。
例えば、次のグラフ設定では、下限10%以上で、上限30%以下のデータポイントのみグラフ表示されるようにフィルタしています。

    "yaxis": {
        "filter": {
            "top": "30%",
            "bottom": "10%"
        }
    }

<!-- The following will show all data except those with values higher than 15: -->
次は、値が15以上のデータポイント除去します:

    "yaxis": {
        "filter": {
            "above": 15
        }
    }

<!-- The following will hide data points below 2: -->
次は、値が2以下のデータポイント除去します:

    "yaxis": {
        "filter": {
            "below": 2
        }
    }

<!-- Here is a full JSON example: -->
すべての要素を含んだJSON表記の例です:
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "system.cpu.idle{host:hostname}",
      "stacked": false
    }
  ],
  "events": [],
  "yaxis": {
    "scale": "log"
    "filter": {
         "top": "5%",
         "below": 15
     }
  },
}
{{< /highlight >}}

<!-- #### Examples -->

#### 設定例

<!--
Here is an example using the <code>rate()</code> function, which takes only a single metric as a parameter.  Other functions, with the exception of <code>top()</code> and <code>top_offset()</code>, have identical syntax.
-->
パラメーターに１つのメトリクスを指定した<code>rate()</code>関数を使った例です。<code>top()</code>と<code>top_offset()</code>以外の関数では、この<code>rate()</code>と同様のシンタックス表記を利用することできます。
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "rate(sum:system.load.5{role:intake-backend2} by {host})",
      "stacked": false
    }
  ]
}
{{< /highlight >}}

<!-- Here is an example using the <code>top()</code> function: -->
<code>top()</code> 関数を使用した例:
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc')",
      "stacked": false
    }
  ]
}
{{< /highlight >}}

<!--
This will show the graphs for the five series with the highest peak <code>system.cpu.iowait</code> values in the query window.

To look at the hosts with the 6th through 10th highest values (for example), use <code>top_offset</code> instead:
-->

この例では、<code>system.cpu.iowait</code>のピーク値の上位5位をグラフに表示します。

<code>system.cpu.iowait</code>のピーク値ランキングの第6位から10位のホストを表示するためには、<code>top_offset</code>を使います:
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top_offset(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc', 5)",
      "stacked": false
    }
  ]
}
{{< /highlight >}}

<!-- Here is an example using the <code>week_before()</code> function: -->
<code>week_before()</code>関数を使用した例:
{{< highlight json >}}
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "sum:haproxy.count_per_status{status:available} - week_before(sum:haproxy.count_per_status{status:available})"
    }
  ]
}
{{< /highlight >}}
