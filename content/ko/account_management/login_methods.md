---
title: 로그인 방식 설정
---

로그인 방법은 사용자가 자신을 인증하고 Datadog 조직에 로그인하는 방법을 선택합니다. 로그인 방법을 사용하여 기본 로그인 방법을 활성화하거나 비활성화하려면 다음 권한 있는 액세스 권한 중 하나가 필요합니다.

- Datadog 관리자 역할
- 조직 관리(`org_management`) 권한 부여

로그인 방법이 기본적으로 활성화되면 액세스가 명시적으로 거부되지 않은 모든 사용자([사용자 로그인 방법 재정의에 의해][1]) 해당 로그인 방법을 사용하여 Datadog에 액세스할 수 있습니다. 단, 조직에 초대된 사용자 이름(이메일 주소)이 사용자와 일치해야 합니다.

다음 로그인 방법을 사용할 수 있습니다.

- Datadog 사용자 이름 및 비밀번호(표준이라고도 함)
- Google로 로그인
- [SAML로 로그인][2]

## 기본 로그인 방법 실행 또는 실행 중지

조직 관리자는 조직의 기본 로그인 방법을 사용하거나 사용하지 않도록 설정할 수 있습니다. 새 조직은 모든 사용자와 조직이 **Datadog 사용자 이름 및 비밀번호** 및 **Google로 로그인**을 사용하도록 설정 및 구성되어 있습니다. SAML을 설정한 후에는 **SAML**을 사용하여 로그인할 수도 있습니다.

1. [로그인 방법][3]으로 이동합니다.
2. 조직의 기본 설정이나 정책 요구사항에 따라 각 메서드에 대한 **Enabled by Default** 설정을 `On` 또는 `Off`로 설정합니다.
3. 선택 사항을 확인합니다.

**참고**: 조직에 로그인 방법 모두를 비활성화할 수 없습니다. 기본적으로 하나 이상의 로그인 방법을 활성화해야 합니다.

## 사용자 재정의 검토

재정의를 사용해 개별 사용자에게 사용 가능한 로그인 방법을 변경할 수 있습니다. 다음 예제는 **Google로 로그인**이 기본적으로 해제되어 있는데 사용자가 재정의 설정을 통해 활성화한 것입니다.

{{< img src="account_management/login_methods_disabled_overrides_set.png" alt="로그인 방법 비활성화, 사용자 재정의 활성화" style="width:80%;">}}

[사용자 관리][4]에서 재정의 방법을 설정해 사용자를 필터링하거나 기본 로그인 방법을 활성화한 사용자를 볼 수 있습니다:

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="로그인 방법 설정별로 필터링된 상태를 보여주는 사용자 관리 보기" style="width:80%;">}}

사용자의 재정의를 편집하거나 재정의를 제거하여 기본값만 사용할 수 있도록 할 수 있습니다. 자세한 내용은 [사용자 로그인 방법 편집][1]을 참조하세요.

[1]: /ko/account_management/users/#edit-a-users-login-methods
[2]: /ko/account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: https://app.datadoghq.com/organization-settings/users