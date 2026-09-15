---
aliases:
- /ko/service_management/app_builder/http_request/
- /ko/service_management/workflows/connections/http/
- /ko/service_management/app_builder/connections/http_request/
description: 구성 가능한 인증, 메서드, 헤더 및 응답 처리를 통해 워크플로와 앱에서 사용할 엔드포인트에 사용자 지정 HTTP 요청을 보낼
  수 있습니다.
disable_toc: false
further_reading:
- link: /actions/connections/
  tag: 설명서
  text: 연결 자격 증명에 대해 자세히 알아보기
title: HTTP 요청
---
{{< ui >}}Make request{{< /ui >}} 작업을 사용하여 HTTP 엔드포인트에 사용자 지정 요청을 보냅니다. 요청 메서드와 그 내용, 인증 및 처리 방법, 만료된 인증서나 리디렉션과 같은 시나리오에 대응하는 방법을 제어할 수 있습니다. HTTP 작업이 예상대로 작동하도록 Datadog IP 주소 범위를 허용 목록에 추가해야 하는 경우 `webhooks` 객체에 나열된 IP를 사용하세요. 자세한 내용은 [IP Ranges API][1]를 참조하세요.

HTTP 요청을 추가하려면:

{{< tabs >}}
{{% tab "Workflow Automation" %}}
- 새 워크플로에서 {{< ui >}}Add step{{< /ui >}}을 클릭하고 `Make request`를 검색합니다. {{< ui >}}Make request{{< /ui >}} 작업을 선택하여 워크플로에 추가합니다.
- 기존 워크플로에서 {{< ui >}}+{{< /ui >}}를 클릭하고 `Make request`를 검색합니다. {{< ui >}}Make request{{< /ui >}} 작업을 선택하여 워크플로에 추가합니다.

요청 메서드와 필요한 [인증][1]을 지정합니다. 사용 가능한 구성 옵션에 대한 자세한 내용은 아래 섹션을 읽어봅니다. 선택적으로 요청은 {{< ui >}}Conditional wait{{< /ui >}} 섹션에 지정한 조건을 기다릴 수 있으며, 조건이 충족되지 않으면 지정된 간격으로 재시도할 수 있습니다.

[1]: /ko/actions/workflows/access_and_auth/
{{% /tab %}}

{{% tab "App Builder" %}}
1. 앱에서 {{< ui >}}Data{{< /ui >}} 아래의 {{< ui >}}+ New{{< /ui >}}를 클릭하고 {{< ui >}}Query{{< /ui >}}를 선택합니다.
1. `HTTP`를 검색한 다음 {{< ui >}}Make request{{< /ui >}} 작업을 선택하여 앱에 추가합니다.

요청 메서드와 필요한 [인증][1]을 지정합니다. 사용 가능한 구성 옵션에 대한 자세한 내용은 아래 섹션을 읽어봅니다.

[1]: /ko/actions/app_builder/access_and_auth/
{{% /tab %}}
{{< /tabs >}}

## 인증 {#authentication}

요청을 인증해야 하는 경우 작업의 {{< ui >}}Connection{{< /ui >}}을 사용하여 인증 방법을 구성하세요. 드롭다운에서 미리 구성된 연결을 선택하거나 연결을 생성할 수 있습니다.

### AWS 연결 생성 {#create-an-aws-connection}

1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}AWS{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Account ID{{< /ui >}} 및 {{< ui >}}AWS Role Name{{< /ui >}}를 입력합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### Azure 연결 생성 {#create-an-azure-connection}

1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}Azure{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}, {{< ui >}}Tenant ID{{< /ui >}}, {{< ui >}}Client ID{{< /ui >}} 및 {{< ui >}}Client Secret{{< /ui >}}을 입력합니다.
1. 선택적으로 OAuth 2.0 액세스 토큰을 가져올 때 Microsoft에 요청할 {{< ui >}}Custom Scope{{< /ui >}}를 입력합니다. 리소스의 범위는 리소스의 식별자 URI와 `.default`를 슬래시(`/`)로 구분하여 구성됩니다. 예를 들어, `{identifierURI}/.default`입니다. 자세한 내용은 [.default 범위에 대한 Microsoft 설명서][3]를 참조하세요.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### HTTP 토큰 인증 연결 생성 {#create-an-http-token-authentication-connection}

