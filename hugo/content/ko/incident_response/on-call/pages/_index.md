---
aliases:
- /ko/service_management/on-call/pages/
- /ko/service_management/on-call/triggering_pages/
- /ko/incident_response/on-call/triggering_pages/
further_reading:
- link: /incident_response/on-call/
  tag: 설명서
  text: Datadog On-Call
- link: /incident_response/incident_management/
  tag: 설명서
  text: Incident Management
title: 페이지
---
페이지는 On-Call 담당자의 대응이 필요한 경보입니다. 페이지는 다음과 같은 수명 주기를 거칩니다.

- **트리거됨**: 페이지가 전송되었지만 아직 아무도 페이지를 맡지 않았습니다. 에스컬레이션 정책은 구성에 따라 실행되며, 지정된 시간 내에 아무도 응답하지 않으면 추가 담당자에게 알림을 보냅니다.
- **확인됨**: 담당자가 페이지를 맡았습니다. 에스컬레이션 알림이 중지되고 담당자가 문제 해결을 시작합니다.
- **해결됨**: 근본적인 문제가 해결되고 페이지가 닫혔습니다.

이 가이드는 페이지를 트리거하고, 확인하고, 재할당하고, 해결하는 방법을 설명합니다.

## 페이지 트리거 {#trigger-a-page}

페이지는 팀으로 전송되며 해당 팀의 에스컬레이션 정책 및 일정을 통해 라우팅됩니다. 팀이 [Datadog On-Call에 온보딩][1]된 후에는 해당 팀에 페이지를 보낼 수 있습니다.

### 모니터에서 페이지 트리거 {#trigger-pages-from-monitors}

`oncall-`을 앞에 붙여 팀의 핸들을 멘션하여 페이지를 보내세요. 예를 들어 Checkout Operations Team(`@checkout-operations`)에 페이지를 보내려면 `@oncall-checkout-operations`를 멘션하세요.

{{< img src="incident_response/on-call/notification_page.png" alt="On-Call 팀이 언급된 알림입니다." style="width:80%;" >}}

@-핸들이 지원되는 모니터, Incident Management, 보안 탐지 규칙, Event Management 등 어디에서나 On-Call 팀에 페이지를 보낼 수 있습니다.

#### 페이지 자동 해결 {#resolving-pages-automatically}

모니터가 복구되면 해당 모니터가 트리거한 페이지는 복구 알림에 On-Call 팀 멘션(예: `@oncall-payments`)이 포함된 경우 자동으로 `Resolved`로 설정됩니다.

멘션이 경보 템플릿(예: `{{#is_alert}} ... {{/is_alert}}`)에만 있고 복구 메시지에는 없는 경우, 페이지는 자동으로 해결되지 않습니다.

#### 모니터 및 동적 긴급도 {#monitors-and-dynamic-urgencies}

모니터 경보를 통해 페이지를 보내고 팀의 라우팅 규칙에서 동적 긴급도를 사용하는 경우:
- WARN 임계값을 넘으면 페이지 긴급도가 `low`로 설정됩니다.
- ALERT 임계값을 넘으면 페이지 긴급도가 `high`로 설정됩니다.

#### 모니터 재알림 {#monitor-renotification}

모니터가 On-Call 팀에 [재알림을 보내도록][8] 구성된 경우, 동작은 페이지의 현재 상태에 따라 달라집니다.

- **페이지가 해결됨**: 모니터가 재알림을 보내고 새 페이지를 생성하며, 새 페이지는 팀의 에스컬레이션 정책을 통해 라우팅됩니다.
- **페이지가 확인됨**: 모니터가 재알림을 보내고 페이지가 다시 트리거되어, 페이지가 확인되었을 때 진행 중이던 단계에서 에스컬레이션 정책을 재개합니다. 
- **페이지가 트리거됨**: 에스컬레이션 정책의 모든 단계가 이미 실행되었지만 아무도 페이지를 확인하지 않은 경우, 모니터가 재알림을 보내고 페이지가 다시 트리거되어 에스컬레이션 정책을 처음부터 다시 시작합니다.

### 이메일을 통해 페이지 트리거 {#trigger-pages-through-email}

팀의 On-Call 담당자에게 직접 페이지를 보낼 수 있는 고유 이메일 주소를 생성합니다. 이 주소로 전송된 이메일은 팀에 구성된 라우팅 및 에스컬레이션 정책을 따릅니다.

일부 팀에서는 이 주소를 사람이 읽을 수 있는 배포 목록(예: `page-network@company.com`)에 포함하여 쉽게 식별할 수 있도록 합니다.

이메일을 통해 팀에 페이지를 보내려면 다음 단계를 따르세요.

1. 팀 페이지로 이동하여 **Custom Triggering Sources**까지 스크롤합니다.
1. 이메일 트리거 섹션에서 **Generate**를 클릭합니다.

### 인시던트를 통해 페이지 트리거 {#trigger-pages-through-incidents}

