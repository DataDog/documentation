---
further_reading:
- link: /security/threats/workload_security_rules
  tag: 설명서
  text: CSM 위협 규칙 관리
- link: /security/threats/agent_expressions
  tag: 설명서
  text: 에이전트 정규식 구문
title: 커스텀 CSM 위협 규칙 작성 지침
---

어느 순간 [커스텀 클라우드 보안 관리 위협(CSM 위협) 에이전트 규칙][1]을 직접 작성하고 싶을 수도 있습니다. 자체 규칙을 작성할 시 효율성을 극대화하기 위해 활용할 수 있는 몇 가지 전략을 알아봅니다.

## 속성

효율성을 극대화하기 위해 해당 정책을 커널 내에서 평가하려면 프로세스 또는 파일 활동 규칙에 항상 다음 속성 중 하나를 사용합니다.

- `Agent Version >= 7.27`
- `process.file.name`
- `process.file.path`
- `[event_type].file.name`
- `[event_type].file.path`

**참고**: `[event_type]`의 가능한 값으로는 `open` 또는 `exec`이 있습니다.

## 와일드카드

와일드카드(`*`)는 주의해서 사용합니다. 예를 들어, `open.file.path =~ "*/myfile"`은 절대로 사용하지 않습니다. 디렉토리 앞에 와일드카드를 접두어로 붙여야 하는 경우 최소 다음 두 수준이 필요합니다: `open.file.path =~ "*/mydir/myfile")`.

**참고**: 와일드카드 사용 시에는 [연산자][2]에 물결표(`~`)를 추가해야 합니다.

## 승인자 및 폐기자(discarder)

CSM 위협은 승인자 및 폐기자(discarder)의 개념을 활용하여 정책에서 규칙을 트리거해서는 안 되는 이벤트를 필터링합니다. 승인자 및 폐기자는 정책 수준에서만 이벤트를 허용 또는 거부합니다. 개별 규칙에 관해서는 동작하지 않습니다.

승인자는 Datadog 에이전트의 커널 수준에서 허용 목록 역할을 합니다. 예를 들어, 특정 파일을 열면 이벤트 `open`에서 승인자가 될 수 있지만 승인자가 없는 파일의 `open` 이벤트는 필터링됩니다. 마찬가지로, 폐기자는 에이전트에서 거부 목록 역할을 합니다. 폐기자는 규칙과 일치하지 않는 이벤트를 의도적으로 필터링합니다. 런타임 중 에이전트는 폐기자로 어떤 이벤트를 필터링할지 학습합니다.

승인자와 폐기자는 전체 정책을 기준으로 생성됩니다. 따라서 단일 규칙에서 특정 이벤트(예: `open` 또는 `exec`)에 대한 승인자를 사용하지 않는 경우, 승인자는 전체 정책에 대해 해당 이벤트를 사용할 수 없으므로 해당 이벤트를 사용하는 모든 규칙의 효율성이 떨어지게 됩니다.

예를 들어, 명시적 파일 이름을 사용하여 하나를 제외한 모든 규칙(`open.file.path == "/etc/shadow"`, `open.file.path == "/etc/secret"` 등)에 관해 `open` 이벤트를 평가하고, 하나의 이벤트(`open.file.path == "/etc/*"`)에 와일드카드를 사용한 경우 `open` 이벤트는 승인자를 생성하지 않지만 런타임 도중 폐기자를 생성할 수도 있습니다.

일반적으로 승인자가 더 강력하며 선호됩니다. 승인자를 사용하면 에이전트는 필터링 항목을 동적으로 학습하는 대신 확인할 항목만 처리할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/threats/workload_security_rules
[2]: /ko/security/threats/agent_expressions/#operators