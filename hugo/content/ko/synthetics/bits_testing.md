---
description: 애플리케이션을 탐색하여 중요한 사용자 여정을 매핑하고 포괄적인 Synthetic 테스트를 생성하는 AI Agent인 Bits
  Testing을 사용해 보세요.
further_reading:
- link: /synthetics/goal_based_testing/
  tag: 문서
  text: 목표 기반 테스트
- link: /synthetics/browser_tests/
  tag: 문서
  text: 브라우저 테스트
- link: /synthetics/api_tests/http_tests
  tag: 문서
  text: HTTP 테스트
- link: /synthetics/network_path_tests/
  tag: 문서
  text: Network Path 테스트
- link: /synthetics/test_suites/
  tag: 문서
  text: 테스트 모음
- link: /synthetics/platform/settings/#global-variables
  tag: 문서
  text: 전역 변수
- link: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
  tag: 가격
  text: Synthetic Monitoring 가격
private: true
title: Bits Testing
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-testing/" >}}
Bits Testing은 현재 미리 보기로 제공되고 있습니다. 대기자 명단에 등록하려면 액세스 권한을 요청하세요.
{{< /callout >}}

## 개요 {#overview}

Bits Testing은 애플리케이션을 탐색하여 가장 중요한 사용자 여정을 매핑하는 AI Agent입니다. 테스트 적용 범위를 늘리는 방법이 권장되며, 적용 범위 격차를 해소하는 데 필요한 Synthetic 테스트를 생성할 수 있습니다.

Bits Testing은 [목표 기반 테스트][1]도 생성할 수 있습니다. 이 Synthetic 테스트 유형은 프롬프트 기반의 비결정적 에이전트형 테스트를 사용하여 사용자가 애플리케이션에서 특정 목표를 완료할 수 있는지 확인합니다.

## 전제 조건 {#prerequisites}

