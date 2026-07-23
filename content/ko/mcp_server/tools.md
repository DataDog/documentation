---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
aliases:
- /ko/bits_ai/mcp_server/tools/
description: Datadog MCP 서버에서 사용할 수 있는 모든 도구를 탐색하세요. 도구 세트별로 정리되어 있으며 프롬프트 예시가 제공됩니다.
further_reading:
- link: mcp_server
  tag: 설명서
  text: Datadog MCP 서버
- link: mcp_server/setup
  tag: 설명서
  text: Datadog MCP 서버 설정
title: Datadog MCP 서버 도구
---
Datadog MCP 서버에서 사용할 수 있는 도구는 다음과 같습니다. 각 항목에 필수 도구 세트, 권한 및 프롬프트 예시가 포함되어 있습니다. 도구는 [도구 세트][1] 기준으로 그룹화되어 있어서 필요한 도구만 사용할 수 있으므로 귀중한 컨텍스트 윈도가 절약됩니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
제품별 도구를 활성화하려면 Datadog MCP 서버에 연결하는 데 사용하는 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함하세요. 예를 들어, 선택한 [Datadog 사이트][2]({{< region-param key="dd_site_name" >}}) 기준으로 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다.

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

또한 `omit_tools` 쿼리 파라미터를 사용하여 특정 도구를 제외할 수 있습니다.

[2]: /ko/getting_started/site/
{{< /site-region >}}

MCP 서버 연결, 도구 세트 활성화 및 특정 도구 제외에 대한 자세한 내용은 [Datadog MCP 서버 설정][1]을 참조하세요.

<div class="alert alert-info">Datadog MCP 서버 도구는 현재 중요한 개발 과정을 진행 중이며 변경될 수 있습니다. 각종 피드백, 사용 사례 또는 프롬프트 및 쿼리를 사용하다가 발생한 문제를 공유하려면 <a href="https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform">이 피드백 양식</a>을 사용하세요.</div>

## Core 도구 {#core-tools}

로그, 메트릭, 트레이스, 대시보드, 모니터, 인시던트, 호스트, 서비스, 이벤트, 노트북의 기본 도구 세트입니다.

### `search_datadog_events` {#search-datadog-events}
*도구 세트: **core***\
*필수 권한: `Events` 및 `Timeseries`*\
모니터 경보, 배포 알림, 인프라 변경 사항, 보안 발견 사항 및 서비스 상태 변경 사항과 같은 이벤트를 검색합니다.

- 지난 24시간 동안의 모든 배포 이벤트를 표시해 줘.
- 우리 프로덕션 환경과 관련이 있고 오류 상태를 포함한 이벤트를 찾아 줘.
- 지난 한 시간 동안의 `service:api`로 태그된 이벤트를 가져와.

**참고**: 자세한 내용은 [Event Management API][15]를 참조하세요.

### `get_datadog_incident` {#get-datadog-incident}
*도구 세트: **core***\
*필수 권한: `Incidents Read`*\
인시던트에 대한 상세 정보를 검색합니다.

- 인시던트 ABC123의 세부 정보를 가져와.
- 인시던트 ABC123의 상태는 뭐야?
- 어제 Redis 인시던트에 관한 전체 정보를 검색해 줘.

**참고**: 도구가 작동하지만, 인시던트 타임라인 데이터를 포함하지 않습니다.

### `get_datadog_metric` {#get-datadog-metric}
*도구 세트: **core***\
*필수 권한: `Cloud Cost Management Read` 또는 `Metrics` 또는 `Timeseries`*\
과거 또는 실시간 메트릭 데이터를 쿼리하고 분석하며, 사용자 지정 쿼리 및 집계를 지원합니다.

- 지난 4시간 동안의 모든 호스트 CPU 활용률 메트릭을 표시해 줘.
- 프로덕션 환경의 Redis 지연 시간 메트릭을 가져와.
- 1월부터 2월까지 클라우드 비용이 얼마나 달라졌어?

### `get_datadog_metric_context` {#get-datadog-metric-context}
*도구 세트: **core***\
*필수 권한: `Cloud Cost Management Read` 또는 `Metrics`*\
메타데이터, 사용 가능한 태그 및 필터링과 그룹화용 태그 값 등 메트릭에 관한 상세 정보를 검색합니다.

- `system.cpu.user` 메트릭에 사용할 수 있는 태그는 뭐야?
-  `redis.info.latency_ms`에서 `env` 태그에 가능한 모든 값을 표시해 줘.
- `requests.count` 메트릭의 메타데이터와 디멘션을 가져와.

### `search_datadog_monitors` {#search-datadog-monitors}
*도구 세트: **core***\
*필수 권한: `Monitors Read`*\
Datadog 모니터의 상태, 임계값 및 경보 조건 등 정보를 검색합니다.

- 현재 경보 중인 모든 모니터를 목록으로 나열해 줘.
- 우리 결제 서비스와 관련된 모니터를 표시해 줘.
- `team:infrastructure`로 태그된 모니터를 찾아 줘.

### `get_datadog_trace` {#get-datadog-trace}
*도구 세트: **core***\
*필수 권한: `APM Read`*\
트레이스 ID를 사용하여 Datadog APM에서 완전한 트레이스를 가져옵니다.

- ID 7d5d747be160e280504c099d984bcfe0에 해당하는 완전한 트레이스를 가져와.
- 트레이스 abc123의 모든 스팬과 타이밍 정보를 표시해 줘.
- ID xyz789의 데이터베이스 쿼리를 포함한 트레이스 세부 정보를 검색해.

**참고**: 스팬이 수천 개 있는 대규모 트레이스는 잘릴 수 있으며(잘렸다고 표시됨) 모든 스팬을 검색할 방법은 없습니다.

### `search_datadog_dashboards` {#search-datadog-dashboards}
*도구 세트: **core***\
*필수 권한: `Dashboards Read` 및 `User Access Read`*\
사용 가능한 Datadog 대시보드 및 주요 세부 정보를 목록으로 나열합니다.

- 우리 계정에서 사용 가능한 모든 대시보드를 표시해 줘.
- 인프라스트럭처 모니터링과 관련된 대시보드를 목록으로 나열해.
- 엔지니어링 팀의 공유 대시보드를 찾아 줘.

**참고**: 이 도구는 관련 대시보드는 목록으로 나열하지만 그 내용에 관한 세부 정보는 한정적으로만 제공합니다. `get_datadog_dashboard`를 사용해 전체 위젯 정보를 검색해.

### `get_datadog_notebook` {#get-datadog-notebook}
*도구 세트: **core***\
*필수 권한: `Notebooks Read`*\
ID(이름, 상태 및 작성자) 기준으로 특정 노트북에 관한 상세한 정보를 검색합니다.

- 노트북 abc-123-def의 세부 정보를 가져와 줘.
- 어제 디버깅 노트북의 내용을 표시해 줘.

### `search_datadog_notebooks` {#search-datadog-notebooks}
*도구 세트: **core***\
*필수 권한: `Notebooks Read`*\
Datadog 노트북을 작성자, 태그 및 내용 기준으로 필터링하여 목록으로 나열하고 검색합니다.

- 플랫폼 팀이 생성한 모든 노트북을 표시해 줘.
- 성능 조사와 관련된 노트북을 찾아 줘.
- `incident-response`로 태그된 노트북을 목록으로 나열해 줘.

### `search_datadog_hosts` {#search-datadog-hosts}
*도구 세트: **core***\
*필수 권한: `Hosts Read` 및 `Timeseries`*\
모니터링된 호스트를 목록으로 나열하고 관련 정보를 제공하며, 필터링과 검색을 지원합니다.

- 우리 프로덕션 환경의 모든 호스트를 표시해 줘.
- 지난 한 시간 동안 보고하지 않은 비정상 호스트를 목록으로 나열해.
- `role:database`로 태그된 모든 호스트를 가져와.

### `search_datadog_incidents` {#search-datadog-incidents}
*도구 세트: **core***\
*필수 권한: `Incidents Read`*\
Datadog 인시던트 목록(상태, 심각도, 메타데이터 포함)을 검색합니다.

- 모든 활성 인시던트를 심각도 기준으로 표시해 줘.
- 지난 한 주 동안의 해결된 인시던트를 목록으로 나열해.
- 고객에게 영향을 미치는 인시던트를 찾아 줘.

### `search_datadog_metrics` {#search-datadog-metrics}
*도구 세트: **core***\
*필수 권한: `Metrics`*\
사용 가능한 메트릭을 목록으로 나열하며, 필터링 옵션 및 메타데이터를 함께 표시합니다.

- 모든 사용 가능한 Redis 메트릭을 표시해 줘.
- 우리 인프라의 CPU 관련 메트릭을 목록으로 나열해.
- `service:api`로 태그된 메트릭을 찾아 줘.

### `search_datadog_services` {#search-datadog-services}
*도구 세트: **core***\
*필수 권한: `Service Catalog Read`*\
Datadog 카탈로그의 서비스를 세부 정보 및 팀 정보와 함께 나열합니다.

- 우리 마이크로서비스 아키텍처의 모든 서비스를 표시해 줘.
- 플랫폼 팀이 소유한 서비스를 목록으로 나열해 줘.
- 결제 처리와 관련된 서비스를 찾아 줘.

### `search_datadog_service_dependencies` {#search-datadog-service-dependencies}
*도구 세트: **core***\
*필수 권한: `APM Read`, `Service Catalog Read` 및 `Teams Read`*\
서비스 종속성(업스트림/다운스트림) 및 팀이 소유한 서비스를 검색합니다.

- 체크아웃 서비스를 호출하는 모든 업스트림 서비스를 표시해 줘.
- 결제 API가 종속되는 다운스트림 서비스는 뭐야?
- 플랫폼 팀이 소유한 모든 서비스를 목록으로 나열해.

### `search_datadog_spans` {#search-datadog-spans}
*도구 세트: **core***\
*필수 권한: `APM Read`*\
서비스, 시간, 리소스 등의 필터를 사용하여 APM 트레이스에서 스팬을 검색합니다.

- 체크아웃 서비스의 오류가 있는 스팬을 표시해 줘.
- 지난 30분 동안의 느린 데이터베이스 쿼리를 찾아 줘.
- 우리 결제 서비스에 대한 실패한 API 요청의 스팬을 가져와.

### `analyze_datadog_logs` {#analyze-datadog-logs}
*도구 세트: **core***\
*필수 권한: `Logs Read Data`, `Logs Read Index Data` 및 `Timeseries`*\
계수, 집계 및 숫자 분석을 위해 SQL 쿼리를 사용하여 Datadog 로그를 분석합니다. 이것은 통계 분석에 사용하세요.

- 지난 한 시간 동안의 서비스별 오류 로그를 세어 줘.
- 상위 10개 HTTP 상태 코드와 그 개수를 표시해 줘.
- 해당 기간 동안 가장 많이 로깅한 서비스는 뭐야?

### `search_datadog_logs` {#search-datadog-logs}
*도구 세트: **core***\
*필수 권한: `Logs Read Data` 및 `Logs Read Index Data`*\
필터(시간, 쿼리, 서비스, 호스트, 스토리지 계층 등)를 사용하여 로그를 검색하고 로그 세부 정보를 반환합니다. `get_logs`에서 이름이 변경되었습니다.

- 지난 한 시간 동안의 nginx 서비스의 오류 로그를 표시해 줘.
- 우리 API 서비스에서 'connection timeout'을 포함하는 로그를 찾아 줘.
- 프로덕션에서 500 상태 코드 로그를 모두 가져와.

### `search_datadog_rum_events` {#search-datadog-rum-events}
*도구 세트: **core***\
*필수 권한: `RUM Apps Read`*\
고급 쿼리 구문을 사용하여 Datadog RUM 이벤트를 검색합니다.

- JavaScript 오류와 콘솔 경고를 RUM에서 표시해 줘.
- 로딩 속도가 느린(3초 초과) 페이지를 찾아 줘.
- 제품 세부 정보 페이지의 최근 사용자 상호 작용을 표시해 줘.

### `create_datadog_notebook` {#create-datadog-notebook}
*도구 세트: **core***\
*필수 권한: `Notebooks Read` 및 `Notebooks Write`*\
새 Datadog 노트북을 생성합니다.

- 노트북을 생성해 체크아웃 서비스 지연 시간 스파이크에 대한 조사 내용을 문서로 기록해 줘.
- 우리 주간 성과 리뷰에 사용할 새 노트북을 만들어 줘.

### `edit_datadog_notebook` {#edit-datadog-notebook}
*도구 세트: **core***\
*필수 권한: `Notebooks Read` 및 `Notebooks Write`*\
기존 Datadog 노트북을 편집합니다.

- 노트북 abc-123-def에 최신 로그 분석 결과를 포함한 섹션을 추가해 줘.
- 인시던트 응답 노트북에 오늘의 발견 사항을 업데이트해 줘.

