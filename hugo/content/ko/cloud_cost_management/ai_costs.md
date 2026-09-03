---
description: 전체 공급자에 걸친 AI 지출을 통합적으로 파악하고, 비용 데이터를 정규화하며, 사용자 및 팀의 사용량을 추적하세요.
further_reading:
- link: /cloud_cost_management/
  tag: 설명서
  text: Cloud Cost Management
- link: /cloud_cost_management/setup/saas_costs
  tag: 설명서
  text: SaaS 및 AI 비용
- link: /cloud_cost_management/allocation/custom_allocation_rules
  tag: 설명서
  text: 사용자 지정 할당 규칙
- link: /cloud_cost_management/allocation/tag_pipelines
  tag: 설명서
  text: 태그 파이프라인
- link: /cloud_cost_management/reporting
  tag: 설명서
  text: 보고
- link: /cloud_cost_management/cost_changes/monitors
  tag: 설명서
  text: Cloud Cost Monitors
- link: /cloud_cost_management/planning/budgets
  tag: 설명서
  text: 예산
- link: /cloud_cost_management/planning/forecasting
  tag: 설명서
  text: 예측
title: AI 비용
---
## 개요 {#overview}

Cloud Cost Management의 AI 비용은 FinOps 및 엔지니어링 팀이 Amazon Bedrock, Anthropic, Google Gemini, OpenAI, Vertex AI, GitHub Copilot 및 Cursor를 포함한 공급자 전반에 걸친 AI 지출을 통합적으로 분석할 수 있는 환경을 제공합니다. 기존 클라우드 인프라 비용과 함께 총 AI 지출을 확인하고, 정규화된 태그로 비용을 분석하며, 비용 이상 징후를 추적하고, 사용량의 원인을 특정 사용자 및 API 키로 귀속시킬 수 있습니다.

## 전제 조건 {#prerequisites}

AI 비용을 사용하려면 [Cloud Cost Management][1]에서 다음 지원 공급자 중 하나 이상을 설정해야 합니다.

| AI 공급자 | 설정 방법 |
|---|---|
| Amazon Bedrock | [AWS 통합][2] |
| Anthropic   | [SaaS 통합][3] |
| Google Gemini  | [Google Cloud 통합][4] |
| OpenAI     | [SaaS 통합][5] |
| Vertex AI  | [Google Cloud 통합][4] |
| GitHub Copilot | [GitHub Copilot][15] |
| Cursor | [Cursor][16] |

## AI Cost Summary {#ai-cost-summary}

AI 공급자를 연결한 후, [**Cloud Cost** > **Summarize** > **AI**][6]로 이동하여 AI Cost Summary 페이지를 확인합니다.

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="AI Cost Summary 대시보드는 한 달 동안의 일일 지출 추세, 주요 지출 요인 목록 및 이상 징후 그래프를 보여줍니다." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

AI Cost Summary 페이지에서는 다음과 같은 내용을 확인할 수 있습니다.

- **총 AI 비용**: 선택한 기간 동안 집계된 AI 비용 및 비용 변화.
- **일일 AI 비용**: 선택한 기간 동안 선택된 공급자의 일일 비용 추세. 그래프에 표시할 공급자를 선택하려면 **Filter to** 드롭다운을 사용하세요.
- **주요 비용 요인**: 가장 많은 지출을 발생시키는 모델, 프로젝트, 서비스 및 사용자.
- **활성 AI 비용 이상 징후**: 연결된 모든 공급자에서 발생한 비용 [이상][7]을 선제적으로 표시합니다. 이상 징후를 선택하면 세부 정보 및 추가 작업 옵션이 포함된 사이드 패널이 열립니다.
- **AI 비용 대시보드**: 각각의 지원되는 공급자에 대한 기본 대시보드 템플릿으로, 비용 데이터와 토큰 소비, 모델 분포 및 사용자 분석과 같은 사용 신호를 통합하여 제공합니다.

## 정규화된 AI 태그 {#normalized-ai-tags}

