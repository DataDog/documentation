---
algolia:
  tags:
  - saml
aliases:
- /ko/guides/saml
description: Active Directory, Auth0, Google, Okta, Microsoft Entra ID 등의 ID 공급자를
  사용하여 Datadog용 SAML 인증을 구성하고 안전한 싱글 사인온을 구현합니다.
further_reading:
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 및 조직 설정하기
title: SAML을 사용한 싱글 사인온
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog for Government 사이트는 SAML 로그인만 지원합니다.</div>
{{< /site-region >}}

## 개요 {#overview}

Datadog 계정에서 [SAML(Security Assertion Markup Language)][1]을 구성하면 SAML ID 공급자를 통해 구성한 조직의 Active Directory, LDAP, 또는 다른 ID 저장소에 저장된 보안 인증 정보로 나와 내 팀이 Datadog로 로그인할 수 있습니다.

**참고**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Datadog 계정에서 SAML을 활성화하고 싶은 경우 [지원팀][2]에 문의해 활성화할 수 있습니다.
{{% /site-region %}}
- 이 설명서에서는 사용자에게 이미 SAML ID 공급자(IdP)가 있다고 가정합니다. SAML IdP가 없는 경우 [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7], [SafeNet][8]와 같은 IdP가 Datadog와 통합되니 참고하세요.
- SAML 구성에는 [Datadog 관리자][9] 액세스가 필요합니다.

## SAML 구성 {#configuring-saml}

지침을 보려면 [SAML을 사용한 싱글 사인온 구성][2]을 참조하세요.

## SAML 사용 {#using-saml}

Datadog에서 SAML 구성이 완료되고 IdP가 Datadog의 요청을 수락하도록 설정되면 사용자가 로그인할 수 있습니다.

### SP 시작 로그인 {#sp-initiated-login}

SP 시작 로그인은 Datadog에서 로그인을 시작하는 방식을 의미합니다. 사용자는 [SAML Configuration 페이지][4] 상단 상태 상자에 표시되는 {{< ui >}}Single Sign-on URL{{< /ui >}}를 통해 로그인합니다. 이 URL에 접속하면 사용자의 IdP에 대해 SAML 인증이 시작됩니다. **참고**: 이 URL은 계정에서 SAML이 활성화되어 있고 SP 시작 로그인을 사용하는 경우에만 표시됩니다.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="SAML 활성화 확인" >}}

사용자가 SP 시작 SAML을 통해 로그인하고 조직에 사용자 지정 서브도메인이 없는 경우 Datadog은 추가 보안 절차를 요구합니다. 사용자는 로그인 시 필요한 일회용 이메일 인증 코드를 받게 됩니다.

### IdP 시작 로그인 {#idp-initiated-login}

IdP(ID 공급자) 시작 로그인은 애플리케이션 포털에서 로그인을 시작하는 방식을 의미합니다. 사용자는 Google App Drawer 또는 Okta App Portal과 같은 애플리케이션 포털에서 앱 아이콘을 클릭하여 로그인합니다. SP 시작 로그인을 사용하는 사용자도 ID 공급자의 구성에 따라 IdP 시작 로그인을 사용할 수 있습니다.

## 어설션 및 속성 {#assertions-and-attributes}

로그인을 할 때 사용자 인증이 포함된 SAML 어설션이 ID 공급자에서 Datadog로 전송됩니다.

### 기능 {#capabilities}

* Datadog에서는 **SAML2**에 대해 **HTTP-POST** 바인딩을 지원합니다.
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog은 어설션 요청의 **NameIDPolicy** 형식에 대해 `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`를 지정합니다.

### 요구 사항 {#requirements}

* 어설션에는 서명이 포함되어 있어야 합니다.
* 어설션은 암호화할 수 있으며, 암호화되지 않은 어설션도 허용됩니다.
* 자세한 내용은 [Datadog의 서비스 공급자 메타데이터][3]를 참조하세요. 이 파일에 액세스하려면 Datadog에 로그인해야 합니다.

### 지원되는 속성 {#supported-attributes}

속성은 SAML Assertion에 포함될 수 있습니다. Datadog은 `AttributeStatement` 내에서 다음 세 가지 속성을 찾습니다.

  1. **eduPersonPrincipalName**: 이 속성을 지정하면 eduPersonPrincipalName이 사용자의 Datadog 사용자 이름과 대응해야 합니다. 사용자 이름은 보통 사용자의 이메일 주소입니다.
  2. **sn**: 이 속성은 선택 사항입니다. 사용자의 성으로 설정해야 합니다.
  3. **givenName**: 이 속성은 선택 사항입니다. 사용자의 이름으로 설정해야 합니다.

<div class="alert alert-info">Microsoft Entra ID IdP의 경우 Assertion에서 `sn` 대신 `surname` 속성을 사용하세요.</div>

Datadog은 속성이 URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` 또는 Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`를 사용하는 것으로 예상합니다. 각 속성에 사용되는 이름은 IdP에서 사용하는 NameFormat에 따라 달라집니다.

