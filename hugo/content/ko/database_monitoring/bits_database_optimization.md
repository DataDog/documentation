---
description: Bits AI가 식별한 데이터베이스 쿼리 최적화를 검토하고 구현하세요.
further_reading:
- link: /database_monitoring/
  tag: 설명서
  text: Database Monitoring
- link: /database_monitoring/query_metrics/
  tag: 설명서
  text: 쿼리 메트릭 탐색
- link: /database_monitoring/connect_dbm_and_apm/
  tag: 설명서
  text: Database Monitoring 및 트레이스 상호 연결
title: Bits Database Optimization
---
<div class="alert alert-info">Bits Database Optimization은 PostgreSQL에서만 사용할 수 있습니다. 다른 데이터베이스 관리 시스템에 대한 지원을 요청하려면 Datadog 담당자에게 문의하거나 <a href="/help/">Datadog 지원팀</a>에 연락하세요.</div>

## 개요 {#overview}

Bits Database Optimization은 데이터베이스 전체에서 성능이 저하된 쿼리를 감지하고, 환경의 시뮬레이션 복사본에 대해 검증된 최적화를 식별하며, 쿼리를 트리거한 정확한 코드를 수정하는 풀 리퀘스트로 결과를 제공합니다.

최적화 후보는 Database Monitoring 텔레메트리에서 자동으로 선택되며, 추가 설정이 필요하지 않습니다. 후보는 쿼리 실행 시간, 차단 쿼리 및 성능 저하 쿼리에 중점을 두고 가장 높은 잠재적 영향을 기준으로 식별됩니다.

<div class="alert alert-info">Bits Database Optimization은 데이터베이스에 대한 쓰기 액세스 권한이 필요하지 않으며, 사용자 환경의 실제 데이터를 내보내거나 사용하지 않습니다. 최적화는 통계적 속성을 기반으로 생성된 합성 데이터로 채워진 데이터베이스 시뮬레이션을 대상으로 실증적으로 검증됩니다.</div>

{{< img src="database_monitoring/database_optimization_panel_overview.png" alt="최적화 패널에 표시된 최적화된 쿼리. 문제에 대한 자세한 요약, 최적화된 쿼리의 변경 사항 및 PR 생성 버튼이 표시되어 있습니다." style="width:100%;">}}

## 전제 조건 {#prerequisites}

대상 인스턴스에 대해 - **Database Monitoring**이 구성되어 있어야 합니다. [Database Monitoring 설정][1]을 참조하세요.
대상 인스턴스에서 - **스키마 수집**이 활성화되어 있어야 합니다.
- 자동화된 PR 생성을 사용하기 위한 조건:
    해결하고자 하는 쿼리를 실행하는 서비스에 대해 - **APM**이 구성되어 있어야 합니다. 자세한 내용은 [Database Monitoring 및 트레이스 상호 연결][2]을 참조하세요.
    - **GitHub 리포지토리**가 Datadog 조직에 연결되어 있어야 합니다.

## 최적화 보기 {#viewing-optimizations}

### 쿼리 목록 {#query-list}

[Database Monitoring > 쿼리][3] 화면에서 최적화가 가능한 쿼리는 상태 열에 AI 아이콘과 함께 표시됩니다. 아이콘 위에 마우스를 올리면 최적화 요약을 볼 수 있으며, 아이콘을 클릭하면 최적화 패널이 열립니다.

쿼리 목록을 최적화 유형으로 필터링하려면 목록 위의 **Optimizations**에서 옵션을 선택하세요.

{{< img src="database_monitoring/database_optimization_queries.png" alt="Queries 화면의 상태 열에서 최적화가 가능한 쿼리 행이 AI 아이콘과 함께 표시되어 있습니다." style="width:100%;">}}

### 최적화 패널 {#optimization-panel}

최적화 패널에는 쿼리 문제의 요약, 시뮬레이션에 사용된 최적화된 쿼리, 시뮬레이션된 성능 영향의 시각화가 포함됩니다.

자세한 개선 사항을 확인하려면 시뮬레이션된 성능 영향 시각화를 탐색하세요.
  - 개선 요약(예: '96.9배 더 빠름') 위에 마우스를 올리면 실행 전후의 실행 시간, 논리적 읽기, 그리고 수정된 공유 블록을 볼 수 있습니다. 표에는 각 메트릭에 대한 평균, 중앙값, P95 및 최대값이 표시됩니다.
  - 시각화의 각 항목 위에 마우스를 올리면 자세한 정보를 확인할 수 있습니다.

{{< img src="database_monitoring/database_optimization_simulated_performance_impact.png" alt="96.9배 더 빠르게 최적화된 쿼리를 나타내는 Simulated Performance Impact 시각화의 예시입니다." style="width:100%;">}}

**Compare Plans**를 클릭하여 현재 실행 계획과 최적화된 실행 계획을 나란히 비교해 보세요.
  - **List 뷰**는 실행 계획의 작업에 대한 계층적 목록을 보여주며, 각 단계의 노드 비용 및 행 추정치를 포함합니다.
  - **Map 뷰**는 실행 계획을 시각적으로 보여주며, 다양한 메트릭으로 계획을 비교할 수 있는 옵션을 제공합니다.
  - **Raw**는 실행 계획의 원시 출력을 보여줍니다.

{{< img src="database_monitoring/database_optimization_plan_comparison_map_view.png" alt="Compare Plans Map 뷰는 최적화된 쿼리에 대해 추가 및 제거된 작업을 보여줍니다." style="width:100%;">}}

### 풀 리퀘스트 검토 {#review-the-pull-request}

데이터베이스 최적화 수정 PR을 검토하려면 **Review PR by Bits AI**를 선택하세요. GitHub PR이 시뮬레이션 결과가 미리 입력된 설명과 함께 열립니다.

<div class="alert alert-info">자동화된 풀 리퀘스트를 사용하려면 쿼리를 실행하는 서비스에 대해 APM이 구성되어 있어야 하며, Datadog 조직에 연결된 GitHub 리포지토리가 필요합니다.</div>

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/database_monitoring/architecture/
[2]: /ko/database_monitoring/connect_dbm_and_apm/
[3]: https://app.datadoghq.com/databases/queries
[4]: /ko/monitors/configuration/?tab=evaluateddata