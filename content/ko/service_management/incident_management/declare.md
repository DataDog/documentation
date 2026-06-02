---
title: 인시던트 선언
---

## 개요

Datadog 패러다임에서는 아래 항목 중 하나에 해당되면 인시던트로 선언하기에 적합한 상황으로 간주합니다:
- 이슈는 고객에게 영향을 미치거나 미칠 수 있습니다.
- 이슈(내부 이슈 포함)가 긴급하게 해결되어야 한다고 생각합니다.
- 다른 사람에게 알려 심각도를 올려야 하는 인시던트인지 잘 모르겠습니다.

Datadog 플랫폼 내에서 대시보드의 그래프 위젯, Incidents UI 또는 Datadog로 전달되는 모든 알림 등 여러 위치에서 인시던트를 선언할 수 있습니다.

## 선언 모달

인시던트를 선언하면 선언 모달이 나타납니다. 이 모달은 여러 가지 핵심 요소로 구성되어 있습니다.

| 인시던트 요소  | 설명 |
| ------------------ | ----------- |
| 타이틀              | (필수) 인시던트를 설명하는 제목 |
| 심각도 수준     | (필수) 기본적으로 심각도(severity)는 SEV-1(가장 심각)부터 SEV-5(가장 낮음)까지로 구분됩니다. Incident Management 설정에서 심각도의 개수와 각 설명을 사용자 지정할 수 있습니다.
| Incident Commander | 인시던트 응답에 할당된 사람 |

[인시던트 관리 설정][2]에서 인시던트 선언 모달에 더 많은 필드를 포함하도록 설정하거나, 특정 필드를 필수로 지정할 수 있습니다.


## 인시던트 페이지에서

Datadog[Datadog UI][1]에서 **Declare Incident**를 클릭하여 인시던트를 생성합니다.

*인시던트 선언* 모달에는 조직에서 사용하는 심각도와 상태에 대한 도움말 텍스트 및 설명이 포함된 접이식 사이드 패널이 표시됩니다. 이러한 도움말 텍스트와 설명은 [인시던트 설정][2]에서 커스터마이즈할 수 있습니다.

## 모니터에서

Actions 드롭다운에서 모니터를 통해 직접 인시던트를 선언할 수 있습니다. **Declare incident**를 선택하면 인시던트 생성 모달이 열리고, 해당 모니터는 신호로 인시던트에 추가됩니다. 기존 인시던트에 모니터를 추가할 수도 있습니다.

{{< img src="service_management/incidents/declare/declare_monitor.png" alt="모니터의 Actions 드롭다운 메뉴에서 Declare incident 옵션을 선택할 수 있습니다." style="width:50%;" >}}

또는 모니터가 `warn`, `alert`, 또는 `no data` 상태로 전환될 때 자동으로 인시던트를 생성하도록 설정할 수 있습니다. 이를 활성화하려면 모니터의 **Configure notifications and automations** 섹션에서 **Add Incident**를 클릭하고 옵션을 선택하세요. 관리자는 [인시던트 설정][9]에서 옵션을 생성할 수 있습니다.

모니터에서 생성된 인시던트는 모니터의 태그에서 [필드 값][10]을 상속받습니다. 인시던트에서 자동 알림을 전송하려면, 생성된 인시던트가 [알림 규칙][11]의 기준을 충족하도록 모니터에 태그를 추가하세요.

## 보안 시그널에서

Cloud SIEM 또는 Workload Protection의 시그널 사이드 패널에서 **Declare incident** 또는 **Escalate Investigation**을 클릭하여 직접 인시던트를 선언할 수 있습니다. 자세한 내용은 [보안 신호 조사][3]를 참조하세요.

App and API Protection 신호의 사이드 패널에 있는 목록의 작업을 통해 인시던트를 선언할 수 있습니다. **Show all actions**를 클릭한 다음 **Declare Incident**를 클릭하세요. 자세한 내용은 App and API Protection용 [보안 신호 조사][4]를 참조하세요.

{{< img src="/service_management/incidents/declare/declare_asm.png" alt="이미지 설명" style="width:90%;" >}}

## 케이스에서

[케이스 관리][5]에서 인시던트를 선언합니다. 개별 케이스 상세 정보 페이지에서 **Declare incident**를 클릭하여 케이스를 인시던트로 에스컬레이션합니다.

{{< img src="service_management/incidents/declare/declare_case_management.png" alt="페이지 상단의 Declare Incident 버튼을 강조하는 케이스 페이지 예시" style="width:90%;" >}}

