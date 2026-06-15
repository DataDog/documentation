---
further_reading:
- link: /logs/explorer/analytics/?tab=timeseries#overview
  tag: 설명서
  text: 로그 분석에 대해 자세히 알아보기
- link: /api/v2/logs/#aggregate-events
  tag: 설명서
  text: 로그 분석 API 구문
- link: /logs/guide/collect-multiple-logs-with-pagination/?tab=v1api
  tag: 설명서
  text: 페이지 매김으로 여러 로그 수집
title: 로그 분석 API를 사용해 커스텀 보고서 빌드하기
---


## 개요

[로그 분석 API][1]를 사용하면 내 비즈니스 데이터 및 로그 데이터와 기타 서비스를 조합해 팀에 맞는 커스텀 보고서와 대시보드를 구축할 수 있습니다.

이 가이드에서는 다음 예시를 설명합니다.

* [개수 보기](#getting-counts)
* [통계 보기](#getting-stats)
* [퍼센트 보기](#getting-percentiles)
* [여러 그룹별, 고유 개수, 메트릭](#multiple-group-bys-unique-counts-and-metrics) 
* [페이지 매김](#pagination)

## 사전 필수 요건

- 로그 분석 API를 사용하려면 [API 키][2]와 [애플리케이션 키][3]가 있어야 합니다. 애플리케이션 키를 생성한 사용자는 데이터에 접근할 수 있는 적절한 권한이 있어야 합니다. 아래 예시를 사용할 때 `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`를 내 Datadog API 키와 Datadog 애플리케이션 키로 각각 대체하세요.

- 또 이 가이드에서는 사용자에게 `curl`이 있는 터미널이 있다고 전제합니다.

## 예시

### 개수 보기

{{< tabs >}}
{{% tab "테이블" %}}

다음 API 호출을 사용해 `status` 필드로 그룹화된 로그 이벤트의 `count`를 나타내는 `table`을 만들 수 있고, 이 테이블에서 상위 항목 3개를 보여줍니다. `type`은 `total`이어야 합니다.

**API 불러오기:**

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

**응답:**

결과 데이터 세트에는 다음 예시 응답과 같이 `buckets` 개체가 포함되어 있습니다. 이 예시에서 `c0`는 `count` 합계를 나타냅니다.

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
{{% tab "시계열" %}}
다음 API 호출을 사용해 `status` 필드로 그룹화된 로그 이벤트의 `count`를 매 `1m` 단위로 나타내는 `timeseries`를 만들 수 있습니다. `type`은 `timeseries`여야 합니다.

**API 호출:**

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

**응답:**

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

### 통계 보기

{{< tabs >}}
{{% tab "평균" %}}

다음 API 호출을 사용해 `@http.response_time`와 같은 `metric`의 `avg` 값을 나타내는 `table`을 만들 수 있습니다. 이 테이블은 `status` 필드로 그룹화되어 나타납니다. `type`은 `total`이어야 합니다.

**API 불러오기:**

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

**응답:**

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

마찬가지로 `type`을 `timeseries`로 설정해 `avg` 시계열을 만들 수도 있습니다.

{{% /tab %}}
{{% tab "합계" %}}

다음 API 호출을 사용해 `@http.response_time`와 같은 `metric`의 `sum` 값을 나타내는 `table`을 만들 수 있습니다. 이 테이블은 `service` 필드로 그룹화되어 나타납니다. `type`은 `total`이어야 합니다.

**API 불러오기:**

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
마찬가지로 `type`을 `timeseries`로 설정해 `sum` 시계열을 만들 수 있습니다.

**응답:**

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
{{% tab "최솟값" %}}

다음 API 호출을 사용해 `@http.response_time`와 같은 `metric`의 `min` 값을 나타내는 `table`을 만들 수 있습니다. 이 테이블은 `service` 필드로 그룹화되어 나타납니다. `type`은 `total`이어야 합니다.

**API 불러오기:**

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
마찬가지로 `type`을 `timeseries`로 설정해 `min` 시계열을 만들 수 있습니다.

**응답:**

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
{{% tab "최댓값" %}}

다음 API 호출을 사용해 `@http.response_time`와 같은 `metric`의 `max` 값을 나타내는 `table`을 만들 수 있습니다. 이 테이블은 `service` 필드로 그룹화되어 나타납니다. `type`은 `total`이어야 합니다.

**API 불러오기:**

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
마찬가지로 `type`을 `timeseries`로 설정해 `max` 시계열을 만들 수도 있습니다.

**응답:**

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

### 퍼센트 보기

다음 API 호출을 사용해 `@http.response_time`와 같은 `metric`의 `percentiles` 값을 나타내는 `table`을 만들 수 있습니다. 이 테이블은 `service` 필드로 그룹화되어 나타납니다. `type`은 `total`이어야 합니다. 사용할 수 있는 다른 퍼센트 값은 `pc75`, `pc90`, `pc95`, `pc98`, `pc99`입니다.

**API 불러오기:**

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

**응답:**

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
마찬가지로 `type`을 `timeseries`로 설정해 `percentile` 시계열을 만들 수 있습니다.

### 여러 그룹별, 고유 개수, 메트릭

다음 API 호출을 사용해 `OS` 및 `Browser`와 같은 `facets`별 로그 데이터의 세부 내역을 표시하는 `table`을 만들 수 있습니다. 또 `useragent`의 고유 개수, `duration` 메트릭의 `pc90`, `network.bytes_written` 메트릭의 `avg`, 로그 이벤트의 총 `count` 등 여러 메트릭을 계산할 수 있습니다.   

**API 불러오기:**

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

**응답:**

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
응답에서 `c0`는 `useragent`의 고유 개수이고, `c1`은 `duration` 메트릭의 `pc90`이고, `c2`은 `network.bytes_written` 메트릭의 `avg`이고, `c3`은 로그 이벤트의 총 `count`입니다.

### 페이지 매김

다음 API 호출을 사용해 패싯별(`service` 및 `status`) 로그 데이터의 세부 내역을 보여주는 `table`을 만들 수 있습니다. 이 테이블에서 결과를 `service`별로 오름차순 정렬하고 `limit`를 사용해 결과 세트에 페이지를 매길 수 있습니다.

**API 불러오기:**

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

**응답:**

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
다음 결과 세트에 페이지를 매기고 액세스하려면 `page` 옵션을 사용하고 `cursor` 값을 이전 호출의 `after` 값으로 설정하세요.

**API 불러오기:**
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

**응답:**

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

**참고:** 페이지 매김은 위 예시와 같이 `sort`가 `alphabetical`로 되어 있을 때만 지원됩니다. 카디널리티가 높고 여러 그룹별로 정리된 보고서를 만들려면 별도의 API 호출을 만드세요. 예를 들어 `session id`마다 `url paths`의 여러 메트릭을 보여주는 보고서를 만들려면 별도의 API 호출을 만들 수 있습니다. 첫 번째 호출에서 정렬된 `sessions ids` 전체를 반환하도록 한 뒤, 이 결과를 사용해 각 `session id`의 `url paths` 메트릭을 얻을 수 있습니다.                  

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/api/v2/logs/
[2]: /ko/account_management/api-app-keys/#api-keys
[3]: /ko/account_management/api-app-keys/#application-keys