---
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정하기
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 & 조직 설정하기
title: Okta SAML 신원 공급자 설정
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서 <a href="/account_management/faq/okta/">레거시 인스트럭션</a>에 따라 Okta에서 Datadog 애플리케이션을 수동 설정해야 합니다. 애플리케이션 카달로그의 사전 설정 Datadog 애플리케이션에 대한 본 페이지의 지침은 무시하시기 바랍니다.
</div>
{{% /site-region %}}

## 개요

본 페이지에서는 Okta의 애플리케이션 설정 방법을 안내합니다. 

작업을 진행하기 전에 다음에 따라 Datadog 애플리케이션의 최신 버전을 사용하는지 확인하세요.
1. Okta에서 **애플리케이션**을 클릭합니다.
1. Datadog 애플리케이션을 엽니다.
1. **일반** 탭을 선택합니다.
1. **SSO 기반 URL** 라벨 필드를 찾습니다.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="SSO 기반 URL이 강조 표시된, Okta의 Datadog 애플리케이션 설정" style="width:80%;" >}}

SSO 기반 URL 필드가 없는 경우, [레거시 인스트럭션][1]에 따라 Okta를 설정합니다.

## 지원 기능

Datadog Okta SAML 통합은 다음을 지원해 드립니다.
- IdP 시작 SSO
- SP 시작 SSO
- JIT 프로비저닝

상기의 용어 정의를 확인하려면 Okta [용어][2]를 참조하세요.

## 설정

다음 지침에 따라 Datadog용 SAML 신원 공급자 (IdP)로 Okta를 설정합니다. 본 설정 프로세스는 Okta 및 Datadog 계정을 번갈아 사용합니다.

### Okta에 Datadog 통합 추가하기

1. Okta 관리 대시보드에 로그인합니다.
1. 왼쪽 내비게이션에서 **애플리케이션**을 클릭합니다.
1. **앱 카탈로그 탐색**을 클릭합니다.
1. 검색창에서 "Datadog"을 검색합니다.
1. SAML 및 SCIM용 Datadog 앱을 선택합니다.
1. **통합 추가**를 클릭합니다. 일반 설정 대화창이 표시됩니다.
1. **SSO 기반 URL** 필드를 [Datadog 웹사이트 URL][3]로 채웁니다.
1. **완료**를 클릭합니다.

**알림:** 기본 Datadog 웹사이트 URL을 사용하지 않는다면 SSO 기반 URL 필드는 커스텀 서브도메인을 허용합니다.

그런 다음, 메타데이터 세부 정보를 다운로드하여 다음과 같이 Datadog에 업로드합니다.
1. Okta의 Datadog 애플리케이션 설정 대화창에서, **사인 온** 탭을 클릭합니다.
1. **메타데이터 URL**이 보일 때까지 스크롤을 내립니다.
1. **복사**를 클릭합니다.
1. 새 브라우저 탭을 열고 메타데이터 URL을 주소창에 붙여넣습니다.
1. 브라우저를 사용해 XML 파일로 메타데이터 URL 콘텐츠를 저장합니다.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Okta 설정의 '사인 온'" style="width:80%;" >}}

### Datadog 설정

#### 메타데이터 세부 정보 업로드

1. 조직 설정의 [로그인 메서드][4]로 이동합니다.
1. SAML 컴포넌트에서 사전 설정된 SAML에 따라 **설정** 또는 **업데이트**를 클릭합니다. SAML 설정 페이지가 표시됩니다.
1. **파일 선택**을 클릭합니다. Okta에서 사전 다운로드한 메타데이터 파일을 선택합니다.

{{< img src="account_management/saml/okta/choose_file.png" alt="메타데이터 업로드 버튼이 강조 표시된 Datadog의 SAML 설정" style="width:100%;" >}}

#### IdP 시작 로그인 활성화

Datadog 애플리케이션이 제대로 작동하려면 IdP 시작 로그인을 활성화해야 합니다.

<div class="alert alert-info">IdP 시작 로그인을 활성화하면 사용자는 Okta에서 Datadog으로 로그인할 수 있습니다.</div>

다음 단계에 따라 IdP 시작 로그인을 활성화하세요.
1. [SAML 설정 페이지][5]로 이동합니다.
1. **추가 기능**에서 **신원 공급자 (IdP) 시작 로그인** 확인란을 클릭합니다. 컴포넌트에 **어설션 컨슈머 서비스 URL**이 표시됩니다.
1. `/saml/assertion` 뒤에 오는 어설션 컨슈머 서비스 URL의 콘텐츠는 고객님의 회사 ID입니다. 설정을 완료하려면 회사 ID를 Okta에 입력해야 하므로 해당 회사 ID를 메모해 두세요.
1. **변경 사항 저장**을 클릭합니다.

{{< img src="account_management/saml/okta/company_id.png" alt="어설션 컨슈머 서비스 URL의 회사 ID 부분이 강조 표시된 Datadog의 SAML 설정" style="width:100%;" >}}

Okta로 돌아가 다음 설정 단계로 이동합니다.

### Okta에서 회사 ID 추가

1. Okta 관리자 대시보드로 돌아갑니다.
1. **사인 온** 탭을 선택합니다.
1. **편집**을 클릭합니다.
1. **고급 사인 온 설정** 섹션까지 스크롤을 내립니다.
1. 회사 ID를 **회사 ID** 필드에 붙여넣습니다.
1. **저장**을 클릭합니다.

## 서비스 공급자 (SP) 시작 로그인

서비스 공급자 시작 로그인(SP 시작 SSO)을 사용하여 Datadog에 로그인하려면 싱글 사인 온(SSO) URL이 필요합니다. SSO URL은 SAML 설정 페이지 또는 이메일 두 가지 방법으로 확인할 수 있습니다.

### SAML 설정 페이지
Datadog [SAML 설정 페이지][5]의 **싱글 사인 온 URL** 제목 옆에 SSO URL이 표시됩니다.

### 이메일
1. 조직의 Datadog 웹사이트 URL로 이동합니다.
1. **싱글 사인 온을 사용하시겠어요?**를 선택합니다.
1. 이메일 주소를 입력하고 **다음**을 클릭합니다.
1. 이메일에 **로그인 URL**이라고 명시된 SSO URL이 포함된 메시지가 있는지 확인합니다.

두 가지 방법 중 하나로 SSO URL을 확인한 후 나중에 참조할 수 있도록 북마크에 추가하세요.

## SAML 역할 매핑

아래 단계에 따라 Okta 속성을 Datadog 엔티티에 매핑합니다. 이 단계는 옵션입니다.

1. Okta 관리자 대시보드로 이동합니다.
1. **사인 온** 탭을 선택합니다.
1. **편집**을 클릭합니다.
1. [그룹 속성 구문][6]으로 **속성**을 채웁니다.
1. Datadog에서 원하는 [매핑][7]을 설정합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /ko/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[6]: /ko/account_management/faq/okta/#group-attribute-statements-optional
[7]: /ko/account_management/saml/mapping/