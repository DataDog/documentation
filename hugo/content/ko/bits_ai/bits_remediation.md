---
aliases:
- /ko/bits_ai/bits_ai_sre/remediate_issues/
- /ko/bits_ai/bits_investigation/remediate_issues/
- /ko/bits_ai/bits_ai_sre/take_action/
- /ko/bits_ai/bits_investigation/take_action/
description: Bits가 근본 원인 조사 후 실행 가능한 다음 수정 단계를 제공하는 방법을 알아보세요.
site_support_id: bits_remediation
title: Bits Remediation
---
{{< callout url="https://www.datadoghq.com/product-preview/bits-remediation/" >}}
  Bits Remediation에는 미리 보기로 제공되는 기능이 포함되어 있습니다. <strong>Request Access</strong>를 클릭하여 미리 보기 프로그램에 참여하세요.
{{< /callout >}}

## 코드 수정 자동화 {#automate-code-fixes}

Bits는 조사에서 근본 원인을 식별하도록 지원할 뿐 아니라 최대한 신속하게 조치를 취할 수 있도록 지원합니다.

Bits Investigation은 [Bits Code][2]와 통합되어 코드 수정을 생성합니다. Bits는 소스 코드 공급자에 연결하여 Datadog이 탐지한 기존 문제를 기반으로 프로덕션에 사용할 수 있는 풀 리퀘스트를 생성, 업데이트 및 반복합니다.

기본적으로 Bits는 코드 관련 근본 원인이 있는 조사에 대해 자동으로 코드 수정을 생성합니다. 대신 수동으로 코드 수정을 생성하려면 [설정][3]에서 자동 코드 수정 생성을 비활성화하세요.

코드 수정 사용을 시작하려면 다음 단계를 따르세요.
1. [Bits Code 설정][1]. Bits가 코드 관련 근본 원인을 확인하면 기본적으로 Next Steps에서 제안된 코드 수정을 생성합니다.
1. 자동 코드 수정이 비활성화된 경우, Next Steps에서 수동으로 코드 수정을 생성합니다.
1. 코드 세션 내에서 Bits와 채팅하여 제안된 코드 수정을 업데이트합니다.
1. 준비가 되면 검토 및 병합을 위한 풀 리퀘스트를 생성합니다.

코드 수정이 활성화되면 Bits Investigation에서 직접 문제를 해결하여 프로세스를 마무리할 수 있습니다.

{{< img src="bits_ai/bits_remediation/suggested_code_fix.png" alt="제안된 코드 수정 및 기타 다음 단계가 포함된 근본 원인 결론을 보여주는 Bits Investigation 가설 트리" style="width:100%;" >}}

## 트리아주 작업 실행 {#run-triage-actions}

채팅에서 조사 워크플로를 벗어나지 않고 트리아주 작업을 트리거할 수 있습니다.

지원되는 작업은 다음과 같습니다.
- Slack 및 Microsoft Teams 메시지 전송
- Datadog 및 PagerDuty에서 인시던트 생성
- Datadog On-Call을 사용하여 엔지니어 호출
- Datadog Work Management에서 작업 항목 생성
- Jira 티켓 생성

Bits는 조사 및 연결된 통합에서 관련 컨텍스트를 가져와 메시지, 인시던트 설명 및 티켓 메타데이터를 미리 채울 수 있습니다. 이는 수동 작업을 줄이고 일관성을 보장하며 응답 시간을 단축합니다.

## 인프라에서 작업 수행 {#take-action-on-your-infrastructure}

{{< callout >}} 원클릭 작업은 미리 보기로 제공되고 있습니다. {{< /callout >}}

인프라 관련 문제의 경우, Bits는 배포 확장, 포드 재시작, 리소스 패치와 같은 수정 작업을 권장할 수 있습니다.

- **수동 권장 사항**: 제안된 명령(예: `kubectl patch` 명령)을 복사하여 사용 중인 CLI에서 실행하세요.
- **원클릭 작업(미리 보기)**: **Run**을 클릭하여 Bits가 조사 컨텍스트에서 직접 제안된 수정 작업을 실행하도록 하세요.

{{< img src="bits_ai/bits_remediation/one_click_action.png" alt="배포 재시작 지침과 Run 버튼이 포함된 제안된 수정 작업" style="width:100%;" >}}

Kubernetes 작업은 미리 보기로 제공되고 있습니다. 지원되는 작업의 전체 목록과 Datadog에서 이를 활성화하는 방법은 [Action Catalog][4]를 참조하세요.

원클릭 Kubernetes 작업을 실행하려면 조직에 다음 항목이 필요합니다.
- Kubernetes 클러스터에 대한 네트워크 액세스 권한이 있는 [Private Action Runner][5]와 Kubernetes 통합의 [Connection][6] 연결
- 작업을 실행하고 Kubernetes 연결을 해결할 수 있는 권한이 있는 사용자 역할

## Bits의 수정 작업 수행 방식 제어 {#govern-how-bits-takes-remediation-action}

{{< callout >}} Bits Guardrails는 미리 보기로 제공되고 있습니다.{{< /callout >}}

[Bits Guardrails][8]를 사용하면 관리자가 Bits가 수행할 수 있는 수정 작업, 해당 작업이 적용되는 위치, 작업을 승인해야 하는 사용자를 정의할 수 있습니다.

Guardrails를 사용하려면 [Organizational Settings > Roles][7]에서 활성화할 수 있는 `Guardrails Read` 및 `Guardrails Write` 권한이 필요합니다. 

가드레일을 생성하려면 다음 단계를 따르세요.
1. **대상 작업 선택**: 가드레일의 대상으로 지정할 통합(예: Kubernetes)의 사용 가능한 작업을 하나 이상 선택합니다.
1. **가드레일 범위 정의**: 가드레일이 적용되는 환경, 서비스 및 리소스 태그를 지정합니다.
1. **강제 적용 수준 설정**: 선택한 작업 및 범위에 대해 Bits가 언제 작업을 수행할 수 있는지 결정합니다.
    - **요청**: Bits가 작업을 실행하기 전에 사용자 승인이 필요합니다. 승인할 수 있는 팀, 역할 또는 개인을 선택합니다.
    - **거부**: Bits는 작업을 권장할 수 있지만 직접 수행할 수는 없습니다.

## 문제가 해결되었는지 검증{#validate-that-issues-are-resolved}

Bits는 수정 작업이 성공적으로 적용되었는지, 그리고 원래 문제가 해결되었는지 검증할 수 있습니다. **Verify Resolution**을 클릭하여 수정 작업 및 문제의 상태를 검증하세요.

[1]: /ko/bits_ai/bits_code/setup/
[2]: /ko/bits_ai/bits_code
[3]: https://app.datadoghq.com/bits-ai/settings/source-code-integration
[4]: /ko/actions/actions_catalog/
[5]: /ko/actions/private_actions/
[6]: /ko/actions/connections/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: https://app.datadoghq.com/bits-ai/settings/remediation-guardrails