---
algolia:
  tags:
  - cross-app access
  - XAA
  - Okta
  - AI agent
  - MCP
  - ID-JAG
description: Okta에서 승인된 사용자를 대신하여 AI Agent가 Datadog API를 호출할 수 있도록 Okta Cross-App
  Access를 구성하세요.
further_reading:
- link: /mcp_server/setup/
  tag: 설명서
  text: Datadog MCP Server 설정
- link: /account_management/org_settings/mobile_third_party_access/
  tag: 설명서
  text: 모바일 및 타사 액세스
- link: /account_management/saml/
  tag: 설명서
  text: SAML 싱글 사인온 구성
title: Cross-App Access
---
{{< callout url="#" btn_hidden="true" header="false">}}
  Cross-App Access는 미리 보기 상태입니다. Okta는 미리 보기를 제어하고 사용자의 테넌트에서 이를 활성화하며, 이 설정에 필요한 Okta 기능은 아직 일반적으로 제공되지 않습니다. 모든 Datadog 조직은 오늘 Datadog 측에서 Cross-App Access를 활성화할 수 있습니다.
{{< /callout >}}

## 개요 {#overview}

Cross-App Access(XAA)를 사용하면 AI Agent가 조직에서 이미 Okta를 통해 승인한 사용자를 대신하여 Datadog API를 호출할 수 있습니다. 이 기능을 사용하지 않으면 모든 사용자가 브라우저 동의 화면을 통해 개별적으로 Agent를 승인해야 합니다. 이 기능을 사용하면 Okta 관리자가 중앙에서 한 번만 액세스 권한을 부여하므로 사용자는 사용자별 동의 단계를 건너뛸 수 있습니다.

Okta는 에이전트에 ID-JAG(Identity Assertion JWT Authorization Grant)라는 단기 토큰을 발급합니다. 에이전트가 이 토큰을 Datadog에 제시하면 Datadog은 이를 호출을 시작한 사용자가 소유한 액세스 토큰으로 교환합니다. Okta가 토큰을 생성하므로 관리자는 Okta에서 AI 에이전트의 Datadog 액세스 권한을 부여하거나 취소할 수 있습니다.

미리 보기 단계에서 Cross-App Access는 ID 공급자로 Okta만, 에이전트로 Claude만 지원합니다.

## 교환하는 값 {#values-you-exchange}

설정 시 Datadog과 Okta 간에 양방향으로 값을 전달합니다. 이 중 두 가지는 서로 다른 시스템을 지정하는 발급자 URL이므로 각각 올바른 위치에 입력했는지 확인하세요.

| 값                               | 방향       | 입력 위치                                                                        |
| ----------------------------------- | --------------- | ----------------------------------------------------------------------------------------- |
| Datadog 조직 UUID           | Datadog → Okta | Okta의 Datadog 애플리케이션: {{< ui >}}Resource Server{{< /ui >}} 탭 > {{< ui >}}Audience/tenant ID{{< /ui >}}              |
| Agent 클라이언트 ID                     | Datadog → Okta | Okta AI Agent: {{< ui >}}Resource Connection{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}}                         |
| Datadog 리소스 URL 및 발급자 URL | Datadog → Okta | Okta의 Datadog 애플리케이션: {{< ui >}}Resource Server{{< /ui >}} 탭 > {{< ui >}}Resource URL{{< /ui >}} 및 {{< ui >}}Issuer URL{{< /ui >}} |
| Okta 테넌트 발급자 URL              | Okta → Datadog | Datadog: {{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}, {{< ui >}}Issuer URL{{< /ui >}}                      |

## 전제 조건 {#prerequisites}

- 조직에서 Datadog에 대한 SAML 싱글 사인온에 Okta를 사용해야 합니다. Cross-App Access는 기존 SAML 연결을 통해 사용자를 확인하므로 SAML 연결 없이는 작동하지 않습니다. [SAML 싱글 사인온 구성](/account_management/saml/)을 참조하세요.
- Claude를 사용하는 각 사용자는 Datadog 조직에 존재해야 하며 Okta의 Claude 애플리케이션과 Datadog 애플리케이션 모두에 할당되어 있어야 합니다.
- Datadog에서 `org_management` 권한을 가지고 있어야 합니다. UI 대신 API를 통해 Cross-App Access를 구성하려면 [개인 액세스 토큰](/account_management/personal-access-tokens/)(PAT)도 필요하며, 예시에서는 `DD_TOKEN`으로 사용됩니다.
- Okta 테넌트에서 {{< ui >}}AI Agent Identity Assertion{{< /ui >}} 및 {{< ui >}}Agent to Agent Connections{{< /ui >}} Early Access 기능이 활성화되어 있고 Okta Super Administrator 권한이 있어야 합니다.

## Datadog에서 Cross-App Access 구성 {#configure-cross-app-access-in-datadog}

Okta 단계를 수행하기 전에 Datadog 단계를 완료하세요. Datadog은 Cross-App Access를 활성화하지 않은 조직의 토큰을 거부하므로, 여기에서 작업을 완료하기 전에 Okta를 먼저 구성하면 요청이 실패합니다.

[{{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/cross-app-access)로 이동하세요.

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="활성화 상태, 발급자 URL 필드, 조직 UUID 및 등록된 클라이언트 ID 표를 보여주는 조직 설정의 Cross-App Access 페이지" style="width:100%;">}}

### Cross-App Access 활성화 {#enable-cross-app-access}

{{< ui >}}Enable{{< /ui >}}를 클릭하세요. 이는 조직 전체에 적용됩니다. 나중에 Cross-App Access를 끄려면 {{< ui >}}Disable{{< /ui >}}을 클릭하세요.

### Okta 발급자 URL 설정 {#set-your-okta-issuer-url}

{{< ui >}}Issuer URL{{< /ui >}} 필드에 자체 Okta 테넌트의 발급자 URL을 입력한 다음 {{< ui >}}Save{{< /ui >}}를 클릭하세요. Datadog은 이 값에서 토큰 서명 키의 위치를 확인하므로 정확하게 입력해야 합니다.

발급자 URL이 다음을 모두 충족하지 않으면 Datadog에서 거부됩니다.

- `https`를 사용하세요.
- `.okta.com`, `.oktapreview.com` 또는 `.okta-emea.com`의 하위 도메인을 사용해야 합니다. Datadog은 에이펙스 도메인을 거부하므로 `example.okta.com`은 사용할 수 있지만 `okta.com`은 사용할 수 없습니다.

발급자를 설정 해제하려면 {{< ui >}}Remove{{< /ui >}}를 클릭하세요. 해제 후에는 Datadog에서 토큰 수락을 중단합니다.

### 조직 UUID 복사{#copy-your-organization-uuid}

{{< ui >}}Org UUID{{< /ui >}} 필드의 값을 복사하세요. Okta는 이 값을 `aud_tenant` 클레임으로 전송하며, 여러 조직이 하나의 Okta 테넌트를 공유할 때 토큰이 어떤 조직을 대상으로 하는지 Datadog이 식별하는 데 쓰입니다. 이는 Okta가 다른 곳에서 요구하는 회사 ID와는 다릅니다.

### 에이전트 클라이언트 ID 복사{#copy-the-agent-client-id}

{{< ui >}}Registered client IDs{{< /ui >}} 표에는 Datadog이 Cross-App Access를 위해 지원하는 모든 에이전트와 각 에이전트가 사용하는 OAuth 클라이언트 ID가 나열되어 있습니다. 설정할 에이전트의 클라이언트 ID를 복사하세요. 이 값은 Okta에 {{< ui >}}Client ID at resource{{< /ui >}}로 입력하게 됩니다.

Datadog은 지원하는 모든 에이전트를 이 표에 추가하므로, 다른 소스의 클라이언트 ID를 재사용하지 말고 표를 확인하세요.

해당 에이전트의 범위 설정을 열려면 행에서 {{< ui >}}Manage app{{< /ui >}}을 클릭하세요. [Datadog에서 범위 제어](#control-scopes-in-datadog)를 참조하세요.

{{% collapse-content title="필요시: API로 구성" level="h3" expanded=false %}}

다음과 같은 호출을 사용하여 설정을 스크립트로 작성하세요. 이들은 {{< ui >}}Enable{{< /ui >}} 버튼 및 {{< ui >}}Issuer URL{{< /ui >}} 필드와 동일한 작업을 수행합니다. 두 호출 모두 `org_management` 권한이 있는 PAT가 필요합니다.

`mcp_cross_app_access_enabled` 조직 구성을 `true`로 설정하여 Cross-App Access를 활성화하세요. 나중에 비활성화하려면 `"value": false`를 사용하여 동일한 요청을 전송하세요.

```shell
curl -X PATCH "{{< region-param key="dd_api" >}}/api/v2/org_configs/mcp_cross_app_access_enabled" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_configs",
      "attributes": {
        "value": true
      }
    }
  }'
```

Okta 발급자 URL을 설정하세요. 동일한 유효성 검사 규칙이 적용되며, 이를 위반하는 값을 입력하면 `400`이 반환됩니다. 빈 문자열을 전송하면 발급자 설정이 해제됩니다.

```shell
curl -X PUT "{{< region-param key="dd_api" >}}/api/v2/login/org_configs/mcp_cross_app_access_issuer_url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_config",
      "attributes": {
        "issuer_url": "https://<YOUR_OKTA_SUBDOMAIN>.okta.com"
      }
    }
  }'
```

API에서 조직 UUID를 확인하려면 대상 조직에서 활성 세션으로{{< region-param key="dd_api" >}}[/api/v2/current_user](https://app.datadoghq.com/api/v2/current_user)를 호출하세요. UUID는 `included` 배열 내 `orgs` 항목의 `id`입니다.

{{% /collapse-content %}}

## Okta에서 설정 완료{#finish-the-setup-in-okta}

Super Administrator로서 Okta Admin Console에서 설정을 완료하세요. 이 섹션에서는 Datadog이 요구하는 값과 해당 값이 속한 Okta 필드를 설명합니다. 자세한 내용은 [Okta의 Cross-App Access 문서](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm)를 참조하세요. 

### Datadog 애플리케이션을 리소스 서버로 구성{#configure-the-datadog-application-as-a-resource-server}

Datadog 애플리케이션에서 {{< ui >}}Resource Server{{< /ui >}} 탭을 열고 {{< ui >}}Cross-app access (XAA){{< /ui >}}를 활성화하세요. 다음 필드를 설정합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<p>아래 값은 선택한 <a href="/getting_started/site/">Datadog 사이트</a>와 일치합니다({{< region-param key="dd_site_name" >}}). 다른 사이트의 값을 보려면 이 페이지 오른쪽에 있는 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하세요.</p>
<table>
<thead><tr><th>Okta 필드</th><th>값</th></tr></thead>
<tbody>
<tr><td>{{< ui >}}Resource URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_resource_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Issuer URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_issuer_url" code="true" >}}</td></tr>
<tr><td>{{< ui >}}Audience/tenant ID{{< /ui >}}</td><td>Datadog 조직 UUID</td></tr>
</tbody>
</table>
{{< /site-region >}}

발급자 URL은 토큰 엔드포인트가 아닌 Datadog 인증 서버를 식별합니다. Okta는 발행하는 토큰의 `aud` 클레임에 이 값을 기록하며, Datadog은 해당 클레임이 일치할 때만 토큰을 수락합니다.

**참고**: 나중에 발급자 URL을 변경하려면 [Claude를 Datadog 애플리케이션에 연결](#connect-claude-to-the-datadog-application)에 설명된 리소스 연결을 삭제하고 다시 생성해야 합니다.

### Claude를 AI Agent로 등록 {#register-claude-as-an-ai-agent}

Okta에 Claude용 AI Agent 항목을 생성한 다음 Anthropic과 키를 교환하세요. Anthropic은 Okta가 수신하는 요청에 서명하므로, Okta는 토큰을 발급하기 전에 Anthropic의 공개 키가 필요합니다.

1. Claude용 AI Agent 항목을 생성합니다.
2. 에이전트에 소유자를 할당합니다. Okta를 활성화하기 전에 소유자가 필요합니다.
3. Okta가 생성한 AI Agent ID를 Anthropic에 전송합니다.
4. Anthropic이 반환한 공개 키를 AI Agent 항목의 {{< ui >}}Credentials{{< /ui >}} 탭에 추가합니다.

공개 키가 설정되기 전에는 다른 모든 값이 올바르더라도 토큰 교환에 실패합니다. 이 교환은 수동으로 진행되므로 일찍 시작하세요.

### Claude를 Datadog 애플리케이션에 연결 {#connect-claude-to-the-datadog-application}

Claude AI Agent에서 Claude SAML 애플리케이션을 위임된 호출자로 추가한 다음, 에이전트를 Datadog 애플리케이션에 연결합니다.

1. {{< ui >}}Delegations{{< /ui >}} 탭에서 Claude SAML 애플리케이션을 호출자로 추가합니다.
2. {{< ui >}}Resource connections{{< /ui >}} 탭에서 리소스 연결을 추가합니다. 리소스 유형으로 {{< ui >}}Application{{< /ui >}}을 선택한 다음, Datadog 애플리케이션을 선택합니다.
3. 다음 필드를 설정합니다.

   | Okta 필드                | 값                                                                                                |
   | ------------------------- | ---------------------------------------------------------------------------------------------------- |
   | {{< ui >}}Client ID at resource{{< /ui >}} | [{{< ui >}}Registered client IDs{{< /ui >}}](#copy-the-agent-client-id)          |에서 복사한 Claude 클라이언트 ID
   | {{< ui >}}Scope Condition{{< /ui >}}       | {{< ui >}}Allow all{{< /ui >}}, 유일하게 지원되는 값입니다. [Datadog의 범위 제어](#control-scopes-in-datadog) | 참조

4. {{< ui >}}Actions{{< /ui >}} 메뉴에서 에이전트를 활성화합니다.

## Datadog의 범위 제어 {#control-scopes-in-datadog}

{{< ui >}}Allow all{{< /ui >}}은 Cross-App Access에 대해 유일하게 지원되는 {{< ui >}}Scope Condition{{< /ui >}}입니다. Okta에서 이 값을 설정한 다음 Datadog에서 Claude가 액세스할 수 있는 범위를 제한하세요.

Okta는 범위를 필터링하지 않습니다. {{< ui >}}Allow all{{< /ui >}}을 사용하면 Okta는 Claude가 요청하는 모든 것을 토큰에 복사하므로 Datadog이 시행 지점이 됩니다.

<div class="alert alert-warning">Okta에 범위 목록을 입력하지 마세요. Okta는 목록에 없는 범위를 포함하는 모든 토큰 요청을 거부하므로, 더 좁은 액세스로 대체되는 대신 통합이 오류와 함께 실패합니다.</div>

Claude가 허용되는 범위를 설정하려면 다음 단계를 따르세요.

1. [{{< ui >}}Organization Settings > Mobile and Third-Party Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/mobile-third-party-access)로 이동하세요. Cross-App Access 페이지의 {{< ui >}}Registered client IDs{{< /ui >}} 표에서 Claude 옆에 있는 {{< ui >}}Manage app{{< /ui >}}을 클릭해도 됩니다.
2. Claude 애플리케이션을 선택한 다음 {{< ui >}}Scopes{{< /ui >}} 탭을 선택합니다.
3. 각 범위에 대한 {{< ui >}}Allowed{{< /ui >}} 확인란을 사용하여 Claude가 액세스하는 범위를 제어합니다.
4. {{< ui >}}Enable{{< /ui >}}을 클릭하여 저장합니다.

범위를 추가하거나 제거하면 조직의 모든 사용자에게 영향을 미치며, 범위를 제거하면 해당 범위에 의존하는 기존 승인이 취소됩니다. [애플리케이션 범위 관리](/account_management/org_settings/mobile_third_party_access/#application-scope-management)를 참조하세요.

Datadog에서 허용되지 않는 범위는 토큰이 무엇을 요청하든 절대 부여되지 않습니다.

## Claude에서 Datadog을 커넥터로 추가 {#add-datadog-as-a-connector-in-claude}

1. Claude에서 프롬프트 하단의 {{< ui >}}+{{< /ui >}} 아이콘을 클릭한 후 {{< ui >}}Add Connector{{< /ui >}}를 클릭합니다.
2. 디렉터리에서 **Datadog**을 찾아 커넥터를 활성화합니다.
3. 메시지가 표시되면 로그인 절차를 완료합니다.

사용자 지정 커넥터가 아닌 디렉터리의 Datadog 커넥터를 사용하세요.

## 구성 확인 {#verify-the-configuration}

두 Okta 애플리케이션에 모두 할당된 사용자로 Claude에 로그인한 다음, Datadog을 호출하는 요청을 실행하세요. 호출이 성공하면 전체 경로가 정상적으로 작동하는지 확인할 수 있습니다. 즉, Okta가 토큰을 발급하고, Datadog이 이를 수락하며 사용자를 식별합니다.

Cross-App Access를 활성화하기 전에 로그인한 사용자는 Claude에서 로그아웃한 후 Okta를 통해 다시 로그인해야 합니다. 이전에 생성된 세션에는 에이전트에 필요한 ID 토큰이 없습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}