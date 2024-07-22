---
description: Datadog 계정용 SAML 문제 트러블슈팅
further_reading:
- link: https://www.samltool.com/online_tools.php
  tag: 개발 툴
  text: 개발자 SAML 툴로 어서션 식별하기
title: SAML 트러블슈팅
---

## 개요

이 페이지에서는 Security Assertion Markup Language(SAML) 인증 중 일반 오류에 대한 트러블슈팅 지침을 제공합니다.

## 일반 오류

아래 목록에서 오류 메시지가 표시되면 Datadog의 매핑 설정 또는 IdP 설정에 문제가 있을 수 있습니다.

- `SAML is not enabled for this org`
- `Arf. Unknown User`
- `There are No Authn Mappings for this User`
- `Assertion could not be validated`
- `SAML NO HANDLE ERROR`
- `No active account for a user`

문제를 해결하려면 특정 오류에 대한 아래 섹션을 참조하세요.

### 해당 조직에는 SAML이 활성화되어 있지 않습니다.

해당 계정에 대해 SAML이 비활성화되어 있습니다. [Login Methods][1]으로 이동하세요. SAML 섹션에서 **Enabled by Default**이 **On**으로 설정되어 있는지 확인하세요.

**참고:** SAML을 설정하려면 Datadog 관리자 역할 또는 조직 관리(`org_management`) 권한이 필요합니다.

### 이 사용자에 대한 인증 매핑이 없습니다.

Datadog의 매핑 설정과 IdP의 설정이 일치하지 않습니다. [역할 오류](#roles-errors)를 참조하세요.

### 어서션을 검증할 수 없습니다.

Datadog에서 IdP로 시작하는 로그인을 활성화한 후 IdP 설정의 [Assertion Consumer Service(ACS) URL][2]이 올바르지 않을 수 있습니다. 또는 어서션에 서명이 없을 수 있습니다. 자세한 내용은 [어서션 및 속성][3]을 참조하세요.

### SAML 관리 없음 오류

어서션에 필수 `eduPersonPrincipalName` 속성이 누락되었을 수 있습니다. 이 속성이 설정되어 있는지 확인하세요. 자세한 내용은 [어서션 및 속성][3]을 참조하세요.

### 사용자의 활성 계정 없음

이 오류는 다음 시나리오의 결과로 발생할 수 있습니다.
  - 적시(JIT) 프로비저닝을 활성화했는데 사용자가 로그인을 시도할 때 여전히 이 오류가 표시되는 경우 JIT를 활성화하기 전에 이미 이 사용자에게 이메일 초대장을 보냈는지 확인하세요. JIT는 이미 초대된 사용자에게는 적용되지 않습니다. 이 문제를 해결하려면 사용자가 이메일 초대를 수락하게 하세요. 또는 초대가 만료된 경우 관리자가 새 초대를 보내야 합니다.
  - JIT 프로비저닝이 활성화된 Datadog 조직에서 사용자가 더 이상 활성 상태가 아니고 SAML을 통해 다시 로그인을 시도하고 `There is no active account for error`이(가) 발생하는 경우에는 [User settings][4]에서 사용자를 다시 활성화하세요.

## IdP 메타데이터 파일 오류

IdP 메타데이터 파일을 업데이트하는 데 문제가 있는 경우 업로드하려는 메타데이터 파일이 유효한지 확인하세요.

메타데이터 파일을 확인하는 방법은 다음과 같습니다.

1. OneLogin의 [SAML 개발 툴][5]와 같은 SAML 검증 툴을 선택합니다.
2. 메타데이터를 XML 필드에 붙여넣고 XSD(스키마 파일) 필드에서 **메타데이터**를 선택합니다.
3. **Validate XML With the XSD Schema**를 클릭합니다.

## 역할 오류

매핑이 활성화된 경우, SAML을 사용해 Datadog 계정에 로그인한 사용자의 현재 역할을 영구적으로 제거할 수 있습니다. Datadog에서 IdP에서 전달받은 SAML 어서션 상세 정보에 따라 새로운 역할을 할당합니다.

SAML을 통해 로그인한 사용자가 Datadog 역할에 매핑되는 값이 없는 경우, 모든 역할에서 영구적으로 제거됩니다. 해당 사용자는 더 이상 로그인할 수 없습니다.

{{< img src="account_management/saml/unknown_user_error.png" alt="이 사용자의 AuthNMappings 없음" style="width:80%;">}}

그룹 매핑이 설정되어 있고 역할을 볼 수 없는 경우 Datadog 애플리케이션의 그룹 매핑이 IdP에서 다르게 나타날 수 있습니다. 확인하는 방법은 다음과 같습니다.

1. 계정에 대한 IdP의 SAML 어서션을 검색합니다. [확장 프로그램][6]과 같은 브라우저 툴을 사용하여 SAML 어서션을 검색합니다. 예를 들면 다음과 같습니다.

  ```xml
  <saml2:Attribute Name="member_of"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >name_of_your_group_goes_here</saml2:AttributeValue>
  </saml2:Attribute>
  ```

2. 프로필로 이동하여 Datadog의 왼쪽 하단에서 **Organization Settings**를 선택합니다.
3. [**SAML Group Mappings**][7]를 선택합니다.
4. SAML 어서션에서 IdP가 제공한 속성을 [**SAML Group Mappings**][7] 탭에 설정된 속성과 비교합니다.

  {{< img src="account_management/saml/saml_mappings_example.png" alt="Datadog에서 SAML 매핑하기" style="width:80%;">}}

5. Datadog SAML 그룹 매핑 설정 또는 IdP 설정 내에서 불일치를 해결합니다. 예를 들어 `memberof`가 Datadog에서 설정된 속성이고 SAML 어서션에서는 `member_Of`인 경우에는 적절하게 해결하도록 합니다.

속성 키와 값 사이에 매치가 없거나 미스매치가 있을 때 불일치가 발생할 수 있습니다. 예를 들어 **SAML 그룹 매핑**에서 `memberOf` 및 `name_of_your_group_goes_here`의 키 값 페어가 표시되는 경우 이 페어가 IdP에서 전송된 어서션에 포함되어 있지 않기 때문에 문제가 발생합니다.

역할 기반 오류로 인해 로그인하는 데 문제가 있는 경우 관리자에게 문의하여 위의 트러블슈팅 단계를 완료하세요.

**참조**:

- 각 IdP는 다양한 유형의 속성과 다양한 속성 설정 방법을 제공합니다. 예를 들어, Azure는 속성에 [객체 ID][8]를 사용하며, Okta를 사용하는 경우에는 [Okta 설정][9]에서 속성을 설정해야 합니다. 자세한 내용은 IdP의 속성 설명서를 참조하세요.

- **SAML Group Mappings**를 비활성화하면 IdP에서 그룹 멤버십이 변경된 경우에도 사용자는 SAML로 로그인할 수 있고 할당된 동일한 역할을 보유할 수 있습니다.

## IdP 오류

Google, Active Directory, Azure, Okta 등 IdP에서 오류가 발생한 경우:

- Google Admin Console에서 문제가 발생하면 [SAML 앱 오류 메시지][10]를 참조하세요.
- Active Directory에서 문제가 발생하면 [Azure Active Directory의 애플리케이션에 대한 SAML 기반 싱글 사인온 디버그][11]를 참조하세요.
- AuthO에서 문제가 발생하면 [SAML 설정 트러블슈팅][12]을 참조하세요.
- Azure에서 문제가 발생하면 [사용자가 로그인한 후 앱 페이지에 오류 메시지가 표시됨][13]을 참조하세요.
- Google에서 문제가 발생하면 [Datadog 클라우드 애플리케이션][14]을 참조하세요.
- Okta에서 문제가 발생하면 [애플리케이션 로그인 시도 시 404 오류 수신][16]을 참조하세요.
- SafeNet에서 문제가 발생하면 [Datadog용 SafeNet Trusted Access][17]를 참조하세요.

### IdP 인증서

계정에 로그인할 수 없는 경우 IdP 인증서가 만료 및 교체되어 일반 SAML 오류가 표시될 수 있습니다.

인증서 문제가 있는지 확인하는 데 도움이 될 수 있는 몇 가지 질문은 다음과 같습니다.

- 유일하게 이 계정으로만 로그인이 되지 않나요? 문제가 여러 계정과 관련된 경우 IdP 기반 인증서가 만료되었거나 교체되었을 수 있습니다.
- 최근에 SAML 설정에 변경 사항이 있나요?
- 사용자가 여러 IdP를 사용하는 경우 여러 IdP에서 문제가 지속되나요, 아니면 하나만 지속되나요?
- 최근에 [**SAML Group Mappings**](#roles-errors)를 활성화했나요?

이 문제를 해결하려면 IdP 인증서가 IdP 설정 내에서 최신 상태이고 Datadog에서 IdP의 최신 메타데이터 파일이 업로드됐는지 확인하세요.

## 지원팀

Datadog에 로그인하는 데 여전히 문제가 있으면 [Datadog 지원팀][18]에 문의하세요.

메시지에 로그인 프로세스의 화면 기록을 제공하고 다음 질문에 대한 응답을 입력합니다.

- 본인만 로그인이 안 되는 계정인가요, 아니면 모든 사용자가 로그인이 안 되는 계정인가요?
- 어떤 조직에 로그인하려고 하며, 어떻게 로그인을 시도하고 있나요?

Datadog 지원팀에 연락하기 전에 관리자에게 문의하세요. 로그인 문제를 해결하기 위해 IdP에게 문의해야 할 수도 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods/saml
[3]: https://docs.datadoghq.com/ko/account_management/saml/#assertions-and-attributes
[4]: https://app.datadoghq.com/organization-settings/users
[5]: https://www.samltool.com/validate_xml.php
[6]: https://www.samltool.com/saml_tools.php
[7]: https://app.datadoghq.com/organization-settings/mappings
[8]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[9]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[10]: https://support.google.com/a/answer/6301076
[11]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[12]: https://auth0.com/docs/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations
[13]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[14]: https://support.google.com/a/answer/7553768
[16]: https://support.okta.com/help/s/article/Receiving-404-error-when-attempting-to-sign-into-application?language=en_US
[17]: https://resources.safenetid.com/help/Datadog/Index.htm
[18]: https://www.datadoghq.com/support/