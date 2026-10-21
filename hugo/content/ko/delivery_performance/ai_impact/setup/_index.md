---
description: Datadog이 풀 리퀘스트를 AI 지원으로 분류할 수 있도록 AI 탐지 소스 및 AI Impact 설정을 구성합니다.
further_reading:
- link: /delivery_performance/ai_impact/
  tag: 문서
  text: AI Impact에 대해 알아보기
- link: /delivery_performance/dora_metrics/setup/
  tag: 문서
  text: DORA Metrics 설정
- link: /ai_agents_console/setup/
  tag: 문서
  text: 코딩 에이전트를 위한 Agent Console 설정
title: AI Impact 설정
---
{{< callout url="#" btn_hidden="true" header="미리 보기에 참여하세요!" >}}
AI Impact는 현재 미리 보기 버전으로 제공되며 모든 Datadog 고객이 사용할 수 있습니다.
{{< /callout >}}

[AI Impact][1]는 사용 중인 AI 코딩 도구에 대해 탐지한 소스를 기반으로 각 풀 리퀘스트를 {{< ui >}}AI-assisted{{< /ui >}} 또는 {{< ui >}}non-AI{{< /ui >}}로 분류합니다. 소스는 AI 코딩 도구가 커밋이나 PR에 기여했다는 신호입니다. 

[{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}Delivery Performance{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}AI Impact{{< /ui >}}][2]에서 AI 코딩 도구 및 소스를 구성합니다. Datadog은 각 코딩 어시스턴트를 가장 정확하게 분류하기 위한 권장 소스를 안내하며, 사전 설정된 매핑 규칙은 널리 사용되는 리뷰 에이전트 및 자율형 에이전트의 활동을 탐지하는 데 도움을 줍니다.

## 전제 조건 {#prerequisites}

AI Impact를 사용하려면 배포, 커밋 및 풀 리퀘스트 데이터와 함께 [DORA Metrics][3]를 설정해야 합니다.

AI가 공동 작성한 커밋과 AI 리뷰 에이전트 및 자율형 에이전트에 속하는 일부 활동과 같은 초기 데이터를 확인하는 데 별도의 AI 관련 구성은 필요하지 않습니다. 더 완전한 측정을 위해서는 아래에서 설명하는 대로 AI 코딩 도구 및 소스를 구성하세요.

## AI 탐지가 작동하는 방식 {#how-ai-detection-works}

Datadog은 다음 유형의 AI 도구에서 발생하는 AI 활동을 분류합니다.

