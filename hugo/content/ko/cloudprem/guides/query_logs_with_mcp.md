---
description: CloudPrem 인덱스에 저장된 로그를 Datadog MCP 서버를 이용해 쿼리하는 방법을 알아보세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Datadog MCP 서버 소개
- link: /ide_plugins/vscode/?tab=cursor#installation
  tag: Documentation
  text: VS Code 및 Cursor용 Datadog 확장
- link: /cloudprem/operate/search_logs/
  tag: Documentation
  text: CloudPrem에서 로그 검색
title: Datadog MCP 서버로 CloudPrem 로그 쿼리하기
---
{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem은 미리 보기 상태입니다." >}}
  CloudPrem 미리 보기에 참여하여 새로운 자체 호스팅 Log Management 기능에 액세스하세요.
{{< /callout >}}

## 개요

[Datadog MCP(Model Context Protocol) 서버][1]를 사용하면 CloudPrem 인덱스에 저장된 로그를 포함한 Datadog 로그를 AI 기반 도구 및 통합을 통해 직접 쿼리할 수 있습니다. Datadog MCP 서버로 CloudPrem 로그를 쿼리하면 다음과 같은 여러 유용한 기능이 활성화됩니다.

 **통합 컨텍스트 기반 문제 해결**: 모든 환경의 로그, 메트릭 및 트레이스를 한 곳에서 쿼리하고 상관관계를 파악하여 텔레메트리 유형 간 전환을 통해 근본 원인을 더 빠르게 식별할 수 있습니다.
 **자연어 상호작용**: 평이한 언어로 질문하면 AI가 구문을 기억할 필요 없이 적절한 로그 쿼리를 자동으로 생성합니다.

## 전제 조건

 로그가 수집된 실행 중인 CloudPrem 배포 환경.
 [Datadog MCP 서버][1]에 대한 액세스 권한.
 CloudPrem 인덱스 이름([Datadog 로그 탐색기][2]의 **CLOUDPREM INDEXES** 아래에서 확인할 수 있음).

## CloudPrem 로그 쿼리하기

CloudPrem 인덱스에 저장된 로그를 쿼리하려면 표준 로그 쿼리 외에 두 가지 필수 파라미터를 **반드시** 지정해야 합니다.

 (필수) **`indexes`**: CloudPrem 인덱스 이름입니다.
 (필수) **`storage_tier`**: `"cloudprem"`으로 설정해야 합니다.

두 파라미터가 없으면 쿼리는 CloudPrem 대신 표준 Datadog 로그 인덱스를 검색하도록 기본값이 설정됩니다.

최상의 결과를 얻으려면 프롬프트 **에 다음도 포함해야 합니다**.
 (권장) 시간 범위(예: "지난 1시간", "지난 24시간").
 (권장) 쿼리 필터(서비스, 상태, 로그 내용).

### 쿼리 파라미터
다음 표는 MCP 서버로 로그를 쿼리할 때 사용되는 주요 파라미터를 설명합니다.

| 파라미터 | 설명 | 예시 |
||||
| `query` | Datadog 쿼리 구문을 사용하여 로그를 검색하는 쿼리 | `"*"` (모든 로그), `"service:web"`, `"status:error"` |
| `indexes` | 검색할 CloudPrem 인덱스 이름 배열 | `["cloudpremdevmain"]` |
| `storage_tier` | 쿼리할 저장소 계층(CloudPrem 로그의 경우 `"cloudprem"`이어야 함) | `"cloudprem"` |
| `from` | 쿼리 시작 시간 | `"now1h"`, `"now24h"`, `"20240115T00:00:00Z"` |
| `to` | 쿼리 종료 시간 | `"now"`, `"20240115T23:59:59Z"` |
| `sort` | 결과 정렬 순서 | `"timestamp"`(내림차순), `"timestamp"`(오름차순) |

파라미터 및 자연어 쿼리의 예는 [고급 쿼리 예시](#advancedqueryexamples)를 참조하세요.

### CloudPrem 인덱스 이름 찾기

CloudPrem 인덱스 이름을 찾으려면:

1. [Datadog Log Explorer][2]로 이동합니다.
2. 왼쪽 패싯 패널에서 **CLOUDPREM INDEXES** 섹션을 찾습니다.
3. CloudPrem 인덱스가 `cloudprem<cluster_name><index_name>` 형식으로 나열됩니다.

클러스터를 선택하고 **View Indexes**를 클릭하여 [CloudPrem 콘솔][3]에서도 인덱스 이름을 찾을 수 있습니다.

## 고급 쿼리 예시

Datadog MCP 서버에서 AI 기반 도구를 사용할 때 자연어로 질문할 수 있습니다. MCP 서버가 이를 자동으로 적절한 형식의 CloudPrem 쿼리로 변환합니다.

### 특정 서비스의 오류 로그
**프롬프트**:
"지난 1시간 동안 cloudpremdevmain 인덱스에서 nginx 서비스의 오류 로그를 보여줘."

**변환된 쿼리**:

```json
{
  "query": "service:nginx status:error",
  "indexes": ["cloudprem--dev--main"],
  "storage_tier": "cloudprem",
  "from": "now-1h",
  "to": "now"
}
```

### 특정 로그 내용 검색
**프롬프트**:
"지난 24시간 동안 cloudpremprodmain 인덱스에서 API 서비스의 'connection timeout'을 포함한 로그를 찾아줘."

**변환된 쿼리**:

```json
{
  "query": "service:api \"connection timeout\"",
  "indexes": ["cloudprem--prod--main"],
  "storage_tier": "cloudprem",
  "from": "now-24h",
  "to": "now"
}
```

### HTTP 상태 코드로 필터링
**프롬프트**:
"지난 1일 동안 cloudpremprodmain 인덱스에서 상태 코드 500인 모든 로그를 가져와."

**변환된 쿼리**:

```json
{
  "query": "status:500",
  "indexes": ["cloudprem--prod--main"],
  "storage_tier": "cloudprem",
  "from": "now-1d",
  "to": "now"
}
```

## 중요 사항

 **CloudPrem 로그를 쿼리할 때 `storage_tier`와 `indexes`는 모두 필수**입니다. 이 파라미터가 없으면 쿼리는 대신 일반 Datadog 인덱스를 검색합니다.
 `storage_tier`는 항상 `"cloudprem"`으로 설정해야 합니다.
 `indexes` 파라미터에는 유효한 CloudPrem 인덱스 이름(`cloudprem<cluster_name><index_name>` 형식)을 포함해야 합니다.
 자연어 쿼리를 사용할 때는 프롬프트에 CloudPrem 인덱스 이름을 명시적으로 적어야 합니다.
 CloudPrem 로그는 인덱싱되자마자 실시간으로 쿼리할 수 있습니다.
 쿼리 구문은 표준 [Datadog 로그 검색 구문][4]을 따릅니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/bits_ai/mcp_server/
[2]: https://app.datadoghq.com/logs
[3]: https://app.datadoghq.com/cloudprem
[4]: /ko/logs/explorer/search_syntax/