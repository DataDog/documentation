---
aliases:
- /kr/graphing/graphing_json/request_json/
further_reading:
- link: /dashboards/graphing_json/
  tag: 설명서
  text: JSON을 사용하여 대시보드 구축
- link: /dashboards/graphing_json/widget_json/
  tag: 설명서
  text: 위젯 JSON 스키마
kind: 설명서
title: JSON 스키마 요청
---

`REQUEST_SCHEMA`의 일반 형식은 하나 이상의 `requests`의 배열입니다.

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

## 함수

각 쿼리의 결과에 함수를 적용할 수 있습니다.

일련의 예시를 통해 설명하는 함수에 대한 자세한 내용은 [Examples][1] 페이지를 참조하세요.

#### 집계 방법

대부분의 경우 사용 가능한 데이터 포인트의 수가 화면에 표시할 수 있는 최대 수보다 많습니다. 이를 극복하기 위해 평균, 최대, 최소 및 합계의 4가지 방법 중 하나를 사용하여 데이터를 집계합니다.

#### 메트릭

메트릭, 로그 또는 트레이스와 같은 데이터 소스는 그래프의 주요 요소에 해당합니다. [Metrics Summary][2]에서 사용 가능한 메트릭 목록을 찾을 수 있습니다. 메트릭을 클릭하면 수집된 데이터 유형, 단위, 태그, 호스트 등을 포함하여 해당 메트릭에 대한 자세한 정보를 볼 수 있습니다.

## 범위

범위를 사용하면 시리즈를 필터링할 수 있습니다. 이는 호스트, 호스트의 장치 또는 영숫자 문자와 콜론 및 밑줄(`[a-zA-Z0-9:_]+`)만 포함한다고 생각할 수 있는 임의의 태그일 수 있습니다.

범위 및 그 의미의 예시는 다음과 같습니다.

| 범위                            | 의미                                    |
|----------------------------------|--------------------------------------------|
| `host:my_host`                   | 주어진 호스트와 관련됩니다.                   |
| `host:my_host, device:my_device` | 주어진 호스트의 주어진 장치와 관련됩니다. |
| `source:my_source`               | 주어진 소스와 관련됩니다.                 |
| `my_tag`                         | 태그가 지정된 호스트 그룹과 관련됩니다.        |
| `my:tag`                         | 위와 같습니다.                             |
| `*`                              | 모든 요소의 와일드카드에 해당합니다.                   |

#### 그룹

주어진 메트릭과 관련하여, 데이터는 여러 호스트에서 비롯할 수 있습니다. 데이터는 일반적으로 이러한 모든 호스트부터 각 시간 슬롯의 단일 값까지에서 집계됩니다. 모든 태그로 분할 작업을 수행할 수 있습니다. 각 호스트로 구분된 데이터 포인트를 포함하려면 그룹의 {호스트}를 사용하세요.

#### 산술

시리즈에 간단한 산술(+, -, * 및 /)을 적용할 수 있습니다.

5분 로드와 그 두 배를 그래프화한 예시는 다음과 같습니다.

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

또한 시리즈를 더하고, 빼고, 곱하고, 나눌 수 있습니다. **참고**: Datadog은 일관성을 적용하지 않으므로, 사과를 오렌지로 나눌 수 *있습니다*.

```json
{"viz": "timeseries", "requests": [{"q": "metric{apples} / metric{oranges}"}]}
```

## 예시

{{< img src="dashboards/graphing_json/graph_example_for_json.png" alt="JSON을 이용하여 그래프화하기" style="width:75%;" >}}

이는 특정 장치 및 호스트에 대해 수신되고 계정별로 그룹화된 네트워크 바이트의 `average`을(를) 보여주는 위 예시에 대한 JSON입니다.

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


{{< img src="dashboards/graphing_json/rate_example_for_json.png" alt="비율 예시" style="width:75%;" >}}

이는 하나의 메트릭만 파라미터로 사용하는 `rate()` 함수를 사용하는 예시에 해당합니다.


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

이는 상위 목록과 동일한 예시에 해당합니다.

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

이는 `week_before()` 타임시프트 함수를 사용하는 예시에 해당합니다.

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

이는 `info` 로그에 대한 `error`의 비율을 그래프화한 다음 타임시프트 함수를 적용하는 방법을 보여주는 또 다른 예시에 해당합니다.

{{< img src="dashboards/graphing_json/advanced_graph_example_for_json.png" alt="비율 예시" style="width:75%;" >}}

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


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/dashboards/functions/
[2]: https://app.datadoghq.com/metric/summary