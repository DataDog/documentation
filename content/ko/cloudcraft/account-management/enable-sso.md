---
title: SSO 활성화
---

계정에서 SSO(Single Sign-On)를 활성화하면 Cloudcraft 인증과 로그인 액세스를 단순화할 수 있습니다.

Cloudcraft는 다음과 같은 메서드를 통해 SSO를 지원합니다.

- **Datadog SSO**: Datadog SSO는 새로운 계정에 대한 추가 설정을 필요로 하지 않습니다. Cloudcraft의 가입 또는 로그인 페이지에서 **Sign in with Datadog**를 선택합니다. 기존 계정에서 이 기능을 활성화하려면 [Cloudcraft 지원 팀][1]에 
  문의하세요.
- **Google Workspace SSO**: Google SSO는 추가 설정을 필요로 하지 않습니다. Cloudcraft의 가입 또는 로그인 페이지에서 **Sign in with Google**을 선택합니다.
- **SAML SSO**: Cloudcraft Pro 및 Enterprise 계정에서 사용 가능합니다. SAML SSO는 조직의 기존 ID 공급자와의 협력을 통해 해당 기존 계정을 사용해 사용자가 로그인할 수 있도록 해줍니다. 또한 조직은 중앙에서 애플리케이션에 액세스하는 사람을 관리할 수 있습니다.

이 글에서는 SAML SSO에 대한 자세한 정보와 계정에서 해당 기능을 설정하는 방법을 설명합니다.

## SAML/SSO 설정하기

<div class="alert alert-info">계정 소유자만이 SAML SSO 기능을 설정할 수 있습니다. 계정 소유자가 SSO를 설정할 수 없는 경우 <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">Cloudcraft 지원 팀에 문의하여</a> 이 기능을 활성화합니다.</div>

1. **User** > **Security & SSO**로 이동합니다.
2. SAML ID 공급자를 사용해 새 애플리케이션으로 Cloudcraft를 등록하세요. 자세한 지침은 다음 글을 참조하세요.
    - [Azure AD를 통한 SSO 활성화][2]
    - [Okta를 통한 SSO 활성화][3]
    - [일반 ID 공급자를 통한 SSO 활성화][4]
3. 동일한 창에서 필요한 상세 정보를 찾아 ID 공급자로 새 애플리케이션을 생성하세요.

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Cloudcraft SAML 서비스 공급자 통합 설정" responsive="true" style="width:100%;">}}

4. 애플리케이션을 생성한 후 Cloudcraft로 돌아와 ID 공급자의 메타데이터 파일을 업로드합니다.
5. **SAML Single Sign-On is enabled** 옵션을 선택합니다.
6. Cloudcraft가 SAML SSO 사용자에게만 액세스를 제한하도록 하려면 **Strict mode** 옵션을 활성화합니다.

## 추가 기능

Cloudcraft를 사용한 SAML SSO를 활성화하면 많은 수의 사용자를 관리할 때 특히 유용하며 그외 여러 가지 혜택을 누릴 수 있습니다.

### 적시 사용자 프로비저닝

**Just-in-Time User Provisioning**을 사용하면 Cloudcraft가 사용자가 회사 이메일 주소로 최초 가입할 때 초대 없이도 사용자 계정을 자동으로 생성할 수 있습니다.

이 옵션은 사용자가 최초로 로그인할 때 가입한 기본 팀을 변경할 수 있으며, **Security & Single Sign-On** 페이지 아래에서 찾아볼 수 있습니다.

### ID 공급자(IdP) 시작 로그인

ID 공급자 대시보드에서 바로 Cloudcraft에 로그인 허용

### 엄격 모드

**Strict mode**를 활성화하면 모든 사용자가 SAML SSO로 로그인해야 합니다. 기존 사용자 이름/비밀번호 또는 Google Sign In 로그인이 비활성화됩니다.

계정이 잠기는 것을 피하려면 이 옵션을 활성화하기 전 SAML SSO 로그인이 올바르게 작동하는지 확인하세요.

[1]: https://app.cloudcraft.co/app/support
[2]: /ko/cloudcraft/account-management/enable-sso-with-azure-ad/
[3]: /ko/cloudcraft/account-management/enable-sso-with-okta/
[4]: /ko/cloudcraft/account-management/enable-sso-with-generic-idp/