지원되는 모든 공급자의 AI 비용 데이터는 일관된 태그 세트로 정규화됩니다. 이 태그를 사용하여 대시보드, [모니터링][8], [예산][9], [예측][10] 및 기타 Datadog 도구에서 AI 지출을 필터링, 그룹화, 비교 및 계획하세요. [Cloud Cost Explorer][11]를 사용하여 공급자 간의 지출을 쿼리하고 비교하세요. 공급자별 로직을 작성할 필요는 없습니다.

다음 태그는 모든 지원 AI 공급자에서 사용할 수 있습니다.

| 태그&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | 태그 설명 |
|---|---|
| `providername` | AI 공급자입니다. |
| `model` | AI 모델 식별자(예: `claude-opus-4-6`, `gpt-4.1`)입니다. |
| `model_name` | 사람이 읽을 수 있는 모델 이름(예: `Claude Opus 4.6`)입니다. |
| `token_direction` | 서비스 또는 애플리케이션 내에서 토큰이 소비(입력)되고 있는지 또는 생성(출력)되고 있는지 여부를 알려줍니다. |
| `token_category` | 소비된 토큰의 특정 범주입니다. 예를 들어 입력 토큰, 출력 토큰 또는 캐싱 및 검색 작업과 관련된 토큰(예: `cached input`, `cache write`, `standard input`, `output`)이 포함됩니다. |
| `project` | AI 비용이 속한 프로젝트, 작업 공간 또는 환경입니다. |

## 출처별 AI 비용 귀속 {#attribute-ai-spend-to-sources}

[기본 제공(OOTB) 할당 규칙][12]은 Datadog 관측 가능성 데이터를 사용하여 AI 비용을 사용자, API 키 및 이를 생성한 기타 출처에 귀속시킵니다. OOTB 할당 규칙은 구성할 필요가 없으며 Anthropic 및 OpenAI에서 사용할 수 있습니다.

다음 태그는 OOTB 할당 규칙을 통해 사용할 수 있습니다.

{{< tabs >}}
{{% tab "Anthropic" %}}

- `api_key_id`
- `api_key_name`
- `context_window`
- `model`
- `model_id`
- `org_id`
- `org_name`
- `service_tier`
- `user_email`
- `user_id`
- `user_name`
- `workspace_id`
- `workspace_name`

{{% /tab %}}
{{% tab "OpenAI" %}}

- `account_id`
- `account_name`
- `api_key_id`
- `batch`
- `endpoint`
- `model`
- `org_id`
- `project_id`
- `project_name`
- `user_email`
- `user_id`

{{% /tab %}}
{{< /tabs >}}

집계 보고를 위해 [Tag Pipelines][13]를 구성하여 OOTB 태그(예: `user_email`)를 팀, 서비스 또는 비즈니스 단위에 매핑하세요.

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="기존 참조 표를 통해 팀 값에 매핑된 user_email 값과 추가 태그 매핑 옵션이 표시된 Tag Pipelines Rule Setup 페이지." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

매핑 후, 할당된 지출은 공급자별 대시보드 및 [비용 보고서][14]에 표시됩니다.

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="공급자별 대시보드의 이미지입니다. 팀 및 모델 이름별로 귀속된 일일 공급자 비용이 누적 막대그래프로 표시되어 있고, 비용 귀속 요약 목록이 있습니다." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## 참고 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/cloud_cost_management/
[2]: /ko/cloud_cost_management/setup/aws
[3]: /ko/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /ko/cloud_cost_management/setup/google_cloud
[5]: /ko/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[6]: https://app.datadoghq.com/cost/summarize/ai-costs
[7]: /ko/cloud_cost_management/cost_changes/anomalies/
[8]: /ko/cloud_cost_management/cost_changes/monitors
[9]: /ko/cloud_cost_management/planning/budgets
[10]: /ko/cloud_cost_management/planning/forecasting
[11]: https://app.datadoghq.com/cost/explorer
[12]: /ko/cloud_cost_management/allocation/custom_allocation_rules/?tab=even
[13]: /ko/cloud_cost_management/allocation/tag_pipelines
[14]: /ko/cloud_cost_management/reporting
[15]: /ko/cloud_cost_management/setup/saas_costs/?tab=github#configure-your-saas-accounts
[16]: /ko/cloud_cost_management/setup/saas_costs/?tab=cursor#configure-your-saas-accounts