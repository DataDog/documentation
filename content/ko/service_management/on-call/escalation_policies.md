---
further_reading:
- link: /service_management/on-call/
  tag: 문서
  text: Datadog On-Call
title: 에스컬레이션 정책
---

Datadog On-Call에서 에스컬레이션 정책은 페이지가 즉시 처리되도록 보장합니다. 페이지는 설정된 시간 내에 확인되지 않으면 미리 정의된 단계를 통해 에스컬레이션됩니다.

Datadog은 [팀을 On-Call에 온보딩][1]할 때 기본 에스컬레이션 정책을 생성합니다.

## 새 에스컬레이션 정책 만들기
{{< img src="service_management/oncall/escalation_policy_2.png" alt="에스컬레이션 정책 샘플." style="width:100%;" >}}

1. [**On-Call** > **Escalation Policies**][2]로 이동합니다.
1. [**+ New Escalation Policy**][3]를 선택합니다.
1. 에스컬레이션 정책에 대한 **Name**을 입력합니다. (예: _Payment's Escalation Policy_)
1. 이 에스컬레이션 정책을 소유한 **Teams**를 선택합니다.
1. 이제 정책을 생성합니다. 이 에스컬레이션 정책이 호출될 때 누가 또는 무엇이 페이지를 수신해야 하는지 결정합니다. 이후의 각 에스컬레이션 단계에 대해 누구에게 알릴지 선택합니다. 각 단계는 개별 사용자, 전체 팀 및/또는 스케줄에 따라 당직 중인 사람에게 알릴 수 있습니다.
   예를 들어, 이 페이지가 트리거되면 일정에 따라 현재 당직 중인 사람, 즉 John Doe에게 전송됩니다.
   {{< img src="service_management/oncall/escalation_policy_2_steps.png" alt="'Page is triggered' 이후 두 단계를 보여주는 에스컬레이션 정책. 각 단계에는 'Notify' 입력 상자와 'If the page is not acknowledged after N minutes, escalate.'가 있습니다. 첫 번째 단계는 Primary라는 스케줄에 알리도록 구성되고, 5분 후에도 페이지가 확인되지 않으면 에스컬레이션합니다. 두 번째 단계는 Jane Doe라는 담당자에게 알리도록 구성됩니다." style="width:100%;" >}}
1. 수신자 중 한 명이 페이지를 확인할 때까지 기다리는 시간을 분 단위로 구성합니다. 시간 내에 아무도 페이지를 확인하지 않으면 페이지가 에스컬레이션됩니다. 이 예에서 기본 온콜 담당자인 John Doe가 5분 이내에 페이지를 확인하지 않으면 페이지가 Jane Doe에게 전송됩니다.
1. 아무도 페이지를 확인하지 않을 경우 이러한 단계를 몇 번 반복해야 하는지 구성합니다.
1. Datadog이 모든 규칙과 반복을 실행한 후 페이지 상태를 자동으로 **Resolved**로 업데이트할지 여부를 선택합니다.

## 에스컬레이션 정책 타겟
에스컬레이션 정책의 각 단계에서 개별 사용자, 전체 팀 또는 일정에 따라 온콜 담당자에게 알림을 보낼 수 있습니다.

### 일정
{{< img src="service_management/oncall/escalation_policy_notify_schedule.png" alt="스케줄을 알리는 샘플 에스컬레이션 정책 단계." style="width:100%;" >}}

에스컬레이션 정책은 미리 정의된 스케줄에 따라 온콜 담당자에게 알릴 수 있습니다. 시스템은 스케줄을 확인하고 인시던트에 대해 신속하게 대응할 수 있는 사람이나 그룹에 알립니다. 스케줄을 사용하면 다음과 같은 경우에 유용합니다.

- 24시간 연중무휴로 대응할 수 있도록 다양한 시간대에 걸쳐 온콜 담당자게 알림을 라우팅할 수 있습니다.
- 각 교대 근무자가 서로 다른 수준의 긴급성 업무를 처리하는 계층형 지원이 가능합니다.
- 교대로 당직 근무를 하는 팀을 위한 동적 알림을 통해 적절한 담당자에게 페이지가 전달되도록 보장합니다.

지정된 스케줄에 온콜 담당자가 없을 경우, 해당 에스컬레이션 단계는 자연스럽게 건너뛰며 프로세스는 지연이나 중단 없이 계속 진행됩니다. UI에서 에스컬레이션이 생략되었음을 나타냅니다.

{{< img src="service_management/oncall/escalation_policy_schedule_skipped.png" alt="온콜 담당자가 없어 에스컬레이션이 생략된 것을 나타내는 샘플 에스컬레이션 정책." style="width:100%;" >}}

### 사용자
{{< img src="service_management/oncall/escalation_policy_notify_user.png" alt="에스컬레이션 정책에서 사용자를 지정하는 샘플 에스컬레이션 정책." style="width:100%;" >}}

특정 사용자를 에스컬레이션 정책에 포함시켜 페이지가 발생할 경우 항상 알림을 받도록 할 수 있습니다. 사용자를 직접 페이징하는 일반적인 사용 사례는 다음과 같습니다.

- 전문 지식이 필요한 심각도가 높은 인시던트의 경우 수석 엔지니어에게 알립니다.
- 고객과 관련된 사고가 발생한 경우 제품 관리자나 책임자에게 알립니다.
- 주 담당자가 부재중인 경우 알림을 백업 담당자에게 전달합니다.

### Teams
{{< img src="service_management/oncall/escalation_policy_notify_team.png" alt="전체 팀에 알리는 샘플 에스컬레이션 정책." style="width:100%;" >}}

전체 팀을 페이징하는 일반적인 사용 사례는 다음과 같습니다.

- 여러 시스템에 영향을 미치고 다양한 팀 구성원이 해결해야 하는 인시던트가 발생했을 때.
- 인프라스트럭처 관련 인시던트에 대해 DevOps 팀에 보고할 때.
- 엔지니어링 또는 보안 팀 소속 모든 팀원들에게 심각도가 높은 중단에 대해 알려야 할 때.

## 한계

- 최대 에스컬레이션 단계: 10
- 에스컬레이션 단계당 알림 대상(개인, 팀 또는 스케줄)의 최대 수: 10
- 다음 단계로 에스컬레이션하기까지의 최소 시간: 1분

[1]: /ko/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/escalation-policies
[3]: https://app.datadoghq.com/on-call/escalation-policies/create