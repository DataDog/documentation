---
title: AI for Cloud Cost Management
description: Use the FinOps Agent in Bits Assistant and the Datadog MCP Server to investigate, explain, and share cloud cost findings.
aliases:
- /cloud_cost_management/finops_agent/
- /cloud_cost_management/ccm_ai/
algolia:
  tags: ["cloud cost", "cloud cost management", "ccm", "finops", "finops agent", "bits assistant", "mcp"]
  rank: 75
further_reading:
- link: "/bits_ai/bits_assistant/"
  tag: "Documentation"
  text: "Bits Assistant"
- link: "/bits_ai/mcp_server/"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/cloud_cost_management/reporting/explorer/"
  tag: "Documentation"
  text: "Cost Explorer"
- link: "/cloud_cost_management/planning/budgets/"
  tag: "Documentation"
  text: "Budgets"
---

{{< callout url="#" btn_hidden="true" header="FinOps Agent is in Preview" >}}
The FinOps Agent runs in Bits Assistant. Fill out the [Bits Assistant Preview form](https://www.datadoghq.com/product-preview/bits-assistant/) to request access.
{{< /callout >}}

## Overview

AI for Cloud Cost Management (CCM) helps engineering and finance teams use natural language to investigate, explain, and share cost findings. Use the FinOps Agent in [Bits Assistant][1] for guided cost investigations in Datadog, or connect your own AI agent to Datadog cost data with the [Datadog MCP Server][2].

<div class="alert alert-info">This page is about using AI to analyze costs in Cloud Cost Management. It is not a guide to monitoring AI provider spend. To ingest SaaS or AI provider costs into CCM, see <a href="/cloud_cost_management/setup/saas_costs/">SaaS Cost Integrations</a>.</div>

You can use AI for Cloud Cost Management to:

- Investigate cost changes, anomalies, and cost monitor alerts.
- Identify teams, services, accounts, regions, or resources driving spend.
- Answer ad hoc questions about cloud, SaaS, custom, or Datadog costs.
- Compare actual spend and forecasts against [budgets][3].
- Correlate cost changes with observability metrics, such as CPU, memory, request volume, or storage size.
- Create Datadog Notebooks that capture an investigation for handoff or future reference.

## Prerequisites

- [Set up Cloud Cost Management][4] for the cost sources you want to analyze.
- To use the FinOps Agent, you need the **Bits Assistant Access** permission and [Cloud Cost Management permissions][9] for the data you ask about. Bits Assistant respects your Datadog role permissions. Creating or editing investigation notebooks also requires notebook permissions.
- To use an external AI agent, [set up the Datadog MCP Server][5]. If your MCP client filters toolsets, include the `core` toolset to use the metric tools that can query Cloud Cost Management data.

## FinOps Agent in Bits Assistant

The FinOps Agent is the Cloud Cost Management analysis workflow in Bits Assistant. It is designed for root cause analysis (RCA), budget follow-up, and general cost questions.

Open Bits Assistant from Datadog and ask a cost question. For example:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which services drove the largest AWS cost increase between March and April?`
- `Is this cost change putting any budgets at risk?`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Create a handoff notebook for the team that owns this cost spike.`

For more ways to open and use Bits Assistant, see the [Bits Assistant documentation][1].

### Cost change investigations

When you ask the FinOps Agent to investigate a cost change, it starts with a concise summary and then asks what you want to explore next. The initial analysis typically includes:

- A daily cost chart for the baseline and investigation periods.
- The baseline period, investigation period, total dollar and percentage change, and projected annual impact when applicable.
- Rate-versus-usage context when supported, to help distinguish price changes from consumption changes.
- Likely owner or team attribution based on your cost tags.
- A link to open the query in Cost Explorer.

Cost data can lag behind real time. By default, the FinOps Agent uses complete cost days and compares equal-length periods so it does not over-explain incomplete data.

After the initial summary, choose from guided follow-up paths:

1. **Cost Breakdown** - Find the top services, accounts, regions, resources, or tags driving the change.
2. **Observability** - Correlate the cost change with metrics such as CPU requests, memory requests, request count, bucket size, or database usage.
3. **Check Budget Impact** - Find related budgets and compare actual or forecasted spend against budget targets.
4. **Create Handoff Notebook** - Create a structured Datadog Notebook for the team that owns the change.
5. **Save to Notebook** - Capture the investigation for your records.
6. **Look up Communication Channel** - Find a team communication channel when ownership metadata is available in Datadog.

### Budgets and forecasting

If you use [Cloud Cost Management Budgets][3], ask the FinOps Agent to explain budget status and variance. It can help summarize:

- Actual spend versus budgeted amount.
- Forecasted spend versus budgeted amount.
- Which cost scope a budget covers, based on the budget's filters.
- Which budget entries, teams, services, or providers are contributing to an overage.

Example prompts:

- `Why is the infrastructure budget projected to go over this month?`
- `Show actual and forecasted spend for the payments team budget.`
- `Does last week's EC2 cost increase affect any active budgets?`

### General cost questions

You can also ask the FinOps Agent exploratory cost questions, even if you are not investigating a specific alert:

- `Show total cloud cost by provider for the last 30 complete days.`
- `What are our top Kubernetes namespace costs this month?`
- `Which teams have the largest Datadog product costs?`
- `What cost tags are available for breaking down GCP spend?`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

For deeper manual analysis, use [Cost Explorer][6] to adjust filters, groupings, and time ranges directly.

## Use the Datadog MCP Server for cost analysis

The [Datadog MCP Server][2] lets external AI agents query Datadog data. This is useful when you want to ask cost questions from an IDE, terminal-based assistant, or custom AI workflow.

Cloud Cost Management data is available through the core metric tools:

| MCP tool | Use it for |
| --- | --- |
| [`get_datadog_metric`][7] | Query cost metrics, compare periods, and group costs by provider, service, team, account, resource, or tag. Ask your agent to set `use_cloud_cost` to `true` for CCM cost metrics. |
| [`get_datadog_metric_context`][7] | Discover metadata, available tag keys, and tag values for a cost metric before querying it. Ask your agent to set `use_cloud_cost` to `true` for CCM cost metrics. |

Example prompts for MCP-connected agents:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

Use the cloud cost flag only for Cloud Cost Management metrics such as `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*`, or `datadog.cost.*`. For observability metrics that explain a cost change, such as Kubernetes CPU or S3 bucket size, use the standard metric query behavior.

For connection instructions, supported clients, and toolset configuration, see [Set Up the Datadog MCP Server][5]. For the full MCP tool reference, see [Datadog MCP Server Tools][7].

## Other AI-assisted CCM features

Cloud Cost Management also includes AI-assisted workflows outside of chat:

- [Cost anomalies][8] use Watchdog Explains to highlight what is driving unexpected cost changes.
- The [Cost Explorer][6] Cost Change Summary panel helps identify associated teams and change drivers for selected cost rows.
- Datadog Notebooks can capture and share cost investigations with engineering teams.

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
