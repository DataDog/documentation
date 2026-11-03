---
aliases:
- /ko/service_management/incident_management/declare/
- /ko/incident_response/incident_management/declare
title: 인시던트 선언
---
## 개요 {#overview}

Datadog 패러다임에서는 아래 항목 중 하나에 해당되면 인시던트로 선언하기에 적합한 상황으로 간주합니다:
- 고객에게 영향을 미치고 있거나 미칠 가능성이 있는 이슈입니다.
- 이슈(내부 이슈 포함)는 긴급 상황으로 처리되어야 한다고 판단됩니다.
- 인시던트를 호출해야 할지 확신이 없다면, 다른 사람들에게 알리고 심각도를 적정 수준으로 높이세요.

대시보드의 그래프 위젯, 인시던트 UI 또는 Datadog으로 보고되는 모든 경보 등 Datadog 플랫폼 내 여러 곳에서 인시던트를 선언할 수 있습니다.

## 선언 모달 {#declaration-modal}

인시던트를 선언하면 선언 모달이 나타납니다. 이 모달에는 몇 가지 핵심 요소가 있습니다.

| 인시던트 요소  | 설명 |
| ------------------ | ----------- |
| 제목              | (필수) 인시던트에 대해 설명하는 제목. |
| 심각도 수준     | (필수) 기본적으로 심각도는 SEV-1(가장 심각)에서 SEV-5(가장 덜 심각)까지 범위가 지정됩니다. Incident Management 설정에서 심각도 개수와 설명을 사용자 지정할 수 있습니다.
| 인시던트 커맨더 | 인시던트 대응을 주도하도록 지정된 담당자입니다. |

[Incident Management 설정][2]을 구성하여 인시던트 선언 모달에 더 많은 필드를 포함하거나 특정 필드를 필수로 지정할 수 있습니다.


## 인시던트 페이지의 경우 {#from-the-incident-page}

[Datadog UI][1]에서 **Declare Incident**을 클릭하여 인시던트를 생성하세요.

*인시던트 선언* 모달에는 조직에서 사용하는 심각도 및 상태에 대한 도움말 텍스트와 설명이 포함된 접기 가능한 측면 패널이 표시됩니다. 도움말 텍스트와 설명은 [인시던트 설정][2]에서 사용자 지정할 수 있습니다.

## 모니터의 경우 {#from-a-monitor}

모니터에서 직접 인시던트를 선언할 수 있습니다. **인시던트 선언**을 선택하여 인시던트 생성 모달을 열면, 해당 모니터가 신호로 인시던트에 추가됩니다. 기존의 인시던트에 모니터를 추가할 수도 있습니다.

{{< img src="incident_response/incident_management/investigate/declare/declare_monitor.png" alt="모니터의 작업 드롭다운 메뉴에서 인시던트 선언 옵션을 선택할 수 있습니다." style="width:50%;" >}}

또는 모니터가 `warn`, `alert` 또는 `no data` 상태로 전환될 때 모니터가 자동으로 인시던트를 생성하도록 설정할 수 있습니다. 이를 활성화하려면 모니터의 **Configure notifications and automations** 섹션에서 **Add Incident**를 클릭하고 `@incident-` 옵션을 선택하세요. 관리자는 [인시던트 설정][9]에서 `@incident-` 옵션을 생성할 수 있습니다.

모니터에서 생성된 인시던트는 모니터의 태그에서 [필드 값][10]을 상속합니다. 인시던트에서 자동화된 알림을 보내려면, 생성된 인시던트가 [알림 규칙][11]의 기준과 일치하도록 모니터에 태그를 추가하세요.

## 보안 신호의 경우 {#from-a-security-signal}

**Declare Incident** 또는 **Escalate Investigation**을 클릭하여 Cloud SIEM 또는 Workload Protection 신호 사이드 패널에서 직접 인시던트를 선언하세요. 자세한 내용은 [보안 신호 조사][3]를 참조하세요.

신호 사이드 패널에 나열된 작업을 통해 App 및 API 보호 신호에서 인시던트를 선언하세요. **Show all actions**를 클릭한 다음 **Declare Incident**을 클릭하세요.
자세한 내용은 App 및 API 보호를 위한 [보안 신호 조사][4]를 참조하세요.

{{< img src="/incident_response/incident_management/investigate/declare/declare_asm.png" alt="이미지 설명" style="width:90%;" >}}

## 유출된 시크릿의 경우{#from-a-leaked-secret}

탐지 사이드 패널에서 **Declare Incident**을 클릭하여 [Secret Scanning][15]에서 인시던트를 선언하세요. 인시던트에는 모든 탐지 메타데이터가 미리 채워집니다.

{{< img src="/incident_response/incident_management/investigate/declare/declare-secrets.png" alt="이미지 설명" style="width:90%;" >}}

## 작업 항목의 경우{#from-a-work-item}

[작업 관리][5]에서 인시던트를 선언하세요. 개별 작업 항목 세부 정보 페이지에서 **Declare Incident**를 클릭하여 작업 항목을 인시던트로 에스컬레이션하세요.

## 그래프의 경우{#from-a-graph}
그래프의 내보내기 버튼을 클릭한 다음 **Declare Incident**를 클릭하여 그래프에서 직접 인시던트를 선언할 수 있습니다. 인시던트 생성 모달이 나타나고, 그래프가 신호로서 인시던트에 추가됩니다.

