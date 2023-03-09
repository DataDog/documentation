---
aliases:
- /kr/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
kind: 설명서
title: SAML을 이용한 싱글 사인온
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">정부 사이트용 Datadog은 오직 SAML 로그인만 지원합니다.</div>
{{% /site-region %}}

## 개요

Datadog 계정에 대해 [Security Assertion Markup Language(SAML)][1]를 설정하면 사용자 및 모든 팀원은 SAML IdP로 설성된 조직의 Active Directory, LDAP 또는 기타 ID 저장소에 저장된 자격증명을 사용하여 Datadog에 로그인할 수 있습니다.

**참고**: 

- Datadog 계정에서 SAML을 활성화하지 않은 경우 [지원팀][2]에 연락하여 활성화하세요.
- 이 문서에서는 사용자가 이미 SAML ID IdP를 보유하고 가정합니다. SAML IdP를 보유하고 있지 않더라도 [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7] 및 [SafeNet][8] 등 Datadog에 통합된 다양한 IdP가 있습니다.
- SAML 설정 시에는 [Datadog 관리자][9] 액세스 권한이 필요합니다.

## SAML 설정

1. 설정을 시작하려면 다음과 같은 IdP의 문서를 확인하세요.

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Datadog 앱에서 왼쪽 하단 모서리에 있는 사용자 이름 위로 마우스를 가져간 다음 조직 설정을 선택합니다. [로그인 방법][17]을 선택한 뒤 SAML의 **Configure**을 클릭합니다.

3. **Choose File** 버튼을 클릭하여 SAML IdP의 IdP 메타데이터를 업로드합니다. 해당 파일을 선택한 후 **Upload File**를 클릭합니다.

4. Datadog의 [서비스 제공업체 메타데이터][18]를 다운로드하여 IdP가 Datadog을 서비스 제공업체로 인식하도록 설정합니다.

5. IdP 메타데이터를 업로드하고 IdP를 설정한 후 **Enable** 버튼을 클릭하여 Datadog에서 SAML을 활성화합니다.
    {{< img src="account_management/saml/saml_enable.png" alt="saml 활성화"  >}}

6. Datadog에 SAML이 설정되고 IdP가 Datadog의 요청을 수락하도록 설정되면 사용자는 다음의 방식으로 로그인할 수 있습니다.

   - **SP에서 시작하는 로그인을 사용하는 경우**(서비스 공급업체 또는 Datadog에서 시작하는 로그인): [SAML 설정 페이지] 상단의 상태 상자에 표시된 **싱글 사인온 URL**을 사용하면 됩니다.[19]. **싱글 사인온 URL**은 [팀 페이지][20]에도 표시됩니다. 이 URL을 로드하면 IdP에 대한 SAML 인증이 시작됩니다. **참고**: 이 URL은 계정에 SAML이 활성화되어 있지 않고 SP에서 시작하는 로그인을 사용하지 않으면 표시되지 않습니다.
    {{< img src="account_management/saml/saml_enabled.png" alt="Saml 활성화됨"  >}}

   - **IdP에서 시작하는 로그인**(IdP 또는 앱 포털에서 시작하는 로그인)을 사용하는 경우: 앱 포털에서 앱 아이콘을 클릭하면 됩니다(예: Google 앱 서랍 또는 Okta 앱 포털에서 앱 아이콘 클릭). 일부 시나리오에서는 SP에서 시작하는 로그인 URL을 사용하여 로그인하는 사용자가 사용자가 IdP에서 시작하는 로그인 환경도 이용할 수 있지만, 이는 IdP 측 설정 및 지원 상황에 따라 다릅니다.

**참고**: 다중 조직의 SAML을 설정하려면 [다중 조직 계정 관리][21]를 참조하세요.

## 어서션 및 속성

로그인이 발생하면 사용자 인증이 포함된 SAML 어서션이 IdP에서 Datadog으로 전송됩니다.

어서션에 대한 몇 가지 중요한 참고 사항은 다음과 같습니다.

* Datadog은 **SAML2**에 구속력을 가지는 **HTTP-POST**를 지원합니다.
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog은 어서션 요청의 **NameIDPolicy** 형식에 대해`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`를 지정합니다.
* 어서션에는 서명을 해야 합니다.
* 어서션은 암호화할 수 있지만 암호화되지 않은 어서션도 허용됩니다.
* 자세한 내용은 [Datadog의 SP 메타데이터][18]를 참조합니다.

속성은 SAML 어서션에 포함될 수 있습니다. Datadog은 `AttributeStatement`에서 세 가지 속성을 찾습니다.
  1. **eduPersonPrincipalName**: 지정된 경우 eduPersonPrincipalName은 사용자의 Datadog 사용자 이름과 일치해야 합니다. 사용자 이름은 일반적으로 사용자의 이메일 주소입니다.
  2. **sn**: 이것은 선택 사항이며 사용자의 성으로 설정해야 합니다.
  3. **givenName**: 이것은 선택 사항이며 성을 제외한 사용자의 이름으로 설정해야 합니다.

