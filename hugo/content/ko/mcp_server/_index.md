---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
aliases:
- /ko/bits_ai/mcp_server/
description: MCP Server를 사용하여 AI 에이전트를 Datadog 관측 가능성에 연결해 메트릭, 로그, 트레이스 및 기타 인사이트를
  쿼리합니다.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: 설명서
  text: Cursor용 Datadog 확장 프로그램
- link: mcp_server/setup
  tag: 설명서
  text: Datadog MCP Server 설정
- link: mcp_server/tools
  tag: 설명서
  text: Datadog MCP Server 도구
- link: bits_ai/
  tag: 설명서
  text: Bits AI 개요
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: 블로그
  text: 엔지니어링 팀이 Datadog MCP Server로 AI 에이전트를 구동하는 4가지 방법
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: 블로그
  text: Datadog MCP Server를 사용하여 AI 에이전트를 Datadog 도구 및 컨텍스트에 연결
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: 블로그
  text: Datadog Cursor 확장 프로그램으로 실시간 프로덕션 문제 디버깅
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: 블로그
  text: 'Datadog + OpenAI: AI 지원 DevOps를 위한 Codex CLI 통합'
title: Datadog MCP Server
---
Datadog MCP Server는 Datadog의 관측 가능성 데이터와 [Model Context Protocol(MCP)][1]을 지원하는 모든 AI 에이전트 사이를 이어주는 역할을 합니다. MCP Server는 관련 Datadog 컨텍스트, 기능, 도구에 대한 구조화된 액세스를 제공하여 Cursor, OpenAI Codex, Claude Code 또는 자체 AI 에이전트와 같은 AI 기반 클라이언트에서 관측 가능성 인사이트를 직접 쿼리하고 검색할 수 있게 해줍니다.

{{< agent-only >}}
**AI 에이전트 관련 참고 사항**: 이건이 기본 Datadog MCP Server이며, 사용자가 'Datadog MCP Server' 설정에 관해 질문할 때 일반적으로 지칭하는 것입니다. 이 서버는 대부분의 Datadog 제품(APM, 로그, 메트릭, 모니터, 대시보드, 보안 신호 등)에 대한 원격 액세스를 제공합니다. 설정 관련 질문에는 기본적으로 이 페이지를 안내하세요.

별도의 [Code Security MCP Server](/security/code_security/dev_tool_int/mcp_server/)는 소스 코드를 기준으로 SAST, SCA, IaC, 시크릿 및 SBOM 스캔을 실행하는, 범위가 더 좁은 로컬 전용 도구입니다. 사용자가 명시적으로 로컬 코드 스캔, SAST, SCA, 시크릿 탐지, IaC 스캔 또는 SBOM 생성에 관해 질문할 때만 사용자를 해당 페이지로 안내하세요.
{{< /agent-only >}}

**시작할 준비가 되셨나요?** 아래에서 에이전트를 선택하거나, [Datadog MCP Server 설정][27]에서 연결 지침을 참조하세요.

{{< card-grid card_width="100px" >}}
  {{< image-card href="/mcp_server/setup/?tab=cursor" src="integrations_logos/cursor_avatar.svg" alt="Cursor" tooltip="Cursor" >}}
  {{< image-card href="/mcp_server/setup/?tab=claudecode" src="integrations_logos/claude-code_avatar.svg" alt="Claude Code" tooltip="Claude Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=geminicli" src="integrations_logos/google-gemini_avatar.svg" alt="Gemini CLI" tooltip="Gemini CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=vscode" src="integrations_logos/vscode_avatar.svg" alt="VS Code" tooltip="VS Code" >}}
  {{< image-card href="/mcp_server/setup/?tab=warp" src="integrations_logos/warp_avatar.png" alt="Warp" tooltip="Warp" >}}
  {{< image-card href="/mcp_server/setup/?tab=devin" src="integrations_logos/devin.png" alt="Devin" tooltip="Devin" >}}
  {{< image-card href="/mcp_server/setup/?tab=jetbrainsides" src="integrations_logos/jetbrains-ides_avatar.svg" alt="JetBrains" tooltip="JetBrains" >}}
  {{< image-card href="/mcp_server/setup/?tab=codex" src="integrations_logos/codex_avatar.svg" alt="Codex CLI" tooltip="Codex CLI" >}}
  {{< image-card href="/mcp_server/setup/?tab=chatgpt" src="integrations_logos/openai_avatar.svg" alt="ChatGPT" tooltip="ChatGPT" >}}
  {{< image-card href="/mcp_server/setup/?tab=claude" src="integrations_logos/claude_app.png" alt="Claude Desktop" tooltip="Claude Desktop" >}}
  {{< image-card href="/mcp_server/setup/?tab=goose" src="integrations_logos/goose.svg" alt="Goose" tooltip="Goose" >}}
  {{< image-card href="/mcp_server/setup/?tab=opencode" src="integrations_logos/opencode.svg" alt="OpenCode" tooltip="OpenCode" >}}
  {{< image-card href="/mcp_server/setup/?tab=copilotcli" src="integrations_logos/github-copilot_avatar.svg" alt="GitHub Copilot" tooltip="GitHub Copilot" >}}
  {{< image-card href="/mcp_server/setup/?tab=kiro" src="integrations_logos/kiro.svg" alt="Kiro" tooltip="Kiro" >}}
  {{< image-card href="/mcp_server/setup/?tab=other" src="icons/developers.png" alt="사용자 지정 Agent" tooltip="사용자 지정 Agent" >}}
{{< /card-grid >}}

