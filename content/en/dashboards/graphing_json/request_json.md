---
title: Request JSON Schema
kind: documentation
aliases:
  - /graphing/graphing_json/request_json/
further_reading:
- link: "/dashboards/graphing_json/"
  tag: "Documentation"
  text: "Building Dashboards using JSON"
- link: "/dashboards/graphing_json/widget_json/"
  tag: "Documentation"
  text: "Widget JSON schema"
---

The general format for the `REQUEST_SCHEMA` is an array of one or more `requests`:

```text

   "requests": [
        {
            "formulas": [
                {
                    "formula": "per_hour(query)"
                },
                {
                    "formula": "query1"
                },
                {
                    "formula": "query1 / 100"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query",
                    "query": "avg:system.load.5{*}"
                },
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": "status:error"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ]
```

## Functions

You can apply functions to the result of each query.

For more information about functions explained through a series of examples, see the [Examples][1] page.

#### Aggregation method

In most cases, the number of data points available outnumbers the maximum number that can be shown on screen. To overcome this, the data is aggregated using one of 4 available methods: average, max, min, and sum.

#### Metrics

Your data source such as metrics, logs, or traces are the main focus of the graph. You can find the list of metrics available to you in the [Metrics Summary][2]. Click on any metric to see more detail about that metric, including the type of data collected, units, tags, hosts, and more.

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
        {
            "formulas": [
                {
                    "formula": "query1"
                },
                {
                    "formula": "2 * query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{*}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```

You can also add, subtract, multiply, and divide a series. **Note**: Datadog does not enforce consistency, so you *can* divide apples by oranges.

```json
{"viz": "timeseries", "requests": [{"q": "metric{apples} / metric{oranges}"}]}
```

## Examples

{{< img src="dashboards/graphing_json/graph_example_for_json.png" alt="Graphing with JSON" style="width:75%;" >}}

Here is the JSON for the above example showing `average` of network bytes received for a specific device and host and grouped by account.

```text
"requests": [
        {
            "formulas": [
                {
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.net.bytes_rcvd{device:eth0,host:dsg-demo-1} by {account}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ]
```


{{< img src="dashboards/graphing_json/rate_example_for_json.png" alt="Rate example" style="width:75%;" >}}

Here is an example using the `rate()` function, which takes only a single metric as a parameter.


```json
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "per_hour(query1)"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{*} by {host}"
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ]
```

Here is the same example as a top list.

```json
{
    "viz": "toplist",
    "requests": [
        {
            "formulas": [
                {
                    "limit": {
                        "count": 10,
                        "order": "desc"
                    },
                    "formula": "query1"
                }
            ],
            "queries": [
                {
                    "data_source": "metrics",
                    "name": "query1",
                    "query": "avg:system.load.5{role:db} by {host}",
                    "aggregator": "avg"
                }
            ],
            "response_format": "scalar",
            "conditional_formats": []
        }
    ]
}
```

Here is an example using the `week_before()` Timeshift function:

```json
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "week_before(query1)"
                }
            ],
            "queries": [
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": ""
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "timeseries",
            "type": "line"
        }
    ]
```

Here is another example showing how to graph a ratio of `error` to `info` logs and then apply a Timeshift function.

{{< img src="dashboards/graphing_json/advanced_graph_example_for_json.png" alt="Ratio example" style="width:75%;" >}}

```json
{
    "viz": "timeseries",
    "requests": [
        {
            "formulas": [
                {
                    "formula": "query1 / query2",
                    "alias": "Ratio of Error to Info"
                },
                {
                    "formula": "week_before(query1 / query2)"
                }
            ],
            "queries": [
                {
                    "data_source": "logs",
                    "name": "query1",
                    "search": {
                        "query": "status:error"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                },
                {
                    "data_source": "logs",
                    "name": "query2",
                    "search": {
                        "query": "status:info"
                    },
                    "indexes": [
                        "*"
                    ],
                    "compute": {
                        "aggregation": "count"
                    },
                    "group_by": []
                }
            ],
            "response_format": "timeseries",
            "type": "line",
            "style": {
                "palette": "dog_classic",
                "type": "solid",
                "width": "normal"
            }
        }
    ],
    "yaxis": {
        "scale": "linear",
        "min": "auto",
        "max": "auto",
        "include_zero": true,
        "label": ""
    },
    "markers": []
}
```


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /dashboards/functions/
[2]: https://app.datadoghq.com/metric/summary
