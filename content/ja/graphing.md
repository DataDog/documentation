---
last_modified: 2015/03/31
translation_status: complete
language: ja
title: グラフ表示入門
kind:
sidebar:
  nav:
    - header: グラフ表示のガイド
    - text: グラフエディターの表示方法
      href: "#editor"
    - text: グラフ設定用JSONの書き方
      href: "#grammar"
    - text: 演算子と関数
      href: "#functions"
    - text: "Y軸の操作"
      href: "#yaxis"
---

<!-- <h2 id="editor">Find the Graph Editor</h2>

On each graph you will find a cog icon that opens the graph editor.

<img src="/static/images/series-overlay-annotated.png" style="width:100%; border:1px solid #777777"/>

The graph editor has 2 tabs, "Edit" and "JSON". The "JSON" tab is the most flexible and powerful.
It lets you finely control what is displayed on the graph.

<img src="/static/images/json-editor.png" style="width:100%; border:1px solid #777777"/> -->

## グラフエディターの表示方法 {#editor}

グラフを開くと右上隅に歯車があります。この歯車をクリックするとグラフエディターがポップアップします。


<img src="/static/images/series-overlay-annotated.png" style="width:100%; border:1px solid #777777"/>

ポップアップしたグラフエディターの"Select your visualization"セクションで、表示したいグラフの種類を選択した後、"Choose metrics and events"セクションで、``Edit``タブを選択します。編集の準備ができると、``Edit``タブがグレーに変わり"JSON"の編集が
可能になるます。

<img src="/static/images/ja-specific/graph_editor_all_ja.png" style="width:100%; border:1px solid #777777"/>

このJSONを編集することにより、グラフ内の表示を細かく制御することができます。

<img src="/static/images/json-editor.png" style="width:100%; border:1px solid #777777"/>


<!-- <h2 id="grammar">Grammar</h2>

The graph definition language is well-formed JSON and is structured in 2 parts:

1. Events
2. Time Series, a.k.a. Series

Here is how they fit together in a JSON dictionary:

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
      ]
    }

In other words at the highest level the JSON structure is a dictionary with 2 entries:

1. "events"
2. "requests" -->

## グラフ設定用JSONの書き方 {#grammar}

グラフを定義する言語は、JSON形式を採用し、次の2つの要素で構成されています:

1. イベント
2. 時系列データー(Series)

これら2つの要素が、1つのJSON辞書で表現された例です:

    {
      "events": [
        {
          "q": "search query"
        }
      ],
      "requests": [
        {
          "q": "metric{scope}"
        }
      ]
    }

JSON書式の一番外側のカッコ内に、先の2つの要素が"events"と"requests"というエントリーとして記述されています:

1. "events"
2. "requests"

<!--
### Events

You can overlay any event from Datadog. The general format is:

    "events": "search query"

For instance, to indicate that you want events for host X and tag Y:

    "events": "host:X tags:Y"

or if you're looking to display all errors:

    "events": "status:error" -->


### イベントの表示

Datadogに保存したイベント情報は、次の書式で記述することでグラフにオーバーレイすることができます:

    "events": "search query"

例えば、ホスト"X"のタグ"Y"が付いたイベントをオーバーレイする場合は:

    "events": "host:X tags:Y"

エラーにステータスをオーバーレイする場合は:

    "events": "status:error"


<!-- ### Scope

A scope lets you filter a Series. It can be a host, a device on a host
or any arbitrary tag you can think of that contains only alphanumeric
characters plus colons and underscores (`[a-zA-Z1-9:_]+`).

Examples of scope (meaning in parentheses):

    host:my_host                      (related to a given host)
    host:my_host, device:my_device    (related to a given device on a given host)
    source:my_source                  (related to a given source)
    my_tag                            (related to a tagged group of hosts)
    my:tag                            (same)
    *                                 (wildcard for everything) -->

### 検索の対象範囲(Scope)

Scopeを指定することで検索対象範囲を限定することができます。スコープでは、ホスト名やホスト上のデバイス、更に英数文字列 (`[a-zA-Z1-9:_]+`)のタグが付与された情報を指定することができます。

