---
algolia:
  rank: 70
  tags:
  - mcp
  - mcp server
  - mcp tools
  - tools
description: Datadog MCP 서버에서 사용할 수 있는 모든 도구를 탐색하세요. 도구 세트별로 정리되어 있으며, 예시 프롬프트가 제공됩니다.
further_reading:
- link: bits_ai/mcp_server
  tag: 설명서
  text: Datadog MCP 서버
- link: bits_ai/mcp_server/setup
  tag: 설명서
  text: Datadog MCP 서버 설정
title: Datadog MCP 서버 도구
---
Datadog MCP 서버에서 사용할 수 있는 도구는 다음과 같습니다. 각 항목에 필수 도구 세트, 권한 및 예시 프롬프트가 포함되어 있습니다. 도구는 [도구 세트][1] 기준으로 그룹화되어 있어서 필요한 도구만 사용할 수 있으므로 귀중한 컨텍스트 윈도가 절약됩니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
제품별 도구를 활성화하려면 Datadog MCP 서버에 연결하는 데 사용하는 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함하세요. 예를 들어, 선택한 [Datadog 사이트][2]({{< region-param key="dd_site_name" >}})에 따라 이 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다.

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

[2]: /ko/getting_started/site/
{{< /site-region >}}

MCP 서버에 연결하고 도구 세트를 활성화하는 방법에 대한 자세한 내용은 [Datadog MCP 서버 설정][1]을 참조하세요.

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
인시던트에 관한 상세 정보를 검색합니다.

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
Datadog의 Software Catalog 서비스를 목록으로 나열하고, 세부 정보와 팀 정보도 함께 표시해 줘.

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
- 프로덕션에서 500 상태 코드 로드를 모두 가져와.

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

### `apm_explore_trace` {#apm-explore-trace}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
트레이스 데이터에서 쿼리를 실행하여 트레이스 내 특정 스팬의 심층 분석 및 탐색을 수행합니다.

- 트레이스 `abc123`의 스팬을 탐색하고 데이터베이스 호출을 표시해 줘.
- 이 트레이스의 오류 스팬을 분석해.

### `apm_trace_summary` {#apm-trace-summary}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
트레이스의 AI 기반 요약을 생성하여 해당 트레이스에 무엇이 표시되는지 개략적인 분석을 제공합니다.

- 트레이스 `7d5d747be160e280504c099d984bcfe0`을 요약해 줘.
- 이 트레이스에서 발생한 일에 대한 개요를 제공해 줘.

### `apm_trace_comparison` {#apm-trace-comparison}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
두 트레이스를 비교하여 성능 차이를 파악하고 빠른 트레이스와 느린 트레이스 사이의 병목을 확인합니다.

- 이 두 트레이스를 비교해 왜 하나가 더 느린지 알아내 줘.
- 이 기준 트레이스와 느린 트레이스 간에 무엇이 달라졌어?

### `apm_analyze_trace_metrics` {#apm-analyze-trace-metrics}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
특정 작업에 대한 APM 트레이스 메트릭을 시간에 따라 분석하며, 메트릭 데이터를 쿼리하여 AI가 생성한 분석을 제공합니다.

- 지난 6시간 동안의 `service:api`에서 `web.request` 작업 지연 시간 추세를 분석해.
- 내 데이터베이스 서비스의 오류율 메트릭을 표시해 줘.

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
시간 범위 이내에서 서비스의 Watchdog 이상 탐지 스토리를 검색하여 지연 시간, 오류율 및 트래픽 이상에 대한 AI가 생성한 인사이트를 제공합니다.

- 지난 24시간 동안의 체크아웃 서비스 Watchdog 이상치를 표시해 줘.
- API 서비스에서 탐지된 지연 시간 이상이 있어?

### `apm_get_watchdog_story` {#apm-get-watchdog-story}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
특정 Watchdog 스토리에 관한 상세 정보를 ID 기준으로 검색합니다.

- Watchdog 스토리 `abc123`의 세부 정보를 가져와.

### `apm_search_change_stories` {#apm-search-change-stories}
*도구 세트: **apm***\
시간 범위 이내에서 서비스의 변경 스토리(배포, 기능 플래그 및 인프라 변경 사항)를 검색합니다.

- 결제 서비스의 최근 배포 및 변경 사항을 표시해 줘.
- 이 지연 시간 급증 시점 전후에 어떤 인프라 변경이 발생했어?

### `apm_latency_bottleneck_analysis` {#apm-latency-bottleneck-analysis}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
이상 기간의 트레이스 전체에서 셀프 타임을 계산하여 지연 시간 병목을 분석합니다.

