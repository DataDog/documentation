---
title: AI Costs
description: "Gain unified visibility into AI spend across providers, normalize cost data, and attribute usage to users and teams."
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/setup/saas_costs"
  tag: "Documentation"
  text: "SaaS Cost Integrations"
- link: "/cloud_cost_management/allocation/custom_allocation_rules"
  tag: "Documentation"
  text: "Custom Allocation Rules"
- link: "/cloud_cost_management/allocation/tag_pipelines"
  tag: "Documentation"
  text: "Tag Pipelines"
- link: "/cloud_cost_management/reporting"
  tag: "Documentation"
  text: "Reporting"
- link: "/cloud_cost_management/cost_changes/monitors"
  tag: "Documentation"
  text: "Cloud Cost Monitors"
- link: "/cloud_cost_management/planning/budgets"
  tag: "Documentation"
  text: "Budgets"
- link: "/cloud_cost_management/planning/forecasting"
  tag: "Documentation"
  text: "Forecasting"
---


## Overview

AI Costs in Cloud Cost Management gives FinOps and engineering teams a unified destination for analyzing AI spend across providers, including Amazon Bedrock, Anthropic, Google Gemini, OpenAI, and Vertex AI. View total AI spend alongside your existing cloud infrastructure costs, analyze it with normalized tags, track cost anomalies, and attribute usage to the specific users and API keys driving it.

## Prerequisites

To use AI Costs, you must have at least one of the following supported providers set up for [Cloud Cost Management][1]:

| AI provider | Setup method |
|---|---|
| Amazon Bedrock | [AWS integration][2] |
| Anthropic   | [SaaS integration][3] |
| Google Gemini  | [Google Cloud integration][4] |
| OpenAI     | [SaaS integration][5] |
| Vertex AI  | [Google Cloud integration][4] |

## AI cost summary

After connecting your AI providers, navigate to [**Cloud Cost** > **Summarize** > **AI**][6] to view the AI cost summary page.

{{< img src="cloud_cost/ai_costs/ccm-ai-costs-overview.png" alt="The AI cost summary dashboard, showing daily spend trends over a one-month period, a list of top spend drivers, and an anomaly graph." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

The AI cost summary page provides:

- **Total AI Cost**: Aggregated AI cost and cost change over the selected time frame.
- **Daily AI Cost**: Daily cost trends across the selected providers over the selected time frame. Use the **Filter to** dropdown to define which providers appear in the graph.
- **Top Cost Drivers**: The models, projects, services, and users generating the most spend.
- **Active AI Cost Anomalies**: Cost [anomalies][7] surfaced proactively across all connected providers. Select an anomaly to open a side panel with more details and options for further action.
- **AI Cost Dashboards**: Out-of-the-box dashboard templates for each supported provider, combining cost data with usage signals such as token consumption, model distribution, and user analytics.

## Normalized AI tags

AI cost data from all supported providers is normalized to a consistent set of tags. Use these tags to filter, group, compare, and plan AI spend across dashboards, [monitors][8], [budgets][9], [forecasts][10], and other Datadog tools. Use [Cloud Cost Explorer][11] to query and compare spend across providers without writing per-provider logic.

The following tags are available for all supported AI providers:

| Tag&nbsp;name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; | Tag description |
|---|---|
| `providername` | The AI provider. |
| `model` | The AI model identifier (for example, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | The human-readable model name (for example, `Claude Opus 4.6`). |
| `token_direction` | Whether tokens are being consumed (input) or generated (output) within a service or application. |
| `token_category` | The specific category of tokens consumed, such as input tokens, output tokens, or tokens related to caching and search operations (for example, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | The project, workspace, or environment the AI costs belong to. |

## Attribute AI spend to sources

[Out-of-the-box (OOTB) allocation rules][12] use Datadog observability data to attribute AI costs to the users, API keys, and other sources that generated them. OOTB allocation rules require no configuration and are available for Anthropic and OpenAI.

The following tags are available through OOTB allocation rules:

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

Configure [Tag Pipelines][13] to map OOTB tags (such as `user_email`) to teams, services, or business units for aggregate reporting:

{{< img src="cloud_cost/ai_costs/ccm-tag-pipeline-ai-costs.png" alt="The Tag Pipelines Rule Setup page, showing user_email values mapped to team values through an existing reference table, and additional tag mapping options." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

After mapping, attributed spend appears in provider-specific dashboards and [Cost Reports][14]:

{{< img src="cloud_cost/ai_costs/ccm-anthropic-ai-cost-reporting.png" alt="A provider-specific dashboard with a stacked bar graph showing daily provider spend attributed by team and model name, and a summary list of the spend attributions." responsive="true" style="width:100%; background:none; border:none; box-shadow:none;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /cloud_cost_management/setup/aws
[3]: /cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /cloud_cost_management/setup/google_cloud
[5]: /cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[6]: https://app.datadoghq.com/cost/summarize/ai-costs
[7]: /cloud_cost_management/cost_changes/anomalies/
[8]: /cloud_cost_management/cost_changes/monitors
[9]: /cloud_cost_management/planning/budgets
[10]: /cloud_cost_management/planning/forecasting
[11]: https://app.datadoghq.com/cost/explorer
[12]: /cloud_cost_management/allocation/custom_allocation_rules/?tab=even
[13]: /cloud_cost_management/allocation/tag_pipelines
[14]: /cloud_cost_management/reporting
