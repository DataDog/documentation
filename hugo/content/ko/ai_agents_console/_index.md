---
description: Datadog Agent Console에서 코딩 에이전트, 지식 에이전트, Bits AI 에이전트를 포함하여 조직 전반의 AI
  에이전트 사용량, 비용 및 생산성을 모니터링하고 분석합니다.
further_reading:
- link: /ai_agents_console/setup/
  tag: 설명서
  text: Agent Console 설정
- link: /integrations/anthropic-usage-and-costs/
  tag: 설명서
  text: Anthropic 사용량 및 비용 통합
- link: /integrations/openai-codex/
  tag: 설명서
  text: OpenAI Codex 통합
- link: /integrations/openai/
  tag: 설명서
  text: OpenAI 통합
- link: /integrations/cursor/
  tag: 설명서
  text: Cursor 통합
- link: https://github.com/datadog-labs/trajectory
  tag: 소스 코드
  text: Trajectory
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: 블로그
  text: Datadog Agent Console을 사용하여 조직 내 Claude Code 도입 현황 모니터링
- link: https://www.datadoghq.com/blog/datadog-agent-console/
  tag: 블로그
  text: Datadog Agent Console을 사용하여 에이전트 도입 현황 모니터링
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="미리 보기">}}
Agent Console은 현재 미리 보기로 제공되고 있으며 모든 Datadog 고객이 사용할 수 있습니다.
{{< /callout >}}

