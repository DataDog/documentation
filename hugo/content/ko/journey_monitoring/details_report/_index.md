---
aliases:
- /ko/journey_monitoring/uptime/
description: Product Analytics, Real User Monitoring, Synthetic Monitoring & Testing
  및 Session Replay 데이터를 결합한 상세 보고서로 각 여정의 성능을 조사하세요.
further_reading:
- link: /journey_monitoring/
  tag: 설명서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/map/
  tag: 설명서
  text: 맵에 대해 알아보기
- link: /journey_monitoring/suggested_journeys/
  tag: 설명서
  text: 추천 여정에 대해 알아보기
- link: /journey_monitoring/variants/
  tag: 설명서
  text: 여정 변형에 대해 알아보기
- link: https://www.datadoghq.com/blog/rum-operations-monitoring/
  tag: 블로그
  text: RUM 작업을 사용한 사용자 여정의 중요한 단계에 대한 성능 모니터링
title: 여정 세부 정보 보고서
---
## 개요 {#overview}

여정 세부 정보 보고서는 [Product Analytics][3], [Session Replay][4], [Real User Monitoring (RUM)][1] 및 [Synthetic Monitoring & Testing][2]의 사용자 행동 및 기술 성능 데이터를 결합합니다.

{{< img src="journey_monitoring/journey-monitoring-details-report-2.png" alt="특정 여정의 핵심 성과 지표, 사용자 행동 인사이트 및 기술 성능 측정값을 보여주는 Journey Monitoring 세부 정보 보고서입니다." style="width:100%;" >}}

### 여정 및 변형 필터 {#journey-and-variant-filters}

여정과 해당 [변형][5]은 보고서 필터 역할을 합니다. 여정이 기본적으로 선택되며 여기에는 모든 변형의 데이터가 포함됩니다. 변형을 선택하여 해당 경로로 보고서를 필터링하세요.

### 속성 필터 {#attribute-filters}

[속성 필터][22]는 선택한 여정 또는 변형과 함께 적용됩니다. 이 필터는 여정을 트리거하고 선택한 속성과 일치하는 세션으로 보고서를 필터링합니다.

### 퍼널 {#funnel}

[퍼널][6]은 각 단계의 트래픽, 전환율 및 평균 전환 시간을 보여줍니다. 또한 퍼널은 전환 및 이탈과 관련된 요소를 나열합니다. **View Details**를 클릭하여 이탈 패턴을 분석하세요.

### 트래픽 및 전환 추세 {#traffic-and-conversion-trends}

트래픽 및 전환 추세 섹션은 다음과 같은 핵심 성과 지표(KPI)를 보여줍니다.

- **Starts volume**: 사용자 세션 전반의 총 여정 시도 횟수
- **Conversion volume**: 사용자 세션 전반의 완료된 여정 시도 횟수
- **Average time to convert**: 여정을 완료하는 데 필요한 평균 시간
- **Conversion rate**: 완료된 여정 시도의 비율

각 KPI는 선택한 시간 프레임을 동일한 길이의 바로 이전 시간 프레임과 비교합니다. 예를 들어, 1주를 선택하면 비교 시 이전 주와 비교합니다. 1일을 선택하면 이전 일과 비교합니다. 볼륨 및 전환 시간 메트릭은 백분율 변화량을 보여주고, 전환율은 퍼센트포인트 변화량을 보여줍니다.

#### KPI 소스 및 보존 {#kpi-source-and-retention}

KPI 데이터 소스와 보존 기간은 Product Analytics 액세스 권한에 따라 다릅니다.

- **Preview**: 최근 30일 롤링 기간 동안의 모든 Product Analytics 데이터를 사용합니다.
- **Trial**: 전체 체험 기간의 모든 Product Analytics 데이터를 사용합니다.
- **Paid**: 최근 15개월 롤링 기간 동안의 모든 Product Analytics 데이터를 사용합니다.
- **Product Analytics not enabled**: [RUM without Limits&trade;][18] 메트릭을 사용합니다.

RUM without Limits를 사용하면 시작 규모, 전환 규모 및 전환율은 `rum.measure.journey` 메트릭을 사용합니다. 평균 전환 시간은 `rum.measure.journey.duration`을 사용합니다.

## Product Analytics {#product-analytics}

<div class="alert alert-info">이 섹션의 데이터는 활성 Product Analytics 체험판 또는 유료 구독이 있는 경우에만 사용할 수 있습니다.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-product-analytics.png" alt="전환된 세션과 이탈한 세션에 대한 특정 여정의 상위 경로 및 사용자를 보여주는 Journey Monitoring 세부 정보 보고서 섹션입니다." style="width:100%;" >}}

### 상위 경로 {#top-paths}

[상위 경로 시각화][12]는 사용자가 선택한 단계 사이에서 여정을 어떻게 이동하는지 보여줍니다. 전환한 사용자의 경로와 이탈한 사용자의 경로를 비교하세요.

이 시각화는 가장 일반적인 경로를 표시하며, 완료된 여정의 100%를 나타내지 않을 수도 있습니다. 바닥글에는 나머지 경로가 나타내는 세션의 백분율과 수가 표시됩니다.

### 사용자 {#users}

사용자 표에는 여정 중에 전환했거나 이탈한 상위 사용자가 나열됩니다. 사용자를 클릭하여 해당 사용자가 여정을 경험한 세션의 Session Replay를 확인하세요.

## Real User Monitoring {#real-user-monitoring}

<div class="alert alert-info">이 섹션의 데이터는 RUM without Limits&trade;에 대한 활성 체험판 또는 유료 구독이 있는 경우에만 사용할 수 있습니다.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-real-user-monitoring.png" alt="특정 여정의 RUM 작업과 프런트엔드 문제의 시계열을 보여주는 Journey Monitoring 세부 정보 보고서 섹션입니다." style="width:100%;" >}}

### 작업 {#operations}

[작업][7] 표에는 연결된 RUM 작업과 연결되지 않은 RUM 작업이 포함됩니다. 이 표는 [서비스 수준 목표(SLO)][19] 상태별로 작업을 그룹화합니다.

- **Critical**: 여정에 연결된 작업 중, 소진율이 높은 SLO가 하나 이상 있는 작업입니다.
- **OK**: 여정에 연결된 작업 중, SLO가 하나 이상 있고 모든 SLO가 OK 상태인 작업입니다.
- **Matching**: Datadog이 시간 상관관계를 통해 식별한 연결되지 않은 작업입니다. 일치하는 작업에는 SLO가 없을 수 있습니다.

**Critical** 및 **OK** 범주에 있는 연결된 작업은 해당 SLO가 [여정 상태][15]에 기여하는 동일한 작업입니다.

사용자가 여정 중에 접하는 일치하는 작업을 검토하고 연결하세요. 구성 지침은 [일치하는 작업 검토][14]를 참조하세요.

중요한 작업을 나타내는 일치하는 작업이 없는 경우 [작업 생성][23]을 따르세요. 표에서 작업을 생성하면 Datadog은 이를 여정에 연결하고 99% 목표의 가용성 SLO를 생성합니다.

각 작업 행에는 `rum.measure.operation` 메트릭을 사용하여 계산된 실행 횟수와 성공률, 그리고 `rum.measure.operation.duration` 메트릭을 사용하여 계산된 p75 지연 시간이 표시됩니다.

<div class="alert alert-tip">조직에서 Bits AI가 활성화된 경우, 작업에서 <a href="/real_user_monitoring/ai_investigations/operation_ai_investigation/">Bits Investigation</a>을 시작하여 실패 또는 지연 시간 회귀 문제를 해결하세요.</div>

작업을 클릭하여 성능 사이드 패널을 여세요. 패널에는 다음이 표시됩니다.
- 작업에 대해 구성된 SLO 및 모니터 목록
- 작업의 볼륨, 성공률 및 지연 시간
- 여정의 수명 주기 내에서 작업이 실행된 위치

RUM이 [Application Performance Monitoring(APM) 트레이스][11]에 연결된 경우, 사이드 패널에는 백엔드 서비스 종속성과 해당 성능 메트릭도 나열됩니다. 백엔드 서비스를 클릭하면 APM [Catalog][8]에서 해당 항목을 열 수 있습니다.

### 오류 수 {#error-count}

