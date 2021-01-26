---
title: Request JSON schema
kind: documentation
aliases:
  - /graphing/graphing_json/request_json/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboard using JSON"
- link: "/dashboards/graphing_json/widget_json/"
  tag: "Documentation"
  text: "Widget JSON schema"
---

The general format for the `REQUEST_SCHEMA` is an array of one or more `requests`:

```text
"requests": [
  {
    "q": "function(aggregation method:metric{scope} [by {group}])"
  }
]
```

If your `requests` parameter has multiple `requests`, the widget displays all of them:

```text
"requests": [
  {
    "q": "<METRIC_1>{<SCOPE_1>}"
  },
  {
    "apm_query": "<METRIC_2>{<SCOPE_2>}"
  },
  {
    "log_query": "<METRIC_3>{<SCOPE_3>}"
  }
]
```

{{< img src="dashboards/graphing_json/multi-lines.png" alt="multi lines"  >}}

## Functions

You can apply functions to the result of each query.

For more information about functions explained through a series of examples, see the [examples page][1].

#### Aggregation method

In most cases, the number of data points available outnumbers the maximum number that can be shown on screen. To overcome this, the data is aggregated using one of 4 available methods: average, max, min, and sum.

#### Metrics

Metrics are the main focus of the graph. You can find the list of metrics available to you in the [Metrics Summary][2]. Click on any metric to see more detail about that metric, including the type of data collected, units, tags, hosts, and more.

## Scope

A scope lets you filter a series. It can be a host, a device on a host, or any arbitrary tag you can think of that contains only alphanumeric characters, plus colons and underscores (`[a-zA-Z0-9:_]+`).

Examples of scopes and their meanings:

| Scope                            | Meaning                                    |
|----------------------------------|--------------------------------------------|
| `host:my_host`                   | Related to a given host.                   |
| `host:my_host, device:my_device` | Related to a given device on a given host. |
| `source:my_source`               | Related to a given source.                 |
| `my_tag`                         | Related to a tagged group of hosts.        |
| `my:tag`                         | Same as above.                             |
| `*`                              | Wildcard for everything.                   |

#### Groups

For any given metric, data may come from several hosts. The data is normally aggregated from all these hosts to a single value for each time slot. You can split these out by any tag. To include a data point separated by each host, use {host} for your group.

#### Arithmetic

You can apply simple arithmetic to a series (+, -, * and /).

The following example graphs 5-minute load and its double:

```json
{
  "viz": "timeseries",
  "requests": [
    {"q": "system.load.5{intake} * 2"},
    {"q": "system.load.5{intake}"}
  ]
}
```

You can also add, subtract, multiply, and divide a series. Note that Datadog does not enforce consistency at this point, so you *can* divide apples by oranges.

```json
{"viz": "timeseries", "requests": [{"q": "metric{apples} / metric{oranges}"}]}
```

## Stacked series

{{< img src="dashboards/graphing_json/slice-n-stack.png" alt="slice and stack"  >}}

In the case of related timeseries, you can draw them as stacked areas by using the following syntax:

```text
"requests": [
  {
    "q": "metric1{scope}, metric2{scope}, metric3{scope}"
  }
]
```

Instead of one query per chart, you can aggregate all queries into one and concatenate the queries.

## Slice-n-Stack

You can represent a metric shared across hosts and stack the results. For instance, when selecting a tag that applies to more than 1 host, you see that ingress and egress traffic is nicely stacked to give you the sum as well as the split per host. This is useful to spot wild swings in the distribution of network traffic.

Here's how to do it for any metric:

```text
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag, device:eth0} by {host}"
  }
]
```

Note that in this case, you can only have 1 query. But you can also split by device or a combination of both:

```text
"requests" [
  {
    "q": "system.net.bytes_rcvd{some_tag} by {host,device}"
  }
]
```

To get traffic for all the tagged hosts, split by host and network device.

#### Examples

Here is an example using the `rate()` function, which takes only a single metric as a parameter. Other functions, with the exception of `top()` and `top_offset()`, have identical syntax.

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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/
[2]: https://app.datadoghq.com/metric/summary
