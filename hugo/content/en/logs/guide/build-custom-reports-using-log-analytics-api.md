---
title: Build custom reports using Log Analytics API

further_reading:
- link: "/logs/explorer/analytics/?tab=timeseries#overview"
  tag: "Documentation"
  text: "Learn more about Log Analytics"
- link: "/api/v2/logs/#aggregate-events"
  tag: "Documentation"
  text: "Syntax for Log Analytics API"
- link: "/logs/guide/collect-multiple-logs-with-pagination/?tab=v1api"
  tag: "Documentation"
  text: "Collect multiple logs with Pagination" 
---


## Overview

Use the [Log Analytics API][1] to quickly build custom reports and dashboards for your team by combining information from your business and other services alongside log data.

The following examples are covered in this guide:

* [Getting counts](#getting-counts)
* [Getting stats](#getting-stats)
* [Getting percentiles](#getting-percentiles)
* [Multiple group-bys, unique counts, and metrics](#multiple-group-bys-unique-counts-and-metrics) 
* [Pagination](#pagination)

## Prerequisites

- Use of the Log Analytics API requires an [API key][2] and an [application key][3]. The user who created the application key must have the appropriate permission to access the data. To use the examples below, replace `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively.

- This guide also assumes that you have a terminal with `curl`.

## Examples

### Getting counts

{{< tabs >}}
{{% tab "Table" %}}

With the following API call, build a `table` with `count` of log events grouped by the field `status` and showing the top 3 items. The `type` must be `total`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"count"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type": "measure",
               "aggregation":"count"
           },
           "limit":3
       }
   ]
}'
```

**Response:**

The result dataset comprises the `buckets` object as shown in the following sample response. In this example, `c0` represents the total `count`.

```json
{
    "meta": {
        "status": "done",
        "request_id": "MlNkM2lwdXpSMXExVndrWldqV2F0d3xYU1dqejF1Qm9QbU1STnF6RVQ4M3Jn",
        "page": {
            "after": "eyJhZnRlciI6eyJzdGF0dXMiOlsid2FybiIsIm5vdGljZSIsImluZm8iXX19"
        },
        "elapsed": 399
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 644291
                },
                "by": {
                    "status": "warn"
                }
            },
            {
                "computes": {
                    "c0": 223652
                },
                "by": {
                    "status": "notice"
                }
            },
            {
                "computes": {
                    "c0": 2886959
                },
                "by": {
                    "status": "info"
                }
            }
        ]
    }
}

```
{{% /tab %}}
{{% tab "Timeseries" %}}
With the following API call, build a `timeseries` with `count` of log events grouped by the field `status` rolled up every `1m`. The `type` must be `timeseries`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"timeseries",
       "aggregation":"count",
       "interval":"1m"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type": "measure",
               "aggregation":"count"
           }
       }
   ]
}
'
```

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "U1VfQTc4M19SWldjNkJFUkh2R2R1Z3w3Uk9lajlmQklnUnZyQnpCV0k1Tmtn",
        "elapsed": 152
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": [
                        {
                            "value": 1856,
                            "time": "2020-08-10T19:00:00.000Z"
                        },
                        {
                            "value": 1614,
                            "time": "2020-08-10T19:01:00.000Z"
                        }
                    ]
                },
                "by": {
                    "status": "info"
                }
            },
            {
                "computes": {
                    "c0": [
                        {
                            "value": 25,
                            "time": "2020-08-10T19:00:00.000Z"
                        },
                        {
                            "value": 24,
                            "time": "2020-08-10T19:01:00.000Z"
                        }
                    ]
                },
                "by": {
                    "status": "error"
                }
            }
        ]
    }
}

```

{{% /tab %}}
{{< /tabs >}}

### Getting stats

{{< tabs >}}
{{% tab "Average" %}}

With the following API call, build a `table` with `avg` of values in a `metric` such as `@http.response_time` grouped by the field `status`. The `type` must be `total`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"avg",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"avg",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "ZHZlZ1Myek1UMjZDYXZ4am16bFFnUXxIa1BPa3ZwYi1iYW5vM0JzQWNEQ2NB",
        "elapsed": 429
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 2317.284155937053
                },
                "by": {
                    "status": "warn"
                }
            },
            {
                "computes": {
                    "c0": 119.5178351086976
                },
                "by": {
                    "status": "ok"
                }
            },
            {
                "computes": {
                    "c0": 54.850206927300384
                },
                "by": {
                    "status": "info"
                }
            }
        ]
    }
}
```

Similarly, you can build an `avg` timeseries by setting `type` as `timeseries`.

{{% /tab %}}
{{% tab "Sum" %}}

With the following API call, build a `table` with `sum` of values in a `metric` such as `@http.response_time` grouped by the field `service`. The `type` must be `total`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"sum",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"sum",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```
Similarly, build a `sum` timeseries by setting `type` as `timeseries`.

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "SDZMOEZDOW1RUHFaXzc5M1FWSmFTQXxaRHJxZnNuNFVnXzdYRkZ5cjJtMGRB",
        "elapsed": 412
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 30486.0
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 16113.0
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```

{{% /tab %}}
{{% tab "Min" %}}

With the following API call, build a `table` with `min` of values in a `metric` such as `@http.response_time` grouped by the field `service`. The `type` must be `total`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"min",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"min",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```
Similarly, build a `min` timeseries by setting `type` as `timeseries`.

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "S1FPbUJVUWVSZk9vUFVQdEdNeGhyQXw2Sk9ZcHpiWkZHa0tVYll1LTUyOGZ3",
        "elapsed": 427
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 2440.0
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 294.0
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```

{{% /tab %}}
{{% tab "Max" %}}

With the following API call, build a `table` with `max` of values in a `metric` such as `@http.response_time` grouped by the field `service`. The `type` must be `total`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"max",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"max",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```
Similarly, you can build a `max` timeseries by setting `type` as `timeseries`.

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "eEtaMk1rVUlUU1NseWlTWnR5R1VDd3xIa1BPa3ZwYi1iYW5vM0JzQWNEQ2NB",
        "elapsed": 338
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 23456.0
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 8399.0
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```

{{% /tab %}}
{{< /tabs >}}

### Getting percentiles

With the following API call, build a `table` with `percentiles` of values in a `metric` such as `@http.response_time` grouped by the field `service`. The `type` must be `total`. The different percentile values available are `pc75`,`pc90`,`pc95`,`pc98`,and `pc99`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"pc99",
       "metric":"@http.response_time"
   }],
   "filter": {
       "from":"1597086000000",
       "to":"1597086120000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"desc",    
               "type": "measure",
               "aggregation":"pc99",
               "metric":"@http.response_time"
           }
       }
   ]
}'
```

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "SWlGQVh2YkpRaTJvalprbUFDWmFCQXxIa1BPa3ZwYi1iYW5vM0JzQWNEQ2NB",
        "elapsed": 513
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 23078.68
                },
                "by": {
                    "service": "abc"
                }
            },
            {
                "computes": {
                    "c0": 8379.42
                },
                "by": {
                    "service": "xyz"
                }
            }
        ]
    }
}
```
Similarly, build a `percentile` timeseries by setting `type` as `timeseries`.

### Multiple group-bys, unique counts, and metrics

With the following API call, build a `table` to display the breakdown of your log data by `facets` such as `OS` and `Browser` and calculate different metrics such as unique count of `useragent`, `pc90` of metric `duration`, `avg` of metric `network.bytes_written`, and the total `count` of log events.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"cardinality",
       "metric":"@http.useragent"
   },
   {
       "type":"total",
       "aggregation":"pc90",
       "metric":"@duration"
   },
   {
       "type":"total",
       "aggregation":"avg",
       "metric":"@network.bytes_written"
   },
   {
       "type":"total",
       "aggregation":"count"
   }
   ],
   "filter": {
       "from":"1597428000000",
       "to":"1597428180000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"@http.useragent_details.os.family",
           "limit":2,
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"cardinality",
               "metric":"@http.useragent"
           }
       },
       {
           "type":"facet",
           "facet":"@http.useragent_details.browser.family",
           "limit":2,
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"cardinality",
               "metric":"@http.useragent"
           }
       }
   ]
}
'

```

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "dkt3bGhON0lSOEdCVWFqa3pyUEtNUXxzU0p5RG1qN3MwNk45aExrazFGTTR3",
        "elapsed": 1299
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c3": 534310,
                    "c2": 29855.686900195342,
                    "c1": 289880482.9557167,
                    "c0": 430
                },
                "by": {
                    "@http.useragent_details.browser.family": "Chrome",
                    "@http.useragent_details.os.family": "Mac OS X"
                }
            },
            {
                "computes": {
                    "c3": 47973,
                    "c2": 25117.50770936209,
                    "c1": 270379443.2579185,
                    "c0": 64
                },
                "by": {
                    "@http.useragent_details.browser.family": "Firefox",
                    "@http.useragent_details.os.family": "Mac OS X"
                }
            },
            {
                "computes": {
                    "c3": 901506,
                    "c2": 9170.975124352715,
                    "c1": 235075236.08510733,
                    "c0": 342
                },
                "by": {
                    "@http.useragent_details.browser.family": "Other",
                    "@http.useragent_details.os.family": "Other"
                }
            },
            {
                "computes": {
                    "c3": 2734,
                    "c2": 953181.3177150192,
                    "c1": 200800000.00000006,
                    "c0": 45
                },
                "by": {
                    "@http.useragent_details.browser.family": "Apache-HttpClient",
                    "@http.useragent_details.os.family": "Other"
                }
            }
        ]
    }
}

