---
description: 팀 페이지를 사용자 지정하고, 멤버십을 관리하고, 하위 팀을 설정하고, ID 공급자 또는 SAML 속성 매핑을 통해 팀 액세스를
  구성할 수 있습니다.
title: Team Management
---
## 팀 상세 정보 {#team-detail}

각 팀에는 팀, 멤버 및 관련 리소스에 대한 정보를 표시하는 상세 정보 페이지가 있습니다. [Teams 디렉터리][1]에서 팀을 클릭하여 팀 상세 정보 페이지로 이동합니다.

팀 상세 정보 페이지는 다음 3개 탭으로 구성되어 있습니다.

- **Info**: 핵심 팀 세부 정보 및 멤버십
- **Resources**: 팀과 관련된 Datadog 리소스
- **On-Call**: 팀의 [Datadog On-Call][6] 구성

팀 헤더에는 팀의 아바타, 배너, 이름 및 설명이 표시됩니다. 이모지 아바타와 배너를 선택하여 팀의 모양을 사용자 지정할 수 있습니다. 이모지 아바타는 Datadog 전반의 목록에서 팀 이름 옆에 표시됩니다.

### Info 탭 {#info-tab}

핵심 팀 세부 정보: 알림 채널, 링크, 연결, 계층 구조(상위 팀 및 하위 팀) 및 멤버.

### Resources 탭 {#resources-tab}

팀이 소유한 Datadog 리소스로, 생산성, 소프트웨어, 성능, 클라우드 비용과 같은 영역별로 그룹화되어 있습니다. 팀에 하위 팀이 있는 경우 **Include Subteams** 토글을 사용하여 팀 자체 리소스와 함께 하위 팀의 리소스를 표시할 수 있습니다.

### On-Call 탭 {#on-call-tab}

팀의 [Datadog On-Call][6] 설정: 멤버, 일정, 에스컬레이션 정책, 라우팅 및 인계 자동화.

### 설정 사용자 지정 {#customize-settings}

팀 세부 정보를 수정하려면 `user_access_manage` 또는 `teams_manage` 권한이 있어야 합니다. 또는 멤버와 매니저가 팀 세부 정보를 편집할 수 있도록 구성된 팀의 팀 멤버 또는 팀 매니저가 될 수 있습니다.

팀의 상세 정보 페이지에서 직접 팀 세부 정보를 편집할 수 있습니다.

- **아바타, 이름 및 설명**: 팀 이름 위로 마우스를 가져간 다음 편집(연필) 아이콘을 클릭합니다.
- **배너**: 배너 위로 마우스를 가져간 다음 편집(연필) 아이콘을 클릭합니다.
- **Info 탭 섹션**: Links, Members, Notification Channels와 같은 섹션 위로 마우스를 가져간 다음 편집 아이콘을 클릭하여 해당 위치에서 업데이트할 수 있습니다.

팀 헤더의 Settings(톱니바퀴) 메뉴를 사용하여 다음 작업을 수행할 수 있습니다.

- **Configure Notifications**: 팀의 알림 채널을 추가하거나 업데이트합니다. 지원되는 대상에는 Slack, Microsoft Teams, PagerDuty, 이메일 및 ServiceNow가 포함됩니다.
- **Edit Roles and Permissions**: 팀과 관련된 역할 및 권한을 관리합니다.
- **Edit Team Handle**: 팀의 핸들을 변경합니다.
- **Edit Connections**: 팀을 외부 시스템에 연결합니다. Datadog 팀을 GitHub 팀과 연결하려면 **GitHub 팀**을 연결하고, 인시던트 및 변경 요청을 자동으로 라우팅하려면 **ServiceNow 할당 그룹**을 연결하세요.
- **Join Team** 또는 **Leave Team**: 팀에 자신을 추가하거나 팀에서 자신을 제거합니다.

## 팀 멤버십 {#team-membership}

### 팀 매니저 {#team-manager}

팀 멤버를 구분하려면 멤버 중 일부를 팀 매니저로 지정합니다. 멤버 목록에서 팀 매니저의 이름 옆에 'TEAM MANAGER' 배지가 표시됩니다.

### 팀 수정 권한 {#team-modification-permissions}

팀의 역할 및 권한 설정에서 팀 멤버십을 수정할 수 있는 사용자를 지정합니다. 다음 옵션을 사용할 수 있습니다.
- Only users with the `user_access_manage` permission
- Team managers
- Team managers and members
- Anyone in the organization

목록은 허용 범위가 넓어지는 순서대로 정렬되어 있습니다. 목록의 각 옵션에는 그 위의 항목에 있는 그룹이 포함됩니다. 예를 들어, 'Team managers'를 선택하면 팀 매니저와 `user_access_manage` 권한이 있는 사용자 모두 멤버십을 수정할 수 있습니다.

멤버를 추가하고 제거할 수 있는 사용자에 대해 선택한 옵션에 따라 팀을 액세스 제어 목록에 추가할 수 있는지 여부가 결정됩니다. 팀에는 초대 전용 팀과 공개 팀의 두 가지 유형이 있습니다.

초대 전용 팀
: 멤버십이 제한된 팀입니다. 액세스 제어 수신자로 설정할 수 있습니다. 팀 멤버십 수정을 처음 세 가지 옵션 중 하나로 제한할 때 생성됩니다.

공개 팀
: 멤버십이 제한되지 않은 팀입니다. 액세스 제어 수신자로 설정할 수 없습니다. {{< ui >}}Anyone in the organization{{< /ui >}}이 팀 멤버십을 수정할 수 있도록 허용하면 생성됩니다.

`user_access_manage` 권한이 있는 사용자는 누가 멤버를 추가하거나 제거할 수 있는지 또는 팀 세부 정보를 편집할 수 있는지에 대한 기본 규칙을 설정할 수 있습니다. 팀 디렉터리 페이지의 {{< ui >}}Default Settings{{< /ui >}} 버튼을 사용하여 기본 규칙을 설정합니다. 팀 세부 정보 패널에서 개별 팀에 대해 이러한 정책을 재정의합니다.

### Datadog 외부에서 관리되는 팀 {#teams-managed-outside-datadog}

경우에 따라 `user_access_manage` 권한이 있는 사용자를 포함하여 누구도 Datadog 내에서 팀 멤버십을 직접 수정할 수 없습니다.
- 조직에서 SAML을 유일한 팀 프로비저닝 소스로 선택한 경우, SAML 팀 매핑이 팀 멤버십을 제어합니다. Datadog을 통해서는 팀 멤버십을 수정할 수 없습니다.
- 팀이 ID 공급자를 통해 관리되는 경우, 해당 ID 공급자가 팀 멤버십을 제어합니다. Datadog을 통해서는 팀 멤버십을 수정할 수 없습니다.

ID 공급자를 통해 외부에서 관리되는 팀은 헤더에 **Managed** 배지가 표시됩니다.

#### 여러 소스가 있는 팀 {#teams-with-multiple-sources}

팀은 둘 이상의 소스에 연결될 수 있지만, 소스 유형에 따라 제어 수준이 결정됩니다.

**팀을 관리하는 소스**
- **소스:** SCIM 및 SAML 전용 모드의 SAML
- SCIM이 팀을 프로비저닝하거나 조직에서 SAML 전용 프로비저닝을 사용하는 경우 팀이 관리됩니다. 해당 소스가 팀의 이름, 핸들 및 멤버십을 제어합니다. Datadog이나 다른 소스를 통해 이를 변경할 수 없습니다. 다른 소스는 계속 연결된 상태로 유지될 수 있습니다. 예를 들어 [ServiceNow][12]에서 인시던트를 라우팅할 수 있습니다.

**팀을 동기화하는 소스**
- **소스:** [GitHub][9], [ServiceNow][12], SAML(유일한 프로비저닝 소스가 아닌 경우)
- 이러한 소스는 독점적인 제어 권한을 갖지 않고 팀을 동기화하고 팀의 이름, 핸들 및 멤버십을 설정합니다. 여전히 다른 소스를 팀에 연결할 수 있으며, Datadog UI, [Teams API][10] 또는 [Terraform 공급자][11]를 통해 팀을 변경할 수 있습니다. 둘 이상의 소스가 동일한 팀에 멤버를 동기화하는 경우 Datadog은 각 소스의 멤버를 결합합니다.

<div class="alert alert-info">SCIM은 GitHub 또는 ServiceNow에서 이미 동기화 중인 팀의 관리를 시작할 수 있습니다. 팀은 해당 소스에 계속 연결되지만, SCIM이 팀 이름, 핸들 및 멤버십을 제어합니다.</div>

<div class="alert alert-info">GitHub 및 ServiceNow는 관리 소스가 팀을 제어하지 않는 경우에만 팀 이름을 업데이트합니다. 소스는 또한 {{< ui >}}Import, create, and link teams{{< /ui >}}를 사용하여 팀을 생성했어야 합니다. 팀이 생성된 후에는 팀 핸들을 변경하지 않습니다.</div>


## 팀 계층 구조 {#team-hierarchies}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-warning">
이 기능은 선택한 Datadog 사이트에서는 지원되지 않습니다({{< region-param key="dd_site_name" >}}).
</div>
{{< /site-region >}}

Teams 맵을 구축하여 팀 계층 구조를 시각화하고, 팀을 서로 중첩(하위 팀)시켜 회사의 실제 구조를 반영할 수 있습니다. 그 결과 평면적이고 연결되지 않은 팀 목록보다 더 완전한 소유권 모델이 생성됩니다. 팀의 관련 팀, 상위 팀, 자매 팀 및 하위 팀은 해당 팀 페이지의 **Info** 탭에 있는 **Hierarchy** 섹션에 표시됩니다. 조직 내 모든 팀의 전체 맵을 탐색하려면 Datadog Internal Developer Portal의 [Teams 맵][7]을 참조하세요.

{{< img src="/account_management/teams/github/manage/teams-map.png" alt="상위 팀과 하위 팀의 계층 구조를 보여주는 Teams 맵. 선택한 팀의 세부 정보 패널에는 해당 팀의 구성원과 하위 팀이 표시됩니다." style="width:100%;" >}}

계층 구조가 정의되면 다음 작업을 수행할 수 있습니다.

- **문제 에스컬레이션**: 문제가 소유 팀을 벗어날 필요가 있을 때, 계층 구조는 수동으로 다음 담당자를 추적할 필요 없이 더 넓은 가시성과 빠른 해결을 위해 상위 팀으로 문제를 라우팅합니다.
- **롤업 필터링**: 하위 팀을 하나씩 선택하지 않고도 상위 팀을 선택해 어느 하위 팀에 연결된 데이터든 모두 확인할 수 있습니다. 단일 팀이 아닌 조직 전체의 활동 범위를 확인하려는 Director 및 VP 수준 관점에서 유용합니다.
- **액세스 제어 간소화**: 상위 팀 수준에서 한 번 액세스 권한을 부여하여 모든 하위 팀에 일관된 권한을 자동으로 적용합니다.

{{< img src="account_management/teams/teams_filter_hierarchies2.png" alt="상위 팀이 확장되어 하위 팀이 표시된 팀 필터 드롭다운. 하위 팀은 확인란으로 선택할 수 있습니다." style="width:35%;" >}}

### 팀 계층 구조 설정 {#set-up-team-hierarchies}

다음 5가지 방법으로 팀 간의 계층적 관계를 정의할 수 있습니다.

- **GitHub Teams**: [GitHub][9]를 사용하여 Datadog Teams를 설정했고 GitHub Teams 계층 구조가 구성되어 있는 경우, 해당 팀 링크는 프로비저닝 중에 Datadog으로 자동 동기화되며 Teams 맵에 표시됩니다.
- **ServiceNow 할당 그룹**: [ServiceNow][12]를 사용하여 Datadog Teams를 설정했고 할당 그룹에 상위 그룹이 있는 경우, 해당 링크는 프로비저닝 중에 Datadog으로 자동 동기화되며 Teams 맵에 표시됩니다.
- **Teams API**: [팀 계층 구조 링크 생성][5]을 참조하세요.
- **Terraform**: [`datadog_team_hierarchy_links`][8] 리소스를 사용합니다.
- **Datadog UI**: 팀 페이지에서 직접 관계를 정의합니다.
   1. [Team Directory 페이지][1]에서 하위 팀 또는 상위 팀 관계를 추가할 팀을 클릭합니다.
   1. 팀 페이지의 {{< ui >}}Info{{< /ui >}} 탭에서 {{< ui >}}Hierarchy{{< /ui >}} 섹션의 {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
   1. 팀과 연결된 상위 팀 또는 하위 팀을 선택한 다음 {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 제한 {#limits}

- 조직에는 팀이 최대 5,000개까지 있을 수 있습니다.
- 팀 계층 구조는 최대 10단계까지 깊어질 수 있습니다.

## ID 공급자를 통해 팀 관리 {#manage-teams-through-an-identity-provider}

관리형 팀을 설정할 때, ID 공급자 통합을 통해 팀의 다음 속성을 외부에서 구성합니다.
 - 팀 이름
 - 팀 핸들
 - 팀 멤버십(해당 ID 공급자 그룹에서 동기화됨)

관리형 팀을 ID 공급자의 구성과 일치하게 유지하려면 Datadog 사이트나 API가 아닌 ID 공급자에서 관리형 속성을 변경하세요.

Datadog은 관리형 팀을 위해 Okta 및 기타 SCIM 호환 ID 공급자를 지원합니다.

관리형 팀의 기능 및 설정 방법에 대한 자세한 내용은 [SCIM][3]을 참조하세요.

## SAML 속성 매핑 {#saml-attribute-mapping}

SAML 속성을 사용해 팀과 팀 구성원 자격을 관리하려면 [Map SAML 속성을 팀에 매핑][2]을 참고하세요.

## 팀 관리 위임 {#delegate-team-management}

개방형 멤버십 모델의 경우 {{< ui >}}Anyone in the organization{{< /ui >}}이 멤버를 추가하거나 제거할 수 있도록 기본 팀 설정을 구성합니다. 누구나 팀을 만들거나 팀 세부 정보를 편집할 수 있도록 적절한 역할에 `teams_manage` 권한을 할당하세요.

팀 중심의 멤버십 모델을 선호하는 경우, 기본 팀 설정을 구성하여 {{< ui >}}Team Managers{{< /ui >}} 또는 {{< ui >}}Team Managers and Members{{< /ui >}}에서 멤버를 추가하거나 제거할 수 있도록 합니다. 모든 팀 관리자가 포함된 역할에 `teams_manage` 권한을 할당합니다.

엄격한 멤버십 모델을 적용하려면 기본 팀 설정을 구성하여 {{< ui >}}Only users with user_access_manage{{< /ui >}}에서 멤버를 추가하거나 제거할 수 있도록 합니다. `teams_manage` 권한은 조직 관리자에게만 할당하세요.

[1]: https://app.datadoghq.com/organization-settings/teams
[2]: /ko/account_management/saml/mapping/#map-saml-attributes-to-teams
[3]: /ko/account_management/scim/
[5]: /ko/api/latest/teams/create-a-team-hierarchy-link/
[6]: /ko/incident_response/on-call/
[7]: https://app.datadoghq.com/software?selectedComponent=team
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team_hierarchy_links
[9]: /ko/account_management/teams/github/
[10]: /ko/api/latest/teams/
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/team
[12]: /ko/account_management/teams/servicenow/