활성 인시던트에서 직접 페이지를 트리거하여 워크플로를 벗어나지 않고 상황을 에스컬레이션하고 추가 담당자를 참여시킵니다. 자세한 지침은 [인시던트에서 페이지 트리거][5]를 참조하세요.

### 통화를 통해 페이지 트리거 {#trigger-pages-through-calls}

전용 전화번호로 전화하여 [실시간 통화 라우팅][3]을 통해 페이지를 트리거합니다.

### 수동으로 페이지 트리거 {#trigger-pages-manually}

Datadog 플랫폼이나 Slack 또는 Microsoft Teams와 같은 도구를 통해 페이지를 보냅니다. 이를 통해 On-Call 상태가 아니더라도 팀이나 개인에게 직접 경고할 수 있습니다.

#### Datadog에서 전송 {#through-datadog}

1. [**On-Call** > **Teams**][2]로 이동합니다.
1. 페이지를 보낼 팀을 찾습니다. **Page**를 선택합니다.
   {{< img src="incident_response/on-call/pages/manual_page.png" alt="Checkout Operations Team이 표시된 On-Call Teams 목록입니다. Schedules, Escalation Policies, Page라는 세 개의 버튼이 표시됩니다." style="width:80%;" >}}
1. **Page title**을 입력하고 **Description** 필드에 추가 컨텍스트를 입력합니다. **Page**를 선택합니다.

Datadog을 통해 수동으로 보낸 페이지는 항상 `high` 긴급도입니다.

#### Slack에서 전송 {#through-slack}

1. Datadog Slack 앱을 설치합니다.
1. `/datadog page` 또는 `/dd page`를 입력합니다.
1. 페이지를 보낼 팀을 선택합니다.

Slack에서 보낸 페이지는 항상 `high` 긴급도입니다.

Slack에서 페이지 알림을 받으려면 [라우팅 규칙][4]을 참조하세요.

## 페이지에 대응 {#respond-to-a-page}

[**On-Call** > **Pages**][7]로 이동하여 모든 활성 및 과거 페이지를 확인합니다. 페이지를 클릭하여 사이드 패널을 열고 작업을 수행하거나, 하나 이상의 페이지 옆에 있는 확인란을 선택하여 일괄 편집합니다.

{{< img src="incident_response/on-call/pages/on-call-pages-list.png" alt="Active, Triggered, Acknowledged, Resolved, All 하위 탭과 각 페이지의 이름, 상태, 팀, 담당자, 생성 날짜를 보여주는 표가 있는 On-Call Pages 목록 보기" style="width:100%;" >}}

### 페이지 확인 {#acknowledge-a-page}

페이지를 확인하면 해당 페이지를 현재 처리 중임을 알리고, 에스컬레이션 정책이 다음 단계의 담당자에게 알림을 보내지 않도록 합니다. 페이지를 확인하지 않으면 에스컬레이션이 계속 진행되어 추가 담당자에게 페이지가 전송될 수 있습니다.

페이지를 확인하려면 다음 단계를 따르세요.

1. 페이지를 클릭하여 사이드 패널을 엽니다.
1. **Next Steps**에서 **Acknowledge**를 선택합니다.

페이지 상태가 `Acknowledged`로 변경됩니다.

{{< img src="incident_response/on-call/pages/on-call-page-next-steps.png" alt="페이지 상태, 긴급도, 담당자, 서비스를 보여주며 Acknowledge, Reassign, Resolve, Escalate, Snooze, Declare Incident의 Next Steps 버튼이 있는 On-Call Page 사이드 패널" style="width:70%;" >}}

### 페이지 일시 중지 {#snooze-a-page}

일시 중지는 확인과 달리 페이지를 맡지 않고, 페이지를 확인했지만 아직 조치할 준비가 되지 않은 경우 에스컬레이션 정책을 일시 중지합니다. 현재 페이지 알림을 받은 담당자만 페이지를 일시 중지할 수 있습니다. 에스컬레이션을 일시 중지할 기간을 선택합니다. 해당 기간이 끝나기 전에 아무도 페이지를 확인하거나 해결하지 않으면 에스컬레이션 정책이 재개되어 On-Call 담당자에게 다시 알림을 보냅니다.

페이지를 일시 중지하려면 다음 단계를 따르세요.

1. 페이지를 클릭하여 사이드 패널을 엽니다.
1. **Next Steps**에서 **Snooze** 옆의 화살표를 선택하고 사전 설정된 기간을 선택하거나, **At a specific time**을 선택하여 사용자 지정 날짜와 시간을 지정합니다.

   {{< img src="incident_response/on-call/pages/on-call-snooze-page.png" alt="Snooze 드롭다운이 열린 On-Call Page 사이드 패널로, 10분, 30분, 1시간, 4시간, 12시간 후 또는 특정 시간에 현재 에스컬레이션 단계에 다시 알림을 보내는 사전 설정 옵션이 표시됨" style="width:70%;" >}}

