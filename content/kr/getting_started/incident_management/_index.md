---
further_reading:
- link: /monitors/incident_management/datadog_clipboard
  tag: 설명서
  text: Datadog 클립보드
- link: https://www.youtube.com/watch?v=QIambwILy_M
  tag: 비디오
  text: Datadog의 Incident Management
- link: /monitors/incident_management
  tag: 설명서
  text: Incident Management
- link: https://www.datadoghq.com/blog/incident-response-with-datadog/
  tag: 블로그
  text: Datadog를 이용한 Incident Management
- link: /monitors/incident_management/notification_rules
  tag: 설명서
  text: 알림 규칙
- link: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
  tag: 설명서
  text: 인시던트와 Slack 통합
- link: https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/
  tag: 블로그
  text: 인시던트 포스트모템(사후 분석) 생성 모범 사례
kind: 설명서
title: Incident Management 시작하기
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">선택하신 Datadog 사이트에서 Incident Management를 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## 개요

Datadog Incident Management는 메트릭, 트레이스 또는 로그에서 발견한 문제를 추적하고 이와 관련해 소통할 때 유용합니다.

이번 가이드에서는 Datadog 앱을 사용하여 인시던트를 선언하고 조사와 복구 진행에 맞추어 인시던트를 업데이트하는 방법, 인시던트가 해결되었을 때 포스트모템(사후 분석)을 생성하는 방법을 알려드리겠습니다. 이번 예시에서는 [Slack 통합][1]이 활성화되어 있다고 전제합니다.

## 문제 탐지부터 해결까지 살펴보는 인시던트 관리 튜토리얼

### 인시던트 선언

**시나리오:** 모니터링 중 오류가 다수 발생하여 여러 서비스의 속도가 저하될 수 있다는 경고가 전송되었습니다. 고객이 오류의 영향을 받았는지는 알 수 없습니다.

이번 가이드에서는 [Datadog 클립보드][2]를 사용해 인시던트를 선언하는 법을 설명합니다.

1. **Ctrl**/**Cmd** + **Shift** + **K** 키를 눌러 클립보드를 엽니다.

   클립보드를 사용하면 그래프, 모니터링, 대시보드 전체 또는 [노트북][3] 등 다양한 소스에서 정보를 수집할 수 있습니다. 이는 인시던트를 선언할 때 최대한 많은 정보를 확보하도록 도와줍니다.

   이번 가이드에서는 _System - Metrics_ 대시보드의 그래프를 선택해 클립보드에 복사하겠습니다.

2. 왼쪽 Datadog 메뉴에서 **Dashboard** > **Dashboard lists**로 이동한 다음 **System - Metrics**를 선택합니다.

3. 그래프 위에 마우스 커서를 올리고 클립보드로 복사합니다.

    a. **Ctrl**/**Cmd** + **C**

   또는

    b. 그래프의 **Export** 아이콘을 클릭하고 **Copy**를 선택합니다.

4. 왼쪽 Datadog 메뉴에서 **Monitors** > **Manage Monitors**로 이동한 다음 **[Auto] Clock in sync with NTP**를 선택합니다.

5. **Add current page**를 클릭해 모니터를 클립보드에 추가합니다.

{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="클립보드로 복사" responsive="true" style="width:100%;">}}

6. **Select All**을 클릭하고 **Add Selected Items To...**를 선택합니다.

7. **New Incident**를 선택합니다.

8. 어떤 상황이 발생했는지 설명합니다.
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 중요도                 | 고객이 오류로 인해 영향을 받았는지, 관련 서비스가 어떤 영향을 받았는지 알 수 없으므로 **Unknown**으로 설정합니다. 각 중요도 수준이 어떤 의미인지 알아보려면 앱 내 설명을 참조하고, 소속 팀의 가이드라인을 따르세요.
| 타이틀                    | 인시던트 타이틀은 팀에서 사용하는 명명 규칙에 따라서 설정합니다. 이번 사례는 실제 인시던트가 아니기 때문에 테스트 인시던트임이 명확하게 드러나도록 `TEST`라는 단어를 포함해보겠습니다. 타이틀 예시: `[TEST] My incident test` |
| 시그널                  | 시그널이란 인시던트를 선언하는 이유를 말합니다. 그래프, 로그, 기타 키 비주얼 등이 이에 해당합니다. 선택한 그래프와 모니터는 이미 포함되어 있지만, 기타 시그널을 추가할 수 있습니다. 예를 들면, 이번 가이드의 URL을 복사하여 **Ctrl**/**Cmd** + **V**로 추가합니다.                     |
| 인시던트 커맨더       | 할당된 대로 두시기 바랍니다. 실제 인시던트가 발생한 경우에는 인시던트 조사를 담당한 리더에게 할당됩니다. 인시던트 진행 상황에 맞추어 인시던트 커맨더를 갱신할 수 있습니다. |
| 추가 알림 | 이번 인시던트는 테스트용이므로, 다른 조직 구성원이나 서비스에 경고를 보내지 않도록 공백으로 둡니다. 실제 인시던트 발생 시에는 조사나 복구를 위해 알려야 할 사람이나 서비스를 추가하세요. 이러한 알림은 Slack이나 PagerDuty에도 발송할 수 있습니다. |

9. **Declare Incident**를 클릭해 인시던트를 생성합니다.

   또한 [그래프][4], [모니터][5], [인시던트 API][6]를 사용해 인시던트를 선언할 수도 있습니다. APM 사용자의 경우 APM 그래프의 **Siren** 아이콘을 클릭하여 인시던트를 선언할 수 있습니다.

   {{< img src="getting_started/incident_management/apm_siren.png" alt="APM 사이렌" responsive="true" style="width:50%;">}}

   Slack 통합의 일환으로서, `/datadog incident` 바로가기를 이용해 인시던트를 선언하고 타이틀, 중요도, 고객에 미치는 영향을 설정할 수도 있습니다.

    인시던트를 생성한 후 상단 오른쪽의 _Notify_ 버튼을 클릭해 부가적으로 알림을 추가할 수 있습니다.

    {{< img src="getting_started/incident_management/notify_button.png" alt="알림" responsive="true" style="width:100%;">}}

10. 인시던트 페이지의 상단 왼쪽에 위치한 **Open Slack Channel**을 클릭해 인시던트의 Slack 채널로 이동합니다.

    {{< img src="getting_started/incident_management/open_slack_channel.png" alt="Slack 채널 열기" responsive="true" style="width:60%;">}}

    새로운 인시던트가 발생하면 해당 인시던트 전용의 신규 Slack 채널이 자동으로 생성됩니다. 이 채널을 사용해 팀과의 커뮤니케이션을 집약적으로 진행하고 트러블슈팅을 시작할 수 있습니다. 소속 조직의 Slack 통합 구성이 글로벌 인시던트 채널을 업데이트하도록 설정된 경우에는 글로벌 채널에 새로운 인시던트가 업데이트됩니다.

    이번 예시에서 새로운 인시던트 채널에 추가된 것은 사용자뿐입니다. 실제로 인시던트가 발생하여 'Additional Notifications'에 사람이나 서비스를 추가하면, 추가된 전원이 자동으로 인시던트 채널에 추가됩니다.

    Slack 통합이 활성화되지 않은 경우 **Link to Chat**을 클릭하여 인시던트와 관련하여 논의할 때 사용하는 채팅 서비스의 링크를 추가하세요.

    또한 **Link Video Call**을 사용하여 인시던트에 대해 논의하는 회의의 링크를 추가할 수도 있습니다.

### 인시던트 트러블슈팅과 업데이트

인시던트 페이지는 크게  _Overview_, _Timeline_, _Remediation_, _Communication_, 이렇게 네 부분으로 나뉩니다. 인시던트 진행 상황에 따라 각 섹션을 업데이트하여 모두에게 현재 상황을 알릴 수 있습니다.

#### 개요

**시나리오:** 몇 가지 조사를 실시한 결과, 근본적인 원인은 호스트의 메모리 부족이라는 사실을 알 수 있었습니다. 또한 고객 일부가 영향을 받고 있으며 페이지를 불러오는 속도가 늦어지고 있다는 정보도 얻었습니다. 15분 전에 첫 번째 고객의 신고가 있었습니다. 인시던트 수준은 SEV-3입니다.

_Overview_ 섹션에서는 조사의 진척에 따라 인시던트 필드와 고객에게 미친 영향을 업데이트할 수 있습니다.

중요도 수준과 근본 원인을 업데이트하는 방법은 다음과 같습니다.

1. **Overview** 탭을 클릭합니다.

2. _Properties_ 상자에서 **Edit**을 클릭합니다.

3. _Severity_ 드롭다운을 클릭하고 **SEV-3**을 선택합니다.

4. _Root Cause_ 항목에 `TEST: Host is running out of memory.`라고 추가합니다.

5. _Detection_ 드롭다운에서 **Monitor**를 선택합니다. 모니터링 중 처음으로 문제 경고를 받은 사람이 사용자이기 때문입니다.

6. **Save**를 클릭해 속성을 업데이트합니다.

   Slack에서 `/datadog incident update` 명령어를 사용하면 타이틀, 중요도 또는 진행 중인 문제의 현황을 업데이트할 수 있습니다.

고객이 받은 영향을 업데이트하는 방법은 다음과 같습니다.

1. _Impact_ 상자에서 **Edit**을 클릭합니다.

2. _Customer impact_ 드롭다운에서 **Yes**를 선택합니다.

3. 타임스탬프를 15분 전으로 변경합니다. 처음으로 고객이 신고한 시점이 15분 전이기 때문입니다.

4. _Scope of impact_를 `TEST: Some customers seeing pages loading slowly.`라고 추가합니다.

5. **Save**를 클릭해 필드를 업데이트합니다.

   인시던트 페이지 상단에는 고객이 얼마나 오래 영향을 받는지 표시됩니다. _Overview_ 페이지의 모든 변경 사항은 _Timeline_에 추가됩니다.

#### 타임라인

_Timeline_은 인시던트 필드의 추가 사항, 변경 사항과 정보를 시계열로 보여줍니다.

1. **Timeline** 탭을 클릭합니다.

    _Content Type_, _Important_, _Responder_ 필터를 사용해 특정 유형의 이벤트를 표시할 수 있습니다.

2. _Customer impact updated_ 이벤트를 찾아, 깃발 모양 아이콘을 클릭해 _Important_로 표시합니다.

    {{< img src="getting_started/incident_management/flag_event.png" alt="깃발 이벤트" responsive="true" style="width:50%;">}}

    이벤트를 _Important_로 표시하여, 인시던트 해결 후 포스트모템을 작성할 때 _Important_로 표시된 타임라인 이벤트만을 포함하기로 선택할 수 있습니다.

3. 타임라인에 `I found the host causing the issue.` 메모를 추가합니다.

4. 메모의 이벤트 위로 커서를 올리고 연필 아이콘을 클릭하면 메모의 타임스탬프가 변경됩니다. 문제의 원인인 호스트를 실제로 찾아낸 시간은 10분 전이기 때문입니다.

    {{< img src="getting_started/incident_management/edit_event_timestamp.png" alt="이벤트 타임스탬프" responsive="true" style="width:90%;">}}

5. 메모를 **Important**로 표시합니다.

6. **Open Slack Channel**을 클릭해 인시던트 Slack 채널로 돌아갑니다.

7. 채널에 `I am working on a fix.`라는 메시지를 게시합니다.

8. 메시지의 동작 명령 아이콘(메시지 위에 커서를 올린 후 오른쪽에 나타나는 말줄임표)을 클릭합니다.

9. **Add to Incident**를 선택해 타임라인에 메시지를 보냅니다.

    {{< img src="getting_started/incident_management/add_from_slack.png" alt="Slack에서 추가" responsive="true" style="width:40%;">}}

    인시던트 채널의 Slack 코멘트를 타임라인에 추가해, 인시던트 조사 및 완화와 관련해 중요한 소통 내역을 한 곳에 모아볼 수 있습니다.

#### 복구

**시나리오:** 문제 해결법을 다룬 노트북이 존재하여, 문제를 해결하기 위해 수행해야 하는 업무가 안내되어 있습니다.

 _Remediation_ 섹션에서는 문제 조사나 인시던트 이후 복원 업무를 위한 문서와 업무를 추적할 수 있습니다.

1. **Remediation** 탭을 클릭합니다.

2. _Documents_ 상자의 더하기 아이콘(+)을 클릭하고 Datadog 노트북으로 연결되는 링크를 추가합니다.

    _Documents_ 섹션의 모든 추가 사항과 업데이트 내역이 _Incident Update_ 유형으로 타임라인에 추가됩니다.

3. _Incident Tasks_ 상자에 업무 설명을 더해 업무를 추가합니다. 예를 들면 `Run the steps in the notebook.`라고 적을 수 있습니다.

4. **Create Task**를 클릭합니다.

5. **Assign To**를 클릭하고 사용자 자신에게 업무를 할당합니다.

6. **Set Due Date**를 클릭하고 날짜를 오늘로 설정합니다.

    모든 업무 추가 사항과 변경 사항은 _Timeline_에 기록됩니다.

    또한, 인시던트 이후 업무를 _Remediation_ 섹션에 추가해 계속 추적할 수 있습니다.

#### 커뮤니케이션

**시나리오:** 문제가 완화되고 팀이 상황을 모니터링 중입니다. 인시던트 상황이 안정적입니다.

_Communications_ 섹션에서 알림을 보내 인시던트 현황을 업데이트할 수 있습니다.

1. _Overview_ 섹션으로 돌아갑니다.

2. _Properties_ 상자의 **Edit**을 클릭하고 상태를 _stable_로 변경합니다.

3. **Save**를 클릭합니다.

4. _Communications_ 탭으로 이동합니다.

5. **New Communication**을 클릭합니다.

    기본 메시지는 인시던트 타이틀을 제목으로 하며, 인시던트 현황에 대한 정보를 본문에 담고 있습니다.

    실제 인시던트 발생 상황에서 인시던트 관계자에게 업데이트 내용을 보낼 수 있습니다. 이번 예시에서는 사용자 자신에게만 알림을 보내도록 하겠습니다.

6. 사용자를 _Add recipients_에 추가합니다.

7. **Send**를 클릭합니다.

    메시지가 담긴 이메일을 받게 됩니다.

    **Manage Templates** > **New Template**을 클릭해 나만의 맞춤형 템플릿을 만들 수 있습니다. _Category_ 필드를 사용해 템플릿으로 그룹으로 묶을 수도 있습니다.

### 해결 및 포스트모템

**시나리오:** 문제가 더 이상 고객에게 영향을 미치지 않으며 문제가 해결되었다는 사실이 확정되었습니다. 팀은 포스트모템을 작성해 무엇이 잘못되었는지 알고자 합니다.

1. _Overview_ 섹션으로 이동합니다.

2. _Impact_ 상자의 **Edit**을 클릭해 고객이 받은 영향을 업데이트합니다.

3. **Active** 스위치를 토글해 더 이상 활성화되지 않도록 합니다.

    또, 고객이 받는 영향이 더 일찍 발생한 경우에는 일시를 변경할 수도 있습니다.

4. _Properties_ 상자의 **Edit**을 클릭해 인시던트 상태를 업데이트합니다.

5. 상태를 _resolved_로 변경합니다.

6. **Save**를 클릭합니다.

    인시던트 상태가 해결됨(resolved)으로 설정되면 _Generate Postmortem_ 버튼이 상단에 표시됩니다.

    {{< img src="getting_started/incident_management/generate_postmortem.png" alt="포스트모템 생성" responsive="true" style="width:80%;">}}

7. **Generate Postmortem**을 클릭합니다.

8. 타임라인 섹션에서 **Marked as Important**를 선택해 _Important_ 이벤트만 포스트모템에 추가되도록 합니다.

9. **Generate**를 생성합니다.

    포스트모템은 Datadog 노트북으로 생성되며 조사 및 복구 시 참조한 타임라인 이벤트와 리소스가 포함됩니다. 이를 통해 문제의 원인과 향후 예방 방법을 쉽게 확인하고 문서화할 수 있습니다. Datadog 노트북은 라이브 협업을 지원하므로, 실시간으로 팀원과 공동 편집할 수 있습니다.

    문제의 재발을 막기 위해 사용자와 소속 팀이 완료해야 하는 후속 작업이 있는 경우, 이를 추가하여 Remediation의 _Incident Tasks_ 섹션에서 추적합니다.

## 인시던트 관리 워크플로우 맞춤 설정하기

Datadog Incident Management에서는 조직의 니즈에 따라 다양한 중요도와 상태 수준을 맞춤 설정할 수 있습니다. 인시던트와 관련된 APM 서비스와 팀을 비롯하여 추가 정보 역시 포함할 수 있습니다. 자세한 정보는 Incident Management 페이지의 [해당 섹션][7]을 참조하시기 바랍니다.

또, 알림 규칙을 설정하여 인시던트의 중요도 수준에 따라 특정인이나 서비스에 자동적으로 알림을 보낼 수도 있습니다. 자세한 정보는 [알림 규칙][8] 문서를 참조하세요.

Incident Management를 사용자 맞춤 설정하려면, [인시던트 설정 페이지][9]로 이동합니다. 왼쪽 Datadog 메뉴에서 **Monitors** > **Incidents**로 이동하세요(Incident Management 환영 화면이 표시된다면 **Get Started**를 클릭합니다). 상단 오른쪽에서 **Settings**를 클릭하세요.

{{< img src="getting_started/incident_management/im_settings_button.png" alt="설정" responsive="true" style="width:100%;">}}

## 모바일에서 인시던트를 생성하고 관리하기

[Apple App Store][11]와 [Google Play Store][12]에서 다운로드할 수 있는 [Datadog 모바일 앱][10]을 사용하면 사용자 Datadog 계정으로 액세스할 수 있는 모든 인시던트 생성, 조회, 검색, 필터링이 가능합니다. Datadog 모바일 앱에서 인시던트를 관리하여 노트북 컴퓨터를 열 필요 없이 빠르게 대응하고 문제를 해결할 수 있습니다.

또한, 인시던트를 선언하고 편집할 수 있으며 Slack, Zoom 등과 통합하여 빠르게 팀원과 소통할 수도 있습니다.

{{< img src="monitors/incidents/incidents-list-mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="모바일 앱의 모니터">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /kr/integrations/slack/
[2]: /kr/monitors/incident_management/datadog_clipboard
[3]: /kr/notebooks/#overview
[4]: /kr/monitors/incident_management/#from-a-graph
[5]: /kr/monitors/incident_management/#from-a-monitor
[6]: /kr/api/latest/incidents/#create-an-incident
[7]: /kr/monitors/incident_management/#status-levels
[8]: /kr/monitors/incident_management/notification_rules
[9]: https://app.datadoghq.com/incidents/settings
[10]: /kr/mobile/
[11]: https://apps.apple.com/app/datadog/id1391380318
[12]: https://play.google.com/store/apps/details?id=com.datadog.app