Token Auth 연결은 bearer 토큰을 사용하여 HTTP 요청을 인증합니다.

1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}HTTP{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}을 입력합니다.
1. 인증을 위한 {{< ui >}}Base URL{{< /ui >}}을 입력합니다.
1. {{< ui >}}Authentication Type{{< /ui >}} 드롭다운에서 {{< ui >}}Token Auth{{< /ui >}}를 선택합니다.
1. {{< ui >}}Token Name{{< /ui >}} 및 {{< ui >}}Token Value{{< /ui >}}를 입력합니다. 여러 토큰을 입력할 수 있습니다. 헤더, 매개변수 또는 요청 본문에서 토큰을 참조하려면 다음 구문을 사용하세요. `{{ secretTokenName }}`.
1. 선택적으로 요청에 {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} 및 {{< ui >}}Body{{< /ui >}}를 추가합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### HTTP 기본 인증 연결 생성 {#create-an-http-basic-authentication-connection}

기본 인증 연결은 사용자 이름과 비밀번호가 포함된 권한 부여 헤더를 사용하여 HTTP 요청을 인증합니다.

1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}HTTP{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}을 입력합니다.
1. 인증을 위한 {{< ui >}}Base URL{{< /ui >}}을 입력합니다.
1. {{< ui >}}Authentication Type{{< /ui >}} 드롭다운에서 {{< ui >}}Basic Auth{{< /ui >}}를 선택합니다.
1. {{< ui >}}Username{{< /ui >}} 및 {{< ui >}}Password{{< /ui >}}를 입력합니다. 필수 권한 부여 요청 헤더는 사용자 이름과 비밀번호를 사용하여 자동으로 채워집니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

### 2단계 HTTP 인증 연결 생성 {#create-a-2-step-http-authentication-connection}

HTTP 2단계 연결을 사용하면 예비 요청을 수행하여 HTTP 요청을 인증하는 데 사용할 액세스 토큰을 가져올 수 있습니다. 이는 JSON 웹 토큰(JWT) 및 OAuth 애플리케이션을 인증하는 데 유용합니다.

1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}HTTP{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}을 입력합니다.
1. 인증을 위한 {{< ui >}}Base URL{{< /ui >}}을 입력합니다.
1. {{< ui >}}Authentication Type{{< /ui >}} 드롭다운에서 {{< ui >}}2 Step Auth{{< /ui >}}를 선택합니다.

{{< tabs >}}
{{% tab "토큰 인증" %}}
예비 액세스 토큰 쿼리 구성:
1. {{< ui >}}Secret Type{{< /ui >}} 드롭다운에서 {{< ui >}}Token Auth{{< /ui >}}를 선택합니다.
1. 토큰 이름 및 토큰 값을 입력합니다.
1. {{< ui >}}Request URL{{< /ui >}}을 입력하고 요청 유형을 {{< ui >}}GET{{< /ui >}} 또는 {{< ui >}}POST{{< /ui >}}로 지정합니다.
1. 선택적으로 요청에 {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} 및 {{< ui >}}Body{{< /ui >}}를 추가합니다.

응답에서 액세스 토큰 가져오기:
1. {{< ui >}}Variable Path to Access Token{{< /ui >}} 아래에 응답 내 액세스 토큰 경로를 입력합니다. 이는 인증 호출 후 액세스 토큰이 반환되는 경로입니다. 예를 들어, 액세스 토큰이 액세스 요청의 본문으로 반환되는 경우 `body`를 사용합니다. 액세스 토큰이 응답 `body`의 `token`이라는 속성으로 반환되는 경우 `body.token`을 사용합니다. 경로는 대소문자를 구분합니다.
1. 선택적으로 {{< ui >}}Refresh Interval{{< /ui >}}을 입력합니다. 이는 액세스 토큰이 만료될 때까지의 기간이며 초 단위로 지정됩니다. 토큰이 만료되면 연결이 자동으로 새 액세스 토큰을 요청합니다. 간격을 `0`으로 설정하면 토큰 새로 고침이 비활성화됩니다.

