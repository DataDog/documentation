---
aliases:
- /ko/cloudprem/introduction/features/
description: BYOC Logs에서 지원되는 Datadog Log Explorer 기능 알아보기
title: 지원되는 기능
---
## 개요 {#overview}

Datadog BYOC(Bring Your Own Cloud) Logs는 핵심 Log Explorer 기능을 자체 호스팅 환경으로 가져옵니다. 이 페이지에서는 사용 가능한 기능을 설명하고 SaaS 플랫폼과의 차이점을 언급하여 로그 워크플로를 계획하는 데 도움을 줍니다.

## 지원되는 기능 {#supported-features}

### 검색 및 시각화 {#search-and-visualization}

- 모든 로그 속성에 대한 전체 텍스트 검색
- 목록, 시계열, 상위 목록, 테이블, 트리 맵, 파이 차트, 산점도 시각화
- 필드 및 패턴으로 그룹화(월별 타임시프트 제외)
- 고유 개수 기준 그룹화 및 정렬을 포함한 그룹화 및 정렬
- 플랫 그룹 쿼리
- 패싯 기반 필터링 및 드릴다운
- CSV 다운로드
- 페이지 매김
- Notebooks(미리 보기)

### 대시보드 및 모니터 {#dashboards-and-monitors}

- BYOC Logs 데이터가 포함된 대시보드
- BYOC Logs 인덱스에 대한 로그 모니터

### 인덱스 관리 {#index-management}

- 독립적인 보존 기간 및 라우팅 규칙이 적용된 다중 인덱스

### 액세스 제어 {#access-control}

- [로그 제한 쿼리][1]

### 를 통한 RBAC 상관관계 {#correlation}

- BYOC Logs의 로그와 Datadog SaaS로 전송된 메트릭 간의 상관관계
- BYOC Logs의 로그와 Datadog SaaS로 전송된 트레이스 간의 상관관계
- BYOC Logs의 로그와 Datadog SaaS로 전송된 프로세스 간의 상관관계

### 처리 {#processing}

- Observability Pipelines를 통한 구성 가능한 처리 파이프라인
- Observability Pipeline 연결

### AI 기능 {#ai-features}

- Bits Investigation(미리 보기)
- MCP 서버(미리 보기)

## 지원되지 않는 기능 {#unsupported-features}

BYOC Logs에서는 다음 기능을 지원하지 않습니다:

- SIEM
- Watchdog
- 페더레이션 검색
- LiveTail
- 로그 컨텍스트 조회

### 지원되지 않는 쿼리 기능 {#unsupported-query-capabilities}

- CIDR 쿼리
- 트랜잭션별 그룹화
- 고급 쿼리 기능:
  - 계산된 필드
  - Grok 추출(쿼리 시 구문 분석)

[1]: /ko/api/latest/logs-restriction-queries/