検索対象範囲の例 (カッコ内は、対象範囲の解説):

    host:my_host                      (指定されたホスト名に関連した情報)
    host:my_host, device:my_device    (指定されたホスト名の指定されたデバイスに関連した情報)
    source:my_source                  (指定された情報ソースに関連した情報)
    my_tag                            (my_tagで指定されたグループに関連する情報)
    my:tag                            (同上)
    *                                 (ワイルドカード)


<!-- ### Series

The general format of a Series is:

    function(metric{scope} [by {group}])

The `function` and `group` are optional.

A Series can be further combined together via binary operators (+, -, /, *):

    metric{scope} [by {group}] operator metric{scope} [by {group}]

A Series can be represented in different ways:

1. as line charts
2. as stacked areas
3. as slice-n-stack areas
 -->

### 時系列データ(Series)の検索表示

時系列データのクエリは、次のフォーマットになります:

    function(metric{scope} [by {group}])

`function`と`group`の部分は、省略することができます。

時系列データは、バイナリー演算子(+, -, /, *)を使うことで、組み合わせて表示することができるようになります:

    metric{scope} [by {group}] operator metric{scope} [by {group}]

時系列データでは、JSON書式の書き方によって次のようなグラフを表示することができます:

1. as 折れ線グラフ
2. as 積み上げグラフ
3. as slice-n-stackグラフ


<!-- #### Line Charts

<img src="/static/images/multi-lines.png" style="width:100%; border:1px solid #777777"/>

The representation is automatically derived from having multiple `requests` values.

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
      ] -->

#### 折れ線グラフ

<img src="/static/images/multi-lines.png" style="width:100%; border:1px solid #777777"/>

このグラフ表現は、"requests"部に複数の検索クエリを有する場合に自動的に設定されます。

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


<!-- #### Stacked Series

<img src="/static/images/slice-n-stack.png" style="width:100%; border:1px solid #777777"/>

In the case of related Time Series, you can easily draw them as stacked areas by using the following syntax:

    "requests": [
        {
          "q": "metric1{scope}, metric2{scope}, metric3{scope}"
        }
    ]

Instead of one query per chart you can aggregate all queries into one and simply concatenate the queries. -->

#### 積み上げグラフ

<img src="/static/images/slice-n-stack.png" style="width:100%; border:1px solid #777777"/>

関連している時系列データの場合は、次の構文を記述し積み上げグラフを表示することができます：


    "requests": [
        {
          "q": "metric1{scope}, metric2{scope}, metric3{scope}"
        }
    ]

チャート毎に1つのクエリを表示する代わりに、","でクエリを連結することによって、全てのクエリを1つのグラフに集約することができます。


<!-- #### Slice-n-Stack

A useful visualization is to represent a metric shared across
hosts and stack the results. For instance, when selecting a tag that
applies to more than 1 host you will see that ingress and egress
traffic is nicely stacked to give you the sum as well as the split per
host. This is useful to spot wild swings in the distribution of network
traffic.

Here's how to do it for any metric:

    "requests" [
      {
         "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
      }
    ]

Note that in this case you can only have 1 query. But you can also split by device, or a combination of both:

    "requests" [
      {
         "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
      }
    ]

to get traffic for all the tagged hosts, split by host and network device. -->

#### Slice-n-Stackグラフ

異なるホストにまたがるメトリクスを積み上げた結果のグラフが有益な場合もあります。例えば、複数のホストに共通して付されているタグを選択し、それらのホストのネットワークトラフィックの出入りをホスト毎に積み上げたグラフを見てみたいとします。このようなグラフは、ネットワークトラフィックの中で異常が発生していることを発見するのに便利です。

この例は、次のように記述します:

    "requests" [
      {
         "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
      }
    ]

このケースでは、クエリは1つしか発行できないことに注目してください。
しかしながら、デバイス単位やホストとデバイスのコンビネーション単位を基準としてスライスすることもできます:

    "requests" [
      {
         "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
      }
    ]

全てのタグ付けされたホストから、ホストとネットワークデバイスでスライスし、積み上げたグラフを表示します。


<!-- <h2 id="functions">Arithmetic and Functions</h2>

A Series also supports simple arithmetic and a number of functions.

You can apply functions to metric queries in the graph editor, as long as you
use the JSON editor.

### Arithmetic

You can apply simple arithmetic to a Series (+, -, * and /). In this
example we graph 5-minute load and its double:

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

