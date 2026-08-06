---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
aliases:
- /ko/bits_ai/mcp_server/setup/
description: AI 에이전트를 Datadog MCP 서버에 연결하는 방법을 알아보세요.
further_reading:
- link: mcp_server
  tag: 설명서
  text: Datadog MCP 서버
- link: mcp_server/tools
  tag: 설명서
  text: Datadog MCP 서버 도구
- link: ide_plugins/vscode/?tab=cursor
  tag: 설명서
  text: Cursor용 Datadog 확장
title: Datadog MCP 서버 설정
---
Datadog MCP 서버를 설정하고 구성하는 방법을 알아보세요. 이 서버를 사용하면 텔레메트리 인사이트를 검색하고 AI 기반 클라이언트에서 직접 플랫폼 기능을 관리할 수 있습니다. 클라이언트 선택:

{{< tabs >}}
{{% tab "ChatGPT" %}}

ChatGPT 앱 디렉터리에서 [Datadog 앱][1]을 설치하여 Datadog을 ChatGPT와 연결합니다. 이 앱은 OAuth 흐름을 통해 Datadog 조직과 인증을 수행합니다.

{{< site-region region="us" >}}
<div class="alert alert-info">Datadog ChatGPT 앱은 미리 보기 상태입니다. 미리 보기 기간 동안에는 US1 고객만 사용할 수 있습니다.</div>

1. ChatGPT에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}}로 이동한 후 **Datadog**을 검색합니다. Datadog 앱이 표시되지 않으면 조직의 ChatGPT 관리자에게 승인 요청을 하세요.
1. 앱을 선택하고 {{< ui >}}Connect{{< /ui >}}을 클릭한 다음 안내에 따라 설정을 완료합니다.
1. 메시지가 표시되면 OAuth 로그인 흐름을 완료합니다.
1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,gov,gov2" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site/">Datadog 사이트</a>에서는 Datadog ChatGPT 앱이 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

