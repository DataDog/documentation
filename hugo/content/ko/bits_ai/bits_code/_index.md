---
aliases:
- /ko/bits_ai/bits_ai_dev_agent/
further_reading:
- link: https://www.datadoghq.com/blog/bits-ai-dev-agent/
  tag: 블로그
  text: Bits Code를 사용하여 문제를 자동으로 식별하고 수정 사항 생성
- link: https://www.datadoghq.com/blog/bitsai-dev-agent-code-security
  tag: 블로그
  text: Code Security용 Bits Code 소개
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
title: Bits Code
---
## 개요 {#overview}

Bits Code는 Datadog 관측 가능성 데이터를 사용하여 코드의 문제를 자동으로 진단하고 수정하는 생성형 AI 코딩 어시스턴트입니다. Bits Code는 [소스 코드 공급자](#supported-source-code-providers)와 통합되어 프로덕션에 바로 사용할 수 있는 pull 또는 병합 요청을 생성한 다음, CI 로그와 개발자 피드백을 사용하여 변경 사항을 반복적으로 개선합니다.

{{< img src="bits_ai/dev_agent/sessions_overview.png" alt="'Sessions'라는 제목의 탭에 텍스트 필드가 표시되어 있고, 그 아래에 제안 내용이 있음" style="width:100%;" >}}

Bits Code가 문제를 조사하거나 수정 사항을 생성할 때마다 [세션](#sessions)이 생성되며, 이 세션에는 에이전트의 분석, 수행된 작업 및 지원되는 Datadog 제품 전반에서 발생한 코드 변경 사항이 기록됩니다. [자동화][28]를 설정하면 새로운 APM 권장 사항 또는 비정상적 테스트(flaky test)와 같은 다른 Datadog 제품의 신호에 대응하거나 일정에 따라 Bits Code 세션을 실행할 수 있습니다.

Bits Code를 시작하려면 [소스 코드 통합을 설정][6]하고 각종 추가 구성을 완료하세요. 그런 다음 [첫 번째 세션을 시작합니다](#start-a-session).

Bits Code 사용 요금이 어떻게 청구되는지 [AI 크레딧][27]에서 확인할 수 있습니다.

## 세션 {#sessions}
세션은 Bits Code의 분석 및 코드 변경 사항을 포함한 작업 세그먼트를 캡처합니다. {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7]에서 세션을 시작하고 확인하고 관리할 수 있습니다.

{{< img src="bits_ai/dev_agent/code_fix.png" alt="왼쪽에 Bits AI 요약 및 작업 목록, 오른쪽에 코드 차이점이 표시된 세션" style="width:100%;" >}}

### 세션 시작 {#start-a-session}
[설정을 완료][6]하고 나서, 다음 방법 중 하나로 Bits Code 세션을 시작합니다.
-  [{{< ui >}}Sessions{{< /ui >}}][7]에 자유 형식 프롬프트 입력: 사용자 지정 프롬프트를 입력하거나 제안된 프롬프트 카드를 클릭하여 프롬프트 생성
- [지원되는 Datadog 제품](#supported-datadog-products)에서 Bits Code 호출
- Bits Code [자동화][28] 설정

[Bits Chat][16] 또는 [Bits Investigation][17]과 같은 다른 Bits AI 에이전트가 코딩 작업을 Bits Code에 넘길 때에도 세션이 생성될 수 있습니다.

### 세션 표시 여부 {#session-visibility}

Bits Code 세션은 기본적으로 Datadog 조직 전체에 공유됩니다. 조직의 모든 사용자는 세션을 열어 분석, 작업 및 코드 변경 사항을 검토하거나 해당 세션에서 Bits Code를 계속 사용할 수 있습니다. 따라서 컨텍스트를 공유하기 쉽고, 팀 동료의 진행 중인 작업을 이어받기도 간편합니다.

### 세션 조회 및 관리 {#view-and-manage-sessions}
[{{< ui >}}Sessions{{< /ui >}}][7]의 {{< ui >}}My Sessions{{< /ui >}} 패널에는 사용자가 참여한 세션이 표시됩니다. 세션을 직접 시작했거나 대화에 참여하거나 연결된 PR 또는 MR을 생성하는 등 어떤 방식으로든 해당 세션과 상호 작용한 경우 해당 세션이 여기에 표시됩니다. {{< ui >}}My Sessions{{< /ui >}}는 개인화된 보기일 뿐 개인정보 보호 경계가 아니므로 조직의 다른 멤버도 이러한 세션에 액세스할 수 있습니다.

세션을 클릭하여 세부 정보를 조회하고 Bits Code 작업을 계속할 수 있습니다. {{< ui >}}My Sessions{{< /ui >}} 목록에서 세션을 제거하려면 다음 중 하나를 클릭하세요.
- <i class="icon-eye-slashed-wui"></i>({{< ui >}}Unwatch session{{< /ui >}}): 사용자 자신의 {{< ui >}}My Sessions{{< /ui >}} 목록에서만 세션을 제거합니다. 다른 사용자에게는 아무런 영향이 없습니다.
- <i class="icon-archive-wui"></i>({{< ui >}}Archive for everyone{{< /ui >}}): 조직의 모든 사용자가 볼 수 없도록 세션을 보관합니다.

## 지원되는 소스 코드 공급자 {#supported-source-code-providers}
Bits Code는 다음 소스 코드 공급자를 지원합니다.
- **GitHub**: GitHub.com, [GitHub Enterprise Cloud][30], [데이터 레지던시가 적용된 GitHub Enterprise Cloud][31] 및 [GitHub Enterprise Server][38]를 지원합니다.
- **GitLab**: GitLab.com 및 GitLab Self-Managed.
- **Azure DevOps Cloud**: [dev.azure.com 및 *.visualstudio.com][39].

다음 플랜은 지원되지 않습니다.
- **Azure DevOps Server**: 온프레미스 인스턴스는 Bits Code 또는 Datadog [Source Code Integration][37]에서 지원되지 않습니다.
- **Bitbucket**: Bitbucket.org, Bitbucket Data Center 및 Bitbucket Data Server(온프레미스)는 모두 Bits Code에서 지원되지 않습니다. Datadog [소스 코드 통합][37]은 온프레미스 Bitbucket 배포를 지원하지 않습니다.

## 지원되는 Datadog 제품 {#supported-datadog-products}

Bits Code는 다음을 포함한 여러 Datadog 제품 내에서 코드 개선 사항을 제안할 수 있습니다.

| 제품                   | 기능                                                       |
|---------------------------|--------------------------------------------------------------------|
| [APM][20]                 | 관련 [APM 권장 사항][21]에 대한 코드 변경 제안|
| [Bits Investigation][17]         | Bits Investigation 결과를 기반으로 코드 수정안 생성 |
| [Bits Chat][16]   | Bits Chat 대화에서 파생된 코드 변경 사항 제안 |
| [Cloud Cost][22]          | [Cloud Cost Recommendation][23]에 대한 코드 변경 생성 |
| [Cloud Security][34]      | 영향을 받는 리소스를 정의하는 IaC에서 [구성 오류 발견 사항][35]을 수정합니다. |
| [Error Tracking][1]       | 문제를 진단하고 필요 시 또는 자동으로 코드 수정 사항 생성 |
| [Code Security][2]        | [SAST 취약성][15], [IaC 취약성][25] 및 [SCA 취약성][26] 수정(개별적으로 또는 일괄로) |
| [Test Optimization][4]    | [비정적 테스트][24]에 대한 코드 수정 제공 및 테스트 안정성 검증  |
| [Continuous Profiler][3]  | [자동 분석][10] 인사이트에 대한 코드 변경 제공   |
| [Containers][12]          | [Kubernetes 수정][13]에 대한 코드 변경 제공  |
| [Sensitive Data Scanner][36] | 민감한 데이터 유출을 유발하는 로그에 대한 코드 수정 사항 생성 |

## 주요 기능 {#key-capabilities}

### Datadog 제품에서 제공되는 코드 수정 및 최적화 {#code-fixes-and-optimizations-surfaced-by-datadog-products}

[지원되는 Datadog 제품](#supported-datadog-products) 전반에서 Bits Code를 사용하여 최적화 및 수정 작업을 구현할 수 있습니다. 예를 들어 [Cloud Cost Recommendation][23], [Error Tracking][1] 이슈 및 [SAST 취약성][15]에 대한 수정이 가능합니다. 일부 제품에서는 [Bits Chat][16]이 문제를 탐색하고 조사한 후, 발견 사항을 Bits Code에 전달하여 코드 변경을 구현하도록 합니다.

{{< img src="bits_ai/dev_agent/fix_with_bits.png" alt="'Fix with Bits'라는 텍스트가 표시된 버튼" style="width:25%" >}}

특정 발견 사항에 대해 Bits Code가 변경을 수행하도록 직접 프롬프트를 입력할 수도 있고, [자동화][28]를 구성하여 자율적으로 수행하도록 할 수도 있습니다. 

### 일반 코딩 작업 {#general-coding-tasks}

[{{< ui >}}Sessions{{< /ui >}}][7]의 자유 형식 프롬프트 필드를 사용하여 일반적인 코딩 작업을 Bits Code와 함께 수행할 수 있습니다.

### 자동화 {#automations}

[자동화][28]는 Error Tracking, APM 또는 Code Security와 같은 Datadog 제품의 신호에 반응하거나 일정에 따라 Bits Code 세션을 자동으로 실행합니다. 세션이 완료되면 Bits Code는 결과를 pull 또는 병합 요청(옵션으로 초안 모드도 사용 가능)이나 Slack 알림으로 전달합니다.

제품 발견 사항, 사용자 지정 프롬프트, 일정 또는 이들의 조합을 트리거로 사용하여 자동화를 구축할 수 있으며, 하나 이상의 출력도 구성할 수 있습니다. 시작하는 데 도움이 되도록 Datadog에서 제공하는 템플릿을 사용할 수도 있습니다. {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Automations{{< /ui >}}][29]에서 자동화를 생성하고 관리할 수 있습니다.

### 사용자 지정 에이전트 스킬 및 지침 {#custom-agent-skills-and-instructions}

Bits Code는 리포지토리에 정의된 사용자 지정 스킬을 사용할 수 있습니다. Bits Code는 `.claude/skills/`, `.codex/skills/` 및 `.gemini/skills/` 디렉터리에서 `<skill-name>/SKILL.md` 형식의 스킬을 검색합니다. 스킬에는 YAML `name` 및 `description` frontmatter 키가 포함되어야 합니다.

Bits Code는 `name` 및 `description` 값을 기준으로 적절한 스킬을 자동으로 호출하며, [사용자 지정 지침 파일][33]에서 스킬을 언급하여 사용을 유도할 수도 있습니다. 또한 Bits Code에 특정 스킬을 직접 사용하도록 요청할 수 있습니다.

Bits Code는 리포지토리 및 Bits Code 설정에 정의된 [사용자 지정 지침도 수집][33]합니다.

### pull 또는 병합 요청 협업 {#pull-or-merge-request-collaboration}

Bits Code는 [소스 코드 공급자](#supported-source-code-providers)와 통합하여 다음 작업을 수행합니다.
- 리포지토리의 pull 또는 병합 요청 템플릿을 기반으로 제목과 설명을 생성하여 pull 또는 병합 요청 만들기
- 댓글에 응답하여 pull 요청을 반복적으로 수정(GitHub만 해당), 댓글에서 `@Datadog`을 언급하여 Bits에 업데이트 요청
- CI 로그와 pull 또는 병합 요청 상태를 모니터링하여 실패 및 병합 차단 문제 수정

Bits Code는 PR 또는 MR을 자동으로 병합하지 않습니다. Bits Code가 작업 중인 모든 PR 또는 MR을 {{< ui >}}Bits AI{{< /ui >}} > {{< ui >}}Bits Code{{< /ui >}} > [{{< ui >}}Sessions{{< /ui >}}][7]에서 확인할 수 있습니다.

## 제한 사항 {#limitations}

- Bits Code는 AI 제품이므로 실수할 수 있습니다. 에이전트가 생성한 코드를 검토하고 테스트할 때는 모범 사례를 따르세요.  
- Bits Code는 다중 리포지토리 조사를 지원하지 않습니다.
- GitLab을 사용할 때 댓글에서 `@Datadog`을 멘션하여 Bits에 업데이트를 요청하는 기능은 지원되지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/error_tracking
[2]: /ko/security/code_security
[3]: /ko/profiler/
[4]: /ko/tests/
[5]: https://app.datadoghq.com/integrations/github
[6]: /ko/bits_ai/bits_code/setup/
[7]: https://app.datadoghq.com/code
[8]: /ko/bits_ai/bits_investigation/
[10]: /ko/profiler/automated_analysis/
[12]: /ko/containers/
[13]: /ko/containers/bits_ai_kubernetes_remediation
[15]: /ko/security/code_security/static_analysis/ai_enhanced_sast/#remediation
[16]: /ko/bits_ai/bits_chat/
[17]: /ko/bits_ai/bits_investigation/
[20]: /ko/tracing/
[21]: /ko/tracing/recommendations/
[22]: /ko/cloud_cost_management/
[23]: /ko/cloud_cost_management/recommendations
[24]: /ko/tests/flaky_management#bits-ai-powered-flaky-test-fixes
[25]: /ko/security/code_security/iac_security/
[26]: /ko/security/code_security/software_composition_analysis/
[27]: /ko/account_management/billing/ai_credits/
[28]: /ko/bits_ai/bits_code/automations/
[29]: https://app.datadoghq.com/code/automations
[34]: /ko/security/cloud_security_management/
[35]: /ko/security/cloud_security_management/review_remediate/remediate_with_ai/
[36]: /ko/security/sensitive_data_scanner/
[30]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud
[31]: https://docs.github.com/en/enterprise-cloud@latest/admin/overview/about-github-enterprise-cloud#about-data-residency
[32]: https://docs.gitlab.com/subscriptions/gitlab_dedicated/
[33]: /ko/bits_ai/bits_code/setup/#configure-custom-instructions
[37]: /ko/source_code/source-code-management#source-code-management-providers
[38]: https://docs.github.com/en/enterprise-server@3.17/admin/overview/about-github-enterprise-server
[39]: https://learn.microsoft.com/en-us/azure/devops/?view=azure-devops