## 경보 {#alerting}

모니터를 검증하고 모니터 그룹을 검색, 모니터 템플릿을 검색하는 도구입니다.

### `validate_datadog_monitor` {#validate-datadog-monitor}
*도구 세트: **alerting***\
*필수 권한: `Monitors Read`*\
모니터 정의가 올바른지 검증한 다음에 생성 또는 업데이트합니다.

- 이 모니터 정의를 생성하기 전에 검증해 줘.
- 내 모니터 쿼리 구문이 올바른지 검사해 줘.

### `get_datadog_monitor_templates` {#get-datadog-monitor-templates}
*도구 세트: **alerting***\
*필수 권한: `Monitors Read`*\
사용 가능한 모니터 템플릿을 검색해 모니터 생성에 도움이 됩니다.

- 사용 가능한 모니터 템플릿을 표시해 줘.
- 새 모니터를 생성하는 데 어느 템플릿을 사용할 수 있어?

### `search_datadog_monitor_groups` {#search-datadog-monitor-groups}
*도구 세트: **alerting***\
*필수 권한: `Monitors Read`*\
모니터 그룹을 이름 또는 기준별로 검색합니다.

- 경보 상태인 모든 모니터 그룹을 표시해 줘.
- 체크아웃 서비스와 관련된 모니터 그룹을 찾아 줘.

### `search_datadog_slos` {#search-datadog-slos}
*도구 세트: **alerting***\
*필수 권한: `SLOs Read`*\
이름, 태그 또는 유형으로 Datadog SLO를 검색합니다. 서비스, 팀 또는 기타 속성 기준으로 필터링하기 위한 쿼리 구문을 지원합니다.

- `service:checkout` 관련 SLO를 검색해.
- `team:backend`로 태그된 모든 SLO를 목록으로 나열해.
- 결제 서비스의 SLO를 목록으로 나열해.

### `create_datadog_monitor` {#create-datadog-monitor}
*도구 세트: **alerting***\
*필수 권한: `Monitors Write`*\
초안 모드에서 Datadog 모니터를 생성합니다. 이 도구로 생성한 모니터는 알림을 보내지 않으며, 우선순위 5(낮음)로 설정됩니다. 생성하기 전에 `validate_datadog_monitor`를 사용해 정의를 확인하고, 쿼리 구문 예시는`get_datadog_monitor_templates`를 참조하세요. 생성한 다음, Datadog UI에 모니터를 게시합니다.

- 웹 서비스에서의 높은 CPU 사용량에 대한 메트릭 경보 모니터를 생성해.
- 결제 서비스에서 오류 급증에 대한 로그 경보 모니터를 설정해.
- 체크아웃 엔드포인트에 대해 p95 지연 시간을 추적하는 모니터를 생성해.

### `get_monitor_coverage` {#get-monitor-coverage}
*도구 세트: **alerting***\
*필수 권한: `Monitors Read`*\
서비스 또는 호스트의 모니터링 격차 및 커버리지를 찾습니다. 기존 모니터가 담당하는 신호가 무엇이고(오류율, 지연 시간 및 요청율 등), 무엇이 누락되었는지 반환합니다. 격차를 메우려면 `create_datadog_monitor`와 함께 사용하세요.

- `service:checkout`의 모니터링 커버리지를 가져와.
- `host:web-01`에 대해 어떤 모니터링 격차가 존재해?
- 오류율 모니터가 누락된 서비스를 찾아 줘.

## APM {#apm}

심층 [APM][50] 트레이스 분석, 스팬 검색, Watchdog 인사이트 및 성능 조사를 위한 도구입니다.

<div class="alert alert-info">해당 <code>apm</code> 도구 세트는 미리 보기 상태입니다. <a href="https://www.datadoghq.com/product-preview/apm-mcp-toolset/">액세스하려면 등록하세요.</a></div>

### `apm_search_spans` {#apm-search-spans}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
APM 쿼리 구문을 사용하여 스팬을 검색하며, 페이지 지정 및 태그 필터링이 지원됩니다.

- 지난 한 시간 동안의 체크아웃 서비스 오류가 있는 스팬을 표시해 줘.
- 2초 넘게 걸리는 느린 데이터베이스 쿼리를 찾아 줘.
- `service:payments` 및 `status:error`가 있는 스팬을 검색해.

### `apm_query_trace` {#apm-query-trace}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
트레이스의 스팬 데이터를 쿼리하여 스팬을 필터링, 집계 또는 순위화합니다. 예를 들어 가장 높은 자체 시간을 가진 스팬을 찾거나 오류를 발생시킨 원본 서비스를 추적할 수 있습니다.

- 트레이스 `abc123`에서 자체 시간이 가장 긴 상위 5개 스팬을 찾아 줘.
- 트레이스 `abc123`의 모든 오류 메시지와 해당 오류를 발생시킨 서비스를 표시해 줘.
- 이 트레이스에서 500ms보다 오래 걸린 데이터베이스 호출은 뭐야?

### `apm_discover_span_tags` {#apm-discover-span-tags}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
시간 범위 내 스팬에서 사용 가능한 태그 키를 검색합니다.

- `service:checkout`의 스팬에서 사용할 수 있는 태그는 뭐야?
- APM에서 필터링 기준으로 사용할 수 있는 태그 키를 표시해 줘,

### `apm_get_primary_tag_keys` {#apm-get-primary-tag-keys}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
조직에 대하여 구성된 기본 태그 키를 검색합니다.

- 내 조직의 기본 태그 키는 뭐야?

### `apm_search_watchdog_stories` {#apm-search-watchdog-stories}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
특정 시간 범위 내에서 서비스의 Watchdog 이상 탐지 기록을 검색하여 지연 시간, 오류율 및 트래픽 이상 징후에 대해 AI가 생성한 인사이트를 제공합니다.

- 지난 24시간 동안의 체크아웃 서비스 Watchdog 이상치를 표시해 줘.
- API 서비스에서 탐지된 지연 시간 이상이 있어?

### `apm_get_watchdog_story` {#apm-get-watchdog-story}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
특정 Watchdog 스토리에 관한 상세 정보를 ID 기준으로 검색합니다.

- Watchdog 스토리 `abc123`의 세부 정보를 가져와.

### `apm_latency_bottleneck_summary` {#apm-latency-bottleneck-summary}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
이상 징후 기간 동안 여러 트레이스의 자체 시간 계산을 기반으로 지연 시간 병목 현상을 분석합니다. 가장 많은 자체 시간을 소비하는 서비스 및 리소스 조합을 식별하고, 연쇄 호출 패턴을 탐지하며, 지연 시간 급증의 근본 원인을 파악합니다.

- 오늘 오후 2시부터 3시 사이 체크아웃 서비스의 지연 시간 병목 현상을 요약해 줘.
- 이 지연 시간 급증 동안 결제 서비스에서 가장 많은 자체 시간을 소비하는 요소는 뭐야?
- 10:00부터 10:30까지 `service:api`의 주요 병목 엔드포인트를 파악해 줘.

### `get_change_stories` {#get-change-stories}
*도구 세트: **apm***\
APM 서비스에 대한 변경 추적 API의 변경 내역을 조회합니다. 이 기능을 사용하여 특정 기간 동안 무엇이 변경되었는지(배포, 기능 플래그, 구성 업데이트, 인프라 이벤트 등)를 확인하고, 해당 변경 사항을 성능 문제 또는 인시던트와 상호 연결합니다.

- 결제 서비스의 최근 배포 및 변경 사항을 표시해 줘.
- 이 지연 시간 급증 시점 전후에 어떤 인프라 변경이 발생했어?
- 지난 한 시간 동안 체크아웃 서비스의 기능 플래그와 구성 변경 사항을 찾아 줘.

### `semantic_search_change_stories` {#semantic-search-change-stories}
*도구 세트: **apm***\
자연어 및 AI 기반 의미 검색을 사용하여 변경 내역을 검색합니다. 이 기능을 사용하여 조사 중인 동작, 사용자 보고 문제 또는 제품 영역과 관련된 기능 플래그 또는 배포 변경 사항을 찾습니다.

- 체험 사용자의 대시보드 로딩에 영향을 줄 수 있는 최근 변경 사항은 뭐야?
- 청구 설정 페이지의 인증에 영향을 줄 수 있는 플래그는 뭐야?
- 지난주에 누락된 텔레메트리 데이터와 관련된 변경 사항을 찾아 줘.

### `apm_search_recommendations` {#apm-search-recommendations}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
Datadog에서 APM 권장 사항을 검색합니다.

- 내 서비스에 대한 APM 권장 사항을 표시해 줘.
- 애플리케이션에 대한 최적화 제안이 있어?

### `apm_get_recommendation` {#apm-get-recommendation}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
ID별 특정 APM 권장 사항의 전체 세부 정보를 검색합니다.

- 추천 `abc123`의 세부 정보를 가져와.

## 케이스 {#cases}

[Case Management][38] 도구입니다(케이스 생성, 검색 및 업데이트, 프로젝트 관리, Jira 문제 연결 포함).

### `search_datadog_cases` {#search-datadog-cases}
*도구 세트: **cases***\
*필수 권한: `Cases Read`*\
상태, 우선순위, 프로젝트, 담당자 등의 필터를 사용하여 [Case Management][38] 케이스를 검색합니다. 시간 범위 필터링 및 페이지 지정을 지원합니다.

- 나에게 할당된 모든 진행 중인 케이스를 표시해 줘.
- 보안 검토 프로젝트에 진행 중인 P1 케이스가 있어?
- 결제 서비스와 관련해 이번 주에 개시된 모든 케이스를 표시해 줘.

### `get_datadog_case` {#get-datadog-case}
*도구 세트: **cases***\
*필수 권한: `Cases Read`*\
ID 또는 제목, 상태, 우선순위, 담당자, 타임스탬프 등의 키를 기준으로 특정 케이스에 관한 상세 정보를 검색합니다. 선택 사항으로 타임라인 활동(코멘트 및 상태 변경)과 사용자 지정 속성을 포함합니다.

- CASE-1234의 최신 업데이트는 뭐야? 전체 타임라인을 표시해 줘.
- 이 케이스는 누가 작업하고 있고, 지금까지 진행 상황은 어때?
- 데이터베이스 마이그레이션 케이스의 세부 정보 및 모든 코멘트를 가져와.

### `create_datadog_case` {#create-datadog-case}
*도구 세트: **cases***\
*필수 권한: `Cases Write`*\
제목, 프로젝트 및 선택 사항 필드(설명, 우선순위, 담당자 등)를 포함한 새 [Case Management][38] 케이스를 생성합니다.

- 체크아웃 서비스에서 지연 시간이 급증하고 있어. 조사를 추적할 P2 케이스를 생성해 줘.
- 로그에서 발견한 의심스러운 로그인 활동에 대해 보안 검토 케이스를 열어 줘.

### `update_datadog_case` {#update-datadog-case}
*도구 세트: **cases***\
*필수 권한: `Cases Write`*\
상태, 우선순위, 제목, 설명, 담당자, 기한 및 사용자 지정 속성과 같은 기존 케이스의 필드를 업데이트합니다. 제공한 필드만 업데이트됩니다.

- 이 문제는 이제 고객에게 영향을 미치고 있어. CASE-1234를 P1으로 에스컬레이션해.
- 데이터베이스 마이그레이션 케이스를 해결됨으로 표시해.
- CASE-1234의 기한을 주말로 설정해.

### `add_comment_to_datadog_case` {#add-comment-to-datadog-case}
*도구 세트: **cases***\
*필수 권한: `Cases Write`*\
케이스의 타임라인에 코멘트를 추가합니다. 코멘트는 마크다운 형식 지정을 지원합니다.

- 케이스에 우리가 로그와 트레이스에서 발견한 내용을 요약하는 메모를 추가해 줘.
- 핫픽스가 배포되었고 모니터링 중이라는 업데이트를 게시해.
- 이 케이스의 근본 원인 발견 사항을 문서로 기록해 줘.

### `link_jira_issue_to_datadog_case` {#link-jira-issue-to-datadog-case}
*도구 세트: **cases***\
*필수 권한: `Cases Write`*

- 인프라 마이그레이션에 대한 Jira 티켓을 이 케이스에 연결해서 둘 다 추적할 수 있게 해줘.
- 엔지니어링 팀이 가시성을 확보하도록 PROJ-456을 Datadog 케이스에 연결해 줘.

### `list_datadog_case_projects` {#list-datadog-case-projects}
*도구 세트: **cases***\
*필수 권한: `Cases Read`*\
사용 가능한 [Case Management][38] 프로젝트를 목록으로 나열하며, 이름 또는 키 기준의 선택적 필터링을 포함합니다.

- Case Management에서는 무슨 프로젝트를 사용할 수 있어?
- Case Management에 보안과 관련된 프로젝트가 있어?