가져온 토큰을 사용하여 연결을 인증합니다.
1. {{< ui >}}Request Detail{{< /ui >}}에서 {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} 및 {{< ui >}}Body{{< /ui >}}를 입력하여 가져온 액세스 토큰을 사용해 요청을 완료합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
{{% /tab %}}

{{% tab "기본 인증" %}}
예비 인증 쿼리 구성:
1. {{< ui >}}Secret Type{{< /ui >}} 드롭다운에서 {{< ui >}}Basic Auth{{< /ui >}}를 선택합니다.
1. {{< ui >}}Username{{< /ui >}} 및 {{< ui >}}Password{{< /ui >}}를 입력합니다. {{< ui >}}Request Headers{{< /ui >}} 섹션은 사용자 이름과 비밀번호를 사용하여 자동으로 채워집니다.

인증 요청 구성:
1. {{< ui >}}Request URL{{< /ui >}}을 입력하고 요청 유형을 {{< ui >}}GET{{< /ui >}} 또는 {{< ui >}}POST{{< /ui >}}로 지정합니다.
1. 선택적으로 요청에 {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} 및 {{< ui >}}Body{{< /ui >}}를 추가합니다.

응답에서 액세스 토큰 가져오기:
1. {{< ui >}}Variable Path to Access Token{{< /ui >}} 아래에 응답 내 액세스 토큰 경로를 입력합니다. 이는 인증 호출 후 액세스 토큰이 반환되는 경로입니다. 예를 들어, 액세스 토큰이 액세스 요청의 본문으로 반환되는 경우 `body`를 사용합니다. 액세스 토큰이 응답 `body`의 `token`이라는 속성으로 반환되는 경우 `body.token`을 사용합니다. 경로는 대소문자를 구분합니다.
1. 선택적으로 {{< ui >}}Refresh Interval{{< /ui >}}을 입력합니다. 이는 액세스 토큰이 만료될 때까지의 기간이며 초 단위로 지정됩니다. 토큰이 만료되면 연결이 자동으로 새 액세스 토큰을 요청합니다. 간격을 `0`으로 설정하면 토큰 새로 고침이 비활성화됩니다.

가져온 토큰을 사용하여 연결을 인증합니다.
1. {{< ui >}}Request Detail{{< /ui >}}에서 {{< ui >}}Request Headers{{< /ui >}}, {{< ui >}}URL parameters{{< /ui >}} 및 {{< ui >}}Body{{< /ui >}}를 입력하여 가져온 액세스 토큰을 사용해 요청을 완료합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.
{{% /tab %}}
{{< /tabs >}}

### HTTP mTLS 연결 생성 {#create-an-http-mtls-connection}

상호 TLS(mTLS) 인증 연결을 사용하면 개인 키와 TLS 인증서를 사용하여 HTTP 요청을 인증할 수 있습니다.

<div class="alert alert-info">클라이언트 인증서(<code>.crt</code>, <code>.pem</code>) 및 개인 키(<code>.key</code>, <code>.pem</code>)는 PEM 형식을 사용해야 합니다.</div>

1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}HTTP{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}을 입력합니다.
1. 인증을 위한 {{< ui >}}Base URL{{< /ui >}}을 입력합니다.
1. {{< ui >}}Authentication Type{{< /ui >}} 드롭다운에서 {{< ui >}}mTLS Auth{{< /ui >}}를 선택합니다.
1.  {{< ui >}}Upload File{{< /ui >}}을 클릭하여 {{< ui >}}Private Key{{< /ui >}}를 업로드합니다.
1. {{< ui >}}Upload File{{< /ui >}}을 클릭하여 {{< ui >}}Certificate{{< /ui >}}을 업로드합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