애플리케이션이 봇 보호 또는 Web Application Firewall(WAF) 뒤에 있는 경우 사용 중인 공급자와 함께 [Datadog IP 범위][2]의 `synthetics` 아래에 나열된 IP를 허용하세요. Bits Testing을 단일 위치에서 실행하려면 대신 해당 위치의 IP 범위만 허용할 수도 있습니다. Bits Testing을 실행할 수 있는 위치는 [Bits Testing 실행](#run-bits-testing)을 참조하세요.

## Bits Testing에 액세스{#access-bits-testing}

다음 중 한 가지 방법을 사용하여 Synthetic Monitoring & Testing에서 Bits Testing을 여세요.

Synthetic Monitoring & Testing 상단 탐색 메뉴의 - **Bits Testing**.
- `Cmd+K` (macOS) 또는 `Ctrl+K`(Windows) 키를 누른 다음 Bits Testing을 검색합니다.
**Digital Experience > Synthetic Monitoring & Testing** 아래의 측면 탐색 메뉴에 있는 - **Bits Testing**

## Bits Testing 실행 {#run-bits-testing}

1. Bits Testing 페이지에서 원하는 적용 범위를 일반 언어로 설명합니다. 예를 들어, Bits Testing에 전반적인 적용 범위 확대를 요청하거나 특정 기능에 집중하도록 요청할 수 있습니다.
1. 탐색을 실행할 위치를 선택합니다.
   - 프랑크푸르트(GCP: `gcp:europe-west3`)
   - 버지니아 북부(AWS: `aws:us-east-1`)
   - 오하이오(AWS: `aws:us-east-2`)
   - 버지니아(Azure: `azure:eastus`)
1. 필요시 [Agent 프로필](#agent-profiles-optional)을 선택합니다.
1. {{< ui >}}Start Discovery{{< /ui >}}를 클릭하거나 프로필을 선택하지 않은 경우 {{< ui >}}Start Discovery Without a Profile{{< /ui >}}을 클릭합니다.

{{< img src="synthetics/bits_testing/start_discovery.png" alt="시작 URL, 위치 및 Agent 프로필 선택기가 있는 Bits Testing 실행 구성 패널" style="width:80%;" >}}

### 검색 진행 중 {#discovery-in-progress}

Bits Testing은 사용자가 제공한 URL에서 시작하여 애플리케이션을 탐색합니다. 새 페이지를 만날 때마다 시도할 작업 세트를 결정하며, 애플리케이션을 탐색하면서 이 과정을 반복합니다. {{< ui >}}View Discovery Run{{< /ui >}}을 클릭하여 진행 중인 실행을 검토하세요.

{{< img src="synthetics/bits_testing/bits_testing_in_progress.png" alt="진행 중인 Bits Testing 실행, 시작 URL에서 애플리케이션 탐색" style="width:100%;" >}}

## Agent 프로필(필요시) {#agent-profiles-optional}

Agent 프로필은 로그인 자격 증명과 같이 Bits Testing이 애플리케이션과 상호 작용하는 동안 사용하는 컨텍스트를 저장합니다.

Agent 프로필을 생성하려면 다음 단계를 따르세요.

1.  {{< ui >}}Agent Profile{{< /ui >}} 드롭다운 메뉴를 열고 {{< ui >}}\+ New Profile{{< /ui >}}을 선택합니다.
1. 프로필 이름을 지정합니다.
1. 하나 이상의 변수를 추가합니다. 각 변수에 대해 다음 항목을 설정합니다.
   - **사용**: 변수의 용도(예: `username` 또는 `password`).
   - **값**: 입력된 값 또는 기존 [전역 변수][3]입니다.
1. {{< ui >}}Create Profile{{< /ui >}}을 클릭합니다.

현재 실행을 위해 새 프로필이 자동으로 선택됩니다. 저장된 Agent 프로필은 변수를 재정의하지 않아도 이후 Bits Testing 실행에서 재사용할 수 있습니다.

{{< img src="synthetics/bits_testing/bits_testing_agent_profile_modal.png" alt="이름, 변수 사용 및 값에 대한 필드가 있는 Agent 프로필 생성을 위한 새 프로필 모달" style="width:100%;" >}}

## 결과 검토 {#review-results}

실행이 완료되면 Bits Testing은 탐색한 분기의 그래프를 표시합니다.

- **성공(녹색)** 분기는 Bits Testing이 테스트를 생성할 수 있는 관련 사용자 여정으로 이어졌습니다.
- **실패(남색)** 분기는 관련 여정을 생성하지 못했습니다. 이는 Bits Testing이 흐름을 관련이 없거나 일관성이 없다고 판단했거나 오류가 발생했기 때문입니다.

실행이 성공적으로 완료되지 않으면 그래프에 실행을 중단시킨 오류가 표시됩니다.

{{< img src="synthetics/bits_testing/bits_testing_results_graph.png" alt="탐색된 분기와 발견된 여정을 보여주는 완료된 Bits Testing 탐색 그래프" style="width:100%;" >}}

## 생성된 테스트 모음 {#generated-test-suites}

녹색 여정 카드를 클릭하여 해당 여정에 대한 AI 생성 테스트 모음을 엽니다. 테스트 모음에는 다음 테스트가 포함될 수 있습니다.

- **[브라우저 테스트][6]**: 사용자가 여정을 완료하기 위해 수행하는 상호 작용을 어설션과 함께 재생합니다.
- **[HTTP 테스트][7]**: 여정에서 데이터를 검색하기 위해 호출하는 엔드포인트를 검증합니다.
- **[Network Path 테스트][8]**: 여정을 구동하는 호스트에 연결할 수 있는지 확인합니다.
- **[목표 기반 테스트][1]**: 비결정적 에이전트형 테스트를 사용하여 여정을 검증합니다.

테스트 모음의 각 테스트에는 무료 샘플 테스트 실행이 포함되어 있습니다. 테스트 모음을 검토하고 다음 중 하나를 수행하세요.

- 테스트 모음이 관련이 없는 경우 {{< ui >}}Ignore{{< /ui >}}를 클릭하고 필요시 이유에 대한 피드백을 공유하세요.
- {{< ui >}}Start Testing{{< /ui >}}을 클릭하여 테스트 모음의 테스트를 계정에 추가하세요.

테스트 모음을 시작하면 각 테스트는 편집하거나 삭제할 수 있는 일반 Synthetic 테스트가 됩니다. 기본적으로 생성된 테스트는 Bits Testing 실행을 위해 선택한 위치에서 5분마다 실행됩니다.

{{< img src="synthetics/bits_testing/bits_testing_generated_suite.png" alt="브라우저, HTTP, Network Path 및 목표 기반 테스트가 포함된 생성된 테스트 모음으로, 통과한 실행의 세부 정보를 보여줍니다." style="width:100%;" >}}

## 과금 {#billing}

미리 보기 기간 중 Bits Testing 및 목표 기반 테스트 실행은 무료입니다. Bits Testing 실행에서 활성화한 테스트는 테스트 실행을 기반으로 일반 Synthetic 테스트로 청구됩니다. [Synthetic Monitoring 가격][4]을 참조하세요.

## 지원되는 위치 {#supported-locations}

Bits Testing 및 목표 기반 테스트는 [Bits Testing 실행](#run-bits-testing)에 있는 위치에서만 실행됩니다. Bits Testing에서 생성된 브라우저, HTTP 및 Network Path 테스트에는 이러한 제한이 없습니다. 생성된 후에는 [프라이빗 위치][5]를 포함하여 다른 Synthetic 테스트와 동일한 위치를 지원합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/synthetics/goal_based_testing/
[2]: /ko/api/latest/ip-ranges/list-ip-ranges/
[3]: /ko/synthetics/platform/settings/#global-variables
[4]: https://www.datadoghq.com/pricing/?product=synthetic-monitoring#products
[5]: /ko/synthetics/platform/private_locations/
[6]: /ko/synthetics/browser_tests/
[7]: /ko/synthetics/api_tests/http_tests
[8]: /ko/synthetics/network_path_tests/