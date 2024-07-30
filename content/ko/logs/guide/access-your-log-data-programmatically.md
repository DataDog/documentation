---
further_reading:
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색기에 대해 더 알아보기
- link: /logs/explorer/
  tag: 설명서
  text: 검색 구문에 대해 더 알아보기
- link: /logs/search_syntax/
  tag: 설명서
  text: 로그 검색 API용 구문에 대해 더 알아보기
title: 로그 검색 API를 활용하여 로그 데이터에 프로그래밍으로 액세스하기
---


## 개요

[로그 검색 API ][1]을 사용하여 프로그래밍으로 로그 데이터에 액세스하고 쿼리를 실행합니다.

본 지침에서는 다음 예시를 설명합니다.

* [기본 검색](#basic-search)
* [패싯 또는 타임스탬프로 정렬](#sort-by-facet-or-timestamp)
* [검색 결과 수 제한](#limit-the-number-of-results-retrieved)
* [시간 설정](#time-settings)
* [페이지 매김](#pagination)

## 전제 조건

- 로그 검색 API를 사용하려면 [API 키][2]와 [애플리케이션 키][3]가 있어야 합니다. 애플리케이션 키를 생성한 사용자는 데이터에 접근할 수 있는 적절한 권한이 있어야 합니다. 아래 예시를 사용할 때 `<DATADOG_API_KEY>`와 `<DATADOG_APP_KEY>`를 Datadog API 키와 Datadog 애플리케이션 키로 각각 대체하세요.

- 본 지침에서는 `curl` 예제를 제공합니다. [curl][4]이 설치되어 있지 않다면 설치하거나 [로그 API][1]의 본 API 엔드포인트용 추가 언어 예시 부분을 참조합니다.

## 예시

### 기본 검색

특정 기간 내 로그 이벤트를 모두 검색하려면 다음 [검색 구문][5]을 사용하여 API 호출을 완료합니다.

`from`은 `start time`, `to`은 로그 데이터에 대한 `end time` 을 나타냅니다. `query`은 검색 쿼리를 반드시 실행해야 함을 의미합니다.

**API 불러오기:**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  }
}'

```

**응답:**

결과 데이터 세트는 아래의 예제 응답에 명시된 바와 같이 `data` 오브젝트로 구성됩니다.

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIn0"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bquery%5D=%2A&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIn0&page%5Blimit%5D=3&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00"
    }
}

```

### 패싯 또는 타임스탬프별로 정렬

#### 패싯

다음 API 호출을 사용하여 검색한 로그 이벤트를 패싯(예: `pageViews`)에 따라 오름차순으로 정렬합니다. 또한, 패싯에 `@`을 포함합니다. 내림차순으로 정렬하려면 `-` hyphen in front of the facet name such as `-@pageViews`를 사용합니다. 정렬 순서 기본값은 타임스탬프별 내림차순입니다.

**API 불러오기:**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"@pageViews"
}'

```

**응답:**

로그 이벤트는 아래의 응답에 명시된 바와 같이 `pageViews` 패싯 값의 오름차순으로 검색됩니다. 사용자 `chris` 페이지 뷰는 450, `bob` 페이지 뷰는 500, `steve` 페이지 뷰는 700입니다.

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIiwidmFsdWVzIjpbIjcwMCJdfQ"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=%40pageViews&filter%5Bquery%5D=%2A&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWFJZVkpHeHZEUUFBQUFCQldGVkJXRkpaVm1kMlpsa3RiVWRVWmpSQlFRIiwidmFsdWVzIjpbIjcwMCJdfQ&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00"
    }
}

```

#### 타임스탬프

다음 API 호출로 검색한 로그 이벤트는 `timestamp` 값에 따라 오름차순으로 정렬됩니다. 기본값은 내림차순 정렬입니다.

**API 불러오기:**

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
  "sort":"timestamp"
}'

```

**응답:**

로그 이벤트는 아래의 응답에 명시된 것처럼 `timestamp` 값에 따라 오름차순으로 검색됩니다.

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIn0"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=timestamp&filter%5Bquery%5D=%2A&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIn0&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00"
    }
}

```

### 검색 결과 수 제한

다음 API 호출로 검색되는 로그 이벤트 수를 제한합니다. `limit`은 응답에서 반환되는 로그 이벤트의 최대 개수를 의미합니다. 최대 제한값은 `1000`입니다.

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
   "page": {
    "limit":2
  },
  "sort":"-@pageViews"
}'

```

**응답:**

```json

{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:41.909Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "700",
                    "user": "steve",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXRYVJGxvDQAAAABBWFVBWFJZVmd2ZlktbUdUZjRBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:01:57.586Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "bob",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXVNSvuMvWwAAAABBWFVBWFZOU2I2ZWcxX3c2LVVBQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=-%40pageViews&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bquery%5D=%2A&page%5Blimit%5D=2"
    }
}