## 그래프에서
그래프의 내보내기 버튼을 클릭하고 **인시던트 선언**을 클릭하면 그래프에서 직접 인시던트를 선언할 수 있습니다. 그러면 인시던트 생성 모달이 생성되고 그래프가 시그널로서 인시던트에 추가됩니다.

{{< img src="service_management/incidents/from-a-graph.png" alt="그래프에서 인시던트 생성" style="width:80%;">}}

## 신서틱 테스트에서

Actions 드롭다운을 통해 [신서틱 테스트][8]에서 직접 인시던트를 생성할 수 있습니다. **Declare incident**를 선택하면 인시던트 생성 모달이 열리고, 테스트 요약이 인시던트 타임라인에 추가되어 해당 지점에서 조사를 이어갈 수 있습니다.

{{< img src="service_management/incidents/declare/synthetics_declare_incident.png" alt="신서틱 테스트에서 인시던트를 선언합니다." style="width:90%;" >}}

## Datadog 클립보드에서
여러 모니터와 그래프를 수집하고 인시던트를 생성하려면 [Datadog Clipboard][6]를 사용하세요. Clipboard에서 인시던트를 선언하려면, 조사하려는 그래프를 복사한 후 `Cmd/Ctrl + Shift + K` 명령으로 Clipboard를 엽니다. **Declare Incident** 또는 내보내기 아이콘을 클릭하여 신호로 인시던트에 추가할 수 있습니다.

{{< img src="service_management/incidents/declare/declare_clipboard.png" alt="Datadog Clipboard에서 인시던트 선언" style="width:90%;" >}}

## Datadog On-Call 페이지에서

[Datadog On-Call 페이지][12]에서 직접 인시던트를 선언할 수 있습니다. [On-Call 페이지 목록][13]에서 페이지를 선택한 후 **Declare Incident**를 클릭하면 인시던트가 생성되며, 해당 인시던트는 관련 온콜 팀과 자동으로 연결됩니다.

## Slack에서

Slack에서 [Datadog 통합][7]이 활성화되어 있는 경우, 모든 Slack 채널에서 `/datadog incident` 슬래시 명령어를 사용하여 새로운 인시던트를 선언할 수 있습니다.

인시던트를 선언한 사용자가 자신의 Slack을 Datadog 계정과 연결한 경우, 기본적으로 해당 사용자가 Incident Commander로 지정됩니다. Incident Commander(IC)는 필요 시 앱 내에서 변경할 수 있습니다. 인시던트를 선언한 사용자가 Datadog 계정의 구성원이 아닌 경우, IC는 일반 `Slack app user`로 지정되며 이후 앱 내에서 다른 IC로 재지정할 수 있습니다.

{{< img src="service_management/incidents/from-slack.png" alt="Slack에서 인시던트 생성" style="width:60%;">}}

Slack에서 인시던트를 선언하면 인시던트 채널이 생성됩니다.

## Handoff Notifications에서

Handoff Notification은 페이징을 받거나 활성 인시던트에 추가되었을 때 콜아웃 카드를 표시합니다. 이러한 카드를 통해 다음을 할 수 있습니다.

- On-Call 페이지 보기 및 확인
- 관련 인시던트 리소스 이동
- 인시던트 채널에서 Slack 메시지 미리 보기
- 인시던트에 직접 작업

{{< img src="/service_management/incidents/declare/handoff_notification_card.png" alt="인시던트 세부 정보와 함께 보기, 확인, 작업 실행 옵션을 제공하는 Handoff Notification 카드" style="width:100%;" >}}

Handoff Notification 카드는 닫기 전까지 또는 인시던트 상태가 변경될 때까지 계속 표시됩니다. 개별 카드가 아니라 전체 핸드오프 컨테이너를 확장, 축소, 또는 닫을 수 있습니다.

개별 Handoff Notification 카드에서 인시던트를 선언할 수 있습니다.

## 다음 단계

{{< whatsnext desc="인시던트에 유용한 정보를 추가하고 조사에 참여한 모든 사람에게 컨텍스트를 제공합니다..">}}
    {{< nextlink href="/service_management/incident_management/describe" >}}인시던트 설명: 컨텍스트와 세부 정보 추가{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /ko/service_management/incident_management/incident_settings#information
[3]: /ko/security/workload_protection/security_signals/#declare-an-incident
[4]:/ko/security/workload_protection/security_signals/#declare-an-incident
[5]: /ko/service_management/case_management/view_and_manage
[6]: /ko/service_management/incident_management/datadog_clipboard
[7]: /ko/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /ko/service_management/incident_management/incident_settings/property_fields
[11]: /ko/service_management/incident_management/incident_settings/notification_rules
[12]: /ko/service_management/on-call/
[13]: https://app.datadoghq.com/on-call/pages