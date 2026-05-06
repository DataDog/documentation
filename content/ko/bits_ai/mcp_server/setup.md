---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
description: AI 에이전트를 Datadog MCP 서버에 연결하는 방법을 배우십시오.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentation
  text: Datadog MCP 서버
- link: bits_ai/mcp_server/tools
  tag: Documentation
  text: Datadog MCP 서버 도구
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Cursor용 Datadog 확장
title: Datadog MCP 서버 설정
---
AI 기반 클라이언트에서 직접 텔레메트리 통찰력을 검색하고 플랫폼 기능을 관리할 수 있도록 해주는 Datadog MCP 서버를 설정하고 구성하는 방법을 배우십시오. 클라이언트를 선택하십시오:

{{< tabs >}}
{{% tab "커서" %}}

Datadog의 [커서 및 VS 코드 확장][1]은 관리되는 Datadog MCP 서버에 대한 내장 액세스를 포함합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. 확장을 설치합니다(기본 Cursor 프로필에 설치하려면 `--profile` 및 프로필 이름을 생략).
    ```shell
    cursor --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   또는 [Datadog 확장][2]을 설치하십시오. 이미 확장을 설치한 경우 최신 버전인지 확인하십시오.
1. Datadog 계정에 로그인하십시오.
   {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="IDE 확장에서 Datadog에 로그인하십시오." style="width:70%;" >}}
1. **IDE를 재시작합니다.**
1. Datadog MCP 서버가 사용 가능하고 [도구][3]가 나열되어 있는지 확인하십시오: {{< ui >}}Cursor Settings{{< /ui >}} (`Shift` + `Cmd/Ctrl` + `J`)로 이동하여 {{< ui >}}Tools & MCP{{< /ui >}} 탭을 선택하고 확장의 도구 목록을 확장하십시오.
1. 이전에 Datadog MCP 서버를 수동으로 설치한 경우 충돌을 피하기 위해 IDE의 구성에서 제거하십시오.
1. 접근하려는 Datadog 리소스에 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

[2]: /ko/ide_plugins/vscode/?tab=cursor#installation
[3]: /ko/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Claude Code" %}}

AI 에이전트를 귀하의 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 위해 이 문서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 터미널에서 실행:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   또는 `~/.claude.json`에 추가하십시오:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다 (모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

<div class="alert alert-info">원격 인증이 사용 불가능한 경우, 대신 <a href="#local-binary-authentication">로컬 바이너리 인증</a>을 사용하십시오.</div>

[1]: /ko/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}

<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "Claude" %}}

Claude(Claude Cowork 포함)를 Datadog MCP 서버에 연결하려면, 원격 MCP URL을 사용하여 {{< ui >}}custom connector{{< /ui >}}로 추가합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. 새로운 사용자 정의 커넥터를 추가하려면 [사용자 정의 커넥터][1]에 대한 클로드 도움말 센터 가이드를 따르십시오.

1. URL을 입력하라는 메시지가 표시되면 귀하의 [Datadog 사이트][2]에 대한 Datadog MCP 서버 엔드포인트를 입력하십시오. ({{< region-param key="dd_site_name" >}}). 올바른 지침을 위해 이 문서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다 (모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 프롬프트가 표시되면 OAuth 로그인 흐름을 완료하십시오.

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /ko/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 <a href="/getting_started/site/">Datadog 사이트</a>에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

AI 에이전트를 귀하의 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 위해 이 문서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Datadog MCP 서버를 HTTP 전송 및 사이트의 엔드포인트 URL과 함께 추가하려면 `~/.codex/config.toml`를 편집하십시오(또는 Codex CLI 구성 파일). 예:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다 (모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog MCP 서버에 로그인하십시오:

   ```shell
   codex mcp login datadog
   ```

   이것은 OAuth 흐름을 완료하기 위해 브라우저를 엽니다. Codex는 결과 자격 증명을 저장하므로 토큰이 만료될 때까지 다시 로그인할 필요가 없습니다.

1. 접근하려는 Datadog 리소스에 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "Gemini CLI" %}}

AI 에이전트를 귀하의 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 위해 이 문서 페이지 오른쪽에 있는 **Datadog 사이트** 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 터미널에서 실행:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   또는 `~/.gemini/settings.json`에 추가하십시오:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다(모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

<div class="alert alert-info">원격 인증이 사용 불가능한 경우, 대신 <a href="#local-binary-authentication">로컬 바이너리 인증</a>을 사용하십시오.</div>

[1]: /ko/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1]는 내장된 MCP 지원이 있는 에이전트 터미널입니다. Warp 에이전트를 귀하의 지역 [Datadog 사이트][2]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 위해 이 문서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Warp 앱에서 {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}}로 이동하여 {{< ui >}}+ Add{{< /ui >}}를 클릭하십시오.

1. 다음 구성을 붙여넣으십시오:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog 서버에서 {{< ui >}}Start{{< /ui >}}을 클릭하십시오. Warp는 OAuth 로그인 흐름을 완료하기 위해 브라우저를 엽니다. 자격 증명은 귀하의 장치에 안전하게 저장되며 향후 세션에 재사용됩니다.

1. 접근하려는 Datadog 리소스에 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "VS Code" %}}

Datadog의 [커서 및 VS 코드 확장][1]은 관리되는 Datadog MCP 서버에 대한 내장 액세스를 포함합니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. 확장 프로그램을 설치하십시오(기본 VS Code 프로필에 설치하려면 `--profile` 및 프로필 이름을 생략하십시오):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   또는 [Datadog 확장][2]을 설치하십시오. 이미 확장을 설치한 경우 최신 버전인지 확인하십시오.
1. Datadog 계정에 로그인하십시오.
1. **IDE를 재시작합니다.**
1. Datadog MCP 서버가 사용 가능한지 확인하고 [도구][3]가 나열되어 있는지 확인하십시오: 채팅 패널을 열고, 에이전트 모드를 선택한 후 {{< ui >}}Configure Tools{{< /ui >}} 버튼을 클릭하십시오.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="VS Code의 도구 구성 버튼" style="width:70%;" >}}
1. 이전에 Datadog MCP 서버를 수동으로 설치한 경우, 충돌을 피하기 위해 IDE의 구성에서 제거하십시오. 명령 팔레트 (`Shift` + `Cmd/Ctrl` + `P`)를 열고 `MCP: Open User Configuration`를 실행하십시오.
1. 접근하려는 Datadog 리소스에 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

[2]: /ko/ide_plugins/vscode/?tab=vscode#installation
[3]: /ko/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /ko/ide_plugins/vscode/
{{% /tab %}}

{{% tab "JetBrains IDE" %}}

JetBrains는 다양한 IDE를 위한 [Junie][1] 및 [AI Assistant][2] 플러그인을 제공합니다. GitHub는 [Copilot][4] 플러그인을 제공합니다. 대안으로, 많은 개발자들이 IDE와 함께 Claude Code, Codex 또는 Gemini CLI와 같은 에이전트 CLI를 사용합니다.

플러그인을 귀하의 지역 [Datadog 사이트][3]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 위해 이 문서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}}로 이동하여 다음 블록을 추가하십시오:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다 (모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. OAuth를 통해 로그인하라는 메시지가 표시됩니다. 설정의 상태 표시기는 연결이 성공하면 녹색 체크 표시를 표시합니다.

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}}로 이동하여 다음 블록을 추가하십시오:

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

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다 (모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 설정의 상태 표시기는 연결이 성공하면 녹색 체크 표시를 표시합니다.

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}}로 이동하여 다음 블록을 추가하십시오:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다(모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. 편집기에 나타나는 `Start` 요소를 클릭하여 서버를 시작하십시오. OAuth를 통해 로그인하라는 메시지가 표시됩니다.

1. 접근하려는 Datadog 리소스에 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

{{% /collapse-content %}}

{{% collapse-content title="에이전트 CLI" level="h4" expanded=false id="jetbrains-agent-clis" %}}
많은 개발자들이 JetBrains IDE와 함께 Claude Code, Codex 또는 Gemini CLI와 같은 에이전트 CLI를 사용합니다. 해당 CLI 도구의 구성을 참조하십시오:
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

[Datadog plugin for JetBrains IDEs][3]은 이러한 에이전트 CLI와 통합됩니다. 중단 없는 경험을 위해 Datadog MCP 서버를 구성할 때 플러그인을 동시에 설치하십시오.

[3]: /ko/ide_plugins/idea/
[4]: /ko/bits_ai/mcp_server/setup/?tab=claudecode
[5]: /ko/bits_ai/mcp_server/setup/?tab=codex
[6]: /ko/bits_ai/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /ko/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

AI 에이전트를 귀하의 지역 [Datadog 사이트][3]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 위해 이 문서 페이지 오른쪽의 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. 다음 내용을 [Kiro MCP configuration file][2]에 추가하십시오 (`~/.kiro/settings/mcp.json` 사용자 범위 구성용):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다(모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /ko/getting_started/site/
{{% /tab %}}

{{% tab "기타" %}}

대부분의 다른 [지원되는 클라이언트](#supported-clients)의 경우 원격 인증을 위한 지침을 사용하십시오. Cline 또는 원격 인증이 신뢰할 수 없거나 사용할 수 없는 경우 [로컬 바이너리 인증](#local-binary-authentication)을 사용하십시오.

AI 에이전트를 귀하의 지역 [Datadog 사이트][1]의 MCP 서버 엔드포인트로 지정하십시오. 올바른 지침을 보려면 이 문서 페이지 오른쪽에 있는 {{< ui >}}Datadog Site{{< /ui >}} 선택기를 사용하여 귀하의 사이트를 선택하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
선택한 엔드포인트 ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. HTTP 전송과 사이트의 엔드포인트 URL을 사용하여 클라이언트의 구성 파일에 Datadog MCP 서버를 추가하십시오. 예:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. [제품별 도구](#toolsets)를 활성화하려면 엔드포인트 URL 끝에 `toolsets` 쿼리 매개변수를 포함하십시오. 예를 들어, 이 URL은 _오직_ APM 및 LLM Observability 도구를 활성화합니다(모든 일반적으로 사용 가능한 도구 세트를 활성화하려면 `toolsets=all`을 사용하십시오. 이는 도구 필터링을 지원하는 클라이언트에 가장 적합합니다):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Datadog 리소스에 접근하기 위해 필요한 [권한](#required-permissions)이 있는지 확인하십시오.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">선택한 사이트에 대해 Datadog MCP 서버가 지원되지 않습니다 ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /ko/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## 도구 세트 {#toolsets}

Datadog MCP 서버는 _도구 세트_를 지원하며, 이를 통해 오직 필요한 [MCP tools][49]를 사용할 수 있어 귀중한 컨텍스트 창 공간을 절약할 수 있습니다. 도구 세트를 사용하려면 MCP 서버에 연결할 때 엔드포인트 URL에 `toolsets` 쿼리 매개변수를 포함하십시오 ([원격 인증](#authentication)만). 모든 일반적으로 사용 가능한 도구 세트를 한 번에 활성화하려면 `toolsets=all`을 사용하십시오.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
예를 들어, 선택한 [Datadog 사이트][17]에 따라 ({{< region-param key="dd_site_name" >}}):

- 코어 도구만 검색(`toolsets`를 지정하지 않은 경우 기본값):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Synthetic Testing 관련 도구만 검색:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- 코어, Synthetic Testing 및 소프트웨어 배포 도구를 검색:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- 일반적으로 사용 가능한 모든 도구를 검색합니다:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info"> 모든 도구 세트를 활성화하면 AI 클라이언트에 전송되는 도구 정의의 수가 증가하여 컨텍스트 창 공간을 소모합니다. <code>toolsets=all</code>은 도구 필터링을 지원하는 클라이언트(예: Claude Code)에서 가장 잘 작동합니다.</div>

[17]: /ko/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### 사용 가능한 도구 세트 {#available-toolsets}

이 도구 세트는 일반적으로 사용 가능합니다. 사용 가능한 도구의 전체 참조는 [Datadog MCP Server Tools][49]를 참조하십시오. 도구 세트별로 정리되어 있으며, 예제 프롬프트가 포함되어 있습니다.

- `core`: 로그, 메트릭, 트레이스, 대시보드, 모니터링, 인시던트, 호스트, 서비스, 이벤트 및 노트북을 위한 기본 도구 세트
- `alerting`: 모니터를 검증하고 생성하며, 모니터 그룹을 검색하고, 모니터 템플릿을 검색하고, 모니터 범위를 분석하며, SLO를 검색하기 위한 도구
- `cases`: [Case Management][42]를 위한 도구로, 케이스 생성, 검색 및 업데이트; 프로젝트 관리; Jira 이슈 연결을 포함합니다.
- `dashboards`: [대시보드][46]를 검색, 생성, 업데이트 및 삭제하기 위한 도구로, 위젯 스키마 참조 및 검증도 포함됩니다.
- `dbm`: [Database Monitoring][33]과 상호작용하기 위한 도구
- `ddsql`: [DDSQL][44]이라는 SQL 방언을 사용하여 Datadog 데이터를 쿼리하기 위한 도구로, 인프라 리소스, 로그, 메트릭, RUM, 스팬 및 기타 Datadog 데이터 소스를 지원합니다.
- `error-tracking`: Datadog [Error Tracking][32]과 상호작용하기 위한 도구
- `feature-flags`: [기능 플래그][35]를 관리하기 위한 도구로, 플래그 및 해당 환경을 생성, 나열 및 업데이트하는 것을 포함합니다.
- `llmobs`: [LLM Observability][36] 스팬 및 실험을 검색하고 분석하기 위한 도구
- `networks`: [Cloud Network Monitoring][37] 분석 및 [Network Device Monitoring][38]을 위한 도구
- `onboarding`: Datadog 설정 및 구성을 안내하는 온보딩 도구
- `product-analytics`: [Product Analytics][41] 쿼리와 상호작용하기 위한 도구
- `reference-tables`: [Reference Tables][48]을 관리하기 위한 도구로, 표 나열, 행 읽기, 행 추가 및 클라우드 저장소에서 표 생성 기능을 포함합니다.
- `security`: 코드 보안 스캐닝 및 [security signals][39] 및 [security findings][40] 검색을 위한 도구
- `software-delivery`: 소프트웨어 배포와 상호작용하는 도구([CI Visibility][30] 및 [Test Optimization][31])
- `synthetics`: Datadog [Synthetic 테스트][29]와 상호작용하기 위한 도구
- `workflows`: 에이전트 사용을 위한 워크플로의 나열, 검사, 실행 및 구성을 포함하는 [Workflow Automation][43] 도구

### 미리보기 도구 세트 {#preview-toolsets}

이 도구 세트는 미리보기 상태입니다. 제품 미리보기 양식을 작성하거나 [Datadog 지원][47]에 연락하여 도구 세트에 가입하세요.
- `apm`: ([가입][45]) 심층 [APM][34] 추적 분석, 스팬 검색, Watchdog 통찰력 및 성능 조사를 위한 도구

## 지원되는 클라이언트 {#supported-clients}

| 클라이언트 | 개발자 | 노트 |
|--------|------|------|
| [커서][3] | 커서 | Datadog [커서 및 VS 코드 확장][15] 추천. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | [사용자 지정 커넥터 설정](?tab=claude#installation)을 사용하세요. Claude Cowork이 포함됩니다. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS 코드][7] | 마이크로소프트 | Datadog [커서 및 VS 코드 확장][16] 추천. |
| [JetBrains IDEs][18] | JetBrains | [Datadog 플러그인][18]을 권장합니다. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [구스][8], [클라인][11] | 다양한 | 위의 {{< ui >}}Other{{< /ui >}} 탭을 참조하세요. 원격 인증이 신뢰할 수 없는 경우 Cline에 대해 로컬 바이너리 인증을 사용하세요. |

<div class="alert alert-info"> Datadog MCP 서버는 상당한 개발 중이며, 추가 지원 클라이언트가 제공될 수 있습니다.</div>

## 필수 권한 {#required-permissions}

MCP 서버 도구는 다음 [Datadog 사용자 역할 권한][22]이 필요합니다:

| 권한 | |에 필요합니다.
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Datadog에서 데이터를 읽는 도구(예: 모니터 쿼리, 로그 검색, 대시보드 검색) |
| <code style="white-space:nowrap">mcp_write</code> | Datadog에서 리소스를 생성하거나 수정하는 도구(예: 모니터 생성, 호스트 음소거) |

`mcp_read` 또는 `mcp_write` 외에도, 사용자는 기본 리소스에 대한 표준 Datadog 권한이 필요합니다. 예를 들어, 모니터를 읽는 MCP 도구를 사용하려면 `mcp_read`와 [모니터 읽기][24] 권한이 모두 필요합니다. 리소스 수준 권한의 전체 목록은 [Datadog 역할 권한][25]을 참조하십시오.

**Datadog 표준 역할**을 가진 사용자는 기본적으로 두 가지 MCP 서버 권한을 가집니다. 조직에서 [사용자 정의 역할][23]을 사용하는 경우, 권한을 수동으로 추가하십시오:
1. 관리자로서 [**조직 설정 > 역할**][26]로 이동하여 업데이트할 역할을 클릭하십시오.
1. {{< ui >}}Edit Role{{< /ui >}}(연필 아이콘)을 클릭합니다.
1. 권한 목록 아래에서 {{< ui >}}MCP Read{{< /ui >}} 및 {{< ui >}}MCP Write{{< /ui >}} 체크박스를 선택하십시오.
1. 역할에 필요한 다른 리소스 수준 권한을 선택하십시오.
1. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

조직 관리자는 [조직 설정][27]에서 전역 MCP 접근 및 쓰기 기능을 관리할 수 있습니다.

## 인증 {#authentication}

MCP 서버는 [인증][14]을 위해 OAuth 2.0을 사용합니다. OAuth 흐름을 통과할 수 없는 경우(예: 서버에서), Datadog [API 키 및 애플리케이션 키][1]를 `DD_API_KEY` 및 `DD_APPLICATION_KEY` HTTP 헤더로 제공할 수 있습니다.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
예를 들어, 선택한 [Datadog 사이트][17]에 따라 ({{< region-param key="dd_site_name" >}}):

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

보안을 위해 필요한 권한만 가진 [서비스 계정][13]에서 범위가 지정된 API 키와 애플리케이션 키를 사용하십시오.

### 로컬 바이너리 인증 {#local-binary-authentication}

로컬 인증은 Cline 및 원격 인증이 신뢰할 수 없거나 사용 불가능한 경우에 권장됩니다. 설치 후에는 일반적으로 로컬 바이너리를 업데이트하지 않아도 MCP 서버 업데이트의 혜택을 받을 수 있습니다. 이는 도구가 원격으로 제공되기 때문입니다.

{{% collapse-content title="Datadog MCP 서버 로컬 바이너리 설정." level="h5" expanded=false id="mcp-local-binary" %}}

1. Datadog MCP 서버 바이너리 설치 (macOS 및 Linux).
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   이것은 바이너리를 `~/.local/bin/datadog_mcp_cli`에 설치합니다.

   Windows의 경우, [Windows 버전][20]을 다운로드하십시오.

2. `datadog_mcp_cli login`을 수동으로 실행하여 OAuth 로그인 흐름을 진행하고 [Datadog 사이트][21]를 선택하십시오.

3. AI 클라이언트를 `datadog_mcp_cli`를 명령으로 사용하여 stdio 전송을 사용하도록 구성하십시오. 예를 들어, macOS에서(`<USERNAME>`을 귀하의 OS 사용자 이름으로 교체):
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

   다른 운영 체제의 경우, `command` 경로를 다운로드한 바이너리의 위치로 교체하십시오.
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">Claude Code의 경우, 대신 다음을 실행할 수 있습니다. 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. AI 클라이언트를 완전히 재시작하여 구성을 적용하고 MCP 서버를 로드하십시오.
{{% /collapse-content %}}

## MCP 서버에 대한 액세스 권한 테스트 {#test-access-to-the-mcp-server}.

1. [MCP 검사기][2]를 설치하십시오. 이는 MCP 서버를 테스트하고 디버깅하기 위한 개발자 도구입니다.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. 검사기의 웹 UI에서 {{< ui >}}Transport Type{{< /ui >}}에 대해 {{< ui >}}Streamable HTTP{{< /ui >}}을 선택하십시오.
3. {{< ui >}}URL{{< /ui >}}의 경우, 귀하의 지역 Datadog 사이트에 대한 MCP 서버 엔드포인트를 입력하십시오. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   예를 들어, 다음의 경우 {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. {{< ui >}}Connect{{< /ui >}}를 클릭한 후 {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}로 이동하십시오.
5. [사용 가능한 도구][12]가 나타나는지 확인하십시오.

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
[12]: /ko/bits_ai/mcp_server/tools
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
[49]: /ko/bits_ai/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli