---
description: IdP 및 SP 시작 SSO, JIT 프로비저닝, 역할 매핑 구성을 지원하도록 Okta를 Datadog의 SAML ID 공급자로
  설정하세요.
further_reading:
- link: /account_management/saml/
  tag: 설명서
  text: Datadog 계정용 SAML 설정
- link: /account_management/multi_organization/
  tag: 설명서
  text: 여러 계정으로 팀 및 조직 설정
title: Okta SAML ID 공급자 구성
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    해당 {{< region-param key="dd_site_name" >}} 사이트에서는 <a href="/account_management/faq/okta/">레거시 지침</a>을 사용하여 Okta에서 Datadog 애플리케이션을 수동으로 구성해야 합니다. Okta 애플리케이션 카탈로그에 있는 사전 구성된 Datadog 애플리케이션에 대한 이 페이지의 지침은 무시하세요.
</div>
{{% /site-region %}}

## 개요 {#overview}

이 페이지에서는 Okta에서 Datadog 애플리케이션을 설정하는 방법을 설명합니다. 

진행하기 전에 최신 버전의 Datadog 애플리케이션을 사용하고 있는지 확인하세요.
1. Okta에서 {{< ui >}}Applications{{< /ui >}}를 클릭합니다.
1. Datadog 애플리케이션을 엽니다.
1. {{< ui >}}General{{< /ui >}} 탭을 선택합니다.
1. {{< ui >}}SSO Base URL{{< /ui >}} 레이블이 지정된 필드를 찾습니다.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="SSO 기본 URL을 강조 표시하는 Okta의 Datadog 애플리케이션 구성" style="width:80%;" >}}

SSO 기본 URL 필드가 보이지 않으면 [레거시 지침][1]을 사용하여 Okta를 구성하세요.

## 지원되는 기능 {#supported-features}

Datadog Okta SAML 통합은 다음을 지원합니다.
- IdP 시작 SSO
- SP 시작 SSO
- JIT 프로비저닝

위 용어에 대한 정의는 Okta [용어집][2]을 참조하세요.

## 설정 {#setup}

다음 지침에 따라 Okta를 Datadog의 SAML ID 공급자(IdP)로 설정하세요. 설정 프로세스를 진행하려면 Okta 계정과 Datadog 계정을 번갈아 사용해야 합니다.

<div class="alert alert-info">Okta가 Datadog으로 보내는 이메일 주소는 Datadog의 사용자 핸들과 정확히 일치해야 합니다.</div>

### Okta에 Datadog 통합 추가{#add-the-datadog-integration-in-okta}

