---
algolia:
  tags:
  - dashboard reporter
  - agentic reporting
  - scheduled report
  - product analytics agent
description: Slack, Microsoft Teams 또는 이메일을 통해 Product Analytics 대시보드의 AI 생성 보고서를
  정기적으로 받아보세요.
disable_toc: false
further_reading:
- link: /product_analytics/dashboards/
  tag: 설명서
  text: Product Analytics 대시보드
- link: /actions/agents/
  tag: 설명서
  text: Bits Agent Builder
- link: /account_management/billing/ai_credits/
  tag: 설명서
  text: AI 크레딧
- link: /bits_ai/bits_chat/usage/#slack
  tag: 설명서
  text: Slack에서 Bits Chat 사용
- link: /monitors/
  tag: 설명서
  text: 모니터
title: Dashboard Reporter Agent
---
{{< callout url="https://www.datadoghq.com/product-preview/product-analytics-dashboard-reporter-agent/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Dashboard Reporter Agent는 미리 보기로 제공되고 있습니다. 액세스를 요청하려면 양식을 작성하세요.
{{< /callout >}}

## 개요 {#overview}

Dashboard Reporter Agent는 선택한 Product Analytics 대시보드를 모니터링하고 Slack, Microsoft Teams 또는 이메일을 통해 팀에 정기적으로 보고서를 보냅니다. 각 보고서는 변경된 사항, 주의가 필요한 사항, 다음 단계로 수행할 작업을 요약하므로 각 대시보드를 일일이 열어 확인할 필요가 없습니다. 더 많은 기능을 출시함에 따라 하나의 Agent로 여러 대시보드를 모니터링할 수 있으며, 더 이상 정기적으로 살펴보지 않는 과거 출시 기능의 대시보드도 관리할 수 있습니다.

Dashboard Reporter Agent는 [Bits Agent Builder][1]를 기반으로 구축되었습니다.

<div class="alert alert-info">Dashboard Reporter Agent는 <a href="/account_management/billing/ai_credits/">AI Credits</a>을 사용합니다.</div>

보고서는 일정에 따라 전달되는 텍스트 요약입니다. 메트릭이 임계값을 넘을 때 알림을 받으려면 [모니터][2]를 사용하세요.

## 사용 사례 {#use-cases}

Dashboard Reporter Agent를 사용하여 다음을 수행하세요.

- **한 번에 여러 기능 모니터링**: 하나의 Agent로 여러 대시보드를 모니터링할 수 있습니다.
- **출시 현황을 계속 확인**: 출시 대시보드를 구독하여 출시 후 관심이 줄어든 뒤에도 계속 검토되도록 합니다.
- **주간 상태 업데이트 공유**: 팀 채널에 주간 보고서를 게시하여 모두가 동일한 신호를 확인할 수 있도록 합니다.
- **간결한 리더십 보고**: 슬라이드를 만들지 않고도 주요 메트릭과 전반적인 제품 상태를 전달합니다.
- **성능 저하 조기 발견**: 일일 보고서는 수치 하락과 오류 급증을 발생 직후에 빠르게 포착합니다.

## Agent가 보고서를 작성하는 방법 {#how-the-agent-builds-a-report}

- **전체 적용 범위**: Agent는 페이지 상단의 차트뿐만 아니라 구독한 대시보드의 모든 차트를 검토합니다.
- **기간 대비 비교**: 각 보고서는 현재 기간을 이전 기간과 비교합니다. 일일 보고서는 지난 24시간, 주간 보고서는 지난 7일, 월간 보고서는 지난 한 달을 다룹니다.
- **핵심 메트릭 우선**: 핵심 메트릭이 모든 보고서 상단에 표시되므로 팀이 기간별 진행 상황을 추적할 수 있습니다.
- **심각도순 우선순위 지정**: Agent는 사용자가 가장 중요한 항목에 집중할 수 있도록 문제를 심각도가 높은 순서대로 나열합니다.
- **의미 있는 변경 사항만 표시**: 의미 있는 변경 사항이 없으면 보고서에 사소한 변경 사항을 나열하는 대신 해당 내용을 명시합니다.
- **연결된 소스**: 보고서의 각 메트릭과 문제는 해당 차트로 연결됩니다.

Agent는 Agent를 생성한 사용자의 권한으로 대시보드 데이터를 읽습니다. 해당 사용자가 대시보드에 대한 액세스 권한을 잃으면 해당 대시보드는 더 이상 보고서에 포함되지 않습니다.

## 전제 조건 {#prerequisites}

- Product Analytics 및 모니터링하려는 대시보드에 대한 액세스 권한이 있어야 합니다.
- Slack으로 보고서를 전달하려면 조직에 [Datadog Slack 통합][3]이 설치되어 있어야 합니다.
- Microsoft Teams로 보고서를 전달하려면 조직에 [Microsoft Teams 통합][4]이 설치되어 있어야 합니다.

## Dashboard Reporter Agent 만들기 {#create-a-dashboard-reporter-agent}

대시보드에서 시작하거나 Product Analytics의 Agents 페이지에서 시작할 수 있습니다.

{{< tabs >}}
{{% tab "대시보드에서" %}}

1. 모니터링할 Product Analytics 대시보드를 엽니다.
2. {{< ui >}}Set Up Report{{< /ui >}}를 클릭합니다. 대시보드가 이미 다른 Agent의 보고서에 포함되어 있는 경우 여기에 나열됩니다.

   {{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-dashboard.png" alt="Set Up Report 버튼이 강조 표시된 Product Analytics 대시보드 헤더입니다." style="width:100%;" >}}

**참고**: 둘 이상의 Agent가 동일한 대시보드를 모니터링하는 경우, 각 Agent가 독립적으로 보고서를 작성하므로 보고서 내용이 다를 수 있습니다.

{{% /tab %}}
{{% tab "Agents 페이지에서" %}}

1. Datadog에서 [**Product Analytics > Agents**][1]로 이동합니다.
2. {{< ui >}}\+ New Agent{{< /ui >}}를 클릭합니다.
3. {{< ui >}}Dashboard Reporter{{< /ui >}} 블루프린트를 선택합니다.

{{< img src="product_analytics/dashboards/dashboard_reporter_agent/from-agents.png" alt="Start from blueprint 아래에 Dashboard Reporter 블루프린트가 강조 표시된 새 Agent 페이지입니다." style="width:60%;" >}}

[1]: https://app.datadoghq.com/product-analytics/agents
{{% /tab %}}
{{< /tabs >}}

### Agent 구성 {#configure-the-agent}

1. 독자들이 보고서의 내용을 알 수 있도록 '주간 상태 점검'과 같은 이름을 입력합니다. 이 이름은 모든 보고서의 제목에 표시됩니다.
2. 모니터링할 대시보드를 하나 이상 선택합니다. 나중에 대시보드를 추가할 수 있습니다.
3. Team Update 또는 Leadership Update와 같은 사전 정의된 보고서 형식을 선택하거나 직접 작성합니다. 사용자 지정 형식의 경우, 각 실행 시 보고서가 답변해야 할 질문과 서식 요구 사항을 설명하세요.
4. 보고서를 받을 Slack 채널, Microsoft Teams 채널 또는 이메일 주소를 선택합니다.
5. Agent 실행 빈도(일간, 주간 또는 월간), 보고서 전송 시간 및 시간대를 선택합니다.
6. {{< ui >}}Create{{< /ui >}}를 클릭합니다.

## 보고서 읽기 {#read-reports}

보고서는 구성한 목적지로 전송됩니다. 각 실행 결과는 Agent 페이지에도 저장되므로 과거 보고서를 검토할 수 있습니다.

### 보고서에 대해 후속 질문하기 {#ask-follow-up-questions-about-a-report}

Datadog에서 보고서를 열고 Agent에게 후속 질문을 할 수 있습니다. 예를 들어, 어떤 세그먼트가 변화를 주도했는지 또는 동시에 어떤 다른 변화가 있었는지 질문할 수 있습니다.

1. 보고서를 엽니다.
   - **보고서 메시지에서**: Slack, Microsoft Teams 또는 이메일 메시지에서 {{< ui >}}Chat with this report{{< /ui >}}를 클릭합니다.
   - **Datadog에서**: Agents 페이지로 이동하여 Agent를 선택합니다.
2. 메시지 상자에 질문을 입력하고 <kbd>Enter</kbd> 키를 누릅니다.

### Slack에서 Bits AI에게 질문하기 {#ask-bits-ai-in-slack}

보고서가 Slack으로 전송되고 Datadog Slack 통합에서 Bits AI가 활성화된 경우, Slack을 나가지 않고도 Bits Chat에 보고서에 대해 질문할 수 있습니다. 질문과 함께 `@Datadog`을 언급하세요(예: `@Datadog Why did checkout conversion drop this week?`). 설정 방법은 [Slack에서 Bits Chat 사용][5]을 참조하세요.


## Dashboard Reporter Agent 관리 {#manage-dashboard-reporter-agents}

Agent를 확인하려면 [**Product Analytics > Agents**][6]으로 이동합니다.

### Agent 편집 {#edit-an-agent}

Agent의 대시보드, 보고서 형식, 목적지 또는 주기를 변경할 수 있습니다.

1. Agents 페이지에서 해당 Agent를 클릭합니다.
2. 다음 방법 중 하나로 변경합니다.
   - **Agent에게 요청**: 채팅에서 변경 사항을 설명합니다. 예: `Add the Checkout Funnel dashboard and send reports on Mondays at 9:00 AM.`
   - **지침 편집**: 대시보드, 보고서 형식 또는 목적지를 변경하려면 {{< ui >}}Instructions{{< /ui >}} 패널을 클릭하고 Markdown으로 편집합니다. 주기를 변경하려면 {{< ui >}}Automation{{< /ui >}} 패널을 확장하세요.

### Agent 일시 중지 또는 재개 {#pause-or-resume-an-agent}

사용량이 적은 기간이나 대시보드를 재구축하는 동안처럼 보고서 전송을 일시적으로 중지하려면 Agent를 일시 중지하세요. 일시 중지된 Agent는 구성을 유지합니다.

- **Agent를 일시 중지하려면**: Agents 페이지에서 Agent 위로 마우스를 가져가 {{< ui >}}Pause{{< /ui >}}를 클릭합니다. 확인 창에서 {{< ui >}}Pause{{< /ui >}}를 다시 클릭합니다.
- **Agent를 다시 시작하려면**: Agents 페이지에서 Agent 위로 마우스를 가져가 {{< ui >}}Resume{{< /ui >}}을 클릭합니다. 확인 창에서 {{< ui >}}Resume{{< /ui >}}을 클릭합니다.

### Agent 삭제 {#delete-an-agent}

보고서를 일시적으로 중지하려면 대신 [Agent를 일시 중지](#pause-or-resume-an-agent)하세요.

<div class="alert alert-warning">Agent 삭제는 영구적입니다. Agent는 보고서 전송을 중단하고, <a href="/actions/workflows/">Workflow Automation</a>에서 해당 Agent 기반 워크플로도 삭제되며, 둘 다 복원할 수 없습니다.</div>

Agent를 삭제하려면 Agents 페이지로 이동하여 해당 Agent 위로 마우스를 가져간 다음 {{< ui >}}Delete{{< /ui >}}를 클릭합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/agents/
[2]: /ko/monitors/
[3]: /ko/integrations/slack/?tab=datadogforslack
[4]: /ko/integrations/microsoft_teams/
[5]: /ko/bits_ai/bits_chat/usage/#slack
[6]: https://app.datadoghq.com/product-analytics/agents