---
aliases:
- /ko/account_management/faq/how-do-i-use-the-mobile-app-with-saml/
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
is_public: true
title: IdP Initiated SAML을 사용하는 Datadog 모바일 앱
---

## 구성

Datadog 모바일 앱에서 IdP Initiated SAML을 사용하려면, Datadog를 통해 추가 릴레이 상태(Relay State)를 전달하여 로그인 시 모바일 앱 랜딩 페이지를 트리거해야 합니다. 활성화한 후에는 특정 앱에서 SAML 로그인한 모든 경우에 진행하기 전에 전면(interstitial) 페이지가 표시됩니다.

- Datadog 모바일 앱이 설치된 **모바일 기기**에서 사용자는 **먼저 모바일 브라우저를 사용해 IdP로 로그인해야 합니다**(아래 Google의 사례를 참조하세요). 다음으로, 앱이 자동으로 요청을 수신하여 사용자를 로그인하도록 처리해줍니다.

{{< img src="account_management/saml/google_idp_tile_sml.png" style="width:60%; background:none; border:none; box-shadow:none;" alt="Google IDP 릴레이 상태" >}}

- **데스크톱 기기** 또는 앱이 설치되지 않은 기기에서 사용자가 "Use the Datadog Website"를 클릭해야 다음 단계로 진행됩니다.

{{< img src="account_management/saml/datadog-mobile-idp-saml-landing-page.png" alt="Datadog Mobile SAML Interstitial" >}}

## 제공업체

**참조:** Datadog IdP Initiated SAML은 대부분의 IdP와 호환됩니다. Datadog 모바일 앱에서 IdP를 설정하는 데 문제가 발생했다면 [Datadog 지원팀][1]에 문의하세요. 

### OneLogin

OneLogin 앱을 설정하는 경우 **Application Details** 페이지의 릴레이 상태를 `dd_m_idp`로 설정하세요.
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="One Login의 Application Details 페이지" >}}

### Okta

Okta 앱을 설정하는 경우 **Configure SAML** 페이지의 Default RelayState 값을 `dd_m_idp`로 설정하세요.
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Okta의 Configure SAML 페이지" >}}

### Google

SAML용으로 Google 앱을 설정한 경우 Service Provider Details의 **Start URL**을  `dd_m_idp`로 설정하세요.
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Google의 Service Provider Details 페이지" >}}

## 트러블슈팅

릴레이 상태를 설정한 다음 로그인 시 `403 Forbidden` 오류가 표시된다면 [지원팀][1]에 문의해 귀 조직에서 기능을 활성화했는지 확인하시기 바랍니다.

[1]: /ko/help/