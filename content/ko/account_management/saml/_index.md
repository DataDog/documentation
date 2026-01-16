---
algolia:
  tags:
  - saml
aliases:
- /ko/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
title: SAML을 이용한 Single Sign On
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">정부 사이트용 Datadog은 SAML 로그인만 지원합니다.</div>
{{< /site-region >}}

## 개요

Datadog 계정용 [SAML(Security Assertion Markup Language)][1]을 설정하면 나와 내 팀원이 SAML Identity Provider에 구성된 조직의 Active Directory, LDAP, 기타 ID 저장소에 저장된 보안 인증 정보를 사용하여 Datadog에 로그인할 수 있습니다.

**참고**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- 내 Datadog 계정에 SAML이 활성화되어 있지 않은 경우, [고객지원팀][2]에 문의하여 활성화하세요.
- 이 설명서에서는 사용자가 이미 SAML Identity Provider(IdP)가 있다고 가정합니다. SAML IdP가 없는 경우, Datadog와 통합되는 IdP가 여럿 있습니다(예: [Active Directory][3], [Auth0][4], [Google][5).
- SAML 구성에는 [Datadog 관리자][9] 액세스가 필요합니다.
{{% /site-region %}}

{{% site-region region="gov" %}}
- 이 설명서는 사용자에게 이미 SAML Identity Provider(IdP)가 있다고 가정합니다. SAML IdP가 없는 경우, Datadog와 통합되는 IdP가 여럿 있습니다(예: [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7], [SafeNet][8]).
- SAML 구성에는 [Datadog 관리자][9] 액세스가 필요합니다.
{{% /site-region %}}

## SAML 구성

1. 구성을 시작하려면 내 IdP 설명서를 살펴보세요.

    * [Active Directory][10]
    * [Auth0][11]
    * [Google][13]
    * [Microsoft Entra ID][12]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Datadog 앱에서 좌측 하단에 있는 사용자 이름에 마우스 커서를 올리고 Organization Settings를 클릭합니다. [로그인 방법][17]을 선택하고 SAML 아래에 있는 **Configure**를 클릭합니다.

3. **Choose File** 버튼을 눌러 SAML ID 제공자에서 IdP 메타데이터를 업로드합니다. 파일을 선택한 후, **Upload File**을 클릭합니다.

**참고:** IdP 메타데이터에는 ASCII 문자만 포함되어 있어야 합니다.

4. Datadog의 [서비스 제공자 메타데이터][18]를 다운로드받아 Datadog를 서비스 제공자로 인식하도록 구성합니다.

5. IdP 메타데이터를 업로드하고 IdP를 구성한 후에는 **Upload and Enable** 버튼을 클릭해 Datadog에서 SAML을 활성화합니다.
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="IdP 메타데이터를 업로드해 SAML 구성" >}}

6. IdP 메타데이터를 업로드한 후, **Login Methods** 페이지로 돌아가서 SAML의 기본값을 `on`으로 설정해 활성화합니다. 

7. Datadog에서 SAML을 구성하고, Datadog에서 요청을 받을 수 있도록 IdP를 설정한 후 로그인할 수 있습니다.

**참고**: 여러 조직용으로 SAML을 구성하려면 [여러 조직 계정 관리][21]를 참고하세요.

## SAML 사용

Datadog에서 SAML을 구성한 후, Datadog에서 IdP에서 요청을 받을 수 있도록 설정하면 로그인할 수 있습니다.

### SP 시작 로그인

**SP에서 시작한 로그인**(서비스 제공자 또는 Datadog에서 시작한 로그인): [SAML 구성 페이지][19] 상단에 있는 상태 박스에 나와 있는 **Single Sign-on URL**을 사용해 로그인합니다. **Single Sign-on URL**은 [팀 페이지][20]에 표시됩니다. 이 URL을 로딩하면 내 IdP의 SAML 인증이 시작됩니다. **참고**: 이 URL은 내 계정에 SAML이 활성화되어 있고 SP 시작 로그인을 한 경우에만 보입니다.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="SAML이 활성화되었다는 확인" >}}

사용자가 SP 시작 SAML을 통해 로그인했는데 조직에 커스텀 하위 도메인이 없는 경우, Datadog에서는 추가 보안을 요청합니다. 로그인하려면 사용자가 1회성 이메일 인증 코드를 받아 입력해야 합니다.

