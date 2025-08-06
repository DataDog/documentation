---
title: Azure AD를 통한 SSO 활성화
---

Azure AD를 ID 공급자로 SSO(Single Sign-On)를 활성화하면 Cloudcraft 인증 및 로그인 액세스를 단순화할 수 있습니다.

이 글에서는 ID 공급자가 Azure AD인 경우 SSO를 설정하는 방법을 알려드립니다. 기타 ID 공급자의 경우 다음 글을 참고하세요.

- [Okta를 통한 SSO 활성화][1]
- [일반 ID 공급자를 통한 SSO 활성화][2]

Cloudcraft에서 SSO를 사용하는 일반적인 방법에 관한 정보는 [계정에서 SSO 활성화][3]를 확인하세요.

## SAML/SSO 설정하기

<div class="alert alert-info">계정 소유자만이 SAML SSO 기능을 설정할 수 있습니다. 계정 소유자가 SSO를 설정할 수 없는 경우 <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">Cloudcraft 지원 팀에 문의하여</a> 이 기능을 활성화하세요.
</div>

1. Cloudcraft에서 **User** > **Security & SSO**로 이동합니다.
2. Azure를 사용해 새로운 애플리케이션을 생성하는 데 필요한 자세한 정보는 **Cloudcraft service provider details** 섹션에서 찾을 수 있습니다.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="Cloudcraft 서비스 공급자의 ID 공급자 구성 상세 정보(엔티티 ID, 어설션 소비자 서비스 URL 포함) 스크린샷." responsive="true" style="width:100%;">}}

3. 관리자로 Azure로 로그인합니다.
4. 화면 왼쪽 상단에서 햄버거 메뉴를 클릭한 다음 **Azure Active Directory**를 선택합니다.
5. 왼쪽 메뉴의 **Manage** 섹션에서 **Enterprise applications**를 클릭합니다.
6. **New application**를 클릭한 다음 **Non-gallery application**을 선택합니다.
7. **Cloudcraft**를 애플리케이션 이름으로 입력한 다음 **Add**를 클릭합니다.

다음으로 Cloudcraft에서 제공한 상세 정보를 사용해 SAML 통합을 설정합니다.

1. **Getting started** 섹션에서 **Set up single sign on**을 선택한 다음 **SAML**을 클릭합니다.
2. **Basic SAML Configuration** 섹션에서 **편집**을 클릭합니다.
3. Cloudcraft에서 제공한 상세 정보를 입력합니다. 필드는 다음과 같이 매핑됩니다. 첫 번째 값은 Azure AD의 레이블이고 두 번째 값은 Cloudcraft 대화 상자의 레이블입니다.
    - **Identifier**: 서비스 공급자 엔터티 ID
    - **Reply URL**: 어설션 소비자 서비스 URL
    - **Sign on URL**: ID 공급자 시작 SSO를 허용하기 위해 공란으로 둠

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="Identifier(엔터티 ID)와 Reply URL(어설션 소비자 서비스 URL) 필드를 보여주는 SAML 기본 설정 화면의 스크린샷." responsive="true" style="width:80%;">}}

4. **Save**를 클릭하여 이전 화면으로 되돌아갑니다.
5. **SAML Signing Certificate** 섹션에서 **Federation Metadata XML**을 선택한 후, XML 파일을 컴퓨터에 다운로드합니다.
6. Cloudcraft로 다시 이동하여 메타데이터 XML 파일을 업로드합니다.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="보안 설정 인터페이스에 ID 공급자(URL)가 표시어 있으며 SAML SSO 상태를 성공적으로 구성함" responsive="true" style="width:100%;">}}

7. **SAML Single Sign-On is enabled** 옵션을 선택합니다.
8. Azure 포털로 다시 이동합니다.
9. **Test single sign-on with Cloudcraft** 섹션 아래에서 **Test**를 클릭하여 통합을 테스트합니다.
10. 사용자가 Azure AD로만 Cloudcraft에 액세스하길 원하는 경우 **Strict mode** 옵션을 활성화하면 다른 모든 로그인 메서드가 비활성화됩니다.

**참고**: 조직에서 사용자에게 액세스 권한을 부여하려면 [Azure AD 설명서][4]를 참조하세요.

[1]: /ko/cloudcraft/account-management/enable-sso-with-okta/
[2]: /ko/cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /ko/cloudcraft/account-management/enable-sso/
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal
[5]: https://app.cloudcraft.co/support