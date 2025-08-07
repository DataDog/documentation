---
title: Okta를 통한 SSO 활성화
---

Okta를 ID 공급자로 SSO(Single Sign-On)를 활성화하면 Cloudcraft 인증 및 로그인 액세스를 단순화할 수 있습니다.

이 글에서는 ID 공급자가 Okta인 경우 SSO를 설정하는 방법을 알려드립니다. 기타 ID 공급자의 경우 다음 글을 참조하세요.

- [Azure AD를 통한 SSO 활성화][1]
- [일반 ID 공급자를 통한 SSO 활성화][2]

Cloudcraft에서 SSO를 사용하는 일반적인 방법에 대한 정보는 [계정에서 SSO 활성화][3]를 확인하세요.

## SAML/SSO 설정

<div class="alert alert-info">계정 소유자만이 SAML SSO 기능을 설정할 수 있습니다. 계정 소유자가 SSO를 설정할 수 없는 경우 <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">Cloudcraft 지원 팀에 문의하여</a> 이 기능을 활성화하세요.</div>

1. Cloudcraft에서 **User** > **Security & SSO**로 이동합니다.
2. Okta를 사용해 새로운 애플리케이션을 생성하는 데 필요한 자세한 정보는 **Cloudcraft service provider details** 섹션에서 찾을 수 있습니다.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/service-provider-details.png" alt="Cloudcraft 서비스 공급자의 ID 공급자 구성 상세 정보(엔티티 ID, 어설션 소비자 서비스 URL 포함) 스크린샷." responsive="true" style="width:100%;">}}

3. 관리자로 Okta로 로그인합니다.
4. **Application**을 클릭합니다.
5. **Add Application**과 **Create New App**을 차례로 클릭합니다.
6. 로그인 메서드로 **SAML 2.0**을 선택한 다음 **Create**을 클릭합니다.
7. 애플리케이션 이름으로 **Cloudcraft**를 입력하고 남은 값을 그대로 둡니다.
8. **Next**를 클릭합니다.

<div class="alert alert-info">앱 로고를 사용하고 싶을 경우 Okta의 크기 제한을 준수하는 <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">이 로고</a>를 사용할 수 있습니다.
</div>

9. 다음으로, Cloudcraft에서 제공한 상세 정보를 사용하여 SAML 통합을 설정합니다. 필드는 다음과 같이 매핑됩니다. 첫 번째 필드는 Okta의 레이블이 되고 두 번째 필드는 Cloudcraft의 레이블이 됩니다.
    - **Single sign on URL**: 어설션 소비자 서비스 URL
    - **Audience URI**: 서비스 공급자 엔터티 ID

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-settings.png" alt="SAML 설정 인터페이스 스크린샷(SSO URL 및 엔티티 ID 구성 필드 포함)" responsive="true" style="width:80%;">}}

10. **Name ID format** 드롭다운에서 **EmailAddress**를 선택합니다.
11. 다음 화면을 진행하고 **I'm an Okta customer adding an internal app**을 선택하여 "고객 아니면 파트너이신가요?"란 질문에 답합니다. 
12. **Finish**를 클릭합니다. 이제 애플리케이션이 Okta에서 설정되었습니다. 사용자를 할당하고 완료되면 **Sign On** 탭으로 이동합니다.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/sign-on-settings.png" alt="Screenshot displaying SAML 2.0 configuration settings in a Okta 애플리케이션 통합 인터페이스의 SAML 2.0 구성 설정을 표시하는 스크린샷" responsive="true" style="width:80%;">}}

13. **View Setup Instructions** 아래에서 파란색 링크를 클릭하여 Cloudcraft로의 업로드에 필요한 파일을 다운로드합니다.
14. Cloudcraft로 다시 이동하여 설정 파일을 업로드합니다.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/upload-metadata.png" alt="성공적으로 설정된 SAML SSO(Single Sign-On) 상태 및 보안 설정 인터페이스에 표시된 ID 공급자 URL" responsive="true" style="width:80%;">}}

15. **SAML Single Sign-On is enabled** 옵션을 선택합니다.
16. ID 공급자를 통해서만 Cloudcraft에 사용자가 액세스하도록 하려면 **Strict mode** 옵션을 활성화합니다.

[1]: /ko/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /ko/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /ko/cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/app/support