You can also add, substract, multiply and divide a Series. Beware that
Datadog does not enforce consistency at this point so you *can* divide
apples by oranges.

    {
        "viz": "timeseries",
        "requests": [
          {
            "q": "metric{apples} / metric{oranges}"
          }
        ]
    } -->

<!-- <h2 id="functions">Arithmetic and Functions</h2>

A Series also supports simple arithmetic and a number of functions.

You can apply functions to metric queries in the graph editor, as long as you
use the JSON editor.

### Arithmetic

You can apply simple arithmetic to a Series (+, -, * and /). In this
example we graph 5-minute load and its double:

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

You can also add, substract, multiply and divide a Series. Beware that
Datadog does not enforce consistency at this point so you *can* divide
apples by oranges.

    {
        "viz": "timeseries",
        "requests": [
          {
            "q": "metric{apples} / metric{oranges}"
          }
        ]
    } -->

## 演算子と関数 {#functions}

シリーズは、簡単な演算やいくつかの関数をサポートしています。

JSONエディターを使用している限り、グラフエディター内でメトリクスクエリに関数を適用することができます。

### 演算子

シリーズには、簡単な演算( +, -, *, / )を適用することができます。
次の例では、5分間のload averageの値とその倍の数値をグラフ表示することにします:


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

シリーズ同士を、加算 減算 乗算 除算することもできます。
Datadogでは、ここでは一貫性を強制していないので、異なるものの除算をすることもできます。


    {
        "viz": "timeseries",
        "requests": [
          {
            "q": "metric{apples} / metric{oranges}"
          }
        ]
    }


<!-- ### Functions

You can apply functions to the result of each query.

<table class="table">
  <tr>
    <th>Function</th>
    <th>Description</th>
  </tr>

 <tr>
   <td>cumsum()</td>
   <td>cumulative sum over visible time window</td>
 </tr>

  <tr>
    <td>dt()</td>
    <td>time delta between points</td>
  </tr>

  <tr>
    <td>diff()</td>
    <td>value delta between points</td>
  </tr>

  <tr>
    <td>derivative()</td>
    <td>1st order derivative, diff / dt</td>
  </tr>

  <tr>
    <td>rate()</td>
    <td>1st order derivate that skips non-monotonically increasing values</td>
  </tr>

  <tr>
    <td>derived()</td>
    <td>synonym for derivative</td>
  </tr>

  <tr>
    <td>per_second()</td>
    <td>synonym for rate</td>
  </tr>

  <tr>
    <td>per_minute()</td>
    <td>60 * rate</td>
  </tr>

  <tr>
    <td>per_hour()</td>
    <td>3600 * rate</td>
  </tr>

  <tr>
    <td>ewma_3()</td>
    <td>Exponentially Weighted Moving Average with a span of 3</td>
  </tr>

  <tr>
    <td>ewma_5()</td>
    <td>EWMA with a span of 5</td>
  </tr>

  <tr>
    <td>ewma_10()</td>
    <td>EWMA with a span of 10</td>
  </tr>

  <tr>
    <td>ewma_20()</td>
    <td>EWMA with a span of 20</td>
  </tr>

  <tr>
    <td>median()</td>
    <td>Median filter, useful for reducing noise</td>
  </tr>

  <tr>
    <td>log10()</td>
    <td>Base-10 logarithm</td>
  </tr>

  <tr>
    <td>log2()</td>
    <td>Base-2 logarithm</td>
  </tr>

  <tr>
    <td>hour_before()</td>
    <td>Metric values from one hour ago</td>
  </tr>

  <tr>
    <td>day_before()</td>
    <td>Metric values from one day ago</td>
  </tr>

  <tr>
    <td>week_before()</td>
    <td>Metric values from one week ago</td>
  </tr>

  <tr>
    <td>month_before()</td>
    <td>Metric values from one month ago</td>
  </tr>

  <tr>
    <td>top()</td>
    <td>Select the top series responsive to a given query, according to some ranking method.  Takes four parameters:

      <ul>
        <li>a metric query string with some grouping, e.g. <code>avg:system.cpu.idle{*} by {host}</code></li>
        <li>the number of series to be displayed, as an integer.</li>
        <li>one of <code>'max'</code>, <code>'min'</code>, <code>'last'</code>, <code>'l2norm'</code>, or <code>'area'</code>.  <code>'area'</code> is the signed area under the curve being graphed, which can be negative.  <code>'l2norm'</code> uses the <a href="http://en.wikipedia.org/wiki/Norm_(mathematics)#p-norm">L2 Norm</a> of the time series, which is always positive, to rank the series.</li>
        <li>either <code>'desc'</code> (rank the results in descending order) or <code>'asc'</code> (ascending order).</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>top_offset()</td>
    <td>Similar to <code>top()</code>, except with an additional offset parameter, which controls where in the ordered sequence of series the graphing starts.  For example, an offset of 2 would start graphing at the number 3 ranked series, according to the chosen ranking metric.</td>
  </tr>