```

### 시간 설정

`from` 및 `to` 파라미터는 다음과 같습니다.
- ISO-8601 문자열
- 유닉스 타임스탬프(에포크(epoch) 이후 경과한 밀리초를 나타내는 수)
- 한 시간을 더하는 `+1h`나, 현재 시간을 표시하는 `-2d` to subtract two days, etc. The full list includes `s` for seconds, `m` for minutes, `h` for hours, and `d` for days. Optionally, use `now`와 같은 날짜 연산 문자열.

```javascript
{
  "filter": {
    "from": "now-1h",
    "to": "now"
  }
}
```

시간대는 오프셋(예: "UTC+03:00") 또는 지역 시간대(예: "유럽/파리") 형식으로 지정할 수 있습니다. 오프셋과 시간대를 모두 적용한 경우 오프셋이 우선 적용됩니다. 오프셋은 초 단위로 지정해야 합니다.

```javascript
{
  "options": {
    "timeOffset": -1000,
    "timezone": "Europe/Paris"
  }
}
```


### 페이지 매기기

`1000` [로그 제한](#limit-the-number-of-results-retrieved)값보다 더 긴 로그 목록을 검색하려면 페이지 매김 기능을 사용합니다. 

`data` 파라미터는 로그 오브젝트의 배열이며 쿼리에서 `limit` 파라미터로 정의된 로그를 최대한 많이 포함합니다. 해당 파라미터는 기본적으로 `50`이지만 최대 `1000`까지 설정할 수 있습니다. 

로그의 다음 페이지를 확인하려면 이전 호출에서 `after` 값을 가져오는 `cursor` 파라미터로 쿼리를 재전송합니다.

상단의 JSON 예제에서 `after` 값 `eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ` 을 사용하여 다음 두 가지 결과를 얻습니다.

```bash

curl -L -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/logs/events/search" -H "Content-Type: application/json" -H "DD-API-KEY: <DATADOG_API_KEY>" -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" --data-raw '{
  "filter": {
    "from": "2020-10-07T00:00:00+00:00",
    "to": "2020-10-07T00:15:00+00:00",
    "query": "*"
  },
   "page": {
     "cursor": "eyJhZnRlciI6IkFRQUFBWFVBWFZOU3Z1TXZXd0FBQUFCQldGVkJXRlpPVTJJMlpXY3hYM2MyTFZWQlFRIiwidmFsdWVzIjpbIjUwMCJdfQ",
    "limit":2
  },
  "sort":"-@pageViews"
}'

```
**응답:**

응답에서 다음 두 결과 500 `pageviews` `joe` 및 450 `pageviews` `chris`이 검색됩니다. `data`이 `null`을 반환하면 쿼리와 연결된 로그의 모든 페이지를 반환한 것입니다.

```json
{
    "meta": {
        "page": {
            "after": "eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIiwidmFsdWVzIjpbIjQ1MCJdfQ"
        }
    },
    "data": [
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:00:59.733Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "500",
                    "user": "joe",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXHFV1KuyTgAAAABBWFVBWEhGVlZrQmFzdEZ2X2dBQQ"
        },
        {
            "attributes": {
                "status": "info",
                "service": "pageViewService",
                "tags": [
                    "source:postman",
                    "project:test"
                ],
                "timestamp": "2020-10-07T00:02:33.461Z",
                "host": "my.sample.host",
                "attributes": {
                    "hostname": "my.sample.host",
                    "pageViews": "450",
                    "user": "chris",
                    "service": "pageViewService"
                },
                "message": "Sample message"
            },
            "type": "log",
            "id": "AQAAAXUAXd91M9wyTgAAAABBWFVBWGQ5MVZrQmFzdEZ2TG9BQQ"
        }
    ],
    "links": {
        "next": "https://api.datadoghq.com/api/v2/logs/events?sort=-%40pageViews&filter%5Bto%5D=2020-10-07T00%3A15%3A00%2B00%3A00&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWFVBWGQ5MU05d3lUZ0FBQUFCQldGVkJXR1E1TVZaclFtRnpkRVoyVEc5QlFRIiwidmFsdWVzIjpbIjQ1MCJdfQ&filter%5Bfrom%5D=2020-10-07T00%3A00%3A00%2B00%3A00&filter%5Bquery%5D=%2A&page%5Blimit%5D=2"
    }
}

```

**참고:** 페이지 매김 기능 활용 시 상대값 타임스탬프를 사용하면 검색 결과가 누락될 수 있으므로 사용하지 않습니다.

### 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/api/v2/logs/
[2]: /ko/account_management/api-app-keys/#api-keys
[3]: /ko/account_management/api-app-keys/#application-keys
[4]: https://curl.haxx.se/download.html
[5]: /ko/logs/explorer/search_syntax/