### `get_datadog_case_project` {#get-datadog-case-project}
*도구 세트: **cases***\
*필수 권한: `Cases Read`*\
ID별 특정 케이스 프로젝트의 세부 정보를 가져옵니다.

- 이 케이스는 어느 프로젝트에 속해?

### `search_datadog_users` {#search-datadog-users}
*도구 세트: **cases***\
*필수 권한: `User Access Read`*\
이메일, 이름 또는 핸들 기준으로 Datadog 사용자를 검색합니다. 케이스를 할당할 적임자를 찾는 데 유용합니다.

- jane.doe@example.com에 해당하는 Datadog 사용자 계정을 찾아 줘.

## 코드 실행 {#code-execution}

Datadog이 관리하는 샌드박스에서 에이전트가 작성한 TypeScript를 실행하며 Datadog API에 직접 액세스하여 여러 신호에 대한 조사 및 임시 데이터 탐색을 한 번에 수행하는 단일 도구입니다.

<div class="alert alert-info">해당 <code>code-exec</code> 도구 세트는 미리 보기 상태입니다. 미리 보기에 <a href="https://www.datadoghq.com/product-preview/mcp-codexec/">가입</a>하거나 <a href="/help">Datadog 지원팀</a>에 문의하여 액세스를 요청하세요.</div>

이 도구 세트에서 실행되는 코드는 사용자의 Datadog API에 대해 사용자 본인의 ID로 실행됩니다. 샌드박스는 모든 API 호출에 기존 [역할 권한][56]을 적용하므로, 에이전트는 사용자가 Datadog에서 이미 액세스할 수 있는 데이터만 읽거나 수정할 수 있습니다.

### `execute_code` {#execute-code}
*도구 세트: **code-exec***\
*필수 권한: 실행된 코드가 상호작용하는 기본 Datadog 리소스에 접근하기 위해 필요한 제품별 역할 권한(예: `Logs Read` 로그를 읽기 위해 필요)입니다.*\
Datadog이 관리하는 샌드박스에서 AI 에이전트가 작성한 TypeScript를 실행합니다. 코드는 로그, 메트릭, 트레이스, 서비스, 변경 이벤트, 인시던트, 모니터, 대시보드 및 기타 Datadog API를 조회할 수 있는 도우미가 포함된 `dd.*` 네임스페이스를 제공받으며, 구조화된 결과를 에이전트에 반환합니다. 이를 통해 다중 신호 조사 및 임시 데이터 탐색 시 필요한 왕복 호출 횟수를 줄일 수 있습니다.

- 지난 2시간 동안 `checkout-api` 서비스의 오류 로그, 지연 시간 메트릭 및 최근 배포 내역을 함께 조회하고 오류 급증과 일치하는 배포를 알려줘.
- 지난 하루 동안 `payments` 서비스의 오류 스팬 수, 모니터 경보 및 구성 변경 사항을 비교하고 동일한 시점에 발생한 사항을 파악해 줘.
- `auth-service`에 대해 로그의 주요 오류 패턴을 지난 1시간의 CPU 및 메모리 메트릭과 상호 연결하여 오류가 리소스 압박과 관련이 있는지 확인해 줘.

## Dashboards {#dashboards}

[대시보드][46] 검색, 생성, 업데이트 및 삭제를 위한 도구이며 위젯 스키마 참조 및 검증도 포함합니다.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*도구 세트: **core**, **대시보드***\
*필수 권한: `Dashboards Read` 및 `User Access Read`*\
Datadog [대시보드][46]를 ID 기준으로 검색하여 제목, 설명, 태그, 위젯을 반환합니다. 우선 `search_datadog_dashboards`를 사용해 대시보드 ID를 찾으세요.

- 대시보드 `ps7-mn3-kwf`의 전체 세부 정보를 가져와.
- 인프라 개요 대시보드의 위젯과 레이아웃을 표시해 줘.
- 이 대시보드에서 구성된 템플릿 변수를 검색해.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*도구 세트: **core**, **대시보드***\
*필수 권한: `Dashboards Read` 및 `Dashboards Write`*\
Datadog [대시보드][46]를 생성하거나 업데이트합니다. 기존 대시보드를 업데이트하려면 해당 대시보드 ID를 제공하세요. 새로 생성하려면 ID를 생략합니다. 위젯을 빌드하기 전에 위젯 스키마를 위해 `get_widget_reference`를 호출합니다.

- 모든 호스트 전반의 CPU 및 메모리 사용량을 표시하는 대시보드를 생성해.
- 대시보드 `abc-123-def`에 오류율에 대한 시계열 위젯을 추가해.
- 서비스 개요 대시보드의 제목과 설명을 업데이트해.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*도구 세트: **대시보드***\
*필수 권한: `Dashboards Read` 및 `Dashboards Write`*\
ID를 기준으로 Datadog [대시보드][46]를 영구적으로 삭제합니다. 이 액션은 실행 취소할 수 없습니다. 우선 `search_datadog_dashboards`를 사용해 대시보드 ID를 찾으세요.

- 대시보드 `ps7-mn3-kwf`를 삭제해.
- 오래된 스테이징 환경 대시보드를 제거해.

### `get_widget_reference` {#get-widget-reference}
*도구 세트: **대시보드***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read`*\
대시보드 위젯 유형에 대한 스키마 및 빌드 지침을 반환합니다. 위젯 정의는 JSON 객체입니다. 이 도구는 스키마를 나타내는 TypeScript 유형 정의를 반환하며 그와 함께 쿼리 패턴, 수식 구문, 일반적인 위험 등을 다루는 빌드 지침도 함께 반환합니다. `upsert_datadog_dashboard`를 사용하여 위젯을 생성하기 전에 이것을 호출하세요.

- 시계열 위젯의 스키마를 가져와.
- 상위 목록과 쿼리 표 위젯을 빌드하는 방법을 표시해 줘.
- 산점도 위젯의 스키마는 뭐야?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*도구 세트: **대시보드***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read`*\
대시보드 스키마를 기준으로 위젯 정의를 검증합니다. 위젯 JSON을 `upsert_datadog_dashboard`에 전달하기 전에 이것을 사용해 검사하세요.

- 대시보드를 생성하기 전에 시계열 위젯 정의를 검증해 줘.
- 이 쿼리 표 위젯 JSON이 올바른지 검사해.

