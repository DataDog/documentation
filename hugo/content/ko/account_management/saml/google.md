---
aliases:
- /ko/account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
title: Google SAML IdP
---

## SAML IdP로 Google 설정하기

[전용 Google 안내를 참조하세요][1]

## 서버 제공업체 정보

전제조건으로 Datadog [SAML 설정 페이지][2]에서 **IDP initiated SSO**를 확인해야 합니다.

Application Name
: 모든 이름 가능

Description
: 무엇이든 가능

ACS URL
: [SAML 설정 페이지][2]의 **Assertion Consumer Service URL**에 표시되는 URL(`/id/`  포함 URL)을 사용합니다. Assertion Consumer Service URL에 여러 URL이 표시되는 경우 하나만 입력하세요.

Entity ID
: [SAML 설정 페이지][2]의 **Entity ID**에 표시된 URL을 사용합니다.

Start URL
: 공백으로 두거나 [SAML 설정 페이지][2]에 나열된 **Single Sign On Login URL**을 사용할 수 있습니다.

Signed Response
: 선택하지 않은 채로 둠

Name ID
: **Basic Information** 및 **Primary Email**을 선택합니다

## 속성 매핑

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "기본 정보" "주요 이메일"

또, 다음을 추가합니다.

* "urn:oid:2.5.4.4" "기본 정보" "성"
* "urn:oid:2.5.4.42" "기본 정보" "이름"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup