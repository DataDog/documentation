---
aliases:
- /ko/cloudprem/guides/query_logs_with_mcp/
description: BYOC Logs 인덱스에 저장된 로그를 Datadog MCP 서버를 이용해 쿼리하는 방법 알아보기
further_reading:
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: 문서
  text: VS Code 및 Cursor용 Datadog 확장
- link: /byoc-logs/operate/search_logs/
  tag: 문서
  text: BYOC Logs에서 로그 검색
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: 블로그
  text: Datadog MCP 서버 소개
- link: https://www.datadoghq.com/blog/byoc-cross-cluster-queries/
  tag: 블로그
  text: 팀과 AI 에이전트를 위한 클러스터 간 쿼리로 Datadog BYOC 전반에서 데이터 통합하기
title: Datadog MCP Server로 BYOC Logs 쿼리하기
---
## 개요 {#overview}

[Datadog MCP(Model Context Protocol) Server][1]의 `search_datadog_logs` 도구를 사용하여 BYOC(Bring Your Own Cloud) Logs 인덱스에 저장된 로그를 쿼리할 수 있습니다. AI 기반 도구 및 통합을 통해 이 도구에 액세스할 수 있습니다.

**참고**: BYOC Logs 인덱스는 `search_datadog_logs`에서만 지원됩니다. `analyze_datadog_logs` 도구와 `datadog/querying-patterns` 스킬은 BYOC Logs 인덱스를 지원하지 않습니다.

## 전제 조건 {#prerequisites}

- 로그가 수집된 실행 중인 BYOC Logs 배포 환경.
- [Datadog MCP 서버][1]에 대한 액세스 권한.
- BYOC Logs 인덱스 이름([Datadog 로그 탐색기][2]의 {{< ui >}}BYOC INDEXES{{< /ui >}}에서 확인 가능).

## BYOC Logs 쿼리{#querying-byoc-logs}

BYOC Logs 인덱스에 저장된 로그를 쿼리하려면 `search_datadog_logs`를 사용하고 표준 로그 쿼리 외에 BYOC Logs 인덱스 이름을 지정합니다.

최상의 결과를 얻으려면 프롬프트에 **다음 항목도 포함해야 합니다**.
- (권장) 시간 범위(예: '지난 1시간', '지난 24시간')
- (권장) 쿼리 필터(서비스, 상태, 로그 내용)

### 쿼리 파라미터 {#query-parameters}
다음 표는 `search_datadog_logs`와 함께 사용되는 주요 파라미터를 설명합니다.

| 파라미터 | 설명 | 예시 |
|-----------|-------------|---------|
| `query` | Datadog 쿼리 구문을 사용한 로그 검색 쿼리 | `"*"`(모든 로그), `"service:web"`, `"status:error"` |
| `indexes` | 검색할 BYOC Logs 인덱스 이름 배열 | `["byoc--dev--main"]` |
| `from` | 쿼리 시작 시간 | `"now-1h"`, `"now-24h"`, `"2024-01-15T00:00:00Z"` |
| `to` | 쿼리 종료 시간 | `"now"`, `"2024-01-15T23:59:59Z"` |
| `sort` | 결과 정렬 순서 | `"-timestamp"`(내림차순), `"timestamp"`(오름차순) |

파라미터 및 자연어 쿼리의 예는 [고급 쿼리 예시](#advanced-query-examples)를 참조하세요.

### BYOC Logs 인덱스 이름 찾기 {#finding-your-byoc-logs-index-name}

BYOC Logs 인덱스 이름을 찾으려면 다음 단계를 따르세요.

1. [Datadog 로그 탐색기][2]로 이동합니다.
2. 왼쪽 패싯 패널에서 {{< ui >}}BYOC INDEXES{{< /ui >}} 섹션을 찾습니다.
3. 해당 위치에 `byoc--<cluster_name>--<index_name>` 형식으로 BYOC Logs 인덱스가 나열됩니다.

클러스터를 선택하고 {{< ui >}}View Indexes{{< /ui >}}를 클릭하여 [BYOC Logs 콘솔][3]에서도 인덱스 이름을 찾을 수 있습니다.

## 고급 쿼리 예시 {#advanced-query-examples}

`search_datadog_logs`와 함께 AI 기반 도구를 사용하면 자연어로 질문할 수 있습니다. 이 도구는 질문을 올바른 형식의 BYOC Logs 쿼리로 변환합니다.

### 특정 서비스의 오류 로그 {#error-logs-from-a-specific-service}
**프롬프트**:
"지난 1시간 동안 byoc--dev--main 인덱스에서 nginx 서비스의 오류 로그를 보여줘."

**변환된 쿼리**:

```json
{
  "query": "service:nginx status:error",
  "indexes": ["byoc--dev--main"],
  "from": "now-1h",
  "to": "now"
}
```

### 특정 로그 내용 검색 {#search-for-specific-log-content}
**프롬프트**:
"지난 24시간 동안 byoc--prod--main 인덱스에서 API 서비스의 'connection timeout'을 포함한 로그를 찾아줘."

**변환된 쿼리**:

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["byoc--prod--main"],
  "from": "now-24h",
  "to": "now"
}
```

### HTTP 상태 코드로 필터링 {#filter-by-http-status-code}
**프롬프트**:
"지난 1일 동안 byoc--prod--main 인덱스에서 상태 코드 500인 모든 로그를 가져와줘."

**변환된 쿼리**:

```json
{
  "query": "status:500",
  "indexes": ["byoc--prod--main"],
  "from": "now-1d",
  "to": "now"
}
```

## 중요 참고 사항 {#important-notes}

- `indexes` 파라미터에는 유효한 BYOC Logs 인덱스 이름(`byoc--<cluster_name>--<index_name>` 형식)이 포함되어야 합니다.
- 자연어 쿼리를 사용할 때는 프롬프트에 BYOC Logs 인덱스 이름을 명시적으로 적어야 합니다.
- BYOC Logs 데이터는 인덱싱되는 즉시 실시간으로 쿼리할 수 있습니다.
- 쿼리 구문은 표준 [Datadog 로그 검색 구문][4]을 따릅니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/byoc-logs
[4]: /ko/logs/explorer/search_syntax/