### `ask_widget_expert` {#ask-widget-expert}
*도구 세트: **대시보드***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read`*\
위젯 구성, 스키마, 쿼리 구문, 필드 사용, 디버깅 또는 위험과 관련해 Datadog 위젯 전문가에게 질문합니다. 스키마 조회, 필드 설명, 기존 위젯 정의 디버깅 또는 특정 위젯 유형의 작동 방식을 이해하고자 하는 등 맞춤화된 질문에 가장 효과적입니다.

- toplist에는 어느 response_format을 사용해야 해?
- 산점도 위젯의 스키마는 뭐야?
- 이 위젯이 정수가 아닌 분수 값을 표시하는 이유를 디버그하게 도와줘.
- 시계열이 막대와 선 차트를 둘 다 표시하게 구성하려면 어떻게 해야 해?

## Database Monitoring {#database-monitoring}

[Database Monitoring][26]과의 상호작용을 위한 도구입니다.

### `find_datadog_database_instances` {#find-datadog-database-instances}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
DBM 조사를 위해 데이터베이스 인스턴스를 검색하고 순위를 매깁니다. `database_instance` 파라미터가 필요한 기타 DBM 도구보다 이것을 먼저 호출하세요. APM 트레이스 또는 스팬 ID, 태그 또는 둘 모두를 수락하여 일치하는 인스턴스를 찾은 다음 해당 인스턴스를 평가하고 순위를 매깁니다.

- 한 시간 전에 트레이스 `abc123`와 상호 연결된 데이터베이스 인스턴스를 찾아 줘.
- `cluster_name:payments-prod`와 일치하는 PostgreSQL 인스턴스는 뭐야?
- 상태 기준으로 서비스 `checkout-api`의 데이터베이스 인스턴스 순위를 매겨줘.

### `get_datadog_database_calling_services` {#get-datadog-database-calling-services}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
데이터베이스 쿼리를 호출하는 업스트림 APM 서비스 및 리소스를 식별합니다. APM-데이터베이스 경계 전반의 근본 원인 분석을 위해 데이터베이스 활동을 애플리케이션 트레이스와 상호 연결합니다.

- `db-prod-1`에서 가장 느린 쿼리를 호출하는 서비스는 뭐야?
- 쿼리 서명`abc123def`의 기본 호출자를 찾아 줘.
- 결제 데이터베이스의 로드의 원인인 APM 리소스를 표시해 줘.

### `get_datadog_database_explain_plans` {#get-datadog-database-explain-plans}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
시간 프레임 내 쿼리 서명의 PostgreSQL 실행 계획을 검색합니다. 연산자 트리, 인덱스 사용량, 예상 비용을 비용 기준으로 정렬한 간소화된 계획 구조를 반환합니다.

- `db-prod-1`의 쿼리 서명 `abc123def`에 대한 설명 계획을 가져와.
- 이 느린 쿼리의 가장 비싼 실행 계획을 표시해 줘.
- 지난 하루 동안 쿼리 서명 `xyz789`에는 어떤 계획 변형이 발생했어?

### `get_datadog_database_health_signals` {#get-datadog-database-health-signals}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
상태 검사를 실행하여 CPU 포화도, 재시작, 쿼리 지연 시간, 차단과 같은 잠재적인 PostgreSQL 문제를 드러냅니다. 회귀 시간 프레임을 기준 기간과 비교합니다.

- 지난 한 시간과 그 이전 한 시간의 `db-prod-1` 상태 검사를 실행해.
- 인시던트 시간 프레임을 전후한 데이터베이스 상태를 검사해.
- 결제 데이터베이스의 회귀를 설명하는 신호는 뭐야?

### `get_datadog_database_query_performance` {#get-datadog-database-query-performance}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
특정 PostgreSQL 쿼리의 성능을 분석합니다. 처리량, 평균 지연 시간, 실행 시간, 실행당 행, 캐시 히트율, I/O 통계, 연결 활동, 대기 이벤트 및 트랜잭션 소요 시간을 반환하며 전체 통계와 타임 버킷 분석을 포함합니다.

- 지난 한 시간 동안의 쿼리 서명 `abc123def` 성능을 분석해.
- 이 쿼리가 프로덕션 PostgreSQL 인스턴스에서 속도가 느린 이유는 뭐야?
- 쿼리 서명 `xyz789`의 대기 이벤트 및 캐시 히트율을 표시해 줘.

### `get_datadog_database_query_statement` {#get-datadog-database-query-statement}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
주어진 쿼리 서명에 대한 SQL 문 텍스트를 검색합니다. 이것을 사용해 서명 해시를 다시 구체적인 SQL로 매핑하여 조사 및 보고에 활용하세요.

- 쿼리 서명 `abc123def`의 SQL을 가져와.
- 이 쿼리 해시 뒤의 문을 `db-prod-1`에 표시해 줘.
- 서명 `xyz789`는 어느 쿼리에 해당해?

### `get_datadog_database_recommendations` {#get-datadog-database-recommendations}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
데이터베이스, 쿼리, 표, 호스트 또는 인덱스의 실시간 데이터베이스 권장 사항을 검색합니다. 일치하는 권장 사항을 반환하며 여기에 상태, 심각도 및 정규화된 범위 블록을 포함하여 영향을 받는 인스턴스를 강조 표시하고, 쿼리 서명, 표, 인덱스, 서비스, 계획, 인프라 식별자를 함께 표시합니다.

- `db-prod-1`의 오픈 데이터베이스 권장 사항을 표시해 줘.
- 결제 데이터베이스에서 누락된 인덱스 권장 사항을 목록으로 나열해.
- 쿼리 서명 `abc123def`의 심각도가 높은 권장 사항을 가져와.

### `get_datadog_database_schemas` {#get-datadog-database-schemas}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
하나 이상의 데이터베이스 객체에 대한 스키마 정의(열, 인덱스, 외래 키, 파티션)를 가져옵니다. 선택적 스키마, 데이터베이스 및 인스턴스 한정자가 있는 표 이름을 수락합니다.

- `orders` 표의 스키마를 표시해 줘.
- `db-prod-1`의 `public.users`에 대한 열과 인덱스를 가져와.
- `payments` 표의 외래 키를 가져와.

### `optimize_datadog_database_query` {#optimize-datadog-database-query}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
결정론적 규칙을 사용하여 최적화 기회를 위해 PostgreSQL 쿼리를 분석합니다. 쿼리 재작성, 안티 패턴 감지(`SELECT *`, `ORDER BY` 없는 `OFFSET`, `LIMIT` 없는 `ORDER BY`), 누락된 인덱스 제안, 트랜잭션 중 유휴 영향 분석을 반환합니다. SQL 텍스트 또는 쿼리 서명을 수락합니다.

- 결제 데이터베이스에서 쿼리 서명 `abc123def`를 최적화해.
- 이 SQL에 누락된 인덱스 및 안티 패턴이 있는지 검사해.
- `db-prod-1`에서 가장 느린 쿼리에 대한 재작성을 제안해.

### `search_datadog_database_plans` {#search-datadog-database-plans}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
[Database Monitoring][26] 쿼리 실행 계획을 검색합니다. 여기에는 데이터베이스 엔진이 어떻게 쿼리를 실행하는지 표시되며, 인덱스 사용량, 조인 전략, 비용 추산이 포함됩니다. 이것을 사용해 쿼리 성능을 분석하고 최적화 기회를 알아보세요.

- 지난 한 시간 동안의 `host:db-prod-1` 느린 쿼리의 실행 계획을 표시해 줘.
- 프로덕션 데이터베이스에서 `@db.plan.type:explain_analyze`가 있는 쿼리 계획을 찾아 줘.
- 기간이 1초보다 큰 `@db.user:app_user`가 있는 실행 계획을 가져와.

### `search_datadog_database_samples` {#search-datadog-database-samples}
*도구 세트: **dbm***\
*필수 권한: `Database Monitoring Read`*\
성능 메트릭을 포함하며 개별 쿼리 실행을 나타내는 [Database Monitoring][26] 쿼리 샘플을 검색합니다. 이것을 사용해 데이터베이스 활동 패턴을 분석하고 느린 쿼리를 식별하며, 데이터베이스 성능 문제를 조사하세요.

- `db:mydb`에서 (지속 시간이 1초보다 큰) `@duration:>1000000000`이 있는 쿼리 샘플을 표시해 줘.
- `host:db-prod-1`에서 `@db.user:app_user`로 필터링된 느린 쿼리를 찾아 줘.
- `@db.query_signature:abc123def`의 최근 쿼리 샘플을 가져와서 성능 패턴을 분석해.

## DDSQL {#ddsql}

[DDSQL][41]을 사용하여 Datadog 데이터를 쿼리하기 위한 도구로, DDSQL은 인프라 리소스, 로그, 메트릭, RUM, 스팬 및 기타 Datadog 데이터 소스를 지원하는 SQL 방언입니다.

### `ddsql_get_spec` {#ddsql-get-spec}
*도구 세트: **ddsql***\
지원되는 SQL 함수, SQL 키워드 및 표준 PostgreSQL과 DDSQL의 차이를 포함한 간결한 DDSQL 기능 사양을 가져옵니다. 지원되는 구문을 이해하려면 쿼리를 작성하기 전에 이 도구를 호출하세요.

- DDSQL에서 지원되는 SQL 함수는 뭐야?
- DDSQL 쿼리 구문 규칙과 PostgreSQL과의 차이점을 표시해 줘.
- DDSQL에서 사용할 수 있는 집계 함수는 뭐야?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*도구 세트: **ddsql***\
DDSQL 데이터 세트를 검색하여 표(퍼블릭 데이터 소스, 참조표) 및 사용 가능한 메트릭을 반환합니다.

- DDSQL에서 쿼리할 수 있는 표는 뭐야?
- Kubernetes와 관련된 DDSQL 표를 검색해 줘.
- DDSQL을 사용한 쿼리에 사용할 수 있는 메트릭을 표시해 줘.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*도구 세트: **ddsql***\
스키마 메타데이터에서 DDSQL 표의 정적 SQL 열을 가져옵니다.

- `aws.ec2_instance` 표에서 사용할 수 있는 열은 뭐야?
- `k8s.pods` 표의 스키마를 표시해 줘.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*도구 세트: **ddsql***\
로그, RUM, 스팬과 같은 비구조적 DDSQL 소스의 필드를 검색하고 순위를 매깁니다(빈도 기준으로 정렬). 이 도구는 검색 가능한 소스에서 `ddsql_schema_get_table_columns`로 폴백하기 전에 스키마를 검색하는 데 사용하세요.

- DDSQL 로그에서 사용할 수 있는 필드는 뭐야?
- 내 RUM 데이터에서 `service` 관련 필드를 찾아 줘.
- 내 스팬 데이터에서 가장 일반적인 필드를 표시해 줘.

### `ddsql_run_query` {#ddsql-run-query}
*도구 세트: **ddsql***\
DDSQL 쿼리를 실행하고 결과를 반환합니다. SQL 구문을 사용한 인프라 리소스, 로그, 메트릭, RUM, 스팬 및 기타 Datadog 데이터 소스 쿼리를 지원합니다. 구문 세부 정보는 [DDSQL 참조][42]를 참조하세요.

- 각 AWS 리전에서 실행 중인 EC2 인스턴스는 몇 개야?
- 지난 한 시간 동안의 오류 로그 수가 가장 많은 서비스를 상위 10개까지 표시해 줘.
- 지난 24시간 동안 호스트별로 그룹화한 평균 CPU 사용량을 쿼리해 줘.

### `ddsql_create_link` {#ddsql-create-link}
*도구 세트: **ddsql***\
주어진 쿼리가 미리 채워진 [DDSQL Editor][41]에 대한 Datadog UI 링크를 생성합니다.

- 이 쿼리에 대한 DDSQL Editor 링크를 생성해.
- 내 인프라 쿼리를 사용해서 DDSQL Editor에 대한 공유 가능한 링크를 생성해.

## Error Tracking {#error-tracking}

Datadog [Error Tracking][49]과의 상호작용을 위한 도구입니다.

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*도구 세트: **error-tracking***\
*필수 권한: `Error Tracking Read`*\
데이터 소스 전체에서(RUM, 로그, 트레이스) Error Tracking 이슈를 검색합니다.

- 지난 24시간 동안 체크아웃 서비스의 모든 Error Tracking 이슈를 표시해 줘.
- 지난 한 주 동안 내 애플리케이션에서 가장 일반적인 오류는 뭐야?
- `service:api`를 사용해 프로덕션 환경에서 Error Tracking 문제를 찾아 줘.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*도구 세트: **error-tracking***\
*필수 권한: `Cases Read` 및 `Error Tracking Read`*\
Datadog에서 특정 Error Tracking 이슈에 관한 상세한 정보를 검색합니다.

- Error Tracking 이슈 `550e8400-e29b-41d4-a716-446655440000` 해결을 도와줘.
- Error Tracking 이슈 `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`의 영향은 뭐야?
- Error Tracking 이슈 `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`를 재현할 테스트 케이스를 생성해 줘.

### `analyze_datadog_error_tracking_errors` {#analyze-datadog-error-tracking-errors}
*도구 세트: **error-tracking***\
*필수 권한: `Error Tracking Read` 및 `Timeseries`*\
SQL 쿼리를 사용하여 Datadog Error Tracking 오류를 분석하고 개수 계산, 집계 및 수치 분석을 수행합니다. 이슈(오류 그룹)가 아닌 개별 오류 샘플을 대상으로 동작합니다.

- 지난 한 시간 동안 서비스별 오류 수를 세어 줘.
- 지난주 체크아웃 서비스의 주요 오류 유형을 보여 줘.
- 버전별 오류를 분석하여 어떤 배포에서 문제가 발생했는지 파악해 줘.

### `update_datadog_error_tracking_issue` {#update-datadog-error-tracking-issue}
*도구 세트: **error-tracking***\
*필수 권한: `Cases Read`, `Cases Write`, `Error Tracking Read` 및 `Error Tracking Write`*\
Datadog Error Tracking 이슈의 상태 또는 담당자를 업데이트합니다.

- Error Tracking 이슈 `550e8400-e29b-41d4-a716-446655440000`을 해결됨으로 표시해 줘.
- Error Tracking 이슈 `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`를 나에게 할당해 줘.
- Error Tracking 이슈 `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`의 상태를 무시됨으로 설정해 줘.

## Feature Flag {#feature-flags}

플래그 및 플래그 환경 생성, 나열, 업데이트 등 [기능 플래그][51] 관리를 위한 도구입니다.

### `list_datadog_feature_flags` {#list-datadog-feature-flags}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read` 및 `Feature Flag Read`*\
페이지 지정을 지원하는 기능 플래그를 목록으로 나열합니다.

- 내 조직의 모든 기능 플래그를 표시해 줘.
- 체크아웃 서비스의 기능 플래그를 목록으로 나열해.

### `get_datadog_feature_flag` {#get-datadog-feature-flag}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read` 및 `Feature Flag Read`*\
특정 기능 플래그에 관한 세부 정보를 검색합니다.

- `dark-mode-enabled` 기능 플래그의 세부 정보를 가져와.
- 플래그 `new-checkout-flow`의 현재 설정은 뭐야?

### `create_datadog_feature_flag` {#create-datadog-feature-flag}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read` 및 `Feature Flag Write`*\
새 기능 플래그를 생성합니다.

- 점진적 롤아웃을 위해 `enable-new-dashboard`라는 기능 플래그를 생성해 줘.
- 베타 기능을 위한 새 부울 기능 플래그를 설정해 줘.

### `list_datadog_feature_flag_environments` {#list-datadog-feature-flag-environments}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read`*\
기능 플래그에 대하여 구성된 환경을 목록으로 나열합니다.

- 사용 가능한 기능 플래그 환경을 표시해 줘.
- 기능 플래그를 사용해 대상으로 지정할 수 있는 환경은 뭐야?

### `list_datadog_feature_flag_allocations` {#list-datadog-feature-flag-allocations}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read` 및 `Feature Flag Read`*\
특정 환경에서 기능 플래그의 할당을 목록으로 나열합니다.

- 프로덕션에서 플래그 `new-checkout-flow`의 할당 규칙을 표시해 줘.

### `update_datadog_feature_flag_environment` {#update-datadog-feature-flag-environment}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read` 및 `Feature Flag Write`*\
특정 환경의 기능 플래그 구성을 업데이트합니다.

- 스테이징 환경에서 `dark-mode` 플래그를 활성화해 줘.
- 프로덕션의 사용자 50%를 대상으로 플래그 `new-checkout-flow`를 롤아웃해.

### `check_datadog_flag_implementation` {#check-datadog-flag-implementation}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Environment Read` 및 `Feature Flag Read`*\
기능 플래그가 코드에 구현되었는지 검사합니다.

- 내 코드베이스에 `enable-new-dashboard` 플래그가 구현되었는지 확인해.

### `sync_datadog_feature_flag_allocations` {#sync-datadog-feature-flag-allocations}
*도구 세트: **feature-flags***\
*필수 권한: `Feature Flag Write`*\
특정 환경에 대한 기능 플래그 할당을 동기화합니다.

- 프로덕션에서 플래그 `new-checkout-flow`의 할당을 동기화해.

## Kubernetes {#kubernetes}

[Kubernetes][55] 리소스를 검색 및 설명하고 모든 클러스터에서 매니페스트를 검색하는 도구입니다.

### `search_datadog_k8s_resources` {#search-datadog-k8s-resources}
*도구 세트: **kubernetes***\
*필수 권한: `Hosts Read` 및 `Teams Read`*\
모든 클러스터에서 [Kubernetes][55] 리소스를 검색합니다. `kubectl` 대신 이 도구를 사용하여 배포, 포드, 노드 등과 같은 Kubernetes 리소스의 상태를 판단하세요. 이 도구에는 로컬 클러스터 액세스가 필요하지 않고, 모든 클러스터에서 작동하며 태그로 강화된 데이터를 반환합니다. 각 결과에 특정 태그 키를 포함할 수 있고, 상위 리소스 이름을 포함하여 리소스 간 관계를 조사할 수도 있습니다(예를 들어 포드가 속하는 배포).

- `production` 네임스페이스에서 상태가 `CrashLoopBackOff`인 모든 포드를 표시해 줘.
- `general2` 클러스터에 진행 중인 롤아웃이 있는 배포를 찾아 줘.
- 내 클러스터의 모든 노드를 CPU 사용량 기준으로 정렬해서 목록으로 나열해.
- 배포를 `service` 및 `env` 기준으로 그룹화해서 환경 전체에 서비스가 어떻게 분포되었는지 표시해 줘.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*도구 세트: **kubernetes***\
*필수 권한: `Hosts Read`*\
특정 [Kubernetes][55] 리소스의 상세한 정보를 가져옵니다. 여기에는 CPU 및 메모리 요청, 한도와 같은 리소스별 세부 정보를 포함하며, 선택 사항으로 태그, 레이블, 어노테이션, 매니페스트 기록, 상위 리소스 및 [Kubernetes 탐색기][55]에 대한 딥 링크도 포함합니다. `kubectl describe` 대신 이 도구를 사용하세요. 이전 검색에서 UID를 사용하거나, 리소스 식별자(클러스터, 네임스페이스 및 리소스 이름)를 제공하여 리소스를 식별합니다. 원시 매니페스트 전체의 경우, `get_datadog_k8s_manifest`를 사용하세요.

