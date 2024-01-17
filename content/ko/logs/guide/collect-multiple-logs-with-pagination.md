---
further_reading:
- link: /logs/log_configuration/processors
  tag: 설명서
  text: 로그 처리 방법 알아보기
- link: /logs/log_configuration/parsing
  tag: 설명서
  text: 파싱에 대해 알아보기
- link: /logs/live_tail/
  tag: 설명서
  text: Datadog 라이브 테일 기능
- link: /logs/explorer/
  tag: 설명서
  text: 로그 탐색 방법 보기
- link: /logs/logging_without_limits/
  tag: 설명서
  text: 무제한 로깅*
kind: guide
title: 페이지네이션으로 여러 로그 수집
---

## 개요

[Logs API][1]에서 반환한 최대 1000개 로그 제한보다 긴 로그 목록을 검색하려면 페이지네이션 기능을 사용해야 합니다.

{{< tabs >}}

{{% tab "V1 API" %}}

특정 컨텍스트(예: 설정된 기간의 특정 쿼리)에 대한 로그를 검색하는 쿼리부터 생성하세요.

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
        "limit": 50,
        "query": "*",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

결과 예시:

```json
{
  "logs": ["(...)"],
  "nextLogId": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
  "status": "done",
  "requestId": "cDdWYB0tAm1TYHFsQVZ2R05QWm9nQXx5cFM4aExkLVFPNlhZS21RTGxTUGZ3"
}
```

`logs` 파라미터는 로그 개체의 배열이며 쿼리에서 `limit` 파라미터로 정의된 로그를 최대한 많이 포함합니다. 이 파라미터는 기본적으로 `50`이지만 최대 `1000`까지 설정할 수 있습니다. 쿼리와 일치하는 로그의 양이 `limit`보다 크면 `nextLogId` 파라미터는 `null`과 동일하지 않습니다.

**`nextLogId` 파라미터가 `null` 이외의 항목을 반환하는 경우 이는 입력한 쿼리가 반환된 로그보다 더 많은 로그와 일치함을 나타냅니다**.

로그의 다음 페이지를 검색하려면 쿼리를 다시 보내세요. 단, 이번에는 이전 호출에서 `nextLogId` 값을 가져오는 `startAt` 파라미터를 사용하세요.

```bash
curl -X POST https://api.datadoghq.com/api/v1/logs-queries/list \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
        "limit": 1000,
        "query": "*",
        "startAt": "AAAAAAAAAAAAAAAABBBBBBBBBBBBBBCCCCCCCCCCDDDDDDDDDD",
        "sort": "desc",
        "time": {
            "from": "2019-08-06T00:00:00Z",
            "to": "2019-08-07T00:00:00Z"
        }
    }'
```

다음 결과가 반환됩니다.

```json
{
  "logs": ["(...)"],
  "nextLogId": "EEEEEEEEEEEEEEEEFFFFFFFFFFFFFFGGGGGGGGGGHHHHHHHHHH",
  "status": "done",
  "requestId": "YVhETk5jQy1TQkDFSFjqU3fhQMh5QXx6M2pSUlA1ODhXNk5PT2NOSUVndThR"
}
```

로그의 모든 페이지를 보려면 `startAt` 파라미터가 이전 호출에서 `nextLogId` 값을 가져오는 쿼리를 계속해서 다시 보내세요. `nextLogId`가 `null`을 반환하면 쿼리와 관련된 모든 로그 페이지가 반환된 것입니다.

**참고**: 페이지네이션 결과를 더 효과적으로 제어하려면 `now` 키워드를 사용하지 말고, 절대 `time` 파라미터를 사용하세요. 

{{% /tab %}}

{{% tab "V2 API" %}}
특정 컨텍스트(예: 설정된 기간의 특정 쿼리)에 대한 로그를 검색하는 쿼리부터 생성하세요.

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "limit":50   
        }
}'
```
결과 예시:

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WFUo6EDdggAAAABBWE4tV0ZpTmczX0E2TF9ZV0FBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0&page%5Blimit%5D=1&filter%5Bfrom%5D=1595552579929"
  }
}
```
`data` 파라미터는 로그 개체의 배열이며 쿼리에서 `limit` 파라미터로 정의된 로그를 최대한 많이 포함합니다. 이 파라미터는 기본적으로 `50`이지만 최대 `1000`까지 설정할 수 있습니다. 

로그의 다음 페이지를 보려면 계속해서 쿼리를 다시 보내되 이전 호출에서 `after` 값을 가져오는 `cursor` 파라미터를 포함하세요. `data`가 `null`을 반환하면 쿼리와 관련된 모든 로그 페이지가 반환된 것입니다.

```bash
curl -X POST https://api.datadoghq.com/api/v2/logs/events/search \
-H "Content-Type: application/json" \
-H "DD-API-KEY: ${DD_CLIENT_API_KEY}" \
-H "DD-APPLICATION-KEY: ${DD_CLIENT_APP_KEY}" \
-d '{
      "filter": 
              {
                "from": "2019-08-06T00:00:00Z",
                "to": "2019-08-07T00:00:00Z",
                "query": "@datacenter:us @role:db"
               },
      "page":  
              {
                  "cursor": "eyJhZnRlciI6IkFRQUFBWE4tV0ZVbzZFRGRnZ0FBQUFCQldFNHRWMFpwVG1jelgwRTJURjlaVjBGQlFRIn0",
                  "limit": 50   
        }
}'
```
다음 결과가 반환됩니다.

```json
{
  "meta": {
    "page": {
      "after": "eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0"
    }
  },
  "data": [
    {
      "attributes": {"..."},
      "id": "AQAAAXN-WElw6EDdgQAAAABBWE4tV0UyS2czX0E2TF9ZcWtBQQ",
      "type": "log"
    }
  ],
  "links": {
    "next": "https://api.datadoghq.com/api/v2/logs/events?filter%5Bto%5D=1595552587369&page%5Bcursor%5D=eyJhZnRlciI6IkFRQUFBWE4tV0VsdzZFRGRnUUFBQUFCQldFNHRWMFV5UzJjelgwRTJURjlaY1d0QlFRIn0&page%5Blimit%5D=10&filter%5Bfrom%5D=1595552579929"
  }
}
```

{{% /tab %}}

{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

*Logging without Limits는 Datadog, Inc.의 상표입니다.

[1]: /ko/api/v1/logs/#get-a-list-of-logs