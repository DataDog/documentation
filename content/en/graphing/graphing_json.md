---
title: Graphing Primer using JSON
kind: documentation
aliases:
  - /graphingjson/
  - /graphing/miscellaneous/graphingjson
---

There are two ways to interact with the Graphing Editor: using the GUI (the default method) and writing JSON (the more complete method). This page covers using JSON. To learn more about the GUI editor, visit the main [Graphing Primer Page][1]

## Graphing with the JSON editor

{{< img src="graphing/graphing_json/references-graphing-jsoneditor.png" alt="references graphing jsoneditor" responsive="true" style="width:80%;">}}

### Grammar

The graph definition language is well-formed JSON and is structured in four parts:

1. Requests
2. Events
3. Visualization
4. Y Axis

Here is how they fit together in a JSON dictionary:

```json
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
```

In other words at the highest level the JSON structure is a dictionary with two, three, or four entries:

1. "requests" *
2. "events"
3. "viz" *
4. "yaxis"

*only requests and viz are required.*

## Requests

The general format for a series is:

```json
"requests": [
  {
    "q": "function(aggregation method:metric{scope} [by {group}])"
  }
]
```

The `function` and `group` are optional.

A Series can be further combined together via binary operators (+, -, /, *):

```
metric{scope} [by {group}] operator metric{scope} [by {group}]
```

#### Functions

You can apply functions to the result of each query.

A few of these functions have been further explained in a series of examples. Visit this page for more detail: [Examples][2]

#### Aggregation Method

In most cases, the number of data points available outnumbers the maximum number that can be shown on screen. To overcome this, the data is aggregated using one of 4 available methods: average,  max, min, and sum.

#### Metrics

The metric is the main focus of the graph. You can find the list of metrics available to you in the [Metrics Summary][3]. Click on any metric to see more detail about that metric, including the type of data collected, units, tags, hosts, and more.

#### Scope

A scope lets you filter a Series. It can be a host, a device on a host
or any arbitrary tag you can think of that contains only alphanumeric
characters plus colons and underscores (`[a-zA-Z0-9:_]+`).

Examples of scope (meaning in parentheses):

```
host:my_host                      (related to a given host)
host:my_host, device:my_device    (related to a given device on a given host)
source:my_source                  (related to a given source)
my_tag                            (related to a tagged group of hosts)
my:tag                            (same)
*                                 (wildcard for everything)
```

#### Groups

For any given metric, data may come from a number of hosts. The data is normally aggregated from all these hosts to a single value for each time slot. If you wish to split this out, you can by any tag. To include a data point separated out by each host, use {host} for your group.

#### Arithmetic

You can apply simple arithmetic to a Series (+, -, * and /). In this
example we graph 5-minute load and its double:

```json
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
```

You can also add, substract, multiply and divide a Series. Beware that
Datadog does not enforce consistency at this point so you *can* divide
apples by oranges.

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "metric{apples} / metric{oranges}"
    }
  ]
}
```

### Events

You can overlay any event from Datadog. The general format is:

```json
"events": [
  {
    "q": "search query"
  }
]
```

For instance, to indicate that you want events for host X and tag Y:

```json
"events": [
  {
    "q": "host:X tags:Y"
  }
]
```

or if you're looking to display all errors:

```json
"events": [
  {
    "q": "status:error"
  }
]
```

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

{{< img src="graphing/graphing_json/multi-lines.png" alt="multi lines" responsive="true" >}}

The representation is automatically derived from having multiple `requests` values.

```json
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
```

#### Stacked Series

{{< img src="graphing/graphing_json/slice-n-stack.png" alt="slice and stack" responsive="true" >}}

In the case of related Time Series, you can easily draw them as stacked areas by using the following syntax:

```json
"requests": [
  {
    "q": "metric1{scope}, metric2{scope}, metric3{scope}"
  }
]
```

Instead of one query per chart you can aggregate all queries into one and concatenate the queries.

#### Slice-n-Stack

A useful visualization is to represent a metric shared across
hosts and stack the results. For instance, when selecting a tag that
applies to more than 1 host you see that ingress and egress traffic is nicely stacked to give you the sum as well as the split per host. This is useful to spot wild swings in the distribution of network traffic.

Here's how to do it for any metric:

```json
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
  }
]
```

Note that in this case you can only have 1 query. But you can also split by device, or a combination of both:

```json
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
  }
]
```

to get traffic for all the tagged hosts, split by host and network device.

### Y-Axis Controls

The Datadog y-axis controls allow you to:

*   Clip y-axis to specific ranges
*   Filter series either by specifying a percentage or an absolute value
*   Change y-axis scale from linear to log, sqrt or power scale

There are four configuration settings:

*   `min` (optional): Specifies minimum value to show on y-axis. It takes a number, or "auto" for default behvior. Default value is "auto"
*   `max` (optional): Specifies the maximum value to show on y-axis. It takes a number, or "auto" for default behavior. Default value is "auto"
*   `scale` (optional): Specifies the scale type. Possible values: "linear", "log", "sqrt", "pow##" (eg. pow2, pow0.5, 2 is used if only "pow" was provided"), Default scale is "linear".
*   `units` (optional): Specifies whether to show the metric unit along the y-axis. Possible values: "true" or "false". Default is "false".

Examples:

```json
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
```

#### Filtering

Filter configuration allows you to automatically change y-axis bounds based on a threshold. Thresholds can be a percentage or an absolute value, and it can apply to both both ends of the graph (lower and upper).

For y-axis filtering, there are two ways to set up the configuration.

To begin, there is a simple configuration where you specify an absolute value or a percentage. All top values or all values that sit within the top `X%` are cut off.

Examples:

```json
"yaxis": {
  "filter": 30 // all top 30 values do not appear
}

"yaxis": {
  "filter": "5%" // the top 5% of that data do not appear
}
```

Advanced configuration works the same way as simple configuration, with the added flexibility of configuring the lower or the upper or both parts of the graph. For example, the following configuration limits the graph to data points that are not in the bottom 10% nor in the top 30%.

```json
"yaxis": {
  "filter": {
    "top": "30%",
    "bottom": "10%"
  }
}
```

The following shows all data except those with values higher than 15:

```json
"yaxis": {
  "filter": {
    "top": 15
  }
}
```

The following hides data points below 2:

```json
"yaxis": {
  "filter": {
    "bottom": 2
  }
}
```

Here is a full JSON example:

```json
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
      "bottom": 15
    }
  },
}
```

#### Examples

Here is an example using the `rate()` function, which takes only a single metric as a parameter.  Other functions, with the exception of `top()` and `top_offset()`, have identical syntax.

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "rate(sum:system.load.5{role:intake-backend2} by {host})",
      "stacked": false
    }
  ]
}
```

Here is an example using the `top()` function:

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc')",
      "stacked": false
    }
  ]
}
```

This shows the graphs for the five series with the highest peak `system.cpu.iowait` values in the query window.

To look at the hosts with the 6th through 10th highest values (for example), use `top_offset` instead:

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "top_offset(avg:system.cpu.iowait{*} by {host}, 5, 'max', 'desc', 5)",
      "stacked": false
    }
  ]
}
```

Here is an example using the `week_before()` function:

```json
{
  "viz": "timeseries",
  "requests": [
    {
      "q": "sum:haproxy.count_per_status{status:available} - week_before(sum:haproxy.count_per_status{status:available})"
    }
  ]
}
```

[1]: /graphing
[2]: /graphing/functions
[3]: https://app.datadoghq.com/metric/summary
