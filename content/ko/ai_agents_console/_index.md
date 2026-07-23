---
description: Datadog Agent Console에서 조직 전체의 코딩 에이전트 및 Bits AI 에이전트 사용량, 비용 및 성능을 모니터링하고
  분석합니다.
further_reading:
- link: /ai_agents_console/setup/
  tag: 설명서
  text: Agent Console 설정
- link: /integrations/anthropic-usage-and-costs/
  tag: 설명서
  text: Anthropic 사용량 및 비용 통합
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
| [GitHub Copilot][4] | GitHub의 AI 기반 코드 완성 도구 |


## 코딩 에이전트 {#coding-agents}

{{< ui >}}Coding Agents{{< /ui >}} 탭에서는 조직 전체의 코딩 에이전트 활동을 상위 수준에서 확인할 수 있습니다. 기본적으로 모든 코딩 에이전트의 데이터가 집계되어 표시되며, 특정 에이전트만 필터링하여 조회할 수도 있습니다.

{{< img src="/ai_agents_console/agent_console_agent_findings.png" alt="Claude Code, Cursor 및 GitHub Copilot의 메트릭과 추세를 포함한 에이전트 발견 사항 요약을 보여주는 Agent Console의 Coding Agents 탭" style="width:100%;" >}}

### 에이전트 발견 사항 {#agent-findings}

{{< ui >}}Agent Findings{{< /ui >}} 패널은 선택한 기간에 대한 주요 활동(총 비용, 총 사용자 수, 세션 수, 병합 소요 시간, 코드 라인 수, 세션당 평균 턴 수 포함)을 요약하여 보여줍니다. 누적 차트는 에이전트(예: Claude Code, Cursor)별로 활동을 구분하여 표시하므로 시간 경과에 따른 도입 현황을 비교할 수 있습니다.

### 영향 지표 {#impact-metrics}

{{< ui >}}Impact Metrics{{< /ui >}} 패널은 AI 지원 개발이 소프트웨어 배포 수명 주기에 미치는 영향을 DORA 스타일 메트릭을 사용하여 측정하며, AI 지원 작업과 비 AI 작업을 나란히 비교하여 보여줍니다.

- **Adoption**: AI 지원 커밋 및 AI 지원 PR을 포함하여 AI가 생성한 코드의 비율을 추적합니다.
- **Velocity**: 변경 사항이 프로덕션에 도달하는 속도를 측정하며, 변경 리드 타임 및 PR 검토 시간을 포함합니다.
- **Stability**: 배포 이후 변경 사항의 안정성을 추적하며, 변경 실패율 및 복구 시간을 포함합니다.

### 감지된 문제 {#detected-problems}

{{< ui >}}Detected Problems{{< /ui >}} 패널은 팀이 자주 겪는 문제 패턴을 강조 표시하고 해결 방법을 추천합니다. Sankey 다이어그램은 개별 에이전트에서 특정 리포지토리로 이어지는 문제 패턴(예: 검사 건너뛰기, 재시도 루프, 파일 재읽기)을 시각화하며 각 패턴에 대한 예상 월간 비용도 함께 제공합니다.

{{< img src="/ai_agents_console/detected_problems_skipped_checks.png" alt="Claude Code, Cursor 및 GitHub Copilot의 세션이 문제 패턴에 어떻게 매핑되는지 보여주고 건너뛴 검사를 강조 표시하는 Detected Problems Sankey 다이어그램" style="width:90%;" >}}

{{< ui >}}Problem Pattern{{< /ui >}} 노드를 클릭하면 패턴 정의, 조직 전체의 예상 월간 비용, 플래그가 지정된 세션 목록 및 권장 수정 방법이 포함된 상세 보기가 열립니다.

### 개별 에이전트 대시보드 {#individual-agent-dashboards}

{{< ui >}}Coding Agents{{< /ui >}} 탭에는 연결된 각 코딩 에이전트(예: Claude Code, GitHub Copilot, Cursor)에 대한 타일이 표시됩니다. 각 타일에는 총 사용자 수, 총 비용 및 코드 라인당 비용을 포함한 해당 에이전트 활동 요약이 표시됩니다.

{{< img src="/ai_agents_console/coding_agent_dashboard_claude.png" alt="Claude Code 대시보드는 추가된 코드 라인 수, 세션, 커밋 및 성능 메트릭에 대한 위젯을 표시합니다." style="width:100%;" >}}

에이전트 타일을 클릭하거나 페이지 상단의 {{< ui >}}All Coding Agents{{< /ui >}} 드롭다운에서 선택하여 해당 에이전트 전용 대시보드를 엽니다. 전용 대시보드에는 총 비용, 세션, 커밋 및 추가된 코드 라인 수에 대한 요약 타일과 함께 요청 볼륨, 지연 시간, 모델 사용 패턴, 추가된 코드 라인 대비 제거된 코드 라인, 도구 수락 대비 거부에 대한 성능 차트가 포함됩니다.

## 에이전트 사용량 분석 {#analyze-agent-usage}

{{< ui >}}Analytics{{< /ui >}} 탭에서는 개인 및 팀 단위의 세부 정보를 제공하여 파워 유저, 이상치, 팀 수준의 도입 패턴을 파악할 수 있습니다.

{{< img src="/ai_agents_console/agent_console_analytics.png" alt="리더보드 및 차트를 포함하여 코딩 에이전트 사용량에 대한 상세 사용자 및 팀 분석을 표시하는 Agent Console Analytics 탭" style="width:100%;" >}}

### 팀 비교 {#team-comparison}

{{< ui >}}Comparison{{< /ui >}} 패널은 결과 대비 AI 도구에 과도하게 투자하거나 충분히 투자하지 않는 팀을 식별하는 데 도움이 됩니다. 팀별 비용, 코드 라인당 비용 및 모델 사용량을 조직 기준선과 비교하여 효율성 향상이 가능한 영역이나 예상보다 비용이 높은 영역을 찾습니다.

### 사용자 분석 {#user-analytics}

{{< img src="/ai_agents_console/user_analytics_user_detail_panel.png" alt="에이전트별 비용, 모델 구성 및 PR 이력을 포함하여 선택한 사용자에 대한 상세 분석을 보여주는 Agent Console User Analytics 패널" style="width:100%;" >}}

{{< ui >}}User Analytics{{< /ui >}} 패널은 조직 내 개별 엔지니어가 AI 도구를 어떻게 사용하고 있는지에 대한 가시성을 제공합니다. 이 패널을 사용하여 다음을 수행할 수 있습니다.
- 가장 많은 비용을 사용하는 사용자 및 가장 생산적인 기여자 식별
- 효율성 이상치 파악 — 비용은 높지만 산출물은 적거나 그 반대인 엔지니어 식별
- 사용자, 에이전트 및 모델별 전체 비용 분석 확인
- 개별 사용자의 비용, PR 이력 및 모델 구성을 검토

## Bits AI 에이전트 {#bits-ai-agents}

{{< img src="/ai_agents_console/bits_ai_agents.png" alt="시간 경과에 따른 통합 에이전트 활동 차트와 Bits Investigation, Bits Code 및 Bits Agent Builder의 최근 조사, 세션 및 실행 현황을 보여주는 개별 카드를 포함한 Bits AI Agent 탭" style="width:100%;" >}}

{{< ui >}}Bits AI Agents{{< /ui >}} 탭에서는 Datadog의 기본 제공 AI 에이전트 사용 현황을 코딩 에이전트와 함께 확인할 수 있습니다. 모든 Datadog 에이전트의 조사, 세션, 실행을 통합하여 표시하므로 Bits AI 활동을 조직 내 다른 활동과 상호 연계할 수 있습니다.

개별 카드에는 [Bits Investigation][5], [Bits Code][6] 및 [Bits Agent Builder][7]를 포함한 각 Bits AI 에이전트의 활동이 요약되어 있습니다. 카드에서 {{< ui >}}View Details{{< /ui >}}를 클릭하여 해당 에이전트를 자세히 살펴봅니다.

## 설정 {#set-up}

Agent Console로 데이터 전송을 시작하려면 [Agent Console 설정][8]을 참조하세요.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/ai-agents-console
[2]: https://docs.claude.com/en/docs/claude-code/overview
[3]: https://www.cursor.com/
[4]: /ko/integrations/github-copilot/
[5]: /ko/bits_ai/bits_ai_sre/
[6]: /ko/bits_ai/bits_ai_dev_agent/
[7]: /ko/actions/agents/
[8]: /ko/ai_agents_console/setup/