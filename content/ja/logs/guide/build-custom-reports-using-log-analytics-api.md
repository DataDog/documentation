---
title: ログ分析 API を使用したカスタムレポートの構築
kind: ガイド
further_reading:
  - link: '/logs/explorer/analytics/?tab=timeseries#overview'
    tag: Documentation
    text: ログ分析に関する詳細
  - link: '/api/v2/logs/#aggregate-events'
    tag: Documentation
    text: ログ分析 API の構文
  - link: /logs/guide/collect-multiple-logs-with-pagination/?tab=v1api
    tag: Documentation
    text: ページ区切りで複数のログを収集する
---
## 概要

[ログ分析 API][1] を使用すると、ビジネスや他のサービスの情報とログデータを併せたチームのカスタムレポートおよびダッシュボードをすばやく構築できます。

このガイドでは、以下の例についてご説明します、

* [件数の取得](#getting-counts)
* [分析の取得](#getting-stats)
* [パーセンタイルの取得](#getting-percentiles)
* [複数のグループ化、ユニークカウント、メトリクス](#複数のグループ化、ユニークカウント、メトリクス) 
* [ページ区切り](#pagination)

## 前提条件

本ガイドは API の使用手順を説明するため、管理者ユーザーからの API キーとアプリケーションキーが必要となります。これらは [Datadog アカウントの API キーページ][2]にあります。

この記事をとおして、`<Datadog_API_キー >` および `<Datadog_アプリケーションキー >` はそれぞれご使用中の Datadog API キーおよび Datadog アプリケーションキーに置き換えて進めてください。

また、本ガイドでは `CURL` に対応するターミナルであることを前提としています。

**注:** Datadog EU サイトの場合、https://api.datadoghq.eu/api/  をエンドポイントとして使用してください。

## 例

### 件数の取得

{{< tabs >}}
{{% tab "Table" %}}

以下の API 呼び出しでは、`status` フィールドによりグループ化されたログイベントの `count` を含み、上位 3 項目を表示する `table` を構築します。`type` は `total` である必要があります。

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

結果のデータセットは、以下の応答サンプルに示されるように `buckets` オブジェクトで構成されます。この例では、`c0` は合計 `count` を表します。

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
以下の API 呼び出しでは、`1m` ごとにロールアップされる、`status` フィールドによりグループ化されたログイベントの `count` と `timeseries` を構築します。`type` は `timeseries` である必要があります。

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

### 分析の取得

{{< tabs >}}
{{% tab "Average" %}}

以下の API 呼び出しでは、`status` フィールドによりグループ化された、`@http.response_time` のような `metric` の値の `avg` を含む `table` を構築します。`type` は `total` である必要があります。

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

同様に、`type` を `timeseries` と設定することで `avg` 時系列を構築できます。

{{% /tab %}}
{{% tab "Sum" %}}

以下の API 呼び出しでは、`service` フィールドによりグループ化された、`@http.response_time` のような `metric` の値の `sum` を含む `table` を構築します。`type` は `total` である必要があります。

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
同様に、`type` を `timeseries` と設定することで `sum` 時系列を構築できます。

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

以下の API 呼び出しでは、`service` フィールドによりグループ化された、`@http.response_time` のような `metric` の値の `min` を含む `table` を構築します。`type` は `total` である必要があります。

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
同様に、`type` を `timeseries` と設定することで `min` 時系列を構築できます。

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

以下の API 呼び出しでは、`service` フィールドによりグループ化された、`@http.response_time` のような `metric` の値の `max` を含む `table` を構築します。`type` は `total` である必要があります。

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
同様に、`type` を `timeseries` と設定することで `max` 時系列を構築できます。

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

### パーセンタイルの取得

以下の API 呼び出しでは、`service` フィールドによりグループ化された、`@http.response_time` のような `metric` の値の `percentiles` を含む `table` を構築します。`type` は `total` である必要があります。利用可能なパーセンタイル値は、`pc75`、`pc90`、`pc95`、`pc98`、`pc99` です。

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
同様に、`type` を `timeseries` と設定することで `percentile` 時系列を構築できます。

### 複数のグループ化、ユニークカウント、メトリクス

以下の API 呼び出しで、`OS` や `Browser` などの `facets` 別のログデータの詳細を表示する `table` を構築し、`useragent` のユニークカウント、メトリクスの `duration` の `pc90`、メトリクスの `network.bytes_written` の `avg`、ログイベントの 合計 `count` など、さまざまなメトリクスを計算できます。

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
応答で、`c0` は `useragent` のユニークカウントを、`c1` はメトリクスの `duration` の `pc90` を、`c2` はメトリクスの `network.bytes_written` の `avg` を、`c3` はログイベントの合計 `count` を表します。

### ページ区切り

以下の API 呼び出しで、`service` や `status` などファセット別のログデータの詳細を表示する `table` を構築し、結果を `service` ごとに昇順で並べ替え、`limit` を使用して結果セットをページに軸切ります。

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
ページを区切り次の結果セットにアクセスするには、 `page` オプションを使用して `cursor` の値を以前の呼び出しから `after` の値に設定します。

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

**注:** ページングは、上記の例で示されるとおり、1 つ以上のファセットで `sort` が `alphabetical` の場合のみサポートされます。細かい粒度のファセットを持つ複数のグループ化を含むレポートを構築するには、別々の API 呼び出しを作成します。たとえば、各 `session id` に対し `url paths` の異なるメトリクスを表示するレポートを構築する場合は、別々の API 呼び出しを作成します。最初の呼び出しは、`sessions ids` がソートされて返されるため、この結果を使用して各 `session id` に対する `url paths` のメトリクスを取得できます。

### その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/api/v2/logs/
[2]: https://docs.datadoghq.com/ja/api/v1/authentication/