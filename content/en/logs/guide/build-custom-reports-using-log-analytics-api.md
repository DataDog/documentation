---
title: Build custom reports using Log Analytics API
kind: guide
further_reading:
- link: "/logs/explorer/analytics/?tab=timeseries#overview"
  tag: "Documentation"
  text: "Learn more about Log Analytics"
- link: "/api/v2/logs/#aggregate-events"
  tag: "Documentation"
  text: "Syntax for Log Analytics API"
---


## Overview

You may want to build custom reports and dashboards for your team by combining information from your business alongside log data. To build such reports on metrics from your log data, use the Log Analytics API.[1]

The following examples are covered in this guide:

* [Getting counts](#getting-counts)
* [Getting stats](#getting-stats)
* [Getting percentiles](#getting-percentiles)

## Prerequisites

Since this guide describes usage of the API, you will need an API key and an application key from an admin user. These are available in your [Datadog account API key page][2].

Throughout this article, you will need to replace all occurrences of `<DATADOG_API_KEY>` and `<DATADOG_APP_KEY>` with your Datadog API key and your Datadog application key, respectively.

This guide also assumes that you have a terminal with `CURL`. 

### Getting counts

{{< tabs >}}
{{% tab "Table" %}}

Use the following API call to build a `table` with `count` of log events grouped by the field `status`. The `type` must be `total`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
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
               "order":"desc"
           }
       }
   ]
}'
```

Response:

The result dataset comprises of the `buckets` object as shown below. 

```
{
    "meta": {
        "status": "done",
        "request_id": "OFMxRnFydUdUSWlpVGxLTGRNVW5YUXxoNnB0by1veUhBWjdhVVBUTUl6SXpB",
        "elapsed": 116
    },
    "data": {
        "buckets": [
            {
                "computes": {
                    "c0": 3470
                },
                "by": {
                    "status": "info"
                }
            },
            {
                "computes": {
                    "c0": 49
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
{{% tab "Timeseries" %}}
Use the following API call to build a `timeseries` with `count` of log events grouped by the field `status` rolled up every `1m`. The `type` must be `timeseries`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
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
               "order":"desc"
           }
       }
   ]
}
'
```

Response:

```
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

Use the following API call to build a `table` with `avg` of values in a `metric` such as `@http.response_time` grouped by the field `status`. The `type` must be `total`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
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
               "order":"desc"
           }
       }
   ]
}'
```

Response:

```
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

Use the following API call to build a `table` with `sum` of values in a `metric` such as `@scan_d` grouped by the field `service`. The `type` must be `total`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"sum",
       "metric":"@scan_d"
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
               "order":"desc"
           }
       }
   ]
}'
```
Similarly, you can build an `sum` timeseries by setting `type` as `timeseries`.

Response:

```
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

Use the following API call to build a `table` with `min` of values in a `metric` such as `@scan_d` grouped by the field `service`. The `type` must be `total`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"min",
       "metric":"@scan_d"
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
               "order":"desc"
           }
       }
   ]
}'
```
Similarly, you can build an `min` timeseries by setting `type` as `timeseries`.

Response:

```
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

Use the following API call to build a `table` with `max` of values in a `metric` such as `@scan_d` grouped by the field `service`. The `type` must be `total`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"max",
       "metric":"@scan_d"
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
               "order":"desc"
           }
       }
   ]
}'
```
Similarly, you can build an `max` timeseries by setting `type` as `timeseries`.

Response:

```
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

Use the following API call to build a `table` with `percentiles` of values in a `metric` such as `@scan_d` grouped by the field `service`. The `type` must be `total`. The different percentile values available are `pc75`,`pc90`,`pc95`,`pc98`,and `pc99`.

API call:

```
curl -L -X POST 'https://api.datadoghq.com/api/v2/logs/analytics/aggregate' -H 'Content-Type: application/json' -H 'DD-API-KEY: <DATADOG_API_KEY>' -H 'DD-APPLICATION-KEY: <DATADOG_APP_KEY>' -H 'Cookie: DD-PSHARD=99' --data-raw '{
   "compute":[
   {
       "type":"total",
       "aggregation":"pc99",
       "metric":"@scan_d"
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
               "order":"desc"
           }
       }
   ]
}'
```

Response:

```
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/api/v2/logs/
[2]: https://docs.datadoghq.com/api/v1/authentication/
[3]: https://docs.datadoghq.com/logs/guide/collect-multiple-logs-with-pagination/?tab=v1api

