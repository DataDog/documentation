---
title: FinOps Skill in Bits Assistant
description: Use the FinOps skill in Bits Assistant to investigate, explain, and share cloud cost findings using natural language.
aliases:
- /cloud_cost_management/finops_agent/
- /cloud_cost_management/finops_skill/
- /cloud_cost_management/ccm_ai/
algolia:
  tags: ["cloud cost", "cloud cost management", "ccm", "finops", "finops skill", "bits assistant"]
  rank: 75
further_reading:
- link: "/bits_ai/bits_assistant/"
  tag: "Documentation"
  text: "Bits Assistant"
- link: "/cloud_cost_management/reporting/explorer/"
  tag: "Documentation"
  text: "Cost Explorer"
- link: "/cloud_cost_management/planning/budgets/"
  tag: "Documentation"
  text: "Budgets"
- link: "/bits_ai/mcp_server/"
  tag: "Documentation"
  text: "Datadog MCP Server"
---

{{< callout url="#" btn_hidden="true" header="The FinOps skill is in Preview" >}}
The FinOps skill runs in Bits Assistant. Fill out the <a href="https://www.datadoghq.com/product-preview/bits-assistant/">Bits Assistant Preview form</a> to request access.
{{< /callout >}}

## Overview

The FinOps skill is the Cloud Cost Management workflow in [Bits Assistant][1]. It helps engineering and finance teams use natural language to investigate cost changes, identify likely owners, and share findings with the teams that own the spend.

<div class="alert alert-info">This page describes how to use AI to analyze costs in Cloud Cost Management. It is not a guide to monitoring AI provider spend. To ingest SaaS or AI provider costs into CCM, see <a href="/cloud_cost_management/setup/saas_costs/">SaaS Cost Integrations</a>.</div>

The first focus of the FinOps skill is **cost change investigations**. Over time, the skill is expanding to cover more workflows across Cloud Cost Management, including recommendations, savings opportunities, anomalies, and budgets.

You can use the FinOps skill to:

- Investigate cost changes, anomalies, and cost monitor alerts.
- Identify teams, services, accounts, regions, or resources driving spend.
- Answer ad hoc questions about cloud, SaaS, custom, or Datadog costs.
- Compare actual spend and forecasts against [budgets][3].
- Correlate cost changes with observability metrics, such as CPU, memory, request volume, or storage size.
- Capture an investigation in a Datadog Notebook for handoff or future reference.

## Prerequisites

- [Set up Cloud Cost Management][4] for the cost sources you want to analyze.
- Your role needs the **Bits Assistant Access** permission and the relevant [Cloud Cost Management permissions][9] for the data you ask about. Bits Assistant respects your Datadog role permissions.
- Creating or editing investigation notebooks requires notebook permissions.

## Ways to access the FinOps skill

You can trigger the FinOps skill from many places in Datadog. The skill picks up the cost context from where you start the conversation.

| Entry point | What it investigates |
| --- | --- |
| **Bits Assistant** | Open Bits Assistant from anywhere in Datadog and ask a cost question directly. |
| **Cost change tiles on the CCM Summary page** | The largest cost changes for the selected period. |
| **Cost Explorer** | The current Cost Explorer query, including any filters you apply (for example, a specific service like `EC2`). |
| **Cost anomalies** | A detected cost anomaly. |
| **Cost monitors** | A triggered [cost monitor][10] (cost changes or cost thresholds). |
| **Budgets** | A budget that is over budget or projected to go over. You can also investigate individual budget line items. |

<div class="alert alert-info">The FinOps skill is only triggered from <strong>cost monitors</strong>. Triggering it from non-cost monitors is not supported.</div>

New entry points are added as the FinOps skill expands across more Cloud Cost Management workflows.

## Cost change investigations

When you ask the FinOps skill to investigate a cost change, it generates a consistent summary for every investigation, then asks what you want to explore next.