- 클러스터 `prod`, 네임스페이스 `default`의 포드 `my-app`을 설명해.
- 네임스페이스 `default`, 클러스터 `staging`의 배포 `api-server` 세부 정보를 가져와.
- 이 Kubernetes 리소스의 태그와 어노테이션을 표시해 줘.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*도구 세트: **kubernetes***\
*필수 권한: `Hosts Read`*\
특정 [Kubernetes][55] 리소스의 YAML 매니페스트를 검색합니다. `kubectl get -o yaml` 대신 이 도구를 사용하세요. `kubectl` JSONPath 표현식을 사용한 특정 서브트리 추출을 지원하며 `status` 및 `managedFields`를 생략하는 간결한 모드를 지원하여 응답 크기를 줄입니다.

- 클러스터 `prod`, 네임스페이스 `default`의 포드 `my-app`에 대한 매니페스트를 가져와 .
- 네임스페이스 `default`, 클러스터 `staging`의 배포 `api-server`에 대한 컨테이너 포트를 표시해 줘.
- 포드 `my-app`의 매니페스트에서 컨테이너 이미지를 가져와.

## 네트워크 {#networks}

[Cloud Network Monitoring][31] 분석 및 [Network Device Monitoring][32] 도구입니다.

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*도구 세트: **networks***\
*필수 권한: `Network Connections Read`*\
[Cloud Network Monitoring][31] 데이터를 사용하여 네트워크 수준 문제를 조사하고, 네트워크 흐름 데이터를 분석하여 재전송 비율 상승과 같은 이상을 감지합니다.

- 내 웹 서버와 데이터베이스 클러스터 간의 네트워크 트래픽을 분석해 줘.
- `service:api`와 `service:payments` 사이에 재전송 문제가 있어?
- 프로덕션 환경에서 네트워크 흐름 데이터에 이상이 있는지 조사해.

### `search_ndm_devices` {#search-ndm-devices}
*도구 세트: **networks***\
*필수 권한: `NDM Read`*\
Datadog [Network Device Monitoring][32]이 모니터링하는 네트워크 장치(라우터, 스위치, 방화벽)를 검색합니다.

- `us-east-1` 데이터 센터의 모든 네트워크 장치를 표시해 줘.
- 오류를 보고하는 방화벽을 찾아 줘.
- 모든 모니터링되는 스위치와 그 상태를 목록으로 나열해.

### `get_ndm_device` {#get-ndm-device}
*도구 세트: **networks***\
*필수 권한: `NDM Read`*\
특정 네트워크 장치에 관한 상세한 정보를 검색합니다(장치 ID 기준).

- 네트워크 장치 `device:abc123`의 세부 정보를 가져와.
- 이 라우터의 구성과 상태를 표시해 줘.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*도구 세트: **networks***\
*필수 권한: `NDM Read`*\
특정 장치의 모든 네트워크 인터페이스를 검색합니다.

- 장치 `device:abc123`의 모든 인터페이스를 표시해 줘.
- 내 코어 라우터의 인터페이스 상태를 목록으로 나열해.

## 온보딩 {#onboarding}

가이드가 있는 Datadog 설정 및 구성을 위한 에이전틱 온보딩 도구입니다.

### `browser_onboarding` {#browser-onboarding}
*도구 세트: **onboarding***\
*필수 권한: `RUM Apps Read`*\
Broswer RUM을 Datadog에 온보딩하는 과정을 안내합니다.

- 웹 애플리케이션에 대해 Browser RUM 모니터링을 설정하게 도와줘.

### `devices_onboarding` {#devices-onboarding}
*도구 세트: **onboarding***\
*필수 권한: `RUM Apps Read`*\
장치를 Datadog 모니터링에 온보딩하는 과정을 안내합니다.

- Datadog에서 장치 모니터링을 설정하게 도와줘.

### `kubernetes_onboarding` {#kubernetes-onboarding}
*도구 세트: **onboarding***\
*필수 권한: 없음*\
Kubernetes 클러스터를 Datadog에 온보딩하는 과정을 안내합니다.

- Kubernetes 클러스터에 대해 Datadog 모니터링을 설정하게 도와줘.

### `llm_observability_onboarding` {#llm-observability-onboarding}
*도구 세트: **onboarding***\
Datadog에서 Agent Observability를 온보딩하는 과정을 안내합니다.

- AI 애플리케이션에 대해 Agent Observability를 설정하게 도와줘.

### `test_optimization_onboarding` {#test-optimization-onboarding}
*도구 세트: **onboarding***\
*필수 권한: 없음*\
Datadog에서 Test Optimization을 온보딩하는 과정을 안내합니다.

- CI 파이프라인에 대한 Test Optimization 설정을 도와줘.

### `serverless_onboarding` {#serverless-onboarding}
*도구 세트: **onboarding***\
*필수 권한: 없음*\
서버리스 애플리케이션을 Datadog에 온보딩하는 과정을 안내합니다. 여기에는 AWS Lambda 함수 및 GCP Cloud Run과 Cloud Run 함수(Gen2)가 포함됩니다.

- Datadog으로 AWS Lambda 함수를 모니터링하게 도와줘.
- Datadog으로 GCP Cloud Run 서비스를 모니터링하게 도와줘.
- Datadog으로 GCP Cloud Run 함수를 모니터링하게 도와줘.

### `source_map_uploads` {#source-map-uploads}
*도구 세트: **onboarding***\
RUM 오류 매핑을 위해 소스 맵을 업로드하는 과정을 안내합니다.

- 소스 맵을 업로드해 RUM 오류에 원본 소스 코드가 표시되게 도와줘.

## 프로파일링 {#profiling}
서비스, 런타임 및 트레이스 전반에 걸쳐 [Continuous Profiler][62] 데이터를 검색, 탐색 및 분석하기 위한 읽기 전용 도구입니다.

### `get_profiling_profile_types` {#get-profiling-profile-types}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
주어진 쿼리 컨텍스트(쿼리 문자열 및 시간 범위) 또는 트레이스/스팬 컨텍스트에 대해 사용 가능한 프로파일 유형 및 패밀리를 반환합니다. 먼저 이 도구를 사용하여 어떤 데이터를 쿼리할 수 있는지 확인합니다.

- 지난 한 시간 동안 `service:checkout-api`에 대해 사용 가능한 프로파일 유형을 보여줘.
- 트레이스 `7d5d747be160e280504c099d984bcfe0`에 대해 사용 가능한 프로파일 패밀리는 뭐야?
- 프로덕션 환경에서 사용 가능한 프로파일 유형을 나열해.

### `get_profiling_services` {#get-profiling-services}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
범위 내의 프로파일링된 서비스 및 해당 프로파일링 패밀리를 나열합니다. 결과는 정렬되지 않으며 중요도나 활동 수준을 의미하지 않습니다.

- 프로덕션 환경에서 프로파일링이 활성화된 모든 서비스를 나열해.
- JVM 프로파일링 데이터가 있는 서비스를 보여줘.
- 결제 팀 환경에서 프로파일링되는 서비스는 뭐야?

### `get_profiling_runtime_ids` {#get-profiling-runtime-ids}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
범위 내의 개별 프로파일링된 런타임 ID(프로세스 또는 컨테이너)를 반환합니다. 기본값은 CPU 사용량 기준 상위 1개이며, limit 파라미터로 개수를 제어할 수 있습니다.

- `service:checkout-api`에 대해 CPU 사용량 기준 상위 10개 런타임 ID를 보여줘.
- 내 Go 서비스에서 CPU 사용량이 가장 높은 런타임을 가져와.
- 지난 한 시간 동안 결제 서비스의 프로파일링된 런타임 ID를 나열해.

### `get_profiling_service_insights` {#get-profiling-service-insights}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
상위 수준 요약, 컨텍스트 신호(영향받는 메서드, 패키지, 프로세스) 및 권장 후속 조치를 포함한 사전 계산된 서비스 인사이트를 반환합니다.

- `service:checkout-api`에 대한 프로파일링 인사이트를 보여줘.
- 결제 서비스에서 표시된 성능 문제는 뭐야?
- 내 Java 서비스에 대한 프로파일링 권장 사항을 보여줘.

### `explore_profiling_flame_graph` {#explore-profiling-flame-graph}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
지정된 프로파일 유형에 대해 값 기여도 기준 상위 N개의 스택 트레이스를 반환합니다. 프레임, 엔드포인트 또는 속성 정규식으로 필터링할 수 있습니다. 단일 서비스만 지원합니다. `service:family` 또는 traceContext를 수락합니다.

- 지난 한 시간 동안 `service:checkout-api`의 CPU 플레임 그래프를 보여줘.
- 결제 서비스의 주요 메모리 할당 병목 지점을 찾아줘.
- 트레이스 `7d5d747be160e280504c099d984bcfe0`의 플레임 그래프를 탐색해.

### `explore_profiling_call_graph` {#explore-profiling-call-graph}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
지정된 프로파일 유형에 대한 주요 함수의 호출 그래프(호출자-피호출자 관계)를 반환합니다. 기본적으로 상위 20개 노드, 5% 임계값 및 노드당 5개 간선을 사용합니다. 단일 서비스만 지원합니다.

- `service:checkout-api`의 CPU 사용량이 높은 함수에 대한 호출 그래프를 보여줘.
- 내 Go 서비스에서 가장 느린 경로로 호출되는 함수는 뭐야?
- 결제 서비스의 메모리 할당 호출 그래프를 가져와.

### `explore_profiling_timeline` {#explore-profiling-timeline}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
CPU 및 I/O 활동과 함께 레인 그룹 타임라인(스레드, 가비지 컬렉션 등)을 반환합니다. 스팬 내 지연 시간 병목 현상을 식별하기 위해 임계 경로 모드(Go 전용, traceContext 필요)를 지원합니다.

- 지난 15분 동안 `service:checkout-api`의 스레드 타임라인을 보여줘.
- 내 Go 서비스의 트레이스 `abc123`에 대한 임계 경로를 찾아줘.
- 지연 시간 급증 시점의 가비지 컬렉션 및 CPU 활동을 탐색해.

### `get_profiling_timeseries` {#get-profiling-timeseries}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
시계열(rate 메트릭) 형태로 집계된 프로파일링 데이터를 반환합니다. 추세 분석, 서비스 간 비교 및 회귀 탐지에 적합합니다. 프레임 필드, 컨텍스트 및 태그 기준 그룹화를 지원합니다.

- 지난 24시간 동안 `service:checkout-api`의 CPU 프로파일 시계열을 보여줘.
- 버전별로 그룹화하여 내 Java 서비스들의 메모리 할당률을 비교해.
- 배포 기준으로 그룹화하여 지난주 프로파일 회귀를 탐지해.

### `get_profiling_tag_names` {#get-profiling-tag-names}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
프로파일링 데이터 필터링에 사용할 수 있는 태그 이름(service, host, env, version, family, runtime-id, kube_* 등)을 검색합니다. 관련도 순으로 최대 50개 결과를 반환합니다.

- 프로덕션 환경의 프로파일링 데이터 필터링에 사용할 수 있는 태그 이름은 뭐야?
- `service:checkout-api`에 대한 프로파일링 태그 이름을 나열해.

### `get_profiling_tag_values` {#get-profiling-tag-values}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
특정 프로파일링 태그(예: service 태그)의 값을 반환합니다. 빈도순으로 정렬된 최대 50개 결과를 반환합니다.

- 지난 한 시간 동안 결제 서비스에 대해 프로파일링 데이터가 있는 버전은 뭐야?
- `service:checkout-api`에 대해 프로파일링 데이터가 가장 많은 데이터센터 2개는 어디야?

### `get_profiling_fields` {#get-profiling-fields}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
`get_profiling_timeseries`의 그룹화 및 필터 파라미터에서 사용할 수 있는 프레임 및 컨텍스트 패싯 필드(`@stack.function`, `@labels.trace_endpoint` 등)를 검색합니다. sampleType 범위 내에서 동작합니다.

- CPU 프로파일에 대해 그룹화에 사용할 수 있는 프레임 필드는 뭐야?
- 메모리 할당 프로파일에 사용할 수 있는 패싯 필드를 보여줘.
- `service:checkout-api`에 대해 시계열 필터링에 사용할 수 있는 컨텍스트 필드를 나열해.

### `get_profiling_field_values` {#get-profiling-field-values}
*도구 세트: **profiling***\
*필수 권한: `Continuous Profiler Read`*\
`get_profiling_fields`을 통해 검색된 특정 프레임 또는 컨텍스트 필드의 값을 반환합니다. 결과는 빈도순으로 정렬됩니다.

- CPU 프로파일에서 `@stack.function`의 상위 값을 보여줘.
- `@labels.trace_endpoint`의 상위 엔드포인트 값을 가져와.
- 메모리 할당 프로파일의 package 필드 값을 나열해.

## 참조 표 {#reference-tables}

