---
app_id: microsoft-teams
app_uuid: b37c5433-6bdd-4f37-9f7e-a60d61032c33
assets:
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 203
    source_type_name: Microsoft Teams
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- 협업
- 네트워크
- 알림
custom_kind: 통합
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: microsoft_teams
integration_id: microsoft-teams
integration_title: Microsoft Teams
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: microsoft_teams
public_title: Microsoft Teams
short_description: Microsoft Teams는 사람, 콘텐츠, 도구를 통합하는 Office 365의 채팅 기반 워크플레이스입니다.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Collaboration
  - Category::Network
  - Category::Notifications
  - Offering::Integration
  configuration: README.md#Setup
  description: Microsoft Teams는 사람, 콘텐츠, 도구를 통합하는 Office 365의 채팅 기반 워크플레이스입니다.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Microsoft Teams
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
## 개요

Microsoft Teams와 통합하면 다음과 같은 작업을 할 수 있습니다.
{{< site-region region="us,us3,us5,eu,ap1" >}}
- Microsoft Teams에서 Datadog 경고 및 이벤트 알림 받기.
- Microsoft Teams 내에서 인시던트 관리.
- Microsoft Teams에서 직접 트리거된 모니터링 음소거.
{{< /site-region >}}

{{< site-region region="gov" >}}
- Microsoft Teams에서 Datadog 경고 및 이벤트 알림 받기.
- Microsoft Teams에서 직접 트리거된 모니터링 음소거.
{{< /site-region >}}

## 설정

{{< tabs >}}

{{% tab "Datadog App (Recommended)" %}}

### Microsoft Teams 채널로 모니터링 알림 전송

Microsoft 테넌트를 Datadog에 연결합니다.

1. Datadog에서 [**통합 > Microsoft Teams**][1]로 이동합니다.
2. **테넌트 추가**를 클릭하면 Microsoft로 리디렉션됩니다.
3. 프롬프트에 따라 **확인**을 클릭합니다.

{{< site-region region="us,us3,us5,eu,ap1" >}}
Datadog 알림을 받으려는 모든 팀에 Datadog 앱을 추가했는지 확인합니다.
{{< /site-region >}}
{{< site-region region="gov" >}}
Datadog 알림을 받으려는 모든 팀에 Datadog for Government 앱을 추가했는지 확인합니다.
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
1. Microsoft Teams를 엽니다.
2. 세로 도구 모음에서 **앱**을 클릭합니다.
3. "Datadog"을 검색하고 **열기**를 클릭합니다.
4. 열리는 모달에서 앱을 추가할 팀의 기본 채널을 선택합니다. **이동**을 클릭하여 설치를 완료합니다.
{{< /site-region >}}

