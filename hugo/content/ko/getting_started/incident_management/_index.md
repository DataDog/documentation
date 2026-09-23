---
description: 협업 워크플로, 타임라인, 사후 분석을 통해 선언부터 해결까지 문제를 추적하고 소통하세요.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-incident-management
  tag: 학습 센터
  text: Incident Management 시작하기
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: 비디오
  text: Datadog의 Incident Management
- link: /monitors/incident_management
  tag: 설명서
  text: Incident Management
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 Incident Management 개선
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: 블로그
  text: Datadog을 이용한 Incident Management
- link: /incident_response/incident_management/incident_settings
  tag: 설명서
  text: 알림 규칙
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: 설명서
  text: 인시던트와 Slack 통합
- link: https://www.datadoghq.com/blog/mobile-incident-management-datadog/
  tag: 블로그
  text: Datadog 모바일 앱을 사용하여 이동 중에도 인시던트를 관리하고 해결할 수 있습니다.
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: 블로그
  text: 인시던트 포스트모템(사후 분석) 생성 모범 사례
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: 블로그
  text: Datadog의 인시던트 관리 방법
title: Incident Management 시작하기
---
## 개요 {#overview}

Datadog Incident Management는 메트릭, 트레이스, 로그를 통해 식별한 문제를 추적하고 전달합니다.

이 가이드에서는 Datadog 사이트를 사용하여 인시던트를 선언하고, 조사와 수정이 진행됨에 따라 인시던트를 업데이트하며, 인시던스 해결 시 사후 분석을 생성하는 과정을 안내합니다. 이 예시에서는 [Slack 통합][1]이 활성화된 것으로 가정합니다.

## 문제 탐지부터 해결까지 살펴보는 인시던트 관리 튜토리얼 {#walking-through-an-incident-from-issue-detection-to-resolution}

### 인시던트 선언 {#declaring-an-incident}

**시나리오:** 모니터링 중 오류가 다수 발생하여 여러 서비스의 속도가 저하될 수 있다는 경고가 전송되었습니다. 고객이 오류의 영향을 받았는지는 알 수 없습니다.

이번 가이드에서는 [Datadog 클립보드][2]를 사용해 인시던트를 선언하는 법을 설명합니다. 클립보드를 사용하면 그래프, 모니터, 전체 대시보드 또는 [노트북][3]과 같은 다양한 소스에서 정보를 수집할 수 있습니다. 이를 통해 인시던트를 선언할 때 최대한 많은 정보를 제공할 수 있습니다.

1. Datadog에서 [{{< ui >}}Dashboard List{{< /ui >}}][15]로 이동하여 {{< ui >}}System - Metrics{{< /ui >}}를 선택합니다.
2. 그래프 중 하나 위에 마우스를 놓고 다음 명령 중 하나를 사용하여 클립보드에 복사합니다.
    - {{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}C{{< /ui >}}
    - 그래프에서 {{< ui >}}Export{{< /ui >}} 아이콘을 클릭하고 {{< ui >}}Copy{{< /ui >}}를 선택합니다.
3. 왼쪽 Datadog 메뉴에서 [{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Monitors List{{< /ui >}}][16]로 이동하여 {{< ui >}}[Auto] Clock in sync with NTP{{< /ui >}}를 선택합니다.
4. 클립보드를 엽니다({{< ui >}}Ctrl{{< /ui >}}/{{< ui >}}Cmd{{< /ui >}} + {{< ui >}}Shift{{< /ui >}} + {{< ui >}}K{{< /ui >}}).
5. 클립보드에서 {{< ui >}}Add current page{{< /ui >}}를 클릭하여 클립보드에 모니터를 추가합니다.
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="클립보드에 복사" responsive="true" style="width:100%;">}}
6. {{< ui >}}Select All{{< /ui >}}을 클릭한 다음 {{< ui >}}Export items to…{{< /ui >}}를 클릭합니다.
7. {{< ui >}}Declare Incident{{< /ui >}}를 선택합니다.
8. 진행 상황을 설명합니다.
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| {{< ui >}}Title{{< /ui >}}                    | 팀에서 사용하려는 인시던트 제목 명명 규칙을 따릅니다. 실제 인시던트가 아니므로 테스트 인시던트임을 명확히 하기 위해 `TEST`라는 단어를 포함하세요. 제목 예시: `[TEST] My incident test`                                                                      |
| {{< ui >}}Severity Level{{< /ui >}}           | 고객이 영향을 받고 있는지, 관련 서비스가 어떻게 영향을 받고 있는지 불분명하므로 {{< ui >}}Unknown{{< /ui >}}으로 설정합니다. 각 심각도 수준의 의미에 대한 인앱 설명을 확인하고 팀의 가이드라인을 따르세요.                                                                                |
| {{< ui >}}Incident Commander{{< /ui >}}       | 본인에게 할당된 상태로 둡니다. 실제 인시던트 발생 시에는 인시던트 조사 리더에게 할당됩니다. 인시던트 조사가 진행됨에 따라 귀하 또는 다른 사용자가 인시던트 커맨더를 업데이트할 수 있습니다.                                                                                 |
9. {{< ui >}}Declare Incident{{< /ui >}}를 클릭하여 인시던트를 생성합니다.
   [그래프][4], [모니터][5] 또는 [인시던트 API][6]에서 인시던트를 선언할 수도 있습니다. APM 사용자의 경우, 모든 APM 그래프에서 인시던트 아이콘을 클릭하여 인시던트를 선언할 수 있습니다.
Slack 통합의 일환으로 `/datadog incident` 바로가기를 사용하여 인시던트를 선언하고 제목, 심각도 및 고객에 미치는 영향을 설정할 수도 있습니다.
10. 인시던트 페이지에서 {{< ui >}}Slack Channel{{< /ui >}}을 클릭하여 인시던트의 Slack 채널로 이동합니다.
   
모든 새 인시던트에 대해 인시던트 전용 새 Slack 채널이 자동으로 생성되므로 팀과의 커뮤니케이션을 통합하고 문제 해결을 시작할 수 있습니다. 조직의 Slack 통합이 글로벌 인시던트 채널을 업데이트하도록 설정된 경우, 해당 채널이 새 인시던트 정보로 업데이트됩니다.

Slack 통합을 활성화하지 않은 경우 {{< ui >}}Add Chat{{< /ui >}}을 클릭하여 인시던트에 대해 논의 중인 채팅 서비스의 링크를 추가하세요.

인시던트에 대해 논의 중인 통화의 링크를 추가하려면 {{< ui >}}Add Video Call{{< /ui >}}을 클릭하세요. 

### 인시던트 문제 해결 및 업데이트 {#troubleshooting-and-updating-the-incident}

인시던트 페이지에는 {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Timeline{{< /ui >}}, {{< ui >}}Post-Incident{{< /ui >}}, {{< ui >}}Notifications{{< /ui >}}의 네 가지 주요 섹션이 있습니다. 인시던트가 진행됨에 따라 이 섹션들을 업데이트하여 모든 사람이 현재 상태를 파악할 수 있도록 하세요.

#### 개요 {#overview-1}

**시나리오:** 조사를 진행한 결과, 근본 원인이 메모리가 부족한 호스트임을 발견했습니다. 또한 소수의 고객 하위 집합이 영향을 받고 있으며 페이지 로딩이 느려지는 현상을 겪고 있다는 사실을 전달받았습니다. 첫 번째 고객 신고가 15분 전에 접수되었습니다. 이는 SEV-3 인시던트입니다.

{{< ui >}}Overview{{< /ui >}} 섹션에서는 조사의 진척에 따라 인시던트 필드와 고객에게 미친 영향을 업데이트할 수 있습니다.

중요도 수준과 근본 원인을 업데이트하는 방법은 다음과 같습니다.
1. {{< ui >}}Severity{{< /ui >}} 드롭다운을 클릭하고 {{< ui >}}SEV-3{{< /ui >}}를 선택합니다.
2. 모니터가 문제에 대한 알림을 처음으로 보냈으므로 {{< ui >}}What happened{{< /ui >}}에서 {{< ui >}}Detection Method{{< /ui >}} 드롭다운의 {{< ui >}}Monitor{{< /ui >}}를 선택합니다(Unknown이 선택됨).
1. {{< ui >}}Why it happened{{< /ui >}} 필드에 `TEST: Host is running out of memory.`를 추가합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭하여 속성을 업데이트합니다.
    Slack에서 `/datadog incident update` 명령을 사용하여 진행 중인 문제의 제목, 심각도 또는 상태를 업데이트할 수도 있습니다.

고객에 미치는 영향을 추가하려면 다음 단계를 따르세요.
1. {{< ui >}}Impact{{< /ui >}} 섹션에서 {{< ui >}}\+ Add{{< /ui >}}를 클릭합니다.
2. 타임스탬프를 15분 전으로 변경합니다. 처음으로 고객이 신고한 시점이 15분 전이기 때문입니다.
3. 설명 필드에 `TEST: Some customers seeing pages loading slowly.`를 추가합니다.
4. {{< ui >}}Save{{< /ui >}}를 클릭하여 필드를 업데이트합니다. {{< ui >}}Impact{{< /ui >}} 섹션이 업데이트되어 고객 영향이 얼마나 지속되었는지 보여줍니다. {{< ui >}}Overview{{< /ui >}} 페이지에서 변경한 모든 사항은 {{< ui >}}Timeline{{< /ui >}}에 추가됩니다.

#### 타임라인 {#timeline}

{{< ui >}}Timeline{{< /ui >}}은 인시던트 필드의 추가 및 변경 사항과 정보를 시계열로 보여줍니다.

{{< img src="getting_started/incident_management/flag_event.png" alt="이벤트 플래그 지정" responsive="true" style="width:50%;">}}

1. {{< ui >}}Timeline{{< /ui >}} 탭을 클릭합니다.
2. {{< ui >}}Impact added{{< /ui >}} 이벤트를 찾아 플래그 아이콘을 클릭하여 {{< ui >}}Important{{< /ui >}}로 표시합니다.
3. 타임라인에 `I found the host causing the issue.`라는 메모를 추가합니다.
4. 메모의 이벤트 위로 커서를 올리고 연필 아이콘을 클릭하면 메모의 타임스탬프가 변경됩니다. 문제의 원인인 호스트를 실제로 찾아낸 시간은 10분 전이기 때문입니다.
5. 메모에 {{< ui >}}Important{{< /ui >}}로 플래그를 지정합니다.
6. {{< ui >}}Slack Channel{{< /ui >}}을 클릭하여 인시던트의 Slack 채널로 돌아갑니다.
7. 채널에 `I am working on a fix.`라는 메시지를 게시합니다.
8. 메시지의 동작 명령 아이콘(메시지 위에 커서를 올린 후 오른쪽에 나타나는 말줄임표)을 클릭합니다.
9. {{< ui >}}Add to Incident{{< /ui >}}를 선택하여 타임라인으로 메시지를 보냅니다.

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Slack에서 추가" responsive="true" style="width:40%;">}}

인시던트 채널의 Slack 코멘트를 타임라인에 추가하면 인시던트 조사 및 완화와 관련해 중요한 커뮤니케이션을 통합할 수 있습니다.

#### 인시던트 이후 {#post-incident}

**시나리오:** 이러한 문제를 다루고 해결하는 방법에 대한 노트북이 있으며, 여기에는 해결을 위해 수행해야 할 작업이 포함되어 있습니다.

 {{< ui >}}Post-Incident{{< /ui >}} 섹션에서는 문제 조사나 인시던트 이후 복원 업무를 위한 문서와 업무를 추적할 수 있습니다.

1. {{< ui >}}Post-Incident{{< /ui >}} 탭을 클릭합니다.
2. {{< ui >}}Documents{{< /ui >}} 상자의 더하기 아이콘(`+`)을 클릭하고 [Datadog 노트북][7]으로 연결되는 링크를 추가합니다. {{< ui >}}Documents{{< /ui >}} 섹션에 대한 모든 업데이트는 {{< ui >}}Incident Update{{< /ui >}} 유형으로 타임라인에 추가됩니다.
3. {{< ui >}}Incident Tasks{{< /ui >}} 상자에 작업 설명을 추가하여 작업을 추가합니다(예: `Run the steps in the notebook.`).
4. {{< ui >}}Create Task{{< /ui >}}를 클릭합니다.
5. {{< ui >}}Assign To{{< /ui >}}를 클릭하고 사용자 자신에게 업무를 할당합니다.
6. {{< ui >}}Set Due Date{{< /ui >}}를 클릭하고 날짜를 오늘로 설정합니다.
    모든 업무 추가 사항과 변경 사항은 {{< ui >}}Timeline{{< /ui >}}에 기록됩니다.
    또한, 인시던트 이후 업무를 {{< ui >}}Post-Incident{{< /ui >}} 섹션에 추가해 계속 추적할 수 있습니다.

#### 알림 {#notifications}

**시나리오:** 문제가 완화되고 팀이 상황을 모니터링 중입니다. 인시던트 상황이 안정적입니다.

{{< ui >}}Notifications{{< /ui >}} 섹션에서 알림을 보내 인시던트 현황을 업데이트할 수 있습니다.

1. {{< ui >}}Overview{{< /ui >}} 섹션으로 다시 이동합니다.
2. 드롭다운 메뉴의 상태를 {{< ui >}}ACTIVE{{< /ui >}}에서 {{< ui >}}STABLE{{< /ui >}}로 변경합니다.
4. {{< ui >}}Notifications{{< /ui >}} 탭으로 이동합니다.
5. {{< ui >}}New Notification{{< /ui >}}을 클릭합니다.
    기본 메시지는 인시던트 타이틀을 제목으로 하며, 인시던트 현황에 대한 정보를 본문에 담고 있습니다.
    실제 인시던트 발생 상황에서 인시던트 관계자에게 업데이트 내용을 보낼 수 있습니다. 이번 예시에서는 사용자 자신에게만 알림을 보내도록 하겠습니다.
6. {{< ui >}}Recipients{{< /ui >}} 필드에 본인을 추가합니다.
7. {{< ui >}}Send{{< /ui >}}를 클릭합니다.
    메시지가 담긴 이메일을 받게 됩니다.
    사용자 지정 [메시지 템플릿][8]을 만들 수 있습니다. {{< ui >}}Category{{< /ui >}} 필드를 사용하여 템플릿을 그룹화합니다.

### 해결 및 사후 분석 {#resolution-and-postmortem}

**시나리오:** 문제가 더 이상 고객에게 영향을 미치지 않으며 해결된 것으로 확인되었습니다. 팀에서는 사후 분석을 통해 무엇이 잘못되었는지 검토하고자 합니다.

1. {{< ui >}}Overview{{< /ui >}} 섹션으로 이동합니다.
3. 상태를 {{< ui >}}STABLE{{< /ui >}}에서 {{< ui >}}RESOLVED{{< /ui >}}로 변경하여 더 이상 활성 상태가 아니도록 합니다. 또, 고객이 받는 영향이 더 일찍 발생한 경우에는 일시를 변경할 수도 있습니다.
7. 인시던트 상태가 해결됨(resolved)으로 설정되면 {{< ui >}}Generate Postmortem{{< /ui >}} 버튼이 상단에 표시됩니다. {{< ui >}}Generate Postmortem{{< /ui >}}을 클릭합니다.
8. 타임라인 섹션의 경우 {{< ui >}}Marked as Important{{< /ui >}}를 선택하여 {{< ui >}}Important{{< /ui >}} 이벤트만 사후 분석에 추가되도록 합니다.
9. {{< ui >}}Generate{{< /ui >}}를 클릭합니다.

사후 분석에는 조사 및 수정 과정에서 참조된 타임라인 이벤트와 리소스가 포함됩니다. 이를 통해 문제의 원인과 향후 예방 방법을 더 쉽게 검토하고 추가로 문서화할 수 있습니다. 자세한 내용은 [인시던트 사후 분석][17]을 참조하세요.

문제가 다시 발생하지 않도록 팀이 완료해야 하는 후속 작업이 있는 경우, 이를 인시던트 이후의 {{< ui >}}Incident Tasks{{< /ui >}} 섹션에 추가하고 추적합니다.

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="사후 분석 생성" responsive="true" style="width:80%;">}}
## Incident Management 워크플로 맞춤 설정하기 {#customizing-your-incident-management-workflow}