표 나열, 행 읽기, 행 추가, 클라우드 스토리지에서 표 생성을 포함한 [참조표][45] 관리 도구입니다.

### `list_reference_tables` {#list-reference-tables}
*도구 세트: **reference-tables***\
조직의 [참조표][45]를 목록으로 나열 및 검색하며, 이름 기준으로 필터링 및 정렬(선택 사항)이 있습니다.

- 내 조직의 모든 참조표를 목록으로 나열해 줘.
- 이름에 `customer`가 있는 참조표를 찾아 줘.
- 참조표를 마지막 업데이트 시간 기준으로 정렬해서 표시해 줘.

### `get_reference_table_rows` {#get-reference-table-rows}
*도구 세트: **reference-tables***\
참조표에서 기본 키 값을 기준으로 특정 행을 검색합니다. 우선 `list_reference_tables`를 사용해 표 ID 및 스키마를 찾으세요.

- 사용자 참조표에서 기본 키 `user001` 및 `user002`가 있는 행을 가져와.
- 계정 표에서 계정 ID가 `acct-123`인 항목을 조회해.

### `append_reference_table_rows` {#append-reference-table-rows}
*도구 세트: **reference-tables***\
기존 참조표에 새 행을 추가합니다. 이 작업은 행만 추가하며 기존 데이터를 수정하거나 삭제하지 않습니다. 각 행에는 기본 키 필드를 비롯한 표 스키마의 필수 필드를 모두 포함해야 합니다.

- 사용자 표에 이름이 `Carol`이고 나이가 `28`인 사용자 `user003`에 대한 새 행을 추가해 줘.
- 이 다섯 개의 새 계정 항목을 계정 참조표에 추가해.

### `create_reference_table` {#create-reference-table}
*도구 세트: **reference-tables***\
Amazon S3, Google Cloud Storage 또는 Azure Blob Storage에서 CSV 파일로 지원되는 새 참조표를 생성합니다. `INT32` 및 `STRING` 필드 유형만 지원됩니다.

- 내 S3 버킷 `my-data-bucket`의 파일 `allowlist.csv`에서 `ip_allowlist`라는 참조표를 생성해 줘.
- 자동 동기화를 활성화한 상태로 `customer_tiers`라는 새 GCS 기반 참조표를 설정해 줘.

## 원격 작업 {#remote-actions}

<div class="alert alert-info">해당 <code>remote-actions</code> 도구 세트는 미리 보기 상태입니다. <a href="https://www.datadoghq.com/product-preview/datadog-agent-mcp/">액세스하려면 등록하세요.</a></div>

Datadog Agent가 설치된 호스트에서 읽기 전용 진단을 실행하기 위한 도구입니다. 명령은 [제한된 셸 인터프리터][63]를 사용하는 Private Action Runner(PAR)를 통해 호스트에 전달됩니다. 모든 명령은 안전한 Go 내장 함수로 실행되며, 쓰기 권한, 외부 바이너리 실행 및 네트워크 송신이 없습니다. 허용된 명령 목록은 Datadog 백엔드에서 Agent 버전별로 제어됩니다.

### `datadog_remote_action_restricted_shell_run_command` {#datadog-remote-action-restricted-shell-run-command}
*도구 세트: **remote-actions***\
*필수 권한: `Connections Resolve` 및 `Private Action Runner Contribute`*\
지정된 호스트에서 읽기 전용 셸 명령을 실행합니다. 지원되는 명령에는 `cat`, `ls`, `head`, `tail`, `find`, `grep`, `sed`, `cut`, `sort`, `uniq`, `wc`, `ping`, `ss`, `ip`가 포함됩니다. 파이프, 루프, 조건문, 변수 할당 및 글로빙을 지원합니다.

- 호스트 `prod-web-01`의 Datadog Agent 로그 마지막 100줄을 보여줘.
- 지난 한 시간 동안 호스트 `db-replica-3`의 `/var/log/app/`에서 모든 ERROR 항목을 찾아줘.
- 호스트 `prod-worker-07`의 `/etc/datadog-agent/datadog.yaml` 내용을 가져와.

## RUM {#rum}

[Real User Monitoring][58]을 위한 도구로, 애플리케이션 확인, 성능 요약, View에 대한 집계 인사이트 제공, 메트릭 탐색 및 애플리케이션 구성 검사를 지원합니다.

<div class="alert alert-info">해당 <code>rum</code> 도구 세트는 미리 보기 상태입니다. 액세스를 요청하려면 <a href="/help">Datadog 지원팀</a>에 문의하세요.</div>

### `search_rum_applications` {#search-rum-applications}
*도구 세트: **rum***\
*필수 권한: `RUM Apps Read`*\
RUM 애플리케이션을 나열하고 이후 RUM 도구 호출에 사용할 `application_id`를 확인합니다.

- "checkout-web"이라는 이름의 RUM 애플리케이션을 찾아 애플리케이션 ID를 반환해.
- 내 모든 RUM 애플리케이션을 나열해.

### `get_rum_summary` {#get-rum-summary}
*도구 세트: **rum***\
*필수 권한: `RUM Apps Read` 및 `Timeseries`*\
RUM 애플리케이션의 주요 메트릭 요약과 이전 기간 대비 변화를 반환합니다.

- 지난 24시간 동안 "checkout-web" RUM 애플리케이션의 성능을 요약해.
- 내 주요 RUM 애플리케이션의 Core Web Vitals는 전주 대비 어떻게 변했지?

### `get_rum_insight` {#get-rum-insight}
*도구 세트: **rum***\
*필수 권한: `RUM Apps Read`*\
RUM View에 대한 집계 인사이트(워터폴, 긴 작업, 핵심 지표 분포 및 태그 분석)를 반환합니다.

- "shop" 애플리케이션의 `/checkout` 보기에 대해 지난 1시간 동안의 집계 리소스 워터폴을 보여줘.
- 홈페이지의 INP 분포를 장치 유형별로 분석해.

### `search_rum_metrics` {#search-rum-metrics}
*도구 세트: **rum***\
*필수 권한: `RUM Apps Read`*\
기본 제공 메트릭과 사용자 지정 메트릭을 포함하여 애플리케이션의 RUM 메트릭을 탐색합니다.

- "checkout-web" 애플리케이션에 정의된 사용자 지정 RUM 메트릭을 나열해.
- 주요 애플리케이션에서 페이지 로드 시간과 관련된 사용 가능한 RUM 메트릭을 보여줘.

### `search_rum_retention_filters` {#search-rum-retention-filters}
*도구 세트: **rum***\
*필수 권한: `RUM Retention Filters Read`*\
RUM 애플리케이션에 구성된 보존 필터를 나열합니다. 읽기 전용이며 [RUM without Limits][59] 고객에게 제공됩니다.

- "checkout-web" 애플리케이션에 구성된 보존 필터를 나열해.
- 내 주요 RUM 애플리케이션에 어떤 보존 필터가 설정되어 있지?

## 보안 {#security}

코드 보안 스캔, [보안 신호][53] 분석, 검색 및 분류, [탐지 규칙][60] 및 [억제 규칙][61] 관리, [보안 발견 사항][54] 분석을 위한 도구입니다.

### `datadog_secrets_scan` {#datadog-secrets-scan}
*도구 세트: **security***\
코드에 하드코딩된 시크릿 및 자격 증명이 있는지 스캔하여 AWS 키, API 키, 비밀번호, 토큰, 프라이빗 키 및 데이터베이스 자격 증명을 감지합니다.

- 내 코드에 하드코딩된 시크릿이 있는지 스캔해.
- 이 파일에 커밋된 API 키 또는 비밀번호가 있는지 검사해.

### `get_datadog_security_signals_schema` {#get-datadog-security-signals-schema}
*도구 세트: **security***\
*필수 권한: `Security Signals Read`*\
보안 신호에 사용할 수 있는 필드와 해당 유형을 반환합니다. 신호 유형은 `Log Detection`, `Application Security`, `Workload Security`과 같은 `@workflow.rule.type` 값에 매핑됩니다.

- 보안 신호를 필터링하는 데 사용할 수 있는 필드는 뭐야?
- Cloud SIEM 신호에 사용할 수 있는 필드를 보여줘.
- 신호 규칙 유형 필드에 사용할 수 있는 enum 값은 뭐야?

### `search_datadog_security_signals` {#search-datadog-security-signals}
*도구 세트: **security***\
*필수 권한: `Security Signals Read`*\
Datadog Security Monitoring에서 Cloud SIEM 신호, 앱 및 API 보호 신호, Workload Protection 신호 등 보안 신호를 검색하고 가져옵니다.

- 지난 24시간 동안의 보안 신호를 표시해 줘.
- 내 프로덕션 환경과 관련된 심각도가 높은 보안 신호를 찾아 줘.
- 의심스러운 로그인 시도로 트리거된 Cloud SIEM 신호를 나열해.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*도구 세트: **security***\
*필수 권한: `Security Signals Read` 및 `Timeseries`*\
집계, 그룹화 및 추세 분석을 위해 SQL 쿼리를 사용하여 보안 신호를 분석합니다. 이것을 계수, top-N 및 시간의 흐름에 따른 분석에 사용하세요. 특정 신호를 목록으로 나열하거나 검색하려면 `search_datadog_security_signals` 또는 `get_datadog_security_signal`을 사용합니다.

- 지난 7일 동안의 신호 수를 기준으로 상위 10개의 SIEM 규칙을 표시해 줘.
- 심각도가 높음, 중요함인 보안 신호를 세어 심각도 기준으로 그룹화해 줘.
- 어제 서비스별로 발생한 앱 및 API 보호 신호는 몇 개였어?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*도구 세트: **security***\
*필수 권한: `Security Signals Read`*\
ID별로 보안 신호 하나의 전체 세부 정보를 검색합니다. 여기에는 속성, 규칙 정보, 분류 상태, 태그 및 케이스 상호 연결이 포함됩니다.

- 보안 신호 `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`의 전체 세부 정보를 가져와.
- 이 신호의 규칙, 분류 상태 및 연결된 케이스를 보여줘.

### `update_datadog_security_signals_triage` {#update-datadog-security-signals-triage}
*도구 세트: **security***\
*필수 권한: `Security Signals Write`*\
하나 이상의 보안 신호(최대 500개)의 분류 상태 또는 담당자를 일괄 업데이트합니다. 업데이트할 신호 ID 목록 또는 일치하는 모든 신호를 대상으로 하는 필터 쿼리를 수락합니다.

- 지난 24시간 동안 "무차별 대입 로그인" 규칙에서 생성된 모든 신호를 보관 처리해.
- `service:checkout`에 대한 모든 열린 신호를 검토 중 상태로 변경하고 나에게 할당해.
- 신호 `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`을 "테스트" 사유로 보관 처리해.

### `get_datadog_security_detection_rules_schema` {#get-datadog-security-detection-rules-schema}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Rules Read`*\
탐지 규칙을 위한 작성 참조 정보와 스키마를 반환합니다. 지원되는 규칙 유형, 탐지 방법, 쿼리 구문, 태그 규칙 및 유효한 검색 패싯을 포함합니다. 탐지 규칙을 작성하거나 조회하기 전에 사용하세요. 현재 지원되는 규칙 유형은 로그 탐지, API 보안 및 AppSec입니다.

- 임계값 기반 탐지 규칙 생성 시 사용할 수 있는 필드와 옵션은 뭐야?
- 시퀀스 탐지 규칙의 스키마를 보여줘.
- 탐지 규칙 API에서 사용하는 태그 규칙과 쿼리 구문은 뭐야?

### `list_datadog_security_detection_rules` {#list-datadog-security-detection-rules}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Rules Read`*\
조직의 탐지 규칙을 나열합니다. 탐지 규칙은 보안 신호가 생성되는 조건을 정의합니다. 선택적으로 자유 텍스트 쿼리를 사용하여 서버 측에서 결과를 필터링할 수 있습니다. 특정 규칙의 전체 정의를 가져오려면 `get_datadog_security_detection_rule`를 사용하세요.

- 활성화된 모든 Cloud SIEM 탐지 규칙을 나열해.
- `source:cloudtrail` 태그가 지정된 탐지 규칙을 보여줘.
- 불가능한 이동 탐지에 사용되는 규칙은 뭐야?

### `get_datadog_security_detection_rule` {#get-datadog-security-detection-rule}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Rules Read`*\
ID를 기준으로 단일 탐지 규칙의 전체 정의를 조회하며, 쿼리, 케이스, 옵션, 필터 및 메타데이터를 포함합니다. 규칙 ID를 찾으려면 `list_datadog_security_detection_rules`을 사용하세요.

- 탐지 규칙 `abc-123-def`의 전체 정의를 가져와.
- 이 신호를 생성하는 규칙의 쿼리와 케이스를 보여줘.
- 이 탐지 규칙은 어떤 임계값과 그룹화 필드를 사용해?

