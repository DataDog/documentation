---
aliases:
- /ko/journey_monitoring/guide/
- /ko/journey_monitoring/guide/configuring_journeys/
description: 여정을 정의하고 Product Analytics, RUM 및 Synthetic 적용 범위를 추가하세요.
further_reading:
- link: /journey_monitoring/
  tag: 문서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/details_report/
  tag: 문서
  text: 여정 세부 보고서에 대해 알아보기
title: 여정 구성
---
## 개요 {#overview}

이 페이지를 사용하여 중요한 사용자 흐름을 나타내고 해당 흐름의 상태를 파악할 수 있는 여정을 구성하세요.

[이벤트 기반 여정][28] 구성에는 3단계가 있습니다.

1. 여정을 만들고 사용자 흐름을 정의합니다.
2. 중요한 기술 단계를 나타내는 [Real User Monitoring (RUM) 작업][21]을 추가합니다.
3. 여정을 포괄하는 [Synthetic 테스트][24]를 추가합니다.

이 단계를 완료한 후 여정의 [핵심 성과 지표(KPI)][26], 작업, [서비스 수준 목표(SLO)][25], 테스트 및 [변형][3]을 검증하세요.

[Synthetics 전용 구성][29]에서는 [테스트 모음][14]이 자동으로 여정으로 표시됩니다.

## Journey Monitoring을 사용하는 경우 {#when-to-use-journey-monitoring}

Journey Monitoring은 엔드투엔드 흐름 전반에 걸쳐 사용자 행동과 기술적 상태를 통합하여 모니터링합니다. 이를 활용하면 여러 제품에 걸쳐 개별적으로 설정해야 했던 흐름을 단일 공간에서 모니터링하고 문제를 해결할 수 있습니다.

일반적인 대안은 다음과 같습니다.

- **RUM**:
  - [RUM 세션 탐색기의 퍼널][30] 또는 RUM 이벤트를 기반으로 하는 퍼널 위젯
  - 버튼 클릭이나 페이지 조회와 같이 사용자 활동을 추적하는 위젯
  - 흐름 볼륨, 완료 시간 또는 완료된 여정을 측정하는 사용자 지정 메트릭 또는 액션
  - 주요 기술 단계를 나타내는 [Custom vitals][31](RUM 작업을 통해 여정 내에서 이러한 단계를 나타낼 수 있음)
- **Synthetic Monitoring & Testing**: 동일한 흐름을 다루지만 여정의 테스트 모음으로 그룹화되지 않은 여러 테스트
- **[Product Analytics][22]**: 엔드투엔드 흐름 전반에서 사용자 행동을 추적하는 퍼널, 여정 경로 또는 기타 시각화

Journey Monitoring은 Product Analytics를 사용하여 사용자 행동과 경험을 파악하고, RUM을 사용하여 성능과 가용성을 평가하며, Synthetic 테스트를 사용하여 회귀를 탐지하고 [여정 가동 시간][17]을 측정합니다.

## 시작 전 참고 사항 {#before-you-begin}

[Journey Monitoring 전제 조건][1]을 검토하세요. Journey Monitoring을 사용하려면 지원되는 제품 중 하나 이상에 대한 활성 평가판 또는 유료 구독이 필요합니다.

구성 단계에 따라 필요한 제품이 다릅니다.

- action 또는 view 이벤트로 여정을 정의하려면 RUM에 대한 액세스 권한과 Product Analytics의 Preview, 평가판 또는 유료 액세스 권한이 필요합니다.
- RUM 작업 데이터를 추가하려면 [RUM without Limits™][4]의 평가판을 사용 중이거나 유료 구독이 활성화되어 있어야 합니다.
- Synthetic 적용 범위를 추가하려면 [Synthetic Browser Tests][12] 또는 [Synthetic Mobile Tests][13]에 대한 활성 평가판 또는 유료 구독이 필요합니다.

### 권한 및 역할 {#permissions-and-roles}

Journey Monitoring은 여러 제품의 자산을 사용하므로 여정 및 연결된 자산에 대한 액세스 권한은 각 제품의 권한에 따라 다릅니다. 액세스 요구 사항은 [Journey Monitoring 역할 및 권한][15]을 참조하세요.

여정을 만들거나 편집하려면 다음 작업을 수행합니다.

- 사용자의 역할에 Journey Monitoring 쓰기 권한이 있어야 합니다.
- 여정의 Synthetic 테스트 모음을 만들려면 Synthetic Monitoring 쓰기 권한도 필요합니다. 해당 권한이 없으면 Datadog은 테스트 모음 없이 여정을 생성합니다. 필요한 액세스 권한을 얻은 후 나중에 테스트 모음을 추가하세요.

## 1단계: 여정 만들기 {#step-1-create-a-journey}

### RUM 및 Product Analytics {#rum-and-product-analytics}

RUM action 또는 view 이벤트를 사용하여 이벤트 기반 여정을 정의하세요.

#### 사용자 흐름 선택 {#choose-a-user-flow}

비즈니스 성과를 지원하는 중요한 사용자 흐름마다 여정을 생성하세요. 여정은 여러 단계에 걸쳐야 하며 중요한 작업을 나타내야 합니다.

각 여정을 집중적으로 유지하려면 다음 지침을 따르세요.

**해야 할 일:**

- 각각의 고유한 사용자 흐름에 대해 별도의 여정을 생성합니다.
- 공유 시작 및 종료 이벤트를 사용하여 [업스트림 및 다운스트림 여정][16]을 확인합니다.
- 하나의 상위 수준 여정을 사용하고 속성 필터를 적용하여 미국과 영국의 사용자와 같은 코호트를 비교합니다.

**하지 말아야 할 일:**

- 단일하고 짧은 상호 작용에 대한 여정을 만듭니다. 대신 RUM 작업을 사용합니다.
- 여러 개의 서로 다른 사용자 흐름을 하나의 여정으로 결합합니다.
- 국가와 같은 속성 값만 다른 중복 여정을 만듭니다.

#### 생성 방법 선택 {#choose-a-creation-method}

모니터링할 사용자 흐름을 알고 있는 경우 여정을 수동으로 생성하세요. Datadog이 사용자 활동에서 식별한 흐름을 사용하려면 [제안된 여정][2]으로 시작하세요.

여정을 생성하려면 다음 단계를 따르세요.

1. **Digital Experience > Journey Monitoring**으로 이동합니다.
2. **New Journey**를 클릭하거나 맵 또는 카탈로그에서 제안된 여정을 선택합니다.
3. 프런트엔드 애플리케이션을 선택합니다.
4. 여정 이름을 입력합니다.
5. 하나 이상의 시작 이벤트를 선택합니다.
6. 하나 이상의 종료 이벤트를 선택합니다.
7. 필요시 설명, 속성 필터, 팀 소유권, 태그 또는 변형을 추가합니다.
8. **Save Journey**를 클릭합니다.

제안된 여정에는 사전 구성된 이름, 설명, 시작 이벤트 및 종료 이벤트가 포함됩니다. 저장하기 전에 이 필드를 검토합니다. 여정을 저장하면 Datadog이 해당 [세부 정보 보고서][5]를 엽니다.

#### 시작 및 종료 조건 정의 {#define-start-and-end-conditions}

액션 이벤트, 조회 이벤트 또는 둘 다를 선택합니다. [퍼널][27]은 선택한 이벤트를 기반으로 업데이트되며 각 단계의 규모, 전환율 및 평균 전환 시간을 보여줍니다.

##### 여러 개의 시작 및 종료 이벤트 {#multiple-start-and-end-events}

여러 시작 이벤트는 동일한 사용자 흐름으로 들어오는 여러 진입점을 나타낼 수 있습니다. 여러 종료 이벤트는 유효한 결론을 여러 개 나타낼 수 있습니다.

추가 이벤트가 있을 때마다 여정 정의가 확장됩니다. 시작 또는 종료 이벤트가 너무 많으면 여정의 범위가 불분명해지고 KPI의 정확도가 떨어질 수 있습니다.

##### 속성 필터 {#attribute-filters}

여정 수준 속성은 내부 사용자와 같은 광범위한 코호트를 포함하거나 제외합니다. 개별 시작 및 종료 조건에 대한 속성은 흐름을 더 좁힙니다.

여정의 이름이나 설명에 중요한 속성 필터를 포함하면 사용자가 KPI의 범위를 이해하는 데 도움이 됩니다.

##### 리퍼러 경로 {#referrer-paths}

