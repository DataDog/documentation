---
description: 사용자가 필요한 액세스 권한을 권한 거부 페이지에서 직접 요청할 수 있도록 하고, 관리자를 위한 수동 또는 자동 승인 워크플로를
  제공합니다.
further_reading:
- link: /account_management/rbac/permissions/
  tag: 문서
  text: 권한
- link: /account_management/rbac/granular_access/
  tag: 문서
  text: 세분화된 액세스
- link: /getting_started/access_for_enterprises/
  tag: 가이드
  text: Enterprise용 액세스
title: 액세스 요청하기
---
{{< callout url="#" btn_hidden="true" header="false" >}}
액세스 요청은 미리 보기로 제공되고 있으며 점진적으로 출시되고 있습니다. 조직에서 아직 사용하지 못할 수도 있습니다.
{{< /callout >}}

## 개요 {#overview}

Datadog의 기능에 대한 액세스 권한을 얻으려면 누구에게 요청해야 할지 알아보고, 티켓을 제출하고, 응답을 기다려야 할 수 있습니다. 많은 역할과 사용자를 관리하는 조직에서는 이로 인해 사용자의 작업이 지연되고 관리자의 수동 작업이 늘어납니다.

액세스 요청을 사용하면 사용자가 차단된 페이지에서 직접 필요한 권한을 요청하고 요청 사유를 작성할 수 있습니다. 관리자는 중앙 대기열에서 이러한 요청을 검토 및 승인하거나, 특정 역할이 자동으로 부여되도록 구성할 수 있습니다. 모든 요청, 결정 및 사유가 [Audit Trail][2]에 표시되므로 지원 티켓 없이도 액세스 변경 사항을 추적할 수 있습니다.

## 액세스 요청 활성화 또는 비활성화 {#enable-or-disable-request-access}

**참고**: `user_access_manage` 권한이 있어야 합니다.

