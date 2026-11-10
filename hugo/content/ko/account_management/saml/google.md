---
aliases:
- /ko/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
description: 안전한 싱글 사인온(SSO)을 위해 서비스 공급자 세부정보와 속성 매핑을 지정하여 Google을 Datadog의 SAML ID
  공급자로 구성합니다.
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 및 조직 설정하기
title: Google SAML IdP
---
## Google을 SAML IdP로 설정 {#setting-up-google-as-a-saml-idp}

[전용 Google 안내를 참조하세요][1]

## 서비스 공급자 세부정보 {#service-provider-details}

전제 조건으로 Datadog [SAML 설정 페이지][2]에서 {{< ui >}}IDP initiated SSO{{< /ui >}} 확인란이 선택되어 있어야 합니다.

Application Name
: 원하는 값 사용 가능

Description
: 원하는 값 사용 가능

ACS URL
: [SAML 설정 페이지][2]의 {{< ui >}}Assertion Consumer Service URL for IdP Initiated Login{{< /ui >}} 아래에 표시된 URL(`/id/`이 포함된 URL)을 사용합니다. Assertion Consumer Service URL에 대해 둘 이상의 값이 표시되는 경우, 그중 하나만 여기에 입력합니다.

Entity ID
: [SAML 설정 페이지][2]의 {{< ui >}}Entity ID{{< /ui >}} 아래에 표시된 URL을 사용합니다.

Start URL
: 비워 두거나 [SAML 설정 페이지][2]에 나열된 {{< ui >}}Single Sign On Login URL{{< /ui >}}을 사용합니다.

Signed Response
: 선택하지 않은 상태로 둡니다.

Name ID
: {{< ui >}}Basic Information{{< /ui >}} 및 {{< ui >}}Primary Email{{< /ui >}}을 선택합니다.

## 속성 매핑 {#attribute-mapping}

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"

또, 다음을 추가합니다.

* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup