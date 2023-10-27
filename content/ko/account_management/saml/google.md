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
kind: 설명서
title: Google SAML IdP
---

## SAML IdP로 Google 설정하기

[전용 Google 안내를 참조하세요][1]

## 서버 제공업체 정보

**사전 조건**: IDP-initiated SSO를 Datadog SAML 설정 페이지에서 켜짐으로 설정해야 합니다

* **애플리케이션 이름**: 무엇이든 될 수 있습니다
* **설명**: 무엇이든 될 수 있습니다
* **ACS URL**: https://app.datadoghq.com/saml/saml_setup의 "Assertion Consumer Service URL"에 표시되는 URL(`/id/` 포함 URL)을 사용합니다. "Assertion Consumer Service URL"에 여러 URL이 표시되는 경우에는 하나만 입력해주세요.
* **엔티티 ID**:  `https://app.datadoghq.com/account/saml/metadata.xml`
* **시작 URL**: 공백으로 둘 수 있습니다. 또는, https://app.datadoghq.com/saml/saml_setup 및 https://app.datadoghq.com/account/team 페이지에 안내된 "Single Sign On Login URL"을 사용하세요.
* **서명된 응답**: 체크하지 않은 상태로 두세요
* **이름 ID**: "기본 정보" "주요 이메일"

## 속성 매핑

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "기본 정보" "주요 이메일"

또, 다음을 추가합니다.

* "urn:oid:2.5.4.4" "기본 정보" "성"
* "urn:oid:2.5.4.42" "기본 정보" "이름"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
