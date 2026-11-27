---
aliases:
- /ko/service_management/incident_management/zoom_integration/
- /ko/incident_response/incident_management/zoom_integration
description: 클릭 한 번으로 또는 자동으로 Datadog 인시던트에 대한 Zoom 회의를 만들고, AI 회의 요약 및 실시간 녹취록 노트북을
  생성할 수 있습니다.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: 설명서
  text: 인시던트 통합 설정
- link: /integrations/zoom-incident-management/
  tag: 설명서
  text: Zoom Incident Management 통합
- link: /incident_response/incident_management/investigate/meeting_summaries_and_transcripts
  tag: 설명서
  text: 회의 요약 및 녹취록
title: Zoom과 Datadog Incident Management 통합
---
## 개요 {#overview}

Datadog Incident Management용 Zoom 통합을 통해 팀이 인시던트에 대한 Zoom 회의를 시작할 수 있습니다. 사용자가 정의한 기준에 따라 클릭 한 번으로 또는 자동으로 회의를 생성할 수 있습니다. 인시던트 Zoom 회의의 실시간 녹취록 노트북과 AI 요약을 생성할 수도 있습니다.

## 전제 조건 {#prerequisites}

Incident Management의 Zoom 기능을 사용하려면 먼저 [Zoom Incident Management 통합을 설치][1]해야 합니다.

설치 후 **[Incident Response > Incident Management > Settings > Integrations][2]**로 이동하여 Incident Management용 Zoom 기능을 구성하세요.

## Zoom 회의 {#zoom-meetings}

### 원클릭 회의 생성 {#one-click-meeting-creation}

인시던트에 대해 원클릭 Zoom 회의 생성을 활성화하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Zoom**을 선택합니다.
2. **Enable Zoom meeting creation**을 활성화합니다.
3. 설정을 저장합니다.

원클릭 Zoom 회의 생성 기능을 활성화한 후 인시던트 헤더에서 **Create Zoom Meeting**을 클릭하여 회의를 시작합니다. 인시던트 Slack 채널에서 `/zoom` 명령을 실행할 수도 있습니다. 브라우저 또는 Zoom 클라이언트를 통해 회의에 참여하도록 리디렉션됩니다.

