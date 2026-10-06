---
aliases:
- /ko/service_management/incident_management/integrations/microsoft_teams/
- /ko/incident_response/incident_management/integrations/microsoft_teams/
description: Microsoft Teams를 Datadog Incident Management와 통합하여 인시던트 채널 생성을 자동화하고,
  메시지를 동기화하며, Microsoft Teams 내에서 팀과 직접 협업하세요.
further_reading:
- link: /incident_response/incident_management/setup_and_configuration/integrations
  tag: 문서
  text: 인시던트 통합 설정하기
- link: /integrations/microsoft-teams
  tag: 문서
  text: Microsoft Teams 통합
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: 블로그
  text: Datadog Incident Response의 AI로 조사 가속화하기
title: Microsoft Teams와 Datadog Incident Management 통합하기
---
## 개요 {#overview}

Datadog Incident Management용 Microsoft Teams 통합을 사용하면 Microsoft Teams 내에서 바로 인시던트를 선언하고 관리하며, 인시던트 채널을 자동으로 생성하고, 메시지를 타임라인에 동기화하며, 팀에 정보를 계속 제공할 수 있습니다.

## 전제 조건 {#prerequisites}

Incident Management의 Microsoft Teams 기능을 사용하려면 먼저 [Datadog용 Microsoft Teams 통합을 설치][1]하고 Microsoft Teams 계정을 Datadog 계정에 연결해야 합니다.

설치 후 **[Incident Response > Incident Management > Settings > Integrations][2]**로 이동하여 Incident Management용 Microsoft Teams 기능을 구성합니다.

## 인시던트 채널 {#incident-channels}

### 자동 채널 생성 {#automatic-channel-creation}

Incident Management를 구성하여 각 인시던트 또는 정의한 기준을 충족하는 인시던트에 대해 인시던트 Microsoft Teams 채널을 자동으로 생성할 수 있습니다. 자동 인시던트 채널 생성을 설정하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Microsoft Teams**를 선택합니다.
2. **Tenant** 드롭다운에서 연결된 Microsoft Teams 테넌트를 선택합니다.
3. **Automatically create a Microsoft Teams channel for every incident**를 활성화합니다.
4. 새 채널을 자동으로 생성할 팀을 선택합니다.
5. 설정을 저장합니다.

이 자동화를 활성화한 후, Datadog이 채널을 생성할 때 따를 **채널 이름 템플릿**을 정의할 수 있습니다. 전체 설명은 [채널 이름 템플릿에서만 사용 가능한 변수][6]를 참조하세요.

### 채널 메시지 동기화 {#channel-message-syncing}

Incident Management를 구성하여 모든 인시던트 Microsoft Teams 채널 메시지를 인시던트 타임라인으로 전송할 수 있습니다. 활성화하려면 **Automatically push Microsoft Teams channel messages to the incident timeline**을 활성화하세요.

동기화된 메시지의 작성자는 메시지를 기록하는 데 Incident Management 또는 Incident Response 시트가 필요하지 않습니다. Incident Management에 사용량 기반 요금제가 적용되는 조직의 경우, 작성자는 월간 활성 사용자로 집계되지 않습니다.

### 자동 채널 보관 {#automatic-channel-archiving}

인시던트가 해결된 후 인시던트 채널을 자동으로 보관하도록 Incident Management를 구성할 수 있습니다.

## 인시던트 업데이트를 위한 전역 채널 {#global-channel-for-incident-updates}

인시던트 업데이트 채널을 사용하여 이해관계자가 Microsoft Teams에서 직접 조직 전체의 모든 인시던트 상태를 확인할 수 있도록 하세요.
1. [**Settings > Integrations**][2]로 이동하여 **Microsoft Teams**를 선택합니다.
1. Microsoft Teams 통합에서 **Send all incident updates to a global channel**을 활성화합니다.
1. 인시던트 업데이트를 게시할 팀과 채널을 선택합니다.

