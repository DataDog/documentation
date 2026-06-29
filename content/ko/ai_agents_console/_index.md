---
description: 조직 전반에서 코딩 에이전트 및 Bits AI 에이전트의 사용량, 비용 및 성능을 Datadog Agent Console에서
  모니터링합니다.
further_reading:
- link: /ai_agents_console/setup/
  tag: 설명서
  text: Agent Console 설정
- link: /integrations/anthropic-usage-and-costs/
  tag: 설명서
  text: Anthropic Usage and Costs 통합
- link: /integrations/cursor/
  tag: 설명서
  text: Cursor 통합
- link: https://www.datadoghq.com/blog/claude-code-monitoring
  tag: 블로그
  text: Datadog Agent Console을 사용하여 조직 내 Claude Code 도입 현황 모니터링
title: Agent Console
---
{{< callout url="#" btn_hidden="true" header="미리 보기">}}
Agent Console은 현재 미리 보기 버전으로 제공되며 모든 Datadog 고객이 사용할 수 있습니다.
{{< /callout >}}

[Agent Console][1]은 조직 전반의 AI 에이전트를 중앙에서 모니터링할 수 있는 기능을 제공합니다. 코딩 에이전트와 Datadog의 자체 [Bits AI 에이전트](#bits-ai-agents)에서 로그 및 메트릭을 수집하고 이를 실시간으로 표시하여 사용량, 비용, 지연 시간, 생산성 영향 및 새롭게 발생하는 문제 패턴에 대한 가시성을 제공합니다.

Agent Console은 다음 코딩 에이전트를 지원합니다.

| 도구 | 설명 |
|------|-------------|
| [Claude Code][2] | Anthropic의 에이전트형 코딩 도구 |
| [Cursor][3] | AI 기반 코드 편집기 |
| [GitHub Copilot][10] | GitHub의 AI 기반 코드 완성 도구 |


## 코딩 에이전트 {#coding-agents}

{{< ui >}}Coding Agents{{< /ui >}} 탭에서는 조직 전체의 코딩 에이전트 활동을 상위 수준에서 확인할 수 있습니다. 기본적으로 모든 코딩 에이전트의 데이터가 집계되어 표시되며, 특정 에이전트만 필터링하여 볼 수도 있습니다.

### 에이전트 발견 사항 {#agent-findings}

{{< ui >}}Agent Findings{{< /ui >}} 패널은 선택한 기간에 대한 주요 활동(총 비용, 총 사용자 수, 세션 수, 병합 소요 시간, 코드 라인 수, 세션당 평균 턴 수 포함)을 요약하여 보여줍니다. 누적 차트는 에이전트(예: Claude Code, Cursor)별로 활동을 구분하여 표시하므로 시간 경과에 따른 도입 현황을 비교할 수 있습니다.

{{< img src="ai_agents_console/agent-findings.png" alt="총 비용, 총 사용자 수, 세션 수, 병합 소요 시간, 코드 라인 수, 세션당 평균 턴 수 요약 타일과 일주일간의 에이전트 활동 누적 막대 차트가 표시된 Agent Findings 패널" style="width:100%;" >}}

### 영향 지표 {#impact-metrics}

{{< ui >}}Impact Metrics{{< /ui >}} 패널은 AI 지원 개발이 소프트웨어 제공 수명 주기에 미치는 영향을 DORA 스타일 메트릭을 사용하여 측정하며, AI 지원 작업과 비 AI 작업을 나란히 비교하여 보여줍니다.

- **Adoption**: AI 지원 커밋 및 AI 지원 PR을 포함하여 AI가 생성한 코드의 양을 추적합니다.
- **Velocity**: 변경 사항이 프로덕션에 도달하는 속도를 측정하며, 변경 리드 타임 및 PR 검토 시간을 포함합니다.
- **Stability**: 배포 이후 변경 사항의 안정성을 추적하며, 변경 실패율 및 복구 시간을 포함합니다.

{{< img src="ai_agents_console/impact-metrics.png" alt="Adoption, Velocity, Stability 카드 각각에 대해 AI 지원 작업과 비 AI 작업을 비교하는 두 개의 추세 차트가 포함된 Impact Metrics 패널" style="width:100%;" >}}

### 감지된 문제 {#detected-problems}

{{< ui >}}Detected Problems{{< /ui >}} 패널은 팀이 자주 겪는 문제 패턴을 강조 표시하고 해결 방법을 추천합니다. Sankey 다이어그램은 개별 에이전트에서 특정 리포지토리로 이어지는 문제 패턴(예: 검사 건너뛰기, 재시도 루프, 파일 재읽기)을 시각화하며 각 패턴에 대한 예상 월간 비용도 함께 제공합니다.

{{< img src="ai_agents_console/detected-problems.png" alt="감지된 문제 Sankey 다이어그램: Claude Code, Cursor, GitHub Copilot 세션이 건너뛴 검사, 재시도 루프, 파일 재읽기 등의 문제 패턴을 거쳐 영향을 받는 리포지토리로 연결되며, 사이드 패널에 리포지토리별 비용 분석이 나와 있습니다." style="width:100%;" >}}

패턴을 선택하면 패턴 정의, 조직 전체의 예상 월간 비용, 플래그가 지정된 세션 목록, 권장 수정 방법이 포함된 상세 보기 화면이 열립니다.

{{< img src="ai_agents_console/detected-pattern-detail.png" alt="Skipped Checks에 대한 감지된 패턴 상세 보기: 패턴 정의, 월 $8,500의 예상 비용, View Recommendation 버튼 및 사용자, 에이전트, 소요 시간, 비용 정보가 포함된 12개의 플래그 세션이 표시됩니다." style="width:100%;" >}}

### 개별 에이전트 대시보드 {#individual-agent-dashboards}

에이전트 타일을 선택하면 해당 코딩 에이전트의 전용 대시보드가 열립니다. 각 대시보드에는 총 비용, 세션 수, 커밋 수, 추가된 코드 라인 수에 대한 요약 타일이 포함되어 있으며, 요청량, 지연 시간, 모델 사용 패턴, 추가된 코드와 제거된 코드 비교, 도구 수락/거부 비율을 다룬 성능 차트도 제공됩니다.

각 대시보드는 팀, 사용자, 리포지토리 및 시간 범위별로 필터링할 수 있습니다.

{{< img src="ai_agents_console/coding-agent-dashboard.png" alt="Coding Agents 탭의 Claude Code 대시보드: Teams, Users, Repository 필터와 Total Spend, Sessions, Commits, Lines Added 요약 타일, 그리고 Commits Over Time, Pull Requests Over Time, Lines Added vs Removed, Tool Accepts vs Rejects 성능 차트 포함" style="width:100%;" >}}

## 에이전트 사용량 분석 {#analyze-agent-usage}

{{< ui >}}Analytics{{< /ui >}} 탭에서는 개인 및 팀 단위의 세부 정보를 제공하여 파워 유저, 이상치, 팀 수준의 도입 패턴을 파악할 수 있습니다.

### 팀 비교 {#team-comparison}

{{< ui >}}Comparison{{< /ui >}} 패널은 조직 내 다른 팀 및 전체 조직과 비교한 팀의 비용, 라인당 비용, 모델 사용 현황을 보여줍니다. 선 그래프는 시간에 따른 엔지니어별로 선택한 지표를 보여주며, 표에는 엔지니어별 비용, PR당 비용, 병합 소요 시간, 세션 수 항목이 표시됩니다. 오른쪽의 인사이트 영역은 조직 평균 대비 크게 높거나 낮은 사용량을 보이는 팀과 같은 주목할 만한 추세를 강조 표시합니다.

행에서 {{< ui >}}Team Details{{< /ui >}}를 선택하면 해당 팀의 보기가 열립니다.

{{< img src="ai_agents_console/team-comparison.png" alt="비교 패널: 시간에 따른 팀별 엔지니어당 비용 선 그래프, 오른쪽 인사이트 영역, 엔지니어당 비용·PR당 비용·병합 소요 시간·세션 수를 비교하는 표 포함" style="width:100%;" >}}

### 사용자 분석 {#user-analytics}

{{< ui >}}User Analytics{{< /ui >}} 패널은 개별 사용자 기준으로 활동 내역을 분석하여 보여줍니다.

#### 상위 사용자 {#top-users}

세 개의 리더보드가 비용, 생성된 라인 수, 병합된 PR 수를 기준으로 주요 기여자를 순위별로 표시합니다.

{{< img src="ai_agents_console/top-users.png" alt="User Analytics 패널: 비용 기준 상위 사용자, 생성된 라인 수 기준 상위 사용자, 병합된 PR 수 기준 상위 사용자를 보여주는 세 개의 리더보드" style="width:100%;" >}}

#### 생성된 라인 수 대비 비용 {#lines-generated-vs-spend}

{{< ui >}}Lines Generated vs Spend{{< /ui >}} 차트는 각 사용자를 하나의 점으로 표시하며, 점의 크기는 세션 수를 나타냅니다. 두 축 모두 구성 가능하므로 생성된 라인 수, PR 수 또는 비용을 기준으로 비교할 수 있습니다.

{{< img src="ai_agents_console/lines-vs-spend.png" alt="Lines Generated와 Spend를 비교하는 산점도: 각 사용자는 세션 수에 따라 크기가 달라지는 버블로 표시되며 이메일 주소 레이블 포함" style="width:100%;" >}}

#### 에이전트별 사용자 비용 {#user-cost-across-agents}

{{< ui >}}User Cost Across Agents{{< /ui >}} 표에는 모든 사용자와 해당 사용자가 사용하는 에이전트, 모델 비용(모델별 상세 내역 포함), 생성된 코드 라인 수 및 세션 수가 표시됩니다. 특정 사용자를 검색하거나 원하는 열을 기준으로 정렬할 수 있습니다.

{{< img src="ai_agents_console/user-cost-across-agents.png" alt="User Cost Across Agents 표: 98명의 사용자에 대한 모델 비용, 사용 중인 에이전트, 생성된 코드 라인 수 및 세션 수 표시" style="width:100%;" >}}

사용자를 선택하면 사용자 비용, 생성된 라인 수, 풀 리퀘스트, AI 도입 비율, 모델 구성, 최근 풀 리퀘스트를 포함한 상세 보기가 열립니다. {{< ui >}}GitHub Pull Requests{{< /ui >}} 탭으로 전환하면 해당 사용자의 전체 PR 이력을 확인할 수 있습니다.

{{< img src="ai_agents_console/user-detail.png" alt="개별 사용자 상세 보기: User Spend, Lines Generated, Pull Requests 요약 타일과 AI Adoption, Model Mix 분석, Recent Pull Requests 표 포함" style="width:100%;" >}}

## Bits AI 에이전트 {#bits-ai-agents}

{{< ui >}}Bits AI Agents{{< /ui >}} 탭에서는 Datadog의 기본 제공 AI 에이전트 사용 현황을 코딩 에이전트와 함께 확인할 수 있습니다. 모든 Datadog 에이전트의 조사, 세션, 실행을 통합하여 표시하므로 Bits AI 활동을 조직 내 다른 활동과 연관 지어 분석할 수 있습니다.

개별 카드에는 [Bits AI SRE][11], [Bits AI Dev Agent][12], [Agent Builder][13]를 포함하여 각 Bits AI 에이전트의 활동이 요약되어 있습니다. 에이전트를 자세히 분석하려면 카드에서 {{< ui >}}View Details{{< /ui >}}를 선택합니다.

{{< img src="ai_agents_console/bits-ai-agents.png" alt="Bits AI Agent 탭: 시간 경과에 따른 통합 에이전트 활동 차트와 Bits AI SRE, Bits AI Dev, Agent Builder 카드에 최근 조사, 세션 및 실행 내역 표시" style="width:100%;" >}}

## 설정 {#set-up}

Agent Console로 데이터 전송을 시작하려면 [Agent Console 설정][14]을 참조하세요.

## 추가 자료{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[10]: /ko/integrations/github-copilot/
[11]: /ko/bits_ai/bits_ai_sre/
[12]: /ko/bits_ai/bits_ai_dev_agent/
[13]: /ko/actions/agents/
[14]: /ko/ai_agents_console/setup/