- 이 이상이 지속된 동안 체크아웃 서비스의 지연 시간 병목은 뭐야?
- 지연 시간의 가장 큰 원인이 된 스팬은 무엇인지 식별해 줘.

### `apm_latency_tag_analysis` {#apm-latency-tag-analysis}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
이상 기간과 기준 기간의 스팬 태그를 비교해 무엇이 달라졌는지 파악합니다.

- 이상 기간과 기준 기간의 태그를 비교해 무엇이 달라졌는지 찾아 줘.
- 이 지연 시간 급증 동안 어떤 태그 값이 달라?

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

### `apm_investigation_methodology` {#apm-investigation-methodology}
*도구 세트: **apm***\
*필수 권한: `APM Read`*\
지연 시간, 오류 및 성능 문제와 같은 APM 서비스 문제를 조사하기 위한 지침을 제공합니다.

- API 서비스의 지연 시간 증가를 조사하려면 어떻게 해야 해?
- 프로덕션에서 오류 급증을 디버그하는 과정을 안내해 줘.

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

## 대시보드 {#dashboards}

[대시보드][46] 검색, 생성, 업데이트 및 삭제를 위한 도구이며 위젯 스키마 참조 및 검증도 포함합니다.

### `get_datadog_dashboard` {#get-datadog-dashboard}
*도구 세트: **core**, **dashboards***\
*필수 권한: `Dashboards Read` 및 `User Access Read`*\
Datadog [대시보드][46]를 ID 기준으로 검색하여 제목, 설명, 태그, 위젯을 반환합니다. 우선 `search_datadog_dashboards`를 사용해 대시보드 ID를 찾으세요.

- 대시보드 `ps7-mn3-kwf`의 전체 세부 정보를 가져와.
- 인프라 개요 대시보드의 위젯과 레이아웃을 표시해 줘.
- 이 대시보드에서 구성된 템플릿 변수를 검색해.

### `upsert_datadog_dashboard` {#upsert-datadog-dashboard}
*도구 세트: **core**, **dashboards***\
*필수 권한: `Dashboards Read` 및 `Dashboards Write`*\
Datadog [대시보드][46]를 생성하거나 업데이트합니다. 기존 대시보드를 업데이트하려면 해당 대시보드 ID를 제공하세요. 새로 생성하려면 ID를 생략합니다. 위젯을 빌드하기 전에 위젯 스키마를 위해 `get_widget_reference`를 호출합니다.

- 모든 호스트 전반의 CPU 및 메모리 사용량을 표시하는 대시보드를 생성해.
- 대시보드 `abc-123-def`에 오류율에 대한 시계열 위젯을 추가해.
- 서비스 개요 대시보드의 제목과 설명을 업데이트해.

### `delete_datadog_dashboard` {#delete-datadog-dashboard}
*도구 세트: **dashboards***\
*필수 권한: `Dashboards Read` 및 `Dashboards Write`*\
ID를 기준으로 Datadog [대시보드][46]를 영구적으로 삭제합니다. 이 액션은 실행 취소할 수 없습니다. 우선 `search_datadog_dashboards`를 사용해 대시보드 ID를 찾으세요.

- 대시보드 `ps7-mn3-kwf`를 삭제해.
- 오래된 스테이징 환경 대시보드를 제거해.

### `get_widget_reference` {#get-widget-reference}
*도구 세트: **dashboards***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read`*\
대시보드 위젯 유형에 대한 스키마 및 빌드 지침을 반환합니다. 위젯 정의는 JSON 개체입니다. 이 도구는 스키마를 나타내는 TypeScript 유형 정의를 반환하며 그와 함께 쿼리 패턴, 수식 구문, 일반적인 위험 등을 다루는 빌드 지침도 함께 반환합니다. `upsert_datadog_dashboard`를 사용하여 위젯을 생성하기 전에 이것을 호출하세요.

- 시계열 위젯의 스키마를 가져와.
- 상위 목록과 쿼리 표 위젯을 빌드하는 방법을 표시해 줘.
- 산점도 위젯의 스키마는 뭐야?

### `validate_dashboard_widget` {#validate-dashboard-widget}
*도구 세트: **dashboards***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read`*\
대시보드 스키마를 기준으로 위젯 정의를 검증합니다. 위젯 JSON을 `upsert_datadog_dashboard`에 전달하기 전에 이것을 사용해 검사하세요.

- 대시보드를 생성하기 전에 시계열 위젯 정의를 검증해 줘.
- 이 쿼리 표 위젯 JSON이 올바른지 검사해.

### `ask_widget_expert` {#ask-widget-expert}
*도구 세트: **dashboards***\
*필수 권한: `Dashboards Read` 또는 `Dashboards Write` 또는 `Notebooks Read`*\
위젯 구성, 스키마, 쿼리 구문, 필드 사용, 디버깅 또는 위험과 관련해 Datadog 위젯 전문가에게 질문합니다. 스키마 조회, 필드 설명, 기존 위젯 정의 디버깅 또는 특정 위젯 유형의 작동 방식을 이해하고자 하는 등 맞춤화된 질문에 가장 효과적입니다.

- toplist에는 어느 response_format을 사용해야 해?
- 산점도 위젯의 스키마는 뭐야?
- 이 위젯이 개수여야 하는데 분수 값을 표시하는 이유를 디버그하게 도와줘.
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
시간 프레임 내 쿼리 서명의 PostgreSQL 설명 계획을 검색합니다. 연산자 트리, 인덱스 사용량, 예상 비용을 비용 기준으로 정렬한 간소화된 계획 구조를 반환합니다.

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
하나 이상의 데이터베이스 개체에 대한 스키마 정의(열, 인덱스, 외래 키, 파티션)를 가져옵니다. 선택적 스키마, 데이터베이스 및 인스턴스 한정자가 있는 표 이름을 수락합니다.

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

[DDSQL][41]을 사용하여 Datadog 데이터를 쿼리하는 도구, DDSQL은 인프라 리소스, 로그, 메트릭, RUM, 스팬 및 기타 Datadog 데이터 소스를 지원하는 SQL 방언입니다.

### `ddsql_get_spec` {#ddsql-get-spec}
*도구 세트 **ddsql***\
지원되는 SQL 함수, SQL 키워드 및 표준 PostgreSQL과 DDSQL의 차이를 포함한 간결한 DDSQL 기능 사양을 가져옵니다. 지원되는 구문을 이해하려면 쿼리를 작성하기 전에 이 도구를 호출하세요.

- DDSQL에서 지원되는 SQL 함수는 뭐야?
- DDSQL 쿼리 구문 규칙과 PostgreSQL과의 차이점을 표시해 줘.
- DDSQL에서 사용할 수 있는 집계 함수는 뭐야?

### `ddsql_schema_search_tables` {#ddsql-schema-search-tables}
*도구 세트 **ddsql***\
DDSQL 데이터세트를 검색하여 표(퍼블릭 데이터 소스, 참조표) 및 사용 가능한 메트릭을 반환합니다.

- DDSQL에서 쿼리할 수 있는 표는 뭐야?
- Kubernetes와 관련된 DDSQL 표를 검색해 줘.
- DDSQL를 사용한 쿼리에 사용할 수 있는 메트릭을 표시해 줘.

### `ddsql_schema_get_table_columns` {#ddsql-schema-get-table-columns}
*도구 세트 **ddsql***\
스키마 메카데이터에서 DDSQL 표의 정적 SQL 열을 가져옵니다.

- `aws.ec2_instance` 표에서 사용할 수 있는 열은 뭐야?
- `k8s.pods` 표의 스키마를 표시해 줘.

### `ddsql_schema_search_unstructured_fields` {#ddsql-schema-search-unstructured-fields}
*도구 세트 **ddsql***\
로그, RUM, 스팬과 같은 비구조적 DDSQL 소스의 필드를 검색하고 순위를 매깁니다(빈도 기준으로 정렬). 이 도구는 검색 가능한 소스에서 `ddsql_schema_get_table_columns`로 폴백하기 전에 스키마를 검색하는 데 사용하세요.

- DDSQL 로그에서 사용할 수 있는 필드는 뭐야?
- 내 RUM 데이터에서 `service` 관련 필드를 찾아 줘.
- 내 스팬 데이터에서 가장 일반적인 필드를 표시해 줘.

### `ddsql_run_query` {#ddsql-run-query}
*도구 세트 **ddsql***\
DDSQL 쿼리를 실행하고 결과를 반환합니다. SQL 구문을 사용한 인프라 리소스, 로그, 메트릭, RUM, 스팬 및 기타 Datadog 데이터 소스 쿼리를 지원합니다. 구문 세부 정보는 [DDSQL 참조][42]를 참조하세요.

- 각 AWS 리전에서 실행 중인 EC2 인스턴스는 몇 개야?
- 지난 한 시간 동안의 오류 로그 수가 가장 많은 서비스를 상위 10개까지 표시해 줘.
- 지난 24시간 동안의 호스트 기준으로 그룹화한 평균 CPU 사용량을 쿼리해 줘.

### `ddsql_create_link` {#ddsql-create-link}
*도구 세트 **ddsql***\
주어진 쿼리가 미리 채워진 [DDSQL Editor][41]에 대한 Datadog UI 링크를 생성합니다.

- 이 쿼리에 대한 DDSQL Editor 링크를 생성해.
- 내 인프라 쿼리를 사용해서 DDSQL Editor에 대한 공유 가능한 링크를 생성해.

## Error Tracking {#error-tracking}

Datadog [Error Tracking][49]과의 상호작용을 위한 도구입니다.

### `search_datadog_error_tracking_issues` {#search-datadog-error-tracking-issues}
*도구 세트 **error-tracking***\
*필수 권한: `Error Tracking Read`*\
데이터 소스 전체에서(RUM, 로그, 트레이스) Error Tracking 문제를 검색합니다.

- 지난 24시간 동안 체크아웃 서비스의 모든 Error Tracking 문제를 표시해 줘.
- 지난 한 주 동안 내 애플리케이션에서 가장 일반적인 오류는 뭐야?
- `service:api`를 사용해 프로덕션 환경에서 Error Tracking 문제를 찾아 줘.

### `get_datadog_error_tracking_issue` {#get-datadog-error-tracking-issue}
*도구 세트 **error-tracking***\
*필수 권한: `Cases Read` 및 `Error Tracking Read`*\
Datadog에서 특정 Error Tracking 문제에 관한 상세한 정보를 검색합니다.

- Error Tracking 문제 `550e8400-e29b-41d4-a716-446655440000` 해결을 도와줘.
- Error Tracking 문제 `a3c8f5d2-1b4e-4c9a-8f7d-2e6b9a1c3d5f`의 영향은 뭐야?
- Error Tracking 문제 `7b2d4f6e-9c1a-4e3b-8d5f-1a7c9e2b4d6f`를 재현할 테스트 케이스를 생성해 줘.

## Feature Flag {#feature-flags}

플래그 및 플래그 환경 생성, 나열, 업데이트 등 [기능 플래그][51] 관리 도구입니다.

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

- 스테이징 환경에서 `dark-mode` 플래그를 활성화합니다.
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
*도구 세트: **Kubernetes***\
*필수 권한: `Hosts Read` 및 `Teams Read`*\
모든 클러스터에서 [Kubernetes][55]를 검색합니다. `kubectl` 대신 이 도구를 사용하여 배포, 포드, 노드 등과 같은 Kubernetes 리소스의 상태를 판단하세요. 이 도구에는 로컬 클러스터 액세스가 필요하지 않고, 모든 클러스터에서 작동하며 태그로 강화된 데이터를 반환합니다. 각 결과에 특정 태그 키를 포함할 수 있고, 상위 리소스 이름을 포함하여 리소스 간 관계를 조사할 수도 있습니다(예를 들어 포드가 속하는 배포).

- `production` 네임스페이스에서 상태가 `CrashLoopBackOff`인 모든 포드를 표시해 줘.
- `general2` 클러스터에 진행 중인 롤아웃이 있는 배포를 찾아 줘.
- 내 클러스터의 모든 노드를 CPU 사용량 기준으로 정렬해서 목록으로 나열해.
- 배포를 `service` 및 `env` 기준으로 그룹화해서 환경 전체에 서비스가 어떻게 분포되었는지 표시해 줘.

### `describe_datadog_k8s_resource` {#describe-datadog-k8s-resource}
*도구 세트: **Kubernetes***\
*필수 권한: `Hosts Read`*\
특정 [Kubernetes][55] 리소스의 상세한 정보를 가져옵니다. 여기에는 CPU 및 메모리 요청, 한도와 같은 리소스별 세부 정보를 포함하며, 선택 사항으로 태그, 레이블, 어노테이션, 매니페스트 기록, 상위 리소스 및 [Kubernetes Explorer][55]에 대한 딥 링크도 포함합니다. `kubectl describe` 대신 이 도구를 사용하세요. 이전 검색에서 UID를 사용하거나, 리소스 식별자(클러스터, 네임스페이스 및 리소스 이름)를 제공하여 리소스를 식별합니다. 원시 매니페스트 전체의 경우, `get_datadog_k8s_manifest`를 사용하세요.

- 클러스터 `prod`, 네임스페이스 `default`의 포드 `my-app`을 설명해.
- 네임스페이스 `default`, 클러스터 `staging`의 배포 `api-server` 세부 정보를 가져와.
- 이 Kubernetes 리소스의 태그와 어노테이션을 표시해 줘.

### `get_datadog_k8s_manifest` {#get-datadog-k8s-manifest}
*도구 세트: **Kubernetes***\
*필수 권한: `Hosts Read`*\
특정 [Kubernetes][55] 리소스의 YAML 매니페스트를 검색합니다. `kubectl get -o yaml` 대신 이 도구를 사용하세요. `kubectl` JSONPath 표현식을 사용한 특정 서브트리 추출을 지원하며 `status` 및 `managedFields`를 생략하는 간결한 모드를 지원하여 응답 크기를 줄입니다.

