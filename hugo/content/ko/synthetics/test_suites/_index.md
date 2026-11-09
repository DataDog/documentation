---
description: Synthetic Monitoring 테스트를 논리적 그룹으로 구성할 수 있습니다.
further_reading:
- link: /synthetics/
  tag: 문서
  text: Synthetic Monitoring에 대해 알아보기
- link: /monitors/types/synthetic_monitoring/
  tag: 문서
  text: Synthetic 테스트 모니터 구성
- link: /synthetics/bits_testing/
  tag: 문서
  text: Bits Testing
- link: /synthetics/troubleshooting/
  tag: 문서
  text: Synthetic Monitoring 문제 해결
- link: https://www.datadoghq.com/blog/test-suites/
  tag: 블로그
  text: 복잡한 테스트 환경에서 체계적이고 실행 가능한 인사이트 얻기
- link: /synthetics/guide/how-synthetics-monitors-trigger-alerts/
  tag: 가이드
  text: Synthetic 모니터 알림 이해
title: 테스트 모음
---
## 개요 {#overview}

Synthetic Monitoring 테스트 모음을 사용하면 여러 테스트를 하나의 컬렉션으로 구성하여 관리 및 문제 해결을 간소화하며, 사용자 여정, 환경, 위치, 서비스, 팀 또는 워크플로에 맞는 기타 차원별로 테스트를 그룹화할 수 있습니다. 통합 보기에서 집계된 결과를 조회하고 실패한 구성 요소를 식별하며 관련 테스트 전반에서 애플리케이션 성능을 파악할 수 있습니다. 테스트의 상당 부분이 실패할 때 통합 알림을 받도록 테스트 모음 수준 알림을 구성할 수도 있습니다.

## 주요 기능 {#key-features}

- **영향 기반 경보**: 테스트 모음의 상당 부분이 실패할 때 통합 경보를 받습니다.
- **중앙 집중식으로 파악**: 한 곳에서 테스트 모음의 모든 테스트와 그 결과를 조회할 수 있습니다.
- **간소화된 관리**: 개별 테스트를 별도로 관리하는 대신 테스트 그룹을 생성하고 실행합니다.
- **더 쉬운 유지 관리**: 애플리케이션 변경 시 업데이트가 필요한 테스트를 식별합니다.

## 테스트 모음 생성 {#create-a-test-suite}

Synthetic Monitoring 테스트 모음을 생성하려면 다음 단계를 수행하세요.
1. Datadog에서 {{< ui >}}Digital Experience{{< /ui >}}로 이동합니다.
2. {{< ui >}}New Test Suite{{< /ui >}}를 클릭합니다.
3. 필요시 [Synthetic Monitoring tests][1] 페이지로 이동하여 {{< ui >}}\+ New Suite{{< /ui >}}를 클릭합니다.

Bits Testing이 기존 테스트를 테스트 모음으로 그룹화하도록 하려면 [Bits Testing으로 테스트 모음 생성](#create-test-suites-with-bits-testing)을 참조하세요.

## 테스트 모음 구성 {#test-suite-configuration}

1. 테스트 모음의 이름을 입력합니다(예: `Checkout flow` 또는 `API health checks`).
2. {{< ui >}}Add Tests{{< /ui >}}를 클릭하여 기존 Synthetic Monitoring 테스트를 포함합니다.  
   여기서는 다음을 수행할 수 있습니다.
   - **검색**: 이름이나 태그로 검색합니다.  
   - **필터링**: 테스트 유형(예: Browser, API, Private Location 또는 Mobile)별로 필터링합니다.
   - **선택**: 포함할 테스트를 하나 이상 선택합니다.
3. {{< ui >}}Add Tests{{< /ui >}}를 클릭하여 확인합니다.
4. _필요시 각 항목 옆의 Remove Test from Suite 아이콘을 사용해 테스트를 제거합니다_.

5. 테스트 모음에 대한 알림을 구성합니다.
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">이 <a href="/getting_started/site">Datadog 사이트</a>에서는 테스트 모음에 대한 알림이 지원되지 않습니다({{< region-param key="dd_site_name" >}})</div>
{{% /site-region %}}

   - 기본적으로 모든 테스트는 {{< ui >}}Critical{{< /ui >}}로 표시되며, 중요 테스트가 하나라도 실패하면 경보가 트리거됩니다. 

     **참고**: 테스트 모음 경보는 개별 테스트 경보와 별개입니다. 중복 알림을 방지하려면 테스트 모음에 포함된 개별 테스트의 경보를 뮤트하세요.
   - 특정 테스트가 테스트 모음 수준의 경보를 트리거하지 않도록 하려면 해당 테스트를 선택하고 {{< ui >}}Ignored{{< /ui >}}로 표시하세요.
   - 지정된 비율의 중요 테스트가 실패할 때만 경보가 트리거되도록 경보 임계값을 조정하세요.

   {{< img src="synthetics/test_suites/suite_alerting.png" alt="테스트 모음 알림 드롭다운이 확장된 테스트 모음 알림 생성 페이지입니다. " style="width:80%;">}}

   **참고**: 기존 테스트 모음에서는 알림이 기본 설정으로 활성화됩니다. 구성은 필요에 따라 수정할 수 있습니다.

6. 단일 테스트와 동일한 방식으로 [모니터 설정][2](알림 메시지, 수신자, 재알림)을 구성합니다.
7. 완료되면 {{< ui >}}Save Suite{{< /ui >}}를 클릭합니다.

{{< img src="synthetics/test_suites/test_suite_creation_2.png" alt="Synthetic Monitoring 테스트 모음 생성 페이지" style="width:80%;">}}

## Bits Testing으로 테스트 모음 생성 {#create-test-suites-with-bits-testing}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">이 <a href="/getting_started/site">Datadog 사이트</a>에서는 Bits Testing을 사용한 테스트 모음 생성이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{% /site-region %}}

[Bits Testing][4]은 기존 Synthetic 테스트를 테스트 모음으로 그룹화할 수 있습니다. 테스트를 어떻게 그룹화할지 일상적인 언어로 설명하면 Bits Testing이 조건에 맞는 테스트 모음을 제안합니다. 각 테스트 모음을 검토하고 생성할 테스트 모음을 선택합니다. 이는 Bits Testing 검색 작업이 생성한 테스트 모음과는 별개로, 새 테스트를 포함합니다.

Bits Testing에 다음을 요청할 수 있습니다.

- **하나의 테스트 모음**: 테스트 모음이 무엇을 나타내는지 설명하세요. 예: "결제 흐름을 모니터링하는 테스트 모음을 생성해줘."
- **한 번에 여러 테스트 모음**: 테스트를 어떻게 나눌지 설명하세요. 예를 들어 팀별, 서비스별, 환경별 또는 서비스와 환경의 조합별로 테스트 모음을 하나씩 만들 수 있습니다.

Bits Testing으로 테스트 모음을 생성하려면 다음 단계를 따르세요.

1. Synthetic Monitoring & Testing에서 상단 탐색 메뉴의 {{< ui >}}Bits Testing{{< /ui >}}를 클릭합니다.
2. 테스트를 그룹화할 방법을 설명합니다(예: `Create a test suite for each one of my teams`). 제안된 프롬프트 중 하나를 선택할 수도 있습니다.
3. Bits Testing이 생성할 테스트 모음을 검토한 다음 생성 버튼을 클릭합니다(예: {{< ui >}}Generate 5 Suites{{< /ui >}}, 단일 테스트 모음의 경우 {{< ui >}}Generate Suite{{< /ui >}}).

   {{< img src="synthetics/test_suites/bits_testing_multiple_suites.png" alt="팀당 하나의 테스트 모음을 요청했을 때 Bits Testing의 응답으로, 5개의 테스트 모음 프롬프트와 Generate 5 Suites 버튼이 나열됩니다." style="width:100%;" >}}

4. {{< ui >}}Review suggested suites{{< /ui >}} 패널에서 목록의 각 테스트 모음을 선택하여 해당 설명과 테스트를 확인합니다. 각 테스트 모음에 대해 다음 작업을 수행할 수 있습니다.
   - {{< ui >}}Add Tests{{< /ui >}}를 클릭하여 테스트를 추가하거나 테스트를 선택하고 {{< ui >}}Remove From Suite{{< /ui >}}를 클릭하여 제거합니다.
   - 각 테스트의 {{< ui >}}Suite Alerting{{< /ui >}} 값을 설정합니다. 기본적으로 모든 테스트는 {{< ui >}}Critical{{< /ui >}}로 표시됩니다. 자세한 내용은 [테스트 모음 구성](#test-suite-configuration)을 참조하세요.
   - {{< ui >}}Exclude Suite{{< /ui >}}를 클릭하여 해당 테스트 모음 생성을 건너뜁니다.

   {{< img src="synthetics/test_suites/bits_testing_review_suites.png" alt="생성된 테스트 모음 5개, 테스트 모음 하나의 설명, Suite Alerting이 Critical로 설정된 해당 테스트가 표시된 Review suggested suites 패널입니다." style="width:100%;" >}}

5. 생성 버튼(예: {{< ui >}}Create 5 Suites{{< /ui >}})을 클릭합니다.
6. {{< ui >}}View Suites{{< /ui >}}를 클릭하여 새 테스트 모음을 엽니다.
7. 각 테스트 모음을 열고 [모니터 설정][2]에서 알림 수신자를 추가한 다음 테스트 모음을 저장합니다. Bits Testing은 생성하는 테스트 모음에 수신자를 추가하지 않습니다.

Bits Testing이 생성하는 테스트 모음은 테스트 모음 수준의 Alerting과 자동으로 생성되는 서비스 수준 목표를 포함하여 사용자가 수동으로 생성하는 테스트 모음과 동일하게 작동합니다. [서비스 수준 목표](#service-level-objectives) 섹션을 참조하세요.

### Bits Testing을 위한 프롬프트 작성 {#write-a-prompt-for-bits-testing}

기술적인 세부 사항뿐만 아니라 모니터링하려는 비즈니스 또는 운영 영역을 설명하세요. 예시는 다음과 같습니다.

- `Create a suite for the checkout journey`
- `Create separate suites for each team and environment`
- `Group the tests that validate authentication`
- `Create one suite for each production service`

프롬프트에서 사용자 여정, 서비스, 팀, 환경, 공유 플랫폼 기능 또는 릴리스 검증과 같은 어떤 그룹화 방식이든 설명할 수 있습니다.

Bits Testing이 제안하는 테스트 모음은 기존 테스트의 정보와 그룹화를 얼마나 명확하게 설명하는지에 따라 달라집니다. 제안된 각 테스트 모음을 만들기 전에 검토하세요.

## 서비스 수준 목표 {#service-level-objectives}

테스트 모음을 생성하면 Datadog이 자동으로 해당 테스트 모음에 대한 SLO(서비스 수준 목표)를 생성하며, 별도의 구성은 필요하지 않습니다. 기본적으로 SLO는 99.9% 목표로 7일 롤링 윈도우를 사용합니다.

<div class="alert alert-info">테스트 모음 권한(조회 및 편집)은 테스트 모음 자체에 적용되며 자동 생성된 SLO의 권한과는 상관이 없습니다. SLO에 대한 액세스 권한은 사용자의 <a href="/service_level_objectives/#permissions">SLO 제품 권한</a>에 따라 결정됩니다. 테스트 모음 편집 권한이 없는 사용자라도 SLO 편집 권한이 있으면 자동 생성된 SLO를 편집할 수 있습니다.</div>

테스트 모음 세부 정보 페이지의 SLO 패널에는 현재 SLO 상태와 오류 예산이 표시됩니다. 이 보기에서 다음 작업을 수행할 수 있습니다.

- **[경보 생성](#create-an-alert)**: SLO 성능이 크게 저하될 때 경보가 발생하도록 합니다. 경보가 이미 생성된 경우 경보 표시기에 마우스를 가져가면 추가 세부 정보를 조회할 수 있습니다.
- **[세부 정보 조회](#view-details)**: 눈 모양 아이콘을 클릭하면 전체 SLO 세부 정보 페이지가 열립니다.
- **[기여자 조회](#contributors)**: 어떤 테스트가 오류 예산을 소비하고 있는지 표시됩니다.
- **[SLO 편집](#edit-the-service-level-objective)**: 연필 모양 아이콘을 {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} 클릭하여 편집할 수 있습니다.

{{< img src="synthetics/test_suites/test_suite_slo_panel_v2.png" alt="7일 롤링 윈도우와 오류 예산이 포함된 SLO 패널, 기여도가 가장 높은 테스트가 표시된 Primary Contributors 섹션, Global Uptime 타임라인 및 Test Runs 섹션을 보여주는 테스트 모음 세부 정보 페이지입니다." style="width:100%;">}}

### 경보 생성 {#create-an-alert}

SLO details 패널에서 {{< ui >}}Create alert{{< /ui >}}를 클릭하여 SLO Monitor 구성 양식을 열면 여기에서 경보 조건과 알림 설정을 지정할 수 있습니다.

{{< img src="synthetics/test_suites/test_suite_slo_create_alert.png" alt="경보 조건 및 알림 설정이 포함된 SLO Monitor 생성 양식입니다." style="width:80%;">}}

### 세부 정보 조회 {#view-details}

눈 모양 아이콘을 클릭하면 전체 SLO 세부 정보 페이지가 열립니다. 이 페이지에서 SLO 상태, 오류 예산 소진, 소진 비율 및 메트릭 시계열을 조회할 수 있습니다.

{{< img src="synthetics/test_suites/test_suite_slo_details.png" alt="SLO 상태, 오류 예산 소진, 소진 비율 및 메트릭 시계열을 보여주는 테스트 모음의 전체 SLO 세부 정보 페이지입니다." style="width:90%;">}}

### 기여자 {#contributors}

기여자 섹션에는 오류 예산 소비에 가장 큰 영향을 미치는 테스트가 강조 표시됩니다.

- **Total number of critical tests**: 테스트 모음에 포함된 중요 테스트의 총수입니다.
- **Error budget consumed by**: 오류 예산을 소비한 테스트 수입니다.
- **Top 3 contributors consumed**: 테스트 모음이 경보 상태일 때 각 테스트가 경보 상태로 유지되었던 기간을 기준으로, 영향 비율이 가장 높은 테스트 3개입니다.

{{< img src="synthetics/test_suites/test_suite_slo_contributors.png" alt="총 중요 테스트 수, 소비된 오류 예산, 영향 비율 기준 상위 3개 기여자를 보여주는 Primary Contributors 섹션입니다." style="width:90%;">}}

### 서비스 수준 목표 편집{#edit-the-service-level-objective}

SLO 기간(예: 30일) 또는 목표를 업데이트하려면 {{< img src="icons/pencil-mdi.svg" inline="true" style="width:16px;">}} SLO 패널에서 연필 모양 아이콘을 클릭합니다. 이 SLO는 테스트 모음에서 자동으로 생성되므로 기간, 목표 및 경고 임계값만 편집할 수 있습니다.

   {{< img src="synthetics/test_suites/test_suite_slo_edit.png" alt="목표 및 기간 필드를 보여주는 테스트 모음에 대한 SLO 편집 페이지입니다." style="width:90%;">}}

## 테스트 모음 조회 및 관리{#view-and-manage-test-suites}

모음을 생성하면 [Synthetic Monitoring 테스트][1] 페이지의 {{< ui >}}Suites{{< /ui >}} 탭에 나타납니다. {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Test Suites{{< /ui >}}에서 테스트 모음에 액세스할 수도 있습니다.

[예약된 가동 중지][3]를 하나 이상의 테스트 모음에 적용하려면 확인란을 사용하여 테스트 모음을 선택한 다음 {{< ui >}}Add to Downtime{{< /ui >}}을 클릭합니다.

테스트 모음을 조회할 때 다음 탭 3개를 사용할 수 있습니다.

- {{< ui >}}Tests in the Suite{{< /ui >}}: 테스트 모음에 포함된 모든 테스트를 나열합니다.
- {{< ui >}}Test Runs{{< /ui >}}: 전역 가동 시간 메트릭 및 관련 테스트 실행을 표시합니다.
- {{< ui >}}Attributes{{< /ui >}}: `team`, 모니터, 테스트 모음 작성자 등의 테스트 모음 속성을 표시합니다.

**참고**: 테스트 실행은 해당 테스트가 추가된 날짜부터 테스트 모음에 나타납니다. 이전 결과를 조회하려면 개별 테스트 페이지를 확인하세요. 테스트 이름을 바꾸더라도 이전 테스트 실행은 원래 이름 아래에 나열된 상태로 유지됩니다. 테스트 모음당 최대 300개의 테스트를 추가할 수 있습니다.

{{< img src="synthetics/test_suites/test_suite_summary_2.png" alt="Synthetic Monitoring 테스트 모음 요약 페이지" style="width:100%;">}}

## 테스트 모음 실행 {#run-a-test-suite}

테스트 실행은 다음 2가지 방법으로 트리거할 수 있습니다.

- [테스트 모음의 모든 테스트 실행](#run-all-tests-in-the-suite)
- [선택한 테스트 실행](#run-selected-tests)

### 테스트 모음의 모든 테스트 실행 {#run-all-tests-in-the-suite}

테스트 모음 세부 정보 페이지에서 오른쪽 상단의 {{< ui >}}Run Suite Now{{< /ui >}}를 클릭하면 테스트 모음의 모든 테스트가 트리거됩니다.

{{< img src="synthetics/test_suites/run_suite_now.png" alt="오른쪽 상단에 Run Suite Now 버튼이 있는 테스트 모음 세부 정보 페이지입니다." style="width:100%;" >}}

### 선택한 테스트 실행 {#run-selected-tests}

테스트의 하위 집합을 실행하려면 다음 단계를 따르세요.

1. 테스트 모음으로 이동하여 {{< ui >}}Tests in the Suite{{< /ui >}} 탭을 클릭합니다.
2. 확인란을 사용하여 실행할 테스트를 선택합니다.
3. {{< ui >}}Run Tests Now{{< /ui >}}를 클릭합니다.

{{< img src="synthetics/test_suites/run_tests_now.png" alt="Tests in the Suite 탭에서 테스트가 일괄 선택되고 Run Tests Now 버튼이 표시됩니다." style="width:100%;" >}}

**참고**: {{< ui >}}Run Tests Now{{< /ui >}}를 사용하여 한 번에 최대 50개의 테스트를 실행할 수 있습니다.

## 문제 해결 {#troubleshooting}

일부 테스트가 테스트 모음에 표시되지 않는 경우:

- 테스트가 활성 상태이며 삭제되지 않았는지 확인하세요.
- 해당 테스트를 조회할 수 있는 권한이 있는지 확인하세요.
- 테스트를 추가할 때 필터를 새로 고치거나 검색어를 지우세요.

실행 결과가 불완전해 보이는 경우:

- 테스트 실행 빈도와 최근 활동을 확인하세요.
- 테스트 실행이 필터링될 수 있는 태그 또는 위치의 불일치를 확인하세요.
- 테스트 모음을 다시 저장하여 해당 모음과 테스트 간의 연결을 새로 고치세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/tests
[2]: /ko/synthetics/notifications/
[3]: /ko/synthetics/platform/downtime/
[4]: /ko/synthetics/bits_testing/