IdP가 URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`을 사용하도록 구성된 경우:

  1. **eduPersonPrincipalName**: IdP에서 속성 이름을 `urn:oid:1.3.6.1.4.1.5923.1.1.1.6`으로 설정합니다.
  2. **sn**: IdP에서 속성 이름을 `urn:oid:2.5.4.4`로 설정합니다.
  3. **givenName**: IdP에서 속성 이름을 `urn:oid:2.5.4.42`로 설정합니다.

IdP가 Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`을 사용하도록 구성된 경우:

  1. **eduPersonPrincipalName**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:eduPersonPrincipalName`으로 설정합니다.
  2. **sn**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:sn`로 설정합니다.
  3. **givenName**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:givenName`으로 설정합니다.

AttributeStatement에 **eduPersonPrincipalName**이 존재하는 경우 이 속성의 값이 사용자 이름으로 사용됩니다. AttributeStatement에 **eduPersonPrincipalName**이 포함되지 않은 경우 사용자 이름은 Subject의 NameID에서 가져옵니다. NameID는 `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` 형식을 사용해야 합니다.

**sn**과 **givenName**을 제공하면 Datadog 프로필의 사용자 이름을 업데이트하는 데 사용됩니다.

## 추가 기능 {#additional-features}

ID 공급자 응답의 속성을 Datadog 역할과 팀에 매핑하려면 [SAML 그룹 매핑][5]을 참조하세요.

[SAML 설정 대화상자][4]를 통해 다음 기능을 활성화할 수 있습니다.

**참고:** SAML 설정 대화상자를 보려면 관리자 권한이 있어야 합니다.

### 적시(JIT) 프로비저닝 {#just-in-time-jit-provisioning}

JIT 프로비저닝을 사용하면 첫 로그인 시에 Datadog 사용자가 생성됩니다. 이에 따라 관리자가 수동으로 사용자 계정을 반복해서 생성해야 할 수고를 덜 수 있습니다. 이 경우 초대 이메일이 전송되지 않습니다.

일부 조직은 모든 사용자를 Datadog에 초대하고 싶지 않을 수 있습니다. 계정의 SAML 동작 방식을 변경하려면 [Datadog 지원팀][2]에 문의하세요. 특정 사용자가 Datadog에 액세스하지 못하도록 하려면 Datadog으로 어설션을 보내지 않도록 IdP를 구성하는 것은 조직의 책임입니다.

관리자는 새 JIT 사용자의 기본 역할을 설정할 수 있습니다. 기본 역할은 {{< ui >}}Standard{{< /ui >}}이지만, 새 JIT 사용자를 {{< ui >}}Read-Only{{< /ui >}}, {{< ui >}}Administrators{{< /ui >}} 또는 사용자 지정 역할로 추가하도록 선택할 수 있습니다.

<div class="alert alert-danger">
  <strong>중요:</strong> 역할 매핑이 활성화된 경우 JIT 프로비저닝 중에 설정된 역할보다 역할 매핑이 우선 적용됩니다. 적절한 Group Attribute 문이 없으면 사용자에게 역할이 할당되지 않아 Datadog 액세스 권한을 잃을 수 있습니다. JIT 프로비저닝 후 사용자가 잠기는 상황을 방지하려면 매핑과 JIT를 모두 활성화하기 전에 매핑 정의를 검토하고 어설션을 확인하세요.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### IdP 시작 로그인 {#idp-initiated-login-1}

Datadog URL이 로드되면 브라우저는 고객의 IdP로 리디렉션되고 사용자는 해당 IdP에서 자격 증명을 입력합니다. 이후 IdP는 다시 Datadog으로 리디렉션합니다. 일부 IdP는 AuthnRequest를 먼저 받지 않고도 Datadog으로 직접 어설션을 전송할 수 있습니다(IdP 시작 로그인).

IdP 시작 로그인 기능을 활성화하고 구성을 저장한 후에는 ID 공급자용 최신 서비스 공급자(SP) 메타데이터를 다운로드할 수 있습니다. 새 SP 메타데이터에는 어설션을 전송하기 위한 조직별 `AssertionConsumerService` 엔드포인트가 포함됩니다.

업데이트된 SP 메타데이터를 사용하지 않으면 Datadog에서 어설션을 조직과 연결할 수 없으며, SAML 응답에 "InResponseTo" 속성이 누락되었다는 메시지와 함께 오류 페이지가 표시됩니다.

### SAML strict {#saml-strict}

{{< ui >}}Login Methods{{< /ui >}} UI에서 다른 로그인 방식 유형을 비활성화하여 조직을 SAML Strict 모드로 설정할 수 있습니다. 이 옵션이 구성되면 기본적으로 모든 사용자는 SAML을 사용하여 로그인해야 합니다. 기존 사용자 이름과 비밀번호 로그인 또는 Google OAuth 로그인은 사용할 수 없습니다. 이를 통해 Datadog에 액세스하는 모든 사용자가 회사의 ID 공급자 또는 디렉터리 서비스에 유효한 자격 증명을 보유하도록 보장할 수 있습니다. 조직 관리자는 사용자별 [재정의][6]를 통해 특정 사용자를 SAML Strict 적용 대상에서 제외할 수 있습니다.

### Datadog SP 메타데이터 자동 업데이트 {#self-updating-datadog-sp-metadata}

일부 ID 공급자(예: Microsoft의 ADFS)의 경우 Datadog에서 최신 SAML 서비스 공급자 메타데이터를 가져오도록 구성할 수 있습니다. Datadog에서 SAML을 구성한 후 SAML 구성 페이지에서 내 조직의 메타데이터 URL을 가져와 내 IdP에서 사용하면 변경 사항이 게시될 때마다 최신 서비스 공급자 메타데이터를 가져올 수 있습니다.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML 메타데이터 URL" style="width:50%;" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ko/account_management/saml/configuration
[3]: https://app.datadoghq.com/account/saml/metadata.xml
[4]: https://app.datadoghq.com/organization-settings/login-methods/saml
[5]: /ko/account_management/saml/mapping/
[6]: /ko/account_management/login_methods/#reviewing-user-overrides
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /ko/account_management/users/default_roles/