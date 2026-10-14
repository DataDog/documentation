---
description: 의미 있는 시작 및 종료 이벤트, 기술적 적용 범위, SLO, Synthetic 테스트 및 변형을 사용하여 여정을 구성합니다.
further_reading:
- link: /journey_monitoring/
  tag: 설명서
  text: Journey Monitoring에 대해 알아보기
- link: /journey_monitoring/details_report/
  tag: 설명서
  text: 여정 세부 보고서에 대해 알아보기
- link: /journey_monitoring/uptime/
  tag: 설명서
  text: 여정 가동 시간에 대해 알아보기
title: Datadog에서 여정 구성
---
## 개요 {#overview}

이 가이드는 중요한 사용자 흐름을 나타내고 이러한 흐름의 상태를 파악하는 여정을 구성하는 방법을 설명합니다.

여정 구성은 다음 3단계로 구성됩니다.

1. 여정을 만들고 사용자 흐름을 정의합니다.
2. 중요한 기술 단계를 나타내는 RUM 작업을 추가합니다.
3. 여정을 다루는 Synthetic 테스트를 추가합니다.

이 단계를 완료한 후 여정의 KPI(핵심 성과 지표), 작업, SLO(Service Level Objectives), 테스트 및 변형을 검증합니다.

## Journey Monitoring을 사용하는 경우 {#when-to-use-journey-monitoring}

Journey Monitoring은 엔드투엔드 흐름 전반에 걸쳐 사용자 행동과 기술적 상태를 통합하여 모니터링합니다. 이를 활용하면 여러 제품에 걸쳐 개별적으로 설정해야 했던 흐름을 단일 공간에서 모니터링하고 문제를 해결할 수 있습니다.

일반적인 대안은 다음과 같습니다.

- **RUM(Real User Monitoring)**:
  - RUM 세션 탐색기의 퍼널 또는 RUM 이벤트를 기반으로 하는 퍼널 위젯
  - 버튼 클릭이나 페이지 조회수와 같이 사용자 활동을 추적하는 위젯
  - 흐름 볼륨, 완료 시간 또는 완료된 여정을 측정하는 사용자 지정 메트릭 또는 작업
  - 주요 기술 단계를 나타내는 사용자 지정 바이탈(RUM 작업이 여정 내에서 나타낼 수 있음)
- **Synthetic Monitoring**: 동일한 흐름을 다루지만 여정의 테스트 모음으로 구성되지 않은 여러 테스트
- **Product Analytics**: 엔드투엔드 흐름 전반의 행동을 추적하는 퍼널, 여정 경로 또는 기타 시각화

Journey Monitoring은 Product Analytics를 사용하여 사용자 행동과 경험을 파악하고, RUM을 사용하여 성능과 가용성을 평가하며, Synthetic 테스트를 사용하여 회귀를 탐지하고 여정 가동 시간을 측정합니다.

## 시작 전 참고 사항 {#before-you-begin}

이 가이드를 따르기 전에 [Journey Monitoring 개요 및 전제 조건][1]을 검토하세요. Journey Monitoring을 사용하려면 조직에 RUM without Limits, Product Analytics, Synthetic Browser Tests 또는 Synthetic Mobile Tests 중 하나 이상에 대한 유료 또는 체험 구독이 있어야 합니다.

### 권한 및 역할 {#permissions-and-roles}

Journey Monitoring은 여러 제품의 자산을 사용하므로 여정 및 연결된 자산에 대한 액세스 권한은 각 제품의 권한에 따라 다릅니다.

여정을 만들거나 편집하려면 다음 작업을 수행합니다.

- 사용자의 역할에 Journey Monitoring 쓰기 권한이 있어야 합니다.
- 여정의 Synthetic 테스트 모음을 만들려면 Synthetic Monitoring 쓰기 권한도 필요합니다. 쓰기 권한이 없으면 Datadog은 테스트 모음 없이 여정을 만들며 테스트 모음은 나중에 추가할 수 있습니다.

여정 및 연결된 자산을 보고 편집하는 방법에 대한 자세한 내용은 [역할 및 권한][10]을 참조하세요.

## 1단계: 여정 만들기 {#step-1-create-a-journey}

### 사용자 흐름을 선택합니다 {#choose-a-user-flow}

