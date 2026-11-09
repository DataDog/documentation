---
description: 중첩된 팀을 포함한 조직의 GitHub 팀 구조를 기반으로 Datadog Teams 자동 프로비저닝을 활성화합니다. Datadog이
  GitHub를 Teams 데이터의 소스로 사용할 수 있도록 허용합니다.
further_reading:
- link: /integrations/github/
  tag: 문서
  text: GitHub 통합
- link: https://www.datadoghq.com/blog/datadog-teams-github-integration
  tag: 블로그
  text: Datadog Teams의 GitHub 통합으로 서비스 소유권을 최신 상태로 유지
title: GitHub를 통한 Datadog Teams 프로비저닝
---
## 개요 {#overview}

GitHub 팀을 Datadog Teams에 연결하여 Datadog Teams를 자동으로 프로비저닝합니다. 다음과 같은 기능을 사용할 수 있습니다.
- GitHub 팀 구성을 기반으로 Datadog Teams 생성
- Datadog과 GitHub 간의 팀 멤버십 동기화 각 사용자는 자신의 Datadog 계정을 GitHub에 연결해야 합니다.

Datadog은 GitHub 팀 슬러그와 Datadog 팀 [핸들][1]의 이름이 정확히 일치하는지 확인하여 기존 팀을 연결합니다. 이름 비교 시 대소문자를 구분하지 않으며 공백 차이도 무시합니다.

GitHub 팀이 계층 구조로 구성되어 있으면 Datadog은 프로비저닝 과정에서 동일한 구조를 복제합니다.

**참고:** Datadog에서 하위 팀의 액세스 제한 수준은 상위 팀과 같거나 더 엄격해야 합니다. 예를 들어, 상위 팀이 [초대 전용][2]인 경우 하위 팀은 [공개][2]일 수 없습니다.

Datadog은 GitHub 팀 정보를 읽기만 합니다. Datadog은 GitHub 팀을 수정, 생성 또는 삭제하지 않습니다.

## 전제 조건 {#prerequisites}

### GitHub 통합 {#github-integration}
Datadog 조직이 GitHub 조직에 [연결][3]되어 있는지 확인합니다. GitHub 통합에 팀 데이터를 읽기 위한 `members_read` 권한이 있어야 합니다.

<div class="alert alert-info">GitHub Enterprise Cloud 및 GitHub Enterprise Server 고객이 지원됩니다. 하지만 엔터프라이즈 관리형 팀(여러 조직에 걸쳐 GitHub 엔터프라이즈 수준에서 관리되는 팀)은 지원되지 않습니다. 조직 수준에서 관리되는 GitHub 팀만 Datadog으로 프로비저닝할 수 있습니다.</div>

### 권한 {#permissions}
- 팀을 연결하고 생성하려면 Datadog 사용자에게 `teams_manage` 권한이 필요합니다. 
- 팀 멤버십을 관리하려면 Datadog 사용자에게 `user_access_manage` 권한이 필요합니다.

## 설정 {#setup}

### GitHub 팀을 Datadog Teams에 연결 {#connect-github-teams-to-datadog-teams}
1. [Teams][4]로 이동합니다.
1. 오른쪽 상단에서 {{< ui >}}GitHub Connections{{< /ui >}}를 클릭합니다.
1. 가져오기 유형, 멤버 동기화 및 동기화 주기 옵션을 선택하여 연결을 구성합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

### Datadog Teams 조회 {#view-datadog-teams}
1. [GitHub Connections][5]로 이동합니다.
1. 생성되거나 연결된 팀 목록이 비어 있으면 {{< ui >}}Refresh{{< /ui >}}를 클릭합니다.
1. 필요시 Datadog Teams를 수동으로 업데이트하여 원하는 상태로 변경합니다. 

###  사용자 구성 {#user-configuration}

관리자가 GitHub에서 팀 프로비저닝을 활성화하면 팀 세부 정보 페이지에 알림이 표시됩니다. 이 알림은 사용자에게 {{< ui >}}Log in to GitHub{{< /ui >}}를 클릭하여 OAuth를 통해 Datadog 계정을 GitHub에 연결하도록 요청합니다.

{{< img src="account_management/teams/github/connect-to-github-v2.png" alt="'Log in to GitHub' 버튼이 있는 'Not Connected to GitHub' 상자" style="width:60%;">}}

각 사용자는 Datadog과 GitHub 간의 연결을 설정하기 위해 자신의 GitHub 계정을 Datadog에 수동으로 연결해야 합니다. 이 동작은 GitHub의 OAuth 및 사용자 개인정보 보호 정책에 따라 요구됩니다.

사용자가 계정을 연결하면 Datadog은 해당 사용자가 속한 GitHub 팀에 대응하는 모든 Datadog Teams에 사용자를 추가합니다.

예를 들어 사용자 B가 GitHub의 팀 A에 속해 있다고 가정해 보겠습니다. 그러면 Datadog에서 다음 과정이 진행됩니다.
1. 관리자가 GitHub를 통한 Datadog Teams 프로비저닝 및 사용자 동기화를 활성화합니다.
1. Datadog에 멤버가 없는 팀 A가 생성됩니다.
1. 사용자 B는 {{< ui >}}Log in to GitHub{{< /ui >}} 알림을 확인하고 안내에 따라 작업을 완료합니다.
1. 사용자 B가 Datadog의 팀 A에 프로비저닝됩니다.

## 팀 삭제 {#deleting-teams}

GitHub 팀을 삭제해도 해당 Datadog 팀은 삭제되지 않습니다. 대신 Datadog에서는 다음 작업을 수행합니다.
- Datadog 팀에서 동기화된 모든 멤버 제거
- Datadog 팀과 삭제된 GitHub 팀 간의 연결 제거
- GitHub에서 동기화된 모든 계층적 연결(상위 팀과 하위 팀 간의 관계) 제거

Datadog 팀 자체는 그대로 유지되며 계속 독립적으로 관리할 수 있습니다.

### 예시 {#example}
1. GitHub에 있는 팀 A가 Datadog에 동기화됩니다(자동 생성 또는 수동 연결).
1. GitHub에서 팀 A가 삭제됩니다.
1. Datadog에서 팀 A의 동기화된 멤버, GitHub 연결 및 계층 구조 링크가 제거됩니다.
1. 팀 A는 Datadog에 유지되며 독립적으로 관리할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/teams/#team-handle
[2]: /ko/account_management/teams/manage/#team-modification-permissions
[3]: /ko/integrations/github/#connect-github-teams-to-datadog-teams
[4]: https://app.datadoghq.com/organization-settings/teams
[5]: https://app.datadoghq.com/organization-settings/teams/github-connections?github-connections__view=synced