### `get_datadog_security_suppressions` {#get-datadog-security-suppressions}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Suppressions Read`*\
보안 모니터링 억제 규칙을 조회합니다. 전체 억제 규칙 목록 조회, 특정 ID 조회, 특정 탐지 규칙에 영향을 주는 억제 규칙 조회의 세 가지 모드를 지원합니다. 억제 규칙은 일치하는 조건에 대해 탐지 규칙이 신호를 생성하지 않도록 합니다.

- 현재 활성화된 모든 억제 규칙을 나열해.
- 탐지 규칙 `abc-123-def`에 적용되는 억제 규칙을 보여줘.
- 억제 규칙 `sup-456-xyz`의 전체 세부 정보를 가져와.

### `create_datadog_security_suppression` {#create-datadog-security-suppression}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Suppressions Write`*\
특정 조건에 대해 탐지 규칙이 신호를 생성하지 못하도록 하는 새 억제 규칙을 생성합니다. `suppression_query` 또는 `data_exclusion_query` 중 하나 이상을 제공해야 합니다.

- IP `10.0.0.1`에 대해 무차별 대입 규칙의 신호를 억제해.
- 이상 탐지 규칙에서 `staging` 환경을 무시하는 억제 규칙을 생성해.
- `@usr.email`가 테스트 계정과 일치하는 경우 규칙 `abc-123-def`의 신호를 억제해.

### `update_datadog_security_suppression` {#update-datadog-security-suppression}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Suppressions Write`*\
기존 억제 규칙을 업데이트합니다. 제공된 필드만 변경합니다. `version`을 제공하면 동시 수정으로 인한 덮어쓰기를 방지하기 위한 낙관적 동시성 제어를 사용할 수 있습니다.

- 무차별 대입 규칙용 억제 규칙에 `10.0.0.2`도 제외 대상으로 추가해.
- 억제 규칙 `sup-456-xyz`의 만료일을 다음 분기로 변경해.
- 이상 탐지 규칙용 억제 규칙을 삭제하지 않고 비활성화해 줘.

### `delete_datadog_security_suppression` {#delete-datadog-security-suppression}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Suppressions Write`*\
억제 규칙을 삭제합니다.

- 억제 규칙 `sup-456-xyz`를 삭제해.
- 무차별 대입 탐지 규칙을 무음 처리하고 있던 억제 규칙을 제거해.

### `get_datadog_security_findings_schema` {#get-datadog-security-findings-schema}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read`*\
보안 발견 사항에 대한 스키마(사용 가능한 필드 및 각 필드의 유형)를 반환합니다. 쿼리 가능한 필드를 확인하기 위해 `analyze_datadog_security_findings`을 사용하기 전에 먼저 호출해야 합니다. 발견 사항 유형에 따른 필터링과 응답 크기 조절을 지원합니다.

- 보안 발견 사항에 사용할 수 있는 필드는 뭐야?
- 라이브러리 취약점 발견 사항의 스키마를 보여줘.
- 설명까지 포함된 전체 구성 오류 발견 사항 스키마를 가져와.

### `analyze_datadog_security_findings` {#analyze-datadog-security-findings}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read` 및 `Timeseries`*\
SQL 쿼리를 사용하여 보안 발견 사항을 분석하는 기본 도구입니다. 유연한 SQL 집계, 필터링, 그룹화를 사용해 지난 24시간 동안의 실시간 데이터를 쿼리합니다. 먼저 `get_datadog_security_findings_schema`을 호출하여 사용 가능한 필드를 확인한 후 이 도구를 사용하여 쿼리합니다.

- 가장 중요한 발견 사항이 있는 상위 10개 규칙을 보여줘.
- 열린 발견 사항을 심각도와 발견 사항 유형별로 집계해.
- 익스플로잇이 존재하는 라이브러리 취약점을 리소스별로 그룹화하여 찾아줘.

### `search_datadog_security_findings` {#search-datadog-security-findings}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read`*\
전체 보안 발견 사항 세부 정보를 가져오는 폴백 도구입니다. 대부분의 분석 작업에는 `analyze_datadog_security_findings` 사용을 권장합니다. 이 도구는 완전한 탐지 객체가 필요하거나 SQL 쿼리로는 충분하지 않을 때에만 사용하세요.

- 내 AWS 환경에서 중요한 발견에 대한 전체 세부 정보를 가져와.
- 특정 규칙에 대한 완전한 탐지 객체를 조회해.
- 열린 ID 위험 발견 사항을 전체 메타데이터와 함께 나열해.

### `get_datadog_security_findings_ticket_suggestions` {#get-datadog-security-findings-ticket-suggestions}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read`, `Cases Read`*\
보안 발견 사항 티켓 발행을 위한 프로젝트 추천 결과를 반환합니다. 사용 가능한 Case Management, Jira 및 ServiceNow 프로젝트와 최근 30일 사용 데이터를 보여줍니다. 사용할 프로젝트를 확인하기 위해 `create_datadog_security_findings_ticket` 전에 호출합니다.

- 보안 발견 사항 티켓을 생성할 때 사용할 수 있는 Jira 프로젝트는 뭐야?
- 사용 가능한 ServiceNow 프로젝트를 보여줘.
- 보안 발견 사항에 가장 많이 사용되는 Case Management 프로젝트는 뭐야?

### `create_datadog_security_findings_ticket` {#create-datadog-security-findings-ticket}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Write`, `Cases Read`, `Cases Write`*\
보안 발견 사항에 대해 Case Management 케이스, Jira 이슈 또는 ServiceNow 티켓을 생성합니다. 특정 발견 사항 ID와 프로젝트 ID가 필요합니다. 사용 가능한 프로젝트를 확인하려면 먼저 `get_datadog_security_findings_ticket_suggestions`를 사용하세요.

- 프로젝트 SECURITY에 대해 이러한 중요한 발견 사항용 Jira 티켓을 생성해 줘.
- 이 규칙의 발견 사항에 대해 Case Management 케이스를 생성해.
- 이 라이브러리 취약점에 대해 ServiceNow 티켓을 생성해.

### `detach_datadog_security_findings_ticket` {#detach-datadog-security-findings-ticket}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Write`, `Cases Write`*\
보안 발견 사항과 연결된 케이스 또는 티켓의 연결을 해제합니다. Jira 및 ServiceNow 티켓은 Case Management를 통해 연결되므로, 케이스 연결을 해제하면 하위 티켓 연결도 함께 해제됩니다.

- 이 발견 사항들을 연결된 Jira 티켓에서 분리해.
- 이 발견 사항들의 케이스 연결을 제거해.

### `mute_datadog_security_findings` {#mute-datadog-security-findings}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Write`*\
보안 발견 사항을 음소거하거나 음소거를 해제하여 경고 및 대시보드에서 제외합니다. 음소거 사유(`PENDING_FIX`, `FALSE_POSITIVE`, `ACCEPTED_RISK` 또는 `OTHER`)가 필요하며, 선택적으로 설명과 만료일을 지정할 수 있습니다.

- 이 발견 사항들을 오탐으로 음소거해.
- 이 구성 오류를 허용된 위험으로 음소거하고 90일 후 만료되도록 설정해.
- 이전에 수정 보류 중으로 표시된 발견 사항의 음소거를 해제해.

### `assign_datadog_security_findings` {#assign-datadog-security-findings}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Write`*\
보안 발견 사항을 사용자에게 할당하거나 할당을 해제합니다. 할당은 연결된 모든 케이스에도 적용됩니다. 담당자 ID를 생략하면 할당이 해제됩니다.

- 이 중요한 발견 사항들을 보안 팀 리더에게 할당해.
- 더 이상 관련이 없는 발견 사항의 할당을 해제해.
- 이 규칙의 모든 발견 사항을 나에게 할당해.

## 소프트웨어 배포 {#software-delivery}

소프트웨어 배포([CI Visibility][48] 및 [Test Optimization][24])와의 상호작용을 위한 도구입니다.

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*도구 세트: **software-delivery***\
*필수 권한: `CI Visibility Read`*\
필터를 사용해 CI 이벤트를 검색하고 그에 관한 세부 정보를 반환합니다.

- 내 커밋 `58b1488`에 대한 모든 파이프라인을 보여줘.
- 브랜치 `my-branch`에서 발생한 최신 파이프라인 실패를 보여줘.
- 내 브랜치 `my-branch`에서 항상 실패하는 작업 `integration-test`에 대한 수정 방안을 제안해 줘.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*도구 세트: **software-delivery***\
*필수 권한: `CI Visibility Read`*\
CI 파이프라인 이벤트를 집계하여 통계, 메트릭 및 그룹화된 분석을 생성합니다.

- 지난 7일 동안 평균 작업 실행 시간은 얼마나 돼?
- 지난 2주 동안 실패한 파이프라인은 몇 개였지?
- 파이프라인 이름별로 그룹화한 파이프라인 실행 시간의 95백분위수를 보여줘.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
Datadog [Test Optimization][24]에 불안정한 테스트가 있는지 검색하고 분류 세부 정보(실패율, 카테고리, 소유자, 기록, CI 영향)를 반환합니다(페이지 지정, 정렬 포함).

- 소유자가 `@team-abc`인 체크아웃 서비스의 활성 불안정한 테스트를 실패율 순으로 정렬하여 보여줘.
- 리포지토리 `github.com/org/repo`의 브랜치 `main`에 있는 불안정한 테스트를 최신순으로 보여줘.
- 우선적으로 수정할 수 있도록 실패율이 높은(50% 이상) `timeout` 범주의 불안정한 테스트를 나열해.

### `update_datadog_flaky_test_states` {#update-datadog-flaky-test-states}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Write`*\
하나 이상의 불안정한 테스트 상태를 `quarantined`(실패 억제), `disabled`(테스트 건너뛰기), `fixed`(해결됨으로 표시) 또는 `active`(복원)으로 설정합니다. 이 작업은 쓰기 작업이며 명시적인 사용자 승인이 필요합니다. 모든 상태 변경은 되돌릴 수 있습니다.

- `checkout-service` 리포지토리에서 활성인 모든 불안정한 테스트를 격리해.
- 불안정한 테스트 `AuthServiceTest::testLogin`을 수정됨으로 표시해.
- 실패율이 50%를 초과하는 `@team-payments` 소유의 불안정한 테스트를 비활성화해.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
Datadog Test Optimization 이벤트를 집계하여 안정성 및 성능 추세를 집계 함수, 선택적 메트릭, 그룹화 기준 패싯, 구성 가능한 테스트 수준으로 수량화합니다.

- 지난주 실패한 테스트 수를 브랜치별로 집계해.
- 가장 느린 테스트를 식별할 수 있도록 각 테스트 모음의 95백분위 실행 시간을 보여줘.
- 통과 및 실패한 모든 테스트 수를 코드 소유자별로 집계해.

### `search_datadog_test_events` {#search-datadog-test-events}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
필터를 사용해 [Test Optimization][24] 테스트 이벤트를 검색하고 그에 관한 세부 정보를 반환합니다.

- 지난 24시간 동안 브랜치 `main`에서 실패한 테스트를 보여줘.
- 커밋 `abc123`의 테스트 실행 결과를 가져와 어떤 테스트가 통과하고 실패했는지 확인해.
- 체크아웃 서비스의 모든 불안정한 테스트 실행을 보여줘.
- `@team-name` 소유의 실패 중인 테스트를 찾아줘.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*도구 세트: **software-delivery***\
*필수 권한: `Code Coverage read`*\
리포지토리 브랜치의 집계된 코드 커버리지 요약 메트릭을 가져옵니다. 여기에는 총 커버리지, 패치 커버리지 및 서비스/코드 소유자 분석이 포함됩니다.

- `github.com/my-org/my-repo`의 `main` 브랜치 코드 커버리지는 뭐야?
- `github.com/my-org/my-repo`의 `release/1.x` 브랜치에 대한 커버리지 요약을 보여줘.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*도구 세트: **software-delivery***\
*필수 권한: `Code Coverage read`*\
리포지토리 커밋의 집계된 코드 커버리지 요약 메트릭을 가져옵니다. 여기에는 총 커버리지, 패치 커버리지 및 서비스/코드 소유자 분석이 포함됩니다.

- `github.com/my-org/my-repo`의 커밋 `abc123abc123abc123abc123abc123abc123abcd`에 대한 코드 커버리지를 보여줘.
- 내 브랜치 최신 커밋의 패치 커버리지는 뭐야?

### `get_datadog_test_optimization_settings` {#get-datadog-test-optimization-settings}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
서비스에 대해 활성화된 Test Optimization 기능을 검색합니다. 여기에는 테스트 영향 분석(ITR), 조기 플레이크 감지(EFD), 자동 테스트 재시도(ATR), 실패한 테스트 재생, Code Coverage 수집 및 PR 댓글이 포함됩니다.

- `auth-service`에 어떤 Test Optimization 기능이 활성화되어 있지?
- 내 체크아웃 서비스의 Test Optimization 설정을 보여줘.

