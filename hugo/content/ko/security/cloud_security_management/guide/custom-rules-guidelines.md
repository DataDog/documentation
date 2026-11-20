---
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: 문서
  text: Workload Protection 규칙 관리
- link: /security/workload_protection/detect_and_monitor/agent_rules/secl_guide
  tag: 문서
  text: SecL 가이드
title: 사용자 지정 Workload Protection 규칙 작성 지침
---
필요에 따라 [사용자 지정 Workload Protection Agent 규칙][1]을 직접 작성할 수 있습니다. 사용자 지정 규칙을 작성할 때 다음 전략을 활용하여 효율성을 높일 수 있습니다.

## 속성 {#attributes}

효율성을 극대화하기 위해 해당 정책을 커널 내에서 평가하려면 프로세스 또는 파일 활동 규칙에 항상 다음 속성 중 하나를 사용합니다.

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**참고**: `[event_type]`에 지정할 수 있는 값으로는 `open`과 `exec` 등이 있습니다.

## Wildcard {#wildcards}

와일드카드(`*`)는 주의해서 사용합니다. 예를 들어, `open.file.path =~ "*/myfile"`은 사용하지 마세요. 디렉터리 경로 앞에 와일드카드를 사용해야 한다면 `open.file.path =~ "*/mydir/myfile")`과 같이 최소 두 단계의 경로를 지정해야 합니다. 

**참고**: 와일드카드 사용 시에는 [연산자][2]에 물결표(`~`)를 추가해야 합니다.

## 승인자 및 폐기자 {#approvers-and-discarders}

Workload Protection은 승인자 및 폐기자를 사용하여 정책의 어떤 규칙도 트리거하지 않아야 하는 이벤트를 필터링합니다. 승인자 및 폐기자는 정책 수준에서만 이벤트를 허용하거나 거부합니다. 개별 규칙에는 적용되지 않습니다.

승인자는 Datadog Agent의 커널 수준에서 허용 목록 역할을 합니다. 예를 들어 특정 파일을 여는 동작이 `open` 이벤트의 승인자가 될 수 있으며, 승인자가 없는 파일에서 발생하는 `open` 이벤트는 필터링됩니다. 마찬가지로, 폐기자는 Agent에서 거부 목록 역할을 합니다. 폐기자는 규칙과 일치할 수 없는 이벤트를 의도적으로 필터링합니다. Agent는 런타임에 폐기자를 통해 필터링할 이벤트를 학습합니다.

승인자와 폐기자는 전체 정책을 기준으로 생성됩니다. 따라서 특정 이벤트(예: `open` 또는 `exec`)에 대해 단 하나의 규칙이라도 승인자를 사용하지 않으면 정책 전체에서 해당 이벤트에 승인자를 사용할 수 없게 되어 이를 사용하는 모든 규칙의 효율성이 저하됩니다.

예를 들어 한 규칙을 제외한 모든 규칙(`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` 등)에서는 명시적인 파일 이름을 사용하여 `open` 이벤트를 평가하고, 나머지 한 규칙(`open.file.path == "/etc/*"`)에서 와일드카드를 사용하면 `open` 이벤트에 대한 승인자는 생성되지 않지만 런타임에 폐기자가 생성될 수 있습니다.

승인자는 일반적으로 더 강력하며 선호됩니다. 승인자를 사용하면 Agent가 필터링할 대상을 동적으로 학습하는 대신 필요한 이벤트만 처리할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management/#create-a-custom-agent-rule
[2]: /ko/security/workload_protection/detect_and_monitor/agent_rules/secl_guide/#operators