Claude Connectors Directory에서 [Datadog Connector](https://claude.ai/directory/connectors/datadog)를 설치합니다. 공식 커넥터는 Datadog을 Claude(Claude Cowork 포함)와 연결하는 권장 방법이며, 제품 내 시각화를 위한 MCP Apps를 포함합니다. 이전에 Datadog을 사용자 지정 커넥터로 추가한 경우 충돌을 방지하기 위해 제거하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Claude에서 프롬프트 하단의 **+** 아이콘을 클릭한 후 {{< ui >}}Add Connector{{< /ui >}}를 클릭합니다.
1. 디렉터리에서 **Datadog**을 찾아 커넥터를 활성화합니다.
1. 메시지가 표시되면 OAuth 로그인 흐름을 완료합니다.
1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

{{% collapse-content title="사용자 지정 커넥터를 사용한 수동 설정" level="h4" expanded=false id="claude-custom-connector" %}}
디렉터리 커넥터를 사용할 수 없는 경우 [Datadog 사이트](/getting_started/site/)의 원격 MCP URL을 사용하여 Datadog을 [사용자 지정 커넥터](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)로 추가할 수 있습니다({{< region-param key="dd_site_name" >}}). 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

1. 새 사용자 지정 커넥터를 추가하려면 Claude 도움말 센터의 [사용자 지정 커넥터](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) 가이드를 따릅니다.

1. URL 입력을 요청받으면 다음을 입력합니다.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 메시지가 표시되면 OAuth 로그인 흐름을 완료합니다.
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site/">Datadog 사이트</a>에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

[공식 Anthropic Plugin Marketplace](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace)에서 Datadog 플러그인을 설치합니다. 이 플러그인은 Datadog MCP 서버와 번들 스킬을 포함하며, 새 플러그인 버전이 출시되면 자동 업데이트됩니다. 자세한 내용은 [플러그인 리포지토리](https://github.com/datadog-labs/claude-code-plugin)를 참조하세요. 이전에 Datadog MCP 서버를 수동 설치한 경우 충돌을 방지하기 위해 Claude Code 구성에서 제거하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Datadog 플러그인 설치:
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. 최초 설정 시 `/ddsetup`을 실행하거나 Datadog 관련 프롬프트를 입력합니다. 설정 과정에서 [Datadog 사이트](/getting_started/site/)를 선택하고 OAuth 로그인을 완료합니다. 또는 Claude Code를 시작하기 전에 MCP 서버 도메인(선택적으로 Datadog API 키 및 애플리케이션 키 포함)을 환경 변수로 설정할 수도 있습니다.

1. `/ddtoolsets`을 실행하여 [제품별 MCP 도구](#toolsets) 그룹을 활성화하거나 비활성화합니다.

1. 구성을 변경한 후에는 `/reload-plugins`을 실행하고 `/plugin`을 열어 Datadog 플러그인을 선택한 뒤 다시 인증합니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

<div class="alert alert-info">사용 가능한 모든 슬래시 명령과 구성 옵션은 <a href="https://github.com/datadog-labs/claude-code-plugin">플러그인 리포지토리</a>를 참조하세요.</div>

{{% collapse-content title="수동 MCP 서버 구성" level="h4" expanded=false id="claudecode-manual" %}}
플러그인을 사용할 수 없는 경우 Claude Code가 해당 지역 [Datadog 사이트](/getting_started/site/)에 대한 MCP 서버 엔드포인트를 직접 사용하도록 구성할 수 있습니다. 선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 터미널에서 실행:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   또는 `~/.claude.json`에 다음 추가:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">원격 인증을 사용할 수 없는 경우, 대신 <a href="#local-binary-authentication">로컬 바이너리 인증</a>을 사용하세요.</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

AI 에이전트가 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 사이트 HTTP 전송 및 엔드포인트 URL을 사용하여 Datadog MCP 서버를 추가하려면 `~/.codex/config.toml`(또는 Codex CLI 구성 파일)을 편집합니다. 예를 들면 다음과 같습니다.

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog MCP 서버에 로그인:

   ```shell
   codex mcp login datadog
   ```

   이렇게 하면 브라우저가 열려 OAuth 흐름을 완료할 수 있습니다. 그 결과로 얻게 되는 자격 증명을 Codex가 저장하기 때문에 토큰이 만료될 때까지 다시 로그인할 필요가 없습니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

<div class="alert alert-info"><a href="https://github.com/openai/plugins/tree/main/plugins/datadog">Codex Plugin(미리 보기)</a>은 US1 리전의 Codex Desktop 앱에서만 사용할 수 있습니다. 설치하려면 <a href="?tab=chatgpt">ChatGPT 앱 안내</a>를 따릅니다. ChatGPT 앱을 설치하면 Codex Plugin도 자동으로 함께 설치됩니다.
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "Cursor" %}}

Cursor Marketplace에서 [Datadog 플러그인][1]을 설치합니다. 해당 플러그인에 Datadog MCP 서버 및 기타 리소스가 포함되어 있습니다. 이전에 수동으로 Datadog MCP 서버를 설치한 경우, IDE의 구성에서 해당 서버를 제거해야 충돌을 피할 수 있습니다. 

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. 플러그인은 Cursor Marketplace에서나, Cursor 안에서 설치할 수 있습니다.
   - Cursor Marketplace에서 [Datadog 플러그인][1]을 열고 **Cursor에 추가**를 클릭합니다.
   - Cursor에서는 **Cursor 설정** > **플러그인**으로 이동한 다음 Datadog 플러그인을 검색하고 **Cursor에 추가**를 클릭합니다.

1. 플러그인을 설치한 다음, 에이전트 채팅에 `/ddsetup`을 입력하여 첫 설정을 수행합니다.
1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

[1]: https://cursor.com/marketplace/datadog
[2]: /ko/ide_plugins/vscode/?tab=cursor#installation
[3]: /ko/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Devin을 Datadog MCP 서버에 연결하려면 Devin의 MCP Marketplace에서 해당 서버를 활성화합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Devin에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}}로 이동하여 `Datadog`을 검색합니다.
1. {{< ui >}}Server URL{{< /ui >}}에 사용할 Datadog 사이트를 선택합니다. 예를 들어, 선택한 사이트가 다음과 같습니다. {{< region-param key="dd_site_name" code="true" >}}.
1. Datadog API 및 애플리케이션 키를 입력합니다.
1. 서버를 설치하고 활성화한 다음, 메시지가 표시되면 OAuth 로그인 흐름을 완료합니다.
1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

