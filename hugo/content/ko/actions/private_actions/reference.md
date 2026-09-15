---
description: 프라이빗 작업 러너의 구성 설정, 지원되는 작업 및 통합, 자격 증명 파일 형식에 대한 참조 표.
further_reading:
- link: actions/private_actions/
  tag: 설명서
  text: Private Actions 개요
- link: actions/private_actions/set_up_agent_based/
  tag: 설명서
  text: 프라이빗 액션 러너 설정하기
- link: actions/private_actions/execution_policies/
  tag: 설명서
  text: Execution Policies
- link: actions/connections/private_action_credentials/
  tag: 설명서
  text: 프라이빗 작업 자격 증명 처리
title: 프라이빗 작업 러너 참조
---
## 개요 {#overview}

이 페이지는 프라이빗 작업 러너에 대한 참조 페이지로, 구성 설정, 각 러너가 지원하는 작업 및 통합, 자격 증명 파일 형식을 다룹니다. Private Actions 개념 및 설정에 대해 자세히 알아보려면 [Private Actions 개요][1]를 참조하세요.

## 러너 구성 {#runner-configuration}

러너는 [구성][2]의 `private_action_runner` 섹션에서 설정을 읽습니다.

등록 설정(`self_enroll` 및 `api_key_only_enrollment`)이 러너 등록에 어떻게 적용되는지에 대한 자세한 내용은 [등록 및 소유권][3]을 참조하세요.

동일한 설정이라도 러너 설치 방식에 따라 이름이 다릅니다. 호스트 설치는 환경 변수를 사용하고, Helm은 `privateActionRunner` 아래에 camelCase 키를 사용하며, Datadog Operator는 `private_action_runner` 아래에 snake_case 키를 사용합니다. 이 표를 사용하여 설치 방법별 공통 설정의 대응 관계를 확인하세요.

| 설정 | 호스트(환경 변수) | Helm(`privateActionRunner.*`) | Operator(`private_action_runner.*`) |
|---|---|---|---|
| 활성화 | `DD_PRIVATE_ACTION_RUNNER_ENABLED` | `enabled` | `enabled` |
| 자체 등록 | `DD_PRIVATE_ACTION_RUNNER_SELF_ENROLL` | `selfEnroll` | `self_enroll` |
| 작업 허용 목록 | `DD_PRIVATE_ACTION_RUNNER_ACTIONS_ALLOWLIST` (쉼표로 구분) | `actionsAllowlist` (목록) | `actions_allowlist` (목록) |

## 지원되는 작업 및 통합 {#supported-actions-and-integrations}

이 매트릭스는 각 통합에 대해 각 러너 유형에서의 사용 가능 여부와 [실행 정책][4]을 통해 권한을 부여할 수 있는지 여부를 보여줍니다.

<div class="alert alert-info">Agent에서의 사용 가능 여부와 실행 정책을 통한 권한 부여 여부는 서로 독립적입니다. 통합은 실행 정책을 통해 권한을 부여할 수 없는 경우에도 Agent에서 실행될 수 있습니다.</div>

| 통합 | Agent의 러너 | 실행 정책을 통해<br>권한 부여 가능 | 독립형 러너 |
|---|:---:|:---:|:---:|
| Kubernetes | {{< X >}} | {{< X >}} | {{< X >}} |
| 원격 작업(예: rshell) | {{< X >}} | {{< X >}} | {{< X >}} |
| 스크립트 | {{< X >}} | {{< X >}} | {{< X >}} |
| HTTP | {{< X >}} |  | {{< X >}} |
| GitLab | {{< X >}} |  | {{< X >}} |
| Jenkins | {{< X >}} |  | {{< X >}} |
| MongoDB | {{< X >}} |  | {{< X >}} |
| PostgreSQL |  |  | {{< X >}} |
| Temporal | {{< X >}} |  | {{< X >}} |

- **원격 작업**은 `com.datadoghq.remoteaction` 접두사 하위의 통합 제품군입니다. 여기에는 rshell 번들이 포함되며, 이 번들의 `runCommand` 작업은 제한된 셸을 통해 셸 명령을 실행합니다. [Agent 제한된 셸(rshell)][8]을 참조하세요.
- **스크립트** 작업은 러너의 `script-config.yaml`에 선언된 *사전 정의된* 스크립트로 제한됩니다. 스크립트 작업을 구성하려면(Linux의 경우 `runPredefinedScript`, Windows의 경우 `runPredefinedPowershellScript`) [프라이빗 작업 러너로 스크립트 실행][5]을 참조하세요.

{{% collapse-content title="러너 유형별 사용 가능한 작업" level="h3" %}}

{{< partial name="actions/private_actions_allowlist.html" >}}

{{% /collapse-content %}}

## 자격 증명 파일 형식 {#credential-file-formats}

HTTP, Jenkins, PostgreSQL, MongoDB, Temporal과 같은 일부 통합은 실행을 위해 자격 증명이 필요합니다. 자격 증명은 [연결][6]에서 참조하는 JSON 파일로 러너에 제공됩니다. 각 통합에는 고유한 자격 증명 파일 구조와 지원되는 인증 방법이 있습니다.

전체 자격 증명 파일 형식 및 예제는 [프라이빗 작업 자격 증명 처리][7]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/private_actions/
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[3]: /ko/actions/private_actions/enroll_runner/
[4]: /ko/actions/private_actions/execution_policies/
[5]: /ko/actions/private_actions/run_script/
[6]: /ko/actions/connections/
[7]: /ko/actions/connections/private_action_credentials/
[8]: /ko/agent/guide/rshell/