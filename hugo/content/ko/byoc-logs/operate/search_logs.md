---
aliases:
- /ko/cloudprem/operate/search_logs/
description: Datadog에서 BYOC Logs 데이터를 쿼리하고 분석하는 방법 알아보기
further_reading:
- link: /byoc-logs/ingest/
  tag: 설명서
  text: BYOC Logs에 로그 수집
- link: /byoc-logs/operate/troubleshooting/
  tag: 설명서
  text: BYOC Logs 문제 해결
- link: /logs/explorer/search_syntax/
  tag: 설명서
  text: 로그 검색 구문
title: BYOC Logs 검색
---
## Logs 탐색기에서 BYOC Logs 탐색 {#explore-byoc-logs-in-the-logs-explorer}

1. [Datadog Log Explorer][1]로 이동합니다.
2. 왼쪽 패싯 패널의 {{< ui >}}BYOC INDEXES{{< /ui >}} 아래에서 검색할 인덱스를 하나 이상 선택합니다.

특정 인덱스를 선택하여 검색 범위를 좁히거나, 클러스터 내 모든 인덱스를 선택하여 전체적으로 검색할 수 있습니다.

BYOC(Bring Your Own Cloud) Logs 인덱스 이름은 다음 형식을 따릅니다.

```
byoc--<CLUSTER_NAME>--<INDEX_NAME>
```

## BYOC Logs 클러스터 검색 {#search-across-byoc-logs-clusters}

Log 탐색기 또는 공개 Logs API를 사용하여 단일 쿼리로 여러 BYOC Logs 클러스터를 검색합니다. 선택한 클러스터의 결과가 통합됩니다.

### Log 탐색기 사용 {#use-log-explorer}

[Log Explorer][1] 검색창에서 각 클러스터 이름 앞에 `byoc--`를 붙입니다. `index:` 뒤에 있는 괄호 안 이름들을 그룹화하고, `OR`로 구분합니다. 예:

```text
index:(byoc--cluster-1 OR byoc--cluster-2)
```

`cluster-1` 및 `cluster-2`를 BYOC Logs 클러스터 이름으로 바꿉니다.

### Logs API 사용 {#use-the-logs-api}

[로그 검색 엔드포인트][2](`POST /api/v2/logs/events/search`)로 요청을 보냅니다. `filter.query`를 여러 BYOC Logs 클러스터를 지정하는 쿼리로 설정합니다. 예:

```json
{
  "filter": {
    "from": "now-15m",
    "to": "now",
    "query": "index:(byoc--cluster-1 OR byoc--cluster-2)"
  }
}
```

## 검색 제한 사항 {#search-limitations}

BYOC Logs 인덱스는 다른 Datadog 로그 인덱스와 함께 쿼리할 수 없습니다. 또한 Flex Logs는 BYOC Logs와 동시에 지원되지 않습니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs
[2]: /ko/api/latest/logs/#search-logs