---
aliases:
- /ko/service_management/incident_management/integrations/slack/
- /ko/incident_response/incident_management/integrations/slack/
description: Slack에서 바로 Datadog 인시던트를 관리하세요.
further_reading:
- link: integrations/slack/
  tag: 설명서
  text: Slack 통합 설치
- link: https://www.datadoghq.com/blog/slack-incident-management/
  tag: 블로그
  text: Slack용 Datadog 통합을 사용하여 원활하게 인시던트 관리
- link: https://www.datadoghq.com/blog/datadog-incident-response-ai-features/
  tag: 블로그
  text: Datadog Incident Response의 AI로 조사 가속화
- link: https://app.datadoghq.com/integrations/slack
  tag: 앱
  text: 인앱 Slack 통합 타일
title: Slack과 Datadog Incident Management 통합
---
## 개요 {#overview}

Slack은 팀 차원의 실시간 소통을 위해 널리 사용되는 메시지 및 협업 플랫폼입니다. Datadog Slack 통합은 인시던트 대응 워크플로를 Slack에 바로 연결해 주므로 팀이 채팅 환경을 벗어나지 않고도 인시던트를 선언, 관리 및 해결할 수 있습니다.

통합을 통해 다음이 가능해집니다.

- Slack에서 바로 Datadog 인시던트를 선언하여 더 빠르게 대응합니다.
- Datadog 인시던트가 선언되면 협업을 위한 Slack 채널이 자동으로 생성됩니다.
- Slack에서 인시던트 대응을 실시합니다. 예를 들어, 온 콜 팀을 페이징하거나, 대응자 역할을 할당하거나, 심각도를 업데이트합니다.

Slack 통합 설명서는 Incident Management와 함께 Slack을 사용하는 일반적인 수명 주기를 중심으로 구성되어 있습니다.