- 클러스터 `prod`, 네임스페이스 `my-app`의 포드 `default` 매니페스트를 가져와.
- 네임스페이스 `default`, 클러스터 `staging`의 배포 `api-server` 컨테이너 포트를 표시해 줘.
- 포드 `my-app`의 매니페스트에서 컨테이너 이미지를 가져와.

## 네트워크 {#networks}

[Cloud Network Monitoring][31] 분석 및 [Network Device Monitoring][32] 도구입니다.

### `analyze_cloud_network_monitoring` {#analyze-cloud-network-monitoring}
*도구 세트 **networks***\
*필수 권한: `Network Connections Read`*\
[Cloud Network Monitoring][31] 데이터를 사용하여 네트워크 수준 문제를 조사하고, 네트워크 흐름 데이터를 분석하여 재전송 비율 상승과 같은 이상을 감지합니다.

- 내 웹 서버와 데이터베이스 클러스터 간의 네트워크 트래픽을 분석해 줘.
- `service:api`와 `service:payments` 사이에 재전송 문제가 있어?
- 프로덕션 환경에서 네트워크 흐름 데이터에 이상이 있는지 조사해.

### `search_ndm_devices` {#search-ndm-devices}
*도구 세트 **networks***\
*필수 권한: `NDM Read`*\
Datadog [Network Device Monitoring][32]이 모니터링하는 네트워크 장치(라우터, 스위치, 방화벽)를 검색합니다.

- `us-east-1` 데이터 센터의 모든 네트워크 장치를 표시해 줘.
- 오류를 보고하는 방화벽을 찾아 줘.
- 모든 모니터링되는 스위치와 그 상태를 목록으로 나열해.

### `get_ndm_device` {#get-ndm-device}
*도구 세트 **networks***\
*필수 권한: `NDM Read`*\
특정 네트워크 장치에 관한 상세한 정보를 검색합니다(장치 ID 기준).

- 네트워크 장치 `device:abc123`의 세부 정보를 가져와.
- 이 라우터의 구성과 상태를 표시해 줘.

### `search_ndm_interfaces` {#search-ndm-interfaces}
*도구 세트 **networks***\
*필수 권한: `NDM Read`*\
특정 장치의 모든 네트워크 인터페이스를 검색합니다.

- 장치 `device:abc123`의 모든 인터페이스를 표시해 줘.
- 내 코어 라우터의 인터페이스 상태를 목록으로 나열해.

## 온보딩 {#onboarding}

가이드가 있는 Datadog 설정 및 구성을 위한 에이전틱 온보딩 도구입니다.

### `browser_onboarding` {#browser-onboarding}
*도구 세트: **onboarding***\
*필수 권한: `RUM Apps Read`*\
Brower RUM을 Datadog에 온보딩하는 과정을 안내합니다.

- 웹 애플리케이션에 대해 Brower RUM 모니터링을 설정하게 도와줘.

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

## 참조표 {#reference-tables}

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

## 보안 {#security}

코드 보안 스캔과 [보안 신호][53] 및 [보안 발견 사항][54] 검색 도구입니다.

### `datadog_secrets_scan` {#datadog-secrets-scan}
*도구 세트: **security***\
코드에 하드코딩된 시크릿 및 자격 증명이 있는지 스캔하여 AWS 키, API 키, 비밀번호, 토큰, 프라이빗 키 및 데이터베이스 자격 증명을 감지합니다.

- 내 코드에 하드코딩된 시크릿이 있는지 스캔해.
- 이 파일에 커밋된 API 키 또는 비밀번호가 있는지 검사해.

### `search_datadog_security_signals` {#search-datadog-security-signals}
*도구 세트: **security***\
*필수 권한: `Security Signals Read`*\
Datadog Security Monitoring에서 Cloud SIEM 신호, 앱 및 API 보호 신호, Workload Protection 신호 등 보안 신호를 검색하고 가져옵니다.

- 지난 24시간 동안의 보안 신호를 표시해 줘.
- 내 프로덕션 환경과 관련된 심각도가 높은 보안 신호를 찾아 줘.
- 의심스러운 로그인 신호로 트리거된 Cloud SIEM 신호를 목록으로 나열해.

