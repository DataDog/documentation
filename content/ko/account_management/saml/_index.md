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
<div class="alert alert-warning">정부 사이트용 Datadog는 SAML 로그인만 지원합니다.</div>
{{< /site-region >}}

## 개요

Datadog 계정에 [SAML(보안 어설션 마크업 언어)][1]를 설정하면 사용자와 팀원이 조직 액티브 디렉터리, LDAP, 또는 SAML ID 공급자로 구성한 기타 ID 스토어에 저장된 인증 정보를 사용해 Datadog에 로그인할 수 있습니다.

**참고**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- Datadog 계정에서 SAML을 활성화하지 않은 경우 [지원팀][1]에 연락해 활성화하세요.
- 이 설명서에서는 이미 SAML ID 공급자(IdP)가 있다고 가정합니다. SAML IdP가 없는 경우 [Active Directory][2], [Auth0][3], [Azure][2], [Google][4], [LastPass][5], [Okta][6], [SafeNet][7] 등 Datadog과 통합되는 여러 IdP가 있으니 참고하세요.
- SAML을 설정하려면 [Datadog 관리자][8] 액세스가 필요합니다.

[1]: /ko/help/
[2]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /ko/account_management/users/default_roles/
{{% /site-region %}}

{{% site-region region="gov" %}}
- 이 설명서에서는 이미 SAML ID 공급자(IdP)가 있다고 가정합니다. SAML IdP가 없는 경우 [Active Directory][2], [Auth0][3], [Azure][2], [Google][4], [LastPass][5], [Okta][6], [SafeNet][7] 등 Datadog과 통합되는 여러 IdP가 있으니 참고하세요.
- SAML을 설정하려면 [Datadog 관리자][8] 액세스가 필요합니다.

[2]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /ko/account_management/users/default_roles/
{{% /site-region %}}

## SAML 설정