### Example prompts

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which services drove the largest AWS cost increase between March and April?`
- `Is this cost change putting any budgets at risk?`
- `Which teams are responsible for the highest S3 storage costs this month?`

### What the summary includes

Every cost change investigation produces a structured summary:

- A daily cost chart showing the **baseline period** and **investigation period**.
- A **summary table** with the total dollar change, percentage change, and projected annual impact when applicable.
- **Rate-versus-usage** context, to help distinguish price changes from consumption changes.
- **Likely owners** - the teams, services, or resources that contributed most to the change.
- **Key findings** describing what changed and why, such as new spend from a single user.
- A link to open the matching query in [Cost Explorer][6].

Cost data can lag behind real time. By default, the FinOps skill uses complete cost days and compares equal-length periods so it does not over-explain incomplete data.

### Guided follow-up paths

After the summary, the FinOps skill offers a set of guided follow-up paths. You can also keep asking free-form questions instead of choosing one. Typical follow-ups include:

1. **Cost Breakdown** - Find the top services, accounts, regions, resources, or tags driving the change. You can break the cost down further by tag, user, API key, or other dimensions.
2. **Observability** - Correlate the cost change with metrics such as CPU requests, memory requests, request count, bucket size, or database usage.
3. **Check Budget Impact** - Find related budgets and compare actual or forecasted spend against budget targets.
4. **Recommendations** - Surface cost recommendations and savings opportunities related to the change.
5. **Create Handoff Notebook** - Generate a structured notebook for the team that owns the change. See [Notebooks](#notebooks).
6. **Look up Communication Channel** - Find a team communication channel (for example, a Slack channel) when ownership metadata is available in Datadog.

## Notebooks

The FinOps skill can capture an investigation in a Datadog Notebook. There are two notebook templates:

- **Handoff notebook** - Designed for the engineering team that owns the affected service. It includes the investigation findings plus a structured set of questions for the owning team to confirm, such as whether the change is expected and whether it is expected to continue.
- **Summary notebook** - A lighter capture of the conversation and findings, without the handoff-specific status questions. Use this when you want a personal record of the investigation rather than a handoff.

Both notebooks include links back to [Cost Explorer][6] and other Datadog views where you can validate the underlying queries.

## Budgets and forecasting

If you use [Cloud Cost Management Budgets][3], ask the FinOps skill to explain budget status and variance. It can summarize:

- Actual spend versus budgeted amount.
- Forecasted spend versus budgeted amount.
- Which cost scope a budget covers, based on the budget's filters.
- Which budget entries, teams, services, or providers are contributing to an overage.

Example prompts:

- `Why is the infrastructure budget projected to go over this month?`
- `Show actual and forecasted spend for the payments team budget.`
- `Does last week's EC2 cost increase affect any active budgets?`

## General cost questions

You can also ask the FinOps skill exploratory cost questions, even if you are not investigating a specific alert:

- `Show total cloud cost by provider for the last 30 complete days.`
- `What are our top Kubernetes namespace costs this month?`
- `Which teams have the largest Datadog product costs?`
- `What cost tags are available for breaking down GCP spend?`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

For deeper manual analysis, use [Cost Explorer][6] to adjust filters, groupings, and time ranges directly.

## Access through the Datadog MCP Server

To query Cloud Cost Management data from an external AI agent (for example, from an IDE or terminal-based assistant), use the [Datadog MCP Server][2]. Cost data is available through the core metric tools.

For cost metrics such as `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*`, or `datadog.cost.*`, ask your agent to set `use_cloud_cost` to `true`. See [Datadog MCP Server Tools][7] for the full tool reference and [Set Up the Datadog MCP Server][5] for connection instructions.

## Related AI features in Cloud Cost Management

Cloud Cost Management also includes AI-assisted workflows outside of chat:

- [Cost anomalies][8] use Watchdog Explains to highlight what is driving unexpected cost changes.
- The [Cost Explorer][6] Cost Change Summary panel helps identify associated teams and change drivers for selected cost rows.
- Datadog Notebooks capture and share cost investigations with engineering teams.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /bits_ai/mcp_server/
[3]: /cloud_cost_management/planning/budgets/
[4]: /cloud_cost_management/setup/
[5]: /bits_ai/mcp_server/setup/
[6]: /cloud_cost_management/reporting/explorer/
[7]: /bits_ai/mcp_server/tools/
[8]: /cloud_cost_management/cost_changes/anomalies/
[9]: /cloud_cost_management/setup/permissions/
[10]: /monitors/types/cloud_cost/
