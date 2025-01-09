---
aliases:
- /ko/account_management/team/
description: 조직에서 사용자를 추가하거나 삭제하고, 사용자 역할을 수정하세요.
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/rbac/
  tag: 설명서
  text: 역할 생성, 갱신, 삭제 방법 자세히 알아보기
- link: /account_management/rbac/permissions/
  tag: 설명서
  text: 사용 가능한 권한 목록 살펴보기
- link: /api/v1/users/
  tag: 설명서
  text: USER API로 사용자 관리하기
title: 사용자 관리
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">정부 사이트용 Datadog는 SAML 로그인만을 지원합니다.</div>
{{< /site-region >}}

Datadog **Organization Settings**의 **User** 탭에서 사용자와 사용자에게 할당된 역할을 관리하세요. 오른쪽에서 **List View** 또는 **Grid View**를 눌러 목록 보기와 그리드 보기 화면을 전환할 수 있습니다.

## 새 구성원 추가 및 초대 관리

조직에 새 구성원을 추가하는 방법:

1. Organization Settings 페이지로 이동해 **Users** 탭을 클릭합니다.
2. 페이지 상단 오른쪽 모서리의 **Invite Users**를 클릭합니다.
3. Datadog 계정에 초대하고자 하는 사용자 이메일 주소를 입력합니다.
4. 사용자에게 하나 이상의 [사용자 역할][1]을 배정합니다.
**참조**: 사용자 초대(Invite User) 권한이 있는 사용자는 본인이 보유한 모든 역할에 사용자를 초대할 수 있습니다. 사용자 초대 및 액세스 관리(Access Management) 권한이 있는 사용자는 모든 역할에 사용자를 초대할 수 있습니다.
5. **Send Invites**를 클릭합니다.

신규 사용자는 로그인 링크가 담인 이메일을 받습니다 사용자는 로그인하기 전까지 `Invite Pending` 상태로 표시됩니다. 로그인하기 전에 초대를 취소하려면 목록 보기 화면에서 사용자 열 오른쪽이나 그리드 보기 화면의 사용자 박스에 있는 **Delete Invite** 버튼을 누르세요.

목록 보기 화면에서 초대를 재전송하려면 사용자를 클릭해 사용자 패널을 연 다음 **Resend Invite**를 클릭합니다. 또는 그리드 보기 화면에서 사용자 상자 위에 커서를 올린 다음 **Resend Invite**를 선택하세요.

## 사용자 역할 편집

사용자 액세스 관리 권한이 허용된 사용자(예: Datadog Admin 역할이 배정된 사용자)만이 다른 사용자의 역할을 변경할 수 있습니다.

사용자 역할을 편집하는 방법:

1. **Organization Settings**의 **Users** 탭으로 이동합니다.
2. 사용자 열 오른쪽의 **Edit** 버튼을 선택하세요.
3. 해당 사용자에게 배정할 새 [사용자 역할][2]을 선택하거나, 기존 역할 옆의 'X' 기호를 클릭해 역할을 삭제합니다.
4. 새 설정을 **저장합니다**.

{{< img src="account_management/users/user_role_update.png" alt="사용자 역할 업데이트" style="width:80%;">}}

사용 가능한 모든 역할과 커스텀 역할을 생성하는 법을 알아보려면 [역할 기반 액세스 관리 가이드][2]를 참조하세요.

## 사용자 로그인 수단 편집

사용자 액세스 관리 권한이 허용된 사용자(예: Datadog Admin 역할이 배정된 사용자)만이 다른 사용자의 로그인 수단을 변경할 수 있습니다.

조직용 기본 로그인 수단은 Login Methods 페이지에서 설정합니다. 페이지에서 조직에 소속된 모든 사용자가 Datadog 사용자 이름과 비밀번호를 사용할지, Google로 로그인할지, SAML로 로그인할지 허용하거나 금지할 수 있습니다. 사용자 관리에서 사용자 별로 특정 사용자가 설정을 덮어써 하나의 수단이나 여러 수단을 사용하도록 허용할 수 있습니다. 모든 사용자가 SAML을 사용하길 원하지만, 특정 사용자 세트는 긴급 시 사용자 이름과 비밀번호로 로그인할 수 있도록 허용하고자 하는 상황에 유용한 기능입니다.

사용자의 로그인 수단을 편집하는 방법:

1. **Organization Settings**의 **Users** 탭으로 이동합니다.
2. 사용자 열 오른쪽의 **Edit** 버튼을 클릭합니다.
3. **Override Default Login Methods** 옆의 토글을 전환해 사용자의 설정을 덮어쓰도록 활성화하거나 비활성화하세요.
4. 덮어쓰기를 활성화한 경우, 사용자가 Datadog에 접속할 때 사용할 수 있는 로그인 수단 세트를 선택하세요. 하나의 옵션이 될 수도 있고, 조직에서 설정한 모든 옵션이 될 수도 있습니다.
5. **Save**를 클릭합니다.


**참조**: 덮어쓰기는 유효한 로그인 수단에서만 설정할 수 있습니다. SAML을 설정하지 않은 경우에는 사용자가 덮어쓰기할 로그인 수단으로 선택할 수 없습니다.

## 기존 구성원 비활성화

액세스 관리 권한이 허용된 사용자(예: Datadog Admin 역할이 배정된 사용자)만이 구성원을 비활성화할 수 있습니다. 사용자가 담당하는 대시보드나 모니터링이 있을 수 있으며, 해당 사용자가 수행한 작업의 기록을 남길 때 사용자 ID를 사용하므로 사용자를 영구 삭제할 수는 없습니다. 사용자를 비활성화하면 생성된 애플리케이션 키는 모두 자동으로 회수됩니다.

1. **Organization Settings**의 **Users** 탭으로 이동합니다.
2. 사용자 열 오른쪽의 **Edit** 버튼을 선택하세요.
3. **Disable** 토글을 클릭합니다.
4. 변경 사항을 **저장합니다**.
5. 동작을 확인합니다.

**참조**: 기본 설정으로, 비활성화된 사용자는 사용자 관리 페이지의 사용자 목록에서 표시되지 않도록 필터링됩니다. 필요한 권한을 정확하게 보유한 경우, `Disabled` 상태로 사용자를 필터링하여 다시 활성화할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/users/default_roles/
[2]: /ko/account_management/rbac/