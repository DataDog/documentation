---
further_reading:
- link: /service_management/on-call/
  tag: 문서
  text: Datadog On-Call
title: 팀 온보딩
---

팀은 [Datadog On-Call][2]의 중앙 조직 단위입니다. 페이지는 팀으로 전송되고 팀의 스케줄이나 에스컬레이션 정책은 페이지를 적절한 팀원에게 라우팅합니다.

On-Call Teams는 [Datadog Teams][1]의 확장입니다. On-Call Teams는 [Teams][3] 개요 페이지에 온콜 업무를 수행하지 않는 팀과 함께 나열되어 있습니다. Datadog은 가능한 한 On-Call 구성에 기존 팀을 사용할 것을 권장합니다. 이렇게 하면 On-Call 팀을 쉽게 찾을 수 있습니다.

### 새로운 팀이나 기존 팀 온보딩

1. [**On-Call** > **Teams**][4]에서 **Set Up Team**을 선택합니다.
1. 새로운 팀을 만들거나, 기존 Datadog 팀을 선택하거나, PagerDuty 또는 Opsgenie에서 팀 구성을 가져옵니다.
  {{< tabs >}}
  {{% tab "새로운 팀" %}}
  - **Team Name**: 팀 이름을 입력합니다. 조직에서 이미 널리 사용되는 경우가 아니라면 약어를 사용하지 않는 것이 좋습니다.
  - **Handle**: Datadog 플랫폼 전체에서 팀을 페이징하는 데 사용되는 핸들입니다. 언제든지 팀의 핸들을 변경할 수 있습니다.
  - **Members**: 온콜을 수행하지 않는 사람을 포함한 모든 팀원을 추가합니다.
  - **Description**: 팀의 책임에 대한 설명을 작성합니다. 예: _저희 팀은 [주요 책임]을 담당합니다. [주요 목표 또는 활동]을 수행하며 [운영 시간 또는 조건]으로 운영됩니다._
  {{% /tab %}}
  {{% tab "기존 팀" %}}
  드롭다운 메뉴에서 기존 Datadog 팀을 선택합니다.
  {{% /tab %}}
  {{< /tabs >}}
1. 기본 에스컬레이션 정책을 추가합니다.
   {{< img src="service_management/oncall/escalation_policy_blank.png" alt="새로운 에스컬레이션 정책 설정 뷰. 제안받은 세 가지 스케줄을 알립니다." style="width:80%;" >}}
   - Datadog은 팀에 대한 _Interrupt Handler_, _Primary_, _Secondary_ 스케줄을 자동으로 제안합니다. 다음 단계에서 이러한 스케줄을 정의할 수 있습니다.
   - 다른 팀이 소유한 기존 스케줄에 알림을 보낼 수도 있습니다.

   자세한 내용은 [에스컬레이션 정책][5]을 참조하세요.
1. 이전 단계에서 만든 스케줄을 정의합니다.
   {{< img src="service_management/oncall/schedule_blank.png" alt="새 스케줄 설정 뷰." style="width:80%;" >}}
   - **Schedule Time Zone**: 스케줄을 운영할 시간대를 선택하세요. 인수인계 시간 등 다른 설정은 이 선택에 따라 적용됩니다.
   - **Schedule Rotations**: 원하는 로테이션을 추가하세요.
   자세한 내용은 [스케줄][6]을 참조하세요.

### 다음 단계

모니터, 인시던트 또는 기타 리소스를 구성하여 On-Call 팀에 페이지를 보내세요. 자세한 내용은 [페이지 보내기][7]를 참조하세요.

On-Call 팀원이 [프로필 설정][8]을 설정했는지 확인하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/teams/
[2]: /ko/service_management/on-call/
[3]: https://app.datadoghq.com/organization-settings/teams
[4]: https://app.datadoghq.com/on-call/
[5]: /ko/service_management/on-call/escalation_policies
[6]: /ko/service_management/on-call/schedules
[7]: /ko/service_management/on-call/pages
[8]: /ko/service_management/on-call/profile_settings