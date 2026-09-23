---
description: Datadog이 선별한 콘텐츠 팩을 활성화하여 특정 소프트웨어 스택 및 위협 벡터에 대한 선택적 탐지 기능을 배포하세요.
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: 설명서
  text: 정책을 사용하여 Agent 규칙 배포하기
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: 설명서
  text: Workload Protection 탐지 규칙
- link: /security/workload_protection/investigate_and_triage/security_signals
  tag: 설명서
  text: Security 신호 조사
title: 콘텐츠 팩
---
모든 탐지 규칙이 모든 워크로드에 적합한 것은 아닙니다. 일부 탐지는 특정 제약 조건이 있는 환경에서는 노이즈가 너무 많이 발생하거나 특정 소프트웨어 스택에는 적용되지 않을 수 있습니다. 동시에 새로운 위협이 계속 등장하며, Datadog 보안 연구팀은 새로운 공격과 취약성을 탐지하기 위한 규칙을 지속적으로 개발합니다.

Workload Protection [콘텐츠 팩][1]은 이러한 두 가지 과제를 모두 해결합니다. 각 콘텐츠 팩은 특정 소프트웨어 스택, 위협 벡터 또는 새로운 취약성에 맞게 구성된 Datadog 제작 번들로, 선택적 [Agent 규칙][2], [탐지 규칙][3], 지원 콘텐츠로 구성됩니다. 필요한 콘텐츠 팩을 선택하고 적용되는 워크로드에만 배포하세요.

## 이점 {#benefits}

- **관련 워크로드에 맞춤형 탐지 기능 배포:** 특정 워크로드나 환경을 위해 구축된 정책을 선택한 후 적용되는 곳에만 배포하세요. 이렇게 하면 해당 탐지 기능이 적용되지 않는 워크로드에서 불필요한 노이즈와 성능 저하를 방지할 수 있습니다.
- **새로운 위협에 선제적으로 대응:** Datadog 보안 연구팀이 새로운 위협과 취약성을 식별함에 따라 새로운 규칙을 이용하여 기본 정책에서 제공하는 탐지 범위를 보완하세요.

## 포함된 콘텐츠 {#included-content}

콘텐츠 팩에 따라 번들에는 다음이 포함될 수 있습니다.

- **Agent 규칙**: 콘텐츠 팩이 대상으로 하는 워크로드에 적용되도록 범위가 지정된 [정책][4]에 포함된 규칙
- **탐지 규칙**: 일치하는 활동이 탐지되면 [보안 신호][5]를 발생시키는 규칙
- **탐색 규칙**: 해당 사용 사례의 런타임 보안 상태를 평가하는 규칙
- 환경에 콘텐츠 팩을 배포하기 위한 구성 지침

## 콘텐츠 팩 활성화 {#enable-a-content-pack}

1. [콘텐츠 팩][1]으로 이동합니다.
2. 사용 가능한 콘텐츠 팩을 살펴보고 하나를 선택합니다.
3. 포함된 Agent 규칙, 탐지 규칙 및 배포 요구 사항을 검토합니다.
4. 콘텐츠 팩을 활성화하고 연결된 정책 페이지로 이동하려면 {{< ui >}}Enable{{< /ui >}}을 클릭합니다.

콘텐츠 팩을 활성화하면 해당 정책 및 규칙이 조직에 추가됩니다. 위협 탐지를 시작하려면 연결된 정책을 인프라에 배포하세요.

## 콘텐츠 팩 배포 {#deploy-a-content-pack}

콘텐츠 팩은 [정책][4]을 통해 배포됩니다. 콘텐츠 팩을 활성화한 후, 탐지가 적용될 워크로드로 정책 범위를 지정합니다.

1. [정책][6]으로 이동합니다.
2. 활성화한 콘텐츠 팩과 연결된 정책을 엽니다.
3. 배포 범위 옆에 있는 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
4. 특정 호스트, 클러스터 또는 환경을 대상으로 지정하려면 [태그][7]를 추가합니다.
5. 정책을 활성화 상태로 전환하고 배포를 확인합니다.

정책 배포에 대한 자세한 내용은 [정책 관리][4]를 참조하세요.

## 콘텐츠 팩 비활성화 {#deactivate-a-content-pack}

1. [콘텐츠 팩][1]으로 이동합니다.
2. 사용 가능한 콘텐츠 팩을 살펴보고 활성화된 콘텐츠 팩을 하나 선택합니다.
3. 정책 페이지에서 연결된 정책을 제거하려면 {{< ui >}}Deactivate{{< /ui >}}를 클릭합니다.

[1]: https://app.datadoghq.com/security/workload-protection/overview#content-packs
[2]: /ko/security/workload_protection/detect_and_monitor/agent_rules
[3]: /ko/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: /ko/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[5]: /ko/security/workload_protection/investigate_and_triage/security_signals
[6]: https://app.datadoghq.com/security/workload-protection/policies
[7]: /ko/getting_started/tagging/