{{< site-region region="gov" >}}
1. Microsoft Teams를 엽니다.
2. 세로 도구 모음에서 **앱**을 클릭합니다.
3. "Datadog for Government"를 검색하고 **열기**를 클릭합니다.
4. 열리는 모달에서 앱을 추가할 팀의 기본 채널을 선택합니다. **이동**을 클릭하여 설치를 완료합니다.
{{< /site-region >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams이 팀에 앱 추가" >}}
{{< /site-region >}}
{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/microsoft_teams_add_gov_app_to_team.png" alt="Microsoft Teams이 팀에 앱 추가" >}}
{{< /site-region >}}

봇이 팀에 추가되면 Datadog에서 알림 핸들을 설정합니다.

1. 설정한 테넌트 하단의 **핸들 추가**를 클릭합니다. 핸들의 이름을 지정하고 드롭다운 메뉴에서 원하는 팀과 채널을 선택한 다음 **저장**을 클릭합니다.

### 레거시 커넥터를 테넌트 기반 통합으로 마이그레이션

Microsoft는 Microsoft Teams용 Office 365 커넥터를 지원 중단한다고 발표했습니다. 이로 인한 영향은 다음과 같습니다.

* 모든 Datadog 커넥터는 2025년 1월 31일 작동 중단됩니다.
* [업데이트된 URL][2]이 없는 수신 웹훅 커넥터는 2025년 1월 31일에 작동 중단됩니다.
* 모든 커넥터는 2025년 12월 31일(기존에는 2024년 10월 1일)에 작동 중단됩니다.

자세한 정보를 확인하려면 Microsoft [블로그 포스트][3]를 참고하세요.

다음 단계에 따라 현재 레거시 Office 365 커넥터를 사용하는 모든 알림 핸들을 Datadog의 테넌트 기반 통합으로 마이그레이션합니다.

{{< site-region region="us,us3,us5,eu,ap1" >}}
1. [설정 단계](#setup)에 따라 Microsoft 테넌트를 Datadog에 연결합니다.
2. 레거시 Office 365 커넥터가 설정된 모든 팀에 Datadog 앱을 추가합니다.
3. [Microsoft Teams 통합 타일][1]의 각 레거시 알림 커넥터 핸들에 대해
   1. 설정한 테넌트 하단의 **핸들 추가**를 클릭합니다.
   2. 새 핸들에 커넥터 핸들과 동일한 이름을 지정합니다. 예를 들어, 레거시 커넥터 핸들의 이름이 `channel-123`로 지정된 경우 테넌트 설정에서 `channel-123`라는 이름의 새로운 핸들을 생성합니다.
   3. 레거시 커넥터 핸들이 메시지를 전송하던 원하는 팀과 채널을 드롭다운 메뉴에서 선택하고 **저장**을 클릭합니다. 이 신규 핸들은 기존 레거시 커넥터 핸들을 재정의합니다.

[1]: https://app.datadoghq.com/integrations/microsoft-teams
{{< /site-region >}}

{{< site-region region="gov" >}}
1. [설정 단계](#setup)에 따라 Microsoft 테넌트를 Datadog에 연결합니다.
2. 레거시 Office 365 커넥터가 설정된 모든 팀에 Datadog for Government 앱을 추가합니다.
3. [Microsoft Teams 통합 타일][1]의 각 레거시 알림 커넥터 핸들에 대해
   1. 설정한 테넌트 하단의 **핸들 추가**를 클릭합니다.
   2. 새 핸들에 커넥터 핸들과 동일한 이름을 지정합니다. 예를 들어, 레거시 커넥터 핸들의 이름이 `channel-123`로 지정된 경우 테넌트 설정에서 `channel-123`라는 이름의 새로운 핸들을 생성합니다.
   3. 레거시 커넥터 핸들이 메시지를 전송하던 원하는 팀과 채널을 드롭다운 메뉴에서 선택하고 **저장**을 클릭합니다. 이 신규 핸들은 기존 레거시 커넥터 핸들을 재정의합니다.

[1]: https://app.datadoghq.com/integrations/microsoft-teams
{{< /site-region >}}

### 사용법

Datadog 모니터링에서 [`@-notification` 기능][1]을 사용하여 알림을 Microsoft Teams로 전송합니다. 알림 을 `@teams-<HANDLE>` 주소로 전송하고 `<HANDLE>`을 Microsoft Teams 핸들의 이름으로 변경합니다. Microsoft 팀에서 트리거된 모니터링을 뮤트하려면 **모니터링 음소거하기**를 클릭하고 **음소거 기간**을 선택한 다음 **음소거하기**를 클릭합니다.

#### 대시보드

대시보드 위젯 스냅샷을 모든 팀이나 채팅에 게시할 수 있습니다. 지원되는 위젯의 목록에 대해서는 [예정된 보고서][7]를 참조하세요.

Teams에서 대시보드 위젯 공유하기

1. Datadog에서 대시보드 위젯에 마우스를 올려 `CMD + C` 또는 `CTRL + C`를 클릭하거나 공유 메뉴에서 **복사** 버튼을 클릭합니다.
2. 링크를 Teams에 붙여 넣습니다.

{{< site-region region="us,us3,us5,eu,ap1" >}}
{{< img src="integrations/microsoft_teams/dashboard_share.png" alt="Sharing a dashboard widget in Microsoft Teams">}}
{{< /site-region >}}

{{< site-region region="gov" >}}
{{< img src="integrations/microsoft_teams/dashboard_share_gov.png" alt="Sharing a dashboard widget in Microsoft Teams">}}
{{< /site-region >}}


[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[3]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
{{% /tab %}}

{{% tab "Microsoft Workflows Webhooks" %}}
### Microsoft 워크플로 웹훅이란 무엇인가요?

Workflows/Power Automate는 자동화된 워크플로를 생성하는 Microsoft 프로덕트입니다. Microsoft Workflows는 수신 웹훅으로 알림을 전송하는 데 사용할 수 있습니다. Microsoft Teams 테넌트(권장)에 Datadog 앱을 설치할 수 없거나, 알림을 비공개 채널로 전송하려면 Datadog 핸들을 설정하여 Microsoft Workflows을 통해 알림을 Microsoft Teams 채널로 전송합니다. 본 통합은 다음 Microsoft Workflows 템플릿 [웹훅 요청을 받으면 채널에 게시][1]와 함께 사용하도록 설계되었습니다.

{{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template.png" alt="웹훅 요청이 수신된 템플릿일 경우 체널에 게시" style="width:30%;" >}}

### 레거시 커넥터를 Microsoft 워크플로 웹훅 통합으로 마이그레이션하려 하시나요?

Microsoft는 Microsoft Teams용 Office 365 커넥터를 지원 중단하며, 기존 커넥터 URL은 2025년 1월 31일에 작동 중단될 예정이라고 [발표했습니다][2]. Microsoft는 Microsoft 워크플로의 수신 웹훅을 레거시 커넥터의 대용으로 사용할 것을 권장합니다. 다음 단계에 따라 현재 레거시 Office 365 커넥터를 사용하는 모든 알림 핸들을 Datadog의 Microsoft Workflows 웹훅 통합으로 마이그레이션합니다.

Microsoft Teams 통합 타일의 각 레거시 알림 커넥터 핸들에 대해
1. [설정 단계](#create-a-microsoft-workflows-webhook)에 따라 원하는 Microsoft Teams 채널에 대한 워크플로 웹훅 핸들을 생성합니다.
2. Microsoft 워크플로 웹훅 섹션에서 새 핸들에 교체할 커넥터 핸들과 동일한 이름을 지정합니다. 예를 들어, 레거시 커넥터 핸들의 이름이 `channel-123`로 지정된 경우 Microsoft 워크플로 웹훅 섹션에서 `channel-123`라는 이름의 새로운 핸들을 생성합니다. 이 신규 핸들은 기존 레거시 커넥터 핸들을 재정의합니다.

### Microsoft 워크플로 웹훅 만들기

#### 사전 필수 조건
- 새 워크플로 생성 시 워크플로의 소유권과 알림을 채널로 전송하는 작업에 모두 Microsoft 계정이 필요합니다(동일한 Microsoft 계정일 필요는 없음).
- 워크플로를 소유한 계정(아래 2단계에서 설정)이 해당 워크플로를 수정 및 갱신할 수 있는 계정입니다. 더욱 원활한 공유 액세스를 위해서는 서비스 계정을 사용하세요.
- 알림을 채널에 전송하는 계정(아래 8단계에서 설정)이 해당 계정의 사용자로 게시합니다. 해당 계정은 알림을 전송하려는 팀에 속해 있어야 합니다. 알림을 비공개 채널로 보내는 경우 이 계정도 채널에 추가해야 합니다. 이 계정에 "Datadog 알림" 같은 이름을 지정하려면 서비스 계정을 사용합니다.

#### 설명서

**참고:** 이 단계 대부분은 Microsoft 워크플로에 존재합니다. Microsoft가 워크플로를 변경하면 아래 단계가 최신 변경 사항을 반영하지 못할 수도 있습니다.

1. Microsoft Teams에서 [워크플로 앱][3]을 알림을 보내려는 모든 팀에 추가합니다. 팀에 앱을 추가할 수 없는 경우 하단 '비공개 채널' 섹션의 지침을 따르세요.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_1.png" alt="지침 단계 1" style="width:90%;" >}}
2. Microsoft의 [웹훅 요청을 받으면 채널에 게시][1] 템플릿에서 Power Automate의 새 워크플로를 생성합니다.
3. 워크플로를 소유할 Microsoft 계정을 선택한 다음(더 원활한 공유 액세스를 위해서는 서비스 계정을 사용하세요) **계속**을 클릭합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_3.png" alt="지침 단계 3" style="width:90%;" >}}
4. **고급 모드에서 편집**을 클릭합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_4.png" alt="지침 단계 4" style="width:90%;" >}}
5. **각 적응 카드 보내기**를 연 후 **채팅 또는 채널에 카드 게시**를 클릭합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_template_dropdown_step_5.png" alt="지침 단계 5" style="width:90%;" >}}
6. **다른 이름으로 게시(Post As)** 드롭다운으로 **다른 이름으로 게시(Post As)**를 **플로 봇**으로 설정합니다. 알림은 "워크플로를 통해 `<NAME>`"이 보낸 것으로 표시됩니다. 이런 알림을 수신하려면 원하는 팀에 워크플로 애플리케이션을 추가해야 합니다. 알림을 비공개 채널로 보내는 경우 **다른 이름으로 게시(Post As)**를 해당 채널의 사용자로 설정해야 합니다. 자세한 내용은 아래의 '비공개 채널' 섹션을 참조하세요. **참고:** **다른 이름으로 게시(Post As)**를 변경하면 **게시 위치(Post in)** 필드가 초기화됩니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_6.png" alt="지침 단계 6" style="width:90%;" >}}
7. 팀 및 채널 드롭다운에 액세스하려면 @ 기호를 삭제하거나 **X** 아이콘을 클릭하여 삭제합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_7.png" alt="지침 단계 7" style="width:90%;" >}}
8. 드롭다운을 사용하여 원하는 팀과 채널을 선택합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_8.png" alt="지침 단계 8" style="width:90%;" >}}
9. 워크플로가 알림(예: "Datadog 알림"이라는 이름의 서비스 계정)을 전송하려면 원하는 Microsoft 계정에 연결되어 있는지 확인합니다. 알림은 "`<NAME>` 워크플로를 통해" 보낸 것으로 표시됩니다. 이 계정에는 설정한 Microsoft Teams 채널에 대한 액세스 권한이 있어야 합니다. 계정을 변경하려면 **연결 변경**을 클릭하고 프롬프트에 따라 다른 Microsoft 계정을 설정합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_9.png" alt="지침 단계 9" style="width:90%;" >}}
10. **Save** 버튼을 클릭합니다.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_10.png" alt="지침 단계 10" style="width:90%;" >}}
11. 웹훅 링크를 확인하려면 워크플로의 첫 번째 블록을 클릭합니다.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_11.png" alt="지침 단계 11" style="width:50%;" >}}
12. **누구나**가 플로우를 트리거할 수 있는지 확인한 다음 링크를 복사합니다.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_12.png" alt="지침 단계 12" style="width:90%;" >}}
13. **뒤로** 버튼을 클릭하여 워크플로 대시보드로 이동합니다.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_13.png" alt="지침 단계 13" style="width:90%;" >}}
14. 대시보드를 확인하여 워크플로가 활성화되어 있는지 확인합니다. 워크플로가 비활성화되어 있으면 "켜기" 버튼을 클릭합니다.
    {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_step_14.png" alt="지침 단계 14" style="width:90%;" >}}
15. Datadog에서 [**통합 > Microsoft Teams**][4]로 이동합니다.
16. 설정 탭에서 Microsoft 워크플로 웹훅 섹션으로 이동하여 **핸들 추가**를 클릭합니다. 핸들에 이름을 지정하고(레거시 커넥터 핸들에서 마이그레이션하는 경우 해당 커넥터 핸들과 동일한 이름을 사용) 웹훅 URL을 붙여넣습니다.
17. **Save**을 클릭합니다.

### 비공개 채널
알림을 비공개 채널로 전송하려면 ** 채팅 또는 채널로 쪽지 보내기** 블록에 설정된 계정에 채널에 대한 액세스 권한이 있어야 합니다. 이렇게 하면 워크플로에서 해당 사용자 계정을 대신하여 알림을 전송할 수 있습니다.
1. **채팅 또는 채널에 카드 게시하기** 블록에서 **다른 이름으로 게시(Post as)**를 **사용자**로 변경합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_1.png" alt="비공개 채널 지침 단계 1" style="width:30%;" >}}
2. 그런 다음 계정을 선택하려면 **연결 변경**을 클릭하고 프롬프트에 따라 계정을 변경합니다.
   {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_private_channels_step_2.png" alt="비공개 채널 지침 단계 2" style="width:90%;" >}}

### 한계
- Microsoft 365 고객인 경우 90일 동안 트리거에 성공지 못하면 워크플로가 자동으로 비활성화됩니다. 워크플로의 만료가 임박하면 Microsoft는 워크플로를 소유한 계정으로 이메일을 전송합니다. 이 90일 타이머는 Microsoft 워크플로 내에서 테스트를 실행하여 재설정할 수 있습니다.
- 템플릿을 사용할 때 모든 메시지에는 템플릿 링크와 함께 워크플로를 만든 사람이 누구인지 알려주는 텍스트 한 줄이 추가됩니다.
  {{< img src="integrations/microsoft_teams/microsoft_teams_workflows_used_a_template.png" alt="템플릿에서 사용된 사용자" style="width:90%;" >}}

  이를 삭제하려면 워크플로로 이동하여 **다른 이름으로 저장**을 클릭하여 복사본을 생성하고 **내 워크플로**에서 복사본을 찾아 이동한 다음, 복사한 워크플로의 새 웹훅을 원본 워크플로 대신 사용하세요.
- Microsoft 워크플로는 게시하는 메시지에 관한 대화형 기능(예: Microsoft Teams에서 직접 모니터링 음소거)를 지원하지 않습니다.
- Microsoft 워크플로는 공유 채널을 지원하지 않습니다.

### 사용법

Datadog 모니터링에서 [`@-notification` 기능][1]을 사용하여 알림을 Microsoft Teams로 전송합니다. 알림 을 `@teams-<HANDLE>` 주소로 전송하고 `<HANDLE>`을 Microsoft Teams 핸들의 이름으로 변경합니다.


[1]: https://make.preview.powerautomate.com/galleries/public/templates/d271a6f01c2545a28348d8f2cddf4c8f/post-to-a-channel-when-a-webhook-request-is-received
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://teams.microsoft.com/l/app/c3a1996d-db0f-4857-a6ea-7aabf0266b00?source=app-details-dialog
[4]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}

{{% tab "Connectors (Deprecated)" %}}
### 레거시 커넥터를 테넌트 기반 통합으로 마이그레이션

Microsoft는 Microsoft Teams용 Office 365 커넥터를 지원 중단한다고 발표했습니다. 이로 인한 영향은 다음과 같습니다.

* 모든 Datadog 커넥터는 2025년 1월 31일 작동 중단됩니다.
* [업데이트된 URL][1]이 없는 수신 웹훅 커넥터는 2025년 1월 31일에 작동 중단됩니다.
* 모든 커넥터는 2025년 12월 31일(기존에는 2024년 10월 1일)에 작동 중단됩니다.

자세한 정보를 확인하려면 Microsoft [블로그 포스트][2]를 참고하세요.

다음 단계에 따라 현재 레거시 Office 365 커넥터를 사용하는 모든 알림 핸들을 테넌트 기반 Datadog 앱으로 마이그레이션합니다.

{{< site-region region="us,us3,us5,eu,ap1" >}}
1. [설정 단계][2]에 따라 Microsoft 테넌트를 Datadog에 연결합니다.
2. 레거시 Office 365 커넥터가 설정된 모든 팀에 Datadog 앱을 추가합니다.
3. [Microsoft Teams 통합 타일][1]의 각 레거시 알림 커넥터 핸들에 대해
   1. 설정한 테넌트 하단의 **핸들 추가**를 클릭합니다.
   2. 새 핸들에 커넥터 핸들과 동일한 이름을 지정합니다. 예를 들어, 레거시 커넥터 핸들의 이름이 `channel-123`로 지정된 경우 테넌트 설정에서 `channel-123`라는 이름의 새로운 핸들을 생성합니다.
   3. 레거시 커넥터 핸들이 메시지를 전송하던 원하는 팀과 채널을 드롭다운 메뉴에서 선택하고 **저장**을 클릭합니다. 이 신규 핸들은 기존 레거시 커넥터 핸들을 재정의합니다.

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/ko/integrations/microsoft_teams/?tab=datadogapprecommended#setup

{{< /site-region >}}

{{< site-region region="gov" >}}
1. [설정 단계][2]에 따라 Microsoft 테넌트를 Datadog에 연결합니다.
2. 레거시 Office 365 커넥터가 설정된 모든 팀에 Datadog for Government 앱을 추가합니다.
3. [Microsoft Teams 통합 타일][1]의 각 레거시 알림 커넥터 핸들에 대해
   1. 설정한 테넌트 하단의 **핸들 추가**를 클릭합니다.
   2. 새 핸들에 커넥터 핸들과 동일한 이름을 지정합니다. 예를 들어, 레거시 커넥터 핸들의 이름이 `channel-123`로 지정된 경우 테넌트 설정에서 `channel-123`라는 이름의 새로운 핸들을 생성합니다.
   3. 레거시 커넥터 핸들이 메시지를 전송하던 원하는 팀과 채널을 드롭다운 메뉴에서 선택하고 **저장**을 클릭합니다. 이 신규 핸들은 기존 레거시 커넥터 핸들을 재정의합니다.

[1]: https://app.datadoghq.com/integrations/microsoft-teams
[2]: https://docs.datadoghq.com/ko/integrations/microsoft_teams/?tab=datadogapprecommended#setup
{{< /site-region >}}

### 레거시 커넥터를 Microsoft 워크플로 웹훅 통합으로 마이그레이션

Microsoft는 Microsoft Teams용 Office 365 커넥터를 지원 중단한다고 발표했습니다. 이로 인한 영향은 다음과 같습니다.

* 모든 Datadog 커넥터는 2025년 1월 31일 작동 중단됩니다.
* [업데이트된 URL][1]이 없는 수신 웹훅 커넥터는 2025년 1월 31일에 작동 중단됩니다.
* 모든 커넥터는 2025년 12월 31일(기존에는 2024년 10월 1일)에 작동 중단됩니다.

자세한 정보를 확인하려면 Microsoft [블로그 포스트][2]를 참고하세요.

다음 단계에 따라 현재 레거시 Office 365 커넥터를 사용하는 모든 알림 핸들을 Datadog의 Microsoft 워크플로 웹훅 통합으로 마이그레이션하려면 [Microsoft 워크플로 웹훅][3]을 참조하세요.

### 커넥터 설정(지원 중단됨)
<div class="alert alert-info">
레거시 알림 핸들은 동일한 <code>@teams-HANDLE_NAME을</code> 사용하지 <em>않는 한</em> 새 설정의 영향을 받지 않으며, 이러한 경우 새 설정이 레거시 설정을 재정의합니다.
</div>

1. 채널 목록에서 채널 이름 옆의 `...` 버튼을 선택한 다음 **커넥터**를 선택합니다.

{{< img src="integrations/microsoft_teams/microsoft_team_step_1_v2.png" alt="Microsoft Teams 단계 1" >}}

2. Datadog을 검색하고 **설정**를 클릭합니다.

{{< img src="integrations/microsoft_teams/microsoft_team_step_2_v2.png" alt="Microsoft Teams 단계 2" >}}

3. 커넥터 설정 모달에서 웹훅 URL을 복사합니다.
4. Datadog에서 [**통합 > Microsoft Teams**][4]로 이동합니다.
5. 설정 탭에서 **핸들 추가**를 클릭하고 핸들 이름을 지정한 다음 웹훅 URL을 붙여넣습니다.
6. 커넥터 설정 모달에서 **저장**을 클릭합니다.


[1]: https://learn.microsoft.com/en-us/microsoftteams/m365-custom-connectors#update-connectors-url
[2]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
[3]: https://docs.datadoghq.com/ko/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://app.datadoghq.com/integrations/microsoft-teams
{{% /tab %}}
{{< /tabs >}}

{{< site-region region="us,us3,us5,eu,ap1" >}}
## Microsoft Teams의 Datadog 인시던트 관리

### 계정 설정

먼저 Microsoft Teams에 Datadog 앱을 설치합니다.

1. Microsoft Teams를 엽니다.
2. 세로 도구 모음에서 **앱**을 클릭합니다.
3. "Datadog"을 검색하고 **열기**를 클릭합니다.
4. 열리는 모달에서 앱을 추가할 팀의 기본 채널을 선택합니다. **이동**을 클릭하여 설치를 완료합니다.
{{< img src="integrations/microsoft_teams/microsoft_teams_add_app_to_team.png" alt="Microsoft Teams이 팀에 앱 추가" >}}

그런 다음 Microsoft 테넌트를 Datadog에 연결합니다.

1. Datadog에서 [Microsoft Teams 통합 타일][3]로 이동합니다.
2. **테넌트 추가**를 클릭하면 Microsoft로 리디렉션됩니다.
3. 프롬프트에 따라 **확인**을 클릭합니다.

일부 Datadog 인시던트 관리 기능의 경우 테넌트에 대한 작업을 수행하려면 권한이 필요합니다(예: 인시던트에 대한 새 팀을 생성하는 작업).
Microsoft 조직을 대신하여 테넌트 전체에 대한 관리자 동의(예: *글로벌 관리자* 역할이 할당된 사용자)
를 부여할 수 있는 동의 권한이 있는 사람이 필요합니다. Datadog 애플리케이션에 테넌트 전체 관리자 동의를 부여할 수 있는
사용자에 대한 자세한 내용은 [Microsoft Entra ID 설명서][5]를 참조하세요.

다음에 따라 동의를 부여합니다.

1. Datadog에서 [Microsoft Teams 통합 타일][3]로 이동합니다.
2. 인시던트 관리를 사용하려는 테넌트에서 오른쪽의 톱니바퀴 아이콘을 클릭합니다.
3. **테넌트 승인**을 클릭하면 Microsoft로 리디렉션됩니다. 테넌트 전체에 대한 관리자 동의를 부여할 수 있는 사용자만 해당 단계를 수행해야 합니다. 이 사용자는 Datadog 계정이 있어야 하지만 Datadog 계정에 사용하는 이메일이 Microsoft 계정의 이메일과 일치할 필요는 없습니다.
4. 프롬프트에 따라 **확인**을 클릭합니다.

### 사용자 설정

Microsoft Teams에서 Datadog의 작업을 수행하려면 Datadog와 Microsoft 팀 계정을 연결해야 합니다.

다음에 따라 Microsoft Teams에서 계정을 연결합니다.

1. Microsoft Teams를 엽니다.
2. 세로 도구 모음에서 `...` 버튼을 클릭하고 Datadog 를 선택하여 Datadog 봇과 채팅을 시작합니다.
3. "계정"을 입력하고 Enter 키를 누릅니다.
{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_teams.png" alt="Microsoft Teams의 계정 연결" >}}

4. Datadog 봇이 계정 연결 방법에 대해 안내할 것입니다. **Datadog 계정 연결**을 클릭합니다.
5. 그러면 Datadog 봇이 계정 연결 링크가 포함된 메시지를 보냅니다. 링크를 클릭하고 프롬프트의 지시를 따릅니다.
6. [Microsoft Teams 통합 타일][3]로 다시 리디렉션됩니다.
7. [Microsoft Teams 통합 타일][3]의 프롬프트에서 **생성하기**를 클릭하여 애플리케이션 키를 생성합니다.


Datadog에서 계정을 연결할 수도 있습니다.

1. Datadog에서 [Microsoft Teams 통합 타일][3]로 이동합니다.
2. 나열한 테넌트에서 **연결**을 클릭합니다.
3. 프롬프트에 따라 **확인**을 클릭합니다.
5. [Microsoft Teams 통합 타일][3]에서 위의 프롬프트에서 **생성하기**를 클릭하여 애플리케이션 키를 생성합니다.

{{< img src="integrations/microsoft_teams/microsoft_teams_connect_account_from_datadog_v2.png" alt="Datadog Microsoft Teams 통합 타일의 계정 연결" >}}

### Incident Usage

#### 인시던트

다음에 따라 Microsoft Teams에서 새 인시던트를 선언합니다.

1. 아무 팀에서나 대화를 시작합니다.
2. `@Datadog`을 입력하거나 `...` 버튼으로 **메시징 확장 프로그램** 메뉴를 열고 **Datadog** 앱을 선택합니다.
3. **인시던트 생성하기**를 선택합니다.
4. 원하는 정보를 입력해 양식 작성을 완료합니다.
5. **생성**을 클릭합니다.

Datadog 액세스 권한이 있는지 여부에 관계없이 Microsoft Teams 테넌트의 모든 사용자가 인시던트를 선언할 수 있습니다.

새 인시던트가 생성되면 `incident-(unique number ID)`이라는 해당 팀이 만들어집니다.

인시던트를 업데이트하려면 다음과 같이 생성할 때와 비슷한 프로세스를 따릅니다.

1. 인시던트 팀에 있을 때 대화를 시작합니다.
2. `@Datadog`을 입력하거나 `...` 버튼으로 **메시징 확장 프로그램** 메뉴를 열고 **Datadog** 앱을 선택합니다.
3. **인시던트 업데이트**를 선택합니다.
4. 원하는 정보를 입력해 양식 작성을 완료합니다.
5. **Update**를 클릭합니다.

다음으로 모든 (활성화 및 안정된) 인시던트를 목록화합니다.

```
@Datadog list incidents
```

인시던트 팀 내 메시지의 가장 오른쪽의 '추가 작업' 메뉴로 해당 메시지를 인시던트 타임라인으로 전송합니다.

#### 인시던트 업데이트 채널
인시던트 업데이트 채널을 사용하면 이해 관계자에게 Microsoft Teams에서 직접 모든 인시던트의 상태에 대한 조직 전반의 가시성을 제공해 드립니다. 계정에서 이러한 업데이트를 게시할 팀과 채널을 선택하면 해당 채널에 다음 게시물이 수신됩니다.

- 새로 선언된 인시던트.
- 심각도, 상태 전환 및 인시던트 커맨더에 대한 변경 사항.
- 앱에서 인시던트 개요 페이지로 연결되는 링크.
- 전용 인시던트 팀에 참여할 수 있는 링크.

Microsoft Teams 앱이 설치되면 **인시던트 설정** 페이지로 이동할 수 있습니다. 여기에서 아래로 스크롤하여 **인시던트 업데이트** 채널 섹션으로 이동하여 설정 플로를 시작합니다.

#### 인시던트 채널을 설정하는 방법

1. [인시던트 설정][4]으로 이동합니다.
2. Microsoft 팀 섹션에서 연결된 Microsoft 팀 테넌트를 선택합니다.
3. **모든 인시던트에 대해 자동으로 Microsoft Teams 채널 생성하기**를 토글합니다.
4. 새 채널을 자동으로 생성하고 싶은 팀을 선택합니다.
5. 설정을 저장합니다.

{{< img src="integrations/microsoft_teams/ms_teams_incident_updates_v2.png" alt="Microsoft Teams 인시던트 업데이트 채널 설정." >}}

[1]: https://docs.datadoghq.com/ko/monitors/notifications/#notification
[2]: https://docs.datadoghq.com/ko/help/
[3]: https://app.datadoghq.com/integrations/microsoft-teams
[4]: https://app.datadoghq.com/incidents/settings#Integrations
[5]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[6]: https://learn.microsoft.com/en-us/graph/permissions-reference
[7]: https://docs.datadoghq.com/ko/dashboards/scheduled_reports/
[8]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[9]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[10]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/
{{< /site-region >}}

## 수집한 데이터

### 메트릭

Microsoft Teams 통합은 메트릭을 제공하지 않습니다.

### 이벤트

Microsoft Teams 통합은 이벤트를 포함하지 않습니다.

### 서비스 점검

Microsoft Teams 통합은 서비스 점검을 포함하지 않습니다.

## 권한

Microsoft Teams 통합은 추가된 팀에 관해 다음과 같은 권한을 부여 받습니다. 자세한 내용은 [Microsoft 앱 권한 참조][1]를 참고하세요.

| 권한 설명                                                                                                                                                                   | 요청 이유                                                                           |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| 고객님이 제공하는 메시지와 데이터를 수신합니다.                                                                                                                                          | 사용자는 개인 채팅에서 Datadog 앱과 상호작용할 수 있습니다.                                |
| 고객님께 메시지 및 알림을 전송합니다.                                                                                                                                                      | 사용자는 개인 채팅에서 Datadog 앱과 상호작용할 수 있습니다.                                |
| 이름, 이메일 주소, 회사명, 선호하는 언어 등 고객님의 프로필 정보에 액세스합니다.                                                                                      | 사용자가 Datadog UI 내에서 Microsoft Teams 알림 및 워크플로를 설정할 수 있게 합니다. |
| 채널 또는 채팅에서 팀 또는 채팅 멤버가 제공하는 메시지 및 데이터를 수신합니다.                                                                                                  | 사용자는 @Datadog 명령으로 Datadog와 상호작용할 수 있습니다.                           |
| 채널 또는 채팅에서 메시지 및 알림을 전송합니다.                                                                                                                                    | Datadog 알림을 설정 대상에게 전송합니다.                                        |
| 팀 또는 채팅 이름, 채널 목록, 명단(팀 또는 채팅 멤버의 이름과 이메일 주소 포함) 등, 해당 팀 또는 채팅의 정보에 액세스하고 이를 활용하여 연락합니다. | 사용자가 Datadog 내에서 Microsoft Teams 알림 및 워크플로를 설정할 수 있게 합니다. |

{{< site-region region="us,us3,us5,eu,ap1" >}}

Microsoft Teams 통합에서 인시던트 관리 기능을 사용하려면 추가 권한이 필요합니다. 해당 권한은 테넌트 전체 권한이 있는 사용자가 부여해야 합니다(자세한 지침은 [Microsoft Teams의 Datadog 인시던트 관리: 계정 설정](#account-setup)을 참조하세요).
해당 권한에 대한 자세한 내용은 [Microsoft 그래프 권한 참조][6]를 참고하세요.

<table>
  <tr>
    <td style="width:40%;"><strong>API / 권한 이름</strong></td>
    <td style="width:15%;"><strong>유형</strong></td>
    <td><strong>요청 사유</strong></td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Create</code></td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리로 인시던트를 관리하고 문제를 해결하는 채널을 생성합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Channel.Delete</code></td>
    <td style="width:15%;">애플리케이션</td>
    <td>지정한 기간 후에 자동으로 인시던트 채널을 아카이빙합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelMessage.Read.All</code></td>
    <td style="width:15%;">애플리케이션</td>
    <td>인시던트 채널의 인시던트 타임라인을 타임라인 메시지와 자동으로 동기화합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>ChannelSettings.ReadWrite.All</code></td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리로 채널을 생성 및 수정하여 인시던트 문제를 해결합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>GroupMember.Read.All</code></td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리 설정에 대한 팀 및 채널 이름 자동 완성 제안을 제공합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>Team.Create</code>*</td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리로 팀을 생성하여 인시던트를 관리하고 문제를 해결합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamMember.ReadWrite.All</code>*</td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리로 팀에 사용자를 추가하여 인시던트를 관리합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamsAppInstallation.ReadWrite.All</code>*</td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리가 생성한 팀에 Datadog 앱을 추가합니다.</td>
  </tr>
  <tr>
    <td style="width:40%;"><code>TeamSettings.ReadWrite.All</code>*</td>
    <td style="width:15%;">애플리케이션</td>
    <td>Datadog 인시던트 관리를 인시던트 팀 상태를 통해 최신 상태로 유지합니다.</td>
  </tr>
</table>
* 이는 Datadog 인시던트 관리 앱에서 더 이상 사용되지 않는 지원 중단 기능에 관한 권한입니다.
아울러 곧 삭제될 예정입니다. 기능에 영향을 주지 않고 Microsoft Azure 포털에서 취소할 수 있습니다.

[1]: https://docs.datadoghq.com/ko/monitors/notifications/#notification
[2]: https://docs.datadoghq.com/ko/help/
[3]: https://app.datadoghq.com/integrations/microsoft-teams
[4]: https://app.datadoghq.com/incidents/settings#Integrations
[5]: https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent?pivots=ms-graph#prerequisites
[6]: https://learn.microsoft.com/en-us/graph/permissions-reference
[7]: https://docs.datadoghq.com/ko/dashboards/scheduled_reports/
[8]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[9]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[10]: https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/

{{< /site-region >}}

## 트러블슈팅

### SSO 사용

다음 단계에 따라 새 채널 커넥터를 설정합니다.

1. Datadog에 로그인한 후 설정 1단계 및 2단계를 완료합니다.

2. 설정 3단계를 완료하면 MS Teams 페이지에서 Datadog 로 리디렉션됩니다. 새 탭을 열고 SSO를 사용하여 Datadog에 로그인합니다. 그런 다음 설정 4단계를 별도로 수행합니다.

### 팀이 통합 타일에 표시되지 않는 이유는 무엇인가요?
{{< site-region region="us,us3,us5,eu,ap1" >}}
테넌트를 Datadog에 추가하기 전에 봇을 팀에 추가했다면 Datadog은 팀이 존재한다는 것을 인지하게 되는 팀 참여 이벤트를 놓쳤을 수 있습니다.
다음 방법 중 하나를 시도해 볼 수 있습니다.
- 해당 팀의 표준 채널에 `@Datadog sync`을 게시하여 팀 표준 채널을 Datadog에 동기화합니다.
1. 동기화하려는 팀의 표준 채널로 이동합니다.
2. 채널에서 게시를 시작합니다.
3. `@Datadog sync`을 채널에 게시하고 작업 성공을 나타내는 확인 메시지가 스레드에 표시될 때까지 기다립니다.
- Remove the Datadog app from the team, then add it back again. **Note**: This removes configured connectors for that team. Perform this action only when you are ready to migrate all connectors for that team to Datadog's tenant-based integration:
1. 왼쪽 사이드바에서 팀 이름 옆의 점 세 개를 클릭합니다.
2. **팀 관리**를 클릭합니다.
3. **앱** 탭으로 이동합니다.
4. Datadog 앱 옆의 점 세 개를 클릭합니다.
5. **제거**를 클릭합니다.
6. Re-add the Datadog app by following the [setup steps][1].

[1]: https://docs.datadoghq.com/ko/integrations/microsoft_teams/?tab=datadogapprecommended#setup
{{< /site-region >}}

{{< site-region region="gov" >}}
테넌트를 Datadog에 추가하기 전에 봇을 팀에 추가했다면 Datadog은 팀이 존재한다는 것을 인지하게 되는 팀 참여 이벤트를 놓쳤을 수 있습니다.
다음을 시도해 볼 수 있습니다.
- 해당 팀의 표준 채널에 `@Datadog for Government sync`을 게시하여 팀 표준 채널을 Datadog에 동기화합니다.
1. 동기화하려는 팀의 표준 채널로 이동합니다.
2. 채널에서 게시를 시작합니다.
3. `@Datadog for Government sync`을 채널에 게시하고 작업 성공을 나타내는 확인 메시지가 스레드에 표시될 때까지 기다립니다.
- Remove the Datadog for Government app from the team, then add it back. **Note**: This removes configured connectors for that team. Perform this action only when you are ready to migrate all connectors for that team to Datadog's tenant-based integration.
1. 왼쪽 사이드바에서 팀 이름 옆의 점 세 개를 클릭합니다.
2. **팀 관리**를 클릭합니다.
3. **앱** 탭으로 이동합니다.
4. Click the three dots next to the Datadog for Government app.
5. **제거**를 클릭합니다.
6. Re-add the Datadog for Government app by following the [setup steps][1].

[1]: https://docs.datadoghq.com/ko/integrations/microsoft_teams/?tab=datadogapprecommended#setup&site=gov
{{< /site-region >}}

### 봇이 비공개 채널을 지원하나요?
[Microsoft Teams][2]의 비공개 채널 제한으로 봇은 비공개 채널을 지원하지 않습니다. 알림을 비공개 채널로 전송하려면 [Microsoft 워크플로 웹훅][3]을 참조하세요.

{{< site-region region="gov" >}}
### Is the Datadog for Government app supported in GCC or GCC High?
Currently, the Datadog for Government app only supports Datadog US1-FED customers who are trying to connect to their `commercial` Microsoft Teams tenant. GCC and GCC High tenants are not supported by the app.
{{< /site-region >}}

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

[1]: https://learn.microsoft.com/en-us/microsoftteams/app-permissions#what-can-apps-do-in-teams
[2]: https://learn.microsoft.com/en-us/microsoftteams/private-channels#private-channel-limitations
[3]: https://docs.datadoghq.com/ko/integrations/microsoft_teams/?tab=microsoftworkflowswebhooks#what-are-microsoft-workflows-webhooks
[4]: https://docs.datadoghq.com/ko/help/