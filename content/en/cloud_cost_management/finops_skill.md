---
title: FinOps Skill in Bits Assistant
description: Use the FinOps skill in Bits Assistant and the Datadog MCP Server to investigate, explain, and share cloud cost findings.
aliases:
- /cloud_cost_management/finops_agent/
- /cloud_cost_management/ccm_ai/
algolia:
  tags: ["cloud cost", "cloud cost management", "ccm", "finops", "FinOps skill", "bits assistant", "mcp"]
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

{{< callout url="https://www.datadoghq.com/product-preview/bits-assistant/" btn_hidden="false" header="FinOps skill is in Preview" >}}
The FinOps skill runs in Bits Assistant. Fill out the Bits Assistant Preview form to request access.
{{< /callout >}}

## Overview


The FinOps skill is the Cloud Cost Management analysis workflow in [Bits Assistant][1]. It is designed for root cause analysis (RCA), budget follow-up, and general cost questions. You can use the skill for guided cost investigations, cost explanations, and to share cost findings. For example:

- Investigate cost changes, anomalies, and cost monitor alerts.
- Identify teams, services, accounts, regions, or resources driving spend.
- Answer ad hoc questions about cloud, SaaS, custom, or Datadog costs.
- Compare actual spend and forecasts against [budgets][2].
- Correlate cost changes with observability metrics, such as CPU, memory, request volume, or storage size.
- Create Datadog Notebooks that capture an investigation for handoff or future reference.

## Prerequisites

To use the FinOps skill for Bits Assistant, you must:

- [Set up Cloud Cost Management][3] for the cost sources you want to analyze.
- Have these permissions:
  - [Bits Assistant Access][4] permission
  - [Cloud Cost Management permissions][5] for the data you ask about
  - (Optional) [Notebook permissions][6], if you want to create or edit investigation notebooks.

## FinOps skill in Bits Assistant

{{< img src="cloud_cost/budgets_bits_assistant.png" alt="The Budgets page showing over-budget items with an Investigate button to trigger the FinOps skill" style="width:100%;" >}}

Click {{< ui >}}Investigate{{< /ui >}} or {{< img src="bits_ai/dev_agent/twinkling_stars_icon.png" inline="true" style="width:24px">}} (the twinkling stars icon) to trigger the FinOps skill in areas such as:

- [Budgets][7]
- [Cost monitors][8] that are triggered
- [Cost anomalies][9]
- The Investigate Cost Changes section of the [Summarize][10] page
- The Total Cost Change section on the [Explorer][11] page

Alternatively, you can click {{< ui >}}Ask Bits{{< /ui >}} on the top left of any Datadog page to open the Bits Assistant and ask a cost question.

Example prompts for cost changes:

- `Investigate why EC2 costs increased last week for team:payments.`
- `Which services drove the largest AWS cost increase between March and April?`
- `Is this cost change putting any budgets at risk?`
- `Which teams are responsible for the highest S3 storage costs this month?`
- `Create a handoff notebook for the team that owns this cost spike.`

Example prompts for budgets and spending:

- `Why is the infrastructure budget projected to go over this month?`
- `Show actual and forecasted spend for the payments team budget.`
- `Does last week's EC2 cost increase affect any active budgets?`

Example prompts for exploratory cost questions:

- `Show total cloud cost by provider for the last 30 complete days.`
- `What are our top Kubernetes namespace costs this month?`
- `What cost tags are available for breaking down GCP spend?`
- `Find optimization opportunities for idle or over-provisioned cloud infrastructure.`

### Cost change investigations

When you use the FinOps skill in Bits Assistant to investigate a cost change, Bits Assistant provides a concise summary and then asks what you want to explore next. The initial analysis typically includes:

- A daily cost chart for the baseline and investigation periods.
- The baseline period, investigation period, total dollar and percentage change, and projected annual impact when applicable.
- Rate-versus-usage context to help distinguish price changes from consumption changes.
- Owners or teams attribution based on your cost tags.
- A link to open the query in Cost Explorer.

Cost data can lag behind real time. By default, the FinOps skill uses complete cost days and compares equal-length periods so it does not over-explain incomplete data.

After the initial summary, choose from guided follow-up paths:

1. {{< ui >}}Cost Breakdown{{< /ui >}} - Find the top services, accounts, regions, resources, or tags driving the change.
1. {{< ui >}}Observability{{< /ui >}} - Correlate the cost change with metrics such as CPU requests, memory requests, request count, bucket size, or database usage.
1. {{< ui >}}Check Budget Impact{{< /ui >}} - Find related budgets and compare actual or forecasted spend against budget targets.
1. {{< ui >}}Create Handoff Notebook{{< /ui >}} - Create a Datadog Notebook for the team that owns the service to confirm and act on findings.
1. {{< ui >}}Save to Notebook{{< /ui >}} - Capture the investigation for your records.
1. {{< ui >}}Look up Communication Channel{{< /ui >}} - Find a team communication channel when ownership metadata is available in Datadog.

### Budgets and forecasting

After setting up [Budgets][2], use the FinOps skill in Bits Assistant to explain budget status and spending. Bits Assistant can help summarize:

- Actual spend versus budgeted amount.
- Forecasted spend versus budgeted amount.
- Which cost scope a budget covers, based on the budget's filters.
- Which budget entries, teams, services, or providers are contributing to an overage.

After the initial summary, choose from guided follow-up paths:

1. {{< ui >}}Cost Breakdown{{< /ui >}} - Find the top services, accounts, regions, resources, or tags driving spending.
1. {{< ui >}}Identify Owners{{< /ui >}} TKTK
1. {{< ui >}}Adjust Budget{{< /ui >}} TKTK
1. {{< ui >}}Save to Notebook{{< /ui >}} - Capture the investigation for your records.

## Use the Datadog MCP Server for cost analysis

The [Datadog MCP Server][12] lets external AI agents query Datadog data. This is useful when you want to ask cost questions from an IDE, terminal-based assistant, or custom AI workflow.

To use an external AI agent, [set up the Datadog MCP Server][13]. If your MCP client filters toolsets, include the `core` toolset to use the metric tools that can query Cloud Cost Management data.

Cloud Cost Management data is available through the core metric tools:

| MCP tool                          | Usage                                 |
| --------------------------------- | ------------------------------------- |
| [`get_datadog_metric`][14]         | Query cost metrics, compare periods, and group costs by provider, service, team, account, resource, or tag. Ask your agent to set `use_cloud_cost` to `true` for CCM cost metrics. |
| [`get_datadog_metric_context`][15] | Discover metadata, available tag keys, and tag values for a cost metric before querying it. Ask your agent to set `use_cloud_cost` to `true` for CCM cost metrics.               |

Example prompts for MCP-connected agents:

- `Use Datadog MCP to query cloud cost data. Set use_cloud_cost=true and show daily all.cost grouped by provider for the last 30 complete days.`
- `Use get_datadog_metric_context with use_cloud_cost=true to find available tags for aws.cost.net.amortized.shared.resources.allocated, then group EC2 costs by team.`
- `Compare this week's complete EC2 cost to the previous week and explain which teams or accounts changed the most.`

Use the cloud cost flag only for Cloud Cost Management metrics such as `all.cost`, `aws.cost.*`, `azure.cost.*`, `gcp.cost.*`, `oci.cost.*`, `custom.cost.*`, or `datadog.cost.*`. For observability metrics that explain a cost change, such as Kubernetes CPU or S3 bucket size, use the standard metric query behavior.

For connection instructions, supported clients, and toolset configuration, see [Set Up the Datadog MCP Server][13]. For the full MCP tool reference, see [Datadog MCP Server Tools][16].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /cloud_cost_management/planning/budgets/
[3]: /cloud_cost_management/setup/
[4]: /account_management/rbac/permissions/#bits-assistant
[5]: /cloud_cost_management/setup/permissions/
[6]: /account_management/rbac/permissions/#notebooks
[7]: https://app.datadoghq.com/cost/plan/budgets
[8]: https://app.datadoghq.com/cost/monitor/monitors
[9]: https://app.datadoghq.com/cost/monitor/anomalies
[10]: https://app.datadoghq.com/cost/summarize/overview
[11]: https://app.datadoghq.com/cost/analyze/explorer
[12]: /bits_ai/mcp_server/
[13]: /bits_ai/mcp_server/setup/
[14]: /bits_ai/mcp_server/tools/#get_datadog_metric
[15]: /bits_ai/mcp_server/tools/#get_datadog_metric_context
[16]: /bits_ai/mcp_server/tools/