</table> -->

### 関数

クエリの結果に対して関数を適応することがでます。

<table class="table">
  <tr>
    <th>関数</th>
    <th>概要</th>
  </tr>

 <tr>
   <td>cumsum()</td>
   <td>cumulative sum over visible time window</td>
 </tr>

  <tr>
    <td>dt()</td>
    <td>time delta between points</td>
    <td>time delta between points</td>
  </tr>

  <tr>
    <td>diff()</td>
    <td>value delta between points</td>
  </tr>

  <tr>
    <td>derivative()</td>
    <td>1st order derivative, diff / dt</td>
  </tr>

  <tr>
    <td>rate()</td>
    <td>1st order derivate that skips non-monotonically increasing values</td>
  </tr>

  <tr>
    <td>derived()</td>
    <td>synonym for derivative</td>
  </tr>

  <tr>
    <td>per_second()</td>
    <td>synonym for rate</td>
  </tr>

  <tr>
    <td>per_minute()</td>
    <td>60 * rate</td>
  </tr>

  <tr>
    <td>per_hour()</td>
    <td>3600 * rate</td>
  </tr>

  <tr>
    <td>ewma_3()</td>
    <td>Exponentially Weighted Moving Average with a span of 3</td>
  </tr>

  <tr>
    <td>ewma_5()</td>
    <td>EWMA with a span of 5</td>
  </tr>

  <tr>
    <td>ewma_10()</td>
    <td>EWMA with a span of 10</td>
  </tr>

  <tr>
    <td>ewma_20()</td>
    <td>EWMA with a span of 20</td>
  </tr>

  <tr>
    <td>median()</td>
    <td>Median filter, useful for reducing noise</td>
  </tr>

  <tr>
    <td>log10()</td>
    <td>Base-10 logarithm</td>
  </tr>

  <tr>
    <td>log2()</td>
    <td>Base-2 logarithm</td>
  </tr>

  <tr>
    <td>hour_before()</td>
    <td>Metric values from one hour ago</td>
  </tr>

  <tr>
    <td>day_before()</td>
    <td>Metric values from one day ago</td>
  </tr>

  <tr>
    <td>week_before()</td>
    <td>Metric values from one week ago</td>
  </tr>

  <tr>
    <td>month_before()</td>
    <td>Metric values from one month ago</td>
  </tr>

  <tr>
    <td>top()</td>
    <td>Select the top series responsive to a given query, according to some ranking method.  Takes four parameters:

      <ul>
        <li>a metric query string with some grouping, e.g. <code>avg:system.cpu.idle{*} by {host}</code></li>
        <li>the number of series to be displayed, as an integer.</li>
        <li>one of <code>'max'</code>, <code>'min'</code>, <code>'last'</code>, <code>'l2norm'</code>, or <code>'area'</code>.  <code>'area'</code> is the signed area under the curve being graphed, which can be negative.  <code>'l2norm'</code> uses the <a href="http://en.wikipedia.org/wiki/Norm_(mathematics)#p-norm">L2 Norm</a> of the time series, which is always positive, to rank the series.</li>
        <li>either <code>'desc'</code> (rank the results in descending order) or <code>'asc'</code> (ascending order).</li>
      </ul>
    </td>
  </tr>

  <tr>
    <td>top_offset()</td>
    <td>Similar to <code>top()</code>, except with an additional offset parameter, which controls where in the ordered sequence of series the graphing starts.  For example, an offset of 2 would start graphing at the number 3 ranked series, according to the chosen ranking metric.</td>
  </tr>