1. [**Slack 설치 및 연결**](#setup): Slack 작업 공간과 Datadog 간의 통합을 설정하세요.
2. [**인시던트 선언**](#declaring-incidents-from-slack): Slack 명령 또는 메시지 액션을 사용하여 인시던트를 시작하는 방법을 알아보세요.
3. [**인시던트 채널에서 인시던트 관리**](#incident-channels): 명령, 동기화 및 자동화가 포함된 전용 Slack 채널을 사용하세요.
4. [**전역 알림 구성**](#global-slack-notifications): 자동 업데이트를 통해 조직에 정보를 계속 제공하세요.
5. **[Slack 구성 옵션](#additional-slack-configurations) 및 [Slack 명령](#slack-incident-commands)** 참조: 상세 구성 옵션을 살펴보고 사용 가능한 Slack 명령의 전체 목록을 확인하여 인시던트 대응 워크플로를 조정하고 간소화하세요.

## 전제 조건 {#prerequisites}

적절한 [OAuth 범위][6]를 사용하여 [Slack 통합 타일][1]을 통해 통합을 설치하세요. 자세한 내용은 [Slack 통합][2] 설명서를 참조하세요.

통합이 설치된 후 [**Incidents** > **Settings** > **Integrations**][3]로 이동하여 Incident Management를 위한 Slack 기능을 활성화하세요.

## Slack에서 인시던트 선언 {#declaring-incidents-from-slack}

Slack 작업 공간을 Datadog 조직에 연결하면 작업 공간 내 사용자가 Incident Management와 관련된 Slack 바로가기를 사용할 수 있습니다.

다음 슬래시 명령을 사용하여 인시던트를 선언할 수 있습니다.

```
/datadog incident
```

Slack 메시지에서 인시던트를 선언하려면 메시지 위에 마우스를 올리고 **More actions**(세 개의 수직 점)를 클릭한 다음 **Declare incident**를 선택하세요. Datadog은 인시던트 생성을 확인하는 메시지를 해당 메시지의 스레드에 게시합니다.

기본적으로 Datadog 조직에 연결된 Slack 사용자만 인시던트를 선언할 수 있습니다. Slack 사용자는 `/datadog connect`를 실행하여 Datadog 조직에 연결할 수 있습니다.

작업 공간 내 모든 Slack 사용자가 인시던트를 선언할 수 있도록 허용하려면 Incident Management 설정에서 **Allow Slack users to declare incidents without a connected Datadog account**를 활성화하세요.

## 인시던트 채널 {#incident-channels}

사용자가 정의한 기준을 충족하는 각 인시던트에 대해 전용 Slack 채널을 자동으로 생성하도록 Incident Management를 구성할 수 있습니다. 그러면 대응자가 Slack 내 인시던트 채널에서 바로 인시던트를 관리할 수 있습니다.

인시던트 채널을 사용하려면 **[Incident Response > Incident Management > Settings > Integrations][3]**로 이동하고 **Create Slack channels for incidents**를 활성화하세요.

정의한 **채널 이름 템플릿**에 따라 Datadog이 생성하는 인시던트 채널의 이름이 결정됩니다. 전체 설명은 [채널 이름 템플릿에서만 사용 가능한 변수][7]를 참조하세요.


### 메시지 동기화(Slack 미러링) {#message-syncing-slack-mirroring}

자동 채널 생성을 활성화한 후 인시던트 Slack 채널과 Datadog의 인시던트 타임라인 간에 메시지를 동기화하도록 Incident Management를 구성할 수 있습니다.

동기화를 활성화하려면 Incident Management 설정에서 **Push Slack channel messages to the incident timeline**을 활성화하고 다음 옵션 중 하나를 선택하세요.

* **Mirror all messages in real-time**: Slack 사용자가 인시던트 채널에 게시한 모든 메시지를 Datadog이 동기화합니다.
* **Push message when 📌 is added as a reaction**: Slack 사용자가 푸시핀(📌)으로 반응할 때만 Datadog이 메시지를 동기화합니다.

두 옵션 모두 Datadog이 메시지를 동기화하기 위해 메시지 작성자가 Datadog 조직에 연결되어 있을 필요가 없습니다. 메시지 고정의 경우, 메시지를 고정하는 사람이 Datadog 조직에 **연결되어 있어야** 고정된 메시지가 동기화됩니다.

사용량 기반 Incident Management 청구가 적용되는 조직:

* Datadog에 동기화되는 메시지를 작성해도 작성자가 해당 월에 청구 가능한 사용자가 되지 **않습니다**.
* 이후에 동기화되는 메시지를 고정하면 사용자가 청구 가능한 사용자가 **됩니다**.

좌석 기반 Incident Management 청구가 적용되는 조직:

* Datadog이 사용자의 메시지를 Incident Management에 동기화하는 데에는 좌석이 필요하지 **않습니다**.
* 메시지를 고정할 때는 사용자에게 좌석이 **있어야** 사용자가 고정한 메시지를 Datadog이 동기화할 수 있습니다.

### 인시던트 채널의 Slack 명령{#slack-commands-in-the-incident-channel}

인시던트 Slack 채널에서 Slack 명령을 실행하여 인시던트 상태 및 심각도를 수정하고, 대응자 역할을 할당하며, 온 콜 팀을 페이징하는 등의 작업을 수행할 수 있습니다.

Slack 명령의 전체 목록은 [Slack 명령](#slack-commands)을 참조하세요.

### 기타 인시던트 채널 구성 옵션{#other-incident-channel-configuration-options}

[**Incidents** > **Settings** > **Integrations**][3] 페이지를 통해 Incident Management의 모든 Slack 구성 옵션에 액세스할 수 있습니다.

| 기능                                                   | 설명 및 참고 사항                                                                                                                             |
|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| **Push incident timeline messages to Slack**              | Datadog의 인시던트 타임라인 업데이트를 Slack 채널로 자동 전송합니다.<br><br>채널 참가자가 Datadog 업데이트와 동기화된 상태를 유지합니다. |
| **Add important links to channel bookmarks**              | Slack 채널 북마크에 인시던트 관련 링크를 게시합니다.<br><br>리소스에 편리하게 액세스할 수 있습니다.                                     |
| **Add team members automatically**                        | Datadog 팀이 인시던트에 추가되면 해당 구성원이 Slack 채널에 추가됩니다.                                                       |
| **Send incident updates to the Slack channel**            | 인시던트 상태, 심각도 및 인시던트 커맨더로 채널 주제를 업데이트합니다.                                                                |
| **Send a Slack notification when a meeting starts**       | 회의가 시작되면 참가자 및 참가 링크와 함께 Slack 채널에 알림을 보냅니다.<br><br>인시던트 호출에 편리하게 액세스할 수 있습니다.     |
| **Activate Bits AI in incident Slack channels**           | Datadog의 인시던트 컨텍스트를 사용하는 AI 기능을 활성화합니다.<br><br>선택된 Slack 작업 공간의 모든 인시던트 유형에 적용됩니다.                |
| **Automatically archive Slack channels after resolution** | 인시던트가 해결된 후 인시던트 Slack 채널을 아카이빙합니다.<br><br>혼잡한 채널을 정리하는 데 도움이 됩니다.                                             |
| **Customize incident Slack actions**                       | 각 상태에 대해 인시던트 액션 트레이에 표시되는 액션을 사용자 지정합니다.<br><br>일반적인 액션의 가시성을 높입니다.                      |

## 인시던트 업데이트를 위한 전역 채널 {#global-channel-for-incident-updates}

선택된 Slack 채널에 인시던트에 대한 업데이트를 자동으로 게시하도록 Incident Management를 구성할 수 있습니다. 이를 활성화하려면 다음 단계를 따르세요.

1. Datadog에서 **[Incident Response > Incident Management > Settings > Integrations][3]**로 이동합니다.
1. Slack 섹션에서 **Send all incident updates to a global channel**을 활성화합니다.
1. 인시던트 업데이트를 게시할 Slack 작업 공간과 Slack 채널을 선택합니다.

Datadog은 새로 선언된 인시던트와 인시던트 상태, 심각도, 인시던트 커맨더 변경 사항에 대한 알림을 선택된 채널에 자동으로 전송합니다.

내부적으로 이 기능은 숨겨진 내장 [인시던트 알림 규칙][5]입니다. 메시지 또는 해당 트리거를 사용자 지정하려면 이 기능을 비활성화하고 고유한 알림 규칙을 정의하세요.

## Slack 명령 {#slack-commands}

사용 가능한 전체 Slack 명령 목록을 언제든지 조회할 수 있습니다. Slack에서 `/datadog` 또는 `/dd`를 입력하여 명령 모달을 열고 Datadog 액션을 탐색 및 실행하거나 `/dd help`를 입력하여 해당 옵션을 대신 목록으로 조회하면 됩니다. 일반적인 인시던트 관리 액션을 위한 액션 트레이를 열려면 `/dd shortcuts`를 입력하세요.

### 전역 명령(어디서나 실행 가능) {#global-commands-run-anywhere}

| 명령 | 설명 |
| ------- | ----------- |
| `/datadog incident` | 새 인시던트를 선언합니다. |
| `/datadog incident test` | 새 테스트 인시던트를 선언합니다(인시던트 유형에 대해 테스트 인시던트가 활성화된 경우). |
| `/datadog incident list` | 모든 미해결(활성화 및 안정된) 인시던트를 나열합니다. |

### 인시던트 채널 명령 {#incident-channel-commands}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
| 명령 | 설명 |
| ------- | ----------- |
| `/datadog` | 사용 가능한 모든 Datadog 액션을 조회할 수 있도록 명령 모달을 엽니다. |
| `/datadog shortcuts` | 일반적인 액션을 수행할 수 있도록 인시던트 액션 트레이를 엽니다. |
| `/datadog help` | 사용 가능한 모든 Slack 명령을 나열하는 임시 메시지를 표시합니다. |
| `/datadog incident update` | 상태나 심각도와 같은 인시던트 속성을 업데이트합니다. |
| `/datadog incident notify` | 인시던트에 대한 알림을 `@` 핸들로 전송합니다. |
| `/datadog incident private` | 인시던트를 프라이빗으로 설정합니다(프라이빗 인시던트가 활성화된 경우). |
| `/datadog incident public` | 인시던트를 퍼블릭으로 설정합니다. |
| `/datadog incident responders` | 인시던트 대응 팀을 관리합니다(대응자 추가 및 대응 역할 할당). |
| `/datadog task` | 인시던트 작업을 생성합니다. |
| `/datadog task list` | 기존 인시던트 작업을 나열합니다. |
| `/datadog followup` | 인시던트에 대한 후속 조치를 생성합니다. |
| `/datadog followup list` | 인시던트에 대한 기존 후속 조치를 조회하고 관리합니다. |
| `/datadog incident summary` | 본인에게만 보이는 AI 생성 인시던트 요약을 가져옵니다. |
{{< /site-region >}}
{{< site-region region="gov,gov2" >}}
| 명령 | 설명 |
| ------- | ----------- |
| `/datadog` | 사용 가능한 모든 Datadog 액션을 조회할 수 있도록 명령 모달을 엽니다. |
| `/datadog shortcuts` | 일반적인 액션을 수행할 수 있도록 인시던트 액션 트레이를 엽니다. |
| `/datadog help` | 사용 가능한 모든 Slack 명령을 나열하는 임시 메시지를 표시합니다. |
| `/datadog incident update` | 상태나 심각도와 같은 인시던트 속성을 업데이트합니다. |
| `/datadog incident notify` | 인시던트에 대한 알림을 `@` 핸들로 전송합니다. |
| `/datadog incident private` | 인시던트를 프라이빗으로 설정합니다(프라이빗 인시던트가 활성화된 경우). |
| `/datadog incident public` | 인시던트를 퍼블릭으로 설정합니다. |
| `/datadog incident responders` | 인시던트 대응 팀을 관리합니다(대응자 추가 및 대응 역할 할당). |
| `/datadog task` | 인시던트 작업을 생성합니다. |
| `/datadog task list` | 기존 인시던트 작업을 나열합니다. |
| `/datadog followup` | 인시던트에 대한 후속 조치를 생성합니다. |
| `/datadog followup list` | 인시던트에 대한 기존 후속 조치를 조회하고 관리합니다. |
{{< /site-region >}}

### 액션 트레이 버튼 {#action-tray-buttons}

Datadog은 상태가 변경될 때 인시던트 Slack 채널에 액션 트레이를 바로 게시하므로 대응자가 명령을 입력하지 않고도 심각도나 상태 업데이트와 같은 일반적인 액션을 수행할 수 있습니다. Slack에서 `/dd shortcuts`를 입력하여 액션 트레이를 열 수도 있습니다.

액션 트레이에서는 다음과 같은 버튼을 사용할 수 있습니다. 인시던트 유형은 이러한 기본 버튼으로 초기화됩니다. 각 인시던트 상태에 대해 표시할 버튼과 순서를 사용자 지정하려면 **Incidents** > **Settings** > [**Integrations**][3] > **Slack Settings**로 이동하고 **Incident Slack Actions**를 구성하세요.

| 버튼                              | 설명                                                             | 활성 기본값 | 안정 기본값 | 해결됨 기본값 |
|--------------------------------------|---------------------------------------------------------------------------|:---:|:---:|:---:|
| ⚙️ **Edit Incident**                | 상태, 심각도, 영향 및 기타 모든 속성 업데이트                 | {{< X >}} | {{< X >}} |   |
| 🧑‍🚒 **Edit Responders**             | 역할 할당 및 인시던트에 팀 구성원 추가                            | {{< X >}} |   |   |
| 🔍 **View All Actions**             | 이 인시던트에 대해 사용 가능한 Slack 액션의 전체 목록 열기           | {{< X >}} | {{< X >}} | {{< X >}} |
| 🏠 **View Web App**                 | Datadog Incident Management에서 인시던트 열기                          | {{< X >}} | {{< X >}} | {{< X >}} |
| ☎️ **Page On-Call**                 | 선호하는 서비스를 사용하여 진행 중인 인시던트에 대해 팀 페이징       | {{< X >}} |   |   |
| 🔔 **Notify**                       | 이메일, 푸시 또는 서비스를 통해 이해관계자에게 인시던트 관련 알림 전송    |   | {{< X >}} | {{< X >}} |
| ▶️ **Create/Join Zoom**             | 새 회의 시작 또는 이미 진행 중인 회의에 참가                        | {{< X >}} |   |   |
| ▶️ **Create/Join Google Meet**      | 새 회의 시작 또는 이미 진행 중인 회의에 참가                        | {{< X >}} |   |   |
| ▶️ **Run Workflow**                 | 인시던트에 대해 사전 정의된 워크플로 선택 및 실행                     | {{< X >}} |   |   |
| 🟨 **Set to Stable**                | 영향을 완화한 후 인시던트를 안정 상태로 표시                   | {{< X >}} |   |   |
| ✅ **Resolve Incident**             | 인시던트를 해결됨으로 표시                                              |   | {{< X >}} |   |
| ✨ **Investigate with Bits AI**     | Bits AI를 사용하여 인시던트 조사                                   | {{< X >}} |   |   |
| 📋 **Create Follow-Up**             | 인시던트 대응 중 식별된 후속 조치 작업 생성            |   | {{< X >}} | {{< X >}} |
| 📋 **List Follow-Ups**              | 인시던트에 대한 후속 조치 작업 조회 및 추적                           |   |   | {{< X >}} |
| 📝 **Create/View Postmortem**       | 인시던트에 대한 사후 분석 생성 또는 조회                            |   |   | {{< X >}} |

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/slack/
[2]: /ko/integrations/slack/?tab=datadogforslack
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
[4]: /ko/integrations/jira/
[5]: /ko/incident_response/incident_management/setup_and_configuration/notification_rules/
[6]: /ko/integrations/slack/?tab=datadogforslack#permissions
[7]: /ko/incident_response/incident_management/setup_and_configuration/variables/#variables-available-only-in-channel-name-templates