<div class="alert alert-info">제품별 도구 세트를 사용하려면 Devin에서 <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">사용자 지정 MCP 서버</a>를 설정한 다음 엔드포인트 URL 끝에 <code>toolsets</code> 쿼리를 포함합니다. 자세한 정보는 <a href="#toolsets">도구 세트</a>를 참조하세요.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

AI 에이전트가 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 **Datadog 사이트** 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 터미널에서 실행:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   또는 `~/.gemini/settings.json`에 다음 추가:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

<div class="alert alert-info">원격 인증을 사용할 수 없는 경우, 대신 <a href="#local-binary-authentication">로컬 바이너리 인증</a>을 사용하세요.</div>

[1]: /ko/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

AI 에이전트가 지역 [Datadog 사이트][3]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 다음 중 한 가지 방법을 사용하여 Datadog MCP 서버를 Goose에 추가합니다.
   - **원클릭 설치(권장):** Datadog MCP 서버를 사용합니다 {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **수동 구성:** Goose의 [MCP 서버 추가][2] 지침을 따르되, 이 섹션에 나열된 엔드포인트를 스트림 가능한 HTTP 서버 URL로 사용합니다. 구성을 직접 편집하려면 `~/.config/goose/config.yaml`을 수정하세요.

1. [제품별 도구][1]를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다.

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. 첫 번째 세션 시작 시, 인증하라는 메시지가 표시되면 Datadog 계정을 선택합니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "JetBrains IDE" %}}

JetBrains는 다양한 자사 IDE에서 사용할 수 있는 [Junie][1] 및 [AI Assistant][2] 플러그인을 제공합니다. GitHub는 [Copilot][4] 플러그인을 제공합니다. 한편, 많은 개발자가 IDE와 함께 Claude Code, Codex 또는 Gemini CLI와 같은 에이전트 CLI를 사용합니다.

플러그인이 지역 [Datadog 사이트][3]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}}로 이동하여 다음 블록 추가:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. OAuth를 통해 로그인하라는 메시지가 표시됩니다. 연결에 성공하면 설정의 상태 표시기에 녹색 체크 표시가 표시됩니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}}로 이동하여 다음 블록 추가:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
          "headers": {
            "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
            "DD_APPLICATION_KEY": "&lt;YOUR_APP_KEY&gt;"
          }
        }
      }
    }
    </code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 연결에 성공하면 설정의 상태 표시기에 녹색 체크 표시가 표시됩니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}}로 이동하여 다음 블록 추가:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 편집기에 표시되는 `Start` 요소를 클릭하여 서버를 시작합니다. OAuth를 통해 로그인하라는 메시지가 표시됩니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

{{% /collapse-content %}}

{{% collapse-content title="에이전트 CLI" level="h4" expanded=false id="jetbrains-agent-clis" %}}
많은 개발자가 JetBrains IDE와 함께 Claude Code, Codex 또는 Gemini CLI와 같은 에이전트 CLI를 사용합니다. 해당 CLI 도구의 구성을 참조하세요.
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

[JetBrains IDE용 Datadog 플러그인][3]은 이러한 에이전트 CLI와 통합됩니다. 원활한 사용을 위해 Datadog MCP 서버를 구성할 때 플러그인을 동시에 설치하세요.

[3]: /ko/ide_plugins/idea/
[4]: /ko/mcp_server/setup/?tab=claudecode
[5]: /ko/mcp_server/setup/?tab=codex
[6]: /ko/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /ko/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

AI 에이전트가 지역 [Datadog 사이트][3]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. [Kiro MCP 구성 파일][2]에 다음 추가(사용자 범위 구성용 `~/.kiro/settings/mcp.json`):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

공식 [Datadog OpenCode 플러그인][2](미리 보기)을 사용하여 [OpenCode][3]를 Datadog MCP 서버에 연결하세요. 이 플러그인이 MCP 서버 항목을 `opencode.json`에 쓰고 유지 관리하며 에이전트가 설정, 사이트 변경 사항 및 [도구 세트](#toolsets) 선택을 처리하는 데 사용하는 `ddsetup`, `ddconfig`, `ddtoolsets` 도구를 노출합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. 플러그인을 `opencode.json` 구성 파일에 추가합니다. 파일 생성(파일이 없는 경우):

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. OpenCode를 재시작합니다. 시작 시 npm에서 패키지를 가져옵니다.

1. 에이전트에게 `ddsetup`을 실행하도록 요청합니다. 플러그인이 사이트 선택을 안내해 줍니다.

1. OpenCode를 한 번 더 재시작하여 MCP 서버를 활성화하고, 메시지가 표시되면 OAuth 로그인 흐름을 완료합니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

1. [제품별 도구](#toolsets)를 활성화하려면 에이전트에게 `ddtoolsets` 실행을 요청하세요.

설정한 이후, 에이전트에게 `ddconfig`를 실행하도록 요청하여 Datadog 사이트를 변경하거나 연결 문제를 해결합니다.

{{% collapse-content title="수동 구성" level="h4" expanded=false id="opencode-manual" %}}
플러그인 없이 MCP 서버를 구성하려면 `opencode.json` 구성 파일에 다음을 추가합니다.

선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

[제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다.

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

정식 출시된 도구 세트를 모두 활성화하려면 `toolsets=all`을 사용하세요. 이것은 도구 필터링을 지원하는 클라이언트에서 가장 효과적입니다.
{{% /collapse-content %}}

[1]: /ko/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

Datadog의 [Cursor 및 VS Code 확장][1]에 관리형 Datadog MCP 서버에 대한 기본 제공 액세스가 포함되어 있습니다. GitHub Copilot은 VS Code의 Datadog MCP 서버에도 액세스할 수 있습니다(활성 GitHub Copilot 구독 필요).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. 확장 설치(`--profile` 및 프로필 이름을 생략하면 기본 VS Code 프로필에 설치됨):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   또는 [Datadog 확장][2]을 설치합니다. 이미 확장이 설치된 경우, 최신 버전인지 확인하세요.
1. Datadog 계정에 로그인합니다.
1. **IDE를 재시작합니다.**
1. Datadog MCP 서버를 사용할 수 있고 [도구][3]가 목록으로 나열되는지 확인합니다. 채팅 패널을 열고 에이전트 모드를 선택한 다음 {{< ui >}}Configure Tools{{< /ui >}} 버튼을 클릭합니다.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="VS Code의 도구 구성 버튼" style="width:70%;" >}}
1. 이전에 수동으로 Datadog MCP 서버를 설치한 경우, IDE의 구성에서 해당 서버를 제거해야 충돌을 피할 수 있습니다. 명령 팔레트를 열고(`Shift` + `Cmd/Ctrl` + `P`) `MCP: Open User Configuration`을 실행합니다.
1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

[2]: /ko/ide_plugins/vscode/?tab=vscode#installation
[3]: /ko/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1]는 기본 제공 MCP 지원이 포함된 에이전틱 터미널입니다. Warp 에이전트가 지역 [Datadog 사이트][2]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Warp 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}}로 이동하고 {{< ui >}}+ Add{{< /ui >}}를 클릭합니다.

1. 다음 구성 붙여 넣기:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog 서버에서 {{< ui >}}Start{{< /ui >}}를 클릭합니다. Warp가 브라우저를 열어 OAuth 로그인 흐름을 완료하게 합니다. 자격 증명은 사용자의 장치에 안전하게 저장되며 향후 세션에서 다시 사용됩니다.

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "기타" %}}

