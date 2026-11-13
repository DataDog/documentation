---
description: Datadog Teams를 생성한 다음 ServiceNow 할당 그룹과 연결해 팀과 할당 그룹을 동기화 상태로 유지할 수 있습니다.
further_reading:
- link: /integrations/servicenow/
  tag: 문서
  text: ServiceNow 통합
- link: /account_management/teams/
  tag: 문서
  text: Datadog Teams
- link: /account_management/teams/github/
  tag: 문서
  text: GitHub를 통한 Datadog Teams 프로비저닝
title: ServiceNow를 통한 Datadog Teams 프로비저닝
---
## 개요 {#overview}

조직에서 이미 ServiceNow의 할당 그룹을 유지 관리하고 있는 경우, 팀을 수동으로 다시 생성하는 대신 해당 그룹을 Datadog Teams의 소스로 사용할 수 있습니다. ServiceNow 할당 그룹을 Datadog Teams에 연결하면 다음 작업이 지원됩니다.

- ServiceNow 할당 그룹에서 Datadog Teams 생성
- 기존 Datadog Teams를 ServiceNow 할당 그룹에 연결. 예를 들어, ServiceNow 그룹별로 On-Call 및 인시던트를 라우팅할 수 있습니다.
- 일회성 또는 반복 일정에 따라 팀 멤버십을 ServiceNow와 동기화 상태로 유지

ServiceNow 할당 그룹에 상위 그룹이 있는 경우, Datadog은 프로비저닝 중에 동일한 계층 구조를 복제합니다.

Datadog 팀 [handle][7]이 ServiceNow 할당 그룹 이름과 일치하면 기존 Datadog Teams는 중복되지 않고 연결됩니다. 이름 비교 시 대소문자를 구분하지 않으며 공백 차이도 무시합니다. 기타 모든 기존 Datadog Teams 및 해당 권한은 영향을 받지 않습니다.

Datadog은 ServiceNow 할당 그룹에 대한 읽기 전용 액세스 권한이 있습니다. Datadog은 해당 그룹에 데이터를 쓰거나 해당 그룹을 생성 또는 수정하지 않습니다.

## 전제 조건 {#prerequisites}

### ServiceNow 통합 {#servicenow-integration}

Datadog 조직은 [ServiceNow 통합][1]을 통해 최소 하나의 ServiceNow 인스턴스에 연결되어 있어야 합니다. 표준 통합 설정 외에 추가적인 ServiceNow 권한은 필요하지 않습니다.

통합은 Datadog 조직별로 구성됩니다.

### 권한 {#permissions}

- 팀 연결 및 생성에는 `teams_manage` 권한이 필요합니다.
- 팀 멤버십 동기화에는 `user_access_manage` 권한이 필요합니다.
- ServiceNow 통합을 설정하거나 타일을 편집하여 할당 그룹 필터를 추가 또는 변경하려면 `manage_integrations` 권한이 필요합니다.

## 설정 {#setup}

### ServiceNow 할당 그룹을 Datadog Teams에 연결 {#connect-servicenow-assignment-groups-to-datadog-teams}

1. [Teams > Data Sources][6]로 이동합니다.
2. {{< ui >}}ServiceNow{{< /ui >}}를 선택합니다.
3. 가져오기 유형을 선택합니다.
   - {{< ui >}}Import, create, and link teams{{< /ui >}}: Datadog은 범위 내의 각 ServiceNow 할당 그룹에 대한 팀을 생성하고 해당 그룹에 연결합니다.
   - {{< ui >}}Link only{{< /ui >}}: Datadog은 팀을 생성하지 않고 기존 Datadog Teams를 일치하는 할당 그룹에 연결합니다. Datadog 또는 SAML에서 팀을 관리하고 Datadog-to-ServiceNow 매핑만 필요한 경우 이 옵션을 사용하세요.
4. ServiceNow에서 팀 멤버십을 관리할지 선택합니다. {{< ui >}}Import, create, and link teams{{< /ui >}}를 선택하면 Datadog이 생성하는 팀에 구성원이 포함되도록 멤버십 동기화를 켭니다. 멤버십 동기화가 적용되기까지 최대 24시간이 소요될 수 있습니다.
5. 동기화 주기를 선택합니다.
   - {{< ui >}}One-time{{< /ui >}}: Datadog이 할당 그룹을 한 번 가져옵니다.
   - {{< ui >}}Recurring{{< /ui >}}: Datadog이 24시간마다 최소 한 번 동기화합니다.
6. 연결된 ServiceNow 인스턴스 중 포함할 인스턴스를 선택합니다.
7. {{< ui >}}Save{{< /ui >}}를 선택합니다.

### 할당 그룹 필터링 {#filter-assignment-groups}

기본적으로 Datadog은 선택한 인스턴스의 모든 할당 그룹을 동기화합니다. 일부만 동기화하려면 [ServiceNow 통합 타일][3]에서 ServiceNow [인코딩된 쿼리 구문][4]을 사용하여 필터를 추가합니다. Datadog은 필터를 ServiceNow에 전달하고 일치하는 할당 그룹만 수신합니다.

일반적인 필터는 다음과 같습니다.

- 활성 할당 그룹만
- 서비스 카탈로그에 나타나는 할당 그룹만

첫 번째 동기화 전에 필터를 정의합니다. 나중에 범위를 좁혀도 이미 존재하는 팀은 삭제되지 않습니다. [동기화에서 할당 그룹 제거](#removing-assignment-groups-from-the-sync)를 참조하세요.

### 제한 {#limits}

Datadog은 조직당 최대 100,000개의 할당 그룹과 할당 그룹당 최대 10,000명의 구성원을 가져옵니다. 할당 그룹에서 생성된 팀도 최대 팀 수와 계층 구조 깊이를 포함한 [Datadog Teams 제한][9]에 포함됩니다.

할당 그룹이 이러한 제한을 초과하면 Datadog에는 가져오기가 시작되기 전에 필터링하라는 메시지가 표시됩니다. [필터](#filter-assignment-groups)를 사용하여 가져올 할당 그룹 수를 줄이거나 [Datadog 지원][8]에 문의하여 제한 확대를 요청하세요.

### Datadog Teams 조회 {#view-datadog-teams}

1. [Teams > Data Sources][6]로 이동합니다.
2. 생성되거나 연결된 팀이 표시되지 않으면 {{< ui >}}Refresh{{< /ui >}}를 선택합니다.
3. 필요시 Datadog Teams를 수동으로 편집하여 원하는 상태로 만듭니다.

[Teams][2] 목록에서도 동기화된 팀을 찾을 수 있습니다. {{< ui >}}Connection{{< /ui >}} 패싯을 `ServiceNow`로 필터링합니다.

## 사용자 일치 {#user-matching}

Datadog은 이메일 주소를 기준으로 사용자를 일치시킵니다. 사용자의 Datadog 이메일 주소가 ServiceNow의 이메일 주소와 일치하면 해당 사용자가 팀에 추가됩니다.

이 통합은 Datadog 사용자를 생성하거나 초대장을 보내지 않습니다. ServiceNow 할당 그룹의 구성원에게 Datadog 계정이 없는 경우 Datadog은 해당 구성원을 건너뜁니다.

도메인 마이그레이션 후와 같이 사용자의 이메일 주소가 변경되면 Datadog과 ServiceNow 모두에서 주소를 업데이트하세요. 다음 동기화 시 새 주소를 가져와 사용자를 다시 연결합니다.

## 할당 그룹 이름 바꾸기 {#renaming-assignment-groups}

Datadog은 고유 ID로 각 ServiceNow 할당 그룹을 식별하므로, ServiceNow에서 그룹 이름을 바꾸더라도 Datadog 팀이 생성되지는 않습니다. Datadog 팀 handle은 변경되지 않으므로 해당 handle로 태그가 지정된 텔레메트리와 대시보드는 팀에 계속 연결됩니다.

Datadog 팀 이름은 다음 조건이 모두 충족될 때만 ServiceNow에서 변경된 이름을 따릅니다.

- ServiceNow 연결이 Datadog 팀을 생성했습니다.
- SCIM과 같은 다른 소스가 팀을 관리하지 않습니다.
- 연결이 {{< ui >}}Import, create, and link teams{{< /ui >}}를 사용합니다.

그 외의 모든 경우에는 Datadog이 팀 이름을 변경하지 않고 그대로 둡니다.

## 동기화에서 할당 그룹 제거 {#removing-assignment-groups-from-the-sync}

할당 그룹이 동기화에서 제외되면(예: 필터 범위를 좁힌 경우) Datadog은 일치하는 Datadog 팀을 삭제하지 않습니다. 대신 Datadog은 동기화된 모든 멤버를 팀에서 제거하고 멤버가 없는 상태로 팀을 그대로 둡니다. 이는 일회성 동기화와 반복 동기화 모두에 적용됩니다.

비어 있는 팀을 제거하려면 다음 단계를 따르세요.

1. [Teams][2]로 이동합니다.
2. {{< ui >}}Connection{{< /ui >}} 패싯을 `ServiceNow`로 필터링합니다.
3. 제거할 팀을 선택하고 삭제합니다.

동기화로 인해 변경된 사항은 자동으로 되돌릴 수 없습니다. [Audit Trail][5]은 각 변경 사항을 기록하며 이를 사용하여 이전 상태를 수동으로 복원할 수 있습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/servicenow/
[2]: https://app.datadoghq.com/organization-settings/teams
[3]: https://app.datadoghq.com/integrations/servicenow
[4]: https://www.servicenow.com/docs/r/platform-user-interface/c_EncodedQueryStrings.html
[5]: /ko/account_management/audit_trail/
[6]: https://app.datadoghq.com/organization-settings/teams/data-sources
[7]: /ko/account_management/teams/#team-handle
[8]: /ko/help/
[9]: /ko/account_management/teams/manage/#limits