---
description: Datadog MCP 서버, CLI 및 Claude Code 스킬을 사용하여 개발 환경에서 LLM 애플리케이션을 구축하고 분석합니다.
title: AI를 활용한 구축
---
Datadog은 Datadog MCP 서버, Pup CLI 및 Claude Code 스킬을 통해 코딩 에이전트 워크플로우를 지원합니다. 이 도구들을 사용하면 개발 환경을 벗어나지 않고 Agent Observability 데이터를 조사하고 LLM 애플리케이션을 반복적으로 개선할 수 있습니다.

## 시작하기 {#get-started}

### 스킬 설치 {#install-the-skills}

{{< code-block lang="shell" >}}
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
{{< /code-block >}}

### 데이터 백엔드 선택 {#choose-a-data-backend}

이 스킬들은 Datadog MCP 서버나 Pup CLI를 통해 Agent Observability 데이터를 읽습니다. 둘 중 하나를 설정합니다. 각 스킬은 시작할 때 MCP 서버를 탐지하고, MCP 서버를 사용할 수 없으면 Pup CLI를 폴백으로 사용합니다.

{{% collapse-content title="옵션 A: Datadog MCP 서버" level="h4" expanded=true id="option-a-mcp-server" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
MCP 서버를 Claude Code 세션에 연결합니다.

<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">이 제품은 선택한 사이트({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

인증 옵션 및 사용 가능한 도구를 포함한 전체 설정 방법은 [MCP Server][2]를 참조하세요.

{{% /collapse-content %}}

{{% collapse-content title="옵션 B: Pup CLI" level="h4" expanded=false id="option-b-pup-cli" %}}

Homebrew(macOS/Linux)를 사용하여 Pup CLI를 설치하고 인증합니다.

{{< code-block lang="shell" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
pup auth login
{{< /code-block >}}

다른 설치 방법과 지원되는 명령어 및 인증 옵션에 대한 자세한 내용은 [Pup CLI][1]를 참조하세요.

{{% /collapse-content %}}

{{< whatsnext desc="Datadog MCP 서버와 스킬을 활용한 구축:" >}}
    {{< nextlink href="/llm_observability/build_with_ai/mcp_server" >}}MCP 서버{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Claude Code 스킬{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /ko/cli/
[2]: /ko/llm_observability/build_with_ai/mcp_server