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
---

{{< callout btn_hidden="true" header="In Preview" >}}
  AI Cost Management is in Preview.
{{< /callout >}}

## Overview

AI cost visibility gives FinOps and engineering teams a unified destination for analyzing AI spend across providers, including OpenAI and Anthropic. View total AI spend alongside your existing cloud infrastructure costs, analyze it with normalized tags, and attribute usage to the specific users and API keys driving it.

## Prerequisites

To use AI Cost Management, you must:

- Configure [Cloud Cost Management][1] for at least one cloud provider (AWS, Azure, Google Cloud, or Oracle Cloud).
- Connect your AI providers using [SaaS Cost Integrations][2]. See the setup instructions for each provider:

  - [OpenAI][2]
  - [Anthropic][3]

## AI cost summary

After connecting your AI providers, navigate to [**Cloud Cost** > **Summarize** > **AI**][5] to view the AI cost summary page.

The AI cost summary page provides:

- **Total AI Cost:** Aggregated AI cost and cost change over the selected time frame.
- **Daily AI Cost:** Daily cost trends across the selected providers over the selected time frame. Use the **Filter to** dropdown to define which providers appear in the graph.
- **Top Cost Drivers:** The models, projects, services, and users generating the most spend.
- **Active AI Cost Anomalies:** Cost [anomalies][4] surfaced proactively across all connected providers. Select an anomaly to open a side panel with more details and options for further action.
- **AI Cost Dashboards:** Out-of-the-box dashboard templates for each supported provider, combining cost data with usage signals such as token consumption, model distribution, and user analytics.

## Normalized AI tags

AI cost data from all supported providers is normalized to a consistent set of tags, so you can filter, group, and compare AI spend consistently across dashboards, monitors, and other Datadog tools. Use the [Cloud Cost Explorer][6] to query and compare spend across providers without writing per-provider logic.

The following tags are available for all supported AI providers:

| Tag Name | Tag Description |
|---|---|
| `providername` | The AI provider. |
| `model` | The AI model identifier (for example, `claude-opus-4-6`, `gpt-4.1`). |
| `model_name` | The human-readable model name. |
| `token_direction` | Whether tokens are being consumed (input) or generated (output) within a service or application. |
| `token_category` | The specific category of tokens consumed, such as input/output tokens or tokens related to caching and search operations (for example, `cached input`, `cache write`, `standard input`, `output`). |
| `project` | The project, workspace, or environment the AI costs belong to. |
| `usage_type` | A combined charge description containing model, direction, cache, and other usage details. |

## Attribute AI spend to users

Out-of-the-box (OOTB) allocation rules use Datadog observability data to attribute AI costs to the users and API keys that generated them. OOTB allocation rules require no configuration and are available for OpenAI.

After costs are attributed to users and API keys, use [Tag Pipelines][7] to automatically map them to teams, services, or business units for streamlined aggregate reporting.

For more information, see [Custom Allocation Rules][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/
[2]: /cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[3]: /cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts
[4]: /cloud_cost_management/cost_changes/anomalies/
[5]: https://app.datadoghq.com/cost/summarize/ai-costs
[6]: https://app.datadoghq.com/cost/explorer
[7]: /cloud_cost_management/allocation/tag_pipelines
[8]: /cloud_cost_management/allocation/custom_allocation_rules