대부분의 다른 [지원되는 클라이언트](#supported-clients)의 경우, 이러한 지침을 사용해 원격 인증합니다. Cline을 사용하는 경우 또는 원격 인증을 신뢰할 수 없거나 사용할 수 없는 경우, [로컬 바이너리 인증](#local-binary-authentication)을 사용하세요.

AI 에이전트가 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트를 가리키게 합니다. 올바른 지침을 사용하려면 이 설명서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 사이트를 선택하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. HTTP 전송 및 사이트의 엔드포인트 URL을 사용하여 클라이언트의 구성 파일에 Datadog MCP 서버를 추가합니다. 예를 들면 다음과 같습니다.

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 파라미터를 포함합니다. 예를 들어 다음 URL은 APM 및 Agent Observability 도구_만_ 활성화합니다(`toolsets=all`은 모든 일반 제공 도구 세트를 활성화하며, 도구 필터링을 지원하는 클라이언트에 가장 적합합니다).

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 액세스하고자 하는 Datadog 리소스에 대한 필수 [권한](#required-permissions)이 있는지 확인합니다.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">선택한 사이트에서 Datadog MCP 서버가 지원되지 않습니다({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## 도구 세트 {#toolsets}

Datadog MCP 서버는 _도구 세트_를 지원하므로, 필요한 [MCP 도구][49]만 사용할 수 있어 귀중한 컨텍스트 윈도 공간이 절약됩니다. 도구 세트를 사용하려면 MCP 서버에 연결할 때 엔드포인트 URL에 `toolsets` 쿼리 파라미터를 포함합니다([원격 인증](#authentication)만 해당). 정식 출시된 도구 세트를 한꺼번에 활성화하려면 `toolsets=all`을 사용하세요.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
예를 들어 선택한 [Datadog 사이트][17] 기준({{< region-param key="dd_site_name" >}}):

- 코어 도구만 검색(`toolsets`를 지정하지 않은 경우 이것이 기본값):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Synthetic 테스트 관련 도구만 검색:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- 코어, Synthetic 테스트 및 소프트웨어 배포 도구 검색:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- 정식 출시된 모든 도구를 검색:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">모든 도구 세트를 활성화하면 AI 클라이언트로 전송되는 도구 정의의 수가 늘어나고, 이로 인해 컨텍스트 윈도 공간이 사용됩니다. <code>toolsets=all</code> Claude Code와 같이 도구 필터링을 지원하는 클라이언트에서 가장 효과적입니다.</div>

[17]: /ko/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### 특정 도구 제외 {#omit-specific-tools}

최종 도구 목록에서 특정 도구를 제거하려면 `omit_tools` 쿼리 파라미터를 사용합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 사이트에 대한 예시({{< region-param key="dd_site_name" >}}):

- 기본 세트에서 특정 도구 제외:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- 도구 세트를 선택한 후 특정 도구 하나 제외:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- 모든 일반 제공 도구 세트에서 시작한 후 쓰기 도구 제외:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

도구 이름은 쉼표로 구분하여 입력합니다. 두 파라미터가 모두 존재하는 경우 서버는 먼저 `toolsets`을 처리한 후 `omit_tools`에서 일치하는 도구를 제거합니다. `omit_tools`에 알 수 없는 도구 이름이 포함된 경우 서버는 경고를 표시하고 계속 진행합니다.

### 사용 가능한 도구 세트 {#available-toolsets}

이러한 도구 세트는 정식 출시되었습니다. 사용 가능한 도구 전체 목록(도구 세트별로 정리, 예시 프롬프트 포함)은 [Datadog MCP 서버 도구][49]에서 확인할 수 있습니다.

- `core`: 로그, 메트릭, 트레이스, 대시보드, 모니터, 인시던트, 호스트, 서비스, 이벤트 및 노트북의 기본 도구 세트
- `alerting`: 모니터 검증 및 생성, 모니터 그룹 검색, 모니터 템플릿 검색, 모니터 커버리지 분석 및 SLO 검색용 도구
- `cases`: [Case Management][42] 도구(케이스 생성, 검색 및 업데이트, 프로젝트 관리, Jira 문제 연결 포함)
- `dashboards`: [대시보드][46]를 검색, 생성, 업데이트 및 삭제하기 위한 도구(위젯 스키마 참조 및 검증 포함)
- `dbm`: [Database Monitoring][33]과의 상호작용을 위한 도구
- `ddsql`: [DDSQL][44]을 사용하여 Datadog 데이터를 쿼리하기 위한 도구 - DDSQL은 인프라 리소스, 로그, 메트릭, RUM, 스팬 및 기타 Datadog 데이터 소스를 지원하는 SQL 방언
- `error-tracking`: Datadog [Error Tracking][32]과의 상호작용을 위한 도구
- `feature-flags`: 플래그 및 플래그 환경 생성, 나열, 업데이트 등 [기능 플래그][35] 관리 도구
- `kubernetes`: 모든 클러스터에서 [Kubernetes][51] 리소스를 검색 및 설명하고 매니페스트를 검색하는 도구
- `llmobs`: [Agent Observability][36] 스팬 및 실험을 검색하고 분석하는 도구
- `networks`: [Cloud Network Monitoring][37] 분석 및 [Network Device Monitoring][38]을 위한 도구
- `onboarding`: 가이드가 있는 Datadog 설정 및 구성을 위한 에이전틱 온보딩 도구
- `product-analytics`: [Product Analytics][41] 쿼리와의 상호작용을 위한 도구
- `profiling`: [Continuous Profiler][58] 데이터를 발견, 탐색 및 분석하는 도구
- `reference-tables`: 표 나열, 행 읽기, 행 추가, 클라우드 스토리지에서 표 생성을 포함한 [참조표][48] 관리 도구
- `security`: 코드 보안을 스캔하고 [보안 신호][39] 및 [보안 발견 사항][40]을 검색하기 위한 도구
- `software-delivery`: 소프트웨어 배포([CI Visibility][30] 및 [Test Optimization][31])과의 상호작용을 위한 도구
- `synthetics`: Datadog [Synthetic 테스트][29]와의 상호작용을 위한 도구
- `widgets`: [대시보드][46] 및 [노트북][54] 위젯 시각화, 검증 및 유형 변환을 위한 도구
- `workflows`: 에이전트 사용을 위한 워크플로 나열, 조사, 실행 및 구성을 포함한 [Workflow Automation][43] 도구

### 미리 보기 도구 세트 {#preview-toolsets}

이러한 도구 세트는 미리 보기 상태입니다. 제품 미리 보기 양식을 작성하여 도구 세트에 가입하거나 [Datadog 지원팀][47]에 문의해 액세스를 요청하세요.
- `apm`: ([가입][45]) 심층 [APM][34] 트레이스 분석, 스팬 검색, Watchdog 인사이트, 성능 조사를 위한 도구
- `code-exec`: ([가입][60]) Datadog이 관리하는 샌드박스에서 에이전트가 작성한 TypeScript를 실행하며 Datadog API에 직접 액세스하여 여러 신호에 대한 조사 및 임시 데이터 탐색을 한 번에 수행하는 단일 도구
- `remote-actions`: ([가입][62]) Agent를 통해 계측된 호스트에서 파일 읽기, 디렉터리 나열 및 안전한 읽기 전용 셸 명령 실행을 포함한 호스트 진단 도구
- `rum`: [Real User Monitoring][57]용 도구로, 애플리케이션 성능 요약, 애플리케이션 구성 검사 및 성능 조사 기능 포함

## 지원되는 클라이언트 {#supported-clients}

| 클라이언트 | 개발자 | 참고 사항 |
|--------|------|------|
| [ChatGPT][59] | OpenAI | 미리 보기 상태이며 US1 고객만 사용 가능. |
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code 확장][15] 권장. |
| [Claude Code][4] | Anthropic | Datadog [Claude Code 플러그인][55] 권장. |
| [Claude][19] | Anthropic | Datadog [Claude Connector][56] 권장. Claude Cowork를 포함합니다. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code 확장][16] 권장. |
| [JetBrains IDEs][18] | JetBrains | [Datadog 플러그인][18] 권장. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode 플러그인][53] 권장. |
| [Cline][11] | 다양 | 위의 {{< ui >}}Other{{< /ui >}} 탭 참조. 원격 인증을 신뢰할 수 없는 경우 Cline에 로컬 바이너리 인증을 사용하세요. |

<div class="alert alert-info">Datadog MCP 서버는 중요한 개발 과정을 진행 중이며, 추가적으로 지원되는 클라이언트가 제공될 수 있습니다.</div>

## 필수 권한 {#required-permissions}

MCP 서버 도구에는 다음과 같은 [Datadog 사용자 역할 권한][22]이 필요합니다.

| 권한 | 다음에 필요 |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Datadog에서 데이터를 읽는 도구(예: 모니터 쿼리, 로그 검색, 대시보드 검색) |
| <code style="white-space:nowrap">mcp_write</code> | Datadog에서 리소스를 생성 또는 수정하는 도구(예: 모니터 생성, 호스트 음소거) |

`mcp_read` 또는 `mcp_write` 외에, 사용자에게 기본 리소스에 대한 표준 Datadog 권한도 필요합니다. 예를 들어 모니터를 읽는 MCP 도구를 사용하려면 `mcp_read` 및 [모니터 읽기][24] 권한이 모두 필요합니다. 리소스 수준 권한의 전체 목록은 [Datadog 역할 권한][25]을 참조하세요.

**Datadog 표준 역할**이 있는 사용자는 기본적으로 두 MCP 서버 권한을 모두 보유합니다. 조직에서 [사용자 지정 역할][23]을 사용하는 경우, 권한을 수동으로 추가하세요.
1. 관리자 자격으로 [**조직 설정 > 역할**][26]로 이동하여 업데이트하고자 하는 역할을 클릭합니다.
1. {{< ui >}}Edit Role{{< /ui >}}(연필 아이콘)을 클릭합니다.
1. 권한 목록 아래에서 {{< ui >}}MCP Read{{< /ui >}} 및 {{< ui >}}MCP Write{{< /ui >}} 체크박스를 선택합니다.
1. 역할에 필요한 기타 모든 리소스 수준 권한을 선택합니다.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

조직 관리자는 [조직 설정][27]에서 전역 MCP 액세스 및 쓰기 기능을 관리할 수 있습니다.

## 인증 {#authentication}

MCP 서버는 [인증][14]에 OAuth 2.0을 사용합니다. OAuth 흐름을 진행할 수 없는 경우(예를 들어 서버에서) Datadog [API 키 및 애플리케이션 키][1]를 `DD_API_KEY` 및 `DD_APPLICATION_KEY` HTTP 헤더로 제공할 수 있습니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
예를 들어 선택한 [Datadog 사이트][17] 기준({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>

[17]: /ko/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

보안을 위해 필수 권한만 있는 [서비스 계정][13]의 범위가 지정된 API 키 및 애플리케이션 키를 사용하세요.

### OAuth 클라이언트 추가 {#adding-oauth-clients}

[조직 기본 설정][27]의 `MCP OAuth Redirect URLs`에서 리디렉션 URL을 허용 목록에 추가할 수 있습니다. 

AI 에이전트 플랫폼용 MCP 디렉터리에 Datadog을 추가하려는 파트너 또는 공급업체인 경우 Datadog의 [기술 파트너 가입][61]을 통해 관심을 등록하세요.

### 로컬 바이너리 인증 {#local-binary-authentication}

Cline을 사용하는 경우 및 원격 인증을 신뢰할 수 없거나 사용할 수 없는 경우에는 로컬 인증을 권장합니다. 설치한 이후에는, 도구가 원격이기 때문에 MCP 서버 업데이트의 이점을 누리기 위해 일반적으로 로컬 바이너리를 업데이트할 필요가 없습니다.

{{% collapse-content title="Datadog MCP 서버 로컬 바이너리 설정" level="h5" expanded=false id="mcp-local-binary" %}}

1. Datadog MCP 서버 바이너리 설치(macOS 및 Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   이렇게 하면 바이너리가 `~/.local/bin/datadog_mcp_cli`에 설치됩니다.

   Windows의 경우, [Windows 버전][20]을 다운로드하세요.

2. 수동으로 `datadog_mcp_cli login`을 실행하여 OAuth 로그인 흐름을 진행하고 [Datadog 사이트][21]를 선택합니다.

3. AI 클라이언트가 `datadog_mcp_cli`를 명령어로 사용하여 stdio 전송을 사용하도록 구성합니다. 예를 들어 macOS의 경우(`<USERNAME>`를 사용자의 OS 사용자 이름으로 바꾸기):
   ```json
   {
     "mcpServers": {
       "datadog": {
         "type": "stdio",
         "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
         "args": [],
         "env": {}
       }
     }
   }
   ```

   다른 운영 체제의 경우 `command` 경로를 다운로드된 바이너리의 위치로 대체:
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">Claude Code의 경우, 다음을 대신 실행할 수 있습니다. 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. AI 클라이언트를 완전히 재시작해야 구성이 적용되고 MCP 서버가 로드됩니다.
{{% /collapse-content %}}

## MCP 서버에 대한 액세스 테스트 {#test-access-to-the-mcp-server}

1. MCP 서버 테스트 및 디버깅용 개발자 도구인 [MCP 검사기][2]를 설치합니다.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. 검사기의 웹 UI에서 {{< ui >}}Transport Type{{< /ui >}}에 {{< ui >}}Streamable HTTP{{< /ui >}}를 선택합니다.
3. {{< ui >}}URL{{< /ui >}}에는 지역 Datadog 사이트의 MCP 서버 엔드포인트를 입력합니다. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   예를 들어 다음의 경우 {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. {{< ui >}}Connect{{< /ui >}}를 클릭한 다음 {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}로 이동합니다.
5. [사용 가능한 도구][12]가 표시되는지 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/account_management/api-app-keys/
[2]: https://github.com/modelcontextprotocol/inspector
[3]: https://cursor.com
[4]: https://claude.com/product/claude-code
[5]: https://claude.com/download
[6]: https://chatgpt.com/codex
[7]: https://code.visualstudio.com/
[8]: https://github.com/block/goose
[9]: https://kiro.dev/
[10]: https://kiro.dev/cli/
[11]: https://cline.bot/
[12]: /ko/mcp_server/tools
[13]: /ko/account_management/org_settings/service_accounts/
[14]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[15]: /ko/ide_plugins/vscode/?tab=cursor
[16]: /ko/ide_plugins/vscode/
[17]: /ko/getting_started/site/#navigate-the-datadog-documentation-by-site
[18]: /ko/ide_plugins/idea/
[19]: https://claude.ai
[20]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[21]: /ko/getting_started/site/
[22]: /ko/account_management/rbac/permissions/#mcp
[23]: /ko/account_management/rbac/?tab=datadogapplication#custom-roles
[24]: /ko/account_management/rbac/permissions/#monitors
[25]: /ko/account_management/rbac/permissions/
[26]: https://app.datadoghq.com/organization-settings/roles
[27]: https://app.datadoghq.com/organization-settings/preferences
[28]: https://www.warp.dev/
[29]: /ko/synthetics/
[30]: /ko/continuous_integration/
[31]: /ko/tests/
[32]: /ko/error_tracking/
[33]: /ko/database_monitoring/
[34]: /ko/tracing/
[35]: /ko/feature_flags/
[36]: /ko/llm_observability/mcp_server/
[37]: /ko/network_monitoring/cloud_network_monitoring/
[38]: /ko/network_monitoring/devices/
[39]: /ko/security/threats/security_signals/
[40]: /ko/security/misconfigurations/findings/
[41]: /ko/product_analytics
[42]: /ko/service_management/case_management/
[43]: /ko/actions/workflows/
[44]: /ko/ddsql_editor/
[45]: https://www.datadoghq.com/product-preview/apm-mcp-toolset/
[46]: /ko/dashboards/
[47]: /ko/help/
[48]: /ko/reference_tables/
[49]: /ko/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /ko/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin
[54]: /ko/notebooks/
[55]: https://claude.com/plugins/datadog
[56]: https://claude.ai/directory/connectors/datadog
[57]: /ko/real_user_monitoring/
[58]: https://partners.datadoghq.com/s/login/SelfRegister
[59]: https://chatgpt.com/
[60]: https://www.datadoghq.com/product-preview/mcp-codexec/
[61]: /ko/getting_started/profiler/
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/