1. **Snooze**를 클릭합니다.

**참고**: 페이지 일시 중지 기능은 Datadog 모바일 앱에서도 사용할 수 있습니다.

일시 중지된 동안 페이지 상태는 `Triggered`로 유지됩니다. 일시 중지 기간이 종료되면 에스컬레이션 정책이 재개되어 현재 에스컬레이션 단계에 다시 알림을 보냅니다.

### 페이지 재할당 {#reassign-a-page}

잘못된 사람이나 팀에게 라우팅되었거나, 대응하기에 더 적합한 사람에게 소유권을 이전해야 하는 경우 페이지를 재할당합니다. 페이지를 재할당해도 페이지 기록은 그대로 유지됩니다.

페이지를 재할당하려면 다음 단계를 따르세요.

1. 페이지를 클릭하여 사이드 패널을 엽니다.
1. **Next Steps**에서 **Reassign**을 선택합니다. 그러면 **Reassign Page** 모달이 열립니다.

   {{< img src="incident_response/on-call/pages/on-call-reassign-page.png" alt="팀 또는 사용자에게 재할당하는 토글, 팀 선택 드롭다운, 선택적 댓글 필드가 있는 Reassign Page 모달" style="width:60%;" >}}

1. 재할당할 사용자 또는 팀을 선택합니다.
1. 원하는 경우 인계 사유를 설명하는 댓글을 추가합니다.
1. **Reassign**을 클릭합니다.

새 수신자에게 즉시 알림이 전송됩니다.

**참고**: `Triggered` 또는 `Acknowledged` 상태인 페이지만 재할당할 수 있습니다.

### 페이지 해결 {#resolve-a-page}

근본적인 문제가 해결되면 페이지를 해결합니다. 이렇게 하면 페이지가 닫히고 상태가 `Resolved`로 설정됩니다.

페이지를 해결하려면 다음 단계를 따르세요.

1. 페이지를 클릭하여 사이드 패널을 엽니다.
1. **Next Steps**에서 **Resolve**를 선택합니다.

모니터가 페이지를 트리거한 경우, 복구 알림에 On-Call 팀 멘션이 포함되어 있으면 모니터가 복구될 때 페이지가 자동으로 해결됩니다. 자세한 내용은 [페이지 트리거](#trigger-a-page)를 참조하세요.

### 페이지에서 인시던트 선언 {#declare-an-incident-from-a-page}

페이지에 팀 간 조정, 이해관계자 커뮤니케이션 또는 공식 추적이 필요한 경우 인시던트로 승격하세요. 이렇게 하면 페이지 컨텍스트가 미리 채워진 상태로 [Incident Management][6]에 인시던트가 생성됩니다.

인시던트를 선언하려면 다음 단계를 따르세요.

1. 페이지를 클릭하여 사이드 패널을 엽니다.
1. **Next Steps**에서 **Declare Incident**를 선택합니다.
1. 필요에 따라 미리 채워진 세부 정보를 검토하고 조정합니다.

   {{< img src="incident_response/on-call/pages/on-call-declare-incident-demo.png" alt="페이지 제목과 요약이 미리 채워져 있으며 인시던트 유형, 심각도 수준, 인시던트 지휘관, 팀 필드가 있는 Declare Incident 모달" style="width:100%;" >}}

1. **Declare Incident**를 선택하여 확인합니다.

인시던트 심각도 수준 및 대응자 역할에 대한 지침은 [Incident Management][6]를 참조하세요.

### 댓글 추가 {#add-a-comment}

페이지 타임라인은 페이지가 트리거된 시점, 알림을 받은 사람, 에스컬레이션 진행 방식을 기록하는 활동 로그입니다. 다른 담당자에게 컨텍스트를 제공하기 위해 직접 댓글을 추가할 수 있습니다.

{{< img src="incident_response/on-call/pages/on-call-timeline-demo.png" alt="댓글 입력 필드와 페이지 트리거, 전송된 알림, 확인 등의 이벤트가 시간순으로 기록된 로그를 보여주는 On-Call Page의 Timeline 섹션" style="width:60%;" >}}

댓글을 사용하여 다음을 수행하세요.
- 이미 조사했거나 배제한 내용을 문서화합니다.
- 다른 담당자에게 인계할 때 컨텍스트를 제공합니다.
- 대응에 영향을 미친 외부 요인을 기록합니다.

댓글을 추가하려면 페이지를 열고 **Timeline** 섹션에 텍스트를 입력하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/incident_response/on-call/teams
[2]: https://app.datadoghq.com/on-call/teams
[3]: /ko/incident_response/on-call/pages/live_call_routing
[4]: /ko/incident_response/on-call/routing_rules/#send-pages-to-slack-or-microsoft-teams
[5]: /ko/incident_response/incident_management/notification/#trigger-a-page-from-an-incident
[6]: /ko/incident_response/incident_management/
[7]: https://app.datadoghq.com/on-call/pages
[8]: /ko/monitors/notify/#renotify