1. Okta 관리자 대시보드에 로그인합니다.
1. 왼쪽 탐색 패널에서 {{< ui >}}Applications{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Browse App Catalog{{< /ui >}}를 클릭합니다.
1. 검색창에서 'Datadog'을 검색합니다.
1. SAML 및 SCIM용 Datadog 앱을 선택합니다.
1. {{< ui >}}Add Integration{{< /ui >}}를 클릭합니다. 일반 설정 대화 상자가 나타납니다.
1. {{< ui >}}SSO Base URL{{< /ui >}} 필드에 [Datadog 웹사이트 URL][3]을 입력합니다.
1. {{< ui >}}Done{{< /ui >}}을 클릭합니다.

**참고:** 표준 Datadog 웹사이트 URL을 사용하지 않는 경우 SSO Base URL 필드에서 사용자 지정 하위 도메인을 허용합니다.

다음으로 Datadog에 업로드할 메타데이터 세부 정보를 다운로드하세요.
1. Okta의 Datadog 애플리케이션 설정 대화 상자에서 {{< ui >}}Sign on{{< /ui >}} 탭을 클릭합니다.
1. {{< ui >}}Metadata URL{{< /ui >}}이 표시될 때까지 아래로 스크롤합니다.
1. {{< ui >}}Copy{{< /ui >}}를 클릭합니다.
1. 새 브라우저 탭을 열고 메타데이터 URL을 주소 표시줄에 붙여넣습니다.
1. 브라우저를 사용하여 메타데이터 URL의 콘텐츠를 XML 파일로 저장합니다.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Okta의 로그인 구성" style="width:80%;" >}}

### Datadog 구성 {#configure-datadog}

#### 메타데이터 세부 정보 업로드 {#upload-metadata-details}

1. Organization Settings 아래의 [Login Methods][4]로 이동합니다.
1. 이전에 SAML을 구성했는지에 따라 SAML 구성 요소에서 {{< ui >}}Configure{{< /ui >}} 또는 {{< ui >}}Update{{< /ui >}}를 클릭합니다. SAML 구성 페이지가 나타납니다.
1. {{< ui >}}Choose File{{< /ui >}}을 클릭하고 이전에 Okta에서 다운로드한 메타데이터 파일을 선택합니다.

{{< img src="account_management/saml/okta/choose_file.png" alt="Datadog의 SAML 구성, 메타데이터 업로드 버튼 강조 표시" style="width:100%;" >}}

#### IdP 시작 로그인 활성화 {#activate-idp-initiated-login}

Datadog 애플리케이션이 올바르게 작동하려면 IdP 시작 로그인을 활성화해야 합니다.

<div class="alert alert-info">IdP 시작 로그인을 활성화하면 사용자가 Okta에서 Datadog으로 로그인할 수 있습니다</div>

IdP 시작 로그인을 활성화하려면 다음 단계를 실행하세요.
1. [SAML 구성 페이지][5]로 이동합니다.
1. {{< ui >}}Additional Features{{< /ui >}} 아래에서 {{< ui >}}Identity Provider (IdP) Initiated Login{{< /ui >}} 확인란을 클릭합니다. 구성 요소에 {{< ui >}}Assertion Consumer Service URL{{< /ui >}}가 표시됩니다.
1. `/saml/assertion` 뒤의 Assertion Consumer Service URL에 있는 콘텐츠가 회사 ID입니다. 구성을 완료하려면 Okta에서 `/id/` 접두사를 사용하여 이 값을 입력합니다.
1. {{< ui >}}Save Changes{{< /ui >}}를 클릭합니다.

{{< img src="account_management/saml/okta/company_id.png" alt="Datadog의 SAML 구성, Assertion Consumer Service URL의 회사 ID 부분 강조 표시" style="width:100%;" >}}

다음 구성 단계를 진행하려면 Okta로 돌아가세요.

### Okta에 회사 ID 추가 {#add-the-company-id-in-okta}

1. Okta 관리자 대시보드로 돌아가세요.
1. {{< ui >}}Sign on{{< /ui >}} 탭을 선택하세요.
1. {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
1. {{< ui >}}Advanced Sign-on Settings{{< /ui >}} 섹션까지 스크롤합니다.
1. `/id/` 접두사를 포함한 전체 회사 ID를 {{< ui >}}Company ID{{< /ui >}} 필드(`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`)에 붙여넣습니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 서비스 공급자(SP)가 시작하는 로그인 {#service-provider-sp-initiated-login}

서비스 공급자가 시작하는 로그인(SP-initiated SSO)을 사용하여 Datadog에 로그인하려면 싱글 사인온(SSO) URL이 필요합니다. SSO URL은 SAML 구성 페이지에서 확인하거나 이메일을 통해 찾을 수 있습니다.

### SAML 구성 페이지 {#saml-configuration-page}
Datadog [SAML 구성 페이지][5]에는 {{< ui >}}Single Sign-on URL{{< /ui >}} 제목 옆에 SSO URL이 표시됩니다.

### 이메일 {#email}
1. 조직의 Datadog 웹사이트 URL로 이동합니다.
1. {{< ui >}}Using Single Sign-On?{{< /ui >}}를 선택합니다.
1. 이메일 주소를 입력하고 {{< ui >}}Next{{< /ui >}}을 클릭합니다.
1. 이메일에서 SSO URL이 {{< ui >}}Login URL{{< /ui >}}로 표시된 메시지를 확인합니다.

두 방법 중 하나로 SSO URL을 찾은 후 나중에 참조할 수 있도록 북마크합니다.

## SAML 역할 매핑 {#saml-role-mapping}

Datadog은 SAML 그룹 매핑을 사용하여 Okta 속성을 Datadog 역할 및 팀에 매핑합니다. 이 단계는 선택 사항입니다.

**참고**: 역할 매핑은 SAML을 통해서만 사용할 수 있습니다. SCIM은 Okta에서 사용자 및 팀을 프로비저닝하지만 역할을 매핑하지는 않습니다. SCIM을 설정하려면 [Configure SCIM with Okta][8]를 참조하세요.

1. Okta 관리자 대시보드로 이동합니다.
1. {{< ui >}}Sign on{{< /ui >}} 탭을 선택합니다.
1. {{< ui >}}Edit{{< /ui >}}를 클릭합니다.
1. 모든 그룹을 가져오려면 {{< ui >}}Attributes{{< /ui >}} 아래에서 이름이 `memberOf`이고 이름 형식이 {{< ui >}}Unspecified{{< /ui >}}, 값이 `.*`인 그룹 속성 문을 추가합니다. 더 좁게 범위를 지정해야 하는 경우 IdP 관리자에게 문의하세요.
1. Datadog에서 원하는 [매핑][7]을 설정합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /ko/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[7]: /ko/account_management/saml/mapping/
[8]: /ko/account_management/scim/okta/