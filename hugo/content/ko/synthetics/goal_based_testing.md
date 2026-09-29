---
description: 사용자가 프롬프트 기반의 비결정적 에이전틱 Synthetic 테스트를 통해 애플리케이션에서 목표를 완료할 수 있는지 확인하세요.
further_reading:
- link: /synthetics/bits_testing/
  tag: 설명서
  text: Bits Testing
- link: /synthetics/browser_tests/
  tag: 설명서
  text: 브라우저 테스트
- link: /synthetics/test_suites/
  tag: 설명서
  text: 테스트 모음
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: 가격
  text: Synthetic Monitoring 가격
private: true
title: 목표 기반 테스트
---
{{< beta-callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
목표 기반 테스트는 미리 보기로 제공되고 있습니다. 대기자 명단에 등록하려면 액세스 권한을 요청하세요.
{{< /beta-callout >}}

## 개요 {#overview}

목표 기반 테스트는 프롬프트 기반의 비결정적 에이전틱 테스트를 통해 사용자가 애플리케이션에서 특정 목표에 도달할 수 있는지 검사하는 Synthetic 테스트 유형입니다. 이는 AI 기능을 테스트하고 지속적인 테스트 유지 관리가 필요하지 않은 중요한 사용자 여정을 검증하는 데 적합합니다.

브라우저 테스트와 달리 목표 기반 테스트는 기록되어 고정된 단계 세트를 따르지 않습니다. 대신 에이전트가 애플리케이션을 탐색하며 사용자가 설명한 목표를 향한 여러 경로를 시도합니다.

## 목표 기반 테스트 생성 {#create-a-goal-based-test}

목표 기반 테스트는 다음과 같은 두 가지 방법으로 생성할 수 있습니다.

- [Bits Testing][1]을 통해 여정에 대한 테스트 모음의 일부로 자동 생성합니다.
- {{< ui >}}New Test{{< /ui >}}를 클릭하고 목표 기반 테스트를 선택하여 수동으로 생성합니다.

{{< img src="synthetics/goal_based_testing/goal_based_test_type_selection.png" alt="Goal-Based Test가 선택된 New Synthetics Test 대화 상자" style="width:50%;" >}}

목표 기반 테스트를 수동으로 생성할 때는 다음을 제공하세요.

- 테스트 대상 애플리케이션의 **시작 URL**
- 일반 언어로 작성된 프롬프트 형태의 **목표**(예: '지원 챗봇에 제품 추천을 요청해 줘')
- 테스트를 실행할 **위치**. [지원되는 위치](#supported-locations)를 참조하세요.
- 필요시 로그인 자격 증명과 같은 변수를 재사용하기 위한 [Agent Profile][2]

{{< img src="synthetics/goal_based_testing/goal_based_test_creation.png" alt="시작 URL 및 목표 필드가 있는 New Goal-Based Test 패널" style="width:60%;" >}}

### 지원되는 위치 {#supported-locations}

목표 기반 테스트는 [Bits Testing 실행][4]에 나열된 Datadog 관리 위치에서만 실행됩니다.

가격은 [Bits Testing 청구][3]를 참조하세요.

## 목표 기반 테스트가 실행을 평가하는 방법 {#how-goal-based-testing-evaluates-a-run}

목표 기반 테스트를 시작하면 에이전트가 시작 URL에서 애플리케이션을 탐색하며 사용자가 목표를 향해 나아갈 때 취할 수 있는 다양한 경로로 브랜칭됩니다.

실행이 완료되면 탐색된 브랜치 중 하나가 목표에 도달한 경우 테스트가 **Pass** 결과를 보고합니다. 어떤 브랜치도 목표에 도달하지 못했거나 에이전트에서 오류가 발생한 경우 테스트가 **Fail** 결과를 보고합니다. 결과와 함께 목표 기반 테스트는 다음을 보여줍니다.

- Pass 또는 Fail 결과의 근거를 설명하는 요약 정보
- 에이전트의 액션에 대한 단계별 탐색(에이전트가 무엇을 시도했는지 정확히 검토 가능)

{{< img src="synthetics/goal_based_testing/goal_based_test_run_result.png" alt="탐색된 경로, 실패 사유 및 최종 스크린샷을 보여주는 실패한 목표 기반 테스트 실행" style="width:100%;" >}}

## 테스트 예약 및 편집 {#schedule-and-edit-a-test}

첫 번째 실행이 완료되면 {{< ui >}}Edit test{{< /ui >}} 아이콘을 클릭하여 다음을 수행하세요.

- 테스트가 반복해서 실행되도록 예약합니다.
- 테스트 이름을 편집합니다.
- 태그를 추가합니다.
- 선택된 Agent Profile을 변경합니다.

{{< img src="synthetics/goal_based_testing/goal_based_test_schedule.png" alt="반복 간격 옵션이 있는 목표 기반 테스트 생성 마법사의 예약 단계" style="width:80%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/bits_testing/
[2]: /ko/synthetics/bits_testing/#agent-profiles
[3]: /ko/synthetics/bits_testing/#billing
[4]: /ko/synthetics/bits_testing/#run-bits-testing