## 입력 사항 {#inputs}

요청에는 URL과 요청 메서드가 필요합니다. 선택적으로 다음을 입력할 수 있습니다.
- URL 파라미터
- 헤더
- 콘텐츠 유형
- 요청 본문
- 쿠키

만료된 인증서를 허용할지 또는 리디렉션을 따를지 선택할 수도 있습니다.

### 응답 옵션 {#response-options}

{{< ui >}}Error on Status{{< /ui >}} 아래에 오류를 반환할 상태 코드의 목록을 쉼표로 구분하여 입력하세요. {{< ui >}}Response Parsing{{< /ui >}} 드롭다운을 사용하여 헤더에서 유추된 기본 응답 구문 분석 방법을 재정의하고, 대상 서버가 응답 헤더에 잘못된 인코딩을 지정한 경우 {{< ui >}}Response Encoding{{< /ui >}}을 사용하세요.

## Private actions {#private-actions}

{{< callout url="https://www.datadoghq.com/product-preview/private-actions/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Private Actions는 미리 보기 상태입니다. 액세스를 요청하려면 오늘 이 양식을 작성하세요.
{{< /callout >}}

프라이빗 HTTP 작업을 사용하여 공용 인터넷에 서비스를 노출하지 않고 개인 네트워크에 호스팅된 서비스와 상호 작용할 수 있습니다. Private Actions는 Docker를 사용하여 네트워크의 호스트에 설치하고 Datadog 연결과 페어링하는 프라이빗 작업 러너를 사용합니다. 자세한 내용은 [Private Actions][5]를 참조하세요.

프라이빗 HTTP 요청을 구성하려면:
1. 앱에 HTTP 작업을 추가합니다.
1. {{< ui >}}Connection{{< /ui >}} 섹션에서 더하기 아이콘({{< ui >}}+{{< /ui >}})을 클릭합니다.
1. {{< ui >}}HTTP{{< /ui >}}를 선택합니다.
1. {{< ui >}}Connection Name{{< /ui >}}을 입력합니다.
1. 프라이빗 네트워크에 있는 호스트의 {{< ui >}}Base URL{{< /ui >}}을 입력합니다.
1. {{< ui >}}Type{{< /ui >}}의 경우 {{< ui >}}Private Action Runner{{< /ui >}}가 선택되었는지 확인합니다.
1. {{< ui >}}Private Action Runner{{< /ui >}} 드롭다운에서 [프라이빗 작업 러너][5]를 선택합니다.
1. {{< ui >}}Authentication Type{{< /ui >}} 드롭다운에서 인증 유형을 선택하고 필수 필드를 입력합니다. 프라이빗 HTTP 요청은 다음 인증 유형을 지원합니다.
   - 인증 없음
   - [기본 인증](#create-an-http-basic-authentication-connection)
   - [토큰 인증](#create-an-http-token-authentication-connection)

   토큰 인증을 위한 자격 증명 구성에 대한 자세한 내용은 [프라이빗 작업 자격 증명 처리][6]를 참조하세요.
1. {{< ui >}}Next, Confirm Access{{< /ui >}}를 클릭하여 쿼리에 대한 액세스를 구성합니다.
1. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

<br>질문이나 피드백이 있으신가요? [Datadog 커뮤니티 Slack][4]의 **#workflows** 또는 **#app-builder** 채널에 참여하세요.

[1]: https://docs.datadoghq.com/ko/api/latest/ip-ranges/#list-ip-ranges
[3]: https://learn.microsoft.com/en-us/azure/active-directory/develop/scopes-oidc#the-default-scope
[4]: https://chat.datadoghq.com/
[5]: /ko/actions/private_actions
[6]: /ko/actions/connections/private_action_credentials/?tab=httpsaction#credential-files