참조 경로는 시작 또는 종료 이벤트를 특정 페이지 조회 이후의 인스턴스로 제한합니다. 이는 여러 여정 컨텍스트에 나타나는 이벤트와 특정 여정에 속하는 인스턴스를 구분하는 데 도움이 됩니다.

##### 의미 있는 시작 및 종료 이벤트 선택 {#select-meaningful-start-and-end-events}

시작 이벤트는 여정을 명확하게 시작하고 의도적인 사용자 작업을 나타내야 합니다.

<div class="alert alert-danger">여정이 완료되었음을 확인하는 종료 이벤트를 선택합니다. <strong>Pay</strong> 또는 <strong>Submit</strong>을 클릭하는 것만으로는 작업이 성공했는지 확인할 수 없습니다. 나중에 성공을 확인하는 이벤트가 있다면 해당 이벤트를 사용하여 실패한 시도가 완료된 여정으로 집계되지 않도록 하세요.</div>

예시는 다음과 같습니다.

- **로그인 여정**
  - 시작: 사용자가 로그인 페이지를 엽니다.
  - 종료: 애플리케이션이 사용자를 홈 화면으로 리디렉션합니다.
  - 피해야 할 마무리 행동: 사용자가 **Sign in**을 클릭합니다.
- **결제 여정**
  - 시작: 사용자가 결제 페이지를 엽니다.
  - 종료: 애플리케이션이 결제 확인 모달을 표시합니다.
  - 피해야 할 마무리 행동: 사용자가 **Pay**를 클릭합니다.
- **양식 제출 여정**
  - 시작: 사용자가 양식을 엽니다.
  - 종료: 애플리케이션이 제출 확인 메시지를 표시합니다.
  - 피해야 할 마무리 행동: 사용자가 **Submit**을 클릭합니다.

#### 변형 추가 {#add-variants}

변형은 여정의 시작과 종료 사이에서 일반적으로 발생하는 중간 이벤트의 순서를 나타냅니다. 변형을 추가하여 서로 다른 경로의 KPI 및 텔레메트리 데이터를 비교하세요.

#### 태그 및 소유권 추가 {#add-tags-and-ownership}

태그와 팀 소유권을 사용하면 관련 여정을 찾고 [여정 카탈로그][20]에서 필터링하기가 쉬워집니다. 일관된 명명 및 태그 지정 규칙을 사용하면 카탈로그가 커져도 여정을 체계적으로 관리할 수 있습니다.

### Synthetics 전용 {#synthetics-only}

Synthetic Monitoring & Testing만 사용하는 경우, 테스트 모음이 자동으로 여정으로 표시됩니다. 여정을 추가하려면 새 테스트 모음을 생성하세요.

## 2단계: RUM 작업 추가 {#step-2-add-rum-operations}

RUM 작업은 여정 내 중요한 작업의 가용성과 지연 시간을 측정합니다. RUM 작업을 사용하여 기술적 성능이 사용자 이탈에 영향을 미치는지 조사하세요.

연결된 작업에 설정된 SLO는 [여정 상태][6]를 결정하는 데 반영됩니다.

### 매칭되는 작업 검토 {#review-matching-operations}

Datadog은 시간 상관 관계를 사용하여 여정의 일부일 수 있는 기존 RUM 작업을 식별합니다. 이러한 작업은 세부 정보 보고서에 **Matching**이라는 이름으로 표시됩니다.

작업은 사용자가 여정을 완료하는 동안 마주치는 경우에만 연결하세요.

{{< img src="journey_monitoring/journey-monitoring-matching-operations.png" alt="시간을 기준으로 매칭된 RUM 작업과 실행 횟수, 성공률, 지연 시간, SLO 생성 옵션을 보여주는 Journey Monitoring 세부 정보 보고서" style="width:100%;" >}}

### 작업 생성 {#create-operations}

중요한 작업을 나타내는 매칭 작업이 없다면 다음 계측 방법 중 하나를 선택하세요.