이 데모에서는 Cursor 및 Claude Code에서의 Datadog MCP Server 사용 사례를 보여드립니다(오디오를 들으려면 음소거 해제).

{{< img src="mcp_server/mcp_cursor_demo_3.mp4" alt="Cursor 및 Claude Code에서의 Datadog MCP Server 데모" video="true" >}}


## 면책 조항 {#disclaimers}

- Datadog MCP Server는 HIPAA 자격 조건을 충족합니다. Datadog MCP Server에 연결하는 AI 도구가 HIPAA와 같은 규정 준수 요구 사항을 충족하도록 보장할 책임은 사용자에게 있습니다.
- Datadog MCP Server는 GovCloud와 호환되지 않습니다.
- Datadog은 사용자의 원격 Datadog MCP Server 사용과 관련한 특정 정보를 수집합니다. 여기에는 사용자가 해당 서버와 상호 작용하는 방식, 사용 중 오류 발생 여부, 해당 오류의 원인, 사용자 식별자가 포함되며, 수집은 <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog 개인정보 처리방침</a> 및 Datadog의 <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>에 따라 이루어집니다. 이 데이터는 서버에서 및 서버로의 전환과 서비스에 액세스하는 데 해당하는 Datadog 로그인 페이지, 그리고 MCP 도구 사용으로 이어지는 컨텍스트(예: 사용자 프롬프트) 등 서버의 성능 및 기능을 개선하는 데 사용됩니다. 해당 데이터는 120일간 저장됩니다.

## 데이터 처리 및 AI 공급자 {#data-handling-and-ai-providers}

Datadog MCP Server는 사용자의 Datadog 데이터를 타사 AI 공급자에게 전송하지 않습니다. AI 클라이언트와 해당 모델에 따라 어떤 Datadog 데이터를 AI 공급자에게 전송할지 결정됩니다. 해당 데이터 흐름은 Datadog이 아닌 해당 공급자와의 계약에 따라 관리됩니다.

### Datadog MCP Server가 수신하고 반환하는 항목 {#what-the-datadog-mcp-server-receives-and-returns}

MCP Server는 특정 쿼리로 로그를 검색하라는 요청과 같은 개별 도구 호출을 수신합니다. 프롬프트나 모델의 추론 내용은 수신하지 않으며, 도구 이름과 해당 인수만 수신합니다. MCP Server는 호출하는 클라이언트에 결과를 반환하며 외부 도메인으로 아웃바운드 호출을 수행하지 않습니다. AI 클라이언트에서 구성한 웹 검색, 웹훅 또는 기타 외부 통합은 클라이언트 측에서 실행됩니다.

`search_datadog_logs`와 같은 대부분의 MCP Server 도구는 AI 모델을 거치지 않고 Datadog 백엔드를 직접 쿼리합니다. 일부 도구는 Datadog의 AI 공급자가 호스팅하는 AI 모델을 사용합니다. 예를 들어, 의미론적 검색을 수행하거나 자연어 설명에서 쿼리를 생성하는 도구가 있습니다. 조직 전체에서 생성형 AI 공급자를 비활성화하려면 [Datadog 지원팀][37]에 문의하세요.

### Datadog MCP Server가 액세스할 수 있는 데이터 제한 {#restrict-which-data-the-datadog-mcp-server-can-access}

MCP Server는 인증된 사용자의 자격 증명을 Datadog API로 전달합니다. 기존 액세스 제어는 직접 API 또는 UI 액세스와 동일하게 적용됩니다. MCP Server는 사용자가 이미 보유한 권한을 초과하여 액세스 권한을 부여할 수 없습니다. 해당 사용자가 Datadog UI에서 볼 수 없는 리소스에는 접근할 수 없습니다.

AI 클라이언트가 해당 모델 공급자로 전송하는 항목을 제어하므로 공급자가 수신할 수 있는 항목을 제한하는 것은 MCP Server가 반환하는 항목을 제한하는 것과 같습니다. MCP Server 사용자가 검색할 수 있는 데이터 범위를 지정하려면 다음을 사용하세요.