```
In the response, `c0` represents the unique count of `useragent`, `c1` represents the `pc90` of metric `duration`, `c2` represents the `avg` of metric `network.bytes_written`, and `c3` represents the total `count` of log events.

### Pagination

The following API call builds a `table` to display the breakdown of your log data by facets (such as `service` and `status`), sorts the results by `service` in ascending order, and paginates over the result set using `limit`.

**API call:**

```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"count"
   }],
   "filter": {
       "from":"1611118800000",
       "to":"1611205140000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"asc"
           },
           "limit":2
       },
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"count"
           }
       }
   ]
}'

```

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "MjZUNF9qRG1TaG1Tb01JenhBV2tYd3x3VTNjTUhIQUdaRUZKajQ0YTBqdmZn",
        "page": {
            "after": "eyJhZnRlciI6eyJzZXJ2aWNlIjpbImFjdGl2YXRvciIsImFkLWF1Y3Rpb24iXX19"
        },
        "elapsed": 5923
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 312
                },
                "by": {
                    "status": "info",
                    "service": "activator"
                }
            },
            {
                "computes": {
                    "c0": 405606
                },
                "by": {
                    "status": "info",
                    "service": "ad-auction"
                }
            },
            {
                "computes": {
                    "c0": 124
                },
                "by": {
                    "status": "error",
                    "service": "ad-auction"
                }
            }
        ]
    }
}

```
To paginate and access the next set of results, use `page` option and set the `cursor` value to the `after` value from the previous call. 

