---
aliases:
- /ko/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
title: Auth0 SAML IdP
---

## 구성 및 설정

[Datadog용 IdP로 Auth0 설정하기][1] 가이드를 따라 SAML IdP로 Auth0을 설정하세요.

## 추가 정보

`first_name` 및 `give_name`은 Auth0 사용자의 최상위 속성(root attribute)입니다. 이 두 가지는 Auth0 관리 API에서 생성한 경우에만 설정됩니다. 자세한 정보는 [표준화된 사용자 프로필][2]을 참조하세요.

사용자 프로필의 `user_metadata` 섹션은 추가 사용자 정보를 지정할 때 사용합니다. 예를 들면 다음과 같습니다.

{{< img src="account_management/saml/auth0_metadata.png" alt="여기를 업데이트" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://auth0.com/docs/protocols/saml-protocol/saml-configuration-options/configure-auth0-as-identity-provider-for-datadog
[2]: https://auth0.com/docs/users/normalized/auth0#normalized-user-profile-schema