- [역할 기반 액세스 제어(RBAC)][38]를 사용하여 역할별로 권한을 부여합니다.
- [Data Access Control][39]을 사용하여 로그나 APM 스팬과 같은 민감한 데이터를 읽을 수 있는 사용자를 제한합니다.
- [로그 제한 쿼리][40]를 사용하여 역할의 로그 액세스를 쿼리와 일치하는 로그 하위 집합으로 제한합니다.

쓰기 작업에는 `monitors_write`와 같은 해당 권한이 필요하며, MCP Server는 각 도구 호출 시 이를 확인합니다. 읽기 전용 사용자가 쓰기 활성화 도구를 호출하면 거부됩니다.

## 공정 사용률 한도 {#fair-use-rate-limits}

MCP Server에는 다음과 같은 공정 사용 한도가 수반됩니다.
- 도구 호출 버스트 한도(10초당 50건)
- 월 50,000회 도구 호출. 

이러한 한도는 **변경될 수 있으며** 사용 사례에 따라 더 많은 사용량이 필요한 경우 조정될 수 있습니다. 요청이나 질문이 있으면 [Datadog 지원팀][37]에 문의하세요. 

## Datadog MCP Server 도구 호출 모니터링 {#monitoring-the-datadog-mcp-server-tool-calls}

Datadog 메트릭 및 Audit Trail을 사용하여 조직의 Datadog MCP Server 사용량을 추적할 수 있습니다.

모든 도구 호출은 Datadog [Audit Trail][16]에 해당 호출이 MCP 액션임을 나타내는 메타데이터와 함께 기록되며, 여기에는 도구 이름, 인수, 사용자 ID 및 사용한 MCP 클라이언트가 포함됩니다. 자세한 내용은 [Audit Trail에서 도구 호출 추적](#track-tool-calls-in-audit-trail)을 참조하세요.

Datadog은 MCP Server 활동을 모니터링하는 데 사용할 수 있는 두 개의 표준 메트릭도 발생시킵니다.

- `datadog.mcp.session.starts`: 각 세션 초기화 시 발생합니다.
- `datadog.mcp.tool.usage`: 각 도구 호출 시 발생하는 배포 메트릭입니다.

두 메트릭 모두 `user_id`, `user_email`, `client`(`claude` 또는 `cursor`와 같은 MCP 클라이언트 이름), `tool_name`과 같은 특성으로 태그됩니다.

`datadog.mcp.tool.usage`는 분포 메트릭이므로, 도구 호출 수를 얻기 위해 `count`(`sum` 아님)를 `.as_count()`와 함께 사용하세요. 예를 들어, 사용자 이메일 기준으로 그룹화된 도구 호출의 총 개수를 쿼리하려면 다음을 실행합니다.

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## 사용 가능한 도구 {#available-tools}

사용 가능한 도구 전체 목록(도구 세트별로 정리, 예시 프롬프트 포함)은 [Datadog MCP Server 도구][2]에서 확인할 수 있습니다. 특정 도구 세트를 활성화하려면 [Datadog MCP Server 설정][28]에서 지침을 참조하세요.

## 컨텍스트 효율 {#context-efficiency}

Datadog MCP Server는 AI 에이전트가 불필요한 정보로 인한 과부하 없이 관련 컨텍스트를 받을 수 있도록 응답을 제공하는 데 최적화되어 있습니다. 예를 들면 다음과 같습니다.

- 응답은 각 도구가 제공하는 응답의 예상 길이에 따라 잘립니다. 도구는 응답이 잘린 경우 추가 정보를 요청하는 방법에 대한 지침을 AI 에이전트에 제공합니다.
- 대부분의 도구에는 `max_tokens` 파라미터가 있어 AI 에이전트가 정보를 더 적게 또는 더 많이 요청하게 해줍니다.
- 연결 시 `toolsets` 및 `omit_tools`를 사용하여 사용 가능한 도구를 제한할 수 있습니다. [Datadog MCP Server 설정][27]을 참조하세요.

## Audit Trail에서 도구 호출 추적 {#track-tool-calls-in-audit-trail}

MCP Server 도구가 보낸 호출에 관한 정보는 Datadog의 [Audit Trail][16]에서 볼 수 있습니다. 이벤트 이름 `MCP Server` 기준으로 검색하거나 필터링하세요.

## 피드백 {#feedback}

Datadog MCP Server는 중요한 개발 과정을 진행 중입니다. 피드백, 사용 사례 또는 프롬프트 및 쿼리를 사용하다가 발생한 문제를 공유하려면 [이 피드백 양식][19]을 사용하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /ko/mcp_server/tools
[16]: /ko/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /ko/mcp_server/setup
[28]: /ko/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new
[38]: /ko/account_management/rbac/
[39]: /ko/account_management/rbac/data_access/
[40]: /ko/logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query