Datadog은 새로 선언된 인시던트와 인시던트 상태, 중증도 및 인시던트 커맨더의 변경 사항에 대한 알림을 선택된 채널에 자동으로 전송합니다.

이 동작을 사용자 지정하려면 이 설정을 비활성화하고 대신 [알림 규칙을 정의][4]하세요.

## Microsoft Teams 알림 대상 {#microsoft-teams-notification-targets}

[알림 규칙][4]은 `@teams-<channel>` 핸들을 사용하여 Microsoft Teams 채널을 대상으로 지정하며, 핸들에 지정된 특정 채널로 알림을 보냅니다. 이 기능을 사용하여 전역 인시던트 업데이트 채널과 같은 상시 채널에 알림을 보낼 수 있습니다.

Incident Management는 인시던트별로 자동 생성된 채널에 매핑되는 핸들을 제공하지 않습니다. Slack 알림 규칙은 `@incident-slack-channel`을 사용하여 인시던트의 Slack 채널에 알림을 보낼 수 있지만, Microsoft Teams에는 이에 상응하는 핸들이 없습니다. 결과적으로 `@-mentions`를 포함하는 알림 규칙은 인시던트별 채널이 아닌 `@teams-` 핸들에 지정된 채널로 알림을 전달합니다.

대응 담당자에게 인시던트 전용 채널에서 정보를 계속 제공하려면 해당 채널 내에서 Datadog 탭과 `@Datadog` 명령을 사용하세요. [채널 메시지 동기화](#channel-message-syncing)가 활성화되면 채널과 동기화되는 인시던트 타임라인에 업데이트를 게시할 수도 있습니다.

## Microsoft Teams 회의 {#microsoft-teams-meetings}

### 원클릭 회의 생성 {#one-click-meeting-creation}

원클릭 Microsoft Teams 회의를 사용하려면 위임된 권한이 필요합니다. 인시던트에 대해 원클릭 Microsoft Teams 회의를 활성화하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Microsoft Teams**를 선택합니다.
2. Microsoft Teams에서 연결된 Microsoft Teams 테넌트를 선택합니다.
3. **Enable meeting creation**을 활성화합니다.
4. 설정을 저장합니다.

원클릭 Microsoft Teams 회의를 활성화한 후, 인시던트 헤더에서 **Start Teams Meeting**을 클릭하여 회의를 시작하세요. 브라우저에서 즉시 회의에 참여할 수 있도록 리디렉션됩니다.

### 자동 회의 생성 {#automatic-meeting-creation}

기준 기반의 자동 Microsoft Teams 회의를 위해서는 위임된 권한이 필요합니다. 인시던트에 대해 기준 기반의 자동 Microsoft Teams 회의를 활성화하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Microsoft Teams**를 선택합니다.
2. Microsoft Teams에서 연결된 Microsoft Teams 테넌트를 선택합니다.
3. **Enable meeting creation**을 활성화합니다.
   1. **Automatically create Microsoft Teams meetings**를 활성화합니다.
   2. (선택 사항) Microsoft Teams 회의를 생성할 인시던트 기준을 지정합니다. 비워 두면 기존 Microsoft Teams 회의가 없는 인시던트에 변경 사항이 있을 때마다 Microsoft Teams 회의가 생성됩니다.
4. 설정을 저장합니다.

### 회의 메시지 동기화 {#meeting-message-sync}
Incident Management에서 모든 인시던트 Microsoft Teams 회의 메시지를 인시던트 타임라인으로 전송하도록 구성할 수 있습니다. 활성화하려면 **Sync meeting chat to incident timeline**을 활성화하세요.

동기화된 메시지의 작성자는 메시지를 기록하는 데 Incident Management 또는 Incident Response 시트가 필요하지 않습니다. Incident Management에 사용량 기반 요금제가 적용되는 조직의 경우, 작성자는 월간 활성 사용자로 집계되지 않습니다.

### 회의 요약 {#meeting-summaries}

AI 생성 회의 요약을 활성화하여 인시던트 Microsoft Teams 회의를 자동으로 요약합니다. 회의 중에 실시간 요약이 인시던트 타임라인과 인시던트 채팅 채널에 주기적으로 게시됩니다. 회의가 종료되면 최종 회의 후 요약이 게시됩니다.

<div class="alert alert-info">회의 요약이 활성화되면 회의 오디오가 녹음되고 Datadog <a href="https://www.datadoghq.com/legal/subprocessors/">하위 프로세서</a>에 의해 전사됩니다. 7일의 보존 기간이 지나면 모든 데이터가 자동으로 삭제됩니다.</div>

인시던트 Microsoft Teams 회의에 대해 회의 요약을 활성화하려면 다음 단계를 따르세요.

1. [**Settings > Integrations**][2]로 이동하여 **Microsoft Teams**를 선택합니다.
2. Microsoft Teams에서 연결된 Microsoft Teams 테넌트를 선택합니다.
3. **Enable meeting creation**을 활성화합니다.
4. **Generate AI meeting summaries**를 활성화합니다.
5. (선택 사항) 특정 인시던트에 대한 요약을 방지하기 위한 조건을 추가합니다. 기본적으로 비공개 인시던트에 대한 회의는 요약되지 않습니다.
6. 설정을 저장합니다.

인시던트에 첨부된 Microsoft Teams 회의에 대해 회의 요약이 생성됩니다. 회의가 시작되면 Datadog Transcriber가 Microsoft Teams 회의에 참여를 시도합니다. 이 작업은 10~30초 정도 걸릴 수 있습니다. 회의 참가자가 회의 대기실에서 Datadog Transcriber를 승인해야 전사가 시작될 수 있습니다. Datadog Transcriber가 승인된 후, 회의 중에 다음 위치에 실시간 요약이 주기적으로 게시됩니다.

- **인시던트 타임라인**의 **회의 요약** 항목 아래에 게시됩니다.
- **인시던트 채팅 채널**의 회의 카드 스레드 및 채널 메시지 모두에 게시됩니다.

회의가 종료되면 최종 회의 후 요약이 동일한 위치에 게시됩니다.

## Microsoft Teams에서 Datadog 탭 사용{#using-the-datadog-tab-in-microsoft-teams}

인시던트 채널(인시던트를 위해 특별히 생성된 채널)에서 Datadog 탭은 해당 인시던트의 정보를 표시하며 이를 관리할 수 있게 합니다. 인시던트가 아닌 채널에서는 새로운 인시던트만 선언할 수 있습니다.

### 인시던트 선언 및 관리{#declaring-and-managing-incidents}

특정 팀에서 인시던트를 선언하려면 다음 단계를 따르세요.
1. 팀에 [Datadog 애플리케이션을 추가][3]합니다.
1. **인시던트가 아닌** 채널에서 **Datadog** 탭을 클릭합니다.
1. 인시던트 세부 정보를 입력하고 **Declare Incident**를 클릭합니다.

특정 팀에서 인시던트를 관리하려면 다음 단계를 따르세요.
1. **인시던트 채널**에서 **Datadog** 탭을 클릭합니다.
1. 인시던트 세부 정보 및 속성을 편집합니다.

### 타임라인으로 메시지 전송{#sending-messages-to-the-timeline}

인시던트 팀 내 메시지 오른쪽 끝에 있는 'More actions' 메뉴를 사용하여 해당 메시지를 인시던트 타임라인으로 전송하세요.

## Microsoft Teams 명령어{#microsoft-teams-commands}

사용 가능한 `@Datadog` 명령의 전체 목록은 [Microsoft Teams 통합 문서][5]를 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/microsoft-teams/?tab=datadogapprecommended
[2]: https://app.datadoghq.com/incidents/settings?section=integrations
[3]: /ko/integrations/microsoft-teams/?tab=datadogapprecommended#datadog-incident-management-in-microsoft-teams
[4]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules
[5]: /ko/integrations/microsoft-teams/#datadog-incident-management-in-microsoft-teams
[6]: /ko/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates