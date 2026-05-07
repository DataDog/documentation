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

AI cost visibility gives FinOps and engineering teams a unified destination for analyzing AI spend across providers, including Anthropic, AWS Bedrock, Google Gemini, OpenAI, and Vertex AI. View total AI spend alongside your existing cloud infrastructure costs, analyze it with normalized tags, track cost anomalies, and attribute usage to the specific users and API keys driving it.

## Prerequisites

To use AI Costs, you must have at least one of the following supported providers set up for [Cloud Cost Management][1]:

| AI Provider | Setup method |
|---|---|
| Anthropic   | [SaaS integration][3] |
| AWS Bedrock | [AWS integration][8] |
| Gemini      | [Google Cloud integration][9] |
| OpenAI     | [SaaS integration][2] |
| Vertex AI  | [Google Cloud integration][9] |

## AI cost summary

After connecting your AI providers, navigate to [**Cloud Cost** > **Summarize** > **AI**][5] to view the AI cost summary page.

The AI cost summary page provides:

- **Total AI Cost:** Aggregated AI cost and cost change over the selected time frame.
- **Daily AI Cost:** Daily cost trends across the selected providers over the selected time frame. Use the **Filter to** dropdown to define which providers appear in the graph.
- **Top Cost Drivers:** The models, projects, services, and users generating the most spend.
- **Active AI Cost Anomalies:** Cost [anomalies][4] surfaced proactively across all connected providers. Select an anomaly to open a side panel with more details and options for further action.
- **AI Cost Dashboards:** Out-of-the-box dashboard templates for each supported provider, combining cost data with usage signals such as token consumption, model distribution, and user analytics.

## Normalized AI tags

AI cost data from all supported providers is normalized to a consistent set of tags, so you can filter, group, compare, and plan AI spend consistently across dashboards, [monitors][11], [budgets][12], [forecasts][13], and other Datadog tools. Use the [Cloud Cost Explorer][6] to query and compare spend across providers without writing per-provider logic.

The following tags are available for all supported AI providers:

| Tag Name | Tag Description |
|---|---|
| `providername` | The AI provider. |
| `model` | The AI model identifier (for example, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | The human-readable model name (for example, `Claude Opus 4.6`). |
| `token_direction` | Whether tokens are being consumed (input) or generated (output) within a service or application. |
| `token_category` | The specific category of tokens consumed, such as input/output tokens or tokens related to caching and search operations (for example, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | The project, workspace, or environment the AI costs belong to. |

## Attribute AI spend to users

Out-of-the-box (OOTB) allocation rules use Datadog observability data to attribute AI costs to the users and API keys that generated them. OOTB allocation rules require no configuration and are available for OpenAI and Anthropic.

The following tags are available through OOTB allocation rules:

| Tag | OpenAI | Anthropic |
|---|---|---|
| `account_id` | {{< X >}} | |
| `account_name` | {{< X >}} | |
| `api_key_id` | {{< X >}} | {{< X >}} |
| `api_key_name` | | {{< X >}} |
| `batch` | {{< X >}} | |
| `context_window` | | {{< X >}} |
| `endpoint` | {{< X >}} | |
| `model` | {{< X >}} | {{< X >}} |
| `model_id` | | {{< X >}} |
| `org_id` | {{< X >}} | {{< X >}} |
| `org_name` | | {{< X >}} |
| `project_id` | {{< X >}} | |
| `project_name` | {{< X >}} | |
| `service_tier` | | {{< X >}} |
| `user_email` | {{< X >}} | {{< X >}} |
| `user_id` | {{< X >}} | {{< X >}} |
| `user_name` | | {{< X >}} |
| `workspace_id` | | {{< X >}} |
| `workspace_name` | | {{< X >}} |

After costs are attributed to users and API keys, use [Tag Pipelines][7] to automatically map them to teams, services, or business units for streamlined aggregate reporting. See [Reporting][10] for more information.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[3]: /cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /cloud_cost_management/cost_changes/anomalies/
[5]: https://app.datadoghq.com/cost/summarize/ai-costs
[6]: https://app.datadoghq.com/cost/explorer
[7]: /cloud_cost_management/allocation/tag_pipelines
[8]: /cloud_cost_management/setup/aws
[9]: /cloud_cost_management/setup/google_cloud
[10]: /cloud_cost_management/reporting
[11]: /cloud_cost_management/cost_changes/monitors
[12]: /cloud_cost_management/planning/budgets
[13]: /cloud_cost_management/planning/forecasting
