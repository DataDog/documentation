---
aliases:
- /ko/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
title: Microsoft 액티브 디렉토리 페더레이션 서비스(AD FS) SAML IdP
---

Datadog의 SSO SAML 통합을 통해 조직과 외부 사용자 관리 시스템을 연결하면 사용자 자격 정보를 중앙 시스템에서 보관하고 관리할 수 있습니다. 이번 문서는 주요 [SAML으로 싱글 사인온][1] 가이드에 부가적으로 활용할 수 있는 내용으로, Datadog 관점에서 봤을 때의 싱글 사인온 개요를 설명해드립니다.

액티브 디렉토리 페더레이션 서비스(AD FS)용 SAML 설정을 시작하려면 Microsoft의 [AD FS를 사용하는 포털용 SAML 2.0 제공자 설정하기][2] 가이드를 참조하세요.

SAML을 설정하면 사용자가 [SAML 설정 페이지][3]에 제공된 링크를 사용해 로그인할 수 있습니다. 단, 사용자를 초대하고 활성화한 후에 로그인도 가능해진다는 점에 유의하시기 바랍니다. 사용자의 액티브 디렉토리 사용자 기록과 관련된 이메일 주소를 사용해 사용자를 초대하세요. 그렇지 않은 경우 아래와 같이 접근이 거부됩니다.

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla" style="width:60%;">}}

대부분의 설정 환경에서 사용자 `user@domain`은 Microsoft 로그인에도 사용되지만, 강제 사항은 아닙니다. 아래와 같이 사용자 기록에서 사용된 이메일 주소를 확인할 수 있습니다.

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK" style="width:60%;">}}

Datadog 앱 내에서 발생하는 SAML 오류와 관련해 궁금하신 점이 있다면 [Datadog  지원팀][4]에 문의해주세요. AD FS SAML 설정 및 오류와 관련된 문의 사항은 [Microsoft 지원팀][5]에 문의하시기 바랍니다.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/saml/
[2]: https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-saml2-settings
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /ko/help/
[5]: https://powerapps.microsoft.com/en-us/support/