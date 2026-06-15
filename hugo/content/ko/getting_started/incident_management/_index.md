---
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-incident-management
  tag: 학습 센터
  text: 인시던트 관리 소개
- link: /service_management/incident_management/datadog_clipboard
  tag: 설명서
  text: Datadog 클립보드
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: 비디오
  text: Datadog의 Incident Management
- link: /monitors/incident_management
  tag: 설명서
  text: Incident Management
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여하여 인시던트 관리 개선
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: 블로그
  text: Datadog를 이용한 인시던트 관리
- link: /service_management/incident_management/incident_settings
  tag: 설명서
  text: 알림 규칙
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: 설명서
  text: 인시던트와 Slack 통합
- link: https://www.datadoghq.com/blog/pair-programming-coscreen-datadog/
  tag: 블로그
  text: Datadog CoScreen과 더욱 효율적인 페어 프로그래밍
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: 블로그
  text: 인시던트 사후 분석 쓰기 모범 사례
- link: https://www.datadoghq.com/blog/how-datadog-manages-incidents/
  tag: 블로그
  text: Datadog의 인시던트 관리 방법
title: Incident Management 시작하기
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">선택하신 Datadog 사이트 ({{< region-param key="dd_site_name" >}})에서 Incident Management를 사용할 수 없습니다.</div>
{{% /site-region %}}

## 개요

Datadog Incident Management는 메트릭, 트레이스, 로그를 통해 식별한 문제를 추적하고 전달합니다. 

이 가이드에서는 Datadog 사이트를 사용하여 인시던트를 선언하고, 조사가 진행됨에 따라 인시던트를 업데이트하며, 해결 후 사후 분석을 생성하는 과정을 안내합니다. 이 예에서는 [Slack 통합][1]이 활성화된 것으로 가정합니다.

## 문제 탐지부터 해결까지 살펴보는 인시던트 관리 튜토리얼

### 인시던트 선언

**시나리오:** 모니터링 중 오류가 다수 발생하여 여러 서비스의 속도가 저하될 수 있다는 경고가 전송되었습니다. 고객이 오류의 영향을 받았는지는 알 수 없습니다.

이 가이드에서는 [Datadog Clipboard][2]를 사용하여 인시던트을 선언하는 방법을 설명합니다. 클립보드를 사용하면 그래프, 모니터, 전체 대시보드, [노트북][3] 등 다양한 소스에서 정보를 수집할 수 있습니다. 이를 통해 인시던트를 선언 시 최대한 많은 정보를 제공할 수 있습니다.

