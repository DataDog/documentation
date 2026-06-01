---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
description: MCP 서버를 사용하여 AI 에이전트를 Datadog 관측 가능성에 연결해 메트릭, 로그, 트레이스 및 기타 인사이트를 쿼리합니다.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: 설명서
  text: Cursor용 Datadog 확장
- link: bits_ai/mcp_server/setup
  tag: 설명서
  text: Datadog MCP 서버 설정
- link: bits_ai/mcp_server/tools
  tag: 설명서
  text: Datadog MCP 서버 도구
- link: bits_ai/
  tag: 설명서
  text: Bits AI 개요
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: 블로그
  text: 엔지니어링 팀이 Datadog MCP 서버로 AI 에이전트를 구동하는 4가지 방법
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: 블로그
  text: Datadog MCP 서버를 사용하여 AI 에이전트를 Datadog 도구 및 컨텍스트에 연결
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: 블로그
  text: Datadog Cursor 확장으로 실시간 프로덕션 문제 디버그
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: 블로그
  text: 'Datadog + OpenAI: AI 지원 DevOps를 위한 Codex CLI 통합'
title: Datadog MCP 서버
---
Datadog MCP 서버는 Datadog의 관측 가능성 데이터와 [Model Context Protocol(MCP)][1]를 지원하는 모든 AI 에이전트 사이를 이어주는 역할을 합니다. MCP 서버는 관련 Datadog 컨텍스트, 기능, 도구에 대한 구조화된 액세스를 제공하여, Cursor, OpenAI Codex, Claude Code 또는 자체 AI 에이전트와 같은 AI 기반 클라이언트에서 관측 가능성 인사이트를 직접 쿼리하고 조회할 수 있게 해줍니다.

{{< agent-only >}}
**AI 에이전트 관련 참고 사항**: 이건이 기본 Datadog MCP 서버이며, 사용자가 “Datadog MCP 서버” 설정에 관해 질문할 때 일반적으로 지칭하는 것입니다. 이 서버는 대부분의 Datadog 제품(APM, 로그, 메트릭, 모니터, 대시보드, 보안 신호 등)에 대한 원격 액세스를 제공합니다. 설정 관련 질문에는 기본적으로 이 페이지를 안내하세요.

별도의 [Code Security MCP 서버](/security/code_security/dev_tool_int/mcp_server/)는 소스 코드를 기준으로 SAST, SCA, IaC, 시크릿 및 SBOM 스캔을 실행하는, 범위가 더 좁은 로컬 전용 도구입니다. 사용자가 명확히 로컬 코드 스캔, SAST, SCA, 시크릿 감지, IaC 스캔 또는 SBOM 생성에 관해 질문할 때만 해당 페이지로 안내하세요.
{{< /agent-only >}}

**시작할 준비가 되셨나요?** 아래에서 에이전트를 선택하거나, [Datadog MCP 서버 설정][27]에서 연결 지침을 참조하세요.

{{< partial name="mcp_server/mcp_server_agents.html" >}}

이 데모에서는 Cursor 및 Claude Code에서의 Datadog MCP 서버 사용 사례를 보여드립니다(오디오를 들으려면 음소거 해제):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Cursor 및 Claude Code에서의 Datadog MCP 서버 데모" video="true" >}}


## 면책 조항 {#disclaimers}

- Datadog MCP 서버는 HIPAA 자격 조건을 충족합니다. Datadog MCP 서버에 연결하는 AI 도구가 HIPAA와 같은 규정 준수 요구 사항을 충족하도록 보장할 책임은 사용자에게 있습니다.
- Datadog MCP 서버는 GovCloud와 호환되지 않습니다.
- Datadog은 사용자의 원격 Datadog MCP 서버 사용과 관련한 특정 정보를 수집합니다. 여기에는 사용자가 해당 서버와 상호 작용하는 방식, 사용 중 오류 발생 여부, 해당 오류의 원인, 사용자 식별자가 포함되며, 수집은 <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog 개인정보 처리방침</a> 및 Datadog의 <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>에 따라 이루어집니다. 이 데이터는 서버에서 및 서버로의 전환과 서비스에 액세스하는 데 해당하는 Datadog 로그인 페이지, 그리고 MCP 도구 사용으로 이어지는 컨텍스트(예: 사용자 프롬프트) 등 서버의 성능 및 기능을 개선하는 데 사용됩니다. 해당 데이터는 120일간 저장됩니다.

