---
aliases:
- /ko/service_management/incident_management/incident_settings/notification_rules/
- /ko/incident_response/incident_management/incident_settings/notification_rules/
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/templates
  tag: 문서
  text: 메시지 템플릿 사용자 지정하기
- link: /incident_response/incident_management/setup_and_configuration/variables
  tag: 문서
  text: 인시던트 변수 참조
title: 알림 규칙
---
## 개요 {#overview}

자동화된 알림 규칙은 사용자가 정의한 기준에 따라 적절한 이해관계자에게 인시던트를 알립니다. 이는 인시던트 대응자의 부담을 덜어주며 적절한 담당자가 신속하게 참여하도록 보장하여 해결 과정을 가속화합니다. 예를 들어, `service:web-store` 및 `application:purchasing`에 대한 SEV-1 또는 SEV-2 인시던트가 선언되거나 해당 인시던트가 서로 다른 진행 상태로 이동할 때마다 팀 이해관계자에게 자동으로 알리도록 알림 규칙을 설정할 수 있습니다.

알림 규칙을 사용하여 다음을 수행할 수 있습니다.
 - 주요 이해관계자에게 우선순위가 높은 인시던트 상시 알림
 - 특정 서비스 또는 팀에 인시던트 발생 시 특정 대응자에게 알림
 - [웹훅][6] 또는 [Datadog Workflows][5]를 사용한 자동화 트리거

## 알림 규칙 생성 {#creating-a-notification-rule}

알림 규칙을 생성하고 수정하려면 `Incident Notification Settings Write` 권한이 있어야 합니다.

[인시던트 설정 알림 규칙][1]에서 알림 규칙을 관리할 수 있으며, 여기에서 규칙을 검색, 삭제, 복사, 전환 및 생성할 수 있습니다. 

### 트리거 및 조건 {#triggers-and-conditions}

**인시던트 발생 시...**에서 트리거를 선택하고 규칙 조건을 정의합니다.

| 조건                              | 규칙이 알림을 보내는 경우                                                                                                                                                                                                                     |
|--------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Declared`                           | 인시던트가 선언되고 정의된 조건을 충족할 때 알림을 보냅니다. 조건이 정의되지 않은 경우, 모든 인시던트 선언에 대해 알림을 보냅니다.                                                                              |
| `Declared or attributes are updated` | 인시던트가 선언되거나 조건을 충족하도록 업데이트될 때 알림을 보냅니다. 또한 **다음 업데이트 시 재알림...** 아래에 나열된 필드가 변경되고 인시던트가 이미 조건을 충족하는 경우에도 알림을 보냅니다. 조건은 필드 간에는 `AND`로, 각 필드 내에서는 `OR`로 결합됩니다. |




예를 들어, 조건 `severity:SEV-1`, `severity:SEV-2` 및 `team:shopping`이 있는 규칙을 살펴보세요. 이 규칙은 `state` 및 `service` 필드가 변경될 때 다시 알림을 보내도록 구성되어 있습니다. 이 규칙은 다음 경우에 알림을 보냅니다.

* 인시던트의 `teams` 필드에 `shopping` 팀을 추가할 경우
* 인시던트의 `severity`를 다른 중증도에서 `SEV-1` 또는 `SEV-2`로 변경할 경우
* 인시던트에 이미 `shopping` 팀이 **있고** 값이 `SEV-1` 또는 `SEV-2`인 **상태에서** `state` 필드를 변경할 경우
* 인시던트에 이미 `shopping` 팀이 **있고** 값이 `SEV-1` 또는 `SEV-2`인 **상태에서** `service` 필드를 변경할 경우

### 알림 수신자 {#notification-recipients}

알림 규칙의 수신자를 정의할 때 Datadog의 [지원되는 알림 통합][2]에서 `@` 핸들을 사용할 수 있습니다. 이를 통해 다음을 비롯한 다양한 유형의 대상에게 알림을 보내는 알림 규칙을 정의할 수 있습니다.

| 알림 유형      | 핸들                         | 사용 방법                                                                                                                                                                                                                                 |
|------------------------|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **이메일**             | `@<email>`                     | 유효한 이메일 주소 앞에 `@`을 입력하세요. Datadog 사용자의 이메일인 경우, 규칙이 알림을 보낼 때 해당 사용자가 자동으로 대응자로 추가됩니다. 프라이빗 인시던트의 경우, 사용자에게 액세스 권한이 부여됩니다.                            |
| **모바일 기기**     | *(UI에서 선택)*           | **(Mobile Push Notification)**이 표시된 사용자 이름을 선택하세요. 이 옵션이 표시되려면 사용자가 [Datadog 모바일 앱][3]에서 알림을 활성화해야 합니다.                                                                                                      |
| **Slack 채널**     | `@slack-<channel>`<br>`@incident-slack-channel`            | `@slack-` 핸들을 사용하세요. 인시던트 Slack 채널에 알림을 보내려면 `@incident-slack-channel`을 사용하세요.                                                                                                                                                |
| **On-Call Teams**      | `@oncall-<team>`               | [Datadog On-Call 팀][7]을 호출하려면 `@oncall-` 핸들을 사용하세요.                                                                                                                                                                                            |
| **Microsoft Teams**    | `@teams-<channel>`             | Microsoft Teams 채널에 알림을 보내려면 `@teams-` 핸들을 사용하세요. Microsoft Teams에는 `@incident-slack-channel`에 해당하는 기능이 없으므로 `@teams-` 핸들로 인시던트의 자동 생성 채널을 지정할 수 없습니다. [Microsoft Teams 알림 대상][8]을 참조하세요.                                                                                                                                                                                 |
| **Webhooks**           | `@webhook-<name>`              | [웹훅][6]을 트리거하려면 `@webhook-` 핸들을 사용하세요. **인시던트** 페이로드 유형으로 웹훅을 정의해야 합니다.                                                                                                                          |
| **Workflows**          | `@workflows-<workflow_name>`   | [Datadog Workflow][5]를 트리거하려면 `@workflows-` 핸들을 사용하세요. **인시던트** 트리거 유형으로 워크플로를 게시해야 합니다.                                                                                                             |


## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings#Rules
[2]: /ko/monitors/notifications/?tab=is_alert#configure-notifications-and-automations
[3]: /ko/mobile/
[4]: /ko/incident_response/on-call/
[5]: /ko/actions/workflows/
[6]: /ko/integrations/webhooks/
[7]: /ko/incident_response/on-call/
[8]: /ko/incident_response/incident_management/setup_and_configuration/integrations/microsoft_teams/#notification-targets