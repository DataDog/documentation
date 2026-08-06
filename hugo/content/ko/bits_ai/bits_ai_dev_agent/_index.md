---
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: 블로그
  text: Bits Code를 사용하여 이슈를 자동으로 식별하고 수정 사항 생성
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: 블로그
  text: Code Security용 Bits Code 소개
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
title: Bits Code
---
## 개요 {#overview}

Bits Code는 Datadog 관측 가능성 데이터를 사용하여 코드의 이슈를 자동으로 진단하고 수정하는 생성형 AI 코딩 도우미입니다. GitHub와 통합되어 프로덕션 준비가 완료된 Pull Request를 생성한 후, CI 로그와 개발자 피드백을 사용하여 변경 사항을 반복적으로 개선합니다.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="'Sessions'라는 제목의 탭에 제안 사항이 표시된 텍스트 필드가 표시됨" style="width:100%;" >}}

Bits Code가 이슈를 조사하거나 수정 사항을 생성할 때마다 [세션](#sessions)이 생성되며, 이 세션에는 에이전트의 분석, 수행된 작업 및 지원되는 Datadog 제품 전반에서 발생한 코드 변경 사항이 기록됩니다. [자동화][28]를 설정하면 새로운 APM 권장 사항 또는 불안정한 테스트와 같은 다른 Datadog 제품의 신호에 대응하거나 일정에 따라 Bits Code 세션을 실행할 수 있습니다.

Bits Code를 시작하려면 [GitHub 통합을 설정][6]하고 필요한 추가 구성을 완료합니다. 그런 다음 [첫 번째 세션을 시작합니다](#start-a-session).

Bits Code 사용 요금이 어떻게 청구되는지 [AI 크레딧][27]에서 확인할 수 있습니다.

## 세션 {#sessions}
세션은 Bits Code의 분석 및 코드 변경 사항을 포함한 작업 단위를 기록합니다. **Bits AI** > **Bits Code** > [**세션**][7]에서 세션을 시작, 조회 및 관리할 수 있습니다.

{{< img src="bits_ai/dev_agent/code_fix.png" alt="왼쪽에 Bits AI 요약 및 작업 목록이, 오른쪽에 코드 diff가 표시된 세션 화면" style="width:100%;" >}}

### 세션 시작 {#start-a-session}
[설정 완료][6] 후 다음 방법 중 하나로 Bits Code 세션을 시작합니다.
- [**세션**][7]에서 자유 형식 프롬프트 입력: 사용자 지정 프롬프트를 입력하거나 추천 프롬프트 카드를 클릭하여 생성
- [지원되는 Datadog 제품](#supported-datadog-products)에서 Bits Code 호출
- Bits Code [자동화][28] 설정

또한 [Bits Chat][16] 또는 [Bits Investigation][17]과 같은 다른 Bits AI 에이전트가 코딩 작업을 Bits Code에 넘길 때 세션이 생성될 수 있습니다.

### 세션 조회 및 관리 {#view-and-manage-sessions}
**[세션][7]**에서 **My Sessions** 패널을 통해 이전 세션을 조회할 수 있습니다. 세션을 시작했거나 대화에 참여하거나 관련 PR을 생성하는 등 어떤 방식으로든 상호 작용한 경우 해당 세션이 여기에 표시됩니다.

세션을 클릭하여 세부 정보를 확인하고 Bits Code 작업을 계속할 수 있습니다. **My Sessions** 목록에서 세션을 제거하려면 <i class="icon-archive-wui"></i>(**모든 사용자에 대해 보관**) 또는 <i class="icon-eye-slashed-wui"></i>(**세션 감시 중지**)를 클릭합니다.

## 지원되는 Datadog 제품 {#supported-datadog-products}

Bits Code는 다음을 포함한 여러 Datadog 제품 내에서 코드 개선 사항을 제안할 수 있습니다.

| 제품                   | 기능                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | 관련 [APM 권장 사항][21]에 대한 코드 변경 제안|
| [Bits Investigation][17]         | Bits Investigation 결과를 기반으로 코드 수정안 생성 |
| [Bits Chat][16]   | Bits Chat 대화에서 파생된 코드 변경 사항 제안 |
| [Cloud Cost][22]          | [Cloud Cost Recommendation][23]에 대한 코드 변경 생성 |
| [Error Tracking][1]       | 이슈를 진단하고 필요 시 또는 자동으로 코드 수정 생성 |
| [Code Security][2]        | [SAST 취약점][15], [IaC 취약점][25] 및 [SCA 취약점][26] 수정(개별 또는 일괄 처리) |
| [Test Optimization][4]    | [불안정한 테스트][24]에 대한 코드 수정 제공 및 테스트 안정성 검증  |
| [Continuous Profiler][3]  | [자동 분석][10] 인사이트에 대한 코드 변경 제공   |
| [Containers][12]          | [Kubernetes 수정][13]에 대한 코드 변경 제공  |

## 주요 기능 {#key-capabilities}

### Datadog 제품에서 제공되는 코드 수정 및 최적화 {#code-fixes-and-optimizations-surfaced-by-datadog-products}

[지원되는 Datadog 제품](#supported-datadog-products) 전반에서 Bits Code를 사용하여 최적화 및 수정 작업을 구현할 수 있습니다. 예를 들어 [Cloud Cost Recommendation][23], [Error Tracking][1] 이슈 및 [SAST 취약점][15]에 대한 수정이 가능합니다. 일부 제품에서는 [Bits Chat][16]이 이슈를 탐색하고 조사한 후, 발견 사항을 Bits Code에 전달하여 코드 변경을 구현하도록 합니다.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="'Fix with Bits'라는 텍스트가 표시된 버튼" style="width:25%" >}}

특정 발견 사항에 대해 Bits Code가 변경을 수행하도록 직접 프롬프트를 입력할 수도 있고, [자동화][28]를 구성하여 자율적으로 수행하도록 할 수도 있습니다. 

### 일반 코딩 작업 {#general-coding-tasks}

[**세션**][7]의 자유 형식 프롬프트 필드를 사용하여 일반적인 코딩 작업을 위해 Bits Code와 협업할 수 있습니다.

### 자동화 {#automations}

[자동화][28]는 Error Tracking, APM 또는 Code Security와 같은 Datadog 제품의 신호에 반응하거나 일정에 따라 Bits Code 세션을 자동으로 실행합니다. 세션이 완료되면 Bits Code는 Pull Request, 초안 PR 또는 Slack 알림 형태로 결과를 전달합니다.

제품 발견 사항, 사용자 지정 프롬프트, 일정 또는 이들의 조합을 트리거로 사용하여 자동화를 구축할 수 있으며, 하나 이상의 출력도 구성할 수 있습니다. 시작하는 데 도움이 되도록 Datadog에서 제공하는 템플릿을 사용할 수도 있습니다. **Bits AI** > **Bits Code** > [**자동화**][29]에서 자동화를 생성하고 관리합니다.

### Pull Request 협업 {#pull-request-collaboration}

Bits Code는 GitHub와 통합되어 다음 기능을 제공합니다.
- 리포지토리의 Pull Request 템플릿을 기반으로 제목 및 설명을 생성하여 Pull Request 생성
- 댓글에 응답하여 Pull Request 반복 개선. 댓글에서 `@Datadog`을 멘션하면 Bits가 업데이트를 수행
- CI 로그 모니터링 및 실패 수정

Bits Code는 PR을 자동 병합하지 않습니다. Bits Code가 작업 중인 모든 PR은 **Bits AI** > **Bits Code** > **[세션][7]**에서 확인할 수 있습니다.

## 제한 사항 {#limitations}

- Bits Code는 AI 제품이므로 실수할 수 있습니다. 에이전트가 생성한 코드를 검토하고 테스트할 때는 모범 사례를 따르세요.  
- Bits Code는 다중 리포지토리 조사를 지원하지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/error_tracking
[2]: /ko/security/code_security
[3]: /ko/profiler/
[4]: /ko/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /ko/bits_ai/bits_ai_dev_agent/setup/
[7]: https://app.datadoghq.com/code
[8]: /ko/bits_ai/bits_ai_sre/
[10]: /ko/profiler/automated_analysis/
[12]: /ko/containers/
[13]: /ko/containers/bits_ai_kubernetes_remediation
[14]: https://app.datadoghq.com/code/settings
[15]: /ko/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /ko/bits_ai/bits_chat/
[17]: /ko/bits_ai/bits_ai_sre/
[20]: /ko/tracing/
[21]: /ko/tracing/recommendations/
[22]: /ko/cloud_cost_management/
[23]: /ko/cloud_cost_management/recommendations
[24]: /ko/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /ko/security/code_security/iac_security/
[26]: /ko/security/code_security/software_composition_analysis/
[27]: /ko/account_management/billing/ai_credits/
[28]: /ko/bits_ai/bits_ai_dev_agent/automations/
[29]: https://app.datadoghq.com/code/automations