### `analyze_datadog_security_signals` {#analyze-datadog-security-signals}
*도구 세트: **security***\
*필수 권한: `Security Signals Read` 및 `Timeseries`*\
집계, 그룹화 및 추세 분석을 위해 SQL 쿼리를 사용하여 보안 신호를 분석합니다. 이것은 계수, top-N 및 시간의 흐름에 따른 분석에 사용하세요. 특정 신호를 목록으로 나열하거나 검색하려면 `search_datadog_security_signals` 또는 `get_datadog_security_signal`을 사용합니다.

- 지난 7일 동안의 신호 수를 기준으로 상위 10개의 SIEM 규칙을 표시해 줘.
- 심각도가 높음, 중요함인 보안 신호를 세어 심각도 기준으로 그룹화해 줘.
- 어제 서비스별로 발생한 앱 및 API 보호 신호는 몇 개였어?

### `get_datadog_security_signal` {#get-datadog-security-signal}
*도구 세트: **security***\
*필수 권한: `Security Signals Read`*\
ID별로 보안 신호 하나의 전체 세부 정보를 검색합니다. 여기에는 속성, 규칙 정보, 분류 상태, 태그 및 케이스 상관관계가 포함됩니다.

- 보안 신호 `AwAAAZ27F1BUjY4rPQAAABhBWjI3RjFCVWpZNHJBQUFBSGFNQVZBQUFBR1Bu`의 전체 세부 정보를 가져와.
- 이 신호의 규칙, 분류 상태, 연결된 케이스를 표시해 줘.

### `security_findings_schema` {#security-findings-schema}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read`*\
보안 발견 사항에 대한 스키마(사용 가능한 필드 및 각 필드의 유형)를 반환합니다. 우선 `analyze_security_findings`를 사용하여 이것을 호출하여 쿼리할 수 있는 필드를 검색하세요. 발견 사항 유형에 따른 필터링과 응답 크기 조절을 지원합니다.

- 보안 발견 사항에 사용할 수 있는 필드는 뭐야?
- 라이브러리 취약성 발견 사항의 스키마를 표시해 줘.
- 구성 오류 발견 사항의 설명을 포함한 전체 스키마를 가져와.

### `analyze_security_findings` {#analyze-security-findings}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read` 및 `Timeseries`*\
SQL 쿼리를 사용하여 보안 발견 사항을 분석하는 기본 도구입니다. 유연한 SQL 집계, 필터링, 그룹화를 사용해 지난 24시간 동안의 실시간 데이터를 쿼리합니다. 우선 `security_findings_schema`를 호출하여 사용 가능한 필드를 검색한 다음, 이 도구를 사용해 쿼리하세요.

- 가장 중요한 발견 사항이 있는 상위 10개의 규칙을 표시해 줘.
- 심각도 및 발견 사항 유형 기준으로 그룹화된 진행 중인 발견 사항 수를 세어 줘.
- 사용 가능한 익스플로잇이 있는 라이브러리 취약성을 찾아서 리소스별로 그룹화해 줘.

### `search_security_findings` {#search-security-findings}
*도구 세트: **security***\
*필수 권한: `Security Monitoring Findings Read`*\
전체 보안 발견 사항 세부 정보를 가져오는 폴백 도구입니다. 대부분의 분석 작업에는 `analyze_security_findings`를 선호합니다. 이 도구는 완전한 발견 사항 개체가 필요할 때, 또는 SQL 쿼리로는 충분하지 않을 때에만 사용하세요.

- 내 AWS 환경의 중요한 발견 사항 전체 세부 정보를 가져와.
- 특정 규칙의 완전한 발견 사항 개체를 검색해.
- 모든 진행 중인 ID 위험 발견 사항을 전체 메타데이터와 함께 목록으로 나열해 줘.

## 소프트웨어 제공 {#software-delivery}

소프트웨어 배포([CI Visibility][48] 및 [Test Optimization][24])와의 상호작용을 위한 도구입니다.

### `search_datadog_ci_pipeline_events` {#search-datadog-ci-pipeline-events}
*도구 세트: **software-delivery***\
*필수 권한: `CI Visibility Read`*\
필터가 있는 CI 이벤트를 검색하고 그에 관한 세부 정보를 반환합니다.

- 내 커밋 `58b1488`의 모든 파이프라인을 표시해 줘.
- 브랜치 `my-branch`의 최신 파이프라인 실패를 표시해 줘.
- 내 브랜치 `my-branch`에서 매번 실패하는 작업 `integration-test`의 해결 방법을 제안해 줘.

### `aggregate_datadog_ci_pipeline_events` {#aggregate-datadog-ci-pipeline-events}
*도구 세트: **software-delivery***\
*필수 권한: `CI Visibility Read`*\
CI 파이프라인 이벤트를 집계하여 통계, 메트릭 및 그룹화된 분석을 생성합니다.

- 지난 7일 동안의 평균 작업 소요 시간은 얼마야?
- 지난 2주 동안 실패한 파이프라인은 몇 개야?
- 파이프라인 이름 기준으로 그룹화된 파이프라인 지속 시간의 95번째 백분위수를 표시해 줘.

### `get_datadog_flaky_tests` {#get-datadog-flaky-tests}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
Datadog [Test Optimization][24]에 불안정한 테스트(Flaky test)가 있는지 검색하고 분류 세부 정보(실패율, 카테고리, 소유자, 기록, CI 영향)를 반환합니다(페이지 지정, 정렬 포함).

- `@team-abc`가 소유한 체크아웃 서비스의 활성 불안정한 테스트(Flaky test)를 찾아서 오류율 기준으로 정렬해 줘.
- 브랜치 `main`의 리포지토리 `github.com/org/repo`에서의 불안정한 테스트(Flaky test)를 최근 순서대로 표시해 줘.
- `timeout` 카테고리의 불안정한 테스트(Flaky test)를 실패율이 높은 것만(50% 이상) 목록으로 나열해서 해결 방법에 우선순위를 지정할 수 있게 해줘.

### `aggregate_datadog_test_events` {#aggregate-datadog-test-events}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
Datadog Test Optimization 이벤트를 집계하여 안정성 및 성능 추세를 집계 함수, 옵션 메트릭, 그룹화 기준 패싯, 구성 가능한 테스트 수준으로 수량화합니다.

- 지난 한 주 동안의 실패한 테스트 수를 세어서, 브랜치 기준으로 그룹화해 줘.
- 각 테스트 모음에서 가장 느린 것을 파악할 수 있게 95번째 백분위수 지속 시간을 표시해 줘.
- 통과한 테스트와 실패한 테스트를 모두 세어서 코드 소유자 기준으로 그룹화해 줘.

### `search_datadog_test_events` {#search-datadog-test-events}
*도구 세트: **software-delivery***\
*필수 권한: `Test Optimization Read`*\
필터가 있는 [Test Optimization][24] 테스트 이벤트를 검색하고 그에 관한 세부 정보를 반환합니다.

- 지난 24시간 동안 브랜치 `main`에서 실패한 테스트를 표시해 줘.
- 무엇이 통과하고 실패했는지 확인할 수 있게 커밋 `abc123`의 테스트 실행을 가져와.
- 체크아웃 서비스의 모든 비정상적 테스트(Flaky test) 실행을 표시해 줘.
- `@team-name`이 소유했고 실패 중인 테스트를 찾아 줘.

### `get_datadog_code_coverage_branch_summary` {#get-datadog-code-coverage-branch-summary}
*도구 세트: **software-delivery***\
*필수 권한: `Code Coverage read`*\
리포지토리 브랜치의 집계된 코드 커버리지 요약 메트릭을 가져옵니다. 여기에는 총 커버리지, 패치 커버리지 및 서비스/코드 소유자 분석이 포함됩니다.

- `github.com/my-org/my-repo`의 `main` 브랜치 코드 커버리지는 뭐야?
- `github.com/my-org/my-repo`의 `release/1.x` 브랜치 커버리지 요약을 표시해 줘.

### `get_datadog_code_coverage_commit_summary` {#get-datadog-code-coverage-commit-summary}
*도구 세트: **software-delivery***\
*필수 권한: `Code Coverage read`*\
리포지토리 커밋의 집계된 코드 커버리지 요약 메트릭을 가져옵니다. 여기에는 총 커버리지, 패치 커버리지 및 서비스/코드 소유자 분석이 포함됩니다.

- 커밋 `abc123abc123abc123abc123abc123abc123abcd`의 코드 커버리지를 `github.com/my-org/my-repo`에 표시해 줘.
- 내 브랜치의 최신 커밋 패치 커버리지는 뭐야?

## Synthetic {#synthetics}

Datadog [Synthetic 테스트][47]와의 상호작용을 위한 도구입니다.

### `get_synthetics_tests` {#get-synthetics-tests}
*도구 세트: **synthetics***\
*필수 권한: `Synthetics Read`*\
Datadog Synthetic HTTP API 테스트를 검색합니다.

- 엔드포인트 `/v1/my/tested/endpoint`에서 Synthetic 테스트가 실패하는 이유를 이해하게 도와줘.
- 중단이 발생했는데, 도메인 `api.mycompany.com`에서 실패한 모든 Synthetic 테스트를 찾아 줘.
- 내 웹사이트 `api.mycompany.com`의 Synthetic 테스트가 지난 한 시간 동안 여전히 잘 작동하고 있어?