비즈니스 성과를 지원하기 위해 사용자가 반드시 완료해야 하는 중요한 사용자 대면 흐름에 대한 여정을 만듭니다. 여정은 여러 단계에 걸쳐야 하며 중요한 작업을 나타내야 합니다.

각 여정을 집중적으로 유지하려면 다음 지침을 따르세요.

**해야 할 일:**

- 각각의 고유한 사용자 흐름에 대해 별도의 여정을 만들고 관련 여정을 서로 연결합니다.
- 하나의 상위 수준 여정을 사용하고 속성 필터를 적용하여 미국과 영국의 사용자와 같은 코호트를 비교합니다.

**하지 말아야 할 일:**

- 단일하고 짧은 상호 작용에 대한 여정을 만듭니다. 대신 [RUM 작업][4]을 사용하세요.
- 여러 개의 서로 다른 사용자 흐름을 하나의 여정으로 결합합니다.
- 국가와 같은 속성 값만 다른 중복 여정을 만듭니다.

### 생성 방법 선택 {#choose-a-creation-method}

여정을 수동으로 만들거나 제안된 여정으로 시작합니다. 지침은 [Journey Monitoring 설정][2]을 참조하세요.

염두에 둔 특정 사용자 흐름이 있는지에 따라 생성 방법을 선택합니다.

- 어떤 여정을 만들어야 할지 확실하지 않은 경우 [제안된 여정][6]으로 시작하세요. 제안된 여정은 시작, 전환, 전환율을 포함한 상위 수준의 KPI를 제공합니다.
- 기능을 릴리스하고 애플리케이션 경험을 업데이트할 때 새로운 제안된 여정을 검토합니다. Datadog은 애플리케이션 내 사용자 활동을 기반으로 제안을 생성합니다.
- 모니터링하려는 특정 사용자 흐름이 있는 경우 여정을 수동으로 만듭니다.

### 시작 및 종료 조건 정의 {#define-start-and-end-conditions}

여정은 시작 이벤트와 종료 이벤트로 정의됩니다. 작업 이벤트, 조회 이벤트 또는 둘 다를 선택합니다.

#### 여러 시작 및 종료 이벤트 {#multiple-start-and-end-events}

여러 시작 이벤트는 동일한 사용자 흐름으로 들어오는 여러 진입점을 나타낼 수 있습니다. 여러 종료 이벤트는 유효한 결론을 여러 개 나타낼 수 있습니다.

추가 이벤트가 있을 때마다 여정 정의가 확장됩니다. 시작 또는 종료 이벤트가 너무 많으면 여정의 범위가 불분명해지고 KPI의 정확도가 떨어질 수 있습니다.

#### 속성 필터 {#attribute-filters}

여정 수준 속성은 내부 사용자와 같은 광범위한 코호트를 포함하거나 제외합니다. 개별 시작 및 종료 조건에 대한 속성은 흐름을 더 좁힙니다.

여정의 이름이나 설명에 중요한 속성 필터를 포함하면 사용자가 KPI의 범위를 이해하는 데 도움이 됩니다.

#### 참조 경로 {#referrer-paths}

참조 경로는 시작 또는 종료 이벤트를 특정 페이지 조회 이후의 인스턴스로 제한합니다. 이는 여러 여정 컨텍스트에 나타나는 이벤트와 특정 여정에 속하는 인스턴스를 구분하는 데 도움이 됩니다.

#### 여정 변형 {#journey-variants}

기본 여정 정의에는 시작 및 종료 이벤트만 포함됩니다. 변형은 해당 지점 사이에 특정 중간 작업 또는 조회 이벤트 시퀀스를 추가합니다. 변형은 여정의 전체 범위를 변경하지 않고 동일한 여정을 통과하는 일반적인 경로를 구분합니다.

변형을 선택하면 여정의 메트릭과 텔레메트리가 해당 이벤트 시퀀스로 필터링됩니다. 이를 통해 다양한 경로에 걸쳐 볼륨, 전환율 및 완료 시간을 비교할 수 있습니다. 속성 필터를 사용하면 변형을 특정 코호트로 더 좁힐 수 있습니다.

각 변형에는 고유한 이름과 최소 하나의 중간 이벤트가 필요합니다. 변형 생성, 분석 및 삭제에 대한 자세한 내용은 [여정 변형][3]을 참조하세요.

#### 시작 및 종료 이벤트 선택 {#start-and-end-event-selection}