- **RUM SDK APIs**: [프런트엔드 애플리케이션 코드에서 작업을 계측][10]하고 작업이 시작될 때와 성공 또는 실패할 때 이를 명시적으로 보고합니다. 이 방법을 사용하면 작업의 수명 주기를 정밀하게 제어할 수 있지만 코드 변경이 필요합니다.
- **Datadog UI**: 수집된 RUM 이벤트에서 시작, 성공 및 실패 조건을 선택하여 [Datadog에서 작업을 생성][8]합니다. 작업 카탈로그 또는 여정 세부 정보 보고서의 Operations 표에서 작업을 생성할 수 있습니다. 이 방법은 코드 변경이 필요하지 않지만 Datadog이 이미 수집한 이벤트에 의존하므로 실패를 포착하는 정확도가 상대적으로 낮습니다.

[Datadog MCP Server의 `create_rum_operation` 도구][32] 및 [RUM Operations API][9]를 사용해 RUM 이벤트 조건을 기반으로 UI에서 구성되는 작업을 생성할 수도 있습니다. Datadog은 여정 세부 정보 보고서에서 생성된 작업을 자동으로 연결합니다. 다른 곳에서 생성된 작업은 생성 후 여정에 연결하세요.

### 작업 관리 {#manage-operations}

**Manage Operations**를 선택하여 여정에 작업을 추가하거나 여정에서 작업을 제거하세요.

작업 연결:

- 작업을 여정의 중요 경로의 일부로 식별합니다.
- 작업의 SLO를 여정 상태에 반영합니다.
- 작업에 설정된 SLO가 하나도 없으면 목표치가 99%인 가용성 SLO를 생성합니다.

### 작업 SLO 관리 {#manage-operation-slos}

연결된 각 작업은 Datadog이 여정에 대한 기여도를 평가할 수 있도록 최소 하나의 SLO가 필요합니다. 작업에는 가용성 SLO, 지연 시간 SLO 또는 둘 다 있을 수 있습니다. 자세한 지침은 [RUM 작업에 대한 SLO 생성 모범 사례][11]를 참조하세요.

<div class="alert alert-tip">
여정 전환에 가장 큰 영향을 미치는 작업부터 시작합니다. 필요에 따라 작업을 추가합니다.
<ul>
<li>사용자 로그인 여정의 경우 최종 로그인 작업을 모니터링하여 유효한 자격 증명으로 인증이 성공적으로 완료되는지 확인합니다.</li>
<li>이커머스 결제 여정의 경우, 결제 실패 시 사용자가 여정을 완료할 수 없으므로 결제 작업을 모니터링합니다.</li>
</ul>
</div>

## 3단계: Synthetic 테스트 적용 범위 추가 {#step-3-add-synthetic-test-coverage}

Synthetic 테스트는 중요한 여정 경로에 대한 기술적 적용 범위를 제공합니다. 테스트 실패는 사용자에게 영향을 미치는 회귀를 나타낼 수 있으며, 커버링 테스트는 여정 가동 시간을 결정합니다.

Synthetic Monitoring 쓰기 권한을 보유한 상태에서 이벤트 기반 여정을 생성하면 Datadog은 테스트 모음을 생성하고 여정을 포괄하는 기존 테스트를 추가합니다. 테스트 모음에는 기본 목표치가 99.9%로 설정된 편집 가능한 가동 시간 SLO가 포함됩니다. Synthetic Monitoring 쓰기 권한이 없으면 Datadog은 테스트 모음 없이 여정을 생성합니다.

Synthetics 전용 여정의 경우, 기존 테스트 모음이 여정을 정의합니다. 여정 세부 정보 보고서의 Synthetic Monitoring & Testing 섹션은 테스트 모음의 성능과 가동 시간에 대한 정보를 제공합니다.

### 매칭되는 테스트 검토 {#review-matching-tests}

이벤트 기반 여정의 경우, Datadog은 RUM 데이터를 사용하여 여정을 포괄하는 Synthetic 테스트를 식별합니다. 매칭되는 테스트는 여정 세부 정보 보고서와 테스트 모음 페이지에 표시됩니다.

- 매칭되는 각 테스트를 검토합니다.
- 여정의 중요 경로를 포괄하는 테스트를 추가합니다.

{{< img src="journey_monitoring/journey-monitoring-matching-tests.png" alt="매칭되는 Synthetic 테스트의 경보 상태와 가동 시간을 보여주는 Journey Monitoring 세부 정보 보고서" style="width:100%;" >}}

### 테스트 생성 {#create-tests}

