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
title: 페이지 매김으로 여러 로그 수집
---

## 개요

[로그 API][1]로 반환되는 로그 개수 제한 값인 1000개보다 더 많은 로그 목록을 검색하려면 [페이지 매김 기능][7]을 사용해야 합니다.

{{< tabs >}}

{{% tab "V1 API" %}}

먼저 컨텍스트에서 로그를 가져오는 쿼리를 만듭니다. 예를 들어 특정 시간대의 쿼리를 생성할 수 있습니다.

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

`logs` 파라미터는 Log 개체 배열이고 내 쿼리의 `limit` 파라미터에 정의된 로그 개수만큼 로그를 포함할 수 있습니다. 이 파라미터는 기본적으로 `50`으로 설정되어 있으나 최대 `1000`까지 설정할 수 있습니다. 내 쿼리와 일치하는 로그 개수가 `limit`을 초과할 경우 `nextLogId` 파라미터가 `null`과 같지 않습니다.

**`nextLogId` 파라미터가 `null`이 아닌 다른 값을 반환하는 경우 입력한 쿼리와 일치하는 로그 개수가 반환한 로그 개수보다 더 많음을 뜻합니다.**

로그의 다음 페이지를 가져오려면 쿼리를 다시 전송하되, 이번에는 이전 호출에서 `nextLogId` 값을 가져오는 `startAt` 파라미터를 사용하세요.

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

다음은 결과 예시입니다.

```json
{
  "logs": ["(...)"],
  "nextLogId": "EEEEEEEEEEEEEEEEFFFFFFFFFFFFFFGGGGGGGGGGHHHHHHHHHH",
  "status": "done",
  "requestId": "YVhETk5jQy1TQkDFSFjqU3fhQMh5QXx6M2pSUlA1ODhXNk5PT2NOSUVndThR"
}
```

내 로그의 각 페이지를 보려면 `startAt` 파라미터가 이전 호출의 `nextLogId` 값을 가져오는 쿼리를 계속해서 다시 전송하세요. `nextLogId`에서 `null`을 반환하면 쿼리와 관련된 로그 페이지를 모두 가져왔다는 뜻입니다.

**참고**: 페이지 매김 결과를 효율적으로 제어하려면 절대값 `time` 파라미터를 사용하세요. `now` 키워드를 사용하지마세요.

{{% /tab %}}

{{% tab "V2 API" %}}
먼저 컨텍스트에서 로그를 가져오는 쿼리를 만듭니다. 예를 들어 특정 시간대의 쿼리를 생성할 수 있습니다.

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
`data` 파라미터는 Log 개체 배열이고 내 쿼리의 `limit` 파라미터에 정의된 로그 개수만큼 로그를 포함할 수 있습니다. 이 파라미터는 기본적으로 `50`으로 설정되어 있으나 최대 `1000`까지 설정할 수 있습니다.

내 로그의 다음 페이지를 보려면 `cursor` 파라미터가 이전 호출의 `after` 값을 가져오는 쿼리를 계속해서 다시 전송하세요. `data`에서 `null`을 반환하면 쿼리와 관련된 로그 페이지를 모두 가져왔다는 뜻입니다.

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
다음은 결과 예시입니다.

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

*Logging without Limits는 Datadog, Inc의 상표입니다.

[1]: /ko/api/v1/logs/#get-a-list-of-logs