</table>


<!-- The <code>top()</code> method also has the following convenience functions, all of which take a single series list as input:

<div style="margin-left: 30px">
  <dl>
    <dt>top5, top10, top15, top20</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'mean' metric.</dd>

    <dt>top5_max, top10_max, top15_max, top20_max</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'max' metric.</dd>

    <dt>top5_min, top10_min, top15_min, top20_min</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'min' metric.</dd>

    <dt>top5_last, top10_last, top15_last, top20_last</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'last' metric.</dd>

    <dt>top5_area, top10_area, top15_area, top20_area</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'area' metric.</dd>

    <dt>top5_l2norm, top10_l2norm, top15_l2norm, top20_l2norm</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'l2norm' metric.</dd>

    <dt>bottom5, bottom10, bottom15, bottom20</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'mean' metric.</dd>

    <dt>bottom5_max, bottom10_max, bottom15_max, bottom20_max</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'max' metric.</dd>

    <dt>bottom5_min, bottom10_min, bottom15_min, bottom20_min</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'min' metric.</dd>

    <dt>bottom5_last, bottom10_last, bottom15_last, bottom20_last</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'last' metric.</dd>

    <dt>bottom5_area, bottom10_area, bottom15_area, bottom20_area</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'area' metric.</dd>

    <dt>bottom5_l2norm, bottom10_l2norm, bottom15_l2norm, bottom20_l2norm</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'l2norm' metric.</dd>
  </dl>
</div>
 -->

<code>top()</code> 関数には、次のような便利なサブ関数が準備されています。 これらすべての関数の入力はシリーズになります:

<div style="margin-left: 30px">
  <dl>
    <dt>top5, top10, top15, top20</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'mean' metric.</dd>

    <dt>top5_max, top10_max, top15_max, top20_max</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'max' metric.</dd>

    <dt>top5_min, top10_min, top15_min, top20_min</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'min' metric.</dd>

    <dt>top5_last, top10_last, top15_last, top20_last</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'last' metric.</dd>

    <dt>top5_area, top10_area, top15_area, top20_area</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'area' metric.</dd>

    <dt>top5_l2norm, top10_l2norm, top15_l2norm, top20_l2norm</dt>
    <dd>Retrieves top-valued [5, 10, 15, 20] series using the 'l2norm' metric.</dd>

    <dt>bottom5, bottom10, bottom15, bottom20</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'mean' metric.</dd>

    <dt>bottom5_max, bottom10_max, bottom15_max, bottom20_max</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'max' metric.</dd>

    <dt>bottom5_min, bottom10_min, bottom15_min, bottom20_min</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'min' metric.</dd>

    <dt>bottom5_last, bottom10_last, bottom15_last, bottom20_last</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'last' metric.</dd>

    <dt>bottom5_area, bottom10_area, bottom15_area, bottom20_area</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'area' metric.</dd>

    <dt>bottom5_l2norm, bottom10_l2norm, bottom15_l2norm, bottom20_l2norm</dt>
    <dd>Retrieves lowest-valued [5, 10, 15, 20] series using the 'l2norm' metric.</dd>
  </dl>
</div>


<!-- There are also a few functions you can append to a query which we recommend for expert users only.
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

We strongly recommend not using <code>.rollup()</code> and <code>.as_count()</code> within the same query.
We will also be building these functions fully into the graph editor in the near
future. For more on <code>.as_count()</code> please see our blog post
<a target="_blank" href="https://www.datadoghq.com/2014/05/visualize-statsd-metrics-counts-graphing/">here</a>. -->

この他にも、クエリ結果に適応する上級者向けの関数が幾つかあります。

上級者向けの関数の一つが``.rollup()``です。この関数をクエリに追記することで、複数のポイントを単一ポイントにまとめることができます。この関数は、"メソッド"と"時間"の2つのパラメータを引数に指定することができます。(例: ``.rollup(method,time)``)

"メソッド"の部分には、sum/min/max/count/avgを指定することができます。"時間"は、秒単位で指定します。
"メソッド"と"時間"は、個別に指定(例: ``.rollup(20)``)したり、両方を組み合わせて(例: ``.rollup(sum,120)``)も指定できます。
この``.rollup()``には、チェック機構があります。
しかしDatadogのグラフでは表示する時間の範囲に基づき350のデータポイントまでしか保有していないので、期間指定を一ヶ月にした場合は、20秒間隔以上の精度でデータポイントが保有されているため、20秒でのロールアップ``.rollup(20)``は、機能しません。

特定の方法で提出されたメトリクスためのもう一つの上級者向け関数が、``.as_count（）``と``.as_rate（）`` です。
現状、DogStatsDの"rate", "counter"を使って送信したメトリクスには、``.as_count（）``と``.as_rate（）``を使うことができますが、"gauges"などのそれ以外のメトリクスでは機能しません。

``.rollup()``と``.as_count（）``を同じクエリで使用しないでください。
また、将来的にはこれらの関数は、グラフエディターで簡単に操作できるようになる予定です。
``as_count()``に関する詳しい情報は、["Visualize StatsD metrics with Counts Graphing"](https://www.datadoghq.com/2014/05/visualize-statsd-metrics-counts-graphing/)のブログを参照してください。


<!-- <h4 id="yaxis"> Y-Axis Controls</h4>

The Datadog y-axis controls (currently just via the JSON editor) allow you to:
<ul>
 <li>Clip y-axis to specific ranges</li>
 <li>Remove outliers either by specifying a percentage or an absolute value to remove outliers</li>
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
</ul> -->

#### Y軸の操作 {#yaxis}

グラフエディターからJSONを編集することで次のようなY軸の制御ができます:

- Y軸の表示範囲の制限
- パーセンテージか絶対値を指定することより異常値を排除
- Y軸の線形スケールから対数スケールやパワースケールへの変更

There are three configuration settings:

Y軸を設定するために次の3のオプションがあります:

- <code>min</code> (オプション): Y軸に表示するSpecifies 最小値を指定します。 ここでは、数値か"auto"指定することができます。デフォルト値は、"auto"です。
- <code>max</code> (オプション): Y軸に表示するSpecifies 最大値を指定します。 ここでは、数値か"auto"指定することができます。デフォルト値は、"auto"です。
- <code>scale</code> (オプション): Specifies the scale type. Possible values: "linear", "log", "sqrt", "pow##"
    (eg. pow2, pow0.5, 2 is used if only "pow" was provided"), Default scale is "linear".
- <code>scale</code> (オプション): Y軸の目盛りのタイプを指定します。 指定できる値は、"linear", "log", "sqrt", "pow##"(例. pow2, pow0.5)です。デフォルト値は、"linear"です。

<!-- Examples:

<pre><code>"yaxis": {
    "min": "auto",
    "max": 200,
    "scale": "log"
}</code></pre>

<pre><code>"yaxis": {
    "min": 200,
    "scale": "sqrt"
}</code></pre>

<pre><code>"yaxis": {
    "min": 9000,
    "max": 10000
}</code></pre>

<pre><code>"yaxis": {
    "scale": "pow0.1"
}</code></pre>

<pre><code>"yaxis": {
    "scale": "pow3"
}</code></pre> -->

Examples:

<pre><code>"yaxis": {
    "min": "auto",
    "max": 200,
    "scale": "log"
}</code></pre>

<pre><code>"yaxis": {
    "min": 200,
    "scale": "sqrt"
}</code></pre>

<pre><code>"yaxis": {
    "min": 9000,
    "max": 10000
}</code></pre>

<pre><code>"yaxis": {
    "scale": "pow0.1"
}</code></pre>

<pre><code>"yaxis": {
    "scale": "pow3"
}</code></pre>


<!-- <h4>Outliers</h4>

Outliers configuration allows you to automatically change y-axis bounds based on a
threshold. Thresholds can be a percentage or an absolute value, and it can apply to
both both ends of the graph (lower and upper).

For outliers, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage and all
values above the value or all values that sit within the top ##% will be cutoff. -->

<h4>異常値(Outlier)</h4>

異常値を判定するためのしきい値を定義することにより、Y軸の上下限を自動的に変更することができます。
しきい値には、パーセンテージまたは絶対値を指定することができます。
このしきい値は、グラフの上限と下限の両方に設定することができます。

##### 異常値を定義するためには、2つの設定方法があります。

<!-- To begin, there is a simple configuration where you specify an absolute value or a percentage and all values above the value or all values that sit within the top ##% will be cutoff.
 -->

まず、絶対値を指定し、その値を超えているメトリクスの値を異常値として排除する方法です。次に、パーセンテージを指定し、トップから指定したパーセンテージまでの値を異常値として排除する方法です。


<!-- Examples:

<code>"outliers": 30</code> // all values above 30 will not appear<br>
<code>"outliers": "5%"</code> // the top 5% of that data will not appear -->

記述例:

1. ``"outliers": 30`` // 値が30以上のデータポイントは除去され、表示されません。
2. ``"outliers": "5%"`` // 上位5%の値をもったデータポイントは除去され、表示されません。


<!--
<p>
Advanced configuration works the same way as simple configuration, with the added
flexibility of configuring the lower or the upper or both parts of the graph. For
example, the following configuration will limit the graph to data points that are
not in the bottom 10% nor in the top 30%.

<pre><code>"outliers": {
   "top": "30%",
   "bottom": "10%"
}</code></pre>


The following will show all data except those with values higher than 15:


<pre><code>"outliers": {
    "above": 15
}</code></pre>

The following will hide data points below 2:

<pre><code>"outliers": {
    "below": 2
}</code></pre>



Here is a full JSON example:

<pre><code>{
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
  },
  "outliers": {
       "top": "5%",
       "below": 15
   }
}</code></pre>

</p>
 -->

##### 高度な設定も、シンプルな設定ど同じような概念で進めることができます。

高度のな設定では、グラフの下限,上限,その両方の設定がより柔軟にコントロールできるようになっています。
例えば、次のグラフ設定では、下限10%以上で、上限30%以下のデータポイントのみグラフ表示されるように制限しています。

<pre><code>"outliers": {
   "top": "30%",
   "bottom": "10%"
}</code></pre>

次は、値が15以上のデータポイント除去します:

<pre><code>"outliers": {
    "above": 15
}</code></pre>

次は、値が2以下のデータポイント除去します:

<pre><code>"outliers": {
    "below": 2
}</code></pre>

すべての要素を含んだJSONの例です:

<pre><code>{
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
  },
  "outliers": {
       "top": "5%",
       "below": 15
   }
}</code></pre>