**IdP 시작 로그인을 사용할 경우**(ID 제공자 또는 앱 포털에서 시작한 로그인): 앱 포털에서 앱 아이콘을 클릭(예: Google App Drawer 또는 Okta App Portal)해 로그인합니다. IdP 구성에 따라 SP 시작 로그인 사용자도 IdP 시작 로그인을 사용할 수 있습니다.

## 어설션과 속성

로그인할 때 사용자 인증을 포함한 SAML 어설션이 ID 제공자에서 Datadog로 전송됩니다.

### 기능

* Datadog는 **SAML2**에서 **HTTP-POST** 바인딩을 지원합니다.
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`
* Datadog는 어설션 요청에서 `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`를 **NameIDPolicy** 형식으로 지정합니다.

### 필수 조건

* 어설션에 서명이 되어야 합니다.
* 어설션은 암호화될 수 있으나, 암호화되지 않은 어설션도 허용됩니다.
* 자세한 정보는 [Datadog의 서비스 제공자 메타데이터][18]를 참고하세요. 파일에 액세스하려면 Datadog에 로그인해야 합니다.

### 지원되는 속성

SAML 어설션에 속성이 포함될 수 있습니다. Datadog는 `AttributeStatement`에서 3가지 속성을 찾습니다.

  1. **eduPersonPrincipalName**: 지정될 경우, eduPersonPrincipalName이 사용자의 Datadog 사용자 이름과 일치해야 합니다. 사용자 이름은 보통 사용자의 이메일 주소입니다.
  2. **sn**: 선택 사항입니다. 사용자 성으로 설정해야 합니다.
  3. **givenName**: 선택 사항입니다. 사용자의 이름으로 설정해야 합니다.

<div class="alert alert-info">Microsoft Entra ID IdP의 경우, 어설션에서 `sn` 대신 `surname` 속성을 사용하세요.</div>

Daadog에서는 속성이 URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`나 Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`을 사용한다고 가정합니다. 각 속성에 사용되는 이름은 내 IdP가 사용하는 NameFormat에 따라 결정됩니다.

내 IdP가 URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`을 사용하도록 구성된 경우:

  1. **eduPersonPrincipalName**: IdP에서 속성 이름을 `urn:oid:1.3.6.1.4.1.5923.1.1.1.6`로 설정합니다.
  2. **sn**: IdP에서 속성 이름을 `urn:oid:2.5.4.4`로 설정합니다.
  3. **givenName**: IdP에서 속성 이름을 `urn:oid:2.5.4.42`로 설정합니다.

내 IdP가 Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`을 사용하도록 구성된 경우:

  1. **eduPersonPrincipalName**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:eduPersonPrincipalName`로 설정합니다.
  2. **sn**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:sn`로 설정합니다.
  3. **givenName**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:givenName`로 설정합니다.

AttributeStatement에 **eduPersonPrincipalName**이 존재하는 경우 이 속성 값이 사용자 이름으로 사용됩니다. AttributeStatement에 **eduPersonPrincipalName**이 없는 경우 주제에 있는 NameID가 사용자 이름으로 사용됩니다. NameID의 경우 Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`를 사용해야 합니다.

**sn**과 **givenName**을 제공하면 Datadog 프로필의 사용자 이름을 업데이트하는 데 사용됩니다.

## 추가 기능

ID 공급자 응답의 속성을 Datadog 역할과 팀에 매핑하려면 [SAML 그룹 매핑][22]을 참고하세요.

[SAML 설정 대화상자][19]를 통해 다음 기능을 활성화할 수 있습니다.

**참고:** SAML 설정 대화상자를 보려면 관리자 권한이 있어야 합니다.

### 적시(JIT) 프로비저닝

JIT 프로비저닝을 사용하면 첫 로그인 시에 Datadog 사용자가 생성됩니다. 이에 따라 관리자가 수동으로 사용자 계정을 반복해서 생성해야 할 수고를 덜 수 있습니다. 이 경우 초대자 이메일이 전송되지 않습니다.

모든 사용자를 Datadog로 초대하고 싶지 않은 조직이 있을 수 있습니다. 내 계정에서 SAML이 작동하는 방법을 변경하려면 [Datadog 지원팀][2]에 문의하세요. 조직에서 IdP 구성할 때 어설션을 보내지 않도록 하여 특정 사용자가 Datadog에 액세스할 수 없도록 할 수 있습니다.

관리자는 새 JIT 사용자의 기본 역할을 설정할 수 있습니다. 기본 역할은 **Standard**입니다. 그러나 **Read-Only**, **Administrators**, 또는 커스텀 역할을 가진 새 JIT 사용자를   추가할 수 있습니다.

<div class="alert alert-danger">
  <strong>중요:</strong> 역할 매핑을 활성화하면 JIT 프로비저닝 중에 설정한 역할보다 역할 매핑이 우선순위가 높아집니다. 적절한 그룹 속성 문이 없으면 역할이 없는 상태가 되어 Datadog에 액세스가 불가한 상황이 발생할 수 있습니다. JIT 프로비저닝 후에 액세스 불가한 상황을 예방하려면 매핑 정의를 다시 검토하고 매핑과 JIT를 활성화하기 전에 어설션을 검토해야 합니다.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT 기본" style="width:50%;" >}}

### IdP 시작 로그인

Datadog URL를 업로드하면 브라우저가 고객 IdP로 리디렉션하고, 사용자가 인증 정보를 입력하면 IdP가 Datadog로 리디렉션합니다. 일부 IdP의 경우 AuthnRequest(IdP 시작 로그인)을 받지 않고도 어설션을 바로 Datadog로 전송할 수 있습니다.

IdP 시작 로그인 기능을 활성화하고 구성을 저장한 후 내 ID 공급자용 SP(서비스 제공자) 메타데이터의 최신 버전을 다운로드할 수 있습니다. 새 SP 메타데이터에는 어설션을 보낼 조직 기반의 다른 `AssertionConsumerService` 엔드포인트가 포함되어 있습니다.

업데이트된 SP 메타데이터를 사용하지 않으면 Datadog에서 어설션을 조직과 연결할 수 없으며, SAML 응답에 "InResponseTo" 속성이 누락되었다는 메시지와 함께 오류 페이지가 표시됩니다.

### SAML 전용

**Login Methods** UI에서 다른 로그인 수단 유형을 비활성화하여 조직을 SAML 전용으로 만들 수 있습니다. 이 옵션이 설정되면 모든 사용자는 기본적으로 SAML로 로그인해야 합니다.  이 경우 기존 사용자 이름/비밀번호 또는 Google OAuth 로그인이 작동하지 않습니다. 이는 Datadog에 액세스할 수 있는 모든 사용자가 Datadog 계정에 액세스할 때 회사의 IdP/디렉터리 서비스에 대해 유효한 자격증명이 있도록 보장합니다. 조직 관리자는 특정 사용자가 SAML 전용 면제 대상이 되도록 사용자별 재정의를 설정할 수 있습니다.

### Datadog SP 메타데이터 자체 업데이트하기

일부 Id 공급자(예: Microsoft's ADFS)의 경우 Datadog에서 최신 SAML 서비스 공급자 메타데이터를 가져오도록 설명할 수 있습니다. Datadog에서 SAML을 구성한 후 SAML 구성 페이지에서 내 조직의 메타데이터 URL을 가져와 내 IdP에서 사용하면 변경 사항이 게시될 때마다 최신 서비스 공급자 메타데이터를 가져올 수 있습니다.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML 메타데이터 URL" style="width:50%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ko/help/
[3]: https://learn.microsoft.com/en-us/entra/architecture/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /ko/account_management/users/default_roles/
[10]: /ko/account_management/saml/activedirectory/
[11]: /ko/account_management/saml/auth0/
[12]: /ko/account_management/saml/entra/
[13]: /ko/account_management/saml/google/
[14]: /ko/account_management/saml/nopassword/
[15]: /ko/account_management/saml/okta/
[16]: /ko/account_management/saml/safenet/
[17]: https://app.datadoghq.com/organization-settings/login-methods
[18]: https://app.datadoghq.com/account/saml/metadata.xml
[19]: https://app.datadoghq.com/saml/saml_setup
[20]: https://app.datadoghq.com/account/team
[21]: /ko/account_management/multi_organization/#setting-up-saml
[22]: /ko/account_management/saml/mapping/
[23]: /ko/account_management/login_methods/#reviewing-user-overrides