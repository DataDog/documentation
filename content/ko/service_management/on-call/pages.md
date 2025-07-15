---
further_reading:
- link: /service_management/on-call/
  tag: 문서
  text: Datadog On-Call
title: 페이지 전송
---

페이지는 팀으로 전송되고 이후 해당 팀의 에스컬레이션 정책 및 스케줄을 통해 라우팅됩니다. 팀의 [Datadog On-Call 온보딩][1]이 끝나면 페이징을 시작할 수 있습니다.

### 알림에서 페이지 전송
팀 핸들 앞에 `oncall-`을 붙인 후 멘션하여 페이지를 보낼 수 있습니다. 예를 들어, Checkout Operations 팀(`@checkout-operations`)에 페이지를 보내려면 `@oncall-checkout-operations`을 멘션합니다.

{{< img src="service_management/oncall/notification_page.png" alt="On-Call 팀을 언급하는 알림." style="width:80%;" >}}

@-핸들이 지원되는 모니터, 인시던트 관리, 보안 감지 규칙, 이벤트 관리 등 어디에서든 On-Call 팀에 페이지를 보낼 수 있습니다.

#### 모니터 및 동적 긴급 상황

모니터 알림을 통해 페이지를 보내고 팀의 처리 규칙이 동적 긴급성을 사용하는 경우:
- WARN 임계값을 넘으면 페이지 긴급도가 `low`로 설정됩니다.
- ALERT 임계값을 넘으면 페이지 긴급도가 `high`로 설정됩니다.

### 수동으로 페이지 전송

Datadog 플랫폼에서 직접 페이지를 수동으로 보낼 수도 있고, Slack 또는 Microsoft Teams와 같은 도구를 통해 보낼 수도 있습니다.

#### Datadog에서 전송

1. [**On-Call** > **Teams**][2]로 이동합니다.
1. 페이지를 만들고 싶은 팀을 찾은 후 **Page**를 선택합니다.
   {{< img src="service_management/oncall/manual_page.png" alt="Checkout Operations 팀을 보여주는 On-Call 팀 목록. 세 개의 버튼(Schedules, Escalation Policies, Page)이 표시됩니다." style="width:80%;" >}}
1. **Page title**을 입력합니다. **Tags**를 선택하고 **Description** 필드에 컨텍스트를 추가할 수도 있습니다. 그런 다음 **Page**를 선택합니다.

Datadog을 통해 수동으로 팀을 페이징하면 항상 `high` 긴급 페이지가 생성됩니다.

#### Slack에서 전송
1. Datadog 앱을 설치합니다.
1. `/datadog page` 또는 `/dd page`를 입력합니다.
1. 페이지를 보낼 팀을 선택합니다.

Slack에서 수동으로 팀을 페이징하면 항상 `high` 긴급 페이지가 생성됩니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/service_management/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams