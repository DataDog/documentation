---
aliases:
- /ko/account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
title: Okta SAML IdP
---

## 구성

[Datadog용 SAML 2.0 설정 방법][1] 문서에 따라 Okta를 SAML IdP로 설정합니다.

**참고**: `pre-configured` 설정을 사용하는 대신 Datadog을 Okta 애플리케이션으로 수동으로 설정하는 것이 좋습니다.

## 일반 상세 정보

| Okta IDP 입력 필드        | 기대값                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| 싱글 사인온 URL          | 어서션 소비자 서비스 URL([Configure SAML][2] 페이지의 *Assertion Consumer Service URL* 필드에서 이 URL을 찾습니다) |
| 수취인 URL               | 어서션 소비자 서비스 URL(또는 *Use this for Recipient URL and Destination URL* 확인란을 클릭합니다)                        |
| 대상 URL             | 어서션 소비자 서비스 URL(또는*Use this for Recipient URL and Destination URL* 확인란을 클릭합니다)                        |
| 오디언스 URI(SP 엔티티 ID) | 서비스 제공업체 엔티티 ID([Configure SAML][2] 페이지의 *Service Provider Entity ID* 필드에서 이 URL을 찾으세요)         |
| 이름 ID 형식              | EmailAddress                                                                                                                   |
| 응답                    | 서명됨                                                                                                                         |
| 어서션 서명         | 서명됨                                                                                                                         |
| 서명 알고리즘         | SHA256                                                                                                                         |
| 어서션 암호화        | 어서션은 암호화할 수 있지만, 암호화되지 않은 어서션도 허용됩니다.                                                     |
| SAML 싱글 로그아웃          | 비활성화됨                                                                                                                       |
| authnContextClassRef        | PasswordProtectedTransport                                                                                                     |
| 강제 인증 적용  | 예                                                                                                                            |
| SAML 발행자 ID              | `http://www.okta.com/${org.externalKey}`                                                                                       |

## 속성 구문 상세 정보

| 이름       | 이름 형식(선택) | 값                                             |
|------------|------------------------|---------------------------------------------------|
| NameFormat | URI 레퍼런스          | `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` |
| sn         | URI 레퍼런스          | `user.lastName`                                   |
| givenName  | URI 레퍼런스          | `user.firstName`                                  |

## 그룹 속성 구문(선택)

[AuthN 매핑][3]을 사용하는 경우에만 필요합니다.

| 이름     | 이름 형식(선택) | 값                                                                                                                     |
|----------|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| memberOf | Unspecified            | 정규식 `.*`과 일치(이 방법은 모든 그룹을 검색합니다. 사용 사례에 맞지 않는다면 IDP 관리자에게 문의하세요) |


Datadog 계정의 SAML 설정에 대한 상세 정보는 [SAML 문서 페이지][4]에서 확인할 수 있습니다.

Okta에서 애플리케이션을 완전히 설정하기 전에 `IDP.XML` 파일을 Datadog에 업로드해야 하는 경우에는 필드 플레이스홀더 지침에 대한 [SAML 템플릿 앱의 idp.xml 메타데이터 파일 가져오기 문서][5]를 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-DataDog.html
[2]: https://app.datadoghq.com/saml/saml_setup
[3]: /ko/account_management/saml/#mapping-saml-attributes-to-datadog-roles
[4]: /ko/account_management/saml/
[5]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App