Datadog에서는 회의를 생성하는 사용자의 이메일이 호스트 이메일로 사용됩니다. 이 이메일은 권한 있는 Zoom 계정과 연동되어 있어야 합니다. 연동되어 있지 않은데, [폴백 Zoom 사용자](#fallback-zoom-user)가 구성되어 있다면 Datadog에서는 이 사용자를 사용합니다.

### 자동 회의 생성 {#automatic-meeting-creation}

인시던트에 대해 지정한 기준에 따라 Zoom 회의를 자동으로 생성하도록 하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Zoom**을 선택합니다.
2. **Enable Zoom meeting creation**을 활성화합니다.
   1. **Automatically create Zoom meetings**를 켭니다.
   2. (선택 사항) Zoom 회의가 생성되는 인시던트 기준을 지정합니다. 기준을 비워두면 기존 Zoom 회의가 없는 인시던트에 대해 변경 사항이 발생할 때마다 Zoom 회의가 생성됩니다.
3. 설정을 저장합니다.

인시던트가 기준을 충족하면 Datadog은 Incident Commander의 이메일을 호스트 이메일로 사용하여 Zoom 회의를 생성합니다. Incident Commander가 없거나 이메일이 권한 있는 Zoom 계정과 연동되어 있지 않은데 [폴백 Zoom 사용자](#fallback-zoom-user)가 구성되어 있다면 Datadog에서는 이 사용자가 사용됩니다.

**참고**: [테스트 인시던트][3]에서 자동 Zoom 회의 생성을 사용하려면 테스트 인시던트 생성 모달에서 **Execute integrations**를 선택하세요. 그렇지 않으면 Datadog에서 회의가 생성되지 않습니다.

### 폴백 Zoom 사용자 {#fallback-zoom-user}

Datadog이 권한 있는 Zoom 계정에서 호스트 이메일을 확인할 수 없을 때 회의를 호스팅할 폴백 Zoom 사용자를 구성하세요. 예를 들면 다음과 같습니다.

- 회의를 생성하는 Datadog 사용자가 권한 있는 Zoom 계정에 계정을 가지고 있지 않습니다.
- Datadog이 자동으로 회의를 생성할 때 인시던트에 Incident Commander가 없습니다.
- Datadog이 자동으로 회의를 생성할 때 Incident Commander가 권한 있는 Zoom 계정에 계정을 가지고 있지 않습니다.

폴백 Zoom 사용자를 구성하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Zoom**을 선택합니다.
2. **Enable Zoom meeting creation**을 활성화합니다.
3. **Fallback user account** 아래에 권한 있는 Zoom 계정과 연동된 이메일을 입력합니다. 직원이 퇴사할 때 발생하는 문제를 방지하려면 공유 사용자를 사용하세요.
4. (선택 사항) 모든 Zoom 회의의 호스트로 폴백 사용자를 사용하려면 **Always use this account as the meeting host**를 켭니다.
5. 설정을 저장합니다.

### Slack 북마크 {#slack-bookmark}

인시던트의 Zoom 회의를 인시던트 Slack 채널의 북마크에 추가하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Slack**을 선택합니다.
2. **Add important links to the incident channel's bookmarks**를 켭니다.
3. 설정을 저장합니다.

인시던트에 Slack 채널이 있는 경우 Datadog은 해당 채널에 Zoom 회의에 대한 북마크를 추가합니다.

Slack의 추가 기능에 대한 자세한 내용은 [Slack과 Datadog Incident Management 통합][4]을 참조하세요.

### 회의 요약 및 녹취록 {#meeting-summaries}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 Datadog 사이트에서는 회의 요약 및 실시간 회의 녹취록을 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Incident AI는 인시던트 Zoom 회의의 요약을 생성하고 필요시 실시간 회의 녹취록을 Datadog 노트북에 저장할 수 있습니다.

<div class="alert alert-info">회의 요약이 활성화되면 Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">하위 프로세서</a>가 회의 오디오를 녹음하고 전사합니다. 보존 세부 정보는 회의 요약 및 녹취록의 <a href="/incident_response/incident_management/investigate/meeting_summaries_and_transcripts/#retention-and-deletion">보존 및 삭제</a>를 참조하세요.</div>

#### 전제 조건 {#prerequisites-1}

- 조직에서 AI 기능을 활성화해야 합니다.
- 인시던트 설정을 편집할 권한이 있는 계정을 사용해야 합니다.
- 실시간 회의 녹취록을 저장하려면 조직에 실시간 회의 녹취록에 대한 액세스 권한이 있어야 합니다. **Generate meeting transcripts** 설정을 사용할 수 없는 경우 [Datadog 지원팀][5]에 문의하세요.
- Incident AI가 요약을 생성할 수 있도록 Zoom에서 회의 자막을 활성화해야 합니다.

#### 회의 요약 및 녹취록 활성화 {#enable-meeting-summaries-and-transcripts}

인시던트 Zoom 회의에 대한 회의 요약 및 녹취록을 활성화하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Zoom**을 선택합니다.
2. **Enable Zoom meeting creation**을 활성화합니다.
3. **Generate AI meeting summaries**를 활성화합니다.
4. (선택 사항) 실시간 회의 녹취록을 저장하려면 **Generate meeting transcripts**를 켭니다. 이 설정은 **Generate AI meeting summaries** 아래에 표시됩니다.
5. (선택 사항) 특정 인시던트에 대한 요약을 방지하기 위한 조건을 추가합니다.
6. 설정을 저장합니다.

요약을 검토하고, 녹취록을 확인하고, 녹취록 노트북 액세스를 관리하고, 녹취 담당자를 다시 초대하려면 [회의 요약 및 녹취록][6]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/zoom-incident-management/
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /ko/incident_response/incident_management/guides/test_incidents
[4]: /ko/incident_response/incident_management/setup_and_configuration/integrations/slack
[5]: /ko/help/
[6]: /ko/incident_response/incident_management/investigate/meeting_summaries_and_transcripts