{{< img src="incident_response/incident_management/from-a-graph.png" alt="그래프에서 인시던트 생성" style="width:80%;">}}

## Synthetic 테스트의 경우{#from-a-synthetic-test}

Actions 드롭다운을 통해 [Synthetic 테스트][8]에서 직접 인시던트를 생성합니다. **Declare Incident**를 선택하여 인시던트 생성 모달을 엽니다. 테스트 요약이 인시던트 타임라인에 추가되어 여기서부터 조사를 진행할 수 있습니다.

{{< img src="incident_response/incident_management/investigate/declare/synthetics_declare_incident.png" alt="Synthetic 테스트에서 인시던트 선언" style="width:90%;" >}}

## Datadog 클립보드의 경우 {#from-the-datadog-clipboard}
[Datadog 클립보드][6]를 사용하여 여러 모니터와 그래프를 수집하고 인시던트를 생성합니다. Datadog 클립보드에서 인시던트를 선언하려면 조사하려는 그래프를 복사하고 명령 `Cmd/Ctrl + Shift + K`을 사용하여 Datadog 클립보드를 엽니다. **Declare Incident** 또는 내보내기 아이콘을 클릭하여 신호로 인시던트에 추가하세요.

{{< img src="incident_response/incident_management/investigate/declare/declare_clipboard.png" alt="Datadog 클립보드에서 인시던트 선언" style="width:90%;" >}}

## Datadog On-Call 페이지의 경우{#from-a-datadog-on-call-page}

[Datadog On-Call 페이지][12]에서 직접 인시던트를 선언할 수 있습니다. [On-Call 페이지 목록][13]에서 페이지를 선택하고 **Declare Incident**를 클릭하여 인시던트를 생성하고 관련 On-Call 팀과 자동으로 연결합니다.

## Slack의 경우{#from-slack}

[Datadog 통합을 Slack에서 활성화][7]를 사용하는 경우, 모든 Slack 채널에서 슬래시 명령인 `/datadog incident`를 사용하여 새 인시던트를 선언할 수 있습니다.

인시던트를 선언하는 사용자가 자신의 Slack을 Datadog 계정에 연결한 경우, 기본적으로 해당 사용자가 인시던트 커맨더로 지정됩니다. 인시던트 커맨더(IC)는 필요한 경우 나중에 앱 내에서 변경할 수 있습니다. 인시던트를 선언하는 사용자가 Datadog 계정의 구성원이 아닌 경우, IC는 일반 `Slack app user`로 할당되며 앱 내에서 다른 IC로 지정할 수 있습니다.

{{< img src="incident_response/incident_management/from-slack.png" alt="Slack에서 인시던트 생성" style="width:60%;">}}

Slack에서 인시던트를 선언하면 인시던트 채널이 생성됩니다.

## Google Chat의 경우{#from-google-chat}

[Google Chat용 Datadog 통합][14]을 설정한 경우, 모든 Google Chat 공간에서 슬래시 명령인 `/dd_incident`를 사용하여 인시던트를 선언할 수 있습니다.

## Handoff 알림의 경우 {#from-handoff-notifications}

Handoff 알림은 호출을 받거나 활성 인시던트에 추가될 때 콜아웃 카드를 표시합니다. 이 카드를 통해 다음을 수행할 수 있습니다.

- On-Call 페이지 보기 및 확인
- 관련 인시던트 리소스 탐색
- 인시던트 채널의 Slack 메시지 미리보기
- 인시던트에 직접 조치 취하기

{{< img src="/incident_response/incident_management/investigate/declare/handoff_notification_card.png" alt="Handoff 알림 카드가 인시던트 세부 정보를 표시하며, 보기, 확인 및 조치 취하기 옵션을 제공합니다." style="width:100%;" >}}

Handoff 알림 카드는 닫히거나 인시던트 상태가 변경될 때까지 표시됩니다. 개별 카드가 아닌 전체 Handoff 컨테이너를 펼치기, 접기 또는 닫을 수 있습니다.

개별 Handoff 알림 카드에서 인시던트를 선언할 수 있습니다.

## 다음 단계 {#whats-next}

{{< whatsnext desc="인시던트에 유용한 정보를 추가하고 조사에 참여하는 모든 사람에게 컨텍스트를 제공하세요.">}}
    {{< nextlink href="/incident_response/incident_management/investigate/describe" >}}인시던트 설명: 컨텍스트 및 세부 정보 추가{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents
[2]: /ko/incident_response/incident_management/setup_and_configuration/information
[3]: /ko/security/workload_protection/investigate_and_triage/security_signals/actions/#declare-an-incident
[4]: /ko/security/application_security/threat_protection/security_signals/#declare-an-incident
[5]: /ko/incident_response/work_management/view_and_manage
[6]: /ko/dashboards/guide/datadog_clipboard
[7]: /ko/integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[8]: https://app.datadoghq.com/synthetics/tests
[9]: https://app.datadoghq.com/incidents/settings?section=global-settings
[10]: /ko/incident_response/incident_management/setup_and_configuration/property_fields
[11]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules
[12]: /ko/incident_response/on-call/
[13]: https://app.datadoghq.com/on-call/pages
[14]: /ko/integrations/google-hangouts-chat/
[15]: /ko/security/code_security/secret_scanning/