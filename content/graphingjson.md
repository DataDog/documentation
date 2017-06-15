---
title: Graphing Primer using JSON
kind: documentation
---

There are two ways to interact with the Graphing Editor: using the GUI (the default method) and writing JSON (the more complete method). This page covers using JSON. To learn more about the GUI editor, visit the main [Graphing Primer Page](/graphing)

## Graphing with the JSON editor
{: #graphing}

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
{: #requests}

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
{: #functions}

You can apply functions to the result of each query.

A few of these functions have been further explained in a series of examples. Visit this page for more detail: <a href="/examples/graphing functions/">Examples</a>

<%= @items['/partials/graphingfunctions/'].compiled_content %>


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

#### Aggregation Method
{: #aggregation}

In most cases, the number of data points available outnumbers the maximum number that can be shown on screen. To overcome this, the data is aggregated using one of 4 available methods: average,  max, min, and sum.

#### Metrics
{: #metrics}

The metric is the main focus of the graph. You can find the list of metrics available to you in the [Metrics Summary](https://app.datadoghq.com/metric/summary). Click on any metric to see more detail about that metric, including the type of data collected, units, tags, hosts, and more.

#### Scope
{: #scope}

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
{: #groups}

For any given metric, data may come from a number of hosts. The data will normally be aggregated from all these hosts to a single value for each time slot. If you wish to split this out, you can by any tag. To include a data point seperated out by each host,  use {host} for your group.

#### Arithmetic
{: #math}

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
{: #events}

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
{: #viz}

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
{: #linecharts}

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
{: #stacked}

<img src="/static/images/slice-n-stack.png" style="width:100%; border:1px solid #777777"/>

In the case of related Time Series, you can easily draw them as stacked areas by using the following syntax:

    "requests": [
        {
          "q": "metric1{scope}, metric2{scope}, metric3{scope}"
        }
    ]

Instead of one query per chart you can aggregate all queries into one and simply concatenate the queries.

#### Slice-n-Stack
{: #slice}

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

There are four configuration settings:
<ul>
<li><code>min</code> (optional): Specifies minimum value to show on y-axis. It takes a number, or "auto" for
    default behvior. Default value is "auto"</li>
<li><code>max</code> (optional): Specifies the maximum value to show on y-axis. It takes a number, or "auto"
    for default behavior. Default value is "auto"</li>
<li><code>scale</code> (optional): Specifies the scale type. Possible values: "linear", "log", "sqrt", "pow##"
    (eg. pow2, pow0.5, 2 is used if only "pow" was provided"), Default scale is "linear".</li>
<li><code>units</code> (optional): Specifies whether to show the metric unit along the y-axis. Possible values: "true"
    or "false". Default is "false".</li>
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

    "yaxis": {
        "units": "true"
    }

#### Filtering
{: #filter}

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
{: #examples}

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
