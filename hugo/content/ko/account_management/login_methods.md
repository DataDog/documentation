---
title: 로그인 방식 설정
---

로그인 방법은 사용자가 Datadog 조직에 로그인하고 인증하는 방법을 결정합니다. 로그인 방법을 사용하여 기본 로그인 방법을 활성화하거나 비활성화하려면, 다음 액세스 권한 중 하나가 필요합니다.

- Datadog 관리자 역할
- 조직 관리(`org_management`) 권한

로그인 방법이 기본적으로 활성화되어 있는 경우, 사용자 이름(이메일 주소)이 조직에 초대된 사용자와 일치하는 경우 명시적으로 액세스가 거부되지 않은 사용자([사용자 로그인 방법 재정의][1]에 의해)는 누구나 해당 로그인 방법을 사용하여 Datadog에 액세스할 수 있습니다.

다음 로그인 방법을 사용할 수 있습니다.

- Datadog 사용자 이름 및 비밀번호(또한, 표준으로 알려짐)
- Google로 로그인
- [SAML을 통한 로그인][2]

## 기본 로그인 방법 활성화 또는 비활성화

조직 관리자는 조직의 기본 로그인 방법을 사용하거나 사용하지 않도록 설정할 수 있습니다. 새 조직은 **Datadog 사용자 이름 및 비밀번호**와 **Google로 로그인**이 모든 조직과 사용자에 대해 활성화 및 설정된 상태로 시작됩니다. SAML을 설정한 이후에는 **SAML을 통한 로그인**도 활성화됩니다.

1. [로그인 방법][3]으로 이동합니다.
2. 조직의 기본 설정 또는 정책 요구 사항에 따라 각 방법의 **기본값으로 사용** 설정을 `On` 또는 `Off` 으로 설정합니다.
3. 선택 사항을 확인합니다.

**참고**: 조직에 로그인 방법 모두를 비활성화할 수 없습니다. 기본적으로 하나 이상의 로그인 방법을 활성화해야 합니다.

## 다단계 인증 요청

보안 강화를 위해 조직 관리자는 이메일과 비밀번호로 로그인하는 조직의 모든 사용자에 대해 [다단계 인증][4](MFA)을 적용할 수 있습니다.

1. [로그인 방법][3]으로 이동합니다.
2. 조직의 기본 설정 또는 정책 요구 사항에 따라 **다단계 인증 요청**을 `On` 또는 `Off`로 설정합니다.
3. 선택 사항을 확인합니다.

**다단계 인증 요청**을 `On`으로 설정하면 다음과 같은 두 가지 효과가 있습니다.
- 이메일과 비밀번호로 로그인한 사용자는 조직에 액세스하기 전에 두 번째 인증 방식을 등록해야 합니다.
- 로그인 방법에서 [**MFA 없는 사용자 보기**][5] 링크가 표시됩니다. 링크를 클릭하면 MFA가 없는 사용자로 필터링된 사용자 목록을 확인할 수 있습니다.

다단계 인증 요청 설정은 기본 로그인 방법 설정과는 별개입니다. 기본적으로 어떤 로그인 방법을 활성화했는지와 관계없이, MFA를 적용하려면 이메일과 비밀번호로 로그인하는 사용자에게 두 번째 인증 방식이 요청됩니다.

## 사용자 재정의 검토

재정의 기능을 사용하면 개별 사용자가 사용할 수 있는 로그인 방법을 변경할 수 있습니다. 조직에서 기본적으로 **Google로 로그인**이 꺼져 있지만, 한 사용자가 재정의 설정으로 이를 활성화한 예시를 살펴보겠습니다.

{{< img src="account_management/login_methods_enabled_off.png" alt="Login method disabled, with user override enabled" style="width:80%;">}}

[사용자 관리][6]에서 설정한 재정의 방법을 기준으로 사용자를 필터링하거나 기본 로그인 방법을 사용하도록 설정한 사용자를 볼 수 있습니다.

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="User Management view filtered to show users by login methods set." style="width:80%;">}}

사용자의 재정의 내용을 편집하거나 재정의 내용을 모두 제거하여 사용자가 기본값만 사용하도록 할 수 있습니다. 자세한 내용은 [사용자 로그인 방법 편집][1]을 참조하세요.

[1]: /ko/account_management/users/#edit-a-users-login-methods
[2]: /ko/account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: /ko/account_management/multi-factor_authentication/
[5]: https://app.datadoghq.com/organization-settings/users?filter%5Ballowed_login_methods%5D=standard&filter%5Bmfa_enabled%5D=false&filter%5Bstatus%5D=Active
[6]: https://app.datadoghq.com/organization-settings/users