오류 수 차트는 여정 중에 발생한 [Error Tracking][9]의 프런트엔드 문제를 보여줍니다. **Investigate**를 클릭하여 상위 문제를 검토한 다음, 문제를 선택하여 Error Tracking에서 열어보세요.

## Synthetic Monitoring & Testing {#synthetic-monitoring-testing}

<div class="alert alert-info">이 섹션의 데이터는 <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> 또는 <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>에 대한 활성 체험판 또는 유료 구독이 있는 경우에만 사용할 수 있습니다.</div>

{{< img src="journey_monitoring/journey-monitoring-details-report-synthetics.png" alt="특정 여정의 Synthetic 테스트를 보여주는 Journey Monitoring 세부 정보 보고서 섹션입니다." style="width:100%;" >}}

### 테스트 모음 및 여정 적용 범위 {#test-suite-and-journey-coverage}

이벤트 기반 여정의 경우, 여정 생성자에게 Synthetic Monitoring 쓰기 권한이 있으면 Datadog이 [테스트 모음][10]을 생성합니다. 테스트 모음의 이름은 여정의 이름과 동일합니다. Synthetics 전용 구성의 경우, 기존 테스트 모음이 여정을 정의합니다.

테스트 모음 위젯은 모음 성능 및 [가동 시간][13]을 보여줍니다. 모음의 가동 시간 SLO는 여정 가동 시간을 나타내며 여정 상태에 기여합니다. 이 SLO의 소진율이 높으면 여정을 **Degraded** 상태로 만듭니다. SLO에는 편집 가능한 기본 목표 99.9%가 설정되어 있습니다.

여정의 테스트 모음에 해당 여정을 포괄하는 테스트가 하나 이상 있으면 여정에 [Synthetic 적용 범위][20]가 적용됩니다. 이벤트 기반 여정의 경우, Datadog은 애플리케이션이 변경될 때 새로 [일치하는 테스트][21]를 식별합니다. 테스트를 추가하거나 제거하여 테스트 모음 적용 범위를 여정에 맞게 유지하세요.

### 테스트 표 {#tests-table}

Synthetic 테스트 표에는 여정의 테스트 모음에 속한 테스트와 테스트 모음에 속하지 않는 일치하는 테스트가 포함됩니다. 이 표는 상태별로 그룹화됩니다.

- **Alert**: 여정의 테스트 모음에 포함된 테스트 중 경보 상태인 테스트입니다.
- **OK**: 여정의 테스트 모음에 포함된 테스트 중 OK 상태인 테스트입니다.
- **Matching**: Datadog이 여정을 포괄하는 것으로 식별했지만 테스트 모음에는 포함되지 않은 테스트입니다.

각 테스트 행에는 이름, 도메인 및 가동 시간도 표시됩니다.

<div class="alert alert-tip">조직에서 Bits AI가 활성화된 경우, <strong>Alert</strong> 상태인 테스트에서 <a href="/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page">Bits Investigation</a>을 실행하여 근본 원인을 파악하세요.</div>

테스트 모음에서 테스트를 추가하거나 제거하려면 **Manage Tests**를 클릭하고, 테스트를 생성하려면 **New Test**를 클릭하세요.

## 추가 자료 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/
[2]: /ko/synthetics/
[3]: /ko/product_analytics/
[4]: /ko/session_replay/
[5]: /ko/journey_monitoring/variants/
[6]: /ko/product_analytics/charts/funnel_analysis/
[7]: /ko/real_user_monitoring/operations_monitoring/
[8]: /ko/internal_developer_portal/catalog/
[9]: /ko/error_tracking/
[10]: /ko/synthetics/test_suites/
[11]: /ko/real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[12]: /ko/product_analytics/charts/journey_paths/
[13]: /ko/synthetics/test_suites/#service-level-objectives
[14]: /ko/journey_monitoring/configuring_journeys/#review-matching-operations
[15]: /ko/journey_monitoring/status/#rum-operation-slos
[18]: /ko/real_user_monitoring/rum_without_limits/
[19]: /ko/service_level_objectives/
[20]: /ko/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[21]: /ko/journey_monitoring/configuring_journeys/#review-matching-tests
[22]: /ko/journey_monitoring/configuring_journeys/#attribute-filters
[23]: /ko/journey_monitoring/configuring_journeys/#create-operations