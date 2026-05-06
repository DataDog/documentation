---
algolia:
  rank: 90
  tags:
  - mcp
  - mcp server
description: MCP 서버를 사용하여 AI 에이전트를 Datadog 관측 데이터에 연결하고, 메트릭, 로그, 트레이스 및 기타 통찰력을 쿼리합니다.
further_reading:
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: 커서용 Datadog 확장
- link: bits_ai/mcp_server/setup
  tag: Documentation
  text: Datadog MCP 서버 설정
- link: bits_ai/mcp_server/tools
  tag: Documentation
  text: Datadog MCP 서버 도구
- link: bits_ai/
  tag: Documentation
  text: Bits AI 개요
- link: https://www.datadoghq.com/blog/datadog-mcp-server-use-cases
  tag: Blog
  text: 엔지니어링 팀이 AI 에이전트를 지원하기 위해 Datadog MCP 서버를 사용하는 네 가지 방법
- link: https://www.datadoghq.com/blog/datadog-remote-mcp-server/
  tag: Blog
  text: Datadog MCP 서버를 사용하여 AI 에이전트를 Datadog 도구 및 컨텍스트에 연결합니다.
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Datadog Cursor 확장을 사용하여 실시간 프로덕션 문제를 디버깅합니다.
- link: https://www.datadoghq.com/blog/openai-datadog-ai-devops-agent/
  tag: Blog
  text: 'Datadog + OpenAI: AI 지원 DevOps를 위한 Codex CLI 통합'
title: Datadog MCP 서버
---
Datadog MCP 서버는 Datadog의 관측 데이터와 [모델 컨텍스트 프로토콜(MCP)][1]을 지원하는 모든 AI 에이전트 간의 다리 역할을 합니다. MCP 서버는 관련 Datadog 컨텍스트, 기능 및 도구에 대한 구조화된 액세스를 제공하여 Cursor, OpenAI Codex, Claude Code 또는 귀하의 AI 에이전트와 같은 AI 기반 클라이언트에서 직접 관측 통찰력을 쿼리하고 검색할 수 있게 합니다.

**시작할 준비가 되셨나요?** 아래에서 에이전트를 선택하거나 [Datadog MCP 서버 설정][27]에서 연결 방법을 확인하세요.

{{< partial name="mcp_server/mcp_server_agents.html" >}}

이 데모는 Cursor와 Claude Code에서 Datadog MCP 서버가 사용되는 모습을 보여줍니다(오디오를 활성화하세요):

{{< img src="bits_ai/mcp_server/mcp_cursor_demo_3.mp4" alt="Cursor와 Claude Code에서 Datadog MCP 서버의 데모" video="true" >}}


## 면책 조항 {#disclaimers}

- Datadog MCP 서버는 HIPAA 적격입니다. Datadog MCP 서버에 연결하는 AI 도구가 HIPAA와 같은 규정 준수 요구 사항을 충족하는지 확인할 책임이 있습니다.
- Datadog MCP 서버는 GovCloud와 호환되지 않습니다.
- Datadog은 원격 Datadog MCP 서버 사용에 대한 특정 정보를 수집하며, 여기에는 상호작용 방식, 사용 중 발생한 오류, 오류의 원인 및 사용자 식별자가 포함됩니다. 이는 <a href="https://www.datadoghq.com/legal/privacy/" target="_blank">Datadog 개인정보 보호정책</a> 및 Datadog의 <a href="https://www.datadoghq.com/legal/eula/" target="_blank">EULA</a>에 따라 이루어집니다. 이 데이터는 서버의 성능과 기능을 개선하는 데 사용되며, 서버와의 전환 및 서비스에 접근하기 위한 해당 Datadog 로그인 페이지, 그리고 MCP 도구 사용으로 이어지는 맥락(예: 사용자 프롬프트)을 포함합니다. 데이터는 120일 동안 저장됩니다.

## 공정 사용 비율 제한 {#fair-use-rate-limits}

MCP 서버는 다음과 같은 공정 사용 제한이 있습니다:
- 10초당 50회 요청의 도구 호출 버스트 제한
- 하루 5,000회 도구 호출
- 월 50,000회 도구 호출. 

이 제한은 **변경될 수 있으며** 사용 사례에 따라 조정될 수 있습니다. 요청이나 질문이 있으시면 [Datadog 지원][37]에 문의해 주십시오. 

## Datadog MCP 서버 도구 호출 모니터링 {#monitoring-the-datadog-mcp-server-tool-calls}

Datadog 메트릭 및 Audit Trail을 사용하여 귀하의 조직의 Datadog MCP 서버 사용량을 추적할 수 있습니다.

모든 도구 호출은 Datadog [Audit Trail][16]에 기록되며, 도구 이름, 인수, 사용자 신원 및 사용된 MCP 클라이언트를 포함하여 MCP 액션으로 식별되는 메타데이터가 포함됩니다. 자세한 정보는 [Audit Trail에서 도구 호출 추적](#track-tool-calls-in-audit-trail)을 참조하십시오.

Datadog은 MCP 서버 활동을 모니터링하는 데 사용할 수 있는 두 가지 표준 메트릭을 제공합니다.

- `datadog.mcp.session.starts`: 각 세션 초기화 시 방출됩니다.
- `datadog.mcp.tool.usage`: 각 도구 호출 시 방출되는 분포 메트릭입니다.

두 메트릭 모두 `user_id`, `user_email`, `client`와 같은 속성으로 태그됩니다(예: `claude` 또는 `cursor`과 같은 MCP 클라이언트 이름).

`datadog.mcp.tool.usage`는 분포 메트릭이므로, 도구 호출 수를 얻기 위해 `count`(`sum` 아님)를 `.as_count()`와 함께 사용하세요. 예를 들어, 사용자 이메일별로 그룹화된 총 도구 호출 수를 쿼리하려면:

```
count:datadog.mcp.tool.usage{*} by {user_email}.as_count()
```

## 사용 가능한 도구 {#available-tools}

[Datadog MCP 서버 도구][2]에서 도구 세트별로 정리된 사용 가능한 도구의 전체 참조를 확인하고 예제 프롬프트를 확인하세요. 특정 도구 세트를 활성화하려면 [Datadog MCP 서버 설정][28]에서 지침을 참조하세요.

## 맥락 효율성 {#context-efficiency}

Datadog MCP 서버는 AI 에이전트가 불필요한 정보에 압도되지 않고 관련 맥락을 얻을 수 있도록 응답을 제공하도록 최적화되어 있습니다. 예:

- 응답은 각 도구가 제공하는 응답의 예상 길이에 따라 잘립니다. 도구는 응답이 잘린 경우 추가 정보를 요청하는 방법에 대한 지침을 AI 에이전트에 제공합니다.
- 대부분의 도구에는 AI 에이전트가 더 적거나 더 많은 정보를 요청할 수 있도록 하는 `max_tokens` 매개변수가 있습니다.

## Audit Trail에서 도구 호출 추적 {#track-tool-calls-in-audit-trail}

Datadog의 [감사 추적][16]에서 MCP 서버 도구가 수행한 호출에 대한 정보를 볼 수 있습니다. 이벤트 이름 `MCP Server`으로 검색하거나 필터링하세요.

## 피드백 {#feedback}

Datadog MCP 서버는 활발히 개발 중입니다. [이 피드백 양식][19]을 사용하여 프롬프트 및 쿼리에서 발생한 피드백, 케이스 또는 문제를 공유하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /ko/bits_ai/mcp_server/tools
[16]: /ko/account_management/audit_trail/
[19]: https://docs.google.com/forms/d/e/1FAIpQLSeorvIrML3F4v74Zm5IIaQ_DyCMGqquIp7hXcycnCafx4htcg/viewform
[27]: /ko/bits_ai/mcp_server/setup
[28]: /ko/bits_ai/mcp_server/setup#toolsets
[37]: https://help.datadoghq.com/hc/en-us/requests/new