[Agent Console][1]은 조직 전반의 AI 도구를 중앙에서 모니터링할 수 있는 기능을 제공합니다. 코딩 에이전트, 지식 에이전트, 데스크톱 에이전트 및 Datadog 자체 [Bits AI Agent](#bits-ai-agents)로부터 사용량, 비용 및 활동 데이터를 수집합니다. 이를 사용하여 AI 비용이 어디에 사용되는지, 누가 어떤 도구를 사용하는지, AI 지원 작업이 결과물에 어떤 영향을 미치는지 파악할 수 있습니다.

## 지원되는 AI 도구 {#supported-ai-tools}

| 도구 | 유형 | 데이터 소스 |
|------|------|-------------|
| Claude Code | 코딩 에이전트 | [Anthropic 사용량 및 비용][2] 통합 또는 Claude Team 플랜용 OpenTelemetry |
| Cursor | 코딩 에이전트 | [Cursor][3] 통합 |
| GitHub Copilot | 코딩 에이전트 | [GitHub Copilot][4] 통합 |
| Codex | 코딩 에이전트 | [OpenAI Codex][5] 통합 |
| Claude Chat, Claude Cowork, Claude Design | 지식 에이전트 | [Anthropic 사용량 및 비용][2] 통합 |
| ChatGPT Work | 지식 에이전트 | [OpenAI][13] 통합 |
| Microsoft Copilot 365(미리 보기) | 지식 에이전트 | Microsoft Copilot 통합. 액세스를 요청하려면 Datadog 계정 팀에 문의하세요. |
| 기타 코딩 및 데스크톱 에이전트 | 코딩 에이전트 | [Trajectory][6] |

[Trajectory][6]는 Claude Desktop, Cline, Windsurf, Zed, Goose를 포함한 30개 이상의 코딩 및 데스크톱 에이전트에서 세션을 캡처하는 오픈 소스 도구입니다. 전체 목록은 [지원되는 클라이언트][7]를 참조하세요.

이 도구들을 연결하려면 [Agent Console 설정][8]을 참조하세요.

## Overview {#overview}

{{< ui >}}Overview{{< /ui >}} 탭에서는 조직의 AI 지출, 도입 현황 및 생산성을 한곳에서 확인할 수 있습니다.

{{< img src="/ai_agents_console/agent_console_overview.png" alt="추적된 AI 비용, 총 사용자 수, 관찰된 PR당 비용, 제품 영역별 추적 비용 분석 및 상위 비용 기여자를 보여주는 Agent Console Overview 탭" style="width:100%;" >}}

상단의 요약 타일은 추적된 AI 비용, 총 사용자 수, 관찰된 풀 리퀘스트당 비용을 각각 이전 기간과 비교하여 보여줍니다.

{{< ui >}}Tracked AI cost{{< /ui >}} 차트는 코딩 에이전트 및 기타 에이전트와 같은 제품 영역에 지출이 어떻게 분산되는지, 어떤 도구가 지출에 가장 크게 기여하는지 보여줍니다. {{< ui >}}Trend{{< /ui >}}로 전환하여 시간 경과에 따른 비용 변화를 확인하고, 제품 영역을 선택하여 자세한 내용을 확인할 수 있습니다.

### Productivity {#productivity}

{{< ui >}}Productivity{{< /ui >}} 섹션은 병합된 풀 리퀘스트, 병합까지 걸린 시간, 관찰된 풀 리퀘스트당 비용, 해결된 Jira 이슈를 AI 비용과 대비하여 보여줍니다. 이러한 메트릭은 GitHub 및 Jira와 같이 연결된 [생산성 도구][9]에서 가져옵니다.

{{< img src="/ai_agents_console/agent_console_productivity_overview.png" alt="병합된 PR, 병합까지 걸린 시간, 관찰된 PR당 비용, 해결된 Jira 이슈가 각각 비용과 대비하여 표시된 Productivity 섹션" style="width:100%;" >}}

### Integrations {#integrations}

{{< ui >}}Integrations{{< /ui >}} 섹션에는 연결된 각 데이터 소스에 대한 카드와 해당 상태, 총 사용자 수, 예상 비용, 토큰 사용량이 표시됩니다. {{< ui >}}Group by Provider{{< /ui >}}를 활성화하여 Claude Code, Chat, Design, Cowork와 같이 동일한 제공업체의 제품을 Anthropic 아래에 통합할 수 있습니다.

{{< img src="/ai_agents_console/agent_console_integrations_overview.png" alt="Anthropic, OpenAI, Cursor, Claude Code (OTel), GitHub Copilot, Microsoft Copilot, GitHub 및 Jira에 대한 카드가 있는 Integrations 섹션" style="width:100%;" >}}

카드에서 {{< ui >}}View Dashboard{{< /ui >}}를 클릭하여 해당 통합의 전용 대시보드를 엽니다. 팀, 사용자 및 모델별로 각 대시보드를 필터링하세요.

예를 들어, Anthropic 대시보드는 Claude 제품 및 모델별로 예상 비용과 토큰을 분류하여 보여줍니다.

{{< img src="/ai_agents_console/agent_console_integrations_anthropic.png" alt="기업 예상 비용 및 토큰, Claude 제품별 비용(Claude Code, Chat, Design, Cowork), 시간 경과에 따른 비용, 모델별 토큰을 보여주는 Anthropic 대시보드" style="width:100%;" >}}

Codex 대시보드는 예상 비용, 활성 사용자 수, 세션, 크레딧, 토큰과 함께 사용량 및 도입 추세, 상위 사용자를 보여줍니다.

{{< img src="/ai_agents_console/agent_console_codex_integration.png" alt="예상 비용, 활성 사용자 수, 세션, 크레딧, 총 토큰, 시간 경과에 따른 세션 및 턴, 유형별 토큰, 턴 및 크레딧별 상위 사용자를 보여주는 Codex 대시보드" style="width:100%;" >}}

## My Usage {#my-usage}

{{< ui >}}My Usage{{< /ui >}} 탭은 사용자의 AI 사용량을 보여줍니다. 여기에는 공급자별로 누적된 일일 지출과 AI 에이전트를 사용한 작업 내역이 포함됩니다. 공급자 및 모델별로 필터링할 수 있습니다.

{{< img src="/ai_agents_console/agent_console_my_usage.png" alt="공급자별로 누적된 개인 일일 지출 차트와 작업 분류 차트를 보여주는 My Usage 탭" style="width:100%;" >}}

사이드 탐색 메뉴를 사용하여 {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Tasks{{< /ui >}}, {{< ui >}}Productivity{{< /ui >}}, {{< ui >}}Models{{< /ui >}}, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}} 및 {{< ui >}}Sessions{{< /ui >}} 사이를 전환할 수 있습니다. Tasks, Skills, Tools 및 Sessions 뷰에서는 [Trajectory][6]의 세션 데이터를 사용합니다. Models 뷰는 연결된 통합에서 가져온 데이터를 사용합니다.

My Usage와 Usage는 동일한 뷰를 공유합니다. 각 뷰에 대한 설명은 [Usage](#usage)를 참조하세요.

## Usage {#usage}

{{< ui >}}Usage{{< /ui >}} 탭은 My Usage와 동일한 뷰를 제공하며, 조직 전체의 데이터를 집계합니다. 이 탭을 사용하여 팀이 AI 에이전트를 사용하는 목적을 파악하고, 파워 유저와 이상치를 식별하며, 팀 간 도입 현황을 비교하세요.

### Tasks {#tasks}

Agent Console은 [Trajectory][6]로 캡처된 에이전트 세션을 코드 구현, 엔지니어링 운영, 지식 아티팩트와 같은 작업 범주 및 더 구체적인 하위 범주로 분류합니다. {{< ui >}}Tasks{{< /ui >}} 뷰는 각 범주의 작업 점유율과 활성 사용자당 비용을 도표로 표시하고, 각 범주의 비용, 작업당 비용, 작업 수를 나열합니다.

{{< img src="/ai_agents_console/agent_console_tasks.png" alt="작업 점유율과 활성 사용자당 비용에 따라 작업 범주를 나타낸 버블 차트와 비용, 작업당 비용, 작업 수를 보여주는 표가 포함된 Tasks 뷰" style="width:100%;" >}}

작업 범주를 선택하여 하위 범주, 작업당 비용, 총 작업 비용, 작업 수 및 평균 턴 수가 포함된 세부 정보 패널을 열어볼 수 있습니다.

{{< img src="/ai_agents_console/agent_console_tasks_view.png" alt="하위 범주별 작업, 작업당 비용, 총 작업 비용, 작업 수 및 평균 턴 수를 보여주는 Engineering Operations용 작업 범주 세부 정보 패널" style="width:100%;" >}}

### 사용자 및 팀 생산성 {#user-and-team-productivity}

{{< ui >}}Productivity{{< /ui >}} 뷰는 개별 엔지니어와 팀이 AI 도구를 어떻게 사용하는지에 대한 가시성을 제공합니다. 다음 용도로 사용하세요.
- 가장 많은 비용을 사용하는 사용자 및 가장 생산적인 기여자 식별
- 비용은 높지만 산출물은 적은 엔지니어와 같은 효율성 이상치 파악
- 사용자, 에이전트 및 모델별 전체 비용 분석 확인
- 개별 사용자의 비용, 풀 리퀘스트 이력 및 모델 구성 검토

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="선택한 사용자의 에이전트별 비용, 모델 구성, 풀 리퀘스트 이력을 보여주는 사용자 세부 정보 패널" style="width:100%;" >}}

### Models, Skills, Tools 및 Sessions {#models-skills-tools-and-sessions}

{{< ui >}}Models{{< /ui >}} 뷰에서는 연결된 통합 데이터에 기반하여 조직에서 사용하는 모델을 확인할 수 있습니다.

[Trajectory][6]로 캡처된 에이전트의 경우, {{< ui >}}Skills{{< /ui >}}, {{< ui >}}Tools{{< /ui >}}, {{< ui >}}Sessions{{< /ui >}} 뷰에서 에이전트가 사용하는 스킬과 도구를 확인하고 개별 에이전트 세션을 검토할 수 있습니다.

## Bits AI Agent {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="시간 경과에 따른 통합 에이전트 활동 차트와 Bits Investigation, Bits Code 및 Bits Agent Builder의 최근 조사, 세션 및 실행 현황을 보여주는 개별 카드를 포함한 Bits AI Agent 탭" style="width:100%;" >}}

{{< ui >}}Bits AI Agents{{< /ui >}} 탭에서는 Datadog의 기본 제공 AI 에이전트 사용 현황을 다른 AI 도구와 함께 확인할 수 있습니다. 모든 Datadog 에이전트의 조사, 세션, 실행을 통합하여 표시하므로 Bits AI 활동을 조직 내 다른 활동과 연관 지어 분석할 수 있습니다.

개별 카드에는 [Bits Investigation][10], [Bits Code][11] 및 [Bits Agent Builder][12]를 포함한 각 Bits AI Agent의 활동이 요약되어 있습니다. 카드에서 {{< ui >}}View Details{{< /ui >}}를 클릭하여 해당 에이전트를 자세히 살펴봅니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: /ko/integrations/anthropic-usage-and-costs/
[3]: /ko/integrations/cursor/
[4]: /ko/integrations/github-copilot/
[5]: /ko/integrations/openai-codex/
[6]: https://github.com/datadog-labs/trajectory
[7]: https://github.com/datadog-labs/trajectory/blob/main/docs/SUPPORTED-CLIENTS.md
[8]: /ko/ai_agents_console/setup/
[9]: /ko/ai_agents_console/setup/#connect-productivity-tools
[10]: /ko/bits_ai/bits_investigation/
[11]: /ko/bits_ai/bits_code/
[12]: /ko/actions/agents/
[13]: /ko/integrations/openai/?tab=apikey