| AI 도구 | 탐지가 작동하는 방식 |
|---|---|
| [코딩 어시스턴트](#set-up-coding-assistants) | 공동 작성자 패턴, 구성된 통합, 풀 리퀘스트 레이블 또는 AI 도구의 기여를 나타내는 기타 데이터를 통해 탐지됩니다. AI 어트리뷰션은 도구의 소스에 따라 [직접 파악되거나 추론](#ai-attribution-modes-for-coding-assistants)될 수 있습니다. |
| [리뷰 에이전트](#set-up-review-agents) | 풀 리퀘스트 코멘트 및 GitHub 반응에 대한 매핑 규칙을 사용하여 탐지됩니다. 규칙에 따라 검토 작성자가 명명된 에이전트에 매칭되면 풀 리퀘스트는 검토 에이전트에 의한 작업으로 식별됩니다. |
| [자율형 에이전트](#set-up-autonomous-agents) | 작성자 로그인, 작성자 이메일 또는 커밋 트레일러에 대한 매핑 규칙을 사용하여 탐지됩니다. 자율형 에이전트가 PR의 첫 번째 커밋을 생성하면 풀 리퀘스트는 자율형 에이전트에 의한 작업으로 식별됩니다. |

### 코딩 어시스턴트를 위한 AI 어트리뷰션 모드 {#ai-attribution-modes-for-coding-assistants}

AI Impact는 각 풀 리퀘스트를 AI 지원 또는 비 AI 지원으로 분류하며, 모든 메트릭은 해당 분류를 기반으로 구축됩니다. PR의 커밋 중 하나 이상이 AI 지원인 경우 해당 PR은 AI 지원으로 간주됩니다.

각 소스는 **직접 어트리뷰션**, **사용자 활동에서 추론된** 어트리뷰션 또는 둘 다를 모두 제공하는 신호를 전송합니다.

| | 직접 어트리뷰션 | 사용자 활동에서 추론됨 |
|---|---|---|
| 커밋이 AI 지원인 경우 | 도구가 특정 커밋에 대한 AI 기여를 보고하는 경우(예: AI 생성 라인을 보고하는 커서 통합) | 커밋 작성자가 커밋이 생성된 날짜에 AI 도구로 코드 라인을 생성한 경우 |
| 증거가 연결되는 항목 | 커밋 | 작성자 및 달력 날짜 |
| 메트릭이 나타내는 정보 | AI를 사용하지 않고 작성된 코드와 비교한 AI 지원 코드의 성능, 한 도구의 사용자와 다른 도구 사용자 비교 | AI를 사용하여 작업하는 개발자와 그렇지 않은 개발자의 성과 비교, 한 도구의 사용자와 다른 도구 사용자 비교 |

직접 어트리뷰션은 신호가 변경 사항 자체에 연결되므로 더 정확합니다. 추론된 어트리뷰션은 커밋별 세부 정보 없이 사용량을 보고하는 도구를 포함하며, 활성 작성자가 해당 날짜에 만든 모든 커밋을 AI 지원 커밋으로 분류합니다. 사용자는 도구가 해당 사용자가 생성한 코드 라인을 보고하는 날에만 활성 상태로 간주됩니다.

기본적으로 [AI Impact 대시보드][1]는 모든 [통합 도구](#supported-ai-coding-assistants-and-sources)가 공통으로 지원하는 가장 정확한 어트리뷰션 모드를 사용하여 메트릭을 표시하므로, 도구 간 메트릭을 동일한 기준으로 비교할 수 있습니다. 예를 들어 Cursor만 사용하는 경우, 사용 가능한 가장 정확한 방법인 직접 어트리뷰션을 사용하여 메트릭이 산출됩니다. Cursor와 Claude Code를 둘 다 사용하는 경우 Claude Code에는 직접 어트리뷰션을 사용할 수 없으므로 메트릭은 사용자 활동에서 추론됩니다.

[AI Impact 대시보드][1]에서 메트릭이 사용할 어트리뷰션 모드를 선택하려면 AI Impact 설정에서 {{< ui >}}Default AI attribution UI filter{{< /ui >}}를 설정합니다. 이 설정은 AI Impact UI에 데이터가 표시되는 방식에만 영향을 주며, Datadog이 수집하는 데이터에는 영향을 주지 않습니다. 어떤 모드를 선택하든 두 모드에서 모두 계속해서 데이터를 수집합니다.

## 코딩 어시스턴트 설정{#set-up-coding-assistants}

[{{< ui >}}AI Impact Settings{{< /ui >}}][2]는 Datadog이 탐지하는 코딩 도우미와 소스를 보여줍니다. 일부 코딩 어시스턴트는 생성하는 커밋에 [공동 작성자](#co-author-signatures)로 자신을 추가할 때 자동으로 탐지됩니다. AI 코딩 어시스턴트의 활동을 더 완벽하게 포착하려면 해당 소스를 구성합니다.

### 지원되는 AI 코딩 어시스턴트 및 소스 {#supported-ai-coding-assistants-and-sources}

지원되는 각 코딩 어시스턴트에는 다음 표에 나열된 각 컨텍스트별로 하나의 권장 소스가 있습니다. 권장 소스는 풀 리퀘스트당 수동 작업 없이 대부분의 사용자가 구성할 수 있는 가장 정확한 소스이며, 설정 후 자동으로 데이터를 가져옵니다.

| 코딩 어시스턴트 | 권장 소스 | 어트리뷰션 모드 |
|------------------|--------|-------------|
| Claude Code(API 또는 플랫폼) | [Anthropic 사용량 및 비용 통합][4] | 추론됨 |
| Claude Code(Enterprise 플랜) | [Claude Enterprise 사용자 분석 통합][5] | 추론됨 |
| Claude Code(Teams 플랜) | [OpenTelemetry](#opentelemetry) | 추론됨 |
| Claude Code(Amazon Bedrock 또는 Google Vertex AI) | [OpenTelemetry](#opentelemetry) | 추론됨 |
| Codex | [OpenAI Codex 통합][6] | 추론됨 |
| Cursor | [Cursor 통합][7] | 직접 |
| GitHub Copilot | [GitHub Copilot 통합][8] | 추론됨 |

다른 코딩 어시스턴트를 추적하거나 지원되는 코딩 어시스턴트에 대해 다른 소스를 사용하려면 모든 코딩 어시스턴트에서 다음 소스를 사용할 수 있습니다.

- [PR 레이블](#pr-label-detection): (직접 어트리뷰션) 지정된 레이블이 있는 PR은 AI 지원으로 표시됩니다.
- [공개 API](#datadog-public-api): (사용자 활동에서 추론됨) [Datadog 공개 API][11]를 통해 자체 이벤트 데이터를 보내면 Datadog이 이러한 데이터에서 AI 어트리뷰션을 추론합니다.

### 코딩 어시스턴트용 소스 구성 {#configure-a-source-for-a-coding-assistant}

1. [{{< ui >}}AI Impact Settings{{< /ui >}}][2]에서 {{< ui >}}Coding assistants{{< /ui >}} 탭을 엽니다. 이 탭에는 공동 작성자 탐지를 통해 자동으로 탐지된 AI 도구와 구성된 기타 코딩 어시스턴트가 나열됩니다.
1. 추적하려는 코딩 어시스턴트가 이미 나열되어 있으면 해당 어시스턴트를 선택하여 소스를 구성합니다. 그렇지 않으면 {{< ui >}}Add a coding assistant{{< /ui >}}를 클릭하고 코딩 어시스턴트를 선택합니다.
1. Claude Code의 경우 사용하는 플랜 또는 라우팅하는 게이트웨이를 선택합니다. [권장 소스](#supported-ai-coding-assistants-and-sources)는 각각 다릅니다.
1. UI 안내에 따라 소스를 설정합니다. 각 소스 유형에 대한 자세한 내용을 보려면 다음 섹션을 확장하세요.

{{% collapse-content title="Datadog 통합" level="h4" id="datadog-integrations" %}}
많은 경우 권장 소스는 코딩 도구용 Datadog 통합으로, AI 사용량을 Datadog에 직접 보고합니다. 이 중 Cursor 통합만이 커밋당 AI 기여도를 직접 보고합니다. 다른 통합은 사용자 활동을 보고하며, Datadog은 보고된 데이터를 사용하여 해당 날짜에 활성 작성자가 생성한 커밋에 대한 AI 지원을 추론합니다.

{{< ui >}}AI Impact Settings{{< /ui >}}에서 코딩 어시스턴트를 구성할 때 {{< ui >}}Integration{{< /ui >}} 섹션의 관련 버튼을 클릭하여 Datadog에서 통합 타일을 열고 설정을 완료합니다.
{{% /collapse-content %}}

{{% collapse-content title="OpenTelemetry" level="h4" id="opentelemetry" %}}
OpenTelemetry를 사용하여 Claude Code의 Teams 플랜과 같은 특정 코딩 어시스턴트 배포에서 AI 사용 데이터를 보고합니다. Amazon Bedrock 또는 Google Vertex AI와 같은 외부 게이트웨이를 통해 실행되는 Claude Code의 경우 추가 구성이 필요합니다.

1. [옵션 2: OpenTelemetry(OTLP)][9] 또는 [옵션 3: Datadog Agent를 통해 데이터 포워딩][10]에 따라 Claude Code가 OpenTelemetry 데이터를 Datadog으로 보내도록 구성합니다.
1. Amazon Bedrock 또는 Google Vertex AI: Claude Code 설정 파일에 사용자별 리소스 속성을 설정합니다(예: `~/.claude/settings.json`).

   ```json
   "OTEL_RESOURCE_ATTRIBUTES": "user.email=user@company.com"
   ```

   AI Impact는 활동을 개별 개발자와 연결하고 해당 개발자의 커밋에 대한 AI 지원을 추론하기 위해 `user.email`이 필요합니다.
1. Claude Code를 재시작합니다.

`user.email`은 개발자마다 다르므로 단일 공유 구성 파일로 제공할 수 없습니다. MDM(Mobile Device Management) 시스템 또는 로그인 시 값을 기록하는 프로비저닝 스크립트를 사용하여 설정 파일을 배포합니다.
{{% /collapse-content %}}

{{% collapse-content title="PR 레이블 탐지" level="h4" id="pr-label-detection" %}}
풀 리퀘스트 레이블은 Datadog 통합이 없는 어시스턴트를 포함하여 모든 코딩 어시스턴트에 대한 직접 어트리뷰션을 제공합니다. Datadog은 레이블이 지정된 풀 리퀘스트의 모든 커밋을 AI 지원으로 표시합니다.

1. 에서 코딩 어시스턴트를 구성할 때 {{< ui >}}AI Impact Settings{{< /ui >}}{{< ui >}}PR Labels{{< /ui >}} 섹션에서 {{< ui >}}Set Up{{< /ui >}}을 클릭합니다.
1. 팀에서 AI 지원 풀 리퀘스트를 식별하는 데 사용하는 레이블을 하나 이상 입력한 후, {{< ui >}}Save{{< /ui >}}를 클릭합니다.

각 규칙은 전체 풀 리퀘스트에 적용되므로 AI 지원 없이 작성된 커밋이 하나라도 있으면 해당 커밋은 AI 지원으로 분류됩니다. 레이블 탐지는 팀의 일관된 레이블 지정에 의존하는데, 대규모 조직 전체에서는 일관성을 유지하기 어려울 수 있습니다. Datadog 통합이 없는 코딩 어시스턴트나 해당 관행을 유지할 수 있는 단일 팀에 사용하세요.
{{% /collapse-content %}} 

{{% collapse-content title="Datadog 공개 API" level="h4" id="datadog-public-api" %}}
조직이 내부 게이트웨이를 통해 AI 코딩 도구를 라우팅할 때 [Datadog 공개 API][11]를 사용하여 자체 AI 사용 데이터를 Datadog으로 전송할 수 있습니다. 이 API는 Datadog 통합이 없는 코딩 어시스턴트를 추적하기 위한 옵션이기도 합니다. Datadog은 사용자가 보고하는 사용자 활동에서 AI 지원 여부를 추론합니다.
{{% /collapse-content %}}

{{% collapse-content title="공동 작성자 서명" level="h4" id="co-author-signatures" %}}
일부 코딩 어시스턴트는 자신이 생성한 커밋에 공동 작성자로 자신을 추가합니다. Datadog은 이러한 공동 작성자 서명을 자동으로 탐지하며, 추가 설정이 필요하지 않습니다. 서명이 커밋에 첨부되므로 공동 작성자 탐지는 직접 어트리뷰션을 제공합니다.

모든 코딩 어시스턴트가 자신을 공동 작성자로 추가하는 것은 아니며 리베이스나 스쿼시 실행 시 공동 작성자 서명이 제거될 수 있으므로, 공동 작성자 탐지는 AI 활동을 과소 집계할 수 있습니다. 코딩 어시스턴트를 더 정확하게 측정하려면 해당 어시스턴트에 대해 다른 소스를 구성하세요.
{{% /collapse-content %}}

## 검토 에이전트 설정 {#set-up-review-agents}

검토 에이전트는 코드를 작성하는 대신 풀 리퀘스트를 검토합니다. Datadog은 풀 리퀘스트 코멘트와 GitHub 반응에서 검토 에이전트를 탐지하며 매핑 규칙에 따라 검토 작성자가 명명된 에이전트에 매칭될 때 풀 리퀘스트는 검토 에이전트의 작업으로 식별됩니다.

매핑 규칙으로 검토 에이전트를 추적하려면 다음 단계를 수행하세요.

1. AI Impact 설정에서 {{< ui >}}Review agents{{< /ui >}} 탭을 엽니다.
1. {{< ui >}}Add Review Agent{{< /ui >}}를 클릭합니다.
1. UI에서 검토 에이전트를 식별할 {{< ui >}}Agent name{{< /ui >}}을 입력합니다.
1. PR에 대한 검토 의견이나 반응과 관련된 에이전트의 작성자 로그인과 일치하는 규칙을 하나 이상 정의합니다.

## 자율형 에이전트 설정 {#set-up-autonomous-agents}

자율형 에이전트는 편집기에서 개발자를 지원하는 대신 스스로 풀 리퀘스트를 엽니다. Datadog은 알려진 에이전트 패턴을 통해 대부분의 자율형 에이전트를 자동으로 탐지합니다. Datadog이 자동으로 탐지하지 못하는 에이전트를 식별하기 위해 매핑 규칙을 정의할 수도 있습니다.

매핑 규칙으로 에이전트를 추적하려면 다음 단계를 수행하세요.

1. AI Impact 설정에서 {{< ui >}}Autonomous agents{{< /ui >}} 탭을 엽니다.
1. {{< ui >}}Add Autonomous Agent{{< /ui >}}를 클릭합니다.
1. UI에서 자율형 에이전트를 식별할 {{< ui >}}Agent name{{< /ui >}}을 입력합니다.
1. 에이전트의 풀 리퀘스트를 식별하는 규칙을 하나 이상 정의합니다.

### 자동화 봇 식별 {#identify-automation-bots}

종속성 업데이트 도구나 릴리스 봇과 같은 자동화 봇은 AI 에이전트가 아니며 이러한 봇의 활동은 AI Impact와 관련이 없습니다. 봇을 식별하더라도 해당 활동이 AI Impact 메트릭에 영향을 미치지 않도록 방지할 수 있습니다.

자동화 봇이 작성한 커밋 및 PR을 탐지하려면 자동 봇 탐지(GitHub의 경우)를 활성화하고 [Delivery Performance 일반 설정][12]에서 사용자 지정 매핑 규칙을 정의합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/dora/ai-impact
[2]: https://app.datadoghq.com/ci/settings/dora/integrations
[3]: /ko/delivery_performance/dora_metrics/setup/
[4]: /ko/integrations/anthropic-usage-and-costs/
[5]: /ko/integrations/claude-enterprise-user-analytics/
[6]: /ko/integrations/openai-codex/
[7]: /ko/integrations/cursor/?tab=cursorintegrationindatadog#overview
[8]: /ko/integrations/github-copilot/
[9]: /ko/ai_agents_console/setup/#option-2-opentelemetry-otlp
[10]: /ko/ai_agents_console/setup/#option-3-forward-data-through-the-datadog-agent
[11]: /ko/api/latest/dora-metrics/send-ai-tool-user-activity/
[12]: https://app.datadoghq.com/ci/settings/dora