조직에 대해 수동 또는 자동 승인 요청을 활성화하려면 [Organization Settings][1]로 이동하여 {{< ui >}}Access Controls{{< /ui >}}를 선택한 다음 해당 구성을 생성하세요. 설정에 대한 자세한 내용은 [관리자로서 액세스 요청 구성](#configuring-access-requests-as-an-administrator)을 참조하세요.

수동 또는 자동 승인 요청을 비활성화하려면 모든 해당 구성을 삭제하세요. 별도의 내부 액세스 권한 상승 절차를 통해 액세스를 관리하는 경우 비활성화가 특히 유용합니다.

## 최종 사용자로서 액세스 요청 {#requesting-access-as-an-end-user}

### 권한 거부 페이지에서 요청 {#from-a-permission-denied-page}

권한이 필요한 페이지로 이동했는데 해당 권한이 없는 경우, Datadog은 403 권한 거부 페이지를 표시합니다. 해당 권한을 포함하는 역할에 대해 조직에서 수동 승인 또는 자동 승인 구성이 활성화된 경우, 페이지에 {{< ui >}}Request Access{{< /ui >}} 버튼이 나타납니다.

1. {{< ui >}}Request Access{{< /ui >}}를 클릭합니다.
2. 요청 사유를 입력합니다.
3. 요청을 제출합니다.

일치하는 자동 승인 구성이 있는 경우 Datadog은 1분 이내에 액세스 권한을 부여하고 알림을 보냅니다. 그렇지 않은 경우 Datadog은 수동 검토를 위해 요청을 조직의 승인자에게 보냅니다.

### Roles 페이지에서 요청 {#from-the-roles-page}

권한 거부 페이지에 먼저 도달하지 않고도 직접 역할을 요청할 수 있습니다.

1. [Organization Settings][1]로 이동하여 {{< ui >}}Roles{{< /ui >}}를 선택합니다.
2. 원하는 역할을 찾아 세부 정보 패널을 엽니다.
3. {{< ui >}}Request Access{{< /ui >}}를 클릭합니다.
4. 사유를 입력하고 제출합니다.

직접 역할 요청도 권한 거부 페이지에서 수행한 요청과 동일한 승인 및 자동 승인 규칙을 따릅니다.

### 자산 액세스 요청 {#for-an-asset}

관리자가 자동 승인 규칙을 구성한 경우 Monitors 및 Dashboards와 같은 자산에 대한 액세스 권한을 요청할 수도 있습니다.

개별 자산에 대한 액세스 권한을 요청하려면 해당 자산으로 이동하여 {{< ui >}}Request Access{{< /ui >}}를 클릭하세요. 이미 Viewer 액세스 권한이 있고 더 높은 권한 수준을 요청하려면 대신 해당 자산의 기존 공유 설정을 엽니다.

## 관리자로서 액세스 요청 구성 {#configuring-access-requests-as-an-administrator}

[Organization Settings][1]로 이동하여 {{< ui >}}Access Controls{{< /ui >}}를 선택해 모든 액세스 요청 설정을 구성하고 관리합니다. 이 페이지에 액세스하려면 `user_access_manage` 권한이 필요합니다.

### 수동 승인 {#manual-approval}

수동 승인은 요청을 승인자 목록으로 전달하며 승인자는 요청을 승인하거나 거부할 수 있습니다. 조직은 하나의 수동 승인 구성을 지원하며, 이를 활성화하면 조직 내 모든 역할에 대해 수동 요청이 활성화됩니다.

1. [Organization Settings][1]로 이동하여 {{< ui >}}Access Controls{{< /ui >}}를 선택합니다.
2. 수동 승인 구성을 생성합니다.
3. 요청을 승인할 수 있는 사용자를 선택합니다. `user_access_manage` 권한이 있는 사용자만 승인자로 지정할 수 있습니다.

승인자를 지정하지 않아도 `user_access_manage` 권한이 있는 모든 사용자는 요청을 승인하거나 거부할 수 있지만 이메일 알림은 받지 않습니다.

승인자는 Access Controls 페이지의 {{< ui >}}Pending Requests{{< /ui >}} 탭에서 보류 중인 요청을 검토하며, 각 요청에는 요청자, 역할 및 요청 사유가 표시됩니다. 승인자가 조치를 취하면 Datadog은 요청자에게 이메일을 보냅니다.

### 역할 및 권한에 대한 자동 승인 {#auto-approval-for-roles-and-permissions}

자동 승인을 사용하면 적격 사용자가 수동 검토 단계 없이 즉시 필요한 액세스 권한을 얻을 수 있습니다.

1. [Organization Settings][1]로 이동하여 {{< ui >}}Access Controls{{< /ui >}}를 선택합니다.
2. 자동 승인 구성을 생성합니다. 조직은 최대 10개의 구성을 지원합니다.
3. 이 구성에서 자동 승인할 역할을 선택합니다.
4. 필요시 이 구성을 트리거할 수 있는 사용자, 팀 또는 역할을 제한합니다. 이 필드를 비워두면 구성이 모든 사용자에게 적용됩니다.

### 임시 액세스(미리 보기) {#temporary-access-preview}

자동 승인 구성은 역할을 영구적으로 부여하는 대신 제한된 기간 동안 부여할 수 있습니다. 구성을 생성할 때 할당 기간을 1시간, 1일, 1주일, 30일 또는 영구 중에서 설정하세요.

임시 역할 할당이 만료되면 Datadog은 5분 이내에 이를 취소합니다. 사용자의 프로필 페이지 또는 [Organization Settings][1]의 {{< ui >}}Users{{< /ui >}}에서 현재 활성 상태이거나 곧 만료되는 역할 할당을 확인할 수 있습니다.

### 자산 자동 승인 {#auto-approval-for-assets}

자산 자동 승인은 동일한 셀프 서비스 모델을 개별 리소스에도 적용합니다. 조직에서 다음 리소스 유형에 대한 Viewer 또는 Editor 액세스를 자동 승인할 수 있습니다.

- Case Management 프로젝트
- Dashboards
- Monitors
- Notebooks
- Reference Tables
- Synthetic 테스트
- Synthetic 전역 변수
- Synthetic 프라이빗 위치

리소스 유형을 활성화하면 해당 유형의 모든 리소스에 구성이 적용됩니다. 역할 및 권한 자동 승인과 마찬가지로 자산 자동 승인 구성도 특정 사용자, 팀 또는 역할로 범위를 제한할 수 있습니다. 각 액세스 수준에 대해 요청자 범위를 별도로 구성하세요. 예를 들어, 모든 사용자가 대시보드에 대한 뷰어 액세스를 요청하도록 허용하면서 Editor 액세스 요청은 특정 팀으로 제한할 수 있습니다.

## Audit Trail {#audit-trail}

Datadog은 요청자, 요청된 역할 또는 리소스, 사유 및 결과를 포함하여 모든 액세스 요청을 [Audit Trail][2]에 기록합니다. Audit Trail을 사용하여 티켓이나 채팅 기록에 의존하지 않고 액세스 기록을 검토하세요.

## 역할 선택 방식 {#how-role-selection-works}

사용자가 권한 부족으로 인해 액세스를 요청하면 Datadog은 필요한 권한을 충족하면서 총 권한 수가 가장 적은 역할을 선택합니다. 권한 수에서 여러 역할이 동률을 이룰 경우, Datadog은 알파벳순으로 첫 번째 역할을 선택합니다. 이 선택 방식을 사용하면 관리자가 가능한 모든 액세스 시나리오에 각 역할을 미리 매핑하지 않아도 과도한 프로비저닝을 제한할 수 있습니다.

## 제한 사항 {#limitations}

- 귀하의 조직은 하나의 수동 승인 구성과 최대 10개의 자동 승인 구성을 지원합니다.
- 조직 내 어떤 역할에도 필요한 권한이 포함되어 있지 않으면, 사용자는 해당 권한에 대한 액세스를 요청할 수 없습니다.
- 요청은 단일 권한이 아닌 전체 역할을 부여합니다. 더 세밀한 제어가 필요한 경우 필요한 권한으로만 범위를 지정한 역할을 생성하고 이를 자동 승인 또는 수동 승인 옵션으로 설정하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/
[2]: /ko/account_management/audit_trail/