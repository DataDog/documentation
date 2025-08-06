---
title: 일반 ID 공급자를 통한 SSO 활성화
---

계정에서 SSO(Single Sign-On)를 활성화하면 Cloudcraft 인증과 로그인 액세스를 단순화할 수 있습니다.

이 글에서는 ID 공급자에 관한 특정 가이드가 없는 경우에 SSO를 설정하는 방법을 알려드립니다. Azure AD 또는 Okta를 사용한다면 다음 글을 참고하세요.

- [Azure AD를 통한 SSO 활성화][1]
- [Okta를 통한 SSO 활성화][2]

Cloudcraft에서 SSO를 사용하는 일반적인 방법에 대한 정보는 [계정에서 SSO 활성화][3]를 확인하세요.

## SAML/SSO 설정하기

<div class="alert alert-info">계정 소유자만이 SAML SSO 기능을 설정할 수 있습니다. 계정 소유자가 SSO를 설정할 수 없는 경우 <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">Cloudcraft 지원 팀에 문의하여</a> 이 기능을 활성화합니다.</div>

1. Cloudcraft에서 **User** > **Security & SSO**로 이동합니다.
2. Azure를 사용해 새로운 애플리케이션을 생성하는 데 필요한 자세한 정보는 **Cloudcraft service provider details** 섹션에서 찾을 수 있습니다.

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/service-provider-details.png" alt="Cloudcraft 서비스 공급자의 ID 공급자 구성 상세 정보(엔티티 ID, 어설션 소비자 서비스 URL 포함) 스크린샷." responsive="true" style="width:100%;">}}

3. 관리자로 ID 공급자에 로그인합니다.
4. 해당 설명서에 따라 SAML 통합을 위한 새로운 애플리케이션을 생성합니다.
5. 해당 필드를 Cloudcraft 필드로 매핑합니다. 필드는 참조로 보통 다음과 같이 매핑됩니다. 첫 번째 값은 ID 공급자 레이블로 사용되고 두 번째 값은 Cloudcraft 레이블로 사용됩니다.

    - **Single sign on URL**: 어서션 소비자 서비스 URL
    - **Audience URI**: 서비스 공급자 엔터티 ID
    - **Name ID**: NameId 형식

6. **Name ID** 필드가 드롭다운 형식인 경우 **emailAddress** 또는 유사한 값을 선택합니다.

<div class="alert alert-info">또한 사용자가 로그인하는 애플리케이션을 더 쉽게 확인할 수 있도록 앱 로고를 포함할 수 있습니다. 대부분의 공급자 요구 사항에 적합한 로고를 <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">여기</a>에서 찾을 수 있습니다.</div>

7. 조직 내에서 모든 관련 사용자에게 액세스를 허용하려면 애플리케이션을 구성합니다.
8. 공급자가 생성한 메타데이터 파일을 다운로드합니다. 이는 페더레이션 XML이라고 지칭되기도 합니다.
9. Cloudcraft로 다시 이동하여 메타데이터 XML 파일을 업로드합니다.

{{< img src="cloudcraft/account-management/enable-sso-with-generic-idp/upload-metadata.png" alt="보안 설정 인터페이스에 ID 공급자(URL)가 표시어 있으며 SAML SSO 상태를 성공적으로 구성함." responsive="true" style="width:100%;">}}

10. **SAML Single Sign-On is enabled** 옵션을 선택합니다.
11.  ID 공급자를 통해서만 Cloudcraft에 사용자가 액세스하도록 하려면 **Strict mode** 옵션을 활성화합니다.

[1]: /ko/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /ko/cloudcraft/account-management/enable-sso-with-okta/
[3]: /ko/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/support