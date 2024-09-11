---
aliases:
- /ko/account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
title: Azure Active Directory SAML IdP
---

## 구성

[Datadog의 Azure Active Directory 싱글 사인온(SSO) 통합][1] 튜토리얼에 따라 Azure AD를 SAML IdP로 설정하세요. **참조**: Azure AD 구독이 필요합니다. 구독하지 않는 경우 [무료 계정][2]으로 가입하셔야 합니다.

### Datadog

1. [Datadog SAML 페이지][3]로 이동합니다.

2. Azue에서 다운로드한 **SAML XML Metadata** 파일을 선택하고 업로드합니다.

3. **SAML is ready**라는 메시지와 **Valid IdP metadata installed**라는 메시지가 표시됩니다.

    {{< img src="account_management/saml/SAML_Configuration___Datadog11.png" alt="SAML_Configuration___Datadog11" style="width:70%;">}}

4. **Enable**을 클릭해 Azure AD 싱글 사인온과 SAML을 사용하세요.

    {{< img src="account_management/saml/SAML_Configuration___Datadog12.png" alt="SAML_Configuration___Datadog12" style="width:70%;">}}

### 고급 URL

Datadog 버튼이나 링크로 SSO를 사용 중이라면 로그인 URL이 필요합니다.

1. [Datadog SAML 페이지][3]에서 싱글 사인온 URL을 불러오세요.

    {{< img src="account_management/saml/SAML_Configuration___Datadog13.png" alt="SAML_Configuration___Datadog13" style="width:70%;">}}

2. Azure에서 Azure 애플리케이션 SSO Configuration 섹션으로 이동하여 **Show advanced URL settings**를 체크한 다음 싱글 사인온 URL을 추가합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.microsoft.com/en-us/azure/active-directory/saas-apps/datadog-tutorial
[2]: https://azure.microsoft.com/free/
[3]: https://app.datadoghq.com/saml/saml_setup