시작 이벤트는 여정을 명확하게 시작하고 의도적인 사용자 작업을 나타내야 합니다.

<div class="alert alert-danger">여정이 완료되었음을 확인하는 종료 이벤트를 선택합니다. 'Pay' 또는 'Submit'을 클릭한다고 해서 작업이 성공했다는 의미는 아닙니다. 나중에 성공이 확인되는 이벤트가 있다면 해당 이벤트를 대신 사용하여 실패한 시도가 완료된 여정으로 집계되지 않도록 하세요.</div>

예:

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

### 이름, 태그 및 소유권 추가 {#add-names-tags-and-ownership}

태그와 팀 소유권은 팀이 관련 여정을 찾고 여정 카탈로그를 필터링하는 데 도움이 됩니다. 일관된 명명 및 태그 지정 규칙을 사용하면 카탈로그가 커져도 여정을 체계적으로 관리할 수 있습니다.

## 2단계: RUM 작업 추가 {#step-2-add-rum-operations}

RUM 작업은 여정의 주요 순간에 대한 기술적 적용 범위를 제공합니다. 이러한 작업의 가용성과 지연 시간은 기술적 성능이 사용자 이탈에 영향을 미치는지 파악하는 데 도움이 됩니다.

### 제안된 작업 연결 {#link-suggested-operations}

Journey Monitoring 세부 정보 보고서는 시간 상관 관계를 사용하여 여정의 일부일 수 있는 기존 RUM 작업을 제안합니다. 작업은 사용자가 여정을 완료하는 동안 마주치는 경우에만 연결하세요.

{{< img src="journey_monitoring/journey-monitoring-correlated-operations.png" alt="실행, 성공률, 지연 시간 및 SLO 생성 옵션과 함께 시간 기반으로 상관 관계가 있는 RUM 작업을 보여주는 Journey Monitoring 세부 정보 보고서입니다." style="width:100%;" >}}

작업 연결:

- 작업을 여정에 연결하고 여정의 중요 경로의 일부로 식별합니다.
- 작업에 아직 SLO가 없는 경우 자동으로 가용성 SLO를 생성합니다.

### 작업 생성 {#create-operations}

다음 방법 중 하나를 사용하여 작업을 생성합니다.

- [Datadog에서][11]
- [RUM Operations API 사용][12]
- [RUM SDK API 사용][13]

### 작업에 대한 SLO 생성 {#create-slos-for-operations}

연결된 각 작업은 Datadog이 여정에 대한 기여도를 평가할 수 있도록 최소 하나의 SLO가 필요합니다. 작업에는 가용성 SLO, 지연 시간 SLO 또는 둘 다 있을 수 있습니다. 지침은 [RUM 작업에 대한 SLO 생성 모범 사례][14]를 참조하세요.

여정 세부 정보 보고서에서 작업을 생성하는 경우 Datadog은 해당 작업을 여정에 연결하고 가용성 SLO를 생성합니다. RUM SDK API 또는 RUM Operations API로 작업을 생성하는 경우 [RUM 작업 API][12]를 사용하여 여정에 연결합니다.


<div class="alert alert-tip">
여정 전환에 가장 큰 영향을 미치는 작업부터 시작합니다. 필요에 따라 작업을 추가합니다.
<ul>
<li>사용자 로그인 여정의 경우 최종 로그인 작업을 모니터링하여 유효한 자격 증명으로 인증이 성공적으로 완료되는지 확인합니다.</li>
<li>이커머스 결제 여정의 경우, 결제 실패 시 사용자가 여정을 완료할 수 없으므로 결제 작업을 모니터링합니다.</li>
</ul>
</div>

## 3단계: Synthetic 테스트 적용 범위 추가 {#step-3-add-synthetic-test-coverage}

Synthetic 테스트는 중요한 여정 경로에 대한 기술적 적용 범위를 제공합니다. 테스트 실패는 사용자에게 영향을 미치는 회귀를 나타낼 수 있으며, 커버링 테스트는 여정 가동 시간을 결정합니다.

Datadog은 각 여정에 대해 기본 목표가 99.9%인 Synthetic 테스트 모음과 편집 가능한 가동 시간 SLO를 자동으로 생성합니다. 또한 여정을 커버하는 Synthetic 테스트도 추가합니다. 테스트 적용 범위, 테스트 관리 및 가동 시간 SLO에 대한 자세한 내용은 [여정 가동 시간][5]을 참조하세요.

### 여정 적용 범위 검토 {#review-journey-coverage}

Datadog은 RUM 데이터를 사용하여 여정을 다루는 Synthetic 테스트를 식별합니다. 이러한 테스트는 Journey Details 페이지와 Synthetic Test Suite 페이지에 표시됩니다.

- Datadog이 여정을 커버하는 것으로 식별한 테스트를 검토합니다.
- Datadog이 테스트 모음에 포함되지 않은 커버링 테스트를 식별하면, 표시기가 추가 테스트를 강조 표시합니다.

### 여정에 테스트 추가 {#add-tests-to-a-journey}

테스트 모음이 비어 있거나 Datadog이 추가 테스트를 식별한 경우 커버링 테스트를 추가합니다.

- 기존 테스트를 추가하려면 **Manage journey coverage**를 선택한 다음 추가할 테스트를 선택합니다.
- 적용 범위를 생성하려면 [브라우저 테스트][7] 또는 [모바일 애플리케이션 테스트][8]를 만든 다음 여정의 테스트 모음에 추가합니다. 자세한 내용은 [테스트 모음][9]을 참조하세요.

{{< img src="journey_monitoring/journey-monitoring-covering-tests.png" alt="여정을 커버하는 Synthetic 브라우저 테스트를 보여주는 Manage Tests in Suite 패널입니다." style="width:100%;" >}}

**미리 보기**: 여정을 커버하는 Synthetic 테스트가 없는 경우 [Bits Testing][15]을 사용하여 커버링 브라우저 테스트를 생성할 수 있습니다. [Bits Testing 미리 보기에 가입합니다][16].

### 적용 범위 유지 {#maintain-coverage}

- 여정의 시작 또는 종료 조건이 변경되면 해당 여정을 커버하는 테스트에 영향을 줄 수 있습니다. 이러한 조건을 변경한 후 적용 범위를 검토합니다.
- 여정은 테스트 모음에 최소 하나의 커버리지 테스트가 포함된 경우에만 가동 시간을 보고합니다. 여정의 적용 범위가 손실되면 가동 시간 보고가 중단됩니다.

적용 범위를 관리하면 Synthetic 테스트가 수정되므로 Synthetic Monitoring 쓰기 권한과 테스트 모음에 대한 제한 정책이 필요합니다. [역할 및 권한][10]을 참조하세요.

## Journey Monitoring 구성 검증{#validate-the-journey-monitoring-configuration}

잘 구성된 여정은 다음과 같은 특징을 갖습니다.

- 최상위 KPI(시작, 전환 볼륨, 전환율, 전환 시간)가 예상되는 사용자 행동과 일치합니다.
- 연결된 RUM 작업 및 Synthetic 테스트가 여정의 중요 단계에 대한 기술적 성능을 나타냅니다.
- 각 연결된 작업은 최소 하나의 SLO와 높은 성공률을 가지며, 이는 중요한 단계를 사용자가 이용할 수 있음을 나타냅니다.
- Synthetic 테스트가 간헐적인 실패 없이 일관된 결과를 생성합니다.
- 사용자가 예상되는 다양한 경로를 통해 여정을 완료할 수 있는 경우, 변형이 해당 경로를 나타냅니다.


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/journey_monitoring/
[2]: /ko/journey_monitoring/#setup
[3]: /ko/journey_monitoring/details_report/variants/
[4]: /ko/real_user_monitoring/operations_monitoring/
[5]: /ko/journey_monitoring/uptime/
[6]: /ko/journey_monitoring/map/suggested_journeys/
[7]: /ko/synthetics/browser_tests/
[8]: /ko/synthetics/mobile_app_testing/
[9]: /ko/synthetics/test_suites/
[10]: /ko/journey_monitoring/roles_and_permissions/
[11]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-from-datadog
[12]: /ko/api/latest/rum-operations/
[13]: /ko/real_user_monitoring/operations_monitoring/?tab=browser#create-operations-with-the-sdk-apis
[14]: /ko/real_user_monitoring/guide/best-practices-for-creating-slos-on-operations/
[15]: https://www.datadoghq.com/blog/bits-testing-test-coverage/
[16]: https://www.datadoghq.com/product-preview/bits-testing/