**API call:**
```bash
curl -L -X POST "https://api.datadoghq.com/api/v2/logs/analytics/aggregate" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"count"
   }],
   "filter": {
       "from":"1611118800000",
       "to":"1611205140000",
       "query":"*"
           },
   "group_by":[
       {
           "type":"facet",
           "facet":"service",
           "sort":{
               "order":"asc"
           },
           "limit":2
       },
       {
           "type":"facet",
           "facet":"status",
           "sort":{
               "order":"desc",
               "type":"measure",
               "aggregation":"count"
           }
       }
   ],
   "page":{
       "cursor":"eyJhZnRlciI6eyJzZXJ2aWNlIjpbImFjdGl2YXRvciIsImFkLWF1Y3Rpb24iXX19"
   }
}'

```

**Response:**

```json
{
    "meta": {
        "status": "done",
        "request_id": "aVM2Y2VVMUZReVNmLVU4ZzUwV1JnUXxRWkVjamNHZU9Ka21ubjNDbHVYbXJn",
        "page": {
            "after": "eyJhZnRlciI6eyJzZXJ2aWNlIjpbImFjdGl2YXRvciIsImFkLWF1Y3Rpb24iLCJhZC1zZXJ2ZXIiLCJhZGRvbi1yZXNpemVyIl19fQ"
        },
        "elapsed": 6645
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 24740759
                },
                "by": {
                    "status": "info",
                    "service": "ad-server"
                }
            },
            {
                "computes": {
                    "c0": 2854331
                },
                "by": {
                    "status": "error",
                    "service": "ad-server"
                }
            },
            {
                "computes": {
                    "c0": 139
                },
                "by": {
                    "status": "error",
                    "service": "addon-resizer"
                }
            }
        ]
    }
}
```

**Note:** Paging is only supported if `sort` is `alphabetical` for at least one facet as shown in above example. To build a report with multiple group-bys with high cardinality facets, make separate API calls. For example, to build a report showing different metrics for `url paths` for every `session id`, make separate API calls. The first call would return all `sessions ids` sorted and you would use these results to get the metrics for `url paths` for each `session id`.

### Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v2/logs/
[2]: /account_management/api-app-keys/#api-keys
[3]: /account_management/api-app-keys/#application-keys