Datadog은 속성이 URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` 또는 기본 Basic NameFormat`urn:oasis:names:tc:SAML:2.0:attrname-format:basic`을 사용할 것으로 예상합니다. 각 속성에 사용되는 이름은 IdP가 사용하는 NameFormat에 따라 다릅니다.

IdP가 URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`를 사용하도록 설정된 경우에는 다음을 따릅니다.

  1. **eduPersonPrincipalName**: IdP는 `urn:oid:1.3.6.1.4.1.5923.1.1.1.6`을 속성 이름으로 설정해야 합니다.
  2. **sn**: IdP는 `urn:oid:2.5.4.4`를 속성 이름으로 설정해야 합니다.
  3. **givenName**: IdP는 `urn:oid:2.5.4.42`를 속성 이름으로 설정해야 합니다.

IdP가 기본 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`을 사용하도록 설정된 경우에는 다음을 따릅니다.

  1. **eduPersonPrincipalName**: IdP는`urn:mace:dir:attribute-def:eduPersonPrincipalName`을 속성 이름으로 설정해야 합니다.
  2. **sn**: IdP는 `urn:mace:dir:attribute-def:sn`을 속성 이름으로 설정해야 합니다.
  3. **givenName**: IdP는`urn:mace:dir:attribute-def:givenName`을 속성 이름으로 설정해야 합니다.

**eduPersonPrincipalName**이 AttributeStatement에 있는 경우 이 속성의 값은 사용자 이름에 사용됩니다. **eduPersonPrincipalName**이 AttributeStatement에 포함되어 있지 않는 경우에는 Subject의 NameID에서 사용자 이름이 추출됩니다. NameID은 형식`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`를 사용해야 합니다.

**sn** 및 **givenName**이 제공된 경우 이들은 Datadog 프로필에서 사용자 이름을 업데이트할 때 사용됩니다.

## SAML 속성을 Datadog 역할에 매핑하기

Datadog을 사용하면 IdP의 응답에 있는 속성을 Datadog 역할에 매핑할 수 있습니다. 액세스 관리 권한이 있는 사용자는 사용자의 SAML 할당 속성을 기반으로 Datadog 역할을 할당하거나 제거할 수 있습니다.

매핑에는 올바른 속성이 필요하므로 매핑 전에 어서션에서 전송되는 것이 무엇인지 이해하는 것이 중요합니다. 모든 IdP에는 특정한 매핑이 존재합니다. 예를 들어, Azure는 객체 ID로 작동하며, Okta는 [Okta 설정][22]에서 속성을 설정해야 합니다. Datadog는 매핑을 생성하기 **전에** Chrome Dev Tools 또는 브라우저 확장과 같은 [기본 브라우저 도구][23]를 사용하여 교차 참조를 하고, [SAML 어서션 검증][24]을 하기를 권장합니다.

1. SAML 어서션을 [교차 참조][23] 및 [검증][24]하여 IdP의 속성을 확인합니다.

2. **Organization Settings**으로 이동하여 **SAML Group Mappings** 탭을 클릭합니다.

3. **New Mapping**을 클릭합니다.

4. 기존의 (기본 또는 커스텀) Datadog 역할에 연결할 SAML IdP `key-value` 페어를 특정합니다. **참고**: 이 입력은 상황별로 다릅니다.

   예를 들어, `member_of` 속성이 `Development` 값인 모든 사용자가 `Devs`로 불리는 커스텀 Datadog 역할로 할당되기를 바라는 경우에는 다음을 따릅니다.

    {{< img src="account_management/saml/create_mapping.png" alt="Datadog 역할로 매핑하는 SAML 생성"  >}}

   **참고**: 모든 IdP는 다릅니다. 일부는 속성 키 또는 라벨을 설정할 수 있습니다. 다른 일부는 기본적으로 하나의 속성 키나 라벨을 제공하기도 합니다. Datadog은 로그인 시 어서션 검사기를 사용하여 특정 어서션의 세부 정보를 확인하고 IdP가 그룹 멤버십을 전송하는 방식을 이해하기를 권장합니다.

5. 아직 활성화하지 않은 경우 **Enable Mappings**를 클릭하여 매핑을 활성화합니다.

지정된 IdP 속성을 가진 사용자가 로그인하면 자동으로 Datadog 역할이 할당됩니다. 마찬가지로 누군가가 해당 IdP 속성을 제거한 경우 해당 역할에 대한 액세스 권한이 소멸됩니다(다른 매핑이 추가되는 경우는 예외).

<div class="alert alert-warning">
  <strong>중요:</strong> 어느 매핑도 매칭하지 <i>않으면</i> 이전에 보유했던 역할이 상실되고 SAML을 이용하여 조직에 로그인할 수 없게 됩니다. 매핑 정의를 두 번 확인하고, 매핑 활성화 전에 어서션을 검사하여 사용자가 로그인하지 못하는 시나리오를 방지하기 바랍니다.
</div>

**연필** 아이콘을 클릭하거나 **쓰레기** 아이콘을 클릭하여 매핑을 제거하여 매핑을 변경할 수 있습니다. 이러한 작업은 IdP 속성이나 Datadog 역할이 아닌 매핑에만 영향을 줍니다.

또는 `authn_mappings` 엔드포인트를 사용하여 Datadog 역할에 대한 SAML 속성 매핑을 생성하고 변경할 수도 있습니다. 자세한 내용은 [역할 매핑 API에 대한 통합 인증][25]을 참조하세요.

## 추가 기능

[SAML 설정 대화상자][19]를 통해 다음 기능을 활성화할 수 있습니다.

**참고:** SAML 설정 대화상자를 보려면 관리자 권한이 있어야 합니다.

### 적시(JIT) 프로비저닝

JIT 프로비저닝을 사용하면 처음 로그인을 시도할 때 Datadog 내에서 사용자가 생성됩니다. 따라서 관리자가 한 번에 하나씩 수동으로 사용자 계정을 생성할 필요가 없습니다. 이 경우 초대 이메일이 전송되지 않습니다.

모든 사용자를 Datadog에 초대하기를 원하지 않는 조직이 일부 있을 수 있습니다. 계정에서 SAML이 작동하는 방식을 변경하려면 [Datadog 지원팀][2]에 문의하세요. 특정 사용자가 Datadog에 액세스하는 것을 원하지 않는 경우에는 Datadog에 어서션을 보내지 않도록 IdP를 설정할 책임은 해당 조직에 있습니다.

관리자는 새 JIT 사용자의 기본 역할을 설정할 수 있습니다. 기본 역할은 **표준**이지만 새 JIT 사용자를 **읽기 전용** 또는 **관리자**로 추가하기로 선택할 수 있습니다.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT 기본" style="width:50%;" >}}

### IdP에서 시작하는 로그인

Datadog URL이 로드되면 브라우저는 사용자가 자격증명을 입력하는 고객 IdP로 리디렉션되고, IdP는 Datadog으로 다시 리디렉션됩니다. 일부 IdP는 AuthnRequest(IdP로 시작하는 로그인)를 먼저 받지 않고 Datadog에 직접 어서션을 보낼 수 있습니다.

IdP로 시작하는 로그인 기능을 활성화하고 설정을 저장한 후에는 IdP에 대한 최신 버전의 SP 메타데이터를 다운로드할 수 있습니다. 새 SP 메타데이터에는 어서션을 보낼 기타 조직별 `AssertionConsumerService` 엔드포인트가 포함되어 있습니다.

업데이트된 SP 메타데이터를 사용하지 않는 경우 Datadog은 어서션을 조직과 연결할 수 없으며, SAML 응답에 "InResponseTo" 속성이 누락되었다는 메시지와 함께 오류 페이지를 표시합니다.

### SAML 전용

**Login Methods** UI에서 다른 로그인 수단 유형을 비활성화하여 조직을 SAML 전용으로 만들 수 있습니다. 이 옵션이 설정되면 모든 사용자는 기본적으로 SAML로 로그인해야 합니다.  이 경우 기존 사용자 이름/비밀번호 또는 Google OAuth 로그인이 작동하지 않습니다. 이는 Datadog에 액세스할 수 있는 모든 사용자가 Datadog 계정에 액세스할 때 회사의 IdP/디렉토리 서비스에 대해 유효한 자격증명이 있도록 보장합니다. 조직 관리자는 특정 사용자가 SAML 전용 면제 대상이 되도록 사용자별 재정의를 설정할 수 있습니다.

### Datadog SP 메타데이터 자체 업데이트하기

특정 IdP(예: Microsoft의 ADFS)는 Datadog에서 최신 SAML 서비스 공급업체 메타데이터를 가져오도록 설정될 수 있습니다. Datadog에서 SAML을 설정한 후에는 SAML 설정 페이지에서 조직의 메타데이터 URL을 가져오고 이를 IdP와 함께 사용하여 변경 사항이 게시될 때마다 최신 서비스 공급업체 메타데이터를 가져올 수 있습니다.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML 메타데이터 URL" style="width:50%;" >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /kr/help/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://help.safenetid.com/operator/Content/STA/Apps/Apps_SAML.htm
[9]: /kr/account_management/users/default_roles/
[10]: /kr/account_management/saml/activedirectory/
[11]: /kr/account_management/saml/auth0/
[12]: /kr/account_management/saml/azure/
[13]: /kr/account_management/saml/google/
[14]: /kr/account_management/saml/nopassword/
[15]: /kr/account_management/saml/okta/
[16]: /kr/account_management/saml/safenet/
[17]: https://app.datadoghq.com/organization-settings/login-methods
[18]: https://app.datadoghq.com/account/saml/metadata.xml
[19]: https://app.datadoghq.com/saml/saml_setup
[20]: https://app.datadoghq.com/account/team
[21]: /kr/account_management/multi_organization/#setting-up-saml
[22]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[23]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[24]: https://www.samltool.com/validate_response.php
[25]: /kr/account_management/authn_mapping/