<!-- #### Examples

Here is an example using the <code>rate()</code> function, which takes only a single metric as a parameter.  Other functions, with the exception of <code>top()</code> and <code>top_offset()</code>, have identical syntax.

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "rate(sum:system.load.5{role:intake-backend2} by {host})",
          "stacked": false
        }
      ]
    }

Here is an example using the <code>top()</code> function:

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "top(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc')",
          "stacked": false
        }
      ]
    }

This will show the graphs for the five series with the highest peak <code>system.cpu.iowait</code> values in the query window.



To look at the hosts with the 6th through 10th highest values (for example), use <code>top_offset</code> instead:

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "top_offset(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc', 5)",
          "stacked": false
        }
      ]
    }

Here is an example using the <code>week_before()</code> function:

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "sum:haproxy.count_per_status{status:available} - week_before(sum:haproxy.count_per_status{status:available})"
        }
      ]
    } -->


#### 設定例:

パラメーターに１つのメトリクスを指定した<code>rate()</code>関数を使った例です。<code>top()</code>と<code>top_offset()</code>以外の関数では、この<code>rate()</code>と同様のシンタックス表記を利用することできます。

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "rate(sum:system.load.5{role:intake-backend2} by {host})",
          "stacked": false
        }
      ]
    }

<code>top()</code> 関数を使用した例::

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "top(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc')",
          "stacked": false
        }
      ]
    }

この事例では、<code>system.cpu.iowait</code>のピーク値の上位５をグラフに表示します。

<code>system.cpu.iowait</code>のピーク値ランキングの第6位から10位のホストを表示するためには、<code>top_offset</code>を使います:

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "top_offset(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc', 5)",
          "stacked": false
        }
      ]
    }

<code>week_before()</code>関数を使用した例:

    {
      "viz": "timeseries",
      "requests": [
        {
          "q": "sum:haproxy.count_per_status{status:available} - week_before(sum:haproxy.count_per_status{status:available})"
        }
      ]
    }