1. 설정을 시작하려면 IDP 설명서를 참고하세요.

    * [액티브 디렉터리][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Datadog 앱 왼쪽 하단에 있는 사용자 이름에 커서를 올려 조직 설정을 선택하고 [로그인 방법][17]을 선택한 후 SAML에서 **Configure**을 클릭합니다.

3. **Choose File** 버튼을 클릭하여 SAML ID 공급자에서 IDP 메타데이터를 업로드하고, 파일을 선택한 후 **Upload File**를 클릭합니다.

**참고:** IDP 메타데이터에는 ASCII 문자만 포함해야 합니다.

4. Datadog의 [서비스 공급자 메타데이터][18]를 다운로드하여 Datadog를 서비스 공급자로 인식하도록 IDP를 설정합니다.

5. IdP 메타데이터를 업로드하고 IdP를 설정한 후 **Upload and Enable** 버튼을 클릭하여 Datadog에서 SAML을 활성화합니다.
    {{< img src="account_management/saml/saml_enable.png" alt="saml enable" >}}

6. IdP 메타데이터를 업로드한 후 **Login Methods** 페이지로 돌아가 SAML 기본값을 `on`으로 설정합니다.

7. Datadog에서 SAML을 설정하고 사용자 IDP에서 Datadog 요청을 수락하도록 설정하면 사용자가 로그인할 수 있습니다.

   - **SP-시작 로그인**(서비스 공급자 또는 Datadog에서 로그인 시작)을 사용하는 경우: [SAML 설정 페이지][19] 상단 상태 상자에 표시된 **Single Sign-on URL**를 사용합니다. **Single Sign-on URL**은 [팀 페이지][20]에도 표시됩니다. 이 URL을 로드하면 사용자 IDP SAML 인증이 시작됩니다. **참고**: 계정에 SAML이 활성화되어 있고 SP-시작 로그인을 사용하는 경우가 아니면 이 URL이 표시되지 않습니다.
    {{< img src="account_management/saml/saml_enabled.png" alt="Saml Enabled" >}}

   - **IdP 시작 로그인**(ID 공급자나 앱 포털에서 로그인 시작): Google App 드로어나 Okta App Portal과 같은 앱 포털에서 앱 아이콘을 클릭합니다. 일부 시나리오에서는 SP 시작 로그인 URL로 로그인하는 사용자가 IdP 시작 로그인을 사용할 수 있으나, 이는 ID 공급자의 설정과 지원에 따라 다릅니다.

**참고**: 다중 조직에 SAML을 설정하려면 [다중 조직 계정 관리][21]을 참고하세요.

## 어설션 및 속성

로그인할 때 사용자 권한이 포함된 SAML 어설션이 ID 공급자에서 Datadog로 전송됩니다.

어설션과 관련한 중요 사항:

* Datadog에서는 **SAML2**에 **HTTP-POST** 바인딩을 지원합니다.
(예: `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`)
* Datadog에서는 어설션 요청의 **NameIDPolicy** 형식을 `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`로 지정합니다.
* 어설션에 서명해야 합니다.
* 어설션을 암호화할 수 있지만 암호화되지 않은 어설션도 허용됩니다.
* 자세한 내용은 [Datadog의 서비스 공급자 메타데이터][18]를 참고하세요. 파일에 액세스하려면 Datadog에 로그인해야 합니다.

SAML 어설션에 속성을 포함할 수 있습니다. Datadog에서는 `AttributeStatement`에서 세 가지 속성을 찾습니다.

  1. **eduPersonPrincipalName**: 지정된 경우 eduPersonPrincipalName이 사용자의 Datadog 사용자 이름과 일치해야 합니다. 사용자 이름은 일반적으로 사용자의 이메일 주소입니다.
  2. **sn**: 선택 사항이며, 사용자의 성으로 설정해야 합니다.
  3. **givenName**: 선택 사항이며, 사용자의 성 또는 이름으로 설정해야 합니다.

Datadog에서는 속성이 URI NameFormat`urn:oasis:names:tc:SAML:2.0:attrname-format:uri`이나 Basic NameFormat`urn:oasis:names:tc:SAML:2.0:attrname-format:basic`으로 되어 있을 것이라고 예측합니다. 각 속성에 사용되는 이름은 IdP에서 사용하는 이름 형식에 따라 다릅니다.

ID에서 URI NameFormat을 사용하도록 설정된 경우`urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: IdP에서 `urn:oid:1.3.6.1.4.1.5923.1.1.1.6`을 속성 이름으로 설정해야 합니다.
  2. **sn**: IdP에서 속성 이름을 `urn:oid:2.5.4.4`로 설정해야 합니다.
  3. **givenName**: IdP에서 속성 이름을 `urn:oid:2.5.4.42`로 설정해야 합니다.

IDP에서 Basic NameFormat`urn:oasis:names:tc:SAML:2.0:attrname-format:basic`을 사용하도록 설정된 경우:

  1. **eduPersonPrincipalName**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:eduPersonPrincipalName`로 설정해야 합니다.
  2. **sn**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:sn`로 설정해야 합니다.
  3. **givenName**: IdP에서 속성 이름을 `urn:mace:dir:attribute-def:givenName`로 설정해야 합니다.

AttributeStatement에 **eduPersonPrincipalName**이 있으면 이 속성 값이 사용자 이름에 사용됩니다. AttributeStatement에 **eduPersonPrincipalName**이 없으면 제목에 있는 NameID에서 사용자 이름을 가져옵니다. NameID는 `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` 형식을 사용해야 합니다.

**sn** 및 **givenName** 정보가 제공되면, Datadog 프로필에서 사용자의 이름을 업데이트하는 데 사용됩니다.

## 추가 기능

Datadog 역할 및 팀의 ID 공급자의 응답에서 속성을 매핑하려면 [SAML 그룹 매핑][22]을 참고하세요.

[SAML 설정 대화상자][19]를 통해 다음 기능을 활성화할 수 있습니다.

**참고:** SAML 설정 대화상자를 보려면 관리자 권한이 있어야 합니다.

### 적시(JIT) 프로비저닝

JIT 프로비저닝을 사용하면 처음 로그인할 때 Datadog에 사용자가 생성됩니다. 따라서 관리자가 한 번에 하나씩 수동으로 사용자 계정을 생성할 필요가 없습니다. 이 경우 초대 이메일이 전송되지 않습니다.

조직에서 사용자 모두를 Datadog에 초대하고 싶지 않을 경우가 있습니다. 계정에서 SAML이 작동하는 방식을 변경하려면 [Datadog 지원팀][2]에 문의하세요. 특정 사용자가 Datadog에 액세스하는 것을 원하지 않는 경우, 조직에서 직접 Datadog에 어설션을 보내지 않도록 IdP를 설정해야 합니다.

관리자가 새 JIT 사용자의 기본 역할을 설정할 수 있습니다. 기본 역할은 **표준**이지만 새 JIT 사용자를 **읽기 전용**, **관리자** 또는 커스텀 역할로 추가하도록 선택할 수 있습니다.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT 기본" style="width:50%;" >}}

### IdP 시작 로그인

Datadog URL이 로드되면 브라우저가 사용자 자격증명을 입력하는 고객 IdP로 리디렉션되며, IdP에서 Datadog으로 다시 리디렉션됩니다. 일부 IdP에서는 AuthnRequest(IdP로 시작하는 로그인)를 받지 않고 Datadog에 직접 어설션을 보낼 수 있습니다.

IdP 시작 로그인 기능을 활성화하고 설정을 저장한 후 ID 공급자의 서비스 공급자(SP) 메타데이터 최신 버전을 다운로드할 수 있습니다. 어설션을 보낼 조직의 `AssertionConsumerService` 엔드포인트가 새 SP 메타데이터에 포함되어 있습니다.

업데이트된 SP 메타데이터를 사용하지 않으면 Datadog에서 어설션을 조직과 연결할 수 없으며 SAML 응답에 "InResponseTo" 속성이 없다는 메시지와 오류 페이지를 표시합니다.

### 엄격한 SAML

**Login Methods** UI에서 다른 로그인 방법 유형을 비활성화해 조직의 엄격한 SAML을 생성할 수 있습니다. 이 옵션을 설정하면 기본적으로 모든 사용자가 SAML로 로그인해야 합니다. 기존 사용자 이름/비밀번호나 Google OAuth로 로그인할 수 없습니다. 이렇게 하면 Datadog에 액세스하는 사용자 모두가 회사의 ID 공급자/디렉터리 서비스에서 유효한 자격 증명을 가지고 있어야 Datadog 계정에 액세스할 수 있습니다. 조직 관리자는 일부 사용자가 엄격한 SAML 모드에서 제외되도록 사용자별 [재정의][23]를 설정할 수 있습니다.

### Datadog SP 메타데이터 자체 업데이트

특정 IdP(예: Microsoft의 ADFS)의 경우 Datadog에서 최신 SAML 서비스 공급업체 메타데이터를 가져오도록 설정할 수 있습니다. Datadog에서 SAML을 설정한 후 SAML 설정 페이지에서 조직의 메타데이터 URL을 가져오고 이를 IdP와 함께 사용해 변경 사항이 게시될 때마다 최신 서비스 공급업체 메타데이터를 가져올 수 있습니다.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML 메타데이터 URL" style="width:50%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ko/help/
[10]: /ko/account_management/saml/activedirectory/
[11]: /ko/account_management/saml/auth0/
[12]: /ko/account_management/saml/azure/
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