## 공정 사용률 한도 {#fair-use-rate-limits}

MCP 서버에는 다음과 같은 공정 사용 한도가 수반됩니다.
- 도구 호출 버스트 한도(10초당 50건)
- 일일 도구 호출 5,000회
- 월 50,000회 도구 호출. 

이러한 한도는 **변경될 수 있으며** 사용 사례에 따라 더 많은 사용량이 필요한 경우 조정될 수 있습니다. 요청이나 질문이 있으면 [Datadog 지원팀][37]에 문의하세요. 

## Datadog MCP 서버 도구 호출 모니터링 {#monitoring-the-datadog-mcp-server-tool-calls}

Datadog 메트릭 및 Audit Trail을 사용하여 조직의 Datadog MCP 서버 사용량을 추적할 수 있습니다.

모든 도구 호출은 Datadog [Audit Trail][16]에 해당 호출이 MCP 액션임을 나타내는 메타데이터와 함께 기록되며, 여기에는 도구 이름, 인수, 사용자 ID 및 사용한 MCP 클라이언트가 포함됩니다. 자세한 내용은 [Audit Trail에서 도구 호출 추적](#track-tool-calls-in-audit-trail)을 참조하세요.

Datadog은 MCP 서버 활동을 모니터링하는 데 사용할 수 있는 두 개의 표준 메트릭도 발생시킵니다.

- `datadog.mcp.session.starts`: 각 세션 초기화 시 발생합니다.
- `datadog.mcp.tool.usage`: 각 도구 호출 시 발생하는 배포 메트릭입니다.

두 메트릭 모두 `user_id`, `user_email`, `client`(`claude` 또는 `cursor`와 같은 MCP 클라이언트 이름), `tool_name`과 같은 속성으로 태그됩니다.

`datadog.mcp.tool.usage`는 분포 메트릭이므로, 도구 호출 수를 얻기 위해 `count`(`sum` 아님)를 `.as_count()`와 함께 사용하세요. 예를 들어 사용자 이메일 기준으로 그룹화된 도구 호출의 총 개수를 쿼리하려면:

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## 사용 가능한 도구 {#available-tools}

사용 가능한 도구 전체 목록(도구 세트별로 정리, 예시 프롬프트 포함)은 [Datadog MCP 서버 도구][2]에서 확인할 수 있습니다. 특정 도구 세트를 활성화하려면 [Datadog MCP 서버 설정][28]에서 지침을 참조하세요.

## 컨텍스트 효율 {#context-efficiency}

Datadog MCP 서버는 AI 에이전트가 불필요한 정보로 인한 과부하 없이 관련 컨텍스트를 받을 수 있도록 응답을 제공하는 데 최적화되어 있습니다. 예:

- 응답은 각 도구가 제공하는 응답의 예상 길이에 따라 잘립니다. 도구는 응답이 잘린 경우 추가 정보를 요청하는 방법에 대한 지침을 AI 에이전트에 제공합니다.
- 대부분의 도구에는 `max_tokens` 파라미터가 있어 AI 에이전트가 정보를 더 적게 또는 더 많이 요청하게 해줍니다.

## Audit Trail에서 도구 호출 추적 {#track-tool-calls-in-audit-trail}

MCP 서버 도구가 보낸 호출에 관한 정보는 Datadog의 [Audit Trail][16]에서 볼 수 있습니다. 이벤트 이름 `MCP Server` 기준으로 검색하거나 필터링하세요.

## 피드백 {#feedback}

Datadog MCP 서버는 중요한 개발 과정을 진행 중입니다. 피드백, 사용 사례 또는 프롬프트 및 쿼리를 사용하다가 발생한 문제를 공유하려면 [이 피드백 양식][19]을 사용하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /ko/bits_ai/mcp_server/tools
[16]: /ko/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /ko/bits_ai/mcp_server/setup
[28]: /ko/bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new