테스트 적용 범위를 확보하려면 브라우저 테스트 또는 모바일 애플리케이션 테스트를 생성한 다음 여정의 테스트 모음에 추가하세요.

여정을 포괄하는 Synthetic 테스트가 없다면 [Bits Testing][18]을 사용하여 해당 여정을 포괄하는 테스트를 생성할 수 있습니다.

### 테스트 관리 {#manage-tests}

**Manage Tests**를 선택하여 여정의 테스트 모음에 테스트를 추가하거나 테스트 모음에서 제거하세요. 테스트 모음이 비어 있거나 Datadog이 새롭게 매칭되는 테스트를 식별하면 여정을 포괄하는 테스트를 추가하세요.

### 적용 범위 유지 {#maintain-coverage}

- 여정의 시작 또는 종료 조건이 변경되면 해당 여정을 커버하는 테스트에 영향을 줄 수 있습니다. 이러한 조건을 변경한 후 적용 범위를 검토합니다.
- 여정의 테스트 모음에 해당 여정을 포괄하는 테스트가 하나 이상 있으면 Synthetic 적용 범위가 적용되고 여정의 가동 시간이 보고됩니다.
- 더 이상 여정을 포괄하지 않는 테스트는 제거하고, 애플리케이션 변경에 따라 새롭게 매칭되는 테스트를 추가하세요.

적용 범위를 관리하면 Synthetic 테스트가 수정되므로 Synthetic Monitoring 쓰기 권한과 테스트 모음에 대한 제한 정책이 필요합니다.

## 여정 검증 {#validate-a-journey}

여정을 구성한 후 다음 사항을 확인하세요.

- 시작 및 종료 이벤트가 의도한 사용자 흐름을 나타냅니다.
- KPI가 예상 트래픽 및 사용자 행동과 일치합니다.
- 변형이 예상되는 서로 다른 경로를 나타냅니다.
- 연결된 각 RUM 작업은 중요한 동작을 나타내며 하나 이상의 SLO가 설정되어 있습니다.
- 테스트 모음에는 중요 경로를 포괄하는 테스트가 포함되어 있습니다.
- 태그와 팀 소유권을 통해 사용자가 카탈로그에서 여정을 쉽게 찾을 수 있습니다.

## 여정 관리 {#maintain-a-journey}

여정의 시작 또는 종료 이벤트를 변경한 후에는 해당 변형, 매칭되는 작업, Synthetic 적용 범위 및 KPI를 검토하세요. 여정 카탈로그를 사용하여 여정을 찾고 편집하세요. [여정 상태 페이지][6]에서는 **Degraded** 및 **Missing coverage** 상태를 조사하는 방법을 설명합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/journey_monitoring/#prerequisites
[2]: /ko/journey_monitoring/suggested_journeys/
[3]: /ko/journey_monitoring/variants/
[4]: /ko/real_user_monitoring/rum_without_limits/
[5]: /ko/journey_monitoring/details_report/
[6]: /ko/journey_monitoring/status/
[8]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[9]: /ko/api/latest/rum-operations/
[10]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[11]: /ko/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[12]: /ko/synthetics/browser_tests/
[13]: /ko/synthetics/mobile_app_testing/
[14]: /ko/synthetics/test_suites/
[15]: /ko/journey_monitoring/roles_and_permissions/
[16]: /ko/journey_monitoring/overview/#upstream-and-downstream-journeys
[17]: /ko/journey_monitoring/details_report/#synthetic-monitoring--testing
[18]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[20]: /ko/journey_monitoring/overview/#journey-catalog
[21]: /ko/real_user_monitoring/operations_monitoring/
[22]: /ko/product_analytics/
[24]: /ko/journey_monitoring/configuring_journeys/#step-3-add-synthetic-test-coverage
[25]: /ko/service_level_objectives/
[26]: /ko/journey_monitoring/details_report/#traffic-and-conversion-trends
[27]: /ko/product_analytics/charts/funnel_analysis/
[28]: /ko/journey_monitoring/#rum-and-product-analytics
[29]: /ko/journey_monitoring/#synthetics-only
[30]: /ko/real_user_monitoring/explorer/visualize/#funnels
[31]: /ko/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#measure-component-level-performance-with-custom-vitals
[32]: /ko/mcp_server/tools/#create_rum_operation