---
description: Datadog의 여정 상태 결정 방식 알아보기
further_reading:
- link: /journey_monitoring/
  tag: 문서
  text: Journey Monitoring에 대해 알아보기
- link: /real_user_monitoring/operations_monitoring/
  tag: 문서
  text: RUM Operations Monitoring에 대해 알아보기
- link: /journey_monitoring/details_report/#synthetic-monitoring--testing
  tag: 문서
  text: Synthetic 테스트 적용 범위에 대해 알아보기
title: 여정 상태
---
## 개요 {#overview}

여정 상태는 여정의 기술적 상태를 **Healthy**, **Degraded** 또는 **Missing coverage**로 나타냅니다. Datadog은 두 가지 유형의 [서비스 수준 목표(SLO)][10] 입력을 기반으로 상태를 계산합니다.

- 여정에 연결된 [Real User Monitoring (RUM) 작업][1]에 대한 SLO
- 여정의 [Synthetic 테스트 모음][2]에 대한 [가동 시간 SLO][11]

여정 상태는 이러한 입력의 최신 상태를 반영합니다. 여정 상태는 상태 기록을 제공하지 않으며 별도의 목표치나 평가 기간을 정의하지도 않습니다.

{{< img src="journey_monitoring/journey-monitoring-status.png" alt="테스트 실패와 높은 테스트 모음 소진율로 인해 상태가 저하된 여정을 보여주는 개요" style="width:100%;" >}}

## 상태 입력 {#status-inputs}

Datadog은 각 SLO 입력의 [소진율][3]을 평가합니다.

- **High burn**: SLO가 목표치에서 허용하는 속도보다 빠르게 오류 예산을 소진하여 목표 위반 상태에 있거나 위반에 가까워지고 있습니다.
- **Low burn 또는 OK**: SLO가 허용 가능한 속도로 오류 예산을 소진하고 있습니다.
- **No Data**: Datadog은 계산에서 해당 SLO를 제외합니다.

여정 상태를 계산하는 데 두 가지 입력 유형이 모두 필요한 것은 아닙니다. 두 유형 중 어느 하나에서라도 소진율이 높은 SLO가 하나 있으면 여정이 **Degraded** 상태가 됩니다.

### RUM 작업 SLO {#rum-operation-slos}

<div class="alert alert-info">RUM 작업을 생성하려면 <a href="/real_user_monitoring/rum_without_limits/">RUM without Limits™</a>의 평가판을 사용 중이거나 유료 구독이 활성화되어 있어야 합니다. 작업을 여정에 연결하면 해당 SLO가 여정 상태에 반영될 수 있습니다.</div>

연결된 작업에 설정된 SLO 중 하나 이상에서 소진율이 높으면 RUM 작업 입력의 소진율도 높게 평가됩니다. 하나 이상의 작업 SLO가 포함되어 있고 포함된 모든 SLO의 소진율이 낮거나 정상이라면 Healthy 상태입니다.

연결된 RUM 작업은 여정의 중요 경로에 속하는 것으로 명시적으로 식별됩니다. 작업을 연결하면 사용자가 여정 중에 접하는 작업과 같은 시간에 실행되는 관련 없는 작업을 구분할 수 있습니다.

Datadog은 연결되지 않은 작업과 SLO가 없는 연결된 작업을 상태 계산에서 제외합니다. SLO가 없는 작업을 연결하면 Datadog은 목표치가 99%인 가용성 SLO를 생성합니다. 필요에 따라 이 SLO를 사용자 지정하거나 가용성 및 지연 시간 SLO를 추가하세요. 자세한 지침은 [RUM 작업을 위한 SLO 생성 모범 사례][4]를 참조하세요.

작업 세부 정보 보고서, 여정 [세부 정보 보고서][5] 또는 [RUM Operations API][7]에서 연결을 관리하세요.

### 테스트 모음 가동 시간 SLO {#test-suite-uptime-slo}

<div class="alert alert-info">이 상태 입력을 제공하는 테스트 모음 및 테스트를 생성하거나 관리하려면 <a href="/synthetics/browser_tests/">Synthetic Browser Tests</a> 또는 <a href="/synthetics/mobile_app_testing/">Synthetic Mobile Tests</a>의 평가판을 사용 중이거나 유료 구독이 활성화되어 있어야 합니다.</div>

테스트 모음에는 중요 테스트를 평가하는 시간 슬라이스 기반 가동 시간 SLO가 설정되어 있습니다. 모든 테스트는 기본적으로 중요 테스트로 지정됩니다. 테스트를 중요하지 않은 테스트로 지정하면 테스트 모음에는 유지하면서 가동 시간 SLO 계산에서는 제외할 수 있습니다.

가동 시간 SLO의 소진율이 높으면 테스트 모음 입력의 소진율도 높게 평가됩니다. 가동 시간 SLO의 소진율이 낮거나 정상일 때 Healthy 상태로 평가됩니다. 테스트 모음에 테스트 데이터가 없으면 Datadog은 이 입력을 계산에서 제외합니다.

## 상태 계산 {#status-calculation}

Datadog은 계산에 포함된 RUM 작업 입력과 테스트 모음 입력을 결합합니다.

- **Degraded**: 포함된 SLO 중 하나 이상이 높은 소진율을 보이는 상태
- **Healthy**: 하나 이상의 SLO가 포함되고, 포함된 모든 SLO의 소진율이 낮거나 정상인 상태
- **Missing coverage**: 계산에 포함된 SLO 입력이 남아 있지 않은 상태입니다. 이는 여정에 구성된 입력이 없거나 구성된 모든 입력이 **No Data**를 보고할 때 발생합니다.

여정 입력을 변경하면 해당 여정의 상태에 자동으로 반영됩니다. 여기에는 RUM 작업 연결과 테스트 모음에서 테스트를 추가하거나 제거하는 작업이 포함됩니다.

## 여정 상태 조사 {#investigate-journey-status}

[카탈로그][12], [맵][13] 및 세부 정보 보고서에서 여정 상태를 확인하세요.

- **Degraded** 상태인 여정의 경우, Datadog은 상태에 영향을 미치는 **Critical** 작업 또는 **Alert** 상태의 Synthetic 테스트로 연결되는 링크를 제공합니다. 조직에서 Bits AI가 활성화된 경우, 작업 또는 테스트에서 [Bits Investigation][14]을 실행하여 근본 원인을 파악하세요.
- **Missing coverage** 상태인 여정의 경우, [SLO가 있는 작업을 연결][8]하거나 [여정을 포괄하는 테스트를 추가][9]하세요. 적용 범위가 구성된 경우, 해당 SLO 입력이 데이터를 보고하는지 확인하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/operations_monitoring/
[2]: /ko/journey_monitoring/details_report/#synthetic-monitoring--testing
[3]: /ko/service_level_objectives/#slo-burn-rate-indicator
[4]: /ko/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[5]: /ko/journey_monitoring/details_report/
[7]: /ko/api/latest/rum-operations/
[8]: /ko/journey_monitoring/configuring_journeys/#review-matching-operations
[9]: /ko/journey_monitoring/configuring_journeys/#manage-tests
[10]: /ko/service_level_objectives/
[11]: /ko/synthetics/test_suites/#service-level-objectives
[12]: /ko/journey_monitoring/overview/#journey-catalog
[13]: /ko/journey_monitoring/map/
[14]: /ko/bits_ai/bits_investigation/