### `get_datadog_flaky_tests_management_policies` {#get-datadog-flaky-tests-management-policies}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
리포지토리에 구성된 불안정한 테스트 관리 정책을 조회합니다. 여기에는 자동 격리 기간, 브랜치 규칙, 실패율 임계값, 비활성화 정책 및 재시도 설정이 포함됩니다.

- `github.com/my-org/my-repo`의 불안정한 테스트 관리 정책을 보여줘.
- 체크아웃 서비스 리포지토리에 구성된 자동 격리 규칙은 뭐야?

### `search_dora_deployments` {#search-dora-deployments}
*도구 세트: **software-delivery***\
*필수 권한: `DORA Metrics Read`*\
DORA 배포 이벤트를 필터 조건으로 검색하거나, ID를 기준으로 단일 배포의 전체 세부 정보를 조회합니다.

- 지난 7일 동안 `checkout` 서비스의 배포 내역을 보여줘.
- DORA 배포 `abc123`의 세부 정보를 가져와.
- 이번 달 프로덕션 환경에서 실패한 배포를 찾아줘.

### `aggregate_dora_deployments` {#aggregate-dora-deployments}
*도구 세트: **software-delivery***\
*필수 권한: `Timeseries`*\
서비스, 팀 또는 리포지토리에 대한 DORA 메트릭(배포 빈도, 변경 리드 타임, 변경 실패율, 복구 시간)을 단일 값 또는 시계열 형태로 반환합니다. 특정 기간의 소프트웨어 배포 성과에 대한 질문에 사용합니다.

- 지난 30일 동안 `checkout` 서비스의 배포 빈도와 변경 실패율은 뭐야?
- 지난 분기 동안 `payments` 서비스의 변경 리드 타임 추세를 보여줘.
- `auth-service` 팀의 4가지 DORA 메트릭을 모두 보여줘.

## Synthetics {#synthetics}

Datadog [Synthetic 테스트][47]와의 상호작용을 위한 도구입니다.

### `get_synthetics_tests` {#get-synthetics-tests}
*도구 세트: **synthetics***\
*필수 권한: `Synthetics Read`*\
Datadog Synthetic HTTP API 테스트를 검색합니다.

- 엔드포인트 `/v1/my/tested/endpoint`의 Synthetic 테스트가 실패하는 이유를 파악할 수 있도록 도와줘.
- 장애가 발생했어. 도메인 `api.mycompany.com`에서 실패 중인 모든 Synthetic 테스트를 찾아줘.
- 내 웹사이트 `api.mycompany.com`에 대한 Synthetic 테스트가 지난 1시간 동안 정상적으로 동작했어?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*도구 세트: **synthetics***\
*필수 권한: `Synthetics Global Variable Read`, `Synthetics Read` 및 `Synthetics Write`*\
Datadog Synthetic HTTP API 테스트를 편집합니다.

- 내 엔드포인트 `/v1/my/tested/endpoint`에 정의된 Synthetic 테스트의 어설션을 개선해.
- 테스트 `aaa-bbb-ccc`을 일시 중지하고 실행 위치를 유럽 지역으로만 설정해.
- 테스트 `aaa-bbb-ccc`에 내 팀 태그를 추가해.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*도구 세트: **synthetics***\
*필수 권한: `Synthetics Global Variable Read`, `Synthetics Read` 및 `Synthetics Write`*\
Datadog Synthetics HTTP API 테스트를 미리 보고 생성합니다.

- 이 코드 파일에 정의된 모든 엔드포인트에 대해 Synthetic 테스트를 생성해.
- `/path/to/endpoint`에 대한 Synthetic 테스트를 생성해.
- 내 도메인 `mycompany.com`의 가용성을 확인하는 Synthetic 테스트를 생성해.

## 위젯 {#widgets}

[대시보드][46] 및 [노트북][57] 위젯의 시각화, 검증 및 유형 변환을 위한 도구입니다.

### `get_widget` {#get-widget}
*도구 세트: **widgets***\
*필수 권한: `Dashboards Read` 또는 `Timeseries` 또는 `Monitors Read` 또는 `APM Read` 또는 `RUM Apps Read`*\
Datadog 메트릭, 트레이스, 로그 및 기타 데이터를 대화형 차트로 조회하고 시각화합니다. 세 가지 모드(대시보드 조회, 직접 정의, URL 확인)를 지원합니다.

- `service:api`의 지난 한 시간 CPU 사용량 시계열을 보여줘.
- 대시보드 `abc-123-def`의 위젯 `2228368921512806`에 대한 위젯 데이터를 가져와.
- 이 Datadog 공유 링크의 데이터를 시각화해.

### `get_widget_reference_compressed` {#get-widget-reference-compressed}
*도구 세트: **widgets***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read` 또는 `Notebooks Write`*\
위젯 유형에 대한 압축된 TypeScript 스키마와 작성 지침을 반환합니다. 위젯 JSON을 생성하기 전에 호출해야 합니다. 그룹 위젯을 작성할 때는 중복 제거를 위해 `group`과 의도한 하위 위젯 유형을 함께 호출해야 합니다.

- 시계열 위젯의 압축 스키마를 가져와.
- 상위 목록 및 쿼리 표 위젯의 작성 지침을 보여줘.

### `search_datadog_widgets` {#search-datadog-widgets}
*도구 세트: **widgets***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read` 또는 `Notebooks Write`*\
Datadog 대시보드 전반의 위젯을 검색하고, 위젯 ID, 제목 및 기본 쿼리 정보를 조회합니다.

- `system.cpu.user` 메트릭을 조회하는 모든 시계열 위젯을 찾아줘.
- 모든 대시보드에서 오류율과 관련된 위젯을 검색해.

### `swap_widget_type` {#swap-widget-type}
*도구 세트: **widgets***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read` 또는 `Notebooks Write`*\
쿼리를 유지한 채 위젯 정의를 다른 시각화 유형으로 변환합니다. 수식 기반 요청을 사용하는 위젯 유형(timeseries, query_value, top list, query_table, treemap, sunburst, distribution, heatmap, geomap 및 list_stream)을 지원합니다.

- 이 시계열 위젯을 상위 목록으로 변환해 줘.
- 이 쿼리 표 위젯을 트리맵 시각화로 바꿔줘.

### `validate_notebook_cell` {#validate-notebook-cell}
*도구 세트: **widgets***\
*필수 권한: `Timeseries`*\
analysis_sql 셀에 대한 SQL 정확성을 포함해 노트북 셀 위젯 정의를 검증합니다. analysis_sql 셀을 검증할 때는 해당 SQL 식을 스키마와 대조할 수 있도록 상위 데이터 소스 위젯도 함께 포함해야 합니다.

- 저장하기 전에 이 노트북 셀 정의들을 검증해.
- analysis SQL 셀이 상위 위젯의 유효한 컬럼을 참조하는지 확인해.

### `validate_notebook_cells` {#validate-notebook-cells}
*도구 세트: **widgets***\
*필수 권한: `Timeseries`*\
여러 노트북 셀 위젯 정의를 한 번에 검증하며, analysis_sql 셀의 SQL 검증도 포함됩니다.

- 게시 전에 이 노트북의 모든 셀을 검증해.
- 이 세 개의 분석 셀에 SQL 오류가 있는지 확인해.

### `verify_widget_data` {#verify-widget-data}
*도구 세트: **widgets***\
*필수 권한: `Dashboards Read` 또는 `Timeseries` 또는 `Monitors Read` 또는 `APM Read` 또는 `RUM Apps Read`*\
위젯 정의가 지난 한 시간 동안 실제 데이터를 반환하는지 검증합니다. 대시보드에 위젯을 추가한 후 쿼리가 실제 데이터를 반환하는지 확인할 때 사용합니다. 각 위젯별로 데이터 존재 여부와, 데이터가 없을 경우 그 이유를 반환합니다.

- 이 위젯 정의들이 데이터를 반환하는지 검사해.
- 대시보드에 추가된 위젯들이 실제 메트릭을 표시하는지 검증해.

### `visualize_tabular_data` {#visualize-tabular-data}
*도구 세트: **widgets***\
*필수 권한: 특정 권한이 필요하지 않습니다.*\
표 형식 데이터를 대화형 시각화(선버스트, 트리맵 또는 상위 목록)로 렌더링합니다. 쿼리 결과를 집계한 후 계층 구조나 순위를 시각화하는 데 사용합니다.

- 이 그룹화된 메트릭 데이터를 선버스트 차트로 시각화해.
- 이 집계 데이터를 트리맵 세분화로 표시해.

## 워크플로 {#workflows}

에이전트 사용을 위한 워크플로 나열, 조사, 실행 및 구성을 포함한 [Workflow Automation][39] 도구입니다.

### `list_datadog_workflows` {#list-datadog-workflows}
*도구 세트: **워크플로***\
*필수 권한: `Workflows Read`*\
[Workflow Automation][39] 워크플로를 목록으로 나열하고 검색합니다. 이름, 태그, 소유자, 핸들 및 트리거 유형(`monitor`, `schedule`, `api`, `incident` 등)으로 필터링할 수 있습니다. 결과는 `name` 또는 `updatedAt`와 같은 필드를 기준으로 정렬할 수 있습니다.

- `team:platform` 태그가 지정된 게시된 워크플로를 모두 보여줘.
- 에이전트 트리거가 구성된 워크플로를 나열해.
- Alice Smith가 소유한 인시던트 대응 관련 워크플로를 모두 찾아줘.

### `get_datadog_workflow` {#get-datadog-workflow}
*도구 세트: **워크플로***\
*필수 권한: `Workflows Read`*\
특정 워크플로와 관련된 상세한 정보를 검색합니다(트리거, 단계, 연결 및 입력 스키마 포함).

- 워크플로 `00000000-0000-0000-0000-000000000000`의 전체 세부 정보를 가져와.
- 배포 롤백 워크플로의 입력 파라미터와 단계를 보여줘.
- 이 워크플로에는 어떤 트리거가 구성되어 있지?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*도구 세트: **워크플로***\
*필수 권한: `Workflows Run`*\
에이전트 트리거가 있고 게시된 워크플로를 실행하며, 해당 워크플로의 입력 스키마와 일치하는 선택적 입력 파라미터를 사용합니다.

- 서비스 `checkout-api`, 심각도 `high`에 대해 인시던트 에스컬레이션 워크플로를 실행해.
- 결제 서비스에 대한 배포 롤백 워크플로를 실행해.
- 이 조사 컨텍스트를 사용하여 온콜 알림 워크플로를 실행해.

**참고**: 워크플로는 게시되어 있어야 하며 에이전트 트리거가 구성되어 있어야 합니다. 필요한 경우 `update_datadog_workflow_with_agent_trigger`를 사용하여 추가할 수 있습니다.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*도구 세트: **워크플로***\
*필수 권한: `Workflows Read`*\
워크플로 실행 인스턴스의 상태 및 세부 정보를 검색합니다(단계 결과 및 출력 포함).

- 내가 실행한 워크플로의 상태는 어떻지?
- 인시던트 에스컬레이션 워크플로가 성공적으로 완료되었어?
- 워크플로 인스턴스 `00000000-0000-0000-0000-000000000000`의 상세 출력 결과를 보여줘.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*도구 세트: **워크플로***\
*필수 권한: `Workflows Write`*\
워크플로에 에이전트 트리거를 추가하고 게시하여 워크플로를 AI 에이전트가 실행할 수 있게 합니다.

- 여기에서 실행할 수 있도록 배포 롤백 워크플로에 에이전트 트리거를 추가해.
- 인시던트 대응 워크플로가 에이전트에 의해 실행될 수 있도록 구성해.

[1]: /ko/mcp_server/setup#toolsets
[15]: /ko/api/latest/events/
[24]: /ko/tests/
[26]: /ko/database_monitoring/
[31]: /ko/network_monitoring/cloud_network_monitoring/
[32]: /ko/network_monitoring/devices/
[38]: /ko/service_management/case_management/
[39]: /ko/actions/workflows/
[41]: /ko/ddsql_editor/
[42]: /ko/ddsql_reference/ddsql_default/
[45]: /ko/reference_tables/
[46]: /ko/dashboards/
[47]: /ko/synthetics/
[48]: /ko/continuous_integration/
[49]: /ko/error_tracking/
[50]: /ko/tracing/
[51]: /ko/feature_flags/
[53]: /ko/security/threats/security_signals/
[54]: /ko/security/misconfigurations/findings/
[55]: /ko/containers/monitoring/kubernetes_explorer/
[60]: /ko/security/detection_rules/
[61]: /ko/security/suppressions/
[62]: /ko/getting_started/profiler/
[56]: /ko/account_management/rbac/permissions/
[57]: /ko/notebooks/
[58]: /ko/real_user_monitoring/
[59]: /ko/real_user_monitoring/rum_without_limits/
[63]: /ko/agent/guide/rshell/