1. Datadog에서 [**대시보드 목록**][15]으로 이동하여 **시스템 - 메트릭**을 선택합니다.
2. 그래프 중 하나 위에 마우스를 놓고 다음 명령 중 하나를 사용하여 Clipboard에 복사합니다.
    - **Ctrl**/**Cmd** + **C**
    - 그래프에서 **Export** 아이콘을 클릭하고 **Copy**를 선택합니다.
3. 왼쪽 Datadog 메뉴에서 [**모니터** > **모니터 목록**][16]로 이동하여 **[자동] NTP를 사용해 동기화에서 클로킹**를 선택합니다.
4. **Ctrl**/**Cmd** + **Shift** + **K** 키를 눌러 클립보드를 엽니다.
5. 클립보드에서 **Add current page**를 클릭하여 클립보드에 모니터를 추가합니다.
{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Clipboard에 복사" 리스폰시브="true" style="width:100%;">}}
6. **Select All**을 클릭한 다음 **Export items to...**
7. **Declare Incident**를 선택합니다.
8. 진행 상황 설명:
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 타이틀                    | 인시던트 타이틀은 팀에서 사용하는 명명 규칙에 따라서 설정합니다. 이번 사례는 실제 인시던트가 아니기 때문에 테스트 인시던트임이 명확하게 드러나도록 `TEST`라는 단어를 포함해보겠습니다. 타이틀 예시: `[TEST] My incident test` |
| 심각도 수준           | 고객이 영향을 받는지, 관련 서비스가 어떤 영향을 받는지 확실하지 않으므로 **Unknown**으로 설정합니다. 각 심각도 수준의 의미에 대한 앱 내 설명을 확인하고 팀의 지침을 따르세요.       |
| 인시던트 커맨더       | 할당된 대로 두시기 바랍니다. 실제 인시던트가 발생한 경우에는 인시던트 조사를 담당한 리더에게 할당됩니다. 인시던트 진행 상황에 맞추어 인시던트 커맨더를 갱신할 수 있습니다. |
9. **Declare Incident**를 클릭해 인시던트를 생성합니다.
   [그래프][4], [모니터][5] 또는 [인시던트 API][6]에서 인시던트를 선언할 수도 있습니다. APM 사용자의 경우 APM 그래프에서 인시던트 아이콘을 클릭하여 선언할 수 있습니다.
Slack 통합의 일부로 `/datadog incident` 바로가기를 사용하여 인시던트를 선언하고 제목, 심각도 및 고객에 미치는 영향을 설정할 수도 있습니다.
10. 인시던트의 Slack 채널로 이동하려면 인시던트 페이지에서 **Slack Channel**을 클릭하세요.

새로운 인시던트에 대해 전용 Slack 채널이 자동으로 생성되므로 팀과의 커뮤니케이션을 통합하고 문제 해결을 시작할 수 있습니다. 조직의 Slack 통합이 글로벌 인시던트 채널을 업데이트하도록 설정된 경우 채널은 새 인시던트로 업데이트됩니다.

Slack 통합을 활성화하지 않은 경우 **Add Chat**를 클릭하여 인시던트에 대해 논의 중인 채팅 서비스의 링크를 추가하세요.

인시던트에 대해 논의 중인 통화의 링크를 추가하려면 **Add Video Call**을 클릭하세요.

### 인시던트 트러블슈팅과 업데이트

인시던트 페이지에는 _Overview_, _Timeline_, _Remediation_, _Notifications_의 4가지 주요 섹션이 있습니다. 인시던트가 진행됨에 따라 이 섹션을 업데이트하여 모든 사용자에게 현재 상태를 알려줍니다.

#### 개요

**시나리오:** 몇 가지 조사를 실시한 결과, 근본적인 원인은 호스트의 메모리 부족이라는 사실을 알 수 있었습니다. 또한 고객 일부가 영향을 받고 있으며 페이지를 불러오는 속도가 늦어지고 있다는 정보도 얻었습니다. 15분 전에 첫 번째 고객의 신고가 있었습니다. 인시던트 수준은 SEV-3입니다.

_Overview_ 섹션에서는 조사의 진척에 따라 인시던트 필드와 고객에게 미친 영향을 업데이트할 수 있습니다.

중요도 수준과 근본 원인을 업데이트하는 방법은 다음과 같습니다.
1. _Severity_ 드롭다운을 클릭하고 **SEV-3**을 선택합니다.
2. 모니터가 이슈에 대한 알림을 보냈으므로 _What happened_의 _Detection Method_ 드롭다운(Unknown이 선택됨)에서 **Monitor** 를 선택하세요.

1. _Why it happened_ 필드에 추가: `TEST: Host is running out of memory.`
4. **Save**를 클릭해 속성을 업데이트합니다.
   Slack에서 `/datadog incident update` 명령을 사용하여 진행 중인 이슈의 제목, 심각도, 상태를 업데이트할 수도 있습니다.

고객에 미치는 영향을 추가하려면:
1. _Impact_ 섹션에 있는 **+ Add**를 클릭하세요.
2. 타임스탬프를 15분 전으로 변경합니다. 처음으로 고객이 신고한 시점이 15분 전이기 때문입니다.
3. 설명 필드 추가: `TEST: Some customers seeing pages loading slowly.`
4. **Save**를 클릭하여 필드를 업데이트합니다. 고객에게 영향을 미친 시간을 표시하기 위해 _Impact_섹션이 업데이트되며, _Overview_페이지에서 변경된 내용은 모두 _Timeline_에 추가됩니다.

#### 타임라인

_Timeline_은 인시던트 필드의 추가 사항, 변경 사항과 정보를 시계열로 보여줍니다.

{{< img src="getting_started/incident_management/flag_event.png" alt="Flag Event" 리스폰시브="true" style="width:50%;">}}

1. **Timeline** 탭을 클릭합니다.
2. _Impact added_이벤트를 찾은 후 플래그 아이콘을 클릭하여 _Important_로 표시합니다.
3. 타임라인에 `I found the host causing the issue.` 메모를 추가합니다.
4. 메모의 이벤트 위로 커서를 올리고 연필 아이콘을 클릭하면 메모의 타임스탬프가 변경됩니다. 문제의 원인인 호스트를 실제로 찾아낸 시간은 10분 전이기 때문입니다.
5. 노트에 **Important**로 플래그를 지정합니다.
6. **Slack Channel**을 클릭하여 인시던트의 Slack 채널로 돌아갑니다.
7. 채널에 `I am working on a fix.`라는 메시지를 게시합니다.
8. 메시지의 동작 명령 아이콘(메시지 위에 커서를 올린 후 오른쪽에 나타나는 말줄임표)을 클릭합니다.
9. **Add to Incident**를 선택해 타임라인에 메시지를 보냅니다.

{{< img src="getting_started/incident_management/add_from_slack.png" alt="Add from Slack" 리스폰시브="true" style="width:40%;">}}

인시던트 채널의 Slack 댓글을 타임라인에 추가하면 인시던트에 대한 중요한 커뮤니케이션을 통합할 수 있습니다.

#### 복구

**시나리오:** 이러한 문제를 다루고 해결하는 방법에 대한 노트북이 있습니다.

 _Remediation_ 섹션에서는 문제 조사나 인시던트 이후 복원 업무를 위한 문서와 업무를 추적할 수 있습니다.

1. **Remediation** 탭을 클릭합니다.
2. _Documents_ 상자에서 `+` 아이콘을 클릭하고 [Datadog 노트북][7]에 대한 링크를 추가합니다. _Documents_ 섹션에 대한 모든 업데이트는 _Incident Update_ 유형으로 타임라인에 추가됩니다.
3. _Incident Tasks_ 상자에 설명을 작성하고 작업을 추가합니다. 예: `Run the steps in the notebook.`
4. **Create Task**를 클릭합니다.
5. **Assign To**를 클릭하고 사용자 자신에게 업무를 할당합니다.
6. **Set Due Date**를 클릭하고 날짜를 오늘로 설정합니다.
    모든 업무 추가 사항과 변경 사항은 _Timeline_에 기록됩니다.
    또한, 인시던트 이후 업무를 _Remediation_ 섹션에 추가해 계속 추적할 수 있습니다.

#### 알림

**시나리오:** 문제가 완화되고 팀이 상황을 모니터링 중입니다. 인시던트 상황이 안정적입니다.

_Notifications_섹션에서 인시던트 상태를 업데이트하는 알림을 발송할 수 있습니다.

1. _Overview_ 섹션으로 돌아갑니다.
2. 드롭다운 메뉴의 상태를 _ACTIVE_에서 _STABLE_로 변경합니다.
4. _Notifications_탭으로 이동합니다.
5. **New Notification**를 클릭합니다.
    기본 메시지는 인시던트 타이틀을 제목으로 하며, 인시던트 현황에 대한 정보를 본문에 담고 있습니다.
    실제 인시던트 발생 상황에서 인시던트 관계자에게 업데이트 내용을 보낼 수 있습니다. 이번 예시에서는 사용자 자신에게만 알림을 보내도록 하겠습니다.
6. _Recipients_ 필드에 해당 사용자를 추가합니다.
7. **Send**를 클릭합니다.
    메시지가 담긴 이메일을 받게 됩니다.
    사용자 정의 [메시지 템플릿][8]을 만들 수 있습니다. _Category_필드를 사용하여 템플릿을 함께 그룹화합니다.

### 해결 및 사후 분석

**시나리오:** 문제가 더 이상 고객에게 영향을 미치지 않으며 해결된 것으로 확인되었습니다. 팀에서는 사후 분석을 통해 무엇이 잘못되었는지 검토하고자 합니다.

1. _Overview_ 섹션으로 이동합니다.
3. 더 이상 활성화되지 않도록 상태를 _STABLE_에서 _RESOLVED_로 변경합니다. 고객에 미치는 영향이 더 일찍 발생한 경우 종료된 날짜와 시간을 변경할 수도 있습니다.
7. 인시던트의 상태가 해결로 설정되면 맨 위에 _Generate Postmortem_ 버튼이 나타납니다. **Generate Postmortem**을 클릭하세요.
8. 타임라인 섹션에서 **Marked as Important** 를 선택하면 _Important__ 이벤트만 사후 분석에 추가됩니다.
9. **Generate**를 생성합니다.

사후 분석은 Datadog Notebook으로 생성되며 조사 및 수정 중에 참조되는 타임라인 이벤트와 리소스가 포함됩니다. 이렇게 하면 문제의 원인과 향후 문제를 방지하는 방법을 더 쉽게 검토하고 문서화할 수 있습니다. Datadog Notebook은 실시간 협업을 지원하므로 팀원과 실시간으로 편집할 수 있습니다.

문제가 다시 발생하지 않도록 팀이 완료해야 하는 후속 작업이 있는 경우 이를 Remediation의 _Incident Tasks_ 섹션에 추가하고 추적합니다.

{{< img src="getting_started/incident_management/generate_postmortem.png" alt="Postmortem 생성" 리스폰시브="true" style="width:80%;">}}
## 인시던트 관리 워크플로우 맞춤 설정하기

Datadog Incident Management는 조직의 요구 사항에 따라 다양한 심각도 및 상태 수준으로 맞춤 설정할 수 있습니다. 사고와 관련된 APM 서비스 및 팀과 같은 추가 정보도 포함할 수 있습니다. 자세한 내용은 Incident Management 페이지의 해당 [섹션][9]을 참조하세요.

또한 인시던트의 심각도 수준에 따라 특정 사람이나 서비스에 자동으로 알리도록 알림 규칙을 설정할 수도 있습니다. 자세한 내용은 [Incident Settings][10] 문서를 참조하세요.

Incident Management를 맞춤 설정하려면 [Incident Settings 페이지][11]로 이동합니다. 그런 다음 왼쪽의 Datadog 메뉴에서 **Monitors** > **Incidents**로 이동합니다(Incident Management 시작 화면이 나타나면 **Get Started** 클릭). 그리고**Settings**를 클릭합니다.

## 모바일에서 인시던트를 생성하고 관리하기

[Apple App Store][13] 및 [Google Play Store][14]에서 제공되는 [Datadog 모바일 앱][12]을 사용하면 액세스 가능한 모든 사건을 생성, 확인, 검색 및 필터링할 수 있습니다. Datadog 모바일 앱의 Datadog 계정을 통해 컴퓨터를 사용하지 않고도 빠르게 응답하고 해결할 수 있습니다.

또한 Slack, Zoom 등과의 통합을 통해 인시던트를 선언 및 편집하고, 팀과 빠르게 커뮤니케이션할 수 있습니다.

{{< img src="service_management/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="모바일 앱에서의 모니터링">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/slack/
[2]: /ko/service_management/incident_management/datadog_clipboard
[3]: /ko/notebooks/#overview
[4]: /ko/service_management/incident_management/#from-a-graph
[5]: /ko/service_management/incident_management/#from-a-monitor
[6]: /ko/api/latest/incidents/#create-an-incident
[7]: https://app.datadoghq.com/notebook/list
[8]: https://app.datadoghq.com/incidents/settings#Messages
[9]: /ko/service_management/incident_management/#status-levels
[10]: /ko/service_management/incident_management/incident_settings
[11]: https://app.datadoghq.com/incidents/settings
[12]: /ko/mobile/
[13]: https://apps.apple.com/app/datadog/id1391380318
[14]: https://play.google.com/store/apps/details?id=com.datadog.app
[15]: https://app.datadoghq.com/dashboard/lists
[16]: https://app.datadoghq.com/monitors/manage