### `edit_synthetics_tests` {#edit-synthetics-tests}
*도구 세트: **synthetics***\
*필수 권한: `Synthetics Global Variable Read`,`Synthetics Read` 및 `Synthetics Write`*\
Datadog Synthetic HTTP API 테스트를 편집합니다.

- 엔드포인트 `/v1/my/tested/endpoint`에서 정의된 Synthetic 테스트의 어설션을 개선해 줘.
- 테스트 `aaa-bbb-ccc`를 일시 중지하고 위치를 유럽 위치로만 설정해 줘.
- 테스트 `aaa-bbb-ccc`에 팀 태그를 추가해.

### `synthetics_test_wizard` {#synthetics-test-wizard}
*도구 세트: **synthetics***\
*필수 권한: `Synthetics Global Variable Read`,`Synthetics Read` 및 `Synthetics Write`*\
Datadog Synthetics HTTP API 테스트를 미리 보고 생성합니다.

- 이 코드 파일에 정의된 모든 엔드포인트에서 Synthetics 테스트를 생성해 줘.
- `/path/to/endpoint`에서 Synthetics 테스트를 생성해 줘.
- 도메인 `mycompany.com`이 유지되는지 검사하는 Synthetics 테스트를 생성해 줘.

## 워크플로 {#workflows}

에이전트 사용을 위한 워크플로 나열, 조사, 실행 및 구성을 포함한 [Workflow Automation][39] 도구입니다.

### `list_datadog_workflows` {#list-datadog-workflows}
*도구세트:**workflows***\
*필수 권한: `Workflows Read`*\
[Workflow Automation][39] 워크플로를 목록으로 나열하고 검색합니다. 이름, 태그, 소유자 핸들 및 트리거 유형(예: `monitor`, `schedule`, `api` 또는 `incident`) 기준 필터링을 지원합니다. 결과를 `name` 또는 `updatedAt`과 같은 필드 기준으로 정렬할 수 있습니다.

- `team:platform`으로 태그된 모든 게시된 워크플로를 표시해 줘.
- 에이전트 트리거가 구성된 워크플로를 목록으로 나열해 줘.
- Alice Smith가 소유한 인시던트 응답과 관련된 모든 워크플로를 찾아 줘.

### `get_datadog_workflow` {#get-datadog-workflow}
*도구세트:**workflows***\
*필수 권한: `Workflows Read`*\
특정 워크플로와 관련된 상세한 정보를 검색합니다(트리거, 단계, 연결 및 입력 스키마 포함).

- 워크플로 `00000000-0000-0000-0000-000000000000`의 전체 세부 정보를 가져와.
- 배포 롤백 워크플로의 입력 파라미터와 단계를 표시해 줘.
- 이 워크플로에 무슨 트리거가 구성되어 있어?

### `execute_datadog_workflow` {#execute-datadog-workflow}
*도구세트:**workflows***\
*필수 권한: `Workflows Run`*\
에이전트 트리거가 있고 게시된 워크플로를 실행하며, 해당 워크플로의 입력 스키마와 일치하는 선택적 입력 파라미터를 사용합니다.

- 심각도가 `high`인 서비스 `checkout-api`의 인시던트 에스컬레이션 워크플로를 실행해.
- 결제 서비스의 배포 롤백 워크플로를 실행해.
- 이 조사의 컨텍스트를 사용해 On-Call 알림 워크플로를 트리거해.

**참고**: 워크플로는 게시해야 하며 에이전트 트리거가 구성되어 있어야 합니다. 필요한 경우 `update_datadog_workflow_with_agent_trigger`를 사용하여 추가하세요.

### `get_datadog_workflow_instance` {#get-datadog-workflow-instance}
*도구세트:**workflows***\
*필수 권한: `Workflows Read`*\
워크플로 실행 인스턴스의 상태 및 세부 정보를 검색합니다(단계 결과 및 출력 포함).

- 내가 트리거한 워크플로 실행은 무슨 상태야?
- 인시던트 에스컬레이션 워크플로가 완료됐어?
- 워크플로 인스턴스 `00000000-0000-0000-0000-000000000000`의 상세한 출력을 표시해 줘.

### `update_datadog_workflow_with_agent_trigger` {#update-datadog-workflow-with-agent-trigger}
*도구세트:**workflows***\
*필수 권한: `Workflows Write`*\
워크플로에 에이전트 크리거를 추가하고 게시하여 워크플로를 AI 에이전트가 실행할 수 있게 합니다.

- 배포 롤백 워크플로에 에이전트 트리거를 추가해 내가 여기서부터 실행할 수 있게 해줘.
- 인시던트 워크플로를 에이전트가 트리거할 수 있게 구성해.

[1]: /ko/bits_ai/mcp_server/setup#toolsets
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