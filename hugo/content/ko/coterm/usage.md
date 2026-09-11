---
description: 터미널 세션을 기록하고, 자동 기록을 위한 심을 생성하며, 위험한 명령으로부터 보호하기 위해 CoTerm을 구성하는 방법을
  알아보세요.
further_reading:
- link: /coterm
  tag: 설명서
  text: Datadog CoTerm
- link: /coterm/install
  tag: 설명서
  text: Datadog CoTerm 설치하기
- link: /coterm/rules
  tag: 설명서
  text: CoTerm 구성 규칙
title: Datadog CoTerm 사용하기
---
## 기록된 터미널 세션 보기 {#view-recorded-terminal-sessions}
CoTerm은 모든 기록된 터미널 세션의 시작과 끝에 Datadog에서 세션을 볼 수 있는 링크를 표시합니다. [기록된 모든 터미널 세션을 볼][7] 수도 있습니다.

## CoTerm CLI 명령 구조 {#coterm-cli-command-structure}

```shell
ddcoterm [OPTIONS] [-- <COMMAND>...] [COMMAND]
```

모든 옵션과 명령을 보려면 `ddcoterm --help`를 실행하세요.

## 터미널 세션 기록 {#record-a-terminal-session}

CoTerm은 Datadog에서 재생하고 검토할 수 있는 터미널 세션을 기록합니다. 보안을 위해 민감한 데이터(비밀번호 및 API 키 등)는 [자동으로 마스킹][1]됩니다. 터미널 세션에서 실행된 모든 프로세스는 [이벤트][2]로 기록됩니다.

### 대화형 터미널 세션 시작 및 기록 {#launch-and-record-an-interactive-terminal-session}
Datadog CoTerm을 수동으로 시작하고 터미널 세션 전체를 기록하려면 다음을 수행하세요.

```shell
ddcoterm
```

세션을 종료하면 CoTerm은 기록을 중지하고 캡처된 프로세스 데이터를 Datadog으로 전송합니다.

### 명령 출력 기록하기 {#record-the-output-of-a-command}
개별 명령을 실행하고 그 출력을 기록하려면 다음을 수행하세요.

```shell
ddcoterm -- datadog-agent status
```

이 명령은 CoTerm을 시작하고 `datadog-agent status`를 실행합니다. 프로세스가 완료되면 CoTerm은 기록을 중지하고 캡처된 프로세스 데이터를 Datadog으로 전송합니다.

## 명령 자동 기록 {#automatically-record-a-command}

특정 명령의 향후 모든 호출을 자동으로 기록하도록 CoTerm을 구성하려면 심(shim)을 만드세요.

```shell
ddcoterm shim create datadog-agent
```

심을 만든 후 터미널을 다시 시작하거나 프로필을 소스하세요. (예: `source ~/.bashrc`를 실행하세요.) Bash 또는 Zsh 이외의 셸을 사용하는 경우 `path/to/.ddcoterm/overrides`를 PATH에 수동으로 추가하세요.

## 위험한 터미널 명령으로부터 보호 {#protect-against-dangerous-terminal-commands}

지정된 터미널 명령이 실수로 실행되는 것을 방지하기 위해 CoTerm이 린터(linter) 역할을 하도록 구성할 수 있습니다. 더 많은 제어가 필요한 경우 [Datadog Work Management][3]와 함께 CoTerm을 사용하여 지정된 명령에 대한 승인을 요구할 수 있습니다.

### 명령 린트 {#lint-a-command}

지정된 명령(예: `kubectl scale`)을 실행하려고 하면 CoTerm이 경고를 표시하고 확인을 요청할 수 있습니다.

1. 명령에 대한 심 생성: `ddcoterm shim create kubectl`

1. 파일에 `.ddcoterm/config.yaml`린팅 규칙을 구성합니다. CoTerm에서 린팅을 구성하는 방법에 대한 자세한 내용은 [CoTerm 구성 규칙][4]을 참조하세요.

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      lints:
        - |
          if has_arg("scale") and flags.context == nil then
            return string.format("No kubectl context specified (effective context: '%s'). It is recommended to always explicitly specify the context when running `kubectl scale`.", k8s_context)
          end
   {{< /code-block >}}

이 구성을 사용하면 CoTerm은 `--context` 플래그가 없는 모든 `kubectl scale` 명령을 인터셉트합니다.

{{< img src="coterm/linter-warning.png" alt="명령줄 인터페이스. 사용자가 'kubectl scale foo'를 실행했습니다. 출력에 'CoTerm의 경고: kubectl 컨텍스트가 지정되지 않음(유효 컨텍스트: 'minikube')'이라고 표시됩니다. kubectl scale을 실행할 때는 항상 컨텍스트를 명시적으로 지정할 것을 권장합니다. 계속하시겠습니까? (y/n)'" style="width:70%;" >}}

### 명령에 대한 승인 필요 {#require-approval-for-commands}

더 위험한 명령의 경우, CoTerm은 명령을 실행하기 전에 다른 팀 구성원의 명시적 승인을 요구할 수 있습니다(Work Management를 통해).

1. 명령에 대한 심 생성: `ddcoterm shim create kubectl`

2. `.ddcoterm/config.yaml` 파일에서 승인 요구를 구성합니다. 자세한 내용은 [CoTerm 구성 규칙][4]을 참조하세요.

   {{< code-block lang="yaml" filename=".ddcoterm/config.yaml" disable_copy="true" collapsible="true" >}}
process_config:
  commands:
    - command: "kubectl"
      rules:
        # Record and require approval for all executions of `kubectl scale` in a production context
        - rule: |
            local applicable = has_arg("scale") and k8s_context:match("prod")
            local user_message = "Proceed with caution. This command may disrupt your Kubernetes cluster setup."
            local approver_message = "Ensure that the user has documented a rollback plan before approving."
            return applicable, user_message, approver_message
          actions: ["record", "logs", "process_info", "approval"]
   {{< /code-block >}}

이 구성을 사용하면 `kubectl scale --context prod` 명령을 실행할 때 CoTerm이 [Work Management][3]에 승인 요청을 생성합니다. 승인 요청을 활성 [인시던트][5]와 연결하도록 선택하면 다른 인시던트 대응자가 승인자로 자동 추가됩니다. 이 요청이 승인되면 명령이 실행됩니다. [워크플로 자동화 규칙][8]을 구성하여 승인 요청에 따라 워크플로를 트리거할 수도 있습니다.

#### 수동으로 승인 요청 {#manually-require-approval}

승인 요청을 수동으로 생성하려면 다음을 실행하세요.

```shell
ddcoterm approve
```

#### 승인 우회{#bypass-approval}

승인을 우회하고 명령을 실행하려면 `COTERM_BREAK_GLASS` 환경 변수를 설정하세요.

예를 들면 다음과 같습니다.

```shell
COTERM_BREAK_GLASS=true kubectl delete foo
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/sensitive_data_scanner/
[2]: /ko/events/
[3]: /ko/incident_response/work_management/
[4]: /ko/coterm/rules
[5]: /ko/incident_response/incident_management/
[6]: /ko/coterm/install
[7]: https://app.datadoghq.com/terminal-streams
[8]: /ko/incident_response/work_management/automation_rules/