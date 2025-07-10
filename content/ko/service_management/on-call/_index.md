---
cascade:
  algolia:
    rank: 70
further_reading:
- link: https://www.datadoghq.com/blog/datadog-on-call/
  tag: 블로그
  text: Datadog On-Call로 온콜 경험을 강화하세요
title: 온콜
---

Datadog On-Call은 모니터링, 페이징, 인시던트 대응을 하나의 플랫폼에 통합합니다.

{{< img src="service_management/oncall/oncall_overview.png" alt="페이지가 라우팅되는 방식에 대한 개요. 모니터, 인시던트, 보안 신호 또는 API 호출에서 페이지는 팀(예: 'payments-team')으로 전송된 다음 처리 규칙(예: 우선순위 기반)으로 전송되고 에스컬레이션 정책으로 전송됩니다. 그곳에서 스케줄로 전송되거나 사용자에게 직접 전송될 수 있습니다." style="width:100%;" >}}

## 개념

- **페이지**는 모니터, 인시던트 또는 보안 신호와 같이 알림을 받을 사항을 나타냅니다. 하나의 페이지는 `Triggered`, `Acknowledged`, `Resolved` 중 하나의 상태를 갖습니다.
- **팀**은 전문성과 운영 역할에 따라 특정 유형의 페이지를 처리하도록 Datadog 내에서 구성된 그룹입니다.
- **처리 규칙**을 사용하면 팀은 특정 유형의 수신 이벤트에 대한 응답을 세밀하게 조정할 수 있습니다. 이러한 규칙은 페이지의 긴급성 수준을 설정하고 이벤트의 메타데이터에 따라 페이지를 다른 에스컬레이션 정책으로 라우팅할 수 있습니다.
- **에스컬레이션 정책**은 팀 내부 또는 팀 간에 페이지가 어떻게 에스컬레이션되는지 결정합니다.
- **스케줄**은 특정 팀원이 페이지에 응답하기 위해 대기하는 시간표를 설정합니다.

## 작동 방식

**팀**은 Datadog On-Call의 중앙 조직 단위입니다. Datadog에서 알림이 트리거되면 지정된 On-Call 팀에 **페이지**가 전송됩니다.

{{< img src="service_management/oncall/notification_page.png" alt="On-Call 팀을 언급하는 알림." style="width:80%;" >}}

각 팀은 **에스컬레이션 정책**과 **스케줄**을 가지고 있습니다. 에스컬레이션 정책은 다음 스크린샷에서  _Checkout Operations - Interrupt Handler_, _Primary_,  _Secondary_와 같이 페이지가 다양한 스케줄로 전송되는 방식을 정의합니다. 각 팀은 또한 페이지를 다른 에스컬레이션 정책으로 라우팅하기 위한 **처리 규칙**을 구성할 수 있습니다.

{{< img src="service_management/oncall/escalation_policy.png" alt="에스컬레이션 정책 샘플" style="width:80%;" >}}

스케줄은 팀원들이 페이지에 응답하도록 배정되는 특정 시간을 정의하며, 다양한 시간대와 교대 근무에 따른 팀원의 근무 가능 시간을 구성하고 관리합니다.

{{< img src="service_management/oncall/schedule.png" alt="일본, 유럽, 미국 근무 시간에 따른 배정을 보여주는 샘플 스케줄." style="width:80%;" >}}

## Datadog On-Call 시작하기

On-Call을 시작하려면 [On-Call 팀을 구성][1]하고 모든 팀 구성원이 [On-Call 프로필 설정][2]을 구성하여 알림을 받을 수 있는 상태인지 확인합니다.

{{< whatsnext desc="이 섹션은 다음 주제를 포함하고 있습니다.">}}
  {{< nextlink href="/service_management/on-call/teams">}}<u>팀 온보딩하기</u>: 새로운 On-Call 팀을 생성하거나 기존 Datadog 팀을 On-Call에 추가하거나 PagerDuty 또는 Opsgenie에서 팀을 가져옵니다.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/triggering_pages">}}<u>페이지 보내기</u>: 모니터, 인시던트, 보안 신호 등을 통해 팀에 페이지를 보내거나 Datadog, Slack, Microsoft Teams 또는 Datadog API를 통해 수동으로 페이지를 보냅니다. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/escalation_policies">}}<u>에스컬레이션 정책</u>: 페이지가 다양한 스케줄로 전송되는 방법에 대한 단계를 정의합니다. {{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/schedules">}}<u>스케줄</u>: 팀원의 온콜 로테이션에 대한 일정을 정의합니다.{{< /nextlink >}}
  {{< nextlink href="/service_management/on-call/profile_settings">}}<u>프로필 설정</u>: 필요한 때에 효과적인 페이지를 받을 수 있도록 연락 방법과 알림 기본 설정을 구성합니다.{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/on-call/teams
[2]: /ko/service_management/on-call/profile_settings