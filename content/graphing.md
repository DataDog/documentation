---
title: Graphing Primer
kind: documentation
sidebar:
  nav:
    - header: Graphing Primer
    - text: Find the Graph Editor
      href: "#editor"
    - text: Grammar
      href: "#grammar"
    - text: Arithmetic & Functions
      href: "#functions"
    - text: "Y-Axis Controls"
      href: "#yaxis"
---

## Find the Graph Editor
{: #editor}

On each graph you will find a pencil icon that opens the graph editor.

![Graphing Overview](/static/images/references-graphing-overview.png)

The graph editor has three tabs, "Share", "JSON", and "Edit". "Share" will allow you to embed the graph on any external web page. "JSON" is the more flexible editor, but it requires knowledge of the graph definition language to make use of it. "Edit" is the default tab and will allow you to use a GUI to select the graphing options. The newest features are sometimes only available on the "JSON" tab.

![JSON Editor](/static/images/references-graphing-jsoneditor.png)

## Grammar
{: #grammar}

The graph definition language is well-formed JSON and is structured in four parts:

1. Time Series, a.k.a. Series
2. Events
3. Visualization
4. Y Axis

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
      ], 
      "viz": "visualization type", 
      "yaxis": {
        "yaxisoptionkey": "yaxisoptionvalue"
      }
    }

In other words at the highest level the JSON structure is a dictionary with two, three, or four entries:

1. "requests" *
2. "events"
3. "viz" *
4. "yaxis"

\* *only requests and viz are required.*

### Events

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


### Scope

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

### Series

The general format of a Series is:

    function(metric{scope} [by {group}])

The `function` and `group` are optional.

A Series can be further combined together via binary operators (+, -, /, *):

    metric{scope} [by {group}] operator metric{scope} [by {group}]

A Series can be represented in different ways:

1. as line charts
2. as stacked areas
3. as slice-n-stack areas

#### Line Charts

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
      ]

#### Stacked Series

<img src="/static/images/slice-n-stack.png" style="width:100%; border:1px solid #777777"/>

In the case of related Time Series, you can easily draw them as stacked areas by using the following syntax:

    "requests": [
        {
          "q": "metric1{scope}, metric2{scope}, metric3{scope}"
        }
    ]

Instead of one query per chart you can aggregate all queries into one and simply concatenate the queries.

#### Slice-n-Stack

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

to get traffic for all the tagged hosts, split by host and network device.

<h2 id="functions">Arithmetic and Functions</h2>

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
    }

### Functions

You can apply functions to the result of each query. <a href="/examples/graphing%20functions/">Examples</a>

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
    <td>abs()</td>
    <td>Absolute value</td>
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

The <code>top()</code> method also has the following convenience functions, all of which take a single series list as input:

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

We strongly recommend not using <code>.rollup()</code> and <code>.as_count()</code> within the same query.
We will also be building these functions fully into the graph editor in the near
future. For more on <code>.as_count()</code> please see our blog post
<a target="_blank" href="https://www.datadoghq.com/2014/05/visualize-statsd-metrics-counts-graphing/">here</a>.


<h4 id="yaxis"> Y-Axis Controls</h4>

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

<h4>Filtering</h4>

Filter configuration allows you to automatically change y-axis bounds based on a
threshold. Thresholds can be a percentage or an absolute value, and it can apply to
both both ends of the graph (lower and upper).

For y-axis filtering, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage and all
values above the value or all values that sit within the top ##% will be cutoff.

Examples:

<pre><code>"yaxis": {
    "filter": 30 // all values above 30 will not appear
}</code></pre>
<pre><code>"yaxis": {
    "filter": "5%" // the top 5% of that data will not appear
}</code></pre>

<p>
Advanced configuration works the same way as simple configuration, with the added
flexibility of configuring the lower or the upper or both parts of the graph. For
example, the following configuration will limit the graph to data points that are
not in the bottom 10% nor in the top 30%.

<pre><code>"yaxis": {
    "filter": {
        "top": "30%",
        "bottom": "10%"
    }
}</code></pre>


The following will show all data except those with values higher than 15:

<pre><code>"yaxis": {
    "filter": {
        "above": 15
    }
}</code></pre>

The following will hide data points below 2:

<pre><code>"yaxis": {
    "filter": {
        "below": 2
    }
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
    "filter": {
         "top": "5%",
         "below": 15
     }
  },
}</code></pre>

</p>


#### Examples

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
    }