Datadog Incident Management는 조직의 요구 사항에 따라 다양한 심각도 및 상태 수준으로 맞춤 설정할 수 있으며, 인시던트와 관련된 APM 서비스 및 팀과 같은 추가 정보도 포함할 수 있습니다. 자세한 내용은 Incident Management 페이지의 해당 [섹션][9]을 참조하세요.

인시던트의 심각도 수준에 따라 특정 담당자나 서비스에 자동으로 알림을 보내도록 알림 규칙을 설정할 수도 있습니다. 자세한 내용은 [Incident Settings][10] 설명서를 참조하세요.

Incident Management를 맞춤 설정하려면 [Incident Settings 페이지][11]로 이동하세요. 왼쪽 Datadog 메뉴에서 {{< ui >}}Monitors{{< /ui >}} > {{< ui >}}Incidents{{< /ui >}}로 이동합니다(Incident Management 시작 화면이 나타나면 {{< ui >}}Get Started{{< /ui >}}를 클릭합니다). 그런 다음 상단에서 {{< ui >}}Settings{{< /ui >}}를 클릭합니다.

## Datadog 모바일 앱에서 인시던트 생성 및 관리하기 {#create-and-manage-incidents-on-mobile}

[Apple App Store][13] 및 [Google Play Store][14]에서 제공되는 [Datadog 모바일 앱][12]을 사용하면 액세스 가능한 모든 인시던트를 생성, 확인, 검색 및 필터링할 수 있습니다. Datadog 모바일 앱의 Datadog 계정을 통해 컴퓨터를 사용하지 않고도 빠르게 응답하고 해결할 수 있습니다.

또한 Slack, Zoom 등과의 통합을 통해 인시던트를 선언 및 편집하고, 팀과 빠르게 커뮤니케이션할 수 있습니다.

{{< img src="incident_response/incident_management/iOS_Incident_V2.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Datadog 모바일 앱의 두 가지 보기: 각 인시던트에 대한 상위 수준 세부 정보가 포함된 인시던트 목록 보기와 단일 인시던트에 대한 상세 패널 보기">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/slack/
[2]: /ko/dashboards/guide/datadog_clipboard
[3]: /ko/notebooks/#overview
[4]: /ko/incident_response/incident_management/#from-a-graph
[5]: /ko/incident_response/incident_management/#from-a-monitor
[6]: /ko/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /ko/incident_response/incident_management/#status-levels
[10]: /ko/incident_response/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /ko/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage
[17]: /ko/incident_response/incident_management/post_incident/postmortems