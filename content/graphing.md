---
title: Graphing Primer
kind: documentation
has_snippets: True
---

## Find the Graph Editor
{: #editor}

On each graph you will find a pencil icon that opens the graph editor on timeboards and a cog that opens the graph editor on screenboards.

![Graphing Overview](/static/images/references-graphing-overview.png)

The graph editor has three tabs, **Share**, **JSON**, and **Edit**. **Share** will allow you to embed the graph on any external web page. **JSON** is the more flexible editor, but it requires knowledge of the graph definition language to make use of it. **Edit** is the default tab and will allow you to use a GUI to select the graphing options. The newest features are sometimes only available on the **JSON** tab.




## Graphing with the graphical editor interface

When you first open the graph editor window, you will be on the **Edit** tab. Here you can use the UI to choose most settings to tweak your graphs. Here is an example of what you might see. This example comes from the first graph in the standard Postgres Integration dashboard:

![Graphing Edit Tab](/static/images/references-graphing-edit-window.png)

Configuring a graph in a dashboard is a multi-step process. The first two steps depend

### 1) Choose the Metric to graph

When you create a graph, you will probably have a metric in mind that you want to show. You can select that in the first dropdown in the **Choose metrics and events** section. If you aren't sure exactly which metric to use, you might want to start with the [Metrics Explorer](https://app.datadoghq.com/metric/explorer). You can also look in the [Metrics Summary](https://app.datadoghq.com/metric/summary).

The Metrics Explorer will allow you to play around with different graph settings in a more ad-hoc way. The Metrics Summary will allow to learn more about the type of metric as well as setting the default unit for a metric.


### 2) Select your visualization

Once you have a metric in mind to display in your graph, select your visualization.

#### Timeseries

The Timeseries visualization is great for showing one or more metrics over time. The time window depends on what is selected on the timeboard or in the graph on a screenboard. Timeseries' can be displayed as lines, areas, and bars. To see an example of a timeseries graph, [click here](#collapseTimeseries){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTimeseries" }. Timeseries is available on both timeboards and screenboards.

<div class="collapse" id="collapseTimeseries" markdown="1">
  ![Timeseries](/static/images/references-graphing-timeseries-example.png)
</div>

#### Heatmap

The Heatmap visualization is great for showing metrics aggregated across many tags, such as *hosts*. The more hosts that have a particular value, the darker that square will be. To see an example of a heatmap, [click here](#collapseHeatmap){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseHeatmap" }. Heatmap is available on both timeboards and screenboards.

<div class="collapse" id="collapseHeatmap" markdown="1">
  ![Heatmap](/static/images/references-graphing-heatmap-example.png)
</div>

#### Distribution

The Distribution visualization is another way of showing metrics aggregated across many tags, such as *hosts*. Unlike the Heatmap, Distribution's x-axis is the quantity rather than time. To see an example of a distribution graph, [click here](#collapseDistribution){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseDistribution" }. Distribution is available on both timeboards and screenboards.

<div class="collapse" id="collapseDistribution" markdown="1">
  ![Distribution](/static/images/references-graphing-distribution-example.png)
</div>


#### Toplist

The Toplist visualization is perfect when you want to see the list of hosts with the most or least of any metric value, such as highest consumers of CPU, hosts with the least disk space, etc. To see an example of a Toplist,  [click here](#collapseTopList){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseTopList" }. Toplist is available on both timeboards and screenboards.

<div class="collapse" id="collapseTopList" markdown="1">
  ![TopList](/static/images/references-graphing-toplist-example.png)
</div>


#### Change

The Change graph will show you the change in a value over the time period chosen. To see an example of a Change graph, [click here](#collapseChangegraph){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseChangegraph" }.

<div class="collapse" id="collapseChangegraph" markdown="1">
  ![Changegraph](/static/images/references-graphing-change-example.png)
</div>

#### Hostmap

The Hostmap will graph any metric for any subset of hosts on the same hostmap visualization available from the main Infrastructure Hostmap menu. To see an example of a Hostmap, [click here](#collapseHostmap){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseHostmap" }.

<div class="collapse" id="collapseHostmap" markdown="1">
  ![Hostmap](/static/images/references-graphing-hostmap-example.png)
</div>


### 3) Filter and Aggregate to show what you need

#### Filter

Now that you have the metric and a visualization in place, you can filter down the hosts to be graphed. To the right of the metric is a dropdown which by default says *(everywhere)*. Click this and choose the tag(s) you want to filter by. To learn more about tags, refer to the [Guide to Tagging](/guides/tagging/).

#### Aggregation Method

Next to the filter dropdown is the aggregation method. This defaults to **avg by** but can be changed to **max by**, **min by**, or **sum by**. In most cases, the metric will have many values for each time interval, coming from many hosts or instances. The aggregation method chosen determines how the metrics will be aggregated into a single line. So if you are graphing a metric that is from 100 hosts, **sum by** will add up all of those values and display the sum.

#### Aggregation Groups

After the aggregation method you can determine what constitutes a line or grouping in a graph. If you choose host, then you will have a line (in the case of line graphs) for each host. If you choose role, then there is a line for every role. Then that line will be made up of metrics from all the hosts in that role, aggregated using the method you chose above.

### 4) Rollup to aggregate over time

Regardless of the options chosen above, there will always be some aggregation of data due to the physical size constraints of the window holding the graph. If a metric is updated every second and you are looking at 4 hours of data, you will need 14,400 points to display everything. Each graph we display will have about 300 points shown at any given time.

In the example above, each point displayed on the screen represents 48 data points. In practice, metrics are collected by the agent every 15-20 seconds. So one day's worth of data is 4,320 data points. You might consider a rollup function that looks at 5 or 10 minutes worth of data if you would like to have more control over the display of your data for a graph that shows 1 day.

To use the rollup function, click the plus sign to the right of the aggregation group and choose rollup from the dropdown. Now choose how you want to aggregate the data and the interval in seconds.

To create a single line that represents the total available disk space on average across all machines rolled up in 60 seconds buckets, you would use a query like this:

![rollup example](/static/images/references-graphing-rollup-example.png)

When switching to the JSON view, the query will look like this:

    "q": "avg:system.disk.free{*}.rollup(avg, 60)"

For more about using the JSON view, scroll to the bottom and click the Learn about the JSON tab link.

### 4) Apply more advanced functions

Depending on your analysis needs, you may choose to apply other mathematical functions to the query. Examples include rates and derivatives, smoothing, and more. For a list of available functions, [click here](#collapseGraphicFunctionTable){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseGraphicFunctionTable" }.

<div class="collapse" id="collapseGraphicFunctionTable" markdown="1">
<!-- If you make changes here, change it to the table further down as well -->
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
    <td>median_3()</td>
    <td>Median filter, useful for reducing noise, with a span of 3</td>
  </tr>

  <tr>
    <td>median_5()</td>
    <td>Median with a span of 5</td>
  </tr>

  <tr>
    <td>median_7()</td>
    <td>Median with a span of 7</td>
  </tr>

  <tr>
    <td>median_9()</td>
    <td>Median with a span of 9</td>
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

</div>

### 5) Overlay events for additional context

You can repeat all the steps above to add additional metrics to your graph to add context. You can also add events from related system to add even more context. So an example would be to add github commits, Jenkins deploys, or Docker creation events. Just click the Overlay Events button and enter a query to find and display your events. To show anything from a source such as Github, use ```sources:github```. For all the events with the tag role:web, use ```tag:role:web```.


### 6) Create a title

If you don't enter a title, we will automatically generate a title based on the selections you have made. But it may be more useful to the users of the dashboard to create a title that more aptly describes the purpose of the graph. Linking the technical purpose to the business benefits adds even more value.

### 7) Save

The final step is to click Save. You can always come back in to the editor and tweak the graph further depending on your needs.


<script type="text/javascript">
jQuery(function(){
  $('#collapseJSON').on('show.bs.collapse', function(){
    $('#collapseJSONOpen').hide();
  })
  $('#collapseJSON').on('hidden.bs.collapse', function(){
    $('#collapseJSONOpen').show();
  })
})
</script>


[Learn more about the JSON tab](#collapseJSON){: role="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseJSON" id="collapseJSONOpen"}


<div class="collapse" id="collapseJSON" markdown="1">

## Graphing with the JSON editor


[Close JSON tab details](#collapseJSON){: role="button" data-toggle="collapse" aria-controls="collapseJSON" id="collapseJSONClose"}

![JSON Editor](/static/images/references-graphing-jsoneditor.png)

### Grammar
{: #grammar}


The graph definition language is well-formed JSON and is structured in four parts:

1. Requests
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

## Requests

The general format for a series is:

    "requests": [
        {
          "q": "function(aggregation method:metric{scope} [by {group}])"
        }
    ]

The `function` and `group` are optional.

A Series can be further combined together via binary operators (+, -, /, *):

    metric{scope} [by {group}] operator metric{scope} [by {group}]

#### Functions

You can apply functions to the result of each query. <a href="/examples/graphing functions/">Examples</a>


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
    <td>median_3()</td>
    <td>Median filter, useful for reducing noise, with a span of 3</td>
  </tr>

  <tr>
    <td>median_5()</td>
    <td>Median with a span of 5</td>
  </tr>

  <tr>
    <td>median_7()</td>
    <td>Median with a span of 7</td>
  </tr>

  <tr>
    <td>median_9()</td>
    <td>Median with a span of 9</td>
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

#### Aggregation Method

In most cases, the number of data points available outnumbers the maximum number that can be shown on screen. To overcome this, the data is aggregated using one of 4 available methods: average,  max, min, and sum.

#### Metrics

The metric is the main focus of the graph. You can find the list of metrics available to you in the [Metrics Summary](https://app.datadoghq.com/metric/summary). Click on any metric to see more detail about that metric, including the type of data collected, units, tags, hosts, and more.

#### Scope

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

#### Groups

For any given metric, data may come from a number of hosts. The data will normally be aggregated from all these hosts to a single value for each time slot. If you wish to split this out, you can by any tag. To include a data point seperated out by each host,  use {host} for your group.

#### Arithmetic

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


### Visualization

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



### Y-Axis Controls
{: #yaxis}

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

#### Filtering

Filter configuration allows you to automatically change y-axis bounds based on a
threshold. Thresholds can be a percentage or an absolute value, and it can apply to
both both ends of the graph (lower and upper).

For y-axis filtering, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage and all
values above the value or all values that sit within the top ##% will be cutoff.

Examples:

    "yaxis": {
        "filter": 30 // all values above 30 will not appear
    }

    "yaxis": {
        "filter": "5%" // the top 5% of that data will not appear
    }

Advanced configuration works the same way as simple configuration, with the added
flexibility of configuring the lower or the upper or both parts of the graph. For
example, the following configuration will limit the graph to data points that are
not in the bottom 10% nor in the top 30%.

    "yaxis": {
        "filter": {
            "top": "30%",
            "bottom": "10%"
        }
    }


The following will show all data except those with values higher than 15:

    "yaxis": {
        "filter": {
            "above": 15
        }
    }

The following will hide data points below 2:

    "yaxis": {
        "filter": {
            "below": 2
        }
    }



Here is a full JSON example:

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

</div>
